import { $ as props_id, Ct as set, Ft as push, G as if_block, Kt as noop, L as component, Ot as user_derived, Pt as pop, R as snippet, T as attribute_effect, Ut as reset, X as comment, Y as append, Z as from_html, bt as sibling, c as spread_props, o as prop, ot as get, s as rest_props, v as init, vt as child, yt as first_child, zt as snapshot } from "./DUscB9kS.js";
import { r as cn } from "./BIEFGHhw.js";
import { d as mergeProps, n as boolToEmptyStrOrUndef, o as createBitsAttrs, r as boolToStr, s as getAriaChecked, t as createId, u as attachRef, y as boxWith } from "./B4l8ufIa.js";
import { O as SPACE, R as watch, l as ENTER, z as Context } from "./_yKPJ4BA.js";
import { l as isHTMLElement } from "./9DgZZMlb.js";
import { t as Hidden_input } from "./n3nL436h.js";
import { t as Check } from "./BeGrVUTb.js";
import { t as Minus } from "./hqy-D29Y.js";
var checkboxAttrs = createBitsAttrs({
	component: "checkbox",
	parts: [
		"root",
		"group",
		"group-label",
		"input"
	]
});
const CheckboxGroupContext = new Context("Checkbox.Group");
var CheckboxRootContext = new Context("Checkbox.Root");
var CheckboxRootState = class CheckboxRootState {
	static create(opts, group = null) {
		return CheckboxRootContext.set(new CheckboxRootState(opts, group));
	}
	opts;
	group;
	#trueName = user_derived(() => {
		if (this.group && this.group.opts.name.current) return this.group.opts.name.current;
		return this.opts.name.current;
	});
	get trueName() {
		return get(this.#trueName);
	}
	set trueName(value) {
		set(this.#trueName, value);
	}
	#trueRequired = user_derived(() => {
		if (this.group && this.group.opts.required.current) return true;
		return this.opts.required.current;
	});
	get trueRequired() {
		return get(this.#trueRequired);
	}
	set trueRequired(value) {
		set(this.#trueRequired, value);
	}
	#trueDisabled = user_derived(() => {
		if (this.group && this.group.opts.disabled.current) return true;
		return this.opts.disabled.current;
	});
	get trueDisabled() {
		return get(this.#trueDisabled);
	}
	set trueDisabled(value) {
		set(this.#trueDisabled, value);
	}
	#trueReadonly = user_derived(() => {
		if (this.group && this.group.opts.readonly.current) return true;
		return this.opts.readonly.current;
	});
	get trueReadonly() {
		return get(this.#trueReadonly);
	}
	set trueReadonly(value) {
		set(this.#trueReadonly, value);
	}
	attachment;
	constructor(opts, group) {
		this.opts = opts;
		this.group = group;
		this.attachment = attachRef(this.opts.ref);
		this.onkeydown = this.onkeydown.bind(this);
		this.onclick = this.onclick.bind(this);
		watch.pre([() => snapshot(this.group?.opts.value.current), () => this.opts.value.current], ([groupValue, value]) => {
			if (!groupValue || !value) return;
			this.opts.checked.current = groupValue.includes(value);
		});
		watch.pre(() => this.opts.checked.current, (checked) => {
			if (!this.group) return;
			if (checked) this.group?.addValue(this.opts.value.current);
			else this.group?.removeValue(this.opts.value.current);
		});
	}
	onkeydown(e) {
		if (this.trueDisabled || this.trueReadonly) return;
		if (e.key === "Enter") e.preventDefault();
		if (e.key === " ") {
			e.preventDefault();
			this.#toggle();
		}
	}
	#toggle() {
		if (this.opts.indeterminate.current) {
			this.opts.indeterminate.current = false;
			this.opts.checked.current = true;
		} else this.opts.checked.current = !this.opts.checked.current;
	}
	onclick(e) {
		if (this.trueDisabled || this.trueReadonly) return;
		if (this.opts.type.current === "submit") {
			this.#toggle();
			return;
		}
		e.preventDefault();
		this.#toggle();
	}
	#snippetProps = user_derived(() => ({
		checked: this.opts.checked.current,
		indeterminate: this.opts.indeterminate.current
	}));
	get snippetProps() {
		return get(this.#snippetProps);
	}
	set snippetProps(value) {
		set(this.#snippetProps, value);
	}
	#props = user_derived(() => ({
		id: this.opts.id.current,
		role: "checkbox",
		type: this.opts.type.current,
		disabled: this.trueDisabled,
		"aria-checked": getAriaChecked(this.opts.checked.current, this.opts.indeterminate.current),
		"aria-required": boolToStr(this.trueRequired),
		"aria-readonly": boolToStr(this.trueReadonly),
		"data-disabled": boolToEmptyStrOrUndef(this.trueDisabled),
		"data-readonly": boolToEmptyStrOrUndef(this.trueReadonly),
		"data-state": getCheckboxDataState(this.opts.checked.current, this.opts.indeterminate.current),
		[checkboxAttrs.root]: "",
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
var CheckboxInputState = class CheckboxInputState {
	static create() {
		return new CheckboxInputState(CheckboxRootContext.get());
	}
	root;
	#trueChecked = user_derived(() => {
		if (!this.root.group) return this.root.opts.checked.current;
		if (this.root.opts.value.current !== void 0 && this.root.group.opts.value.current.includes(this.root.opts.value.current)) return true;
		return false;
	});
	get trueChecked() {
		return get(this.#trueChecked);
	}
	set trueChecked(value) {
		set(this.#trueChecked, value);
	}
	#shouldRender = user_derived(() => Boolean(this.root.trueName));
	get shouldRender() {
		return get(this.#shouldRender);
	}
	set shouldRender(value) {
		set(this.#shouldRender, value);
	}
	constructor(root$1) {
		this.root = root$1;
		this.onfocus = this.onfocus.bind(this);
	}
	onfocus(_) {
		if (!isHTMLElement(this.root.opts.ref.current)) return;
		this.root.opts.ref.current.focus();
	}
	#props = user_derived(() => ({
		type: "checkbox",
		checked: this.root.opts.checked.current === true,
		disabled: this.root.trueDisabled,
		required: this.root.trueRequired,
		name: this.root.trueName,
		value: this.root.opts.value.current,
		readonly: this.root.trueReadonly,
		onfocus: this.onfocus
	}));
	get props() {
		return get(this.#props);
	}
	set props(value) {
		set(this.#props, value);
	}
};
function getCheckboxDataState(checked, indeterminate) {
	if (indeterminate) return "indeterminate";
	return checked ? "checked" : "unchecked";
}
function Checkbox_input($$anchor, $$props) {
	push($$props, false);
	const inputState = CheckboxInputState.create();
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
var root_2 = from_html(`<button><!></button>`);
var root = from_html(`<!> <!>`, 1);
function Checkbox$1($$anchor, $$props) {
	const uid = props_id();
	push($$props, true);
	let checked = prop($$props, "checked", 15, false), ref = prop($$props, "ref", 15, null), disabled = prop($$props, "disabled", 3, false), required = prop($$props, "required", 3, false), name = prop($$props, "name", 3, void 0), value = prop($$props, "value", 3, "on"), id = prop($$props, "id", 19, () => createId(uid)), indeterminate = prop($$props, "indeterminate", 15, false), type = prop($$props, "type", 3, "button"), restProps = rest_props($$props, [
		"$$slots",
		"$$events",
		"$$legacy",
		"checked",
		"ref",
		"onCheckedChange",
		"children",
		"disabled",
		"required",
		"name",
		"value",
		"id",
		"indeterminate",
		"onIndeterminateChange",
		"child",
		"type",
		"readonly"
	]);
	const group = CheckboxGroupContext.getOr(null);
	if (group && value()) if (group.opts.value.current.includes(value())) checked(true);
	else checked(false);
	watch.pre(() => value(), () => {
		if (group && value()) if (group.opts.value.current.includes(value())) checked(true);
		else checked(false);
	});
	const rootState = CheckboxRootState.create({
		checked: boxWith(() => checked(), (v) => {
			checked(v);
			$$props.onCheckedChange?.(v);
		}),
		disabled: boxWith(() => disabled() ?? false),
		required: boxWith(() => required()),
		name: boxWith(() => name()),
		value: boxWith(() => value()),
		id: boxWith(() => id()),
		ref: boxWith(() => ref(), (v) => ref(v)),
		indeterminate: boxWith(() => indeterminate(), (v) => {
			indeterminate(v);
			$$props.onIndeterminateChange?.(v);
		}),
		type: boxWith(() => type()),
		readonly: boxWith(() => Boolean($$props.readonly))
	}, group);
	const mergedProps = user_derived(() => mergeProps({ ...restProps }, rootState.props));
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
		var button = root_2();
		attribute_effect(button, () => ({ ...get(mergedProps) }));
		snippet(child(button), () => $$props.children ?? noop, () => rootState.snippetProps);
		reset(button);
		append($$anchor$1, button);
	};
	if_block(node, ($$render) => {
		if ($$props.child) $$render(consequent);
		else $$render(alternate, false);
	});
	Checkbox_input(sibling(node, 2), {});
	append($$anchor, fragment);
	pop();
}
var root_1 = from_html(`<div class="flex size-4 items-center justify-center text-current"><!></div>`);
function Checkbox($$anchor, $$props) {
	push($$props, true);
	let ref = prop($$props, "ref", 15, null), checked = prop($$props, "checked", 15, false), indeterminate = prop($$props, "indeterminate", 15, false), restProps = rest_props($$props, [
		"$$slots",
		"$$events",
		"$$legacy",
		"ref",
		"checked",
		"indeterminate",
		"class"
	]);
	var fragment = comment();
	var node = first_child(fragment);
	{
		const children = ($$anchor$1, $$arg0) => {
			let checked$1 = () => $$arg0?.().checked;
			let indeterminate$1 = () => $$arg0?.().indeterminate;
			var div = root_1();
			var node_1 = child(div);
			var consequent = ($$anchor$2) => {
				Minus($$anchor$2, { class: "size-3.5" });
			};
			var alternate = ($$anchor$2) => {
				{
					let $0$1 = user_derived(() => cn("size-3.5", !checked$1() && "text-transparent"));
					Check($$anchor$2, { get class() {
						return get($0$1);
					} });
				}
			};
			if_block(node_1, ($$render) => {
				if (indeterminate$1()) $$render(consequent);
				else $$render(alternate, false);
			});
			reset(div);
			append($$anchor$1, div);
		};
		let $0 = user_derived(() => cn("border-primary ring-offset-background focus-visible:ring-ring data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground peer box-content size-4 shrink-0 rounded-sm border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[disabled=true]:cursor-not-allowed data-[disabled=true]:opacity-50", $$props.class));
		component(node, () => Checkbox$1, ($$anchor$1, CheckboxPrimitive_Root) => {
			CheckboxPrimitive_Root($$anchor$1, spread_props({ get class() {
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
				get indeterminate() {
					return indeterminate();
				},
				set indeterminate($$value) {
					indeterminate($$value);
				},
				children,
				$$slots: { default: true }
			}));
		});
	}
	append($$anchor, fragment);
	pop();
}
export { Checkbox as t };
