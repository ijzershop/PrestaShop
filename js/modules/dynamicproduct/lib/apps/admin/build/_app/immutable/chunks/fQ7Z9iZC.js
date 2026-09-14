import { Ft as push, Kt as noop, Pt as pop, R as snippet, T as attribute_effect, Ut as reset, Y as append, Z as from_html, b as bind_this, o as prop, s as rest_props, vt as child } from "./DUscB9kS.js";
import { r as cn } from "./BIEFGHhw.js";
var root$7 = from_html(`<div class="relative w-full overflow-auto"><table><!></table></div>`);
function Table($$anchor, $$props) {
	push($$props, true);
	let ref = prop($$props, "ref", 15, null), restProps = rest_props($$props, [
		"$$slots",
		"$$events",
		"$$legacy",
		"ref",
		"class",
		"children"
	]);
	var div = root$7();
	var table = child(div);
	attribute_effect(table, ($0) => ({
		class: $0,
		...restProps
	}), [() => cn("w-full caption-bottom text-sm", $$props.class)]);
	snippet(child(table), () => $$props.children ?? noop);
	reset(table);
	bind_this(table, ($$value) => ref($$value), () => ref());
	reset(div);
	append($$anchor, div);
	pop();
}
var root$6 = from_html(`<tbody><!></tbody>`);
function Table_body($$anchor, $$props) {
	push($$props, true);
	let ref = prop($$props, "ref", 15, null), restProps = rest_props($$props, [
		"$$slots",
		"$$events",
		"$$legacy",
		"ref",
		"class",
		"children"
	]);
	var tbody = root$6();
	attribute_effect(tbody, ($0) => ({
		class: $0,
		...restProps
	}), [() => cn("[&_tr:last-child]:border-0", $$props.class)]);
	snippet(child(tbody), () => $$props.children ?? noop);
	reset(tbody);
	bind_this(tbody, ($$value) => ref($$value), () => ref());
	append($$anchor, tbody);
	pop();
}
from_html(`<caption><!></caption>`);
var root$4 = from_html(`<td><!></td>`);
function Table_cell($$anchor, $$props) {
	push($$props, true);
	let ref = prop($$props, "ref", 15, null), restProps = rest_props($$props, [
		"$$slots",
		"$$events",
		"$$legacy",
		"ref",
		"class",
		"children"
	]);
	var td = root$4();
	attribute_effect(td, ($0) => ({
		class: $0,
		...restProps
	}), [() => cn("p-1 align-middle [&:has([role=checkbox])]:pr-0", $$props.class)]);
	snippet(child(td), () => $$props.children ?? noop);
	reset(td);
	bind_this(td, ($$value) => ref($$value), () => ref());
	append($$anchor, td);
	pop();
}
var root$3 = from_html(`<tfoot><!></tfoot>`);
function Table_footer($$anchor, $$props) {
	push($$props, true);
	let ref = prop($$props, "ref", 15, null), restProps = rest_props($$props, [
		"$$slots",
		"$$events",
		"$$legacy",
		"ref",
		"class",
		"children"
	]);
	var tfoot = root$3();
	attribute_effect(tfoot, ($0) => ({
		class: $0,
		...restProps
	}), [() => cn("bg-muted/50 font-medium", $$props.class)]);
	snippet(child(tfoot), () => $$props.children ?? noop);
	reset(tfoot);
	bind_this(tfoot, ($$value) => ref($$value), () => ref());
	append($$anchor, tfoot);
	pop();
}
var root$2 = from_html(`<th><!></th>`);
function Table_head($$anchor, $$props) {
	push($$props, true);
	let ref = prop($$props, "ref", 15, null), restProps = rest_props($$props, [
		"$$slots",
		"$$events",
		"$$legacy",
		"ref",
		"class",
		"children"
	]);
	var th = root$2();
	attribute_effect(th, ($0) => ({
		class: $0,
		...restProps
	}), [() => cn("text-muted-foreground h-12 px-4 text-left align-middle font-medium [&:has([role=checkbox])]:pr-0", $$props.class)]);
	snippet(child(th), () => $$props.children ?? noop);
	reset(th);
	bind_this(th, ($$value) => ref($$value), () => ref());
	append($$anchor, th);
	pop();
}
var root$1 = from_html(`<thead><!></thead>`);
function Table_header($$anchor, $$props) {
	push($$props, true);
	let ref = prop($$props, "ref", 15, null), restProps = rest_props($$props, [
		"$$slots",
		"$$events",
		"$$legacy",
		"ref",
		"class",
		"children"
	]);
	var thead = root$1();
	attribute_effect(thead, ($0) => ({
		class: $0,
		...restProps
	}), [() => cn("[&_tr]:border-b", $$props.class)]);
	snippet(child(thead), () => $$props.children ?? noop);
	reset(thead);
	bind_this(thead, ($$value) => ref($$value), () => ref());
	append($$anchor, thead);
	pop();
}
var root = from_html(`<tr><!></tr>`);
function Table_row($$anchor, $$props) {
	push($$props, true);
	let ref = prop($$props, "ref", 15, null), restProps = rest_props($$props, [
		"$$slots",
		"$$events",
		"$$legacy",
		"ref",
		"class",
		"children"
	]);
	var tr = root();
	attribute_effect(tr, ($0) => ({
		class: $0,
		...restProps
	}), [() => cn("hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors", $$props.class)]);
	snippet(child(tr), () => $$props.children ?? noop);
	reset(tr);
	bind_this(tr, ($$value) => ref($$value), () => ref());
	append($$anchor, tr);
	pop();
}
export { Table_cell as a, Table_footer as i, Table_header as n, Table_body as o, Table_head as r, Table as s, Table_row as t };
