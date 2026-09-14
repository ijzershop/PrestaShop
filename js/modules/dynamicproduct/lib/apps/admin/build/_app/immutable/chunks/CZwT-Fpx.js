import { C as bind_value, Ct as set, D as set_attribute, Ft as push, G as if_block, Ht as next, L as component, Ot as user_derived, Pt as pop, Tt as state, Ut as reset, V as each, X as comment, Y as append, Z as from_html, b as bind_this, bt as sibling, et as text, gt as remove_textarea_child, o as prop, ot as get, pt as template_effect, q as set_text, r as onMount, vt as child, yt as first_child } from "./DUscB9kS.js";
import { t as browser } from "./DgeI1AN1.js";
import { n as buttonVariants, t as Button } from "./BIEFGHhw.js";
import { n as toast } from "./CQQo25vS.js";
import { r as __, t as Icon } from "./DFl6Gq92.js";
import { a as Dropdown_menu_item, n as Root, o as Dropdown_menu_content, r as Trigger, t as Group } from "./T79hDoyY.js";
import { n as lang } from "./cJwMBL5_.js";
import { a as reformatFormula, i as insertSymbol, n as initEditor, r as insertField } from "./Dt-VaJa3.js";
import { t as sort } from "./Bz4g0JZD.js";
var root_1 = from_html(`<textarea class="hidden" name="code"></textarea>`);
var root$2 = from_html(`<div title="Press Ctrl+Enter to save" class="min-h-8"></div> <!>`, 1);
function CodeMirror($$anchor, $$props) {
	push($$props, true);
	let editor;
	const insertSymbol$1 = (symbol) => insertSymbol(editor, symbol);
	const insertField$1 = (field) => insertField(editor, field);
	let code = prop($$props, "code", 15, "");
	let editorElement = state(void 0);
	const reformatFormula$1 = () => reformatFormula(editor);
	onMount(() => {
		if (!browser) return void 0;
		try {
			if (get(editorElement)) initEditor({
				parent: get(editorElement),
				code: code(),
				fields: $$props.fields,
				tables: $$props.tables,
				placeholder: $$props.placeholder,
				form: $$props.form,
				callback: (content) => {
					code(content);
				}
			}).then((view) => {
				editor = view;
				$$props.onInit?.(view);
			});
			return () => {
				editor?.destroy();
			};
		} catch (e) {
			console.error(e);
			if (e instanceof Error) toast.error(e.message);
		}
	});
	var $$exports = {
		insertSymbol: insertSymbol$1,
		insertField: insertField$1,
		reformatFormula: reformatFormula$1
	};
	var fragment = root$2();
	var div = first_child(fragment);
	bind_this(div, ($$value) => set(editorElement, $$value), () => get(editorElement));
	var node = sibling(div, 2);
	var consequent = ($$anchor$1) => {
		var textarea = root_1();
		remove_textarea_child(textarea);
		template_effect(() => set_attribute(textarea, "form", $$props.form));
		bind_value(textarea, code);
		append($$anchor$1, textarea);
	};
	if_block(node, ($$render) => {
		if ($$props.name) $$render(consequent);
	});
	append($$anchor, fragment);
	return pop($$exports);
}
var root_3 = from_html(`<!> <!>`, 1);
var root$1 = from_html(`<div class="flex gap-0"><!> <!></div>`);
function FieldBtn($$anchor, $$props) {
	push($$props, true);
	let field_options = user_derived(() => sort($$props.field.options ?? []).filter((option) => __(option.label, lang.value)));
	var div = root$1();
	var node = child(div);
	{
		let $0 = user_derived(() => get(field_options).length && "rounded-r-none");
		Button(node, {
			get class() {
				return `field-btn cursor-pointer ${get($0) ?? ""}`;
			},
			onclick: () => $$props.editor.insertField($$props.field),
			type: "button",
			children: ($$anchor$1, $$slotProps) => {
				next();
				var text$1 = text();
				template_effect(() => set_text(text$1, $$props.field.name));
				append($$anchor$1, text$1);
			},
			$$slots: { default: true }
		});
	}
	var node_1 = sibling(node, 2);
	var consequent = ($$anchor$1) => {
		var fragment_1 = comment();
		component(first_child(fragment_1), () => Root, ($$anchor$2, DropdownMenu_Root) => {
			DropdownMenu_Root($$anchor$2, {
				children: ($$anchor$3, $$slotProps) => {
					var fragment_2 = root_3();
					var node_3 = first_child(fragment_2);
					{
						let $0 = user_derived(buttonVariants);
						component(node_3, () => Trigger, ($$anchor$4, DropdownMenu_Trigger) => {
							DropdownMenu_Trigger($$anchor$4, {
								get class() {
									return `field-btn rounded-l-none ${get($0) ?? ""}`;
								},
								children: ($$anchor$5, $$slotProps$1) => {
									Icon($$anchor$5, { icon: "mdi:format-list-bulleted" });
								},
								$$slots: { default: true }
							});
						});
					}
					component(sibling(node_3, 2), () => Dropdown_menu_content, ($$anchor$4, DropdownMenu_Content) => {
						DropdownMenu_Content($$anchor$4, {
							class: "w-56",
							children: ($$anchor$5, $$slotProps$1) => {
								var fragment_4 = comment();
								component(first_child(fragment_4), () => Group, ($$anchor$6, DropdownMenu_Group) => {
									DropdownMenu_Group($$anchor$6, {
										children: ($$anchor$7, $$slotProps$2) => {
											var fragment_5 = comment();
											each(first_child(fragment_5), 17, () => get(field_options), (option) => option.value, ($$anchor$8, option) => {
												var fragment_6 = comment();
												component(first_child(fragment_6), () => Dropdown_menu_item, ($$anchor$9, DropdownMenu_Item) => {
													DropdownMenu_Item($$anchor$9, {
														class: "cursor-pointer",
														onclick: () => $$props.editor.insertSymbol(get(option).value),
														children: ($$anchor$10, $$slotProps$3) => {
															next();
															var text_1 = text();
															template_effect(($0) => set_text(text_1, $0), [() => __(get(option).label, lang.value)]);
															append($$anchor$10, text_1);
														},
														$$slots: { default: true }
													});
												});
												append($$anchor$8, fragment_6);
											});
											append($$anchor$7, fragment_5);
										},
										$$slots: { default: true }
									});
								});
								append($$anchor$5, fragment_4);
							},
							$$slots: { default: true }
						});
					});
					append($$anchor$3, fragment_2);
				},
				$$slots: { default: true }
			});
		});
		append($$anchor$1, fragment_1);
	};
	if_block(node_1, ($$render) => {
		if (get(field_options).length) $$render(consequent);
	});
	reset(div);
	append($$anchor, div);
	pop();
}
var root = from_html(`<div class="join"><!></div>`);
function SymbolBtn($$anchor, $$props) {
	var div = root();
	Button(child(div), {
		class: "symbol-btn cursor-pointer",
		get onclick() {
			return $$props.onclick;
		},
		type: "button",
		variant: "outline",
		children: ($$anchor$1, $$slotProps) => {
			next();
			var text_1 = text();
			template_effect(() => set_text(text_1, $$props.text));
			append($$anchor$1, text_1);
		},
		$$slots: { default: true }
	});
	reset(div);
	append($$anchor, div);
}
var symbols_map = new Map([
	["=", " = "],
	["+", " + "],
	["-", " - "],
	["x", " * "],
	["/", " / "],
	[">", " > "],
	["<", " < "],
	[">=", " >= "],
	["<=", " <= "],
	["(", "("],
	[")", ")"]
]);
function generateSymbols(symbols) {
	return symbols.map((symbol) => {
		return [symbol, symbols_map.get(symbol) || symbol];
	});
}
export { CodeMirror as i, SymbolBtn as n, FieldBtn as r, generateSymbols as t };
