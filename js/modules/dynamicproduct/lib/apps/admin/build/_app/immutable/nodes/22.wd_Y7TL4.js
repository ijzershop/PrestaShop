import { B as html, Ct as set, Dt as derived_safe_equal, Ft as push, G as if_block, Ht as next, I as transition, L as component, N as action, Ot as user_derived, Pt as pop, Tt as state, Ut as reset, V as each, W as key, X as comment, Y as append, Z as from_html, Zt as __exportAll, _ as reactive_import, b as bind_this, bt as sibling, d as store_mutate, et as text, f as store_set, l as setup_stores, lt as untrack, o as prop, ot as get, pt as template_effect, q as set_text, qt as to_array, u as store_get, v as init, vt as child, xt as proxy, yt as first_child } from "../chunks/DUscB9kS.js";
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
import { n as _, r as __, t as Icon } from "../chunks/DFl6Gq92.js";
import { n as page } from "../chunks/BRpqcTWk.js";
import "../chunks/_yKPJ4BA.js";
import "../chunks/T79hDoyY.js";
import { t as Label } from "../chunks/ClKKfzS1.js";
import { a as Card_content, o as Card, r as Card_footer } from "../chunks/Bpx6gt8W.js";
import { t as LocalStore } from "../chunks/C4w9vuey.js";
import { n as lang } from "../chunks/cJwMBL5_.js";
import "../chunks/CgH3Vt0F.js";
import { n as Alert_description, r as Alert, t as Alert_title } from "../chunks/OMr53o_L.js";
import { d as optional, f as picklist, g as string, l as number, m as record, n as array, u as object } from "../chunks/Da0rmiev.js";
import { t as Spinner } from "../chunks/C9eHbt79.js";
import { a as Dialog_content, c as Dialog_title, i as Dialog_description, n as Root, o as Dialog_header, r as Trigger, s as Dialog_footer } from "../chunks/Bc1vuzVu.js";
import { n as obj } from "../chunks/C961kT60.js";
import "../chunks/BirQbuIK.js";
import "../chunks/BAR_jctJ.js";
import "../chunks/CAZFn-OP.js";
import { t as highlight } from "../chunks/Dt-VaJa3.js";
import { t as sort } from "../chunks/Bz4g0JZD.js";
import { n as Form_button } from "../chunks/C9E5Z7Ag.js";
import "../chunks/GxWY6lrD.js";
import { t as sortable } from "../chunks/cJTe3rpq.js";
/* empty css                 */
import { t as Input } from "../chunks/D2YUxW8P.js";
import { t as fade } from "../chunks/XggUl40U.js";
import { n as fields_filter, t as FieldsFilter } from "../chunks/B8OVl6Sc.js";
import { i as CodeMirror, n as SymbolBtn, r as FieldBtn, t as generateSymbols } from "../chunks/CZwT-Fpx.js";
const ConditionSchema = object({
	id: number(),
	name: string(),
	formula: string(),
	editable_formula: optional(string()),
	position: number(),
	hidden_fields: array(number()),
	hidden_options: record(string(), array(number())),
	hidden_groups: array(number()),
	hidden_steps: array(number())
});
const ConditionsFormSchema = object({
	action_name: picklist([
		"",
		"update",
		"add",
		"delete"
	]),
	action_value: string(),
	conditions: record(string(), ConditionSchema)
});
var _page_exports = /* @__PURE__ */ __exportAll({ load: () => load }, 1);
const load = async (event) => {
	const { conditions, fields, groups, product_groups, steps, product_steps, attributes, features, ps_fields, databases } = await page_load(event);
	for (const id in conditions) {
		conditions[id].editable_formula = conditions[id].formula;
		conditions[id].hidden_options = obj(conditions[id].hidden_options);
	}
	return {
		form: await superValidate({ conditions: obj(conditions) }, valibot(ConditionsFormSchema)),
		fields,
		groups,
		product_groups,
		steps,
		product_steps,
		attributes,
		features,
		databases,
		ps_fields
	};
};
var root_3$1 = from_html(`<span> </span>`);
var root_5$2 = from_html(`<span class="font-mono text-wrap leading-6 text-left"><span class="text-muted-foreground">IF(</span> <!> <span class="text-muted-foreground">)</span></span>`);
var root_6 = from_html(`<span> </span>`);
var root_8 = from_html(`<!> <!>`, 1);
var root_11 = from_html(`<!> `, 1);
var root_18 = from_html(` <!>`, 1);
var root_19$1 = from_html(` <!>`, 1);
var root_21 = from_html(`<div><!> <div class="flex flex-row flex-wrap gap-2"></div></div>`);
var root_25$1 = from_html(`<div><!> <div class="flex flex-row flex-wrap gap-2"></div></div>`);
var root_29 = from_html(`<div><!> <div class="flex flex-row flex-wrap gap-2"></div></div>`);
var root_33 = from_html(`<div><!> <div class="flex flex-row flex-wrap gap-2"></div></div>`);
var root_20 = from_html(`<div><!> <!> <!> <!></div>`);
var root_38 = from_html(`<!> Save`, 1);
var root_7 = from_html(`<!> <div class="grid gap-4"><div class="text-error flex items-center gap-1 text-sm"><!></div> <div class="form-control relative"><!></div> <div class="flex flex-row flex-wrap gap-2"></div> <div class="max-h-[calc(100vh-400px)] overflow-auto"><div><!> <!> <div class="flex flex-row flex-wrap gap-2"><!> <!></div></div> <!></div></div> <!>`, 1);
var root_1 = from_html(`<!> <!>`, 1);
function Formula($$anchor, $$props) {
	push($$props, true);
	const $form = () => store_get(form, "$form", $$stores);
	const $errors = () => store_get(errors, "$errors", $$stores);
	const $tainted = () => store_get(tainted, "$tainted", $$stores);
	const $submitting = () => store_get(submitting, "$submitting", $$stores);
	const [$$stores, $$cleanup] = setup_stores();
	let open = prop($$props, "open", 31, () => proxy({}));
	const { form, tainted, errors, submitting } = $$props.superform;
	let $$d = user_derived(() => $form().conditions[$$props.id]), formula = user_derived(() => get($$d).formula);
	let editor = state(void 0);
	let show_more = state(false);
	let filtered_fields = user_derived(() => fields_filter.run($$props.fields.filter((f) => f.name)));
	var fragment = comment();
	var node = first_child(fragment);
	var bind_get = () => open()[$$props.id] ?? false;
	var bind_set = (v) => open(open()[$$props.id] = v, true);
	component(node, () => Root, ($$anchor$1, Dialog_Root) => {
		Dialog_Root($$anchor$1, {
			get open() {
				return bind_get();
			},
			set open($$value) {
				bind_set($$value);
			},
			onOpenChange: (open$1) => {
				if (open$1) store_mutate(form, untrack($form).action_value = $$props.id.toString(), untrack($form));
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
								return `${get($0) ?? ""} justify-start! h-auto min-h-10 ${get($1) ?? ""}`;
							},
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
										var span_1 = root_5$2();
										html(sibling(child(span_1), 2), () => highlight(get(formula)));
										next(2);
										reset(span_1);
										append($$anchor$6, span_1);
									};
									var alternate = ($$anchor$6) => {
										var span_2 = root_6();
										var text_2 = child(span_2, true);
										reset(span_2);
										template_effect(($0$1) => set_text(text_2, $0$1), [() => _("Click to edit the condition formula")]);
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
							var fragment_4 = root_7();
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
													template_effect(($0) => set_text(text_3, $0), [() => _("Edit condition formula")]);
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
								var fragment_8 = root_11();
								var node_10 = first_child(fragment_8);
								Icon(node_10, { icon: "ic:outline-error-outline" });
								var text_5 = sibling(node_10);
								template_effect(() => set_text(text_5, ` ${$errors().conditions[$$props.id].editable_formula ?? ""}`));
								append($$anchor$5, fragment_8);
							};
							var alternate_2 = ($$anchor$5) => {
								append($$anchor$5, text("\xA0"));
							};
							if_block(node_9, ($$render) => {
								if ($errors().conditions?.[$$props.id]?.editable_formula) $$render(consequent_2);
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
									get tables() {
										return get($1);
									},
									get code() {
										return $form().conditions[$$props.id].editable_formula;
									},
									set code($$value) {
										store_mutate(form, untrack($form).conditions[$$props.id].editable_formula = $$value, untrack($form));
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
										var fragment_15 = root_19$1();
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
								var div_7 = root_20();
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
									var div_10 = root_25$1();
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
											let $0 = user_derived(() => $tainted()?.conditions?.[$$props.id]?.editable_formula && "btn-highlight");
											let $1 = user_derived(() => !$tainted()?.conditions?.[$$props.id]?.editable_formula);
											Button($$anchor$6, {
												get class() {
													return get($0);
												},
												get disabled() {
													return get($1);
												},
												form: "form",
												name: "update",
												onclick: () => get(editor)?.reformatFormula(),
												type: "submit",
												get value() {
													return $$props.id;
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
var root_5$1 = from_html(`<!> <div class="flex flex-wrap gap-2 max-h-[60vh] overflow-scroll"><!> <!></div>`, 1);
var root_3 = from_html(`<!> <!>`, 1);
var root$3 = from_html(`<div class="flex"><!> <!></div>`);
function Field($$anchor, $$props) {
	push($$props, true);
	const $form = () => store_get(form, "$form", $$stores);
	const [$$stores, $$cleanup] = setup_stores();
	let { form } = $$props.superform;
	let hidden = user_derived(() => $form().conditions[$$props.id].hidden_fields.includes($$props.field.id));
	let field_options = user_derived(() => sort($$props.field.options ?? []).filter((option) => __(option.label, lang.value)));
	let has_hidden_options = user_derived(() => Object.keys($form().conditions[$$props.id].hidden_options[$$props.field.id] ?? {}).length);
	let all_options_hidden = user_derived(() => get(field_options).every((o) => $form().conditions[$$props.id].hidden_options[$$props.field.id]?.includes(o.id)));
	var div = root$3();
	var node = child(div);
	{
		let $0 = user_derived(() => get(hidden) && "hidden-by-condition");
		let $1 = user_derived(() => get(field_options).length && "rounded-r-none");
		let $2 = user_derived(() => _("Toggle field visibility"));
		Button(node, {
			get class() {
				return `field-btn cursor-pointer ${get($0) ?? ""} ${get($1) ?? ""}`;
			},
			onclick: () => {
				store_mutate(form, untrack($form).conditions[$$props.id].hidden_fields = get(hidden) ? $form().conditions[$$props.id].hidden_fields.filter((f) => f !== $$props.field.id) : [...$form().conditions[$$props.id].hidden_fields, $$props.field.id], untrack($form));
			},
			get title() {
				return get($2);
			},
			type: "button",
			variant: "outline",
			children: ($$anchor$1, $$slotProps) => {
				next();
				var text$1 = text();
				template_effect(($0$1) => set_text(text$1, $0$1), [() => $$props.field.name || `(${_("no name")})`]);
				append($$anchor$1, text$1);
			},
			$$slots: { default: true }
		});
	}
	var node_1 = sibling(node, 2);
	var consequent = ($$anchor$1) => {
		var fragment_1 = comment();
		component(first_child(fragment_1), () => Root, ($$anchor$2, Dialog_Root) => {
			Dialog_Root($$anchor$2, {
				children: ($$anchor$3, $$slotProps) => {
					var fragment_2 = root_3();
					var node_3 = first_child(fragment_2);
					{
						let $0 = user_derived(() => buttonVariants({ variant: "outline" }));
						let $1 = user_derived(() => (get(hidden) || get(has_hidden_options)) && "hidden-by-condition");
						component(node_3, () => Trigger, ($$anchor$4, Dialog_Trigger) => {
							Dialog_Trigger($$anchor$4, {
								type: "button",
								"data-testid": "field-options",
								get "data-name"() {
									return $$props.field.name;
								},
								get class() {
									return `field-btn rounded-l-none ${get($0) ?? ""} ${get($1) ?? ""}`;
								},
								children: ($$anchor$5, $$slotProps$1) => {
									Icon($$anchor$5, { icon: "mdi:format-list-bulleted" });
								},
								$$slots: { default: true }
							});
						});
					}
					component(sibling(node_3, 2), () => Dialog_content, ($$anchor$4, Dialog_Content) => {
						Dialog_Content($$anchor$4, {
							class: "sm:max-w-2xl",
							children: ($$anchor$5, $$slotProps$1) => {
								var fragment_4 = root_5$1();
								var node_5 = first_child(fragment_4);
								component(node_5, () => Dialog_header, ($$anchor$6, Dialog_Header) => {
									Dialog_Header($$anchor$6, {
										children: ($$anchor$7, $$slotProps$2) => {
											var fragment_5 = comment();
											component(first_child(fragment_5), () => Dialog_title, ($$anchor$8, Dialog_Title) => {
												Dialog_Title($$anchor$8, {
													children: ($$anchor$9, $$slotProps$3) => {
														next();
														var text_1 = text();
														template_effect(($0) => set_text(text_1, $0), [() => _("Update options visibility")]);
														append($$anchor$9, text_1);
													},
													$$slots: { default: true }
												});
											});
											append($$anchor$7, fragment_5);
										},
										$$slots: { default: true }
									});
								});
								var div_1 = sibling(node_5, 2);
								var node_7 = child(div_1);
								{
									let $0 = user_derived(() => get(all_options_hidden) ? _("Show all") : _("Hide all"));
									Button(node_7, {
										type: "button",
										variant: "outline",
										class: "field-btn cursor-pointer",
										get title() {
											return get($0);
										},
										onclick: () => {
											store_mutate(form, untrack($form).conditions[$$props.id].hidden_options[$$props.field.id] = get(all_options_hidden) ? [] : get(field_options).map((o) => o.id), untrack($form));
										},
										children: ($$anchor$6, $$slotProps$2) => {
											{
												let $0$1 = user_derived(() => get(all_options_hidden) ? "mdi:eye" : "mdi:eye-off");
												Icon($$anchor$6, { get icon() {
													return get($0$1);
												} });
											}
										},
										$$slots: { default: true }
									});
								}
								each(sibling(node_7, 2), 17, () => get(field_options), (option) => option.id, ($$anchor$6, option) => {
									const option_hidden = user_derived(() => $form().conditions[$$props.id].hidden_options[$$props.field.id]?.includes(get(option).id));
									{
										let $0 = user_derived(() => get(option_hidden) && "hidden-by-condition");
										let $1 = user_derived(() => get(option_hidden) ? "true" : "false");
										Button($$anchor$6, {
											type: "button",
											variant: "outline",
											get class() {
												return `field-btn cursor-pointer ${get($0) ?? ""}`;
											},
											get "data-hidden"() {
												return get($1);
											},
											onclick: () => {
												if (!$form().conditions[$$props.id].hidden_options[$$props.field.id]) store_mutate(form, untrack($form).conditions[$$props.id].hidden_options[$$props.field.id] = [], untrack($form));
												store_mutate(form, untrack($form).conditions[$$props.id].hidden_options[$$props.field.id] = get(option_hidden) ? $form().conditions[$$props.id].hidden_options[$$props.field.id].filter((o) => o !== get(option).id) : [...$form().conditions[$$props.id].hidden_options[$$props.field.id], get(option).id], untrack($form));
											},
											children: ($$anchor$7, $$slotProps$2) => {
												next();
												var text_2 = text();
												template_effect(($0$1) => set_text(text_2, $0$1), [() => __(get(option).label, lang.value)]);
												append($$anchor$7, text_2);
											},
											$$slots: { default: true }
										});
									}
								});
								reset(div_1);
								append($$anchor$5, fragment_4);
							},
							$$slots: { default: true }
						});
					});
					append($$anchor$3, fragment_2);
				},
				$$slots: { default: true }
			});
		});
		append($$anchor$1, fragment_1);
	};
	if_block(node_1, ($$render) => {
		if (get(field_options).length) $$render(consequent);
	});
	reset(div);
	append($$anchor, div);
	pop();
	$$cleanup();
}
var root$2 = from_html(`<div class="flex"><!></div>`);
function ProductGroup($$anchor, $$props) {
	push($$props, true);
	const $form = () => store_get(form, "$form", $$stores);
	const [$$stores, $$cleanup] = setup_stores();
	let { form } = $$props.superform;
	let hidden = user_derived(() => $form().conditions[$$props.id].hidden_groups.includes($$props.product_group.id));
	var div = root$2();
	var node = child(div);
	{
		let $0 = user_derived(() => get(hidden) && "hidden-by-condition");
		Button(node, {
			get class() {
				return `field-group-btn cursor-pointer ${get($0) ?? ""}`;
			},
			onclick: () => {
				store_mutate(form, untrack($form).conditions[$$props.id].hidden_groups = get(hidden) ? $form().conditions[$$props.id].hidden_groups.filter((f) => f !== $$props.product_group.id) : [...$form().conditions[$$props.id].hidden_groups, $$props.product_group.id], untrack($form));
			},
			type: "button",
			variant: "outline",
			children: ($$anchor$1, $$slotProps) => {
				next();
				var text$1 = text();
				template_effect(($0$1) => set_text(text$1, $0$1), [() => $$props.groups.find((g) => g.id === $$props.product_group.id_field_group)?.label ?? _("Unknown group")]);
				append($$anchor$1, text$1);
			},
			$$slots: { default: true }
		});
	}
	reset(div);
	append($$anchor, div);
	pop();
	$$cleanup();
}
var root$1 = from_html(`<div class="flex"><!></div>`);
function ProductStep($$anchor, $$props) {
	push($$props, true);
	const $form = () => store_get(form, "$form", $$stores);
	const [$$stores, $$cleanup] = setup_stores();
	let { form } = $$props.superform;
	let hidden = user_derived(() => $form().conditions[$$props.id].hidden_steps.includes($$props.product_step.id));
	var div = root$1();
	var node = child(div);
	{
		let $0 = user_derived(() => get(hidden) && "hidden-by-condition");
		Button(node, {
			get class() {
				return `product-step-btn cursor-pointer ${get($0) ?? ""}`;
			},
			onclick: () => {
				store_mutate(form, untrack($form).conditions[$$props.id].hidden_steps = get(hidden) ? $form().conditions[$$props.id].hidden_steps.filter((f) => f !== $$props.product_step.id) : [...$form().conditions[$$props.id].hidden_steps, $$props.product_step.id], untrack($form));
			},
			type: "button",
			variant: "outline",
			children: ($$anchor$1, $$slotProps) => {
				next();
				var text$1 = text();
				template_effect(($0$1) => set_text(text$1, $0$1), [() => $$props.steps.find((s) => s.id === $$props.product_step.id_step)?.label ?? _("Unknown step")]);
				append($$anchor$1, text$1);
			},
			$$slots: { default: true }
		});
	}
	reset(div);
	append($$anchor, div);
	pop();
	$$cleanup();
}
var ConditionsFilter$1 = class {
	#filter = state("");
	get filter() {
		return get(this.#filter);
	}
	set filter(value) {
		set(this.#filter, value, true);
	}
	#current_filter = state("");
	get current_filter() {
		return get(this.#current_filter);
	}
	set current_filter(value) {
		set(this.#current_filter, value, true);
	}
	timeout = 0;
	min = 5;
	set value(value) {
		this.current_filter = value;
		if (this.timeout) clearTimeout(this.timeout);
		this.timeout = window.setTimeout(() => {
			this.filter = value;
		}, 250);
	}
	get value() {
		return this.current_filter;
	}
	run(conditions, fields) {
		if (!this.filter) return conditions;
		const filters = this.filter.replace(/_/g, "").toLowerCase().split(" ");
		const options_by_field = fields.reduce((acc, field) => {
			if (!acc[field.id]) acc[field.id] = {};
			Object.values(field.options || {}).forEach((option) => {
				acc[field.id][option.id] = Object.values(option.label ?? {}).join(" ").toLowerCase();
			});
			return acc;
		}, {});
		function matchCritera(condition, filter) {
			const field_names = condition.hidden_fields.map((id) => `${fields.find((f) => f.id === id)?.name} ${Object.values(fields.find((f) => f.id === id)?.label ?? {}).join(" ")}`.toLowerCase());
			const option_names = Object.entries(condition.hidden_options).map(([field_id, option_ids]) => option_ids.map((id) => options_by_field[field_id]?.[id] ?? ""));
			console.log(option_names);
			return condition.formula?.toLowerCase().includes(filter) || field_names?.some((name) => name?.includes(filter)) || option_names?.some((names) => names?.some((name) => name?.includes(filter)));
		}
		return conditions.filter((condition) => {
			return filters.map((filter) => matchCritera(condition, filter)).includes(true);
		});
	}
};
const conditions_filter = new ConditionsFilter$1();
var $$_import_conditions_filter = reactive_import(() => conditions_filter);
function ConditionsFilter($$anchor, $$props) {
	push($$props, false);
	init();
	{
		let $0 = derived_safe_equal(() => _("Filter conditions"));
		Input($$anchor, {
			get placeholder() {
				return get($0);
			},
			get value() {
				return $$_import_conditions_filter().value;
			},
			set value($$value) {
				$$_import_conditions_filter($$_import_conditions_filter().value = $$value);
			},
			$$legacy: true
		});
	}
	pop();
}
var root_13 = from_html(`<div class="flex w-full max-w-sm flex-col gap-1.5"><!> <!></div>`);
var root_19 = from_html(`<div class="flex flex-col gap-2"><div class="font-bold"> </div> <div class="flex flex-wrap gap-2"><!> <!></div></div>`);
var root_22 = from_html(`<div class="flex flex-col gap-2"><div class="font-bold"> </div> <div class="flex flex-wrap gap-2"><!> <!></div></div>`);
var root_15 = from_html(`<div class="flex flex-col gap-4"><div class="flex flex-col gap-2"><!> <div class="font-bold"> </div> <div class="flex flex-wrap gap-2"><!> <!></div></div> <!> <!></div>`);
var root_5 = from_html(`<div class="absolute right-2 top-2 flex gap-2 opacity-0 transition-opacity group-hover:opacity-100"><!> <!></div> <div class="flex flex-col gap-6"><div class="flex gap-2"><!> <!></div> <!> <!></div>`, 1);
var root_26 = from_html(`<!> `, 1);
var root_28 = from_html(`<!> `, 1);
var root_25 = from_html(`<!> <!>`, 1);
var root_4 = from_html(`<!> <!>`, 1);
var root_31 = from_html(`<!> <!> <!>`, 1);
var root_35 = from_html(`<!> `, 1);
var root = from_html(`<form id="form" method="POST"><div class="flex flex-col gap-4 p-4"><!> <!></div> <!></form>`);
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
		validators: valibot(ConditionsFormSchema),
		taintedMessage: _("You have unsaved changes. Are you sure you want to leave this page?"),
		resetForm: false,
		invalidateAll: false,
		async onSubmit({ cancel, submitter }) {
			const data = {
				action_name: submitter?.getAttribute("name") || "update",
				action_value: submitter?.getAttribute("value") || $form().action_value,
				conditions: Object.fromEntries(Object.values($form().conditions).filter((c) => Object.keys($tainted()?.conditions ?? {}).includes(c.id.toString())).map((c) => [c.id, c]))
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
				store_mutate(errors, untrack($errors).conditions = { [id]: { editable_formula: [res.message] } }, untrack($errors));
				cancel();
				return;
			}
			for (const id in res.conditions) {
				res.conditions[id].editable_formula = res.conditions[id].formula;
				res.conditions[id].hidden_options = obj(res.conditions[id].hidden_options);
			}
			store_set(form, {
				...$form(),
				action_name: "",
				action_value: data.action_value,
				conditions: obj(res.conditions)
			});
			tainted.set({});
			if ($form().action_value) get(open)[+$form().action_value] = false;
			switch (data.action_name) {
				case "add":
					toast.success(_("Condition added successfully"));
					break;
				case "delete":
					toast.success(_("Condition deleted successfully"));
					break;
				case "update":
					toast.success(_("Condition updated successfully"));
					break;
			}
			cancel();
		}
	});
	const { form, enhance, submitting, tainted, errors } = superform;
	let attributes = user_derived(() => $$props.data.attributes);
	let features = user_derived(() => $$props.data.features);
	let databases = user_derived(() => $$props.data.databases);
	let ps_fields = user_derived(() => $$props.data.ps_fields);
	let open = state(proxy({}));
	let show_name = proxy({});
	let folded = new LocalStore("folded", {});
	let fields = user_derived(() => sort($$props.data.fields));
	let filtered_fields = user_derived(() => fields_filter.run(get(fields)));
	let product_groups = user_derived(() => sort($$props.data.product_groups));
	let product_steps = user_derived(() => sort($$props.data.product_steps));
	async function onEnd(ev) {
		const order = Array.from(ev.target.querySelectorAll(".list-element")).map((el) => +(el.dataset.id ?? 0)).filter((id) => id > 0);
		const res = await form_action({
			route: page.route.id,
			action: "sort",
			data: { order }
		});
		store_mutate(form, untrack($form).conditions = obj(res.conditions), untrack($form));
		tainted.set({});
		if (ev.oldIndex !== ev.newIndex) ev.item.remove();
		toast.success(_("Conditions reordered successfully"));
	}
	let conditions = user_derived(() => sort($form().conditions));
	let filtered_conditions = user_derived(() => conditions_filter.run(get(conditions), get(fields)));
	let ids = user_derived(() => get(conditions).map((c) => c.id).join("-"));
	var form_1 = root();
	var div = child(form_1);
	var node = child(div);
	var consequent = ($$anchor$1) => {
		ConditionsFilter($$anchor$1, {});
	};
	if_block(node, ($$render) => {
		if (get(conditions).length > conditions_filter.min) $$render(consequent);
	});
	key(sibling(node, 2), () => get(ids), ($$anchor$1) => {
		var fragment_1 = comment();
		each(first_child(fragment_1), 17, () => get(filtered_conditions), ({ id }) => id, ($$anchor$2, $$item) => {
			let id = () => get($$item).id;
			var fragment_2 = comment();
			component(first_child(fragment_2), () => Card, ($$anchor$3, Card_Root) => {
				Card_Root($$anchor$3, {
					class: "list-element",
					get "data-id"() {
						return id();
					},
					"data-testid": "condition",
					children: ($$anchor$4, $$slotProps) => {
						var fragment_3 = root_4();
						var node_4 = first_child(fragment_3);
						component(node_4, () => Card_content, ($$anchor$5, Card_Content) => {
							Card_Content($$anchor$5, {
								class: "group relative",
								children: ($$anchor$6, $$slotProps$1) => {
									var fragment_4 = root_5();
									var div_1 = first_child(fragment_4);
									var node_5 = child(div_1);
									{
										let $0 = user_derived(() => cn(buttonVariants({
											variant: "outline",
											size: "sm"
										}), "handle cursor-move"));
										let $1 = user_derived(() => _("Drag to reorder"));
										Label(node_5, {
											get class() {
												return get($0);
											},
											get title() {
												return get($1);
											},
											children: ($$anchor$7, $$slotProps$2) => {
												Icon($$anchor$7, { icon: "mdi:drag" });
											},
											$$slots: { default: true }
										});
									}
									var node_6 = sibling(node_5, 2);
									{
										let $0 = user_derived(() => _("Expand/Fold condition"));
										Form_button(node_6, {
											type: "button",
											variant: "outline",
											onclick: () => folded.value[id()] = !folded.value[id()],
											get title() {
												return get($0);
											},
											size: "sm",
											children: ($$anchor$7, $$slotProps$2) => {
												var fragment_6 = comment();
												var node_7 = first_child(fragment_6);
												var consequent_1 = ($$anchor$8) => {
													Icon($$anchor$8, { icon: "ic:baseline-unfold-more" });
												};
												var alternate = ($$anchor$8) => {
													Icon($$anchor$8, { icon: "ic:baseline-unfold-less" });
												};
												if_block(node_7, ($$render) => {
													if (folded.value[id()]) $$render(consequent_1);
													else $$render(alternate, false);
												});
												append($$anchor$7, fragment_6);
											},
											$$slots: { default: true }
										});
									}
									reset(div_1);
									var div_2 = sibling(div_1, 2);
									var div_3 = child(div_2);
									var node_8 = child(div_3);
									{
										let $0 = user_derived(() => Object.values($$props.data.fields));
										Formula(node_8, {
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
											get id() {
												return id();
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
									var node_9 = sibling(node_8, 2);
									{
										let $0 = user_derived(() => _("Advanced"));
										Form_button(node_9, {
											type: "button",
											variant: "outline",
											onclick: () => show_name[id()] = !show_name[id()],
											get title() {
												return get($0);
											},
											children: ($$anchor$7, $$slotProps$2) => {
												var fragment_9 = comment();
												var node_10 = first_child(fragment_9);
												var consequent_2 = ($$anchor$8) => {
													Icon($$anchor$8, { icon: "ic:round-expand-less" });
												};
												var alternate_1 = ($$anchor$8) => {
													Icon($$anchor$8, { icon: "ic:round-expand-more" });
												};
												if_block(node_10, ($$render) => {
													if (show_name[id()]) $$render(consequent_2);
													else $$render(alternate_1, false);
												});
												append($$anchor$7, fragment_9);
											},
											$$slots: { default: true }
										});
									}
									reset(div_3);
									var node_11 = sibling(div_3, 2);
									var consequent_3 = ($$anchor$7) => {
										var div_4 = root_13();
										var node_12 = child(div_4);
										Label(node_12, {
											get for() {
												return `name-${id() ?? ""}`;
											},
											children: ($$anchor$8, $$slotProps$2) => {
												next();
												var text$1 = text();
												template_effect(($0) => set_text(text$1, $0), [() => _("Name")]);
												append($$anchor$8, text$1);
											},
											$$slots: { default: true }
										});
										var node_13 = sibling(node_12, 2);
										{
											let $0 = user_derived(() => _("Condition name"));
											Input(node_13, {
												type: "text",
												get id() {
													return `name-${id() ?? ""}`;
												},
												get placeholder() {
													return get($0);
												},
												get value() {
													return $form().conditions[id()].name;
												},
												set value($$value) {
													store_mutate(form, untrack($form).conditions[id()].name = $$value, untrack($form));
												}
											});
										}
										reset(div_4);
										transition(1, div_4, () => fade);
										append($$anchor$7, div_4);
									};
									if_block(node_11, ($$render) => {
										if (show_name[id()]) $$render(consequent_3);
									});
									var node_14 = sibling(node_11, 2);
									var consequent_7 = ($$anchor$7) => {
										const all_fields_hidden = user_derived(() => get(fields).every((f) => $form().conditions[id()].hidden_fields.includes(f.id)));
										var div_5 = root_15();
										var div_6 = child(div_5);
										var node_15 = child(div_6);
										var consequent_4 = ($$anchor$8) => {
											FieldsFilter($$anchor$8, {});
										};
										if_block(node_15, ($$render) => {
											if (get(fields).length > fields_filter.min) $$render(consequent_4);
										});
										var div_7 = sibling(node_15, 2);
										var text_1 = child(div_7, true);
										reset(div_7);
										var div_8 = sibling(div_7, 2);
										var node_16 = child(div_8);
										{
											let $0 = user_derived(() => get(all_fields_hidden) ? _("Show all") : _("Hide all"));
											Form_button(node_16, {
												type: "button",
												variant: "outline",
												class: "field-btn cursor-pointer",
												get title() {
													return get($0);
												},
												onclick: () => {
													store_mutate(form, untrack($form).conditions[id()].hidden_fields = get(all_fields_hidden) ? [] : get(fields).map((f) => f.id), untrack($form));
												},
												children: ($$anchor$8, $$slotProps$2) => {
													{
														let $0$1 = user_derived(() => get(all_fields_hidden) ? "mdi:eye" : "mdi:eye-off");
														Icon($$anchor$8, { get icon() {
															return get($0$1);
														} });
													}
												},
												$$slots: { default: true }
											});
										}
										each(sibling(node_16, 2), 17, () => get(filtered_fields), (field) => field.id, ($$anchor$8, field) => {
											Field($$anchor$8, {
												get id() {
													return id();
												},
												get superform() {
													return superform;
												},
												get field() {
													return get(field);
												}
											});
										});
										reset(div_8);
										reset(div_6);
										var node_18 = sibling(div_6, 2);
										var consequent_5 = ($$anchor$8) => {
											const all_groups_hidden = user_derived(() => get(product_groups).every((g) => $form().conditions[id()].hidden_groups.includes(g.id)));
											var div_9 = root_19();
											var div_10 = child(div_9);
											var text_2 = child(div_10, true);
											reset(div_10);
											var div_11 = sibling(div_10, 2);
											var node_19 = child(div_11);
											{
												let $0 = user_derived(() => get(all_groups_hidden) ? _("Show all") : _("Hide all"));
												Form_button(node_19, {
													type: "button",
													variant: "outline",
													class: "field-group-btn cursor-pointer",
													get title() {
														return get($0);
													},
													onclick: () => {
														store_mutate(form, untrack($form).conditions[id()].hidden_groups = get(all_groups_hidden) ? [] : get(product_groups).map((g) => g.id), untrack($form));
													},
													children: ($$anchor$9, $$slotProps$2) => {
														{
															let $0$1 = user_derived(() => get(all_groups_hidden) ? "mdi:eye" : "mdi:eye-off");
															Icon($$anchor$9, { get icon() {
																return get($0$1);
															} });
														}
													},
													$$slots: { default: true }
												});
											}
											each(sibling(node_19, 2), 17, () => get(product_groups), (product_group) => product_group.id, ($$anchor$9, product_group) => {
												ProductGroup($$anchor$9, {
													get id() {
														return id();
													},
													get superform() {
														return superform;
													},
													get groups() {
														return $$props.data.groups;
													},
													get product_group() {
														return get(product_group);
													}
												});
											});
											reset(div_11);
											reset(div_9);
											template_effect(($0) => set_text(text_2, $0), [() => _("Groups")]);
											append($$anchor$8, div_9);
										};
										if_block(node_18, ($$render) => {
											if (get(product_groups).length) $$render(consequent_5);
										});
										var node_21 = sibling(node_18, 2);
										var consequent_6 = ($$anchor$8) => {
											const all_steps_hidden = user_derived(() => get(product_steps).every((s) => $form().conditions[id()].hidden_steps.includes(s.id)));
											var div_12 = root_22();
											var div_13 = child(div_12);
											var text_3 = child(div_13, true);
											reset(div_13);
											var div_14 = sibling(div_13, 2);
											var node_22 = child(div_14);
											{
												let $0 = user_derived(() => get(all_steps_hidden) ? _("Show all") : _("Hide all"));
												Form_button(node_22, {
													type: "button",
													variant: "outline",
													class: "product-step-btn cursor-pointer",
													get title() {
														return get($0);
													},
													onclick: () => {
														store_mutate(form, untrack($form).conditions[id()].hidden_steps = get(all_steps_hidden) ? [] : get(product_steps).map((s) => s.id), untrack($form));
													},
													children: ($$anchor$9, $$slotProps$2) => {
														{
															let $0$1 = user_derived(() => get(all_steps_hidden) ? "mdi:eye" : "mdi:eye-off");
															Icon($$anchor$9, { get icon() {
																return get($0$1);
															} });
														}
													},
													$$slots: { default: true }
												});
											}
											each(sibling(node_22, 2), 17, () => get(product_steps), (product_step) => product_step.id, ($$anchor$9, product_step) => {
												ProductStep($$anchor$9, {
													get id() {
														return id();
													},
													get superform() {
														return superform;
													},
													get steps() {
														return $$props.data.steps;
													},
													get product_step() {
														return get(product_step);
													}
												});
											});
											reset(div_14);
											reset(div_12);
											template_effect(($0) => set_text(text_3, $0), [() => _("Steps")]);
											append($$anchor$8, div_12);
										};
										if_block(node_21, ($$render) => {
											if (get(product_steps).length) $$render(consequent_6);
										});
										reset(div_5);
										template_effect(($0) => set_text(text_1, $0), [() => _("Fields")]);
										transition(1, div_5, () => fade);
										append($$anchor$7, div_5);
									};
									if_block(node_14, ($$render) => {
										if (!folded.value[id()]) $$render(consequent_7);
									});
									reset(div_2);
									append($$anchor$6, fragment_4);
								},
								$$slots: { default: true }
							});
						});
						component(sibling(node_4, 2), () => Card_footer, ($$anchor$5, Card_Footer) => {
							Card_Footer($$anchor$5, {
								class: "gap-2",
								children: ($$anchor$6, $$slotProps$1) => {
									var fragment_20 = root_25();
									var node_25 = first_child(fragment_20);
									{
										let $0 = user_derived(() => $tainted()?.conditions?.[id()] && "btn-highlight");
										let $1 = user_derived(() => !$tainted()?.conditions?.[id()]);
										let $2 = user_derived(() => id().toString());
										Form_button(node_25, {
											get class() {
												return `flex gap-2 ${get($0) ?? ""}`;
											},
											get disabled() {
												return get($1);
											},
											get value() {
												return get($2);
											},
											"data-ctrl-enter": true,
											children: ($$anchor$7, $$slotProps$2) => {
												var fragment_21 = root_26();
												var node_26 = first_child(fragment_21);
												{
													let $0$1 = user_derived(() => $submitting() && $form().action_name === "update" && $form().action_value === id().toString());
													Spinner(node_26, {
														get loading() {
															return get($0$1);
														},
														children: ($$anchor$8, $$slotProps$3) => {
															Icon($$anchor$8, { icon: "mdi:content-save" });
														},
														$$slots: { default: true }
													});
												}
												var text_4 = sibling(node_26);
												template_effect(($0$1) => set_text(text_4, ` ${$0$1 ?? ""}`), [() => _("Save condition")]);
												append($$anchor$7, fragment_21);
											},
											$$slots: { default: true }
										});
									}
									var node_27 = sibling(node_25, 2);
									{
										let $0 = user_derived(() => _("Delete condition"));
										Form_button(node_27, {
											class: "flex gap-2",
											variant: "destructive",
											name: "delete",
											get value() {
												return id();
											},
											get title() {
												return get($0);
											},
											onclick: (e) => {
												if (!confirm(_("Are you sure you want to delete this condition?"))) e.preventDefault();
											},
											children: ($$anchor$7, $$slotProps$2) => {
												var fragment_23 = root_28();
												var node_28 = first_child(fragment_23);
												{
													let $0$1 = user_derived(() => $submitting() && $form().action_name === "delete" && $form().action_value === id().toString());
													Spinner(node_28, {
														get loading() {
															return get($0$1);
														},
														children: ($$anchor$8, $$slotProps$3) => {
															Icon($$anchor$8, { icon: "mdi:trash-can" });
														},
														$$slots: { default: true }
													});
												}
												var text_5 = sibling(node_28);
												template_effect(($0$1) => set_text(text_5, ` ${$0$1 ?? ""}`), [() => _("Delete condition")]);
												append($$anchor$7, fragment_23);
											},
											$$slots: { default: true }
										});
									}
									append($$anchor$6, fragment_20);
								},
								$$slots: { default: true }
							});
						});
						append($$anchor$4, fragment_3);
					},
					$$slots: { default: true }
				});
			});
			append($$anchor$2, fragment_2);
		}, ($$anchor$2) => {
			var fragment_25 = comment();
			component(first_child(fragment_25), () => Alert, ($$anchor$3, Alert_Root) => {
				Alert_Root($$anchor$3, {
					children: ($$anchor$4, $$slotProps) => {
						var fragment_26 = root_31();
						var node_30 = first_child(fragment_26);
						Icon(node_30, { icon: "ic:baseline-info" });
						var node_31 = sibling(node_30, 2);
						component(node_31, () => Alert_title, ($$anchor$5, Alert_Title) => {
							Alert_Title($$anchor$5, {
								children: ($$anchor$6, $$slotProps$1) => {
									next();
									var text_6 = text();
									template_effect(($0) => set_text(text_6, $0), [() => _("No conditions found")]);
									append($$anchor$6, text_6);
								},
								$$slots: { default: true }
							});
						});
						component(sibling(node_31, 2), () => Alert_description, ($$anchor$5, Alert_Description) => {
							Alert_Description($$anchor$5, {
								children: ($$anchor$6, $$slotProps$1) => {
									next();
									var text_7 = text();
									template_effect(($0) => set_text(text_7, $0), [() => _("Click the button below to add a condition")]);
									append($$anchor$6, text_7);
								},
								$$slots: { default: true }
							});
						});
						append($$anchor$4, fragment_26);
					},
					$$slots: { default: true }
				});
			});
			append($$anchor$2, fragment_25);
		});
		append($$anchor$1, fragment_1);
	});
	reset(div);
	action(div, ($$node, $$action_arg) => sortable?.($$node, $$action_arg), () => ({ onEnd }));
	component(sibling(div, 2), () => Card_footer, ($$anchor$1, Card_Footer_1) => {
		Card_Footer_1($$anchor$1, {
			children: ($$anchor$2, $$slotProps) => {
				Form_button($$anchor$2, {
					class: "flex gap-2",
					name: "add",
					variant: "outline",
					children: ($$anchor$3, $$slotProps$1) => {
						var fragment_30 = root_35();
						var node_34 = first_child(fragment_30);
						{
							let $0 = user_derived(() => $submitting() && $form().action_name === "add");
							Spinner(node_34, {
								get loading() {
									return get($0);
								},
								children: ($$anchor$4, $$slotProps$2) => {
									Icon($$anchor$4, { icon: "mdi:plus" });
								},
								$$slots: { default: true }
							});
						}
						var text_8 = sibling(node_34);
						template_effect(($0) => set_text(text_8, ` ${$0 ?? ""}`), [() => _("Add condition")]);
						append($$anchor$3, fragment_30);
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
