import { $ as props_id, Ft as push, G as if_block, Kt as noop, L as component, Ot as user_derived, Pt as pop, R as snippet, T as attribute_effect, Ut as reset, X as comment, Y as append, Z as from_html, c as spread_props, o as prop, ot as get, s as rest_props, vt as child, yt as first_child } from "./DUscB9kS.js";
import { r as cn } from "./BIEFGHhw.js";
import { d as mergeProps, t as createId, y as boxWith } from "./B4l8ufIa.js";
import { c as MenuContentState, d as MenuMenuState, f as MenuRadioGroupState, h as MenuSubmenuState, l as MenuGroupState, m as MenuSeparatorState, p as MenuRootState, s as DropdownMenuTriggerState, u as MenuItemState, y as Portal } from "./B3A_TfMF.js";
import { t as noop$1 } from "./BoWJNiZV.js";
import { a as getFloatingContentCSSVars, i as Floating_layer, n as Popper_layer, r as Floating_layer_anchor, t as Popper_layer_force_mount } from "./D9qUa032.js";
var root_2$3 = from_html(`<div><!></div>`);
function Menu_item($$anchor, $$props) {
	const uid = props_id();
	push($$props, true);
	let ref = prop($$props, "ref", 15, null), id = prop($$props, "id", 19, () => createId(uid)), disabled = prop($$props, "disabled", 3, false), onSelect = prop($$props, "onSelect", 3, noop$1), closeOnSelect = prop($$props, "closeOnSelect", 3, true), restProps = rest_props($$props, [
		"$$slots",
		"$$events",
		"$$legacy",
		"child",
		"children",
		"ref",
		"id",
		"disabled",
		"onSelect",
		"closeOnSelect"
	]);
	const itemState = MenuItemState.create({
		id: boxWith(() => id()),
		disabled: boxWith(() => disabled()),
		onSelect: boxWith(() => onSelect()),
		ref: boxWith(() => ref(), (v) => ref(v)),
		closeOnSelect: boxWith(() => closeOnSelect())
	});
	const mergedProps = user_derived(() => mergeProps(restProps, itemState.props));
	var fragment = comment();
	var node = first_child(fragment);
	var consequent = ($$anchor$1) => {
		var fragment_1 = comment();
		snippet(first_child(fragment_1), () => $$props.child, () => ({ props: get(mergedProps) }));
		append($$anchor$1, fragment_1);
	};
	var alternate = ($$anchor$1) => {
		var div = root_2$3();
		attribute_effect(div, () => ({ ...get(mergedProps) }));
		snippet(child(div), () => $$props.children ?? noop);
		reset(div);
		append($$anchor$1, div);
	};
	if_block(node, ($$render) => {
		if ($$props.child) $$render(consequent);
		else $$render(alternate, false);
	});
	append($$anchor, fragment);
	pop();
}
var root_2$2 = from_html(`<div><!></div>`);
function Menu_group($$anchor, $$props) {
	const uid = props_id();
	push($$props, true);
	let ref = prop($$props, "ref", 15, null), id = prop($$props, "id", 19, () => createId(uid)), restProps = rest_props($$props, [
		"$$slots",
		"$$events",
		"$$legacy",
		"children",
		"child",
		"ref",
		"id"
	]);
	const groupState = MenuGroupState.create({
		id: boxWith(() => id()),
		ref: boxWith(() => ref(), (v) => ref(v))
	});
	const mergedProps = user_derived(() => mergeProps(restProps, groupState.props));
	var fragment = comment();
	var node = first_child(fragment);
	var consequent = ($$anchor$1) => {
		var fragment_1 = comment();
		snippet(first_child(fragment_1), () => $$props.child, () => ({ props: get(mergedProps) }));
		append($$anchor$1, fragment_1);
	};
	var alternate = ($$anchor$1) => {
		var div = root_2$2();
		attribute_effect(div, () => ({ ...get(mergedProps) }));
		snippet(child(div), () => $$props.children ?? noop);
		reset(div);
		append($$anchor$1, div);
	};
	if_block(node, ($$render) => {
		if ($$props.child) $$render(consequent);
		else $$render(alternate, false);
	});
	append($$anchor, fragment);
	pop();
}
var root_2$1 = from_html(`<div><!></div>`);
function Menu_separator($$anchor, $$props) {
	const uid = props_id();
	push($$props, true);
	let ref = prop($$props, "ref", 15, null), id = prop($$props, "id", 19, () => createId(uid)), restProps = rest_props($$props, [
		"$$slots",
		"$$events",
		"$$legacy",
		"ref",
		"id",
		"child",
		"children"
	]);
	const separatorState = MenuSeparatorState.create({
		id: boxWith(() => id()),
		ref: boxWith(() => ref(), (v) => ref(v))
	});
	const mergedProps = user_derived(() => mergeProps(restProps, separatorState.props));
	var fragment = comment();
	var node = first_child(fragment);
	var consequent = ($$anchor$1) => {
		var fragment_1 = comment();
		snippet(first_child(fragment_1), () => $$props.child, () => ({ props: get(mergedProps) }));
		append($$anchor$1, fragment_1);
	};
	var alternate = ($$anchor$1) => {
		var div = root_2$1();
		attribute_effect(div, () => ({ ...get(mergedProps) }));
		snippet(child(div), () => $$props.children ?? noop);
		reset(div);
		append($$anchor$1, div);
	};
	if_block(node, ($$render) => {
		if ($$props.child) $$render(consequent);
		else $$render(alternate, false);
	});
	append($$anchor, fragment);
	pop();
}
from_html(`<div><!></div>`);
function Menu($$anchor, $$props) {
	push($$props, true);
	let open = prop($$props, "open", 15, false), dir = prop($$props, "dir", 3, "ltr"), onOpenChange = prop($$props, "onOpenChange", 3, noop$1), onOpenChangeComplete = prop($$props, "onOpenChangeComplete", 3, noop$1), variant = prop($$props, "_internal_variant", 3, "dropdown-menu");
	const root$2 = MenuRootState.create({
		variant: boxWith(() => variant()),
		dir: boxWith(() => dir()),
		onClose: () => {
			open(false);
			onOpenChange()(false);
		}
	});
	MenuMenuState.create({
		open: boxWith(() => open(), (v) => {
			open(v);
			onOpenChange()(v);
		}),
		onOpenChangeComplete: boxWith(() => onOpenChangeComplete())
	}, root$2);
	Floating_layer($$anchor, {
		children: ($$anchor$1, $$slotProps) => {
			var fragment_1 = comment();
			snippet(first_child(fragment_1), () => $$props.children ?? noop);
			append($$anchor$1, fragment_1);
		},
		$$slots: { default: true }
	});
	pop();
}
var root_4 = from_html(`<div><div><!></div></div>`);
var root_9 = from_html(`<div><div><!></div></div>`);
function Dropdown_menu_content$1($$anchor, $$props) {
	const uid = props_id();
	push($$props, true);
	let id = prop($$props, "id", 19, () => createId(uid)), ref = prop($$props, "ref", 15, null), loop = prop($$props, "loop", 3, true), onInteractOutside = prop($$props, "onInteractOutside", 3, noop$1), onEscapeKeydown = prop($$props, "onEscapeKeydown", 3, noop$1), onCloseAutoFocus = prop($$props, "onCloseAutoFocus", 3, noop$1), forceMount = prop($$props, "forceMount", 3, false), trapFocus = prop($$props, "trapFocus", 3, false), restProps = rest_props($$props, [
		"$$slots",
		"$$events",
		"$$legacy",
		"id",
		"child",
		"children",
		"ref",
		"loop",
		"onInteractOutside",
		"onEscapeKeydown",
		"onCloseAutoFocus",
		"forceMount",
		"trapFocus"
	]);
	const contentState = MenuContentState.create({
		id: boxWith(() => id()),
		loop: boxWith(() => loop()),
		ref: boxWith(() => ref(), (v) => ref(v)),
		onCloseAutoFocus: boxWith(() => onCloseAutoFocus())
	});
	const mergedProps = user_derived(() => mergeProps(restProps, contentState.props));
	function handleInteractOutside(e) {
		contentState.handleInteractOutside(e);
		if (e.defaultPrevented) return;
		onInteractOutside()(e);
		if (e.defaultPrevented) return;
		if (e.target && e.target instanceof Element) {
			const subContentSelector = `[${contentState.parentMenu.root.getBitsAttr("sub-content")}]`;
			if (e.target.closest(subContentSelector)) return;
		}
		contentState.parentMenu.onClose();
	}
	function handleEscapeKeydown(e) {
		onEscapeKeydown()(e);
		if (e.defaultPrevented) return;
		contentState.parentMenu.onClose();
	}
	var fragment = comment();
	var node = first_child(fragment);
	var consequent_1 = ($$anchor$1) => {
		{
			const popper = ($$anchor$2, $$arg0) => {
				let props = () => $$arg0?.().props;
				let wrapperProps = () => $$arg0?.().wrapperProps;
				const finalProps = user_derived(() => mergeProps(props(), { style: getFloatingContentCSSVars("dropdown-menu") }));
				var fragment_2 = comment();
				var node_1 = first_child(fragment_2);
				var consequent = ($$anchor$3) => {
					var fragment_3 = comment();
					var node_2 = first_child(fragment_3);
					{
						let $0 = user_derived(() => ({
							props: get(finalProps),
							wrapperProps: wrapperProps(),
							...contentState.snippetProps
						}));
						snippet(node_2, () => $$props.child, () => get($0));
					}
					append($$anchor$3, fragment_3);
				};
				var alternate = ($$anchor$3) => {
					var div = root_4();
					attribute_effect(div, () => ({ ...wrapperProps() }));
					var div_1 = child(div);
					attribute_effect(div_1, () => ({ ...get(finalProps) }));
					snippet(child(div_1), () => $$props.children ?? noop);
					reset(div_1);
					reset(div);
					append($$anchor$3, div);
				};
				if_block(node_1, ($$render) => {
					if ($$props.child) $$render(consequent);
					else $$render(alternate, false);
				});
				append($$anchor$2, fragment_2);
			};
			Popper_layer_force_mount($$anchor$1, spread_props(() => get(mergedProps), () => contentState.popperProps, {
				get ref() {
					return contentState.opts.ref;
				},
				get enabled() {
					return contentState.parentMenu.opts.open.current;
				},
				onInteractOutside: handleInteractOutside,
				onEscapeKeydown: handleEscapeKeydown,
				get trapFocus() {
					return trapFocus();
				},
				get loop() {
					return loop();
				},
				forceMount: true,
				get id() {
					return id();
				},
				get shouldRender() {
					return contentState.shouldRender;
				},
				popper,
				$$slots: { popper: true }
			}));
		}
	};
	var alternate_2 = ($$anchor$1) => {
		var fragment_4 = comment();
		var node_4 = first_child(fragment_4);
		var consequent_3 = ($$anchor$2) => {
			{
				const popper = ($$anchor$3, $$arg0) => {
					let props = () => $$arg0?.().props;
					let wrapperProps = () => $$arg0?.().wrapperProps;
					const finalProps = user_derived(() => mergeProps(props(), { style: getFloatingContentCSSVars("dropdown-menu") }));
					var fragment_6 = comment();
					var node_5 = first_child(fragment_6);
					var consequent_2 = ($$anchor$4) => {
						var fragment_7 = comment();
						var node_6 = first_child(fragment_7);
						{
							let $0 = user_derived(() => ({
								props: get(finalProps),
								wrapperProps: wrapperProps(),
								...contentState.snippetProps
							}));
							snippet(node_6, () => $$props.child, () => get($0));
						}
						append($$anchor$4, fragment_7);
					};
					var alternate_1 = ($$anchor$4) => {
						var div_2 = root_9();
						attribute_effect(div_2, () => ({ ...wrapperProps() }));
						var div_3 = child(div_2);
						attribute_effect(div_3, () => ({ ...get(finalProps) }));
						snippet(child(div_3), () => $$props.children ?? noop);
						reset(div_3);
						reset(div_2);
						append($$anchor$4, div_2);
					};
					if_block(node_5, ($$render) => {
						if ($$props.child) $$render(consequent_2);
						else $$render(alternate_1, false);
					});
					append($$anchor$3, fragment_6);
				};
				Popper_layer($$anchor$2, spread_props(() => get(mergedProps), () => contentState.popperProps, {
					get ref() {
						return contentState.opts.ref;
					},
					get open() {
						return contentState.parentMenu.opts.open.current;
					},
					onInteractOutside: handleInteractOutside,
					onEscapeKeydown: handleEscapeKeydown,
					get trapFocus() {
						return trapFocus();
					},
					get loop() {
						return loop();
					},
					forceMount: false,
					get id() {
						return id();
					},
					get shouldRender() {
						return contentState.shouldRender;
					},
					popper,
					$$slots: { popper: true }
				}));
			}
		};
		if_block(node_4, ($$render) => {
			if (!forceMount()) $$render(consequent_3);
		}, true);
		append($$anchor$1, fragment_4);
	};
	if_block(node, ($$render) => {
		if (forceMount()) $$render(consequent_1);
		else $$render(alternate_2, false);
	});
	append($$anchor, fragment);
	pop();
}
var root_3 = from_html(`<button><!></button>`);
function Menu_trigger($$anchor, $$props) {
	const uid = props_id();
	push($$props, true);
	let id = prop($$props, "id", 19, () => createId(uid)), ref = prop($$props, "ref", 15, null), disabled = prop($$props, "disabled", 3, false), type = prop($$props, "type", 3, "button"), restProps = rest_props($$props, [
		"$$slots",
		"$$events",
		"$$legacy",
		"id",
		"ref",
		"child",
		"children",
		"disabled",
		"type"
	]);
	const triggerState = DropdownMenuTriggerState.create({
		id: boxWith(() => id()),
		disabled: boxWith(() => disabled() ?? false),
		ref: boxWith(() => ref(), (v) => ref(v))
	});
	const mergedProps = user_derived(() => mergeProps(restProps, triggerState.props, { type: type() }));
	Floating_layer_anchor($$anchor, {
		get id() {
			return id();
		},
		get ref() {
			return triggerState.opts.ref;
		},
		children: ($$anchor$1, $$slotProps) => {
			var fragment_1 = comment();
			var node = first_child(fragment_1);
			var consequent = ($$anchor$2) => {
				var fragment_2 = comment();
				snippet(first_child(fragment_2), () => $$props.child, () => ({ props: get(mergedProps) }));
				append($$anchor$2, fragment_2);
			};
			var alternate = ($$anchor$2) => {
				var button = root_3();
				attribute_effect(button, () => ({ ...get(mergedProps) }));
				snippet(child(button), () => $$props.children ?? noop);
				reset(button);
				append($$anchor$2, button);
			};
			if_block(node, ($$render) => {
				if ($$props.child) $$render(consequent);
				else $$render(alternate, false);
			});
			append($$anchor$1, fragment_1);
		},
		$$slots: { default: true }
	});
	pop();
}
from_html(`<span class="absolute left-2 flex size-3.5 items-center justify-center"><!></span> <!>`, 1);
function Dropdown_menu_content($$anchor, $$props) {
	push($$props, true);
	let ref = prop($$props, "ref", 15, null), sideOffset = prop($$props, "sideOffset", 3, 4), restProps = rest_props($$props, [
		"$$slots",
		"$$events",
		"$$legacy",
		"ref",
		"sideOffset",
		"portalProps",
		"class"
	]);
	var fragment = comment();
	component(first_child(fragment), () => Portal, ($$anchor$1, DropdownMenuPrimitive_Portal) => {
		DropdownMenuPrimitive_Portal($$anchor$1, spread_props(() => $$props.portalProps, {
			children: ($$anchor$2, $$slotProps) => {
				var fragment_1 = comment();
				var node_1 = first_child(fragment_1);
				{
					let $0 = user_derived(() => cn("bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[8rem] overflow-hidden rounded-md border p-1 shadow-md outline-none", $$props.class));
					component(node_1, () => Dropdown_menu_content$1, ($$anchor$3, DropdownMenuPrimitive_Content) => {
						DropdownMenuPrimitive_Content($$anchor$3, spread_props({
							get sideOffset() {
								return sideOffset();
							},
							get class() {
								return get($0);
							}
						}, () => restProps, {
							get ref() {
								return ref();
							},
							set ref($$value) {
								ref($$value);
							}
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
function Dropdown_menu_item($$anchor, $$props) {
	push($$props, true);
	let ref = prop($$props, "ref", 15, null), restProps = rest_props($$props, [
		"$$slots",
		"$$events",
		"$$legacy",
		"ref",
		"class",
		"inset"
	]);
	var fragment = comment();
	var node = first_child(fragment);
	{
		let $0 = user_derived(() => cn("data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", $$props.inset && "pl-8", $$props.class));
		component(node, () => Menu_item, ($$anchor$1, DropdownMenuPrimitive_Item) => {
			DropdownMenuPrimitive_Item($$anchor$1, spread_props({ get class() {
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
from_html(`<div><!></div>`);
from_html(`<span class="absolute left-2 flex size-3.5 items-center justify-center"><!></span> <!>`, 1);
function Dropdown_menu_separator($$anchor, $$props) {
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
		let $0 = user_derived(() => cn("bg-muted -mx-1 my-1 h-px", $$props.class));
		component(node, () => Menu_separator, ($$anchor$1, DropdownMenuPrimitive_Separator) => {
			DropdownMenuPrimitive_Separator($$anchor$1, spread_props({ get class() {
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
from_html(`<span><!></span>`);
from_html(`<!> <!>`, 1);
var Root = Menu;
var Trigger = Menu_trigger;
var Group = Menu_group;
export { Dropdown_menu_item as a, Dropdown_menu_separator as i, Root as n, Dropdown_menu_content as o, Trigger as r, Group as t };
