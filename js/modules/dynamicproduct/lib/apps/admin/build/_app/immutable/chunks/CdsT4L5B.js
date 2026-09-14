import { $ as props_id, C as bind_value, Ct as set, D as set_attribute, Ft as push, G as if_block, Ht as next, Kt as noop, L as component, Ot as user_derived, Pt as pop, R as snippet, T as attribute_effect, Tt as state, Ut as reset, W as key, X as comment, Y as append, Z as from_html, bt as sibling, c as spread_props, et as text, ht as user_pre_effect, mt as user_effect, o as prop, ot as get, pt as template_effect, q as set_text, s as rest_props, vt as child, xt as proxy, yt as first_child, zt as snapshot } from "./DUscB9kS.js";
import { r as cn } from "./BIEFGHhw.js";
import { d as mergeProps, n as boolToEmptyStrOrUndef, o as createBitsAttrs, r as boolToStr, t as createId, u as attachRef, y as boxWith } from "./B4l8ufIa.js";
import { T as afterSleep, n as useId, v as getFirstNonCommentChild, w as afterTick } from "./B3A_TfMF.js";
import { t as srOnlyStyles } from "./Dpo8vieJ.js";
import { A as h, C as HOME, F as p, M as k, N as l, P as n, R as watch, a as ARROW_UP, c as END, i as ARROW_RIGHT, j, l as ENTER, n as ARROW_DOWN, r as ARROW_LEFT, z as Context } from "./_yKPJ4BA.js";
import { t as noop$1 } from "./BoWJNiZV.js";
import { n as Icon } from "./CWOYbKTQ.js";
function findNextSibling(el, selector) {
	let sibling$1 = el.nextElementSibling;
	while (sibling$1) {
		if (sibling$1.matches(selector)) return sibling$1;
		sibling$1 = sibling$1.nextElementSibling;
	}
}
function findPreviousSibling(el, selector) {
	let sibling$1 = el.previousElementSibling;
	while (sibling$1) {
		if (sibling$1.matches(selector)) return sibling$1;
		sibling$1 = sibling$1.previousElementSibling;
	}
}
function cssEscape(value) {
	if (typeof CSS !== "undefined" && typeof CSS.escape === "function") return CSS.escape(value);
	const length = value.length;
	let index = -1;
	let codeUnit;
	let result = "";
	const firstCodeUnit = value.charCodeAt(0);
	if (length === 1 && firstCodeUnit === 45) return "\\" + value;
	while (++index < length) {
		codeUnit = value.charCodeAt(index);
		if (codeUnit === 0) {
			result += "�";
			continue;
		}
		if (codeUnit >= 1 && codeUnit <= 31 || codeUnit === 127 || index === 0 && codeUnit >= 48 && codeUnit <= 57 || index === 1 && codeUnit >= 48 && codeUnit <= 57 && firstCodeUnit === 45) {
			result += "\\" + codeUnit.toString(16) + " ";
			continue;
		}
		if (codeUnit >= 128 || codeUnit === 45 || codeUnit === 95 || codeUnit >= 48 && codeUnit <= 57 || codeUnit >= 65 && codeUnit <= 90 || codeUnit >= 97 && codeUnit <= 122) {
			result += value.charAt(index);
			continue;
		}
		result += "\\" + value.charAt(index);
	}
	return result;
}
var COMMAND_VALUE_ATTR = "data-value";
var commandAttrs = createBitsAttrs({
	component: "command",
	parts: [
		"root",
		"list",
		"input",
		"separator",
		"loading",
		"empty",
		"group",
		"group-items",
		"group-heading",
		"item",
		"viewport",
		"input-label"
	]
});
var COMMAND_GROUP_SELECTOR = commandAttrs.selector("group");
var COMMAND_GROUP_ITEMS_SELECTOR = commandAttrs.selector("group-items");
var COMMAND_GROUP_HEADING_SELECTOR = commandAttrs.selector("group-heading");
var COMMAND_ITEM_SELECTOR = commandAttrs.selector("item");
var COMMAND_VALID_ITEM_SELECTOR = `${commandAttrs.selector("item")}:not([aria-disabled="true"])`;
var CommandRootContext = new Context("Command.Root");
var CommandListContext = new Context("Command.List");
var CommandGroupContainerContext = new Context("Command.Group");
var defaultState = {
	search: "",
	value: "",
	filtered: {
		count: 0,
		items: /* @__PURE__ */ new Map(),
		groups: /* @__PURE__ */ new Set()
	}
};
var CommandRootState = class CommandRootState {
	static create(opts) {
		return CommandRootContext.set(new CommandRootState(opts));
	}
	opts;
	attachment;
	#updateScheduled = false;
	#isInitialMount = true;
	sortAfterTick = false;
	sortAndFilterAfterTick = false;
	allItems = /* @__PURE__ */ new Set();
	allGroups = /* @__PURE__ */ new Map();
	allIds = /* @__PURE__ */ new Map();
	#key = state(0);
	get key() {
		return get(this.#key);
	}
	set key(value) {
		set(this.#key, value, true);
	}
	#viewportNode = state(null);
	get viewportNode() {
		return get(this.#viewportNode);
	}
	set viewportNode(value) {
		set(this.#viewportNode, value, true);
	}
	#inputNode = state(null);
	get inputNode() {
		return get(this.#inputNode);
	}
	set inputNode(value) {
		set(this.#inputNode, value, true);
	}
	#labelNode = state(null);
	get labelNode() {
		return get(this.#labelNode);
	}
	set labelNode(value) {
		set(this.#labelNode, value, true);
	}
	#commandState = state(defaultState);
	get commandState() {
		return get(this.#commandState);
	}
	set commandState(value) {
		set(this.#commandState, value);
	}
	#_commandState = state(proxy(defaultState));
	get _commandState() {
		return get(this.#_commandState);
	}
	set _commandState(value) {
		set(this.#_commandState, value, true);
	}
	#snapshot() {
		return snapshot(this._commandState);
	}
	#scheduleUpdate() {
		if (this.#updateScheduled) return;
		this.#updateScheduled = true;
		afterTick(() => {
			this.#updateScheduled = false;
			const currentState = this.#snapshot();
			if (!Object.is(this.commandState, currentState)) {
				this.commandState = currentState;
				this.opts.onStateChange?.current?.(currentState);
			}
		});
	}
	setState(key$1, value, preventScroll) {
		if (Object.is(this._commandState[key$1], value)) return;
		this._commandState[key$1] = value;
		if (key$1 === "search") {
			this.#filterItems();
			this.#sort();
		} else if (key$1 === "value") {
			if (!preventScroll) this.#scrollSelectedIntoView();
		}
		this.#scheduleUpdate();
	}
	constructor(opts) {
		this.opts = opts;
		this.attachment = attachRef(this.opts.ref);
		const defaults = {
			...this._commandState,
			value: this.opts.value.current ?? ""
		};
		this._commandState = defaults;
		this.commandState = defaults;
		this.onkeydown = this.onkeydown.bind(this);
	}
	#score(value, keywords) {
		const filter = this.opts.filter.current ?? computeCommandScore;
		return value ? filter(value, this._commandState.search, keywords) : 0;
	}
	#sort() {
		if (!this._commandState.search || this.opts.shouldFilter.current === false) {
			if (!this._commandState.value || !this.#isInitialMount) this.#selectFirstItem();
			else if (this.#isInitialMount && this._commandState.value) this.#scrollInitialValue();
			return;
		}
		const scores = this._commandState.filtered.items;
		const groups = [];
		for (const value of this._commandState.filtered.groups) {
			const items = this.allGroups.get(value);
			let max = 0;
			if (!items) {
				groups.push([value, max]);
				continue;
			}
			for (const item of items) {
				const score = scores.get(item);
				max = Math.max(score ?? 0, max);
			}
			groups.push([value, max]);
		}
		const listInsertionElement = this.viewportNode;
		const sorted = this.getValidItems().sort((a, b) => {
			const valueA = a.getAttribute("data-value");
			const valueB = b.getAttribute("data-value");
			const scoresA = scores.get(valueA) ?? 0;
			return (scores.get(valueB) ?? 0) - scoresA;
		});
		for (const item of sorted) {
			const group = item.closest(COMMAND_GROUP_ITEMS_SELECTOR);
			if (group) {
				const itemToAppend = item.parentElement === group ? item : item.closest(`${COMMAND_GROUP_ITEMS_SELECTOR} > *`);
				if (itemToAppend) group.appendChild(itemToAppend);
			} else {
				const itemToAppend = item.parentElement === listInsertionElement ? item : item.closest(`${COMMAND_GROUP_ITEMS_SELECTOR} > *`);
				if (itemToAppend) listInsertionElement?.appendChild(itemToAppend);
			}
		}
		const sortedGroups = groups.sort((a, b) => b[1] - a[1]);
		for (const group of sortedGroups) {
			const element = listInsertionElement?.querySelector(`${COMMAND_GROUP_SELECTOR}[${COMMAND_VALUE_ATTR}="${cssEscape(group[0])}"]`);
			element?.parentElement?.appendChild(element);
		}
		this.#selectFirstItem();
	}
	setValue(value, opts) {
		if (value !== this.opts.value.current && value === "") afterTick(() => {
			this.key++;
		});
		this.setState("value", value, opts);
		this.opts.value.current = value;
	}
	#selectFirstItem() {
		afterTick(() => {
			const value = this.getValidItems().find((item) => item.getAttribute("aria-disabled") !== "true")?.getAttribute(COMMAND_VALUE_ATTR);
			const shouldPreventScroll = this.#isInitialMount && this.opts.disableInitialScroll.current;
			this.setValue(value ?? "", shouldPreventScroll);
			this.#isInitialMount = false;
		});
	}
	#scrollInitialValue() {
		afterTick(() => {
			if (!this.opts.disableInitialScroll.current) this.#scrollSelectedIntoView();
			this.#isInitialMount = false;
		});
	}
	#filterItems() {
		if (!this._commandState.search || this.opts.shouldFilter.current === false) {
			this._commandState.filtered.count = this.allItems.size;
			return;
		}
		this._commandState.filtered.groups = /* @__PURE__ */ new Set();
		let itemCount = 0;
		for (const id of this.allItems) {
			const value = this.allIds.get(id)?.value ?? "";
			const keywords = this.allIds.get(id)?.keywords ?? [];
			const rank = this.#score(value, keywords);
			this._commandState.filtered.items.set(id, rank);
			if (rank > 0) itemCount++;
		}
		for (const [groupId, group] of this.allGroups) for (const itemId of group) {
			const currItem = this._commandState.filtered.items.get(itemId);
			if (currItem && currItem > 0) {
				this._commandState.filtered.groups.add(groupId);
				break;
			}
		}
		this._commandState.filtered.count = itemCount;
	}
	getValidItems() {
		const node = this.opts.ref.current;
		if (!node) return [];
		return Array.from(node.querySelectorAll(COMMAND_VALID_ITEM_SELECTOR)).filter((el) => !!el);
	}
	getVisibleItems() {
		const node = this.opts.ref.current;
		if (!node) return [];
		return Array.from(node.querySelectorAll(COMMAND_ITEM_SELECTOR)).filter((el) => !!el);
	}
	get itemsGrid() {
		if (!this.isGrid) return [];
		const columns = this.opts.columns.current ?? 1;
		const items = this.getVisibleItems();
		const grid = [[]];
		let currentGroup = items[0]?.getAttribute("data-group");
		let column = 0;
		let row = 0;
		for (let i = 0; i < items.length; i++) {
			const item = items[i];
			const itemGroup = item?.getAttribute("data-group");
			if (currentGroup !== itemGroup) {
				currentGroup = itemGroup;
				column = 1;
				row++;
				grid.push([{
					index: i,
					firstRowOfGroup: true,
					ref: item
				}]);
			} else {
				column++;
				if (column > columns) {
					row++;
					column = 1;
					grid.push([]);
				}
				grid[row]?.push({
					index: i,
					firstRowOfGroup: grid[row]?.[0]?.firstRowOfGroup ?? i === 0,
					ref: item
				});
			}
		}
		return grid;
	}
	#getSelectedItem() {
		const node = this.opts.ref.current;
		if (!node) return;
		const selectedNode = node.querySelector(`${COMMAND_VALID_ITEM_SELECTOR}[data-selected]`);
		if (!selectedNode) return;
		return selectedNode;
	}
	#scrollSelectedIntoView() {
		afterTick(() => {
			const item = this.#getSelectedItem();
			if (!item) return;
			const grandparent = item.parentElement?.parentElement;
			if (!grandparent) return;
			if (this.isGrid) {
				const isFirstRowOfGroup = this.#itemIsFirstRowOfGroup(item);
				item.scrollIntoView({ block: "nearest" });
				if (isFirstRowOfGroup) {
					(item?.closest(COMMAND_GROUP_SELECTOR)?.querySelector(COMMAND_GROUP_HEADING_SELECTOR))?.scrollIntoView({ block: "nearest" });
					return;
				}
			} else {
				const firstChildOfParent = getFirstNonCommentChild(grandparent);
				if (firstChildOfParent && firstChildOfParent.dataset?.value === item.dataset?.value) {
					(item?.closest(COMMAND_GROUP_SELECTOR)?.querySelector(COMMAND_GROUP_HEADING_SELECTOR))?.scrollIntoView({ block: "nearest" });
					return;
				}
			}
			item.scrollIntoView({ block: "nearest" });
		});
	}
	#itemIsFirstRowOfGroup(item) {
		const grid = this.itemsGrid;
		if (grid.length === 0) return false;
		for (let r = 0; r < grid.length; r++) {
			const row = grid[r];
			if (row === void 0) continue;
			for (let c = 0; c < row.length; c++) {
				const column = row[c];
				if (column === void 0 || column.ref !== item) continue;
				return column.firstRowOfGroup;
			}
		}
		return false;
	}
	updateSelectedToIndex(index) {
		const item = this.getValidItems()[index];
		if (!item) return;
		this.setValue(item.getAttribute(COMMAND_VALUE_ATTR) ?? "");
	}
	updateSelectedByItem(change) {
		const selected = this.#getSelectedItem();
		const items = this.getValidItems();
		const index = items.findIndex((item) => item === selected);
		let newSelected = items[index + change];
		if (this.opts.loop.current) newSelected = index + change < 0 ? items[items.length - 1] : index + change === items.length ? items[0] : items[index + change];
		if (newSelected) this.setValue(newSelected.getAttribute(COMMAND_VALUE_ATTR) ?? "");
	}
	updateSelectedByGroup(change) {
		let group = this.#getSelectedItem()?.closest(COMMAND_GROUP_SELECTOR);
		let item;
		while (group && !item) {
			group = change > 0 ? findNextSibling(group, COMMAND_GROUP_SELECTOR) : findPreviousSibling(group, COMMAND_GROUP_SELECTOR);
			item = group?.querySelector(COMMAND_VALID_ITEM_SELECTOR);
		}
		if (item) this.setValue(item.getAttribute(COMMAND_VALUE_ATTR) ?? "");
		else this.updateSelectedByItem(change);
	}
	registerValue(value, keywords) {
		if (!(value && value === this.allIds.get(value)?.value)) this.allIds.set(value, {
			value,
			keywords
		});
		this._commandState.filtered.items.set(value, this.#score(value, keywords));
		if (!this.sortAfterTick) {
			this.sortAfterTick = true;
			afterTick(() => {
				this.#sort();
				this.sortAfterTick = false;
			});
		}
		return () => {
			this.allIds.delete(value);
		};
	}
	registerItem(id, groupId) {
		this.allItems.add(id);
		if (groupId) if (!this.allGroups.has(groupId)) this.allGroups.set(groupId, new Set([id]));
		else this.allGroups.get(groupId).add(id);
		if (!this.sortAndFilterAfterTick) {
			this.sortAndFilterAfterTick = true;
			afterTick(() => {
				this.#filterItems();
				this.#sort();
				this.sortAndFilterAfterTick = false;
			});
		}
		this.#scheduleUpdate();
		return () => {
			const selectedItem = this.#getSelectedItem();
			this.allItems.delete(id);
			this.commandState.filtered.items.delete(id);
			this.#filterItems();
			if (selectedItem?.getAttribute("id") === id) this.#selectFirstItem();
			this.#scheduleUpdate();
		};
	}
	registerGroup(id) {
		if (!this.allGroups.has(id)) this.allGroups.set(id, /* @__PURE__ */ new Set());
		return () => {
			this.allIds.delete(id);
			this.allGroups.delete(id);
		};
	}
	get isGrid() {
		return this.opts.columns.current !== null;
	}
	#last() {
		return this.updateSelectedToIndex(this.getValidItems().length - 1);
	}
	#next(e) {
		e.preventDefault();
		if (e.metaKey) this.#last();
		else if (e.altKey) this.updateSelectedByGroup(1);
		else this.updateSelectedByItem(1);
	}
	#down(e) {
		if (this.opts.columns.current === null) return;
		e.preventDefault();
		if (e.metaKey) this.updateSelectedByGroup(1);
		else this.updateSelectedByItem(this.#nextRowColumnOffset(e));
	}
	#getColumn(item, grid) {
		if (grid.length === 0) return null;
		for (let r = 0; r < grid.length; r++) {
			const row = grid[r];
			if (row === void 0) continue;
			for (let c = 0; c < row.length; c++) {
				const column = row[c];
				if (column === void 0 || column.ref !== item) continue;
				return {
					columnIndex: c,
					rowIndex: r
				};
			}
		}
		return null;
	}
	#nextRowColumnOffset(e) {
		const grid = this.itemsGrid;
		const selected = this.#getSelectedItem();
		if (!selected) return 0;
		const column = this.#getColumn(selected, grid);
		if (!column) return 0;
		let newItem = null;
		const skipRows = e.altKey ? 1 : 0;
		if (e.altKey && column.rowIndex === grid.length - 2 && !this.opts.loop.current) newItem = this.#findNextNonDisabledItem({
			start: grid.length - 1,
			end: grid.length,
			expectedColumnIndex: column.columnIndex,
			grid
		});
		else if (column.rowIndex === grid.length - 1) {
			if (!this.opts.loop.current) return 0;
			newItem = this.#findNextNonDisabledItem({
				start: 0 + skipRows,
				end: column.rowIndex,
				expectedColumnIndex: column.columnIndex,
				grid
			});
		} else {
			newItem = this.#findNextNonDisabledItem({
				start: column.rowIndex + 1 + skipRows,
				end: grid.length,
				expectedColumnIndex: column.columnIndex,
				grid
			});
			if (newItem === null && this.opts.loop.current) newItem = this.#findNextNonDisabledItem({
				start: 0,
				end: column.rowIndex,
				expectedColumnIndex: column.columnIndex,
				grid
			});
		}
		return this.#calculateOffset(selected, newItem);
	}
	#findNextNonDisabledItem({ start, end, grid, expectedColumnIndex }) {
		let newItem = null;
		for (let r = start; r < end; r++) {
			const row = grid[r];
			newItem = row[expectedColumnIndex]?.ref ?? null;
			if (newItem !== null && itemIsDisabled(newItem)) {
				newItem = null;
				continue;
			}
			if (newItem === null) for (let i = row.length - 1; i >= 0; i--) {
				const item = row[row.length - 1];
				if (item === void 0 || itemIsDisabled(item.ref)) continue;
				newItem = item.ref;
				break;
			}
			break;
		}
		return newItem;
	}
	#calculateOffset(selected, newSelected) {
		if (newSelected === null) return 0;
		const items = this.getValidItems();
		const ogIndex = items.findIndex((item) => item === selected);
		return items.findIndex((item) => item === newSelected) - ogIndex;
	}
	#up(e) {
		if (this.opts.columns.current === null) return;
		e.preventDefault();
		if (e.metaKey) this.updateSelectedByGroup(-1);
		else this.updateSelectedByItem(this.#previousRowColumnOffset(e));
	}
	#previousRowColumnOffset(e) {
		const grid = this.itemsGrid;
		const selected = this.#getSelectedItem();
		if (selected === void 0) return 0;
		const column = this.#getColumn(selected, grid);
		if (column === null) return 0;
		let newItem = null;
		const skipRows = e.altKey ? 1 : 0;
		if (e.altKey && column.rowIndex === 1 && this.opts.loop.current === false) newItem = this.#findNextNonDisabledItemDesc({
			start: 0,
			end: 0,
			expectedColumnIndex: column.columnIndex,
			grid
		});
		else if (column.rowIndex === 0) {
			if (this.opts.loop.current === false) return 0;
			newItem = this.#findNextNonDisabledItemDesc({
				start: grid.length - 1 - skipRows,
				end: column.rowIndex + 1,
				expectedColumnIndex: column.columnIndex,
				grid
			});
		} else {
			newItem = this.#findNextNonDisabledItemDesc({
				start: column.rowIndex - 1 - skipRows,
				end: 0,
				expectedColumnIndex: column.columnIndex,
				grid
			});
			if (newItem === null && this.opts.loop.current) newItem = this.#findNextNonDisabledItemDesc({
				start: grid.length - 1,
				end: column.rowIndex + 1,
				expectedColumnIndex: column.columnIndex,
				grid
			});
		}
		return this.#calculateOffset(selected, newItem);
	}
	#findNextNonDisabledItemDesc({ start, end, grid, expectedColumnIndex }) {
		let newItem = null;
		for (let r = start; r >= end; r--) {
			const row = grid[r];
			if (row === void 0) continue;
			newItem = row[expectedColumnIndex]?.ref ?? null;
			if (newItem !== null && itemIsDisabled(newItem)) {
				newItem = null;
				continue;
			}
			if (newItem === null) for (let i = row.length - 1; i >= 0; i--) {
				const item = row[row.length - 1];
				if (item === void 0 || itemIsDisabled(item.ref)) continue;
				newItem = item.ref;
				break;
			}
			break;
		}
		return newItem;
	}
	#prev(e) {
		e.preventDefault();
		if (e.metaKey) this.updateSelectedToIndex(0);
		else if (e.altKey) this.updateSelectedByGroup(-1);
		else this.updateSelectedByItem(-1);
	}
	onkeydown(e) {
		const isVim = this.opts.vimBindings.current && e.ctrlKey;
		switch (e.key) {
			case "n":
			case "j":
				if (isVim) if (this.isGrid) this.#down(e);
				else this.#next(e);
				break;
			case "l":
				if (isVim) {
					if (this.isGrid) this.#next(e);
				}
				break;
			case ARROW_DOWN:
				if (this.isGrid) this.#down(e);
				else this.#next(e);
				break;
			case ARROW_RIGHT:
				if (!this.isGrid) break;
				this.#next(e);
				break;
			case "p":
			case "k":
				if (isVim) if (this.isGrid) this.#up(e);
				else this.#prev(e);
				break;
			case "h":
				if (isVim && this.isGrid) this.#prev(e);
				break;
			case ARROW_UP:
				if (this.isGrid) this.#up(e);
				else this.#prev(e);
				break;
			case ARROW_LEFT:
				if (!this.isGrid) break;
				this.#prev(e);
				break;
			case HOME:
				e.preventDefault();
				this.updateSelectedToIndex(0);
				break;
			case "End":
				e.preventDefault();
				this.#last();
				break;
			case ENTER: if (!e.isComposing && e.keyCode !== 229) {
				e.preventDefault();
				const item = this.#getSelectedItem();
				if (item) item?.click();
			}
		}
	}
	#props = user_derived(() => ({
		id: this.opts.id.current,
		role: "application",
		[commandAttrs.root]: "",
		tabindex: -1,
		onkeydown: this.onkeydown,
		...this.attachment
	}));
	get props() {
		return get(this.#props);
	}
	set props(value) {
		set(this.#props, value);
	}
};
function itemIsDisabled(item) {
	return item.getAttribute("aria-disabled") === "true";
}
var CommandEmptyState = class CommandEmptyState {
	static create(opts) {
		return new CommandEmptyState(opts, CommandRootContext.get());
	}
	opts;
	root;
	attachment;
	#shouldRender = user_derived(() => {
		return this.root._commandState.filtered.count === 0 && this.#isInitialRender === false || this.opts.forceMount.current;
	});
	get shouldRender() {
		return get(this.#shouldRender);
	}
	set shouldRender(value) {
		set(this.#shouldRender, value);
	}
	#isInitialRender = true;
	constructor(opts, root$4) {
		this.opts = opts;
		this.root = root$4;
		this.attachment = attachRef(this.opts.ref);
		user_pre_effect(() => {
			this.#isInitialRender = false;
		});
	}
	#props = user_derived(() => ({
		id: this.opts.id.current,
		role: "presentation",
		[commandAttrs.empty]: "",
		...this.attachment
	}));
	get props() {
		return get(this.#props);
	}
	set props(value) {
		set(this.#props, value);
	}
};
var CommandGroupContainerState = class CommandGroupContainerState {
	static create(opts) {
		return CommandGroupContainerContext.set(new CommandGroupContainerState(opts, CommandRootContext.get()));
	}
	opts;
	root;
	attachment;
	#shouldRender = user_derived(() => {
		if (this.opts.forceMount.current) return true;
		if (this.root.opts.shouldFilter.current === false) return true;
		if (!this.root.commandState.search) return true;
		return this.root._commandState.filtered.groups.has(this.trueValue);
	});
	get shouldRender() {
		return get(this.#shouldRender);
	}
	set shouldRender(value) {
		set(this.#shouldRender, value);
	}
	#headingNode = state(null);
	get headingNode() {
		return get(this.#headingNode);
	}
	set headingNode(value) {
		set(this.#headingNode, value, true);
	}
	#trueValue = state("");
	get trueValue() {
		return get(this.#trueValue);
	}
	set trueValue(value) {
		set(this.#trueValue, value, true);
	}
	constructor(opts, root$4) {
		this.opts = opts;
		this.root = root$4;
		this.attachment = attachRef(this.opts.ref);
		this.trueValue = opts.value.current ?? opts.id.current;
		watch(() => this.trueValue, () => {
			return this.root.registerGroup(this.trueValue);
		});
		user_effect(() => {
			if (this.opts.value.current) {
				this.trueValue = this.opts.value.current;
				return this.root.registerValue(this.opts.value.current);
			} else if (this.headingNode && this.headingNode.textContent) {
				this.trueValue = this.headingNode.textContent.trim().toLowerCase();
				return this.root.registerValue(this.trueValue);
			} else {
				this.trueValue = `-----${this.opts.id.current}`;
				return this.root.registerValue(this.trueValue);
			}
		});
	}
	#props = user_derived(() => ({
		id: this.opts.id.current,
		role: "presentation",
		hidden: this.shouldRender ? void 0 : true,
		"data-value": this.trueValue,
		[commandAttrs.group]: "",
		...this.attachment
	}));
	get props() {
		return get(this.#props);
	}
	set props(value) {
		set(this.#props, value);
	}
};
var CommandGroupHeadingState = class CommandGroupHeadingState {
	static create(opts) {
		return new CommandGroupHeadingState(opts, CommandGroupContainerContext.get());
	}
	opts;
	group;
	attachment;
	constructor(opts, group) {
		this.opts = opts;
		this.group = group;
		this.attachment = attachRef(this.opts.ref, (v) => this.group.headingNode = v);
	}
	#props = user_derived(() => ({
		id: this.opts.id.current,
		[commandAttrs["group-heading"]]: "",
		...this.attachment
	}));
	get props() {
		return get(this.#props);
	}
	set props(value) {
		set(this.#props, value);
	}
};
var CommandGroupItemsState = class CommandGroupItemsState {
	static create(opts) {
		return new CommandGroupItemsState(opts, CommandGroupContainerContext.get());
	}
	opts;
	group;
	attachment;
	constructor(opts, group) {
		this.opts = opts;
		this.group = group;
		this.attachment = attachRef(this.opts.ref);
	}
	#props = user_derived(() => ({
		id: this.opts.id.current,
		role: "group",
		[commandAttrs["group-items"]]: "",
		"aria-labelledby": this.group.headingNode?.id ?? void 0,
		...this.attachment
	}));
	get props() {
		return get(this.#props);
	}
	set props(value) {
		set(this.#props, value);
	}
};
var CommandInputState = class CommandInputState {
	static create(opts) {
		return new CommandInputState(opts, CommandRootContext.get());
	}
	opts;
	root;
	attachment;
	#selectedItemId = user_derived(() => {
		const item = this.root.viewportNode?.querySelector(`${COMMAND_ITEM_SELECTOR}[${COMMAND_VALUE_ATTR}="${cssEscape(this.root.opts.value.current)}"]`);
		if (item === void 0 || item === null) return;
		return item.getAttribute("id") ?? void 0;
	});
	constructor(opts, root$4) {
		this.opts = opts;
		this.root = root$4;
		this.attachment = attachRef(this.opts.ref, (v) => this.root.inputNode = v);
		watch(() => this.opts.ref.current, () => {
			const node = this.opts.ref.current;
			if (node && this.opts.autofocus.current) afterSleep(10, () => node.focus());
		});
		watch(() => this.opts.value.current, () => {
			if (this.root.commandState.search !== this.opts.value.current) this.root.setState("search", this.opts.value.current);
		});
	}
	#props = user_derived(() => ({
		id: this.opts.id.current,
		type: "text",
		[commandAttrs.input]: "",
		autocomplete: "off",
		autocorrect: "off",
		spellcheck: false,
		"aria-autocomplete": "list",
		role: "combobox",
		"aria-expanded": boolToStr(true),
		"aria-controls": this.root.viewportNode?.id ?? void 0,
		"aria-labelledby": this.root.labelNode?.id ?? void 0,
		"aria-activedescendant": get(this.#selectedItemId),
		...this.attachment
	}));
	get props() {
		return get(this.#props);
	}
	set props(value) {
		set(this.#props, value);
	}
};
var CommandItemState = class CommandItemState {
	static create(opts) {
		const group = CommandGroupContainerContext.getOr(null);
		return new CommandItemState({
			...opts,
			group
		}, CommandRootContext.get());
	}
	opts;
	root;
	attachment;
	#group = null;
	#trueForceMount = user_derived(() => {
		return this.opts.forceMount.current || this.#group?.opts.forceMount.current === true;
	});
	#shouldRender = user_derived(() => {
		this.opts.ref.current;
		if (get(this.#trueForceMount) || this.root.opts.shouldFilter.current === false || !this.root.commandState.search) return true;
		const currentScore = this.root.commandState.filtered.items.get(this.trueValue);
		if (currentScore === void 0) return false;
		return currentScore > 0;
	});
	get shouldRender() {
		return get(this.#shouldRender);
	}
	set shouldRender(value) {
		set(this.#shouldRender, value);
	}
	#isSelected = user_derived(() => this.root.opts.value.current === this.trueValue && this.trueValue !== "");
	get isSelected() {
		return get(this.#isSelected);
	}
	set isSelected(value) {
		set(this.#isSelected, value);
	}
	#trueValue = state("");
	get trueValue() {
		return get(this.#trueValue);
	}
	set trueValue(value) {
		set(this.#trueValue, value, true);
	}
	constructor(opts, root$4) {
		this.opts = opts;
		this.root = root$4;
		this.#group = CommandGroupContainerContext.getOr(null);
		this.trueValue = opts.value.current;
		this.attachment = attachRef(this.opts.ref);
		watch([
			() => this.trueValue,
			() => this.#group?.trueValue,
			() => this.opts.forceMount.current
		], () => {
			if (this.opts.forceMount.current || !this.trueValue) return;
			return this.root.registerItem(this.trueValue, this.#group?.trueValue);
		});
		watch([() => this.opts.value.current, () => this.opts.ref.current], () => {
			if (this.opts.value.current) this.trueValue = this.opts.value.current;
			else if (this.opts.ref.current?.textContent) this.trueValue = this.opts.ref.current.textContent.trim();
			if (this.trueValue) {
				this.root.registerValue(this.trueValue, opts.keywords.current.map((kw) => kw.trim()));
				this.opts.ref.current?.setAttribute(COMMAND_VALUE_ATTR, this.trueValue);
			}
		});
		this.onclick = this.onclick.bind(this);
		this.onpointermove = this.onpointermove.bind(this);
	}
	#onSelect() {
		if (this.opts.disabled.current) return;
		this.#select();
		this.opts.onSelect?.current();
	}
	#select() {
		if (this.opts.disabled.current) return;
		this.root.setValue(this.trueValue, true);
	}
	onpointermove(_) {
		if (this.opts.disabled.current || this.root.opts.disablePointerSelection.current) return;
		this.#select();
	}
	onclick(_) {
		if (this.opts.disabled.current) return;
		this.#onSelect();
	}
	#props = user_derived(() => ({
		id: this.opts.id.current,
		"aria-disabled": boolToStr(this.opts.disabled.current),
		"aria-selected": boolToStr(this.isSelected),
		"data-disabled": boolToEmptyStrOrUndef(this.opts.disabled.current),
		"data-selected": boolToEmptyStrOrUndef(this.isSelected),
		"data-value": this.trueValue,
		"data-group": this.#group?.trueValue,
		[commandAttrs.item]: "",
		role: "option",
		onpointermove: this.onpointermove,
		onclick: this.onclick,
		...this.attachment
	}));
	get props() {
		return get(this.#props);
	}
	set props(value) {
		set(this.#props, value);
	}
};
var CommandListState = class CommandListState {
	static create(opts) {
		return CommandListContext.set(new CommandListState(opts, CommandRootContext.get()));
	}
	opts;
	root;
	attachment;
	constructor(opts, root$4) {
		this.opts = opts;
		this.root = root$4;
		this.attachment = attachRef(this.opts.ref);
	}
	#props = user_derived(() => ({
		id: this.opts.id.current,
		role: "listbox",
		"aria-label": this.opts.ariaLabel.current,
		[commandAttrs.list]: "",
		...this.attachment
	}));
	get props() {
		return get(this.#props);
	}
	set props(value) {
		set(this.#props, value);
	}
};
var CommandLabelState = class CommandLabelState {
	static create(opts) {
		return new CommandLabelState(opts, CommandRootContext.get());
	}
	opts;
	root;
	attachment;
	constructor(opts, root$4) {
		this.opts = opts;
		this.root = root$4;
		this.attachment = attachRef(this.opts.ref, (v) => this.root.labelNode = v);
	}
	#props = user_derived(() => ({
		id: this.opts.id.current,
		[commandAttrs["input-label"]]: "",
		for: this.opts.for?.current,
		style: srOnlyStyles,
		...this.attachment
	}));
	get props() {
		return get(this.#props);
	}
	set props(value) {
		set(this.#props, value);
	}
};
var root$3 = from_html(`<label><!></label>`);
function _command_label($$anchor, $$props) {
	const uid = props_id();
	push($$props, true);
	let id = prop($$props, "id", 19, () => createId(uid)), ref = prop($$props, "ref", 15, null), restProps = rest_props($$props, [
		"$$slots",
		"$$events",
		"$$legacy",
		"id",
		"ref",
		"children"
	]);
	const labelState = CommandLabelState.create({
		id: boxWith(() => id()),
		ref: boxWith(() => ref(), (v) => ref(v))
	});
	const mergedProps = user_derived(() => mergeProps(restProps, labelState.props));
	var label = root$3();
	attribute_effect(label, () => ({ ...get(mergedProps) }));
	snippet(child(label), () => $$props.children ?? noop);
	reset(label);
	append($$anchor, label);
	pop();
}
var root_3$2 = from_html(`<!> <!>`, 1);
var root_4$1 = from_html(`<div><!> <!></div>`);
function Command$1($$anchor, $$props) {
	const uid = props_id();
	push($$props, true);
	const Label = ($$anchor$1) => {
		_command_label($$anchor$1, {
			children: ($$anchor$2, $$slotProps) => {
				next();
				var text$1 = text();
				template_effect(() => set_text(text$1, label()));
				append($$anchor$2, text$1);
			},
			$$slots: { default: true }
		});
	};
	let id = prop($$props, "id", 19, () => createId(uid)), ref = prop($$props, "ref", 15, null), value = prop($$props, "value", 15, ""), onValueChange = prop($$props, "onValueChange", 3, noop$1), onStateChange = prop($$props, "onStateChange", 3, noop$1), loop = prop($$props, "loop", 3, false), shouldFilter = prop($$props, "shouldFilter", 3, true), filter = prop($$props, "filter", 3, computeCommandScore), label = prop($$props, "label", 3, ""), vimBindings = prop($$props, "vimBindings", 3, true), disablePointerSelection = prop($$props, "disablePointerSelection", 3, false), disableInitialScroll = prop($$props, "disableInitialScroll", 3, false), columns = prop($$props, "columns", 3, null), restProps = rest_props($$props, [
		"$$slots",
		"$$events",
		"$$legacy",
		"id",
		"ref",
		"value",
		"onValueChange",
		"onStateChange",
		"loop",
		"shouldFilter",
		"filter",
		"label",
		"vimBindings",
		"disablePointerSelection",
		"disableInitialScroll",
		"columns",
		"children",
		"child"
	]);
	const rootState = CommandRootState.create({
		id: boxWith(() => id()),
		ref: boxWith(() => ref(), (v) => ref(v)),
		filter: boxWith(() => filter()),
		shouldFilter: boxWith(() => shouldFilter()),
		loop: boxWith(() => loop()),
		value: boxWith(() => value(), (v) => {
			if (value() !== v) {
				value(v);
				onValueChange()(v);
			}
		}),
		vimBindings: boxWith(() => vimBindings()),
		disablePointerSelection: boxWith(() => disablePointerSelection()),
		disableInitialScroll: boxWith(() => disableInitialScroll()),
		onStateChange: boxWith(() => onStateChange()),
		columns: boxWith(() => columns())
	});
	const updateSelectedToIndex = (i) => rootState.updateSelectedToIndex(i);
	const updateSelectedByGroup = (c) => rootState.updateSelectedByGroup(c);
	const updateSelectedByItem = (c) => rootState.updateSelectedByItem(c);
	const getValidItems = () => rootState.getValidItems();
	const mergedProps = user_derived(() => mergeProps(restProps, rootState.props));
	var $$exports = {
		updateSelectedToIndex,
		updateSelectedByGroup,
		updateSelectedByItem,
		getValidItems
	};
	var fragment_2 = comment();
	var node = first_child(fragment_2);
	var consequent = ($$anchor$1) => {
		var fragment_3 = root_3$2();
		var node_1 = first_child(fragment_3);
		Label(node_1);
		snippet(sibling(node_1, 2), () => $$props.child, () => ({ props: get(mergedProps) }));
		append($$anchor$1, fragment_3);
	};
	var alternate = ($$anchor$1) => {
		var div = root_4$1();
		attribute_effect(div, () => ({ ...get(mergedProps) }));
		var node_3 = child(div);
		Label(node_3);
		snippet(sibling(node_3, 2), () => $$props.children ?? noop);
		reset(div);
		append($$anchor$1, div);
	};
	if_block(node, ($$render) => {
		if ($$props.child) $$render(consequent);
		else $$render(alternate, false);
	});
	append($$anchor, fragment_2);
	return pop($$exports);
}
var root_3$1 = from_html(`<div><!></div>`);
function Command_empty$1($$anchor, $$props) {
	const uid = props_id();
	push($$props, true);
	let id = prop($$props, "id", 19, () => createId(uid)), ref = prop($$props, "ref", 15, null), forceMount = prop($$props, "forceMount", 3, false), restProps = rest_props($$props, [
		"$$slots",
		"$$events",
		"$$legacy",
		"id",
		"ref",
		"children",
		"child",
		"forceMount"
	]);
	const emptyState = CommandEmptyState.create({
		id: boxWith(() => id()),
		ref: boxWith(() => ref(), (v) => ref(v)),
		forceMount: boxWith(() => forceMount())
	});
	const mergedProps = user_derived(() => mergeProps(emptyState.props, restProps));
	var fragment = comment();
	var node = first_child(fragment);
	var consequent_1 = ($$anchor$1) => {
		var fragment_1 = comment();
		var node_1 = first_child(fragment_1);
		var consequent = ($$anchor$2) => {
			var fragment_2 = comment();
			snippet(first_child(fragment_2), () => $$props.child, () => ({ props: get(mergedProps) }));
			append($$anchor$2, fragment_2);
		};
		var alternate = ($$anchor$2) => {
			var div = root_3$1();
			attribute_effect(div, () => ({ ...get(mergedProps) }));
			snippet(child(div), () => $$props.children ?? noop);
			reset(div);
			append($$anchor$2, div);
		};
		if_block(node_1, ($$render) => {
			if ($$props.child) $$render(consequent);
			else $$render(alternate, false);
		});
		append($$anchor$1, fragment_1);
	};
	if_block(node, ($$render) => {
		if (emptyState.shouldRender) $$render(consequent_1);
	});
	append($$anchor, fragment);
	pop();
}
var root_2$4 = from_html(`<div><!></div>`);
function Command_group$1($$anchor, $$props) {
	const uid = props_id();
	push($$props, true);
	let id = prop($$props, "id", 19, () => createId(uid)), ref = prop($$props, "ref", 15, null), value = prop($$props, "value", 3, ""), forceMount = prop($$props, "forceMount", 3, false), restProps = rest_props($$props, [
		"$$slots",
		"$$events",
		"$$legacy",
		"id",
		"ref",
		"value",
		"forceMount",
		"children",
		"child"
	]);
	const groupState = CommandGroupContainerState.create({
		id: boxWith(() => id()),
		ref: boxWith(() => ref(), (v) => ref(v)),
		forceMount: boxWith(() => forceMount()),
		value: boxWith(() => value())
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
var root_2$3 = from_html(`<div><!></div>`);
function Command_group_heading($$anchor, $$props) {
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
	const headingState = CommandGroupHeadingState.create({
		id: boxWith(() => id()),
		ref: boxWith(() => ref(), (v) => ref(v))
	});
	const mergedProps = user_derived(() => mergeProps(restProps, headingState.props));
	var fragment = comment();
	var node = first_child(fragment);
	var consequent = ($$anchor$1) => {
		var fragment_1 = comment();
		snippet(first_child(fragment_1), () => $$props.child, () => ({ props: get(mergedProps) }));
		append($$anchor$1, fragment_1);
	};
	var alternate = ($$anchor$1) => {
		var div = root_2$3();
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
var root_2$2 = from_html(`<div><!></div>`);
var root$2 = from_html(`<div style="display: contents;"><!></div>`);
function Command_group_items($$anchor, $$props) {
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
	const groupItemsState = CommandGroupItemsState.create({
		id: boxWith(() => id()),
		ref: boxWith(() => ref(), (v) => ref(v))
	});
	const mergedProps = user_derived(() => mergeProps(restProps, groupItemsState.props));
	var div = root$2();
	var node = child(div);
	var consequent = ($$anchor$1) => {
		var fragment = comment();
		snippet(first_child(fragment), () => $$props.child, () => ({ props: get(mergedProps) }));
		append($$anchor$1, fragment);
	};
	var alternate = ($$anchor$1) => {
		var div_1 = root_2$2();
		attribute_effect(div_1, () => ({ ...get(mergedProps) }));
		snippet(child(div_1), () => $$props.children ?? noop);
		reset(div_1);
		append($$anchor$1, div_1);
	};
	if_block(node, ($$render) => {
		if ($$props.child) $$render(consequent);
		else $$render(alternate, false);
	});
	reset(div);
	append($$anchor, div);
	pop();
}
var root_2$1 = from_html(`<input/>`);
function Command_input$1($$anchor, $$props) {
	const uid = props_id();
	push($$props, true);
	let value = prop($$props, "value", 15, ""), autofocus = prop($$props, "autofocus", 3, false), id = prop($$props, "id", 19, () => createId(uid)), ref = prop($$props, "ref", 15, null), restProps = rest_props($$props, [
		"$$slots",
		"$$events",
		"$$legacy",
		"value",
		"autofocus",
		"id",
		"ref",
		"child"
	]);
	const inputState = CommandInputState.create({
		id: boxWith(() => id()),
		ref: boxWith(() => ref(), (v) => ref(v)),
		value: boxWith(() => value(), (v) => {
			value(v);
		}),
		autofocus: boxWith(() => autofocus() ?? false)
	});
	const mergedProps = user_derived(() => mergeProps(restProps, inputState.props));
	var fragment = comment();
	var node = first_child(fragment);
	var consequent = ($$anchor$1) => {
		var fragment_1 = comment();
		snippet(first_child(fragment_1), () => $$props.child, () => ({ props: get(mergedProps) }));
		append($$anchor$1, fragment_1);
	};
	var alternate = ($$anchor$1) => {
		var input = root_2$1();
		attribute_effect(input, () => ({ ...get(mergedProps) }), void 0, void 0, void 0, void 0, true);
		bind_value(input, value);
		append($$anchor$1, input);
	};
	if_block(node, ($$render) => {
		if ($$props.child) $$render(consequent);
		else $$render(alternate, false);
	});
	append($$anchor, fragment);
	pop();
}
var root_4 = from_html(`<div><!></div>`);
var root_1$1 = from_html(`<div style="display: contents;" data-item-wrapper=""><!></div>`);
function Command_item$1($$anchor, $$props) {
	const uid = props_id();
	push($$props, true);
	let id = prop($$props, "id", 19, () => createId(uid)), ref = prop($$props, "ref", 15, null), value = prop($$props, "value", 3, ""), disabled = prop($$props, "disabled", 3, false), onSelect = prop($$props, "onSelect", 3, noop$1), forceMount = prop($$props, "forceMount", 3, false), keywords = prop($$props, "keywords", 19, () => []), restProps = rest_props($$props, [
		"$$slots",
		"$$events",
		"$$legacy",
		"id",
		"ref",
		"value",
		"disabled",
		"children",
		"child",
		"onSelect",
		"forceMount",
		"keywords"
	]);
	const itemState = CommandItemState.create({
		id: boxWith(() => id()),
		ref: boxWith(() => ref(), (v) => ref(v)),
		value: boxWith(() => value()),
		disabled: boxWith(() => disabled()),
		onSelect: boxWith(() => onSelect()),
		forceMount: boxWith(() => forceMount()),
		keywords: boxWith(() => keywords())
	});
	const mergedProps = user_derived(() => mergeProps(restProps, itemState.props));
	var fragment = comment();
	key(first_child(fragment), () => itemState.root.key, ($$anchor$1) => {
		var div = root_1$1();
		var node_1 = child(div);
		var consequent_1 = ($$anchor$2) => {
			var fragment_1 = comment();
			var node_2 = first_child(fragment_1);
			var consequent = ($$anchor$3) => {
				var fragment_2 = comment();
				snippet(first_child(fragment_2), () => $$props.child, () => ({ props: get(mergedProps) }));
				append($$anchor$3, fragment_2);
			};
			var alternate = ($$anchor$3) => {
				var div_1 = root_4();
				attribute_effect(div_1, () => ({ ...get(mergedProps) }));
				snippet(child(div_1), () => $$props.children ?? noop);
				reset(div_1);
				append($$anchor$3, div_1);
			};
			if_block(node_2, ($$render) => {
				if ($$props.child) $$render(consequent);
				else $$render(alternate, false);
			});
			append($$anchor$2, fragment_1);
		};
		if_block(node_1, ($$render) => {
			if (itemState.shouldRender) $$render(consequent_1);
		});
		reset(div);
		template_effect(() => set_attribute(div, "data-value", itemState.trueValue));
		append($$anchor$1, div);
	});
	append($$anchor, fragment);
	pop();
}
var root_3 = from_html(`<div><!></div>`);
function Command_list$1($$anchor, $$props) {
	const uid = props_id();
	push($$props, true);
	let id = prop($$props, "id", 19, () => createId(uid)), ref = prop($$props, "ref", 15, null), restProps = rest_props($$props, [
		"$$slots",
		"$$events",
		"$$legacy",
		"id",
		"ref",
		"child",
		"children",
		"aria-label"
	]);
	const listState = CommandListState.create({
		id: boxWith(() => id()),
		ref: boxWith(() => ref(), (v) => ref(v)),
		ariaLabel: boxWith(() => $$props["aria-label"] ?? "Suggestions...")
	});
	const mergedProps = user_derived(() => mergeProps(restProps, listState.props));
	var fragment = comment();
	key(first_child(fragment), () => listState.root._commandState.search === "", ($$anchor$1) => {
		var fragment_1 = comment();
		var node_1 = first_child(fragment_1);
		var consequent = ($$anchor$2) => {
			var fragment_2 = comment();
			snippet(first_child(fragment_2), () => $$props.child, () => ({ props: get(mergedProps) }));
			append($$anchor$2, fragment_2);
		};
		var alternate = ($$anchor$2) => {
			var div = root_3();
			attribute_effect(div, () => ({ ...get(mergedProps) }));
			snippet(child(div), () => $$props.children ?? noop);
			reset(div);
			append($$anchor$2, div);
		};
		if_block(node_1, ($$render) => {
			if ($$props.child) $$render(consequent);
			else $$render(alternate, false);
		});
		append($$anchor$1, fragment_1);
	});
	append($$anchor, fragment);
	pop();
}
from_html(`<div><!></div>`);
var SCORE_CONTINUE_MATCH = 1;
var SCORE_SPACE_WORD_JUMP = .9;
var SCORE_NON_SPACE_WORD_JUMP = .8;
var SCORE_CHARACTER_JUMP = .17;
var SCORE_TRANSPOSITION = .1;
var PENALTY_SKIPPED = .999;
var PENALTY_CASE_MISMATCH = .9999;
var PENALTY_NOT_COMPLETE = .99;
var IS_GAP_REGEXP = /[\\/_+.#"@[({&]/;
var COUNT_GAPS_REGEXP = /[\\/_+.#"@[({&]/g;
var IS_SPACE_REGEXP = /[\s-]/;
var COUNT_SPACE_REGEXP = /[\s-]/g;
function computeCommandScoreInner(string, abbreviation, lowerString, lowerAbbreviation, stringIndex, abbreviationIndex, memoizedResults) {
	if (abbreviationIndex === abbreviation.length) {
		if (stringIndex === string.length) return SCORE_CONTINUE_MATCH;
		return PENALTY_NOT_COMPLETE;
	}
	const memoizeKey = `${stringIndex},${abbreviationIndex}`;
	if (memoizedResults[memoizeKey] !== void 0) return memoizedResults[memoizeKey];
	const abbreviationChar = lowerAbbreviation.charAt(abbreviationIndex);
	let index = lowerString.indexOf(abbreviationChar, stringIndex);
	let highScore = 0;
	let score, transposedScore, wordBreaks, spaceBreaks;
	while (index >= 0) {
		score = computeCommandScoreInner(string, abbreviation, lowerString, lowerAbbreviation, index + 1, abbreviationIndex + 1, memoizedResults);
		if (score > highScore) {
			if (index === stringIndex) score *= SCORE_CONTINUE_MATCH;
			else if (IS_GAP_REGEXP.test(string.charAt(index - 1))) {
				score *= SCORE_NON_SPACE_WORD_JUMP;
				wordBreaks = string.slice(stringIndex, index - 1).match(COUNT_GAPS_REGEXP);
				if (wordBreaks && stringIndex > 0) score *= PENALTY_SKIPPED ** wordBreaks.length;
			} else if (IS_SPACE_REGEXP.test(string.charAt(index - 1))) {
				score *= SCORE_SPACE_WORD_JUMP;
				spaceBreaks = string.slice(stringIndex, index - 1).match(COUNT_SPACE_REGEXP);
				if (spaceBreaks && stringIndex > 0) score *= PENALTY_SKIPPED ** spaceBreaks.length;
			} else {
				score *= SCORE_CHARACTER_JUMP;
				if (stringIndex > 0) score *= PENALTY_SKIPPED ** (index - stringIndex);
			}
			if (string.charAt(index) !== abbreviation.charAt(abbreviationIndex)) score *= PENALTY_CASE_MISMATCH;
		}
		if (score < SCORE_TRANSPOSITION && lowerString.charAt(index - 1) === lowerAbbreviation.charAt(abbreviationIndex + 1) || lowerAbbreviation.charAt(abbreviationIndex + 1) === lowerAbbreviation.charAt(abbreviationIndex) && lowerString.charAt(index - 1) !== lowerAbbreviation.charAt(abbreviationIndex)) {
			transposedScore = computeCommandScoreInner(string, abbreviation, lowerString, lowerAbbreviation, index + 1, abbreviationIndex + 2, memoizedResults);
			if (transposedScore * SCORE_TRANSPOSITION > score) score = transposedScore * SCORE_TRANSPOSITION;
		}
		if (score > highScore) highScore = score;
		index = lowerString.indexOf(abbreviationChar, index + 1);
	}
	memoizedResults[memoizeKey] = highScore;
	return highScore;
}
function formatInput(string) {
	return string.toLowerCase().replace(COUNT_SPACE_REGEXP, " ");
}
function computeCommandScore(command, search, commandKeywords) {
	command = commandKeywords && commandKeywords.length > 0 ? `${`${command} ${commandKeywords?.join(" ")}`}` : command;
	return computeCommandScoreInner(command, search, formatInput(command), formatInput(search), 0, 0, {});
}
function Command($$anchor, $$props) {
	push($$props, true);
	let ref = prop($$props, "ref", 15, null), value = prop($$props, "value", 15, ""), restProps = rest_props($$props, [
		"$$slots",
		"$$events",
		"$$legacy",
		"ref",
		"value",
		"class"
	]);
	var fragment = comment();
	var node = first_child(fragment);
	{
		let $0 = user_derived(() => cn("bg-popover text-popover-foreground flex h-full w-full flex-col overflow-hidden rounded-md", $$props.class));
		component(node, () => Command$1, ($$anchor$1, CommandPrimitive_Root) => {
			CommandPrimitive_Root($$anchor$1, spread_props({ get class() {
				return get($0);
			} }, () => restProps, {
				get value() {
					return value();
				},
				set value($$value) {
					value($$value);
				},
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
function Command_empty($$anchor, $$props) {
	push($$props, true);
	prop($$props, "ref", 11, null);
	let restProps = rest_props($$props, [
		"$$slots",
		"$$events",
		"$$legacy",
		"ref",
		"class"
	]);
	var fragment = comment();
	var node = first_child(fragment);
	{
		let $0 = user_derived(() => cn("py-6 text-center text-sm", $$props.class));
		component(node, () => Command_empty$1, ($$anchor$1, CommandPrimitive_Empty) => {
			CommandPrimitive_Empty($$anchor$1, spread_props({ get class() {
				return get($0);
			} }, () => restProps));
		});
	}
	append($$anchor, fragment);
	pop();
}
var root_1 = from_html(`<!> <!>`, 1);
function Command_group($$anchor, $$props) {
	push($$props, true);
	let ref = prop($$props, "ref", 15, null), restProps = rest_props($$props, [
		"$$slots",
		"$$events",
		"$$legacy",
		"ref",
		"class",
		"children",
		"heading",
		"value"
	]);
	var fragment = comment();
	var node = first_child(fragment);
	{
		let $0 = user_derived(() => cn("text-foreground overflow-hidden p-1", $$props.class));
		let $1 = user_derived(() => $$props.value ?? $$props.heading ?? `----${useId()}`);
		component(node, () => Command_group$1, ($$anchor$1, CommandPrimitive_Group) => {
			CommandPrimitive_Group($$anchor$1, spread_props({
				get class() {
					return get($0);
				},
				get value() {
					return get($1);
				}
			}, () => restProps, {
				get ref() {
					return ref();
				},
				set ref($$value) {
					ref($$value);
				},
				children: ($$anchor$2, $$slotProps) => {
					var fragment_1 = root_1();
					var node_1 = first_child(fragment_1);
					var consequent = ($$anchor$3) => {
						var fragment_2 = comment();
						component(first_child(fragment_2), () => Command_group_heading, ($$anchor$4, CommandPrimitive_GroupHeading) => {
							CommandPrimitive_GroupHeading($$anchor$4, {
								class: "text-muted-foreground px-2 py-1.5 text-xs font-medium",
								children: ($$anchor$5, $$slotProps$1) => {
									next();
									var text$1 = text();
									template_effect(() => set_text(text$1, $$props.heading));
									append($$anchor$5, text$1);
								},
								$$slots: { default: true }
							});
						});
						append($$anchor$3, fragment_2);
					};
					if_block(node_1, ($$render) => {
						if ($$props.heading) $$render(consequent);
					});
					component(sibling(node_1, 2), () => Command_group_items, ($$anchor$3, CommandPrimitive_GroupItems) => {
						CommandPrimitive_GroupItems($$anchor$3, { get children() {
							return $$props.children;
						} });
					});
					append($$anchor$2, fragment_1);
				},
				$$slots: { default: true }
			}));
		});
	}
	append($$anchor, fragment);
	pop();
}
function Command_item($$anchor, $$props) {
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
		let $0 = user_derived(() => cn("aria-selected:bg-accent aria-selected:text-accent-foreground relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", $$props.class));
		component(node, () => Command_item$1, ($$anchor$1, CommandPrimitive_Item) => {
			CommandPrimitive_Item($$anchor$1, spread_props({ get class() {
				return get($0);
			} }, () => restProps, {
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
function Search($$anchor, $$props) {
	push($$props, true);
	/**
	* @license @lucide/svelte v0.562.0 - ISC
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
	let props = rest_props($$props, [
		"$$slots",
		"$$events",
		"$$legacy"
	]);
	const iconNode = [["path", { "d": "m21 21-4.34-4.34" }], ["circle", {
		"cx": "11",
		"cy": "11",
		"r": "8"
	}]];
	Icon($$anchor, spread_props({ name: "search" }, () => props, {
		get iconNode() {
			return iconNode;
		},
		children: ($$anchor$1, $$slotProps) => {
			var fragment_1 = comment();
			snippet(first_child(fragment_1), () => $$props.children ?? noop);
			append($$anchor$1, fragment_1);
		},
		$$slots: { default: true }
	}));
	pop();
}
var root$1 = from_html(`<div class="flex items-center border-b px-2" data-command-input-wrapper=""><!> <!></div>`);
function Command_input($$anchor, $$props) {
	push($$props, true);
	let ref = prop($$props, "ref", 15, null), value = prop($$props, "value", 15, ""), restProps = rest_props($$props, [
		"$$slots",
		"$$events",
		"$$legacy",
		"ref",
		"class",
		"value"
	]);
	var div = root$1();
	var node = child(div);
	Search(node, { class: "mr-2 size-4 shrink-0 opacity-50" });
	var node_1 = sibling(node, 2);
	{
		let $0 = user_derived(() => cn("placeholder:text-muted-foreground flex h-11 w-full rounded-md bg-transparent py-3 text-base outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", $$props.class));
		component(node_1, () => Command_input$1, ($$anchor$1, CommandPrimitive_Input) => {
			CommandPrimitive_Input($$anchor$1, spread_props({ get class() {
				return get($0);
			} }, () => restProps, {
				get ref() {
					return ref();
				},
				set ref($$value) {
					ref($$value);
				},
				get value() {
					return value();
				},
				set value($$value) {
					value($$value);
				}
			}));
		});
	}
	reset(div);
	append($$anchor, div);
	pop();
}
function Command_list($$anchor, $$props) {
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
		let $0 = user_derived(() => cn("max-h-[300px] overflow-y-auto overflow-x-hidden", $$props.class));
		component(node, () => Command_list$1, ($$anchor$1, CommandPrimitive_List) => {
			CommandPrimitive_List($$anchor$1, spread_props({ get class() {
				return get($0);
			} }, () => restProps, {
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
from_html(`<span><!></span>`);
export { Command_empty as a, Command_group as i, Command_input as n, Command as o, Command_item as r, Command_list as t };
