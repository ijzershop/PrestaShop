import { C as bind_value, Ft as push, G as if_block, Pt as pop, S as bind_files, T as attribute_effect, X as comment, Y as append, Z as from_html, b as bind_this, o as prop, s as rest_props, yt as first_child } from "./DUscB9kS.js";
import { r as cn } from "./BIEFGHhw.js";
var root_1 = from_html(`<input/>`);
var root_2 = from_html(`<input/>`);
function Input($$anchor, $$props) {
	push($$props, true);
	let ref = prop($$props, "ref", 15, null), value = prop($$props, "value", 15), files = prop($$props, "files", 15), restProps = rest_props($$props, [
		"$$slots",
		"$$events",
		"$$legacy",
		"ref",
		"value",
		"type",
		"files",
		"class"
	]);
	var fragment = comment();
	var node = first_child(fragment);
	var consequent = ($$anchor$1) => {
		var input = root_1();
		attribute_effect(input, ($0) => ({
			class: $0,
			type: "file",
			...restProps
		}), [() => cn("border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-base file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", $$props.class)], void 0, void 0, void 0, true);
		bind_this(input, ($$value) => ref($$value), () => ref());
		bind_files(input, files);
		bind_value(input, value);
		append($$anchor$1, input);
	};
	var alternate = ($$anchor$1) => {
		var input_1 = root_2();
		attribute_effect(input_1, ($0) => ({
			class: $0,
			type: $$props.type,
			...restProps
		}), [() => cn("border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-base file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", $$props.class)], void 0, void 0, void 0, true);
		bind_this(input_1, ($$value) => ref($$value), () => ref());
		bind_value(input_1, value);
		append($$anchor$1, input_1);
	};
	if_block(node, ($$render) => {
		if ($$props.type === "file") $$render(consequent);
		else $$render(alternate, false);
	});
	append($$anchor, fragment);
	pop();
}
export { Input as t };
