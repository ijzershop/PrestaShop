import { Ft as push, G as if_block, Ht as next, L as component, N as action, Ot as user_derived, Pt as pop, Ut as reset, V as each, X as comment, Y as append, Z as from_html, Zt as __exportAll, bt as sibling, d as store_mutate, et as text, l as setup_stores, lt as untrack, ot as get, pt as template_effect, q as set_text, u as store_get, vt as child, yt as first_child } from "../chunks/DUscB9kS.js";
import "../chunks/B_W7bg6n.js";
import "../chunks/D365qDux.js";
import { i as superForm, n as superValidate, t as valibot } from "../chunks/CPdJ2mnA.js";
import "../chunks/D-Alr120.js";
import "../chunks/CEFrIRjK.js";
import { a as form_action, s as page_load } from "../chunks/BIEFGHhw.js";
import { n as toast } from "../chunks/CQQo25vS.js";
import "../chunks/CJDS8lnd.js";
import "../chunks/DAbnHPcz.js";
import { n as _, t as Icon } from "../chunks/DFl6Gq92.js";
import { n as page } from "../chunks/BRpqcTWk.js";
import "../chunks/ClKKfzS1.js";
import { a as Card_content, o as Card } from "../chunks/Bpx6gt8W.js";
import "../chunks/CgH3Vt0F.js";
import { g as string, l as number, m as record, u as object } from "../chunks/Da0rmiev.js";
import { n as obj, t as debounce } from "../chunks/C961kT60.js";
import { a as Table_cell, n as Table_header, o as Table_body, r as Table_head, s as Table, t as Table_row } from "../chunks/fQ7Z9iZC.js";
import { t as sort } from "../chunks/Bz4g0JZD.js";
import { n as Form_button } from "../chunks/C9E5Z7Ag.js";
const VisibilityFormSchema = object({
	action_value: string(),
	visibility: record(string(), number())
});
var _page_exports = /* @__PURE__ */ __exportAll({ load: () => load }, 1);
const load = async (event) => {
	const { combinations, visibility, fields } = await page_load(event);
	return {
		form: await superValidate({ visibility: obj(visibility) }, valibot(VisibilityFormSchema)),
		combinations,
		fields
	};
};
var root_9 = from_html(`<div> </div>`);
var root_5 = from_html(`<!> <!> <!>`, 1);
var root_12 = from_html(`<!> <!> <!>`, 1);
var root_3 = from_html(`<!> <!>`, 1);
var root = from_html(`<form id="form" method="POST"><div class="flex flex-col gap-4 p-4"><!></div></form>`);
function _page($$anchor, $$props) {
	push($$props, true);
	const $form = () => store_get(form, "$form", $$stores);
	const [$$stores, $$cleanup] = setup_stores();
	const { form, enhance, submit, tainted } = superForm($$props.data.form, {
		dataType: "json",
		SPA: true,
		validators: valibot(VisibilityFormSchema),
		taintedMessage: _("You have unsaved changes. Are you sure you want to leave this page?"),
		resetForm: false,
		invalidateAll: false,
		async onSubmit({ cancel, submitter }) {
			const data = {
				...$form(),
				action_value: submitter?.getAttribute("value") || $form().action_value
			};
			store_mutate(form, untrack($form).action_value = data.action_value, untrack($form));
			const res = await form_action({
				route: page.route.id,
				action: "update",
				data
			});
			form.update((state) => ({
				...state,
				visibility: obj(res.visibility)
			}));
			tainted.set({});
			toast.success(_("Data saved successfully"));
			cancel();
		}
	});
	const debouncedSubmit = debounce(submit, 1e3);
	let fields = user_derived(() => $$props.data.fields);
	let fields_list = user_derived(() => sort(get(fields)));
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
													var fragment_3 = comment();
													component(first_child(fragment_3), () => Table_row, ($$anchor$9, Table_Row) => {
														Table_Row($$anchor$9, {
															children: ($$anchor$10, $$slotProps$4) => {
																var fragment_4 = root_5();
																var node_5 = first_child(fragment_4);
																component(node_5, () => Table_head, ($$anchor$11, Table_Head) => {
																	Table_Head($$anchor$11, {
																		children: ($$anchor$12, $$slotProps$5) => {
																			next();
																			var text$1 = text();
																			template_effect(($0) => set_text(text$1, $0), [() => _("Combination")]);
																			append($$anchor$12, text$1);
																		},
																		$$slots: { default: true }
																	});
																});
																var node_6 = sibling(node_5, 2);
																component(node_6, () => Table_head, ($$anchor$11, Table_Head_1) => {
																	Table_Head_1($$anchor$11, {
																		children: ($$anchor$12, $$slotProps$5) => {
																			next();
																			var text_1 = text();
																			template_effect(($0) => set_text(text_1, $0), [() => _("All")]);
																			append($$anchor$12, text_1);
																		},
																		$$slots: { default: true }
																	});
																});
																each(sibling(node_6, 2), 17, () => get(fields_list), ({ id }) => id, ($$anchor$11, $$item) => {
																	let id = () => get($$item).id;
																	var fragment_7 = comment();
																	component(first_child(fragment_7), () => Table_head, ($$anchor$12, Table_Head_2) => {
																		Table_Head_2($$anchor$12, {
																			children: ($$anchor$13, $$slotProps$5) => {
																				var div_1 = root_9();
																				var text_2 = child(div_1, true);
																				reset(div_1);
																				template_effect(() => set_text(text_2, get(fields)[id()]?.name ?? "--"));
																				append($$anchor$13, div_1);
																			},
																			$$slots: { default: true }
																		});
																	});
																	append($$anchor$11, fragment_7);
																});
																append($$anchor$10, fragment_4);
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
													var fragment_8 = comment();
													each(first_child(fragment_8), 17, () => Object.values($$props.data.combinations), ({ id_product_attribute, attribute_designation }) => id_product_attribute, ($$anchor$9, $$item) => {
														let id_product_attribute = () => get($$item).id_product_attribute;
														let attribute_designation = () => get($$item).attribute_designation;
														const id = user_derived(() => `${id_product_attribute()}-0`);
														const visible = user_derived(() => ($form().visibility[get(id)] ?? 1) === 1);
														var fragment_9 = comment();
														component(first_child(fragment_9), () => Table_row, ($$anchor$10, Table_Row_1) => {
															Table_Row_1($$anchor$10, {
																children: ($$anchor$11, $$slotProps$4) => {
																	var fragment_10 = root_12();
																	var node_12 = first_child(fragment_10);
																	component(node_12, () => Table_cell, ($$anchor$12, Table_Cell) => {
																		Table_Cell($$anchor$12, {
																			children: ($$anchor$13, $$slotProps$5) => {
																				next();
																				var text_3 = text();
																				template_effect(() => set_text(text_3, attribute_designation()));
																				append($$anchor$13, text_3);
																			},
																			$$slots: { default: true }
																		});
																	});
																	var node_13 = sibling(node_12, 2);
																	component(node_13, () => Table_cell, ($$anchor$12, Table_Cell_1) => {
																		Table_Cell_1($$anchor$12, {
																			children: ($$anchor$13, $$slotProps$5) => {
																				Form_button($$anchor$13, {
																					variant: "ghost",
																					type: "button",
																					onclick: () => {
																						store_mutate(form, untrack($form).visibility[get(id)] = get(visible) ? 0 : 1, untrack($form));
																						store_mutate(form, untrack($form).action_value = get(id), untrack($form));
																						toast.loading(_("Saving data..."));
																						debouncedSubmit();
																					},
																					children: ($$anchor$14, $$slotProps$6) => {
																						var fragment_13 = comment();
																						var node_14 = first_child(fragment_13);
																						var consequent = ($$anchor$15) => {
																							Icon($$anchor$15, {
																								icon: "ic:check",
																								class: "text-green-500"
																							});
																						};
																						var alternate = ($$anchor$15) => {
																							Icon($$anchor$15, {
																								icon: "ic:close",
																								class: "text-red-500"
																							});
																						};
																						if_block(node_14, ($$render) => {
																							if (get(visible)) $$render(consequent);
																							else $$render(alternate, false);
																						});
																						append($$anchor$14, fragment_13);
																					},
																					$$slots: { default: true }
																				});
																			},
																			$$slots: { default: true }
																		});
																	});
																	each(sibling(node_13, 2), 17, () => get(fields_list), ({ id: id_field }) => id_field, ($$anchor$12, $$item$1, $$index_1, $$array) => {
																		let id_field = () => get($$item$1).id;
																		const id$1 = user_derived(() => `${id_product_attribute()}-${id_field()}`);
																		const visible$1 = user_derived(() => ($form().visibility[get(id$1)] ?? 1) === 1);
																		var fragment_16 = comment();
																		component(first_child(fragment_16), () => Table_cell, ($$anchor$13, Table_Cell_2) => {
																			Table_Cell_2($$anchor$13, {
																				children: ($$anchor$14, $$slotProps$5) => {
																					Form_button($$anchor$14, {
																						variant: "ghost",
																						type: "button",
																						onclick: () => {
																							store_mutate(form, untrack($form).visibility[get(id$1)] = get(visible$1) ? 0 : 1, untrack($form));
																							store_mutate(form, untrack($form).action_value = get(id$1), untrack($form));
																							toast.loading(_("Saving data..."));
																							debouncedSubmit();
																						},
																						children: ($$anchor$15, $$slotProps$6) => {
																							var fragment_18 = comment();
																							var node_17 = first_child(fragment_18);
																							var consequent_1 = ($$anchor$16) => {
																								Icon($$anchor$16, {
																									icon: "ic:check",
																									class: "text-green-500"
																								});
																							};
																							var alternate_1 = ($$anchor$16) => {
																								Icon($$anchor$16, {
																									icon: "ic:close",
																									class: "text-red-500"
																								});
																							};
																							if_block(node_17, ($$render) => {
																								if (get(visible$1)) $$render(consequent_1);
																								else $$render(alternate_1, false);
																							});
																							append($$anchor$15, fragment_18);
																						},
																						$$slots: { default: true }
																					});
																				},
																				$$slots: { default: true }
																			});
																		});
																		append($$anchor$12, fragment_16);
																	});
																	append($$anchor$11, fragment_10);
																},
																$$slots: { default: true }
															});
														});
														append($$anchor$9, fragment_9);
													});
													append($$anchor$8, fragment_8);
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
	append($$anchor, form_1);
	pop();
	$$cleanup();
}
export { _page as component, _page_exports as universal };
