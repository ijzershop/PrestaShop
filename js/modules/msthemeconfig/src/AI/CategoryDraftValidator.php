<?php
declare(strict_types=1);

namespace MsThemeConfig\AI;

use DOMDocument;
use DOMElement;
use DOMNode;
use DOMText;
use Throwable;

final class CategoryDraftValidator
{
    /** Blocking errors for empty/unsafe HTML or links outside the supplied catalog. */
    public static function validateSourceLinksAndHtml(array $data, array $source): array
    {
        $errors = [];
        $html = $data['description'] ?? null;
        if (!is_string($html) || self::visibleText($html) === '') {
            return ['description moet een niet-lege HTML-tekst zijn.'];
        }
        $document = self::document($html);
        [$productUrls, $categoryUrls] = self::sourceUrls($source);
        foreach ($document->getElementsByTagName('*') as $element) {
            $tag = strtolower($element->tagName);
            if (!in_array($tag, ['html', 'head', 'body', 'h1', 'p', 'strong', 'a', 'ul', 'li', 'i'], true)) {
                $errors[] = 'Verwijder onveilige of niet-toegestane HTML: <' . $tag . '>.';
            }
            if ($tag === 'i' && self::faqIconLabel($element) === null) {
                $errors[] = 'Gebruik alleen lege FAQ-iconen met class="fasl fa-circle-question" of class="fasl fa-circle-info" en aria-hidden="true", zonder andere attributen of inhoud.';
            }
            foreach ($element->attributes as $attribute) {
                $name = strtolower($attribute->name);
                $value = preg_replace('/[\x00-\x20\x7f]+/', '', $attribute->value);
                if (str_starts_with($name, 'on') || in_array($name, ['style', 'srcdoc', 'hidden'], true)
                    || (in_array($name, ['href', 'src', 'action', 'formaction', 'xlink:href'], true)
                        && preg_match('/^(?:javascript|vbscript|data):/i', $value))) {
                    $errors[] = 'Verwijder onveilige HTML-attributen, scripts, verborgen inhoud en inline styling.';
                }
            }
            // DOM already decodes HTML entities once; do not decode the href a second time.
            if ($tag === 'a') {
                $href = $element->getAttribute('href');
                if (!isset($productUrls[$href]) && !isset($categoryUrls[$href])) {
                    $errors[] = 'Elke link moet exact een aangeleverde products[].url, products[].combinations[].url of related_categories[].url overnemen.';
                }
            }
        }
        return array_values(array_unique($errors));
    }

    /** Only explicitly supplied URLs are allowed; using those links remains optional. */
    private static function sourceUrls(array $source): array
    {
        $productUrls = [];
        $categoryUrls = [];
        foreach ($source['products'] ?? [] as $product) {
            $url = $product['url'] ?? null;
            if (is_string($url) && trim($url) !== '') { $productUrls[self::decode($url)] = true; }
            foreach ($product['combinations'] ?? [] as $combination) {
                $url = $combination['url'] ?? null;
                if (is_string($url) && trim($url) !== '') { $productUrls[self::decode($url)] = true; }
            }
        }
        foreach ($source['related_categories'] ?? [] as $category) {
            $url = $category['url'] ?? null;
            if (is_string($url) && trim($url) !== '') { $categoryUrls[self::decode($url)] = true; }
        }
        return [$productUrls, $categoryUrls];
    }

