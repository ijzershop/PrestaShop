import { Ft as push, Ht as next, L as component, N as action, Ot as user_derived, Pt as pop, Ut as reset, Y as append, Z as from_html, Zt as __exportAll, bt as sibling, d as store_mutate, et as text, l as setup_stores, lt as untrack, ot as get, pt as template_effect, q as set_text, u as store_get, vt as child, yt as first_child } from "../chunks/DUscB9kS.js";
import "../chunks/B_W7bg6n.js";
import "../chunks/D365qDux.js";
import { i as superForm, n as superValidate, t as valibot } from "../chunks/CPdJ2mnA.js";
import "../chunks/D-Alr120.js";
import "../chunks/CEFrIRjK.js";
import { a as form_action, s as page_load, t as Button } from "../chunks/BIEFGHhw.js";
import "../chunks/Crb1phnD.js";
import { n as toast } from "../chunks/CQQo25vS.js";
import "../chunks/CJDS8lnd.js";
import "../chunks/DAbnHPcz.js";
import { n as _, t as Icon } from "../chunks/DFl6Gq92.js";
import { n as page } from "../chunks/BRpqcTWk.js";
import "../chunks/_yKPJ4BA.js";
import { t as Label } from "../chunks/ClKKfzS1.js";
import { t as Switch } from "../chunks/CyNLp6ti.js";
import { a as Card_content, r as Card_footer } from "../chunks/Bpx6gt8W.js";
import "../chunks/CgH3Vt0F.js";
import { r as Alert } from "../chunks/OMr53o_L.js";
import { g as string, r as boolean, u as object } from "../chunks/Da0rmiev.js";
import { t as Spinner } from "../chunks/C9eHbt79.js";
import { t as debounce } from "../chunks/C961kT60.js";
import { t as Input } from "../chunks/D2YUxW8P.js";
const ConfigSchema = object({
	debug_mode: boolean(),
	gemini_api_key: string()
});
var _page_exports = /* @__PURE__ */ __exportAll({
	load: () => load,
	prerender: () => true
}, 1);
const load = async (event) => {
	const { main_config } = await page_load(event);
	return { form: await superValidate({
		debug_mode: !!main_config.debug_mode,
		gemini_api_key: main_config.gemini_api_key || ""
	}, valibot(ConfigSchema)) };
};
var root_1 = from_html(`<div class="flex flex-col gap-6"><div class="items-top flex space-x-2"><!> <div class="grid gap-1.5 leading-none"><!> <p class="text-muted-foreground max-w-xs text-sm"> </p></div></div> <div class="grid gap-2"><!> <!> <p class="text-muted-foreground text-sm"> </p></div> <!></div>`);
var root_6 = from_html(`<!> `, 1);
var root_5 = from_html(`<!> <span class="text-success"> </span>`, 1);
var root = from_html(`<form method="POST"><!> <!></form>`);
function _page($$anchor, $$props) {
	push($$props, true);
	const $form = () => store_get(form, "$form", $$stores);
	const $tainted = () => store_get(tainted, "$tainted", $$stores);
	const $submitting = () => store_get(submitting, "$submitting", $$stores);
	const $message = () => store_get(message, "$message", $$stores);
	const [$$stores, $$cleanup] = setup_stores();
	const { form, enhance, message, tainted, submitting, validateForm, submit, errors, allErrors } = superForm($$props.data.form, {
		SPA: true,
		validators: valibot(ConfigSchema),
		resetForm: false,
		invalidateAll: false,
		async onSubmit({ formElement, cancel }) {
			const { valid } = await validateForm();
			if (valid) {
				toast.loading(_("Saving..."));
				const data = await form_action({
					route: page.route.id,
					action: formElement.getAttribute("action"),
					data: $form()
				});
				form.update(() => ({
					...data,
					debug_mode: !!data.debug_mode
				}));
				message.set(_("The settings have been updated"));
				toast.success(_("The settings have been updated"));
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
				Switch(node_1, {
					id: "debug_mode",
					get onclick() {
						return debouncedSubmit;
					},
					get checked() {
						return $form().debug_mode;
					},
					set checked($$value) {
						store_mutate(form, untrack($form).debug_mode = $$value, untrack($form));
					}
				});
				var div_2 = sibling(node_1, 2);
				var node_2 = child(div_2);
				Label(node_2, {
					for: "debug_mode",
					children: ($$anchor$3, $$slotProps$1) => {
						next();
						var text$1 = text();
						template_effect(($0) => set_text(text$1, $0), [() => _("Debug mode")]);
						append($$anchor$3, text$1);
					},
					$$slots: { default: true }
				});
				var p = sibling(node_2, 2);
				var text_1 = child(p, true);
				reset(p);
				reset(div_2);
				reset(div_1);
				var div_3 = sibling(div_1, 2);
				var node_3 = child(div_3);
				Label(node_3, {
					for: "gemini_api_key",
					children: ($$anchor$3, $$slotProps$1) => {
						next();
						var text_2 = text();
						template_effect(($0) => set_text(text_2, $0), [() => _("Your Gemini key")]);
						append($$anchor$3, text_2);
					},
					$$slots: { default: true }
				});
				var node_4 = sibling(node_3, 2);
				Input(node_4, {
					id: "gemini_api_key",
					get oninput() {
						return debouncedSubmit;
					},
					placeholder: "Gemini API key",
					type: "password",
					get value() {
						return $form().gemini_api_key;
					},
					set value($$value) {
						store_mutate(form, untrack($form).gemini_api_key = $$value, untrack($form));
					}
				});
				var p_1 = sibling(node_4, 2);
				var text_3 = child(p_1, true);
				reset(p_1);
				reset(div_3);
				component(sibling(div_3, 2), () => Alert, ($$anchor$3, Alert_Root) => {
					Alert_Root($$anchor$3, {
						variant: "info",
						children: ($$anchor$4, $$slotProps$1) => {
							next();
							var text_4 = text();
							template_effect(($0) => set_text(text_4, $0), [() => _("Open any product of your choice to enable the module for it and add your form fields and calculation logic.")]);
							append($$anchor$4, text_4);
						},
						$$slots: { default: true }
					});
				});
				reset(div);
				template_effect(($0, $1) => {
					set_text(text_1, $0);
					set_text(text_3, $1);
				}, [() => _("Enable this option to debug formulas in the browser console"), () => _("Will be used for the Chatbot in the product admin page.")]);
				append($$anchor$2, div);
			},
			$$slots: { default: true }
		});
	});
	component(sibling(node, 2), () => Card_footer, ($$anchor$1, Card_Footer) => {
		Card_Footer($$anchor$1, {
			class: "flex gap-2",
			children: ($$anchor$2, $$slotProps) => {
				var fragment_3 = root_5();
				var node_7 = first_child(fragment_3);
				{
					let $0 = user_derived(() => $tainted() && "btn-highlight");
					let $1 = user_derived(() => !$tainted());
					Button(node_7, {
						get class() {
							return `flex gap-2 ${get($0) ?? ""}`;
						},
						get disabled() {
							return get($1);
						},
						type: "submit",
						children: ($$anchor$3, $$slotProps$1) => {
							var fragment_4 = root_6();
							var node_8 = first_child(fragment_4);
							Spinner(node_8, {
								get loading() {
									return $submitting();
								},
								children: ($$anchor$4, $$slotProps$2) => {
									Icon($$anchor$4, { icon: "mdi:content-save" });
								},
								$$slots: { default: true }
							});
							var text_5 = sibling(node_8);
							template_effect(($0$1) => set_text(text_5, ` ${$0$1 ?? ""}`), [() => _("Save")]);
							append($$anchor$3, fragment_4);
						},
						$$slots: { default: true }
					});
				}
				var span = sibling(node_7, 2);
				var text_6 = child(span, true);
				reset(span);
				template_effect(() => set_text(text_6, $message()));
				append($$anchor$2, fragment_3);
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
