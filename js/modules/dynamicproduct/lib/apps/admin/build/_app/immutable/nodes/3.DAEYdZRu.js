import { Dt as derived_safe_equal, Ft as push, G as if_block, Ht as next, Pt as pop, Ut as reset, Y as append, Z as from_html, bt as sibling, et as text, ot as get, pt as template_effect, q as set_text, v as init, vt as child, yt as first_child } from "../chunks/DUscB9kS.js";
import "../chunks/B_W7bg6n.js";
import "../chunks/D365qDux.js";
import "../chunks/CEFrIRjK.js";
import { t as Button } from "../chunks/BIEFGHhw.js";
import { r as url } from "../chunks/Crb1phnD.js";
import "../chunks/DAbnHPcz.js";
import { n as _, t as Icon } from "../chunks/DFl6Gq92.js";
import { n as page } from "../chunks/BRpqcTWk.js";
import { n as Alert_description, r as Alert, t as Alert_title } from "../chunks/OMr53o_L.js";
var root_2 = from_html(` <!>`, 1);
var root_1 = from_html(`<!> <!> <!>`, 1);
var root_5 = from_html(`<!> `, 1);
var root = from_html(`<div class="flex flex-col gap-4 p-4"><!> <!></div>`);
function _error($$anchor, $$props) {
	push($$props, false);
	init();
	var div = root();
	var node = child(div);
	Alert(node, {
		variant: "destructive",
		children: ($$anchor$1, $$slotProps) => {
			var fragment = root_1();
			var node_1 = first_child(fragment);
			Icon(node_1, { icon: "ic:baseline-warning" });
			var node_2 = sibling(node_1, 2);
			Alert_title(node_2, {
				children: ($$anchor$2, $$slotProps$1) => {
					next();
					var fragment_1 = root_2();
					var text$1 = first_child(fragment_1);
					var node_3 = sibling(text$1);
					var consequent = ($$anchor$3) => {
						var text_1 = text();
						template_effect(() => set_text(text_1, `(${page.error.message ?? ""})`));
						append($$anchor$3, text_1);
					};
					if_block(node_3, ($$render) => {
						if (page.error) $$render(consequent);
					});
					template_effect(($0) => set_text(text$1, `${$0 ?? ""}
			${page.status ?? ""} `), [() => _("Error")]);
					append($$anchor$2, fragment_1);
				},
				$$slots: { default: true }
			});
			Alert_description(sibling(node_2, 2), {
				children: ($$anchor$2, $$slotProps$1) => {
					next();
					var text_2 = text();
					template_effect(($0) => set_text(text_2, $0), [() => _("An error occurred while displaying this page!")]);
					append($$anchor$2, text_2);
				},
				$$slots: { default: true }
			});
			append($$anchor$1, fragment);
		},
		$$slots: { default: true }
	});
	var node_5 = sibling(node, 2);
	{
		let $0 = derived_safe_equal(() => url("/"));
		Button(node_5, {
			class: "w-fit",
			get href() {
				return get($0);
			},
			children: ($$anchor$1, $$slotProps) => {
				var fragment_4 = root_5();
				var node_6 = first_child(fragment_4);
				Icon(node_6, { icon: "ic:outline-arrow-back" });
				var text_3 = sibling(node_6);
				template_effect(($0$1) => set_text(text_3, ` ${$0$1 ?? ""}`), [() => _("Back to the home page")]);
				append($$anchor$1, fragment_4);
			},
			$$slots: { default: true }
		});
	}
	reset(div);
	append($$anchor, div);
	pop();
}
export { _error as component };
