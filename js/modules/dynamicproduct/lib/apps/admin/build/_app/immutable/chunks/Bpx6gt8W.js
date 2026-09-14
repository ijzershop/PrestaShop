import { Ft as push, Kt as noop, Pt as pop, R as snippet, T as attribute_effect, Ut as reset, Y as append, Z as from_html, b as bind_this, o as prop, s as rest_props, vt as child } from "./DUscB9kS.js";
import { r as cn } from "./BIEFGHhw.js";
var root$5 = from_html(`<div><!></div>`);
function Card($$anchor, $$props) {
	push($$props, true);
	let ref = prop($$props, "ref", 15, null), restProps = rest_props($$props, [
		"$$slots",
		"$$events",
		"$$legacy",
		"ref",
		"class",
		"children"
	]);
	var div = root$5();
	attribute_effect(div, ($0) => ({
		class: $0,
		...restProps
	}), [() => cn("bg-card text-card-foreground rounded-lg border shadow-sm", $$props.class)]);
	snippet(child(div), () => $$props.children ?? noop);
	reset(div);
	bind_this(div, ($$value) => ref($$value), () => ref());
	append($$anchor, div);
	pop();
}
var root$4 = from_html(`<div><!></div>`);
function Card_content($$anchor, $$props) {
	push($$props, true);
	let ref = prop($$props, "ref", 15, null), restProps = rest_props($$props, [
		"$$slots",
		"$$events",
		"$$legacy",
		"ref",
		"class",
		"children"
	]);
	var div = root$4();
	attribute_effect(div, ($0) => ({
		class: $0,
		...restProps
	}), [() => cn("p-6", $$props.class)]);
	snippet(child(div), () => $$props.children ?? noop);
	reset(div);
	bind_this(div, ($$value) => ref($$value), () => ref());
	append($$anchor, div);
	pop();
}
var root$3 = from_html(`<p><!></p>`);
function Card_description($$anchor, $$props) {
	push($$props, true);
	let ref = prop($$props, "ref", 15, null), restProps = rest_props($$props, [
		"$$slots",
		"$$events",
		"$$legacy",
		"ref",
		"class",
		"children"
	]);
	var p = root$3();
	attribute_effect(p, ($0) => ({
		class: $0,
		...restProps
	}), [() => cn("text-muted-foreground text-sm", $$props.class)]);
	snippet(child(p), () => $$props.children ?? noop);
	reset(p);
	bind_this(p, ($$value) => ref($$value), () => ref());
	append($$anchor, p);
	pop();
}
var root$2 = from_html(`<div><!></div>`);
function Card_footer($$anchor, $$props) {
	push($$props, true);
	let ref = prop($$props, "ref", 15, null), restProps = rest_props($$props, [
		"$$slots",
		"$$events",
		"$$legacy",
		"ref",
		"class",
		"children"
	]);
	var div = root$2();
	attribute_effect(div, ($0) => ({
		class: $0,
		...restProps
	}), [() => cn("flex items-center p-6 pt-0", $$props.class)]);
	snippet(child(div), () => $$props.children ?? noop);
	reset(div);
	bind_this(div, ($$value) => ref($$value), () => ref());
	append($$anchor, div);
	pop();
}
var root$1 = from_html(`<div><!></div>`);
function Card_header($$anchor, $$props) {
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
	}), [() => cn("flex flex-col space-y-1.5 p-6 pb-0", $$props.class)]);
	snippet(child(div), () => $$props.children ?? noop);
	reset(div);
	bind_this(div, ($$value) => ref($$value), () => ref());
	append($$anchor, div);
	pop();
}
var root = from_html(`<div><!></div>`);
function Card_title($$anchor, $$props) {
	push($$props, true);
	let ref = prop($$props, "ref", 15, null), level = prop($$props, "level", 3, 3), restProps = rest_props($$props, [
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
	}), [() => cn("text-2xl font-semibold leading-none tracking-tight", $$props.class)]);
	snippet(child(div), () => $$props.children ?? noop);
	reset(div);
	bind_this(div, ($$value) => ref($$value), () => ref());
	append($$anchor, div);
	pop();
}
export { Card_content as a, Card_description as i, Card_header as n, Card as o, Card_footer as r, Card_title as t };