    /** All Dutch review errors for a draft repair prompt, including source/HTML errors. */
    public static function validate(array $data, array $source, bool $generateJsonld, ?int $maxVisibleCharacters = null, bool $viewOwnsTitle = false): array
    {
        $errors = self::validateSourceLinksAndHtml($data, $source);
        $html = is_string($data['description'] ?? null) ? $data['description'] : '';
        $document = self::document($html);
        [$productUrls, $categoryUrls] = self::sourceUrls($source);
        $titles = $document->getElementsByTagName('h1');
        if ($viewOwnsTitle) {
            if ($titles->length !== 0) {
                $errors[] = 'Laat alle <h1>-koppen weg uit description; de categorie-view toont de titel al.';
            }
        } elseif ($titles->length !== 1 || self::nodeText($titles->item(0)) === '') {
            $errors[] = 'Gebruik precies één niet-lege <h1> met uitsluitend de productgroepbenaming.';
        } elseif ($titles->item(0)->getElementsByTagName('*')->length > 0) {
            $errors[] = 'De <h1> mag alleen de productgroepbenaming als platte tekst bevatten, zonder geneste tags.';
        }
        $visible = self::nodeText($document);
        if ($maxVisibleCharacters !== null && mb_strlen($visible, 'UTF-8') > $maxVisibleCharacters) {
            $errors[] = 'description bevat ' . mb_strlen($visible, 'UTF-8') . ' zichtbare tekens; maximaal '
                . $maxVisibleCharacters . ' toegestaan, inclusief alle zichtbare tekst, FAQ en linkteksten.';
        }

        $faq = [];
        $labels = [];
        foreach ($document->getElementsByTagName('p') as $paragraph) {
            $first = self::nextContentNode($paragraph->firstChild);
            if (!$first instanceof DOMElement) {
                continue;
            }
            if (strtolower($first->tagName) === 'strong' && self::nextContentNode($first->nextSibling) === null) {
                $heading = self::nodeText($first);
                if (!$categoryUrls && $heading === 'Wat heb je verder nodig?') {
                    $errors[] = 'Laat de volledige sectie "Wat heb je verder nodig?" weg: er zijn geen bruikbare related_categories[].url aangeleverd.';
                }
                if (!$productUrls && $heading === 'Kijk ook eens') {
                    $errors[] = 'Laat de volledige sectie "Kijk ook eens" weg: er zijn geen bruikbare product- of variantlinks aangeleverd.';
                }
            }
            $label = self::faqIconLabel($first);
            $text = self::nodeText($paragraph);
            if ($label !== null) {
                $question = self::nextContentNode($first->nextSibling);
                if ($label === 'Q' && (!$question instanceof DOMElement || strtolower($question->tagName) !== 'strong'
                    || self::nextContentNode($question->nextSibling) !== null)) {
                    continue;
                }
            } elseif (strtolower($first->tagName) === 'strong' && preg_match('/^([QA]):$/i', self::nodeText($first), $match)) {
                // Older saved drafts remain readable; new output uses the icon contract.
                $label = strtoupper($match[1]);
                $text = preg_replace('/^[QA]:\s*/iu', '', $text);
            } else {
                continue;
            }
            if ($viewOwnsTitle && $label === 'Q' && !in_array('mb-0', preg_split('/\s+/', trim($paragraph->getAttribute('class'))), true)) {
                $errors[] = 'Geef elke FAQ-vraagparagraaf class="mb-0"; laat de antwoordparagraaf ongewijzigd.';
            }
            $labels[] = $label;
            $faq[] = $text;
        }
        $validFaq = $labels === ['Q', 'A', 'Q', 'A', 'Q', 'A', 'Q', 'A', 'Q', 'A'] && !in_array('', $faq, true);
        if (!$validFaq) {
            $errors[] = 'Gebruik precies vijf niet-lege FAQ-paren: <p class="mb-0"><i class="fasl fa-circle-question" aria-hidden="true"></i> <strong>vraag</strong></p> gevolgd door <p><i class="fasl fa-circle-info" aria-hidden="true"></i> antwoord</p>.';
        }
        foreach ($labels as $index => $label) {
            if ($generateJsonld && $label === 'A' && mb_strlen($faq[$index], 'UTF-8') > 300) {
                $errors[] = 'Elk FAQ-antwoord mag maximaal 300 platteteksttekens bevatten.';
            }
        }

        if ($generateJsonld) {
            $schema = $data['seo_jsonld'] ?? null;
            try {
                if (is_string($schema)) { $schema = json_decode($schema, true, 512, JSON_THROW_ON_ERROR); }
                elseif (is_object($schema)) { $schema = json_decode(json_encode($schema, JSON_THROW_ON_ERROR), true, 512, JSON_THROW_ON_ERROR); }
            } catch (Throwable $error) { $schema = null; }
            $entities = is_array($schema) ? ($schema['mainEntity'] ?? null) : null;
            if (!is_array($schema) || ($schema['@type'] ?? '') !== 'FAQPage'
                || ($schema['@context'] ?? '') !== 'https://schema.org' || !is_array($entities)
                || count($entities) !== 5 || array_keys($entities) !== range(0, 4)) {
                $errors[] = 'seo_jsonld moet geldige FAQPage-JSON zijn met @context https://schema.org en precies vijf mainEntity-vragen.';
            } else {
                foreach ($entities as $index => $entity) {
                    $answer = is_array($entity) ? ($entity['acceptedAnswer'] ?? null) : null;
                    if (!is_array($entity) || ($entity['@type'] ?? '') !== 'Question' || !is_string($entity['name'] ?? null)
                        || !is_array($answer) || ($answer['@type'] ?? '') !== 'Answer' || !is_string($answer['text'] ?? null)) {
                        $errors[] = 'Elke JSON-LD-vraag moet een Question met name en een acceptedAnswer van type Answer met text zijn.';
                        continue;
                    }
                    $questionText = self::normalize(self::decode($entity['name']));
                    $answerText = self::normalize(self::decode($answer['text']));
                    if (preg_match('/<\/?[a-z][^>]*>/i', $questionText . $answerText)) {
                        $errors[] = 'Gebruik uitsluitend platte tekst in de JSON-LD-vragen en antwoorden, zonder HTML.';
                    }
                    if ($validFaq && ($questionText !== $faq[$index * 2] || $answerText !== $faq[$index * 2 + 1])) {
                        $errors[] = 'JSON-LD-vraag en antwoord ' . ($index + 1) . ' moeten exact overeenkomen met het zichtbare FAQ-paar, als platte tekst zonder iconen of voorvoegsels.';
                    }
                    if (mb_strlen($answerText, 'UTF-8') > 300) {
                        $errors[] = 'Elk JSON-LD-antwoord mag maximaal 300 platteteksttekens bevatten.';
                    }
                }
            }
        }

        return array_values(array_unique($errors));
    }

