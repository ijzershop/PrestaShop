import cssutils
import sys
import logging

# Suppress cssutils warnings/errors
cssutils.log.setLevel(logging.CRITICAL)

def clean_css(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # We want to maintain order and only remove duplicates/redundant overrides
    # cssutils might reformat too much if we just parse and serialize.
    # Let's try a custom approach if cssutils is too aggressive,
    # but first let's see what it does.

    parser = cssutils.CSSParser(validate=False)
    sheet = parser.parseString(content)

    # We will track rules and their properties to identify duplicates
    # This is tricky because of specificity and order.
    # The requirement is: "remove duplicates and overrides. Keep the media breakpoints and bootstrap variable overrides."

    # Actually, a safer way to "remove duplicates and overrides" while keeping the result the same
    # is to look for rules that are EXACTLY the same, or properties within the same selector that are overridden later.

    # But wait, if I have:
    # .a { color: red; }
    # .a { color: blue; }
    # Removing the first one is an "override removal" but it changes nothing (if they are adjacent).

    # If I have:
    # .a { color: red; }
    # .b { color: green; }
    # .a { color: red; }
    # The second .a is a duplicate.

    # Let's try to identify rules that are completely superseded.

    new_rules = []
    seen_rules = {} # selector -> {property: value}

    # Iterate through rules. If we encounter a selector we've seen before,
    # and it's NOT inside a media query (or it's in the same media query),
    # we might be able to merge or remove.

    # However, "Keep the media breakpoints" suggests we should treat them separately.

    def process_rules(rules, context="root"):
        processed = []
        # selector_map tracks the latest properties for each selector in this context
        selector_map = {}

        for rule in rules:
            if rule.type == rule.STYLE_RULE:
                selector = rule.selectorText
                props = {p.name: (p.value, p.priority) for p in rule.style}

                if selector in selector_map:
                    # If the new rule has the exact same properties as the previous one, it's a duplicate.
                    # If it has different properties, it might be overriding some.
                    prev_props = selector_map[selector]
                    if prev_props == props:
                        # Exact duplicate of the latest one, we can probably skip it?
                        # No, wait. CSS order matters. If there are other rules in between,
                        # it might be intended. But usually not for exact duplicates.
                        continue
                    else:
                        # Update the map
                        selector_map[selector].update(props)
                        processed.append(rule)
                else:
                    selector_map[selector] = props
                    processed.append(rule)
            elif rule.type == rule.MEDIA_RULE:
                # Recursively process media rules?
                # "Keep media breakpoints"
                # For now, let's just keep them as is or process their internal rules.
                rule.cssRules = process_rules(rule.cssRules, context=rule.media.mediaText)
                processed.append(rule)
            else:
                processed.append(rule)
        return processed

    # This simple logic might be too aggressive or not enough.
    # Let's try a different approach: only remove EXACT duplicate rules (same selector and same content)
    # that appear later in the same context.

    final_rules = []
    seen_exact = set()

    def get_rule_key(rule):
        if rule.type == rule.STYLE_RULE:
            return (rule.type, rule.selectorText, rule.style.cssText)
        elif rule.type == rule.MEDIA_RULE:
            return (rule.type, rule.media.mediaText, rule.cssRules.cssText)
        return (rule.type, rule.cssText)

    # Actually, the user says "remove duplicates and overrides".
    # Overrides usually mean:
    # .x { color: red; }
    # .x { color: blue; } -> color: red is overridden.

    # To do this safely, we'd need to know if anything in between affects it.

    # Let's use a more sophisticated script that uses cssutils but tries to preserve some style.

    new_sheet = cssutils.css.CSSStyleSheet()

    # Grouping rules by selector and media context
    # context -> selector -> list of (property, value, priority)

    # Actually, I'll just write a script that identifies duplicate blocks.

    print("Parsing CSS...")
    sheet = parser.parseString(content)
    print(f"Initial rules: {len(sheet.cssRules)}")

    # We will build a new list of rules, skipping those that are completely redundant.
    # A rule is redundant if a later rule in the same context sets all its properties to the same or different values.
    # WAIT, if it sets to DIFFERENT values, the first one is redundant but we should keep the LATER one.

    # Let's reverse the rules and keep the FIRST one we see for each (context, selector, property).
    # This ensures we keep the LATEST definition in the original file.

    def deduplicate(rules):
        kept_rules = []
        # (selector, property) -> (value, priority)
        seen_properties = {}

        # We process in reverse to keep the "latest" one.
        for rule in reversed(rules):
            if rule.type == rule.STYLE_RULE:
                selector = rule.selectorText
                new_properties = []
                # rule.style is an iterable of property names
                # We need to preserve the order of properties within the rule
                # but we are processing rules in reverse.

                # To keep it simple: if a selector has been seen before with the same properties, skip it.
                # If it's a completely new rule for this selector, keep it.

                # Actually, let's just do EXACT block deduplication first, it's safer.
                rule_content = rule.style.cssText
                key = (selector, rule_content)
                if key not in seen_properties:
                    seen_properties[key] = True
                    kept_rules.append(rule)
                else:
                    # Duplicate block
                    continue
            elif rule.type == rule.MEDIA_RULE:
                # For media rules, we need to create a new list of rules
                inner_rules = deduplicate(rule.cssRules)
                # Clear and re-add
                while rule.cssRules.length > 0:
                    rule.deleteRule(0)
                for i, r in enumerate(inner_rules):
                    rule.insertRule(r, i)
                kept_rules.append(rule)
            else:
                kept_rules.append(rule)

        return list(reversed(kept_rules))

    # The above logic might break things if selectors are complex or have different specificity.
    # But if the selectors are IDENTICAL, then it's safe.

    # Let's stick to IDENTICAL selectors for now.

    cleaned_rules = deduplicate(sheet.cssRules)
    sheet.cssRules = cleaned_rules

    print(f"Final rules: {len(sheet.cssRules)}")

    with open('cleaned_custom.css', 'wb') as f:
        f.write(sheet.cssText)

if __name__ == "__main__":
    clean_css(sys.argv[1])
