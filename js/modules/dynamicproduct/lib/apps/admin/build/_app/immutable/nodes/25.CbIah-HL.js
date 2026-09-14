import { Ct as set, D as set_attribute, Ft as push, G as if_block, Ht as next, L as component, N as action, Ot as user_derived, Pt as pop, Tt as state, Ut as reset, V as each, X as comment, Y as append, Z as from_html, Zt as __exportAll, bt as sibling, d as store_mutate, et as text, l as setup_stores, lt as untrack, ot as get, pt as template_effect, q as set_text, r as onMount, u as store_get, vt as child, xt as proxy, yt as first_child } from "../chunks/DUscB9kS.js";
import "../chunks/B_W7bg6n.js";
import { a as goto } from "../chunks/D365qDux.js";
import { i as superForm, n as superValidate, t as valibot } from "../chunks/CPdJ2mnA.js";
import "../chunks/D-Alr120.js";
import "../chunks/CEFrIRjK.js";
import { a as form_action, n as buttonVariants, r as cn, s as page_load, t as Button, u as upload_files } from "../chunks/BIEFGHhw.js";
import { r as url } from "../chunks/Crb1phnD.js";
import { n as toast } from "../chunks/CQQo25vS.js";
import "../chunks/CJDS8lnd.js";
import "../chunks/DAbnHPcz.js";
import { n as _, t as Icon } from "../chunks/DFl6Gq92.js";
import { n as page } from "../chunks/BRpqcTWk.js";
import "../chunks/_yKPJ4BA.js";
import { t as Checkbox } from "../chunks/CX3fpb_g.js";
import { t as Label } from "../chunks/ClKKfzS1.js";
import { t as LangPicker } from "../chunks/6kTRSPQW.js";
import "../chunks/C4w9vuey.js";
import { n as lang } from "../chunks/cJwMBL5_.js";
import "../chunks/GFXpcJ_Z.js";
import "../chunks/CgH3Vt0F.js";
import { n as Alert_description, r as Alert, t as Alert_title } from "../chunks/OMr53o_L.js";
import { _ as transform, c as nullable, d as optional, f as picklist, g as string, l as number, m as record, n as array, o as instance, p as pipe, r as boolean, u as object } from "../chunks/Da0rmiev.js";
import { t as Spinner } from "../chunks/C9eHbt79.js";
import { n as obj } from "../chunks/C961kT60.js";
import { a as Table_cell, i as Table_footer, n as Table_header, o as Table_body, r as Table_head, s as Table, t as Table_row } from "../chunks/fQ7Z9iZC.js";
import { t as sort } from "../chunks/Bz4g0JZD.js";
import { n as Form_button } from "../chunks/C9E5Z7Ag.js";
import "../chunks/GxWY6lrD.js";
import { t as sortable } from "../chunks/cJTe3rpq.js";
import { t as Input } from "../chunks/D2YUxW8P.js";
import { n as FieldConfig, r as FieldTypes, t as fallback } from "../chunks/DpBFUaMS.js";
import { n as submitOnEnter, t as navigate } from "../chunks/CqWKmQZR.js";
import { a as Sheet_header, n as Sheet_description, o as Sheet_content, r as Sheet_title, t as Root } from "../chunks/5Ks3C72h.js";
const FieldOptionsSchema = object({
	id: number(),
	id_field: number(),
	value: optional(string()),
	secondary_value: optional(string()),
	sku: optional(string()),
	color: optional(string()),
	image: optional(string()),
	image_width: optional(number()),
	image_height: optional(number()),
	image_url: optional(nullable(string())),
	thumb_url: optional(nullable(string())),
	preview: optional(string()),
	preview_url: optional(nullable(string())),
	preview_thumb_url: optional(nullable(string())),
	font: optional(string()),
	font_thumb_url: optional(nullable(string())),
	is_default: optional(number()),
	active: optional(number()),
	position: number(),
	label: optional(record(string(), string())),
	date_upd: string()
});
const FieldOptionsFormSchema = object({
	action_name: picklist([
		"",
		"update",
		"add",
		"toggle",
		"toggle-default",
		"delete",
		"delete-image",
		"delete-font",
		"delete-preview",
		"delete-options",
		"import-images",
		"import-fonts"
	]),
	action_value: string(),
	check_all: boolean(),
	checked: record(string(), boolean()),
	options: pipe(record(string(), FieldOptionsSchema), transform((value) => {
		return Array.isArray(value) ? {} : value;
	})),
	images: array(instance(File)),
	fonts: array(instance(File)),
	id_option: optional(number(), 0),
	option_image: optional(instance(File)),
	option_font: optional(instance(File)),
	option_preview: optional(instance(File))
});
var _page_exports = /* @__PURE__ */ __exportAll({
	load: () => load,
	prerender: () => false
}, 1);
const load = async (event) => {
	const id_field = event.params.id;
	const { field, options } = await page_load(event, { id_field });
	return {
		id_field,
		field,
		form: await superValidate({
			check_all: false,
			checked: Object.fromEntries(Object.keys(options).map((k) => [k, false])),
			options: obj(options)
		}, valibot(FieldOptionsFormSchema))
	};
};
var root_1$4 = from_html(`<!> <!> <!>`, 1);
var root_6 = from_html(`<!> <!> <!> <!> <!> <!> <!> <!> <!>`, 1);
var root_26$1 = from_html(`<div class="flex justify-center"><!></div>`);
var root_31$1 = from_html(`<img class="h-10 w-auto"/>`);
var root_32$2 = from_html(`<img class="h-10 w-auto"/>`);
var root_29$3 = from_html(`<div class="flex items-center"><!> <!></div> <!>`, 1);
var root_38$1 = from_html(`<img class="h-10 w-auto"/>`);
var root_39 = from_html(`<img class="h-10 w-auto"/>`);
var root_36$1 = from_html(`<div class="flex items-center"><!> <!></div> <!>`, 1);
var root_43 = from_html(`<div class="flex flex-nowrap justify-end gap-1"><!> <!> <!></div>`);
var root_19 = from_html(`<!> <!> <!> <!> <!> <!> <!> <!> <!>`, 1);
var root_53$1 = from_html(`<!> `, 1);
var root_55$1 = from_html(`<!> `, 1);
var root_52$2 = from_html(`<!> <!>`, 1);
var root_57 = from_html(`<!> `, 1);
var root_59 = from_html(`<!> `, 1);
var root_61 = from_html(`<!> `, 1);
var root_56$2 = from_html(`<!> <!> <!> <div class="dp-away"><!></div>`, 1);
var root_51$1 = from_html(`<div class="flex gap-2"><!></div>`);
var root_4$1 = from_html(`<!> <!> <!>`, 1);
var root = from_html(`<!> <!>`, 1);
function DropdownOptions($$anchor, $$props) {
	push($$props, true);
	const $form = () => store_get(form, "$form", $$stores);
	const $submitting = () => store_get(submitting, "$submitting", $$stores);
	const $tainted = () => store_get(tainted, "$tainted", $$stores);
	const [$$stores, $$cleanup] = setup_stores();
	const { form, tainted, submit, submitting } = $$props.superform;
	const options = user_derived(() => sort($form().options));
	let files_input = state(null);
	let option_images = proxy({});
	let option_previews = proxy({});
	var fragment = root();
	var node = first_child(fragment);
	component(node, () => Alert, ($$anchor$1, Alert_Root) => {
		Alert_Root($$anchor$1, {
			class: "mb-4",
			variant: "info",
			children: ($$anchor$2, $$slotProps) => {
				var fragment_1 = root_1$4();
				var node_1 = first_child(fragment_1);
				Icon(node_1, { icon: "ic:baseline-info" });
				var node_2 = sibling(node_1, 2);
				component(node_2, () => Alert_title, ($$anchor$3, Alert_Title) => {
					Alert_Title($$anchor$3, {
						children: ($$anchor$4, $$slotProps$1) => {
							next();
							var text$1 = text();
							template_effect(($0) => set_text(text$1, $0), [() => _("Required dropdown")]);
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
							template_effect(($0) => set_text(text_1, $0), [() => _("Create an option with an empty value (e.g., \"Select an option...\") to make this field required. Empty-value options cannot be added to cart.")]);
							append($$anchor$4, text_1);
						},
						$$slots: { default: true }
					});
				});
				append($$anchor$2, fragment_1);
			},
			$$slots: { default: true }
		});
	});
	component(sibling(node, 2), () => Table, ($$anchor$1, Table_Root) => {
		Table_Root($$anchor$1, {
			children: ($$anchor$2, $$slotProps) => {
				var fragment_4 = root_4$1();
				var node_5 = first_child(fragment_4);
				component(node_5, () => Table_header, ($$anchor$3, Table_Header) => {
					Table_Header($$anchor$3, {
						children: ($$anchor$4, $$slotProps$1) => {
							var fragment_5 = comment();
							component(first_child(fragment_5), () => Table_row, ($$anchor$5, Table_Row) => {
								Table_Row($$anchor$5, {
									children: ($$anchor$6, $$slotProps$2) => {
										var fragment_6 = root_6();
										var node_7 = first_child(fragment_6);
										component(node_7, () => Table_head, ($$anchor$7, Table_Head) => {
											Table_Head($$anchor$7, {
												class: "px-4! text-center",
												children: ($$anchor$8, $$slotProps$3) => {
													var fragment_7 = comment();
													var node_8 = first_child(fragment_7);
													var consequent = ($$anchor$9) => {
														{
															let $0 = user_derived(() => Object.values($form().checked).some(Boolean) && !Object.values($form().checked).every(Boolean));
															Checkbox($$anchor$9, {
																class: "border-gray-400",
																get indeterminate() {
																	return get($0);
																},
																onCheckedChange: () => {
																	store_mutate(form, untrack($form).checked = Object.fromEntries(Object.keys($form().options).map((id) => [id, $form().check_all])), untrack($form));
																},
																get checked() {
																	return $form().check_all;
																},
																set checked($$value) {
																	store_mutate(form, untrack($form).check_all = $$value, untrack($form));
																}
															});
														}
													};
													if_block(node_8, ($$render) => {
														if (Object.values($form().options).length > 1) $$render(consequent);
													});
													append($$anchor$8, fragment_7);
												},
												$$slots: { default: true }
											});
										});
										var node_9 = sibling(node_7, 2);
										component(node_9, () => Table_head, ($$anchor$7, Table_Head_1) => {
											Table_Head_1($$anchor$7, {
												children: ($$anchor$8, $$slotProps$3) => {
													next();
													var text_2 = text();
													template_effect(($0) => set_text(text_2, $0), [() => _("Label")]);
													append($$anchor$8, text_2);
												},
												$$slots: { default: true }
											});
										});
										var node_10 = sibling(node_9, 2);
										component(node_10, () => Table_head, ($$anchor$7, Table_Head_2) => {
											Table_Head_2($$anchor$7, {
												children: ($$anchor$8, $$slotProps$3) => {
													next();
													var text_3 = text();
													template_effect(($0) => set_text(text_3, $0), [() => _("Value")]);
													append($$anchor$8, text_3);
												},
												$$slots: { default: true }
											});
										});
										var node_11 = sibling(node_10, 2);
										{
											let $0 = user_derived(() => _("Secondary value"));
											component(node_11, () => Table_head, ($$anchor$7, Table_Head_3) => {
												Table_Head_3($$anchor$7, {
													get title() {
														return get($0);
													},
													children: ($$anchor$8, $$slotProps$3) => {
														next();
														var text_4 = text();
														template_effect(($0$1) => set_text(text_4, $0$1), [() => _("Sec. value")]);
														append($$anchor$8, text_4);
													},
													$$slots: { default: true }
												});
											});
										}
										var node_12 = sibling(node_11, 2);
										component(node_12, () => Table_head, ($$anchor$7, Table_Head_4) => {
											Table_Head_4($$anchor$7, {
												children: ($$anchor$8, $$slotProps$3) => {
													next();
													var text_5 = text();
													template_effect(($0) => set_text(text_5, $0), [() => _("SKU")]);
													append($$anchor$8, text_5);
												},
												$$slots: { default: true }
											});
										});
										var node_13 = sibling(node_12, 2);
										component(node_13, () => Table_head, ($$anchor$7, Table_Head_5) => {
											Table_Head_5($$anchor$7, {
												class: "text-center",
												children: ($$anchor$8, $$slotProps$3) => {
													next();
													var text_6 = text();
													template_effect(($0) => set_text(text_6, $0), [() => _("Default")]);
													append($$anchor$8, text_6);
												},
												$$slots: { default: true }
											});
										});
										var node_14 = sibling(node_13, 2);
										component(node_14, () => Table_head, ($$anchor$7, Table_Head_6) => {
											Table_Head_6($$anchor$7, {
												children: ($$anchor$8, $$slotProps$3) => {
													next();
													var text_7 = text();
													template_effect(($0) => set_text(text_7, $0), [() => _("Image")]);
													append($$anchor$8, text_7);
												},
												$$slots: { default: true }
											});
										});
										var node_15 = sibling(node_14, 2);
										component(node_15, () => Table_head, ($$anchor$7, Table_Head_7) => {
											Table_Head_7($$anchor$7, {
												children: ($$anchor$8, $$slotProps$3) => {
													next();
													var text_8 = text();
													template_effect(($0) => set_text(text_8, $0), [() => _("Preview")]);
													append($$anchor$8, text_8);
												},
												$$slots: { default: true }
											});
										});
										component(sibling(node_15, 2), () => Table_head, ($$anchor$7, Table_Head_8) => {
											Table_Head_8($$anchor$7, {
												class: "text-right",
												children: ($$anchor$8, $$slotProps$3) => {
													next();
													var text_9 = text();
													template_effect(($0) => set_text(text_9, $0), [() => _("Actions")]);
													append($$anchor$8, text_9);
												},
												$$slots: { default: true }
											});
										});
										append($$anchor$6, fragment_6);
									},
									$$slots: { default: true }
								});
							});
							append($$anchor$4, fragment_5);
						},
						$$slots: { default: true }
					});
				});
				var node_17 = sibling(node_5, 2);
				component(node_17, () => Table_body, ($$anchor$3, Table_Body) => {
					Table_Body($$anchor$3, {
						children: ($$anchor$4, $$slotProps$1) => {
							var fragment_17 = comment();
							each(first_child(fragment_17), 17, () => get(options), ({ id, active, is_default }) => id, ($$anchor$5, $$item) => {
								let id = () => get($$item).id;
								let active = () => get($$item).active;
								let is_default = () => get($$item).is_default;
								const option = user_derived(() => $form().options[id()]);
								var fragment_18 = comment();
								var node_19 = first_child(fragment_18);
								{
									let $0 = user_derived(() => ({ "bg-destructive": $form().checked[id()] }));
									component(node_19, () => Table_row, ($$anchor$6, Table_Row_1) => {
										Table_Row_1($$anchor$6, {
											get "data-id"() {
												return id();
											},
											get class() {
												return get($0);
											},
											children: ($$anchor$7, $$slotProps$2) => {
												var fragment_19 = root_19();
												var node_20 = first_child(fragment_19);
												component(node_20, () => Table_cell, ($$anchor$8, Table_Cell) => {
													Table_Cell($$anchor$8, {
														class: "p-0! text-center",
														children: ($$anchor$9, $$slotProps$3) => {
															var fragment_20 = comment();
															var node_21 = first_child(fragment_20);
															var consequent_1 = ($$anchor$10) => {
																var bind_get = () => $form().checked[id()] || $form().check_all;
																var bind_set = (checked) => store_mutate(form, untrack($form).checked[id()] = checked, untrack($form));
																Checkbox($$anchor$10, {
																	class: "border-gray-400",
																	get checked() {
																		return bind_get();
																	},
																	set checked($$value) {
																		bind_set($$value);
																	},
																	onchange: () => {
																		store_mutate(form, untrack($form).check_all = Object.values($form().checked).every(Boolean), untrack($form));
																	}
																});
															};
															if_block(node_21, ($$render) => {
																if (Object.values($form().options).length > 1) $$render(consequent_1);
															});
															append($$anchor$9, fragment_20);
														},
														$$slots: { default: true }
													});
												});
												var node_22 = sibling(node_20, 2);
												component(node_22, () => Table_cell, ($$anchor$8, Table_Cell_1) => {
													Table_Cell_1($$anchor$8, {
														children: ($$anchor$9, $$slotProps$3) => {
															{
																let $0$1 = user_derived(() => fallback($form().options[id()].label));
																Input($$anchor$9, {
																	class: "w-48",
																	get placeholder() {
																		return get($0$1);
																	},
																	"data-testid": "option-label",
																	get value() {
																		return $form().options[id()].label[+lang.value];
																	},
																	set value($$value) {
																		store_mutate(form, untrack($form).options[id()].label[+lang.value] = $$value, untrack($form));
																	}
																});
															}
														},
														$$slots: { default: true }
													});
												});
												var node_23 = sibling(node_22, 2);
												component(node_23, () => Table_cell, ($$anchor$8, Table_Cell_2) => {
													Table_Cell_2($$anchor$8, {
														children: ($$anchor$9, $$slotProps$3) => {
															Input($$anchor$9, {
																class: "col-span-full row-span-full w-20",
																get value() {
																	return $form().options[id()].value;
																},
																set value($$value) {
																	store_mutate(form, untrack($form).options[id()].value = $$value, untrack($form));
																}
															});
														},
														$$slots: { default: true }
													});
												});
												var node_24 = sibling(node_23, 2);
												component(node_24, () => Table_cell, ($$anchor$8, Table_Cell_3) => {
													Table_Cell_3($$anchor$8, {
														children: ($$anchor$9, $$slotProps$3) => {
															Input($$anchor$9, {
																class: "col-span-full row-span-full w-20",
																get value() {
																	return $form().options[id()].secondary_value;
																},
																set value($$value) {
																	store_mutate(form, untrack($form).options[id()].secondary_value = $$value, untrack($form));
																}
															});
														},
														$$slots: { default: true }
													});
												});
												var node_25 = sibling(node_24, 2);
												component(node_25, () => Table_cell, ($$anchor$8, Table_Cell_4) => {
													Table_Cell_4($$anchor$8, {
														children: ($$anchor$9, $$slotProps$3) => {
															Input($$anchor$9, {
																class: "col-span-full row-span-full w-20",
																get value() {
																	return $form().options[id()].sku;
																},
																set value($$value) {
																	store_mutate(form, untrack($form).options[id()].sku = $$value, untrack($form));
																}
															});
														},
														$$slots: { default: true }
													});
												});
												var node_26 = sibling(node_25, 2);
												component(node_26, () => Table_cell, ($$anchor$8, Table_Cell_5) => {
													Table_Cell_5($$anchor$8, {
														children: ($$anchor$9, $$slotProps$3) => {
															var div = root_26$1();
															var node_27 = child(div);
															{
																let $0$1 = user_derived(() => is_default() ? "text-green-500" : "text-red-500");
																let $1 = user_derived(() => _("Toggle default option"));
																Form_button(node_27, {
																	get class() {
																		return `flex gap-2 ${get($0$1) ?? ""}`;
																	},
																	variant: "ghost",
																	size: "sm",
																	name: "toggle-default",
																	get value() {
																		return id();
																	},
																	get title() {
																		return get($1);
																	},
																	children: ($$anchor$10, $$slotProps$4) => {
																		{
																			let $0$2 = user_derived(() => $submitting() && $form().action_name === "toggle-default" && $form().action_value === id().toString());
																			Spinner($$anchor$10, {
																				get loading() {
																					return get($0$2);
																				},
																				children: ($$anchor$11, $$slotProps$5) => {
																					{
																						let $0$3 = user_derived(() => is_default() ? "ic:baseline-done" : "ic:outline-close");
																						Icon($$anchor$11, { get icon() {
																							return get($0$3);
																						} });
																					}
																				},
																				$$slots: { default: true }
																			});
																		}
																	},
																	$$slots: { default: true }
																});
															}
															reset(div);
															append($$anchor$9, div);
														},
														$$slots: { default: true }
													});
												});
												var node_28 = sibling(node_26, 2);
												component(node_28, () => Table_cell, ($$anchor$8, Table_Cell_6) => {
													Table_Cell_6($$anchor$8, {
														class: "min-w-28",
														children: ($$anchor$9, $$slotProps$3) => {
															var fragment_28 = root_29$3();
															var div_1 = first_child(fragment_28);
															var node_29 = child(div_1);
															Form_button(node_29, {
																variant: "ghost",
																type: "button",
																onclick: () => option_images[id()]?.click(),
																class: "p-0",
																children: ($$anchor$10, $$slotProps$4) => {
																	var fragment_29 = comment();
																	var node_30 = first_child(fragment_29);
																	var consequent_2 = ($$anchor$11) => {
																		var img = root_31$1();
																		template_effect(($0$1, $1) => {
																			set_attribute(img, "width", get(option).image_width);
																			set_attribute(img, "height", get(option).image_height);
																			set_attribute(img, "src", `${get(option).thumb_url ?? ""}?date_upd=${$0$1 ?? ""}`);
																			set_attribute(img, "alt", $1);
																		}, [() => encodeURI(get(option).date_upd), () => _("Option image")]);
																		append($$anchor$11, img);
																	};
																	var alternate = ($$anchor$11) => {
																		var img_1 = root_32$2();
																		template_effect(($0$1, $1) => {
																			set_attribute(img_1, "src", $0$1);
																			set_attribute(img_1, "alt", $1);
																		}, [() => url("/empty.png"), () => _("Option image")]);
																		append($$anchor$11, img_1);
																	};
																	if_block(node_30, ($$render) => {
																		if (get(option).thumb_url) $$render(consequent_2);
																		else $$render(alternate, false);
																	});
																	append($$anchor$10, fragment_29);
																},
																$$slots: { default: true }
															});
															var node_31 = sibling(node_29, 2);
															var consequent_3 = ($$anchor$10) => {
																Form_button($$anchor$10, {
																	variant: "ghost",
																	size: "sm",
																	class: "text-destructive",
																	name: "delete-image",
																	get value() {
																		return id();
																	},
																	onclick: (e) => {
																		if (!confirm(_("Are you sure you want to delete this image?"))) e.preventDefault();
																	},
																	children: ($$anchor$11, $$slotProps$4) => {
																		{
																			let $0$1 = user_derived(() => $submitting() && $form().action_name === "delete-image" && $form().action_value === id().toString());
																			Spinner($$anchor$11, {
																				get loading() {
																					return get($0$1);
																				},
																				children: ($$anchor$12, $$slotProps$5) => {
																					Icon($$anchor$12, { icon: "mdi:trash-can" });
																				},
																				$$slots: { default: true }
																			});
																		}
																	},
																	$$slots: { default: true }
																});
															};
															if_block(node_31, ($$render) => {
																if (get(option).thumb_url) $$render(consequent_3);
															});
															reset(div_1);
															var node_32 = sibling(div_1, 2);
															var bind_get_1 = () => option_images[id()] || null;
															var bind_set_1 = (v) => option_images[id()] = v;
															Input(node_32, {
																type: "file",
																class: "dp-away",
																get ref() {
																	return bind_get_1();
																},
																set ref($$value) {
																	bind_set_1($$value);
																},
																accept: "image/*",
																onchange: (e) => {
																	store_mutate(form, untrack($form).id_option = id(), untrack($form));
																	store_mutate(form, untrack($form).option_image = e.currentTarget.files?.[0], untrack($form));
																	submit();
																}
															});
															append($$anchor$9, fragment_28);
														},
														$$slots: { default: true }
													});
												});
												var node_33 = sibling(node_28, 2);
												component(node_33, () => Table_cell, ($$anchor$8, Table_Cell_7) => {
													Table_Cell_7($$anchor$8, {
														class: "min-w-28",
														children: ($$anchor$9, $$slotProps$3) => {
															var fragment_33 = root_36$1();
															var div_2 = first_child(fragment_33);
															var node_34 = child(div_2);
															Form_button(node_34, {
																variant: "ghost",
																type: "button",
																onclick: () => option_previews[id()]?.click(),
																children: ($$anchor$10, $$slotProps$4) => {
																	var fragment_34 = comment();
																	var node_35 = first_child(fragment_34);
																	var consequent_4 = ($$anchor$11) => {
																		var img_2 = root_38$1();
																		template_effect(($0$1, $1) => {
																			set_attribute(img_2, "src", `${get(option).preview_thumb_url ?? ""}?date_upd=${$0$1 ?? ""}`);
																			set_attribute(img_2, "alt", $1);
																		}, [() => encodeURI(get(option).date_upd), () => _("Option preview")]);
																		append($$anchor$11, img_2);
																	};
																	var alternate_1 = ($$anchor$11) => {
																		var img_3 = root_39();
																		template_effect(($0$1, $1) => {
																			set_attribute(img_3, "src", $0$1);
																			set_attribute(img_3, "alt", $1);
																		}, [() => url("/empty.png"), () => _("Option preview")]);
																		append($$anchor$11, img_3);
																	};
																	if_block(node_35, ($$render) => {
																		if (get(option).preview_thumb_url) $$render(consequent_4);
																		else $$render(alternate_1, false);
																	});
																	append($$anchor$10, fragment_34);
																},
																$$slots: { default: true }
															});
															var node_36 = sibling(node_34, 2);
															var consequent_5 = ($$anchor$10) => {
																Form_button($$anchor$10, {
																	variant: "ghost",
																	size: "sm",
																	class: "text-destructive",
																	name: "delete-preview",
																	get value() {
																		return id();
																	},
																	onclick: (e) => {
																		if (!confirm(_("Are you sure you want to delete this image?"))) e.preventDefault();
																	},
																	children: ($$anchor$11, $$slotProps$4) => {
																		{
																			let $0$1 = user_derived(() => $submitting() && $form().action_name === "delete-preview" && $form().action_value === id().toString());
																			Spinner($$anchor$11, {
																				get loading() {
																					return get($0$1);
																				},
																				children: ($$anchor$12, $$slotProps$5) => {
																					Icon($$anchor$12, { icon: "mdi:trash-can" });
																				},
																				$$slots: { default: true }
																			});
																		}
																	},
																	$$slots: { default: true }
																});
															};
															if_block(node_36, ($$render) => {
																if (get(option).preview_thumb_url) $$render(consequent_5);
															});
															reset(div_2);
															var node_37 = sibling(div_2, 2);
															var bind_get_2 = () => option_previews[id()] || null;
															var bind_set_2 = (v) => option_previews[id()] = v;
															Input(node_37, {
																type: "file",
																class: "dp-away",
																get ref() {
																	return bind_get_2();
																},
																set ref($$value) {
																	bind_set_2($$value);
																},
																accept: "image/*",
																onchange: (e) => {
																	store_mutate(form, untrack($form).id_option = id(), untrack($form));
																	store_mutate(form, untrack($form).option_preview = e.currentTarget.files?.[0], untrack($form));
																	submit();
																}
															});
															append($$anchor$9, fragment_33);
														},
														$$slots: { default: true }
													});
												});
												component(sibling(node_33, 2), () => Table_cell, ($$anchor$8, Table_Cell_8) => {
													Table_Cell_8($$anchor$8, {
														children: ($$anchor$9, $$slotProps$3) => {
															var div_3 = root_43();
															var node_39 = child(div_3);
															{
																let $0$1 = user_derived(() => active() ? "text-green-500" : "text-red-500");
																let $1 = user_derived(() => _("Toggle option visibility"));
																Form_button(node_39, {
																	get class() {
																		return `flex gap-2 ${get($0$1) ?? ""}`;
																	},
																	variant: "ghost",
																	size: "sm",
																	name: "toggle",
																	get value() {
																		return id();
																	},
																	get title() {
																		return get($1);
																	},
																	children: ($$anchor$10, $$slotProps$4) => {
																		{
																			let $0$2 = user_derived(() => $submitting() && $form().action_name === "toggle" && $form().action_value === id().toString());
																			Spinner($$anchor$10, {
																				get loading() {
																					return get($0$2);
																				},
																				children: ($$anchor$11, $$slotProps$5) => {
																					{
																						let $0$3 = user_derived(() => active() ? "mdi:eye" : "mdi:eye-off");
																						Icon($$anchor$11, { get icon() {
																							return get($0$3);
																						} });
																					}
																				},
																				$$slots: { default: true }
																			});
																		}
																	},
																	$$slots: { default: true }
																});
															}
															var node_40 = sibling(node_39, 2);
															Form_button(node_40, {
																class: "text-destructive flex gap-2",
																variant: "ghost",
																size: "sm",
																form: "options-form",
																name: "delete",
																get value() {
																	return id();
																},
																onclick: (e) => {
																	if (!confirm(_("Are you sure you want to delete this option?"))) e.preventDefault();
																},
																children: ($$anchor$10, $$slotProps$4) => {
																	{
																		let $0$1 = user_derived(() => $submitting() && $form().action_name === "delete" && $form().action_value === id().toString());
																		Spinner($$anchor$10, {
																			get loading() {
																				return get($0$1);
																			},
																			children: ($$anchor$11, $$slotProps$5) => {
																				Icon($$anchor$11, { icon: "mdi:trash-can" });
																			},
																			$$slots: { default: true }
																		});
																	}
																},
																$$slots: { default: true }
															});
															var node_41 = sibling(node_40, 2);
															{
																let $0$1 = user_derived(() => cn(buttonVariants({
																	variant: "ghost",
																	size: "sm"
																}), "handle cursor-move"));
																let $1 = user_derived(() => _("Drag to reorder"));
																Label(node_41, {
																	get class() {
																		return get($0$1);
																	},
																	get title() {
																		return get($1);
																	},
																	children: ($$anchor$10, $$slotProps$4) => {
																		Icon($$anchor$10, { icon: "mdi:drag" });
																	},
																	$$slots: { default: true }
																});
															}
															reset(div_3);
															append($$anchor$9, div_3);
														},
														$$slots: { default: true }
													});
												});
												append($$anchor$7, fragment_19);
											},
											$$slots: { default: true }
										});
									});
								}
								append($$anchor$5, fragment_18);
							});
							append($$anchor$4, fragment_17);
						},
						$$slots: { default: true }
					});
				});
				component(sibling(node_17, 2), () => Table_footer, ($$anchor$3, Table_Footer) => {
					Table_Footer($$anchor$3, {
						children: ($$anchor$4, $$slotProps$1) => {
							var fragment_43 = comment();
							component(first_child(fragment_43), () => Table_row, ($$anchor$5, Table_Row_2) => {
								Table_Row_2($$anchor$5, {
									children: ($$anchor$6, $$slotProps$2) => {
										var fragment_44 = comment();
										component(first_child(fragment_44), () => Table_cell, ($$anchor$7, Table_Cell_9) => {
											Table_Cell_9($$anchor$7, {
												colspan: 9,
												children: ($$anchor$8, $$slotProps$3) => {
													var div_4 = root_51$1();
													var node_45 = child(div_4);
													var consequent_6 = ($$anchor$9) => {
														var fragment_45 = root_52$2();
														var node_46 = first_child(fragment_45);
														Form_button(node_46, {
															class: "bg-destructive text-destructive-foreground flex gap-2",
															form: "options-form",
															name: "delete-options",
															onclick: (e) => {
																if (!confirm(_("Are you sure you want to delete the selected options?"))) e.preventDefault();
															},
															children: ($$anchor$10, $$slotProps$4) => {
																var fragment_46 = root_53$1();
																var node_47 = first_child(fragment_46);
																{
																	let $0 = user_derived(() => $submitting() && $form().action_name === "delete-options");
																	Spinner(node_47, {
																		get loading() {
																			return get($0);
																		},
																		children: ($$anchor$11, $$slotProps$5) => {
																			Icon($$anchor$11, { icon: "mdi:trash-can" });
																		},
																		$$slots: { default: true }
																	});
																}
																var text_10 = sibling(node_47);
																template_effect(($0) => set_text(text_10, ` ${$0 ?? ""}`), [() => _("Delete selected options")]);
																append($$anchor$10, fragment_46);
															},
															$$slots: { default: true }
														});
														Form_button(sibling(node_46, 2), {
															variant: "outline",
															onclick: () => {
																store_mutate(form, untrack($form).checked = {}, untrack($form));
																store_mutate(form, untrack($form).check_all = false, untrack($form));
															},
															children: ($$anchor$10, $$slotProps$4) => {
																var fragment_48 = root_55$1();
																var node_49 = first_child(fragment_48);
																Icon(node_49, { icon: "mdi:close" });
																var text_11 = sibling(node_49);
																template_effect(($0) => set_text(text_11, ` ${$0 ?? ""}`), [() => _("Cancel")]);
																append($$anchor$10, fragment_48);
															},
															$$slots: { default: true }
														});
														append($$anchor$9, fragment_45);
													};
													var alternate_2 = ($$anchor$9) => {
														var fragment_49 = root_56$2();
														var node_50 = first_child(fragment_49);
														Form_button(node_50, {
															class: "flex gap-2",
															name: "add",
															variant: "outline",
															children: ($$anchor$10, $$slotProps$4) => {
																var fragment_50 = root_57();
																var node_51 = first_child(fragment_50);
																{
																	let $0 = user_derived(() => $submitting() && $form().action_name === "add");
																	Spinner(node_51, {
																		get loading() {
																			return get($0);
																		},
																		children: ($$anchor$11, $$slotProps$5) => {
																			Icon($$anchor$11, { icon: "mdi:plus" });
																		},
																		$$slots: { default: true }
																	});
																}
																var text_12 = sibling(node_51);
																template_effect(($0) => set_text(text_12, ` ${$0 ?? ""}`), [() => _("Add option")]);
																append($$anchor$10, fragment_50);
															},
															$$slots: { default: true }
														});
														var node_52 = sibling(node_50, 2);
														{
															let $0 = user_derived(() => $tainted()?.options && "btn-highlight");
															let $1 = user_derived(() => !$tainted()?.options);
															Form_button(node_52, {
																get class() {
																	return `flex gap-2 ${get($0) ?? ""}`;
																},
																get disabled() {
																	return get($1);
																},
																"data-testid": "save-options",
																children: ($$anchor$10, $$slotProps$4) => {
																	var fragment_52 = root_59();
																	var node_53 = first_child(fragment_52);
																	{
																		let $0$1 = user_derived(() => $submitting() && [
																			"update",
																			"duplicate",
																			"favorite",
																			"common"
																		].includes($form().action_name));
																		Spinner(node_53, {
																			get loading() {
																				return get($0$1);
																			},
																			children: ($$anchor$11, $$slotProps$5) => {
																				Icon($$anchor$11, { icon: "mdi:content-save" });
																			},
																			$$slots: { default: true }
																		});
																	}
																	var text_13 = sibling(node_53);
																	template_effect(($0$1) => set_text(text_13, ` ${$0$1 ?? ""}`), [() => _("Save options")]);
																	append($$anchor$10, fragment_52);
																},
																$$slots: { default: true }
															});
														}
														var node_54 = sibling(node_52, 2);
														Form_button(node_54, {
															class: "flex gap-2",
															variant: "outline",
															type: "button",
															name: "import-images",
															onclick: () => get(files_input)?.click(),
															children: ($$anchor$10, $$slotProps$4) => {
																var fragment_54 = root_61();
																var node_55 = first_child(fragment_54);
																{
																	let $0 = user_derived(() => $submitting() && $form().action_name === "import-images");
																	Spinner(node_55, {
																		get loading() {
																			return get($0);
																		},
																		children: ($$anchor$11, $$slotProps$5) => {
																			Icon($$anchor$11, { icon: "ic:baseline-publish" });
																		},
																		$$slots: { default: true }
																	});
																}
																var text_14 = sibling(node_55);
																template_effect(($0) => set_text(text_14, ` ${$0 ?? ""}`), [() => _("Import images")]);
																append($$anchor$10, fragment_54);
															},
															$$slots: { default: true }
														});
														var div_5 = sibling(node_54, 2);
														Input(child(div_5), {
															accept: "image/*",
															multiple: true,
															type: "file",
															onchange: (e) => {
																store_mutate(form, untrack($form).images = [...e.currentTarget.files ?? []], untrack($form));
																submit();
															},
															get ref() {
																return get(files_input);
															},
															set ref($$value) {
																set(files_input, $$value, true);
															}
														});
														reset(div_5);
														append($$anchor$9, fragment_49);
													};
													if_block(node_45, ($$render) => {
														if (Object.values($form().checked).some(Boolean)) $$render(consequent_6);
														else $$render(alternate_2, false);
													});
													reset(div_4);
													append($$anchor$8, div_4);
												},
												$$slots: { default: true }
											});
										});
										append($$anchor$6, fragment_44);
									},
									$$slots: { default: true }
								});
							});
							append($$anchor$4, fragment_43);
						},
						$$slots: { default: true }
					});
				});
				append($$anchor$2, fragment_4);
			},
			$$slots: { default: true }
		});
	});
	append($$anchor, fragment);
	pop();
	$$cleanup();
}
var root_3$3 = from_html(`<!> <!> <!> <!> <!> <!> <!> <!> <!> <!>`, 1);
var root_24 = from_html(`<div class="flex justify-center"><!></div>`);
var root_29$2 = from_html(`<img class="h-10 w-auto"/>`);
var root_30 = from_html(`<img class="h-10"/>`);
var root_27$2 = from_html(`<div class="flex items-center"><!> <!></div> <!>`, 1);
var root_37$1 = from_html(`<img class="h-10 w-auto"/>`);
var root_38 = from_html(`<img class="h-10"/>`);
var root_35$2 = from_html(`<div class="flex items-center"><!> <!></div> <!>`, 1);
var root_42$1 = from_html(`<div class="flex flex-nowrap justify-end gap-1"><!> <!> <!></div>`);
var root_17$1 = from_html(`<!> <!> <!> <!> <!> <!> <!> <!> <!> <!>`, 1);
var root_52$1 = from_html(`<!> `, 1);
var root_54$1 = from_html(`<!> `, 1);
var root_51 = from_html(`<!> <!>`, 1);
var root_56$1 = from_html(`<!> `, 1);
var root_58$1 = from_html(`<!> `, 1);
var root_60 = from_html(`<!> `, 1);
var root_55 = from_html(`<!> <!> <!> <div class="dp-away"><!></div>`, 1);
var root_50$1 = from_html(`<div class="flex gap-2"><!></div>`);
var root_1$3 = from_html(`<!> <!> <!>`, 1);
function ImageListOptions($$anchor, $$props) {
	push($$props, true);
	const $form = () => store_get(form, "$form", $$stores);
	const $submitting = () => store_get(submitting, "$submitting", $$stores);
	const $tainted = () => store_get(tainted, "$tainted", $$stores);
	const [$$stores, $$cleanup] = setup_stores();
	const { form, tainted, submit, submitting } = $$props.superform;
	const options = user_derived(() => sort($form().options));
	let files_input = state(null);
	let option_images = proxy({});
	let option_previews = proxy({});
	var fragment = comment();
	component(first_child(fragment), () => Table, ($$anchor$1, Table_Root) => {
		Table_Root($$anchor$1, {
			children: ($$anchor$2, $$slotProps) => {
				var fragment_1 = root_1$3();
				var node_1 = first_child(fragment_1);
				component(node_1, () => Table_header, ($$anchor$3, Table_Header) => {
					Table_Header($$anchor$3, {
						children: ($$anchor$4, $$slotProps$1) => {
							var fragment_2 = comment();
							component(first_child(fragment_2), () => Table_row, ($$anchor$5, Table_Row) => {
								Table_Row($$anchor$5, {
									children: ($$anchor$6, $$slotProps$2) => {
										var fragment_3 = root_3$3();
										var node_3 = first_child(fragment_3);
										component(node_3, () => Table_head, ($$anchor$7, Table_Head) => {
											Table_Head($$anchor$7, {
												class: "px-4! text-center",
												children: ($$anchor$8, $$slotProps$3) => {
													var fragment_4 = comment();
													var node_4 = first_child(fragment_4);
													var consequent = ($$anchor$9) => {
														{
															let $0 = user_derived(() => Object.values($form().checked).some(Boolean) && !Object.values($form().checked).every(Boolean));
															Checkbox($$anchor$9, {
																class: "border-gray-400",
																get indeterminate() {
																	return get($0);
																},
																onCheckedChange: () => {
																	store_mutate(form, untrack($form).checked = Object.fromEntries(Object.keys($form().options).map((id) => [id, $form().check_all])), untrack($form));
																},
																get checked() {
																	return $form().check_all;
																},
																set checked($$value) {
																	store_mutate(form, untrack($form).check_all = $$value, untrack($form));
																}
															});
														}
													};
													if_block(node_4, ($$render) => {
														if (Object.values($form().options).length > 1) $$render(consequent);
													});
													append($$anchor$8, fragment_4);
												},
												$$slots: { default: true }
											});
										});
										var node_5 = sibling(node_3, 2);
										component(node_5, () => Table_head, ($$anchor$7, Table_Head_1) => {
											Table_Head_1($$anchor$7, {
												children: ($$anchor$8, $$slotProps$3) => {
													next();
													var text$1 = text();
													template_effect(($0) => set_text(text$1, $0), [() => _("Label")]);
													append($$anchor$8, text$1);
												},
												$$slots: { default: true }
											});
										});
										var node_6 = sibling(node_5, 2);
										component(node_6, () => Table_head, ($$anchor$7, Table_Head_2) => {
											Table_Head_2($$anchor$7, {
												children: ($$anchor$8, $$slotProps$3) => {
													next();
													var text_1 = text();
													template_effect(($0) => set_text(text_1, $0), [() => _("Value")]);
													append($$anchor$8, text_1);
												},
												$$slots: { default: true }
											});
										});
										var node_7 = sibling(node_6, 2);
										{
											let $0 = user_derived(() => _("Secondary value"));
											component(node_7, () => Table_head, ($$anchor$7, Table_Head_3) => {
												Table_Head_3($$anchor$7, {
													get title() {
														return get($0);
													},
													children: ($$anchor$8, $$slotProps$3) => {
														next();
														var text_2 = text();
														template_effect(($0$1) => set_text(text_2, $0$1), [() => _("Sec. value")]);
														append($$anchor$8, text_2);
													},
													$$slots: { default: true }
												});
											});
										}
										var node_8 = sibling(node_7, 2);
										component(node_8, () => Table_head, ($$anchor$7, Table_Head_4) => {
											Table_Head_4($$anchor$7, {
												children: ($$anchor$8, $$slotProps$3) => {
													next();
													var text_3 = text();
													template_effect(($0) => set_text(text_3, $0), [() => _("SKU")]);
													append($$anchor$8, text_3);
												},
												$$slots: { default: true }
											});
										});
										var node_9 = sibling(node_8, 2);
										component(node_9, () => Table_head, ($$anchor$7, Table_Head_5) => {
											Table_Head_5($$anchor$7, {
												class: "text-center",
												children: ($$anchor$8, $$slotProps$3) => {
													next();
													var text_4 = text();
													template_effect(($0) => set_text(text_4, $0), [() => _("Default")]);
													append($$anchor$8, text_4);
												},
												$$slots: { default: true }
											});
										});
										var node_10 = sibling(node_9, 2);
										component(node_10, () => Table_head, ($$anchor$7, Table_Head_6) => {
											Table_Head_6($$anchor$7, {
												children: ($$anchor$8, $$slotProps$3) => {
													next();
													var text_5 = text();
													template_effect(($0) => set_text(text_5, $0), [() => _("Image")]);
													append($$anchor$8, text_5);
												},
												$$slots: { default: true }
											});
										});
										var node_11 = sibling(node_10, 2);
										component(node_11, () => Table_head, ($$anchor$7, Table_Head_7) => {
											Table_Head_7($$anchor$7, {
												align: "center",
												children: ($$anchor$8, $$slotProps$3) => {
													next();
													var text_6 = text();
													template_effect(($0) => set_text(text_6, $0), [() => _("Color")]);
													append($$anchor$8, text_6);
												},
												$$slots: { default: true }
											});
										});
										var node_12 = sibling(node_11, 2);
										component(node_12, () => Table_head, ($$anchor$7, Table_Head_8) => {
											Table_Head_8($$anchor$7, {
												children: ($$anchor$8, $$slotProps$3) => {
													next();
													var text_7 = text();
													template_effect(($0) => set_text(text_7, $0), [() => _("Preview")]);
													append($$anchor$8, text_7);
												},
												$$slots: { default: true }
											});
										});
										component(sibling(node_12, 2), () => Table_head, ($$anchor$7, Table_Head_9) => {
											Table_Head_9($$anchor$7, {
												class: "text-right",
												children: ($$anchor$8, $$slotProps$3) => {
													next();
													var text_8 = text();
													template_effect(($0) => set_text(text_8, $0), [() => _("Actions")]);
													append($$anchor$8, text_8);
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
				var node_14 = sibling(node_1, 2);
				component(node_14, () => Table_body, ($$anchor$3, Table_Body) => {
					Table_Body($$anchor$3, {
						children: ($$anchor$4, $$slotProps$1) => {
							var fragment_15 = comment();
							each(first_child(fragment_15), 17, () => get(options), ({ id, active, is_default }) => id, ($$anchor$5, $$item) => {
								let id = () => get($$item).id;
								let active = () => get($$item).active;
								let is_default = () => get($$item).is_default;
								const option = user_derived(() => $form().options[id()]);
								var fragment_16 = comment();
								var node_16 = first_child(fragment_16);
								{
									let $0 = user_derived(() => ({ "bg-destructive": $form().checked[id()] }));
									component(node_16, () => Table_row, ($$anchor$6, Table_Row_1) => {
										Table_Row_1($$anchor$6, {
											get "data-id"() {
												return id();
											},
											get class() {
												return get($0);
											},
											children: ($$anchor$7, $$slotProps$2) => {
												var fragment_17 = root_17$1();
												var node_17 = first_child(fragment_17);
												component(node_17, () => Table_cell, ($$anchor$8, Table_Cell) => {
													Table_Cell($$anchor$8, {
														class: "p-0! text-center",
														children: ($$anchor$9, $$slotProps$3) => {
															var fragment_18 = comment();
															var node_18 = first_child(fragment_18);
															var consequent_1 = ($$anchor$10) => {
																var bind_get = () => $form().checked[id()] || $form().check_all;
																var bind_set = (checked) => store_mutate(form, untrack($form).checked[id()] = checked, untrack($form));
																Checkbox($$anchor$10, {
																	class: "border-gray-400",
																	get checked() {
																		return bind_get();
																	},
																	set checked($$value) {
																		bind_set($$value);
																	},
																	onchange: () => {
																		store_mutate(form, untrack($form).check_all = Object.values($form().checked).every(Boolean), untrack($form));
																	}
																});
															};
															if_block(node_18, ($$render) => {
																if (Object.values($form().options).length > 1) $$render(consequent_1);
															});
															append($$anchor$9, fragment_18);
														},
														$$slots: { default: true }
													});
												});
												var node_19 = sibling(node_17, 2);
												component(node_19, () => Table_cell, ($$anchor$8, Table_Cell_1) => {
													Table_Cell_1($$anchor$8, {
														children: ($$anchor$9, $$slotProps$3) => {
															Input($$anchor$9, {
																class: "w-48",
																get value() {
																	return $form().options[id()].label[+lang.value];
																},
																set value($$value) {
																	store_mutate(form, untrack($form).options[id()].label[+lang.value] = $$value, untrack($form));
																}
															});
														},
														$$slots: { default: true }
													});
												});
												var node_20 = sibling(node_19, 2);
												component(node_20, () => Table_cell, ($$anchor$8, Table_Cell_2) => {
													Table_Cell_2($$anchor$8, {
														children: ($$anchor$9, $$slotProps$3) => {
															Input($$anchor$9, {
																class: "col-span-full row-span-full w-20",
																get value() {
																	return $form().options[id()].value;
																},
																set value($$value) {
																	store_mutate(form, untrack($form).options[id()].value = $$value, untrack($form));
																}
															});
														},
														$$slots: { default: true }
													});
												});
												var node_21 = sibling(node_20, 2);
												component(node_21, () => Table_cell, ($$anchor$8, Table_Cell_3) => {
													Table_Cell_3($$anchor$8, {
														children: ($$anchor$9, $$slotProps$3) => {
															Input($$anchor$9, {
																class: "col-span-full row-span-full w-20",
																get value() {
																	return $form().options[id()].secondary_value;
																},
																set value($$value) {
																	store_mutate(form, untrack($form).options[id()].secondary_value = $$value, untrack($form));
																}
															});
														},
														$$slots: { default: true }
													});
												});
												var node_22 = sibling(node_21, 2);
												component(node_22, () => Table_cell, ($$anchor$8, Table_Cell_4) => {
													Table_Cell_4($$anchor$8, {
														children: ($$anchor$9, $$slotProps$3) => {
															Input($$anchor$9, {
																class: "col-span-full row-span-full w-20",
																get value() {
																	return $form().options[id()].sku;
																},
																set value($$value) {
																	store_mutate(form, untrack($form).options[id()].sku = $$value, untrack($form));
																}
															});
														},
														$$slots: { default: true }
													});
												});
												var node_23 = sibling(node_22, 2);
												component(node_23, () => Table_cell, ($$anchor$8, Table_Cell_5) => {
													Table_Cell_5($$anchor$8, {
														children: ($$anchor$9, $$slotProps$3) => {
															var div = root_24();
															var node_24 = child(div);
															{
																let $0$1 = user_derived(() => is_default() ? "text-green-500" : "text-red-500");
																let $1 = user_derived(() => _("Toggle default option"));
																Form_button(node_24, {
																	get class() {
																		return `flex gap-2 ${get($0$1) ?? ""}`;
																	},
																	variant: "ghost",
																	size: "sm",
																	name: "toggle-default",
																	get value() {
																		return id();
																	},
																	get title() {
																		return get($1);
																	},
																	children: ($$anchor$10, $$slotProps$4) => {
																		{
																			let $0$2 = user_derived(() => $submitting() && $form().action_name === "toggle-default" && $form().action_value === id().toString());
																			Spinner($$anchor$10, {
																				get loading() {
																					return get($0$2);
																				},
																				children: ($$anchor$11, $$slotProps$5) => {
																					{
																						let $0$3 = user_derived(() => is_default() ? "ic:baseline-done" : "ic:outline-close");
																						Icon($$anchor$11, { get icon() {
																							return get($0$3);
																						} });
																					}
																				},
																				$$slots: { default: true }
																			});
																		}
																	},
																	$$slots: { default: true }
																});
															}
															reset(div);
															append($$anchor$9, div);
														},
														$$slots: { default: true }
													});
												});
												var node_25 = sibling(node_23, 2);
												component(node_25, () => Table_cell, ($$anchor$8, Table_Cell_6) => {
													Table_Cell_6($$anchor$8, {
														class: "min-w-28",
														children: ($$anchor$9, $$slotProps$3) => {
															var fragment_26 = root_27$2();
															var div_1 = first_child(fragment_26);
															var node_26 = child(div_1);
															Form_button(node_26, {
																variant: "ghost",
																type: "button",
																onclick: () => option_images[id()]?.click(),
																children: ($$anchor$10, $$slotProps$4) => {
																	var fragment_27 = comment();
																	var node_27 = first_child(fragment_27);
																	var consequent_2 = ($$anchor$11) => {
																		var img = root_29$2();
																		template_effect(($0$1, $1) => {
																			set_attribute(img, "width", get(option).image_width);
																			set_attribute(img, "height", get(option).image_height);
																			set_attribute(img, "src", `${get(option).thumb_url ?? ""}?date_upd=${$0$1 ?? ""}`);
																			set_attribute(img, "alt", $1);
																		}, [() => encodeURI(get(option).date_upd), () => _("Option image")]);
																		append($$anchor$11, img);
																	};
																	var alternate = ($$anchor$11) => {
																		var img_1 = root_30();
																		template_effect(($0$1, $1) => {
																			set_attribute(img_1, "src", $0$1);
																			set_attribute(img_1, "alt", $1);
																		}, [() => url("/empty.png"), () => _("Option image")]);
																		append($$anchor$11, img_1);
																	};
																	if_block(node_27, ($$render) => {
																		if (get(option).thumb_url) $$render(consequent_2);
																		else $$render(alternate, false);
																	});
																	append($$anchor$10, fragment_27);
																},
																$$slots: { default: true }
															});
															var node_28 = sibling(node_26, 2);
															var consequent_3 = ($$anchor$10) => {
																Form_button($$anchor$10, {
																	variant: "ghost",
																	size: "sm",
																	class: "text-destructive",
																	name: "delete-image",
																	get value() {
																		return id();
																	},
																	onclick: (e) => {
																		if (!confirm(_("Are you sure you want to delete this image?"))) e.preventDefault();
																	},
																	children: ($$anchor$11, $$slotProps$4) => {
																		{
																			let $0$1 = user_derived(() => $submitting() && $form().action_name === "delete-image" && $form().action_value === id().toString());
																			Spinner($$anchor$11, {
																				get loading() {
																					return get($0$1);
																				},
																				children: ($$anchor$12, $$slotProps$5) => {
																					Icon($$anchor$12, { icon: "mdi:trash-can" });
																				},
																				$$slots: { default: true }
																			});
																		}
																	},
																	$$slots: { default: true }
																});
															};
															if_block(node_28, ($$render) => {
																if (get(option).thumb_url) $$render(consequent_3);
															});
															reset(div_1);
															var node_29 = sibling(div_1, 2);
															var bind_get_1 = () => option_images[id()] || null;
															var bind_set_1 = (v) => option_images[id()] = v;
															Input(node_29, {
																type: "file",
																class: "dp-away",
																get ref() {
																	return bind_get_1();
																},
																set ref($$value) {
																	bind_set_1($$value);
																},
																accept: "image/*",
																onchange: (e) => {
																	store_mutate(form, untrack($form).id_option = id(), untrack($form));
																	store_mutate(form, untrack($form).option_image = e.currentTarget.files?.[0], untrack($form));
																	submit();
																}
															});
															append($$anchor$9, fragment_26);
														},
														$$slots: { default: true }
													});
												});
												var node_30 = sibling(node_25, 2);
												component(node_30, () => Table_cell, ($$anchor$8, Table_Cell_7) => {
													Table_Cell_7($$anchor$8, {
														align: "center",
														children: ($$anchor$9, $$slotProps$3) => {
															Input($$anchor$9, {
																type: "color",
																class: "w-10 p-0",
																get value() {
																	return $form().options[id()].color;
																},
																set value($$value) {
																	store_mutate(form, untrack($form).options[id()].color = $$value, untrack($form));
																}
															});
														},
														$$slots: { default: true }
													});
												});
												var node_31 = sibling(node_30, 2);
												component(node_31, () => Table_cell, ($$anchor$8, Table_Cell_8) => {
													Table_Cell_8($$anchor$8, {
														class: "min-w-28",
														children: ($$anchor$9, $$slotProps$3) => {
															var fragment_32 = root_35$2();
															var div_2 = first_child(fragment_32);
															var node_32 = child(div_2);
															Form_button(node_32, {
																variant: "ghost",
																type: "button",
																onclick: () => option_previews[id()]?.click(),
																children: ($$anchor$10, $$slotProps$4) => {
																	var fragment_33 = comment();
																	var node_33 = first_child(fragment_33);
																	var consequent_4 = ($$anchor$11) => {
																		var img_2 = root_37$1();
																		template_effect(($0$1, $1) => {
																			set_attribute(img_2, "src", `${get(option).preview_thumb_url ?? ""}?date_upd=${$0$1 ?? ""}`);
																			set_attribute(img_2, "alt", $1);
																		}, [() => encodeURI(get(option).date_upd), () => _("Option preview")]);
																		append($$anchor$11, img_2);
																	};
																	var alternate_1 = ($$anchor$11) => {
																		var img_3 = root_38();
																		template_effect(($0$1, $1) => {
																			set_attribute(img_3, "src", $0$1);
																			set_attribute(img_3, "alt", $1);
																		}, [() => url("/empty.png"), () => _("Option preview")]);
																		append($$anchor$11, img_3);
																	};
																	if_block(node_33, ($$render) => {
																		if (get(option).preview_thumb_url) $$render(consequent_4);
																		else $$render(alternate_1, false);
																	});
																	append($$anchor$10, fragment_33);
																},
																$$slots: { default: true }
															});
															var node_34 = sibling(node_32, 2);
															var consequent_5 = ($$anchor$10) => {
																Form_button($$anchor$10, {
																	variant: "ghost",
																	size: "sm",
																	class: "text-destructive",
																	name: "delete-preview",
																	get value() {
																		return id();
																	},
																	onclick: (e) => {
																		if (!confirm(_("Are you sure you want to delete this image?"))) e.preventDefault();
																	},
																	children: ($$anchor$11, $$slotProps$4) => {
																		{
																			let $0$1 = user_derived(() => $submitting() && $form().action_name === "delete-preview" && $form().action_value === id().toString());
																			Spinner($$anchor$11, {
																				get loading() {
																					return get($0$1);
																				},
																				children: ($$anchor$12, $$slotProps$5) => {
																					Icon($$anchor$12, { icon: "mdi:trash-can" });
																				},
																				$$slots: { default: true }
																			});
																		}
																	},
																	$$slots: { default: true }
																});
															};
															if_block(node_34, ($$render) => {
																if (get(option).preview_thumb_url) $$render(consequent_5);
															});
															reset(div_2);
															var node_35 = sibling(div_2, 2);
															var bind_get_2 = () => option_previews[id()] || null;
															var bind_set_2 = (v) => option_previews[id()] = v;
															Input(node_35, {
																type: "file",
																class: "dp-away",
																get ref() {
																	return bind_get_2();
																},
																set ref($$value) {
																	bind_set_2($$value);
																},
																accept: "image/*",
																onchange: (e) => {
																	store_mutate(form, untrack($form).id_option = id(), untrack($form));
																	store_mutate(form, untrack($form).option_preview = e.currentTarget.files?.[0], untrack($form));
																	submit();
																}
															});
															append($$anchor$9, fragment_32);
														},
														$$slots: { default: true }
													});
												});
												component(sibling(node_31, 2), () => Table_cell, ($$anchor$8, Table_Cell_9) => {
													Table_Cell_9($$anchor$8, {
														children: ($$anchor$9, $$slotProps$3) => {
															var div_3 = root_42$1();
															var node_37 = child(div_3);
															{
																let $0$1 = user_derived(() => active() ? "text-green-500" : "text-red-500");
																let $1 = user_derived(() => _("Toggle option visibility"));
																Form_button(node_37, {
																	get class() {
																		return `flex gap-2 ${get($0$1) ?? ""}`;
																	},
																	variant: "ghost",
																	size: "sm",
																	name: "toggle",
																	get value() {
																		return id();
																	},
																	get title() {
																		return get($1);
																	},
																	children: ($$anchor$10, $$slotProps$4) => {
																		{
																			let $0$2 = user_derived(() => $submitting() && $form().action_name === "toggle" && $form().action_value === id().toString());
																			Spinner($$anchor$10, {
																				get loading() {
																					return get($0$2);
																				},
																				children: ($$anchor$11, $$slotProps$5) => {
																					{
																						let $0$3 = user_derived(() => active() ? "mdi:eye" : "mdi:eye-off");
																						Icon($$anchor$11, { get icon() {
																							return get($0$3);
																						} });
																					}
																				},
																				$$slots: { default: true }
																			});
																		}
																	},
																	$$slots: { default: true }
																});
															}
															var node_38 = sibling(node_37, 2);
															Form_button(node_38, {
																class: "text-destructive flex gap-2",
																variant: "ghost",
																size: "sm",
																form: "options-form",
																name: "delete",
																get value() {
																	return id();
																},
																onclick: (e) => {
																	if (!confirm(_("Are you sure you want to delete this option?"))) e.preventDefault();
																},
																children: ($$anchor$10, $$slotProps$4) => {
																	{
																		let $0$1 = user_derived(() => $submitting() && $form().action_name === "delete" && $form().action_value === id().toString());
																		Spinner($$anchor$10, {
																			get loading() {
																				return get($0$1);
																			},
																			children: ($$anchor$11, $$slotProps$5) => {
																				Icon($$anchor$11, { icon: "mdi:trash-can" });
																			},
																			$$slots: { default: true }
																		});
																	}
																},
																$$slots: { default: true }
															});
															var node_39 = sibling(node_38, 2);
															{
																let $0$1 = user_derived(() => cn(buttonVariants({
																	variant: "ghost",
																	size: "sm"
																}), "handle cursor-move"));
																let $1 = user_derived(() => _("Drag to reorder"));
																Label(node_39, {
																	get class() {
																		return get($0$1);
																	},
																	get title() {
																		return get($1);
																	},
																	children: ($$anchor$10, $$slotProps$4) => {
																		Icon($$anchor$10, { icon: "mdi:drag" });
																	},
																	$$slots: { default: true }
																});
															}
															reset(div_3);
															append($$anchor$9, div_3);
														},
														$$slots: { default: true }
													});
												});
												append($$anchor$7, fragment_17);
											},
											$$slots: { default: true }
										});
									});
								}
								append($$anchor$5, fragment_16);
							});
							append($$anchor$4, fragment_15);
						},
						$$slots: { default: true }
					});
				});
				component(sibling(node_14, 2), () => Table_footer, ($$anchor$3, Table_Footer) => {
					Table_Footer($$anchor$3, {
						children: ($$anchor$4, $$slotProps$1) => {
							var fragment_42 = comment();
							component(first_child(fragment_42), () => Table_row, ($$anchor$5, Table_Row_2) => {
								Table_Row_2($$anchor$5, {
									children: ($$anchor$6, $$slotProps$2) => {
										var fragment_43 = comment();
										component(first_child(fragment_43), () => Table_cell, ($$anchor$7, Table_Cell_10) => {
											Table_Cell_10($$anchor$7, {
												colspan: 9,
												children: ($$anchor$8, $$slotProps$3) => {
													var div_4 = root_50$1();
													var node_43 = child(div_4);
													var consequent_6 = ($$anchor$9) => {
														var fragment_44 = root_51();
														var node_44 = first_child(fragment_44);
														Form_button(node_44, {
															class: "bg-destructive text-destructive-foreground flex gap-2",
															form: "options-form",
															name: "delete-options",
															onclick: (e) => {
																if (!confirm(_("Are you sure you want to delete the selected options?"))) e.preventDefault();
															},
															children: ($$anchor$10, $$slotProps$4) => {
																var fragment_45 = root_52$1();
																var node_45 = first_child(fragment_45);
																{
																	let $0 = user_derived(() => $submitting() && $form().action_name === "delete-options");
																	Spinner(node_45, {
																		get loading() {
																			return get($0);
																		},
																		children: ($$anchor$11, $$slotProps$5) => {
																			Icon($$anchor$11, { icon: "mdi:trash-can" });
																		},
																		$$slots: { default: true }
																	});
																}
																var text_9 = sibling(node_45);
																template_effect(($0) => set_text(text_9, ` ${$0 ?? ""}`), [() => _("Delete selected options")]);
																append($$anchor$10, fragment_45);
															},
															$$slots: { default: true }
														});
														Form_button(sibling(node_44, 2), {
															variant: "outline",
															onclick: () => {
																store_mutate(form, untrack($form).checked = {}, untrack($form));
																store_mutate(form, untrack($form).check_all = false, untrack($form));
															},
															children: ($$anchor$10, $$slotProps$4) => {
																var fragment_47 = root_54$1();
																var node_47 = first_child(fragment_47);
																Icon(node_47, { icon: "mdi:close" });
																var text_10 = sibling(node_47);
																template_effect(($0) => set_text(text_10, ` ${$0 ?? ""}`), [() => _("Cancel")]);
																append($$anchor$10, fragment_47);
															},
															$$slots: { default: true }
														});
														append($$anchor$9, fragment_44);
													};
													var alternate_2 = ($$anchor$9) => {
														var fragment_48 = root_55();
														var node_48 = first_child(fragment_48);
														Form_button(node_48, {
															class: "flex gap-2",
															name: "add",
															variant: "outline",
															children: ($$anchor$10, $$slotProps$4) => {
																var fragment_49 = root_56$1();
																var node_49 = first_child(fragment_49);
																{
																	let $0 = user_derived(() => $submitting() && $form().action_name === "add");
																	Spinner(node_49, {
																		get loading() {
																			return get($0);
																		},
																		children: ($$anchor$11, $$slotProps$5) => {
																			Icon($$anchor$11, { icon: "mdi:plus" });
																		},
																		$$slots: { default: true }
																	});
																}
																var text_11 = sibling(node_49);
																template_effect(($0) => set_text(text_11, ` ${$0 ?? ""}`), [() => _("Add option")]);
																append($$anchor$10, fragment_49);
															},
															$$slots: { default: true }
														});
														var node_50 = sibling(node_48, 2);
														{
															let $0 = user_derived(() => $tainted()?.options && "btn-highlight");
															let $1 = user_derived(() => !$tainted()?.options);
															Form_button(node_50, {
																get class() {
																	return `flex gap-2 ${get($0) ?? ""}`;
																},
																get disabled() {
																	return get($1);
																},
																children: ($$anchor$10, $$slotProps$4) => {
																	var fragment_51 = root_58$1();
																	var node_51 = first_child(fragment_51);
																	{
																		let $0$1 = user_derived(() => $submitting() && [
																			"update",
																			"duplicate",
																			"favorite",
																			"common"
																		].includes($form().action_name));
																		Spinner(node_51, {
																			get loading() {
																				return get($0$1);
																			},
																			children: ($$anchor$11, $$slotProps$5) => {
																				Icon($$anchor$11, { icon: "mdi:content-save" });
																			},
																			$$slots: { default: true }
																		});
																	}
																	var text_12 = sibling(node_51);
																	template_effect(($0$1) => set_text(text_12, ` ${$0$1 ?? ""}`), [() => _("Save options")]);
																	append($$anchor$10, fragment_51);
																},
																$$slots: { default: true }
															});
														}
														var node_52 = sibling(node_50, 2);
														Form_button(node_52, {
															class: "flex gap-2",
															variant: "outline",
															type: "button",
															name: "import-images",
															onclick: () => get(files_input)?.click(),
															children: ($$anchor$10, $$slotProps$4) => {
																var fragment_53 = root_60();
																var node_53 = first_child(fragment_53);
																{
																	let $0 = user_derived(() => $submitting() && $form().action_name === "import-images");
																	Spinner(node_53, {
																		get loading() {
																			return get($0);
																		},
																		children: ($$anchor$11, $$slotProps$5) => {
																			Icon($$anchor$11, { icon: "ic:baseline-publish" });
																		},
																		$$slots: { default: true }
																	});
																}
																var text_13 = sibling(node_53);
																template_effect(($0) => set_text(text_13, ` ${$0 ?? ""}`), [() => _("Import images")]);
																append($$anchor$10, fragment_53);
															},
															$$slots: { default: true }
														});
														var div_5 = sibling(node_52, 2);
														Input(child(div_5), {
															accept: "image/*",
															multiple: true,
															type: "file",
															onchange: (e) => {
																store_mutate(form, untrack($form).images = [...e.currentTarget.files ?? []], untrack($form));
																submit();
															},
															get ref() {
																return get(files_input);
															},
															set ref($$value) {
																set(files_input, $$value, true);
															}
														});
														reset(div_5);
														append($$anchor$9, fragment_48);
													};
													if_block(node_43, ($$render) => {
														if (Object.values($form().checked).some(Boolean)) $$render(consequent_6);
														else $$render(alternate_2, false);
													});
													reset(div_4);
													append($$anchor$8, div_4);
												},
												$$slots: { default: true }
											});
										});
										append($$anchor$6, fragment_43);
									},
									$$slots: { default: true }
								});
							});
							append($$anchor$4, fragment_42);
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
var root_3$2 = from_html(`<!> <!> <!> <!> <!> <!> <!> <!>`, 1);
var root_22$1 = from_html(`<div class="flex justify-center"><!></div>`);
var root_27$1 = from_html(`<img class="h-10 w-auto"/>`);
var root_28$2 = from_html(`<img class="h-10 w-auto"/>`);
var root_25 = from_html(`<div class="flex items-center"><!> <!></div> <!>`, 1);
var root_32$1 = from_html(`<div class="flex flex-nowrap justify-end gap-1"><!> <!> <!></div>`);
var root_15$1 = from_html(`<!> <!> <!> <!> <!> <!> <!> <!>`, 1);
var root_42 = from_html(`<!> `, 1);
var root_44 = from_html(`<!> `, 1);
var root_41 = from_html(`<!> <!>`, 1);
var root_46 = from_html(`<!> `, 1);
var root_48$1 = from_html(`<!> `, 1);
var root_45 = from_html(`<!> <!>`, 1);
var root_40$1 = from_html(`<div class="flex gap-2"><!></div>`);
var root_1$2 = from_html(`<!> <!> <!>`, 1);
function RadioOptions($$anchor, $$props) {
	push($$props, true);
	const $form = () => store_get(form, "$form", $$stores);
	const $submitting = () => store_get(submitting, "$submitting", $$stores);
	const $tainted = () => store_get(tainted, "$tainted", $$stores);
	const [$$stores, $$cleanup] = setup_stores();
	const { form, tainted, submit, submitting } = $$props.superform;
	const options = user_derived(() => sort($form().options));
	let option_previews = proxy({});
	var fragment = comment();
	component(first_child(fragment), () => Table, ($$anchor$1, Table_Root) => {
		Table_Root($$anchor$1, {
			children: ($$anchor$2, $$slotProps) => {
				var fragment_1 = root_1$2();
				var node_1 = first_child(fragment_1);
				component(node_1, () => Table_header, ($$anchor$3, Table_Header) => {
					Table_Header($$anchor$3, {
						children: ($$anchor$4, $$slotProps$1) => {
							var fragment_2 = comment();
							component(first_child(fragment_2), () => Table_row, ($$anchor$5, Table_Row) => {
								Table_Row($$anchor$5, {
									children: ($$anchor$6, $$slotProps$2) => {
										var fragment_3 = root_3$2();
										var node_3 = first_child(fragment_3);
										component(node_3, () => Table_head, ($$anchor$7, Table_Head) => {
											Table_Head($$anchor$7, {
												class: "px-4! text-center",
												children: ($$anchor$8, $$slotProps$3) => {
													var fragment_4 = comment();
													var node_4 = first_child(fragment_4);
													var consequent = ($$anchor$9) => {
														{
															let $0 = user_derived(() => Object.values($form().checked).some(Boolean) && !Object.values($form().checked).every(Boolean));
															Checkbox($$anchor$9, {
																class: "border-gray-400",
																get indeterminate() {
																	return get($0);
																},
																onCheckedChange: () => {
																	store_mutate(form, untrack($form).checked = Object.fromEntries(Object.keys($form().options).map((id) => [id, $form().check_all])), untrack($form));
																},
																get checked() {
																	return $form().check_all;
																},
																set checked($$value) {
																	store_mutate(form, untrack($form).check_all = $$value, untrack($form));
																}
															});
														}
													};
													if_block(node_4, ($$render) => {
														if (Object.values($form().options).length > 1) $$render(consequent);
													});
													append($$anchor$8, fragment_4);
												},
												$$slots: { default: true }
											});
										});
										var node_5 = sibling(node_3, 2);
										component(node_5, () => Table_head, ($$anchor$7, Table_Head_1) => {
											Table_Head_1($$anchor$7, {
												children: ($$anchor$8, $$slotProps$3) => {
													next();
													var text$1 = text();
													template_effect(($0) => set_text(text$1, $0), [() => _("Label")]);
													append($$anchor$8, text$1);
												},
												$$slots: { default: true }
											});
										});
										var node_6 = sibling(node_5, 2);
										component(node_6, () => Table_head, ($$anchor$7, Table_Head_2) => {
											Table_Head_2($$anchor$7, {
												children: ($$anchor$8, $$slotProps$3) => {
													next();
													var text_1 = text();
													template_effect(($0) => set_text(text_1, $0), [() => _("Value")]);
													append($$anchor$8, text_1);
												},
												$$slots: { default: true }
											});
										});
										var node_7 = sibling(node_6, 2);
										{
											let $0 = user_derived(() => _("Secondary value"));
											component(node_7, () => Table_head, ($$anchor$7, Table_Head_3) => {
												Table_Head_3($$anchor$7, {
													get title() {
														return get($0);
													},
													children: ($$anchor$8, $$slotProps$3) => {
														next();
														var text_2 = text();
														template_effect(($0$1) => set_text(text_2, $0$1), [() => _("Sec. value")]);
														append($$anchor$8, text_2);
													},
													$$slots: { default: true }
												});
											});
										}
										var node_8 = sibling(node_7, 2);
										component(node_8, () => Table_head, ($$anchor$7, Table_Head_4) => {
											Table_Head_4($$anchor$7, {
												children: ($$anchor$8, $$slotProps$3) => {
													next();
													var text_3 = text();
													template_effect(($0) => set_text(text_3, $0), [() => _("SKU")]);
													append($$anchor$8, text_3);
												},
												$$slots: { default: true }
											});
										});
										var node_9 = sibling(node_8, 2);
										component(node_9, () => Table_head, ($$anchor$7, Table_Head_5) => {
											Table_Head_5($$anchor$7, {
												class: "text-center",
												children: ($$anchor$8, $$slotProps$3) => {
													next();
													var text_4 = text();
													template_effect(($0) => set_text(text_4, $0), [() => _("Default")]);
													append($$anchor$8, text_4);
												},
												$$slots: { default: true }
											});
										});
										var node_10 = sibling(node_9, 2);
										component(node_10, () => Table_head, ($$anchor$7, Table_Head_6) => {
											Table_Head_6($$anchor$7, {
												children: ($$anchor$8, $$slotProps$3) => {
													next();
													var text_5 = text();
													template_effect(($0) => set_text(text_5, $0), [() => _("Preview")]);
													append($$anchor$8, text_5);
												},
												$$slots: { default: true }
											});
										});
										component(sibling(node_10, 2), () => Table_head, ($$anchor$7, Table_Head_7) => {
											Table_Head_7($$anchor$7, {
												class: "text-right",
												children: ($$anchor$8, $$slotProps$3) => {
													next();
													var text_6 = text();
													template_effect(($0) => set_text(text_6, $0), [() => _("Actions")]);
													append($$anchor$8, text_6);
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
				var node_12 = sibling(node_1, 2);
				component(node_12, () => Table_body, ($$anchor$3, Table_Body) => {
					Table_Body($$anchor$3, {
						children: ($$anchor$4, $$slotProps$1) => {
							var fragment_13 = comment();
							each(first_child(fragment_13), 17, () => get(options), ({ id, active, is_default }) => id, ($$anchor$5, $$item) => {
								let id = () => get($$item).id;
								let active = () => get($$item).active;
								let is_default = () => get($$item).is_default;
								const option = user_derived(() => $form().options[id()]);
								var fragment_14 = comment();
								var node_14 = first_child(fragment_14);
								{
									let $0 = user_derived(() => ({ "bg-destructive": $form().checked[id()] }));
									component(node_14, () => Table_row, ($$anchor$6, Table_Row_1) => {
										Table_Row_1($$anchor$6, {
											get "data-id"() {
												return id();
											},
											get class() {
												return get($0);
											},
											children: ($$anchor$7, $$slotProps$2) => {
												var fragment_15 = root_15$1();
												var node_15 = first_child(fragment_15);
												component(node_15, () => Table_cell, ($$anchor$8, Table_Cell) => {
													Table_Cell($$anchor$8, {
														class: "p-0! text-center",
														children: ($$anchor$9, $$slotProps$3) => {
															var fragment_16 = comment();
															var node_16 = first_child(fragment_16);
															var consequent_1 = ($$anchor$10) => {
																var bind_get = () => $form().checked[id()] || $form().check_all;
																var bind_set = (checked) => store_mutate(form, untrack($form).checked[id()] = checked, untrack($form));
																Checkbox($$anchor$10, {
																	class: "border-gray-400",
																	get checked() {
																		return bind_get();
																	},
																	set checked($$value) {
																		bind_set($$value);
																	},
																	onchange: () => {
																		store_mutate(form, untrack($form).check_all = Object.values($form().checked).every(Boolean), untrack($form));
																	}
																});
															};
															if_block(node_16, ($$render) => {
																if (Object.values($form().options).length > 1) $$render(consequent_1);
															});
															append($$anchor$9, fragment_16);
														},
														$$slots: { default: true }
													});
												});
												var node_17 = sibling(node_15, 2);
												component(node_17, () => Table_cell, ($$anchor$8, Table_Cell_1) => {
													Table_Cell_1($$anchor$8, {
														children: ($$anchor$9, $$slotProps$3) => {
															Input($$anchor$9, {
																class: "w-48",
																get value() {
																	return $form().options[id()].label[+lang.value];
																},
																set value($$value) {
																	store_mutate(form, untrack($form).options[id()].label[+lang.value] = $$value, untrack($form));
																}
															});
														},
														$$slots: { default: true }
													});
												});
												var node_18 = sibling(node_17, 2);
												component(node_18, () => Table_cell, ($$anchor$8, Table_Cell_2) => {
													Table_Cell_2($$anchor$8, {
														children: ($$anchor$9, $$slotProps$3) => {
															Input($$anchor$9, {
																class: "col-span-full row-span-full w-20",
																get value() {
																	return $form().options[id()].value;
																},
																set value($$value) {
																	store_mutate(form, untrack($form).options[id()].value = $$value, untrack($form));
																}
															});
														},
														$$slots: { default: true }
													});
												});
												var node_19 = sibling(node_18, 2);
												component(node_19, () => Table_cell, ($$anchor$8, Table_Cell_3) => {
													Table_Cell_3($$anchor$8, {
														children: ($$anchor$9, $$slotProps$3) => {
															Input($$anchor$9, {
																class: "col-span-full row-span-full w-20",
																get value() {
																	return $form().options[id()].secondary_value;
																},
																set value($$value) {
																	store_mutate(form, untrack($form).options[id()].secondary_value = $$value, untrack($form));
																}
															});
														},
														$$slots: { default: true }
													});
												});
												var node_20 = sibling(node_19, 2);
												component(node_20, () => Table_cell, ($$anchor$8, Table_Cell_4) => {
													Table_Cell_4($$anchor$8, {
														children: ($$anchor$9, $$slotProps$3) => {
															Input($$anchor$9, {
																class: "col-span-full row-span-full w-20",
																get value() {
																	return $form().options[id()].sku;
																},
																set value($$value) {
																	store_mutate(form, untrack($form).options[id()].sku = $$value, untrack($form));
																}
															});
														},
														$$slots: { default: true }
													});
												});
												var node_21 = sibling(node_20, 2);
												component(node_21, () => Table_cell, ($$anchor$8, Table_Cell_5) => {
													Table_Cell_5($$anchor$8, {
														children: ($$anchor$9, $$slotProps$3) => {
															var div = root_22$1();
															var node_22 = child(div);
															{
																let $0$1 = user_derived(() => is_default() ? "text-green-500" : "text-red-500");
																let $1 = user_derived(() => _("Toggle default option"));
																Form_button(node_22, {
																	get class() {
																		return `flex gap-2 ${get($0$1) ?? ""}`;
																	},
																	variant: "ghost",
																	size: "sm",
																	name: "toggle-default",
																	get value() {
																		return id();
																	},
																	get title() {
																		return get($1);
																	},
																	children: ($$anchor$10, $$slotProps$4) => {
																		{
																			let $0$2 = user_derived(() => $submitting() && $form().action_name === "toggle-default" && $form().action_value === id().toString());
																			Spinner($$anchor$10, {
																				get loading() {
																					return get($0$2);
																				},
																				children: ($$anchor$11, $$slotProps$5) => {
																					{
																						let $0$3 = user_derived(() => is_default() ? "ic:baseline-done" : "ic:outline-close");
																						Icon($$anchor$11, { get icon() {
																							return get($0$3);
																						} });
																					}
																				},
																				$$slots: { default: true }
																			});
																		}
																	},
																	$$slots: { default: true }
																});
															}
															reset(div);
															append($$anchor$9, div);
														},
														$$slots: { default: true }
													});
												});
												var node_23 = sibling(node_21, 2);
												component(node_23, () => Table_cell, ($$anchor$8, Table_Cell_6) => {
													Table_Cell_6($$anchor$8, {
														class: "min-w-28",
														children: ($$anchor$9, $$slotProps$3) => {
															var fragment_24 = root_25();
															var div_1 = first_child(fragment_24);
															var node_24 = child(div_1);
															Form_button(node_24, {
																variant: "ghost",
																type: "button",
																onclick: () => option_previews[id()]?.click(),
																children: ($$anchor$10, $$slotProps$4) => {
																	var fragment_25 = comment();
																	var node_25 = first_child(fragment_25);
																	var consequent_2 = ($$anchor$11) => {
																		var img = root_27$1();
																		template_effect(($0$1, $1) => {
																			set_attribute(img, "src", `${get(option).preview_thumb_url ?? ""}?date_upd=${$0$1 ?? ""}`);
																			set_attribute(img, "alt", $1);
																		}, [() => encodeURI(get(option).date_upd), () => _("Option preview")]);
																		append($$anchor$11, img);
																	};
																	var alternate = ($$anchor$11) => {
																		var img_1 = root_28$2();
																		template_effect(($0$1, $1) => {
																			set_attribute(img_1, "src", $0$1);
																			set_attribute(img_1, "alt", $1);
																		}, [() => url("/empty.png"), () => _("Option preview")]);
																		append($$anchor$11, img_1);
																	};
																	if_block(node_25, ($$render) => {
																		if (get(option).preview_thumb_url) $$render(consequent_2);
																		else $$render(alternate, false);
																	});
																	append($$anchor$10, fragment_25);
																},
																$$slots: { default: true }
															});
															var node_26 = sibling(node_24, 2);
															var consequent_3 = ($$anchor$10) => {
																Form_button($$anchor$10, {
																	variant: "ghost",
																	size: "sm",
																	class: "text-destructive",
																	name: "delete-preview",
																	get value() {
																		return id();
																	},
																	onclick: (e) => {
																		if (!confirm(_("Are you sure you want to delete this image?"))) e.preventDefault();
																	},
																	children: ($$anchor$11, $$slotProps$4) => {
																		{
																			let $0$1 = user_derived(() => $submitting() && $form().action_name === "delete-preview" && $form().action_value === id().toString());
																			Spinner($$anchor$11, {
																				get loading() {
																					return get($0$1);
																				},
																				children: ($$anchor$12, $$slotProps$5) => {
																					Icon($$anchor$12, { icon: "mdi:trash-can" });
																				},
																				$$slots: { default: true }
																			});
																		}
																	},
																	$$slots: { default: true }
																});
															};
															if_block(node_26, ($$render) => {
																if (get(option).preview_thumb_url) $$render(consequent_3);
															});
															reset(div_1);
															var node_27 = sibling(div_1, 2);
															var bind_get_1 = () => option_previews[id()] || null;
															var bind_set_1 = (v) => option_previews[id()] = v;
															Input(node_27, {
																type: "file",
																class: "dp-away",
																get ref() {
																	return bind_get_1();
																},
																set ref($$value) {
																	bind_set_1($$value);
																},
																accept: "image/*",
																onchange: (e) => {
																	store_mutate(form, untrack($form).id_option = id(), untrack($form));
																	store_mutate(form, untrack($form).option_preview = e.currentTarget.files?.[0], untrack($form));
																	submit();
																}
															});
															append($$anchor$9, fragment_24);
														},
														$$slots: { default: true }
													});
												});
												component(sibling(node_23, 2), () => Table_cell, ($$anchor$8, Table_Cell_7) => {
													Table_Cell_7($$anchor$8, {
														children: ($$anchor$9, $$slotProps$3) => {
															var div_2 = root_32$1();
															var node_29 = child(div_2);
															{
																let $0$1 = user_derived(() => active() ? "text-green-500" : "text-red-500");
																let $1 = user_derived(() => _("Toggle option visibility"));
																Form_button(node_29, {
																	get class() {
																		return `flex gap-2 ${get($0$1) ?? ""}`;
																	},
																	variant: "ghost",
																	size: "sm",
																	name: "toggle",
																	get value() {
																		return id();
																	},
																	get title() {
																		return get($1);
																	},
																	children: ($$anchor$10, $$slotProps$4) => {
																		{
																			let $0$2 = user_derived(() => $submitting() && $form().action_name === "toggle" && $form().action_value === id().toString());
																			Spinner($$anchor$10, {
																				get loading() {
																					return get($0$2);
																				},
																				children: ($$anchor$11, $$slotProps$5) => {
																					{
																						let $0$3 = user_derived(() => active() ? "mdi:eye" : "mdi:eye-off");
																						Icon($$anchor$11, { get icon() {
																							return get($0$3);
																						} });
																					}
																				},
																				$$slots: { default: true }
																			});
																		}
																	},
																	$$slots: { default: true }
																});
															}
															var node_30 = sibling(node_29, 2);
															Form_button(node_30, {
																class: "text-destructive flex gap-2",
																variant: "ghost",
																size: "sm",
																form: "options-form",
																name: "delete",
																get value() {
																	return id();
																},
																onclick: (e) => {
																	if (!confirm(_("Are you sure you want to delete this option?"))) e.preventDefault();
																},
																children: ($$anchor$10, $$slotProps$4) => {
																	{
																		let $0$1 = user_derived(() => $submitting() && $form().action_name === "delete" && $form().action_value === id().toString());
																		Spinner($$anchor$10, {
																			get loading() {
																				return get($0$1);
																			},
																			children: ($$anchor$11, $$slotProps$5) => {
																				Icon($$anchor$11, { icon: "mdi:trash-can" });
																			},
																			$$slots: { default: true }
																		});
																	}
																},
																$$slots: { default: true }
															});
															var node_31 = sibling(node_30, 2);
															{
																let $0$1 = user_derived(() => cn(buttonVariants({
																	variant: "ghost",
																	size: "sm"
																}), "handle cursor-move"));
																let $1 = user_derived(() => _("Drag to reorder"));
																Label(node_31, {
																	get class() {
																		return get($0$1);
																	},
																	get title() {
																		return get($1);
																	},
																	children: ($$anchor$10, $$slotProps$4) => {
																		Icon($$anchor$10, { icon: "mdi:drag" });
																	},
																	$$slots: { default: true }
																});
															}
															reset(div_2);
															append($$anchor$9, div_2);
														},
														$$slots: { default: true }
													});
												});
												append($$anchor$7, fragment_15);
											},
											$$slots: { default: true }
										});
									});
								}
								append($$anchor$5, fragment_14);
							});
							append($$anchor$4, fragment_13);
						},
						$$slots: { default: true }
					});
				});
				component(sibling(node_12, 2), () => Table_footer, ($$anchor$3, Table_Footer) => {
					Table_Footer($$anchor$3, {
						children: ($$anchor$4, $$slotProps$1) => {
							var fragment_34 = comment();
							component(first_child(fragment_34), () => Table_row, ($$anchor$5, Table_Row_2) => {
								Table_Row_2($$anchor$5, {
									children: ($$anchor$6, $$slotProps$2) => {
										var fragment_35 = comment();
										component(first_child(fragment_35), () => Table_cell, ($$anchor$7, Table_Cell_8) => {
											Table_Cell_8($$anchor$7, {
												colspan: 9,
												children: ($$anchor$8, $$slotProps$3) => {
													var div_3 = root_40$1();
													var node_35 = child(div_3);
													var consequent_4 = ($$anchor$9) => {
														var fragment_36 = root_41();
														var node_36 = first_child(fragment_36);
														Form_button(node_36, {
															class: "bg-destructive text-destructive-foreground flex gap-2",
															form: "options-form",
															name: "delete-options",
															onclick: (e) => {
																if (!confirm(_("Are you sure you want to delete the selected options?"))) e.preventDefault();
															},
															children: ($$anchor$10, $$slotProps$4) => {
																var fragment_37 = root_42();
																var node_37 = first_child(fragment_37);
																{
																	let $0 = user_derived(() => $submitting() && $form().action_name === "delete-options");
																	Spinner(node_37, {
																		get loading() {
																			return get($0);
																		},
																		children: ($$anchor$11, $$slotProps$5) => {
																			Icon($$anchor$11, { icon: "mdi:trash-can" });
																		},
																		$$slots: { default: true }
																	});
																}
																var text_7 = sibling(node_37);
																template_effect(($0) => set_text(text_7, ` ${$0 ?? ""}`), [() => _("Delete selected options")]);
																append($$anchor$10, fragment_37);
															},
															$$slots: { default: true }
														});
														Form_button(sibling(node_36, 2), {
															variant: "outline",
															onclick: () => {
																store_mutate(form, untrack($form).checked = {}, untrack($form));
																store_mutate(form, untrack($form).check_all = false, untrack($form));
															},
															children: ($$anchor$10, $$slotProps$4) => {
																var fragment_39 = root_44();
																var node_39 = first_child(fragment_39);
																Icon(node_39, { icon: "mdi:close" });
																var text_8 = sibling(node_39);
																template_effect(($0) => set_text(text_8, ` ${$0 ?? ""}`), [() => _("Cancel")]);
																append($$anchor$10, fragment_39);
															},
															$$slots: { default: true }
														});
														append($$anchor$9, fragment_36);
													};
													var alternate_1 = ($$anchor$9) => {
														var fragment_40 = root_45();
														var node_40 = first_child(fragment_40);
														Form_button(node_40, {
															class: "flex gap-2",
															name: "add",
															variant: "outline",
															children: ($$anchor$10, $$slotProps$4) => {
																var fragment_41 = root_46();
																var node_41 = first_child(fragment_41);
																{
																	let $0 = user_derived(() => $submitting() && $form().action_name === "add");
																	Spinner(node_41, {
																		get loading() {
																			return get($0);
																		},
																		children: ($$anchor$11, $$slotProps$5) => {
																			Icon($$anchor$11, { icon: "mdi:plus" });
																		},
																		$$slots: { default: true }
																	});
																}
																var text_9 = sibling(node_41);
																template_effect(($0) => set_text(text_9, ` ${$0 ?? ""}`), [() => _("Add option")]);
																append($$anchor$10, fragment_41);
															},
															$$slots: { default: true }
														});
														var node_42 = sibling(node_40, 2);
														{
															let $0 = user_derived(() => $tainted()?.options && "btn-highlight");
															let $1 = user_derived(() => !$tainted()?.options);
															Form_button(node_42, {
																get class() {
																	return `flex gap-2 ${get($0) ?? ""}`;
																},
																get disabled() {
																	return get($1);
																},
																children: ($$anchor$10, $$slotProps$4) => {
																	var fragment_43 = root_48$1();
																	var node_43 = first_child(fragment_43);
																	{
																		let $0$1 = user_derived(() => $submitting() && [
																			"update",
																			"duplicate",
																			"favorite",
																			"common"
																		].includes($form().action_name));
																		Spinner(node_43, {
																			get loading() {
																				return get($0$1);
																			},
																			children: ($$anchor$11, $$slotProps$5) => {
																				Icon($$anchor$11, { icon: "mdi:content-save" });
																			},
																			$$slots: { default: true }
																		});
																	}
																	var text_10 = sibling(node_43);
																	template_effect(($0$1) => set_text(text_10, ` ${$0$1 ?? ""}`), [() => _("Save options")]);
																	append($$anchor$10, fragment_43);
																},
																$$slots: { default: true }
															});
														}
														append($$anchor$9, fragment_40);
													};
													if_block(node_35, ($$render) => {
														if (Object.values($form().checked).some(Boolean)) $$render(consequent_4);
														else $$render(alternate_1, false);
													});
													reset(div_3);
													append($$anchor$8, div_3);
												},
												$$slots: { default: true }
											});
										});
										append($$anchor$6, fragment_35);
									},
									$$slots: { default: true }
								});
							});
							append($$anchor$4, fragment_34);
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
var root_3$1 = from_html(`<!> <!> <!> <!>`, 1);
var root_17 = from_html(`<img class="h-10 w-auto"/>`);
var root_18 = from_html(`<img class="h-10 w-auto"/>`);
var root_15 = from_html(`<div class="flex items-center"><!> <!></div> <!>`, 1);
var root_22 = from_html(`<div class="flex flex-nowrap justify-end gap-1"><!></div>`);
var root_11 = from_html(`<!> <!> <!> <!>`, 1);
var root_29$1 = from_html(`<!> `, 1);
var root_31 = from_html(`<!> `, 1);
var root_28$1 = from_html(`<!> <!>`, 1);
var root_33$1 = from_html(`<!> `, 1);
var root_35$1 = from_html(`<!> `, 1);
var root_37 = from_html(`<!> `, 1);
var root_32 = from_html(`<!> <!> <!> <div class="dp-away"><!></div>`, 1);
var root_27 = from_html(`<div class="flex gap-2"><!></div>`);
var root_1$1 = from_html(`<!> <!> <!>`, 1);
function PreviewOptions($$anchor, $$props) {
	push($$props, true);
	const $form = () => store_get(form, "$form", $$stores);
	const $submitting = () => store_get(submitting, "$submitting", $$stores);
	const $tainted = () => store_get(tainted, "$tainted", $$stores);
	const [$$stores, $$cleanup] = setup_stores();
	const { form, tainted, submit, submitting } = $$props.superform;
	const options = user_derived(() => sort($form().options));
	let files_input = state(null);
	let option_previews = proxy({});
	var fragment = comment();
	component(first_child(fragment), () => Table, ($$anchor$1, Table_Root) => {
		Table_Root($$anchor$1, {
			children: ($$anchor$2, $$slotProps) => {
				var fragment_1 = root_1$1();
				var node_1 = first_child(fragment_1);
				component(node_1, () => Table_header, ($$anchor$3, Table_Header) => {
					Table_Header($$anchor$3, {
						children: ($$anchor$4, $$slotProps$1) => {
							var fragment_2 = comment();
							component(first_child(fragment_2), () => Table_row, ($$anchor$5, Table_Row) => {
								Table_Row($$anchor$5, {
									children: ($$anchor$6, $$slotProps$2) => {
										var fragment_3 = root_3$1();
										var node_3 = first_child(fragment_3);
										component(node_3, () => Table_head, ($$anchor$7, Table_Head) => {
											Table_Head($$anchor$7, {
												class: "px-4! text-center",
												children: ($$anchor$8, $$slotProps$3) => {
													var fragment_4 = comment();
													var node_4 = first_child(fragment_4);
													var consequent = ($$anchor$9) => {
														{
															let $0 = user_derived(() => Object.values($form().checked).some(Boolean) && !Object.values($form().checked).every(Boolean));
															Checkbox($$anchor$9, {
																class: "border-gray-400",
																get indeterminate() {
																	return get($0);
																},
																onCheckedChange: () => {
																	store_mutate(form, untrack($form).checked = Object.fromEntries(Object.keys($form().options).map((id) => [id, $form().check_all])), untrack($form));
																},
																get checked() {
																	return $form().check_all;
																},
																set checked($$value) {
																	store_mutate(form, untrack($form).check_all = $$value, untrack($form));
																}
															});
														}
													};
													if_block(node_4, ($$render) => {
														if (Object.values($form().options).length > 1) $$render(consequent);
													});
													append($$anchor$8, fragment_4);
												},
												$$slots: { default: true }
											});
										});
										var node_5 = sibling(node_3, 2);
										component(node_5, () => Table_head, ($$anchor$7, Table_Head_1) => {
											Table_Head_1($$anchor$7, {
												children: ($$anchor$8, $$slotProps$3) => {
													next();
													var text$1 = text();
													template_effect(($0) => set_text(text$1, $0), [() => _("Value")]);
													append($$anchor$8, text$1);
												},
												$$slots: { default: true }
											});
										});
										var node_6 = sibling(node_5, 2);
										component(node_6, () => Table_head, ($$anchor$7, Table_Head_2) => {
											Table_Head_2($$anchor$7, {
												children: ($$anchor$8, $$slotProps$3) => {
													next();
													var text_1 = text();
													template_effect(($0) => set_text(text_1, $0), [() => _("Preview")]);
													append($$anchor$8, text_1);
												},
												$$slots: { default: true }
											});
										});
										component(sibling(node_6, 2), () => Table_head, ($$anchor$7, Table_Head_3) => {
											Table_Head_3($$anchor$7, {
												class: "text-right",
												children: ($$anchor$8, $$slotProps$3) => {
													next();
													var text_2 = text();
													template_effect(($0) => set_text(text_2, $0), [() => _("Actions")]);
													append($$anchor$8, text_2);
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
				var node_8 = sibling(node_1, 2);
				component(node_8, () => Table_body, ($$anchor$3, Table_Body) => {
					Table_Body($$anchor$3, {
						children: ($$anchor$4, $$slotProps$1) => {
							var fragment_9 = comment();
							each(first_child(fragment_9), 17, () => get(options), ({ id }) => id, ($$anchor$5, $$item) => {
								let id = () => get($$item).id;
								const option = user_derived(() => $form().options[id()]);
								var fragment_10 = comment();
								var node_10 = first_child(fragment_10);
								{
									let $0 = user_derived(() => ({ "bg-destructive": $form().checked[id()] }));
									component(node_10, () => Table_row, ($$anchor$6, Table_Row_1) => {
										Table_Row_1($$anchor$6, {
											get "data-id"() {
												return id();
											},
											get class() {
												return get($0);
											},
											children: ($$anchor$7, $$slotProps$2) => {
												var fragment_11 = root_11();
												var node_11 = first_child(fragment_11);
												component(node_11, () => Table_cell, ($$anchor$8, Table_Cell) => {
													Table_Cell($$anchor$8, {
														class: "p-0! text-center",
														children: ($$anchor$9, $$slotProps$3) => {
															var fragment_12 = comment();
															var node_12 = first_child(fragment_12);
															var consequent_1 = ($$anchor$10) => {
																var bind_get = () => $form().checked[id()] || $form().check_all;
																var bind_set = (checked) => store_mutate(form, untrack($form).checked[id()] = checked, untrack($form));
																Checkbox($$anchor$10, {
																	class: "border-gray-400",
																	get checked() {
																		return bind_get();
																	},
																	set checked($$value) {
																		bind_set($$value);
																	},
																	onchange: () => {
																		store_mutate(form, untrack($form).check_all = Object.values($form().checked).every(Boolean), untrack($form));
																	}
																});
															};
															if_block(node_12, ($$render) => {
																if (Object.values($form().options).length > 1) $$render(consequent_1);
															});
															append($$anchor$9, fragment_12);
														},
														$$slots: { default: true }
													});
												});
												var node_13 = sibling(node_11, 2);
												component(node_13, () => Table_cell, ($$anchor$8, Table_Cell_1) => {
													Table_Cell_1($$anchor$8, {
														children: ($$anchor$9, $$slotProps$3) => {
															Input($$anchor$9, {
																class: "col-span-full row-span-full w-48",
																get value() {
																	return $form().options[id()].value;
																},
																set value($$value) {
																	store_mutate(form, untrack($form).options[id()].value = $$value, untrack($form));
																}
															});
														},
														$$slots: { default: true }
													});
												});
												var node_14 = sibling(node_13, 2);
												component(node_14, () => Table_cell, ($$anchor$8, Table_Cell_2) => {
													Table_Cell_2($$anchor$8, {
														class: "min-w-28",
														children: ($$anchor$9, $$slotProps$3) => {
															var fragment_15 = root_15();
															var div = first_child(fragment_15);
															var node_15 = child(div);
															Form_button(node_15, {
																variant: "ghost",
																type: "button",
																onclick: () => option_previews[id()]?.click(),
																children: ($$anchor$10, $$slotProps$4) => {
																	var fragment_16 = comment();
																	var node_16 = first_child(fragment_16);
																	var consequent_2 = ($$anchor$11) => {
																		var img = root_17();
																		template_effect(($0$1, $1) => {
																			set_attribute(img, "src", `${get(option).preview_thumb_url ?? ""}?date_upd=${$0$1 ?? ""}`);
																			set_attribute(img, "alt", $1);
																		}, [() => encodeURI(get(option).date_upd), () => _("Option preview")]);
																		append($$anchor$11, img);
																	};
																	var alternate = ($$anchor$11) => {
																		var img_1 = root_18();
																		template_effect(($0$1, $1) => {
																			set_attribute(img_1, "src", $0$1);
																			set_attribute(img_1, "alt", $1);
																		}, [() => url("/empty.png"), () => _("Option preview")]);
																		append($$anchor$11, img_1);
																	};
																	if_block(node_16, ($$render) => {
																		if (get(option).preview_thumb_url) $$render(consequent_2);
																		else $$render(alternate, false);
																	});
																	append($$anchor$10, fragment_16);
																},
																$$slots: { default: true }
															});
															var node_17 = sibling(node_15, 2);
															var consequent_3 = ($$anchor$10) => {
																Form_button($$anchor$10, {
																	variant: "ghost",
																	size: "sm",
																	class: "text-destructive",
																	name: "delete-preview",
																	get value() {
																		return id();
																	},
																	onclick: (e) => {
																		if (!confirm(_("Are you sure you want to delete this image?"))) e.preventDefault();
																	},
																	children: ($$anchor$11, $$slotProps$4) => {
																		{
																			let $0$1 = user_derived(() => $submitting() && $form().action_name === "delete-preview" && $form().action_value === id().toString());
																			Spinner($$anchor$11, {
																				get loading() {
																					return get($0$1);
																				},
																				children: ($$anchor$12, $$slotProps$5) => {
																					Icon($$anchor$12, { icon: "mdi:trash-can" });
																				},
																				$$slots: { default: true }
																			});
																		}
																	},
																	$$slots: { default: true }
																});
															};
															if_block(node_17, ($$render) => {
																if (get(option).preview_thumb_url) $$render(consequent_3);
															});
															reset(div);
															var node_18 = sibling(div, 2);
															var bind_get_1 = () => option_previews[id()] || null;
															var bind_set_1 = (v) => option_previews[id()] = v;
															Input(node_18, {
																type: "file",
																class: "dp-away",
																get ref() {
																	return bind_get_1();
																},
																set ref($$value) {
																	bind_set_1($$value);
																},
																accept: "image/*",
																onchange: (e) => {
																	store_mutate(form, untrack($form).id_option = id(), untrack($form));
																	store_mutate(form, untrack($form).option_preview = e.currentTarget.files?.[0], untrack($form));
																	submit();
																}
															});
															append($$anchor$9, fragment_15);
														},
														$$slots: { default: true }
													});
												});
												component(sibling(node_14, 2), () => Table_cell, ($$anchor$8, Table_Cell_3) => {
													Table_Cell_3($$anchor$8, {
														children: ($$anchor$9, $$slotProps$3) => {
															var div_1 = root_22();
															Form_button(child(div_1), {
																class: "text-destructive flex gap-2",
																variant: "ghost",
																size: "sm",
																form: "options-form",
																name: "delete",
																get value() {
																	return id();
																},
																onclick: (e) => {
																	if (!confirm(_("Are you sure you want to delete this option?"))) e.preventDefault();
																},
																children: ($$anchor$10, $$slotProps$4) => {
																	{
																		let $0$1 = user_derived(() => $submitting() && $form().action_name === "delete" && $form().action_value === id().toString());
																		Spinner($$anchor$10, {
																			get loading() {
																				return get($0$1);
																			},
																			children: ($$anchor$11, $$slotProps$5) => {
																				Icon($$anchor$11, { icon: "mdi:trash-can" });
																			},
																			$$slots: { default: true }
																		});
																	}
																},
																$$slots: { default: true }
															});
															reset(div_1);
															append($$anchor$9, div_1);
														},
														$$slots: { default: true }
													});
												});
												append($$anchor$7, fragment_11);
											},
											$$slots: { default: true }
										});
									});
								}
								append($$anchor$5, fragment_10);
							});
							append($$anchor$4, fragment_9);
						},
						$$slots: { default: true }
					});
				});
				component(sibling(node_8, 2), () => Table_footer, ($$anchor$3, Table_Footer) => {
					Table_Footer($$anchor$3, {
						children: ($$anchor$4, $$slotProps$1) => {
							var fragment_22 = comment();
							component(first_child(fragment_22), () => Table_row, ($$anchor$5, Table_Row_2) => {
								Table_Row_2($$anchor$5, {
									children: ($$anchor$6, $$slotProps$2) => {
										var fragment_23 = comment();
										component(first_child(fragment_23), () => Table_cell, ($$anchor$7, Table_Cell_4) => {
											Table_Cell_4($$anchor$7, {
												colspan: 9,
												children: ($$anchor$8, $$slotProps$3) => {
													var div_2 = root_27();
													var node_24 = child(div_2);
													var consequent_4 = ($$anchor$9) => {
														var fragment_24 = root_28$1();
														var node_25 = first_child(fragment_24);
														Form_button(node_25, {
															class: "bg-destructive text-destructive-foreground flex gap-2",
															form: "options-form",
															name: "delete-options",
															onclick: (e) => {
																if (!confirm(_("Are you sure you want to delete the selected options?"))) e.preventDefault();
															},
															children: ($$anchor$10, $$slotProps$4) => {
																var fragment_25 = root_29$1();
																var node_26 = first_child(fragment_25);
																{
																	let $0 = user_derived(() => $submitting() && $form().action_name === "delete-options");
																	Spinner(node_26, {
																		get loading() {
																			return get($0);
																		},
																		children: ($$anchor$11, $$slotProps$5) => {
																			Icon($$anchor$11, { icon: "mdi:trash-can" });
																		},
																		$$slots: { default: true }
																	});
																}
																var text_3 = sibling(node_26);
																template_effect(($0) => set_text(text_3, ` ${$0 ?? ""}`), [() => _("Delete selected options")]);
																append($$anchor$10, fragment_25);
															},
															$$slots: { default: true }
														});
														Form_button(sibling(node_25, 2), {
															variant: "outline",
															onclick: () => {
																store_mutate(form, untrack($form).checked = {}, untrack($form));
																store_mutate(form, untrack($form).check_all = false, untrack($form));
															},
															children: ($$anchor$10, $$slotProps$4) => {
																var fragment_27 = root_31();
																var node_28 = first_child(fragment_27);
																Icon(node_28, { icon: "mdi:close" });
																var text_4 = sibling(node_28);
																template_effect(($0) => set_text(text_4, ` ${$0 ?? ""}`), [() => _("Cancel")]);
																append($$anchor$10, fragment_27);
															},
															$$slots: { default: true }
														});
														append($$anchor$9, fragment_24);
													};
													var alternate_1 = ($$anchor$9) => {
														var fragment_28 = root_32();
														var node_29 = first_child(fragment_28);
														Form_button(node_29, {
															class: "flex gap-2",
															name: "add",
															variant: "outline",
															children: ($$anchor$10, $$slotProps$4) => {
																var fragment_29 = root_33$1();
																var node_30 = first_child(fragment_29);
																{
																	let $0 = user_derived(() => $submitting() && $form().action_name === "add");
																	Spinner(node_30, {
																		get loading() {
																			return get($0);
																		},
																		children: ($$anchor$11, $$slotProps$5) => {
																			Icon($$anchor$11, { icon: "mdi:plus" });
																		},
																		$$slots: { default: true }
																	});
																}
																var text_5 = sibling(node_30);
																template_effect(($0) => set_text(text_5, ` ${$0 ?? ""}`), [() => _("Add option")]);
																append($$anchor$10, fragment_29);
															},
															$$slots: { default: true }
														});
														var node_31 = sibling(node_29, 2);
														{
															let $0 = user_derived(() => $tainted()?.options && "btn-highlight");
															let $1 = user_derived(() => !$tainted()?.options);
															Form_button(node_31, {
																get class() {
																	return `flex gap-2 ${get($0) ?? ""}`;
																},
																get disabled() {
																	return get($1);
																},
																children: ($$anchor$10, $$slotProps$4) => {
																	var fragment_31 = root_35$1();
																	var node_32 = first_child(fragment_31);
																	{
																		let $0$1 = user_derived(() => $submitting() && [
																			"update",
																			"duplicate",
																			"favorite",
																			"common"
																		].includes($form().action_name));
																		Spinner(node_32, {
																			get loading() {
																				return get($0$1);
																			},
																			children: ($$anchor$11, $$slotProps$5) => {
																				Icon($$anchor$11, { icon: "mdi:content-save" });
																			},
																			$$slots: { default: true }
																		});
																	}
																	var text_6 = sibling(node_32);
																	template_effect(($0$1) => set_text(text_6, ` ${$0$1 ?? ""}`), [() => _("Save options")]);
																	append($$anchor$10, fragment_31);
																},
																$$slots: { default: true }
															});
														}
														var node_33 = sibling(node_31, 2);
														Form_button(node_33, {
															class: "flex gap-2",
															variant: "outline",
															type: "button",
															name: "import-images",
															onclick: () => get(files_input)?.click(),
															children: ($$anchor$10, $$slotProps$4) => {
																var fragment_33 = root_37();
																var node_34 = first_child(fragment_33);
																{
																	let $0 = user_derived(() => $submitting() && $form().action_name === "import-images");
																	Spinner(node_34, {
																		get loading() {
																			return get($0);
																		},
																		children: ($$anchor$11, $$slotProps$5) => {
																			Icon($$anchor$11, { icon: "ic:baseline-publish" });
																		},
																		$$slots: { default: true }
																	});
																}
																var text_7 = sibling(node_34);
																template_effect(($0) => set_text(text_7, ` ${$0 ?? ""}`), [() => _("Import images")]);
																append($$anchor$10, fragment_33);
															},
															$$slots: { default: true }
														});
														var div_3 = sibling(node_33, 2);
														Input(child(div_3), {
															accept: "image/*",
															multiple: true,
															type: "file",
															onchange: (e) => {
																store_mutate(form, untrack($form).images = [...e.currentTarget.files ?? []], untrack($form));
																submit();
															},
															get ref() {
																return get(files_input);
															},
															set ref($$value) {
																set(files_input, $$value, true);
															}
														});
														reset(div_3);
														append($$anchor$9, fragment_28);
													};
													if_block(node_24, ($$render) => {
														if (Object.values($form().checked).some(Boolean)) $$render(consequent_4);
														else $$render(alternate_1, false);
													});
													reset(div_2);
													append($$anchor$8, div_2);
												},
												$$slots: { default: true }
											});
										});
										append($$anchor$6, fragment_23);
									},
									$$slots: { default: true }
								});
							});
							append($$anchor$4, fragment_22);
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
var root_3 = from_html(`<!> <!> <!> <!> <!> <!> <!> <!> <!>`, 1);
var root_23 = from_html(`<div class="flex justify-center"><!></div>`);
var root_28 = from_html(`<img data-testid="font-image" class="max-h-8 w-auto"/>`);
var root_29 = from_html(`<img class="h-10"/>`);
var root_26 = from_html(`<div class="flex items-center"><!> <!></div> <!>`, 1);
var root_35 = from_html(`<img class="h-10 w-auto"/>`);
var root_36 = from_html(`<img class="h-10"/>`);
var root_33 = from_html(`<div class="flex items-center"><!> <!></div> <!>`, 1);
var root_40 = from_html(`<div class="flex flex-nowrap justify-end gap-1"><!> <!> <!></div>`);
var root_16 = from_html(`<!> <!> <!> <!> <!> <!> <!> <!> <!>`, 1);
var root_50 = from_html(`<!> `, 1);
var root_52 = from_html(`<!> `, 1);
var root_49 = from_html(`<!> <!>`, 1);
var root_54 = from_html(`<!> `, 1);
var root_56 = from_html(`<!> `, 1);
var root_58 = from_html(`<!> `, 1);
var root_53 = from_html(`<!> <!> <!> <div class="dp-away"><!></div>`, 1);
var root_48 = from_html(`<div class="flex gap-2"><!></div>`);
var root_1 = from_html(`<!> <!> <!>`, 1);
function FontOptions($$anchor, $$props) {
	push($$props, true);
	const $form = () => store_get(form, "$form", $$stores);
	const $submitting = () => store_get(submitting, "$submitting", $$stores);
	const $tainted = () => store_get(tainted, "$tainted", $$stores);
	const [$$stores, $$cleanup] = setup_stores();
	const { form, tainted, submit, submitting } = $$props.superform;
	const options = user_derived(() => sort($form().options));
	let files_input = state(null);
	let option_fonts = proxy({});
	let option_previews = proxy({});
	var fragment = comment();
	component(first_child(fragment), () => Table, ($$anchor$1, Table_Root) => {
		Table_Root($$anchor$1, {
			children: ($$anchor$2, $$slotProps) => {
				var fragment_1 = root_1();
				var node_1 = first_child(fragment_1);
				component(node_1, () => Table_header, ($$anchor$3, Table_Header) => {
					Table_Header($$anchor$3, {
						children: ($$anchor$4, $$slotProps$1) => {
							var fragment_2 = comment();
							component(first_child(fragment_2), () => Table_row, ($$anchor$5, Table_Row) => {
								Table_Row($$anchor$5, {
									children: ($$anchor$6, $$slotProps$2) => {
										var fragment_3 = root_3();
										var node_3 = first_child(fragment_3);
										component(node_3, () => Table_head, ($$anchor$7, Table_Head) => {
											Table_Head($$anchor$7, {
												class: "px-4! text-center",
												children: ($$anchor$8, $$slotProps$3) => {
													var fragment_4 = comment();
													var node_4 = first_child(fragment_4);
													var consequent = ($$anchor$9) => {
														{
															let $0 = user_derived(() => Object.values($form().checked).some(Boolean) && !Object.values($form().checked).every(Boolean));
															Checkbox($$anchor$9, {
																class: "border-gray-400",
																get indeterminate() {
																	return get($0);
																},
																onCheckedChange: () => {
																	store_mutate(form, untrack($form).checked = Object.fromEntries(Object.keys($form().options).map((id) => [id, $form().check_all])), untrack($form));
																},
																get checked() {
																	return $form().check_all;
																},
																set checked($$value) {
																	store_mutate(form, untrack($form).check_all = $$value, untrack($form));
																}
															});
														}
													};
													if_block(node_4, ($$render) => {
														if (Object.values($form().options).length > 1) $$render(consequent);
													});
													append($$anchor$8, fragment_4);
												},
												$$slots: { default: true }
											});
										});
										var node_5 = sibling(node_3, 2);
										component(node_5, () => Table_head, ($$anchor$7, Table_Head_1) => {
											Table_Head_1($$anchor$7, {
												children: ($$anchor$8, $$slotProps$3) => {
													next();
													var text$1 = text();
													template_effect(($0) => set_text(text$1, $0), [() => _("Label")]);
													append($$anchor$8, text$1);
												},
												$$slots: { default: true }
											});
										});
										var node_6 = sibling(node_5, 2);
										component(node_6, () => Table_head, ($$anchor$7, Table_Head_2) => {
											Table_Head_2($$anchor$7, {
												children: ($$anchor$8, $$slotProps$3) => {
													next();
													var text_1 = text();
													template_effect(($0) => set_text(text_1, $0), [() => _("Value")]);
													append($$anchor$8, text_1);
												},
												$$slots: { default: true }
											});
										});
										var node_7 = sibling(node_6, 2);
										{
											let $0 = user_derived(() => _("Secondary value"));
											component(node_7, () => Table_head, ($$anchor$7, Table_Head_3) => {
												Table_Head_3($$anchor$7, {
													get title() {
														return get($0);
													},
													children: ($$anchor$8, $$slotProps$3) => {
														next();
														var text_2 = text();
														template_effect(($0$1) => set_text(text_2, $0$1), [() => _("Sec. value")]);
														append($$anchor$8, text_2);
													},
													$$slots: { default: true }
												});
											});
										}
										var node_8 = sibling(node_7, 2);
										component(node_8, () => Table_head, ($$anchor$7, Table_Head_4) => {
											Table_Head_4($$anchor$7, {
												children: ($$anchor$8, $$slotProps$3) => {
													next();
													var text_3 = text();
													template_effect(($0) => set_text(text_3, $0), [() => _("SKU")]);
													append($$anchor$8, text_3);
												},
												$$slots: { default: true }
											});
										});
										var node_9 = sibling(node_8, 2);
										component(node_9, () => Table_head, ($$anchor$7, Table_Head_5) => {
											Table_Head_5($$anchor$7, {
												class: "text-center",
												children: ($$anchor$8, $$slotProps$3) => {
													next();
													var text_4 = text();
													template_effect(($0) => set_text(text_4, $0), [() => _("Default")]);
													append($$anchor$8, text_4);
												},
												$$slots: { default: true }
											});
										});
										var node_10 = sibling(node_9, 2);
										component(node_10, () => Table_head, ($$anchor$7, Table_Head_6) => {
											Table_Head_6($$anchor$7, {
												children: ($$anchor$8, $$slotProps$3) => {
													next();
													var text_5 = text();
													template_effect(($0) => set_text(text_5, $0), [() => _("Font")]);
													append($$anchor$8, text_5);
												},
												$$slots: { default: true }
											});
										});
										var node_11 = sibling(node_10, 2);
										component(node_11, () => Table_head, ($$anchor$7, Table_Head_7) => {
											Table_Head_7($$anchor$7, {
												children: ($$anchor$8, $$slotProps$3) => {
													next();
													var text_6 = text();
													template_effect(($0) => set_text(text_6, $0), [() => _("Preview")]);
													append($$anchor$8, text_6);
												},
												$$slots: { default: true }
											});
										});
										component(sibling(node_11, 2), () => Table_head, ($$anchor$7, Table_Head_8) => {
											Table_Head_8($$anchor$7, {
												class: "text-right",
												children: ($$anchor$8, $$slotProps$3) => {
													next();
													var text_7 = text();
													template_effect(($0) => set_text(text_7, $0), [() => _("Actions")]);
													append($$anchor$8, text_7);
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
				var node_13 = sibling(node_1, 2);
				component(node_13, () => Table_body, ($$anchor$3, Table_Body) => {
					Table_Body($$anchor$3, {
						children: ($$anchor$4, $$slotProps$1) => {
							var fragment_14 = comment();
							each(first_child(fragment_14), 17, () => get(options), ({ id, active, is_default }) => id, ($$anchor$5, $$item) => {
								let id = () => get($$item).id;
								let active = () => get($$item).active;
								let is_default = () => get($$item).is_default;
								const option = user_derived(() => $form().options[id()]);
								var fragment_15 = comment();
								var node_15 = first_child(fragment_15);
								{
									let $0 = user_derived(() => ({ "bg-destructive": $form().checked[id()] }));
									component(node_15, () => Table_row, ($$anchor$6, Table_Row_1) => {
										Table_Row_1($$anchor$6, {
											get "data-id"() {
												return id();
											},
											get class() {
												return get($0);
											},
											children: ($$anchor$7, $$slotProps$2) => {
												var fragment_16 = root_16();
												var node_16 = first_child(fragment_16);
												component(node_16, () => Table_cell, ($$anchor$8, Table_Cell) => {
													Table_Cell($$anchor$8, {
														class: "p-0! text-center",
														children: ($$anchor$9, $$slotProps$3) => {
															var fragment_17 = comment();
															var node_17 = first_child(fragment_17);
															var consequent_1 = ($$anchor$10) => {
																var bind_get = () => $form().checked[id()] || $form().check_all;
																var bind_set = (checked) => store_mutate(form, untrack($form).checked[id()] = checked, untrack($form));
																Checkbox($$anchor$10, {
																	class: "border-gray-400",
																	get checked() {
																		return bind_get();
																	},
																	set checked($$value) {
																		bind_set($$value);
																	},
																	onchange: () => {
																		store_mutate(form, untrack($form).check_all = Object.values($form().checked).every(Boolean), untrack($form));
																	}
																});
															};
															if_block(node_17, ($$render) => {
																if (Object.values($form().options).length > 1) $$render(consequent_1);
															});
															append($$anchor$9, fragment_17);
														},
														$$slots: { default: true }
													});
												});
												var node_18 = sibling(node_16, 2);
												component(node_18, () => Table_cell, ($$anchor$8, Table_Cell_1) => {
													Table_Cell_1($$anchor$8, {
														children: ($$anchor$9, $$slotProps$3) => {
															Input($$anchor$9, {
																class: "w-48",
																get value() {
																	return $form().options[id()].label[+lang.value];
																},
																set value($$value) {
																	store_mutate(form, untrack($form).options[id()].label[+lang.value] = $$value, untrack($form));
																}
															});
														},
														$$slots: { default: true }
													});
												});
												var node_19 = sibling(node_18, 2);
												component(node_19, () => Table_cell, ($$anchor$8, Table_Cell_2) => {
													Table_Cell_2($$anchor$8, {
														children: ($$anchor$9, $$slotProps$3) => {
															Input($$anchor$9, {
																class: "col-span-full row-span-full w-20",
																get value() {
																	return $form().options[id()].value;
																},
																set value($$value) {
																	store_mutate(form, untrack($form).options[id()].value = $$value, untrack($form));
																}
															});
														},
														$$slots: { default: true }
													});
												});
												var node_20 = sibling(node_19, 2);
												component(node_20, () => Table_cell, ($$anchor$8, Table_Cell_3) => {
													Table_Cell_3($$anchor$8, {
														children: ($$anchor$9, $$slotProps$3) => {
															Input($$anchor$9, {
																class: "col-span-full row-span-full w-20",
																get value() {
																	return $form().options[id()].secondary_value;
																},
																set value($$value) {
																	store_mutate(form, untrack($form).options[id()].secondary_value = $$value, untrack($form));
																}
															});
														},
														$$slots: { default: true }
													});
												});
												var node_21 = sibling(node_20, 2);
												component(node_21, () => Table_cell, ($$anchor$8, Table_Cell_4) => {
													Table_Cell_4($$anchor$8, {
														children: ($$anchor$9, $$slotProps$3) => {
															Input($$anchor$9, {
																class: "col-span-full row-span-full w-20",
																get value() {
																	return $form().options[id()].sku;
																},
																set value($$value) {
																	store_mutate(form, untrack($form).options[id()].sku = $$value, untrack($form));
																}
															});
														},
														$$slots: { default: true }
													});
												});
												var node_22 = sibling(node_21, 2);
												component(node_22, () => Table_cell, ($$anchor$8, Table_Cell_5) => {
													Table_Cell_5($$anchor$8, {
														children: ($$anchor$9, $$slotProps$3) => {
															var div = root_23();
															var node_23 = child(div);
															{
																let $0$1 = user_derived(() => is_default() ? "text-green-500" : "text-red-500");
																let $1 = user_derived(() => _("Toggle default option"));
																Form_button(node_23, {
																	get class() {
																		return `flex gap-2 ${get($0$1) ?? ""}`;
																	},
																	variant: "ghost",
																	size: "sm",
																	name: "toggle-default",
																	get value() {
																		return id();
																	},
																	get title() {
																		return get($1);
																	},
																	children: ($$anchor$10, $$slotProps$4) => {
																		{
																			let $0$2 = user_derived(() => $submitting() && $form().action_name === "toggle-default" && $form().action_value === id().toString());
																			Spinner($$anchor$10, {
																				get loading() {
																					return get($0$2);
																				},
																				children: ($$anchor$11, $$slotProps$5) => {
																					{
																						let $0$3 = user_derived(() => is_default() ? "ic:baseline-done" : "ic:outline-close");
																						Icon($$anchor$11, { get icon() {
																							return get($0$3);
																						} });
																					}
																				},
																				$$slots: { default: true }
																			});
																		}
																	},
																	$$slots: { default: true }
																});
															}
															reset(div);
															append($$anchor$9, div);
														},
														$$slots: { default: true }
													});
												});
												var node_24 = sibling(node_22, 2);
												component(node_24, () => Table_cell, ($$anchor$8, Table_Cell_6) => {
													Table_Cell_6($$anchor$8, {
														class: "min-w-28",
														children: ($$anchor$9, $$slotProps$3) => {
															var fragment_25 = root_26();
															var div_1 = first_child(fragment_25);
															var node_25 = child(div_1);
															Form_button(node_25, {
																variant: "ghost",
																type: "button",
																onclick: () => option_fonts[id()]?.click(),
																children: ($$anchor$10, $$slotProps$4) => {
																	var fragment_26 = comment();
																	var node_26 = first_child(fragment_26);
																	var consequent_2 = ($$anchor$11) => {
																		var img = root_28();
																		template_effect(($0$1, $1) => {
																			set_attribute(img, "src", `${get(option).font_thumb_url ?? ""}?date_upd=${$0$1 ?? ""}`);
																			set_attribute(img, "alt", $1);
																		}, [() => encodeURI(get(option).date_upd), () => _("Option font")]);
																		append($$anchor$11, img);
																	};
																	var alternate = ($$anchor$11) => {
																		var img_1 = root_29();
																		template_effect(($0$1, $1) => {
																			set_attribute(img_1, "src", $0$1);
																			set_attribute(img_1, "alt", $1);
																		}, [() => url("/empty-font.png"), () => _("Option font")]);
																		append($$anchor$11, img_1);
																	};
																	if_block(node_26, ($$render) => {
																		if (get(option).font) $$render(consequent_2);
																		else $$render(alternate, false);
																	});
																	append($$anchor$10, fragment_26);
																},
																$$slots: { default: true }
															});
															var node_27 = sibling(node_25, 2);
															var consequent_3 = ($$anchor$10) => {
																Form_button($$anchor$10, {
																	variant: "ghost",
																	size: "sm",
																	class: "text-destructive",
																	name: "delete-font",
																	get value() {
																		return id();
																	},
																	onclick: (e) => {
																		if (!confirm(_("Are you sure you want to delete this font?"))) e.preventDefault();
																	},
																	children: ($$anchor$11, $$slotProps$4) => {
																		{
																			let $0$1 = user_derived(() => $submitting() && $form().action_name === "delete-font" && $form().action_value === id().toString());
																			Spinner($$anchor$11, {
																				get loading() {
																					return get($0$1);
																				},
																				children: ($$anchor$12, $$slotProps$5) => {
																					Icon($$anchor$12, { icon: "mdi:trash-can" });
																				},
																				$$slots: { default: true }
																			});
																		}
																	},
																	$$slots: { default: true }
																});
															};
															if_block(node_27, ($$render) => {
																if (get(option).font) $$render(consequent_3);
															});
															reset(div_1);
															var node_28 = sibling(div_1, 2);
															var bind_get_1 = () => option_fonts[id()] || null;
															var bind_set_1 = (v) => option_fonts[id()] = v;
															Input(node_28, {
																type: "file",
																"data-testid": "font-file",
																class: "dp-away",
																get ref() {
																	return bind_get_1();
																},
																set ref($$value) {
																	bind_set_1($$value);
																},
																accept: ".ttf",
																onchange: (e) => {
																	store_mutate(form, untrack($form).id_option = id(), untrack($form));
																	store_mutate(form, untrack($form).option_font = e.currentTarget.files?.[0], untrack($form));
																	submit();
																}
															});
															append($$anchor$9, fragment_25);
														},
														$$slots: { default: true }
													});
												});
												var node_29 = sibling(node_24, 2);
												component(node_29, () => Table_cell, ($$anchor$8, Table_Cell_7) => {
													Table_Cell_7($$anchor$8, {
														class: "min-w-28",
														children: ($$anchor$9, $$slotProps$3) => {
															var fragment_30 = root_33();
															var div_2 = first_child(fragment_30);
															var node_30 = child(div_2);
															Form_button(node_30, {
																variant: "ghost",
																type: "button",
																onclick: () => option_previews[id()]?.click(),
																children: ($$anchor$10, $$slotProps$4) => {
																	var fragment_31 = comment();
																	var node_31 = first_child(fragment_31);
																	var consequent_4 = ($$anchor$11) => {
																		var img_2 = root_35();
																		template_effect(($0$1, $1) => {
																			set_attribute(img_2, "src", `${get(option).preview_thumb_url ?? ""}?date_upd=${$0$1 ?? ""}`);
																			set_attribute(img_2, "alt", $1);
																		}, [() => encodeURI(get(option).date_upd), () => _("Option preview")]);
																		append($$anchor$11, img_2);
																	};
																	var alternate_1 = ($$anchor$11) => {
																		var img_3 = root_36();
																		template_effect(($0$1, $1) => {
																			set_attribute(img_3, "src", $0$1);
																			set_attribute(img_3, "alt", $1);
																		}, [() => url("/empty.png"), () => _("Option preview")]);
																		append($$anchor$11, img_3);
																	};
																	if_block(node_31, ($$render) => {
																		if (get(option).preview_thumb_url) $$render(consequent_4);
																		else $$render(alternate_1, false);
																	});
																	append($$anchor$10, fragment_31);
																},
																$$slots: { default: true }
															});
															var node_32 = sibling(node_30, 2);
															var consequent_5 = ($$anchor$10) => {
																Form_button($$anchor$10, {
																	variant: "ghost",
																	size: "sm",
																	class: "text-destructive",
																	name: "delete-preview",
																	get value() {
																		return id();
																	},
																	onclick: (e) => {
																		if (!confirm(_("Are you sure you want to delete this image?"))) e.preventDefault();
																	},
																	children: ($$anchor$11, $$slotProps$4) => {
																		{
																			let $0$1 = user_derived(() => $submitting() && $form().action_name === "delete-preview" && $form().action_value === id().toString());
																			Spinner($$anchor$11, {
																				get loading() {
																					return get($0$1);
																				},
																				children: ($$anchor$12, $$slotProps$5) => {
																					Icon($$anchor$12, { icon: "mdi:trash-can" });
																				},
																				$$slots: { default: true }
																			});
																		}
																	},
																	$$slots: { default: true }
																});
															};
															if_block(node_32, ($$render) => {
																if (get(option).preview_thumb_url) $$render(consequent_5);
															});
															reset(div_2);
															var node_33 = sibling(div_2, 2);
															var bind_get_2 = () => option_previews[id()] || null;
															var bind_set_2 = (v) => option_previews[id()] = v;
															Input(node_33, {
																type: "file",
																class: "dp-away",
																get ref() {
																	return bind_get_2();
																},
																set ref($$value) {
																	bind_set_2($$value);
																},
																accept: "image/*",
																onchange: (e) => {
																	store_mutate(form, untrack($form).id_option = id(), untrack($form));
																	store_mutate(form, untrack($form).option_preview = e.currentTarget.files?.[0], untrack($form));
																	submit();
																}
															});
															append($$anchor$9, fragment_30);
														},
														$$slots: { default: true }
													});
												});
												component(sibling(node_29, 2), () => Table_cell, ($$anchor$8, Table_Cell_8) => {
													Table_Cell_8($$anchor$8, {
														children: ($$anchor$9, $$slotProps$3) => {
															var div_3 = root_40();
															var node_35 = child(div_3);
															{
																let $0$1 = user_derived(() => active() ? "text-green-500" : "text-red-500");
																let $1 = user_derived(() => _("Toggle option visibility"));
																Form_button(node_35, {
																	get class() {
																		return `flex gap-2 ${get($0$1) ?? ""}`;
																	},
																	variant: "ghost",
																	size: "sm",
																	name: "toggle",
																	get value() {
																		return id();
																	},
																	get title() {
																		return get($1);
																	},
																	children: ($$anchor$10, $$slotProps$4) => {
																		{
																			let $0$2 = user_derived(() => $submitting() && $form().action_name === "toggle" && $form().action_value === id().toString());
																			Spinner($$anchor$10, {
																				get loading() {
																					return get($0$2);
																				},
																				children: ($$anchor$11, $$slotProps$5) => {
																					{
																						let $0$3 = user_derived(() => active() ? "mdi:eye" : "mdi:eye-off");
																						Icon($$anchor$11, { get icon() {
																							return get($0$3);
																						} });
																					}
																				},
																				$$slots: { default: true }
																			});
																		}
																	},
																	$$slots: { default: true }
																});
															}
															var node_36 = sibling(node_35, 2);
															Form_button(node_36, {
																class: "text-destructive flex gap-2",
																variant: "ghost",
																size: "sm",
																form: "options-form",
																name: "delete",
																get value() {
																	return id();
																},
																onclick: (e) => {
																	if (!confirm(_("Are you sure you want to delete this option?"))) e.preventDefault();
																},
																children: ($$anchor$10, $$slotProps$4) => {
																	{
																		let $0$1 = user_derived(() => $submitting() && $form().action_name === "delete" && $form().action_value === id().toString());
																		Spinner($$anchor$10, {
																			get loading() {
																				return get($0$1);
																			},
																			children: ($$anchor$11, $$slotProps$5) => {
																				Icon($$anchor$11, { icon: "mdi:trash-can" });
																			},
																			$$slots: { default: true }
																		});
																	}
																},
																$$slots: { default: true }
															});
															var node_37 = sibling(node_36, 2);
															{
																let $0$1 = user_derived(() => cn(buttonVariants({
																	variant: "ghost",
																	size: "sm"
																}), "handle cursor-move"));
																let $1 = user_derived(() => _("Drag to reorder"));
																Label(node_37, {
																	get class() {
																		return get($0$1);
																	},
																	get title() {
																		return get($1);
																	},
																	children: ($$anchor$10, $$slotProps$4) => {
																		Icon($$anchor$10, { icon: "mdi:drag" });
																	},
																	$$slots: { default: true }
																});
															}
															reset(div_3);
															append($$anchor$9, div_3);
														},
														$$slots: { default: true }
													});
												});
												append($$anchor$7, fragment_16);
											},
											$$slots: { default: true }
										});
									});
								}
								append($$anchor$5, fragment_15);
							});
							append($$anchor$4, fragment_14);
						},
						$$slots: { default: true }
					});
				});
				component(sibling(node_13, 2), () => Table_footer, ($$anchor$3, Table_Footer) => {
					Table_Footer($$anchor$3, {
						children: ($$anchor$4, $$slotProps$1) => {
							var fragment_40 = comment();
							component(first_child(fragment_40), () => Table_row, ($$anchor$5, Table_Row_2) => {
								Table_Row_2($$anchor$5, {
									children: ($$anchor$6, $$slotProps$2) => {
										var fragment_41 = comment();
										component(first_child(fragment_41), () => Table_cell, ($$anchor$7, Table_Cell_9) => {
											Table_Cell_9($$anchor$7, {
												colspan: 9,
												children: ($$anchor$8, $$slotProps$3) => {
													var div_4 = root_48();
													var node_41 = child(div_4);
													var consequent_6 = ($$anchor$9) => {
														var fragment_42 = root_49();
														var node_42 = first_child(fragment_42);
														Form_button(node_42, {
															class: "bg-destructive text-destructive-foreground flex gap-2",
															form: "options-form",
															name: "delete-options",
															onclick: (e) => {
																if (!confirm(_("Are you sure you want to delete the selected options?"))) e.preventDefault();
															},
															children: ($$anchor$10, $$slotProps$4) => {
																var fragment_43 = root_50();
																var node_43 = first_child(fragment_43);
																{
																	let $0 = user_derived(() => $submitting() && $form().action_name === "delete-options");
																	Spinner(node_43, {
																		get loading() {
																			return get($0);
																		},
																		children: ($$anchor$11, $$slotProps$5) => {
																			Icon($$anchor$11, { icon: "mdi:trash-can" });
																		},
																		$$slots: { default: true }
																	});
																}
																var text_8 = sibling(node_43);
																template_effect(($0) => set_text(text_8, ` ${$0 ?? ""}`), [() => _("Delete selected options")]);
																append($$anchor$10, fragment_43);
															},
															$$slots: { default: true }
														});
														Form_button(sibling(node_42, 2), {
															variant: "outline",
															onclick: () => {
																store_mutate(form, untrack($form).checked = {}, untrack($form));
																store_mutate(form, untrack($form).check_all = false, untrack($form));
															},
															children: ($$anchor$10, $$slotProps$4) => {
																var fragment_45 = root_52();
																var node_45 = first_child(fragment_45);
																Icon(node_45, { icon: "mdi:close" });
																var text_9 = sibling(node_45);
																template_effect(($0) => set_text(text_9, ` ${$0 ?? ""}`), [() => _("Cancel")]);
																append($$anchor$10, fragment_45);
															},
															$$slots: { default: true }
														});
														append($$anchor$9, fragment_42);
													};
													var alternate_2 = ($$anchor$9) => {
														var fragment_46 = root_53();
														var node_46 = first_child(fragment_46);
														Form_button(node_46, {
															class: "flex gap-2",
															name: "add",
															variant: "outline",
															children: ($$anchor$10, $$slotProps$4) => {
																var fragment_47 = root_54();
																var node_47 = first_child(fragment_47);
																{
																	let $0 = user_derived(() => $submitting() && $form().action_name === "add");
																	Spinner(node_47, {
																		get loading() {
																			return get($0);
																		},
																		children: ($$anchor$11, $$slotProps$5) => {
																			Icon($$anchor$11, { icon: "mdi:plus" });
																		},
																		$$slots: { default: true }
																	});
																}
																var text_10 = sibling(node_47);
																template_effect(($0) => set_text(text_10, ` ${$0 ?? ""}`), [() => _("Add option")]);
																append($$anchor$10, fragment_47);
															},
															$$slots: { default: true }
														});
														var node_48 = sibling(node_46, 2);
														{
															let $0 = user_derived(() => $tainted()?.options && "btn-highlight");
															let $1 = user_derived(() => !$tainted()?.options);
															Form_button(node_48, {
																get class() {
																	return `flex gap-2 ${get($0) ?? ""}`;
																},
																get disabled() {
																	return get($1);
																},
																children: ($$anchor$10, $$slotProps$4) => {
																	var fragment_49 = root_56();
																	var node_49 = first_child(fragment_49);
																	{
																		let $0$1 = user_derived(() => $submitting() && [
																			"update",
																			"duplicate",
																			"favorite",
																			"common"
																		].includes($form().action_name));
																		Spinner(node_49, {
																			get loading() {
																				return get($0$1);
																			},
																			children: ($$anchor$11, $$slotProps$5) => {
																				Icon($$anchor$11, { icon: "mdi:content-save" });
																			},
																			$$slots: { default: true }
																		});
																	}
																	var text_11 = sibling(node_49);
																	template_effect(($0$1) => set_text(text_11, ` ${$0$1 ?? ""}`), [() => _("Save options")]);
																	append($$anchor$10, fragment_49);
																},
																$$slots: { default: true }
															});
														}
														var node_50 = sibling(node_48, 2);
														Form_button(node_50, {
															class: "flex gap-2",
															variant: "outline",
															type: "button",
															name: "import-fonts",
															onclick: () => get(files_input)?.click(),
															children: ($$anchor$10, $$slotProps$4) => {
																var fragment_51 = root_58();
																var node_51 = first_child(fragment_51);
																{
																	let $0 = user_derived(() => $submitting() && $form().action_name === "import-fonts");
																	Spinner(node_51, {
																		get loading() {
																			return get($0);
																		},
																		children: ($$anchor$11, $$slotProps$5) => {
																			Icon($$anchor$11, { icon: "ic:baseline-publish" });
																		},
																		$$slots: { default: true }
																	});
																}
																var text_12 = sibling(node_51);
																template_effect(($0) => set_text(text_12, ` ${$0 ?? ""}`), [() => _("Import fonts")]);
																append($$anchor$10, fragment_51);
															},
															$$slots: { default: true }
														});
														var div_5 = sibling(node_50, 2);
														Input(child(div_5), {
															accept: ".ttf",
															multiple: true,
															type: "file",
															onchange: (e) => {
																store_mutate(form, untrack($form).fonts = [...e.currentTarget.files ?? []], untrack($form));
																submit();
															},
															get ref() {
																return get(files_input);
															},
															set ref($$value) {
																set(files_input, $$value, true);
															}
														});
														reset(div_5);
														append($$anchor$9, fragment_46);
													};
													if_block(node_41, ($$render) => {
														if (Object.values($form().checked).some(Boolean)) $$render(consequent_6);
														else $$render(alternate_2, false);
													});
													reset(div_4);
													append($$anchor$8, div_4);
												},
												$$slots: { default: true }
											});
										});
										append($$anchor$6, fragment_41);
									},
									$$slots: { default: true }
								});
							});
							append($$anchor$4, fragment_40);
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
var root_8 = from_html(`<!> <!>`, 1);
var root_4 = from_html(`<div class="flex justify-between gap-4 pr-10"><div class="flex items-center gap-2"><!> <div> <!></div></div> <!></div>`);
var root_2 = from_html(`<!> <div class="flex flex-col gap-4"><div class="flex justify-end"><!></div> <form enctype="multipart/form-data" id="options-form" method="post"><!></form></div>`, 1);
function _page($$anchor, $$props) {
	push($$props, true);
	const $form = () => store_get(form, "$form", $$stores);
	const $tainted = () => store_get(tainted, "$tainted", $$stores);
	const [$$stores, $$cleanup] = setup_stores();
	let field = user_derived(() => $$props.data.field);
	const superform = superForm($$props.data.form, {
		dataType: "json",
		SPA: true,
		resetForm: false,
		invalidateAll: false,
		taintedMessage: _("You have unsaved changes. Are you sure you want to leave this page?"),
		validators: valibot(FieldOptionsFormSchema),
		async onSubmit({ cancel, submitter }) {
			const { valid } = await validateForm();
			if (!valid) {
				toast.error(_("Please correct the errors before submitting the form"));
				return;
			}
			const form_data = {
				action_name: submitter?.getAttribute("name") || "update",
				action_value: submitter?.getAttribute("value") || "",
				check_all: $form().check_all,
				checked: $form().checked,
				options: Object.fromEntries(Object.values($form().options).filter((f) => Object.keys($tainted()?.options ?? {}).includes(f.id.toString())).map((f) => [f.id, f])),
				id_option: 0,
				option_image: void 0,
				option_preview: void 0
			};
			store_mutate(form, untrack($form).action_name = form_data.action_name, untrack($form));
			store_mutate(form, untrack($form).action_value = form_data.action_value, untrack($form));
			let save_options = true;
			if (["configure", "options"].includes(form_data.action_name)) save_options = Object.values(form_data.options).length > 0;
			if (save_options) {
				const res = await form_action({
					route: page.route.id,
					action: "update",
					data: form_data
				}, { id_field: $$props.data.id_field });
				form.update((state$1) => ({
					...state$1,
					action_name: form_data.action_name,
					action_value: form_data.action_value,
					options: obj(res.options)
				}), { taint: false });
			}
			form.update((state$1) => ({
				...state$1,
				action_name: ""
			}));
			tainted.set({});
			if ($form().option_image) {
				const form_data$1 = new FormData();
				form_data$1.append("action_name", "update-image");
				form_data$1.append("id_option", $form().id_option.toString());
				form_data$1.append("file", $form().option_image);
				store_mutate(form, untrack($form).option_image = void 0, untrack($form));
				const res = await upload_files({
					route: page.route.id,
					action: "update",
					data: form_data$1
				}, { id_field: $$props.data.id_field });
				form.update((state$1) => ({
					...state$1,
					options: obj(res.options)
				}), { taint: false });
				toast.success(_("Option image updated successfully"));
				return;
			}
			if ($form().option_font) {
				const form_data$1 = new FormData();
				form_data$1.append("action_name", "update-font");
				form_data$1.append("id_option", $form().id_option.toString());
				form_data$1.append("file", $form().option_font);
				store_mutate(form, untrack($form).option_image = void 0, untrack($form));
				const res = await upload_files({
					route: page.route.id,
					action: "update",
					data: form_data$1
				}, { id_field: $$props.data.id_field });
				form.update((state$1) => ({
					...state$1,
					options: obj(res.options)
				}), { taint: false });
				toast.success(_("Option font updated successfully"));
				return;
			}
			if ($form().option_preview) {
				const form_data$1 = new FormData();
				form_data$1.append("action_name", "update-preview");
				form_data$1.append("id_option", $form().id_option.toString());
				form_data$1.append("file", $form().option_preview);
				store_mutate(form, untrack($form).option_preview = void 0, untrack($form));
				const res = await upload_files({
					route: page.route.id,
					action: "update",
					data: form_data$1
				}, { id_field: $$props.data.id_field });
				form.update((state$1) => ({
					...state$1,
					options: obj(res.options)
				}), { taint: false });
				toast.success(_("Option preview image updated successfully"));
				return;
			}
			if ($form().images.length > 0) {
				const form_data$1 = new FormData();
				form_data$1.append("action_name", "import-images");
				$form().images.forEach((file) => {
					form_data$1.append("files[]", file);
				});
				store_mutate(form, untrack($form).images = [], untrack($form));
				const res = await upload_files({
					route: page.route.id,
					action: "update",
					data: form_data$1
				}, { id_field: $$props.data.id_field });
				form.update((state$1) => ({
					...state$1,
					options: obj(res.options)
				}), { taint: false });
				toast.success(_("Options imported successfully"));
				return;
			}
			if ($form().fonts.length > 0) {
				const form_data$1 = new FormData();
				form_data$1.append("action_name", "import-fonts");
				$form().fonts.forEach((file) => {
					form_data$1.append("files[]", file);
				});
				store_mutate(form, untrack($form).fonts = [], untrack($form));
				const res = await upload_files({
					route: page.route.id,
					action: "update",
					data: form_data$1
				}, { id_field: $$props.data.id_field });
				form.update((state$1) => ({
					...state$1,
					options: obj(res.options)
				}), { taint: false });
				toast.success(_("Options imported successfully"));
				return;
			}
			switch (form_data.action_name) {
				case "add":
					toast.success(_("Option added successfully"));
					break;
				case "delete":
					toast.success(_("Option deleted successfully"));
					break;
				case "delete-options":
					toast.success(_("Options deleted successfully"));
					break;
				case "toggle":
					toast.success(_("Option visibility toggled successfully"));
					break;
				case "toggle-default":
					toast.success(_("Default toggled successfully"));
					break;
				case "update":
					toast.success(_("Options updated successfully"));
					break;
			}
			cancel();
		}
	});
	const { form, enhance, tainted, submit, validateForm, errors } = superform;
	let config = user_derived(() => FieldConfig.get(+get(field).type || FieldTypes._DP_INPUT_));
	async function onEnd(ev) {
		const order = Array.from(ev.target.rows).map((row) => +(row.dataset.id ?? 0)).filter((id) => id > 0);
		const res = await form_action({
			route: page.route.id,
			action: "sort",
			data: { order }
		}, { id_field: $$props.data.id_field });
		form.update((state$1) => ({
			...state$1,
			action_name: "",
			action_value: "",
			options: obj(res.options)
		}));
		tainted.set({});
		if (ev.oldIndex !== ev.newIndex) ev.item.remove();
		toast.success(_("Options reordered successfully"));
	}
	let open = state(false);
	onMount(() => {
		set(open, true);
	});
	let OptionComponent = {
		[FieldTypes._DP_DROPDOWN_]: DropdownOptions,
		[FieldTypes._DP_THUMBNAILS_]: ImageListOptions,
		[FieldTypes._DP_RADIO_]: RadioOptions,
		[FieldTypes._DP_PREVIEW_]: PreviewOptions,
		[FieldTypes._DP_FONT_]: FontOptions
	}[$$props.data.field.type];
	var fragment = comment();
	component(first_child(fragment), () => Root, ($$anchor$1, Sheet_Root) => {
		Sheet_Root($$anchor$1, {
			onOpenChangeComplete: () => !get(open) && goto(url("/product/fields"), { noScroll: true }),
			get open() {
				return get(open);
			},
			set open($$value) {
				set(open, $$value, true);
			},
			children: ($$anchor$2, $$slotProps) => {
				var fragment_1 = comment();
				component(first_child(fragment_1), () => Sheet_content, ($$anchor$3, Sheet_Content) => {
					Sheet_Content($$anchor$3, {
						class: "w-[1200px] overflow-scroll sm:max-w-full",
						children: ($$anchor$4, $$slotProps$1) => {
							var fragment_2 = root_2();
							var node_2 = first_child(fragment_2);
							component(node_2, () => Sheet_header, ($$anchor$5, Sheet_Header) => {
								Sheet_Header($$anchor$5, {
									children: ($$anchor$6, $$slotProps$2) => {
										var fragment_3 = comment();
										component(first_child(fragment_3), () => Sheet_title, ($$anchor$7, Sheet_Title) => {
											Sheet_Title($$anchor$7, {
												children: ($$anchor$8, $$slotProps$3) => {
													var div = root_4();
													var div_1 = child(div);
													var node_4 = child(div_1);
													Button(node_4, {
														onclick: () => set(open, false),
														size: "sm",
														variant: "outline",
														children: ($$anchor$9, $$slotProps$4) => {
															Icon($$anchor$9, { icon: "mdi:arrow-left" });
														},
														$$slots: { default: true }
													});
													var div_2 = sibling(node_4, 2);
													var text$1 = child(div_2);
													component(sibling(text$1), () => Sheet_description, ($$anchor$9, Sheet_Description) => {
														Sheet_Description($$anchor$9, {
															children: ($$anchor$10, $$slotProps$4) => {
																next();
																var text_1 = text();
																template_effect(($0, $1) => set_text(text_1, `${$0 ?? ""}: ${$1 ?? ""}`), [() => _("Field type"), () => $$props.data.field_types.find((t) => t.type === get(field).type)?.label]);
																append($$anchor$10, text_1);
															},
															$$slots: { default: true }
														});
													});
													reset(div_2);
													reset(div_1);
													var node_6 = sibling(div_1, 2);
													var consequent = ($$anchor$9) => {
														{
															let $0 = user_derived(() => url(`/product/fields/${get(field).id}/settings`));
															Button($$anchor$9, {
																get href() {
																	return get($0);
																},
																size: "sm",
																variant: "outline",
																children: ($$anchor$10, $$slotProps$4) => {
																	var fragment_7 = root_8();
																	var node_7 = first_child(fragment_7);
																	Icon(node_7, { icon: "mdi:settings" });
																	var text_2 = sibling(node_7);
																	Icon(sibling(text_2), { icon: "mdi:arrow-right" });
																	template_effect(($0$1) => set_text(text_2, ` ${$0$1 ?? ""} `), [() => _("Field settings")]);
																	append($$anchor$10, fragment_7);
																},
																$$slots: { default: true }
															});
														}
													};
													if_block(node_6, ($$render) => {
														if (get(config)?.settings) $$render(consequent);
													});
													reset(div);
													template_effect(($0) => set_text(text$1, `${$0 ?? ""}: ${get(field).name ?? ""} `), [() => _("Configure options")]);
													append($$anchor$8, div);
												},
												$$slots: { default: true }
											});
										});
										append($$anchor$6, fragment_3);
									},
									$$slots: { default: true }
								});
							});
							var div_3 = sibling(node_2, 2);
							var div_4 = child(div_3);
							LangPicker(child(div_4), { get languages() {
								return $$props.data.languages;
							} });
							reset(div_4);
							var form_1 = sibling(div_4, 2);
							OptionComponent(child(form_1), { get superform() {
								return superform;
							} });
							reset(form_1);
							action(form_1, ($$node) => enhance?.($$node));
							action(form_1, ($$node) => navigate?.($$node));
							action(form_1, ($$node, $$action_arg) => sortable?.($$node, $$action_arg), () => ({ onEnd }));
							action(form_1, ($$node, $$action_arg) => submitOnEnter?.($$node, $$action_arg), () => ({ submit }));
							reset(div_3);
							append($$anchor$4, fragment_2);
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
export { _page as component, _page_exports as universal };
