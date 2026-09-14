import { F as element, Ft as push, H as index, Ot as user_derived, Pt as pop, Q as from_svg, T as attribute_effect, Ut as reset, V as each, X as comment, Y as append, a as legacy_rest_props, at as deep_read_state, bt as sibling, c as spread_props, lt as untrack, o as prop, ot as get, qt as to_array, v as init, vt as child, yt as first_child, z as slot } from "./DUscB9kS.js";
var defaultAttributes_default = {
	xmlns: "http://www.w3.org/2000/svg",
	width: 24,
	height: 24,
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	"stroke-width": 2,
	"stroke-linecap": "round",
	"stroke-linejoin": "round"
};
var root = from_svg(`<svg><!><!></svg>`);
function Icon($$anchor, $$props) {
	const $$sanitized_props = legacy_rest_props($$props, [
		"children",
		"$$slots",
		"$$events",
		"$$legacy"
	]);
	const $$restProps = legacy_rest_props($$sanitized_props, [
		"name",
		"color",
		"size",
		"strokeWidth",
		"absoluteStrokeWidth",
		"iconNode"
	]);
	push($$props, false);
	let name = prop($$props, "name", 8, void 0);
	let color = prop($$props, "color", 8, "currentColor");
	let size = prop($$props, "size", 8, 24);
	let strokeWidth = prop($$props, "strokeWidth", 8, 2);
	let absoluteStrokeWidth = prop($$props, "absoluteStrokeWidth", 8, false);
	let iconNode = prop($$props, "iconNode", 24, () => []);
	const mergeClasses = (...classes) => classes.filter((className, index$1, array) => {
		return Boolean(className) && array.indexOf(className) === index$1;
	}).join(" ");
	init();
	var svg = root();
	attribute_effect(svg, ($0, $1) => ({
		...defaultAttributes_default,
		...$$restProps,
		width: size(),
		height: size(),
		stroke: color(),
		"stroke-width": $0,
		class: $1
	}), [() => (deep_read_state(absoluteStrokeWidth()), deep_read_state(strokeWidth()), deep_read_state(size()), untrack(() => absoluteStrokeWidth() ? Number(strokeWidth()) * 24 / Number(size()) : strokeWidth())), () => (deep_read_state(name()), deep_read_state($$sanitized_props), untrack(() => mergeClasses("lucide-icon", "lucide", name() ? `lucide-${name()}` : "", $$sanitized_props.class)))]);
	var node = child(svg);
	each(node, 1, iconNode, index, ($$anchor$1, $$item) => {
		var $$array = user_derived(() => to_array(get($$item), 2));
		let tag = () => get($$array)[0];
		let attrs = () => get($$array)[1];
		var fragment = comment();
		element(first_child(fragment), tag, true, ($$element, $$anchor$2) => {
			attribute_effect($$element, () => ({ ...attrs() }));
		});
		append($$anchor$1, fragment);
	});
	slot(sibling(node), $$props, "default", {}, null);
	reset(svg);
	append($$anchor, svg);
	pop();
}
function Check($$anchor, $$props) {
	const $$sanitized_props = legacy_rest_props($$props, [
		"children",
		"$$slots",
		"$$events",
		"$$legacy"
	]);
	/**
	* @license lucide-svelte v0.562.0 - ISC
	*
	* ISC License
	*
	* Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2023 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2025.
	*
	* Permission to use, copy, modify, and/or distribute this software for any
	* purpose with or without fee is hereby granted, provided that the above
	* copyright notice and this permission notice appear in all copies.
	*
	* THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
	* WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
	* MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
	* ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
	* WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
	* ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
	* OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
	*
	* ---
	*
	* The MIT License (MIT) (for portions derived from Feather)
	*
	* Copyright (c) 2013-2023 Cole Bemis
	*
	* Permission is hereby granted, free of charge, to any person obtaining a copy
	* of this software and associated documentation files (the "Software"), to deal
	* in the Software without restriction, including without limitation the rights
	* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	* copies of the Software, and to permit persons to whom the Software is
	* furnished to do so, subject to the following conditions:
	*
	* The above copyright notice and this permission notice shall be included in all
	* copies or substantial portions of the Software.
	*
	* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	* SOFTWARE.
	*
	*/
	const iconNode = [["path", { "d": "M20 6 9 17l-5-5" }]];
	Icon($$anchor, spread_props({ name: "check" }, () => $$sanitized_props, {
		get iconNode() {
			return iconNode;
		},
		children: ($$anchor$1, $$slotProps) => {
			var fragment_1 = comment();
			slot(first_child(fragment_1), $$props, "default", {}, null);
			append($$anchor$1, fragment_1);
		},
		$$slots: { default: true }
	}));
}
export { Icon as n, Check as t };