    /** The view owns its title; never remove attributes, nested markup or later headings. */
    public static function formatDescriptionForView(string $html): string
    {
        $html = self::formatFaqIcons($html);
        return preg_replace('~\A(\s*)<h1\s*>[^<]*</h1\s*>\s*~iu', '$1', $html, 1) ?? $html;
    }

    /** Format FAQ markers and question spacing without serializing unrelated HTML or URLs. */
    public static function formatFaqIcons(string $html): string
    {
        return preg_replace_callback('~(<p\b(?:[^>"\']|"[^"]*"|\'[^\']*\')*>)(.*?)(</p\s*>)~isu', static function (array $match): string {
            if (preg_match('~^\s*<strong\s*>\s*([QA]):\s*</strong>(.*)$~isu', $match[2], $legacy)) {
                $question = strtoupper($legacy[1]) === 'Q';
                $icon = '<i class="fasl fa-circle-' . ($question ? 'question' : 'info') . '" aria-hidden="true"></i> ';
                $text = ltrim($legacy[2]);
                return ($question ? self::withQuestionClass($match[1]) : $match[1]) . $icon
                    . ($question ? '<strong>' . $text . '</strong>' : $text) . $match[3];
            }
            $paragraph = self::document('<p>' . $match[2] . '</p>')->getElementsByTagName('p')->item(0);
            $first = $paragraph ? self::nextContentNode($paragraph->firstChild) : null;
            if ($first instanceof DOMElement && self::faqIconLabel($first) === 'Q') {
                return self::withQuestionClass($match[1]) . $match[2] . $match[3];
            }
            return $match[0];
        }, $html) ?? $html;
    }

