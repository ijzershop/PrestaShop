import { $ as props_id, Ct as set, Ft as push, G as if_block, Kt as noop, L as component, Ot as user_derived, Pt as pop, R as snippet, T as attribute_effect, Ut as reset, X as comment, Y as append, Z as from_html, c as spread_props, k as set_style, o as prop, ot as get, pt as template_effect, s as rest_props, vt as child, yt as first_child } from "./DUscB9kS.js";
import { r as cn } from "./BIEFGHhw.js";
import { d as mergeProps, o as createBitsAttrs, t as createId, u as attachRef, y as boxWith } from "./B4l8ufIa.js";
var progressAttrs = createBitsAttrs({
	component: "progress",
	parts: ["root"]
});
var ProgressRootState = class ProgressRootState {
	static create(opts) {
		return new ProgressRootState(opts);
	}
	opts;
	attachment;
	constructor(opts) {
		this.opts = opts;
		this.attachment = attachRef(this.opts.ref);
	}
	#props = user_derived(() => ({
		role: "progressbar",
		value: this.opts.value.current,
		"aria-valuemin": this.opts.min.current,
		"aria-valuemax": this.opts.max.current,
		"aria-valuenow": this.opts.value.current === null ? void 0 : this.opts.value.current,
		"data-value": this.opts.value.current === null ? void 0 : this.opts.value.current,
		"data-state": getProgressDataState(this.opts.value.current, this.opts.max.current),
		"data-max": this.opts.max.current,
		"data-min": this.opts.min.current,
		"data-indeterminate": this.opts.value.current === null ? "" : void 0,
		[progressAttrs.root]: "",
		...this.attachment
	}));
	get props() {
		return get(this.#props);
	}
	set props(value) {
		set(this.#props, value);
	}
};
function getProgressDataState(value, max) {
	if (value === null) return "indeterminate";
	return value === max ? "loaded" : "loading";
}
var root_2 = from_html(`<div><!></div>`);
function Progress$1($$anchor, $$props) {
	const uid = props_id();
	push($$props, true);
	let value = prop($$props, "value", 3, 0), max = prop($$props, "max", 3, 100), min = prop($$props, "min", 3, 0), id = prop($$props, "id", 19, () => createId(uid)), ref = prop($$props, "ref", 15, null), restProps = rest_props($$props, [
		"$$slots",
		"$$events",
		"$$legacy",
		"child",
		"children",
		"value",
		"max",
		"min",
		"id",
		"ref"
	]);
	const rootState = ProgressRootState.create({
		value: boxWith(() => value()),
		max: boxWith(() => max()),
		min: boxWith(() => min()),
		id: boxWith(() => id()),
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
		var div = root_2();
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
var root_1 = from_html(`<div class="bg-primary h-full w-full flex-1 transition-all"></div>`);
function Progress($$anchor, $$props) {
	push($$props, true);
	let ref = prop($$props, "ref", 15, null), max = prop($$props, "max", 3, 100), restProps = rest_props($$props, [
		"$$slots",
		"$$events",
		"$$legacy",
		"ref",
		"class",
		"max",
		"value"
	]);
	var fragment = comment();
	var node = first_child(fragment);
	{
		let $0 = user_derived(() => cn("bg-secondary relative h-4 w-full overflow-hidden rounded-full", $$props.class));
		component(node, () => Progress$1, ($$anchor$1, ProgressPrimitive_Root) => {
			ProgressPrimitive_Root($$anchor$1, spread_props({
				get class() {
					return get($0);
				},
				get value() {
					return $$props.value;
				},
				get max() {
					return max();
				}
			}, () => restProps, {
				get ref() {
					return ref();
				},
				set ref($$value) {
					ref($$value);
				},
				children: ($$anchor$2, $$slotProps) => {
					var div = root_1();
					template_effect(() => set_style(div, `transform: translateX(-${100 - 100 * ($$props.value ?? 0) / (max() ?? 1)}%)`));
					append($$anchor$2, div);
				},
				$$slots: { default: true }
			}));
		});
	}
	append($$anchor, fragment);
	pop();
}
export { Progress as t };
