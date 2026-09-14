import { Ft as push, Kt as noop, Pt as pop, R as snippet, T as attribute_effect, Ut as reset, Y as append, Z as from_html, b as bind_this, o as prop, s as rest_props, vt as child } from "./DUscB9kS.js";
import { i as tv, r as cn } from "./BIEFGHhw.js";
const alertVariants = tv({
	base: "[&>svg]:text-foreground relative w-full rounded-lg border p-4 [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg~*]:pl-7",
	variants: { variant: {
		default: "bg-background text-foreground",
		info: "bg-cyan-500/5 border-cyan-500/50 text-cyan-500 dark:border-cyan-500 [&>svg]:text-cyan-500",
		warning: "bg-amber-300/5 border-amber-300/50 text-yellow-700 dark:border-amber-300 [&>svg]:yellow-700",
		success: "bg-green-500/5 border-green-500/50 text-green-500 dark:border-green-500 [&>svg]:text-green-500",
		destructive: "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive"
	} },
	defaultVariants: { variant: "default" }
});
var root$2 = from_html(`<div><!></div>`);
function Alert($$anchor, $$props) {
	push($$props, true);
	let ref = prop($$props, "ref", 15, null), variant = prop($$props, "variant", 3, "default"), restProps = rest_props($$props, [
		"$$slots",
		"$$events",
		"$$legacy",
		"ref",
		"class",
		"variant",
		"children"
	]);
	var div = root$2();
	attribute_effect(div, ($0) => ({
		class: $0,
		...restProps,
		role: "alert"
	}), [() => cn(alertVariants({ variant: variant() }), $$props.class)]);
	snippet(child(div), () => $$props.children ?? noop);
	reset(div);
	bind_this(div, ($$value) => ref($$value), () => ref());
	append($$anchor, div);
	pop();
}
var root$1 = from_html(`<div><!></div>`);
function Alert_description($$anchor, $$props) {
	push($$props, true);
	let ref = prop($$props, "ref", 15, null), restProps = rest_props($$props, [
		"$$slots",
		"$$events",
		"$$legacy",
		"ref",
		"class",
		"children"
	]);
	var div = root$1();
	attribute_effect(div, ($0) => ({
		class: $0,
		...restProps
	}), [() => cn("text-sm [&_p]:leading-relaxed", $$props.class)]);
	snippet(child(div), () => $$props.children ?? noop);
	reset(div);
	bind_this(div, ($$value) => ref($$value), () => ref());
	append($$anchor, div);
	pop();
}
var root = from_html(`<div><!></div>`);
function Alert_title($$anchor, $$props) {
	push($$props, true);
	let ref = prop($$props, "ref", 15, null), level = prop($$props, "level", 3, 5), restProps = rest_props($$props, [
		"$$slots",
		"$$events",
		"$$legacy",
		"ref",
		"class",
		"level",
		"children"
	]);
	var div = root();
	attribute_effect(div, ($0) => ({
		role: "heading",
		"aria-level": level(),
		class: $0,
		...restProps
	}), [() => cn("mb-1 font-medium leading-none tracking-tight", $$props.class)]);
	snippet(child(div), () => $$props.children ?? noop);
	reset(div);
	bind_this(div, ($$value) => ref($$value), () => ref());
	append($$anchor, div);
	pop();
}
export { Alert_description as n, Alert as r, Alert_title as t };
