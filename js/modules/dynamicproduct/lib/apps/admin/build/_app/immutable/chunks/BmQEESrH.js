import { F as element, Ft as push, Kt as noop, Pt as pop, R as snippet, T as attribute_effect, X as comment, Y as append, b as bind_this, o as prop, s as rest_props, yt as first_child } from "./DUscB9kS.js";
import { i as tv, r as cn } from "./BIEFGHhw.js";
const badgeVariants = tv({
	base: "focus:ring-ring inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2",
	variants: { variant: {
		default: "bg-primary text-primary-foreground hover:bg-primary/80 border-transparent",
		secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 border-transparent",
		destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/80 border-transparent",
		outline: "text-foreground"
	} },
	defaultVariants: { variant: "default" }
});
function Badge($$anchor, $$props) {
	push($$props, true);
	let ref = prop($$props, "ref", 15, null), variant = prop($$props, "variant", 3, "default"), restProps = rest_props($$props, [
		"$$slots",
		"$$events",
		"$$legacy",
		"ref",
		"href",
		"class",
		"variant",
		"children"
	]);
	var fragment = comment();
	element(first_child(fragment), () => $$props.href ? "a" : "span", false, ($$element, $$anchor$1) => {
		bind_this($$element, ($$value) => ref($$value), () => ref());
		attribute_effect($$element, ($0) => ({
			href: $$props.href,
			class: $0,
			...restProps
		}), [() => cn(badgeVariants({ variant: variant() }), $$props.class)]);
		var fragment_1 = comment();
		snippet(first_child(fragment_1), () => $$props.children ?? noop);
		append($$anchor$1, fragment_1);
	});
	append($$anchor, fragment);
	pop();
}
export { Badge as t };
