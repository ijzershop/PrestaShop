import { Ft as push, Ht as next, Kt as noop, L as component, Ot as user_derived, Pt as pop, R as snippet, T as attribute_effect, Ut as reset, X as comment, Y as append, Z as from_html, b as bind_this, bt as sibling, c as spread_props, o as prop, ot as get, s as rest_props, vt as child, yt as first_child } from "./DUscB9kS.js";
import { r as cn } from "./BIEFGHhw.js";
import { y as Portal$1 } from "./B3A_TfMF.js";
import { a as Dialog, c as Dialog_overlay$1, i as Dialog_close, l as Dialog_title$1, o as Dialog_description$1, r as Dialog_content$1, s as Dialog_trigger, t as X } from "./CWOYbKTQ.js";
function Dialog_title($$anchor, $$props) {
	push($$props, true);
	let ref = prop($$props, "ref", 15, null), restProps = rest_props($$props, [
		"$$slots",
		"$$events",
		"$$legacy",
		"ref",
		"class"
	]);
	var fragment = comment();
	var node = first_child(fragment);
	{
		let $0 = user_derived(() => cn("text-lg font-semibold leading-none tracking-tight", $$props.class));
		component(node, () => Dialog_title$1, ($$anchor$1, DialogPrimitive_Title) => {
			DialogPrimitive_Title($$anchor$1, spread_props({ get class() {
				return get($0);
			} }, () => restProps, {
				get ref() {
					return ref();
				},
				set ref($$value) {
					ref($$value);
				}
			}));
		});
	}
	append($$anchor, fragment);
	pop();
}
var root$1 = from_html(`<div><!></div>`);
function Dialog_footer($$anchor, $$props) {
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
	}), [() => cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", $$props.class)]);
	snippet(child(div), () => $$props.children ?? noop);
	reset(div);
	bind_this(div, ($$value) => ref($$value), () => ref());
	append($$anchor, div);
	pop();
}
var root = from_html(`<div><!></div>`);
function Dialog_header($$anchor, $$props) {
	push($$props, true);
	let ref = prop($$props, "ref", 15, null), restProps = rest_props($$props, [
		"$$slots",
		"$$events",
		"$$legacy",
		"ref",
		"class",
		"children"
	]);
	var div = root();
	attribute_effect(div, ($0) => ({
		class: $0,
		...restProps
	}), [() => cn("flex flex-col space-y-1.5 text-center sm:text-left", $$props.class)]);
	snippet(child(div), () => $$props.children ?? noop);
	reset(div);
	bind_this(div, ($$value) => ref($$value), () => ref());
	append($$anchor, div);
	pop();
}
function Dialog_overlay($$anchor, $$props) {
	push($$props, true);
	let ref = prop($$props, "ref", 15, null), restProps = rest_props($$props, [
		"$$slots",
		"$$events",
		"$$legacy",
		"ref",
		"class"
	]);
	var fragment = comment();
	var node = first_child(fragment);
	{
		let $0 = user_derived(() => cn("data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/80", $$props.class));
		component(node, () => Dialog_overlay$1, ($$anchor$1, DialogPrimitive_Overlay) => {
			DialogPrimitive_Overlay($$anchor$1, spread_props({ get class() {
				return get($0);
			} }, () => restProps, {
				get ref() {
					return ref();
				},
				set ref($$value) {
					ref($$value);
				}
			}));
		});
	}
	append($$anchor, fragment);
	pop();
}
var root_3 = from_html(`<!> <span class="sr-only">Close</span>`, 1);
var root_2 = from_html(`<!> <!>`, 1);
var root_1 = from_html(`<!> <!>`, 1);
function Dialog_content($$anchor, $$props) {
	push($$props, true);
	let ref = prop($$props, "ref", 15, null), restProps = rest_props($$props, [
		"$$slots",
		"$$events",
		"$$legacy",
		"ref",
		"class",
		"portalProps",
		"children"
	]);
	var fragment = comment();
	component(first_child(fragment), () => Portal, ($$anchor$1, Dialog_Portal) => {
		Dialog_Portal($$anchor$1, spread_props(() => $$props.portalProps, {
			children: ($$anchor$2, $$slotProps) => {
				var fragment_1 = root_1();
				var node_1 = first_child(fragment_1);
				component(node_1, () => Dialog_overlay, ($$anchor$3, Dialog_Overlay) => {
					Dialog_Overlay($$anchor$3, {});
				});
				var node_2 = sibling(node_1, 2);
				{
					let $0 = user_derived(() => cn("max-h-[calc(95vh)] overflow-auto", "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 bg-background fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border p-6 shadow-lg duration-200 sm:rounded-lg", $$props.class));
					component(node_2, () => Dialog_content$1, ($$anchor$3, DialogPrimitive_Content) => {
						DialogPrimitive_Content($$anchor$3, spread_props({ get class() {
							return get($0);
						} }, () => restProps, {
							get ref() {
								return ref();
							},
							set ref($$value) {
								ref($$value);
							},
							children: ($$anchor$4, $$slotProps$1) => {
								var fragment_2 = root_2();
								var node_3 = first_child(fragment_2);
								snippet(node_3, () => $$props.children ?? noop);
								component(sibling(node_3, 2), () => Dialog_close, ($$anchor$5, DialogPrimitive_Close) => {
									DialogPrimitive_Close($$anchor$5, {
										class: "ring-offset-background focus:ring-ring absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none",
										children: ($$anchor$6, $$slotProps$2) => {
											var fragment_3 = root_3();
											X(first_child(fragment_3), { class: "size-4" });
											next(2);
											append($$anchor$6, fragment_3);
										},
										$$slots: { default: true }
									});
								});
								append($$anchor$4, fragment_2);
							},
							$$slots: { default: true }
						}));
					});
				}
				append($$anchor$2, fragment_1);
			},
			$$slots: { default: true }
		}));
	});
	append($$anchor, fragment);
	pop();
}
function Dialog_description($$anchor, $$props) {
	push($$props, true);
	let ref = prop($$props, "ref", 15, null), restProps = rest_props($$props, [
		"$$slots",
		"$$events",
		"$$legacy",
		"ref",
		"class"
	]);
	var fragment = comment();
	var node = first_child(fragment);
	{
		let $0 = user_derived(() => cn("text-muted-foreground text-sm", $$props.class));
		component(node, () => Dialog_description$1, ($$anchor$1, DialogPrimitive_Description) => {
			DialogPrimitive_Description($$anchor$1, spread_props({ get class() {
				return get($0);
			} }, () => restProps, {
				get ref() {
					return ref();
				},
				set ref($$value) {
					ref($$value);
				}
			}));
		});
	}
	append($$anchor, fragment);
	pop();
}
var Root = Dialog;
var Trigger = Dialog_trigger;
var Close = Dialog_close;
var Portal = Portal$1;
export { Dialog_content as a, Dialog_title as c, Dialog_description as i, Root as n, Dialog_header as o, Trigger as r, Dialog_footer as s, Close as t };
