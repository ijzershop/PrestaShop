import { B as ViewPlugin, C as defaultHighlightStyle, H as drawSelection, I as syntaxHighlighting, K as highlightSpecialChars, a as defaultKeymap, c as indentWithTab, h as completionStatus, l as acceptCompletion, o as history, q as keymap, s as historyKeymap } from "./BirQbuIK.js";
var isAutocompleteOpen = false;
function tabRun(view) {
	return isAutocompleteOpen ? acceptCompletion(view) : indentWithTab.run && indentWithTab.run(view);
}
const indentAndCompletionWithTab = {
	...indentWithTab,
	run: tabRun
};
function tabObservable() {
	return [ViewPlugin.fromClass(class {
		constructor() {}
		update(update) {
			isAutocompleteOpen = completionStatus(update.state) !== null;
		}
	})];
}
var minimalSetup = /* @__PURE__ */ (() => [
	highlightSpecialChars(),
	history(),
	drawSelection(),
	syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
	keymap.of([...defaultKeymap, ...historyKeymap])
])();
export { indentAndCompletionWithTab as n, tabObservable as r, minimalSetup as t };
