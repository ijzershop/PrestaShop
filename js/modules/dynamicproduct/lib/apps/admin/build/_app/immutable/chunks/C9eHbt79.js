import { G as if_block, R as snippet, X as comment, Y as append, yt as first_child } from "./DUscB9kS.js";
import { t as Icon } from "./DFl6Gq92.js";
function Spinner($$anchor, $$props) {
	var fragment = comment();
	var node = first_child(fragment);
	var consequent = ($$anchor$1) => {
		Icon($$anchor$1, { icon: "svg-spinners:90-ring-with-bg" });
	};
	var alternate = ($$anchor$1) => {
		var fragment_2 = comment();
		snippet(first_child(fragment_2), () => $$props.children);
		append($$anchor$1, fragment_2);
	};
	if_block(node, ($$render) => {
		if ($$props.loading) $$render(consequent);
		else $$render(alternate, false);
	});
	append($$anchor, fragment);
}
export { Spinner as t };
