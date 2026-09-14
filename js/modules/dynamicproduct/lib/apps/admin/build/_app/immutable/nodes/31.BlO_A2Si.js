import { B as html, Ct as set, Ft as push, G as if_block, Ht as next, L as component, N as action, Ot as user_derived, Pt as pop, Tt as state, Ut as reset, V as each, W as key, X as comment, Y as append, Z as from_html, Zt as __exportAll, b as bind_this, bt as sibling, d as store_mutate, et as text, l as setup_stores, lt as untrack, o as prop, ot as get, pt as template_effect, q as set_text, qt as to_array, u as store_get, vt as child, xt as proxy, yt as first_child } from "../chunks/DUscB9kS.js";
import "../chunks/B_W7bg6n.js";
import "../chunks/D365qDux.js";
import { i as superForm, n as superValidate, t as valibot } from "../chunks/CPdJ2mnA.js";
import "../chunks/D-Alr120.js";
import "../chunks/CEFrIRjK.js";
import { t as browser } from "../chunks/DgeI1AN1.js";
import { a as form_action, n as buttonVariants, r as cn, s as page_load, t as Button } from "../chunks/BIEFGHhw.js";
import { n as toast } from "../chunks/CQQo25vS.js";
import "../chunks/CJDS8lnd.js";
import "../chunks/DAbnHPcz.js";
import { n as _, t as Icon } from "../chunks/DFl6Gq92.js";
import { n as page } from "../chunks/BRpqcTWk.js";
import "../chunks/_yKPJ4BA.js";
import { a as Select_content, i as Select_trigger, n as Root, o as Select_item, t as Group } from "../chunks/B8kltHsl.js";
import "../chunks/T79hDoyY.js";
import { t as Label } from "../chunks/ClKKfzS1.js";
import { a as Card_content, o as Card, r as Card_footer } from "../chunks/Bpx6gt8W.js";
import "../chunks/C4w9vuey.js";
import "../chunks/cJwMBL5_.js";
import "../chunks/CgH3Vt0F.js";
import { n as Alert_description, r as Alert, t as Alert_title } from "../chunks/OMr53o_L.js";
import { d as optional, f as picklist, g as string, l as number, m as record, n as array, u as object } from "../chunks/Da0rmiev.js";
import { t as Spinner } from "../chunks/C9eHbt79.js";
import { a as Dialog_content, c as Dialog_title, i as Dialog_description, n as Root$1, o as Dialog_header, r as Trigger, s as Dialog_footer } from "../chunks/Bc1vuzVu.js";
import { n as obj } from "../chunks/C961kT60.js";
import "../chunks/BirQbuIK.js";
import "../chunks/BAR_jctJ.js";
import "../chunks/CAZFn-OP.js";
import { t as highlight } from "../chunks/Dt-VaJa3.js";
import { a as Table_cell, i as Table_footer, n as Table_header, o as Table_body, r as Table_head, s as Table, t as Table_row } from "../chunks/fQ7Z9iZC.js";
import { t as sort } from "../chunks/Bz4g0JZD.js";
import { n as Form_button } from "../chunks/C9E5Z7Ag.js";
/* empty css                 */
import { t as Input } from "../chunks/D2YUxW8P.js";
import { n as fields_filter, t as FieldsFilter } from "../chunks/B8OVl6Sc.js";
import { i as CodeMirror, n as SymbolBtn, r as FieldBtn, t as generateSymbols } from "../chunks/CZwT-Fpx.js";
const IntervalConditionSchema = object({
	id: number(),
	id_field: number(),
	type: picklist(["range", "values"]),
	min: string(),
	max: string(),
	values: array(string())
});
const IntervalSchema = object({
	id: number(),
	interval_fields: record(string(), object({
		id: number(),
		id_interval: number(),
		id_field: number()
	})),
	condition_groups: array(object({
		id: number(),
		id_interval: number(),
		conditions: record(string(), IntervalConditionSchema)
	})),
	interval_formulas: record(string(), object({
		formula: string(),
		editable_formula: optional(string())
	}))
});
const IntervalsFormSchema = object({
	action_name: picklist([
		"",
		"update",
		"add",
		"delete",
		"add-condition-group",
		"delete-condition-group",
		"add-interval-field",
		"delete-interval-field",
		"update-interval-condition"
	]),
	action_value: string(),
	intervals: record(string(), IntervalSchema)
});
var _page_exports = /* @__PURE__ */ __exportAll({ load: () => load }, 1);
const load = async (event) => {
	const { intervals, fields, attributes, features, ps_fields, databases } = await page_load(event);
	for (const id_interval in intervals) {
		intervals[id_interval].interval_formulas = obj(intervals[id_interval].interval_formulas);
		for (const id in intervals[id_interval].interval_formulas) intervals[id_interval].interval_formulas[id].editable_formula = intervals[id_interval].interval_formulas[id].formula;
	}
	return {
		form: await superValidate({ intervals: obj(intervals) }, valibot(IntervalsFormSchema)),
		fields,
		attributes,
		features,
		databases,
		ps_fields
	};
};
var root_3$1 = from_html(`<span> </span>`);
var root_5$1 = from_html(`<span class="font-mono text-wrap leading-6 text-left"><!></span>`);
var root_6$1 = from_html(`<span></span>`);
var root_8 = from_html(`<!> <!>`, 1);
var root_11 = from_html(`<!> `, 1);
var root_18 = from_html(` <!>`, 1);
var root_19$1 = from_html(` <!>`, 1);
var root_21 = from_html(`<div><!> <div class="flex flex-row flex-wrap gap-2"></div></div>`);
var root_25$1 = from_html(`<div><!> <div class="flex flex-row flex-wrap gap-2"></div></div>`);
var root_29$2 = from_html(`<div><!> <div class="flex flex-row flex-wrap gap-2"></div></div>`);
var root_33$1 = from_html(`<div><!> <div class="flex flex-row flex-wrap gap-2"></div></div>`);
var root_20 = from_html(`<div><!> <!> <!> <!></div>`);
var root_38$1 = from_html(`<!> Save`, 1);
var root_7$1 = from_html(`<!> <div class="grid gap-4"><div class="text-error flex items-center gap-1 text-sm"><!></div> <div class="form-control relative"><!></div> <div class="flex flex-row flex-wrap gap-2"></div> <div class="max-h-[calc(100vh-400px)] overflow-auto"><div><!> <!> <div class="flex flex-row flex-wrap gap-2"><!> <!></div></div> <!></div></div> <!>`, 1);
var root_1 = from_html(`<!> <!>`, 1);
function Formula($$anchor, $$props) {
	push($$props, true);
	const $form = () => store_get(form, "$form", $$stores);
	const $errors = () => store_get(errors, "$errors", $$stores);
	const $tainted = () => store_get(tainted, "$tainted", $$stores);
	const $submitting = () => store_get(submitting, "$submitting", $$stores);
	const [$$stores, $$cleanup] = setup_stores();
	let open = prop($$props, "open", 31, () => proxy({}));
	let id = user_derived(() => `${$$props.id_interval_field}-${$$props.id_condition_group}`);
	const { form, tainted, errors, submitting } = $$props.superform;
	let formula = user_derived(() => $form().intervals[$$props.id_interval].interval_formulas[get(id)]?.formula);
	let editor = state(void 0);
	let show_more = state(false);
	let filtered_fields = user_derived(() => fields_filter.run($$props.fields.filter((f) => f.name)));
	var fragment = comment();
	var node = first_child(fragment);
	var bind_get = () => open()[get(id)] ?? false;
	var bind_set = (v) => open(open()[get(id)] = v, true);
	component(node, () => Root$1, ($$anchor$1, Dialog_Root) => {
		Dialog_Root($$anchor$1, {
			get open() {
				return bind_get();
			},
			set open($$value) {
				bind_set($$value);
			},
			onOpenChange: (open$1) => {
				if (open$1) store_mutate(form, untrack($form).action_value = get(id).toString(), untrack($form));
			},
			children: ($$anchor$2, $$slotProps) => {
				var fragment_1 = root_1();
				var node_1 = first_child(fragment_1);
				{
					let $0 = user_derived(() => buttonVariants({ variant: "outline" }));
					let $1 = user_derived(() => !get(formula) && "text-muted-foreground");
					component(node_1, () => Trigger, ($$anchor$3, Dialog_Trigger) => {
						Dialog_Trigger($$anchor$3, {
							get class() {
								return `${get($0) ?? ""} justify-start! w-full h-auto min-h-10 ${get($1) ?? ""}`;
							},
							"data-testid": "formula",
							type: "button",
							children: ($$anchor$4, $$slotProps$1) => {
								var fragment_2 = comment();
								var node_2 = first_child(fragment_2);
								var consequent = ($$anchor$5) => {
									var span = root_3$1();
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
										append($$anchor$6, root_6$1());
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
													var text_2 = text();
													template_effect(($0) => set_text(text_2, $0), [() => _("Edit field formula")]);
													append($$anchor$8, text_2);
												},
												$$slots: { default: true }
											});
										});
										component(sibling(node_7, 2), () => Dialog_description, ($$anchor$7, Dialog_Description) => {
											Dialog_Description($$anchor$7, {
												children: ($$anchor$8, $$slotProps$3) => {
													next();
													var text_3 = text();
													template_effect(($0) => set_text(text_3, $0), [() => _("Click the fields below to insert them into the formula")]);
													append($$anchor$8, text_3);
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
								var fragment_8 = root_11();
								var node_10 = first_child(fragment_8);
								Icon(node_10, { icon: "ic:outline-error-outline" });
								var text_4 = sibling(node_10);
								template_effect(() => set_text(text_4, ` ${$errors().intervals[$$props.id_interval].interval_formulas[get(id)].editable_formula ?? ""}`));
								append($$anchor$5, fragment_8);
							};
							var alternate_2 = ($$anchor$5) => {
								append($$anchor$5, text("\xA0"));
							};
							if_block(node_9, ($$render) => {
								if ($errors().intervals?.[$$props.id_interval]?.interval_formulas?.[get(id)]?.editable_formula) $$render(consequent_2);
								else $$render(alternate_2, false);
							});
							reset(div_1);
							var div_2 = sibling(div_1, 2);
							var node_11 = child(div_2);
							var bind_get_1 = () => $form().intervals[$$props.id_interval].interval_formulas[get(id)]?.editable_formula ?? "";
							var bind_set_1 = (v) => {
								if (!$form().intervals[$$props.id_interval].interval_formulas[get(id)]) store_mutate(form, untrack($form).intervals[$$props.id_interval].interval_formulas[get(id)] = {
									editable_formula: v,
									formula: ""
								}, untrack($form));
								store_mutate(form, untrack($form).intervals[$$props.id_interval].interval_formulas[get(id)].editable_formula = v, untrack($form));
							};
							{
								let $0 = user_derived(() => $$props.fields.filter((f) => f.name).map((f) => f.name));
								let $1 = user_derived(() => $$props.databases.filter((t) => t.name).map((t) => t.name));
								bind_this(CodeMirror(node_11, {
									get code() {
										return bind_get_1();
									},
									set code($$value) {
										bind_set_1($$value);
									},
									get fields() {
										return get($0);
									},
									form: "form",
									name: "code",
									get tables() {
										return get($1);
									}
								}), ($$value) => set(editor, $$value, true), () => get(editor));
							}
							reset(div_2);
							var div_3 = sibling(div_2, 2);
							each(div_3, 21, () => generateSymbols([
								"=",
								"+",
								"-",
								"x",
								"/",
								">",
								"<",
								">=",
								"<="
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
									var text_6 = text();
									template_effect(($0) => set_text(text_6, $0), [() => _("Fields")]);
									append($$anchor$5, text_6);
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
										var text_7 = first_child(fragment_14);
										Icon(sibling(text_7), { icon: "mdi:chevron-up" });
										template_effect(($0) => set_text(text_7, `${$0 ?? ""} `), [() => _("Show less")]);
										append($$anchor$6, fragment_14);
									};
									var alternate_3 = ($$anchor$6) => {
										var fragment_15 = root_19$1();
										var text_8 = first_child(fragment_15);
										Icon(sibling(text_8), { icon: "mdi:chevron-down" });
										template_effect(($0) => set_text(text_8, `${$0 ?? ""} `), [() => _("Show more")]);
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
								var div_7 = root_20();
								var node_20 = child(div_7);
								var consequent_5 = ($$anchor$6) => {
									var div_8 = root_21();
									var node_21 = child(div_8);
									Label(node_21, {
										children: ($$anchor$7, $$slotProps$2) => {
											next();
											var text_9 = text();
											template_effect(($0) => set_text(text_9, $0), [() => _("PrestaShop fields")]);
											append($$anchor$7, text_9);
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
												var text_10 = text();
												template_effect(() => set_text(text_10, label()));
												append($$anchor$8, text_10);
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
									var div_10 = root_25$1();
									var node_23 = child(div_10);
									Label(node_23, {
										children: ($$anchor$7, $$slotProps$2) => {
											next();
											var text_11 = text();
											template_effect(($0) => set_text(text_11, $0), [() => _("Databases")]);
											append($$anchor$7, text_11);
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
												var text_12 = text();
												template_effect(() => set_text(text_12, label()));
												append($$anchor$8, text_12);
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
									var div_12 = root_29$2();
									var node_25 = child(div_12);
									Label(node_25, {
										children: ($$anchor$7, $$slotProps$2) => {
											next();
											var text_13 = text();
											template_effect(($0) => set_text(text_13, $0), [() => _("Attributes")]);
											append($$anchor$7, text_13);
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
												var text_14 = text();
												template_effect(() => set_text(text_14, label()));
												append($$anchor$8, text_14);
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
									var div_14 = root_33$1();
									var node_27 = child(div_14);
									Label(node_27, {
										children: ($$anchor$7, $$slotProps$2) => {
											next();
											var text_15 = text();
											template_effect(($0) => set_text(text_15, $0), [() => _("Features")]);
											append($$anchor$7, text_15);
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
												var text_16 = text();
												template_effect(() => set_text(text_16, label()));
												append($$anchor$8, text_16);
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
											let $0 = user_derived(() => $tainted()?.intervals?.[$$props.id_interval]?.interval_formulas?.[get(id)]?.editable_formula ? "btn-highlight" : "");
											let $1 = user_derived(() => !$tainted()?.intervals?.[$$props.id_interval]?.interval_formulas?.[get(id)]?.editable_formula);
											Button($$anchor$6, {
												onclick: () => get(editor)?.reformatFormula(),
												get class() {
													return get($0);
												},
												get disabled() {
													return get($1);
												},
												form: "form",
												name: "update",
												type: "submit",
												get value() {
													return get(id);
												},
												"data-ctrl-enter": true,
												children: ($$anchor$7, $$slotProps$3) => {
													var fragment_29 = root_38$1();
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
var root_3 = from_html(`<strong> </strong>: <!> <!>`, 1);
var root_10$1 = from_html(`<!> <!>`, 1);
var root_22 = from_html(`<!> <!>`, 1);
var root_19 = from_html(`<!> <!>`, 1);
var root_25 = from_html(`<div class="flex w-full max-w-sm flex-col gap-1.5"><!> <!></div> <div class="flex w-full max-w-sm flex-col gap-1.5"><!> <div class="flex gap-2"><!> <!></div></div>`, 1);
var root_29$1 = from_html(`<div class="flex w-full max-w-sm flex-col gap-1.5"><!> <!></div>`);
var root_32 = from_html(`<!> Save`, 1);
var root_6 = from_html(`<!> <div class="grid gap-4"><div class="relative flex flex-col space-y-4"><div class="flex w-full max-w-sm flex-col gap-1.5"><!> <!></div> <div class="flex w-full max-w-sm flex-col gap-1.5"><!> <!></div> <!></div></div> <!>`, 1);
var root_2 = from_html(`<!> <!>`, 1);
var root$1 = from_html(`<div class="relative group/condition"><!> <!></div>`);
function Condition($$anchor, $$props) {
	push($$props, true);
	const $form = () => store_get(form, "$form", $$stores);
	const $tainted = () => store_get(tainted, "$tainted", $$stores);
	const $submitting = () => store_get(submitting, "$submitting", $$stores);
	const [$$stores, $$cleanup] = setup_stores();
	let condition = prop($$props, "condition", 7), open = prop($$props, "open", 31, () => proxy({}));
	let id = user_derived(() => `${$$props.id_interval}-${$$props.id_condition_group}-${condition().id}`);
	const { form, tainted, submitting } = $$props.superform;
	let field = user_derived(() => $$props.fields[condition().id_field]);
	let type = user_derived(() => condition().type), min = user_derived(() => condition().min), max = user_derived(() => condition().max), values = user_derived(() => condition().values);
	async function delete_condition() {
		if (!confirm(_("Are you sure you want to delete this condition?"))) return;
		const res = await form_action({
			route: page.route.id,
			action: "delete_condition",
			data: { id_condition: condition().id }
		});
		if (res.success) {
			form.update((state$1) => ({
				...state$1,
				intervals: res.intervals
			}), { taint: false });
			toast.success(_("Condition deleted successfully"));
			open(open()[get(id)] = false, true);
		} else toast.error(res.message);
	}
	var div = root$1();
	var node = child(div);
	Button(node, {
		class: "absolute top-1 right-1 size-5 rounded-sm p-0 opacity-0 transition-opacity group-hover/condition:opacity-100",
		onclick: delete_condition,
		type: "button",
		variant: "destructive",
		children: ($$anchor$1, $$slotProps) => {
			Icon($$anchor$1, { icon: "mdi:trash" });
		},
		$$slots: { default: true }
	});
	var node_1 = sibling(node, 2);
	var bind_get = () => open()[get(id)] ?? false;
	var bind_set = (v) => open(open()[get(id)] = v, true);
	component(node_1, () => Root$1, ($$anchor$1, Dialog_Root) => {
		Dialog_Root($$anchor$1, {
			get open() {
				return bind_get();
			},
			set open($$value) {
				bind_set($$value);
			},
			onOpenChange: (open$1) => {
				if (open$1) store_mutate(form, untrack($form).action_value = get(id), untrack($form));
			},
			children: ($$anchor$2, $$slotProps) => {
				var fragment_1 = root_2();
				var node_2 = first_child(fragment_1);
				{
					let $0 = user_derived(() => cn(buttonVariants({ variant: "outline" }), "bg-amber-400! w-full justify-start p-2 text-black"));
					component(node_2, () => Trigger, ($$anchor$3, Dialog_Trigger) => {
						Dialog_Trigger($$anchor$3, {
							get class() {
								return get($0);
							},
							"data-testid": "condition",
							type: "button",
							children: ($$anchor$4, $$slotProps$1) => {
								var fragment_2 = root_3();
								var strong = first_child(fragment_2);
								var text$1 = child(strong, true);
								reset(strong);
								var node_3 = sibling(strong, 2);
								var consequent = ($$anchor$5) => {
									var text_1 = text();
									template_effect(() => set_text(text_1, `${get(min) ?? ""} → ${(get(max) || "∞") ?? ""}`));
									append($$anchor$5, text_1);
								};
								if_block(node_3, ($$render) => {
									if (get(type) === "range") $$render(consequent);
								});
								var node_4 = sibling(node_3, 2);
								var consequent_1 = ($$anchor$5) => {
									var text_2 = text();
									template_effect(($0$1) => set_text(text_2, `(${$0$1 ?? ""})`), [() => get(values).join(",")]);
									append($$anchor$5, text_2);
								};
								if_block(node_4, ($$render) => {
									if (get(type) === "values") $$render(consequent_1);
								});
								template_effect(() => set_text(text$1, get(field)?.name ?? "--"));
								append($$anchor$4, fragment_2);
							},
							$$slots: { default: true }
						});
					});
				}
				component(sibling(node_2, 2), () => Dialog_content, ($$anchor$3, Dialog_Content) => {
					Dialog_Content($$anchor$3, {
						class: "sm:max-w-xl",
						children: ($$anchor$4, $$slotProps$1) => {
							var fragment_5 = root_6();
							var node_6 = first_child(fragment_5);
							component(node_6, () => Dialog_header, ($$anchor$5, Dialog_Header) => {
								Dialog_Header($$anchor$5, {
									children: ($$anchor$6, $$slotProps$2) => {
										var fragment_6 = comment();
										component(first_child(fragment_6), () => Dialog_title, ($$anchor$7, Dialog_Title) => {
											Dialog_Title($$anchor$7, {
												children: ($$anchor$8, $$slotProps$3) => {
													next();
													var text_3 = text();
													template_effect(($0) => set_text(text_3, $0), [() => _("Edit interval condition")]);
													append($$anchor$8, text_3);
												},
												$$slots: { default: true }
											});
										});
										append($$anchor$6, fragment_6);
									},
									$$slots: { default: true }
								});
							});
							var div_1 = sibling(node_6, 2);
							var div_2 = child(div_1);
							var div_3 = child(div_2);
							var node_8 = child(div_3);
							Label(node_8, {
								for: "email",
								children: ($$anchor$5, $$slotProps$2) => {
									next();
									var text_4 = text();
									template_effect(($0) => set_text(text_4, $0), [() => _("Field")]);
									append($$anchor$5, text_4);
								},
								$$slots: { default: true }
							});
							var node_9 = sibling(node_8, 2);
							var bind_get_1 = () => condition().id_field.toString();
							var bind_set_1 = (v) => {
								condition().id_field = +v;
								store_mutate(form, untrack($form).intervals[$$props.id_interval].condition_groups[$$props.id_condition_group].conditions[condition().id].id_field = +v, untrack($form));
							};
							component(node_9, () => Root, ($$anchor$5, Select_Root) => {
								Select_Root($$anchor$5, {
									get value() {
										return bind_get_1();
									},
									set value($$value) {
										bind_set_1($$value);
									},
									type: "single",
									children: ($$anchor$6, $$slotProps$2) => {
										var fragment_9 = root_10$1();
										var node_10 = first_child(fragment_9);
										component(node_10, () => Select_trigger, ($$anchor$7, Select_Trigger) => {
											Select_Trigger($$anchor$7, {
												"data-testid": "field",
												children: ($$anchor$8, $$slotProps$3) => {
													next();
													var text_5 = text();
													template_effect(() => set_text(text_5, $$props.fields[condition().id_field]?.name ?? "--"));
													append($$anchor$8, text_5);
												},
												$$slots: { default: true }
											});
										});
										component(sibling(node_10, 2), () => Select_content, ($$anchor$7, Select_Content) => {
											Select_Content($$anchor$7, {
												children: ($$anchor$8, $$slotProps$3) => {
													var fragment_11 = comment();
													component(first_child(fragment_11), () => Group, ($$anchor$9, Select_Group) => {
														Select_Group($$anchor$9, {
															children: ($$anchor$10, $$slotProps$4) => {
																var fragment_12 = comment();
																each(first_child(fragment_12), 17, () => sort($$props.fields), ({ id: id$1, name }) => id$1, ($$anchor$11, $$item, $$index, $$array) => {
																	let id$1 = () => get($$item).id;
																	let name = () => get($$item).name;
																	var fragment_13 = comment();
																	var node_14 = first_child(fragment_13);
																	{
																		let $0 = user_derived(() => id$1().toString());
																		component(node_14, () => Select_item, ($$anchor$12, Select_Item) => {
																			Select_Item($$anchor$12, {
																				class: "cursor-pointer",
																				get value() {
																					return get($0);
																				},
																				get label() {
																					return name();
																				},
																				children: ($$anchor$13, $$slotProps$5) => {
																					next();
																					var text_6 = text();
																					template_effect(() => set_text(text_6, name()));
																					append($$anchor$13, text_6);
																				},
																				$$slots: { default: true }
																			});
																		});
																	}
																	append($$anchor$11, fragment_13);
																}, ($$anchor$11) => {
																	var fragment_15 = comment();
																	component(first_child(fragment_15), () => Select_item, ($$anchor$12, Select_Item_1) => {
																		Select_Item_1($$anchor$12, {
																			disabled: true,
																			value: "0",
																			children: ($$anchor$13, $$slotProps$5) => {
																				next();
																				var text_7 = text();
																				template_effect(($0) => set_text(text_7, $0), [() => _("No fields available")]);
																				append($$anchor$13, text_7);
																			},
																			$$slots: { default: true }
																		});
																	});
																	append($$anchor$11, fragment_15);
																});
																append($$anchor$10, fragment_12);
															},
															$$slots: { default: true }
														});
													});
													append($$anchor$8, fragment_11);
												},
												$$slots: { default: true }
											});
										});
										append($$anchor$6, fragment_9);
									},
									$$slots: { default: true }
								});
							});
							reset(div_3);
							var div_4 = sibling(div_3, 2);
							var node_16 = child(div_4);
							Label(node_16, {
								for: "email",
								children: ($$anchor$5, $$slotProps$2) => {
									next();
									var text_8 = text();
									template_effect(($0) => set_text(text_8, $0), [() => _("Type")]);
									append($$anchor$5, text_8);
								},
								$$slots: { default: true }
							});
							component(sibling(node_16, 2), () => Root, ($$anchor$5, Select_Root_1) => {
								Select_Root_1($$anchor$5, {
									type: "single",
									get value() {
										return $form().intervals[$$props.id_interval].condition_groups[$$props.id_condition_group].conditions[condition().id].type;
									},
									set value($$value) {
										store_mutate(form, untrack($form).intervals[$$props.id_interval].condition_groups[$$props.id_condition_group].conditions[condition().id].type = $$value, untrack($form));
									},
									children: ($$anchor$6, $$slotProps$2) => {
										var fragment_18 = root_19();
										var node_18 = first_child(fragment_18);
										component(node_18, () => Select_trigger, ($$anchor$7, Select_Trigger_1) => {
											Select_Trigger_1($$anchor$7, {
												children: ($$anchor$8, $$slotProps$3) => {
													next();
													var text_9 = text();
													template_effect(() => set_text(text_9, $form().intervals[$$props.id_interval].condition_groups[$$props.id_condition_group].conditions[condition().id].type));
													append($$anchor$8, text_9);
												},
												$$slots: { default: true }
											});
										});
										component(sibling(node_18, 2), () => Select_content, ($$anchor$7, Select_Content_1) => {
											Select_Content_1($$anchor$7, {
												children: ($$anchor$8, $$slotProps$3) => {
													var fragment_20 = comment();
													component(first_child(fragment_20), () => Group, ($$anchor$9, Select_Group_1) => {
														Select_Group_1($$anchor$9, {
															children: ($$anchor$10, $$slotProps$4) => {
																var fragment_21 = root_22();
																var node_21 = first_child(fragment_21);
																{
																	let $0 = user_derived(() => _("range"));
																	component(node_21, () => Select_item, ($$anchor$11, Select_Item_2) => {
																		Select_Item_2($$anchor$11, {
																			class: "cursor-pointer",
																			get label() {
																				return get($0);
																			},
																			value: "range",
																			children: ($$anchor$12, $$slotProps$5) => {
																				next();
																				var text_10 = text();
																				template_effect(($0$1) => set_text(text_10, $0$1), [() => _("range")]);
																				append($$anchor$12, text_10);
																			},
																			$$slots: { default: true }
																		});
																	});
																}
																var node_22 = sibling(node_21, 2);
																{
																	let $0 = user_derived(() => _("values"));
																	component(node_22, () => Select_item, ($$anchor$11, Select_Item_3) => {
																		Select_Item_3($$anchor$11, {
																			class: "cursor-pointer",
																			get label() {
																				return get($0);
																			},
																			value: "values",
																			children: ($$anchor$12, $$slotProps$5) => {
																				next();
																				var text_11 = text();
																				template_effect(($0$1) => set_text(text_11, $0$1), [() => _("values")]);
																				append($$anchor$12, text_11);
																			},
																			$$slots: { default: true }
																		});
																	});
																}
																append($$anchor$10, fragment_21);
															},
															$$slots: { default: true }
														});
													});
													append($$anchor$8, fragment_20);
												},
												$$slots: { default: true }
											});
										});
										append($$anchor$6, fragment_18);
									},
									$$slots: { default: true }
								});
							});
							reset(div_4);
							var node_23 = sibling(div_4, 2);
							var consequent_2 = ($$anchor$5) => {
								var fragment_24 = root_25();
								var div_5 = first_child(fragment_24);
								var node_24 = child(div_5);
								Label(node_24, {
									for: "min",
									children: ($$anchor$6, $$slotProps$2) => {
										next();
										var text_12 = text();
										template_effect(($0) => set_text(text_12, `${$0 ?? ""} (≥)`), [() => _("Min")]);
										append($$anchor$6, text_12);
									},
									$$slots: { default: true }
								});
								Input(sibling(node_24, 2), {
									id: "min",
									placeholder: "0",
									type: "text",
									get value() {
										return $form().intervals[$$props.id_interval].condition_groups[$$props.id_condition_group].conditions[condition().id].min;
									},
									set value($$value) {
										store_mutate(form, untrack($form).intervals[$$props.id_interval].condition_groups[$$props.id_condition_group].conditions[condition().id].min = $$value, untrack($form));
									}
								});
								reset(div_5);
								var div_6 = sibling(div_5, 2);
								var node_26 = child(div_6);
								Label(node_26, {
									for: "max",
									children: ($$anchor$6, $$slotProps$2) => {
										next();
										var text_13 = text();
										template_effect(($0) => set_text(text_13, `${$0 ?? ""} (<)`), [() => _("Max")]);
										append($$anchor$6, text_13);
									},
									$$slots: { default: true }
								});
								var div_7 = sibling(node_26, 2);
								var node_27 = child(div_7);
								var bind_get_2 = () => {
									const max$1 = $form().intervals[$$props.id_interval].condition_groups[$$props.id_condition_group].conditions[condition().id].max;
									const min$1 = $form().intervals[$$props.id_interval].condition_groups[$$props.id_condition_group].conditions[condition().id].min;
									if (parseFloat(min$1) === 0 && parseFloat(max$1) === 0) return "∞";
									return max$1;
								};
								var bind_set_2 = (v) => store_mutate(form, untrack($form).intervals[$$props.id_interval].condition_groups[$$props.id_condition_group].conditions[condition().id].max = v, untrack($form));
								Input(node_27, {
									get value() {
										return bind_get_2();
									},
									set value($$value) {
										bind_set_2($$value);
									},
									id: "max",
									placeholder: "∞",
									type: "text"
								});
								var node_28 = sibling(node_27, 2);
								{
									let $0 = user_derived(() => _("+Infinity (no upper limit)"));
									Button(node_28, {
										type: "button",
										class: "btn btn-primary",
										get title() {
											return get($0);
										},
										onclick: () => store_mutate(form, untrack($form).intervals[$$props.id_interval].condition_groups[$$props.id_condition_group].conditions[condition().id].max = "∞", untrack($form)),
										children: ($$anchor$6, $$slotProps$2) => {
											next();
											append($$anchor$6, text("∞"));
										},
										$$slots: { default: true }
									});
								}
								reset(div_7);
								reset(div_6);
								append($$anchor$5, fragment_24);
							};
							var alternate = ($$anchor$5) => {
								var div_8 = root_29$1();
								var node_29 = child(div_8);
								Label(node_29, {
									for: "max",
									children: ($$anchor$6, $$slotProps$2) => {
										next();
										append($$anchor$6, text("Values (separate by comma, use dot for decimal values)"));
									},
									$$slots: { default: true }
								});
								var node_30 = sibling(node_29, 2);
								var bind_get_3 = () => $form().intervals[$$props.id_interval].condition_groups[$$props.id_condition_group].conditions[condition().id].values.join(",");
								var bind_set_3 = (v) => {
									store_mutate(form, untrack($form).intervals[$$props.id_interval].condition_groups[$$props.id_condition_group].conditions[condition().id].values = v.split(","), untrack($form));
								};
								Input(node_30, {
									get value() {
										return bind_get_3();
									},
									set value($$value) {
										bind_set_3($$value);
									},
									id: "max",
									placeholder: "0,1,2,3.5,5",
									type: "text"
								});
								reset(div_8);
								append($$anchor$5, div_8);
							};
							if_block(node_23, ($$render) => {
								if (condition().type === "range") $$render(consequent_2);
								else $$render(alternate, false);
							});
							reset(div_2);
							reset(div_1);
							component(sibling(div_1, 2), () => Dialog_footer, ($$anchor$5, Dialog_Footer) => {
								Dialog_Footer($$anchor$5, {
									children: ($$anchor$6, $$slotProps$2) => {
										{
											let $0 = user_derived(() => $tainted()?.intervals?.[$$props.id_interval]?.condition_groups?.[$$props.id_condition_group]?.conditions?.[condition().id] && "btn-highlight");
											let $1 = user_derived(() => !$tainted()?.intervals?.[$$props.id_interval]?.condition_groups?.[$$props.id_condition_group]?.conditions?.[condition().id]);
											Button($$anchor$6, {
												get class() {
													return get($0);
												},
												get disabled() {
													return get($1);
												},
												form: "form",
												name: "update-interval-condition",
												type: "submit",
												get value() {
													return `${$$props.id_interval ?? ""}-${$$props.id_condition_group ?? ""}-${condition().id ?? ""}`;
												},
												children: ($$anchor$7, $$slotProps$3) => {
													var fragment_28 = root_32();
													var node_32 = first_child(fragment_28);
													{
														let $0$1 = user_derived(() => $submitting() && $form().action_name === "update-interval-condition");
														Spinner(node_32, {
															get loading() {
																return get($0$1);
															},
															children: ($$anchor$8, $$slotProps$4) => {
																Icon($$anchor$8, { icon: "mdi:content-save" });
															},
															$$slots: { default: true }
														});
													}
													next();
													append($$anchor$7, fragment_28);
												},
												$$slots: { default: true }
											});
										}
									},
									$$slots: { default: true }
								});
							});
							append($$anchor$4, fragment_5);
						},
						$$slots: { default: true }
					});
				});
				append($$anchor$2, fragment_1);
			},
			$$slots: { default: true }
		});
	});
	reset(div);
	append($$anchor, div);
	pop();
	$$cleanup();
}
var root_10 = from_html(`<!> <!>`, 1);
var root_7 = from_html(`<!> <!> <!>`, 1);
var root_24 = from_html(`<div class="relative flex flex-col gap-2"><!> <!></div>`);
var root_29 = from_html(`<div class="flex justify-center"><!></div>`);
var root_23 = from_html(`<!> <!> <!>`, 1);
var root_38 = from_html(`<div class="flex justify-center"><!></div>`);
var root_41 = from_html(`<div class="flex justify-center"><!></div>`);
var root_33 = from_html(`<!> <!> <!>`, 1);
var root_5 = from_html(`<!> <!> <!>`, 1);
var root_45 = from_html(`<!> <!> <!>`, 1);
var root_49 = from_html(`<!> `, 1);
var root = from_html(`<form id="form" method="POST"><div class="flex flex-col gap-4 p-4"><!></div> <!></form>`);
function _page($$anchor, $$props) {
	push($$props, true);
	const $form = () => store_get(form, "$form", $$stores);
	const $tainted = () => store_get(tainted, "$tainted", $$stores);
	const $errors = () => store_get(errors, "$errors", $$stores);
	const $submitting = () => store_get(submitting, "$submitting", $$stores);
	const [$$stores, $$cleanup] = setup_stores();
	const superform = superForm($$props.data.form, {
		dataType: "json",
		SPA: true,
		validators: valibot(IntervalsFormSchema),
		resetForm: false,
		invalidateAll: false,
		async onSubmit({ cancel, submitter }) {
			const data = {
				action_name: submitter?.getAttribute("name") || "update",
				action_value: submitter?.getAttribute("value") || $form().action_value,
				intervals: Object.fromEntries(Object.values($form().intervals).filter((c) => Object.keys($tainted()?.intervals ?? {}).includes(c.id.toString())).map((c) => [c.id, c]))
			};
			store_mutate(form, untrack($form).action_name = data.action_name, untrack($form));
			store_mutate(form, untrack($form).action_value = data.action_value, untrack($form));
			const res = await form_action({
				route: page.route.id,
				action: "update",
				data
			});
			if (res.error) {
				const id = res.id;
				const id_interval = res.id_interval;
				store_mutate(errors, untrack($errors).intervals = { [id_interval]: { interval_formulas: { [id]: { editable_formula: [res.message] } } } }, untrack($errors));
				cancel();
				return;
			}
			for (const id_interval in res.intervals) {
				res.intervals[id_interval].interval_formulas = obj(res.intervals[id_interval].interval_formulas);
				for (const id in res.intervals[id_interval].interval_formulas) res.intervals[id_interval].interval_formulas[id].editable_formula = res.intervals[id_interval].interval_formulas[id].formula;
			}
			form.update((state$1) => ({
				...state$1,
				action_name: "",
				action_value: data.action_value,
				intervals: obj(res.intervals)
			}), { taint: false });
			if ($form().action_value) {
				set(open, {}, true);
				set(open_conditions, {}, true);
			}
			switch (data.action_name) {
				case "add":
					toast.success(_("Interval added successfully"));
					break;
				case "delete":
					toast.success(_("Interval deleted successfully"));
					break;
				case "update":
				case "add-interval-field":
				case "add-condition-group":
				case "update-interval-condition":
					toast.success(_("Interval updated successfully"));
					break;
			}
			cancel();
		}
	});
	const { form, enhance, submitting, tainted, errors } = superform;
	let fields = user_derived(() => $$props.data.fields);
	let attributes = user_derived(() => $$props.data.attributes);
	let features = user_derived(() => $$props.data.features);
	let databases = user_derived(() => $$props.data.databases);
	let ps_fields = user_derived(() => $$props.data.ps_fields);
	let open = state(proxy({}));
	let open_conditions = state(proxy({}));
	let intervals = user_derived(() => Object.values($form().intervals));
	let ids = user_derived(() => get(intervals).map(({ id }) => id).join("-"));
	async function saveIntervalField(id, data) {
		const res = await form_action({
			route: page.route.id,
			action: "save_interval_field",
			data: {
				id,
				...data
			}
		});
		form.update((state$1) => ({
			...state$1,
			intervals: res.intervals
		}), { taint: false });
		toast.success(_("Interval field updated successfully"));
	}
	async function insert_condition(id_condition_group) {
		const res = await form_action({
			route: page.route.id,
			action: "insert_condition",
			data: { id_condition_group }
		});
		form.update((state$1) => ({
			...state$1,
			intervals: res.intervals
		}), { taint: false });
		toast.success(_("Condition added successfully"));
	}
	var form_1 = root();
	var div = child(form_1);
	key(child(div), () => get(ids), ($$anchor$1) => {
		var fragment = comment();
		each(first_child(fragment), 17, () => get(intervals), ({ id, interval_fields, condition_groups }) => id, ($$anchor$2, $$item) => {
			let id = () => get($$item).id;
			let interval_fields = () => get($$item).interval_fields;
			let condition_groups = () => get($$item).condition_groups;
			var fragment_1 = comment();
			component(first_child(fragment_1), () => Card, ($$anchor$3, Card_Root) => {
				Card_Root($$anchor$3, {
					class: "list-element",
					get "data-id"() {
						return id();
					},
					"data-testid": "interval",
					children: ($$anchor$4, $$slotProps) => {
						var fragment_2 = comment();
						component(first_child(fragment_2), () => Card_content, ($$anchor$5, Card_Content) => {
							Card_Content($$anchor$5, {
								class: "group relative",
								children: ($$anchor$6, $$slotProps$1) => {
									var fragment_3 = comment();
									component(first_child(fragment_3), () => Table, ($$anchor$7, Table_Root) => {
										Table_Root($$anchor$7, {
											class: "w-max",
											children: ($$anchor$8, $$slotProps$2) => {
												var fragment_4 = root_5();
												var node_5 = first_child(fragment_4);
												component(node_5, () => Table_header, ($$anchor$9, Table_Header) => {
													Table_Header($$anchor$9, {
														children: ($$anchor$10, $$slotProps$3) => {
															var fragment_5 = comment();
															component(first_child(fragment_5), () => Table_row, ($$anchor$11, Table_Row) => {
																Table_Row($$anchor$11, {
																	children: ($$anchor$12, $$slotProps$4) => {
																		var fragment_6 = root_7();
																		var node_7 = first_child(fragment_6);
																		component(node_7, () => Table_head, ($$anchor$13, Table_Head) => {
																			Table_Head($$anchor$13, {});
																		});
																		var node_8 = sibling(node_7, 2);
																		each(node_8, 17, () => Object.values(interval_fields()), ({ id: id$1, id_interval, id_field }) => id$1, ($$anchor$13, $$item$1, $$index_1, $$array) => {
																			let id$1 = () => get($$item$1).id;
																			let id_interval = () => get($$item$1).id_interval;
																			let id_field = () => get($$item$1).id_field;
																			var fragment_7 = comment();
																			component(first_child(fragment_7), () => Table_head, ($$anchor$14, Table_Head_1) => {
																				Table_Head_1($$anchor$14, {
																					class: "min-w-48 max-w-96 bg-sky-500",
																					children: ($$anchor$15, $$slotProps$5) => {
																						var fragment_8 = comment();
																						var node_10 = first_child(fragment_8);
																						var bind_get = () => $form().intervals[id_interval()].interval_fields[id$1()].id_field.toString();
																						var bind_set = (v) => store_mutate(form, untrack($form).intervals[id_interval()].interval_fields[id$1()].id_field = +v, untrack($form));
																						component(node_10, () => Root, ($$anchor$16, Select_Root) => {
																							Select_Root($$anchor$16, {
																								type: "single",
																								get value() {
																									return bind_get();
																								},
																								set value($$value) {
																									bind_set($$value);
																								},
																								onValueChange: (value) => saveIntervalField(id$1(), { id_field: value }),
																								children: ($$anchor$17, $$slotProps$6) => {
																									var fragment_9 = root_10();
																									var node_11 = first_child(fragment_9);
																									component(node_11, () => Select_trigger, ($$anchor$18, Select_Trigger) => {
																										Select_Trigger($$anchor$18, {
																											"data-testid": "interval-field",
																											children: ($$anchor$19, $$slotProps$7) => {
																												next();
																												var text$1 = text();
																												template_effect(() => set_text(text$1, get(fields)[id_field()]?.name ?? "--"));
																												append($$anchor$19, text$1);
																											},
																											$$slots: { default: true }
																										});
																									});
																									component(sibling(node_11, 2), () => Select_content, ($$anchor$18, Select_Content) => {
																										Select_Content($$anchor$18, {
																											children: ($$anchor$19, $$slotProps$7) => {
																												var fragment_11 = comment();
																												component(first_child(fragment_11), () => Group, ($$anchor$20, Select_Group) => {
																													Select_Group($$anchor$20, {
																														children: ($$anchor$21, $$slotProps$8) => {
																															var fragment_12 = comment();
																															each(first_child(fragment_12), 17, () => sort(get(fields)), ({ id: id$2, name }) => id$2, ($$anchor$22, $$item$2, $$index, $$array_1) => {
																																let id$2 = () => get($$item$2).id;
																																let name = () => get($$item$2).name;
																																var fragment_13 = comment();
																																var node_15 = first_child(fragment_13);
																																{
																																	let $0 = user_derived(() => id$2().toString());
																																	component(node_15, () => Select_item, ($$anchor$23, Select_Item) => {
																																		Select_Item($$anchor$23, {
																																			class: "cursor-pointer",
																																			get value() {
																																				return get($0);
																																			},
																																			get label() {
																																				return name();
																																			},
																																			children: ($$anchor$24, $$slotProps$9) => {
																																				next();
																																				var text_1 = text();
																																				template_effect(() => set_text(text_1, name()));
																																				append($$anchor$24, text_1);
																																			},
																																			$$slots: { default: true }
																																		});
																																	});
																																}
																																append($$anchor$22, fragment_13);
																															}, ($$anchor$22) => {
																																var fragment_15 = comment();
																																component(first_child(fragment_15), () => Select_item, ($$anchor$23, Select_Item_1) => {
																																	Select_Item_1($$anchor$23, {
																																		disabled: true,
																																		value: "0",
																																		children: ($$anchor$24, $$slotProps$9) => {
																																			next();
																																			var text_2 = text();
																																			template_effect(($0) => set_text(text_2, $0), [() => _("No fields available")]);
																																			append($$anchor$24, text_2);
																																		},
																																		$$slots: { default: true }
																																	});
																																});
																																append($$anchor$22, fragment_15);
																															});
																															append($$anchor$21, fragment_12);
																														},
																														$$slots: { default: true }
																													});
																												});
																												append($$anchor$19, fragment_11);
																											},
																											$$slots: { default: true }
																										});
																									});
																									append($$anchor$17, fragment_9);
																								},
																								$$slots: { default: true }
																							});
																						});
																						append($$anchor$15, fragment_8);
																					},
																					$$slots: { default: true }
																				});
																			});
																			append($$anchor$13, fragment_7);
																		});
																		component(sibling(node_8, 2), () => Table_head, ($$anchor$13, Table_Head_2) => {
																			Table_Head_2($$anchor$13, {
																				class: "w-20 bg-sky-500 text-center",
																				children: ($$anchor$14, $$slotProps$5) => {
																					Form_button($$anchor$14, {
																						type: "submit",
																						variant: "ghost",
																						class: "text-white",
																						name: "add-interval-field",
																						get value() {
																							return id();
																						},
																						children: ($$anchor$15, $$slotProps$6) => {
																							{
																								let $0 = user_derived(() => $submitting() && $form().action_name === "add-interval-field" && $form().action_value === id().toString());
																								Spinner($$anchor$15, {
																									get loading() {
																										return get($0);
																									},
																									children: ($$anchor$16, $$slotProps$7) => {
																										Icon($$anchor$16, { icon: "mdi:plus" });
																									},
																									$$slots: { default: true }
																								});
																							}
																						},
																						$$slots: { default: true }
																					});
																				},
																				$$slots: { default: true }
																			});
																		});
																		append($$anchor$12, fragment_6);
																	},
																	$$slots: { default: true }
																});
															});
															append($$anchor$10, fragment_5);
														},
														$$slots: { default: true }
													});
												});
												var node_18 = sibling(node_5, 2);
												component(node_18, () => Table_body, ($$anchor$9, Table_Body) => {
													Table_Body($$anchor$9, {
														children: ($$anchor$10, $$slotProps$3) => {
															var fragment_20 = comment();
															each(first_child(fragment_20), 17, () => Object.values(condition_groups()), ({ id: id_condition_group, id_interval, conditions }) => id_condition_group, ($$anchor$11, $$item$1) => {
																let id_condition_group = () => get($$item$1).id;
																let id_interval = () => get($$item$1).id_interval;
																let conditions = () => get($$item$1).conditions;
																var fragment_21 = comment();
																component(first_child(fragment_21), () => Table_row, ($$anchor$12, Table_Row_1) => {
																	Table_Row_1($$anchor$12, {
																		children: ($$anchor$13, $$slotProps$4) => {
																			var fragment_22 = root_23();
																			var node_21 = first_child(fragment_22);
																			component(node_21, () => Table_cell, ($$anchor$14, Table_Cell) => {
																				Table_Cell($$anchor$14, {
																					class: "w-[1%] bg-sky-500 group/condition-group",
																					children: ($$anchor$15, $$slotProps$5) => {
																						var div_1 = root_24();
																						var node_22 = child(div_1);
																						each(node_22, 17, () => Object.values(conditions()), (condition) => condition.id, ($$anchor$16, condition) => {
																							Condition($$anchor$16, {
																								get superform() {
																									return superform;
																								},
																								get condition() {
																									return get(condition);
																								},
																								get open() {
																									return get(open_conditions);
																								},
																								get id_interval() {
																									return id_interval();
																								},
																								get id_condition_group() {
																									return id_condition_group();
																								},
																								get fields() {
																									return get(fields);
																								}
																							});
																						});
																						var node_23 = sibling(node_22, 2);
																						{
																							let $0 = user_derived(() => ({
																								"bg-amber-400! text-black": true,
																								"absolute bottom-0 rounded-t-none bg-black! text-amber-400! h-3 w-full p-0 opacity-0 group-hover/condition-group:opacity-100": Object.keys(conditions()).length > 0
																							}));
																							let $1 = user_derived(() => _("Add another condition"));
																							Form_button(node_23, {
																								onclick: () => insert_condition(id_condition_group()),
																								get class() {
																									return get($0);
																								},
																								get title() {
																									return get($1);
																								},
																								children: ($$anchor$16, $$slotProps$6) => {
																									Icon($$anchor$16, {
																										icon: "mdi:plus",
																										class: "text-xs"
																									});
																								},
																								$$slots: { default: true }
																							});
																						}
																						reset(div_1);
																						append($$anchor$15, div_1);
																					},
																					$$slots: { default: true }
																				});
																			});
																			var node_24 = sibling(node_21, 2);
																			each(node_24, 17, () => Object.values(interval_fields()), ({ id: id_interval_field, id_interval: id_interval$1 }) => id_interval_field, ($$anchor$14, $$item$2, $$index_3, $$array_2) => {
																				let id_interval_field = () => get($$item$2).id;
																				let id_interval$1 = () => get($$item$2).id_interval;
																				var fragment_25 = comment();
																				component(first_child(fragment_25), () => Table_cell, ($$anchor$15, Table_Cell_1) => {
																					Table_Cell_1($$anchor$15, {
																						class: "min-w-48 max-w-96 text-center",
																						children: ($$anchor$16, $$slotProps$5) => {
																							{
																								let $0 = user_derived(() => Object.values($$props.data.fields));
																								Formula($$anchor$16, {
																									get attributes() {
																										return get(attributes);
																									},
																									get features() {
																										return get(features);
																									},
																									get ps_fields() {
																										return get(ps_fields);
																									},
																									get databases() {
																										return get(databases);
																									},
																									get fields() {
																										return get($0);
																									},
																									get id_interval() {
																										return id_interval$1();
																									},
																									get id_interval_field() {
																										return id_interval_field();
																									},
																									get id_condition_group() {
																										return id_condition_group();
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
																						},
																						$$slots: { default: true }
																					});
																				});
																				append($$anchor$14, fragment_25);
																			});
																			component(sibling(node_24, 2), () => Table_cell, ($$anchor$14, Table_Cell_2) => {
																				Table_Cell_2($$anchor$14, {
																					class: "w-20",
																					children: ($$anchor$15, $$slotProps$5) => {
																						var div_2 = root_29();
																						var node_27 = child(div_2);
																						{
																							let $0 = user_derived(() => _("Delete condition"));
																							Form_button(node_27, {
																								class: "text-destructive flex gap-2",
																								variant: "ghost",
																								size: "sm",
																								name: "delete-condition-group",
																								get value() {
																									return id_condition_group();
																								},
																								get title() {
																									return get($0);
																								},
																								onclick: (e) => {
																									if (!confirm(_("Are you sure you want to delete this condition group?"))) e.preventDefault();
																								},
																								children: ($$anchor$16, $$slotProps$6) => {
																									{
																										let $0$1 = user_derived(() => $submitting() && $form().action_name === "delete-condition-group" && $form().action_value === id_condition_group().toString());
																										Spinner($$anchor$16, {
																											get loading() {
																												return get($0$1);
																											},
																											children: ($$anchor$17, $$slotProps$7) => {
																												Icon($$anchor$17, { icon: "mdi:close" });
																											},
																											$$slots: { default: true }
																										});
																									}
																								},
																								$$slots: { default: true }
																							});
																						}
																						reset(div_2);
																						append($$anchor$15, div_2);
																					},
																					$$slots: { default: true }
																				});
																			});
																			append($$anchor$13, fragment_22);
																		},
																		$$slots: { default: true }
																	});
																});
																append($$anchor$11, fragment_21);
															});
															append($$anchor$10, fragment_20);
														},
														$$slots: { default: true }
													});
												});
												component(sibling(node_18, 2), () => Table_footer, ($$anchor$9, Table_Footer) => {
													Table_Footer($$anchor$9, {
														children: ($$anchor$10, $$slotProps$3) => {
															var fragment_29 = comment();
															component(first_child(fragment_29), () => Table_row, ($$anchor$11, Table_Row_2) => {
																Table_Row_2($$anchor$11, {
																	children: ($$anchor$12, $$slotProps$4) => {
																		var fragment_30 = root_33();
																		var node_30 = first_child(fragment_30);
																		component(node_30, () => Table_cell, ($$anchor$13, Table_Cell_3) => {
																			Table_Cell_3($$anchor$13, {
																				class: "text-center",
																				children: ($$anchor$14, $$slotProps$5) => {
																					Form_button($$anchor$14, {
																						type: "submit",
																						variant: "default",
																						class: "bg-sky-500",
																						name: "add-condition-group",
																						get value() {
																							return id();
																						},
																						children: ($$anchor$15, $$slotProps$6) => {
																							{
																								let $0 = user_derived(() => $submitting() && $form().action_name === "add-condition-group" && $form().action_value === id().toString());
																								Spinner($$anchor$15, {
																									get loading() {
																										return get($0);
																									},
																									children: ($$anchor$16, $$slotProps$7) => {
																										Icon($$anchor$16, { icon: "mdi:plus" });
																									},
																									$$slots: { default: true }
																								});
																							}
																						},
																						$$slots: { default: true }
																					});
																				},
																				$$slots: { default: true }
																			});
																		});
																		var node_31 = sibling(node_30, 2);
																		each(node_31, 17, () => Object.values(interval_fields()), ({ id: id$1 }) => id$1, ($$anchor$13, $$item$1, $$index_5, $$array_3) => {
																			let id$1 = () => get($$item$1).id;
																			var fragment_34 = comment();
																			component(first_child(fragment_34), () => Table_cell, ($$anchor$14, Table_Cell_4) => {
																				Table_Cell_4($$anchor$14, {
																					children: ($$anchor$15, $$slotProps$5) => {
																						var div_3 = root_38();
																						var node_33 = child(div_3);
																						{
																							let $0 = user_derived(() => _("Delete interval field"));
																							Form_button(node_33, {
																								class: "text-destructive flex gap-2",
																								variant: "ghost",
																								size: "sm",
																								name: "delete-interval-field",
																								get title() {
																									return get($0);
																								},
																								get value() {
																									return id$1();
																								},
																								onclick: (e) => {
																									if (!confirm(_("Are you sure you want to delete this interval field?"))) e.preventDefault();
																								},
																								children: ($$anchor$16, $$slotProps$6) => {
																									{
																										let $0$1 = user_derived(() => $submitting() && $form().action_name === "delete-interval-field" && $form().action_value === id$1().toString());
																										Spinner($$anchor$16, {
																											get loading() {
																												return get($0$1);
																											},
																											children: ($$anchor$17, $$slotProps$7) => {
																												Icon($$anchor$17, { icon: "mdi:close" });
																											},
																											$$slots: { default: true }
																										});
																									}
																								},
																								$$slots: { default: true }
																							});
																						}
																						reset(div_3);
																						append($$anchor$15, div_3);
																					},
																					$$slots: { default: true }
																				});
																			});
																			append($$anchor$13, fragment_34);
																		});
																		component(sibling(node_31, 2), () => Table_cell, ($$anchor$13, Table_Cell_5) => {
																			Table_Cell_5($$anchor$13, {
																				children: ($$anchor$14, $$slotProps$5) => {
																					var div_4 = root_41();
																					var node_35 = child(div_4);
																					{
																						let $0 = user_derived(() => _("Delete interval"));
																						Form_button(node_35, {
																							class: "flex gap-2",
																							variant: "destructive",
																							size: "sm",
																							name: "delete",
																							get value() {
																								return id();
																							},
																							get title() {
																								return get($0);
																							},
																							onclick: (e) => {
																								if (!confirm(_("Are you sure you want to delete this interval?"))) e.preventDefault();
																							},
																							children: ($$anchor$15, $$slotProps$6) => {
																								{
																									let $0$1 = user_derived(() => $submitting() && $form().action_name === "delete" && $form().action_value === id().toString());
																									Spinner($$anchor$15, {
																										get loading() {
																											return get($0$1);
																										},
																										children: ($$anchor$16, $$slotProps$7) => {
																											Icon($$anchor$16, { icon: "mdi:trash-can" });
																										},
																										$$slots: { default: true }
																									});
																								}
																							},
																							$$slots: { default: true }
																						});
																					}
																					reset(div_4);
																					append($$anchor$14, div_4);
																				},
																				$$slots: { default: true }
																			});
																		});
																		append($$anchor$12, fragment_30);
																	},
																	$$slots: { default: true }
																});
															});
															append($$anchor$10, fragment_29);
														},
														$$slots: { default: true }
													});
												});
												append($$anchor$8, fragment_4);
											},
											$$slots: { default: true }
										});
									});
									append($$anchor$6, fragment_3);
								},
								$$slots: { default: true }
							});
						});
						append($$anchor$4, fragment_2);
					},
					$$slots: { default: true }
				});
			});
			append($$anchor$2, fragment_1);
		}, ($$anchor$2) => {
			var fragment_39 = comment();
			component(first_child(fragment_39), () => Alert, ($$anchor$3, Alert_Root) => {
				Alert_Root($$anchor$3, {
					children: ($$anchor$4, $$slotProps) => {
						var fragment_40 = root_45();
						var node_37 = first_child(fragment_40);
						Icon(node_37, { icon: "ic:baseline-info" });
						var node_38 = sibling(node_37, 2);
						component(node_38, () => Alert_title, ($$anchor$5, Alert_Title) => {
							Alert_Title($$anchor$5, {
								children: ($$anchor$6, $$slotProps$1) => {
									next();
									var text_3 = text();
									template_effect(($0) => set_text(text_3, $0), [() => _("No intervals found")]);
									append($$anchor$6, text_3);
								},
								$$slots: { default: true }
							});
						});
						component(sibling(node_38, 2), () => Alert_description, ($$anchor$5, Alert_Description) => {
							Alert_Description($$anchor$5, {
								children: ($$anchor$6, $$slotProps$1) => {
									next();
									var text_4 = text();
									template_effect(($0) => set_text(text_4, $0), [() => _("Click the button below to add an interval")]);
									append($$anchor$6, text_4);
								},
								$$slots: { default: true }
							});
						});
						append($$anchor$4, fragment_40);
					},
					$$slots: { default: true }
				});
			});
			append($$anchor$2, fragment_39);
		});
		append($$anchor$1, fragment);
	});
	reset(div);
	component(sibling(div, 2), () => Card_footer, ($$anchor$1, Card_Footer) => {
		Card_Footer($$anchor$1, {
			children: ($$anchor$2, $$slotProps) => {
				Form_button($$anchor$2, {
					class: "flex gap-2",
					"data-testid": "add-interval",
					name: "add",
					variant: "outline",
					children: ($$anchor$3, $$slotProps$1) => {
						var fragment_44 = root_49();
						var node_41 = first_child(fragment_44);
						{
							let $0 = user_derived(() => $submitting() && $form().action_name === "add");
							Spinner(node_41, {
								get loading() {
									return get($0);
								},
								children: ($$anchor$4, $$slotProps$2) => {
									Icon($$anchor$4, { icon: "mdi:plus" });
								},
								$$slots: { default: true }
							});
						}
						var text_5 = sibling(node_41);
						template_effect(($0) => set_text(text_5, ` ${$0 ?? ""}`), [() => _("Add interval")]);
						append($$anchor$3, fragment_44);
					},
					$$slots: { default: true }
				});
			},
			$$slots: { default: true }
		});
	});
	reset(form_1);
	action(form_1, ($$node) => enhance?.($$node));
	append($$anchor, form_1);
	pop();
	$$cleanup();
}
export { _page as component, _page_exports as universal };
