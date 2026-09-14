import { A as set_class, Ct as set, D as set_attribute, Ft as push, G as if_block, Ht as next, L as component, N as action, Ot as user_derived, Pt as pop, R as snippet, Tt as state, Ut as reset, V as each, X as comment, Y as append, Z as from_html, Zt as __exportAll, bt as sibling, c as spread_props, ct as tick, d as store_mutate, et as text, j as clsx, l as setup_stores, lt as untrack, ot as get, pt as template_effect, q as set_text, u as store_get, v as init, vt as child, xt as proxy, yt as first_child } from "../chunks/DUscB9kS.js";
import "../chunks/B_W7bg6n.js";
import { s as onNavigate, t as afterNavigate } from "../chunks/D365qDux.js";
import { i as superForm, r as defaults, t as valibot } from "../chunks/CPdJ2mnA.js";
import "../chunks/D-Alr120.js";
import "../chunks/CEFrIRjK.js";
import { t as browser } from "../chunks/DgeI1AN1.js";
import { a as form_action, d as redirect, f as dpa, o as layout_load, p as in_iframe, r as cn, t as Button } from "../chunks/BIEFGHhw.js";
import { n as strip_base_path, r as url, t as pathname } from "../chunks/Crb1phnD.js";
import { n as toast } from "../chunks/CQQo25vS.js";
import "../chunks/CJDS8lnd.js";
import "../chunks/DAbnHPcz.js";
import { t as Mode_watcher } from "../chunks/zHexzNNA.js";
import "../chunks/BmQEESrH.js";
import { i as dict, n as _, t as Icon } from "../chunks/DFl6Gq92.js";
import { n as page, t as navigating } from "../chunks/BRpqcTWk.js";
import "../chunks/_yKPJ4BA.js";
import { i as Command_group, n as Command_input, o as Command, r as Command_item, t as Command_list } from "../chunks/CdsT4L5B.js";
import "../chunks/T79hDoyY.js";
import { i as Popover_content, n as Root, r as Trigger } from "../chunks/CCOnoN-X.js";
import "../chunks/BO7Cdi-m.js";
import { i as Tabs_content, n as Root$1, r as Tabs_list, t as ModePicker } from "../chunks/CTepkvpL.js";
import { t as LangPicker } from "../chunks/6kTRSPQW.js";
import { o as Card } from "../chunks/Bpx6gt8W.js";
import { t as LocalStore } from "../chunks/C4w9vuey.js";
import { n as lang, t as initLangStore } from "../chunks/cJwMBL5_.js";
import "../chunks/GFXpcJ_Z.js";
import "../chunks/CgH3Vt0F.js";
import { n as Alert_description, r as Alert, t as Alert_title } from "../chunks/OMr53o_L.js";
import { g as string, u as object } from "../chunks/Da0rmiev.js";
import "../chunks/BUI3_Np8.js";
import { n as chatbot, t as _page } from "../chunks/BpEetRm3.js";
import { t as current_form } from "../chunks/BD21p-7F.js";
import { t as Spinner } from "../chunks/C9eHbt79.js";
import "../chunks/Bc1vuzVu.js";
import { t as debounce } from "../chunks/C961kT60.js";
import "../chunks/BirQbuIK.js";
import "../chunks/BAR_jctJ.js";
import "../chunks/CAZFn-OP.js";
import "../chunks/Dt-VaJa3.js";
import "../chunks/fQ7Z9iZC.js";
var _layout_exports = /* @__PURE__ */ __exportAll({
	load: () => load,
	prerender: () => false,
	ssr: () => false,
	trailingSlash: () => trailingSlash
}, 1);
const trailingSlash = "always";
const load = async (event) => {
	const { untrack: untrack$1, url: url$1, route } = event;
	untrack$1(() => {
		if (route.id === "/product") {
			const initial_path = dpa.links.initial_path || url$1.searchParams.get("initial_path");
			if (initial_path && !url$1.searchParams.has("home")) {
				const target = url(`/${initial_path}`);
				if (target !== url$1.pathname) return redirect(302, target);
			}
		}
	});
	const data = await layout_load(event, "/product");
	dpa.id_source_product = data.id_source_product;
	dpa.id_default_lang = data.id_default_lang;
	dpa.field_types = data.field_types;
	return data;
};
const GenericFormSchema = object({
	action_name: string(),
	action_value: string()
});
var root_5$1 = from_html(`<div><!> <!></div>`);
var root_8 = from_html(`<!> `, 1);
var root_4$1 = from_html(`<div> </div> <div> </div> <!> <div><!></div>`, 1);
var root_2$1 = from_html(`<!> <!> <!>`, 1);
var root_13 = from_html(`<div> </div> <div> </div> <div><!></div>`, 1);
var root_11 = from_html(`<!> <!> <!>`, 1);
var root$3 = from_html(`<form method="post"><!></form>`);
function LinkedConfigs($$anchor, $$props) {
	push($$props, true);
	const $form = () => store_get(form, "$form", $$stores);
	const [$$stores, $$cleanup] = setup_stores();
	let nb_linked_configs = proxy($$props.data.nb_linked_configs);
	let { form, enhance } = superForm(defaults(valibot(GenericFormSchema)), {
		dataType: "json",
		SPA: true,
		validators: false,
		invalidateAll: false,
		async onSubmit({ submitter, cancel }) {
			const button = submitter;
			store_mutate(form, untrack($form).action_name = button?.name || "", untrack($form));
			store_mutate(form, untrack($form).action_value = button?.value || "", untrack($form));
			const res = await form_action({
				route: "/",
				action: $form().action_name,
				data: $form()
			});
			toast.success(res.message);
			if (res.reload) setTimeout(() => {
				location.href = url("/product");
			}, 1e3);
			cancel();
		}
	});
	var form_1 = root$3();
	var node = child(form_1);
	var consequent_1 = ($$anchor$1) => {
		var fragment = comment();
		component(first_child(fragment), () => Alert, ($$anchor$2, Alert_Root) => {
			Alert_Root($$anchor$2, {
				children: ($$anchor$3, $$slotProps) => {
					var fragment_1 = root_2$1();
					var node_2 = first_child(fragment_1);
					Icon(node_2, { icon: "ic:warning" });
					var node_3 = sibling(node_2, 2);
					component(node_3, () => Alert_title, ($$anchor$4, Alert_Title) => {
						Alert_Title($$anchor$4, {
							children: ($$anchor$5, $$slotProps$1) => {
								next();
								var text$1 = text();
								template_effect(($0) => set_text(text$1, $0), [() => _("Warning")]);
								append($$anchor$5, text$1);
							},
							$$slots: { default: true }
						});
					});
					component(sibling(node_3, 2), () => Alert_description, ($$anchor$4, Alert_Description) => {
						Alert_Description($$anchor$4, {
							class: "flex flex-col justify-start gap-2",
							children: ($$anchor$5, $$slotProps$1) => {
								var fragment_3 = root_4$1();
								var div = first_child(fragment_3);
								var text_1 = child(div);
								reset(div);
								var div_1 = sibling(div, 2);
								var text_2 = child(div_1, true);
								reset(div_1);
								var node_5 = sibling(div_1, 2);
								var consequent = ($$anchor$6) => {
									var div_2 = root_5$1();
									var node_6 = child(div_2);
									Button(node_6, {
										size: "sm",
										name: "unlink_config",
										get value() {
											return dpa.id_product;
										},
										type: "submit",
										onclick: (e) => {
											if (!confirm(_("This will restore the previous configuration of this product"))) e.preventDefault();
										},
										children: ($$anchor$7, $$slotProps$2) => {
											next();
											var text_3 = text();
											template_effect(($0) => set_text(text_3, $0), [() => _("Unlink configuration")]);
											append($$anchor$7, text_3);
										},
										$$slots: { default: true }
									});
									Button(sibling(node_6, 2), {
										size: "sm",
										name: "copy_config",
										get value() {
											return dpa.id_product;
										},
										type: "submit",
										onclick: (e) => {
											if (!confirm(_("This will copy the configuration of the linked product to this product"))) e.preventDefault();
										},
										children: ($$anchor$7, $$slotProps$2) => {
											next();
											var text_4 = text();
											template_effect(($0) => set_text(text_4, $0), [() => _("Copy linked configuration")]);
											append($$anchor$7, text_4);
										},
										$$slots: { default: true }
									});
									reset(div_2);
									append($$anchor$6, div_2);
								};
								if_block(node_5, ($$render) => {
									if (!$$props.data.is_category_linked) $$render(consequent);
								});
								var div_3 = sibling(node_5, 2);
								Button(child(div_3), {
									target: "_blank",
									rel: "noreferrer",
									variant: "link",
									get href() {
										return $$props.data.original_configuration_link;
									},
									children: ($$anchor$6, $$slotProps$2) => {
										var fragment_6 = root_8();
										var node_9 = first_child(fragment_6);
										Icon(node_9, { icon: "ic:baseline-arrow-outward" });
										var text_5 = sibling(node_9);
										template_effect(($0) => set_text(text_5, ` ${$0 ?? ""}`), [() => _("View original configuration")]);
										append($$anchor$6, fragment_6);
									},
									$$slots: { default: true }
								});
								reset(div_3);
								template_effect(($0, $1) => {
									set_text(text_1, `${$0 ?? ""} #${$$props.data.id_source_product ?? ""} (${$$props.data.source_product_name ?? ""}).`);
									set_text(text_2, $1);
								}, [() => _("This configuration is linked to the product"), () => _("Any change will have an effect on the configuration of _nb_ products.").replace("_nb_", (nb_linked_configs + 1).toString())]);
								append($$anchor$5, fragment_3);
							},
							$$slots: { default: true }
						});
					});
					append($$anchor$3, fragment_1);
				},
				$$slots: { default: true }
			});
		});
		append($$anchor$1, fragment);
	};
	var alternate = ($$anchor$1) => {
		var fragment_7 = comment();
		var node_10 = first_child(fragment_7);
		var consequent_2 = ($$anchor$2) => {
			var fragment_8 = comment();
			component(first_child(fragment_8), () => Alert, ($$anchor$3, Alert_Root_1) => {
				Alert_Root_1($$anchor$3, {
					children: ($$anchor$4, $$slotProps) => {
						var fragment_9 = root_11();
						var node_12 = first_child(fragment_9);
						Icon(node_12, { icon: "ic:warning" });
						var node_13 = sibling(node_12, 2);
						component(node_13, () => Alert_title, ($$anchor$5, Alert_Title_1) => {
							Alert_Title_1($$anchor$5, {
								children: ($$anchor$6, $$slotProps$1) => {
									next();
									var text_6 = text();
									template_effect(($0) => set_text(text_6, $0), [() => _("Warning")]);
									append($$anchor$6, text_6);
								},
								$$slots: { default: true }
							});
						});
						component(sibling(node_13, 2), () => Alert_description, ($$anchor$5, Alert_Description_1) => {
							Alert_Description_1($$anchor$5, {
								class: "flex flex-col justify-start gap-2",
								children: ($$anchor$6, $$slotProps$1) => {
									var fragment_11 = root_13();
									var div_4 = first_child(fragment_11);
									var text_7 = child(div_4);
									reset(div_4);
									var div_5 = sibling(div_4, 2);
									var text_8 = child(div_5, true);
									reset(div_5);
									var div_6 = sibling(div_5, 2);
									Button(child(div_6), {
										size: "sm",
										name: "unlink_configs",
										type: "submit",
										onclick: (e) => {
											if (!confirm(_("This will restore the original configurations of the linked products"))) e.preventDefault();
										},
										children: ($$anchor$7, $$slotProps$2) => {
											next();
											var text_9 = text();
											template_effect(($0) => set_text(text_9, $0), [() => _("Unlink configurations")]);
											append($$anchor$7, text_9);
										},
										$$slots: { default: true }
									});
									reset(div_6);
									template_effect(($0, $1) => {
										set_text(text_7, `${$0 ?? ""}.`);
										set_text(text_8, $1);
									}, [() => _("This configuration is linked to _nb_ products").replace("_nb_", nb_linked_configs.toString()), () => _("Any change will have an effect on the linked configurations.")]);
									append($$anchor$6, fragment_11);
								},
								$$slots: { default: true }
							});
						});
						append($$anchor$4, fragment_9);
					},
					$$slots: { default: true }
				});
			});
			append($$anchor$2, fragment_8);
		};
		if_block(node_10, ($$render) => {
			if (nb_linked_configs > 0) $$render(consequent_2);
		}, true);
		append($$anchor$1, fragment_7);
	};
	if_block(node, ($$render) => {
		if ($$props.data.id_product !== $$props.data.id_source_product) $$render(consequent_1);
		else $$render(alternate, false);
	});
	reset(form_1);
	action(form_1, ($$node) => enhance?.($$node));
	append($$anchor, form_1);
	pop();
	$$cleanup();
}
var root_2 = from_html(`<!> `, 1);
var root_4 = from_html(`<!> `, 1);
var root_5 = from_html(`<!> `, 1);
var root_7$1 = from_html(`<!> `, 1);
var root$2 = from_html(`<p class="dp_useful_links"><!> <!> <!></p>`);
function Links($$anchor, $$props) {
	push($$props, true);
	let { links } = $$props.data;
	let loading = state(false);
	let product_link = state(proxy(randomizeLink(links.product_link)));
	let dev_link = state(proxy(randomizeLink(links.dev_link)));
	function uniqid() {
		return "_" + Math.random().toString(36).slice(2, 12);
	}
	function randomizeLink(link) {
		return link.replace("_rand_", uniqid());
	}
	var p = root$2();
	var node = child(p);
	var consequent = ($$anchor$1) => {
		{
			let $0 = user_derived(() => get(dev_link));
			let $1 = user_derived(() => encodeURI(strip_base_path(page.url.pathname)));
			Button($$anchor$1, {
				onclick: () => set(dev_link, randomizeLink(links.dev_link), true),
				get href() {
					return `${get($0) ?? ""}&initial_path=${get($1) ?? ""}`;
				},
				get target() {
					return `dp_new_tab_${dpa.id_product ?? ""}`;
				},
				class: "bg-[#DF0067] text-white",
				children: ($$anchor$2, $$slotProps) => {
					var fragment_1 = root_2();
					var node_1 = first_child(fragment_1);
					Icon(node_1, { icon: "ic:baseline-launch" });
					var text$1 = sibling(node_1);
					template_effect(($0$1) => set_text(text$1, ` ${$0$1 ?? ""}`), [() => _("Open in a new tab")]);
					append($$anchor$2, fragment_1);
				},
				$$slots: { default: true }
			});
		}
	};
	var alternate = ($$anchor$1) => {
		Button($$anchor$1, {
			get href() {
				return links.admin_product_link;
			},
			get target() {
				return `tn-edit-product_${dpa.id_product ?? ""}`;
			},
			class: "bg-[#DF0067] text-white",
			children: ($$anchor$2, $$slotProps) => {
				var fragment_3 = root_4();
				var node_2 = first_child(fragment_3);
				Icon(node_2, { icon: "ic:baseline-edit" });
				var text_1 = sibling(node_2);
				template_effect(($0) => set_text(text_1, ` ${$0 ?? ""}`), [() => _("Edit product")]);
				append($$anchor$2, fragment_3);
			},
			$$slots: { default: true }
		});
	};
	if_block(node, ($$render) => {
		if (!dpa.links.is_new_tab) $$render(consequent);
		else $$render(alternate, false);
	});
	var node_3 = sibling(node, 2);
	Button(node_3, {
		class: "bg-[#251b5b] text-white",
		get href() {
			return get(product_link);
		},
		onclick: async (e) => {
			if (current_form.has_form()) {
				e.preventDefault();
				set(loading, true);
				await current_form.submit();
				set(loading, false);
				window.open(randomizeLink(links.product_link), "dp-product-page");
			} else set(product_link, randomizeLink(links.product_link), true);
		},
		target: "dp-product-page",
		children: ($$anchor$1, $$slotProps) => {
			var fragment_4 = root_5();
			var node_4 = first_child(fragment_4);
			Spinner(node_4, {
				get loading() {
					return get(loading);
				},
				children: ($$anchor$2, $$slotProps$1) => {
					Icon($$anchor$2, { icon: "ic:baseline-visibility" });
				},
				$$slots: { default: true }
			});
			var text_2 = sibling(node_4);
			template_effect(($0) => set_text(text_2, ` ${$0 ?? ""}`), [() => _("Product Page")]);
			append($$anchor$1, fragment_4);
		},
		$$slots: { default: true }
	});
	Button(sibling(node_3, 2), {
		class: "bg-[#68737F] text-white",
		get href() {
			return links.module_link;
		},
		target: "dp-module-page",
		children: ($$anchor$1, $$slotProps) => {
			var fragment_6 = root_7$1();
			var node_6 = first_child(fragment_6);
			Icon(node_6, { icon: "ic:baseline-settings" });
			var text_3 = sibling(node_6);
			template_effect(($0) => set_text(text_3, ` ${$0 ?? ""}`), [() => _("Module configuration")]);
			append($$anchor$1, fragment_6);
		},
		$$slots: { default: true }
	});
	reset(p);
	append($$anchor, p);
	pop();
}
var root_3 = from_html(` <!>`, 1);
var root_10$1 = from_html(`<!> <img/> `, 1);
var root_6 = from_html(`<!> <!>`, 1);
var root_1$1 = from_html(`<!> <!>`, 1);
var root$1 = from_html(`<div><!> <!></div>`);
function ProductSelector($$anchor, $$props) {
	push($$props, true);
	const current_product = {
		value: dpa.id_product.toString(),
		label: `#${dpa.id_product} ${page.data.product_name}`,
		dynamic: page.data.form.data.active
	};
	const recent_products = new LocalStore("dp_recent_products", []);
	let products = state([current_product, ...recent_products.value.slice(0, 10).filter((p) => p.value !== current_product.value)]);
	let sorted_products = user_derived(() => [...get(products)].sort((a, b) => b.value > a.value ? 1 : -1));
	recent_products.value = [current_product, ...recent_products.value.filter((p) => p.value !== current_product.value)].slice(0, 10);
	let open = state(false);
	let value = state(proxy(dpa.id_product.toString()));
	let status = state("idle");
	let triggerRef = state(null);
	const selectedValue = user_derived(() => get(products).find((f) => f.value === get(value))?.label);
	function closeAndFocusTrigger() {
		set(open, false);
		tick().then(() => {
			get(triggerRef).focus();
		});
	}
	async function search(e) {
		const query = e.target?.value;
		if (!query) {
			set(products, [current_product, ...recent_products.value.slice(0, 10).filter((p) => p.value !== current_product.value)]);
			return;
		}
		set(status, "loading");
		const res = await form_action({
			route: "/product",
			action: "search_products",
			data: { query }
		});
		set(status, "idle");
		if (res.success) set(products, [{
			...current_product,
			dynamic: page.data.form.data.active
		}, ...res.products.map((p) => ({
			value: p.id_product.toString(),
			label: `#${p.id_product} ${p.name}`,
			dynamic: p.dynamic
		})).filter((p) => p.value !== current_product.value)]);
		else toast.error(res.message);
	}
	const debounced_search = debounce(search, 333);
	function open_product() {
		if (!in_iframe || !window.top) return;
		const url$1 = new URL(window.top.location.href);
		url$1.searchParams.set("id_product", get(value));
		console.log(url$1);
		window.top.location.href = url$1.toString();
	}
	var div = root$1();
	let classes;
	var node = child(div);
	component(node, () => Root, ($$anchor$1, Popover_Root) => {
		Popover_Root($$anchor$1, {
			get open() {
				return get(open);
			},
			set open($$value) {
				set(open, $$value, true);
			},
			children: ($$anchor$2, $$slotProps) => {
				var fragment = root_1$1();
				var node_1 = first_child(fragment);
				{
					const child$1 = ($$anchor$3, $$arg0) => {
						let props = () => $$arg0?.().props;
						Button($$anchor$3, spread_props({
							variant: "outline",
							class: "justify-between"
						}, props, {
							role: "combobox",
							get "aria-expanded"() {
								return get(open);
							},
							children: ($$anchor$4, $$slotProps$1) => {
								next();
								var fragment_2 = root_3();
								var text$1 = first_child(fragment_2);
								var node_2 = sibling(text$1);
								{
									let $0 = user_derived(() => get(status) === "loading");
									Spinner(node_2, {
										get loading() {
											return get($0);
										},
										children: ($$anchor$5, $$slotProps$2) => {
											Icon($$anchor$5, {
												icon: "lucide:chevrons-up-down",
												class: "ms-2 size-4 shrink-0 opacity-50"
											});
										},
										$$slots: { default: true }
									});
								}
								template_effect(($0) => set_text(text$1, `${$0 ?? ""} `), [() => get(selectedValue) || _("Select a product...")]);
								append($$anchor$4, fragment_2);
							},
							$$slots: { default: true }
						}));
					};
					component(node_1, () => Trigger, ($$anchor$3, Popover_Trigger) => {
						Popover_Trigger($$anchor$3, {
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
				component(sibling(node_1, 2), () => Popover_content, ($$anchor$3, Popover_Content) => {
					Popover_Content($$anchor$3, {
						class: "w-[300px] p-0",
						children: ($$anchor$4, $$slotProps$1) => {
							var fragment_4 = comment();
							component(first_child(fragment_4), () => Command, ($$anchor$5, Command_Root) => {
								Command_Root($$anchor$5, {
									shouldFilter: false,
									children: ($$anchor$6, $$slotProps$2) => {
										var fragment_5 = root_6();
										var node_5 = first_child(fragment_5);
										{
											let $0 = user_derived(() => _("Search products..."));
											component(node_5, () => Command_input, ($$anchor$7, Command_Input) => {
												Command_Input($$anchor$7, {
													get oninput() {
														return debounced_search;
													},
													get placeholder() {
														return get($0);
													}
												});
											});
										}
										component(sibling(node_5, 2), () => Command_list, ($$anchor$7, Command_List) => {
											Command_List($$anchor$7, {
												children: ($$anchor$8, $$slotProps$3) => {
													var fragment_6 = comment();
													var node_7 = first_child(fragment_6);
													{
														let $0 = user_derived(() => _("Products"));
														component(node_7, () => Command_group, ($$anchor$9, Command_Group) => {
															Command_Group($$anchor$9, {
																get heading() {
																	return get($0);
																},
																children: ($$anchor$10, $$slotProps$4) => {
																	var fragment_7 = comment();
																	each(first_child(fragment_7), 17, () => get(sorted_products), (product) => product.value, ($$anchor$11, product) => {
																		const dynamic = user_derived(() => get(product).value === current_product.value ? page.data.form.data.active : get(product).dynamic);
																		var fragment_8 = comment();
																		component(first_child(fragment_8), () => Command_item, ($$anchor$12, Command_Item) => {
																			Command_Item($$anchor$12, {
																				class: "cursor-pointer",
																				get value() {
																					return get(product).value;
																				},
																				onSelect: () => {
																					set(value, get(product).value, true);
																					closeAndFocusTrigger();
																				},
																				children: ($$anchor$13, $$slotProps$5) => {
																					var fragment_9 = root_10$1();
																					var node_10 = first_child(fragment_9);
																					{
																						let $0$1 = user_derived(() => cn("me-2 size-4 transition-opacity ease-in-out opacity-100", get(value) !== get(product).value && "opacity-0"));
																						Icon(node_10, {
																							icon: "lucide:check",
																							get class() {
																								return get($0$1);
																							}
																						});
																					}
																					var img = sibling(node_10, 2);
																					var text_1 = sibling(img);
																					template_effect(($0$1, $1, $2) => {
																						set_class(img, 1, $0$1);
																						set_attribute(img, "src", $1);
																						set_attribute(img, "alt", $2);
																						set_text(text_1, ` ${get(product).label ?? ""}`);
																					}, [
																						() => clsx(cn("h-4 w-auto", !get(dynamic) && "opacity-0")),
																						() => url("/logo.png"),
																						() => _("Dynamic Product")
																					]);
																					append($$anchor$13, fragment_9);
																				},
																				$$slots: { default: true }
																			});
																		});
																		append($$anchor$11, fragment_8);
																	});
																	append($$anchor$10, fragment_7);
																},
																$$slots: { default: true }
															});
														});
													}
													append($$anchor$8, fragment_6);
												},
												$$slots: { default: true }
											});
										});
										append($$anchor$6, fragment_5);
									},
									$$slots: { default: true }
								});
							});
							append($$anchor$4, fragment_4);
						},
						$$slots: { default: true }
					});
				});
				append($$anchor$2, fragment);
			},
			$$slots: { default: true }
		});
	});
	var node_11 = sibling(node, 2);
	{
		let $0 = user_derived(() => cn("opacity-100 transition-opacity ease-in-out", dpa.id_product.toString() === get(value) && "opacity-0 pointer-events-none"));
		Button(node_11, {
			get class() {
				return get($0);
			},
			onclick: open_product,
			children: ($$anchor$1, $$slotProps) => {
				next();
				var text_2 = text();
				template_effect(($0$1) => set_text(text_2, $0$1), [() => _("Open product")]);
				append($$anchor$1, text_2);
			},
			$$slots: { default: true }
		});
	}
	reset(div);
	template_effect(() => classes = set_class(div, 1, "flex flex-wrap gap-1", null, classes, { hidden: !dpa.links.is_new_tab }));
	append($$anchor, div);
	pop();
}
var root_1 = from_html(`<div><div><!></div></div>`);
function Chatbot($$anchor, $$props) {
	push($$props, false);
	init();
	var fragment = comment();
	var node = first_child(fragment);
	var consequent = ($$anchor$1) => {
		var div = root_1();
		let classes;
		var div_1 = child(div);
		_page(child(div_1), {});
		reset(div_1);
		reset(div);
		template_effect(() => classes = set_class(div, 1, "fixed top-0 right-0 w-[40em] h-screen", null, classes, {
			hidden: chatbot.state === "hidden",
			"w-0": chatbot.state === "hidden"
		}));
		append($$anchor$1, div);
	};
	if_block(node, ($$render) => {
		if (chatbot.state !== "unloaded") $$render(consequent);
	});
	append($$anchor, fragment);
	pop();
}
var root_10 = from_html(`<span> </span>`);
var root_7 = from_html(`<!> <!>`, 1);
var root = from_html(`<!> <div><div class="flex flex-col gap-2 p-2 grow"><div class="flex items-center justify-end flex-wrap gap-4"><!> <span class="ml-auto"></span> <!> <!> <!> <!> <!> <!></div> <!> <!></div></div> <!>`, 1);
function _layout($$anchor, $$props) {
	push($$props, true);
	dict.translations = $$props.data.translations;
	let tabs_list = [
		{
			label: _("Settings"),
			href: url("/product/?home")
		},
		{
			label: _("Fields"),
			href: url("/product/fields")
		},
		{
			label: _("Formulas"),
			href: url("/product/formulas")
		},
		{
			label: _("Combinations"),
			href: url("/product/combinations"),
			condition: () => $$props.data.has_combinations
		},
		{
			label: _("Visibility"),
			href: url("/product/visibility"),
			condition: () => $$props.data.has_combinations
		},
		{
			label: _("Conditions"),
			href: url("/product/conditions")
		},
		{
			label: _("Field formulas"),
			href: url("/product/field-formulas")
		},
		{
			label: _("Intervals"),
			href: url("/product/intervals")
		},
		{
			label: _("Grids"),
			href: url("/product/grids")
		},
		{
			label: _("Groups"),
			href: url("/product/groups")
		},
		{
			label: _("Steps"),
			href: url("/product/steps")
		},
		{
			label: _("Calculation"),
			href: url("/product/calculation")
		},
		{
			label: _("Import/Export"),
			href: url("/product/import")
		}
	].map((tab) => ({
		condition: () => true,
		...tab
	})).filter((tab) => tab.condition());
	let initial_lang = lang.value || $$props.data.id_default_lang.toString();
	initial_lang = $$props.data.languages.find((l) => l.id_lang.toString() === initial_lang)?.id_lang.toString() ?? $$props.data.id_default_lang.toString();
	initLangStore(initial_lang);
	onNavigate(() => {
		current_form.reset();
	});
	afterNavigate(({ to }) => {
		const path = strip_base_path(to?.url.pathname);
		if (path && browser && window.top && window.top !== window) {
			const url$1 = new URL(window.top?.location.href ?? "");
			url$1.searchParams.set("initial_path", path.replace(/^\//, ""));
			window.top.history.replaceState({}, "", url$1.toString());
		}
	});
	var fragment = root();
	var node = first_child(fragment);
	Mode_watcher(node, { defaultMode: "light" });
	var div = sibling(node, 2);
	let classes;
	var div_1 = child(div);
	var div_2 = child(div_1);
	var node_1 = child(div_2);
	ProductSelector(node_1, {});
	var node_2 = sibling(node_1, 4);
	Links(node_2, { get data() {
		return $$props.data;
	} });
	var node_3 = sibling(node_2, 2);
	LangPicker(node_3, { get languages() {
		return $$props.data.languages;
	} });
	var node_4 = sibling(node_3, 2);
	ModePicker(node_4, {});
	var node_5 = sibling(node_4, 2);
	var consequent = ($$anchor$1) => {
		{
			let $0 = user_derived(() => _("Reload this section"));
			Button($$anchor$1, {
				onclick: () => location.href = url("/?initial_path=" + strip_base_path(page.url.pathname)),
				get title() {
					return get($0);
				},
				type: "button",
				children: ($$anchor$2, $$slotProps) => {
					Icon($$anchor$2, { icon: "mdi:reload" });
				},
				$$slots: { default: true }
			});
		}
	};
	if_block(node_5, ($$render) => {
		if (in_iframe && !dpa.links.is_new_tab) $$render(consequent);
	});
	var node_6 = sibling(node_5, 2);
	var consequent_1 = ($$anchor$1) => {
		{
			let $0 = user_derived(() => _("Open the chatbot"));
			Button($$anchor$1, {
				get title() {
					return get($0);
				},
				onclick: () => chatbot.state = "open",
				type: "button",
				children: ($$anchor$2, $$slotProps) => {
					Icon($$anchor$2, { icon: "mdi:chat" });
				},
				$$slots: { default: true }
			});
		}
	};
	if_block(node_6, ($$render) => {
		if (chatbot.state !== "open") $$render(consequent_1);
	});
	var node_7 = sibling(node_6, 2);
	var consequent_2 = ($$anchor$1) => {
		Button($$anchor$1, {
			onclick: () => window.top?.dpa.close_iframe(),
			children: ($$anchor$2, $$slotProps) => {
				Icon($$anchor$2, { icon: "mdi:close" });
			},
			$$slots: { default: true }
		});
	};
	if_block(node_7, ($$render) => {
		if (in_iframe && !$$props.data.links.is_new_tab) $$render(consequent_2);
	});
	reset(div_2);
	var node_8 = sibling(div_2, 2);
	LinkedConfigs(node_8, { get data() {
		return $$props.data;
	} });
	component(sibling(node_8, 2), () => Root$1, ($$anchor$1, Tabs_Root) => {
		Tabs_Root($$anchor$1, {
			value: "content",
			children: ($$anchor$2, $$slotProps) => {
				var fragment_7 = root_7();
				var node_10 = first_child(fragment_7);
				component(node_10, () => Tabs_list, ($$anchor$3, Tabs_List) => {
					Tabs_List($$anchor$3, {
						class: "flex-wrap justify-start h-auto",
						children: ($$anchor$4, $$slotProps$1) => {
							var fragment_8 = comment();
							each(first_child(fragment_8), 17, () => tabs_list, ({ label, href }) => href, ($$anchor$5, $$item) => {
								let label = () => get($$item).label;
								let href = () => get($$item).href;
								const current_pathname = user_derived(() => page.url.pathname.replace(/\/$/, ""));
								const next_pathname = user_derived(() => navigating.to?.url.pathname.replace(/\/$/, ""));
								const tab_pathname = user_derived(() => pathname(href()).replace(/\/$/, ""));
								const active = user_derived(() => get(current_pathname) === get(tab_pathname) && !get(next_pathname) || get(current_pathname) !== get(tab_pathname) && get(next_pathname) === get(tab_pathname));
								{
									let $0 = user_derived(() => get(active) ? "underline" : "");
									Button($$anchor$5, {
										get href() {
											return href();
										},
										get class() {
											return `justify-start ${get($0) ?? ""}`;
										},
										variant: "link",
										get title() {
											return label();
										},
										children: ($$anchor$6, $$slotProps$2) => {
											var span = root_10();
											var text$1 = child(span, true);
											reset(span);
											template_effect(() => set_text(text$1, label()));
											append($$anchor$6, span);
										},
										$$slots: { default: true }
									});
								}
							});
							append($$anchor$4, fragment_8);
						},
						$$slots: { default: true }
					});
				});
				component(sibling(node_10, 2), () => Tabs_content, ($$anchor$3, Tabs_Content) => {
					Tabs_Content($$anchor$3, {
						value: "content",
						children: ($$anchor$4, $$slotProps$1) => {
							var fragment_10 = comment();
							component(first_child(fragment_10), () => Card, ($$anchor$5, Card_Root) => {
								Card_Root($$anchor$5, {
									children: ($$anchor$6, $$slotProps$2) => {
										var fragment_11 = comment();
										snippet(first_child(fragment_11), () => $$props.children);
										append($$anchor$6, fragment_11);
									},
									$$slots: { default: true }
								});
							});
							append($$anchor$4, fragment_10);
						},
						$$slots: { default: true }
					});
				});
				append($$anchor$2, fragment_7);
			},
			$$slots: { default: true }
		});
	});
	reset(div_1);
	reset(div);
	Chatbot(sibling(div, 2), {});
	template_effect(() => classes = set_class(div, 1, "", null, classes, {
		"max-w-[calc(100%-40em)]": chatbot.state === "open",
		"max-w-full": chatbot.state === "hidden" || chatbot.state === "unloaded"
	}));
	append($$anchor, fragment);
	pop();
}
export { _layout as component, _layout_exports as universal };
