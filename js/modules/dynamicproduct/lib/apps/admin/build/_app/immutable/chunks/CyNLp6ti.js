import { $ as props_id, Ct as set, Ft as push, G as if_block, Kt as noop, L as component, Ot as user_derived, Pt as pop, R as snippet, T as attribute_effect, Ut as reset, X as comment, Y as append, Z as from_html, bt as sibling, c as spread_props, o as prop, ot as get, s as rest_props, v as init, vt as child, yt as first_child } from "./DUscB9kS.js";
import { r as cn } from "./BIEFGHhw.js";
import { a as boolToTrueOrUndef, c as getDataChecked, d as mergeProps, n as boolToEmptyStrOrUndef, o as createBitsAttrs, r as boolToStr, s as getAriaChecked, t as createId, u as attachRef, y as boxWith } from "./B4l8ufIa.js";
import { O as SPACE, l as ENTER, z as Context } from "./_yKPJ4BA.js";
import { t as noop$1 } from "./BoWJNiZV.js";
import { t as Hidden_input } from "./n3nL436h.js";
var switchAttrs = createBitsAttrs({
	component: "switch",
	parts: ["root", "thumb"]
});
var SwitchRootContext = new Context("Switch.Root");
var SwitchRootState = class SwitchRootState {
	static create(opts) {
		return SwitchRootContext.set(new SwitchRootState(opts));
	}
	opts;
	attachment;
	constructor(opts) {
		this.opts = opts;
		this.attachment = attachRef(opts.ref);
		this.onkeydown = this.onkeydown.bind(this);
		this.onclick = this.onclick.bind(this);
	}
	#toggle() {
		this.opts.checked.current = !this.opts.checked.current;
	}
	onkeydown(e) {
		if (!(e.key === "Enter" || e.key === " ") || this.opts.disabled.current) return;
		e.preventDefault();
		this.#toggle();
	}
	onclick(_) {
		if (this.opts.disabled.current) return;
		this.#toggle();
	}
	#sharedProps = user_derived(() => ({
		"data-disabled": boolToEmptyStrOrUndef(this.opts.disabled.current),
		"data-state": getDataChecked(this.opts.checked.current),
		"data-required": boolToEmptyStrOrUndef(this.opts.required.current)
	}));
	get sharedProps() {
		return get(this.#sharedProps);
	}
	set sharedProps(value) {
		set(this.#sharedProps, value);
	}
	#snippetProps = user_derived(() => ({ checked: this.opts.checked.current }));
	get snippetProps() {
		return get(this.#snippetProps);
	}
	set snippetProps(value) {
		set(this.#snippetProps, value);
	}
	#props = user_derived(() => ({
		...this.sharedProps,
		id: this.opts.id.current,
		role: "switch",
		disabled: boolToTrueOrUndef(this.opts.disabled.current),
		"aria-checked": getAriaChecked(this.opts.checked.current, false),
		"aria-required": boolToStr(this.opts.required.current),
		[switchAttrs.root]: "",
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
var SwitchInputState = class SwitchInputState {
	static create() {
		return new SwitchInputState(SwitchRootContext.get());
	}
	root;
	#shouldRender = user_derived(() => this.root.opts.name.current !== void 0);
	get shouldRender() {
		return get(this.#shouldRender);
	}
	set shouldRender(value) {
		set(this.#shouldRender, value);
	}
	constructor(root$1) {
		this.root = root$1;
	}
	#props = user_derived(() => ({
		type: "checkbox",
		name: this.root.opts.name.current,
		value: this.root.opts.value.current,
		checked: this.root.opts.checked.current,
		disabled: this.root.opts.disabled.current,
		required: this.root.opts.required.current
	}));
	get props() {
		return get(this.#props);
	}
	set props(value) {
		set(this.#props, value);
	}
};
var SwitchThumbState = class SwitchThumbState {
	static create(opts) {
		return new SwitchThumbState(opts, SwitchRootContext.get());
	}
	opts;
	root;
	attachment;
	constructor(opts, root$1) {
		this.opts = opts;
		this.root = root$1;
		this.attachment = attachRef(opts.ref);
	}
	#snippetProps = user_derived(() => ({ checked: this.root.opts.checked.current }));
	get snippetProps() {
		return get(this.#snippetProps);
	}
	set snippetProps(value) {
		set(this.#snippetProps, value);
	}
	#props = user_derived(() => ({
		...this.root.sharedProps,
		id: this.opts.id.current,
		[switchAttrs.thumb]: "",
		...this.attachment
	}));
	get props() {
		return get(this.#props);
	}
	set props(value) {
		set(this.#props, value);
	}
};
function Switch_input($$anchor, $$props) {
	push($$props, false);
	const inputState = SwitchInputState.create();
	init();
	var fragment = comment();
	var node = first_child(fragment);
	var consequent = ($$anchor$1) => {
		Hidden_input($$anchor$1, spread_props(() => inputState.props));
	};
	if_block(node, ($$render) => {
		if (inputState.shouldRender) $$render(consequent);
	});
	append($$anchor, fragment);
	pop();
}
var root_2$1 = from_html(`<button><!></button>`);
var root = from_html(`<!> <!>`, 1);
function Switch$1($$anchor, $$props) {
	const uid = props_id();
	push($$props, true);
	let ref = prop($$props, "ref", 15, null), id = prop($$props, "id", 19, () => createId(uid)), disabled = prop($$props, "disabled", 3, false), required = prop($$props, "required", 3, false), checked = prop($$props, "checked", 15, false), value = prop($$props, "value", 3, "on"), name = prop($$props, "name", 3, void 0), type = prop($$props, "type", 3, "button"), onCheckedChange = prop($$props, "onCheckedChange", 3, noop$1), restProps = rest_props($$props, [
		"$$slots",
		"$$events",
		"$$legacy",
		"child",
		"children",
		"ref",
		"id",
		"disabled",
		"required",
		"checked",
		"value",
		"name",
		"type",
		"onCheckedChange"
	]);
	const rootState = SwitchRootState.create({
		checked: boxWith(() => checked(), (v) => {
			checked(v);
			onCheckedChange()?.(v);
		}),
		disabled: boxWith(() => disabled() ?? false),
		required: boxWith(() => required()),
		value: boxWith(() => value()),
		name: boxWith(() => name()),
		id: boxWith(() => id()),
		ref: boxWith(() => ref(), (v) => ref(v))
	});
	const mergedProps = user_derived(() => mergeProps(restProps, rootState.props, { type: type() }));
	var fragment = root();
	var node = first_child(fragment);
	var consequent = ($$anchor$1) => {
		var fragment_1 = comment();
		var node_1 = first_child(fragment_1);
		{
			let $0 = user_derived(() => ({
				props: get(mergedProps),
				...rootState.snippetProps
			}));
			snippet(node_1, () => $$props.child, () => get($0));
		}
		append($$anchor$1, fragment_1);
	};
	var alternate = ($$anchor$1) => {
		var button = root_2$1();
		attribute_effect(button, () => ({ ...get(mergedProps) }));
		snippet(child(button), () => $$props.children ?? noop, () => rootState.snippetProps);
		reset(button);
		append($$anchor$1, button);
	};
	if_block(node, ($$render) => {
		if ($$props.child) $$render(consequent);
		else $$render(alternate, false);
	});
	Switch_input(sibling(node, 2), {});
	append($$anchor, fragment);
	pop();
}
var root_2 = from_html(`<span><!></span>`);
function Switch_thumb($$anchor, $$props) {
	const uid = props_id();
	push($$props, true);
	let ref = prop($$props, "ref", 15, null), id = prop($$props, "id", 19, () => createId(uid)), restProps = rest_props($$props, [
		"$$slots",
		"$$events",
		"$$legacy",
		"child",
		"children",
		"ref",
		"id"
	]);
	const thumbState = SwitchThumbState.create({
		id: boxWith(() => id()),
		ref: boxWith(() => ref(), (v) => ref(v))
	});
	const mergedProps = user_derived(() => mergeProps(restProps, thumbState.props));
	var fragment = comment();
	var node = first_child(fragment);
	var consequent = ($$anchor$1) => {
		var fragment_1 = comment();
		var node_1 = first_child(fragment_1);
		{
			let $0 = user_derived(() => ({
				props: get(mergedProps),
				...thumbState.snippetProps
			}));
			snippet(node_1, () => $$props.child, () => get($0));
		}
		append($$anchor$1, fragment_1);
	};
	var alternate = ($$anchor$1) => {
		var span = root_2();
		attribute_effect(span, () => ({ ...get(mergedProps) }));
		snippet(child(span), () => $$props.children ?? noop, () => thumbState.snippetProps);
		reset(span);
		append($$anchor$1, span);
	};
	if_block(node, ($$render) => {
		if ($$props.child) $$render(consequent);
		else $$render(alternate, false);
	});
	append($$anchor, fragment);
	pop();
}
function Switch($$anchor, $$props) {
	push($$props, true);
	let ref = prop($$props, "ref", 15, null), checked = prop($$props, "checked", 15, false), restProps = rest_props($$props, [
		"$$slots",
		"$$events",
		"$$legacy",
		"ref",
		"class",
		"checked"
	]);
	var fragment = comment();
	var node = first_child(fragment);
	{
		let $0 = user_derived(() => cn("focus-visible:ring-ring focus-visible:ring-offset-background data-[state=checked]:bg-primary data-[state=unchecked]:bg-input peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50", $$props.class));
		component(node, () => Switch$1, ($$anchor$1, SwitchPrimitive_Root) => {
			SwitchPrimitive_Root($$anchor$1, spread_props({ get class() {
				return get($0);
			} }, () => restProps, {
				get ref() {
					return ref();
				},
				set ref($$value) {
					ref($$value);
				},
				get checked() {
					return checked();
				},
				set checked($$value) {
					checked($$value);
				},
				children: ($$anchor$2, $$slotProps) => {
					var fragment_1 = comment();
					var node_1 = first_child(fragment_1);
					{
						let $0$1 = user_derived(() => cn("bg-background pointer-events-none block size-5 rounded-full shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0"));
						component(node_1, () => Switch_thumb, ($$anchor$3, SwitchPrimitive_Thumb) => {
							SwitchPrimitive_Thumb($$anchor$3, { get class() {
								return get($0$1);
							} });
						});
					}
					append($$anchor$2, fragment_1);
				},
				$$slots: { default: true }
			}));
		});
	}
	append($$anchor, fragment);
	pop();
}
export { Switch as t };
