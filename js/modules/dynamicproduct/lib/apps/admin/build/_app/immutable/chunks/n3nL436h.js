import { C as bind_value, Ft as push, G as if_block, Ot as user_derived, Pt as pop, T as attribute_effect, X as comment, Y as append, Z as from_html, o as prop, ot as get, s as rest_props, yt as first_child } from "./DUscB9kS.js";
import { d as mergeProps } from "./B4l8ufIa.js";
import { n as srOnlyStylesString } from "./Dpo8vieJ.js";
var root_1 = from_html(`<input/>`);
var root_2 = from_html(`<input/>`);
function Hidden_input($$anchor, $$props) {
	push($$props, true);
	let value = prop($$props, "value", 15), restProps = rest_props($$props, [
		"$$slots",
		"$$events",
		"$$legacy",
		"value"
	]);
	const mergedProps = user_derived(() => mergeProps(restProps, {
		"aria-hidden": "true",
		tabindex: -1,
		style: srOnlyStylesString
	}));
	var fragment = comment();
	var node = first_child(fragment);
	var consequent = ($$anchor$1) => {
		var input = root_1();
		attribute_effect(input, () => ({
			...get(mergedProps),
			value: value()
		}), void 0, void 0, void 0, void 0, true);
		append($$anchor$1, input);
	};
	var alternate = ($$anchor$1) => {
		var input_1 = root_2();
		attribute_effect(input_1, () => ({ ...get(mergedProps) }), void 0, void 0, void 0, void 0, true);
		bind_value(input_1, value);
		append($$anchor$1, input_1);
	};
	if_block(node, ($$render) => {
		if (get(mergedProps).type === "checkbox") $$render(consequent);
		else $$render(alternate, false);
	});
	append($$anchor, fragment);
	pop();
}
export { Hidden_input as t };
