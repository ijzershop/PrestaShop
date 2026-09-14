import { $ as props_id, Ct as set, Dt as derived_safe_equal, Ft as push, G as if_block, Kt as noop, L as component, Ot as user_derived, Pt as pop, R as snippet, T as attribute_effect, Tt as state, Ut as reset, X as comment, Y as append, Z as from_html, bt as sibling, c as spread_props, o as prop, ot as get, pt as template_effect, q as set_text, s as rest_props, v as init, vt as child, xt as proxy, yt as first_child } from "./DUscB9kS.js";
import { n as buttonVariants, r as cn } from "./BIEFGHhw.js";
import { n as SvelteMap } from "./CJDS8lnd.js";
import { a as modeStorageKey, n as resetMode, r as setMode } from "./zHexzNNA.js";
import { a as boolToTrueOrUndef, d as mergeProps, n as boolToEmptyStrOrUndef, o as createBitsAttrs, t as createId, u as attachRef, y as boxWith } from "./B4l8ufIa.js";
import { n as _, t as Icon } from "./DFl6Gq92.js";
import { x as RovingFocusGroup } from "./B3A_TfMF.js";
import { R as watch, z as Context } from "./_yKPJ4BA.js";
import { t as noop$1 } from "./BoWJNiZV.js";
import { a as Dropdown_menu_item, n as Root$1, o as Dropdown_menu_content, r as Trigger } from "./T79hDoyY.js";
var tabsAttrs = createBitsAttrs({
	component: "tabs",
	parts: [
		"root",
		"list",
		"trigger",
		"content"
	]
});
var TabsRootContext = new Context("Tabs.Root");
var TabsRootState = class TabsRootState {
	static create(opts) {
		return TabsRootContext.set(new TabsRootState(opts));
	}
	opts;
	attachment;
	rovingFocusGroup;
	#triggerIds = state(proxy([]));
	get triggerIds() {
		return get(this.#triggerIds);
	}
	set triggerIds(value) {
		set(this.#triggerIds, value, true);
	}
	valueToTriggerId = new SvelteMap();
	valueToContentId = new SvelteMap();
	constructor(opts) {
		this.opts = opts;
		this.attachment = attachRef(opts.ref);
		this.rovingFocusGroup = new RovingFocusGroup({
			candidateAttr: tabsAttrs.trigger,
			rootNode: this.opts.ref,
			loop: this.opts.loop,
			orientation: this.opts.orientation
		});
	}
	registerTrigger(id, value) {
		this.triggerIds.push(id);
		this.valueToTriggerId.set(value, id);
		return () => {
			this.triggerIds = this.triggerIds.filter((triggerId) => triggerId !== id);
			this.valueToTriggerId.delete(value);
		};
	}
	registerContent(id, value) {
		this.valueToContentId.set(value, id);
		return () => {
			this.valueToContentId.delete(value);
		};
	}
	setValue(v) {
		this.opts.value.current = v;
	}
	#props = user_derived(() => ({
		id: this.opts.id.current,
		"data-orientation": this.opts.orientation.current,
		[tabsAttrs.root]: "",
		...this.attachment
	}));
	get props() {
		return get(this.#props);
	}
	set props(value) {
		set(this.#props, value);
	}
};
var TabsListState = class TabsListState {
	static create(opts) {
		return new TabsListState(opts, TabsRootContext.get());
	}
	opts;
	root;
	attachment;
	#isDisabled = user_derived(() => this.root.opts.disabled.current);
	constructor(opts, root) {
		this.opts = opts;
		this.root = root;
		this.attachment = attachRef(opts.ref);
	}
	#props = user_derived(() => ({
		id: this.opts.id.current,
		role: "tablist",
		"aria-orientation": this.root.opts.orientation.current,
		"data-orientation": this.root.opts.orientation.current,
		[tabsAttrs.list]: "",
		"data-disabled": boolToEmptyStrOrUndef(get(this.#isDisabled)),
		...this.attachment
	}));
	get props() {
		return get(this.#props);
	}
	set props(value) {
		set(this.#props, value);
	}
};
var TabsContentState = class TabsContentState {
	static create(opts) {
		return new TabsContentState(opts, TabsRootContext.get());
	}
	opts;
	root;
	attachment;
	#isActive = user_derived(() => this.root.opts.value.current === this.opts.value.current);
	#ariaLabelledBy = user_derived(() => this.root.valueToTriggerId.get(this.opts.value.current));
	constructor(opts, root) {
		this.opts = opts;
		this.root = root;
		this.attachment = attachRef(opts.ref);
		watch([() => this.opts.id.current, () => this.opts.value.current], ([id, value]) => {
			return this.root.registerContent(id, value);
		});
	}
	#props = user_derived(() => ({
		id: this.opts.id.current,
		role: "tabpanel",
		hidden: boolToTrueOrUndef(!get(this.#isActive)),
		tabindex: 0,
		"data-value": this.opts.value.current,
		"data-state": getTabDataState(get(this.#isActive)),
		"aria-labelledby": get(this.#ariaLabelledBy),
		"data-orientation": this.root.opts.orientation.current,
		[tabsAttrs.content]: "",
		...this.attachment
	}));
	get props() {
		return get(this.#props);
	}
	set props(value) {
		set(this.#props, value);
	}
};
function getTabDataState(condition) {
	return condition ? "active" : "inactive";
}
var root_2$3 = from_html(`<div><!></div>`);
function Tabs($$anchor, $$props) {
	const uid = props_id();
	push($$props, true);
	let id = prop($$props, "id", 19, () => createId(uid)), ref = prop($$props, "ref", 15, null), value = prop($$props, "value", 15, ""), onValueChange = prop($$props, "onValueChange", 3, noop$1), orientation = prop($$props, "orientation", 3, "horizontal"), loop = prop($$props, "loop", 3, true), activationMode = prop($$props, "activationMode", 3, "automatic"), disabled = prop($$props, "disabled", 3, false), restProps = rest_props($$props, [
		"$$slots",
		"$$events",
		"$$legacy",
		"id",
		"ref",
		"value",
		"onValueChange",
		"orientation",
		"loop",
		"activationMode",
		"disabled",
		"children",
		"child"
	]);
	const rootState = TabsRootState.create({
		id: boxWith(() => id()),
		value: boxWith(() => value(), (v) => {
			value(v);
			onValueChange()(v);
		}),
		orientation: boxWith(() => orientation()),
		loop: boxWith(() => loop()),
		activationMode: boxWith(() => activationMode()),
		disabled: boxWith(() => disabled()),
		ref: boxWith(() => ref(), (v) => ref(v))
	});
	const mergedProps = user_derived(() => mergeProps(restProps, rootState.props));
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
function Tabs_content$1($$anchor, $$props) {
	const uid = props_id();
	push($$props, true);
	let id = prop($$props, "id", 19, () => createId(uid)), ref = prop($$props, "ref", 15, null), restProps = rest_props($$props, [
		"$$slots",
		"$$events",
		"$$legacy",
		"children",
		"child",
		"id",
		"ref",
		"value"
	]);
	const contentState = TabsContentState.create({
		value: boxWith(() => $$props.value),
		id: boxWith(() => id()),
		ref: boxWith(() => ref(), (v) => ref(v))
	});
	const mergedProps = user_derived(() => mergeProps(restProps, contentState.props));
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
function Tabs_list$1($$anchor, $$props) {
	const uid = props_id();
	push($$props, true);
	let id = prop($$props, "id", 19, () => createId(uid)), ref = prop($$props, "ref", 15, null), restProps = rest_props($$props, [
		"$$slots",
		"$$events",
		"$$legacy",
		"child",
		"children",
		"id",
		"ref"
	]);
	const listState = TabsListState.create({
		id: boxWith(() => id()),
		ref: boxWith(() => ref(), (v) => ref(v))
	});
	const mergedProps = user_derived(() => mergeProps(restProps, listState.props));
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
function Tabs_content($$anchor, $$props) {
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
		let $0 = user_derived(() => cn("ring-offset-background focus-visible:ring-ring mt-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2", $$props.class));
		component(node, () => Tabs_content$1, ($$anchor$1, TabsPrimitive_Content) => {
			TabsPrimitive_Content($$anchor$1, spread_props({ get class() {
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
function Tabs_list($$anchor, $$props) {
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
		let $0 = user_derived(() => cn("bg-muted text-muted-foreground inline-flex h-10 items-center justify-center rounded-md p-1", $$props.class));
		component(node, () => Tabs_list$1, ($$anchor$1, TabsPrimitive_List) => {
			TabsPrimitive_List($$anchor$1, spread_props({ get class() {
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
var Root = Tabs;
var root_2 = from_html(`<!> <!> <span class="sr-only"> </span>`, 1);
var root_4 = from_html(`<!> `, 1);
var root_5 = from_html(`<!> `, 1);
var root_6 = from_html(`<!> `, 1);
var root_3 = from_html(`<!> <!> <!>`, 1);
var root_1 = from_html(`<!> <!>`, 1);
function ModePicker($$anchor, $$props) {
	push($$props, false);
	function setMode$1(mode) {
		window.localStorage.setItem(modeStorageKey.current + "-touched", "true");
		setMode(mode);
	}
	if (!window.localStorage.getItem(modeStorageKey.current + "-touched")) setMode$1("light");
	init();
	Root$1($$anchor, {
		children: ($$anchor$1, $$slotProps) => {
			var fragment_1 = root_1();
			var node = first_child(fragment_1);
			{
				let $0 = derived_safe_equal(() => buttonVariants({
					variant: "outline",
					size: "icon"
				}));
				Trigger(node, {
					get class() {
						return get($0);
					},
					children: ($$anchor$2, $$slotProps$1) => {
						var fragment_2 = root_2();
						var node_1 = first_child(fragment_2);
						Icon(node_1, {
							class: "h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0",
							icon: "mdi:weather-sunny"
						});
						var node_2 = sibling(node_1, 2);
						Icon(node_2, {
							class: "absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100",
							icon: "mdi:weather-night"
						});
						var span = sibling(node_2, 2);
						var text = child(span, true);
						reset(span);
						template_effect(($0$1) => set_text(text, $0$1), [() => _("Toggle theme")]);
						append($$anchor$2, fragment_2);
					},
					$$slots: { default: true }
				});
			}
			Dropdown_menu_content(sibling(node, 2), {
				align: "end",
				children: ($$anchor$2, $$slotProps$1) => {
					var fragment_3 = root_3();
					var node_4 = first_child(fragment_3);
					Dropdown_menu_item(node_4, {
						class: "cursor-pointer",
						onclick: () => setMode$1("light"),
						children: ($$anchor$3, $$slotProps$2) => {
							var fragment_4 = root_4();
							var node_5 = first_child(fragment_4);
							Icon(node_5, { icon: "mdi:weather-sunny" });
							var text_1 = sibling(node_5);
							template_effect(($0) => set_text(text_1, ` ${$0 ?? ""}`), [() => _("Light")]);
							append($$anchor$3, fragment_4);
						},
						$$slots: { default: true }
					});
					var node_6 = sibling(node_4, 2);
					Dropdown_menu_item(node_6, {
						class: "cursor-pointer",
						onclick: () => setMode$1("dark"),
						children: ($$anchor$3, $$slotProps$2) => {
							var fragment_5 = root_5();
							var node_7 = first_child(fragment_5);
							Icon(node_7, { icon: "mdi:weather-night" });
							var text_2 = sibling(node_7);
							template_effect(($0) => set_text(text_2, ` ${$0 ?? ""}`), [() => _("Dark")]);
							append($$anchor$3, fragment_5);
						},
						$$slots: { default: true }
					});
					Dropdown_menu_item(sibling(node_6, 2), {
						class: "cursor-pointer",
						onclick: () => resetMode(),
						children: ($$anchor$3, $$slotProps$2) => {
							var fragment_6 = root_6();
							var node_9 = first_child(fragment_6);
							Icon(node_9, { icon: "mdi:auto-mode" });
							var text_3 = sibling(node_9);
							template_effect(($0) => set_text(text_3, ` ${$0 ?? ""}`), [() => _("System")]);
							append($$anchor$3, fragment_6);
						},
						$$slots: { default: true }
					});
					append($$anchor$2, fragment_3);
				},
				$$slots: { default: true }
			});
			append($$anchor$1, fragment_1);
		},
		$$slots: { default: true }
	});
	pop();
}
export { Tabs_content as i, Root as n, Tabs_list as r, ModePicker as t };
