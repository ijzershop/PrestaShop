import { B as html, Ct as set, Ft as push, G as if_block, Ht as next, L as component, N as action, Ot as user_derived, Pt as pop, Tt as state, Ut as reset, V as each, X as comment, Y as append, Z as from_html, Zt as __exportAll, b as bind_this, bt as sibling, d as store_mutate, et as text, l as setup_stores, lt as untrack, mt as user_effect, o as prop, ot as get, pt as template_effect, q as set_text, qt as to_array, u as store_get, vt as child, xt as proxy, yt as first_child } from "../chunks/DUscB9kS.js";
import "../chunks/B_W7bg6n.js";
import "../chunks/D365qDux.js";
import { i as superForm, n as superValidate, t as valibot } from "../chunks/CPdJ2mnA.js";
import "../chunks/D-Alr120.js";
import "../chunks/CEFrIRjK.js";
import { t as browser } from "../chunks/DgeI1AN1.js";
import { a as form_action, n as buttonVariants, s as page_load, t as Button } from "../chunks/BIEFGHhw.js";
import { n as toast } from "../chunks/CQQo25vS.js";
import "../chunks/CJDS8lnd.js";
import "../chunks/DAbnHPcz.js";
import { n as _, t as Icon } from "../chunks/DFl6Gq92.js";
import { n as page } from "../chunks/BRpqcTWk.js";
import "../chunks/_yKPJ4BA.js";
import "../chunks/T79hDoyY.js";
import { t as Label } from "../chunks/ClKKfzS1.js";
import { a as Card_content, i as Card_description, n as Card_header, o as Card, t as Card_title } from "../chunks/Bpx6gt8W.js";
import "../chunks/C4w9vuey.js";
import "../chunks/cJwMBL5_.js";
import "../chunks/CgH3Vt0F.js";
import { d as optional, g as string, l as number, n as array, u as object } from "../chunks/Da0rmiev.js";
import { t as Spinner } from "../chunks/C9eHbt79.js";
import { a as Dialog_content, c as Dialog_title, i as Dialog_description, n as Root, o as Dialog_header, r as Trigger, s as Dialog_footer } from "../chunks/Bc1vuzVu.js";
import "../chunks/BirQbuIK.js";
import "../chunks/BAR_jctJ.js";
import "../chunks/CAZFn-OP.js";
import { t as highlight } from "../chunks/Dt-VaJa3.js";
/* empty css                 */
import "../chunks/D2YUxW8P.js";
import { n as fields_filter, t as FieldsFilter } from "../chunks/B8OVl6Sc.js";
import { i as CodeMirror, n as SymbolBtn, r as FieldBtn, t as generateSymbols } from "../chunks/CZwT-Fpx.js";
const FormulasSchema = object({
	action_value: string(),
	formulas: array(object({
		id_formula: number(),
		formula: string(),
		editable_formula: optional(string())
	}))
});
var _page_exports = /* @__PURE__ */ __exportAll({ load: () => load }, 1);
const load = async (event) => {
	const { formulas, fields, attributes, features, databases, ps_fields } = await page_load(event);
	return {
		form: await superValidate({ formulas }, valibot(FormulasSchema)),
		fields,
		attributes,
		features,
		databases,
		ps_fields
	};
};
let EquationType = /* @__PURE__ */ function(EquationType$1) {
	EquationType$1[EquationType$1["_DP_PRICE_EQ_"] = 0] = "_DP_PRICE_EQ_";
	EquationType$1[EquationType$1["_DP_WEIGHT_EQ_"] = 1] = "_DP_WEIGHT_EQ_";
	EquationType$1[EquationType$1["_DP_QUANTITY_EQ_"] = 2] = "_DP_QUANTITY_EQ_";
	EquationType$1[EquationType$1["_DP_COST_EQ_"] = 3] = "_DP_COST_EQ_";
	return EquationType$1;
}({});
var root_3 = from_html(`<span> </span>`);
var root_5$1 = from_html(`<span class="font-mono text-wrap leading-6 text-left"><!></span>`);
var root_6$1 = from_html(`<span> </span>`);
var root_8 = from_html(`<!> <!>`, 1);
var root_11$1 = from_html(`<!> `, 1);
var root_18 = from_html(` <!>`, 1);
var root_19 = from_html(` <!>`, 1);
var root_21 = from_html(`<div><!> <div class="flex flex-row flex-wrap gap-2"></div></div>`);
var root_25 = from_html(`<div><!> <div class="flex flex-row flex-wrap gap-2"></div></div>`);
var root_29 = from_html(`<div><!> <div class="flex flex-row flex-wrap gap-2"></div></div>`);
var root_33 = from_html(`<div><!> <div class="flex flex-row flex-wrap gap-2"></div></div>`);
var root_20$1 = from_html(`<div><!> <!> <!> <!></div>`);
var root_38 = from_html(`<!> Save`, 1);
var root_7$1 = from_html(`<!> <div class="grid gap-4"><div class="text-error flex items-center gap-1 text-sm"><!></div> <div class="form-control relative"><!></div> <div class="flex flex-row flex-wrap gap-2"></div> <div class="max-h-[calc(100vh-400px)] overflow-auto"><div><!> <!> <div class="flex flex-row flex-wrap gap-2"><!> <!></div></div> <!></div></div> <!>`, 1);
var root_1$1 = from_html(`<!> <!>`, 1);
function Formula($$anchor, $$props) {
	push($$props, true);
	const $form = () => store_get(form, "$form", $$stores);
	const $tainted = () => store_get(tainted, "$tainted", $$stores);
	const $submitting = () => store_get(submitting, "$submitting", $$stores);
	const [$$stores, $$cleanup] = setup_stores();
	let open = prop($$props, "open", 31, () => proxy({}));
	const { form, tainted, submitting } = $$props.superform;
	let $$d = user_derived(() => $form().formulas[$$props.id_formula]), formula = user_derived(() => get($$d).formula);
	let editor = state(void 0);
	let show_more = state(false);
	let filtered_fields = user_derived(() => fields_filter.run($$props.fields.filter((f) => f.name)));
	var fragment = comment();
	component(first_child(fragment), () => Root, ($$anchor$1, Dialog_Root) => {
		Dialog_Root($$anchor$1, {
			onOpenChange: (open$1) => {
				if (open$1) {
					store_mutate(form, untrack($form).formulas[$$props.id_formula].editable_formula = $form().formulas[$$props.id_formula].formula, untrack($form));
					store_mutate(form, untrack($form).action_value = $$props.id_formula.toString(), untrack($form));
				}
			},
			get open() {
				return open()[$$props.id_formula];
			},
			set open($$value) {
				open(open()[$$props.id_formula] = $$value, true);
			},
			children: ($$anchor$2, $$slotProps) => {
				var fragment_1 = root_1$1();
				var node_1 = first_child(fragment_1);
				{
					let $0 = user_derived(() => buttonVariants({ variant: "outline" }));
					let $1 = user_derived(() => !get(formula) && "text-muted-foreground");
					component(node_1, () => Trigger, ($$anchor$3, Dialog_Trigger) => {
						Dialog_Trigger($$anchor$3, {
							get class() {
								return `${get($0) ?? ""} justify-start! h-auto min-h-10 ${get($1) ?? ""}`;
							},
							"data-testid": "edit-formula",
							type: "button",
							children: ($$anchor$4, $$slotProps$1) => {
								var fragment_2 = comment();
								var node_2 = first_child(fragment_2);
								var consequent = ($$anchor$5) => {
									var span = root_3();
									var text_1 = child(span, true);
									reset(span);
									template_effect(() => set_text(text_1, get(formula)));
									append($$anchor$5, span);
								};
								var alternate_1 = ($$anchor$5) => {
									var fragment_3 = comment();
									var node_3 = first_child(fragment_3);
									var consequent_1 = ($$anchor$6) => {
										var span_1 = root_5$1();
										html(child(span_1), () => highlight(get(formula)));
										reset(span_1);
										append($$anchor$6, span_1);
									};
									var alternate = ($$anchor$6) => {
										var span_2 = root_6$1();
										var text_2 = child(span_2, true);
										reset(span_2);
										template_effect(($0$1) => set_text(text_2, $0$1), [() => _("Click to edit formula")]);
										append($$anchor$6, span_2);
									};
									if_block(node_3, ($$render) => {
										if (get(formula)) $$render(consequent_1);
										else $$render(alternate, false);
									}, true);
									append($$anchor$5, fragment_3);
								};
								if_block(node_2, ($$render) => {
									if (!browser) $$render(consequent);
									else $$render(alternate_1, false);
								});
								append($$anchor$4, fragment_2);
							},
							$$slots: { default: true }
						});
					});
				}
				component(sibling(node_1, 2), () => Dialog_content, ($$anchor$3, Dialog_Content) => {
					Dialog_Content($$anchor$3, {
						class: "sm:max-w-4xl",
						children: ($$anchor$4, $$slotProps$1) => {
							var fragment_4 = root_7$1();
							var node_6 = first_child(fragment_4);
							component(node_6, () => Dialog_header, ($$anchor$5, Dialog_Header) => {
								Dialog_Header($$anchor$5, {
									children: ($$anchor$6, $$slotProps$2) => {
										var fragment_5 = root_8();
										var node_7 = first_child(fragment_5);
										component(node_7, () => Dialog_title, ($$anchor$7, Dialog_Title) => {
											Dialog_Title($$anchor$7, {
												children: ($$anchor$8, $$slotProps$3) => {
													next();
													var text_3 = text();
													template_effect(($0) => set_text(text_3, $0), [() => _("Edit formula")]);
													append($$anchor$8, text_3);
												},
												$$slots: { default: true }
											});
										});
										component(sibling(node_7, 2), () => Dialog_description, ($$anchor$7, Dialog_Description) => {
											Dialog_Description($$anchor$7, {
												children: ($$anchor$8, $$slotProps$3) => {
													next();
													var text_4 = text();
													template_effect(($0) => set_text(text_4, $0), [() => _("Click the fields below to insert them into the formula")]);
													append($$anchor$8, text_4);
												},
												$$slots: { default: true }
											});
										});
										append($$anchor$6, fragment_5);
									},
									$$slots: { default: true }
								});
							});
							var div = sibling(node_6, 2);
							var div_1 = child(div);
							var node_9 = child(div_1);
							var consequent_2 = ($$anchor$5) => {
								var fragment_8 = root_11$1();
								var node_10 = first_child(fragment_8);
								Icon(node_10, { icon: "ic:outline-error-outline" });
								var text_5 = sibling(node_10);
								template_effect(() => set_text(text_5, ` ${$$props.errors[$$props.id_formula] ?? ""}`));
								append($$anchor$5, fragment_8);
							};
							var alternate_2 = ($$anchor$5) => {
								append($$anchor$5, text("\xA0"));
							};
							if_block(node_9, ($$render) => {
								if ($$props.errors[$$props.id_formula]) $$render(consequent_2);
								else $$render(alternate_2, false);
							});
							reset(div_1);
							var div_2 = sibling(div_1, 2);
							var node_11 = child(div_2);
							{
								let $0 = user_derived(() => $$props.fields.filter((f) => f.name).map((f) => f.name));
								let $1 = user_derived(() => $$props.databases.filter((t) => t.name).map((t) => t.name));
								bind_this(CodeMirror(node_11, {
									get fields() {
										return get($0);
									},
									form: "form",
									name: "code",
									onInit: (editorView) => {
										const docLength = editorView.state.doc.length;
										editorView.dispatch({ selection: {
											anchor: docLength,
											head: docLength
										} });
										editorView.focus();
									},
									get tables() {
										return get($1);
									},
									get code() {
										return $form().formulas[$$props.id_formula].editable_formula;
									},
									set code($$value) {
										store_mutate(form, untrack($form).formulas[$$props.id_formula].editable_formula = $$value, untrack($form));
									}
								}), ($$value) => set(editor, $$value, true), () => get(editor));
							}
							reset(div_2);
							var div_3 = sibling(div_2, 2);
							each(div_3, 21, () => generateSymbols([
								"+",
								"-",
								"x",
								"/",
								"(",
								")"
							]), ([text$1, symbol]) => symbol, ($$anchor$5, $$item) => {
								var $$array = user_derived(() => to_array(get($$item), 2));
								let text$1 = () => get($$array)[0];
								let symbol = () => get($$array)[1];
								SymbolBtn($$anchor$5, {
									get text() {
										return text$1();
									},
									onclick: () => get(editor)?.insertSymbol(symbol())
								});
							});
							reset(div_3);
							var div_4 = sibling(div_3, 2);
							var div_5 = child(div_4);
							var node_12 = child(div_5);
							var consequent_3 = ($$anchor$5) => {
								FieldsFilter($$anchor$5, {});
							};
							if_block(node_12, ($$render) => {
								if ($$props.fields.length > fields_filter.min) $$render(consequent_3);
							});
							var node_13 = sibling(node_12, 2);
							Label(node_13, {
								children: ($$anchor$5, $$slotProps$2) => {
									next();
									var text_7 = text();
									template_effect(($0) => set_text(text_7, $0), [() => _("Fields")]);
									append($$anchor$5, text_7);
								},
								$$slots: { default: true }
							});
							var div_6 = sibling(node_13, 2);
							var node_14 = child(div_6);
							each(node_14, 17, () => get(filtered_fields), (field) => field.id, ($$anchor$5, field) => {
								FieldBtn($$anchor$5, {
									get field() {
										return get(field);
									},
									get editor() {
										return get(editor);
									}
								});
							});
							Button(sibling(node_14, 2), {
								class: "field-btn bg-blue-700! text-white!",
								onclick: () => set(show_more, !get(show_more)),
								type: "button",
								variant: "outline",
								children: ($$anchor$5, $$slotProps$2) => {
									var fragment_13 = comment();
									var node_16 = first_child(fragment_13);
									var consequent_4 = ($$anchor$6) => {
										var fragment_14 = root_18();
										var text_8 = first_child(fragment_14);
										Icon(sibling(text_8), { icon: "mdi:chevron-up" });
										template_effect(($0) => set_text(text_8, `${$0 ?? ""} `), [() => _("Show less")]);
										append($$anchor$6, fragment_14);
									};
									var alternate_3 = ($$anchor$6) => {
										var fragment_15 = root_19();
										var text_9 = first_child(fragment_15);
										Icon(sibling(text_9), { icon: "mdi:chevron-down" });
										template_effect(($0) => set_text(text_9, `${$0 ?? ""} `), [() => _("Show more")]);
										append($$anchor$6, fragment_15);
									};
									if_block(node_16, ($$render) => {
										if (get(show_more)) $$render(consequent_4);
										else $$render(alternate_3, false);
									});
									append($$anchor$5, fragment_13);
								},
								$$slots: { default: true }
							});
							reset(div_6);
							reset(div_5);
							var node_19 = sibling(div_5, 2);
							var consequent_9 = ($$anchor$5) => {
								var div_7 = root_20$1();
								var node_20 = child(div_7);
								var consequent_5 = ($$anchor$6) => {
									var div_8 = root_21();
									var node_21 = child(div_8);
									Label(node_21, {
										children: ($$anchor$7, $$slotProps$2) => {
											next();
											var text_10 = text();
											template_effect(($0) => set_text(text_10, $0), [() => _("PrestaShop fields")]);
											append($$anchor$7, text_10);
										},
										$$slots: { default: true }
									});
									var div_9 = sibling(node_21, 2);
									each(div_9, 21, () => $$props.ps_fields, ({ name, label }) => name, ($$anchor$7, $$item) => {
										let name = () => get($$item).name;
										let label = () => get($$item).label;
										Button($$anchor$7, {
											class: "ps-field-btn cursor-pointer",
											onclick: () => get(editor)?.insertSymbol(`"[${name()}]"`),
											type: "button",
											variant: "outline",
											children: ($$anchor$8, $$slotProps$2) => {
												next();
												var text_11 = text();
												template_effect(() => set_text(text_11, label()));
												append($$anchor$8, text_11);
											},
											$$slots: { default: true }
										});
									});
									reset(div_9);
									reset(div_8);
									append($$anchor$6, div_8);
								};
								if_block(node_20, ($$render) => {
									if ($$props.ps_fields.length) $$render(consequent_5);
								});
								var node_22 = sibling(node_20, 2);
								var consequent_6 = ($$anchor$6) => {
									var div_10 = root_25();
									var node_23 = child(div_10);
									Label(node_23, {
										children: ($$anchor$7, $$slotProps$2) => {
											next();
											var text_12 = text();
											template_effect(($0) => set_text(text_12, $0), [() => _("Databases")]);
											append($$anchor$7, text_12);
										},
										$$slots: { default: true }
									});
									var div_11 = sibling(node_23, 2);
									each(div_11, 21, () => $$props.databases, ({ name, label }) => name, ($$anchor$7, $$item) => {
										let name = () => get($$item).name;
										let label = () => get($$item).label;
										Button($$anchor$7, {
											class: "database-btn cursor-pointer",
											onclick: () => get(editor)?.insertSymbol(`GRID("${name()}", [row], [column], 0)`),
											type: "button",
											variant: "outline",
											children: ($$anchor$8, $$slotProps$2) => {
												next();
												var text_13 = text();
												template_effect(() => set_text(text_13, label()));
												append($$anchor$8, text_13);
											},
											$$slots: { default: true }
										});
									});
									reset(div_11);
									reset(div_10);
									append($$anchor$6, div_10);
								};
								if_block(node_22, ($$render) => {
									if ($$props.databases.length) $$render(consequent_6);
								});
								var node_24 = sibling(node_22, 2);
								var consequent_7 = ($$anchor$6) => {
									var div_12 = root_29();
									var node_25 = child(div_12);
									Label(node_25, {
										children: ($$anchor$7, $$slotProps$2) => {
											next();
											var text_14 = text();
											template_effect(($0) => set_text(text_14, $0), [() => _("Attributes")]);
											append($$anchor$7, text_14);
										},
										$$slots: { default: true }
									});
									var div_13 = sibling(node_25, 2);
									each(div_13, 21, () => $$props.attributes, ({ name, label }) => name, ($$anchor$7, $$item) => {
										let name = () => get($$item).name;
										let label = () => get($$item).label;
										Button($$anchor$7, {
											class: "attribute-btn cursor-pointer",
											onclick: () => get(editor)?.insertSymbol(`"[${name()}]"`),
											type: "button",
											variant: "outline",
											children: ($$anchor$8, $$slotProps$2) => {
												next();
												var text_15 = text();
												template_effect(() => set_text(text_15, label()));
												append($$anchor$8, text_15);
											},
											$$slots: { default: true }
										});
									});
									reset(div_13);
									reset(div_12);
									append($$anchor$6, div_12);
								};
								if_block(node_24, ($$render) => {
									if ($$props.attributes.length) $$render(consequent_7);
								});
								var node_26 = sibling(node_24, 2);
								var consequent_8 = ($$anchor$6) => {
									var div_14 = root_33();
									var node_27 = child(div_14);
									Label(node_27, {
										children: ($$anchor$7, $$slotProps$2) => {
											next();
											var text_16 = text();
											template_effect(($0) => set_text(text_16, $0), [() => _("Features")]);
											append($$anchor$7, text_16);
										},
										$$slots: { default: true }
									});
									var div_15 = sibling(node_27, 2);
									each(div_15, 21, () => $$props.features, ({ name, label }) => name, ($$anchor$7, $$item) => {
										let name = () => get($$item).name;
										let label = () => get($$item).label;
										Button($$anchor$7, {
											class: "feature-btn cursor-pointer",
											onclick: () => get(editor)?.insertSymbol(`"[${name()}]"`),
											type: "button",
											variant: "outline",
											children: ($$anchor$8, $$slotProps$2) => {
												next();
												var text_17 = text();
												template_effect(() => set_text(text_17, label()));
												append($$anchor$8, text_17);
											},
											$$slots: { default: true }
										});
									});
									reset(div_15);
									reset(div_14);
									append($$anchor$6, div_14);
								};
								if_block(node_26, ($$render) => {
									if ($$props.features.length) $$render(consequent_8);
								});
								reset(div_7);
								append($$anchor$5, div_7);
							};
							if_block(node_19, ($$render) => {
								if (get(show_more)) $$render(consequent_9);
							});
							reset(div_4);
							reset(div);
							component(sibling(div, 2), () => Dialog_footer, ($$anchor$5, Dialog_Footer) => {
								Dialog_Footer($$anchor$5, {
									children: ($$anchor$6, $$slotProps$2) => {
										{
											let $0 = user_derived(() => $tainted()?.formulas?.[$$props.id_formula] && "btn-highlight");
											let $1 = user_derived(() => !$tainted()?.formulas?.[$$props.id_formula]);
											Button($$anchor$6, {
												get class() {
													return get($0);
												},
												onclick: () => get(editor)?.reformatFormula(),
												"data-ctrl-enter": true,
												get disabled() {
													return get($1);
												},
												form: "form",
												name: "id_formula",
												type: "submit",
												get value() {
													return $$props.id_formula;
												},
												children: ($$anchor$7, $$slotProps$3) => {
													var fragment_29 = root_38();
													Spinner(first_child(fragment_29), {
														get loading() {
															return $submitting();
														},
														children: ($$anchor$8, $$slotProps$4) => {
															Icon($$anchor$8, { icon: "mdi:content-save" });
														},
														$$slots: { default: true }
													});
													next();
													append($$anchor$7, fragment_29);
												},
												$$slots: { default: true }
											});
										}
									},
									$$slots: { default: true }
								});
							});
							append($$anchor$4, fragment_4);
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
var root_2 = from_html(`<!> <!>`, 1);
var root_5 = from_html(`<div class="flex flex-col gap-6"><!></div>`);
var root_1 = from_html(`<!> <!>`, 1);
var root_7 = from_html(`<!> <!>`, 1);
var root_10 = from_html(`<div class="flex flex-col gap-6"><!></div>`);
var root_6 = from_html(`<!> <!>`, 1);
var root_12 = from_html(`<!> <!>`, 1);
var root_15 = from_html(`<div class="flex flex-col gap-6"><!></div>`);
var root_11 = from_html(`<!> <!>`, 1);
var root_17 = from_html(`<!> <!>`, 1);
var root_20 = from_html(`<div class="flex flex-col gap-6"><!></div>`);
var root_16 = from_html(`<!> <!>`, 1);
var root = from_html(`<form id="form" method="POST"><div class="flex flex-col gap-4 p-4"><!> <!> <!> <!></div></form>`);
function _page($$anchor, $$props) {
	push($$props, true);
	const $form = () => store_get(form, "$form", $$stores);
	const $submitting = () => store_get(submitting, "$submitting", $$stores);
	const [$$stores, $$cleanup] = setup_stores();
	const superform = superForm($$props.data.form, {
		dataType: "json",
		SPA: true,
		validators: valibot(FormulasSchema),
		resetForm: false,
		invalidateAll: false,
		async onSubmit({ submitter }) {
			set(errors, {}, true);
			const id_formula = submitter?.getAttribute("value") ?? $form().action_value;
			const res = await form_action({
				route: page.route.id,
				action: "update",
				data: {
					...$form(),
					action_value: id_formula
				}
			});
			if (res.error) get(errors)[id_formula] = res.message;
			else {
				form.update(() => res, { taint: false });
				toast.success(_("The formula have been updated"));
				set(open, {
					[EquationType._DP_PRICE_EQ_]: false,
					[EquationType._DP_WEIGHT_EQ_]: false,
					[EquationType._DP_QUANTITY_EQ_]: false,
					[EquationType._DP_COST_EQ_]: false
				}, true);
			}
		}
	});
	const { form, enhance, submitting } = superform;
	let errors = state(proxy({}));
	user_effect(() => {
		if ($submitting()) toast.loading(_("Saving your changes..."));
	});
	let attributes = user_derived(() => $$props.data.attributes);
	let features = user_derived(() => $$props.data.features);
	let databases = user_derived(() => $$props.data.databases);
	let ps_fields = user_derived(() => $$props.data.ps_fields);
	let open = state(proxy({
		[EquationType._DP_PRICE_EQ_]: false,
		[EquationType._DP_WEIGHT_EQ_]: false,
		[EquationType._DP_QUANTITY_EQ_]: false,
		[EquationType._DP_COST_EQ_]: false
	}));
	var form_1 = root();
	var div = child(form_1);
	var node = child(div);
	component(node, () => Card, ($$anchor$1, Card_Root) => {
		Card_Root($$anchor$1, {
			children: ($$anchor$2, $$slotProps) => {
				var fragment = root_1();
				var node_1 = first_child(fragment);
				component(node_1, () => Card_header, ($$anchor$3, Card_Header) => {
					Card_Header($$anchor$3, {
						children: ($$anchor$4, $$slotProps$1) => {
							var fragment_1 = root_2();
							var node_2 = first_child(fragment_1);
							component(node_2, () => Card_title, ($$anchor$5, Card_Title) => {
								Card_Title($$anchor$5, {
									children: ($$anchor$6, $$slotProps$2) => {
										next();
										var text$1 = text();
										template_effect(($0) => set_text(text$1, $0), [() => _("Price formula")]);
										append($$anchor$6, text$1);
									},
									$$slots: { default: true }
								});
							});
							component(sibling(node_2, 2), () => Card_description, ($$anchor$5, Card_Description) => {
								Card_Description($$anchor$5, {
									children: ($$anchor$6, $$slotProps$2) => {
										next();
										var text_1 = text();
										template_effect(($0) => set_text(text_1, $0), [() => _("This formula will effect the customization cost")]);
										append($$anchor$6, text_1);
									},
									$$slots: { default: true }
								});
							});
							append($$anchor$4, fragment_1);
						},
						$$slots: { default: true }
					});
				});
				component(sibling(node_1, 2), () => Card_content, ($$anchor$3, Card_Content) => {
					Card_Content($$anchor$3, {
						children: ($$anchor$4, $$slotProps$1) => {
							var div_1 = root_5();
							var node_5 = child(div_1);
							{
								let $0 = user_derived(() => Object.values($$props.data.fields));
								Formula(node_5, {
									get attributes() {
										return get(attributes);
									},
									get errors() {
										return get(errors);
									},
									get features() {
										return get(features);
									},
									get databases() {
										return get(databases);
									},
									get ps_fields() {
										return get(ps_fields);
									},
									get fields() {
										return get($0);
									},
									get id_formula() {
										return EquationType._DP_PRICE_EQ_;
									},
									get superform() {
										return superform;
									},
									get open() {
										return get(open);
									},
									set open($$value) {
										set(open, $$value, true);
									}
								});
							}
							reset(div_1);
							append($$anchor$4, div_1);
						},
						$$slots: { default: true }
					});
				});
				append($$anchor$2, fragment);
			},
			$$slots: { default: true }
		});
	});
	var node_6 = sibling(node, 2);
	component(node_6, () => Card, ($$anchor$1, Card_Root_1) => {
		Card_Root_1($$anchor$1, {
			children: ($$anchor$2, $$slotProps) => {
				var fragment_4 = root_6();
				var node_7 = first_child(fragment_4);
				component(node_7, () => Card_header, ($$anchor$3, Card_Header_1) => {
					Card_Header_1($$anchor$3, {
						children: ($$anchor$4, $$slotProps$1) => {
							var fragment_5 = root_7();
							var node_8 = first_child(fragment_5);
							component(node_8, () => Card_title, ($$anchor$5, Card_Title_1) => {
								Card_Title_1($$anchor$5, {
									children: ($$anchor$6, $$slotProps$2) => {
										next();
										var text_2 = text();
										template_effect(($0) => set_text(text_2, $0), [() => _("Weight formula")]);
										append($$anchor$6, text_2);
									},
									$$slots: { default: true }
								});
							});
							component(sibling(node_8, 2), () => Card_description, ($$anchor$5, Card_Description_1) => {
								Card_Description_1($$anchor$5, {
									children: ($$anchor$6, $$slotProps$2) => {
										next();
										var text_3 = text();
										template_effect(($0) => set_text(text_3, $0), [() => _("This formula will effect the shipping cost")]);
										append($$anchor$6, text_3);
									},
									$$slots: { default: true }
								});
							});
							append($$anchor$4, fragment_5);
						},
						$$slots: { default: true }
					});
				});
				component(sibling(node_7, 2), () => Card_content, ($$anchor$3, Card_Content_1) => {
					Card_Content_1($$anchor$3, {
						children: ($$anchor$4, $$slotProps$1) => {
							var div_2 = root_10();
							var node_11 = child(div_2);
							{
								let $0 = user_derived(() => Object.values($$props.data.fields));
								Formula(node_11, {
									get attributes() {
										return get(attributes);
									},
									get errors() {
										return get(errors);
									},
									get features() {
										return get(features);
									},
									get databases() {
										return get(databases);
									},
									get ps_fields() {
										return get(ps_fields);
									},
									get fields() {
										return get($0);
									},
									get id_formula() {
										return EquationType._DP_WEIGHT_EQ_;
									},
									get superform() {
										return superform;
									},
									get open() {
										return get(open);
									},
									set open($$value) {
										set(open, $$value, true);
									}
								});
							}
							reset(div_2);
							append($$anchor$4, div_2);
						},
						$$slots: { default: true }
					});
				});
				append($$anchor$2, fragment_4);
			},
			$$slots: { default: true }
		});
	});
	var node_12 = sibling(node_6, 2);
	component(node_12, () => Card, ($$anchor$1, Card_Root_2) => {
		Card_Root_2($$anchor$1, {
			children: ($$anchor$2, $$slotProps) => {
				var fragment_8 = root_11();
				var node_13 = first_child(fragment_8);
				component(node_13, () => Card_header, ($$anchor$3, Card_Header_2) => {
					Card_Header_2($$anchor$3, {
						children: ($$anchor$4, $$slotProps$1) => {
							var fragment_9 = root_12();
							var node_14 = first_child(fragment_9);
							component(node_14, () => Card_title, ($$anchor$5, Card_Title_2) => {
								Card_Title_2($$anchor$5, {
									children: ($$anchor$6, $$slotProps$2) => {
										next();
										var text_4 = text();
										template_effect(($0) => set_text(text_4, $0), [() => _("Quantity formula")]);
										append($$anchor$6, text_4);
									},
									$$slots: { default: true }
								});
							});
							component(sibling(node_14, 2), () => Card_description, ($$anchor$5, Card_Description_2) => {
								Card_Description_2($$anchor$5, {
									children: ($$anchor$6, $$slotProps$2) => {
										next();
										var text_5 = text();
										template_effect(($0) => set_text(text_5, $0), [() => _("This formula will effect how the stock is retracted")]);
										append($$anchor$6, text_5);
									},
									$$slots: { default: true }
								});
							});
							append($$anchor$4, fragment_9);
						},
						$$slots: { default: true }
					});
				});
				component(sibling(node_13, 2), () => Card_content, ($$anchor$3, Card_Content_2) => {
					Card_Content_2($$anchor$3, {
						children: ($$anchor$4, $$slotProps$1) => {
							var div_3 = root_15();
							var node_17 = child(div_3);
							{
								let $0 = user_derived(() => Object.values($$props.data.fields));
								Formula(node_17, {
									get attributes() {
										return get(attributes);
									},
									get errors() {
										return get(errors);
									},
									get features() {
										return get(features);
									},
									get databases() {
										return get(databases);
									},
									get ps_fields() {
										return get(ps_fields);
									},
									get fields() {
										return get($0);
									},
									get id_formula() {
										return EquationType._DP_QUANTITY_EQ_;
									},
									get superform() {
										return superform;
									},
									get open() {
										return get(open);
									},
									set open($$value) {
										set(open, $$value, true);
									}
								});
							}
							reset(div_3);
							append($$anchor$4, div_3);
						},
						$$slots: { default: true }
					});
				});
				append($$anchor$2, fragment_8);
			},
			$$slots: { default: true }
		});
	});
	component(sibling(node_12, 2), () => Card, ($$anchor$1, Card_Root_3) => {
		Card_Root_3($$anchor$1, {
			children: ($$anchor$2, $$slotProps) => {
				var fragment_12 = root_16();
				var node_19 = first_child(fragment_12);
				component(node_19, () => Card_header, ($$anchor$3, Card_Header_3) => {
					Card_Header_3($$anchor$3, {
						children: ($$anchor$4, $$slotProps$1) => {
							var fragment_13 = root_17();
							var node_20 = first_child(fragment_13);
							component(node_20, () => Card_title, ($$anchor$5, Card_Title_3) => {
								Card_Title_3($$anchor$5, {
									children: ($$anchor$6, $$slotProps$2) => {
										next();
										var text_6 = text();
										template_effect(($0) => set_text(text_6, $0), [() => _("Cost formula")]);
										append($$anchor$6, text_6);
									},
									$$slots: { default: true }
								});
							});
							component(sibling(node_20, 2), () => Card_description, ($$anchor$5, Card_Description_3) => {
								Card_Description_3($$anchor$5, {
									children: ($$anchor$6, $$slotProps$2) => {
										next();
										var text_7 = text();
										template_effect(($0) => set_text(text_7, $0), [() => _("This formula will effect the purchase cost of the product")]);
										append($$anchor$6, text_7);
									},
									$$slots: { default: true }
								});
							});
							append($$anchor$4, fragment_13);
						},
						$$slots: { default: true }
					});
				});
				component(sibling(node_19, 2), () => Card_content, ($$anchor$3, Card_Content_3) => {
					Card_Content_3($$anchor$3, {
						children: ($$anchor$4, $$slotProps$1) => {
							var div_4 = root_20();
							var node_23 = child(div_4);
							{
								let $0 = user_derived(() => Object.values($$props.data.fields));
								Formula(node_23, {
									get attributes() {
										return get(attributes);
									},
									get errors() {
										return get(errors);
									},
									get features() {
										return get(features);
									},
									get databases() {
										return get(databases);
									},
									get ps_fields() {
										return get(ps_fields);
									},
									get fields() {
										return get($0);
									},
									get id_formula() {
										return EquationType._DP_COST_EQ_;
									},
									get superform() {
										return superform;
									},
									get open() {
										return get(open);
									},
									set open($$value) {
										set(open, $$value, true);
									}
								});
							}
							reset(div_4);
							append($$anchor$4, div_4);
						},
						$$slots: { default: true }
					});
				});
				append($$anchor$2, fragment_12);
			},
			$$slots: { default: true }
		});
	});
	reset(div);
	reset(form_1);
	action(form_1, ($$node) => enhance?.($$node));
	append($$anchor, form_1);
	pop();
	$$cleanup();
}
export { _page as component, _page_exports as universal };
