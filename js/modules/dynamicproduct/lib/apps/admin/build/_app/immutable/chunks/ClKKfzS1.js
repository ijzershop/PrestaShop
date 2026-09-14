import { $ as props_id, Ct as set, Ft as push, G as if_block, Kt as noop, L as component, Ot as user_derived, Pt as pop, R as snippet, T as attribute_effect, Ut as reset, X as comment, Y as append, Z as from_html, c as spread_props, o as prop, ot as get, s as rest_props, vt as child, yt as first_child } from "./DUscB9kS.js";
import { r as cn } from "./BIEFGHhw.js";
import { d as mergeProps, o as createBitsAttrs, t as createId, u as attachRef, y as boxWith } from "./B4l8ufIa.js";
var labelAttrs = createBitsAttrs({
	component: "label",
	parts: ["root"]
});
var LabelRootState = class LabelRootState {
	static create(opts) {
		return new LabelRootState(opts);
	}
	opts;
	attachment;
	constructor(opts) {
		this.opts = opts;
		this.attachment = attachRef(this.opts.ref);
		this.onmousedown = this.onmousedown.bind(this);
	}
	onmousedown(e) {
		if (e.detail > 1) e.preventDefault();
	}
	#props = user_derived(() => ({
		id: this.opts.id.current,
		[labelAttrs.root]: "",
		onmousedown: this.onmousedown,
		...this.attachment
	}));
	get props() {
		return get(this.#props);
	}
	set props(value) {
		set(this.#props, value);
	}
};
var root_2 = from_html(`<label><!></label>`);
function Label$1($$anchor, $$props) {
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
		"for"
	]);
	const rootState = LabelRootState.create({
		id: boxWith(() => id()),
		ref: boxWith(() => ref(), (v) => ref(v))
	});
	const mergedProps = user_derived(() => mergeProps(restProps, rootState.props, { for: $$props.for }));
	var fragment = comment();
	var node = first_child(fragment);
	var consequent = ($$anchor$1) => {
		var fragment_1 = comment();
		snippet(first_child(fragment_1), () => $$props.child, () => ({ props: get(mergedProps) }));
		append($$anchor$1, fragment_1);
	};
	var alternate = ($$anchor$1) => {
		var label = root_2();
		attribute_effect(label, () => ({
			...get(mergedProps),
			for: $$props.for
		}));
		snippet(child(label), () => $$props.children ?? noop);
		reset(label);
		append($$anchor$1, label);
	};
	if_block(node, ($$render) => {
		if ($$props.child) $$render(consequent);
		else $$render(alternate, false);
	});
	append($$anchor, fragment);
	pop();
}
function Label($$anchor, $$props) {
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
		let $0 = user_derived(() => cn("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70", $$props.class));
		component(node, () => Label$1, ($$anchor$1, LabelPrimitive_Root) => {
			LabelPrimitive_Root($$anchor$1, spread_props({ get class() {
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
export { Label as t };
