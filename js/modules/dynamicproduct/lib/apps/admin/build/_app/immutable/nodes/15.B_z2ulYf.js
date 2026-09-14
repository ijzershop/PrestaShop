import { Ft as push, G as if_block, Ht as next, L as component, N as action, Ot as user_derived, Pt as pop, Ut as reset, X as comment, Y as append, Z as from_html, Zt as __exportAll, bt as sibling, d as store_mutate, et as text, l as setup_stores, lt as untrack, ot as get, pt as template_effect, q as set_text, u as store_get, vt as child, yt as first_child } from "../chunks/DUscB9kS.js";
import "../chunks/B_W7bg6n.js";
import { o as invalidateAll } from "../chunks/D365qDux.js";
import { i as superForm, n as superValidate, t as valibot } from "../chunks/CPdJ2mnA.js";
import "../chunks/D-Alr120.js";
import "../chunks/CEFrIRjK.js";
import { a as form_action, s as page_load, t as Button } from "../chunks/BIEFGHhw.js";
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
import { r as Alert } from "../chunks/OMr53o_L.js";
import { t as SettingsSchema } from "../chunks/BUI3_Np8.js";
import { t as Spinner } from "../chunks/C9eHbt79.js";
import { t as debounce } from "../chunks/C961kT60.js";
import { t as Input } from "../chunks/D2YUxW8P.js";
var _page_exports = /* @__PURE__ */ __exportAll({
	load: () => load,
	prerender: () => true
}, 1);
const load = async (event) => {
	const { product_config } = await page_load(event);
	return { form: await superValidate(product_config, valibot(SettingsSchema, { typeMode: "output" })) };
};
var root_5 = from_html(`<div class="items-top flex space-x-2 pl-8"><!> <div class="grid gap-1.5 leading-none"><!> <p class="text-muted-foreground max-w-xs text-sm"> </p></div></div>`);
var root_8 = from_html(`<div class="flex flex-col gap-6"><div class="flex flex-col gap-2"><div class="flex gap-4"><div class="flex w-full max-w-48 flex-col gap-1.5"><!> <!></div> <div class="flex w-full max-w-48 flex-col gap-1.5"><!> <!></div></div> <p class="text-muted-foreground max-w-xs text-sm"> </p> <!></div> <div class="flex items-center space-x-2"><!> <!></div> <div class="items-top flex space-x-2"><!> <div class="grid gap-1.5 leading-none"><!> <p class="text-muted-foreground max-w-xs text-sm"> </p></div></div> <div class="flex items-center space-x-2"><!> <!></div></div>`);
var root_1 = from_html(`<div class="flex flex-col gap-6"><div class="flex items-center space-x-2"><!> <!></div> <div class="flex items-center space-x-2"><!> <!></div> <div class="items-top flex space-x-2"><!> <div class="grid gap-1.5 leading-none"><!> <p class="text-muted-foreground max-w-xs text-sm"> </p></div></div> <!> <!> <div class="flex items-center space-x-2"><!> <!></div> <div class="flex items-center space-x-2"><!> <!></div> <div class="items-top flex space-x-2"><!> <div class="grid gap-1.5 leading-none"><!> <p class="text-muted-foreground max-w-xs text-sm"> </p></div></div> <div class="flex items-center space-x-2"><!> <!></div> <div class="flex items-center space-x-2"><!> <!></div></div>`);
var root_22 = from_html(`<!> `, 1);
var root_21 = from_html(`<!> <span class="text-success"> </span>`, 1);
var root = from_html(`<form method="POST"><!> <!></form>`);
function _page($$anchor, $$props) {
	push($$props, true);
	const $form = () => store_get(form, "$form", $$stores);
	const $errors = () => store_get(errors, "$errors", $$stores);
	const $tainted = () => store_get(tainted, "$tainted", $$stores);
	const $submitting = () => store_get(submitting, "$submitting", $$stores);
	const $message = () => store_get(message, "$message", $$stores);
	const [$$stores, $$cleanup] = setup_stores();
	const { form, enhance, message, tainted, errors, submitting, validateForm, submit } = superForm($$props.data.form, {
		SPA: true,
		validators: valibot(SettingsSchema, { typeMode: "output" }),
		resetForm: false,
		invalidateAll: false,
		async onSubmit({ cancel }) {
			const { valid } = await validateForm();
			if (valid) {
				toast.loading(_("Saving..."));
				const data = await form_action({
					route: page.route.id,
					action: null,
					data: $form()
				});
				form.update(() => data);
				message.set(_("The settings have been updated"));
				toast.success(_("The settings have been updated"));
				await invalidateAll();
			}
			cancel();
		}
	});
	let debouncedSubmit = debounce(submit, 500);
	var form_1 = root();
	var node = child(form_1);
	component(node, () => Card_content, ($$anchor$1, Card_Content) => {
		Card_Content($$anchor$1, {
			children: ($$anchor$2, $$slotProps) => {
				var div = root_1();
				var div_1 = child(div);
				var node_1 = child(div_1);
				{
					let $0 = user_derived(() => ({ decorated: $form().active }));
					Switch(node_1, {
						get class() {
							return get($0);
						},
						id: "active",
						get onclick() {
							return debouncedSubmit;
						},
						get checked() {
							return $form().active;
						},
						set checked($$value) {
							store_mutate(form, untrack($form).active = $$value, untrack($form));
						}
					});
				}
				Label(sibling(node_1, 2), {
					for: "active",
					children: ($$anchor$3, $$slotProps$1) => {
						next();
						var text$1 = text();
						template_effect(($0) => set_text(text$1, $0), [() => _("Enable the module for this product")]);
						append($$anchor$3, text$1);
					},
					$$slots: { default: true }
				});
				reset(div_1);
				var div_2 = sibling(div_1, 2);
				var node_3 = child(div_2);
				Switch(node_3, {
					id: "required",
					get onclick() {
						return debouncedSubmit;
					},
					get checked() {
						return $form().required;
					},
					set checked($$value) {
						store_mutate(form, untrack($form).required = $$value, untrack($form));
					}
				});
				Label(sibling(node_3, 2), {
					for: "required",
					children: ($$anchor$3, $$slotProps$1) => {
						next();
						var text_1 = text();
						template_effect(($0) => set_text(text_1, $0), [() => _("Required customization")]);
						append($$anchor$3, text_1);
					},
					$$slots: { default: true }
				});
				reset(div_2);
				var div_3 = sibling(div_2, 2);
				var node_5 = child(div_3);
				Switch(node_5, {
					id: "recalc",
					get onclick() {
						return debouncedSubmit;
					},
					get checked() {
						return $form().recalc;
					},
					set checked($$value) {
						store_mutate(form, untrack($form).recalc = $$value, untrack($form));
					}
				});
				var div_4 = sibling(node_5, 2);
				var node_6 = child(div_4);
				Label(node_6, {
					for: "recalc",
					children: ($$anchor$3, $$slotProps$1) => {
						next();
						var text_2 = text();
						template_effect(($0) => set_text(text_2, $0), [() => _("Recalculate price in cart when quantity changes")]);
						append($$anchor$3, text_2);
					},
					$$slots: { default: true }
				});
				var p = sibling(node_6, 2);
				var text_3 = child(p, true);
				reset(p);
				reset(div_4);
				reset(div_3);
				var node_7 = sibling(div_3, 2);
				var consequent = ($$anchor$3) => {
					var div_5 = root_5();
					var node_8 = child(div_5);
					Switch(node_8, {
						get onclick() {
							return debouncedSubmit;
						},
						id: "always_recalc",
						get checked() {
							return $form().always_recalc;
						},
						set checked($$value) {
							store_mutate(form, untrack($form).always_recalc = $$value, untrack($form));
						}
					});
					var div_6 = sibling(node_8, 2);
					var node_9 = child(div_6);
					Label(node_9, {
						for: "always_recalc",
						children: ($$anchor$4, $$slotProps$1) => {
							next();
							var text_4 = text();
							template_effect(($0) => set_text(text_4, $0), [() => _("Recalculate price in cart after each page view")]);
							append($$anchor$4, text_4);
						},
						$$slots: { default: true }
					});
					var p_1 = sibling(node_9, 2);
					var text_5 = child(p_1, true);
					reset(p_1);
					reset(div_6);
					reset(div_5);
					template_effect(($0) => set_text(text_5, $0), [() => _("Not recommended as it can slow down the cart page")]);
					append($$anchor$3, div_5);
				};
				if_block(node_7, ($$render) => {
					if ($form().recalc) $$render(consequent);
				});
				var node_10 = sibling(node_7, 2);
				component(node_10, () => Card, ($$anchor$3, Card_Root) => {
					Card_Root($$anchor$3, {
						class: "w-fit",
						children: ($$anchor$4, $$slotProps$1) => {
							var fragment_4 = comment();
							component(first_child(fragment_4), () => Card_content, ($$anchor$5, Card_Content_1) => {
								Card_Content_1($$anchor$5, {
									children: ($$anchor$6, $$slotProps$2) => {
										var div_7 = root_8();
										var div_8 = child(div_7);
										var div_9 = child(div_8);
										var div_10 = child(div_9);
										var node_12 = child(div_10);
										Label(node_12, {
											for: "displayed_price",
											children: ($$anchor$7, $$slotProps$3) => {
												next();
												var text_6 = text();
												template_effect(($0) => set_text(text_6, $0), [() => _("Displayed price")]);
												append($$anchor$7, text_6);
											},
											$$slots: { default: true }
										});
										Input(sibling(node_12, 2), {
											id: "displayed_price",
											get onchange() {
												return submit;
											},
											get value() {
												return $form().displayed_price;
											},
											set value($$value) {
												store_mutate(form, untrack($form).displayed_price = $$value, untrack($form));
											}
										});
										reset(div_10);
										var div_11 = sibling(div_10, 2);
										var node_14 = child(div_11);
										Label(node_14, {
											for: "displayed_price_label",
											children: ($$anchor$7, $$slotProps$3) => {
												next();
												var text_7 = text();
												template_effect(($0) => set_text(text_7, $0), [() => _("Price unit")]);
												append($$anchor$7, text_7);
											},
											$$slots: { default: true }
										});
										var node_15 = sibling(node_14, 2);
										{
											let $0 = user_derived(() => _("Per kilo, per litre"));
											Input(node_15, {
												id: "displayed_price_label",
												get onchange() {
													return submit;
												},
												get placeholder() {
													return get($0);
												},
												get value() {
													return $form().displayed_price_label;
												},
												set value($$value) {
													store_mutate(form, untrack($form).displayed_price_label = $$value, untrack($form));
												}
											});
										}
										reset(div_11);
										reset(div_9);
										var p_2 = sibling(div_9, 2);
										var text_8 = child(p_2, true);
										reset(p_2);
										var node_16 = sibling(p_2, 2);
										var consequent_1 = ($$anchor$7) => {
											var fragment_7 = comment();
											component(first_child(fragment_7), () => Alert, ($$anchor$8, Alert_Root) => {
												Alert_Root($$anchor$8, {
													variant: "destructive",
													children: ($$anchor$9, $$slotProps$3) => {
														next();
														var text_9 = text();
														template_effect(() => set_text(text_9, $errors().displayed_price));
														append($$anchor$9, text_9);
													},
													$$slots: { default: true }
												});
											});
											append($$anchor$7, fragment_7);
										};
										if_block(node_16, ($$render) => {
											if ($errors().displayed_price) $$render(consequent_1);
										});
										reset(div_8);
										var div_12 = sibling(div_8, 2);
										var node_18 = child(div_12);
										Switch(node_18, {
											id: "display_starting_from",
											get onclick() {
												return debouncedSubmit;
											},
											get checked() {
												return $form().display_starting_from;
											},
											set checked($$value) {
												store_mutate(form, untrack($form).display_starting_from = $$value, untrack($form));
											}
										});
										Label(sibling(node_18, 2), {
											for: "display_starting_from",
											children: ($$anchor$7, $$slotProps$3) => {
												next();
												var text_10 = text();
												template_effect(($0) => set_text(text_10, $0), [() => _("Display the \"Starting from\" label in the category page")]);
												append($$anchor$7, text_10);
											},
											$$slots: { default: true }
										});
										reset(div_12);
										var div_13 = sibling(div_12, 2);
										var node_20 = child(div_13);
										Switch(node_20, {
											id: "display_dynamic_price",
											get onclick() {
												return debouncedSubmit;
											},
											get checked() {
												return $form().display_dynamic_price;
											},
											set checked($$value) {
												store_mutate(form, untrack($form).display_dynamic_price = $$value, untrack($form));
											}
										});
										var div_14 = sibling(node_20, 2);
										var node_21 = child(div_14);
										Label(node_21, {
											for: "display_dynamic_price",
											children: ($$anchor$7, $$slotProps$3) => {
												next();
												var text_11 = text();
												template_effect(($0) => set_text(text_11, $0), [() => _("Display the calculated price in the category page")]);
												append($$anchor$7, text_11);
											},
											$$slots: { default: true }
										});
										var p_3 = sibling(node_21, 2);
										var text_12 = child(p_3, true);
										reset(p_3);
										reset(div_14);
										reset(div_13);
										var div_15 = sibling(div_13, 2);
										var node_22 = child(div_15);
										Switch(node_22, {
											id: "display_customization_cost",
											get onclick() {
												return debouncedSubmit;
											},
											get checked() {
												return $form().display_customization_cost;
											},
											set checked($$value) {
												store_mutate(form, untrack($form).display_customization_cost = $$value, untrack($form));
											}
										});
										Label(sibling(node_22, 2), {
											for: "display_customization_cost",
											children: ($$anchor$7, $$slotProps$3) => {
												next();
												var text_13 = text();
												template_effect(($0) => set_text(text_13, $0), [() => _("Display customization cost in customization summary")]);
												append($$anchor$7, text_13);
											},
											$$slots: { default: true }
										});
										reset(div_15);
										reset(div_7);
										template_effect(($0, $1) => {
											set_text(text_8, $0);
											set_text(text_12, $1);
										}, [() => _("You can configure a displayed price if your product has a price of 0"), () => _("Applies only if the product has a price of 0. You may need to clear the cache after changing this setting")]);
										append($$anchor$6, div_7);
									},
									$$slots: { default: true }
								});
							});
							append($$anchor$4, fragment_4);
						},
						$$slots: { default: true }
					});
				});
				var div_16 = sibling(node_10, 2);
				var node_24 = child(div_16);
				Switch(node_24, {
					id: "display_weight",
					get onclick() {
						return debouncedSubmit;
					},
					get checked() {
						return $form().display_weight;
					},
					set checked($$value) {
						store_mutate(form, untrack($form).display_weight = $$value, untrack($form));
					}
				});
				Label(sibling(node_24, 2), {
					for: "display_weight",
					children: ($$anchor$3, $$slotProps$1) => {
						next();
						var text_14 = text();
						template_effect(($0) => set_text(text_14, $0), [() => _("Display weight to customers")]);
						append($$anchor$3, text_14);
					},
					$$slots: { default: true }
				});
				reset(div_16);
				var div_17 = sibling(div_16, 2);
				var node_26 = child(div_17);
				Switch(node_26, {
					id: "hide_qty",
					get onclick() {
						return debouncedSubmit;
					},
					get checked() {
						return $form().hide_qty;
					},
					set checked($$value) {
						store_mutate(form, untrack($form).hide_qty = $$value, untrack($form));
					}
				});
				Label(sibling(node_26, 2), {
					for: "hide_qty",
					children: ($$anchor$3, $$slotProps$1) => {
						next();
						var text_15 = text();
						template_effect(($0) => set_text(text_15, $0), [() => _("Hide quantity input")]);
						append($$anchor$3, text_15);
					},
					$$slots: { default: true }
				});
				reset(div_17);
				var div_18 = sibling(div_17, 2);
				var node_28 = child(div_18);
				Switch(node_28, {
					id: "multiply_price",
					get onclick() {
						return debouncedSubmit;
					},
					get checked() {
						return $form().multiply_price;
					},
					set checked($$value) {
						store_mutate(form, untrack($form).multiply_price = $$value, untrack($form));
					}
				});
				var div_19 = sibling(node_28, 2);
				var node_29 = child(div_19);
				Label(node_29, {
					for: "multiply_price",
					children: ($$anchor$3, $$slotProps$1) => {
						next();
						var text_16 = text();
						template_effect(($0) => set_text(text_16, $0), [() => _("Multiply price & weight by quantity")]);
						append($$anchor$3, text_16);
					},
					$$slots: { default: true }
				});
				var p_4 = sibling(node_29, 2);
				var text_17 = child(p_4, true);
				reset(p_4);
				reset(div_19);
				reset(div_18);
				var div_20 = sibling(div_18, 2);
				var node_30 = child(div_20);
				Switch(node_30, {
					id: "allow_save",
					get onclick() {
						return debouncedSubmit;
					},
					get checked() {
						return $form().allow_save;
					},
					set checked($$value) {
						store_mutate(form, untrack($form).allow_save = $$value, untrack($form));
					}
				});
				Label(sibling(node_30, 2), {
					for: "allow_save",
					children: ($$anchor$3, $$slotProps$1) => {
						next();
						var text_18 = text();
						template_effect(($0) => set_text(text_18, $0), [() => _("Allow saving customization to profile")]);
						append($$anchor$3, text_18);
					},
					$$slots: { default: true }
				});
				reset(div_20);
				var div_21 = sibling(div_20, 2);
				var node_32 = child(div_21);
				Switch(node_32, {
					id: "split_summary",
					get onclick() {
						return debouncedSubmit;
					},
					get checked() {
						return $form().split_summary;
					},
					set checked($$value) {
						store_mutate(form, untrack($form).split_summary = $$value, untrack($form));
					}
				});
				Label(sibling(node_32, 2), {
					for: "split_summary",
					children: ($$anchor$3, $$slotProps$1) => {
						next();
						var text_19 = text();
						template_effect(($0) => set_text(text_19, $0), [() => _("Split summary by groups")]);
						append($$anchor$3, text_19);
					},
					$$slots: { default: true }
				});
				reset(div_21);
				reset(div);
				template_effect(($0, $1) => {
					set_text(text_3, $0);
					set_text(text_17, $1);
				}, [() => _("Enable if the price depends on the cart quantity"), () => _("If activated, the displayed price & weight on the product page will be multiplied by the quantity")]);
				append($$anchor$2, div);
			},
			$$slots: { default: true }
		});
	});
	component(sibling(node, 2), () => Card_footer, ($$anchor$1, Card_Footer) => {
		Card_Footer($$anchor$1, {
			class: "flex gap-2",
			children: ($$anchor$2, $$slotProps) => {
				var fragment_17 = root_21();
				var node_35 = first_child(fragment_17);
				{
					let $0 = user_derived(() => $tainted() && "btn-highlight");
					let $1 = user_derived(() => !$tainted());
					Button(node_35, {
						get class() {
							return `flex gap-2 ${get($0) ?? ""}`;
						},
						get disabled() {
							return get($1);
						},
						type: "submit",
						children: ($$anchor$3, $$slotProps$1) => {
							var fragment_18 = root_22();
							var node_36 = first_child(fragment_18);
							Spinner(node_36, {
								get loading() {
									return $submitting();
								},
								children: ($$anchor$4, $$slotProps$2) => {
									Icon($$anchor$4, { icon: "mdi:content-save" });
								},
								$$slots: { default: true }
							});
							var text_20 = sibling(node_36);
							template_effect(($0$1) => set_text(text_20, ` ${$0$1 ?? ""}`), [() => _("Save")]);
							append($$anchor$3, fragment_18);
						},
						$$slots: { default: true }
					});
				}
				var span = sibling(node_35, 2);
				var text_21 = child(span, true);
				reset(span);
				template_effect(() => set_text(text_21, $message()));
				append($$anchor$2, fragment_17);
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
