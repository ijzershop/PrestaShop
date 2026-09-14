import { B as html, Ct as set, Ft as push, G as if_block, Ht as next, L as component, N as action, Ot as user_derived, Pt as pop, R as snippet, Tt as state, Ut as reset, V as each, W as key, X as comment, Y as append, Z as from_html, Zt as __exportAll, bt as sibling, d as store_mutate, et as text, k as set_style, l as setup_stores, lt as untrack, ot as get, pt as template_effect, q as set_text, u as store_get, vt as child, xt as proxy, yt as first_child } from "../chunks/DUscB9kS.js";
import "../chunks/B_W7bg6n.js";
import { s as onNavigate } from "../chunks/D365qDux.js";
import { i as superForm, n as superValidate, t as valibot } from "../chunks/CPdJ2mnA.js";
import "../chunks/D-Alr120.js";
import "../chunks/CEFrIRjK.js";
import { t as browser } from "../chunks/DgeI1AN1.js";
import { a as form_action, n as buttonVariants, o as layout_load, r as cn } from "../chunks/BIEFGHhw.js";
import { r as url } from "../chunks/Crb1phnD.js";
import { n as toast } from "../chunks/CQQo25vS.js";
import "../chunks/CJDS8lnd.js";
import "../chunks/DAbnHPcz.js";
import { n as _, t as Icon } from "../chunks/DFl6Gq92.js";
import { n as page } from "../chunks/BRpqcTWk.js";
import "../chunks/_yKPJ4BA.js";
import { t as Label } from "../chunks/ClKKfzS1.js";
import { t as Switch } from "../chunks/CyNLp6ti.js";
import { a as Card_content, o as Card, r as Card_footer } from "../chunks/Bpx6gt8W.js";
import "../chunks/CgH3Vt0F.js";
import { n as Alert_description, r as Alert, t as Alert_title } from "../chunks/OMr53o_L.js";
import { t as Spinner } from "../chunks/C9eHbt79.js";
import { a as Dialog_content, c as Dialog_title, i as Dialog_description, n as Root, o as Dialog_header, r as Trigger } from "../chunks/Bc1vuzVu.js";
import { n as obj } from "../chunks/C961kT60.js";
import "../chunks/BirQbuIK.js";
import "../chunks/BAR_jctJ.js";
import "../chunks/CAZFn-OP.js";
import { t as highlight } from "../chunks/Dt-VaJa3.js";
import { a as CalculationItemType, n as getItemLabel, r as CalculationItemsFormSchema, t as getItemColor } from "../chunks/6qQCdF4o.js";
import { t as sort } from "../chunks/Bz4g0JZD.js";
import { n as Form_button } from "../chunks/C9E5Z7Ag.js";
import "../chunks/GxWY6lrD.js";
import { t as sortable } from "../chunks/cJTe3rpq.js";
/* empty css                 */
var _layout_exports = /* @__PURE__ */ __exportAll({ load: () => load }, 1);
const load = async (event) => {
	const { calculation_items, custom_calculation, conditions, field_formulas, intervals, grids, fields } = await layout_load(event, "/product/calculation");
	return {
		form: await superValidate({ calculation_items: obj(calculation_items) }, valibot(CalculationItemsFormSchema)),
		custom_calculation,
		conditions,
		field_formulas,
		intervals,
		grids,
		fields
	};
};
function invert(hex) {
	const r = parseInt(hex.slice(1, 3), 16);
	const g = parseInt(hex.slice(3, 5), 16);
	const b = parseInt(hex.slice(5, 7), 16);
	return (r * 299 + g * 587 + b * 114) / 1e3 > 125 ? "#000000" : "#ffffff";
}
var root_1$2 = from_html(`<span> </span>`);
var root_3$1 = from_html(`<span class="font-mono text-wrap leading-6 text-left"><span class="text-muted-foreground">IF(</span> <!> <span class="text-muted-foreground">)</span></span>`);
var root_4$2 = from_html(`<span> </span>`);
var root$4 = from_html(`<div class="w-full rounded-sm border p-2"><!></div>`);
function Condition($$anchor, $$props) {
	push($$props, true);
	let condition = user_derived(() => page.data.conditions[$$props.item.id_item] || { formula: "" });
	var div = root$4();
	let styles;
	var node = child(div);
	var consequent = ($$anchor$1) => {
		var span = root_1$2();
		var text$1 = child(span, true);
		reset(span);
		template_effect(() => set_text(text$1, get(condition).formula));
		append($$anchor$1, span);
	};
	var alternate_1 = ($$anchor$1) => {
		var fragment = comment();
		var node_1 = first_child(fragment);
		var consequent_1 = ($$anchor$2) => {
			var span_1 = root_3$1();
			html(sibling(child(span_1), 2), () => highlight(get(condition).formula));
			next(2);
			reset(span_1);
			append($$anchor$2, span_1);
		};
		var alternate = ($$anchor$2) => {
			var span_2 = root_4$2();
			var text_1 = child(span_2, true);
			reset(span_2);
			template_effect(($0) => set_text(text_1, $0), [() => _("No formula was configured yet")]);
			append($$anchor$2, span_2);
		};
		if_block(node_1, ($$render) => {
			if (get(condition).formula) $$render(consequent_1);
			else $$render(alternate, false);
		}, true);
		append($$anchor$1, fragment);
	};
	if_block(node, ($$render) => {
		if (!browser) $$render(consequent);
		else $$render(alternate_1, false);
	});
	reset(div);
	template_effect(($0) => styles = set_style(div, "", styles, $0), [() => ({ "border-color": getItemColor($$props.item.type) })]);
	append($$anchor, div);
	pop();
}
var root_1$1 = from_html(`<span> </span>`);
var root_3 = from_html(`<span class="font-mono text-wrap leading-6 text-left"><!></span>`);
var root_4$1 = from_html(`<span> </span>`);
var root$3 = from_html(`<div class="w-full rounded-sm border p-2"><!></div>`);
function FieldFormula($$anchor, $$props) {
	push($$props, true);
	let field_formula = user_derived(() => page.data.field_formulas[$$props.item.id_item] || { formula: "" });
	var div = root$3();
	let styles;
	var node = child(div);
	var consequent = ($$anchor$1) => {
		var span = root_1$1();
		var text$1 = child(span, true);
		reset(span);
		template_effect(() => set_text(text$1, get(field_formula).formula));
		append($$anchor$1, span);
	};
	var alternate_1 = ($$anchor$1) => {
		var fragment = comment();
		var node_1 = first_child(fragment);
		var consequent_1 = ($$anchor$2) => {
			var span_1 = root_3();
			html(child(span_1), () => highlight(get(field_formula).formula));
			reset(span_1);
			append($$anchor$2, span_1);
		};
		var alternate = ($$anchor$2) => {
			var span_2 = root_4$1();
			var text_1 = child(span_2, true);
			reset(span_2);
			template_effect(($0) => set_text(text_1, $0), [() => _("No formula was configured yet")]);
			append($$anchor$2, span_2);
		};
		if_block(node_1, ($$render) => {
			if (get(field_formula).formula) $$render(consequent_1);
			else $$render(alternate, false);
		}, true);
		append($$anchor$1, fragment);
	};
	if_block(node, ($$render) => {
		if (!browser) $$render(consequent);
		else $$render(alternate_1, false);
	});
	reset(div);
	template_effect(($0) => styles = set_style(div, "", styles, $0), [() => ({ "border-color": getItemColor($$props.item.type) })]);
	append($$anchor, div);
	pop();
}
var root_1 = from_html(`<div class="field-btn rounded-sm px-1"> </div>`);
var root$2 = from_html(`<div class="flex w-full gap-2 rounded-sm border p-2"></div>`);
function Interval($$anchor, $$props) {
	push($$props, true);
	let interval_fields = user_derived(() => page.data.intervals[$$props.item.id_item]?.interval_fields ?? []);
	let fields = user_derived(() => Object.values(get(interval_fields)).map((f) => page.data.fields[f.id_field]).filter((f) => !!f));
	var div = root$2();
	let styles;
	each(div, 21, () => get(fields), (field) => field.id, ($$anchor$1, field) => {
		var div_1 = root_1();
		var text$1 = child(div_1, true);
		reset(div_1);
		template_effect(() => set_text(text$1, get(field).name));
		append($$anchor$1, div_1);
	});
	reset(div);
	template_effect(($0) => styles = set_style(div, "", styles, $0), [() => ({ "border-color": getItemColor($$props.item.type) })]);
	append($$anchor, div);
	pop();
}
var root$1 = from_html(`<div class="flex w-full gap-2 rounded-sm border p-2"><div class="field-btn rounded-sm px-1"> </div></div>`);
function Grid($$anchor, $$props) {
	push($$props, true);
	let id_field_target = user_derived(() => page.data.grids[$$props.item.id_item]?.id_field_target);
	let field = user_derived(() => page.data.fields[get(id_field_target)]);
	var div = root$1();
	let styles;
	var div_1 = child(div);
	var text$1 = child(div_1, true);
	reset(div_1);
	reset(div);
	template_effect(($0) => {
		styles = set_style(div, "", styles, $0);
		set_text(text$1, get(field)?.name ?? "--");
	}, [() => ({ "border-color": getItemColor($$props.item.type) })]);
	append($$anchor, div);
	pop();
}
var root_2 = from_html(`<form><div class="grid w-full items-center gap-4"><div class="flex items-center space-x-2"><!> <!></div></div></form>`);
var root_12 = from_html(`<div class="rounded-sm p-2 text-center"> </div>`);
var root_13 = from_html(`<div class="flex w-full gap-2"><div class="flex w-[250px] items-center justify-center rounded-sm p-2 text-center"> </div> <!></div>`);
var root_8 = from_html(`<div class="absolute right-2 top-2 flex gap-2 opacity-0 transition-opacity group-hover:opacity-100"><!> <!></div> <!>`, 1);
var root_15 = from_html(`<!> <!> <!>`, 1);
var root_20 = from_html(`<!> `, 1);
var root_22 = from_html(`<!> <!>`, 1);
var root_25 = from_html(`<!> `, 1);
var root_26 = from_html(`<!> `, 1);
var root_27 = from_html(`<!> `, 1);
var root_28 = from_html(`<!> `, 1);
var root_21 = from_html(`<!> <div class="flex flex-col gap-2"><!> <!> <!> <!></div>`, 1);
var root_19 = from_html(`<!> <!>`, 1);
var root_4 = from_html(`<form id="form" method="POST"><div class="flex flex-col gap-4 p-4"><!></div> <!></form>`);
var root = from_html(`<div class="p-4"><!></div> <!> <!>`, 1);
function _layout($$anchor, $$props) {
	push($$props, true);
	const $form = () => store_get(form, "$form", $$stores);
	const $tainted = () => store_get(tainted, "$tainted", $$stores);
	const $submitting = () => store_get(submitting, "$submitting", $$stores);
	const [$$stores, $$cleanup] = setup_stores();
	const { form, enhance, submitting, tainted } = superForm($$props.data.form, {
		dataType: "json",
		SPA: true,
		validators: valibot(CalculationItemsFormSchema),
		resetForm: false,
		invalidateAll: false,
		async onSubmit({ cancel, submitter }) {
			const data = {
				action_name: submitter?.getAttribute("name") || "update",
				action_value: submitter?.getAttribute("value") || $form().action_value,
				calculation_items: Object.fromEntries(Object.values($form().calculation_items).filter((c) => Object.keys($tainted()?.calculation_items ?? {}).includes(c.id.toString())).map((c) => [c.id, c]))
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
				calculation_items: obj(res.calculation_items)
			}), { taint: false });
			if ($form().action_value) get(open)[+$form().action_value] = false;
			switch (data.action_name) {
				case "add":
					toast.success(_("Calculation item added successfully"));
					break;
				case "delete":
					toast.success(_("Calculation item deleted successfully"));
					break;
				case "update":
					toast.success(_("Calculation item updated successfully"));
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
			calculation_items: obj(res.calculation_items)
		}));
		tainted.set({});
		if (ev.oldIndex !== ev.newIndex) ev.item.remove();
		toast.success(_("Calculation items reordered successfully"));
	}
	let calculation_items = user_derived(() => sort($form().calculation_items));
	let ids = user_derived(() => get(calculation_items).map(({ id }) => id).join("-"));
	let custom_calculation = state(proxy($$props.data.custom_calculation));
	async function saveSettings() {
		await form_action({
			route: page.route.id,
			action: "save_settings",
			data: { custom_calculation: get(custom_calculation) }
		});
		toast.success(_("The settings have been updated"));
	}
	let open = state(false);
	onNavigate(() => {
		set(open, false);
	});
	let components = {
		[CalculationItemType.CONDITION_ITEM]: Condition,
		[CalculationItemType.FIELD_FORMULA_ITEM]: FieldFormula,
		[CalculationItemType.INTERVAL_ITEM]: Interval,
		[CalculationItemType.GRID_ITEM]: Grid
	};
	var fragment = root();
	var div = first_child(fragment);
	component(child(div), () => Card, ($$anchor$1, Card_Root) => {
		Card_Root($$anchor$1, {
			children: ($$anchor$2, $$slotProps) => {
				var fragment_1 = comment();
				component(first_child(fragment_1), () => Card_content, ($$anchor$3, Card_Content) => {
					Card_Content($$anchor$3, {
						children: ($$anchor$4, $$slotProps$1) => {
							var form_1 = root_2();
							var div_1 = child(form_1);
							var div_2 = child(div_1);
							var node_2 = child(div_2);
							Switch(node_2, {
								id: "custom_calculation",
								onCheckedChange: () => saveSettings(),
								get checked() {
									return get(custom_calculation);
								},
								set checked($$value) {
									set(custom_calculation, $$value, true);
								}
							});
							Label(sibling(node_2, 2), {
								for: "custom_calculation",
								children: ($$anchor$5, $$slotProps$2) => {
									next();
									var text$1 = text();
									template_effect(($0) => set_text(text$1, $0), [() => _("Use a custom calculation order")]);
									append($$anchor$5, text$1);
								},
								$$slots: { default: true }
							});
							reset(div_2);
							reset(div_1);
							reset(form_1);
							append($$anchor$4, form_1);
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
	var node_4 = sibling(div, 2);
	var consequent_1 = ($$anchor$1) => {
		var form_2 = root_4();
		var div_3 = child(form_2);
		key(child(div_3), () => get(ids), ($$anchor$2) => {
			var fragment_3 = comment();
			each(first_child(fragment_3), 17, () => get(calculation_items), (item) => item.id, ($$anchor$3, item) => {
				const computed_const = user_derived(() => {
					const { id } = get(item);
					return { id };
				});
				const Component = user_derived(() => components[get(item).type]);
				var fragment_4 = comment();
				component(first_child(fragment_4), () => Card, ($$anchor$4, Card_Root_1) => {
					Card_Root_1($$anchor$4, {
						class: "list-element",
						get "data-id"() {
							return get(computed_const).id;
						},
						children: ($$anchor$5, $$slotProps) => {
							var fragment_5 = comment();
							component(first_child(fragment_5), () => Card_content, ($$anchor$6, Card_Content_1) => {
								Card_Content_1($$anchor$6, {
									class: "group relative p-2",
									children: ($$anchor$7, $$slotProps$1) => {
										var fragment_6 = root_8();
										var div_4 = first_child(fragment_6);
										var node_9 = child(div_4);
										{
											let $0 = user_derived(() => cn(buttonVariants({
												variant: "ghost",
												size: "sm"
											}), "handle cursor-move"));
											let $1 = user_derived(() => _("Drag to reorder"));
											Label(node_9, {
												get class() {
													return get($0);
												},
												get title() {
													return get($1);
												},
												children: ($$anchor$8, $$slotProps$2) => {
													Icon($$anchor$8, { icon: "mdi:drag" });
												},
												$$slots: { default: true }
											});
										}
										var node_10 = sibling(node_9, 2);
										{
											let $0 = user_derived(() => _("Delete calculation item"));
											Form_button(node_10, {
												class: "flex gap-2",
												variant: "destructive",
												size: "sm",
												name: "delete",
												get value() {
													return get(computed_const).id;
												},
												get title() {
													return get($0);
												},
												onclick: (e) => {
													if (!confirm(_("Are you sure you want to delete this item?"))) e.preventDefault();
												},
												children: ($$anchor$8, $$slotProps$2) => {
													{
														let $0$1 = user_derived(() => $submitting() && $form().action_name === "delete" && $form().action_value === get(computed_const).id.toString());
														Spinner($$anchor$8, {
															get loading() {
																return get($0$1);
															},
															children: ($$anchor$9, $$slotProps$3) => {
																Icon($$anchor$9, { icon: "mdi:trash-can" });
															},
															$$slots: { default: true }
														});
													}
												},
												$$slots: { default: true }
											});
										}
										reset(div_4);
										var node_11 = sibling(div_4, 2);
										var consequent = ($$anchor$8) => {
											var div_5 = root_12();
											let styles;
											var text_1 = child(div_5, true);
											reset(div_5);
											template_effect(($0, $1) => {
												styles = set_style(div_5, "", styles, $0);
												set_text(text_1, $1);
											}, [() => ({
												"background-color": getItemColor(get(item).type),
												color: invert(getItemColor(get(item).type))
											}), () => getItemLabel(get(item))]);
											append($$anchor$8, div_5);
										};
										var alternate = ($$anchor$8) => {
											var div_6 = root_13();
											var div_7 = child(div_6);
											let styles_1;
											var text_2 = child(div_7, true);
											reset(div_7);
											component(sibling(div_7, 2), () => get(Component), ($$anchor$9, Component_1) => {
												Component_1($$anchor$9, { get item() {
													return get(item);
												} });
											});
											reset(div_6);
											template_effect(($0, $1) => {
												styles_1 = set_style(div_7, "", styles_1, $0);
												set_text(text_2, $1);
											}, [() => ({
												"background-color": getItemColor(get(item).type),
												color: invert(getItemColor(get(item).type))
											}), () => getItemLabel(get(item))]);
											append($$anchor$8, div_6);
										};
										if_block(node_11, ($$render) => {
											if (get(item).id_item === 0) $$render(consequent);
											else $$render(alternate, false);
										});
										append($$anchor$7, fragment_6);
									},
									$$slots: { default: true }
								});
							});
							append($$anchor$5, fragment_5);
						},
						$$slots: { default: true }
					});
				});
				append($$anchor$3, fragment_4);
			}, ($$anchor$3) => {
				var fragment_10 = comment();
				component(first_child(fragment_10), () => Alert, ($$anchor$4, Alert_Root) => {
					Alert_Root($$anchor$4, {
						children: ($$anchor$5, $$slotProps) => {
							var fragment_11 = root_15();
							var node_14 = first_child(fragment_11);
							Icon(node_14, { icon: "ic:baseline-info" });
							var node_15 = sibling(node_14, 2);
							component(node_15, () => Alert_title, ($$anchor$6, Alert_Title) => {
								Alert_Title($$anchor$6, {
									children: ($$anchor$7, $$slotProps$1) => {
										next();
										var text_3 = text();
										template_effect(($0) => set_text(text_3, $0), [() => _("No calculation items found")]);
										append($$anchor$7, text_3);
									},
									$$slots: { default: true }
								});
							});
							component(sibling(node_15, 2), () => Alert_description, ($$anchor$6, Alert_Description) => {
								Alert_Description($$anchor$6, {
									children: ($$anchor$7, $$slotProps$1) => {
										next();
										var text_4 = text();
										template_effect(($0) => set_text(text_4, $0), [() => _("Click the button below to add a calculation item")]);
										append($$anchor$7, text_4);
									},
									$$slots: { default: true }
								});
							});
							append($$anchor$5, fragment_11);
						},
						$$slots: { default: true }
					});
				});
				append($$anchor$3, fragment_10);
			});
			append($$anchor$2, fragment_3);
		});
		reset(div_3);
		action(div_3, ($$node, $$action_arg) => sortable?.($$node, $$action_arg), () => ({ onEnd }));
		component(sibling(div_3, 2), () => Card_footer, ($$anchor$2, Card_Footer) => {
			Card_Footer($$anchor$2, {
				children: ($$anchor$3, $$slotProps) => {
					var fragment_14 = comment();
					component(first_child(fragment_14), () => Root, ($$anchor$4, Dialog_Root) => {
						Dialog_Root($$anchor$4, {
							get open() {
								return get(open);
							},
							set open($$value) {
								set(open, $$value, true);
							},
							children: ($$anchor$5, $$slotProps$1) => {
								var fragment_15 = root_19();
								var node_19 = first_child(fragment_15);
								{
									let $0 = user_derived(() => buttonVariants({ variant: "outline" }));
									component(node_19, () => Trigger, ($$anchor$6, Dialog_Trigger) => {
										Dialog_Trigger($$anchor$6, {
											type: "button",
											get class() {
												return get($0);
											},
											children: ($$anchor$7, $$slotProps$2) => {
												var fragment_16 = root_20();
												var node_20 = first_child(fragment_16);
												Icon(node_20, { icon: "mdi:plus" });
												var text_5 = sibling(node_20);
												template_effect(($0$1) => set_text(text_5, ` ${$0$1 ?? ""}`), [() => _("Add calculation item")]);
												append($$anchor$7, fragment_16);
											},
											$$slots: { default: true }
										});
									});
								}
								component(sibling(node_19, 2), () => Dialog_content, ($$anchor$6, Dialog_Content) => {
									Dialog_Content($$anchor$6, {
										class: "w-auto max-w-none",
										children: ($$anchor$7, $$slotProps$2) => {
											var fragment_17 = root_21();
											var node_22 = first_child(fragment_17);
											component(node_22, () => Dialog_header, ($$anchor$8, Dialog_Header) => {
												Dialog_Header($$anchor$8, {
													children: ($$anchor$9, $$slotProps$3) => {
														var fragment_18 = root_22();
														var node_23 = first_child(fragment_18);
														component(node_23, () => Dialog_title, ($$anchor$10, Dialog_Title) => {
															Dialog_Title($$anchor$10, {
																children: ($$anchor$11, $$slotProps$4) => {
																	next();
																	var text_6 = text();
																	template_effect(($0) => set_text(text_6, $0), [() => _("Add calculation item")]);
																	append($$anchor$11, text_6);
																},
																$$slots: { default: true }
															});
														});
														component(sibling(node_23, 2), () => Dialog_description, ($$anchor$10, Dialog_Description) => {
															Dialog_Description($$anchor$10, {
																children: ($$anchor$11, $$slotProps$4) => {
																	next();
																	var text_7 = text();
																	template_effect(($0) => set_text(text_7, $0), [() => _("Select the item type then click the button below to add it")]);
																	append($$anchor$11, text_7);
																},
																$$slots: { default: true }
															});
														});
														append($$anchor$9, fragment_18);
													},
													$$slots: { default: true }
												});
											});
											var div_8 = sibling(node_22, 2);
											var node_25 = child(div_8);
											{
												let $0 = user_derived(() => url("/product/calculation/conditions"));
												let $1 = user_derived(() => getItemColor(CalculationItemType.CONDITION_ITEM));
												let $2 = user_derived(() => invert(getItemColor(CalculationItemType.CONDITION_ITEM)));
												Form_button(node_25, {
													get href() {
														return get($0);
													},
													"data-sveltekit-noscroll": true,
													get style() {
														return `
						background-color: ${get($1) ?? ""};
						color: ${get($2) ?? ""};
					`;
													},
													children: ($$anchor$8, $$slotProps$3) => {
														var fragment_21 = root_25();
														var node_26 = first_child(fragment_21);
														Icon(node_26, { icon: "ic:round-call-split" });
														var text_8 = sibling(node_26);
														template_effect(($0$1) => set_text(text_8, ` ${$0$1 ?? ""}`), [() => _("Conditions")]);
														append($$anchor$8, fragment_21);
													},
													$$slots: { default: true }
												});
											}
											var node_27 = sibling(node_25, 2);
											{
												let $0 = user_derived(() => url("/product/calculation/field-formulas"));
												let $1 = user_derived(() => getItemColor(CalculationItemType.FIELD_FORMULA_ITEM));
												let $2 = user_derived(() => invert(getItemColor(CalculationItemType.FIELD_FORMULA_ITEM)));
												Form_button(node_27, {
													get href() {
														return get($0);
													},
													"data-sveltekit-noscroll": true,
													get style() {
														return `
						background-color: ${get($1) ?? ""};
						color: ${get($2) ?? ""};
					`;
													},
													children: ($$anchor$8, $$slotProps$3) => {
														var fragment_22 = root_26();
														var node_28 = first_child(fragment_22);
														Icon(node_28, { icon: "ic:round-functions" });
														var text_9 = sibling(node_28);
														template_effect(($0$1) => set_text(text_9, ` ${$0$1 ?? ""}`), [() => _("Field formulas")]);
														append($$anchor$8, fragment_22);
													},
													$$slots: { default: true }
												});
											}
											var node_29 = sibling(node_27, 2);
											{
												let $0 = user_derived(() => url("/product/calculation/intervals"));
												let $1 = user_derived(() => getItemColor(CalculationItemType.INTERVAL_ITEM));
												let $2 = user_derived(() => invert(getItemColor(CalculationItemType.INTERVAL_ITEM)));
												Form_button(node_29, {
													get href() {
														return get($0);
													},
													"data-sveltekit-noscroll": true,
													get style() {
														return `
						background-color: ${get($1) ?? ""};
						color: ${get($2) ?? ""};
					`;
													},
													children: ($$anchor$8, $$slotProps$3) => {
														var fragment_23 = root_27();
														var node_30 = first_child(fragment_23);
														Icon(node_30, { icon: "ic:round-timeline" });
														var text_10 = sibling(node_30);
														template_effect(($0$1) => set_text(text_10, ` ${$0$1 ?? ""}`), [() => _("Intervals")]);
														append($$anchor$8, fragment_23);
													},
													$$slots: { default: true }
												});
											}
											var node_31 = sibling(node_29, 2);
											{
												let $0 = user_derived(() => url("/product/calculation/grids"));
												let $1 = user_derived(() => getItemColor(CalculationItemType.GRID_ITEM));
												let $2 = user_derived(() => invert(getItemColor(CalculationItemType.GRID_ITEM)));
												Form_button(node_31, {
													get href() {
														return get($0);
													},
													"data-sveltekit-noscroll": true,
													get style() {
														return `
						background-color: ${get($1) ?? ""};
						color: ${get($2) ?? ""};
					`;
													},
													children: ($$anchor$8, $$slotProps$3) => {
														var fragment_24 = root_28();
														var node_32 = first_child(fragment_24);
														Icon(node_32, { icon: "ic:round-view-comfy" });
														var text_11 = sibling(node_32);
														template_effect(($0$1) => set_text(text_11, ` ${$0$1 ?? ""}`), [() => _("Grids")]);
														append($$anchor$8, fragment_24);
													},
													$$slots: { default: true }
												});
											}
											reset(div_8);
											append($$anchor$7, fragment_17);
										},
										$$slots: { default: true }
									});
								});
								append($$anchor$5, fragment_15);
							},
							$$slots: { default: true }
						});
					});
					append($$anchor$3, fragment_14);
				},
				$$slots: { default: true }
			});
		});
		reset(form_2);
		action(form_2, ($$node) => enhance?.($$node));
		append($$anchor$1, form_2);
	};
	if_block(node_4, ($$render) => {
		if (get(custom_calculation)) $$render(consequent_1);
	});
	snippet(sibling(node_4, 2), () => $$props.children);
	append($$anchor, fragment);
	pop();
	$$cleanup();
}
export { _layout as component, _layout_exports as universal };
