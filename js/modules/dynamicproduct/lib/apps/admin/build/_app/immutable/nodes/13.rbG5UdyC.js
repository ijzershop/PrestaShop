import { Ct as set, Dt as derived_safe_equal, E as remove_input_defaults, Ft as push, G as if_block, Gt as fallback, Ht as next, L as component, N as action, O as set_value, Ot as user_derived, Pt as pop, Tt as state, Ut as reset, V as each, X as comment, Y as append, Z as from_html, Zt as __exportAll, bt as sibling, et as text, ot as get, pt as template_effect, q as set_text, vt as child, xt as proxy, yt as first_child } from "../chunks/DUscB9kS.js";
import "../chunks/B_W7bg6n.js";
import { o as invalidateAll } from "../chunks/D365qDux.js";
import { n as enhance } from "../chunks/D-Alr120.js";
import "../chunks/CEFrIRjK.js";
import { a as form_action, f as dpa, r as cn, s as page_load, t as Button } from "../chunks/BIEFGHhw.js";
import { n as toast } from "../chunks/CQQo25vS.js";
import "../chunks/CJDS8lnd.js";
import "../chunks/DAbnHPcz.js";
import { n as _, t as Icon } from "../chunks/DFl6Gq92.js";
import { n as page } from "../chunks/BRpqcTWk.js";
import "../chunks/_yKPJ4BA.js";
import { t as Checkbox } from "../chunks/CX3fpb_g.js";
import { t as Label } from "../chunks/ClKKfzS1.js";
import { a as Card_content, n as Card_header, o as Card, r as Card_footer, t as Card_title } from "../chunks/Bpx6gt8W.js";
import "../chunks/C4w9vuey.js";
import "../chunks/cJwMBL5_.js";
import { n as label } from "../chunks/GFXpcJ_Z.js";
import "../chunks/CgH3Vt0F.js";
import { t as Spinner } from "../chunks/C9eHbt79.js";
import { a as Table_cell, n as Table_header, o as Table_body, r as Table_head, s as Table, t as Table_row } from "../chunks/fQ7Z9iZC.js";
import "../chunks/GxWY6lrD.js";
import { t as Input } from "../chunks/D2YUxW8P.js";
import { t as reorder } from "../chunks/CZNTnNKm.js";
var _page_exports = /* @__PURE__ */ __exportAll({ load: () => load }, 1);
const load = async (event) => {
	return await page_load(event);
};
var root_5 = from_html(`<!> <!>`, 1);
var root_3 = from_html(`<input type="hidden" name="id"/> <div class="flex w-full max-w-sm flex-col gap-1.5"><!> <!></div> <div class="flex w-full max-w-sm flex-col gap-1.5"></div> <div class="flex items-center space-x-2"><!> <!></div>`, 1);
var root_9 = from_html(`<!> `, 1);
var root_11 = from_html(`<!> `, 1);
var root_8 = from_html(`<!> <!>`, 1);
var root_2 = from_html(`<form method="post"><!> <!></form>`);
var root_17 = from_html(`<!> <!> <!> <!> <!>`, 1);
var root_27 = from_html(`<span class="font-mono"> </span>`);
var root_32 = from_html(`<!> <!>`, 1);
var root_25 = from_html(`<!> <!> <!> <!> <!>`, 1);
var root_38 = from_html(`<div class="flex justify-center"><!></div>`);
var root_24 = from_html(`<!> <!>`, 1);
var root_15 = from_html(`<!> <!>`, 1);
var root_40 = from_html(`<!> `, 1);
var root_39 = from_html(`<!> <!>`, 1);
var root = from_html(`<!> <!> <!>`, 1);
function _page($$anchor, $$props) {
	push($$props, true);
	const step_form = ($$anchor$1, $$arg0) => {
		let id = derived_safe_equal(() => fallback($$arg0?.(), 0));
		var fragment = comment();
		component(first_child(fragment), () => Card, ($$anchor$2, Card_Root) => {
			Card_Root($$anchor$2, {
				class: "w-sm",
				children: ($$anchor$3, $$slotProps) => {
					var form = root_2();
					var node_1 = child(form);
					component(node_1, () => Card_content, ($$anchor$4, Card_Content) => {
						Card_Content($$anchor$4, {
							class: "flex flex-col gap-4",
							children: ($$anchor$5, $$slotProps$1) => {
								var fragment_1 = root_3();
								var input = first_child(fragment_1);
								remove_input_defaults(input);
								var div = sibling(input, 2);
								var node_2 = child(div);
								Label(node_2, {
									get for() {
										return `name-${get(id) ?? ""}`;
									},
									children: ($$anchor$6, $$slotProps$2) => {
										next();
										var text$1 = text();
										template_effect(($0) => set_text(text$1, $0), [() => _("Name")]);
										append($$anchor$6, text$1);
									},
									$$slots: { default: true }
								});
								var node_3 = sibling(node_2, 2);
								{
									let $0 = user_derived(() => _("Step name"));
									let $1 = user_derived(() => get(id) ? $$props.data.steps[get(id)].name : "");
									Input(node_3, {
										get id() {
											return `name-${get(id) ?? ""}`;
										},
										name: "name",
										type: "text",
										required: true,
										get placeholder() {
											return get($0);
										},
										get value() {
											return get($1);
										},
										class: "font-mono"
									});
								}
								reset(div);
								var div_1 = sibling(div, 2);
								each(div_1, 21, () => $$props.data.languages, ({ id_lang, iso_code }) => id_lang, ($$anchor$6, $$item) => {
									let id_lang = () => get($$item).id_lang;
									let iso_code = () => get($$item).iso_code;
									var fragment_3 = root_5();
									var node_4 = first_child(fragment_3);
									Label(node_4, {
										get for() {
											return `label-${id_lang() ?? ""}`;
										},
										children: ($$anchor$7, $$slotProps$2) => {
											next();
											var text_1 = text();
											template_effect(($0) => set_text(text_1, `${$0 ?? ""} (${iso_code() ?? ""})`), [() => _("Label")]);
											append($$anchor$7, text_1);
										},
										$$slots: { default: true }
									});
									var node_5 = sibling(node_4, 2);
									{
										let $0 = user_derived(() => id_lang() === dpa.id_default_lang ? true : null);
										let $1 = user_derived(() => _("Step label"));
										let $2 = user_derived(() => get(id) ? $$props.data.steps[get(id)].label[id_lang()] : null);
										Input(node_5, {
											get id() {
												return `label-${id_lang() ?? ""}`;
											},
											get name() {
												return `label[${id_lang() ?? ""}]`;
											},
											type: "text",
											get required() {
												return get($0);
											},
											get placeholder() {
												return get($1);
											},
											get value() {
												return get($2);
											},
											get ref() {
												return label_inputs[id_lang()];
											},
											set ref($$value) {
												label_inputs[id_lang()] = $$value;
											}
										});
									}
									append($$anchor$6, fragment_3);
								});
								reset(div_1);
								var div_2 = sibling(div_1, 2);
								var node_6 = child(div_2);
								{
									let $0 = user_derived(() => get(id) ? $$props.data.steps[get(id)].show_label : true);
									Checkbox(node_6, {
										id: "show_label",
										name: "show_label",
										get checked() {
											return get($0);
										}
									});
								}
								Label(sibling(node_6, 2), {
									for: "show_label",
									children: ($$anchor$6, $$slotProps$2) => {
										next();
										var text_2 = text();
										template_effect(($0) => set_text(text_2, $0), [() => _("Show Label")]);
										append($$anchor$6, text_2);
									},
									$$slots: { default: true }
								});
								reset(div_2);
								template_effect(() => set_value(input, get(id)));
								append($$anchor$5, fragment_1);
							},
							$$slots: { default: true }
						});
					});
					component(sibling(node_1, 2), () => Card_footer, ($$anchor$4, Card_Footer) => {
						Card_Footer($$anchor$4, {
							class: "justify-between",
							children: ($$anchor$5, $$slotProps$1) => {
								var fragment_6 = root_8();
								var node_9 = first_child(fragment_6);
								Button(node_9, {
									type: "submit",
									variant: "default",
									children: ($$anchor$6, $$slotProps$2) => {
										var fragment_7 = root_9();
										var node_10 = first_child(fragment_7);
										{
											let $0 = user_derived(() => get(status) === "saving");
											Spinner(node_10, {
												get loading() {
													return get($0);
												},
												children: ($$anchor$7, $$slotProps$3) => {
													Icon($$anchor$7, { icon: "ic:baseline-save" });
												},
												$$slots: { default: true }
											});
										}
										var text_3 = sibling(node_10);
										template_effect(($0) => set_text(text_3, ` ${$0 ?? ""}`), [() => _(get(id) ? "Update" : "Create")]);
										append($$anchor$6, fragment_7);
									},
									$$slots: { default: true }
								});
								Button(sibling(node_9, 2), {
									type: "button",
									variant: "outline",
									onclick: () => set(show_form_id, void 0),
									children: ($$anchor$6, $$slotProps$2) => {
										var fragment_9 = root_11();
										var node_12 = first_child(fragment_9);
										Icon(node_12, { icon: "ic:baseline-cancel" });
										var text_4 = sibling(node_12);
										template_effect(($0) => set_text(text_4, ` ${$0 ?? ""}`), [() => _("Cancel")]);
										append($$anchor$6, fragment_9);
									},
									$$slots: { default: true }
								});
								append($$anchor$5, fragment_6);
							},
							$$slots: { default: true }
						});
					});
					reset(form);
					action(form, ($$node, $$action_arg) => enhance?.($$node, $$action_arg), () => handle_submit);
					append($$anchor$3, form);
				},
				$$slots: { default: true }
			});
		});
		append($$anchor$1, fragment);
	};
	let status = state("idle");
	let show_form_id = state(void 0);
	let label_inputs = proxy(Object.fromEntries($$props.data.languages.map((l) => [l.id_lang, null])));
	async function toggle_step(id) {
		set(status, `toggling-${id}`);
		const response = await form_action({
			route: page.route.id,
			action: "toggle_step",
			data: { id }
		});
		if (response.success) {
			toast.success(response.message);
			await invalidateAll();
		} else toast.error(response.message);
		set(status, "idle");
	}
	async function delete_step(id) {
		if (!confirm(_("Are you sure you want to delete this step?"))) return;
		set(status, `deleting-${id}`);
		const response = await form_action({
			route: page.route.id,
			action: "delete_step",
			data: { id }
		});
		if (response.success) {
			toast.success(response.message);
			await invalidateAll();
		} else toast.error(response.message);
		set(status, "idle");
	}
	const handle_submit = async ({ formData, cancel }) => {
		cancel();
		set(status, "saving");
		const response = await form_action({
			route: page.route.id,
			action: "save_step",
			data: Object.fromEntries(formData)
		});
		if (response.success) {
			toast.success(response.message);
			if (get(show_form_id) !== 0) set(show_form_id, void 0);
			await invalidateAll();
		} else toast.error(response.message);
		set(status, "idle");
	};
	var fragment_10 = root();
	var node_13 = first_child(fragment_10);
	component(node_13, () => Card_header, ($$anchor$1, Card_Header) => {
		Card_Header($$anchor$1, {
			children: ($$anchor$2, $$slotProps) => {
				var fragment_11 = comment();
				component(first_child(fragment_11), () => Card_title, ($$anchor$3, Card_Title) => {
					Card_Title($$anchor$3, {
						children: ($$anchor$4, $$slotProps$1) => {
							next();
							var text_5 = text();
							template_effect(($0) => set_text(text_5, $0), [() => _("Steps Configuration")]);
							append($$anchor$4, text_5);
						},
						$$slots: { default: true }
					});
				});
				append($$anchor$2, fragment_11);
			},
			$$slots: { default: true }
		});
	});
	var node_15 = sibling(node_13, 2);
	component(node_15, () => Card_content, ($$anchor$1, Card_Content_1) => {
		Card_Content_1($$anchor$1, {
			children: ($$anchor$2, $$slotProps) => {
				var fragment_13 = comment();
				component(first_child(fragment_13), () => Table, ($$anchor$3, Table_Root) => {
					Table_Root($$anchor$3, {
						children: ($$anchor$4, $$slotProps$1) => {
							var fragment_14 = root_15();
							var node_17 = first_child(fragment_14);
							component(node_17, () => Table_header, ($$anchor$5, Table_Header) => {
								Table_Header($$anchor$5, {
									children: ($$anchor$6, $$slotProps$2) => {
										var fragment_15 = comment();
										component(first_child(fragment_15), () => Table_row, ($$anchor$7, Table_Row) => {
											Table_Row($$anchor$7, {
												children: ($$anchor$8, $$slotProps$3) => {
													var fragment_16 = root_17();
													var node_19 = first_child(fragment_16);
													component(node_19, () => Table_head, ($$anchor$9, Table_Head) => {
														Table_Head($$anchor$9, {
															children: ($$anchor$10, $$slotProps$4) => {
																next();
																var text_6 = text();
																template_effect(($0) => set_text(text_6, $0), [() => _("ID")]);
																append($$anchor$10, text_6);
															},
															$$slots: { default: true }
														});
													});
													var node_20 = sibling(node_19, 2);
													component(node_20, () => Table_head, ($$anchor$9, Table_Head_1) => {
														Table_Head_1($$anchor$9, {
															children: ($$anchor$10, $$slotProps$4) => {
																next();
																var text_7 = text();
																template_effect(($0) => set_text(text_7, $0), [() => _("Name")]);
																append($$anchor$10, text_7);
															},
															$$slots: { default: true }
														});
													});
													var node_21 = sibling(node_20, 2);
													component(node_21, () => Table_head, ($$anchor$9, Table_Head_2) => {
														Table_Head_2($$anchor$9, {
															children: ($$anchor$10, $$slotProps$4) => {
																next();
																var text_8 = text();
																template_effect(($0) => set_text(text_8, $0), [() => _("Label")]);
																append($$anchor$10, text_8);
															},
															$$slots: { default: true }
														});
													});
													var node_22 = sibling(node_21, 2);
													component(node_22, () => Table_head, ($$anchor$9, Table_Head_3) => {
														Table_Head_3($$anchor$9, {
															children: ($$anchor$10, $$slotProps$4) => {
																next();
																var text_9 = text();
																template_effect(($0) => set_text(text_9, $0), [() => _("Show Label")]);
																append($$anchor$10, text_9);
															},
															$$slots: { default: true }
														});
													});
													component(sibling(node_22, 2), () => Table_head, ($$anchor$9, Table_Head_4) => {
														Table_Head_4($$anchor$9, {
															children: ($$anchor$10, $$slotProps$4) => {
																next();
																var text_10 = text();
																template_effect(($0) => set_text(text_10, $0), [() => _("Actions")]);
																append($$anchor$10, text_10);
															},
															$$slots: { default: true }
														});
													});
													append($$anchor$8, fragment_16);
												},
												$$slots: { default: true }
											});
										});
										append($$anchor$6, fragment_15);
									},
									$$slots: { default: true }
								});
							});
							component(sibling(node_17, 2), () => Table_body, ($$anchor$5, Table_Body) => {
								Table_Body($$anchor$5, {
									children: ($$anchor$6, $$slotProps$2) => {
										var fragment_22 = comment();
										each(first_child(fragment_22), 17, () => reorder($$props.data.steps), ({ id, name, label: step_label, show_label }) => id, ($$anchor$7, $$item) => {
											let id = () => get($$item).id;
											let name = () => get($$item).name;
											let step_label = () => get($$item).label;
											let show_label = () => get($$item).show_label;
											var fragment_23 = root_24();
											var node_26 = first_child(fragment_23);
											{
												let $0 = user_derived(() => cn(get(show_form_id) === id() ? "bg-green-200" : ""));
												component(node_26, () => Table_row, ($$anchor$8, Table_Row_1) => {
													Table_Row_1($$anchor$8, {
														get class() {
															return get($0);
														},
														get "data-id"() {
															return id();
														},
														children: ($$anchor$9, $$slotProps$3) => {
															var fragment_24 = root_25();
															var node_27 = first_child(fragment_24);
															component(node_27, () => Table_cell, ($$anchor$10, Table_Cell) => {
																Table_Cell($$anchor$10, {
																	children: ($$anchor$11, $$slotProps$4) => {
																		next();
																		var text_11 = text();
																		template_effect(() => set_text(text_11, id()));
																		append($$anchor$11, text_11);
																	},
																	$$slots: { default: true }
																});
															});
															var node_28 = sibling(node_27, 2);
															component(node_28, () => Table_cell, ($$anchor$10, Table_Cell_1) => {
																Table_Cell_1($$anchor$10, {
																	children: ($$anchor$11, $$slotProps$4) => {
																		var span = root_27();
																		var text_12 = child(span, true);
																		reset(span);
																		template_effect(() => set_text(text_12, name()));
																		append($$anchor$11, span);
																	},
																	$$slots: { default: true }
																});
															});
															var node_29 = sibling(node_28, 2);
															component(node_29, () => Table_cell, ($$anchor$10, Table_Cell_2) => {
																Table_Cell_2($$anchor$10, {
																	children: ($$anchor$11, $$slotProps$4) => {
																		next();
																		var text_13 = text();
																		template_effect(($0$1) => set_text(text_13, $0$1), [() => label(step_label())]);
																		append($$anchor$11, text_13);
																	},
																	$$slots: { default: true }
																});
															});
															var node_30 = sibling(node_29, 2);
															component(node_30, () => Table_cell, ($$anchor$10, Table_Cell_3) => {
																Table_Cell_3($$anchor$10, {
																	children: ($$anchor$11, $$slotProps$4) => {
																		{
																			let $0$1 = user_derived(() => cn(show_label() ? "text-green-500" : "text-gray-500"));
																			Button($$anchor$11, {
																				onclick: () => toggle_step(id()),
																				variant: "ghost",
																				size: "sm",
																				get class() {
																					return get($0$1);
																				},
																				children: ($$anchor$12, $$slotProps$5) => {
																					{
																						let $0$2 = user_derived(() => get(status) === `toggling-${id()}`);
																						Spinner($$anchor$12, {
																							get loading() {
																								return get($0$2);
																							},
																							children: ($$anchor$13, $$slotProps$6) => {
																								Icon($$anchor$13, { icon: "ic:baseline-check-circle" });
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
															component(sibling(node_30, 2), () => Table_cell, ($$anchor$10, Table_Cell_4) => {
																Table_Cell_4($$anchor$10, {
																	children: ($$anchor$11, $$slotProps$4) => {
																		var fragment_30 = root_32();
																		var node_32 = first_child(fragment_30);
																		Button(node_32, {
																			variant: "outline",
																			size: "sm",
																			onclick: () => set(show_form_id, get(show_form_id) === id() ? void 0 : id(), true),
																			children: ($$anchor$12, $$slotProps$5) => {
																				Icon($$anchor$12, { icon: "ic:baseline-edit" });
																			},
																			$$slots: { default: true }
																		});
																		Button(sibling(node_32, 2), {
																			onclick: () => delete_step(id()),
																			variant: "destructive",
																			size: "sm",
																			children: ($$anchor$12, $$slotProps$5) => {
																				{
																					let $0$1 = user_derived(() => get(status) === `deleting-${id()}`);
																					Spinner($$anchor$12, {
																						get loading() {
																							return get($0$1);
																						},
																						children: ($$anchor$13, $$slotProps$6) => {
																							Icon($$anchor$13, { icon: "ic:delete" });
																						},
																						$$slots: { default: true }
																					});
																				}
																			},
																			$$slots: { default: true }
																		});
																		append($$anchor$11, fragment_30);
																	},
																	$$slots: { default: true }
																});
															});
															append($$anchor$9, fragment_24);
														},
														$$slots: { default: true }
													});
												});
											}
											var node_34 = sibling(node_26, 2);
											var consequent = ($$anchor$8) => {
												var fragment_34 = comment();
												component(first_child(fragment_34), () => Table_row, ($$anchor$9, Table_Row_2) => {
													Table_Row_2($$anchor$9, {
														children: ($$anchor$10, $$slotProps$3) => {
															var fragment_35 = comment();
															component(first_child(fragment_35), () => Table_cell, ($$anchor$11, Table_Cell_5) => {
																Table_Cell_5($$anchor$11, {
																	class: "pb-4",
																	colspan: 5,
																	children: ($$anchor$12, $$slotProps$4) => {
																		var div_3 = root_38();
																		step_form(child(div_3), id);
																		reset(div_3);
																		append($$anchor$12, div_3);
																	},
																	$$slots: { default: true }
																});
															});
															append($$anchor$10, fragment_35);
														},
														$$slots: { default: true }
													});
												});
												append($$anchor$8, fragment_34);
											};
											if_block(node_34, ($$render) => {
												if (get(show_form_id) === id()) $$render(consequent);
											});
											append($$anchor$7, fragment_23);
										});
										append($$anchor$6, fragment_22);
									},
									$$slots: { default: true }
								});
							});
							append($$anchor$4, fragment_14);
						},
						$$slots: { default: true }
					});
				});
				append($$anchor$2, fragment_13);
			},
			$$slots: { default: true }
		});
	});
	component(sibling(node_15, 2), () => Card_footer, ($$anchor$1, Card_Footer_1) => {
		Card_Footer_1($$anchor$1, {
			class: "flex flex-col gap-4 items-start",
			children: ($$anchor$2, $$slotProps) => {
				var fragment_36 = root_39();
				var node_39 = first_child(fragment_36);
				Button(node_39, {
					onclick: () => set(show_form_id, get(show_form_id) === 0 ? void 0 : 0, true),
					children: ($$anchor$3, $$slotProps$1) => {
						var fragment_37 = root_40();
						var node_40 = first_child(fragment_37);
						Icon(node_40, { icon: "ic:baseline-add" });
						var text_14 = sibling(node_40);
						template_effect(($0) => set_text(text_14, ` ${$0 ?? ""}`), [() => _("Add a new step")]);
						append($$anchor$3, fragment_37);
					},
					$$slots: { default: true }
				});
				var node_41 = sibling(node_39, 2);
				var consequent_1 = ($$anchor$3) => {
					step_form($$anchor$3);
				};
				if_block(node_41, ($$render) => {
					if (get(show_form_id) === 0) $$render(consequent_1);
				});
				append($$anchor$2, fragment_36);
			},
			$$slots: { default: true }
		});
	});
	append($$anchor, fragment_10);
	pop();
}
export { _page as component, _page_exports as universal };
