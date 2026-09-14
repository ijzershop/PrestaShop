import { Ft as push, Pt as pop, Ut as reset, Y as append, Z as from_html, bt as sibling, pt as template_effect, q as set_text, v as init, vt as child, yt as first_child } from "../chunks/DUscB9kS.js";
import "../chunks/B_W7bg6n.js";
import "../chunks/D365qDux.js";
import "../chunks/CEFrIRjK.js";
import "../chunks/DAbnHPcz.js";
import { n as page } from "../chunks/BRpqcTWk.js";
var root = from_html(`<h1> </h1> <p> </p>`, 1);
function Error($$anchor, $$props) {
	push($$props, false);
	init();
	var fragment = root();
	var h1 = first_child(fragment);
	var text = child(h1, true);
	reset(h1);
	var p = sibling(h1, 2);
	var text_1 = child(p, true);
	reset(p);
	template_effect(() => {
		set_text(text, page.status);
		set_text(text_1, page.error?.message);
	});
	append($$anchor, fragment);
	pop();
}
export { Error as component };
