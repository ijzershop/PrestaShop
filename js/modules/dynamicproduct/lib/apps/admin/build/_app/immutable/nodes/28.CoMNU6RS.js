import { Ct as set, Ft as push, Ht as next, L as component, N as action, Ot as user_derived, Pt as pop, Tt as state, Ut as reset, V as each, W as key, X as comment, Y as append, Z as from_html, Zt as __exportAll, bt as sibling, d as store_mutate, et as text, l as setup_stores, lt as untrack, ot as get, pt as template_effect, q as set_text, u as store_get, vt as child, yt as first_child } from "../chunks/DUscB9kS.js";
import "../chunks/B_W7bg6n.js";
import "../chunks/D365qDux.js";
import { i as superForm, n as superValidate, t as valibot } from "../chunks/CPdJ2mnA.js";
import "../chunks/D-Alr120.js";
import "../chunks/CEFrIRjK.js";
import { a as form_action, s as page_load, u as upload_files } from "../chunks/BIEFGHhw.js";
import { n as toast } from "../chunks/CQQo25vS.js";
import "../chunks/CJDS8lnd.js";
import "../chunks/DAbnHPcz.js";
import { n as _, t as Icon } from "../chunks/DFl6Gq92.js";
import { n as page } from "../chunks/BRpqcTWk.js";
import "../chunks/_yKPJ4BA.js";
import { a as Select_content, i as Select_trigger, n as Root, o as Select_item, t as Group } from "../chunks/B8kltHsl.js";
import { t as Label } from "../chunks/ClKKfzS1.js";
import { a as Card_content, o as Card, r as Card_footer } from "../chunks/Bpx6gt8W.js";
import "../chunks/CgH3Vt0F.js";
import { n as Alert_description, r as Alert, t as Alert_title } from "../chunks/OMr53o_L.js";
import { _ as transform, d as optional, f as picklist, g as string, l as number, m as record, o as instance, p as pipe, t as any, u as object } from "../chunks/Da0rmiev.js";
import { t as Spinner } from "../chunks/C9eHbt79.js";
import { n as obj } from "../chunks/C961kT60.js";
import { a as Table_cell, i as Table_footer, n as Table_header, o as Table_body, r as Table_head, s as Table, t as Table_row } from "../chunks/fQ7Z9iZC.js";
import { t as sort } from "../chunks/Bz4g0JZD.js";
import { n as Form_button } from "../chunks/C9E5Z7Ag.js";
import { t as Input } from "../chunks/D2YUxW8P.js";
import { t as navigate } from "../chunks/CqWKmQZR.js";
const GridSchema = object({
	id: number(),
	id_field_target: number(),
	id_field_column: number(),
	id_field_row: number(),
	columns: record(string(), object({
		id: number(),
		value: pipe(any(), transform((val) => String(val)), string())
	})),
	rows: record(string(), object({
		id: number(),
		value: pipe(any(), transform((val) => String(val)), string())
	})),
	values: record(string(), object({
		id_grid_column: number(),
		id_grid_row: number(),
		value: pipe(any(), transform((val) => String(val)), string())
	}))
});
const GridsFormSchema = object({
	action_name: picklist([
		"",
		"update",
		"add",
		"add-column",
		"add-row",
		"delete",
		"delete-column",
		"delete-row",
		"import"
	]),
	action_value: string(),
	file: optional(instance(File)),
	grids: record(string(), GridSchema)
});
var _page_exports = /* @__PURE__ */ __exportAll({ load: () => load }, 1);
const load = async (event) => {
	const { grids, fields } = await page_load(event);
	for (const id in grids) {
		grids[id].columns = obj(grids[id].columns);
		grids[id].rows = obj(grids[id].rows);
		grids[id].values = obj(grids[id].values);
	}
	return {
		form: await superValidate({ grids: obj(grids) }, valibot(GridsFormSchema, { typeMode: "output" })),
		fields
	};
};
var root_6 = from_html(`<!> <!>`, 1);
var root_15 = from_html(`<!> <!>`, 1);
var root_24 = from_html(`<!> <!>`, 1);
var root_34 = from_html(`<!> <!> <!>`, 1);
var root_42 = from_html(`<!> <!> <!>`, 1);
var root_50 = from_html(`<!> <!> <!>`, 1);
var root_32 = from_html(`<!> <!> <!>`, 1);
var root_4 = from_html(`<div class="mb-4 flex flex-wrap gap-2"><div class="flex max-w-sm flex-col gap-1.5"><!> <!></div> <div class="flex max-w-sm flex-col gap-1.5"><!> <!></div> <div class="flex max-w-sm flex-col gap-1.5"><!> <!></div></div> <!>`, 1);
var root_59 = from_html(`<!> `, 1);
var root_61 = from_html(`<!> `, 1);
var root_58 = from_html(`<!> <!>`, 1);
var root_3 = from_html(`<!> <!>`, 1);
var root_64 = from_html(`<!> <!> <!>`, 1);
var root_68 = from_html(`<!> `, 1);
var root_70 = from_html(`<!> `, 1);
var root_67 = from_html(`<!> <!> <div class="dp-away"><!></div>`, 1);
var root = from_html(`<form id="form" method="POST"><div class="flex flex-col gap-4 p-4"><!></div> <!></form>`);
function _page($$anchor, $$props) {
	push($$props, true);
	const $form = () => store_get(form, "$form", $$stores);
	const $tainted = () => store_get(tainted, "$tainted", $$stores);
	const $submitting = () => store_get(submitting, "$submitting", $$stores);
	const [$$stores, $$cleanup] = setup_stores();
	const { form, enhance, submitting, tainted, submit } = superForm($$props.data.form, {
		dataType: "json",
		SPA: true,
		validators: valibot(GridsFormSchema, { typeMode: "output" }),
		taintedMessage: _("You have unsaved changes. Are you sure you want to leave this page?"),
		resetForm: false,
		invalidateAll: false,
		async onSubmit({ cancel, submitter }) {
			const data = {
				action_name: submitter?.getAttribute("name") || "update",
				action_value: submitter?.getAttribute("value") || $form().action_value,
				grids: Object.fromEntries(Object.values($form().grids).filter((c) => Object.keys($tainted()?.grids ?? {}).includes(c.id.toString())).map((c) => [c.id, c]))
			};
			store_mutate(form, untrack($form).action_name = data.action_name, untrack($form));
			store_mutate(form, untrack($form).action_value = data.action_value, untrack($form));
			if ($form().file) {
				store_mutate(form, untrack($form).action_name = "import", untrack($form));
				const form_data = new FormData();
				form_data.append("action_name", "import");
				form_data.append("file", $form().file);
				store_mutate(form, untrack($form).file = void 0, untrack($form));
				const res = await upload_files({
					route: page.route.id,
					action: "import",
					data: form_data
				});
				if (res.error) toast.error(res.message);
				else {
					toast.success(res.message);
					if ("grids" in res) {
						const grids$2 = obj(res.grids);
						for (const id in grids$2) {
							grids$2[id].columns = obj(grids$2[id].columns);
							grids$2[id].rows = obj(grids$2[id].rows);
							grids$2[id].values = obj(grids$2[id].values);
						}
						form.update((state$1) => ({
							...state$1,
							action_name: "",
							action_value: data.action_value,
							grids: grids$2
						}), { taint: false });
						tainted.set({});
					}
				}
				cancel();
				return;
			}
			const grids$1 = obj((await form_action({
				route: page.route.id,
				action: "update",
				data
			})).grids);
			for (const id in grids$1) {
				grids$1[id].columns = obj(grids$1[id].columns);
				grids$1[id].rows = obj(grids$1[id].rows);
				grids$1[id].values = obj(grids$1[id].values);
			}
			form.update((state$1) => ({
				...state$1,
				action_name: "",
				action_value: data.action_value,
				grids: grids$1
			}), { taint: false });
			tainted.set({});
			switch (data.action_name) {
				case "add":
					toast.success(_("Grid added successfully"));
					break;
				case "delete":
					toast.success(_("Grid deleted successfully"));
					break;
				case "update":
					toast.success(_("Grid updated successfully"));
					break;
			}
			cancel();
		}
	});
	let fields = user_derived(() => $$props.data.fields);
	let grids = user_derived(() => Object.values($form().grids));
	let ids = user_derived(() => get(grids).map(({ id }) => id).join("-"));
	let import_file = state(null);
	var form_1 = root();
	var div = child(form_1);
	key(child(div), () => get(ids), ($$anchor$1) => {
		var fragment = comment();
		each(first_child(fragment), 17, () => get(grids), ({ id: id_grid, id_field_target, id_field_column, id_field_row, columns, rows }) => id_grid, ($$anchor$2, $$item) => {
			let id_grid = () => get($$item).id;
			let id_field_target = () => get($$item).id_field_target;
			let id_field_column = () => get($$item).id_field_column;
			let id_field_row = () => get($$item).id_field_row;
			let columns = () => get($$item).columns;
			let rows = () => get($$item).rows;
			var fragment_1 = comment();
			component(first_child(fragment_1), () => Card, ($$anchor$3, Card_Root) => {
				Card_Root($$anchor$3, {
					"data-testid": "grid",
					children: ($$anchor$4, $$slotProps) => {
						var fragment_2 = root_3();
						var node_3 = first_child(fragment_2);
						component(node_3, () => Card_content, ($$anchor$5, Card_Content) => {
							Card_Content($$anchor$5, {
								class: "group relative",
								children: ($$anchor$6, $$slotProps$1) => {
									var fragment_3 = root_4();
									var div_1 = first_child(fragment_3);
									var div_2 = child(div_1);
									var node_4 = child(div_2);
									Label(node_4, {
										children: ($$anchor$7, $$slotProps$2) => {
											next();
											var text$1 = text();
											template_effect(($0) => set_text(text$1, `${$0 ?? ""}:`), [() => _("Target field")]);
											append($$anchor$7, text$1);
										},
										$$slots: { default: true }
									});
									var node_5 = sibling(node_4, 2);
									var bind_get = () => $form().grids[id_grid()].id_field_target.toString();
									var bind_set = (v) => store_mutate(form, untrack($form).grids[id_grid()].id_field_target = +v, untrack($form));
									component(node_5, () => Root, ($$anchor$7, Select_Root) => {
										Select_Root($$anchor$7, {
											type: "single",
											get value() {
												return bind_get();
											},
											set value($$value) {
												bind_set($$value);
											},
											children: ($$anchor$8, $$slotProps$2) => {
												var fragment_5 = root_6();
												var node_6 = first_child(fragment_5);
												component(node_6, () => Select_trigger, ($$anchor$9, Select_Trigger) => {
													Select_Trigger($$anchor$9, {
														class: "w-48",
														"data-testid": "target-field",
														children: ($$anchor$10, $$slotProps$3) => {
															next();
															var text_1 = text();
															template_effect(() => set_text(text_1, get(fields)[id_field_target()]?.name ?? "--"));
															append($$anchor$10, text_1);
														},
														$$slots: { default: true }
													});
												});
												component(sibling(node_6, 2), () => Select_content, ($$anchor$9, Select_Content) => {
													Select_Content($$anchor$9, {
														children: ($$anchor$10, $$slotProps$3) => {
															var fragment_7 = comment();
															component(first_child(fragment_7), () => Group, ($$anchor$11, Select_Group) => {
																Select_Group($$anchor$11, {
																	children: ($$anchor$12, $$slotProps$4) => {
																		var fragment_8 = comment();
																		each(first_child(fragment_8), 17, () => sort(get(fields)), ({ id, name }) => id, ($$anchor$13, $$item$1) => {
																			let id = () => get($$item$1).id;
																			let name = () => get($$item$1).name;
																			var fragment_9 = comment();
																			var node_10 = first_child(fragment_9);
																			{
																				let $0 = user_derived(() => id().toString());
																				component(node_10, () => Select_item, ($$anchor$14, Select_Item) => {
																					Select_Item($$anchor$14, {
																						class: "cursor-pointer",
																						get value() {
																							return get($0);
																						},
																						get label() {
																							return name();
																						},
																						children: ($$anchor$15, $$slotProps$5) => {
																							next();
																							var text_2 = text();
																							template_effect(() => set_text(text_2, name()));
																							append($$anchor$15, text_2);
																						},
																						$$slots: { default: true }
																					});
																				});
																			}
																			append($$anchor$13, fragment_9);
																		}, ($$anchor$13) => {
																			var fragment_11 = comment();
																			component(first_child(fragment_11), () => Select_item, ($$anchor$14, Select_Item_1) => {
																				Select_Item_1($$anchor$14, {
																					disabled: true,
																					value: "0",
																					children: ($$anchor$15, $$slotProps$5) => {
																						next();
																						var text_3 = text();
																						template_effect(($0) => set_text(text_3, $0), [() => _("No fields available")]);
																						append($$anchor$15, text_3);
																					},
																					$$slots: { default: true }
																				});
																			});
																			append($$anchor$13, fragment_11);
																		});
																		append($$anchor$12, fragment_8);
																	},
																	$$slots: { default: true }
																});
															});
															append($$anchor$10, fragment_7);
														},
														$$slots: { default: true }
													});
												});
												append($$anchor$8, fragment_5);
											},
											$$slots: { default: true }
										});
									});
									reset(div_2);
									var div_3 = sibling(div_2, 2);
									var node_12 = child(div_3);
									Label(node_12, {
										children: ($$anchor$7, $$slotProps$2) => {
											next();
											var text_4 = text();
											template_effect(($0) => set_text(text_4, `${$0 ?? ""}:`), [() => _("Column field")]);
											append($$anchor$7, text_4);
										},
										$$slots: { default: true }
									});
									var node_13 = sibling(node_12, 2);
									var bind_get_1 = () => $form().grids[id_grid()].id_field_column.toString();
									var bind_set_1 = (v) => store_mutate(form, untrack($form).grids[id_grid()].id_field_column = +v, untrack($form));
									component(node_13, () => Root, ($$anchor$7, Select_Root_1) => {
										Select_Root_1($$anchor$7, {
											type: "single",
											get value() {
												return bind_get_1();
											},
											set value($$value) {
												bind_set_1($$value);
											},
											children: ($$anchor$8, $$slotProps$2) => {
												var fragment_14 = root_15();
												var node_14 = first_child(fragment_14);
												component(node_14, () => Select_trigger, ($$anchor$9, Select_Trigger_1) => {
													Select_Trigger_1($$anchor$9, {
														class: "w-48 text-sky-500",
														children: ($$anchor$10, $$slotProps$3) => {
															next();
															var text_5 = text();
															template_effect(() => set_text(text_5, get(fields)[id_field_column()]?.name ?? "--"));
															append($$anchor$10, text_5);
														},
														$$slots: { default: true }
													});
												});
												component(sibling(node_14, 2), () => Select_content, ($$anchor$9, Select_Content_1) => {
													Select_Content_1($$anchor$9, {
														children: ($$anchor$10, $$slotProps$3) => {
															var fragment_16 = comment();
															component(first_child(fragment_16), () => Group, ($$anchor$11, Select_Group_1) => {
																Select_Group_1($$anchor$11, {
																	children: ($$anchor$12, $$slotProps$4) => {
																		var fragment_17 = comment();
																		each(first_child(fragment_17), 17, () => sort(get(fields)), ({ id, name }) => id, ($$anchor$13, $$item$1) => {
																			let id = () => get($$item$1).id;
																			let name = () => get($$item$1).name;
																			var fragment_18 = comment();
																			var node_18 = first_child(fragment_18);
																			{
																				let $0 = user_derived(() => id().toString());
																				component(node_18, () => Select_item, ($$anchor$14, Select_Item_2) => {
																					Select_Item_2($$anchor$14, {
																						class: "cursor-pointer",
																						get value() {
																							return get($0);
																						},
																						get label() {
																							return name();
																						},
																						children: ($$anchor$15, $$slotProps$5) => {
																							next();
																							var text_6 = text();
																							template_effect(() => set_text(text_6, name()));
																							append($$anchor$15, text_6);
																						},
																						$$slots: { default: true }
																					});
																				});
																			}
																			append($$anchor$13, fragment_18);
																		}, ($$anchor$13) => {
																			var fragment_20 = comment();
																			component(first_child(fragment_20), () => Select_item, ($$anchor$14, Select_Item_3) => {
																				Select_Item_3($$anchor$14, {
																					disabled: true,
																					value: "0",
																					children: ($$anchor$15, $$slotProps$5) => {
																						next();
																						var text_7 = text();
																						template_effect(($0) => set_text(text_7, $0), [() => _("No fields available")]);
																						append($$anchor$15, text_7);
																					},
																					$$slots: { default: true }
																				});
																			});
																			append($$anchor$13, fragment_20);
																		});
																		append($$anchor$12, fragment_17);
																	},
																	$$slots: { default: true }
																});
															});
															append($$anchor$10, fragment_16);
														},
														$$slots: { default: true }
													});
												});
												append($$anchor$8, fragment_14);
											},
											$$slots: { default: true }
										});
									});
									reset(div_3);
									var div_4 = sibling(div_3, 2);
									var node_20 = child(div_4);
									Label(node_20, {
										children: ($$anchor$7, $$slotProps$2) => {
											next();
											var text_8 = text();
											template_effect(($0) => set_text(text_8, `${$0 ?? ""}:`), [() => _("Row field")]);
											append($$anchor$7, text_8);
										},
										$$slots: { default: true }
									});
									var node_21 = sibling(node_20, 2);
									var bind_get_2 = () => $form().grids[id_grid()].id_field_row.toString();
									var bind_set_2 = (v) => store_mutate(form, untrack($form).grids[id_grid()].id_field_row = +v, untrack($form));
									component(node_21, () => Root, ($$anchor$7, Select_Root_2) => {
										Select_Root_2($$anchor$7, {
											type: "single",
											get value() {
												return bind_get_2();
											},
											set value($$value) {
												bind_set_2($$value);
											},
											children: ($$anchor$8, $$slotProps$2) => {
												var fragment_23 = root_24();
												var node_22 = first_child(fragment_23);
												component(node_22, () => Select_trigger, ($$anchor$9, Select_Trigger_2) => {
													Select_Trigger_2($$anchor$9, {
														class: "w-48 text-green-500",
														children: ($$anchor$10, $$slotProps$3) => {
															next();
															var text_9 = text();
															template_effect(() => set_text(text_9, get(fields)[id_field_row()]?.name ?? "--"));
															append($$anchor$10, text_9);
														},
														$$slots: { default: true }
													});
												});
												component(sibling(node_22, 2), () => Select_content, ($$anchor$9, Select_Content_2) => {
													Select_Content_2($$anchor$9, {
														children: ($$anchor$10, $$slotProps$3) => {
															var fragment_25 = comment();
															component(first_child(fragment_25), () => Group, ($$anchor$11, Select_Group_2) => {
																Select_Group_2($$anchor$11, {
																	children: ($$anchor$12, $$slotProps$4) => {
																		var fragment_26 = comment();
																		each(first_child(fragment_26), 17, () => sort(get(fields)), ({ id, name }) => id, ($$anchor$13, $$item$1) => {
																			let id = () => get($$item$1).id;
																			let name = () => get($$item$1).name;
																			var fragment_27 = comment();
																			var node_26 = first_child(fragment_27);
																			{
																				let $0 = user_derived(() => id().toString());
																				component(node_26, () => Select_item, ($$anchor$14, Select_Item_4) => {
																					Select_Item_4($$anchor$14, {
																						class: "cursor-pointer",
																						get value() {
																							return get($0);
																						},
																						get label() {
																							return name();
																						},
																						children: ($$anchor$15, $$slotProps$5) => {
																							next();
																							var text_10 = text();
																							template_effect(() => set_text(text_10, name()));
																							append($$anchor$15, text_10);
																						},
																						$$slots: { default: true }
																					});
																				});
																			}
																			append($$anchor$13, fragment_27);
																		}, ($$anchor$13) => {
																			var fragment_29 = comment();
																			component(first_child(fragment_29), () => Select_item, ($$anchor$14, Select_Item_5) => {
																				Select_Item_5($$anchor$14, {
																					disabled: true,
																					value: "0",
																					children: ($$anchor$15, $$slotProps$5) => {
																						next();
																						var text_11 = text();
																						template_effect(($0) => set_text(text_11, $0), [() => _("No fields available")]);
																						append($$anchor$15, text_11);
																					},
																					$$slots: { default: true }
																				});
																			});
																			append($$anchor$13, fragment_29);
																		});
																		append($$anchor$12, fragment_26);
																	},
																	$$slots: { default: true }
																});
															});
															append($$anchor$10, fragment_25);
														},
														$$slots: { default: true }
													});
												});
												append($$anchor$8, fragment_23);
											},
											$$slots: { default: true }
										});
									});
									reset(div_4);
									reset(div_1);
									component(sibling(div_1, 2), () => Table, ($$anchor$7, Table_Root) => {
										Table_Root($$anchor$7, {
											class: "w-max",
											children: ($$anchor$8, $$slotProps$2) => {
												var fragment_31 = root_32();
												var node_29 = first_child(fragment_31);
												component(node_29, () => Table_header, ($$anchor$9, Table_Header) => {
													Table_Header($$anchor$9, {
														children: ($$anchor$10, $$slotProps$3) => {
															var fragment_32 = comment();
															component(first_child(fragment_32), () => Table_row, ($$anchor$11, Table_Row) => {
																Table_Row($$anchor$11, {
																	children: ($$anchor$12, $$slotProps$4) => {
																		var fragment_33 = root_34();
																		var node_31 = first_child(fragment_33);
																		component(node_31, () => Table_head, ($$anchor$13, Table_Head) => {
																			Table_Head($$anchor$13, {});
																		});
																		var node_32 = sibling(node_31, 2);
																		each(node_32, 17, () => Object.values(columns()), ({ id: id_col }) => id_col, ($$anchor$13, $$item$1) => {
																			let id_col = () => get($$item$1).id;
																			var fragment_34 = comment();
																			component(first_child(fragment_34), () => Table_head, ($$anchor$14, Table_Head_1) => {
																				Table_Head_1($$anchor$14, {
																					class: "w-20 bg-sky-500 p-1",
																					children: ($$anchor$15, $$slotProps$5) => {
																						Input($$anchor$15, {
																							class: "text-center",
																							get value() {
																								return $form().grids[id_grid()].columns[id_col()].value;
																							},
																							set value($$value) {
																								store_mutate(form, untrack($form).grids[id_grid()].columns[id_col()].value = $$value, untrack($form));
																							}
																						});
																					},
																					$$slots: { default: true }
																				});
																			});
																			append($$anchor$13, fragment_34);
																		});
																		component(sibling(node_32, 2), () => Table_head, ($$anchor$13, Table_Head_2) => {
																			Table_Head_2($$anchor$13, {
																				class: "w-20 p-1 text-center",
																				children: ($$anchor$14, $$slotProps$5) => {
																					Form_button($$anchor$14, {
																						type: "submit",
																						variant: "ghost",
																						name: "add-column",
																						get value() {
																							return id_grid();
																						},
																						children: ($$anchor$15, $$slotProps$6) => {
																							{
																								let $0 = user_derived(() => $submitting() && $form().action_name === "add-column" && $form().action_value === id_grid().toString());
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
																		append($$anchor$12, fragment_33);
																	},
																	$$slots: { default: true }
																});
															});
															append($$anchor$10, fragment_32);
														},
														$$slots: { default: true }
													});
												});
												var node_35 = sibling(node_29, 2);
												component(node_35, () => Table_body, ($$anchor$9, Table_Body) => {
													Table_Body($$anchor$9, {
														children: ($$anchor$10, $$slotProps$3) => {
															var fragment_39 = comment();
															each(first_child(fragment_39), 17, () => Object.values(rows()), ({ id: id_row }) => id_row, ($$anchor$11, $$item$1) => {
																let id_row = () => get($$item$1).id;
																var fragment_40 = comment();
																component(first_child(fragment_40), () => Table_row, ($$anchor$12, Table_Row_1) => {
																	Table_Row_1($$anchor$12, {
																		children: ($$anchor$13, $$slotProps$4) => {
																			var fragment_41 = root_42();
																			var node_38 = first_child(fragment_41);
																			component(node_38, () => Table_cell, ($$anchor$14, Table_Cell) => {
																				Table_Cell($$anchor$14, {
																					class: "w-20 bg-green-500 p-1",
																					children: ($$anchor$15, $$slotProps$5) => {
																						Input($$anchor$15, {
																							class: "text-center",
																							get value() {
																								return $form().grids[id_grid()].rows[id_row()].value;
																							},
																							set value($$value) {
																								store_mutate(form, untrack($form).grids[id_grid()].rows[id_row()].value = $$value, untrack($form));
																							}
																						});
																					},
																					$$slots: { default: true }
																				});
																			});
																			var node_39 = sibling(node_38, 2);
																			each(node_39, 17, () => Object.values(columns()), ({ id: id_col }) => id_col, ($$anchor$14, $$item$2) => {
																				let id_col = () => get($$item$2).id;
																				const id = user_derived(() => `${id_row()}-${id_col()}`);
																				var fragment_43 = comment();
																				component(first_child(fragment_43), () => Table_cell, ($$anchor$15, Table_Cell_1) => {
																					Table_Cell_1($$anchor$15, {
																						class: "w-20 p-1",
																						children: ($$anchor$16, $$slotProps$5) => {
																							var bind_get_3 = () => $form().grids[id_grid()].values?.[get(id)]?.value ?? "";
																							var bind_set_3 = (v) => {
																								if (!$form().grids[id_grid()].values[get(id)]) store_mutate(form, untrack($form).grids[id_grid()].values[get(id)] = {
																									id_grid_row: id_row(),
																									id_grid_column: id_col(),
																									value: v.toString()
																								}, untrack($form));
																								store_mutate(form, untrack($form).grids[id_grid()].values[get(id)].value = v.toString(), untrack($form));
																							};
																							Input($$anchor$16, {
																								class: "text-center",
																								"data-testid": "value",
																								get value() {
																									return bind_get_3();
																								},
																								set value($$value) {
																									bind_set_3($$value);
																								}
																							});
																						},
																						$$slots: { default: true }
																					});
																				});
																				append($$anchor$14, fragment_43);
																			});
																			component(sibling(node_39, 2), () => Table_cell, ($$anchor$14, Table_Cell_2) => {
																				Table_Cell_2($$anchor$14, {
																					class: "w-20 p-1 text-center",
																					children: ($$anchor$15, $$slotProps$5) => {
																						{
																							let $0 = user_derived(() => _("Delete row"));
																							Form_button($$anchor$15, {
																								class: "text-destructive",
																								variant: "ghost",
																								size: "sm",
																								name: "delete-row",
																								get value() {
																									return id_row();
																								},
																								get title() {
																									return get($0);
																								},
																								onclick: (e) => {
																									if (!confirm(_("Are you sure you want to delete this row?"))) e.preventDefault();
																								},
																								children: ($$anchor$16, $$slotProps$6) => {
																									{
																										let $0$1 = user_derived(() => $submitting() && $form().action_name === "delete-row" && $form().action_value === id_row().toString());
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
																					},
																					$$slots: { default: true }
																				});
																			});
																			append($$anchor$13, fragment_41);
																		},
																		$$slots: { default: true }
																	});
																});
																append($$anchor$11, fragment_40);
															});
															append($$anchor$10, fragment_39);
														},
														$$slots: { default: true }
													});
												});
												component(sibling(node_35, 2), () => Table_footer, ($$anchor$9, Table_Footer) => {
													Table_Footer($$anchor$9, {
														children: ($$anchor$10, $$slotProps$3) => {
															var fragment_48 = comment();
															component(first_child(fragment_48), () => Table_row, ($$anchor$11, Table_Row_2) => {
																Table_Row_2($$anchor$11, {
																	children: ($$anchor$12, $$slotProps$4) => {
																		var fragment_49 = root_50();
																		var node_44 = first_child(fragment_49);
																		component(node_44, () => Table_cell, ($$anchor$13, Table_Cell_3) => {
																			Table_Cell_3($$anchor$13, {
																				class: "text-center",
																				children: ($$anchor$14, $$slotProps$5) => {
																					Form_button($$anchor$14, {
																						type: "submit",
																						variant: "ghost",
																						name: "add-row",
																						get value() {
																							return id_grid();
																						},
																						children: ($$anchor$15, $$slotProps$6) => {
																							{
																								let $0 = user_derived(() => $submitting() && $form().action_name === "add-row" && $form().action_value === id_grid().toString());
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
																		var node_45 = sibling(node_44, 2);
																		each(node_45, 17, () => Object.values(columns()), ({ id: id_col }) => id_col, ($$anchor$13, $$item$1) => {
																			let id_col = () => get($$item$1).id;
																			var fragment_53 = comment();
																			component(first_child(fragment_53), () => Table_cell, ($$anchor$14, Table_Cell_4) => {
																				Table_Cell_4($$anchor$14, {
																					class: "text-center",
																					children: ($$anchor$15, $$slotProps$5) => {
																						{
																							let $0 = user_derived(() => _("Delete column"));
																							Form_button($$anchor$15, {
																								class: "text-destructive",
																								variant: "ghost",
																								size: "sm",
																								name: "delete-column",
																								get value() {
																									return id_col();
																								},
																								get title() {
																									return get($0);
																								},
																								onclick: (e) => {
																									if (!confirm(_("Are you sure you want to delete this column?"))) e.preventDefault();
																								},
																								children: ($$anchor$16, $$slotProps$6) => {
																									{
																										let $0$1 = user_derived(() => $submitting() && $form().action_name === "delete-column" && $form().action_value === id_col().toString());
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
																					},
																					$$slots: { default: true }
																				});
																			});
																			append($$anchor$13, fragment_53);
																		});
																		component(sibling(node_45, 2), () => Table_cell, ($$anchor$13, Table_Cell_5) => {
																			Table_Cell_5($$anchor$13, {});
																		});
																		append($$anchor$12, fragment_49);
																	},
																	$$slots: { default: true }
																});
															});
															append($$anchor$10, fragment_48);
														},
														$$slots: { default: true }
													});
												});
												append($$anchor$8, fragment_31);
											},
											$$slots: { default: true }
										});
									});
									append($$anchor$6, fragment_3);
								},
								$$slots: { default: true }
							});
						});
						component(sibling(node_3, 2), () => Card_footer, ($$anchor$5, Card_Footer) => {
							Card_Footer($$anchor$5, {
								class: "gap-2",
								children: ($$anchor$6, $$slotProps$1) => {
									var fragment_57 = root_58();
									var node_49 = first_child(fragment_57);
									{
										let $0 = user_derived(() => $tainted()?.grids?.[id_grid()] && "btn-highlight");
										let $1 = user_derived(() => !$tainted()?.grids?.[id_grid()]);
										Form_button(node_49, {
											get class() {
												return `flex gap-2 ${get($0) ?? ""}`;
											},
											get disabled() {
												return get($1);
											},
											children: ($$anchor$7, $$slotProps$2) => {
												var fragment_58 = root_59();
												var node_50 = first_child(fragment_58);
												{
													let $0$1 = user_derived(() => $submitting() && $form().action_name === "update");
													Spinner(node_50, {
														get loading() {
															return get($0$1);
														},
														children: ($$anchor$8, $$slotProps$3) => {
															Icon($$anchor$8, { icon: "mdi:content-save" });
														},
														$$slots: { default: true }
													});
												}
												var text_12 = sibling(node_50);
												template_effect(($0$1) => set_text(text_12, ` ${$0$1 ?? ""}`), [() => _("Save grid")]);
												append($$anchor$7, fragment_58);
											},
											$$slots: { default: true }
										});
									}
									var node_51 = sibling(node_49, 2);
									{
										let $0 = user_derived(() => _("Delete grid"));
										Form_button(node_51, {
											class: "flex gap-2",
											variant: "destructive",
											name: "delete",
											get value() {
												return id_grid();
											},
											get title() {
												return get($0);
											},
											onclick: (e) => {
												if (!confirm(_("Are you sure you want to delete this grid?"))) e.preventDefault();
											},
											children: ($$anchor$7, $$slotProps$2) => {
												var fragment_60 = root_61();
												var node_52 = first_child(fragment_60);
												{
													let $0$1 = user_derived(() => $submitting() && $form().action_name === "delete" && $form().action_value === id_grid().toString());
													Spinner(node_52, {
														get loading() {
															return get($0$1);
														},
														children: ($$anchor$8, $$slotProps$3) => {
															Icon($$anchor$8, { icon: "mdi:trash-can" });
														},
														$$slots: { default: true }
													});
												}
												var text_13 = sibling(node_52);
												template_effect(($0$1) => set_text(text_13, ` ${$0$1 ?? ""}`), [() => _("Delete grid")]);
												append($$anchor$7, fragment_60);
											},
											$$slots: { default: true }
										});
									}
									append($$anchor$6, fragment_57);
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
			var fragment_62 = comment();
			component(first_child(fragment_62), () => Alert, ($$anchor$3, Alert_Root) => {
				Alert_Root($$anchor$3, {
					children: ($$anchor$4, $$slotProps) => {
						var fragment_63 = root_64();
						var node_54 = first_child(fragment_63);
						Icon(node_54, { icon: "ic:baseline-info" });
						var node_55 = sibling(node_54, 2);
						component(node_55, () => Alert_title, ($$anchor$5, Alert_Title) => {
							Alert_Title($$anchor$5, {
								children: ($$anchor$6, $$slotProps$1) => {
									next();
									var text_14 = text();
									template_effect(($0) => set_text(text_14, $0), [() => _("No grids found")]);
									append($$anchor$6, text_14);
								},
								$$slots: { default: true }
							});
						});
						component(sibling(node_55, 2), () => Alert_description, ($$anchor$5, Alert_Description) => {
							Alert_Description($$anchor$5, {
								children: ($$anchor$6, $$slotProps$1) => {
									next();
									var text_15 = text();
									template_effect(($0) => set_text(text_15, $0), [() => _("Click the button below to add a new grid")]);
									append($$anchor$6, text_15);
								},
								$$slots: { default: true }
							});
						});
						append($$anchor$4, fragment_63);
					},
					$$slots: { default: true }
				});
			});
			append($$anchor$2, fragment_62);
		});
		append($$anchor$1, fragment);
	});
	reset(div);
	component(sibling(div, 2), () => Card_footer, ($$anchor$1, Card_Footer_1) => {
		Card_Footer_1($$anchor$1, {
			class: "gap-2",
			children: ($$anchor$2, $$slotProps) => {
				var fragment_66 = root_67();
				var node_58 = first_child(fragment_66);
				Form_button(node_58, {
					class: "flex gap-2",
					name: "add",
					variant: "outline",
					children: ($$anchor$3, $$slotProps$1) => {
						var fragment_67 = root_68();
						var node_59 = first_child(fragment_67);
						{
							let $0 = user_derived(() => $submitting() && $form().action_name === "add");
							Spinner(node_59, {
								get loading() {
									return get($0);
								},
								children: ($$anchor$4, $$slotProps$2) => {
									Icon($$anchor$4, { icon: "mdi:plus" });
								},
								$$slots: { default: true }
							});
						}
						var text_16 = sibling(node_59);
						template_effect(($0) => set_text(text_16, ` ${$0 ?? ""}`), [() => _("Add grid")]);
						append($$anchor$3, fragment_67);
					},
					$$slots: { default: true }
				});
				var node_60 = sibling(node_58, 2);
				{
					let $0 = user_derived(() => _("Import grid from CSV"));
					Form_button(node_60, {
						class: "flex gap-2",
						onclick: () => get(import_file)?.click(),
						get title() {
							return get($0);
						},
						type: "button",
						variant: "outline",
						children: ($$anchor$3, $$slotProps$1) => {
							var fragment_69 = root_70();
							var node_61 = first_child(fragment_69);
							{
								let $0$1 = user_derived(() => $submitting() && $form().action_name === "import");
								Spinner(node_61, {
									get loading() {
										return get($0$1);
									},
									children: ($$anchor$4, $$slotProps$2) => {
										Icon($$anchor$4, { icon: "mdi:upload" });
									},
									$$slots: { default: true }
								});
							}
							var text_17 = sibling(node_61);
							template_effect(($0$1) => set_text(text_17, ` ${$0$1 ?? ""}`), [() => _("Import grid")]);
							append($$anchor$3, fragment_69);
						},
						$$slots: { default: true }
					});
				}
				var div_5 = sibling(node_60, 2);
				Input(child(div_5), {
					"data-testid": "import",
					accept: ".csv",
					onchange: (e) => {
						store_mutate(form, untrack($form).file = e.currentTarget.files?.[0], untrack($form));
						submit();
					},
					type: "file",
					get ref() {
						return get(import_file);
					},
					set ref($$value) {
						set(import_file, $$value, true);
					}
				});
				reset(div_5);
				append($$anchor$2, fragment_66);
			},
			$$slots: { default: true }
		});
	});
	reset(form_1);
	action(form_1, ($$node) => enhance?.($$node));
	action(form_1, ($$node) => navigate?.($$node));
	append($$anchor, form_1);
	pop();
	$$cleanup();
}
export { _page as component, _page_exports as universal };