    private static function withQuestionClass(string $opening): string
    {
        $found = false;
        $result = preg_replace_callback('~\s+([^\s=/>]+)(?:\s*=\s*("[^"]*"|\'[^\']*\'|[^\s>]+))?~s', static function (array $attribute) use (&$found): string {
            if ($found || strtolower($attribute[1]) !== 'class') { return $attribute[0]; }
            $found = true;
            if (!isset($attribute[2])) { return $attribute[0] . '="mb-0"'; }
            $raw = $attribute[2];
            $quoted = $raw[0] === '"' || $raw[0] === "'";
            $value = $quoted ? substr($raw, 1, -1) : $raw;
            if (in_array('mb-0', preg_split('/\s+/', trim(self::decode($value))), true)) { return $attribute[0]; }
            $replacement = $quoted ? substr($raw, 0, -1) . ' mb-0' . substr($raw, -1) : '"' . $raw . ' mb-0"';
            return substr($attribute[0], 0, strlen($attribute[0]) - strlen($raw)) . $replacement;
        }, $opening) ?? $opening;
        return $found ? $result : substr($opening, 0, -1) . ' class="mb-0">';
    }

    /** Only these empty, decorative Font Awesome Pro markers are allowed. */
    private static function faqIconLabel(DOMElement $element): ?string
    {
        if (strtolower($element->tagName) !== 'i' || $element->hasChildNodes()
            || $element->attributes->length !== 2 || $element->getAttribute('aria-hidden') !== 'true') {
            return null;
        }
        $classes = preg_split('/\s+/', trim($element->getAttribute('class')));
        if (count($classes) !== 2 || !in_array('fasl', $classes, true)) { return null; }
        if (in_array('fa-circle-question', $classes, true)) { return 'Q'; }
        if (in_array('fa-circle-info', $classes, true)) { return 'A'; }
        return null;
    }

    private static function nextContentNode(?DOMNode $node): ?DOMNode
    {
        while ($node instanceof DOMText && self::normalize($node->nodeValue) === '') { $node = $node->nextSibling; }
        return $node;
    }

    /** Visible Unicode text, with block boundaries and repeated whitespace collapsed. */
    public static function visibleText(string $html): string
    {
        return self::nodeText(self::document($html));
    }

    private static function document(string $html): DOMDocument
    {
        $document = new DOMDocument('1.0', 'UTF-8');
        $previous = libxml_use_internal_errors(true);
        try {
            $document->loadHTML('<?xml encoding="UTF-8"><html><body>' . $html . '</body></html>', LIBXML_NONET);
        } finally {
            libxml_clear_errors();
            libxml_use_internal_errors($previous);
        }
        return $document;
    }

    private static function nodeText(DOMNode $node): string
    {
        return self::normalize(self::textContent($node));
    }

    private static function textContent(DOMNode $node): string
    {
        if ($node instanceof DOMText) { return $node->nodeValue; }
        $tag = $node instanceof DOMElement ? strtolower($node->tagName) : '';
        if (in_array($tag, ['script', 'style', 'template'], true)) { return ''; }
        $text = '';
        foreach ($node->childNodes as $child) { $text .= self::textContent($child); }
        return in_array($tag, ['address', 'article', 'aside', 'blockquote', 'br', 'div', 'dl', 'dt', 'dd', 'footer', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'header', 'hr', 'li', 'main', 'nav', 'ol', 'p', 'pre', 'section', 'table', 'td', 'th', 'tr', 'ul'], true)
            ? ' ' . $text . ' ' : $text;
    }

    private static function normalize(string $text): string
    {
        return trim(preg_replace('/[\s\p{Z}]+/u', ' ', $text));
    }

    private static function decode(string $text): string
    {
        return html_entity_decode($text, ENT_QUOTES | ENT_HTML5, 'UTF-8');
    }
}
