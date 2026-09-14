import { A as set_class, Ct as set, D as set_attribute, Ft as push, G as if_block, Ht as next, I as transition, L as component, N as action, Ot as user_derived, Pt as pop, Tt as state, Ut as reset, V as each, W as key, X as comment, Y as append, Z as from_html, Zt as __exportAll, bt as sibling, d as store_mutate, et as text, l as setup_stores, lt as untrack, ot as get, pt as template_effect, q as set_text, u as store_get, vt as child, xt as proxy, yt as first_child } from "../chunks/DUscB9kS.js";
import "../chunks/B_W7bg6n.js";
import { o as invalidateAll } from "../chunks/D365qDux.js";
import { i as superForm, n as superValidate, t as valibot } from "../chunks/CPdJ2mnA.js";
import "../chunks/D-Alr120.js";
import "../chunks/CEFrIRjK.js";
import { a as form_action, n as buttonVariants, r as cn, s as page_load } from "../chunks/BIEFGHhw.js";
import { n as toast } from "../chunks/CQQo25vS.js";
import "../chunks/CJDS8lnd.js";
import "../chunks/DAbnHPcz.js";
import { n as _, t as Icon } from "../chunks/DFl6Gq92.js";
import { n as page } from "../chunks/BRpqcTWk.js";
import "../chunks/_yKPJ4BA.js";
import { a as Select_content, i as Select_trigger, n as Root, o as Select_item, t as Group } from "../chunks/B8kltHsl.js";
import { t as Label } from "../chunks/ClKKfzS1.js";
import { t as Switch } from "../chunks/CyNLp6ti.js";
import { a as Card_content, i as Card_description, n as Card_header, o as Card, t as Card_title } from "../chunks/Bpx6gt8W.js";
import "../chunks/CgH3Vt0F.js";
import { n as Alert_description, r as Alert, t as Alert_title } from "../chunks/OMr53o_L.js";
import { _ as transform, f as picklist, g as string, l as number, m as record, p as pipe, r as boolean, t as any, u as object } from "../chunks/Da0rmiev.js";
import { t as Spinner } from "../chunks/C9eHbt79.js";
import { n as obj } from "../chunks/C961kT60.js";
import { t as sort } from "../chunks/Bz4g0JZD.js";
import { n as Form_button } from "../chunks/C9E5Z7Ag.js";
import { t as sortable_esm_default } from "../chunks/GxWY6lrD.js";
import { t as sortable } from "../chunks/cJTe3rpq.js";
import { n as slide } from "../chunks/XggUl40U.js";
const GroupsFormSchema = object({
	action_name: string(),
	action_value: string(),
	id_group: string(),
	groups: record(string(), object({
		id: number(),
		label: string(),
		name: string(),
		show_label: boolean()
	}))
});
const ProductGroupsFormSchema = object({
	action_name: picklist([
		"",
		"update",
		"add",
		"delete"
	]),
	action_value: string(),
	product_groups: record(string(), object({
		id: number(),
		id_product: number(),
		id_step: number(),
		id_field_group: number(),
		collapsible: pipe(any(), transform((val) => Boolean(val)), boolean()),
		start_collapsed: pipe(any(), transform((val) => Boolean(val)), boolean()),
		id_control_field: number(),
		position: number()
	}))
});
var _page_exports = /* @__PURE__ */ __exportAll({ load: () => load }, 1);
const load = async (event) => {
	const { config_page_url, groups, product_groups, fields, ungrouped_fields_on_top } = await page_load(event);
	return {
		config_page_url,
		list_form: await superValidate({ groups: obj(groups) }, valibot(GroupsFormSchema)),
		form: await superValidate({ product_groups: obj(product_groups) }, valibot(ProductGroupsFormSchema, { typeMode: "output" })),
		groups,
		fields,
		ungrouped_fields_on_top
	};
};
var root_12$1 = from_html(`<div class="mt-2 flex items-center space-x-2"><!> <!></div>`);
var root_18 = from_html(`<!> <!>`, 1);
var root_15$1 = from_html(`<!> <!>`, 1);
var root_10 = from_html(`<div class="flex flex-col gap-2"><div><div class="flex items-center space-x-2"><!> <!></div> <!></div> <hr/> <div class="flex max-w-sm flex-col gap-1.5"><!> <!></div></div>`);
var root_5$1 = from_html(`<div class="absolute right-2 top-2 flex gap-2 opacity-0 transition-opacity group-hover:opacity-100"><!> <!></div> <div> <!></div> <!>`, 1);
var root_25 = from_html(`<div> </div>`);
var root_24 = from_html(`<div class="flex flex-col gap-6"><div class="border-field-500 flex h-14 items-center gap-2 rounded-md border p-2"></div></div>`);
var root_3 = from_html(`<!> <!>`, 1);
var root_27 = from_html(`<!> <!> <!>`, 1);
var root$3 = from_html(`<form id="form" method="POST"><div class="flex flex-col gap-4 p-4"><!></div></form>`);
function ProductGroups($$anchor, $$props) {
	push($$props, true);
	const $form = () => store_get(form, "$form", $$stores);
	const $tainted = () => store_get(tainted, "$tainted", $$stores);
	const $submitting = () => store_get(submitting, "$submitting", $$stores);
	const [$$stores, $$cleanup] = setup_stores();
	const { form, enhance, submit, submitting, tainted } = superForm($$props.form, {
		dataType: "json",
		SPA: true,
		validators: valibot(ProductGroupsFormSchema, { typeMode: "output" }),
		resetForm: false,
		invalidateAll: false,
		async onSubmit({ cancel, submitter }) {
			const data = {
				action_name: submitter?.getAttribute("name") || "update",
				action_value: submitter?.getAttribute("value") || $form().action_value,
				product_groups: Object.fromEntries(Object.values($form().product_groups).filter((c) => Object.keys($tainted()?.product_groups ?? {}).includes(c.id.toString())).map((c) => [c.id, c]))
			};
			store_mutate(form, untrack($form).action_name = data.action_name, untrack($form));
			store_mutate(form, untrack($form).action_value = data.action_value, untrack($form));
			const res = await form_action({
				route: page.route.id,
				action: "update",
				data
			});
			form.update((state$1) => ({
				...state$1,
				action_name: "",
				action_value: data.action_value,
				product_groups: obj(res.product_groups)
			}), { taint: false });
			if ($form().action_value) open[+$form().action_value] = false;
			switch (data.action_name) {
				case "add":
					toast.success(_("Field group added successfully"));
					break;
				case "delete":
					await invalidateAll();
					toast.success(_("Field group deleted successfully"));
					break;
				case "update":
					toast.success(_("Field group updated successfully"));
					break;
			}
			cancel();
		}
	});
	async function onEnd(ev) {
		const order = Array.from(ev.target.querySelectorAll(".list-element")).map((el) => +(el.dataset.id ?? 0)).filter((id) => id > 0);
		const res = await form_action({
			route: page.route.id,
			action: "sort",
			data: { order }
		});
		form.update((state$1) => ({
			...state$1,
			action_name: "",
			action_value: "",
			product_groups: obj(res.product_groups)
		}));
		tainted.set({});
		if (ev.oldIndex !== ev.newIndex) ev.item.remove();
		toast.success(_("Field groups reordered successfully"));
	}
	let product_groups = user_derived(() => sort($form().product_groups));
	let ids = user_derived(() => get(product_groups).map(({ id }) => id).join("-"));
	let show_settings = proxy({});
	function getFields(id) {
		return Object.values($$props.fields).filter((f) => f.id_group === id);
	}
	function sortableFields(node, { id }) {
		const sortable$1 = new sortable_esm_default(node, {
			group: "available_fields",
			animation: 150,
			onSort: async (ev) => {
				const order = Array.from(ev.target.childNodes).filter((el) => el instanceof HTMLDivElement).map((el) => +(el.dataset.id ?? 0)).filter((id$1) => id$1 > 0);
				await form_action({
					route: page.route.id,
					action: "sort_fields",
					data: {
						order,
						id_group: id
					}
				});
				toast.success(_("The fields were reordered successfully"));
			}
		});
		return { destroy() {
			sortable$1.destroy();
		} };
	}
	var form_1 = root$3();
	var div = child(form_1);
	key(child(div), () => get(ids), ($$anchor$1) => {
		var fragment = comment();
		each(first_child(fragment), 17, () => get(product_groups), ({ id, id_field_group, id_control_field }) => id, ($$anchor$2, $$item) => {
			let id = () => get($$item).id;
			let id_field_group = () => get($$item).id_field_group;
			let id_control_field = () => get($$item).id_control_field;
			const group_fields = user_derived(() => getFields(id()));
			var fragment_1 = comment();
			component(first_child(fragment_1), () => Card, ($$anchor$3, Card_Root) => {
				Card_Root($$anchor$3, {
					class: "list-element group relative",
					get "data-id"() {
						return id();
					},
					children: ($$anchor$4, $$slotProps) => {
						var fragment_2 = root_3();
						var node_4 = first_child(fragment_2);
						component(node_4, () => Card_header, ($$anchor$5, Card_Header) => {
							Card_Header($$anchor$5, {
								children: ($$anchor$6, $$slotProps$1) => {
									var fragment_3 = comment();
									component(first_child(fragment_3), () => Card_title, ($$anchor$7, Card_Title) => {
										Card_Title($$anchor$7, {
											children: ($$anchor$8, $$slotProps$2) => {
												var fragment_4 = root_5$1();
												var div_1 = first_child(fragment_4);
												var node_6 = child(div_1);
												{
													let $0 = user_derived(() => cn(buttonVariants({
														variant: "outline",
														size: "sm"
													}), "handle cursor-move"));
													let $1 = user_derived(() => _("Drag to reorder"));
													Label(node_6, {
														get class() {
															return get($0);
														},
														get title() {
															return get($1);
														},
														children: ($$anchor$9, $$slotProps$3) => {
															Icon($$anchor$9, { icon: "mdi:drag" });
														},
														$$slots: { default: true }
													});
												}
												var node_7 = sibling(node_6, 2);
												{
													let $0 = user_derived(() => _("Delete field group"));
													Form_button(node_7, {
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
															if (!confirm(_("Are you sure you want to delete this field group?"))) e.preventDefault();
														},
														children: ($$anchor$9, $$slotProps$3) => {
															{
																let $0$1 = user_derived(() => $submitting() && $form().action_name === "delete" && $form().action_value === id().toString());
																Spinner($$anchor$9, {
																	get loading() {
																		return get($0$1);
																	},
																	children: ($$anchor$10, $$slotProps$4) => {
																		Icon($$anchor$10, { icon: "mdi:trash-can" });
																	},
																	$$slots: { default: true }
																});
															}
														},
														$$slots: { default: true }
													});
												}
												reset(div_1);
												var div_2 = sibling(div_1, 2);
												var text$1 = child(div_2);
												Form_button(sibling(text$1), {
													variant: "ghost",
													size: "icon",
													type: "button",
													onclick: () => show_settings[id()] = !show_settings[id()],
													children: ($$anchor$9, $$slotProps$3) => {
														Icon($$anchor$9, { icon: "ic:baseline-settings" });
													},
													$$slots: { default: true }
												});
												reset(div_2);
												var node_9 = sibling(div_2, 2);
												var consequent_1 = ($$anchor$9) => {
													var div_3 = root_10();
													var div_4 = child(div_3);
													var div_5 = child(div_4);
													var node_10 = child(div_5);
													{
														let $0 = user_derived(() => _("Allows the customer to expand/collapse the group by clicking on the group label"));
														Switch(node_10, {
															get title() {
																return get($0);
															},
															id: "collapsible",
															onCheckedChange: () => submit(),
															get checked() {
																return $form().product_groups[id()].collapsible;
															},
															set checked($$value) {
																store_mutate(form, untrack($form).product_groups[id()].collapsible = $$value, untrack($form));
															}
														});
													}
													Label(sibling(node_10, 2), {
														for: "collapsible",
														children: ($$anchor$10, $$slotProps$3) => {
															next();
															var text_1 = text();
															template_effect(($0) => set_text(text_1, $0), [() => _("Collapsible")]);
															append($$anchor$10, text_1);
														},
														$$slots: { default: true }
													});
													reset(div_5);
													var node_12 = sibling(div_5, 2);
													var consequent = ($$anchor$10) => {
														var div_6 = root_12$1();
														var node_13 = child(div_6);
														Switch(node_13, {
															id: "collapsible",
															onCheckedChange: () => submit(),
															get checked() {
																return $form().product_groups[id()].start_collapsed;
															},
															set checked($$value) {
																store_mutate(form, untrack($form).product_groups[id()].start_collapsed = $$value, untrack($form));
															}
														});
														Label(sibling(node_13, 2), {
															for: "collapsible",
															children: ($$anchor$11, $$slotProps$3) => {
																next();
																var text_2 = text();
																template_effect(($0) => set_text(text_2, $0), [() => _("Initially collapsed")]);
																append($$anchor$11, text_2);
															},
															$$slots: { default: true }
														});
														reset(div_6);
														transition(3, div_6, () => slide);
														append($$anchor$10, div_6);
													};
													if_block(node_12, ($$render) => {
														if ($form().product_groups[id()].collapsible) $$render(consequent);
													});
													reset(div_4);
													var div_7 = sibling(div_4, 4);
													var node_15 = child(div_7);
													Label(node_15, {
														children: ($$anchor$10, $$slotProps$3) => {
															next();
															var text_3 = text();
															template_effect(($0) => set_text(text_3, `${$0 ?? ""}:`), [() => _("Control field")]);
															append($$anchor$10, text_3);
														},
														$$slots: { default: true }
													});
													var node_16 = sibling(node_15, 2);
													var bind_get = () => $form().product_groups[id()].id_control_field.toString();
													var bind_set = (v) => store_mutate(form, untrack($form).product_groups[id()].id_control_field = +v, untrack($form));
													component(node_16, () => Root, ($$anchor$10, Select_Root) => {
														Select_Root($$anchor$10, {
															type: "single",
															get value() {
																return bind_get();
															},
															set value($$value) {
																bind_set($$value);
															},
															onValueChange: () => submit(),
															children: ($$anchor$11, $$slotProps$3) => {
																var fragment_12 = root_15$1();
																var node_17 = first_child(fragment_12);
																component(node_17, () => Select_trigger, ($$anchor$12, Select_Trigger) => {
																	Select_Trigger($$anchor$12, {
																		class: "w-48",
																		children: ($$anchor$13, $$slotProps$4) => {
																			next();
																			var text_4 = text();
																			template_effect(() => set_text(text_4, $$props.fields[id_control_field()]?.name ?? "--"));
																			append($$anchor$13, text_4);
																		},
																		$$slots: { default: true }
																	});
																});
																component(sibling(node_17, 2), () => Select_content, ($$anchor$12, Select_Content) => {
																	Select_Content($$anchor$12, {
																		children: ($$anchor$13, $$slotProps$4) => {
																			var fragment_14 = comment();
																			component(first_child(fragment_14), () => Group, ($$anchor$14, Select_Group) => {
																				Select_Group($$anchor$14, {
																					children: ($$anchor$15, $$slotProps$5) => {
																						var fragment_15 = root_18();
																						var node_20 = first_child(fragment_15);
																						component(node_20, () => Select_item, ($$anchor$16, Select_Item) => {
																							Select_Item($$anchor$16, {
																								class: "cursor-pointer",
																								value: "0",
																								label: "--",
																								children: ($$anchor$17, $$slotProps$6) => {
																									next();
																									append($$anchor$17, text("--"));
																								},
																								$$slots: { default: true }
																							});
																						});
																						each(sibling(node_20, 2), 17, () => sort($$props.fields), ({ id: id$1, name }) => id$1, ($$anchor$16, $$item$1, $$index, $$array) => {
																							let id$1 = () => get($$item$1).id;
																							let name = () => get($$item$1).name;
																							var fragment_16 = comment();
																							var node_22 = first_child(fragment_16);
																							{
																								let $0 = user_derived(() => id$1().toString());
																								component(node_22, () => Select_item, ($$anchor$17, Select_Item_1) => {
																									Select_Item_1($$anchor$17, {
																										class: "cursor-pointer",
																										get value() {
																											return get($0);
																										},
																										get label() {
																											return name();
																										},
																										children: ($$anchor$18, $$slotProps$6) => {
																											next();
																											var text_6 = text();
																											template_effect(() => set_text(text_6, name()));
																											append($$anchor$18, text_6);
																										},
																										$$slots: { default: true }
																									});
																								});
																							}
																							append($$anchor$16, fragment_16);
																						}, ($$anchor$16) => {
																							var fragment_18 = comment();
																							component(first_child(fragment_18), () => Select_item, ($$anchor$17, Select_Item_2) => {
																								Select_Item_2($$anchor$17, {
																									disabled: true,
																									value: "0",
																									children: ($$anchor$18, $$slotProps$6) => {
																										next();
																										var text_7 = text();
																										template_effect(($0) => set_text(text_7, $0), [() => _("No fields available")]);
																										append($$anchor$18, text_7);
																									},
																									$$slots: { default: true }
																								});
																							});
																							append($$anchor$16, fragment_18);
																						});
																						append($$anchor$15, fragment_15);
																					},
																					$$slots: { default: true }
																				});
																			});
																			append($$anchor$13, fragment_14);
																		},
																		$$slots: { default: true }
																	});
																});
																append($$anchor$11, fragment_12);
															},
															$$slots: { default: true }
														});
													});
													reset(div_7);
													reset(div_3);
													template_effect(($0) => set_attribute(div_7, "title", $0), [() => _("This feature will duplicate the group based on the value of the selected field")]);
													transition(3, div_3, () => slide);
													append($$anchor$9, div_3);
												};
												if_block(node_9, ($$render) => {
													if (show_settings[id()]) $$render(consequent_1);
												});
												template_effect(($0) => set_text(text$1, `${$0 ?? ""} `), [() => $$props.groups[id_field_group()]?.label ?? _("Unknown field group")]);
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
						component(sibling(node_4, 2), () => Card_content, ($$anchor$5, Card_Content) => {
							Card_Content($$anchor$5, {
								children: ($$anchor$6, $$slotProps$1) => {
									var div_8 = root_24();
									var div_9 = child(div_8);
									each(div_9, 21, () => sort(get(group_fields)), ({ id: id$1, name }) => id$1, ($$anchor$7, $$item$1, $$index_1, $$array_1) => {
										let id$1 = () => get($$item$1).id;
										let name = () => get($$item$1).name;
										var div_10 = root_25();
										var text_8 = child(div_10, true);
										reset(div_10);
										template_effect(($0) => {
											set_class(div_10, 1, `field-btn ${$0 ?? ""} cursor-grab`);
											set_attribute(div_10, "data-id", id$1());
											set_text(text_8, name());
										}, [buttonVariants]);
										append($$anchor$7, div_10);
									});
									reset(div_9);
									action(div_9, ($$node, $$action_arg) => sortableFields?.($$node, $$action_arg), () => ({ id: id() }));
									reset(div_8);
									append($$anchor$6, div_8);
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
			var fragment_20 = comment();
			component(first_child(fragment_20), () => Alert, ($$anchor$3, Alert_Root) => {
				Alert_Root($$anchor$3, {
					children: ($$anchor$4, $$slotProps) => {
						var fragment_21 = root_27();
						var node_26 = first_child(fragment_21);
						Icon(node_26, { icon: "ic:baseline-info" });
						var node_27 = sibling(node_26, 2);
						component(node_27, () => Alert_title, ($$anchor$5, Alert_Title) => {
							Alert_Title($$anchor$5, {
								children: ($$anchor$6, $$slotProps$1) => {
									next();
									var text_9 = text();
									template_effect(($0) => set_text(text_9, $0), [() => _("No field groups found")]);
									append($$anchor$6, text_9);
								},
								$$slots: { default: true }
							});
						});
						component(sibling(node_27, 2), () => Alert_description, ($$anchor$5, Alert_Description) => {
							Alert_Description($$anchor$5, {
								children: ($$anchor$6, $$slotProps$1) => {
									next();
									var text_10 = text();
									template_effect(($0) => set_text(text_10, $0), [() => _("Click the button above to insert a field group")]);
									append($$anchor$6, text_10);
								},
								$$slots: { default: true }
							});
						});
						append($$anchor$4, fragment_21);
					},
					$$slots: { default: true }
				});
			});
			append($$anchor$2, fragment_20);
		});
		append($$anchor$1, fragment);
	});
	reset(div);
	action(div, ($$node, $$action_arg) => sortable?.($$node, $$action_arg), () => ({ onEnd }));
	reset(form_1);
	action(form_1, ($$node) => enhance?.($$node));
	append($$anchor, form_1);
	pop();
	$$cleanup();
}
var root_2$2 = from_html(`<!> <!>`, 1);
var root_6 = from_html(`<div> </div>`);
var root_5 = from_html(`<div class="border-field-500 flex min-h-14 flex-wrap items-center gap-2 rounded-md border p-2"></div>`);
var root_1 = from_html(`<!> <!>`, 1);
var root$2 = from_html(`<div class="p-4"><!></div>`);
function AvailableFields($$anchor, $$props) {
	push($$props, true);
	let available_fields = user_derived(() => sort(Object.values($$props.fields).filter((f) => {
		return f.id_group === 0 && f.name !== "";
	})));
	function sortableFields(node) {
		const sortable$1 = new sortable_esm_default(node, {
			group: "available_fields",
			animation: 150,
			onSort: async (ev) => {
				const order = Array.from(ev.target.childNodes).filter((el) => el instanceof HTMLDivElement).map((el) => +(el.dataset.id ?? 0)).filter((id) => id > 0);
				await form_action({
					route: page.route.id,
					action: "sort_fields",
					data: {
						order,
						id_group: 0
					}
				});
				toast.success(_("The fields were reordered successfully"));
			}
		});
		return { destroy() {
			sortable$1.destroy();
		} };
	}
	var div = root$2();
	component(child(div), () => Card, ($$anchor$1, Card_Root) => {
		Card_Root($$anchor$1, {
			children: ($$anchor$2, $$slotProps) => {
				var fragment = root_1();
				var node_2 = first_child(fragment);
				component(node_2, () => Card_header, ($$anchor$3, Card_Header) => {
					Card_Header($$anchor$3, {
						children: ($$anchor$4, $$slotProps$1) => {
							var fragment_1 = root_2$2();
							var node_3 = first_child(fragment_1);
							component(node_3, () => Card_title, ($$anchor$5, Card_Title) => {
								Card_Title($$anchor$5, {
									children: ($$anchor$6, $$slotProps$2) => {
										next();
										append($$anchor$6, text("Available fields"));
									},
									$$slots: { default: true }
								});
							});
							component(sibling(node_3, 2), () => Card_description, ($$anchor$5, Card_Description) => {
								Card_Description($$anchor$5, {
									children: ($$anchor$6, $$slotProps$2) => {
										next();
										append($$anchor$6, text("Drag and drop to add fields to the groups above"));
									},
									$$slots: { default: true }
								});
							});
							append($$anchor$4, fragment_1);
						},
						$$slots: { default: true }
					});
				});
				component(sibling(node_2, 2), () => Card_content, ($$anchor$3, Card_Content) => {
					Card_Content($$anchor$3, {
						children: ($$anchor$4, $$slotProps$1) => {
							var div_1 = root_5();
							each(div_1, 21, () => get(available_fields), ({ id, name }) => id, ($$anchor$5, $$item) => {
								let id = () => get($$item).id;
								let name = () => get($$item).name;
								var div_2 = root_6();
								var text_2 = child(div_2, true);
								reset(div_2);
								template_effect(($0) => {
									set_class(div_2, 1, `field-btn ${$0 ?? ""} cursor-grab`);
									set_attribute(div_2, "data-id", id());
									set_text(text_2, name());
								}, [buttonVariants]);
								append($$anchor$5, div_2);
							});
							reset(div_1);
							action(div_1, ($$node) => sortableFields?.($$node));
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
	reset(div);
	append($$anchor, div);
	pop();
}
var root_4 = from_html(`<!> <!>`, 1);
var root_12 = from_html(`<!> `, 1);
var root_14 = from_html(`<!> `, 1);
var root_15 = from_html(`<!> `, 1);
var root_2$1 = from_html(`<div class="flex flex-col gap-6"><div class="flex items-end gap-2"><div class="flex max-w-sm flex-col gap-1.5"><!> <!></div> <!> <!> <!></div></div>`);
var root$1 = from_html(`<form id="form" method="POST"><div class="flex flex-col gap-4 p-4"><!></div></form>`);
function Groups($$anchor, $$props) {
	push($$props, true);
	const $form = () => store_get(form, "$form", $$stores);
	const $submitting = () => store_get(submitting, "$submitting", $$stores);
	const [$$stores, $$cleanup] = setup_stores();
	const { form, enhance, submitting, tainted } = superForm($$props.form, {
		dataType: "json",
		SPA: true,
		validators: valibot(GroupsFormSchema),
		resetForm: false,
		invalidateAll: false,
		async onSubmit({ cancel, submitter }) {
			const data = { id_group: $form().id_group };
			store_mutate(form, untrack($form).action_name = submitter?.getAttribute("name") ?? "", untrack($form));
			if ($form().action_name === "reload") {
				await invalidateAll();
				toast.success(_("The groups have been reloaded successfully"));
				return;
			}
			const res = await form_action({
				route: page.route.id,
				action: submitter?.getAttribute("name"),
				data
			});
			if (res.error) toast.error(res.message);
			else {
				toast.success(res.message);
				await invalidateAll();
			}
			cancel();
		}
	});
	async function onEnd(ev) {
		const order = Array.from(ev.target.querySelectorAll(".list-element")).map((el) => +(el.dataset.id ?? 0)).filter((id) => id > 0);
		const res = await form_action({
			route: page.route.id,
			action: "sort",
			data: { order }
		});
		form.update((state$1) => ({
			...state$1,
			action_name: "",
			action_value: "",
			product_groups: obj(res.product_groups)
		}));
		tainted.set({});
		if (ev.oldIndex !== ev.newIndex) ev.item.remove();
		toast.success(_("Field groups reordered successfully"));
	}
	var form_1 = root$1();
	var div = child(form_1);
	component(child(div), () => Card, ($$anchor$1, Card_Root) => {
		Card_Root($$anchor$1, {
			class: "list-element",
			children: ($$anchor$2, $$slotProps) => {
				var fragment = comment();
				component(first_child(fragment), () => Card_content, ($$anchor$3, Card_Content) => {
					Card_Content($$anchor$3, {
						class: "group relative",
						children: ($$anchor$4, $$slotProps$1) => {
							var div_1 = root_2$1();
							var div_2 = child(div_1);
							var div_3 = child(div_2);
							var node_2 = child(div_3);
							Label(node_2, {
								children: ($$anchor$5, $$slotProps$2) => {
									next();
									var text$1 = text();
									template_effect(($0) => set_text(text$1, `${$0 ?? ""}:`), [() => _("Available groups")]);
									append($$anchor$5, text$1);
								},
								$$slots: { default: true }
							});
							component(sibling(node_2, 2), () => Root, ($$anchor$5, Select_Root) => {
								Select_Root($$anchor$5, {
									type: "single",
									get value() {
										return $form().id_group;
									},
									set value($$value) {
										store_mutate(form, untrack($form).id_group = $$value, untrack($form));
									},
									children: ($$anchor$6, $$slotProps$2) => {
										var fragment_2 = root_4();
										var node_4 = first_child(fragment_2);
										component(node_4, () => Select_trigger, ($$anchor$7, Select_Trigger) => {
											Select_Trigger($$anchor$7, {
												class: "w-48",
												children: ($$anchor$8, $$slotProps$3) => {
													next();
													var text_1 = text();
													template_effect(($0) => set_text(text_1, $0), [() => $form().groups[$form().id_group]?.label ?? `${_("Select a group")}...`]);
													append($$anchor$8, text_1);
												},
												$$slots: { default: true }
											});
										});
										component(sibling(node_4, 2), () => Select_content, ($$anchor$7, Select_Content) => {
											Select_Content($$anchor$7, {
												children: ($$anchor$8, $$slotProps$3) => {
													var fragment_4 = comment();
													component(first_child(fragment_4), () => Group, ($$anchor$9, Select_Group) => {
														Select_Group($$anchor$9, {
															children: ($$anchor$10, $$slotProps$4) => {
																var fragment_5 = comment();
																each(first_child(fragment_5), 1, () => Object.values($form().groups), ({ id, label }) => id, ($$anchor$11, $$item) => {
																	let id = () => get($$item).id;
																	let label = () => get($$item).label;
																	var fragment_6 = comment();
																	var node_8 = first_child(fragment_6);
																	{
																		let $0 = user_derived(() => id().toString());
																		component(node_8, () => Select_item, ($$anchor$12, Select_Item) => {
																			Select_Item($$anchor$12, {
																				class: "cursor-pointer",
																				get value() {
																					return get($0);
																				},
																				get label() {
																					return label();
																				},
																				children: ($$anchor$13, $$slotProps$5) => {
																					next();
																					var text_2 = text();
																					template_effect(() => set_text(text_2, label()));
																					append($$anchor$13, text_2);
																				},
																				$$slots: { default: true }
																			});
																		});
																	}
																	append($$anchor$11, fragment_6);
																}, ($$anchor$11) => {
																	var fragment_8 = comment();
																	component(first_child(fragment_8), () => Select_item, ($$anchor$12, Select_Item_1) => {
																		Select_Item_1($$anchor$12, {
																			disabled: true,
																			value: "0",
																			children: ($$anchor$13, $$slotProps$5) => {
																				next();
																				var text_3 = text();
																				template_effect(($0) => set_text(text_3, $0), [() => _("No groups available")]);
																				append($$anchor$13, text_3);
																			},
																			$$slots: { default: true }
																		});
																	});
																	append($$anchor$11, fragment_8);
																});
																append($$anchor$10, fragment_5);
															},
															$$slots: { default: true }
														});
													});
													append($$anchor$8, fragment_4);
												},
												$$slots: { default: true }
											});
										});
										append($$anchor$6, fragment_2);
									},
									$$slots: { default: true }
								});
							});
							reset(div_3);
							var node_10 = sibling(div_3, 2);
							Form_button(node_10, {
								class: "flex gap-2",
								name: "add_field_group",
								variant: "outline",
								children: ($$anchor$5, $$slotProps$2) => {
									var fragment_10 = root_12();
									var node_11 = first_child(fragment_10);
									{
										let $0 = user_derived(() => $submitting() && $form().action_name === "add_field_group");
										Spinner(node_11, {
											get loading() {
												return get($0);
											},
											children: ($$anchor$6, $$slotProps$3) => {
												Icon($$anchor$6, { icon: "mdi:plus" });
											},
											$$slots: { default: true }
										});
									}
									var text_4 = sibling(node_11);
									template_effect(($0) => set_text(text_4, ` ${$0 ?? ""}`), [() => _("Insert group")]);
									append($$anchor$5, fragment_10);
								},
								$$slots: { default: true }
							});
							var node_12 = sibling(node_10, 2);
							Form_button(node_12, {
								class: "flex gap-2",
								get href() {
									return `${$$props.config_page_url ?? ""}#field-groups`;
								},
								target: "_blank",
								variant: "secondary",
								children: ($$anchor$5, $$slotProps$2) => {
									var fragment_12 = root_14();
									var node_13 = first_child(fragment_12);
									Icon(node_13, { icon: "ic:baseline-open-in-new" });
									var text_5 = sibling(node_13);
									template_effect(($0) => set_text(text_5, ` ${$0 ?? ""}`), [() => _("Manage field groups")]);
									append($$anchor$5, fragment_12);
								},
								$$slots: { default: true }
							});
							Form_button(sibling(node_12, 2), {
								class: "flex gap-2",
								name: "reload",
								variant: "secondary",
								children: ($$anchor$5, $$slotProps$2) => {
									var fragment_13 = root_15();
									var node_15 = first_child(fragment_13);
									{
										let $0 = user_derived(() => $submitting() && $form().action_name === "reload");
										Spinner(node_15, {
											get loading() {
												return get($0);
											},
											children: ($$anchor$6, $$slotProps$3) => {
												Icon($$anchor$6, { icon: "mdi:refresh" });
											},
											$$slots: { default: true }
										});
									}
									var text_6 = sibling(node_15);
									template_effect(($0) => set_text(text_6, ` ${$0 ?? ""}`), [() => _("Reload groups")]);
									append($$anchor$5, fragment_13);
								},
								$$slots: { default: true }
							});
							reset(div_2);
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
	reset(div);
	action(div, ($$node, $$action_arg) => sortable?.($$node, $$action_arg), () => ({ onEnd }));
	reset(form_1);
	action(form_1, ($$node) => enhance?.($$node));
	append($$anchor, form_1);
	pop();
	$$cleanup();
}
var root_2 = from_html(`<form class="flex flex-col gap-6"><div class="flex space-x-2"><!> <div class="grid gap-1.5 leading-none"><!> <p class="text-muted-foreground max-w-xs text-sm"> </p></div></div></form>`);
var root = from_html(`<!> <div class="p-4"><!></div> <!> <!>`, 1);
function _page($$anchor, $$props) {
	push($$props, true);
	let ungrouped_fields_on_top = state(proxy($$props.data.ungrouped_fields_on_top));
	async function saveSettings() {
		await form_action({
			route: page.route.id,
			action: "save_settings",
			data: { ungrouped_fields_on_top: get(ungrouped_fields_on_top) }
		});
		toast.success(_("The settings have been updated"));
	}
	var fragment = root();
	var node = first_child(fragment);
	Groups(node, {
		get config_page_url() {
			return $$props.data.config_page_url;
		},
		get form() {
			return $$props.data.list_form;
		}
	});
	var div = sibling(node, 2);
	component(child(div), () => Card, ($$anchor$1, Card_Root) => {
		Card_Root($$anchor$1, {
			children: ($$anchor$2, $$slotProps) => {
				var fragment_1 = comment();
				component(first_child(fragment_1), () => Card_content, ($$anchor$3, Card_Content) => {
					Card_Content($$anchor$3, {
						children: ($$anchor$4, $$slotProps$1) => {
							var form = root_2();
							var div_1 = child(form);
							var node_3 = child(div_1);
							Switch(node_3, {
								id: "ungrouped_fields_on_top",
								onCheckedChange: () => saveSettings(),
								get checked() {
									return get(ungrouped_fields_on_top);
								},
								set checked($$value) {
									set(ungrouped_fields_on_top, $$value, true);
								}
							});
							var div_2 = sibling(node_3, 2);
							var node_4 = child(div_2);
							Label(node_4, {
								for: "ungrouped_fields_on_top",
								children: ($$anchor$5, $$slotProps$2) => {
									next();
									var text$1 = text();
									template_effect(($0) => set_text(text$1, $0), [() => _("Display ungrouped fields on top")]);
									append($$anchor$5, text$1);
								},
								$$slots: { default: true }
							});
							var p = sibling(node_4, 2);
							var text_1 = child(p, true);
							reset(p);
							reset(div_2);
							reset(div_1);
							reset(form);
							template_effect(($0) => set_text(text_1, $0), [() => _("Enable if the price depends on the cart quantity")]);
							append($$anchor$4, form);
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
	var node_5 = sibling(div, 2);
	ProductGroups(node_5, {
		get fields() {
			return $$props.data.fields;
		},
		get form() {
			return $$props.data.form;
		},
		get groups() {
			return $$props.data.groups;
		}
	});
	AvailableFields(sibling(node_5, 2), { get fields() {
		return $$props.data.fields;
	} });
	append($$anchor, fragment);
	pop();
}
export { _page as component, _page_exports as universal };
