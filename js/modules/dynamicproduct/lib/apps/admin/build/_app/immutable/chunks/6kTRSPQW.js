import { $ as props_id, Ct as set, D as set_attribute, Ft as push, G as if_block, It as setContext, Kt as noop, L as component, Mt as getContext, Ot as user_derived, Pt as pop, R as snippet, T as attribute_effect, Tt as state, Ut as reset, V as each, X as comment, Y as append, Z as from_html, bt as sibling, c as spread_props, mt as user_effect, o as prop, ot as get, pt as template_effect, q as set_text, s as rest_props, vt as child, yt as first_child } from "./DUscB9kS.js";
import { i as tv, r as cn } from "./BIEFGHhw.js";
import { r as url } from "./Crb1phnD.js";
import { a as boolToTrueOrUndef, d as mergeProps, n as boolToEmptyStrOrUndef, o as createBitsAttrs, r as boolToStr, s as getAriaChecked, t as createId, u as attachRef, y as boxWith } from "./B4l8ufIa.js";
import { x as RovingFocusGroup } from "./B3A_TfMF.js";
import { O as SPACE, R as watch, l as ENTER, z as Context } from "./_yKPJ4BA.js";
import { t as noop$1 } from "./BoWJNiZV.js";
import { n as lang } from "./cJwMBL5_.js";
import { t as get_country } from "./GFXpcJ_Z.js";
const toggleGroupAttrs = createBitsAttrs({
	component: "toggle-group",
	parts: ["root", "item"]
});
var ToggleGroupRootContext = new Context("ToggleGroup.Root");
var ToggleGroupBaseState = class {
	opts;
	rovingFocusGroup;
	attachment;
	constructor(opts) {
		this.opts = opts;
		this.attachment = attachRef(this.opts.ref);
		this.rovingFocusGroup = new RovingFocusGroup({
			candidateAttr: toggleGroupAttrs.item,
			rootNode: opts.ref,
			loop: opts.loop,
			orientation: opts.orientation
		});
	}
	#props = user_derived(() => ({
		id: this.opts.id.current,
		[toggleGroupAttrs.root]: "",
		role: "group",
		"data-orientation": this.opts.orientation.current,
		"data-disabled": boolToEmptyStrOrUndef(this.opts.disabled.current),
		...this.attachment
	}));
	get props() {
		return get(this.#props);
	}
	set props(value) {
		set(this.#props, value);
	}
};
var ToggleGroupSingleState = class extends ToggleGroupBaseState {
	opts;
	isMulti = false;
	#anyPressed = user_derived(() => this.opts.value.current !== "");
	get anyPressed() {
		return get(this.#anyPressed);
	}
	set anyPressed(value) {
		set(this.#anyPressed, value);
	}
	constructor(opts) {
		super(opts);
		this.opts = opts;
	}
	includesItem(item) {
		return this.opts.value.current === item;
	}
	toggleItem(item, id) {
		if (this.includesItem(item)) this.opts.value.current = "";
		else {
			this.opts.value.current = item;
			this.rovingFocusGroup.setCurrentTabStopId(id);
		}
	}
};
var ToggleGroupMultipleState = class extends ToggleGroupBaseState {
	opts;
	isMulti = true;
	#anyPressed = user_derived(() => this.opts.value.current.length > 0);
	get anyPressed() {
		return get(this.#anyPressed);
	}
	set anyPressed(value) {
		set(this.#anyPressed, value);
	}
	constructor(opts) {
		super(opts);
		this.opts = opts;
	}
	includesItem(item) {
		return this.opts.value.current.includes(item);
	}
	toggleItem(item, id) {
		if (this.includesItem(item)) this.opts.value.current = this.opts.value.current.filter((v) => v !== item);
		else {
			this.opts.value.current = [...this.opts.value.current, item];
			this.rovingFocusGroup.setCurrentTabStopId(id);
		}
	}
};
var ToggleGroupRootState = class {
	static create(opts) {
		const { type, ...rest } = opts;
		const rootState = type === "single" ? new ToggleGroupSingleState(rest) : new ToggleGroupMultipleState(rest);
		return ToggleGroupRootContext.set(rootState);
	}
};
var ToggleGroupItemState = class ToggleGroupItemState {
	static create(opts) {
		return new ToggleGroupItemState(opts, ToggleGroupRootContext.get());
	}
	opts;
	root;
	attachment;
	#isDisabled = user_derived(() => this.opts.disabled.current || this.root.opts.disabled.current);
	#isPressed = user_derived(() => this.root.includesItem(this.opts.value.current));
	get isPressed() {
		return get(this.#isPressed);
	}
	set isPressed(value) {
		set(this.#isPressed, value);
	}
	#ariaChecked = user_derived(() => {
		return this.root.isMulti ? void 0 : getAriaChecked(this.isPressed, false);
	});
	#ariaPressed = user_derived(() => {
		return this.root.isMulti ? boolToStr(this.isPressed) : void 0;
	});
	constructor(opts, root) {
		this.opts = opts;
		this.root = root;
		this.attachment = attachRef(this.opts.ref);
		user_effect(() => {
			if (!this.root.opts.rovingFocus.current) set(this.#tabIndex, 0);
			else set(this.#tabIndex, this.root.rovingFocusGroup.getTabIndex(this.opts.ref.current), true);
		});
		this.onclick = this.onclick.bind(this);
		this.onkeydown = this.onkeydown.bind(this);
	}
	#toggleItem() {
		if (get(this.#isDisabled)) return;
		this.root.toggleItem(this.opts.value.current, this.opts.id.current);
	}
	onclick(_) {
		if (get(this.#isDisabled)) return;
		this.root.toggleItem(this.opts.value.current, this.opts.id.current);
	}
	onkeydown(e) {
		if (get(this.#isDisabled)) return;
		if (e.key === "Enter" || e.key === " ") {
			e.preventDefault();
			this.#toggleItem();
			return;
		}
		if (!this.root.opts.rovingFocus.current) return;
		this.root.rovingFocusGroup.handleKeydown(this.opts.ref.current, e);
	}
	#tabIndex = state(0);
	#snippetProps = user_derived(() => ({ pressed: this.isPressed }));
	get snippetProps() {
		return get(this.#snippetProps);
	}
	set snippetProps(value) {
		set(this.#snippetProps, value);
	}
	#props = user_derived(() => ({
		id: this.opts.id.current,
		role: this.root.isMulti ? void 0 : "radio",
		tabindex: get(this.#tabIndex),
		"data-orientation": this.root.opts.orientation.current,
		"data-disabled": boolToEmptyStrOrUndef(get(this.#isDisabled)),
		"data-state": getToggleItemDataState(this.isPressed),
		"data-value": this.opts.value.current,
		"aria-pressed": get(this.#ariaPressed),
		"aria-checked": get(this.#ariaChecked),
		disabled: boolToTrueOrUndef(get(this.#isDisabled)),
		[toggleGroupAttrs.item]: "",
		onclick: this.onclick,
		onkeydown: this.onkeydown,
		...this.attachment
	}));
	get props() {
		return get(this.#props);
	}
	set props(value) {
		set(this.#props, value);
	}
};
function getToggleItemDataState(condition) {
	return condition ? "on" : "off";
}
var root_2$1 = from_html(`<div><!></div>`);
function Toggle_group$1($$anchor, $$props) {
	const uid = props_id();
	push($$props, true);
	let id = prop($$props, "id", 19, () => createId(uid)), ref = prop($$props, "ref", 15, null), value = prop($$props, "value", 15), onValueChange = prop($$props, "onValueChange", 3, noop$1), disabled = prop($$props, "disabled", 3, false), loop = prop($$props, "loop", 3, true), orientation = prop($$props, "orientation", 3, "horizontal"), rovingFocus = prop($$props, "rovingFocus", 3, true), restProps = rest_props($$props, [
		"$$slots",
		"$$events",
		"$$legacy",
		"id",
		"ref",
		"value",
		"onValueChange",
		"type",
		"disabled",
		"loop",
		"orientation",
		"rovingFocus",
		"child",
		"children"
	]);
	function handleDefaultValue() {
		if (value() !== void 0) return;
		value($$props.type === "single" ? "" : []);
	}
	handleDefaultValue();
	watch.pre(() => value(), () => {
		handleDefaultValue();
	});
	const rootState = ToggleGroupRootState.create({
		id: boxWith(() => id()),
		value: boxWith(() => value(), (v) => {
			value(v);
			onValueChange()(v);
		}),
		disabled: boxWith(() => disabled()),
		loop: boxWith(() => loop()),
		orientation: boxWith(() => orientation()),
		rovingFocus: boxWith(() => rovingFocus()),
		type: $$props.type,
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
var root_2 = from_html(`<button><!></button>`);
function Toggle_group_item$1($$anchor, $$props) {
	const uid = props_id();
	push($$props, true);
	let ref = prop($$props, "ref", 15, null), disabled = prop($$props, "disabled", 3, false), id = prop($$props, "id", 19, () => createId(uid)), type = prop($$props, "type", 3, "button"), restProps = rest_props($$props, [
		"$$slots",
		"$$events",
		"$$legacy",
		"children",
		"child",
		"ref",
		"value",
		"disabled",
		"id",
		"type"
	]);
	const itemState = ToggleGroupItemState.create({
		id: boxWith(() => id()),
		value: boxWith(() => $$props.value),
		disabled: boxWith(() => disabled() ?? false),
		ref: boxWith(() => ref(), (v) => ref(v))
	});
	const mergedProps = user_derived(() => mergeProps(restProps, itemState.props, { type: type() }));
	var fragment = comment();
	var node = first_child(fragment);
	var consequent = ($$anchor$1) => {
		var fragment_1 = comment();
		var node_1 = first_child(fragment_1);
		{
			let $0 = user_derived(() => ({
				props: get(mergedProps),
				...itemState.snippetProps
			}));
			snippet(node_1, () => $$props.child, () => get($0));
		}
		append($$anchor$1, fragment_1);
	};
	var alternate = ($$anchor$1) => {
		var button = root_2();
		attribute_effect(button, () => ({ ...get(mergedProps) }));
		snippet(child(button), () => $$props.children ?? noop, () => itemState.snippetProps);
		reset(button);
		append($$anchor$1, button);
	};
	if_block(node, ($$render) => {
		if ($$props.child) $$render(consequent);
		else $$render(alternate, false);
	});
	append($$anchor, fragment);
	pop();
}
function setToggleGroupCtx(props) {
	setContext("toggleGroup", props);
}
function getToggleGroupCtx() {
	return getContext("toggleGroup");
}
function Toggle_group($$anchor, $$props) {
	push($$props, true);
	let ref = prop($$props, "ref", 15, null), value = prop($$props, "value", 15), size = prop($$props, "size", 3, "default"), variant = prop($$props, "variant", 3, "default"), restProps = rest_props($$props, [
		"$$slots",
		"$$events",
		"$$legacy",
		"ref",
		"value",
		"class",
		"size",
		"variant"
	]);
	setToggleGroupCtx({
		variant: variant(),
		size: size()
	});
	var fragment = comment();
	var node = first_child(fragment);
	{
		let $0 = user_derived(() => cn("flex items-center justify-center gap-1", $$props.class));
		component(node, () => Toggle_group$1, ($$anchor$1, ToggleGroupPrimitive_Root) => {
			ToggleGroupPrimitive_Root($$anchor$1, spread_props({ get class() {
				return get($0);
			} }, () => restProps, {
				get value() {
					return value();
				},
				set value($$value) {
					value($$value);
				},
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
const toggleVariants = tv({
	base: "cursor-pointer ring-offset-background hover:bg-muted hover:text-muted-foreground focus-visible:ring-ring data-[state=on]:bg-accent data-[state=on]:text-accent-foreground inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
	variants: {
		variant: {
			default: "bg-transparent",
			outline: "border-input hover:bg-accent hover:text-accent-foreground border bg-transparent"
		},
		size: {
			default: "h-10 min-w-10 px-3",
			sm: "h-9 min-w-9 px-2.5",
			lg: "h-11 min-w-11 px-5"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
function Toggle_group_item($$anchor, $$props) {
	push($$props, true);
	let ref = prop($$props, "ref", 15, null), restProps = rest_props($$props, [
		"$$slots",
		"$$events",
		"$$legacy",
		"ref",
		"value",
		"class",
		"size",
		"variant"
	]);
	const ctx = getToggleGroupCtx();
	var fragment = comment();
	var node = first_child(fragment);
	{
		let $0 = user_derived(() => cn(toggleVariants({
			variant: ctx.variant || $$props.variant,
			size: ctx.size || $$props.size
		}), $$props.class));
		component(node, () => Toggle_group_item$1, ($$anchor$1, ToggleGroupPrimitive_Item) => {
			ToggleGroupPrimitive_Item($$anchor$1, spread_props({
				get class() {
					return get($0);
				},
				get value() {
					return $$props.value;
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
	append($$anchor, fragment);
	pop();
}
var root_4 = from_html(`<img style="height: 11px; width: auto;" alt="Name"/>`);
var root_5 = from_html(`<img style="height: 11px; width: auto;" alt="Language"/>`);
var root_3 = from_html(`<span class="flex items-center gap-2"><!> </span>`);
function LangPicker($$anchor, $$props) {
	push($$props, true);
	var fragment = comment();
	component(first_child(fragment), () => Toggle_group, ($$anchor$1, ToggleGroup_Root) => {
		ToggleGroup_Root($$anchor$1, {
			type: "single",
			variant: "outline",
			get value() {
				return lang.value;
			},
			set value($$value) {
				lang.value = $$value;
			},
			children: ($$anchor$2, $$slotProps) => {
				var fragment_1 = comment();
				each(first_child(fragment_1), 17, () => $$props.languages, (locale) => locale.id_lang, ($$anchor$3, locale) => {
					const country = user_derived(() => get_country(get(locale).iso_code));
					var fragment_2 = comment();
					var node_2 = first_child(fragment_2);
					{
						let $0 = user_derived(() => cn({ "border-primary": get(locale).id_lang.toString() === lang.value }));
						let $1 = user_derived(() => get(locale).id_lang.toString());
						let $2 = user_derived(() => get(locale).id_lang.toString() === lang.value);
						component(node_2, () => Toggle_group_item, ($$anchor$4, ToggleGroup_Item) => {
							ToggleGroup_Item($$anchor$4, {
								get class() {
									return `opacity-100! ${get($0) ?? ""}`;
								},
								get value() {
									return get($1);
								},
								get disabled() {
									return get($2);
								},
								get "data-testid"() {
									return get(locale).iso_code;
								},
								children: ($$anchor$5, $$slotProps$1) => {
									var span = root_3();
									var node_3 = child(span);
									var consequent = ($$anchor$6) => {
										var img = root_4();
										template_effect(() => {
											set_attribute(img, "src", `https://flagcdn.com/w20/${get(country)}.webp`);
											set_attribute(img, "srcset", `https://flagcdn.com/w40/${get(country)}.webp 2x, https://flagcdn.com/w60/${get(country)}.webp 3x`);
										});
										append($$anchor$6, img);
									};
									var alternate = ($$anchor$6) => {
										var img_1 = root_5();
										template_effect(($0$1) => set_attribute(img_1, "src", $0$1), [() => url("/world.svg")]);
										append($$anchor$6, img_1);
									};
									if_block(node_3, ($$render) => {
										if (get(country)) $$render(consequent);
										else $$render(alternate, false);
									});
									var text = sibling(node_3);
									reset(span);
									template_effect(() => set_text(text, ` ${get(locale).iso_code ?? ""}`));
									append($$anchor$5, span);
								},
								$$slots: { default: true }
							});
						});
					}
					append($$anchor$3, fragment_2);
				});
				append($$anchor$2, fragment_1);
			},
			$$slots: { default: true }
		});
	});
	append($$anchor, fragment);
	pop();
}
export { LangPicker as t };
