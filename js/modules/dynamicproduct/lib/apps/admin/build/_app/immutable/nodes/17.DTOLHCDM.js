import { B as html, Ct as set, Ft as push, G as if_block, Ht as next, L as component, N as action, Ot as user_derived, Pt as pop, Tt as state, Ut as reset, V as each, X as comment, Y as append, Z as from_html, Zt as __exportAll, bt as sibling, d as store_mutate, et as text, l as setup_stores, lt as untrack, ot as get, pt as template_effect, q as set_text, r as onMount, u as store_get, vt as child, yt as first_child } from "../chunks/DUscB9kS.js";
import "../chunks/B_W7bg6n.js";
import { a as goto } from "../chunks/D365qDux.js";
import { i as superForm, n as superValidate, t as valibot } from "../chunks/CPdJ2mnA.js";
import "../chunks/D-Alr120.js";
import "../chunks/CEFrIRjK.js";
import { t as browser } from "../chunks/DgeI1AN1.js";
import { a as form_action, s as page_load, t as Button } from "../chunks/BIEFGHhw.js";
import { r as url } from "../chunks/Crb1phnD.js";
import { n as toast } from "../chunks/CQQo25vS.js";
import "../chunks/CJDS8lnd.js";
import "../chunks/DAbnHPcz.js";
import { n as _, t as Icon } from "../chunks/DFl6Gq92.js";
import { n as page } from "../chunks/BRpqcTWk.js";
import "../chunks/_yKPJ4BA.js";
import "../chunks/CgH3Vt0F.js";
import { t as Spinner } from "../chunks/C9eHbt79.js";
import "../chunks/BirQbuIK.js";
import "../chunks/BAR_jctJ.js";
import "../chunks/CAZFn-OP.js";
import { t as highlight } from "../chunks/Dt-VaJa3.js";
import { a as CalculationItemType, i as CalculationItemsSchema, t as getItemColor } from "../chunks/6qQCdF4o.js";
import { t as sort } from "../chunks/Bz4g0JZD.js";
/* empty css                 */
import { a as Sheet_header, i as Sheet_footer, n as Sheet_description, o as Sheet_content, r as Sheet_title, t as Root } from "../chunks/5Ks3C72h.js";
var _page_exports = /* @__PURE__ */ __exportAll({
	load: () => load,
	prerender: () => false
}, 1);
const load = async (event) => {
	const { items } = await page_load(event);
	return {
		form: await superValidate({ selected: [] }, valibot(CalculationItemsSchema)),
		items
	};
};
var root_3 = from_html(`<!> <!>`, 1);
var root_8 = from_html(`<span> </span>`);
var root_10 = from_html(`<span class="font-mono text-wrap leading-6 text-left"><span class="text-muted-foreground">IF(</span> <!> <span class="text-muted-foreground">)</span></span>`);
var root_11 = from_html(`<span> </span>`);
var root_12 = from_html(`<div class="flex items-center justify-center justify-self-end rounded-sm bg-gray-600 p-1 text-white"> </div>`);
var root_7 = from_html(`<div class="flex w-full gap-2"><div class="grid w-full items-center gap-4"><!></div> <!></div>`);
var root_14 = from_html(`<!> `, 1);
var root_15 = from_html(`<!> `, 1);
var root_17 = from_html(`<!> `, 1);
var root_19 = from_html(`<!> `, 1);
var root_13 = from_html(`<!> <!> <!> <!>`, 1);
var root_2 = from_html(`<!> <form method="post" target="dialog"><div class="flex flex-col gap-4 py-4"></div> <!></form>`, 1);
function _page($$anchor, $$props) {
	push($$props, true);
	const $form = () => store_get(form, "$form", $$stores);
	const $submitting = () => store_get(submitting, "$submitting", $$stores);
	const [$$stores, $$cleanup] = setup_stores();
	const { form, enhance, submitting } = superForm($$props.data.form, {
		dataType: "json",
		resetForm: false,
		invalidateAll: true,
		async onSubmit({ cancel, submitter }) {
			let action$1 = submitter?.getAttribute("name") || "";
			store_mutate(form, untrack($form).action_name = action$1, untrack($form));
			const res = await form_action({
				route: page.route.id,
				action: action$1,
				data: { selected: $form().selected }
			});
			store_mutate(form, untrack($form).action_name = "", untrack($form));
			if (res) {
				if (res.error) {
					toast.error(res.message);
					cancel();
					return;
				}
				toast.success(_("Calculation items updated successfully"));
			}
			await goto(url("/product/calculation"), {
				invalidateAll: true,
				noScroll: true
			});
			store_mutate(form, untrack($form).action_name = "", untrack($form));
			cancel();
		}
	});
	let open = state(false);
	onMount(() => {
		set(open, true);
	});
	let items = user_derived(() => sort($$props.data.items));
	var fragment = comment();
	component(first_child(fragment), () => Root, ($$anchor$1, Sheet_Root) => {
		Sheet_Root($$anchor$1, {
			onOpenChangeComplete: () => !get(open) && goto(url("/product/calculation"), { noScroll: true }),
			get open() {
				return get(open);
			},
			set open($$value) {
				set(open, $$value, true);
			},
			children: ($$anchor$2, $$slotProps) => {
				var fragment_1 = comment();
				component(first_child(fragment_1), () => Sheet_content, ($$anchor$3, Sheet_Content) => {
					Sheet_Content($$anchor$3, {
						class: "w-[800px] overflow-scroll sm:max-w-none",
						children: ($$anchor$4, $$slotProps$1) => {
							var fragment_2 = root_2();
							var node_2 = first_child(fragment_2);
							component(node_2, () => Sheet_header, ($$anchor$5, Sheet_Header) => {
								Sheet_Header($$anchor$5, {
									children: ($$anchor$6, $$slotProps$2) => {
										var fragment_3 = root_3();
										var node_3 = first_child(fragment_3);
										component(node_3, () => Sheet_title, ($$anchor$7, Sheet_Title) => {
											Sheet_Title($$anchor$7, {
												children: ($$anchor$8, $$slotProps$3) => {
													next();
													var text$1 = text();
													template_effect(($0) => set_text(text$1, $0), [() => _("Add condition")]);
													append($$anchor$8, text$1);
												},
												$$slots: { default: true }
											});
										});
										component(sibling(node_3, 2), () => Sheet_description, ($$anchor$7, Sheet_Description) => {
											Sheet_Description($$anchor$7, {
												children: ($$anchor$8, $$slotProps$3) => {
													next();
													var text_1 = text();
													template_effect(($0) => set_text(text_1, $0), [() => _("Click on an item to select it.")]);
													append($$anchor$8, text_1);
												},
												$$slots: { default: true }
											});
										});
										append($$anchor$6, fragment_3);
									},
									$$slots: { default: true }
								});
							});
							var form_1 = sibling(node_2, 2);
							var div = child(form_1);
							each(div, 21, () => get(items), ({ id, formula }) => id, ($$anchor$5, $$item) => {
								let id = () => get($$item).id;
								let formula = () => get($$item).formula;
								{
									let $0 = user_derived(() => $form().selected.includes(id()) ? `border-color: ${getItemColor(CalculationItemType.CONDITION_ITEM)}` : "");
									Button($$anchor$5, {
										onclick: () => {
											if ($form().selected.includes(id())) store_mutate(form, untrack($form).selected = $form().selected.filter((i) => i !== id()), untrack($form));
											else store_mutate(form, untrack($form).selected = [...$form().selected, id()], untrack($form));
										},
										variant: "outline",
										class: "text-left",
										get style() {
											return get($0);
										},
										type: "button",
										children: ($$anchor$6, $$slotProps$2) => {
											var div_1 = root_7();
											var div_2 = child(div_1);
											var node_5 = child(div_2);
											var consequent = ($$anchor$7) => {
												var span = root_8();
												var text_2 = child(span, true);
												reset(span);
												template_effect(() => set_text(text_2, formula()));
												append($$anchor$7, span);
											};
											var alternate_1 = ($$anchor$7) => {
												var fragment_7 = comment();
												var node_6 = first_child(fragment_7);
												var consequent_1 = ($$anchor$8) => {
													var span_1 = root_10();
													html(sibling(child(span_1), 2), () => highlight(formula()));
													next(2);
													reset(span_1);
													append($$anchor$8, span_1);
												};
												var alternate = ($$anchor$8) => {
													var span_2 = root_11();
													var text_3 = child(span_2, true);
													reset(span_2);
													template_effect(($0$1) => set_text(text_3, $0$1), [() => _("No formula was configured yet")]);
													append($$anchor$8, span_2);
												};
												if_block(node_6, ($$render) => {
													if (formula()) $$render(consequent_1);
													else $$render(alternate, false);
												}, true);
												append($$anchor$7, fragment_7);
											};
											if_block(node_5, ($$render) => {
												if (!browser) $$render(consequent);
												else $$render(alternate_1, false);
											});
											reset(div_2);
											var node_8 = sibling(div_2, 2);
											var consequent_2 = ($$anchor$7) => {
												var div_3 = root_12();
												var text_4 = child(div_3, true);
												reset(div_3);
												template_effect(($0$1) => set_text(text_4, $0$1), [() => $form().selected.indexOf(id()) + 1]);
												append($$anchor$7, div_3);
											};
											if_block(node_8, ($$render) => {
												if ($form().selected.includes(id())) $$render(consequent_2);
											});
											reset(div_1);
											append($$anchor$6, div_1);
										},
										$$slots: { default: true }
									});
								}
							});
							reset(div);
							component(sibling(div, 2), () => Sheet_footer, ($$anchor$5, Sheet_Footer) => {
								Sheet_Footer($$anchor$5, {
									class: "sm:justify-start",
									children: ($$anchor$6, $$slotProps$2) => {
										var fragment_8 = root_13();
										var node_10 = first_child(fragment_8);
										Button(node_10, {
											class: "flex gap-2",
											onclick: () => set(open, false),
											variant: "outline",
											children: ($$anchor$7, $$slotProps$3) => {
												var fragment_9 = root_14();
												var node_11 = first_child(fragment_9);
												Icon(node_11, { icon: "mdi:arrow-left" });
												var text_5 = sibling(node_11);
												template_effect(($0) => set_text(text_5, ` ${$0 ?? ""}`), [() => _("Cancel")]);
												append($$anchor$7, fragment_9);
											},
											$$slots: { default: true }
										});
										var node_12 = sibling(node_10, 2);
										Button(node_12, {
											class: "flex gap-2",
											name: "add_single_step",
											type: "submit",
											children: ($$anchor$7, $$slotProps$3) => {
												var fragment_10 = root_15();
												var node_13 = first_child(fragment_10);
												{
													let $0 = user_derived(() => $submitting() && $form().action_name === "add_single_step");
													Spinner(node_13, {
														get loading() {
															return get($0);
														},
														children: ($$anchor$8, $$slotProps$4) => {
															Icon($$anchor$8, { icon: "ic:sharp-format-line-spacing" });
														},
														$$slots: { default: true }
													});
												}
												var text_6 = sibling(node_13);
												template_effect(($0) => set_text(text_6, ` ${$0 ?? ""}`), [() => _("Insert as one step")]);
												append($$anchor$7, fragment_10);
											},
											$$slots: { default: true }
										});
										var node_14 = sibling(node_12, 2);
										Button(node_14, {
											class: "flex gap-2",
											name: "add_all",
											type: "submit",
											children: ($$anchor$7, $$slotProps$3) => {
												var fragment_12 = root_17();
												var node_15 = first_child(fragment_12);
												{
													let $0 = user_derived(() => $submitting() && $form().action_name === "add_all");
													Spinner(node_15, {
														get loading() {
															return get($0);
														},
														children: ($$anchor$8, $$slotProps$4) => {
															Icon($$anchor$8, { icon: "ic:baseline-format-list-numbered" });
														},
														$$slots: { default: true }
													});
												}
												var text_7 = sibling(node_15);
												template_effect(($0) => set_text(text_7, ` ${$0 ?? ""}`), [() => _("Insert all items")]);
												append($$anchor$7, fragment_12);
											},
											$$slots: { default: true }
										});
										Button(sibling(node_14, 2), {
											class: "flex gap-2",
											name: "add_selected",
											type: "submit",
											children: ($$anchor$7, $$slotProps$3) => {
												var fragment_14 = root_19();
												var node_17 = first_child(fragment_14);
												{
													let $0 = user_derived(() => $submitting() && $form().action_name === "add_selected");
													Spinner(node_17, {
														get loading() {
															return get($0);
														},
														children: ($$anchor$8, $$slotProps$4) => {
															Icon($$anchor$8, { icon: "ic:outline-playlist-add-check" });
														},
														$$slots: { default: true }
													});
												}
												var text_8 = sibling(node_17);
												template_effect(($0) => set_text(text_8, ` ${$0 ?? ""}`), [() => _("Insert selected items")]);
												append($$anchor$7, fragment_14);
											},
											$$slots: { default: true }
										});
										append($$anchor$6, fragment_8);
									},
									$$slots: { default: true }
								});
							});
							reset(form_1);
							action(form_1, ($$node) => enhance?.($$node));
							append($$anchor$4, fragment_2);
						},
						$$slots: { default: true }
					});
				});
				append($$anchor$2, fragment_1);
			},
			$$slots: { default: true }
		});
	});
	append($$anchor, fragment);
	pop();
	$$cleanup();
}
export { _page as component, _page_exports as universal };
