import { Ct as set, Ft as push, G as if_block, Ht as next, L as component, N as action, Ot as user_derived, Pt as pop, Tt as state, Ut as reset, V as each, X as comment, Y as append, Z as from_html, Zt as __exportAll, bt as sibling, c as spread_props, ct as tick, d as store_mutate, et as text, l as setup_stores, lt as untrack, ot as get, pt as template_effect, q as set_text, qt as to_array, u as store_get, vt as child, yt as first_child } from "../chunks/DUscB9kS.js";
import "../chunks/B_W7bg6n.js";
import "../chunks/D365qDux.js";
import { i as superForm, n as superValidate, t as valibot } from "../chunks/CPdJ2mnA.js";
import "../chunks/D-Alr120.js";
import "../chunks/CEFrIRjK.js";
import { a as form_action, f as dpa, l as redirect, n as buttonVariants, r as cn, s as page_load, t as Button, u as upload_files } from "../chunks/BIEFGHhw.js";
import { r as url } from "../chunks/Crb1phnD.js";
import { n as toast } from "../chunks/CQQo25vS.js";
import "../chunks/CJDS8lnd.js";
import "../chunks/DAbnHPcz.js";
import { n as _, t as Icon } from "../chunks/DFl6Gq92.js";
import { n as page } from "../chunks/BRpqcTWk.js";
import "../chunks/_yKPJ4BA.js";
import { t as Checkbox } from "../chunks/CX3fpb_g.js";
import { a as Command_empty, i as Command_group, n as Command_input, o as Command, r as Command_item, t as Command_list } from "../chunks/CdsT4L5B.js";
import { i as Popover_content, n as Root, r as Trigger } from "../chunks/CCOnoN-X.js";
import { t as Label } from "../chunks/ClKKfzS1.js";
import { t as Progress } from "../chunks/BO7Cdi-m.js";
import { a as Card_content, n as Card_header, o as Card, r as Card_footer, t as Card_title } from "../chunks/Bpx6gt8W.js";
import "../chunks/CgH3Vt0F.js";
import { n as Alert_description, r as Alert, t as Alert_title } from "../chunks/OMr53o_L.js";
import { d as optional, g as string, l as number, o as instance, r as boolean, u as object } from "../chunks/Da0rmiev.js";
import { t as Spinner } from "../chunks/C9eHbt79.js";
import { a as Dialog_content, c as Dialog_title, i as Dialog_description, n as Root$1, o as Dialog_header, r as Trigger$1, s as Dialog_footer } from "../chunks/Bc1vuzVu.js";
import { t as Input } from "../chunks/D2YUxW8P.js";
const ImportExportSchema = object({
	action_name: string(),
	action_value: string(),
	id_source_product: string(),
	link_product_config: boolean(),
	clear_current_config: boolean(),
	clear_existing_items: optional(boolean(), true),
	options: object({
		settings: optional(boolean(), true),
		fields: optional(boolean(), true),
		calculation_order: optional(boolean(), true),
		equations: optional(boolean(), true),
		conditions: optional(boolean(), true),
		combination_values: optional(boolean(), true),
		combinations_visibility: optional(boolean(), true),
		field_formulas: optional(boolean(), true),
		intervals: optional(boolean(), true),
		grids: optional(boolean(), true),
		groups: optional(boolean(), true),
		steps: optional(boolean(), true)
	}),
	id_target_category: string(),
	link_category_config: boolean(),
	clear_linked_products: boolean(),
	next: optional(number(), 0),
	progress: optional(number(), 0),
	progress_str: string(),
	file: optional(instance(File)),
	link_images: optional(boolean(), true)
});
var _page_exports = /* @__PURE__ */ __exportAll({ load: () => load }, 1);
const load = async (event) => {
	const { active_products, categories } = await page_load(event);
	return {
		form: await superValidate({}, valibot(ImportExportSchema)),
		active_products,
		categories
	};
};
var root_8$1 = from_html(` <!>`, 1);
var root_15$1 = from_html(`<!> `, 1);
var root_11$1 = from_html(`<!> <!>`, 1);
var root_10$1 = from_html(`<!> <!>`, 1);
var root_6$1 = from_html(`<!> <!>`, 1);
var root_17$1 = from_html(`<div class="flex items-center space-x-2"><!> <!></div>`);
var root_4$3 = from_html(`<div class="flex flex-col gap-6"><div class="flex w-full flex-col gap-1.5"><!> <!></div> <div class="flex items-center space-x-2"><!> <!></div> <!></div>`);
var root_21 = from_html(`<!> `, 1);
var root_25$1 = from_html(`<!> `, 1);
var root_27$1 = from_html(`<!> <!>`, 1);
var root_32 = from_html(`<div class="flex items-center space-x-2"><!> <!></div>`);
var root_35$1 = from_html(`<!> `, 1);
var root_26$1 = from_html(`<!> <div class="grid gap-4 py-4"><div class="flex items-center space-x-2"><!> <!></div> <hr/> <div class="flex items-center space-x-2"><!> <!></div> <div class="flex flex-col gap-4 pl-4"></div></div> <!>`, 1);
var root_24 = from_html(`<!> <!>`, 1);
var root_1$4 = from_html(`<!> <!> <!>`, 1);
function LoadProduct($$anchor, $$props) {
	push($$props, true);
	const $form = () => store_get(form, "$form", $$stores);
	const $submitting = () => store_get(submitting, "$submitting", $$stores);
	const [$$stores, $$cleanup] = setup_stores();
	let { form, submitting } = $$props.superform;
	const options = {
		settings: _("Settings"),
		fields: _("Fields"),
		calculation_order: _("Calculation"),
		equations: _("Formulas"),
		conditions: _("Conditions"),
		combination_values: _("Combination Values"),
		combinations_visibility: _("Combination Visibility"),
		field_formulas: _("Field Formulas"),
		intervals: _("Intervals"),
		grids: _("Grids"),
		groups: _("Groups"),
		steps: _("Steps")
	};
	let open = state(false);
	let list_open = state(false);
	let triggerRef = state(null);
	function closeAndFocusTrigger() {
		set(list_open, false);
		tick().then(() => {
			get(triggerRef).focus();
		});
	}
	const by_value = Object.fromEntries(Object.values($$props.active_products).map((t) => [t.id_product, t.label]));
	function filter(value, search) {
		return by_value[value]?.toLowerCase().includes(search?.toLowerCase()) ? 1 : 0;
	}
	var fragment = comment();
	component(first_child(fragment), () => Card, ($$anchor$1, Card_Root) => {
		Card_Root($$anchor$1, {
			children: ($$anchor$2, $$slotProps) => {
				var fragment_1 = root_1$4();
				var node_1 = first_child(fragment_1);
				component(node_1, () => Card_header, ($$anchor$3, Card_Header) => {
					Card_Header($$anchor$3, {
						children: ($$anchor$4, $$slotProps$1) => {
							var fragment_2 = comment();
							component(first_child(fragment_2), () => Card_title, ($$anchor$5, Card_Title) => {
								Card_Title($$anchor$5, {
									children: ($$anchor$6, $$slotProps$2) => {
										next();
										var text$1 = text();
										template_effect(($0) => set_text(text$1, $0), [() => _("Import a product configuration")]);
										append($$anchor$6, text$1);
									},
									$$slots: { default: true }
								});
							});
							append($$anchor$4, fragment_2);
						},
						$$slots: { default: true }
					});
				});
				var node_3 = sibling(node_1, 2);
				component(node_3, () => Card_content, ($$anchor$3, Card_Content) => {
					Card_Content($$anchor$3, {
						children: ($$anchor$4, $$slotProps$1) => {
							var div = root_4$3();
							var div_1 = child(div);
							var node_4 = child(div_1);
							Label(node_4, {
								for: "displayed_price",
								children: ($$anchor$5, $$slotProps$2) => {
									next();
									var text_1 = text();
									template_effect(($0) => set_text(text_1, $0), [() => _("Source product")]);
									append($$anchor$5, text_1);
								},
								$$slots: { default: true }
							});
							component(sibling(node_4, 2), () => Root, ($$anchor$5, Popover_Root) => {
								Popover_Root($$anchor$5, {
									get open() {
										return get(list_open);
									},
									set open($$value) {
										set(list_open, $$value, true);
									},
									children: ($$anchor$6, $$slotProps$2) => {
										var fragment_5 = root_6$1();
										var node_6 = first_child(fragment_5);
										{
											const child$1 = ($$anchor$7, $$arg0) => {
												let props = () => $$arg0?.().props;
												Button($$anchor$7, spread_props({
													variant: "outline",
													class: "w-[200px] justify-between"
												}, props, {
													role: "combobox",
													get "aria-expanded"() {
														return get(list_open);
													},
													children: ($$anchor$8, $$slotProps$3) => {
														next();
														var fragment_7 = root_8$1();
														var text_2 = first_child(fragment_7);
														Icon(sibling(text_2), {
															icon: "ic:round-keyboard-arrow-down",
															class: "ml-2 size-4 shrink-0 opacity-50"
														});
														template_effect(($0) => set_text(text_2, `${$0 ?? ""} `), [() => $$props.active_products[$form().id_source_product]?.label || _("Select a product")]);
														append($$anchor$8, fragment_7);
													},
													$$slots: { default: true }
												}));
											};
											component(node_6, () => Trigger, ($$anchor$7, Popover_Trigger) => {
												Popover_Trigger($$anchor$7, {
													class: "w-[300px]",
													get ref() {
														return get(triggerRef);
													},
													set ref($$value) {
														set(triggerRef, $$value, true);
													},
													child: child$1,
													$$slots: { child: true }
												});
											});
										}
										component(sibling(node_6, 2), () => Popover_content, ($$anchor$7, Popover_Content) => {
											Popover_Content($$anchor$7, {
												class: "w-[300px] p-0",
												children: ($$anchor$8, $$slotProps$3) => {
													var fragment_8 = comment();
													component(first_child(fragment_8), () => Command, ($$anchor$9, Command_Root) => {
														Command_Root($$anchor$9, {
															filter,
															children: ($$anchor$10, $$slotProps$4) => {
																var fragment_9 = root_10$1();
																var node_10 = first_child(fragment_9);
																{
																	let $0 = user_derived(() => _("Search products..."));
																	component(node_10, () => Command_input, ($$anchor$11, Command_Input) => {
																		Command_Input($$anchor$11, { get placeholder() {
																			return get($0);
																		} });
																	});
																}
																component(sibling(node_10, 2), () => Command_list, ($$anchor$11, Command_List) => {
																	Command_List($$anchor$11, {
																		children: ($$anchor$12, $$slotProps$5) => {
																			var fragment_10 = root_11$1();
																			var node_12 = first_child(fragment_10);
																			component(node_12, () => Command_empty, ($$anchor$13, Command_Empty) => {
																				Command_Empty($$anchor$13, {
																					children: ($$anchor$14, $$slotProps$6) => {
																						next();
																						var text_3 = text();
																						template_effect(($0) => set_text(text_3, $0), [() => _("No matching products found.")]);
																						append($$anchor$14, text_3);
																					},
																					$$slots: { default: true }
																				});
																			});
																			component(sibling(node_12, 2), () => Command_group, ($$anchor$13, Command_Group) => {
																				Command_Group($$anchor$13, {
																					children: ($$anchor$14, $$slotProps$6) => {
																						var fragment_12 = comment();
																						each(first_child(fragment_12), 17, () => Object.values($$props.active_products).filter((p) => p.id_product !== dpa.id_product), ({ id_product, label }) => id_product, ($$anchor$15, $$item) => {
																							let id_product = () => get($$item).id_product;
																							let label = () => get($$item).label;
																							var fragment_13 = comment();
																							var node_15 = first_child(fragment_13);
																							{
																								let $0 = user_derived(() => id_product().toString());
																								component(node_15, () => Command_item, ($$anchor$16, Command_Item) => {
																									Command_Item($$anchor$16, {
																										get value() {
																											return get($0);
																										},
																										class: "cursor-pointer",
																										onSelect: () => {
																											store_mutate(form, untrack($form).id_source_product = id_product().toString(), untrack($form));
																											closeAndFocusTrigger();
																										},
																										children: ($$anchor$17, $$slotProps$7) => {
																											var fragment_14 = root_15$1();
																											var node_16 = first_child(fragment_14);
																											{
																												let $0$1 = user_derived(() => cn("mr-2 size-4", id_product().toString() !== $form().id_source_product && "text-transparent"));
																												Icon(node_16, {
																													icon: "ic:check",
																													get class() {
																														return get($0$1);
																													}
																												});
																											}
																											var text_4 = sibling(node_16);
																											template_effect(() => set_text(text_4, ` ${label() ?? ""}`));
																											append($$anchor$17, fragment_14);
																										},
																										$$slots: { default: true }
																									});
																								});
																							}
																							append($$anchor$15, fragment_13);
																						});
																						append($$anchor$14, fragment_12);
																					},
																					$$slots: { default: true }
																				});
																			});
																			append($$anchor$12, fragment_10);
																		},
																		$$slots: { default: true }
																	});
																});
																append($$anchor$10, fragment_9);
															},
															$$slots: { default: true }
														});
													});
													append($$anchor$8, fragment_8);
												},
												$$slots: { default: true }
											});
										});
										append($$anchor$6, fragment_5);
									},
									$$slots: { default: true }
								});
							});
							reset(div_1);
							var div_2 = sibling(div_1, 2);
							var node_17 = child(div_2);
							Checkbox(node_17, {
								"aria-labelledby": "link_product_config",
								id: "link_product_config-checkbox",
								get checked() {
									return $form().link_product_config;
								},
								set checked($$value) {
									store_mutate(form, untrack($form).link_product_config = $$value, untrack($form));
								}
							});
							Label(sibling(node_17, 2), {
								class: "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
								for: "link_product_config-checkbox",
								id: "link_product_config",
								children: ($$anchor$5, $$slotProps$2) => {
									next();
									var text_5 = text();
									template_effect(($0) => set_text(text_5, $0), [() => _("Link instead of copying")]);
									append($$anchor$5, text_5);
								},
								$$slots: { default: true }
							});
							reset(div_2);
							var node_19 = sibling(div_2, 2);
							var consequent = ($$anchor$5) => {
								var div_3 = root_17$1();
								var node_20 = child(div_3);
								Checkbox(node_20, {
									"aria-labelledby": "clear_current_config",
									id: "clear_current_config-checkbox",
									get checked() {
										return $form().clear_current_config;
									},
									set checked($$value) {
										store_mutate(form, untrack($form).clear_current_config = $$value, untrack($form));
									}
								});
								Label(sibling(node_20, 2), {
									class: "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
									for: "clear_current_config-checkbox",
									id: "clear_current_config",
									children: ($$anchor$6, $$slotProps$2) => {
										next();
										var text_6 = text();
										template_effect(($0) => set_text(text_6, $0), [() => _("Clear the current configuration")]);
										append($$anchor$6, text_6);
									},
									$$slots: { default: true }
								});
								reset(div_3);
								append($$anchor$5, div_3);
							};
							if_block(node_19, ($$render) => {
								if ($form().link_product_config) $$render(consequent);
							});
							reset(div);
							append($$anchor$4, div);
						},
						$$slots: { default: true }
					});
				});
				component(sibling(node_3, 2), () => Card_footer, ($$anchor$3, Card_Footer) => {
					Card_Footer($$anchor$3, {
						class: "flex gap-2",
						children: ($$anchor$4, $$slotProps$1) => {
							var fragment_17 = comment();
							var node_23 = first_child(fragment_17);
							var consequent_1 = ($$anchor$5) => {
								Button($$anchor$5, {
									class: "flex gap-2",
									name: "load_product_config",
									type: "submit",
									onclick: (e) => {
										if (!confirm(_("The current configuration will be overwritten, continue?"))) e.preventDefault();
									},
									children: ($$anchor$6, $$slotProps$2) => {
										var fragment_19 = root_21();
										var node_24 = first_child(fragment_19);
										{
											let $0 = user_derived(() => $submitting() && $form().action_name === "load_product_config");
											Spinner(node_24, {
												get loading() {
													return get($0);
												},
												children: ($$anchor$7, $$slotProps$3) => {
													Icon($$anchor$7, { icon: "ic:baseline-insert-link" });
												},
												$$slots: { default: true }
											});
										}
										var text_7 = sibling(node_24);
										template_effect(($0) => set_text(text_7, ` ${$0 ?? ""}`), [() => _("Link configuration")]);
										append($$anchor$6, fragment_19);
									},
									$$slots: { default: true }
								});
							};
							var alternate = ($$anchor$5) => {
								var fragment_21 = comment();
								component(first_child(fragment_21), () => Root$1, ($$anchor$6, Dialog_Root) => {
									Dialog_Root($$anchor$6, {
										onOpenChange: (o) => {
											if (o && !$form().id_source_product) {
												toast.error(_("Please select a source product."));
												set(open, false);
											}
										},
										get open() {
											return get(open);
										},
										set open($$value) {
											set(open, $$value, true);
										},
										children: ($$anchor$7, $$slotProps$2) => {
											var fragment_22 = root_24();
											var node_26 = first_child(fragment_22);
											{
												let $0 = user_derived(buttonVariants);
												component(node_26, () => Trigger$1, ($$anchor$8, Dialog_Trigger) => {
													Dialog_Trigger($$anchor$8, {
														type: "button",
														get class() {
															return get($0);
														},
														children: ($$anchor$9, $$slotProps$3) => {
															var fragment_23 = root_25$1();
															var node_27 = first_child(fragment_23);
															Icon(node_27, { icon: "ic:baseline-content-copy" });
															var text_8 = sibling(node_27);
															template_effect(($0$1) => set_text(text_8, ` ${$0$1 ?? ""}`), [() => _("Copy configuration")]);
															append($$anchor$9, fragment_23);
														},
														$$slots: { default: true }
													});
												});
											}
											component(sibling(node_26, 2), () => Dialog_content, ($$anchor$8, Dialog_Content) => {
												Dialog_Content($$anchor$8, {
													children: ($$anchor$9, $$slotProps$3) => {
														var fragment_24 = root_26$1();
														var node_29 = first_child(fragment_24);
														component(node_29, () => Dialog_header, ($$anchor$10, Dialog_Header) => {
															Dialog_Header($$anchor$10, {
																children: ($$anchor$11, $$slotProps$4) => {
																	var fragment_25 = root_27$1();
																	var node_30 = first_child(fragment_25);
																	component(node_30, () => Dialog_title, ($$anchor$12, Dialog_Title) => {
																		Dialog_Title($$anchor$12, {
																			children: ($$anchor$13, $$slotProps$5) => {
																				next();
																				var text_9 = text();
																				template_effect(($0) => set_text(text_9, $0), [() => _("Copy configuration")]);
																				append($$anchor$13, text_9);
																			},
																			$$slots: { default: true }
																		});
																	});
																	component(sibling(node_30, 2), () => Dialog_description, ($$anchor$12, Dialog_Description) => {
																		Dialog_Description($$anchor$12, {
																			children: ($$anchor$13, $$slotProps$5) => {
																				next();
																				var text_10 = text();
																				template_effect(($0) => set_text(text_10, $0), [() => _("Please select the elements you want to copy from the source product.")]);
																				append($$anchor$13, text_10);
																			},
																			$$slots: { default: true }
																		});
																	});
																	append($$anchor$11, fragment_25);
																},
																$$slots: { default: true }
															});
														});
														var div_4 = sibling(node_29, 2);
														var div_5 = child(div_4);
														var node_32 = child(div_5);
														Checkbox(node_32, {
															"aria-labelledby": "clear_existing_items",
															id: "clear_existing_items-checkbox",
															get checked() {
																return $form().clear_existing_items;
															},
															set checked($$value) {
																store_mutate(form, untrack($form).clear_existing_items = $$value, untrack($form));
															}
														});
														Label(sibling(node_32, 2), {
															class: "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
															for: "clear_existing_items-checkbox",
															id: "clear_existing_items",
															children: ($$anchor$10, $$slotProps$4) => {
																next();
																var text_11 = text();
																template_effect(($0) => set_text(text_11, $0), [() => _("Clear existing elements before copying")]);
																append($$anchor$10, text_11);
															},
															$$slots: { default: true }
														});
														reset(div_5);
														var div_6 = sibling(div_5, 4);
														var node_34 = child(div_6);
														{
															let $0 = user_derived(() => Object.values($form().options).every((v) => v));
															let $1 = user_derived(() => Object.values($form().options).filter((v) => v).length > 0 && Object.values($form().options).filter((v) => !v).length > 0);
															Checkbox(node_34, {
																"aria-labelledby": "all",
																id: "all-checkbox",
																get checked() {
																	return get($0);
																},
																get indeterminate() {
																	return get($1);
																},
																onCheckedChange: (checked) => {
																	Object.keys($form().options).forEach((key) => store_mutate(form, untrack($form).options[key] = checked, untrack($form)));
																}
															});
														}
														Label(sibling(node_34, 2), {
															class: "cursor-pointer text-sm font-medium leading-none underline peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
															for: "all-checkbox",
															id: "all",
															children: ($$anchor$10, $$slotProps$4) => {
																next();
																var text_12 = text();
																template_effect(($0) => set_text(text_12, $0), [() => _("Select All")]);
																append($$anchor$10, text_12);
															},
															$$slots: { default: true }
														});
														reset(div_6);
														var div_7 = sibling(div_6, 2);
														each(div_7, 21, () => Object.entries(options), ([name, label]) => name, ($$anchor$10, $$item) => {
															var $$array = user_derived(() => to_array(get($$item), 2));
															let name = () => get($$array)[0];
															let label = () => get($$array)[1];
															var div_8 = root_32();
															var node_36 = child(div_8);
															Checkbox(node_36, {
																get "aria-labelledby"() {
																	return name();
																},
																get id() {
																	return `${name() ?? ""}-checkbox`;
																},
																get checked() {
																	return $form().options[name()];
																},
																set checked($$value) {
																	store_mutate(form, untrack($form).options[name()] = $$value, untrack($form));
																}
															});
															Label(sibling(node_36, 2), {
																class: "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
																get for() {
																	return `${name() ?? ""}-checkbox`;
																},
																get id() {
																	return name();
																},
																children: ($$anchor$11, $$slotProps$4) => {
																	next();
																	var text_13 = text();
																	template_effect(() => set_text(text_13, label()));
																	append($$anchor$11, text_13);
																},
																$$slots: { default: true }
															});
															reset(div_8);
															append($$anchor$10, div_8);
														});
														reset(div_7);
														reset(div_4);
														component(sibling(div_4, 2), () => Dialog_footer, ($$anchor$10, Dialog_Footer) => {
															Dialog_Footer($$anchor$10, {
																children: ($$anchor$11, $$slotProps$4) => {
																	Button($$anchor$11, {
																		type: "submit",
																		name: "load_product_config",
																		form: "copy-configuration",
																		children: ($$anchor$12, $$slotProps$5) => {
																			var fragment_32 = root_35$1();
																			var node_39 = first_child(fragment_32);
																			{
																				let $0 = user_derived(() => $submitting() && $form().action_name === "load_product_config");
																				Spinner(node_39, {
																					get loading() {
																						return get($0);
																					},
																					children: ($$anchor$13, $$slotProps$6) => {
																						Icon($$anchor$13, { icon: "ic:baseline-get-app" });
																					},
																					$$slots: { default: true }
																				});
																			}
																			var text_14 = sibling(node_39);
																			template_effect(($0) => set_text(text_14, ` ${$0 ?? ""}`), [() => _("Copy configuration")]);
																			append($$anchor$12, fragment_32);
																		},
																		$$slots: { default: true }
																	});
																},
																$$slots: { default: true }
															});
														});
														append($$anchor$9, fragment_24);
													},
													$$slots: { default: true }
												});
											});
											append($$anchor$7, fragment_22);
										},
										$$slots: { default: true }
									});
								});
								append($$anchor$5, fragment_21);
							};
							if_block(node_23, ($$render) => {
								if ($form().link_product_config) $$render(consequent_1);
								else $$render(alternate, false);
							});
							append($$anchor$4, fragment_17);
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
var root_8 = from_html(` <!>`, 1);
var root_15 = from_html(`<!> `, 1);
var root_11 = from_html(`<!> <!>`, 1);
var root_10 = from_html(`<!> <!>`, 1);
var root_6 = from_html(`<!> <!>`, 1);
var root_19 = from_html(` <br/> `, 1);
var root_17 = from_html(`<!> <!> <!>`, 1);
var root_4$2 = from_html(`<div class="flex flex-col gap-6"><div class="flex w-full flex-col gap-1.5"><!> <!></div> <div class="flex items-center space-x-2"><!> <!></div> <!></div>`);
var root_22 = from_html(`<!> `, 1);
var root_26 = from_html(`<!> `, 1);
var root_28 = from_html(`<!> <!>`, 1);
var root_33 = from_html(`<div class="flex items-center space-x-2"><!> <!></div>`);
var root_36 = from_html(`<!> <!>`, 1);
var root_35 = from_html(`<div class="flex w-full flex-col gap-4"><!> <!></div>`);
var root_27 = from_html(`<!> <div class="grid gap-4 py-4"><div class="flex items-center space-x-2"><!> <!></div> <hr/> <div class="flex items-center space-x-2"><!> <!></div> <div class="flex flex-col gap-4 pl-4"></div></div> <!>`, 1);
var root_25 = from_html(`<!> <!>`, 1);
var root_1$3 = from_html(`<!> <!> <!>`, 1);
function LinkCategory($$anchor, $$props) {
	push($$props, true);
	const $form = () => store_get(form, "$form", $$stores);
	const $tainted = () => store_get(tainted, "$tainted", $$stores);
	const $submitting = () => store_get(submitting, "$submitting", $$stores);
	const [$$stores, $$cleanup] = setup_stores();
	let { form, tainted, submitting } = $$props.superform;
	const options = {
		settings: _("Settings"),
		fields: _("Fields"),
		calculation_order: _("Calculation"),
		equations: _("Formulas"),
		conditions: _("Conditions"),
		combination_values: _("Combination Values"),
		combinations_visibility: _("Combination Visibility"),
		field_formulas: _("Field Formulas"),
		intervals: _("Intervals"),
		grids: _("Grids"),
		groups: _("Groups"),
		steps: _("Steps")
	};
	let open = state(false);
	let list_open = state(false);
	let triggerRef = state(null);
	function closeAndFocusTrigger() {
		set(list_open, false);
		tick().then(() => {
			get(triggerRef).focus();
		});
	}
	const by_value = Object.fromEntries(Object.values($$props.categories).map((t) => [t.id_category, t.name]));
	function filter(value, search) {
		return by_value[value]?.toLowerCase().includes(search?.toLowerCase()) ? 1 : 0;
	}
	var fragment = comment();
	component(first_child(fragment), () => Card, ($$anchor$1, Card_Root) => {
		Card_Root($$anchor$1, {
			children: ($$anchor$2, $$slotProps) => {
				var fragment_1 = root_1$3();
				var node_1 = first_child(fragment_1);
				component(node_1, () => Card_header, ($$anchor$3, Card_Header) => {
					Card_Header($$anchor$3, {
						children: ($$anchor$4, $$slotProps$1) => {
							var fragment_2 = comment();
							component(first_child(fragment_2), () => Card_title, ($$anchor$5, Card_Title) => {
								Card_Title($$anchor$5, {
									children: ($$anchor$6, $$slotProps$2) => {
										next();
										var text$1 = text();
										template_effect(($0) => set_text(text$1, $0), [() => _("Copy to a category")]);
										append($$anchor$6, text$1);
									},
									$$slots: { default: true }
								});
							});
							append($$anchor$4, fragment_2);
						},
						$$slots: { default: true }
					});
				});
				var node_3 = sibling(node_1, 2);
				component(node_3, () => Card_content, ($$anchor$3, Card_Content) => {
					Card_Content($$anchor$3, {
						children: ($$anchor$4, $$slotProps$1) => {
							var div = root_4$2();
							var div_1 = child(div);
							var node_4 = child(div_1);
							Label(node_4, {
								for: "displayed_price",
								children: ($$anchor$5, $$slotProps$2) => {
									next();
									var text_1 = text();
									template_effect(($0) => set_text(text_1, $0), [() => _("Target category")]);
									append($$anchor$5, text_1);
								},
								$$slots: { default: true }
							});
							component(sibling(node_4, 2), () => Root, ($$anchor$5, Popover_Root) => {
								Popover_Root($$anchor$5, {
									get open() {
										return get(list_open);
									},
									set open($$value) {
										set(list_open, $$value, true);
									},
									children: ($$anchor$6, $$slotProps$2) => {
										var fragment_5 = root_6();
										var node_6 = first_child(fragment_5);
										{
											const child$1 = ($$anchor$7, $$arg0) => {
												let props = () => $$arg0?.().props;
												Button($$anchor$7, spread_props({
													variant: "outline",
													class: "w-[200px] justify-between"
												}, props, {
													role: "combobox",
													get "aria-expanded"() {
														return get(list_open);
													},
													children: ($$anchor$8, $$slotProps$3) => {
														next();
														var fragment_7 = root_8();
														var text_2 = first_child(fragment_7);
														Icon(sibling(text_2), {
															icon: "ic:round-keyboard-arrow-down",
															class: "ml-2 size-4 shrink-0 opacity-50"
														});
														template_effect(($0) => set_text(text_2, `${$0 ?? ""} `), [() => $$props.categories[$form().id_target_category]?.name || _("Select a category")]);
														append($$anchor$8, fragment_7);
													},
													$$slots: { default: true }
												}));
											};
											component(node_6, () => Trigger, ($$anchor$7, Popover_Trigger) => {
												Popover_Trigger($$anchor$7, {
													class: "w-[300px]",
													get ref() {
														return get(triggerRef);
													},
													set ref($$value) {
														set(triggerRef, $$value, true);
													},
													child: child$1,
													$$slots: { child: true }
												});
											});
										}
										component(sibling(node_6, 2), () => Popover_content, ($$anchor$7, Popover_Content) => {
											Popover_Content($$anchor$7, {
												class: "w-[300px] p-0",
												children: ($$anchor$8, $$slotProps$3) => {
													var fragment_8 = comment();
													component(first_child(fragment_8), () => Command, ($$anchor$9, Command_Root) => {
														Command_Root($$anchor$9, {
															filter,
															children: ($$anchor$10, $$slotProps$4) => {
																var fragment_9 = root_10();
																var node_10 = first_child(fragment_9);
																{
																	let $0 = user_derived(() => _("Search categories..."));
																	component(node_10, () => Command_input, ($$anchor$11, Command_Input) => {
																		Command_Input($$anchor$11, { get placeholder() {
																			return get($0);
																		} });
																	});
																}
																component(sibling(node_10, 2), () => Command_list, ($$anchor$11, Command_List) => {
																	Command_List($$anchor$11, {
																		children: ($$anchor$12, $$slotProps$5) => {
																			var fragment_10 = root_11();
																			var node_12 = first_child(fragment_10);
																			component(node_12, () => Command_empty, ($$anchor$13, Command_Empty) => {
																				Command_Empty($$anchor$13, {
																					children: ($$anchor$14, $$slotProps$6) => {
																						next();
																						var text_3 = text();
																						template_effect(($0) => set_text(text_3, $0), [() => _("No matching categories found.")]);
																						append($$anchor$14, text_3);
																					},
																					$$slots: { default: true }
																				});
																			});
																			component(sibling(node_12, 2), () => Command_group, ($$anchor$13, Command_Group) => {
																				Command_Group($$anchor$13, {
																					children: ($$anchor$14, $$slotProps$6) => {
																						var fragment_12 = comment();
																						each(first_child(fragment_12), 17, () => Object.values($$props.categories), ({ id_category, name }) => id_category, ($$anchor$15, $$item) => {
																							let id_category = () => get($$item).id_category;
																							let name = () => get($$item).name;
																							var fragment_13 = comment();
																							var node_15 = first_child(fragment_13);
																							{
																								let $0 = user_derived(() => id_category().toString());
																								component(node_15, () => Command_item, ($$anchor$16, Command_Item) => {
																									Command_Item($$anchor$16, {
																										get value() {
																											return get($0);
																										},
																										class: "cursor-pointer",
																										onSelect: () => {
																											store_mutate(form, untrack($form).id_target_category = id_category().toString(), untrack($form));
																											closeAndFocusTrigger();
																										},
																										children: ($$anchor$17, $$slotProps$7) => {
																											var fragment_14 = root_15();
																											var node_16 = first_child(fragment_14);
																											{
																												let $0$1 = user_derived(() => cn("mr-2 size-4", id_category().toString() !== $form().id_target_category && "text-transparent"));
																												Icon(node_16, {
																													icon: "ic:check",
																													get class() {
																														return get($0$1);
																													}
																												});
																											}
																											var text_4 = sibling(node_16);
																											template_effect(() => set_text(text_4, ` ${name() ?? ""}`));
																											append($$anchor$17, fragment_14);
																										},
																										$$slots: { default: true }
																									});
																								});
																							}
																							append($$anchor$15, fragment_13);
																						});
																						append($$anchor$14, fragment_12);
																					},
																					$$slots: { default: true }
																				});
																			});
																			append($$anchor$12, fragment_10);
																		},
																		$$slots: { default: true }
																	});
																});
																append($$anchor$10, fragment_9);
															},
															$$slots: { default: true }
														});
													});
													append($$anchor$8, fragment_8);
												},
												$$slots: { default: true }
											});
										});
										append($$anchor$6, fragment_5);
									},
									$$slots: { default: true }
								});
							});
							reset(div_1);
							var div_2 = sibling(div_1, 2);
							var node_17 = child(div_2);
							Checkbox(node_17, {
								"aria-labelledby": "link_category_config",
								id: "link_category_config-checkbox",
								get checked() {
									return $form().link_category_config;
								},
								set checked($$value) {
									store_mutate(form, untrack($form).link_category_config = $$value, untrack($form));
								}
							});
							Label(sibling(node_17, 2), {
								class: "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
								for: "link_category_config-checkbox",
								id: "link_category_config",
								children: ($$anchor$5, $$slotProps$2) => {
									next();
									var text_5 = text();
									template_effect(($0) => set_text(text_5, $0), [() => _("Link instead of copying")]);
									append($$anchor$5, text_5);
								},
								$$slots: { default: true }
							});
							reset(div_2);
							component(sibling(div_2, 2), () => Alert, ($$anchor$5, Alert_Root) => {
								Alert_Root($$anchor$5, {
									children: ($$anchor$6, $$slotProps$2) => {
										var fragment_16 = root_17();
										var node_20 = first_child(fragment_16);
										Icon(node_20, { icon: "ic:baseline-info" });
										var node_21 = sibling(node_20, 2);
										component(node_21, () => Alert_title, ($$anchor$7, Alert_Title) => {
											Alert_Title($$anchor$7, {
												children: ($$anchor$8, $$slotProps$3) => {
													next();
													var text_6 = text();
													template_effect(($0) => set_text(text_6, $0), [() => _("Info")]);
													append($$anchor$8, text_6);
												},
												$$slots: { default: true }
											});
										});
										component(sibling(node_21, 2), () => Alert_description, ($$anchor$7, Alert_Description) => {
											Alert_Description($$anchor$7, {
												children: ($$anchor$8, $$slotProps$3) => {
													next();
													var fragment_18 = root_19();
													var text_7 = first_child(fragment_18);
													var text_8 = sibling(text_7, 2);
													template_effect(($0, $1) => {
														set_text(text_7, `${$0 ?? ""} `);
														set_text(text_8, ` ${$1 ?? ""}`);
													}, [() => _("Linking a configuration will use the same configuration in multiple products instead of copying it."), () => _("Linking will affect current and future products of the selected category.")]);
													append($$anchor$8, fragment_18);
												},
												$$slots: { default: true }
											});
										});
										append($$anchor$6, fragment_16);
									},
									$$slots: { default: true }
								});
							});
							reset(div);
							append($$anchor$4, div);
						},
						$$slots: { default: true }
					});
				});
				component(sibling(node_3, 2), () => Card_footer, ($$anchor$3, Card_Footer) => {
					Card_Footer($$anchor$3, {
						class: "flex gap-2",
						children: ($$anchor$4, $$slotProps$1) => {
							var fragment_19 = comment();
							var node_24 = first_child(fragment_19);
							var consequent = ($$anchor$5) => {
								{
									let $0 = user_derived(() => $tainted() && "btn-highlight");
									let $1 = user_derived(() => !$tainted());
									Button($$anchor$5, {
										get class() {
											return `flex gap-2 ${get($0) ?? ""}`;
										},
										get disabled() {
											return get($1);
										},
										name: "copy_to_category",
										type: "submit",
										onclick: (e) => {
											if (!confirm(_("The configuration of the target category products will be overwritten, continue?"))) e.preventDefault();
										},
										children: ($$anchor$6, $$slotProps$2) => {
											var fragment_21 = root_22();
											var node_25 = first_child(fragment_21);
											{
												let $0$1 = user_derived(() => $submitting() && $form().action_name === "copy_to_category");
												Spinner(node_25, {
													get loading() {
														return get($0$1);
													},
													children: ($$anchor$7, $$slotProps$3) => {
														Icon($$anchor$7, { icon: "ic:baseline-insert-link" });
													},
													$$slots: { default: true }
												});
											}
											var text_9 = sibling(node_25);
											template_effect(($0$1) => set_text(text_9, ` ${$0$1 ?? ""}`), [() => _("Link category products")]);
											append($$anchor$6, fragment_21);
										},
										$$slots: { default: true }
									});
								}
							};
							var alternate = ($$anchor$5) => {
								var fragment_23 = comment();
								component(first_child(fragment_23), () => Root$1, ($$anchor$6, Dialog_Root) => {
									Dialog_Root($$anchor$6, {
										onOpenChange: (o) => {
											if (o && !$form().id_target_category) {
												toast.error(_("Please select a target category."));
												set(open, false);
											}
										},
										get open() {
											return get(open);
										},
										set open($$value) {
											set(open, $$value, true);
										},
										children: ($$anchor$7, $$slotProps$2) => {
											var fragment_24 = root_25();
											var node_27 = first_child(fragment_24);
											{
												let $0 = user_derived(buttonVariants);
												component(node_27, () => Trigger$1, ($$anchor$8, Dialog_Trigger) => {
													Dialog_Trigger($$anchor$8, {
														type: "button",
														get class() {
															return get($0);
														},
														children: ($$anchor$9, $$slotProps$3) => {
															var fragment_25 = root_26();
															var node_28 = first_child(fragment_25);
															Icon(node_28, { icon: "ic:outline-share" });
															var text_10 = sibling(node_28);
															template_effect(($0$1) => set_text(text_10, ` ${$0$1 ?? ""}`), [() => _("Copy to category products")]);
															append($$anchor$9, fragment_25);
														},
														$$slots: { default: true }
													});
												});
											}
											component(sibling(node_27, 2), () => Dialog_content, ($$anchor$8, Dialog_Content) => {
												Dialog_Content($$anchor$8, {
													children: ($$anchor$9, $$slotProps$3) => {
														var fragment_26 = root_27();
														var node_30 = first_child(fragment_26);
														component(node_30, () => Dialog_header, ($$anchor$10, Dialog_Header) => {
															Dialog_Header($$anchor$10, {
																children: ($$anchor$11, $$slotProps$4) => {
																	var fragment_27 = root_28();
																	var node_31 = first_child(fragment_27);
																	component(node_31, () => Dialog_title, ($$anchor$12, Dialog_Title) => {
																		Dialog_Title($$anchor$12, {
																			children: ($$anchor$13, $$slotProps$5) => {
																				next();
																				var text_11 = text();
																				template_effect(($0) => set_text(text_11, $0), [() => _("Copy configuration")]);
																				append($$anchor$13, text_11);
																			},
																			$$slots: { default: true }
																		});
																	});
																	component(sibling(node_31, 2), () => Dialog_description, ($$anchor$12, Dialog_Description) => {
																		Dialog_Description($$anchor$12, {
																			children: ($$anchor$13, $$slotProps$5) => {
																				next();
																				var text_12 = text();
																				template_effect(($0) => set_text(text_12, $0), [() => _("Please select the elements you want to copy from the source product.")]);
																				append($$anchor$13, text_12);
																			},
																			$$slots: { default: true }
																		});
																	});
																	append($$anchor$11, fragment_27);
																},
																$$slots: { default: true }
															});
														});
														var div_3 = sibling(node_30, 2);
														var div_4 = child(div_3);
														var node_33 = child(div_4);
														Checkbox(node_33, {
															"aria-labelledby": "clear_existing_items",
															id: "clear_existing_items-checkbox",
															get checked() {
																return $form().clear_existing_items;
															},
															set checked($$value) {
																store_mutate(form, untrack($form).clear_existing_items = $$value, untrack($form));
															}
														});
														Label(sibling(node_33, 2), {
															class: "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
															for: "clear_existing_items-checkbox",
															id: "clear_existing_items",
															children: ($$anchor$10, $$slotProps$4) => {
																next();
																var text_13 = text();
																template_effect(($0) => set_text(text_13, $0), [() => _("Clear existing elements before copying")]);
																append($$anchor$10, text_13);
															},
															$$slots: { default: true }
														});
														reset(div_4);
														var div_5 = sibling(div_4, 4);
														var node_35 = child(div_5);
														{
															let $0 = user_derived(() => Object.values($form().options).every((v) => v));
															let $1 = user_derived(() => Object.values($form().options).filter((v) => v).length > 0 && Object.values($form().options).filter((v) => !v).length > 0);
															Checkbox(node_35, {
																"aria-labelledby": "all",
																id: "all-checkbox",
																get checked() {
																	return get($0);
																},
																get indeterminate() {
																	return get($1);
																},
																onCheckedChange: (checked) => {
																	Object.keys($form().options).forEach((key) => store_mutate(form, untrack($form).options[key] = checked, untrack($form)));
																}
															});
														}
														Label(sibling(node_35, 2), {
															class: "cursor-pointer text-sm font-medium leading-none underline peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
															for: "all-checkbox",
															id: "all",
															children: ($$anchor$10, $$slotProps$4) => {
																next();
																var text_14 = text();
																template_effect(($0) => set_text(text_14, $0), [() => _("Select All")]);
																append($$anchor$10, text_14);
															},
															$$slots: { default: true }
														});
														reset(div_5);
														var div_6 = sibling(div_5, 2);
														each(div_6, 21, () => Object.entries(options), ([name, label]) => name, ($$anchor$10, $$item) => {
															var $$array = user_derived(() => to_array(get($$item), 2));
															let name = () => get($$array)[0];
															let label = () => get($$array)[1];
															var div_7 = root_33();
															var node_37 = child(div_7);
															Checkbox(node_37, {
																get "aria-labelledby"() {
																	return name();
																},
																get id() {
																	return `${name() ?? ""}-checkbox`;
																},
																get checked() {
																	return $form().options[name()];
																},
																set checked($$value) {
																	store_mutate(form, untrack($form).options[name()] = $$value, untrack($form));
																}
															});
															Label(sibling(node_37, 2), {
																class: "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
																get for() {
																	return `${name() ?? ""}-checkbox`;
																},
																get id() {
																	return name();
																},
																children: ($$anchor$11, $$slotProps$4) => {
																	next();
																	var text_15 = text();
																	template_effect(() => set_text(text_15, label()));
																	append($$anchor$11, text_15);
																},
																$$slots: { default: true }
															});
															reset(div_7);
															append($$anchor$10, div_7);
														});
														reset(div_6);
														reset(div_3);
														component(sibling(div_3, 2), () => Dialog_footer, ($$anchor$10, Dialog_Footer) => {
															Dialog_Footer($$anchor$10, {
																children: ($$anchor$11, $$slotProps$4) => {
																	var div_8 = root_35();
																	var node_40 = child(div_8);
																	Progress(node_40, {
																		get value() {
																			return $form().progress;
																		},
																		max: 100
																	});
																	Button(sibling(node_40, 2), {
																		type: "submit",
																		name: "copy_to_category",
																		form: "copy-configuration",
																		children: ($$anchor$12, $$slotProps$5) => {
																			var fragment_33 = root_36();
																			var node_42 = first_child(fragment_33);
																			{
																				let $0 = user_derived(() => $submitting() && $form().action_name === "copy_to_category");
																				Spinner(node_42, {
																					get loading() {
																						return get($0);
																					},
																					children: ($$anchor$13, $$slotProps$6) => {
																						Icon($$anchor$13, { icon: "ic:outline-share" });
																					},
																					$$slots: { default: true }
																				});
																			}
																			var text_16 = sibling(node_42);
																			var node_43 = sibling(text_16);
																			var consequent_1 = ($$anchor$13) => {
																				var text_17 = text();
																				template_effect(() => set_text(text_17, `(${$form().progress_str ?? ""})`));
																				append($$anchor$13, text_17);
																			};
																			if_block(node_43, ($$render) => {
																				if ($form().progress_str) $$render(consequent_1);
																			});
																			template_effect(($0) => set_text(text_16, ` ${$0 ?? ""} `), [() => _("Copy to category products")]);
																			append($$anchor$12, fragment_33);
																		},
																		$$slots: { default: true }
																	});
																	reset(div_8);
																	append($$anchor$11, div_8);
																},
																$$slots: { default: true }
															});
														});
														append($$anchor$9, fragment_26);
													},
													$$slots: { default: true }
												});
											});
											append($$anchor$7, fragment_24);
										},
										$$slots: { default: true }
									});
								});
								append($$anchor$5, fragment_23);
							};
							if_block(node_24, ($$render) => {
								if ($form().link_category_config) $$render(consequent);
								else $$render(alternate, false);
							});
							append($$anchor$4, fragment_19);
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
var root_4$1 = from_html(`<div class="flex flex-col gap-6"><div class="flex w-full flex-col gap-1.5"><!> <!> <p class="text-muted-foreground text-sm"> </p></div></div>`);
var root_7$1 = from_html(`<!> `, 1);
var root_1$2 = from_html(`<!> <!> <!>`, 1);
function ImportFile($$anchor, $$props) {
	push($$props, true);
	const $errors = () => store_get(errors, "$errors", $$stores);
	const $form = () => store_get(form, "$form", $$stores);
	const $submitting = () => store_get(submitting, "$submitting", $$stores);
	const [$$stores, $$cleanup] = setup_stores();
	let { form, submitting, errors } = $$props.superform;
	var fragment = comment();
	component(first_child(fragment), () => Card, ($$anchor$1, Card_Root) => {
		Card_Root($$anchor$1, {
			children: ($$anchor$2, $$slotProps) => {
				var fragment_1 = root_1$2();
				var node_1 = first_child(fragment_1);
				component(node_1, () => Card_header, ($$anchor$3, Card_Header) => {
					Card_Header($$anchor$3, {
						children: ($$anchor$4, $$slotProps$1) => {
							var fragment_2 = comment();
							component(first_child(fragment_2), () => Card_title, ($$anchor$5, Card_Title) => {
								Card_Title($$anchor$5, {
									children: ($$anchor$6, $$slotProps$2) => {
										next();
										var text$1 = text();
										template_effect(($0) => set_text(text$1, $0), [() => _("Import from a file")]);
										append($$anchor$6, text$1);
									},
									$$slots: { default: true }
								});
							});
							append($$anchor$4, fragment_2);
						},
						$$slots: { default: true }
					});
				});
				var node_3 = sibling(node_1, 2);
				component(node_3, () => Card_content, ($$anchor$3, Card_Content) => {
					Card_Content($$anchor$3, {
						children: ($$anchor$4, $$slotProps$1) => {
							var div = root_4$1();
							var div_1 = child(div);
							var node_4 = child(div_1);
							Label(node_4, {
								for: "file",
								children: ($$anchor$5, $$slotProps$2) => {
									next();
									var text_1 = text();
									template_effect(($0) => set_text(text_1, $0), [() => _("Configuration file")]);
									append($$anchor$5, text_1);
								},
								$$slots: { default: true }
							});
							var node_5 = sibling(node_4, 2);
							{
								let $0 = user_derived(() => cn({ "border-error": !!$errors()?.file }));
								Input(node_5, {
									accept: ".json",
									get class() {
										return `max-w-xs ${get($0) ?? ""}`;
									},
									id: "file",
									"data-testid": "import-json",
									onchange: (e) => {
										store_mutate(form, untrack($form).file = e.currentTarget.files?.[0], untrack($form));
									},
									type: "file"
								});
							}
							var p = sibling(node_5, 2);
							var text_2 = child(p, true);
							reset(p);
							reset(div_1);
							reset(div);
							template_effect(($0) => set_text(text_2, $0), [() => _("You can import a .json file containing a product configuration")]);
							append($$anchor$4, div);
						},
						$$slots: { default: true }
					});
				});
				component(sibling(node_3, 2), () => Card_footer, ($$anchor$3, Card_Footer) => {
					Card_Footer($$anchor$3, {
						class: "flex gap-2",
						children: ($$anchor$4, $$slotProps$1) => {
							Button($$anchor$4, {
								class: "flex gap-2",
								name: "import_file",
								onclick: async (e) => {
									if (!$form().file) {
										store_mutate(errors, untrack($errors)["file"] = [_("Please select a file to import")], untrack($errors));
										e.preventDefault();
										return;
									}
									if (!confirm(_("The current configuration will be overwritten, continue?"))) e.preventDefault();
								},
								type: "submit",
								children: ($$anchor$5, $$slotProps$2) => {
									var fragment_6 = root_7$1();
									var node_7 = first_child(fragment_6);
									{
										let $0 = user_derived(() => $submitting() && $form().action_name === "import_file");
										Spinner(node_7, {
											get loading() {
												return get($0);
											},
											children: ($$anchor$6, $$slotProps$3) => {
												Icon($$anchor$6, { icon: "ic:baseline-file-upload" });
											},
											$$slots: { default: true }
										});
									}
									var text_3 = sibling(node_7);
									template_effect(($0) => set_text(text_3, ` ${$0 ?? ""}`), [() => _("Import configuration")]);
									append($$anchor$5, fragment_6);
								},
								$$slots: { default: true }
							});
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
var root_4 = from_html(`<div class="flex flex-col gap-6"><div class="flex flex-col gap-2"><div class="flex items-center space-x-2"><!> <!></div> <p class="text-muted-foreground text-sm"> </p></div></div>`);
var root_7 = from_html(`<!> `, 1);
var root_1$1 = from_html(`<!> <!> <!>`, 1);
function ExportFile($$anchor, $$props) {
	push($$props, true);
	const $form = () => store_get(form, "$form", $$stores);
	const $submitting = () => store_get(submitting, "$submitting", $$stores);
	const [$$stores, $$cleanup] = setup_stores();
	let { form, submitting } = $$props.superform;
	var fragment = comment();
	component(first_child(fragment), () => Card, ($$anchor$1, Card_Root) => {
		Card_Root($$anchor$1, {
			children: ($$anchor$2, $$slotProps) => {
				var fragment_1 = root_1$1();
				var node_1 = first_child(fragment_1);
				component(node_1, () => Card_header, ($$anchor$3, Card_Header) => {
					Card_Header($$anchor$3, {
						children: ($$anchor$4, $$slotProps$1) => {
							var fragment_2 = comment();
							component(first_child(fragment_2), () => Card_title, ($$anchor$5, Card_Title) => {
								Card_Title($$anchor$5, {
									children: ($$anchor$6, $$slotProps$2) => {
										next();
										var text$1 = text();
										template_effect(($0) => set_text(text$1, $0), [() => _("Export configuration")]);
										append($$anchor$6, text$1);
									},
									$$slots: { default: true }
								});
							});
							append($$anchor$4, fragment_2);
						},
						$$slots: { default: true }
					});
				});
				var node_3 = sibling(node_1, 2);
				component(node_3, () => Card_content, ($$anchor$3, Card_Content) => {
					Card_Content($$anchor$3, {
						children: ($$anchor$4, $$slotProps$1) => {
							var div = root_4();
							var div_1 = child(div);
							var div_2 = child(div_1);
							var node_4 = child(div_2);
							Checkbox(node_4, {
								"aria-labelledby": "link_images",
								id: "link_images-checkbox",
								get checked() {
									return $form().link_images;
								},
								set checked($$value) {
									store_mutate(form, untrack($form).link_images = $$value, untrack($form));
								}
							});
							Label(sibling(node_4, 2), {
								class: "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
								for: "link_images-checkbox",
								id: "link_images",
								children: ($$anchor$5, $$slotProps$2) => {
									next();
									var text_1 = text();
									template_effect(($0) => set_text(text_1, $0), [() => _("Export image links instead of encoding the images")]);
									append($$anchor$5, text_1);
								},
								$$slots: { default: true }
							});
							reset(div_2);
							var p = sibling(div_2, 2);
							var text_2 = child(p, true);
							reset(p);
							reset(div_1);
							reset(div);
							template_effect(($0) => set_text(text_2, $0), [() => _("Results in a smaller file. Only enable if the images can be accessed from your target shop.")]);
							append($$anchor$4, div);
						},
						$$slots: { default: true }
					});
				});
				component(sibling(node_3, 2), () => Card_footer, ($$anchor$3, Card_Footer) => {
					Card_Footer($$anchor$3, {
						class: "flex gap-2",
						children: ($$anchor$4, $$slotProps$1) => {
							Button($$anchor$4, {
								class: "flex gap-2",
								name: "export_config",
								type: "submit",
								children: ($$anchor$5, $$slotProps$2) => {
									var fragment_6 = root_7();
									var node_7 = first_child(fragment_6);
									{
										let $0 = user_derived(() => $submitting() && $form().action_name === "export_config");
										Spinner(node_7, {
											get loading() {
												return get($0);
											},
											children: ($$anchor$6, $$slotProps$3) => {
												Icon($$anchor$6, { icon: "ic:baseline-get-app" });
											},
											$$slots: { default: true }
										});
									}
									var text_3 = sibling(node_7);
									template_effect(($0) => set_text(text_3, ` ${$0 ?? ""}`), [() => _("Export configuration")]);
									append($$anchor$5, fragment_6);
								},
								$$slots: { default: true }
							});
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
var root_1 = from_html(`<!> <!> <!>`, 1);
var root = from_html(`<form id="copy-configuration" method="POST"><div class="flex flex-col gap-4 p-4"><!> <!> <!> <!> <!></div></form>`);
function _page($$anchor, $$props) {
	push($$props, true);
	const $form = () => store_get(form, "$form", $$stores);
	const [$$stores, $$cleanup] = setup_stores();
	const superform = superForm($$props.data.form, {
		SPA: true,
		dataType: "json",
		validators: valibot(ImportExportSchema),
		resetForm: false,
		invalidateAll: false,
		multipleSubmits: "allow",
		async onSubmit({ submitter, cancel }) {
			const action$1 = submitter?.getAttribute("name");
			if (!action$1) return cancel();
			store_mutate(form, untrack($form).action_name = action$1, untrack($form));
			if ($form().file) {
				const form_data = new FormData();
				form_data.append("action_name", action$1);
				form_data.append("file", $form().file);
				store_mutate(form, untrack($form).file = void 0, untrack($form));
				const res = await upload_files({
					route: page.route.id,
					action: action$1,
					data: form_data
				});
				if (res.error) {
					toast.error(res.message);
					return;
				} else {
					toast.success(res.message);
					setTimeout(() => {
						location.href = url("/product");
					}, 1e3);
				}
				return;
			}
			if (action$1 === "export_config") return redirect({
				route: page.route.id,
				action: action$1
			}, { link_images: +$form().link_images });
			const data = await form_action({
				route: page.route.id,
				action: action$1,
				data: $form()
			});
			store_mutate(form, untrack($form).action_name = "", untrack($form));
			if (data.error) toast.error(data.message);
			else {
				if (data.message) toast.success(data.message);
				if (data.reload) setTimeout(() => {
					location.href = url("/product");
				}, 1e3);
				if ("next" in data) {
					store_mutate(form, untrack($form).next = data.next, untrack($form));
					await tick();
					submit(submitter);
				}
				if ("reset" in data) {
					store_mutate(form, untrack($form).next = 0, untrack($form));
					store_mutate(form, untrack($form).progress = 0, untrack($form));
				}
				if ("progress" in data) store_mutate(form, untrack($form).progress = data.progress, untrack($form));
				if ("progress_str" in data) store_mutate(form, untrack($form).progress_str = data.progress_str, untrack($form));
			}
			cancel();
		}
	});
	let { form, enhance, submit } = superform;
	var form_1 = root();
	var div = child(form_1);
	var node = child(div);
	component(node, () => Alert, ($$anchor$1, Alert_Root) => {
		Alert_Root($$anchor$1, {
			variant: "destructive",
			children: ($$anchor$2, $$slotProps) => {
				var fragment = root_1();
				var node_1 = first_child(fragment);
				Icon(node_1, { icon: "ic:baseline-warning" });
				var node_2 = sibling(node_1, 2);
				component(node_2, () => Alert_title, ($$anchor$3, Alert_Title) => {
					Alert_Title($$anchor$3, {
						children: ($$anchor$4, $$slotProps$1) => {
							next();
							var text$1 = text();
							template_effect(($0) => set_text(text$1, $0), [() => _("Important")]);
							append($$anchor$4, text$1);
						},
						$$slots: { default: true }
					});
				});
				component(sibling(node_2, 2), () => Alert_description, ($$anchor$3, Alert_Description) => {
					Alert_Description($$anchor$3, {
						children: ($$anchor$4, $$slotProps$1) => {
							next();
							var text_1 = text();
							template_effect(($0) => set_text(text_1, $0), [() => _("It is highly recommended to backup your database before importing any product configuration.")]);
							append($$anchor$4, text_1);
						},
						$$slots: { default: true }
					});
				});
				append($$anchor$2, fragment);
			},
			$$slots: { default: true }
		});
	});
	var node_4 = sibling(node, 2);
	LoadProduct(node_4, {
		get active_products() {
			return $$props.data.active_products;
		},
		get superform() {
			return superform;
		}
	});
	var node_5 = sibling(node_4, 2);
	LinkCategory(node_5, {
		get categories() {
			return $$props.data.categories;
		},
		get superform() {
			return superform;
		}
	});
	var node_6 = sibling(node_5, 2);
	ImportFile(node_6, { get superform() {
		return superform;
	} });
	ExportFile(sibling(node_6, 2), { get superform() {
		return superform;
	} });
	reset(div);
	reset(form_1);
	action(form_1, ($$node) => enhance?.($$node));
	append($$anchor, form_1);
	pop();
	$$cleanup();
}
export { _page as component, _page_exports as universal };
