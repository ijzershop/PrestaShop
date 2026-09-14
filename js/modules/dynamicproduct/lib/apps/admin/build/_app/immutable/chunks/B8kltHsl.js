import { $ as props_id, Ct as set, Ft as push, G as if_block, Kt as noop, L as component, Ot as user_derived, Pt as pop, R as snippet, T as attribute_effect, Tt as state, Ut as reset, V as each, X as comment, Y as append, Z as from_html, a as legacy_rest_props, bt as sibling, c as spread_props, et as text, ht as user_pre_effect, lt as untrack, mt as user_effect, o as prop, ot as get, pt as template_effect, q as set_text, rt as on, s as rest_props, vt as child, yt as first_child, z as slot } from "./DUscB9kS.js";
import { r as cn } from "./BIEFGHhw.js";
import { a as boolToTrueOrUndef, d as mergeProps, i as boolToStrTrueOrUndef, l as getDataOpenClosed, n as boolToEmptyStrOrUndef, o as createBitsAttrs, r as boolToStr, t as createId, u as attachRef, y as boxWith } from "./B4l8ufIa.js";
import { E as onDestroyEffect, S as DOMContext, T as afterSleep, _ as boxAutoReset, b as PresenceManager, g as DOMTypeahead, w as afterTick, y as Portal } from "./B3A_TfMF.js";
import { C as HOME, D as SHIFT, E as PAGE_UP, I as Previous, O as SPACE, R as watch, S as F9, T as PAGE_DOWN, _ as F4, a as ARROW_UP, b as F7, c as END, d as F1, f as F10, g as F3, h as F2, i as ARROW_RIGHT, k as TAB, l as ENTER, m as F12, n as ARROW_DOWN, o as CAPS_LOCK, p as F11, r as ARROW_LEFT, s as CONTROL, t as ALT, u as ESCAPE, v as F5, w as META, x as F8, y as F6, z as Context } from "./_yKPJ4BA.js";
import { a as prev, i as next, n as forward, r as getNextMatch, t as backward, u as isIOS } from "./9DgZZMlb.js";
import { t as noop$1 } from "./BoWJNiZV.js";
import { t as Hidden_input } from "./n3nL436h.js";
import { a as getFloatingContentCSSVars, i as Floating_layer, n as Popper_layer, r as Floating_layer_anchor, t as Popper_layer_force_mount } from "./D9qUa032.js";
import { n as Icon, t as Check } from "./BeGrVUTb.js";
function onMountEffect(fn) {
	user_effect(() => {
		return untrack(() => fn());
	});
}
var DataTypeahead = class {
	#opts;
	#candidateValues = user_derived(() => this.#opts.candidateValues());
	#search;
	constructor(opts) {
		this.#opts = opts;
		this.#search = boxAutoReset("", {
			afterMs: 1e3,
			getWindow: this.#opts.getWindow
		});
		this.handleTypeaheadSearch = this.handleTypeaheadSearch.bind(this);
		this.resetTypeahead = this.resetTypeahead.bind(this);
	}
	handleTypeaheadSearch(key) {
		if (!this.#opts.enabled() || !get(this.#candidateValues).length) return;
		this.#search.current = this.#search.current + key;
		const currentItem = this.#opts.getCurrentItem();
		const currentMatch = get(this.#candidateValues).find((item) => item === currentItem) ?? "";
		const nextMatch = getNextMatch(get(this.#candidateValues).map((item) => item ?? ""), this.#search.current, currentMatch);
		const newItem = get(this.#candidateValues).find((item) => item === nextMatch);
		if (newItem) this.#opts.onMatch(newItem);
		return newItem;
	}
	resetTypeahead() {
		this.#search.current = "";
	}
};
const FIRST_KEYS = [
	ARROW_DOWN,
	PAGE_UP,
	HOME
];
const LAST_KEYS = [
	ARROW_UP,
	PAGE_DOWN,
	"End"
];
const FIRST_LAST_KEYS = [...FIRST_KEYS, ...LAST_KEYS];
var selectAttrs = createBitsAttrs({
	component: "select",
	parts: [
		"trigger",
		"content",
		"item",
		"viewport",
		"scroll-up-button",
		"scroll-down-button",
		"group",
		"group-label",
		"separator",
		"arrow",
		"input",
		"content-wrapper",
		"item-text",
		"value"
	]
});
var SelectRootContext = new Context("Select.Root | Combobox.Root");
var SelectGroupContext = new Context("Select.Group | Combobox.Group");
var SelectContentContext = new Context("Select.Content | Combobox.Content");
var SelectBaseRootState = class {
	opts;
	#touchedInput = state(false);
	get touchedInput() {
		return get(this.#touchedInput);
	}
	set touchedInput(value) {
		set(this.#touchedInput, value, true);
	}
	#inputNode = state(null);
	get inputNode() {
		return get(this.#inputNode);
	}
	set inputNode(value) {
		set(this.#inputNode, value, true);
	}
	#contentNode = state(null);
	get contentNode() {
		return get(this.#contentNode);
	}
	set contentNode(value) {
		set(this.#contentNode, value, true);
	}
	contentPresence;
	#viewportNode = state(null);
	get viewportNode() {
		return get(this.#viewportNode);
	}
	set viewportNode(value) {
		set(this.#viewportNode, value, true);
	}
	#triggerNode = state(null);
	get triggerNode() {
		return get(this.#triggerNode);
	}
	set triggerNode(value) {
		set(this.#triggerNode, value, true);
	}
	#valueId = state("");
	get valueId() {
		return get(this.#valueId);
	}
	set valueId(value) {
		set(this.#valueId, value, true);
	}
	#highlightedNode = state(null);
	get highlightedNode() {
		return get(this.#highlightedNode);
	}
	set highlightedNode(value) {
		set(this.#highlightedNode, value, true);
	}
	#highlightedValue = user_derived(() => {
		if (!this.highlightedNode) return null;
		return this.highlightedNode.getAttribute("data-value");
	});
	get highlightedValue() {
		return get(this.#highlightedValue);
	}
	set highlightedValue(value) {
		set(this.#highlightedValue, value);
	}
	#highlightedId = user_derived(() => {
		if (!this.highlightedNode) return void 0;
		return this.highlightedNode.id;
	});
	get highlightedId() {
		return get(this.#highlightedId);
	}
	set highlightedId(value) {
		set(this.#highlightedId, value);
	}
	#highlightedLabel = user_derived(() => {
		if (!this.highlightedNode) return null;
		return this.highlightedNode.getAttribute("data-label");
	});
	get highlightedLabel() {
		return get(this.#highlightedLabel);
	}
	set highlightedLabel(value) {
		set(this.#highlightedLabel, value);
	}
	isUsingKeyboard = false;
	isCombobox = false;
	domContext = new DOMContext(() => null);
	constructor(opts) {
		this.opts = opts;
		this.isCombobox = opts.isCombobox;
		this.contentPresence = new PresenceManager({
			ref: boxWith(() => this.contentNode),
			open: this.opts.open,
			onComplete: () => {
				this.opts.onOpenChangeComplete.current(this.opts.open.current);
			}
		});
		user_pre_effect(() => {
			if (!this.opts.open.current) this.setHighlightedNode(null);
		});
	}
	setHighlightedNode(node, initial = false) {
		this.highlightedNode = node;
		if (node && (this.isUsingKeyboard || initial)) node.scrollIntoView({ block: this.opts.scrollAlignment.current });
	}
	getCandidateNodes() {
		const node = this.contentNode;
		if (!node) return [];
		return Array.from(node.querySelectorAll(`[${this.getBitsAttr("item")}]:not([data-disabled])`));
	}
	setHighlightedToFirstCandidate(initial = false) {
		this.setHighlightedNode(null);
		let nodes = this.getCandidateNodes();
		if (!nodes.length) return;
		if (this.viewportNode) {
			const viewportRect = this.viewportNode.getBoundingClientRect();
			nodes = nodes.filter((node) => {
				if (!this.viewportNode) return false;
				const nodeRect = node.getBoundingClientRect();
				return nodeRect.right < viewportRect.right && nodeRect.left > viewportRect.left && nodeRect.bottom < viewportRect.bottom && nodeRect.top > viewportRect.top;
			});
		}
		this.setHighlightedNode(nodes[0], initial);
	}
	getNodeByValue(value) {
		return this.getCandidateNodes().find((node) => node.dataset.value === value) ?? null;
	}
	setOpen(open) {
		this.opts.open.current = open;
	}
	toggleOpen() {
		this.opts.open.current = !this.opts.open.current;
	}
	handleOpen() {
		this.setOpen(true);
	}
	handleClose() {
		this.setHighlightedNode(null);
		this.setOpen(false);
	}
	toggleMenu() {
		this.toggleOpen();
	}
	getBitsAttr = (part) => {
		return selectAttrs.getAttr(part, this.isCombobox ? "combobox" : void 0);
	};
};
var SelectSingleRootState = class extends SelectBaseRootState {
	opts;
	isMulti = false;
	#hasValue = user_derived(() => this.opts.value.current !== "");
	get hasValue() {
		return get(this.#hasValue);
	}
	set hasValue(value) {
		set(this.#hasValue, value);
	}
	#currentLabel = user_derived(() => {
		if (!this.opts.items.current.length) return "";
		return this.opts.items.current.find((item) => item.value === this.opts.value.current)?.label ?? "";
	});
	get currentLabel() {
		return get(this.#currentLabel);
	}
	set currentLabel(value) {
		set(this.#currentLabel, value);
	}
	#candidateLabels = user_derived(() => {
		if (!this.opts.items.current.length) return [];
		return this.opts.items.current.filter((item) => !item.disabled).map((item) => item.label);
	});
	get candidateLabels() {
		return get(this.#candidateLabels);
	}
	set candidateLabels(value) {
		set(this.#candidateLabels, value);
	}
	#dataTypeaheadEnabled = user_derived(() => {
		if (this.isMulti) return false;
		if (this.opts.items.current.length === 0) return false;
		return true;
	});
	get dataTypeaheadEnabled() {
		return get(this.#dataTypeaheadEnabled);
	}
	set dataTypeaheadEnabled(value) {
		set(this.#dataTypeaheadEnabled, value);
	}
	constructor(opts) {
		super(opts);
		this.opts = opts;
		user_effect(() => {
			if (!this.opts.open.current && this.highlightedNode) this.setHighlightedNode(null);
		});
		watch(() => this.opts.open.current, () => {
			if (!this.opts.open.current) return;
			this.setInitialHighlightedNode();
		});
	}
	includesItem(itemValue) {
		return this.opts.value.current === itemValue;
	}
	toggleItem(itemValue, itemLabel = itemValue) {
		const newValue = this.includesItem(itemValue) ? "" : itemValue;
		this.opts.value.current = newValue;
		if (newValue !== "") this.opts.inputValue.current = itemLabel;
	}
	setInitialHighlightedNode() {
		afterTick(() => {
			if (this.highlightedNode && this.domContext.getDocument().contains(this.highlightedNode)) return;
			if (this.opts.value.current !== "") {
				const node = this.getNodeByValue(this.opts.value.current);
				if (node) {
					this.setHighlightedNode(node, true);
					return;
				}
			}
			this.setHighlightedToFirstCandidate(true);
		});
	}
};
var SelectMultipleRootState = class extends SelectBaseRootState {
	opts;
	isMulti = true;
	#hasValue = user_derived(() => this.opts.value.current.length > 0);
	get hasValue() {
		return get(this.#hasValue);
	}
	set hasValue(value) {
		set(this.#hasValue, value);
	}
	constructor(opts) {
		super(opts);
		this.opts = opts;
		user_effect(() => {
			if (!this.opts.open.current && this.highlightedNode) this.setHighlightedNode(null);
		});
		watch(() => this.opts.open.current, () => {
			if (!this.opts.open.current) return;
			this.setInitialHighlightedNode();
		});
	}
	includesItem(itemValue) {
		return this.opts.value.current.includes(itemValue);
	}
	toggleItem(itemValue, itemLabel = itemValue) {
		if (this.includesItem(itemValue)) this.opts.value.current = this.opts.value.current.filter((v) => v !== itemValue);
		else this.opts.value.current = [...this.opts.value.current, itemValue];
		this.opts.inputValue.current = itemLabel;
	}
	setInitialHighlightedNode() {
		afterTick(() => {
			if (!this.domContext) return;
			if (this.highlightedNode && this.domContext.getDocument().contains(this.highlightedNode)) return;
			if (this.opts.value.current.length && this.opts.value.current[0] !== "") {
				const node = this.getNodeByValue(this.opts.value.current[0]);
				if (node) {
					this.setHighlightedNode(node, true);
					return;
				}
			}
			this.setHighlightedToFirstCandidate(true);
		});
	}
};
var SelectRootState = class {
	static create(props) {
		const { type, ...rest } = props;
		const rootState = type === "single" ? new SelectSingleRootState(rest) : new SelectMultipleRootState(rest);
		return SelectRootContext.set(rootState);
	}
};
var SelectTriggerState = class SelectTriggerState {
	static create(opts) {
		return new SelectTriggerState(opts, SelectRootContext.get());
	}
	opts;
	root;
	attachment;
	#domTypeahead;
	#dataTypeahead;
	constructor(opts, root$2) {
		this.opts = opts;
		this.root = root$2;
		this.attachment = attachRef(opts.ref, (v) => this.root.triggerNode = v);
		this.root.domContext = new DOMContext(opts.ref);
		this.#domTypeahead = new DOMTypeahead({
			getCurrentItem: () => this.root.highlightedNode,
			onMatch: (node) => {
				this.root.setHighlightedNode(node);
			},
			getActiveElement: () => this.root.domContext.getActiveElement(),
			getWindow: () => this.root.domContext.getWindow()
		});
		this.#dataTypeahead = new DataTypeahead({
			getCurrentItem: () => {
				if (this.root.isMulti) return "";
				return this.root.currentLabel;
			},
			onMatch: (label) => {
				if (this.root.isMulti) return;
				if (!this.root.opts.items.current) return;
				const matchedItem = this.root.opts.items.current.find((item) => item.label === label);
				if (!matchedItem) return;
				this.root.opts.value.current = matchedItem.value;
			},
			enabled: () => !this.root.isMulti && this.root.dataTypeaheadEnabled,
			candidateValues: () => this.root.isMulti ? [] : this.root.candidateLabels,
			getWindow: () => this.root.domContext.getWindow()
		});
		this.onkeydown = this.onkeydown.bind(this);
		this.onpointerdown = this.onpointerdown.bind(this);
		this.onpointerup = this.onpointerup.bind(this);
		this.onclick = this.onclick.bind(this);
	}
	#handleOpen() {
		this.root.opts.open.current = true;
		this.#dataTypeahead.resetTypeahead();
		this.#domTypeahead.resetTypeahead();
	}
	#handlePointerOpen(_) {
		this.#handleOpen();
	}
	#handleKeyboardSelection() {
		const isCurrentSelectedValue = this.root.highlightedValue === this.root.opts.value.current;
		if (!this.root.opts.allowDeselect.current && isCurrentSelectedValue && !this.root.isMulti) {
			this.root.handleClose();
			return true;
		}
		if (this.root.highlightedValue !== null) this.root.toggleItem(this.root.highlightedValue, this.root.highlightedLabel ?? void 0);
		if (!this.root.isMulti && !isCurrentSelectedValue) {
			this.root.handleClose();
			return true;
		}
		return false;
	}
	onkeydown(e) {
		this.root.isUsingKeyboard = true;
		if (e.key === "ArrowUp" || e.key === "ArrowDown") e.preventDefault();
		if (!this.root.opts.open.current) {
			if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown" || e.key === "ArrowUp") {
				e.preventDefault();
				this.root.handleOpen();
			} else if (!this.root.isMulti && this.root.dataTypeaheadEnabled) {
				this.#dataTypeahead.handleTypeaheadSearch(e.key);
				return;
			}
			if (this.root.hasValue) return;
			const candidateNodes$1 = this.root.getCandidateNodes();
			if (!candidateNodes$1.length) return;
			if (e.key === "ArrowDown") {
				const firstCandidate = candidateNodes$1[0];
				this.root.setHighlightedNode(firstCandidate);
			} else if (e.key === "ArrowUp") {
				const lastCandidate = candidateNodes$1[candidateNodes$1.length - 1];
				this.root.setHighlightedNode(lastCandidate);
			}
			return;
		}
		if (e.key === "Tab") {
			this.root.handleClose();
			return;
		}
		if ((e.key === "Enter" || e.key === " " && this.#domTypeahead.search === "") && !e.isComposing) {
			e.preventDefault();
			if (this.#handleKeyboardSelection()) return;
		}
		if (e.key === "ArrowUp" && e.altKey) this.root.handleClose();
		if (FIRST_LAST_KEYS.includes(e.key)) {
			e.preventDefault();
			const candidateNodes$1 = this.root.getCandidateNodes();
			const currHighlightedNode = this.root.highlightedNode;
			const currIndex = currHighlightedNode ? candidateNodes$1.indexOf(currHighlightedNode) : -1;
			const loop = this.root.opts.loop.current;
			let nextItem;
			if (e.key === "ArrowDown") nextItem = next(candidateNodes$1, currIndex, loop);
			else if (e.key === "ArrowUp") nextItem = prev(candidateNodes$1, currIndex, loop);
			else if (e.key === "PageDown") nextItem = forward(candidateNodes$1, currIndex, 10, loop);
			else if (e.key === "PageUp") nextItem = backward(candidateNodes$1, currIndex, 10, loop);
			else if (e.key === "Home") nextItem = candidateNodes$1[0];
			else if (e.key === "End") nextItem = candidateNodes$1[candidateNodes$1.length - 1];
			if (!nextItem) return;
			this.root.setHighlightedNode(nextItem);
			return;
		}
		const isModifierKey = e.ctrlKey || e.altKey || e.metaKey;
		const isCharacterKey = e.key.length === 1;
		const isSpaceKey = e.key === " ";
		const candidateNodes = this.root.getCandidateNodes();
		if (e.key === "Tab") return;
		if (!isModifierKey && (isCharacterKey || isSpaceKey)) {
			if (!this.#domTypeahead.handleTypeaheadSearch(e.key, candidateNodes) && isSpaceKey) {
				e.preventDefault();
				this.#handleKeyboardSelection();
			}
			return;
		}
		if (!this.root.highlightedNode) this.root.setHighlightedToFirstCandidate();
	}
	onclick(e) {
		e.currentTarget.focus();
	}
	onpointerdown(e) {
		if (this.root.opts.disabled.current) return;
		if (e.pointerType === "touch") return e.preventDefault();
		const target = e.target;
		if (target?.hasPointerCapture(e.pointerId)) target?.releasePointerCapture(e.pointerId);
		if (e.button === 0 && e.ctrlKey === false) if (this.root.opts.open.current === false) this.#handlePointerOpen(e);
		else this.root.handleClose();
	}
	onpointerup(e) {
		if (this.root.opts.disabled.current) return;
		e.preventDefault();
		if (e.pointerType === "touch") if (this.root.opts.open.current === false) this.#handlePointerOpen(e);
		else this.root.handleClose();
	}
	#props = user_derived(() => ({
		id: this.opts.id.current,
		disabled: this.root.opts.disabled.current ? true : void 0,
		"aria-haspopup": "listbox",
		"aria-expanded": boolToStr(this.root.opts.open.current),
		"aria-activedescendant": this.root.highlightedId,
		"data-state": getDataOpenClosed(this.root.opts.open.current),
		"data-disabled": boolToEmptyStrOrUndef(this.root.opts.disabled.current),
		"data-placeholder": this.root.hasValue ? void 0 : "",
		[this.root.getBitsAttr("trigger")]: "",
		onpointerdown: this.onpointerdown,
		onkeydown: this.onkeydown,
		onclick: this.onclick,
		onpointerup: this.onpointerup,
		...this.attachment
	}));
	get props() {
		return get(this.#props);
	}
	set props(value) {
		set(this.#props, value);
	}
};
var SelectContentState = class SelectContentState {
	static create(opts) {
		return SelectContentContext.set(new SelectContentState(opts, SelectRootContext.get()));
	}
	opts;
	root;
	attachment;
	#isPositioned = state(false);
	get isPositioned() {
		return get(this.#isPositioned);
	}
	set isPositioned(value) {
		set(this.#isPositioned, value, true);
	}
	domContext;
	constructor(opts, root$2) {
		this.opts = opts;
		this.root = root$2;
		this.attachment = attachRef(opts.ref, (v) => this.root.contentNode = v);
		this.domContext = new DOMContext(this.opts.ref);
		if (this.root.domContext === null) this.root.domContext = this.domContext;
		onDestroyEffect(() => {
			this.root.contentNode = null;
			this.isPositioned = false;
		});
		watch(() => this.root.opts.open.current, () => {
			if (this.root.opts.open.current) return;
			this.isPositioned = false;
		});
		this.onpointermove = this.onpointermove.bind(this);
	}
	onpointermove(_) {
		this.root.isUsingKeyboard = false;
	}
	#styles = user_derived(() => {
		return getFloatingContentCSSVars(this.root.isCombobox ? "combobox" : "select");
	});
	onInteractOutside = (e) => {
		if (e.target === this.root.triggerNode || e.target === this.root.inputNode) {
			e.preventDefault();
			return;
		}
		this.opts.onInteractOutside.current(e);
		if (e.defaultPrevented) return;
		this.root.handleClose();
	};
	onEscapeKeydown = (e) => {
		this.opts.onEscapeKeydown.current(e);
		if (e.defaultPrevented) return;
		this.root.handleClose();
	};
	onOpenAutoFocus = (e) => {
		e.preventDefault();
	};
	onCloseAutoFocus = (e) => {
		e.preventDefault();
	};
	get shouldRender() {
		return this.root.contentPresence.shouldRender;
	}
	#snippetProps = user_derived(() => ({ open: this.root.opts.open.current }));
	get snippetProps() {
		return get(this.#snippetProps);
	}
	set snippetProps(value) {
		set(this.#snippetProps, value);
	}
	#props = user_derived(() => ({
		id: this.opts.id.current,
		role: "listbox",
		"aria-multiselectable": this.root.isMulti ? "true" : void 0,
		"data-state": getDataOpenClosed(this.root.opts.open.current),
		[this.root.getBitsAttr("content")]: "",
		style: {
			display: "flex",
			flexDirection: "column",
			outline: "none",
			boxSizing: "border-box",
			pointerEvents: "auto",
			...get(this.#styles)
		},
		onpointermove: this.onpointermove,
		...this.attachment
	}));
	get props() {
		return get(this.#props);
	}
	set props(value) {
		set(this.#props, value);
	}
	popperProps = {
		onInteractOutside: this.onInteractOutside,
		onEscapeKeydown: this.onEscapeKeydown,
		onOpenAutoFocus: this.onOpenAutoFocus,
		onCloseAutoFocus: this.onCloseAutoFocus,
		trapFocus: false,
		loop: false,
		onPlaced: () => {
			if (this.root.opts.open.current) this.isPositioned = true;
		}
	};
};
var SelectItemState = class SelectItemState {
	static create(opts) {
		return new SelectItemState(opts, SelectRootContext.get());
	}
	opts;
	root;
	attachment;
	#isSelected = user_derived(() => this.root.includesItem(this.opts.value.current));
	get isSelected() {
		return get(this.#isSelected);
	}
	set isSelected(value) {
		set(this.#isSelected, value);
	}
	#isHighlighted = user_derived(() => this.root.highlightedValue === this.opts.value.current);
	get isHighlighted() {
		return get(this.#isHighlighted);
	}
	set isHighlighted(value) {
		set(this.#isHighlighted, value);
	}
	prevHighlighted = new Previous(() => this.isHighlighted);
	#mounted = state(false);
	get mounted() {
		return get(this.#mounted);
	}
	set mounted(value) {
		set(this.#mounted, value, true);
	}
	constructor(opts, root$2) {
		this.opts = opts;
		this.root = root$2;
		this.attachment = attachRef(opts.ref);
		watch([() => this.isHighlighted, () => this.prevHighlighted.current], () => {
			if (this.isHighlighted) this.opts.onHighlight.current();
			else if (this.prevHighlighted.current) this.opts.onUnhighlight.current();
		});
		watch(() => this.mounted, () => {
			if (!this.mounted) return;
			this.root.setInitialHighlightedNode();
		});
		this.onpointerdown = this.onpointerdown.bind(this);
		this.onpointerup = this.onpointerup.bind(this);
		this.onpointermove = this.onpointermove.bind(this);
	}
	handleSelect() {
		if (this.opts.disabled.current) return;
		const isCurrentSelectedValue = this.opts.value.current === this.root.opts.value.current;
		if (!this.root.opts.allowDeselect.current && isCurrentSelectedValue && !this.root.isMulti) {
			this.root.handleClose();
			return;
		}
		this.root.toggleItem(this.opts.value.current, this.opts.label.current);
		if (!this.root.isMulti && !isCurrentSelectedValue) this.root.handleClose();
	}
	#snippetProps = user_derived(() => ({
		selected: this.isSelected,
		highlighted: this.isHighlighted
	}));
	get snippetProps() {
		return get(this.#snippetProps);
	}
	set snippetProps(value) {
		set(this.#snippetProps, value);
	}
	onpointerdown(e) {
		e.preventDefault();
	}
	onpointerup(e) {
		if (e.defaultPrevented || !this.opts.ref.current) return;
		if (e.pointerType === "touch" && !isIOS) {
			on(this.opts.ref.current, "click", () => {
				this.handleSelect();
				this.root.setHighlightedNode(this.opts.ref.current);
			}, { once: true });
			return;
		}
		e.preventDefault();
		this.handleSelect();
		if (e.pointerType === "touch") this.root.setHighlightedNode(this.opts.ref.current);
	}
	onpointermove(e) {
		if (e.pointerType === "touch") return;
		if (this.root.highlightedNode !== this.opts.ref.current) this.root.setHighlightedNode(this.opts.ref.current);
	}
	#props = user_derived(() => ({
		id: this.opts.id.current,
		role: "option",
		"aria-selected": this.root.includesItem(this.opts.value.current) ? "true" : void 0,
		"data-value": this.opts.value.current,
		"data-disabled": boolToEmptyStrOrUndef(this.opts.disabled.current),
		"data-highlighted": this.root.highlightedValue === this.opts.value.current && !this.opts.disabled.current ? "" : void 0,
		"data-selected": this.root.includesItem(this.opts.value.current) ? "" : void 0,
		"data-label": this.opts.label.current,
		[this.root.getBitsAttr("item")]: "",
		onpointermove: this.onpointermove,
		onpointerdown: this.onpointerdown,
		onpointerup: this.onpointerup,
		...this.attachment
	}));
	get props() {
		return get(this.#props);
	}
	set props(value) {
		set(this.#props, value);
	}
};
var SelectGroupState = class SelectGroupState {
	static create(opts) {
		return SelectGroupContext.set(new SelectGroupState(opts, SelectRootContext.get()));
	}
	opts;
	root;
	#labelNode = state(null);
	get labelNode() {
		return get(this.#labelNode);
	}
	set labelNode(value) {
		set(this.#labelNode, value, true);
	}
	attachment;
	constructor(opts, root$2) {
		this.opts = opts;
		this.root = root$2;
		this.attachment = attachRef(opts.ref);
	}
	#props = user_derived(() => ({
		id: this.opts.id.current,
		role: "group",
		[this.root.getBitsAttr("group")]: "",
		"aria-labelledby": this.labelNode?.id ?? void 0,
		...this.attachment
	}));
	get props() {
		return get(this.#props);
	}
	set props(value) {
		set(this.#props, value);
	}
};
var SelectHiddenInputState = class SelectHiddenInputState {
	static create(opts) {
		return new SelectHiddenInputState(opts, SelectRootContext.get());
	}
	opts;
	root;
	#shouldRender = user_derived(() => this.root.opts.name.current !== "");
	get shouldRender() {
		return get(this.#shouldRender);
	}
	set shouldRender(value) {
		set(this.#shouldRender, value);
	}
	constructor(opts, root$2) {
		this.opts = opts;
		this.root = root$2;
		this.onfocus = this.onfocus.bind(this);
	}
	onfocus(e) {
		e.preventDefault();
		if (!this.root.isCombobox) this.root.triggerNode?.focus();
		else this.root.inputNode?.focus();
	}
	#props = user_derived(() => ({
		disabled: boolToTrueOrUndef(this.root.opts.disabled.current),
		required: boolToTrueOrUndef(this.root.opts.required.current),
		name: this.root.opts.name.current,
		value: this.opts.value.current,
		onfocus: this.onfocus
	}));
	get props() {
		return get(this.#props);
	}
	set props(value) {
		set(this.#props, value);
	}
};
var SelectViewportState = class SelectViewportState {
	static create(opts) {
		return new SelectViewportState(opts, SelectContentContext.get());
	}
	opts;
	content;
	root;
	attachment;
	#prevScrollTop = state(0);
	get prevScrollTop() {
		return get(this.#prevScrollTop);
	}
	set prevScrollTop(value) {
		set(this.#prevScrollTop, value, true);
	}
	constructor(opts, content) {
		this.opts = opts;
		this.content = content;
		this.root = content.root;
		this.attachment = attachRef(opts.ref, (v) => {
			this.root.viewportNode = v;
		});
	}
	#props = user_derived(() => ({
		id: this.opts.id.current,
		role: "presentation",
		[this.root.getBitsAttr("viewport")]: "",
		style: {
			position: "relative",
			flex: 1,
			overflow: "auto"
		},
		...this.attachment
	}));
	get props() {
		return get(this.#props);
	}
	set props(value) {
		set(this.#props, value);
	}
};
var SelectScrollButtonImplState = class {
	opts;
	content;
	root;
	attachment;
	autoScrollTimer = null;
	userScrollTimer = -1;
	isUserScrolling = false;
	onAutoScroll = noop$1;
	#mounted = state(false);
	get mounted() {
		return get(this.#mounted);
	}
	set mounted(value) {
		set(this.#mounted, value, true);
	}
	constructor(opts, content) {
		this.opts = opts;
		this.content = content;
		this.root = content.root;
		this.attachment = attachRef(opts.ref);
		watch([() => this.mounted], () => {
			if (!this.mounted) {
				this.isUserScrolling = false;
				return;
			}
			if (this.isUserScrolling) return;
		});
		user_effect(() => {
			if (this.mounted) return;
			this.clearAutoScrollInterval();
		});
		this.onpointerdown = this.onpointerdown.bind(this);
		this.onpointermove = this.onpointermove.bind(this);
		this.onpointerleave = this.onpointerleave.bind(this);
	}
	handleUserScroll() {
		this.content.domContext.clearTimeout(this.userScrollTimer);
		this.isUserScrolling = true;
		this.userScrollTimer = this.content.domContext.setTimeout(() => {
			this.isUserScrolling = false;
		}, 200);
	}
	clearAutoScrollInterval() {
		if (this.autoScrollTimer === null) return;
		this.content.domContext.clearTimeout(this.autoScrollTimer);
		this.autoScrollTimer = null;
	}
	onpointerdown(_) {
		if (this.autoScrollTimer !== null) return;
		const autoScroll = (tick) => {
			this.onAutoScroll();
			this.autoScrollTimer = this.content.domContext.setTimeout(() => autoScroll(tick + 1), this.opts.delay.current(tick));
		};
		this.autoScrollTimer = this.content.domContext.setTimeout(() => autoScroll(1), this.opts.delay.current(0));
	}
	onpointermove(e) {
		this.onpointerdown(e);
	}
	onpointerleave(_) {
		this.clearAutoScrollInterval();
	}
	#props = user_derived(() => ({
		id: this.opts.id.current,
		"aria-hidden": boolToStrTrueOrUndef(true),
		style: { flexShrink: 0 },
		onpointerdown: this.onpointerdown,
		onpointermove: this.onpointermove,
		onpointerleave: this.onpointerleave,
		...this.attachment
	}));
	get props() {
		return get(this.#props);
	}
	set props(value) {
		set(this.#props, value);
	}
};
var SelectScrollDownButtonState = class SelectScrollDownButtonState {
	static create(opts) {
		return new SelectScrollDownButtonState(new SelectScrollButtonImplState(opts, SelectContentContext.get()));
	}
	scrollButtonState;
	content;
	root;
	#canScrollDown = state(false);
	get canScrollDown() {
		return get(this.#canScrollDown);
	}
	set canScrollDown(value) {
		set(this.#canScrollDown, value, true);
	}
	scrollIntoViewTimer = null;
	constructor(scrollButtonState) {
		this.scrollButtonState = scrollButtonState;
		this.content = scrollButtonState.content;
		this.root = scrollButtonState.root;
		this.scrollButtonState.onAutoScroll = this.handleAutoScroll;
		watch([() => this.root.viewportNode, () => this.content.isPositioned], () => {
			if (!this.root.viewportNode || !this.content.isPositioned) return;
			this.handleScroll(true);
			return on(this.root.viewportNode, "scroll", () => this.handleScroll());
		});
		watch([
			() => this.root.opts.inputValue.current,
			() => this.root.viewportNode,
			() => this.content.isPositioned
		], () => {
			if (!this.root.viewportNode || !this.content.isPositioned) return;
			this.handleScroll(true);
		});
		watch(() => this.scrollButtonState.mounted, () => {
			if (!this.scrollButtonState.mounted) return;
			if (this.scrollIntoViewTimer) clearTimeout(this.scrollIntoViewTimer);
			this.scrollIntoViewTimer = afterSleep(5, () => {
				this.root.highlightedNode?.scrollIntoView({ block: this.root.opts.scrollAlignment.current });
			});
		});
	}
	handleScroll = (manual = false) => {
		if (!manual) this.scrollButtonState.handleUserScroll();
		if (!this.root.viewportNode) return;
		const maxScroll = this.root.viewportNode.scrollHeight - this.root.viewportNode.clientHeight;
		const paddingTop = Number.parseInt(getComputedStyle(this.root.viewportNode).paddingTop, 10);
		this.canScrollDown = Math.ceil(this.root.viewportNode.scrollTop) < maxScroll - paddingTop;
	};
	handleAutoScroll = () => {
		const viewport = this.root.viewportNode;
		const selectedItem = this.root.highlightedNode;
		if (!viewport || !selectedItem) return;
		viewport.scrollTop = viewport.scrollTop + selectedItem.offsetHeight;
	};
	#props = user_derived(() => ({
		...this.scrollButtonState.props,
		[this.root.getBitsAttr("scroll-down-button")]: ""
	}));
	get props() {
		return get(this.#props);
	}
	set props(value) {
		set(this.#props, value);
	}
};
var SelectScrollUpButtonState = class SelectScrollUpButtonState {
	static create(opts) {
		return new SelectScrollUpButtonState(new SelectScrollButtonImplState(opts, SelectContentContext.get()));
	}
	scrollButtonState;
	content;
	root;
	#canScrollUp = state(false);
	get canScrollUp() {
		return get(this.#canScrollUp);
	}
	set canScrollUp(value) {
		set(this.#canScrollUp, value, true);
	}
	constructor(scrollButtonState) {
		this.scrollButtonState = scrollButtonState;
		this.content = scrollButtonState.content;
		this.root = scrollButtonState.root;
		this.scrollButtonState.onAutoScroll = this.handleAutoScroll;
		watch([() => this.root.viewportNode, () => this.content.isPositioned], () => {
			if (!this.root.viewportNode || !this.content.isPositioned) return;
			this.handleScroll(true);
			return on(this.root.viewportNode, "scroll", () => this.handleScroll());
		});
	}
	handleScroll = (manual = false) => {
		if (!manual) this.scrollButtonState.handleUserScroll();
		if (!this.root.viewportNode) return;
		const paddingTop = Number.parseInt(getComputedStyle(this.root.viewportNode).paddingTop, 10);
		this.canScrollUp = this.root.viewportNode.scrollTop - paddingTop > .1;
	};
	handleAutoScroll = () => {
		if (!this.root.viewportNode || !this.root.highlightedNode) return;
		this.root.viewportNode.scrollTop = this.root.viewportNode.scrollTop - this.root.highlightedNode.offsetHeight;
	};
	#props = user_derived(() => ({
		...this.scrollButtonState.props,
		[this.root.getBitsAttr("scroll-up-button")]: ""
	}));
	get props() {
		return get(this.#props);
	}
	set props(value) {
		set(this.#props, value);
	}
};
function Select_hidden_input($$anchor, $$props) {
	push($$props, true);
	let value = prop($$props, "value", 15);
	const hiddenInputState = SelectHiddenInputState.create({ value: boxWith(() => value()) });
	var fragment = comment();
	var node = first_child(fragment);
	var consequent = ($$anchor$1) => {
		Hidden_input($$anchor$1, spread_props(() => hiddenInputState.props, {
			get autocomplete() {
				return $$props.autocomplete;
			},
			get value() {
				return value();
			},
			set value($$value) {
				value($$value);
			}
		}));
	};
	if_block(node, ($$render) => {
		if (hiddenInputState.shouldRender) $$render(consequent);
	});
	append($$anchor, fragment);
	pop();
}
var separatorAttrs = createBitsAttrs({
	component: "separator",
	parts: ["root"]
});
var SeparatorRootState = class SeparatorRootState {
	static create(opts) {
		return new SeparatorRootState(opts);
	}
	opts;
	attachment;
	constructor(opts) {
		this.opts = opts;
		this.attachment = attachRef(opts.ref);
	}
	#props = user_derived(() => ({
		id: this.opts.id.current,
		role: this.opts.decorative.current ? "none" : "separator",
		"aria-orientation": this.opts.orientation.current,
		"aria-hidden": boolToStrTrueOrUndef(this.opts.decorative.current),
		"data-orientation": this.opts.orientation.current,
		[separatorAttrs.root]: "",
		...this.attachment
	}));
	get props() {
		return get(this.#props);
	}
	set props(value) {
		set(this.#props, value);
	}
};
var root_2$4 = from_html(`<div><!></div>`);
function Separator$1($$anchor, $$props) {
	const uid = props_id();
	push($$props, true);
	let id = prop($$props, "id", 19, () => createId(uid)), ref = prop($$props, "ref", 15, null), decorative = prop($$props, "decorative", 3, false), orientation = prop($$props, "orientation", 3, "horizontal"), restProps = rest_props($$props, [
		"$$slots",
		"$$events",
		"$$legacy",
		"id",
		"ref",
		"child",
		"children",
		"decorative",
		"orientation"
	]);
	const rootState = SeparatorRootState.create({
		ref: boxWith(() => ref(), (v) => ref(v)),
		id: boxWith(() => id()),
		decorative: boxWith(() => decorative()),
		orientation: boxWith(() => orientation())
	});
	const mergedProps = user_derived(() => mergeProps(restProps, rootState.props));
	var fragment = comment();
	var node = first_child(fragment);
	var consequent = ($$anchor$1) => {
		var fragment_1 = comment();
		snippet(first_child(fragment_1), () => $$props.child, () => ({ props: get(mergedProps) }));
		append($$anchor$1, fragment_1);
	};
	var alternate = ($$anchor$1) => {
		var div = root_2$4();
		attribute_effect(div, () => ({ ...get(mergedProps) }));
		snippet(child(div), () => $$props.children ?? noop);
		reset(div);
		append($$anchor$1, div);
	};
	if_block(node, ($$render) => {
		if ($$props.child) $$render(consequent);
		else $$render(alternate, false);
	});
	append($$anchor, fragment);
	pop();
}
var root_4 = from_html(`<div><div><!></div></div>`);
var root_9 = from_html(`<div><div><!></div></div>`);
function Select_content$1($$anchor, $$props) {
	const uid = props_id();
	push($$props, true);
	let id = prop($$props, "id", 19, () => createId(uid)), ref = prop($$props, "ref", 15, null), forceMount = prop($$props, "forceMount", 3, false), side = prop($$props, "side", 3, "bottom"), onInteractOutside = prop($$props, "onInteractOutside", 3, noop$1), onEscapeKeydown = prop($$props, "onEscapeKeydown", 3, noop$1), preventScroll = prop($$props, "preventScroll", 3, false), restProps = rest_props($$props, [
		"$$slots",
		"$$events",
		"$$legacy",
		"id",
		"ref",
		"forceMount",
		"side",
		"onInteractOutside",
		"onEscapeKeydown",
		"children",
		"child",
		"preventScroll"
	]);
	const contentState = SelectContentState.create({
		id: boxWith(() => id()),
		ref: boxWith(() => ref(), (v) => ref(v)),
		onInteractOutside: boxWith(() => onInteractOutside()),
		onEscapeKeydown: boxWith(() => onEscapeKeydown())
	});
	const mergedProps = user_derived(() => mergeProps(restProps, contentState.props));
	var fragment = comment();
	var node = first_child(fragment);
	var consequent_1 = ($$anchor$1) => {
		{
			const popper = ($$anchor$2, $$arg0) => {
				let props = () => $$arg0?.().props;
				let wrapperProps = () => $$arg0?.().wrapperProps;
				const finalProps = user_derived(() => mergeProps(props(), { style: contentState.props.style }));
				var fragment_2 = comment();
				var node_1 = first_child(fragment_2);
				var consequent = ($$anchor$3) => {
					var fragment_3 = comment();
					var node_2 = first_child(fragment_3);
					{
						let $0 = user_derived(() => ({
							props: get(finalProps),
							wrapperProps: wrapperProps(),
							...contentState.snippetProps
						}));
						snippet(node_2, () => $$props.child, () => get($0));
					}
					append($$anchor$3, fragment_3);
				};
				var alternate = ($$anchor$3) => {
					var div = root_4();
					attribute_effect(div, () => ({ ...wrapperProps() }));
					var div_1 = child(div);
					attribute_effect(div_1, () => ({ ...get(finalProps) }));
					snippet(child(div_1), () => $$props.children ?? noop);
					reset(div_1);
					reset(div);
					append($$anchor$3, div);
				};
				if_block(node_1, ($$render) => {
					if ($$props.child) $$render(consequent);
					else $$render(alternate, false);
				});
				append($$anchor$2, fragment_2);
			};
			Popper_layer_force_mount($$anchor$1, spread_props(() => get(mergedProps), () => contentState.popperProps, {
				get ref() {
					return contentState.opts.ref;
				},
				get side() {
					return side();
				},
				get enabled() {
					return contentState.root.opts.open.current;
				},
				get id() {
					return id();
				},
				get preventScroll() {
					return preventScroll();
				},
				forceMount: true,
				get shouldRender() {
					return contentState.shouldRender;
				},
				popper,
				$$slots: { popper: true }
			}));
		}
	};
	var alternate_2 = ($$anchor$1) => {
		var fragment_4 = comment();
		var node_4 = first_child(fragment_4);
		var consequent_3 = ($$anchor$2) => {
			{
				const popper = ($$anchor$3, $$arg0) => {
					let props = () => $$arg0?.().props;
					let wrapperProps = () => $$arg0?.().wrapperProps;
					const finalProps = user_derived(() => mergeProps(props(), { style: contentState.props.style }));
					var fragment_6 = comment();
					var node_5 = first_child(fragment_6);
					var consequent_2 = ($$anchor$4) => {
						var fragment_7 = comment();
						var node_6 = first_child(fragment_7);
						{
							let $0 = user_derived(() => ({
								props: get(finalProps),
								wrapperProps: wrapperProps(),
								...contentState.snippetProps
							}));
							snippet(node_6, () => $$props.child, () => get($0));
						}
						append($$anchor$4, fragment_7);
					};
					var alternate_1 = ($$anchor$4) => {
						var div_2 = root_9();
						attribute_effect(div_2, () => ({ ...wrapperProps() }));
						var div_3 = child(div_2);
						attribute_effect(div_3, () => ({ ...get(finalProps) }));
						snippet(child(div_3), () => $$props.children ?? noop);
						reset(div_3);
						reset(div_2);
						append($$anchor$4, div_2);
					};
					if_block(node_5, ($$render) => {
						if ($$props.child) $$render(consequent_2);
						else $$render(alternate_1, false);
					});
					append($$anchor$3, fragment_6);
				};
				Popper_layer($$anchor$2, spread_props(() => get(mergedProps), () => contentState.popperProps, {
					get ref() {
						return contentState.opts.ref;
					},
					get side() {
						return side();
					},
					get open() {
						return contentState.root.opts.open.current;
					},
					get id() {
						return id();
					},
					get preventScroll() {
						return preventScroll();
					},
					forceMount: false,
					get shouldRender() {
						return contentState.shouldRender;
					},
					popper,
					$$slots: { popper: true }
				}));
			}
		};
		if_block(node_4, ($$render) => {
			if (!forceMount()) $$render(consequent_3);
		}, true);
		append($$anchor$1, fragment_4);
	};
	if_block(node, ($$render) => {
		if (forceMount()) $$render(consequent_1);
		else $$render(alternate_2, false);
	});
	append($$anchor, fragment);
	pop();
}
function Mounted($$anchor, $$props) {
	push($$props, true);
	let mounted = prop($$props, "mounted", 15, false), onMountedChange = prop($$props, "onMountedChange", 3, noop$1);
	onMountEffect(() => {
		mounted(true);
		onMountedChange()(true);
		return () => {
			mounted(false);
			onMountedChange()(false);
		};
	});
	pop();
}
var root_2$3 = from_html(`<div><!></div>`);
var root$1 = from_html(`<!> <!>`, 1);
function Select_item$1($$anchor, $$props) {
	const uid = props_id();
	push($$props, true);
	let id = prop($$props, "id", 19, () => createId(uid)), ref = prop($$props, "ref", 15, null), label = prop($$props, "label", 19, () => $$props.value), disabled = prop($$props, "disabled", 3, false), onHighlight = prop($$props, "onHighlight", 3, noop$1), onUnhighlight = prop($$props, "onUnhighlight", 3, noop$1), restProps = rest_props($$props, [
		"$$slots",
		"$$events",
		"$$legacy",
		"id",
		"ref",
		"value",
		"label",
		"disabled",
		"children",
		"child",
		"onHighlight",
		"onUnhighlight"
	]);
	const itemState = SelectItemState.create({
		id: boxWith(() => id()),
		ref: boxWith(() => ref(), (v) => ref(v)),
		value: boxWith(() => $$props.value),
		disabled: boxWith(() => disabled()),
		label: boxWith(() => label()),
		onHighlight: boxWith(() => onHighlight()),
		onUnhighlight: boxWith(() => onUnhighlight())
	});
	const mergedProps = user_derived(() => mergeProps(restProps, itemState.props));
	var fragment = root$1();
	var node = first_child(fragment);
	var consequent = ($$anchor$1) => {
		var fragment_1 = comment();
		var node_1 = first_child(fragment_1);
		{
			let $0 = user_derived(() => ({
				props: get(mergedProps),
				...itemState.snippetProps
			}));
			snippet(node_1, () => $$props.child, () => get($0));
		}
		append($$anchor$1, fragment_1);
	};
	var alternate = ($$anchor$1) => {
		var div = root_2$3();
		attribute_effect(div, () => ({ ...get(mergedProps) }));
		snippet(child(div), () => $$props.children ?? noop, () => itemState.snippetProps);
		reset(div);
		append($$anchor$1, div);
	};
	if_block(node, ($$render) => {
		if ($$props.child) $$render(consequent);
		else $$render(alternate, false);
	});
	Mounted(sibling(node, 2), {
		get mounted() {
			return itemState.mounted;
		},
		set mounted($$value) {
			itemState.mounted = $$value;
		}
	});
	append($$anchor, fragment);
	pop();
}
var root_2$2 = from_html(`<div><!></div>`);
function Select_group($$anchor, $$props) {
	const uid = props_id();
	push($$props, true);
	let id = prop($$props, "id", 19, () => createId(uid)), ref = prop($$props, "ref", 15, null), restProps = rest_props($$props, [
		"$$slots",
		"$$events",
		"$$legacy",
		"id",
		"ref",
		"children",
		"child"
	]);
	const groupState = SelectGroupState.create({
		id: boxWith(() => id()),
		ref: boxWith(() => ref(), (v) => ref(v))
	});
	const mergedProps = user_derived(() => mergeProps(restProps, groupState.props));
	var fragment = comment();
	var node = first_child(fragment);
	var consequent = ($$anchor$1) => {
		var fragment_1 = comment();
		snippet(first_child(fragment_1), () => $$props.child, () => ({ props: get(mergedProps) }));
		append($$anchor$1, fragment_1);
	};
	var alternate = ($$anchor$1) => {
		var div = root_2$2();
		attribute_effect(div, () => ({ ...get(mergedProps) }));
		snippet(child(div), () => $$props.children ?? noop);
		reset(div);
		append($$anchor$1, div);
	};
	if_block(node, ($$render) => {
		if ($$props.child) $$render(consequent);
		else $$render(alternate, false);
	});
	append($$anchor, fragment);
	pop();
}
var root_2$1 = from_html(`<div><!></div>`);
function Select_viewport($$anchor, $$props) {
	const uid = props_id();
	push($$props, true);
	let id = prop($$props, "id", 19, () => createId(uid)), ref = prop($$props, "ref", 15, null), restProps = rest_props($$props, [
		"$$slots",
		"$$events",
		"$$legacy",
		"id",
		"ref",
		"children",
		"child"
	]);
	const viewportState = SelectViewportState.create({
		id: boxWith(() => id()),
		ref: boxWith(() => ref(), (v) => ref(v))
	});
	const mergedProps = user_derived(() => mergeProps(restProps, viewportState.props));
	var fragment = comment();
	var node = first_child(fragment);
	var consequent = ($$anchor$1) => {
		var fragment_1 = comment();
		snippet(first_child(fragment_1), () => $$props.child, () => ({ props: get(mergedProps) }));
		append($$anchor$1, fragment_1);
	};
	var alternate = ($$anchor$1) => {
		var div = root_2$1();
		attribute_effect(div, () => ({ ...get(mergedProps) }));
		snippet(child(div), () => $$props.children ?? noop);
		reset(div);
		append($$anchor$1, div);
	};
	if_block(node, ($$render) => {
		if ($$props.child) $$render(consequent);
		else $$render(alternate, false);
	});
	append($$anchor, fragment);
	pop();
}
var root_3$2 = from_html(`<div><!></div>`);
var root_1$3 = from_html(`<!> <!>`, 1);
function Select_scroll_down_button$1($$anchor, $$props) {
	const uid = props_id();
	push($$props, true);
	let id = prop($$props, "id", 19, () => createId(uid)), ref = prop($$props, "ref", 15, null), delay = prop($$props, "delay", 3, () => 50), restProps = rest_props($$props, [
		"$$slots",
		"$$events",
		"$$legacy",
		"id",
		"ref",
		"delay",
		"child",
		"children"
	]);
	const scrollButtonState = SelectScrollDownButtonState.create({
		id: boxWith(() => id()),
		ref: boxWith(() => ref(), (v) => ref(v)),
		delay: boxWith(() => delay())
	});
	const mergedProps = user_derived(() => mergeProps(restProps, scrollButtonState.props));
	var fragment = comment();
	var node = first_child(fragment);
	var consequent_1 = ($$anchor$1) => {
		var fragment_1 = root_1$3();
		var node_1 = first_child(fragment_1);
		Mounted(node_1, {
			get mounted() {
				return scrollButtonState.scrollButtonState.mounted;
			},
			set mounted($$value) {
				scrollButtonState.scrollButtonState.mounted = $$value;
			}
		});
		var node_2 = sibling(node_1, 2);
		var consequent = ($$anchor$2) => {
			var fragment_2 = comment();
			snippet(first_child(fragment_2), () => $$props.child, () => ({ props: restProps }));
			append($$anchor$2, fragment_2);
		};
		var alternate = ($$anchor$2) => {
			var div = root_3$2();
			attribute_effect(div, () => ({ ...get(mergedProps) }));
			snippet(child(div), () => $$props.children ?? noop);
			reset(div);
			append($$anchor$2, div);
		};
		if_block(node_2, ($$render) => {
			if ($$props.child) $$render(consequent);
			else $$render(alternate, false);
		});
		append($$anchor$1, fragment_1);
	};
	if_block(node, ($$render) => {
		if (scrollButtonState.canScrollDown) $$render(consequent_1);
	});
	append($$anchor, fragment);
	pop();
}
var root_3$1 = from_html(`<div><!></div>`);
var root_1$2 = from_html(`<!> <!>`, 1);
function Select_scroll_up_button$1($$anchor, $$props) {
	const uid = props_id();
	push($$props, true);
	let id = prop($$props, "id", 19, () => createId(uid)), ref = prop($$props, "ref", 15, null), delay = prop($$props, "delay", 3, () => 50), restProps = rest_props($$props, [
		"$$slots",
		"$$events",
		"$$legacy",
		"id",
		"ref",
		"delay",
		"child",
		"children"
	]);
	const scrollButtonState = SelectScrollUpButtonState.create({
		id: boxWith(() => id()),
		ref: boxWith(() => ref(), (v) => ref(v)),
		delay: boxWith(() => delay())
	});
	const mergedProps = user_derived(() => mergeProps(restProps, scrollButtonState.props));
	var fragment = comment();
	var node = first_child(fragment);
	var consequent_1 = ($$anchor$1) => {
		var fragment_1 = root_1$2();
		var node_1 = first_child(fragment_1);
		Mounted(node_1, {
			get mounted() {
				return scrollButtonState.scrollButtonState.mounted;
			},
			set mounted($$value) {
				scrollButtonState.scrollButtonState.mounted = $$value;
			}
		});
		var node_2 = sibling(node_1, 2);
		var consequent = ($$anchor$2) => {
			var fragment_2 = comment();
			snippet(first_child(fragment_2), () => $$props.child, () => ({ props: restProps }));
			append($$anchor$2, fragment_2);
		};
		var alternate = ($$anchor$2) => {
			var div = root_3$1();
			attribute_effect(div, () => ({ ...get(mergedProps) }));
			snippet(child(div), () => $$props.children ?? noop);
			reset(div);
			append($$anchor$2, div);
		};
		if_block(node_2, ($$render) => {
			if ($$props.child) $$render(consequent);
			else $$render(alternate, false);
		});
		append($$anchor$1, fragment_1);
	};
	if_block(node, ($$render) => {
		if (scrollButtonState.canScrollUp) $$render(consequent_1);
	});
	append($$anchor, fragment);
	pop();
}
var root = from_html(`<!> <!>`, 1);
function Select($$anchor, $$props) {
	push($$props, true);
	let value = prop($$props, "value", 15), onValueChange = prop($$props, "onValueChange", 3, noop$1), name = prop($$props, "name", 3, ""), disabled = prop($$props, "disabled", 3, false), open = prop($$props, "open", 15, false), onOpenChange = prop($$props, "onOpenChange", 3, noop$1), onOpenChangeComplete = prop($$props, "onOpenChangeComplete", 3, noop$1), loop = prop($$props, "loop", 3, false), scrollAlignment = prop($$props, "scrollAlignment", 3, "nearest"), required = prop($$props, "required", 3, false), items = prop($$props, "items", 19, () => []), allowDeselect = prop($$props, "allowDeselect", 3, false);
	function handleDefaultValue() {
		if (value() !== void 0) return;
		value($$props.type === "single" ? "" : []);
	}
	handleDefaultValue();
	watch.pre(() => value(), () => {
		handleDefaultValue();
	});
	let inputValue = state("");
	const rootState = SelectRootState.create({
		type: $$props.type,
		value: boxWith(() => value(), (v) => {
			value(v);
			onValueChange()(v);
		}),
		disabled: boxWith(() => disabled()),
		required: boxWith(() => required()),
		open: boxWith(() => open(), (v) => {
			open(v);
			onOpenChange()(v);
		}),
		loop: boxWith(() => loop()),
		scrollAlignment: boxWith(() => scrollAlignment()),
		name: boxWith(() => name()),
		isCombobox: false,
		items: boxWith(() => items()),
		allowDeselect: boxWith(() => allowDeselect()),
		inputValue: boxWith(() => get(inputValue), (v) => set(inputValue, v, true)),
		onOpenChangeComplete: boxWith(() => onOpenChangeComplete())
	});
	var fragment = root();
	var node = first_child(fragment);
	Floating_layer(node, {
		children: ($$anchor$1, $$slotProps) => {
			var fragment_1 = comment();
			snippet(first_child(fragment_1), () => $$props.children ?? noop);
			append($$anchor$1, fragment_1);
		},
		$$slots: { default: true }
	});
	var node_2 = sibling(node, 2);
	var consequent_1 = ($$anchor$1) => {
		var fragment_2 = comment();
		var node_3 = first_child(fragment_2);
		var consequent = ($$anchor$2) => {
			Select_hidden_input($$anchor$2, { get autocomplete() {
				return $$props.autocomplete;
			} });
		};
		var alternate = ($$anchor$2) => {
			var fragment_4 = comment();
			each(first_child(fragment_4), 16, () => rootState.opts.value.current, (item) => item, ($$anchor$3, item) => {
				Select_hidden_input($$anchor$3, {
					get value() {
						return item;
					},
					get autocomplete() {
						return $$props.autocomplete;
					}
				});
			});
			append($$anchor$2, fragment_4);
		};
		if_block(node_3, ($$render) => {
			if (rootState.opts.value.current.length === 0) $$render(consequent);
			else $$render(alternate, false);
		});
		append($$anchor$1, fragment_2);
	};
	var alternate_1 = ($$anchor$1) => {
		Select_hidden_input($$anchor$1, {
			get autocomplete() {
				return $$props.autocomplete;
			},
			get value() {
				return rootState.opts.value.current;
			},
			set value($$value) {
				rootState.opts.value.current = $$value;
			}
		});
	};
	if_block(node_2, ($$render) => {
		if (Array.isArray(rootState.opts.value.current)) $$render(consequent_1);
		else $$render(alternate_1, false);
	});
	append($$anchor, fragment);
	pop();
}
var root_3 = from_html(`<button><!></button>`);
function Select_trigger$1($$anchor, $$props) {
	const uid = props_id();
	push($$props, true);
	let id = prop($$props, "id", 19, () => createId(uid)), ref = prop($$props, "ref", 15, null), type = prop($$props, "type", 3, "button"), restProps = rest_props($$props, [
		"$$slots",
		"$$events",
		"$$legacy",
		"id",
		"ref",
		"child",
		"children",
		"type"
	]);
	const triggerState = SelectTriggerState.create({
		id: boxWith(() => id()),
		ref: boxWith(() => ref(), (v) => ref(v))
	});
	const mergedProps = user_derived(() => mergeProps(restProps, triggerState.props, { type: type() }));
	var fragment = comment();
	component(first_child(fragment), () => Floating_layer_anchor, ($$anchor$1, FloatingLayer_Anchor) => {
		FloatingLayer_Anchor($$anchor$1, {
			get id() {
				return id();
			},
			get ref() {
				return triggerState.opts.ref;
			},
			children: ($$anchor$2, $$slotProps) => {
				var fragment_1 = comment();
				var node_1 = first_child(fragment_1);
				var consequent = ($$anchor$3) => {
					var fragment_2 = comment();
					snippet(first_child(fragment_2), () => $$props.child, () => ({ props: get(mergedProps) }));
					append($$anchor$3, fragment_2);
				};
				var alternate = ($$anchor$3) => {
					var button = root_3();
					attribute_effect(button, () => ({ ...get(mergedProps) }));
					snippet(child(button), () => $$props.children ?? noop);
					reset(button);
					append($$anchor$3, button);
				};
				if_block(node_1, ($$render) => {
					if ($$props.child) $$render(consequent);
					else $$render(alternate, false);
				});
				append($$anchor$2, fragment_1);
			},
			$$slots: { default: true }
		});
	});
	append($$anchor, fragment);
	pop();
}
function Chevron_down($$anchor, $$props) {
	const $$sanitized_props = legacy_rest_props($$props, [
		"children",
		"$$slots",
		"$$events",
		"$$legacy"
	]);
	/**
	* @license lucide-svelte v0.562.0 - ISC
	*
	* ISC License
	*
	* Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2023 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2025.
	*
	* Permission to use, copy, modify, and/or distribute this software for any
	* purpose with or without fee is hereby granted, provided that the above
	* copyright notice and this permission notice appear in all copies.
	*
	* THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
	* WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
	* MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
	* ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
	* WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
	* ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
	* OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
	*
	* ---
	*
	* The MIT License (MIT) (for portions derived from Feather)
	*
	* Copyright (c) 2013-2023 Cole Bemis
	*
	* Permission is hereby granted, free of charge, to any person obtaining a copy
	* of this software and associated documentation files (the "Software"), to deal
	* in the Software without restriction, including without limitation the rights
	* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	* copies of the Software, and to permit persons to whom the Software is
	* furnished to do so, subject to the following conditions:
	*
	* The above copyright notice and this permission notice shall be included in all
	* copies or substantial portions of the Software.
	*
	* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	* SOFTWARE.
	*
	*/
	const iconNode = [["path", { "d": "m6 9 6 6 6-6" }]];
	Icon($$anchor, spread_props({ name: "chevron-down" }, () => $$sanitized_props, {
		get iconNode() {
			return iconNode;
		},
		children: ($$anchor$1, $$slotProps) => {
			var fragment_1 = comment();
			slot(first_child(fragment_1), $$props, "default", {}, null);
			append($$anchor$1, fragment_1);
		},
		$$slots: { default: true }
	}));
}
function Chevron_up($$anchor, $$props) {
	const $$sanitized_props = legacy_rest_props($$props, [
		"children",
		"$$slots",
		"$$events",
		"$$legacy"
	]);
	/**
	* @license lucide-svelte v0.562.0 - ISC
	*
	* ISC License
	*
	* Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2023 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2025.
	*
	* Permission to use, copy, modify, and/or distribute this software for any
	* purpose with or without fee is hereby granted, provided that the above
	* copyright notice and this permission notice appear in all copies.
	*
	* THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
	* WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
	* MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
	* ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
	* WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
	* ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
	* OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
	*
	* ---
	*
	* The MIT License (MIT) (for portions derived from Feather)
	*
	* Copyright (c) 2013-2023 Cole Bemis
	*
	* Permission is hereby granted, free of charge, to any person obtaining a copy
	* of this software and associated documentation files (the "Software"), to deal
	* in the Software without restriction, including without limitation the rights
	* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	* copies of the Software, and to permit persons to whom the Software is
	* furnished to do so, subject to the following conditions:
	*
	* The above copyright notice and this permission notice shall be included in all
	* copies or substantial portions of the Software.
	*
	* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	* SOFTWARE.
	*
	*/
	const iconNode = [["path", { "d": "m18 15-6-6-6 6" }]];
	Icon($$anchor, spread_props({ name: "chevron-up" }, () => $$sanitized_props, {
		get iconNode() {
			return iconNode;
		},
		children: ($$anchor$1, $$slotProps) => {
			var fragment_1 = comment();
			slot(first_child(fragment_1), $$props, "default", {}, null);
			append($$anchor$1, fragment_1);
		},
		$$slots: { default: true }
	}));
}
var root_1$1 = from_html(`<span class="absolute left-2 flex size-3.5 items-center justify-center"><!></span> <!>`, 1);
function Select_item($$anchor, $$props) {
	push($$props, true);
	let ref = prop($$props, "ref", 15, null), restProps = rest_props($$props, [
		"$$slots",
		"$$events",
		"$$legacy",
		"ref",
		"class",
		"value",
		"label",
		"children"
	]);
	var fragment = comment();
	var node = first_child(fragment);
	{
		const children = ($$anchor$1, $$arg0) => {
			let selected = () => $$arg0?.().selected;
			let highlighted = () => $$arg0?.().highlighted;
			var fragment_1 = root_1$1();
			var span = first_child(fragment_1);
			var node_1 = child(span);
			var consequent = ($$anchor$2) => {
				Check($$anchor$2, { class: "size-4" });
			};
			if_block(node_1, ($$render) => {
				if (selected()) $$render(consequent);
			});
			reset(span);
			var node_2 = sibling(span, 2);
			var consequent_1 = ($$anchor$2) => {
				var fragment_3 = comment();
				snippet(first_child(fragment_3), () => $$props.children, () => ({
					selected: selected(),
					highlighted: highlighted()
				}));
				append($$anchor$2, fragment_3);
			};
			var alternate = ($$anchor$2) => {
				var text$1 = text();
				template_effect(() => set_text(text$1, $$props.label || $$props.value));
				append($$anchor$2, text$1);
			};
			if_block(node_2, ($$render) => {
				if ($$props.children) $$render(consequent_1);
				else $$render(alternate, false);
			});
			append($$anchor$1, fragment_1);
		};
		let $0 = user_derived(() => cn("data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50", $$props.class));
		component(node, () => Select_item$1, ($$anchor$1, SelectPrimitive_Item) => {
			SelectPrimitive_Item($$anchor$1, spread_props({
				get value() {
					return $$props.value;
				},
				get class() {
					return get($0);
				}
			}, () => restProps, {
				get ref() {
					return ref();
				},
				set ref($$value) {
					ref($$value);
				},
				children,
				$$slots: { default: true }
			}));
		});
	}
	append($$anchor, fragment);
	pop();
}
function Select_scroll_up_button($$anchor, $$props) {
	push($$props, true);
	let ref = prop($$props, "ref", 15, null), restProps = rest_props($$props, [
		"$$slots",
		"$$events",
		"$$legacy",
		"ref",
		"class"
	]);
	var fragment = comment();
	var node = first_child(fragment);
	{
		let $0 = user_derived(() => cn("flex cursor-default items-center justify-center py-1", $$props.class));
		component(node, () => Select_scroll_up_button$1, ($$anchor$1, SelectPrimitive_ScrollUpButton) => {
			SelectPrimitive_ScrollUpButton($$anchor$1, spread_props({ get class() {
				return get($0);
			} }, () => restProps, {
				get ref() {
					return ref();
				},
				set ref($$value) {
					ref($$value);
				},
				children: ($$anchor$2, $$slotProps) => {
					Chevron_up($$anchor$2, { class: "size-4" });
				},
				$$slots: { default: true }
			}));
		});
	}
	append($$anchor, fragment);
	pop();
}
function Select_scroll_down_button($$anchor, $$props) {
	push($$props, true);
	let ref = prop($$props, "ref", 15, null), restProps = rest_props($$props, [
		"$$slots",
		"$$events",
		"$$legacy",
		"ref",
		"class"
	]);
	var fragment = comment();
	var node = first_child(fragment);
	{
		let $0 = user_derived(() => cn("flex cursor-default items-center justify-center py-1", $$props.class));
		component(node, () => Select_scroll_down_button$1, ($$anchor$1, SelectPrimitive_ScrollDownButton) => {
			SelectPrimitive_ScrollDownButton($$anchor$1, spread_props({ get class() {
				return get($0);
			} }, () => restProps, {
				get ref() {
					return ref();
				},
				set ref($$value) {
					ref($$value);
				},
				children: ($$anchor$2, $$slotProps) => {
					Chevron_down($$anchor$2, { class: "size-4" });
				},
				$$slots: { default: true }
			}));
		});
	}
	append($$anchor, fragment);
	pop();
}
var root_2 = from_html(`<!> <!> <!>`, 1);
function Select_content($$anchor, $$props) {
	push($$props, true);
	let ref = prop($$props, "ref", 15, null), sideOffset = prop($$props, "sideOffset", 3, 4), restProps = rest_props($$props, [
		"$$slots",
		"$$events",
		"$$legacy",
		"ref",
		"class",
		"sideOffset",
		"portalProps",
		"children"
	]);
	var fragment = comment();
	component(first_child(fragment), () => Portal, ($$anchor$1, SelectPrimitive_Portal) => {
		SelectPrimitive_Portal($$anchor$1, spread_props(() => $$props.portalProps, {
			children: ($$anchor$2, $$slotProps) => {
				var fragment_1 = comment();
				var node_1 = first_child(fragment_1);
				{
					let $0 = user_derived(() => cn("data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 bg-popover text-popover-foreground relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border shadow-md data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1", $$props.class));
					component(node_1, () => Select_content$1, ($$anchor$3, SelectPrimitive_Content) => {
						SelectPrimitive_Content($$anchor$3, spread_props({
							get sideOffset() {
								return sideOffset();
							},
							get class() {
								return get($0);
							}
						}, () => restProps, {
							get ref() {
								return ref();
							},
							set ref($$value) {
								ref($$value);
							},
							children: ($$anchor$4, $$slotProps$1) => {
								var fragment_2 = root_2();
								var node_2 = first_child(fragment_2);
								Select_scroll_up_button(node_2, {});
								var node_3 = sibling(node_2, 2);
								{
									let $0$1 = user_derived(() => cn("h-[var(--bits-select-anchor-height)] w-full min-w-[var(--bits-select-anchor-width)] p-1"));
									component(node_3, () => Select_viewport, ($$anchor$5, SelectPrimitive_Viewport) => {
										SelectPrimitive_Viewport($$anchor$5, {
											get class() {
												return get($0$1);
											},
											children: ($$anchor$6, $$slotProps$2) => {
												var fragment_3 = comment();
												snippet(first_child(fragment_3), () => $$props.children ?? noop);
												append($$anchor$6, fragment_3);
											},
											$$slots: { default: true }
										});
									});
								}
								Select_scroll_down_button(sibling(node_3, 2), {});
								append($$anchor$4, fragment_2);
							},
							$$slots: { default: true }
						}));
					});
				}
				append($$anchor$2, fragment_1);
			},
			$$slots: { default: true }
		}));
	});
	append($$anchor, fragment);
	pop();
}
var root_1 = from_html(`<!> <!>`, 1);
function Select_trigger($$anchor, $$props) {
	push($$props, true);
	let ref = prop($$props, "ref", 15, null), restProps = rest_props($$props, [
		"$$slots",
		"$$events",
		"$$legacy",
		"ref",
		"class",
		"children"
	]);
	var fragment = comment();
	var node = first_child(fragment);
	{
		let $0 = user_derived(() => cn("border-input bg-background ring-offset-background data-[placeholder]:text-muted-foreground focus:ring-ring flex h-10 w-full items-center justify-between rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1", $$props.class));
		component(node, () => Select_trigger$1, ($$anchor$1, SelectPrimitive_Trigger) => {
			SelectPrimitive_Trigger($$anchor$1, spread_props({ get class() {
				return get($0);
			} }, () => restProps, {
				get ref() {
					return ref();
				},
				set ref($$value) {
					ref($$value);
				},
				children: ($$anchor$2, $$slotProps) => {
					var fragment_1 = root_1();
					var node_1 = first_child(fragment_1);
					snippet(node_1, () => $$props.children ?? noop);
					Chevron_down(sibling(node_1, 2), { class: "size-4 opacity-50" });
					append($$anchor$2, fragment_1);
				},
				$$slots: { default: true }
			}));
		});
	}
	append($$anchor, fragment);
	pop();
}
function Separator($$anchor, $$props) {
	push($$props, true);
	let ref = prop($$props, "ref", 15, null), orientation = prop($$props, "orientation", 3, "horizontal"), restProps = rest_props($$props, [
		"$$slots",
		"$$events",
		"$$legacy",
		"ref",
		"class",
		"orientation"
	]);
	var fragment = comment();
	var node = first_child(fragment);
	{
		let $0 = user_derived(() => cn("bg-border shrink-0", orientation() === "horizontal" ? "h-[1px] w-full" : "min-h-full w-[1px]", $$props.class));
		component(node, () => Separator$1, ($$anchor$1, SeparatorPrimitive_Root) => {
			SeparatorPrimitive_Root($$anchor$1, spread_props({
				get class() {
					return get($0);
				},
				get orientation() {
					return orientation();
				}
			}, () => restProps, {
				get ref() {
					return ref();
				},
				set ref($$value) {
					ref($$value);
				}
			}));
		});
	}
	append($$anchor, fragment);
	pop();
}
var Root = Select;
var Group = Select_group;
export { Select_content as a, Select_trigger as i, Root as n, Select_item as o, Separator as r, Chevron_down as s, Group as t };
