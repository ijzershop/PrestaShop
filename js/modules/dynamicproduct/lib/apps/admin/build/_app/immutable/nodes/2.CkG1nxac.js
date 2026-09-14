import { D as set_attribute, Ft as push, G as if_block, L as component, Ot as user_derived, Pt as pop, R as snippet, Ut as reset, V as each, X as comment, Y as append, Z as from_html, Zt as __exportAll, bt as sibling, ot as get, pt as template_effect, q as set_text, vt as child, yt as first_child } from "../chunks/DUscB9kS.js";
import "../chunks/B_W7bg6n.js";
import { t as afterNavigate } from "../chunks/D365qDux.js";
import "../chunks/CEFrIRjK.js";
import { t as browser } from "../chunks/DgeI1AN1.js";
import { f as dpa, o as layout_load, p as in_iframe, t as Button } from "../chunks/BIEFGHhw.js";
import { n as strip_base_path, r as url, t as pathname } from "../chunks/Crb1phnD.js";
import "../chunks/CJDS8lnd.js";
import "../chunks/DAbnHPcz.js";
import { t as Mode_watcher } from "../chunks/zHexzNNA.js";
import { i as dict, n as _, t as Icon } from "../chunks/DFl6Gq92.js";
import { n as page, t as navigating } from "../chunks/BRpqcTWk.js";
import "../chunks/_yKPJ4BA.js";
import "../chunks/T79hDoyY.js";
import { i as Tabs_content, n as Root, r as Tabs_list, t as ModePicker } from "../chunks/CTepkvpL.js";
import { t as LangPicker } from "../chunks/6kTRSPQW.js";
import { a as Card_content, o as Card } from "../chunks/Bpx6gt8W.js";
import "../chunks/C4w9vuey.js";
import { n as lang, t as initLangStore } from "../chunks/cJwMBL5_.js";
import "../chunks/GFXpcJ_Z.js";
import "../chunks/CgH3Vt0F.js";
var _layout_exports = /* @__PURE__ */ __exportAll({
	load: () => load,
	prerender: () => false,
	ssr: () => false,
	trailingSlash: () => trailingSlash
}, 1);
const trailingSlash = "always";
const load = async (event) => {
	const data = await layout_load(event, "/module");
	dpa.id_source_product = data.id_source_product;
	dpa.id_default_lang = data.id_default_lang;
	return data;
};
var root_6 = from_html(`<span class="whitespace-nowrap"> </span>`);
var root_3 = from_html(`<!> <!>`, 1);
var root_11 = from_html(`<!> `, 1);
var root_12 = from_html(`<!> `, 1);
var root_10 = from_html(`<div class="flex gap-2"><!> <!></div>`);
var root = from_html(`<!> <div class="flex flex-col gap-2 p-2"><div class="flex items-center justify-end flex-wrap gap-4"><h1 class="text-xl font-bold flex gap-2 items-center"><img class="size-6" alt="Logo"/> </h1> <span class="ml-auto"></span> <!> <!> <!></div> <!> <!></div>`, 1);
function _layout($$anchor, $$props) {
	push($$props, true);
	dict.translations = $$props.data.translations;
	let tabs_list = [
		{
			label: _("Config"),
			href: url("/module/?home")
		},
		{
			label: _("Units"),
			href: url("/module/units")
		},
		{
			label: _("Field groups"),
			href: url("/module/field-groups")
		},
		{
			label: _("Steps"),
			href: url("/module/steps")
		},
		{
			label: _("Custom code"),
			href: url("/module/custom-code")
		}
	].map((tab) => ({
		condition: () => true,
		...tab
	})).filter((tab) => tab.condition());
	initLangStore(lang.value || $$props.data.id_default_lang.toString());
	afterNavigate(({ to }) => {
		const path = strip_base_path(to?.url.pathname);
		if (path && browser && window.top && window.top !== window) {
			const url$1 = new URL(window.top?.location.href ?? "");
			url$1.searchParams.set("initial_path", path.replace(/^\//, ""));
			window.top.history.replaceState({}, "", url$1.toString());
		}
	});
	var fragment = root();
	var node = first_child(fragment);
	Mode_watcher(node, {});
	var div = sibling(node, 2);
	var div_1 = child(div);
	var h1 = child(div_1);
	var img = child(h1);
	var text = sibling(img);
	reset(h1);
	var node_1 = sibling(h1, 4);
	LangPicker(node_1, { get languages() {
		return $$props.data.languages;
	} });
	var node_2 = sibling(node_1, 2);
	ModePicker(node_2, {});
	var node_3 = sibling(node_2, 2);
	var consequent = ($$anchor$1) => {
		{
			let $0 = user_derived(() => _("Reload this section"));
			Button($$anchor$1, {
				onclick: () => location.href = url("/?initial_path=" + strip_base_path(page.url.pathname)),
				get title() {
					return get($0);
				},
				type: "button",
				children: ($$anchor$2, $$slotProps) => {
					Icon($$anchor$2, { icon: "mdi:reload" });
				},
				$$slots: { default: true }
			});
		}
	};
	if_block(node_3, ($$render) => {
		if (in_iframe) $$render(consequent);
	});
	reset(div_1);
	var node_4 = sibling(div_1, 2);
	component(node_4, () => Root, ($$anchor$1, Tabs_Root) => {
		Tabs_Root($$anchor$1, {
			value: "content",
			children: ($$anchor$2, $$slotProps) => {
				var fragment_3 = root_3();
				var node_5 = first_child(fragment_3);
				component(node_5, () => Tabs_list, ($$anchor$3, Tabs_List) => {
					Tabs_List($$anchor$3, {
						class: "shrink-0",
						children: ($$anchor$4, $$slotProps$1) => {
							var fragment_4 = comment();
							each(first_child(fragment_4), 17, () => tabs_list, ({ label, href }) => href, ($$anchor$5, $$item) => {
								let label = () => get($$item).label;
								let href = () => get($$item).href;
								const current_pathname = user_derived(() => page.url.pathname.replace(/\/$/, ""));
								const next_pathname = user_derived(() => navigating.to?.url.pathname.replace(/\/$/, ""));
								const tab_pathname = user_derived(() => pathname(href()).replace(/\/$/, ""));
								const active = user_derived(() => get(current_pathname) === get(tab_pathname) && !get(next_pathname) || get(current_pathname) !== get(tab_pathname) && get(next_pathname) === get(tab_pathname));
								{
									let $0 = user_derived(() => get(active) ? "underline" : "");
									Button($$anchor$5, {
										get href() {
											return href();
										},
										get class() {
											return `w-full justify-start ${get($0) ?? ""}`;
										},
										variant: "link",
										get title() {
											return label();
										},
										children: ($$anchor$6, $$slotProps$2) => {
											var span = root_6();
											var text_1 = child(span, true);
											reset(span);
											template_effect(() => set_text(text_1, label()));
											append($$anchor$6, span);
										},
										$$slots: { default: true }
									});
								}
							});
							append($$anchor$4, fragment_4);
						},
						$$slots: { default: true }
					});
				});
				component(sibling(node_5, 2), () => Tabs_content, ($$anchor$3, Tabs_Content) => {
					Tabs_Content($$anchor$3, {
						value: "content",
						children: ($$anchor$4, $$slotProps$1) => {
							var fragment_6 = comment();
							component(first_child(fragment_6), () => Card, ($$anchor$5, Card_Root) => {
								Card_Root($$anchor$5, {
									children: ($$anchor$6, $$slotProps$2) => {
										var fragment_7 = comment();
										snippet(first_child(fragment_7), () => $$props.children);
										append($$anchor$6, fragment_7);
									},
									$$slots: { default: true }
								});
							});
							append($$anchor$4, fragment_6);
						},
						$$slots: { default: true }
					});
				});
				append($$anchor$2, fragment_3);
			},
			$$slots: { default: true }
		});
	});
	component(sibling(node_4, 2), () => Card, ($$anchor$1, Card_Root_1) => {
		Card_Root_1($$anchor$1, {
			children: ($$anchor$2, $$slotProps) => {
				var fragment_8 = comment();
				component(first_child(fragment_8), () => Card_content, ($$anchor$3, Card_Content) => {
					Card_Content($$anchor$3, {
						children: ($$anchor$4, $$slotProps$1) => {
							var div_2 = root_10();
							var node_12 = child(div_2);
							Button(node_12, {
								variant: "outline",
								target: "_parent",
								get href() {
									return $$props.data.links.troubleshooter;
								},
								children: ($$anchor$5, $$slotProps$2) => {
									var fragment_9 = root_11();
									var node_13 = first_child(fragment_9);
									Icon(node_13, { icon: "ic:outline-auto-fix-high" });
									var text_2 = sibling(node_13);
									template_effect(($0) => set_text(text_2, ` ${$0 ?? ""}`), [() => _("Troubleshoot")]);
									append($$anchor$5, fragment_9);
								},
								$$slots: { default: true }
							});
							Button(sibling(node_12, 2), {
								variant: "outline",
								target: "_parent",
								get href() {
									return $$props.data.links.upgrade_checker;
								},
								children: ($$anchor$5, $$slotProps$2) => {
									var fragment_10 = root_12();
									var node_15 = first_child(fragment_10);
									Icon(node_15, { icon: "ic:round-playlist-add-check" });
									var text_3 = sibling(node_15);
									template_effect(($0) => set_text(text_3, ` ${$0 ?? ""}`), [() => _("Upgrade Checker")]);
									append($$anchor$5, fragment_10);
								},
								$$slots: { default: true }
							});
							reset(div_2);
							append($$anchor$4, div_2);
						},
						$$slots: { default: true }
					});
				});
				append($$anchor$2, fragment_8);
			},
			$$slots: { default: true }
		});
	});
	reset(div);
	template_effect(($0) => {
		set_attribute(img, "src", `${dpa.urls.base_uri ?? ""}/modules/dynamicproduct/logo.png`);
		set_text(text, ` ${$0 ?? ""}`);
	}, [() => _("Dynamic Product")]);
	append($$anchor, fragment);
	pop();
}
export { _layout as component, _layout_exports as universal };
