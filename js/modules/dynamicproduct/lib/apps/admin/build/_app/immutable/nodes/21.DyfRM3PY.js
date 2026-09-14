import { Ft as push, Ht as next, L as component, N as action, Ot as user_derived, Pt as pop, Ut as reset, V as each, X as comment, Y as append, Z as from_html, Zt as __exportAll, bt as sibling, d as store_mutate, et as text, l as setup_stores, lt as untrack, ot as get, pt as template_effect, q as set_text, u as store_get, vt as child, yt as first_child } from "../chunks/DUscB9kS.js";
import "../chunks/B_W7bg6n.js";
import { o as invalidateAll } from "../chunks/D365qDux.js";
import { i as superForm, n as superValidate, t as valibot } from "../chunks/CPdJ2mnA.js";
import "../chunks/D-Alr120.js";
import "../chunks/CEFrIRjK.js";
import { a as form_action, s as page_load } from "../chunks/BIEFGHhw.js";
import { n as toast } from "../chunks/CQQo25vS.js";
import "../chunks/CJDS8lnd.js";
import "../chunks/DAbnHPcz.js";
import { n as _, t as Icon } from "../chunks/DFl6Gq92.js";
import { n as page } from "../chunks/BRpqcTWk.js";
import "../chunks/_yKPJ4BA.js";
import { a as Select_content, i as Select_trigger, n as Root, o as Select_item, t as Group } from "../chunks/B8kltHsl.js";
import "../chunks/ClKKfzS1.js";
import { a as Card_content, o as Card } from "../chunks/Bpx6gt8W.js";
import "../chunks/CgH3Vt0F.js";
import { g as string, l as number, m as record, u as object } from "../chunks/Da0rmiev.js";
import { t as Spinner } from "../chunks/C9eHbt79.js";
import { n as obj, t as debounce } from "../chunks/C961kT60.js";
import { a as Table_cell, n as Table_header, o as Table_body, r as Table_head, s as Table, t as Table_row } from "../chunks/fQ7Z9iZC.js";
import { t as sort } from "../chunks/Bz4g0JZD.js";
import { n as Form_button } from "../chunks/C9E5Z7Ag.js";
import { t as Input } from "../chunks/D2YUxW8P.js";
import { t as navigate } from "../chunks/CqWKmQZR.js";
const CombinationsFormSchema = object({
	action_name: string(),
	action_value: string(),
	id_field: string(),
	values: record(string(), number())
});
var _page_exports = /* @__PURE__ */ __exportAll({ load: () => load }, 1);
const load = async (event) => {
	const { combinations, combination_fields, values, fields } = await page_load(event);
	return {
		form: await superValidate({ values: obj(values) }, valibot(CombinationsFormSchema)),
		combinations,
		combination_fields,
		fields
	};
};
var root_5 = from_html(`<!> <!> <!>`, 1);
var root_13 = from_html(`<div> </div>`);
var root_15 = from_html(`<!> <!>`, 1);
var root_14 = from_html(`<div class="flex gap-1.5"><!> <!></div>`);
var root_10 = from_html(`<!> <!> <!>`, 1);
var root_4 = from_html(`<!> <!>`, 1);
var root_27 = from_html(`<!> <!>`, 1);
var root_3 = from_html(`<!> <!>`, 1);
var root = from_html(`<form id="form" method="POST"><div class="flex flex-col gap-4 p-4"><!></div></form>`);
function _page($$anchor, $$props) {
	push($$props, true);
	const $form = () => store_get(form, "$form", $$stores);
	const $submitting = () => store_get(submitting, "$submitting", $$stores);
	const [$$stores, $$cleanup] = setup_stores();
	const { form, enhance, submitting, submit, tainted } = superForm($$props.data.form, {
		dataType: "json",
		SPA: true,
		validators: valibot(CombinationsFormSchema),
		taintedMessage: _("You have unsaved changes. Are you sure you want to leave this page?"),
		resetForm: false,
		invalidateAll: false,
		async onSubmit({ cancel, submitter }) {
			const data = {
				...$form(),
				action_name: submitter?.getAttribute("name") || "update",
				action_value: submitter?.getAttribute("value") || $form().action_value
			};
			store_mutate(form, untrack($form).action_name = data.action_name, untrack($form));
			store_mutate(form, untrack($form).action_value = data.action_value, untrack($form));
			if (data.action_name === "update") toast.loading(_("Saving your changes..."));
			const res = await form_action({
				route: page.route.id,
				action: "update",
				data
			});
			if (res.error) {
				toast.error(res.message);
				return cancel();
			}
			if (data.action_name === "add-column") {
				await invalidateAll();
				toast.success(_("Column added successfully"));
			}
			if (data.action_name === "delete-column") {
				await invalidateAll();
				toast.success(_("Column deleted successfully"));
			}
			if (data.action_name === "update") {
				tainted.set({});
				toast.success(_("Data saved successfully"));
			}
			cancel();
		}
	});
	const debouncedSubmit = debounce(submit, 800);
	let fields = user_derived(() => $$props.data.fields);
	var form_1 = root();
	var div = child(form_1);
	component(child(div), () => Card, ($$anchor$1, Card_Root) => {
		Card_Root($$anchor$1, {
			class: "list-element",
			children: ($$anchor$2, $$slotProps) => {
				var fragment = comment();
				component(first_child(fragment), () => Card_content, ($$anchor$3, Card_Content) => {
					Card_Content($$anchor$3, {
						children: ($$anchor$4, $$slotProps$1) => {
							var fragment_1 = comment();
							component(first_child(fragment_1), () => Table, ($$anchor$5, Table_Root) => {
								Table_Root($$anchor$5, {
									children: ($$anchor$6, $$slotProps$2) => {
										var fragment_2 = root_3();
										var node_3 = first_child(fragment_2);
										component(node_3, () => Table_header, ($$anchor$7, Table_Header) => {
											Table_Header($$anchor$7, {
												class: "group",
												children: ($$anchor$8, $$slotProps$3) => {
													var fragment_3 = root_4();
													var node_4 = first_child(fragment_3);
													component(node_4, () => Table_row, ($$anchor$9, Table_Row) => {
														Table_Row($$anchor$9, {
															class: "opacity-0 transition-opacity ease-in-out group-hover:opacity-100",
															children: ($$anchor$10, $$slotProps$4) => {
																var fragment_4 = root_5();
																var node_5 = first_child(fragment_4);
																component(node_5, () => Table_head, ($$anchor$11, Table_Head) => {
																	Table_Head($$anchor$11, {});
																});
																var node_6 = sibling(node_5, 2);
																each(node_6, 17, () => Object.values($$props.data.combination_fields), ({ id_field }) => id_field, ($$anchor$11, $$item) => {
																	let id_field = () => get($$item).id_field;
																	var fragment_5 = comment();
																	component(first_child(fragment_5), () => Table_head, ($$anchor$12, Table_Head_1) => {
																		Table_Head_1($$anchor$12, {
																			children: ($$anchor$13, $$slotProps$5) => {
																				{
																					let $0 = user_derived(() => _("Delete column"));
																					Form_button($$anchor$13, {
																						name: "delete-column",
																						get value() {
																							return id_field();
																						},
																						variant: "destructive",
																						size: "icon",
																						get title() {
																							return get($0);
																						},
																						onclick: (e) => {
																							if (!confirm(_("Are you sure you want to delete this column?"))) e.preventDefault();
																						},
																						children: ($$anchor$14, $$slotProps$6) => {
																							{
																								let $0$1 = user_derived(() => $submitting() && $form().action_name === "delete-column" && $form().action_value === id_field().toString());
																								Spinner($$anchor$14, {
																									get loading() {
																										return get($0$1);
																									},
																									children: ($$anchor$15, $$slotProps$7) => {
																										Icon($$anchor$15, { icon: "mdi:trash" });
																									},
																									$$slots: { default: true }
																								});
																							}
																						},
																						$$slots: { default: true }
																					});
																				}
																			},
																			$$slots: { default: true }
																		});
																	});
																	append($$anchor$11, fragment_5);
																});
																component(sibling(node_6, 2), () => Table_head, ($$anchor$11, Table_Head_2) => {
																	Table_Head_2($$anchor$11, {});
																});
																append($$anchor$10, fragment_4);
															},
															$$slots: { default: true }
														});
													});
													component(sibling(node_4, 2), () => Table_row, ($$anchor$9, Table_Row_1) => {
														Table_Row_1($$anchor$9, {
															children: ($$anchor$10, $$slotProps$4) => {
																var fragment_9 = root_10();
																var node_10 = first_child(fragment_9);
																component(node_10, () => Table_head, ($$anchor$11, Table_Head_3) => {
																	Table_Head_3($$anchor$11, {
																		children: ($$anchor$12, $$slotProps$5) => {
																			next();
																			var text$1 = text();
																			template_effect(($0) => set_text(text$1, $0), [() => _("Combination")]);
																			append($$anchor$12, text$1);
																		},
																		$$slots: { default: true }
																	});
																});
																var node_11 = sibling(node_10, 2);
																each(node_11, 17, () => Object.values($$props.data.combination_fields), ({ id_field }) => id_field, ($$anchor$11, $$item) => {
																	let id_field = () => get($$item).id_field;
																	var fragment_11 = comment();
																	component(first_child(fragment_11), () => Table_head, ($$anchor$12, Table_Head_4) => {
																		Table_Head_4($$anchor$12, {
																			children: ($$anchor$13, $$slotProps$5) => {
																				var div_1 = root_13();
																				var text_1 = child(div_1, true);
																				reset(div_1);
																				template_effect(() => set_text(text_1, get(fields)[id_field()]?.name ?? "--"));
																				append($$anchor$13, div_1);
																			},
																			$$slots: { default: true }
																		});
																	});
																	append($$anchor$11, fragment_11);
																});
																component(sibling(node_11, 2), () => Table_head, ($$anchor$11, Table_Head_5) => {
																	Table_Head_5($$anchor$11, {
																		class: "w-20 p-1 text-center",
																		children: ($$anchor$12, $$slotProps$5) => {
																			var div_2 = root_14();
																			var node_14 = child(div_2);
																			component(node_14, () => Root, ($$anchor$13, Select_Root) => {
																				Select_Root($$anchor$13, {
																					type: "single",
																					get value() {
																						return $form().id_field;
																					},
																					set value($$value) {
																						store_mutate(form, untrack($form).id_field = $$value, untrack($form));
																					},
																					children: ($$anchor$14, $$slotProps$6) => {
																						var fragment_12 = root_15();
																						var node_15 = first_child(fragment_12);
																						component(node_15, () => Select_trigger, ($$anchor$15, Select_Trigger) => {
																							Select_Trigger($$anchor$15, {
																								class: "w-36",
																								children: ($$anchor$16, $$slotProps$7) => {
																									next();
																									var text_2 = text();
																									template_effect(() => set_text(text_2, get(fields)[$form().id_field]?.name ?? "--"));
																									append($$anchor$16, text_2);
																								},
																								$$slots: { default: true }
																							});
																						});
																						component(sibling(node_15, 2), () => Select_content, ($$anchor$15, Select_Content) => {
																							Select_Content($$anchor$15, {
																								children: ($$anchor$16, $$slotProps$7) => {
																									var fragment_14 = comment();
																									component(first_child(fragment_14), () => Group, ($$anchor$17, Select_Group) => {
																										Select_Group($$anchor$17, {
																											children: ($$anchor$18, $$slotProps$8) => {
																												var fragment_15 = comment();
																												each(first_child(fragment_15), 17, () => sort(get(fields)), ({ id, name }) => id, ($$anchor$19, $$item) => {
																													let id = () => get($$item).id;
																													let name = () => get($$item).name;
																													var fragment_16 = comment();
																													var node_19 = first_child(fragment_16);
																													{
																														let $0 = user_derived(() => id().toString());
																														component(node_19, () => Select_item, ($$anchor$20, Select_Item) => {
																															Select_Item($$anchor$20, {
																																class: "cursor-pointer",
																																get value() {
																																	return get($0);
																																},
																																get label() {
																																	return name();
																																},
																																children: ($$anchor$21, $$slotProps$9) => {
																																	next();
																																	var text_3 = text();
																																	template_effect(() => set_text(text_3, name()));
																																	append($$anchor$21, text_3);
																																},
																																$$slots: { default: true }
																															});
																														});
																													}
																													append($$anchor$19, fragment_16);
																												}, ($$anchor$19) => {
																													var fragment_18 = comment();
																													component(first_child(fragment_18), () => Select_item, ($$anchor$20, Select_Item_1) => {
																														Select_Item_1($$anchor$20, {
																															disabled: true,
																															value: "0",
																															children: ($$anchor$21, $$slotProps$9) => {
																																next();
																																var text_4 = text();
																																template_effect(($0) => set_text(text_4, $0), [() => _("No fields available")]);
																																append($$anchor$21, text_4);
																															},
																															$$slots: { default: true }
																														});
																													});
																													append($$anchor$19, fragment_18);
																												});
																												append($$anchor$18, fragment_15);
																											},
																											$$slots: { default: true }
																										});
																									});
																									append($$anchor$16, fragment_14);
																								},
																								$$slots: { default: true }
																							});
																						});
																						append($$anchor$14, fragment_12);
																					},
																					$$slots: { default: true }
																				});
																			});
																			Form_button(sibling(node_14, 2), {
																				name: "add-column",
																				type: "submit",
																				variant: "outline",
																				children: ($$anchor$13, $$slotProps$6) => {
																					{
																						let $0 = user_derived(() => $submitting() && $form().action_name === "add-column");
																						Spinner($$anchor$13, {
																							get loading() {
																								return get($0);
																							},
																							children: ($$anchor$14, $$slotProps$7) => {
																								Icon($$anchor$14, { icon: "mdi:plus" });
																							},
																							$$slots: { default: true }
																						});
																					}
																				},
																				$$slots: { default: true }
																			});
																			reset(div_2);
																			append($$anchor$12, div_2);
																		},
																		$$slots: { default: true }
																	});
																});
																append($$anchor$10, fragment_9);
															},
															$$slots: { default: true }
														});
													});
													append($$anchor$8, fragment_3);
												},
												$$slots: { default: true }
											});
										});
										component(sibling(node_3, 2), () => Table_body, ($$anchor$7, Table_Body) => {
											Table_Body($$anchor$7, {
												children: ($$anchor$8, $$slotProps$3) => {
													var fragment_22 = comment();
													each(first_child(fragment_22), 17, () => Object.values($$props.data.combinations), ({ id_product_attribute, attribute_designation }) => id_product_attribute, ($$anchor$9, $$item) => {
														let id_product_attribute = () => get($$item).id_product_attribute;
														let attribute_designation = () => get($$item).attribute_designation;
														var fragment_23 = comment();
														component(first_child(fragment_23), () => Table_row, ($$anchor$10, Table_Row_2) => {
															Table_Row_2($$anchor$10, {
																children: ($$anchor$11, $$slotProps$4) => {
																	var fragment_24 = root_27();
																	var node_25 = first_child(fragment_24);
																	component(node_25, () => Table_cell, ($$anchor$12, Table_Cell) => {
																		Table_Cell($$anchor$12, {
																			children: ($$anchor$13, $$slotProps$5) => {
																				next();
																				var text_5 = text();
																				template_effect(() => set_text(text_5, attribute_designation()));
																				append($$anchor$13, text_5);
																			},
																			$$slots: { default: true }
																		});
																	});
																	each(sibling(node_25, 2), 17, () => Object.values($$props.data.combination_fields), ({ id_field }) => id_field, ($$anchor$12, $$item$1) => {
																		let id_field = () => get($$item$1).id_field;
																		const id = user_derived(() => `${id_product_attribute()}-${id_field()}`);
																		var fragment_26 = comment();
																		component(first_child(fragment_26), () => Table_cell, ($$anchor$13, Table_Cell_1) => {
																			Table_Cell_1($$anchor$13, {
																				children: ($$anchor$14, $$slotProps$5) => {
																					var bind_get = () => $form().values[get(id)] ?? "";
																					var bind_set = (v) => store_mutate(form, untrack($form).values[get(id)] = v, untrack($form));
																					{
																						let $0 = user_derived(() => ({
																							"w-20 text-center": true,
																							"font-bold text-sky-500": $form().values[get(id)] !== void 0
																						}));
																						Input($$anchor$14, {
																							get class() {
																								return get($0);
																							},
																							get value() {
																								return bind_get();
																							},
																							set value($$value) {
																								bind_set($$value);
																							},
																							placeholder: "0",
																							onblur: () => debouncedSubmit()
																						});
																					}
																				},
																				$$slots: { default: true }
																			});
																		});
																		append($$anchor$12, fragment_26);
																	});
																	append($$anchor$11, fragment_24);
																},
																$$slots: { default: true }
															});
														});
														append($$anchor$9, fragment_23);
													});
													append($$anchor$8, fragment_22);
												},
												$$slots: { default: true }
											});
										});
										append($$anchor$6, fragment_2);
									},
									$$slots: { default: true }
								});
							});
							append($$anchor$4, fragment_1);
						},
						$$slots: { default: true }
					});
				});
				append($$anchor$2, fragment);
			},
			$$slots: { default: true }
		});
	});
	reset(div);
	reset(form_1);
	action(form_1, ($$node) => enhance?.($$node));
	action(form_1, ($$node) => navigate?.($$node));
	append($$anchor, form_1);
	pop();
	$$cleanup();
}
export { _page as component, _page_exports as universal };
