import { Ft as push, Ht as next, Kt as noop, L as component, Ot as user_derived, Pt as pop, R as snippet, T as attribute_effect, Ut as reset, X as comment, Y as append, Z as from_html, b as bind_this, bt as sibling, c as spread_props, o as prop, ot as get, s as rest_props, vt as child, yt as first_child } from "./DUscB9kS.js";
import { i as tv, r as cn } from "./BIEFGHhw.js";
import { y as Portal$1 } from "./B3A_TfMF.js";
import { a as Dialog, c as Dialog_overlay, i as Dialog_close, l as Dialog_title, o as Dialog_description, r as Dialog_content, s as Dialog_trigger, t as X } from "./CWOYbKTQ.js";
function Sheet_overlay($$anchor, $$props) {
	push($$props, true);
	let ref = prop($$props, "ref", 15, null), className = prop($$props, "class", 7), restProps = rest_props($$props, [
		"$$slots",
		"$$events",
		"$$legacy",
		"ref",
		"class"
	]);
	var $$exports = {
		get class() {
			return className();
		},
		set class($$value) {
			className($$value);
		}
	};
	var fragment = comment();
	var node = first_child(fragment);
	{
		let $0 = user_derived(() => cn("data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0  fixed inset-0 z-50 bg-black/80", className()));
		component(node, () => Dialog_overlay, ($$anchor$1, SheetPrimitive_Overlay) => {
			SheetPrimitive_Overlay($$anchor$1, spread_props({ get class() {
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
	return pop($$exports);
}
const sheetVariants = tv({
	base: "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out fixed z-50 gap-4 p-6 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
	variants: { side: {
		top: "data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top inset-x-0 top-0 border-b",
		bottom: "data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom inset-x-0 bottom-0 border-t",
		left: "data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm",
		right: "data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm"
	} },
	defaultVariants: { side: "right" }
});
var root_3 = from_html(`<!> <span class="sr-only">Close</span>`, 1);
var root_2 = from_html(`<!> <!>`, 1);
var root_1 = from_html(`<!> <!>`, 1);
function Sheet_content($$anchor, $$props) {
	push($$props, true);
	let ref = prop($$props, "ref", 15, null), side = prop($$props, "side", 3, "right"), restProps = rest_props($$props, [
		"$$slots",
		"$$events",
		"$$legacy",
		"ref",
		"class",
		"side",
		"portalProps",
		"children"
	]);
	var fragment = comment();
	component(first_child(fragment), () => Portal$1, ($$anchor$1, SheetPrimitive_Portal) => {
		SheetPrimitive_Portal($$anchor$1, spread_props(() => $$props.portalProps, {
			children: ($$anchor$2, $$slotProps) => {
				var fragment_1 = root_1();
				var node_1 = first_child(fragment_1);
				Sheet_overlay(node_1, {});
				var node_2 = sibling(node_1, 2);
				{
					let $0 = user_derived(() => cn(sheetVariants({ side: side() }), $$props.class));
					component(node_2, () => Dialog_content, ($$anchor$3, SheetPrimitive_Content) => {
						SheetPrimitive_Content($$anchor$3, spread_props({ get class() {
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
								component(sibling(node_3, 2), () => Dialog_close, ($$anchor$5, SheetPrimitive_Close) => {
									SheetPrimitive_Close($$anchor$5, {
										class: "ring-offset-background focus:ring-ring data-[state=open]:bg-secondary absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none",
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
var root$1 = from_html(`<div><!></div>`);
function Sheet_header($$anchor, $$props) {
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
	}), [() => cn("flex flex-col space-y-2 text-center sm:text-left", $$props.class)]);
	snippet(child(div), () => $$props.children ?? noop);
	reset(div);
	bind_this(div, ($$value) => ref($$value), () => ref());
	append($$anchor, div);
	pop();
}
var root = from_html(`<div><!></div>`);
function Sheet_footer($$anchor, $$props) {
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
	}), [() => cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", $$props.class)]);
	snippet(child(div), () => $$props.children ?? noop);
	reset(div);
	bind_this(div, ($$value) => ref($$value), () => ref());
	append($$anchor, div);
	pop();
}
function Sheet_title($$anchor, $$props) {
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
		let $0 = user_derived(() => cn("text-foreground text-lg font-semibold", $$props.class));
		component(node, () => Dialog_title, ($$anchor$1, SheetPrimitive_Title) => {
			SheetPrimitive_Title($$anchor$1, spread_props({ get class() {
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
function Sheet_description($$anchor, $$props) {
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
		component(node, () => Dialog_description, ($$anchor$1, SheetPrimitive_Description) => {
			SheetPrimitive_Description($$anchor$1, spread_props({ get class() {
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
export { Sheet_header as a, Sheet_footer as i, Sheet_description as n, Sheet_content as o, Sheet_title as r, Root as t };
