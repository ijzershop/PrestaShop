import { Dt as derived_safe_equal, Ft as push, Ht as next, Pt as pop, Ut as reset, Y as append, Z as from_html, bt as sibling, et as text, ot as get, v as init, vt as child, yt as first_child } from "../chunks/DUscB9kS.js";
import "../chunks/B_W7bg6n.js";
import "../chunks/CEFrIRjK.js";
import { t as Button } from "../chunks/BIEFGHhw.js";
import { r as url } from "../chunks/Crb1phnD.js";
/* empty css                 */
import "../chunks/DAbnHPcz.js";
import { a as Card_content, i as Card_description, n as Card_header, o as Card, t as Card_title } from "../chunks/Bpx6gt8W.js";
var root_2 = from_html(`<!> <!>`, 1);
var root_5 = from_html(`<div class="flex flex-col gap-2"><!> <!></div>`);
var root_1 = from_html(`<!> <!>`, 1);
function _page($$anchor, $$props) {
	push($$props, false);
	init();
	Card($$anchor, {
		class: "w-full max-w-sm mx-auto my-12",
		children: ($$anchor$1, $$slotProps) => {
			var fragment_1 = root_1();
			var node = first_child(fragment_1);
			Card_header(node, {
				children: ($$anchor$2, $$slotProps$1) => {
					var fragment_2 = root_2();
					var node_1 = first_child(fragment_2);
					Card_title(node_1, {
						children: ($$anchor$3, $$slotProps$2) => {
							next();
							append($$anchor$3, text("DynamicProduct"));
						},
						$$slots: { default: true }
					});
					Card_description(sibling(node_1, 2), {
						children: ($$anchor$3, $$slotProps$2) => {
							next();
							append($$anchor$3, text("Click the buttons below to configure your product or module."));
						},
						$$slots: { default: true }
					});
					append($$anchor$2, fragment_2);
				},
				$$slots: { default: true }
			});
			Card_content(sibling(node, 2), {
				children: ($$anchor$2, $$slotProps$1) => {
					var div = root_5();
					var node_4 = child(div);
					{
						let $0 = derived_safe_equal(() => url("/product"));
						Button(node_4, {
							get href() {
								return get($0);
							},
							children: ($$anchor$3, $$slotProps$2) => {
								next();
								append($$anchor$3, text("Product config"));
							},
							$$slots: { default: true }
						});
					}
					var node_5 = sibling(node_4, 2);
					{
						let $0 = derived_safe_equal(() => url("/module"));
						Button(node_5, {
							variant: "outline",
							get href() {
								return get($0);
							},
							children: ($$anchor$3, $$slotProps$2) => {
								next();
								append($$anchor$3, text("Module config"));
							},
							$$slots: { default: true }
						});
					}
					reset(div);
					append($$anchor$2, div);
				},
				$$slots: { default: true }
			});
			append($$anchor$1, fragment_1);
		},
		$$slots: { default: true }
	});
	pop();
}
export { _page as component };
