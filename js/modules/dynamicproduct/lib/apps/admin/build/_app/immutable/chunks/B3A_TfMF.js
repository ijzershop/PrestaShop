import { Ct as set, Ft as push, G as if_block, J as unmount, Jt as false_default, K as mount, Kt as noop, Ot as user_derived, Pt as pop, R as snippet, Tt as state, W as key, X as comment, Y as append, Yt as true_default, ct as tick, dt as effect_root, jt as getAllContexts, mt as user_effect, o as prop, ot as get, rt as on, xt as proxy, yt as first_child } from "./DUscB9kS.js";
import { n as SvelteMap } from "./CJDS8lnd.js";
import { C as simpleBox, S as isWritableSymbol, T as isObject, _ as boxFlatten, b as isBox, d as mergeProps, g as BoxSymbol, h as composeHandlers, l as getDataOpenClosed, n as boolToEmptyStrOrUndef, o as createBitsAttrs, p as executeCallbacks, r as boolToStr, u as attachRef, v as boxFrom, w as toReadonlyBox, x as isWritableBox, y as boxWith } from "./B4l8ufIa.js";
import { C as HOME, E as PAGE_UP, O as SPACE, R as watch, T as PAGE_DOWN, a as ARROW_UP, c as END, i as ARROW_RIGHT, k as TAB, l as ENTER, n as ARROW_DOWN, r as ARROW_LEFT, u as ESCAPE, z as Context } from "./_yKPJ4BA.js";
import { c as isElementOrSVGElement, f as isSelectableInput, l as isHTMLElement$1, o as isBrowser, r as getNextMatch, s as isElement, u as isIOS } from "./9DgZZMlb.js";
import { t as noop$1 } from "./BoWJNiZV.js";
function box(initialValue) {
	let current = state(proxy(initialValue));
	return {
		[BoxSymbol]: true,
		[isWritableSymbol]: true,
		get current() {
			return get(current);
		},
		set current(v) {
			set(current, v, true);
		}
	};
}
box.from = boxFrom;
box.with = boxWith;
box.flatten = boxFlatten;
box.readonly = toReadonlyBox;
box.isBox = isBox;
box.isWritableBox = isWritableBox;
function onDestroyEffect(fn) {
	user_effect(() => {
		return () => {
			fn();
		};
	});
}
function afterSleep(ms, cb) {
	return setTimeout(cb, ms);
}
function afterTick(fn) {
	tick().then(fn);
}
var ELEMENT_NODE = 1;
var DOCUMENT_NODE = 9;
var DOCUMENT_FRAGMENT_NODE = 11;
function isHTMLElement(node) {
	return isObject(node) && node.nodeType === ELEMENT_NODE && typeof node.nodeName === "string";
}
function isDocument(node) {
	return isObject(node) && node.nodeType === DOCUMENT_NODE;
}
function isWindow(node) {
	return isObject(node) && node.constructor?.name === "VisualViewport";
}
function isNode(node) {
	return isObject(node) && node.nodeType !== void 0;
}
function isShadowRoot(node) {
	return isNode(node) && node.nodeType === DOCUMENT_FRAGMENT_NODE && "host" in node;
}
function contains(parent, child) {
	if (!parent || !child) return false;
	if (!isHTMLElement(parent) || !isHTMLElement(child)) return false;
	const rootNode = child.getRootNode?.();
	if (parent === child) return true;
	if (parent.contains(child)) return true;
	if (rootNode && isShadowRoot(rootNode)) {
		let next = child;
		while (next) {
			if (parent === next) return true;
			next = next.parentNode || next.host;
		}
	}
	return false;
}
function getDocument(node) {
	if (isDocument(node)) return node;
	if (isWindow(node)) return node.document;
	return node?.ownerDocument ?? document;
}
function getWindow(node) {
	if (isShadowRoot(node)) return getWindow(node.host);
	if (isDocument(node)) return node.defaultView ?? window;
	if (isHTMLElement(node)) return node.ownerDocument?.defaultView ?? window;
	return window;
}
function getActiveElement(rootNode) {
	let activeElement = rootNode.activeElement;
	while (activeElement?.shadowRoot) {
		const el = activeElement.shadowRoot.activeElement;
		if (el === activeElement) break;
		else activeElement = el;
	}
	return activeElement;
}
var DOMContext = class {
	element;
	#root = user_derived(() => {
		if (!this.element.current) return document;
		return this.element.current.getRootNode() ?? document;
	});
	get root() {
		return get(this.#root);
	}
	set root(value) {
		set(this.#root, value);
	}
	constructor(element) {
		if (typeof element === "function") this.element = boxWith(element);
		else this.element = element;
	}
	getDocument = () => {
		return getDocument(this.root);
	};
	getWindow = () => {
		return this.getDocument().defaultView ?? window;
	};
	getActiveElement = () => {
		return getActiveElement(this.root);
	};
	isActiveElement = (node) => {
		return node === this.getActiveElement();
	};
	getElementById(id) {
		return this.root.getElementById(id);
	}
	querySelector = (selector) => {
		if (!this.root) return null;
		return this.root.querySelector(selector);
	};
	querySelectorAll = (selector) => {
		if (!this.root) return [];
		return this.root.querySelectorAll(selector);
	};
	setTimeout = (callback, delay) => {
		return this.getWindow().setTimeout(callback, delay);
	};
	clearTimeout = (timeoutId) => {
		return this.getWindow().clearTimeout(timeoutId);
	};
};
function getElemDirection(elem) {
	return window.getComputedStyle(elem).getPropertyValue("direction");
}
const FIRST_KEYS$1 = [
	ARROW_DOWN,
	PAGE_UP,
	HOME
];
const LAST_KEYS$1 = [
	ARROW_UP,
	PAGE_DOWN,
	"End"
];
[...FIRST_KEYS$1, ...LAST_KEYS$1];
function getNextKey(dir = "ltr", orientation = "horizontal") {
	return {
		horizontal: dir === "rtl" ? ARROW_LEFT : ARROW_RIGHT,
		vertical: ARROW_DOWN
	}[orientation];
}
function getPrevKey(dir = "ltr", orientation = "horizontal") {
	return {
		horizontal: dir === "rtl" ? ARROW_RIGHT : ARROW_LEFT,
		vertical: ARROW_UP
	}[orientation];
}
function getDirectionalKeys(dir = "ltr", orientation = "horizontal") {
	if (!["ltr", "rtl"].includes(dir)) dir = "ltr";
	if (!["horizontal", "vertical"].includes(orientation)) orientation = "horizontal";
	return {
		nextKey: getNextKey(dir, orientation),
		prevKey: getPrevKey(dir, orientation)
	};
}
var RovingFocusGroup = class {
	#opts;
	#currentTabStopId = box(null);
	constructor(opts) {
		this.#opts = opts;
	}
	getCandidateNodes() {
		if (!this.#opts.rootNode.current) return [];
		if (this.#opts.candidateSelector) return Array.from(this.#opts.rootNode.current.querySelectorAll(this.#opts.candidateSelector));
		else if (this.#opts.candidateAttr) return Array.from(this.#opts.rootNode.current.querySelectorAll(`[${this.#opts.candidateAttr}]:not([data-disabled])`));
		return [];
	}
	focusFirstCandidate() {
		const items = this.getCandidateNodes();
		if (!items.length) return;
		items[0]?.focus();
	}
	handleKeydown(node, e, both = false) {
		const rootNode = this.#opts.rootNode.current;
		if (!rootNode || !node) return;
		const items = this.getCandidateNodes();
		if (!items.length) return;
		const currentIndex = items.indexOf(node);
		const { nextKey, prevKey } = getDirectionalKeys(getElemDirection(rootNode), this.#opts.orientation.current);
		const loop = this.#opts.loop.current;
		const keyToIndex = {
			[nextKey]: currentIndex + 1,
			[prevKey]: currentIndex - 1,
			[HOME]: 0,
			["End"]: items.length - 1
		};
		if (both) {
			const altNextKey = nextKey === "ArrowDown" ? ARROW_RIGHT : ARROW_DOWN;
			const altPrevKey = prevKey === "ArrowUp" ? ARROW_LEFT : ARROW_UP;
			keyToIndex[altNextKey] = currentIndex + 1;
			keyToIndex[altPrevKey] = currentIndex - 1;
		}
		let itemIndex = keyToIndex[e.key];
		if (itemIndex === void 0) return;
		e.preventDefault();
		if (itemIndex < 0 && loop) itemIndex = items.length - 1;
		else if (itemIndex === items.length && loop) itemIndex = 0;
		const itemToFocus = items[itemIndex];
		if (!itemToFocus) return;
		itemToFocus.focus();
		this.#currentTabStopId.current = itemToFocus.id;
		this.#opts.onCandidateFocus?.(itemToFocus);
		return itemToFocus;
	}
	getTabIndex(node) {
		const items = this.getCandidateNodes();
		const anyActive = this.#currentTabStopId.current !== null;
		if (node && !anyActive && items[0] === node) {
			this.#currentTabStopId.current = node.id;
			return 0;
		} else if (node?.id === this.#currentTabStopId.current) return 0;
		return -1;
	}
	setCurrentTabStopId(id) {
		this.#currentTabStopId.current = id;
	}
	focusCurrentTabStop() {
		const currentTabStopId = this.#currentTabStopId.current;
		if (!currentTabStopId) return;
		const currentTabStop = this.#opts.rootNode.current?.querySelector(`#${currentTabStopId}`);
		if (!currentTabStop || !isHTMLElement$1(currentTabStop)) return;
		currentTabStop.focus();
	}
};
var AnimationsComplete = class {
	#opts;
	#currentFrame = null;
	constructor(opts) {
		this.#opts = opts;
		onDestroyEffect(() => this.#cleanup());
	}
	#cleanup() {
		if (!this.#currentFrame) return;
		window.cancelAnimationFrame(this.#currentFrame);
		this.#currentFrame = null;
	}
	run(fn) {
		this.#cleanup();
		const node = this.#opts.ref.current;
		if (!node) return;
		if (typeof node.getAnimations !== "function") {
			this.#executeCallback(fn);
			return;
		}
		this.#currentFrame = window.requestAnimationFrame(() => {
			const animations = node.getAnimations();
			if (animations.length === 0) {
				this.#executeCallback(fn);
				return;
			}
			Promise.allSettled(animations.map((animation) => animation.finished)).then(() => {
				this.#executeCallback(fn);
			});
		});
	}
	#executeCallback(fn) {
		const execute = () => {
			fn();
		};
		if (this.#opts.afterTick) afterTick(execute);
		else execute();
	}
};
var PresenceManager = class {
	#opts;
	#enabled;
	#afterAnimations;
	#shouldRender = state(false);
	constructor(opts) {
		this.#opts = opts;
		set(this.#shouldRender, opts.open.current, true);
		this.#enabled = opts.enabled ?? true;
		this.#afterAnimations = new AnimationsComplete({
			ref: this.#opts.ref,
			afterTick: this.#opts.open
		});
		watch(() => this.#opts.open.current, (isOpen) => {
			if (isOpen) set(this.#shouldRender, true);
			if (!this.#enabled) return;
			this.#afterAnimations.run(() => {
				if (isOpen === this.#opts.open.current) {
					if (!this.#opts.open.current) set(this.#shouldRender, false);
					this.#opts.onComplete?.();
				}
			});
		});
	}
	get shouldRender() {
		return get(this.#shouldRender);
	}
};
function Portal_consumer($$anchor, $$props) {
	var fragment = comment();
	key(first_child(fragment), () => $$props.children, ($$anchor$1) => {
		var fragment_1 = comment();
		snippet(first_child(fragment_1), () => $$props.children ?? noop);
		append($$anchor$1, fragment_1);
	});
	append($$anchor, fragment);
}
const BitsConfigContext = new Context("BitsConfig");
function getBitsConfig() {
	const fallback = new BitsConfigState(null, {});
	return BitsConfigContext.getOr(fallback).opts;
}
var BitsConfigState = class {
	opts;
	constructor(parent, opts) {
		const resolveConfigOption = createConfigResolver(parent, opts);
		this.opts = {
			defaultPortalTo: resolveConfigOption((config) => config.defaultPortalTo),
			defaultLocale: resolveConfigOption((config) => config.defaultLocale)
		};
	}
};
function createConfigResolver(parent, currentOpts) {
	return (getter) => {
		return boxWith(() => {
			const value = getter(currentOpts)?.current;
			if (value !== void 0) return value;
			if (parent === null) return void 0;
			return getter(parent.opts)?.current;
		});
	};
}
function createPropResolver(configOption, fallback) {
	return (getProp) => {
		const config = getBitsConfig();
		return boxWith(() => {
			const propValue = getProp();
			if (propValue !== void 0) return propValue;
			const option = configOption(config).current;
			if (option !== void 0) return option;
			return fallback;
		});
	};
}
createPropResolver((config) => config.defaultLocale, "en");
const resolvePortalToProp = createPropResolver((config) => config.defaultPortalTo, "body");
function Portal($$anchor, $$props) {
	push($$props, true);
	const to = resolvePortalToProp(() => $$props.to);
	const context = getAllContexts();
	let target = user_derived(getTarget);
	function getTarget() {
		if (!isBrowser || $$props.disabled) return null;
		let localTarget = null;
		if (typeof to.current === "string") localTarget = document.querySelector(to.current);
		else localTarget = to.current;
		return localTarget;
	}
	let instance;
	function unmountInstance() {
		if (instance) {
			unmount(instance);
			instance = null;
		}
	}
	watch([() => get(target), () => $$props.disabled], ([target$1, disabled]) => {
		if (!target$1 || disabled) {
			unmountInstance();
			return;
		}
		instance = mount(Portal_consumer, {
			target: target$1,
			props: { children: $$props.children },
			context
		});
		return () => {
			unmountInstance();
		};
	});
	var fragment = comment();
	var node = first_child(fragment);
	var consequent = ($$anchor$1) => {
		var fragment_1 = comment();
		snippet(first_child(fragment_1), () => $$props.children ?? noop);
		append($$anchor$1, fragment_1);
	};
	if_block(node, ($$render) => {
		if ($$props.disabled) $$render(consequent);
	});
	append($$anchor, fragment);
	pop();
}
var CustomEventDispatcher = class {
	eventName;
	options;
	constructor(eventName, options = {
		bubbles: true,
		cancelable: true
	}) {
		this.eventName = eventName;
		this.options = options;
	}
	createEvent(detail) {
		return new CustomEvent(this.eventName, {
			...this.options,
			detail
		});
	}
	dispatch(element, detail) {
		const event = this.createEvent(detail);
		element.dispatchEvent(event);
		return event;
	}
	listen(element, callback, options) {
		const handler = (event) => {
			callback(event);
		};
		return on(element, this.eventName, handler, options);
	}
};
function debounce(fn, wait = 500) {
	let timeout = null;
	const debounced = (...args) => {
		if (timeout !== null) clearTimeout(timeout);
		timeout = setTimeout(() => {
			fn(...args);
		}, wait);
	};
	debounced.destroy = () => {
		if (timeout !== null) {
			clearTimeout(timeout);
			timeout = null;
		}
	};
	return debounced;
}
function isOrContainsTarget(node, target) {
	return node === target || node.contains(target);
}
function getOwnerDocument(el) {
	return el?.ownerDocument ?? document;
}
function getFirstNonCommentChild(element) {
	if (!element) return null;
	for (const child of element.childNodes) if (child.nodeType !== Node.COMMENT_NODE) return child;
	return null;
}
function isClickTrulyOutside(event, contentNode) {
	const { clientX, clientY } = event;
	const rect = contentNode.getBoundingClientRect();
	return clientX < rect.left || clientX > rect.right || clientY < rect.top || clientY > rect.bottom;
}
const SELECTION_KEYS = [ENTER, " "];
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
[...SELECTION_KEYS], [...SELECTION_KEYS];
function isMouseEvent(event) {
	return event.pointerType === "mouse";
}
function focus(element, { select = false } = {}) {
	if (!element || !element.focus) return;
	const doc = getDocument(element);
	if (doc.activeElement === element) return;
	const previouslyFocusedElement = doc.activeElement;
	element.focus({ preventScroll: true });
	if (element !== previouslyFocusedElement && isSelectableInput(element) && select) element.select();
}
function focusFirst(candidates, { select = false } = {}, getActiveElement$1) {
	const previouslyFocusedElement = getActiveElement$1();
	for (const candidate of candidates) {
		focus(candidate, { select });
		if (getActiveElement$1() !== previouslyFocusedElement) return true;
	}
}
var candidateSelectors = [
	"input:not([inert]):not([inert] *)",
	"select:not([inert]):not([inert] *)",
	"textarea:not([inert]):not([inert] *)",
	"a[href]:not([inert]):not([inert] *)",
	"button:not([inert]):not([inert] *)",
	"[tabindex]:not(slot):not([inert]):not([inert] *)",
	"audio[controls]:not([inert]):not([inert] *)",
	"video[controls]:not([inert]):not([inert] *)",
	"[contenteditable]:not([contenteditable=\"false\"]):not([inert]):not([inert] *)",
	"details>summary:first-of-type:not([inert]):not([inert] *)",
	"details:not([inert]):not([inert] *)"
];
var candidateSelector = /* @__PURE__ */ candidateSelectors.join(",");
var NoElement = typeof Element === "undefined";
var matches = NoElement ? function() {} : Element.prototype.matches || Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
var getRootNode = !NoElement && Element.prototype.getRootNode ? function(element) {
	var _element$getRootNode;
	return element === null || element === void 0 ? void 0 : (_element$getRootNode = element.getRootNode) === null || _element$getRootNode === void 0 ? void 0 : _element$getRootNode.call(element);
} : function(element) {
	return element === null || element === void 0 ? void 0 : element.ownerDocument;
};
var _isInert = function isInert(node, lookUp) {
	var _node$getAttribute;
	if (lookUp === void 0) lookUp = true;
	var inertAtt = node === null || node === void 0 ? void 0 : (_node$getAttribute = node.getAttribute) === null || _node$getAttribute === void 0 ? void 0 : _node$getAttribute.call(node, "inert");
	return inertAtt === "" || inertAtt === "true" || lookUp && node && (typeof node.closest === "function" ? node.closest("[inert]") : _isInert(node.parentNode));
};
var isContentEditable = function isContentEditable$1(node) {
	var _node$getAttribute2;
	var attValue = node === null || node === void 0 ? void 0 : (_node$getAttribute2 = node.getAttribute) === null || _node$getAttribute2 === void 0 ? void 0 : _node$getAttribute2.call(node, "contenteditable");
	return attValue === "" || attValue === "true";
};
var getCandidates = function getCandidates$1(el, includeContainer, filter) {
	if (_isInert(el)) return [];
	var candidates = Array.prototype.slice.apply(el.querySelectorAll(candidateSelector));
	if (includeContainer && matches.call(el, candidateSelector)) candidates.unshift(el);
	candidates = candidates.filter(filter);
	return candidates;
};
var _getCandidatesIteratively = function getCandidatesIteratively(elements, includeContainer, options) {
	var candidates = [];
	var elementsToCheck = Array.from(elements);
	while (elementsToCheck.length) {
		var element = elementsToCheck.shift();
		if (_isInert(element, false)) continue;
		if (element.tagName === "SLOT") {
			var assigned = element.assignedElements();
			var nestedCandidates = _getCandidatesIteratively(assigned.length ? assigned : element.children, true, options);
			if (options.flatten) candidates.push.apply(candidates, nestedCandidates);
			else candidates.push({
				scopeParent: element,
				candidates: nestedCandidates
			});
		} else {
			if (matches.call(element, candidateSelector) && options.filter(element) && (includeContainer || !elements.includes(element))) candidates.push(element);
			var shadowRoot = element.shadowRoot || typeof options.getShadowRoot === "function" && options.getShadowRoot(element);
			var validShadowRoot = !_isInert(shadowRoot, false) && (!options.shadowRootFilter || options.shadowRootFilter(element));
			if (shadowRoot && validShadowRoot) {
				var _nestedCandidates = _getCandidatesIteratively(shadowRoot === true ? element.children : shadowRoot.children, true, options);
				if (options.flatten) candidates.push.apply(candidates, _nestedCandidates);
				else candidates.push({
					scopeParent: element,
					candidates: _nestedCandidates
				});
			} else elementsToCheck.unshift.apply(elementsToCheck, element.children);
		}
	}
	return candidates;
};
var hasTabIndex = function hasTabIndex$1(node) {
	return !isNaN(parseInt(node.getAttribute("tabindex"), 10));
};
var getTabIndex = function getTabIndex$1(node) {
	if (!node) throw new Error("No node provided");
	if (node.tabIndex < 0) {
		if ((/^(AUDIO|VIDEO|DETAILS)$/.test(node.tagName) || isContentEditable(node)) && !hasTabIndex(node)) return 0;
	}
	return node.tabIndex;
};
var getSortOrderTabIndex = function getSortOrderTabIndex$1(node, isScope) {
	var tabIndex = getTabIndex(node);
	if (tabIndex < 0 && isScope && !hasTabIndex(node)) return 0;
	return tabIndex;
};
var sortOrderedTabbables = function sortOrderedTabbables$1(a, b) {
	return a.tabIndex === b.tabIndex ? a.documentOrder - b.documentOrder : a.tabIndex - b.tabIndex;
};
var isInput = function isInput$1(node) {
	return node.tagName === "INPUT";
};
var isHiddenInput = function isHiddenInput$1(node) {
	return isInput(node) && node.type === "hidden";
};
var isDetailsWithSummary = function isDetailsWithSummary$1(node) {
	return node.tagName === "DETAILS" && Array.prototype.slice.apply(node.children).some(function(child) {
		return child.tagName === "SUMMARY";
	});
};
var getCheckedRadio = function getCheckedRadio$1(nodes, form) {
	for (var i = 0; i < nodes.length; i++) if (nodes[i].checked && nodes[i].form === form) return nodes[i];
};
var isTabbableRadio = function isTabbableRadio$1(node) {
	if (!node.name) return true;
	var radioScope = node.form || getRootNode(node);
	var queryRadios = function queryRadios$1(name) {
		return radioScope.querySelectorAll("input[type=\"radio\"][name=\"" + name + "\"]");
	};
	var radioSet;
	if (typeof window !== "undefined" && typeof window.CSS !== "undefined" && typeof window.CSS.escape === "function") radioSet = queryRadios(window.CSS.escape(node.name));
	else try {
		radioSet = queryRadios(node.name);
	} catch (err) {
		console.error("Looks like you have a radio button with a name attribute containing invalid CSS selector characters and need the CSS.escape polyfill: %s", err.message);
		return false;
	}
	var checked = getCheckedRadio(radioSet, node.form);
	return !checked || checked === node;
};
var isRadio = function isRadio$1(node) {
	return isInput(node) && node.type === "radio";
};
var isNonTabbableRadio = function isNonTabbableRadio$1(node) {
	return isRadio(node) && !isTabbableRadio(node);
};
var isNodeAttached = function isNodeAttached$1(node) {
	var _nodeRoot;
	var nodeRoot = node && getRootNode(node);
	var nodeRootHost = (_nodeRoot = nodeRoot) === null || _nodeRoot === void 0 ? void 0 : _nodeRoot.host;
	var attached = false;
	if (nodeRoot && nodeRoot !== node) {
		var _nodeRootHost, _nodeRootHost$ownerDo, _node$ownerDocument;
		attached = !!((_nodeRootHost = nodeRootHost) !== null && _nodeRootHost !== void 0 && (_nodeRootHost$ownerDo = _nodeRootHost.ownerDocument) !== null && _nodeRootHost$ownerDo !== void 0 && _nodeRootHost$ownerDo.contains(nodeRootHost) || node !== null && node !== void 0 && (_node$ownerDocument = node.ownerDocument) !== null && _node$ownerDocument !== void 0 && _node$ownerDocument.contains(node));
		while (!attached && nodeRootHost) {
			var _nodeRoot2, _nodeRootHost2, _nodeRootHost2$ownerD;
			nodeRoot = getRootNode(nodeRootHost);
			nodeRootHost = (_nodeRoot2 = nodeRoot) === null || _nodeRoot2 === void 0 ? void 0 : _nodeRoot2.host;
			attached = !!((_nodeRootHost2 = nodeRootHost) !== null && _nodeRootHost2 !== void 0 && (_nodeRootHost2$ownerD = _nodeRootHost2.ownerDocument) !== null && _nodeRootHost2$ownerD !== void 0 && _nodeRootHost2$ownerD.contains(nodeRootHost));
		}
	}
	return attached;
};
var isZeroArea = function isZeroArea$1(node) {
	var _node$getBoundingClie = node.getBoundingClientRect(), width = _node$getBoundingClie.width, height = _node$getBoundingClie.height;
	return width === 0 && height === 0;
};
var isHidden = function isHidden$1(node, _ref) {
	var displayCheck = _ref.displayCheck, getShadowRoot = _ref.getShadowRoot;
	if (displayCheck === "full-native") {
		if ("checkVisibility" in node) return !node.checkVisibility({
			checkOpacity: false,
			opacityProperty: false,
			contentVisibilityAuto: true,
			visibilityProperty: true,
			checkVisibilityCSS: true
		});
	}
	if (getComputedStyle(node).visibility === "hidden") return true;
	var nodeUnderDetails = matches.call(node, "details>summary:first-of-type") ? node.parentElement : node;
	if (matches.call(nodeUnderDetails, "details:not([open]) *")) return true;
	if (!displayCheck || displayCheck === "full" || displayCheck === "full-native" || displayCheck === "legacy-full") {
		if (typeof getShadowRoot === "function") {
			var originalNode = node;
			while (node) {
				var parentElement = node.parentElement;
				var rootNode = getRootNode(node);
				if (parentElement && !parentElement.shadowRoot && getShadowRoot(parentElement) === true) return isZeroArea(node);
				else if (node.assignedSlot) node = node.assignedSlot;
				else if (!parentElement && rootNode !== node.ownerDocument) node = rootNode.host;
				else node = parentElement;
			}
			node = originalNode;
		}
		if (isNodeAttached(node)) return !node.getClientRects().length;
		if (displayCheck !== "legacy-full") return true;
	} else if (displayCheck === "non-zero-area") return isZeroArea(node);
	return false;
};
var isDisabledFromFieldset = function isDisabledFromFieldset$1(node) {
	if (/^(INPUT|BUTTON|SELECT|TEXTAREA)$/.test(node.tagName)) {
		var parentNode = node.parentElement;
		while (parentNode) {
			if (parentNode.tagName === "FIELDSET" && parentNode.disabled) {
				for (var i = 0; i < parentNode.children.length; i++) {
					var child = parentNode.children.item(i);
					if (child.tagName === "LEGEND") return matches.call(parentNode, "fieldset[disabled] *") ? true : !child.contains(node);
				}
				return true;
			}
			parentNode = parentNode.parentElement;
		}
	}
	return false;
};
var isNodeMatchingSelectorFocusable = function isNodeMatchingSelectorFocusable$1(options, node) {
	if (node.disabled || isHiddenInput(node) || isHidden(node, options) || isDetailsWithSummary(node) || isDisabledFromFieldset(node)) return false;
	return true;
};
var isNodeMatchingSelectorTabbable = function isNodeMatchingSelectorTabbable$1(options, node) {
	if (isNonTabbableRadio(node) || getTabIndex(node) < 0 || !isNodeMatchingSelectorFocusable(options, node)) return false;
	return true;
};
var isShadowRootTabbable = function isShadowRootTabbable$1(shadowHostNode) {
	var tabIndex = parseInt(shadowHostNode.getAttribute("tabindex"), 10);
	if (isNaN(tabIndex) || tabIndex >= 0) return true;
	return false;
};
var _sortByOrder = function sortByOrder(candidates) {
	var regularTabbables = [];
	var orderedTabbables = [];
	candidates.forEach(function(item, i) {
		var isScope = !!item.scopeParent;
		var element = isScope ? item.scopeParent : item;
		var candidateTabindex = getSortOrderTabIndex(element, isScope);
		var elements = isScope ? _sortByOrder(item.candidates) : element;
		if (candidateTabindex === 0) isScope ? regularTabbables.push.apply(regularTabbables, elements) : regularTabbables.push(element);
		else orderedTabbables.push({
			documentOrder: i,
			tabIndex: candidateTabindex,
			item,
			isScope,
			content: elements
		});
	});
	return orderedTabbables.sort(sortOrderedTabbables).reduce(function(acc, sortable) {
		sortable.isScope ? acc.push.apply(acc, sortable.content) : acc.push(sortable.content);
		return acc;
	}, []).concat(regularTabbables);
};
var tabbable = function tabbable$1(container, options) {
	options = options || {};
	var candidates;
	if (options.getShadowRoot) candidates = _getCandidatesIteratively([container], options.includeContainer, {
		filter: isNodeMatchingSelectorTabbable.bind(null, options),
		flatten: false,
		getShadowRoot: options.getShadowRoot,
		shadowRootFilter: isShadowRootTabbable
	});
	else candidates = getCandidates(container, options.includeContainer, isNodeMatchingSelectorTabbable.bind(null, options));
	return _sortByOrder(candidates);
};
var focusable = function focusable$1(container, options) {
	options = options || {};
	var candidates;
	if (options.getShadowRoot) candidates = _getCandidatesIteratively([container], options.includeContainer, {
		filter: isNodeMatchingSelectorFocusable.bind(null, options),
		flatten: true,
		getShadowRoot: options.getShadowRoot
	});
	else candidates = getCandidates(container, options.includeContainer, isNodeMatchingSelectorFocusable.bind(null, options));
	return candidates;
};
var isTabbable = function isTabbable$1(node, options) {
	options = options || {};
	if (!node) throw new Error("No node provided");
	if (matches.call(node, candidateSelector) === false) return false;
	return isNodeMatchingSelectorTabbable(options, node);
};
var focusableCandidateSelector = /* @__PURE__ */ candidateSelectors.concat("iframe:not([inert]):not([inert] *)").join(",");
var isFocusable = function isFocusable$1(node, options) {
	options = options || {};
	if (!node) throw new Error("No node provided");
	if (matches.call(node, focusableCandidateSelector) === false) return false;
	return isNodeMatchingSelectorFocusable(options, node);
};
function getTabbableOptions() {
	return {
		getShadowRoot: true,
		displayCheck: typeof ResizeObserver === "function" && ResizeObserver.toString().includes("[native code]") ? "full" : "none"
	};
}
function getTabbableFrom(currentNode, direction) {
	if (!isTabbable(currentNode, getTabbableOptions())) return getTabbableFromFocusable(currentNode, direction);
	const doc = getDocument(currentNode);
	const allTabbable = tabbable(doc.body, getTabbableOptions());
	if (direction === "prev") allTabbable.reverse();
	const activeIndex = allTabbable.indexOf(currentNode);
	if (activeIndex === -1) return doc.body;
	return allTabbable.slice(activeIndex + 1)[0];
}
function getTabbableFromFocusable(currentNode, direction) {
	const doc = getDocument(currentNode);
	if (!isFocusable(currentNode, getTabbableOptions())) return doc.body;
	const allFocusable = focusable(doc.body, getTabbableOptions());
	if (direction === "prev") allFocusable.reverse();
	const activeIndex = allFocusable.indexOf(currentNode);
	if (activeIndex === -1) return doc.body;
	return allFocusable.slice(activeIndex + 1).find((node) => isTabbable(node, getTabbableOptions())) ?? doc.body;
}
var defaultOptions = {
	afterMs: 1e4,
	onChange: noop$1
};
function boxAutoReset(defaultValue, options) {
	const { afterMs, onChange, getWindow: getWindow$1 } = {
		...defaultOptions,
		...options
	};
	let timeout = null;
	let value = state(proxy(defaultValue));
	function resetAfter() {
		return getWindow$1().setTimeout(() => {
			set(value, defaultValue, true);
			onChange?.(defaultValue);
		}, afterMs);
	}
	user_effect(() => {
		return () => {
			if (timeout) getWindow$1().clearTimeout(timeout);
		};
	});
	return boxWith(() => get(value), (v) => {
		set(value, v, true);
		onChange?.(v);
		if (timeout) getWindow$1().clearTimeout(timeout);
		timeout = resetAfter();
	});
}
var DOMTypeahead = class {
	#opts;
	#search;
	#onMatch = user_derived(() => {
		if (this.#opts.onMatch) return this.#opts.onMatch;
		return (node) => node.focus();
	});
	#getCurrentItem = user_derived(() => {
		if (this.#opts.getCurrentItem) return this.#opts.getCurrentItem;
		return this.#opts.getActiveElement;
	});
	constructor(opts) {
		this.#opts = opts;
		this.#search = boxAutoReset("", {
			afterMs: 1e3,
			getWindow: opts.getWindow
		});
		this.handleTypeaheadSearch = this.handleTypeaheadSearch.bind(this);
		this.resetTypeahead = this.resetTypeahead.bind(this);
	}
	handleTypeaheadSearch(key$1, candidates) {
		if (!candidates.length) return;
		this.#search.current = this.#search.current + key$1;
		const currentItem = get(this.#getCurrentItem)();
		const currentMatch = candidates.find((item) => item === currentItem)?.textContent?.trim() ?? "";
		const nextMatch = getNextMatch(candidates.map((item) => item.textContent?.trim() ?? ""), this.#search.current, currentMatch);
		const newItem = candidates.find((item) => item.textContent?.trim() === nextMatch);
		if (newItem) get(this.#onMatch)(newItem);
		return newItem;
	}
	resetTypeahead() {
		this.#search.current = "";
	}
	get search() {
		return this.#search.current;
	}
};
var GraceArea = class {
	#opts;
	#enabled;
	#isPointerInTransit;
	#pointerGraceArea = state(null);
	constructor(opts) {
		this.#opts = opts;
		this.#enabled = user_derived(() => this.#opts.enabled());
		this.#isPointerInTransit = boxAutoReset(false, {
			afterMs: opts.transitTimeout ?? 300,
			onChange: (value) => {
				if (!get(this.#enabled)) return;
				this.#opts.setIsPointerInTransit?.(value);
			},
			getWindow: () => getWindow(this.#opts.triggerNode())
		});
		watch([
			opts.triggerNode,
			opts.contentNode,
			opts.enabled
		], ([triggerNode, contentNode, enabled]) => {
			if (!triggerNode || !contentNode || !enabled) return;
			const handleTriggerLeave = (e) => {
				this.#createGraceArea(e, contentNode);
			};
			const handleContentLeave = (e) => {
				this.#createGraceArea(e, triggerNode);
			};
			return executeCallbacks(on(triggerNode, "pointerleave", handleTriggerLeave), on(contentNode, "pointerleave", handleContentLeave));
		});
		watch(() => get(this.#pointerGraceArea), () => {
			const handleTrackPointerGrace = (e) => {
				if (!get(this.#pointerGraceArea)) return;
				const target = e.target;
				if (!isElement(target)) return;
				const pointerPosition = {
					x: e.clientX,
					y: e.clientY
				};
				const hasEnteredTarget = opts.triggerNode()?.contains(target) || opts.contentNode()?.contains(target);
				const isPointerOutsideGraceArea = !isPointInPolygon(pointerPosition, get(this.#pointerGraceArea));
				if (hasEnteredTarget) this.#removeGraceArea();
				else if (isPointerOutsideGraceArea) {
					this.#removeGraceArea();
					opts.onPointerExit();
				}
			};
			const doc = getDocument(opts.triggerNode() ?? opts.contentNode());
			if (!doc) return;
			return on(doc, "pointermove", handleTrackPointerGrace);
		});
	}
	#removeGraceArea() {
		set(this.#pointerGraceArea, null);
		this.#isPointerInTransit.current = false;
	}
	#createGraceArea(e, hoverTarget) {
		const currentTarget = e.currentTarget;
		if (!isHTMLElement$1(currentTarget)) return;
		const exitPoint = {
			x: e.clientX,
			y: e.clientY
		};
		const paddedExitPoints = getPaddedExitPoints(exitPoint, getExitSideFromRect(exitPoint, currentTarget.getBoundingClientRect()));
		const hoverTargetPoints = getPointsFromRect(hoverTarget.getBoundingClientRect());
		const graceArea = getHull([...paddedExitPoints, ...hoverTargetPoints]);
		set(this.#pointerGraceArea, graceArea, true);
		this.#isPointerInTransit.current = true;
	}
};
function getExitSideFromRect(point, rect) {
	const top = Math.abs(rect.top - point.y);
	const bottom = Math.abs(rect.bottom - point.y);
	const right = Math.abs(rect.right - point.x);
	const left = Math.abs(rect.left - point.x);
	switch (Math.min(top, bottom, right, left)) {
		case left: return "left";
		case right: return "right";
		case top: return "top";
		case bottom: return "bottom";
		default: throw new Error("unreachable");
	}
}
function getPaddedExitPoints(exitPoint, exitSide, padding = 5) {
	const tipPadding = padding * 1.5;
	switch (exitSide) {
		case "top": return [
			{
				x: exitPoint.x - padding,
				y: exitPoint.y + padding
			},
			{
				x: exitPoint.x,
				y: exitPoint.y - tipPadding
			},
			{
				x: exitPoint.x + padding,
				y: exitPoint.y + padding
			}
		];
		case "bottom": return [
			{
				x: exitPoint.x - padding,
				y: exitPoint.y - padding
			},
			{
				x: exitPoint.x,
				y: exitPoint.y + tipPadding
			},
			{
				x: exitPoint.x + padding,
				y: exitPoint.y - padding
			}
		];
		case "left": return [
			{
				x: exitPoint.x + padding,
				y: exitPoint.y - padding
			},
			{
				x: exitPoint.x - tipPadding,
				y: exitPoint.y
			},
			{
				x: exitPoint.x + padding,
				y: exitPoint.y + padding
			}
		];
		case "right": return [
			{
				x: exitPoint.x - padding,
				y: exitPoint.y - padding
			},
			{
				x: exitPoint.x + tipPadding,
				y: exitPoint.y
			},
			{
				x: exitPoint.x - padding,
				y: exitPoint.y + padding
			}
		];
	}
}
function getPointsFromRect(rect) {
	const { top, right, bottom, left } = rect;
	return [
		{
			x: left,
			y: top
		},
		{
			x: right,
			y: top
		},
		{
			x: right,
			y: bottom
		},
		{
			x: left,
			y: bottom
		}
	];
}
function isPointInPolygon(point, polygon) {
	const { x, y } = point;
	let inside = false;
	for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
		const xi = polygon[i].x;
		const yi = polygon[i].y;
		const xj = polygon[j].x;
		const yj = polygon[j].y;
		if (yi > y !== yj > y && x < (xj - xi) * (y - yi) / (yj - yi) + xi) inside = !inside;
	}
	return inside;
}
function getHull(points) {
	const newPoints = points.slice();
	newPoints.sort((a, b) => {
		if (a.x < b.x) return -1;
		else if (a.x > b.x) return 1;
		else if (a.y < b.y) return -1;
		else if (a.y > b.y) return 1;
		else return 0;
	});
	return getHullPresorted(newPoints);
}
function getHullPresorted(points) {
	if (points.length <= 1) return points.slice();
	const upperHull = [];
	for (let i = 0; i < points.length; i++) {
		const p = points[i];
		while (upperHull.length >= 2) {
			const q = upperHull[upperHull.length - 1];
			const r = upperHull[upperHull.length - 2];
			if ((q.x - r.x) * (p.y - r.y) >= (q.y - r.y) * (p.x - r.x)) upperHull.pop();
			else break;
		}
		upperHull.push(p);
	}
	upperHull.pop();
	const lowerHull = [];
	for (let i = points.length - 1; i >= 0; i--) {
		const p = points[i];
		while (lowerHull.length >= 2) {
			const q = lowerHull[lowerHull.length - 1];
			const r = lowerHull[lowerHull.length - 2];
			if ((q.x - r.x) * (p.y - r.y) >= (q.y - r.y) * (p.x - r.x)) lowerHull.pop();
			else break;
		}
		lowerHull.push(p);
	}
	lowerHull.pop();
	if (upperHull.length === 1 && lowerHull.length === 1 && upperHull[0].x === lowerHull[0].x && upperHull[0].y === lowerHull[0].y) return upperHull;
	else return upperHull.concat(lowerHull);
}
const CONTEXT_MENU_TRIGGER_ATTR = "data-context-menu-trigger";
const CONTEXT_MENU_CONTENT_ATTR = "data-context-menu-content";
var MenuRootContext = new Context("Menu.Root");
var MenuMenuContext = new Context("Menu.Root | Menu.Sub");
var MenuContentContext = new Context("Menu.Content");
var MenuGroupContext = new Context("Menu.Group | Menu.RadioGroup");
var MenuRadioGroupContext = new Context("Menu.RadioGroup");
new Context("Menu.CheckboxGroup");
const MenuOpenEvent = new CustomEventDispatcher("bitsmenuopen", {
	bubbles: false,
	cancelable: true
});
const menuAttrs = createBitsAttrs({
	component: "menu",
	parts: [
		"trigger",
		"content",
		"sub-trigger",
		"item",
		"group",
		"group-heading",
		"checkbox-group",
		"checkbox-item",
		"radio-group",
		"radio-item",
		"separator",
		"sub-content",
		"arrow"
	]
});
var MenuRootState = class MenuRootState {
	static create(opts) {
		const root = new MenuRootState(opts);
		return MenuRootContext.set(root);
	}
	opts;
	isUsingKeyboard = new IsUsingKeyboard();
	#ignoreCloseAutoFocus = state(false);
	get ignoreCloseAutoFocus() {
		return get(this.#ignoreCloseAutoFocus);
	}
	set ignoreCloseAutoFocus(value) {
		set(this.#ignoreCloseAutoFocus, value, true);
	}
	#isPointerInTransit = state(false);
	get isPointerInTransit() {
		return get(this.#isPointerInTransit);
	}
	set isPointerInTransit(value) {
		set(this.#isPointerInTransit, value, true);
	}
	constructor(opts) {
		this.opts = opts;
	}
	getBitsAttr = (part) => {
		return menuAttrs.getAttr(part, this.opts.variant.current);
	};
};
var MenuMenuState = class MenuMenuState {
	static create(opts, root) {
		return MenuMenuContext.set(new MenuMenuState(opts, root, null));
	}
	opts;
	root;
	parentMenu;
	contentId = boxWith(() => "");
	#contentNode = state(null);
	get contentNode() {
		return get(this.#contentNode);
	}
	set contentNode(value) {
		set(this.#contentNode, value, true);
	}
	contentPresence;
	#triggerNode = state(null);
	get triggerNode() {
		return get(this.#triggerNode);
	}
	set triggerNode(value) {
		set(this.#triggerNode, value, true);
	}
	constructor(opts, root, parentMenu) {
		this.opts = opts;
		this.root = root;
		this.parentMenu = parentMenu;
		this.contentPresence = new PresenceManager({
			ref: boxWith(() => this.contentNode),
			open: this.opts.open,
			onComplete: () => {
				this.opts.onOpenChangeComplete.current(this.opts.open.current);
			}
		});
		if (parentMenu) watch(() => parentMenu.opts.open.current, () => {
			if (parentMenu.opts.open.current) return;
			this.opts.open.current = false;
		});
	}
	toggleOpen() {
		this.opts.open.current = !this.opts.open.current;
	}
	onOpen() {
		this.opts.open.current = true;
	}
	onClose() {
		this.opts.open.current = false;
	}
};
var MenuContentState = class MenuContentState {
	static create(opts) {
		return MenuContentContext.set(new MenuContentState(opts, MenuMenuContext.get()));
	}
	opts;
	parentMenu;
	rovingFocusGroup;
	domContext;
	attachment;
	#search = state("");
	get search() {
		return get(this.#search);
	}
	set search(value) {
		set(this.#search, value, true);
	}
	#timer = 0;
	#handleTypeaheadSearch;
	#mounted = state(false);
	get mounted() {
		return get(this.#mounted);
	}
	set mounted(value) {
		set(this.#mounted, value, true);
	}
	#isSub;
	constructor(opts, parentMenu) {
		this.opts = opts;
		this.parentMenu = parentMenu;
		this.domContext = new DOMContext(opts.ref);
		this.attachment = attachRef(this.opts.ref, (v) => {
			if (this.parentMenu.contentNode !== v) this.parentMenu.contentNode = v;
		});
		parentMenu.contentId = opts.id;
		this.#isSub = opts.isSub ?? false;
		this.onkeydown = this.onkeydown.bind(this);
		this.onblur = this.onblur.bind(this);
		this.onfocus = this.onfocus.bind(this);
		this.handleInteractOutside = this.handleInteractOutside.bind(this);
		new GraceArea({
			contentNode: () => this.parentMenu.contentNode,
			triggerNode: () => this.parentMenu.triggerNode,
			enabled: () => this.parentMenu.opts.open.current && Boolean(this.parentMenu.triggerNode?.hasAttribute(this.parentMenu.root.getBitsAttr("sub-trigger"))),
			onPointerExit: () => {
				this.parentMenu.opts.open.current = false;
			},
			setIsPointerInTransit: (value) => {
				this.parentMenu.root.isPointerInTransit = value;
			}
		});
		this.#handleTypeaheadSearch = new DOMTypeahead({
			getActiveElement: () => this.domContext.getActiveElement(),
			getWindow: () => this.domContext.getWindow()
		}).handleTypeaheadSearch;
		this.rovingFocusGroup = new RovingFocusGroup({
			rootNode: boxWith(() => this.parentMenu.contentNode),
			candidateAttr: this.parentMenu.root.getBitsAttr("item"),
			loop: this.opts.loop,
			orientation: boxWith(() => "vertical")
		});
		watch(() => this.parentMenu.contentNode, (contentNode) => {
			if (!contentNode) return;
			const handler = () => {
				afterTick(() => {
					if (!this.parentMenu.root.isUsingKeyboard.current) return;
					this.rovingFocusGroup.focusFirstCandidate();
				});
			};
			return MenuOpenEvent.listen(contentNode, handler);
		});
		user_effect(() => {
			if (!this.parentMenu.opts.open.current) this.domContext.getWindow().clearTimeout(this.#timer);
		});
	}
	#getCandidateNodes() {
		const node = this.parentMenu.contentNode;
		if (!node) return [];
		return Array.from(node.querySelectorAll(`[${this.parentMenu.root.getBitsAttr("item")}]:not([data-disabled])`));
	}
	#isPointerMovingToSubmenu() {
		return this.parentMenu.root.isPointerInTransit;
	}
	onCloseAutoFocus = (e) => {
		this.opts.onCloseAutoFocus.current?.(e);
		if (e.defaultPrevented || this.#isSub) return;
		if (this.parentMenu.triggerNode && isTabbable(this.parentMenu.triggerNode)) {
			e.preventDefault();
			this.parentMenu.triggerNode.focus();
		}
	};
	handleTabKeyDown(e) {
		let rootMenu = this.parentMenu;
		while (rootMenu.parentMenu !== null) rootMenu = rootMenu.parentMenu;
		if (!rootMenu.triggerNode) return;
		e.preventDefault();
		const nodeToFocus = getTabbableFrom(rootMenu.triggerNode, e.shiftKey ? "prev" : "next");
		if (nodeToFocus) {
			this.parentMenu.root.ignoreCloseAutoFocus = true;
			rootMenu.onClose();
			afterTick(() => {
				nodeToFocus.focus();
				afterTick(() => {
					this.parentMenu.root.ignoreCloseAutoFocus = false;
				});
			});
		} else this.domContext.getDocument().body.focus();
	}
	onkeydown(e) {
		if (e.defaultPrevented) return;
		if (e.key === "Tab") {
			this.handleTabKeyDown(e);
			return;
		}
		const target = e.target;
		const currentTarget = e.currentTarget;
		if (!isHTMLElement$1(target) || !isHTMLElement$1(currentTarget)) return;
		const isKeydownInside = target.closest(`[${this.parentMenu.root.getBitsAttr("content")}]`)?.id === this.parentMenu.contentId.current;
		const isModifierKey = e.ctrlKey || e.altKey || e.metaKey;
		const isCharacterKey = e.key.length === 1;
		if (this.rovingFocusGroup.handleKeydown(target, e)) return;
		if (e.code === "Space") return;
		const candidateNodes = this.#getCandidateNodes();
		if (isKeydownInside) {
			if (!isModifierKey && isCharacterKey) this.#handleTypeaheadSearch(e.key, candidateNodes);
		}
		if (e.target?.id !== this.parentMenu.contentId.current) return;
		if (!FIRST_LAST_KEYS.includes(e.key)) return;
		e.preventDefault();
		if (LAST_KEYS.includes(e.key)) candidateNodes.reverse();
		focusFirst(candidateNodes, { select: false }, () => this.domContext.getActiveElement());
	}
	onblur(e) {
		if (!isElement(e.currentTarget)) return;
		if (!isElement(e.target)) return;
		if (!e.currentTarget.contains?.(e.target)) {
			this.domContext.getWindow().clearTimeout(this.#timer);
			this.search = "";
		}
	}
	onfocus(_) {
		if (!this.parentMenu.root.isUsingKeyboard.current) return;
		afterTick(() => this.rovingFocusGroup.focusFirstCandidate());
	}
	onItemEnter() {
		return this.#isPointerMovingToSubmenu();
	}
	onItemLeave(e) {
		if (e.currentTarget.hasAttribute(this.parentMenu.root.getBitsAttr("sub-trigger"))) return;
		if (this.#isPointerMovingToSubmenu() || this.parentMenu.root.isUsingKeyboard.current) return;
		this.parentMenu.contentNode?.focus();
		this.rovingFocusGroup.setCurrentTabStopId("");
	}
	onTriggerLeave() {
		if (this.#isPointerMovingToSubmenu()) return true;
		return false;
	}
	handleInteractOutside(e) {
		if (!isElementOrSVGElement(e.target)) return;
		const triggerId = this.parentMenu.triggerNode?.id;
		if (e.target.id === triggerId) {
			e.preventDefault();
			return;
		}
		if (e.target.closest(`#${triggerId}`)) e.preventDefault();
	}
	get shouldRender() {
		return this.parentMenu.contentPresence.shouldRender;
	}
	#snippetProps = user_derived(() => ({ open: this.parentMenu.opts.open.current }));
	get snippetProps() {
		return get(this.#snippetProps);
	}
	set snippetProps(value) {
		set(this.#snippetProps, value);
	}
	#props = user_derived(() => ({
		id: this.opts.id.current,
		role: "menu",
		"aria-orientation": "vertical",
		[this.parentMenu.root.getBitsAttr("content")]: "",
		"data-state": getDataOpenClosed(this.parentMenu.opts.open.current),
		onkeydown: this.onkeydown,
		onblur: this.onblur,
		onfocus: this.onfocus,
		dir: this.parentMenu.root.opts.dir.current,
		style: { pointerEvents: "auto" },
		...this.attachment
	}));
	get props() {
		return get(this.#props);
	}
	set props(value) {
		set(this.#props, value);
	}
	popperProps = { onCloseAutoFocus: (e) => this.onCloseAutoFocus(e) };
};
var MenuItemSharedState = class {
	opts;
	content;
	attachment;
	#isFocused = state(false);
	constructor(opts, content) {
		this.opts = opts;
		this.content = content;
		this.attachment = attachRef(this.opts.ref);
		this.onpointermove = this.onpointermove.bind(this);
		this.onpointerleave = this.onpointerleave.bind(this);
		this.onfocus = this.onfocus.bind(this);
		this.onblur = this.onblur.bind(this);
	}
	onpointermove(e) {
		if (e.defaultPrevented) return;
		if (!isMouseEvent(e)) return;
		if (this.opts.disabled.current) this.content.onItemLeave(e);
		else {
			if (this.content.onItemEnter()) return;
			const item = e.currentTarget;
			if (!isHTMLElement$1(item)) return;
			item.focus();
		}
	}
	onpointerleave(e) {
		if (e.defaultPrevented) return;
		if (!isMouseEvent(e)) return;
		this.content.onItemLeave(e);
	}
	onfocus(e) {
		afterTick(() => {
			if (e.defaultPrevented || this.opts.disabled.current) return;
			set(this.#isFocused, true);
		});
	}
	onblur(e) {
		afterTick(() => {
			if (e.defaultPrevented) return;
			set(this.#isFocused, false);
		});
	}
	#props = user_derived(() => ({
		id: this.opts.id.current,
		tabindex: -1,
		role: "menuitem",
		"aria-disabled": boolToStr(this.opts.disabled.current),
		"data-disabled": boolToEmptyStrOrUndef(this.opts.disabled.current),
		"data-highlighted": get(this.#isFocused) ? "" : void 0,
		[this.content.parentMenu.root.getBitsAttr("item")]: "",
		onpointermove: this.onpointermove,
		onpointerleave: this.onpointerleave,
		onfocus: this.onfocus,
		onblur: this.onblur,
		...this.attachment
	}));
	get props() {
		return get(this.#props);
	}
	set props(value) {
		set(this.#props, value);
	}
};
var MenuItemState = class MenuItemState {
	static create(opts) {
		return new MenuItemState(opts, new MenuItemSharedState(opts, MenuContentContext.get()));
	}
	opts;
	item;
	root;
	#isPointerDown = false;
	constructor(opts, item) {
		this.opts = opts;
		this.item = item;
		this.root = item.content.parentMenu.root;
		this.onkeydown = this.onkeydown.bind(this);
		this.onclick = this.onclick.bind(this);
		this.onpointerdown = this.onpointerdown.bind(this);
		this.onpointerup = this.onpointerup.bind(this);
	}
	#handleSelect() {
		if (this.item.opts.disabled.current) return;
		const selectEvent = new CustomEvent("menuitemselect", {
			bubbles: true,
			cancelable: true
		});
		this.opts.onSelect.current(selectEvent);
		if (selectEvent.defaultPrevented) {
			this.item.content.parentMenu.root.isUsingKeyboard.current = false;
			return;
		}
		if (this.opts.closeOnSelect.current) this.item.content.parentMenu.root.opts.onClose();
	}
	onkeydown(e) {
		const isTypingAhead = this.item.content.search !== "";
		if (this.item.opts.disabled.current || isTypingAhead && e.key === " ") return;
		if (SELECTION_KEYS.includes(e.key)) {
			if (!isHTMLElement$1(e.currentTarget)) return;
			e.currentTarget.click();
			e.preventDefault();
		}
	}
	onclick(_) {
		if (this.item.opts.disabled.current) return;
		this.#handleSelect();
	}
	onpointerup(e) {
		if (e.defaultPrevented) return;
		if (!this.#isPointerDown) {
			if (!isHTMLElement$1(e.currentTarget)) return;
			e.currentTarget?.click();
		}
	}
	onpointerdown(_) {
		this.#isPointerDown = true;
	}
	#props = user_derived(() => mergeProps(this.item.props, {
		onclick: this.onclick,
		onpointerdown: this.onpointerdown,
		onpointerup: this.onpointerup,
		onkeydown: this.onkeydown
	}));
	get props() {
		return get(this.#props);
	}
	set props(value) {
		set(this.#props, value);
	}
};
var MenuGroupState = class MenuGroupState {
	static create(opts) {
		return MenuGroupContext.set(new MenuGroupState(opts, MenuRootContext.get()));
	}
	opts;
	root;
	attachment;
	#groupHeadingId = state(void 0);
	get groupHeadingId() {
		return get(this.#groupHeadingId);
	}
	set groupHeadingId(value) {
		set(this.#groupHeadingId, value, true);
	}
	constructor(opts, root) {
		this.opts = opts;
		this.root = root;
		this.attachment = attachRef(this.opts.ref);
	}
	#props = user_derived(() => ({
		id: this.opts.id.current,
		role: "group",
		"aria-labelledby": this.groupHeadingId,
		[this.root.getBitsAttr("group")]: "",
		...this.attachment
	}));
	get props() {
		return get(this.#props);
	}
	set props(value) {
		set(this.#props, value);
	}
};
var MenuSeparatorState = class MenuSeparatorState {
	static create(opts) {
		return new MenuSeparatorState(opts, MenuRootContext.get());
	}
	opts;
	root;
	attachment;
	constructor(opts, root) {
		this.opts = opts;
		this.root = root;
		this.attachment = attachRef(this.opts.ref);
	}
	#props = user_derived(() => ({
		id: this.opts.id.current,
		role: "group",
		[this.root.getBitsAttr("separator")]: "",
		...this.attachment
	}));
	get props() {
		return get(this.#props);
	}
	set props(value) {
		set(this.#props, value);
	}
};
var MenuRadioGroupState = class MenuRadioGroupState {
	static create(opts) {
		return MenuGroupContext.set(MenuRadioGroupContext.set(new MenuRadioGroupState(opts, MenuContentContext.get())));
	}
	opts;
	content;
	attachment;
	#groupHeadingId = state(null);
	get groupHeadingId() {
		return get(this.#groupHeadingId);
	}
	set groupHeadingId(value) {
		set(this.#groupHeadingId, value, true);
	}
	root;
	constructor(opts, content) {
		this.opts = opts;
		this.content = content;
		this.root = content.parentMenu.root;
		this.attachment = attachRef(this.opts.ref);
	}
	setValue(v) {
		this.opts.value.current = v;
	}
	#props = user_derived(() => ({
		id: this.opts.id.current,
		[this.root.getBitsAttr("radio-group")]: "",
		role: "group",
		"aria-labelledby": this.groupHeadingId,
		...this.attachment
	}));
	get props() {
		return get(this.#props);
	}
	set props(value) {
		set(this.#props, value);
	}
};
var DropdownMenuTriggerState = class DropdownMenuTriggerState {
	static create(opts) {
		return new DropdownMenuTriggerState(opts, MenuMenuContext.get());
	}
	opts;
	parentMenu;
	attachment;
	constructor(opts, parentMenu) {
		this.opts = opts;
		this.parentMenu = parentMenu;
		this.attachment = attachRef(this.opts.ref, (v) => this.parentMenu.triggerNode = v);
	}
	onclick = (e) => {
		if (this.opts.disabled.current || e.detail !== 0) return;
		this.parentMenu.toggleOpen();
		e.preventDefault();
	};
	onpointerdown = (e) => {
		if (this.opts.disabled.current) return;
		if (e.pointerType === "touch") return e.preventDefault();
		if (e.button === 0 && e.ctrlKey === false) {
			this.parentMenu.toggleOpen();
			if (!this.parentMenu.opts.open.current) e.preventDefault();
		}
	};
	onpointerup = (e) => {
		if (this.opts.disabled.current) return;
		if (e.pointerType === "touch") {
			e.preventDefault();
			this.parentMenu.toggleOpen();
		}
	};
	onkeydown = (e) => {
		if (this.opts.disabled.current) return;
		if (e.key === " " || e.key === "Enter") {
			this.parentMenu.toggleOpen();
			e.preventDefault();
			return;
		}
		if (e.key === "ArrowDown") {
			this.parentMenu.onOpen();
			e.preventDefault();
		}
	};
	#ariaControls = user_derived(() => {
		if (this.parentMenu.opts.open.current && this.parentMenu.contentId.current) return this.parentMenu.contentId.current;
	});
	#props = user_derived(() => ({
		id: this.opts.id.current,
		disabled: this.opts.disabled.current,
		"aria-haspopup": "menu",
		"aria-expanded": boolToStr(this.parentMenu.opts.open.current),
		"aria-controls": get(this.#ariaControls),
		"data-disabled": boolToEmptyStrOrUndef(this.opts.disabled.current),
		"data-state": getDataOpenClosed(this.parentMenu.opts.open.current),
		[this.parentMenu.root.getBitsAttr("trigger")]: "",
		onclick: this.onclick,
		onpointerdown: this.onpointerdown,
		onpointerup: this.onpointerup,
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
var MenuSubmenuState = class {
	static create(opts) {
		const menu = MenuMenuContext.get();
		return MenuMenuContext.set(new MenuMenuState(opts, menu.root, menu));
	}
};
globalThis.bitsDismissableLayers ??= /* @__PURE__ */ new Map();
var DismissibleLayerState = class DismissibleLayerState {
	static create(opts) {
		return new DismissibleLayerState(opts);
	}
	opts;
	#interactOutsideProp;
	#behaviorType;
	#interceptedEvents = { pointerdown: false };
	#isResponsibleLayer = false;
	#isFocusInsideDOMTree = false;
	#documentObj = void 0;
	#onFocusOutside;
	#unsubClickListener = noop$1;
	constructor(opts) {
		this.opts = opts;
		this.#behaviorType = opts.interactOutsideBehavior;
		this.#interactOutsideProp = opts.onInteractOutside;
		this.#onFocusOutside = opts.onFocusOutside;
		user_effect(() => {
			this.#documentObj = getOwnerDocument(this.opts.ref.current);
		});
		let unsubEvents = noop$1;
		const cleanup = () => {
			this.#resetState();
			globalThis.bitsDismissableLayers.delete(this);
			this.#handleInteractOutside.destroy();
			unsubEvents();
		};
		watch([() => this.opts.enabled.current, () => this.opts.ref.current], () => {
			if (!this.opts.enabled.current || !this.opts.ref.current) return;
			afterSleep(1, () => {
				if (!this.opts.ref.current) return;
				globalThis.bitsDismissableLayers.set(this, this.#behaviorType);
				unsubEvents();
				unsubEvents = this.#addEventListeners();
			});
			return cleanup;
		});
		onDestroyEffect(() => {
			this.#resetState.destroy();
			globalThis.bitsDismissableLayers.delete(this);
			this.#handleInteractOutside.destroy();
			this.#unsubClickListener();
			unsubEvents();
		});
	}
	#handleFocus = (event) => {
		if (event.defaultPrevented) return;
		if (!this.opts.ref.current) return;
		afterTick(() => {
			if (!this.opts.ref.current || this.#isTargetWithinLayer(event.target)) return;
			if (event.target && !this.#isFocusInsideDOMTree) this.#onFocusOutside.current?.(event);
		});
	};
	#addEventListeners() {
		return executeCallbacks(on(this.#documentObj, "pointerdown", executeCallbacks(this.#markInterceptedEvent, this.#markResponsibleLayer), { capture: true }), on(this.#documentObj, "pointerdown", executeCallbacks(this.#markNonInterceptedEvent, this.#handleInteractOutside)), on(this.#documentObj, "focusin", this.#handleFocus));
	}
	#handleDismiss = (e) => {
		let event = e;
		if (event.defaultPrevented) event = createWrappedEvent(e);
		this.#interactOutsideProp.current(e);
	};
	#handleInteractOutside = debounce((e) => {
		if (!this.opts.ref.current) {
			this.#unsubClickListener();
			return;
		}
		const isEventValid = this.opts.isValidEvent.current(e, this.opts.ref.current) || isValidEvent(e, this.opts.ref.current);
		if (!this.#isResponsibleLayer || this.#isAnyEventIntercepted() || !isEventValid) {
			this.#unsubClickListener();
			return;
		}
		let event = e;
		if (event.defaultPrevented) event = createWrappedEvent(event);
		if (this.#behaviorType.current !== "close" && this.#behaviorType.current !== "defer-otherwise-close") {
			this.#unsubClickListener();
			return;
		}
		if (e.pointerType === "touch") {
			this.#unsubClickListener();
			this.#unsubClickListener = on(this.#documentObj, "click", this.#handleDismiss, { once: true });
		} else this.#interactOutsideProp.current(event);
	}, 10);
	#markInterceptedEvent = (e) => {
		this.#interceptedEvents[e.type] = true;
	};
	#markNonInterceptedEvent = (e) => {
		this.#interceptedEvents[e.type] = false;
	};
	#markResponsibleLayer = () => {
		if (!this.opts.ref.current) return;
		this.#isResponsibleLayer = isResponsibleLayer(this.opts.ref.current);
	};
	#isTargetWithinLayer = (target) => {
		if (!this.opts.ref.current) return false;
		return isOrContainsTarget(this.opts.ref.current, target);
	};
	#resetState = debounce(() => {
		for (const eventType in this.#interceptedEvents) this.#interceptedEvents[eventType] = false;
		this.#isResponsibleLayer = false;
	}, 20);
	#isAnyEventIntercepted() {
		return Object.values(this.#interceptedEvents).some(Boolean);
	}
	#onfocuscapture = () => {
		this.#isFocusInsideDOMTree = true;
	};
	#onblurcapture = () => {
		this.#isFocusInsideDOMTree = false;
	};
	props = {
		onfocuscapture: this.#onfocuscapture,
		onblurcapture: this.#onblurcapture
	};
};
function getTopMostDismissableLayer(layersArr = [...globalThis.bitsDismissableLayers]) {
	return layersArr.findLast(([_, { current: behaviorType }]) => behaviorType === "close" || behaviorType === "ignore");
}
function isResponsibleLayer(node) {
	const layersArr = [...globalThis.bitsDismissableLayers];
	const topMostLayer = getTopMostDismissableLayer(layersArr);
	if (topMostLayer) return topMostLayer[0].opts.ref.current === node;
	const [firstLayerNode] = layersArr[0];
	return firstLayerNode.opts.ref.current === node;
}
function isValidEvent(e, node) {
	const target = e.target;
	if (!isElementOrSVGElement(target)) return false;
	const targetIsContextMenuTrigger = Boolean(target.closest(`[${CONTEXT_MENU_TRIGGER_ATTR}]`));
	if ("button" in e && e.button > 0 && !targetIsContextMenuTrigger) return false;
	if ("button" in e && e.button === 0 && targetIsContextMenuTrigger) return true;
	const nodeIsContextMenu = Boolean(node.closest(`[${CONTEXT_MENU_CONTENT_ATTR}]`));
	if (targetIsContextMenuTrigger && nodeIsContextMenu) return false;
	return getOwnerDocument(target).documentElement.contains(target) && !isOrContainsTarget(node, target) && isClickTrulyOutside(e, node);
}
function createWrappedEvent(e) {
	const capturedCurrentTarget = e.currentTarget;
	const capturedTarget = e.target;
	let newEvent;
	if (e instanceof PointerEvent) newEvent = new PointerEvent(e.type, e);
	else newEvent = new PointerEvent("pointerdown", e);
	let isPrevented = false;
	return new Proxy(newEvent, { get: (target, prop$1) => {
		if (prop$1 === "currentTarget") return capturedCurrentTarget;
		if (prop$1 === "target") return capturedTarget;
		if (prop$1 === "preventDefault") return () => {
			isPrevented = true;
			if (typeof target.preventDefault === "function") target.preventDefault();
		};
		if (prop$1 === "defaultPrevented") return isPrevented;
		if (prop$1 in target) return target[prop$1];
		return e[prop$1];
	} });
}
function Dismissible_layer($$anchor, $$props) {
	push($$props, true);
	let interactOutsideBehavior = prop($$props, "interactOutsideBehavior", 3, "close"), onInteractOutside = prop($$props, "onInteractOutside", 3, noop$1), onFocusOutside = prop($$props, "onFocusOutside", 3, noop$1), isValidEvent$1 = prop($$props, "isValidEvent", 3, () => false);
	const dismissibleLayerState = DismissibleLayerState.create({
		id: boxWith(() => $$props.id),
		interactOutsideBehavior: boxWith(() => interactOutsideBehavior()),
		onInteractOutside: boxWith(() => onInteractOutside()),
		enabled: boxWith(() => $$props.enabled),
		onFocusOutside: boxWith(() => onFocusOutside()),
		isValidEvent: boxWith(() => isValidEvent$1()),
		ref: $$props.ref
	});
	var fragment = comment();
	snippet(first_child(fragment), () => $$props.children ?? noop, () => ({ props: dismissibleLayerState.props }));
	append($$anchor, fragment);
	pop();
}
globalThis.bitsEscapeLayers ??= /* @__PURE__ */ new Map();
var EscapeLayerState = class EscapeLayerState {
	static create(opts) {
		return new EscapeLayerState(opts);
	}
	opts;
	domContext;
	constructor(opts) {
		this.opts = opts;
		this.domContext = new DOMContext(this.opts.ref);
		let unsubEvents = noop$1;
		watch(() => opts.enabled.current, (enabled) => {
			if (enabled) {
				globalThis.bitsEscapeLayers.set(this, opts.escapeKeydownBehavior);
				unsubEvents = this.#addEventListener();
			}
			return () => {
				unsubEvents();
				globalThis.bitsEscapeLayers.delete(this);
			};
		});
	}
	#addEventListener = () => {
		return on(this.domContext.getDocument(), "keydown", this.#onkeydown, { passive: false });
	};
	#onkeydown = (e) => {
		if (e.key !== "Escape" || !isResponsibleEscapeLayer(this)) return;
		const clonedEvent = new KeyboardEvent(e.type, e);
		e.preventDefault();
		const behaviorType = this.opts.escapeKeydownBehavior.current;
		if (behaviorType !== "close" && behaviorType !== "defer-otherwise-close") return;
		this.opts.onEscapeKeydown.current(clonedEvent);
	};
};
function isResponsibleEscapeLayer(instance) {
	const layersArr = [...globalThis.bitsEscapeLayers];
	const topMostLayer = layersArr.findLast(([_, { current: behaviorType }]) => behaviorType === "close" || behaviorType === "ignore");
	if (topMostLayer) return topMostLayer[0] === instance;
	const [firstLayerNode] = layersArr[0];
	return firstLayerNode === instance;
}
function Escape_layer($$anchor, $$props) {
	push($$props, true);
	let escapeKeydownBehavior = prop($$props, "escapeKeydownBehavior", 3, "close"), onEscapeKeydown = prop($$props, "onEscapeKeydown", 3, noop$1);
	EscapeLayerState.create({
		escapeKeydownBehavior: boxWith(() => escapeKeydownBehavior()),
		onEscapeKeydown: boxWith(() => onEscapeKeydown()),
		enabled: boxWith(() => $$props.enabled),
		ref: $$props.ref
	});
	var fragment = comment();
	snippet(first_child(fragment), () => $$props.children ?? noop);
	append($$anchor, fragment);
	pop();
}
var FocusScopeManager = class FocusScopeManager {
	static instance;
	#scopeStack = simpleBox([]);
	#focusHistory = /* @__PURE__ */ new WeakMap();
	#preFocusHistory = /* @__PURE__ */ new WeakMap();
	static getInstance() {
		if (!this.instance) this.instance = new FocusScopeManager();
		return this.instance;
	}
	register(scope) {
		const current = this.getActive();
		if (current && current !== scope) current.pause();
		const activeElement = document.activeElement;
		if (activeElement && activeElement !== document.body) this.#preFocusHistory.set(scope, activeElement);
		this.#scopeStack.current = this.#scopeStack.current.filter((s) => s !== scope);
		this.#scopeStack.current.unshift(scope);
	}
	unregister(scope) {
		this.#scopeStack.current = this.#scopeStack.current.filter((s) => s !== scope);
		const next = this.getActive();
		if (next) next.resume();
	}
	getActive() {
		return this.#scopeStack.current[0];
	}
	setFocusMemory(scope, element) {
		this.#focusHistory.set(scope, element);
	}
	getFocusMemory(scope) {
		return this.#focusHistory.get(scope);
	}
	isActiveScope(scope) {
		return this.getActive() === scope;
	}
	setPreFocusMemory(scope, element) {
		this.#preFocusHistory.set(scope, element);
	}
	getPreFocusMemory(scope) {
		return this.#preFocusHistory.get(scope);
	}
	clearPreFocusMemory(scope) {
		this.#preFocusHistory.delete(scope);
	}
};
var FocusScope = class FocusScope {
	#paused = false;
	#container = null;
	#manager = FocusScopeManager.getInstance();
	#cleanupFns = [];
	#opts;
	constructor(opts) {
		this.#opts = opts;
	}
	get paused() {
		return this.#paused;
	}
	pause() {
		this.#paused = true;
	}
	resume() {
		this.#paused = false;
	}
	#cleanup() {
		for (const fn of this.#cleanupFns) fn();
		this.#cleanupFns = [];
	}
	mount(container) {
		if (this.#container) this.unmount();
		this.#container = container;
		this.#manager.register(this);
		this.#setupEventListeners();
		this.#handleOpenAutoFocus();
	}
	unmount() {
		if (!this.#container) return;
		this.#cleanup();
		this.#handleCloseAutoFocus();
		this.#manager.unregister(this);
		this.#manager.clearPreFocusMemory(this);
		this.#container = null;
	}
	#handleOpenAutoFocus() {
		if (!this.#container) return;
		const event = new CustomEvent("focusScope.onOpenAutoFocus", {
			bubbles: false,
			cancelable: true
		});
		this.#opts.onOpenAutoFocus.current(event);
		if (!event.defaultPrevented) requestAnimationFrame(() => {
			if (!this.#container) return;
			const firstTabbable = this.#getFirstTabbable();
			if (firstTabbable) {
				firstTabbable.focus();
				this.#manager.setFocusMemory(this, firstTabbable);
			} else this.#container.focus();
		});
	}
	#handleCloseAutoFocus() {
		const event = new CustomEvent("focusScope.onCloseAutoFocus", {
			bubbles: false,
			cancelable: true
		});
		this.#opts.onCloseAutoFocus.current?.(event);
		if (!event.defaultPrevented) {
			const preFocusedElement = this.#manager.getPreFocusMemory(this);
			if (preFocusedElement && document.contains(preFocusedElement)) try {
				preFocusedElement.focus();
			} catch {
				document.body.focus();
			}
		}
	}
	#setupEventListeners() {
		if (!this.#container || !this.#opts.trap.current) return;
		const container = this.#container;
		const doc = container.ownerDocument;
		const handleFocus = (e) => {
			if (this.#paused || !this.#manager.isActiveScope(this)) return;
			const target = e.target;
			if (!target) return;
			if (container.contains(target)) this.#manager.setFocusMemory(this, target);
			else {
				const lastFocused = this.#manager.getFocusMemory(this);
				if (lastFocused && container.contains(lastFocused) && isFocusable(lastFocused)) {
					e.preventDefault();
					lastFocused.focus();
				} else {
					const firstTabbable = this.#getFirstTabbable();
					const firstFocusable = this.#getAllFocusables()[0];
					(firstTabbable || firstFocusable || container).focus();
				}
			}
		};
		const handleKeydown = (e) => {
			if (!this.#opts.loop || this.#paused || e.key !== "Tab") return;
			if (!this.#manager.isActiveScope(this)) return;
			const tabbables = this.#getTabbables();
			if (tabbables.length < 2) return;
			const first = tabbables[0];
			const last = tabbables[tabbables.length - 1];
			if (!e.shiftKey && doc.activeElement === last) {
				e.preventDefault();
				first.focus();
			} else if (e.shiftKey && doc.activeElement === first) {
				e.preventDefault();
				last.focus();
			}
		};
		this.#cleanupFns.push(on(doc, "focusin", handleFocus, { capture: true }), on(container, "keydown", handleKeydown));
		const observer = new MutationObserver(() => {
			const lastFocused = this.#manager.getFocusMemory(this);
			if (lastFocused && !container.contains(lastFocused)) {
				const firstTabbable = this.#getFirstTabbable();
				const firstFocusable = this.#getAllFocusables()[0];
				const elementToFocus = firstTabbable || firstFocusable;
				if (elementToFocus) {
					elementToFocus.focus();
					this.#manager.setFocusMemory(this, elementToFocus);
				} else container.focus();
			}
		});
		observer.observe(container, {
			childList: true,
			subtree: true
		});
		this.#cleanupFns.push(() => observer.disconnect());
	}
	#getTabbables() {
		if (!this.#container) return [];
		return tabbable(this.#container, {
			includeContainer: false,
			getShadowRoot: true
		});
	}
	#getFirstTabbable() {
		return this.#getTabbables()[0] || null;
	}
	#getAllFocusables() {
		if (!this.#container) return [];
		return focusable(this.#container, {
			includeContainer: false,
			getShadowRoot: true
		});
	}
	static use(opts) {
		let scope = null;
		watch([() => opts.ref.current, () => opts.enabled.current], ([ref, enabled]) => {
			if (ref && enabled) {
				if (!scope) scope = new FocusScope(opts);
				scope.mount(ref);
			} else if (scope) {
				scope.unmount();
				scope = null;
			}
		});
		onDestroyEffect(() => {
			scope?.unmount();
		});
		return { get props() {
			return { tabindex: -1 };
		} };
	}
};
function Focus_scope($$anchor, $$props) {
	push($$props, true);
	let enabled = prop($$props, "enabled", 3, false), trapFocus = prop($$props, "trapFocus", 3, false), loop = prop($$props, "loop", 3, false), onCloseAutoFocus = prop($$props, "onCloseAutoFocus", 3, noop$1), onOpenAutoFocus = prop($$props, "onOpenAutoFocus", 3, noop$1);
	const focusScopeState = FocusScope.use({
		enabled: boxWith(() => enabled()),
		trap: boxWith(() => trapFocus()),
		loop: loop(),
		onCloseAutoFocus: boxWith(() => onCloseAutoFocus()),
		onOpenAutoFocus: boxWith(() => onOpenAutoFocus()),
		ref: $$props.ref
	});
	var fragment = comment();
	snippet(first_child(fragment), () => $$props.focusScope ?? noop, () => ({ props: focusScopeState.props }));
	append($$anchor, fragment);
	pop();
}
globalThis.bitsTextSelectionLayers ??= /* @__PURE__ */ new Map();
var TextSelectionLayerState = class TextSelectionLayerState {
	static create(opts) {
		return new TextSelectionLayerState(opts);
	}
	opts;
	domContext;
	#unsubSelectionLock = noop$1;
	constructor(opts) {
		this.opts = opts;
		this.domContext = new DOMContext(opts.ref);
		let unsubEvents = noop$1;
		watch(() => this.opts.enabled.current, (isEnabled) => {
			if (isEnabled) {
				globalThis.bitsTextSelectionLayers.set(this, this.opts.enabled);
				unsubEvents();
				unsubEvents = this.#addEventListeners();
			}
			return () => {
				unsubEvents();
				this.#resetSelectionLock();
				globalThis.bitsTextSelectionLayers.delete(this);
			};
		});
	}
	#addEventListeners() {
		return executeCallbacks(on(this.domContext.getDocument(), "pointerdown", this.#pointerdown), on(this.domContext.getDocument(), "pointerup", composeHandlers(this.#resetSelectionLock, this.opts.onPointerUp.current)));
	}
	#pointerdown = (e) => {
		const node = this.opts.ref.current;
		const target = e.target;
		if (!isHTMLElement$1(node) || !isHTMLElement$1(target) || !this.opts.enabled.current) return;
		if (!isHighestLayer(this) || !contains(node, target)) return;
		this.opts.onPointerDown.current(e);
		if (e.defaultPrevented) return;
		this.#unsubSelectionLock = preventTextSelectionOverflow(node, this.domContext.getDocument().body);
	};
	#resetSelectionLock = () => {
		this.#unsubSelectionLock();
		this.#unsubSelectionLock = noop$1;
	};
};
var getUserSelect = (node) => node.style.userSelect || node.style.webkitUserSelect;
function preventTextSelectionOverflow(node, body) {
	const originalBodyUserSelect = getUserSelect(body);
	const originalNodeUserSelect = getUserSelect(node);
	setUserSelect(body, "none");
	setUserSelect(node, "text");
	return () => {
		setUserSelect(body, originalBodyUserSelect);
		setUserSelect(node, originalNodeUserSelect);
	};
}
function setUserSelect(node, value) {
	node.style.userSelect = value;
	node.style.webkitUserSelect = value;
}
function isHighestLayer(instance) {
	const layersArr = [...globalThis.bitsTextSelectionLayers];
	if (!layersArr.length) return false;
	const highestLayer = layersArr.at(-1);
	if (!highestLayer) return false;
	return highestLayer[0] === instance;
}
function Text_selection_layer($$anchor, $$props) {
	push($$props, true);
	let preventOverflowTextSelection = prop($$props, "preventOverflowTextSelection", 3, true), onPointerDown = prop($$props, "onPointerDown", 3, noop$1), onPointerUp = prop($$props, "onPointerUp", 3, noop$1);
	TextSelectionLayerState.create({
		id: boxWith(() => $$props.id),
		onPointerDown: boxWith(() => onPointerDown()),
		onPointerUp: boxWith(() => onPointerUp()),
		enabled: boxWith(() => $$props.enabled && preventOverflowTextSelection()),
		ref: $$props.ref
	});
	var fragment = comment();
	snippet(first_child(fragment), () => $$props.children ?? noop);
	append($$anchor, fragment);
	pop();
}
globalThis.bitsIdCounter ??= { current: 0 };
function useId(prefix = "bits") {
	globalThis.bitsIdCounter.current++;
	return `${prefix}-${globalThis.bitsIdCounter.current}`;
}
var SharedState = class {
	#factory;
	#subscribers = 0;
	#state = state();
	#scope;
	constructor(factory) {
		this.#factory = factory;
	}
	#dispose() {
		this.#subscribers -= 1;
		if (this.#scope && this.#subscribers <= 0) {
			this.#scope();
			set(this.#state, void 0);
			this.#scope = void 0;
		}
	}
	get(...args) {
		this.#subscribers += 1;
		if (get(this.#state) === void 0) this.#scope = effect_root(() => {
			set(this.#state, this.#factory(...args), true);
		});
		user_effect(() => {
			return () => {
				this.#dispose();
			};
		});
		return get(this.#state);
	}
};
var lockMap = new SvelteMap();
var initialBodyStyle = state(null);
var stopTouchMoveListener = null;
var cleanupTimeoutId = null;
var isInCleanupTransition = false;
var anyLocked = boxWith(() => {
	for (const value of lockMap.values()) if (value) return true;
	return false;
});
var cleanupScheduledAt = null;
var bodyLockStackCount = new SharedState(() => {
	function resetBodyStyle() {
		document.body.setAttribute("style", get(initialBodyStyle) ?? "");
		document.body.style.removeProperty("--scrollbar-width");
		isIOS && stopTouchMoveListener?.();
		set(initialBodyStyle, null);
	}
	function cancelPendingCleanup() {
		if (cleanupTimeoutId === null) return;
		window.clearTimeout(cleanupTimeoutId);
		cleanupTimeoutId = null;
	}
	function scheduleCleanupIfNoNewLocks(delay, callback) {
		cancelPendingCleanup();
		isInCleanupTransition = true;
		cleanupScheduledAt = Date.now();
		const currentCleanupId = cleanupScheduledAt;
		const cleanupFn = () => {
			cleanupTimeoutId = null;
			if (cleanupScheduledAt !== currentCleanupId) return;
			if (!isAnyLocked(lockMap)) {
				isInCleanupTransition = false;
				callback();
			} else isInCleanupTransition = false;
		};
		const actualDelay = delay === null ? 24 : delay;
		cleanupTimeoutId = window.setTimeout(cleanupFn, actualDelay);
	}
	function ensureInitialStyleCaptured() {
		if (get(initialBodyStyle) === null && lockMap.size === 0 && !isInCleanupTransition) set(initialBodyStyle, document.body.getAttribute("style"), true);
	}
	watch(() => anyLocked.current, () => {
		if (!anyLocked.current) return;
		ensureInitialStyleCaptured();
		isInCleanupTransition = false;
		const bodyStyle = getComputedStyle(document.body);
		const verticalScrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
		const config = {
			padding: Number.parseInt(bodyStyle.paddingRight ?? "0", 10) + verticalScrollbarWidth,
			margin: Number.parseInt(bodyStyle.marginRight ?? "0", 10)
		};
		if (verticalScrollbarWidth > 0) {
			document.body.style.paddingRight = `${config.padding}px`;
			document.body.style.marginRight = `${config.margin}px`;
			document.body.style.setProperty("--scrollbar-width", `${verticalScrollbarWidth}px`);
			document.body.style.overflow = "hidden";
		}
		if (isIOS) stopTouchMoveListener = on(document, "touchmove", (e) => {
			if (e.target !== document.documentElement) return;
			if (e.touches.length > 1) return;
			e.preventDefault();
		}, { passive: false });
		afterTick(() => {
			document.body.style.pointerEvents = "none";
			document.body.style.overflow = "hidden";
		});
	});
	onDestroyEffect(() => {
		return () => {
			stopTouchMoveListener?.();
		};
	});
	return {
		get lockMap() {
			return lockMap;
		},
		resetBodyStyle,
		scheduleCleanupIfNoNewLocks,
		cancelPendingCleanup,
		ensureInitialStyleCaptured
	};
});
var BodyScrollLock = class {
	#id = useId();
	#initialState;
	#restoreScrollDelay = () => null;
	#countState;
	locked;
	constructor(initialState, restoreScrollDelay = () => null) {
		this.#initialState = initialState;
		this.#restoreScrollDelay = restoreScrollDelay;
		this.#countState = bodyLockStackCount.get();
		if (!this.#countState) return;
		this.#countState.cancelPendingCleanup();
		this.#countState.ensureInitialStyleCaptured();
		this.#countState.lockMap.set(this.#id, this.#initialState ?? false);
		this.locked = boxWith(() => this.#countState.lockMap.get(this.#id) ?? false, (v) => this.#countState.lockMap.set(this.#id, v));
		onDestroyEffect(() => {
			this.#countState.lockMap.delete(this.#id);
			if (isAnyLocked(this.#countState.lockMap)) return;
			const restoreScrollDelay$1 = this.#restoreScrollDelay();
			this.#countState.scheduleCleanupIfNoNewLocks(restoreScrollDelay$1, () => {
				this.#countState.resetBodyStyle();
			});
		});
	}
};
function isAnyLocked(map) {
	for (const [_, value] of map) if (value) return true;
	return false;
}
function Scroll_lock($$anchor, $$props) {
	push($$props, true);
	let preventScroll = prop($$props, "preventScroll", 3, true), restoreScrollDelay = prop($$props, "restoreScrollDelay", 3, null);
	if (preventScroll()) new BodyScrollLock(preventScroll(), () => restoreScrollDelay());
	pop();
}
var isUsingKeyboard = state(false);
var IsUsingKeyboard = class IsUsingKeyboard {
	static _refs = 0;
	static _cleanup;
	constructor() {
		user_effect(() => {
			if (IsUsingKeyboard._refs === 0) IsUsingKeyboard._cleanup = effect_root(() => {
				const callbacksToDispose = [];
				const handlePointer = (_) => {
					set(isUsingKeyboard, false);
				};
				const handleKeydown = (_) => {
					set(isUsingKeyboard, true);
				};
				callbacksToDispose.push(on(document, "pointerdown", handlePointer, { capture: true }), on(document, "pointermove", handlePointer, { capture: true }), on(document, "keydown", handleKeydown, { capture: true }));
				return executeCallbacks(...callbacksToDispose);
			});
			IsUsingKeyboard._refs++;
			return () => {
				IsUsingKeyboard._refs--;
				if (IsUsingKeyboard._refs === 0) {
					set(isUsingKeyboard, false);
					IsUsingKeyboard._cleanup?.();
				}
			};
		});
	}
	get current() {
		return get(isUsingKeyboard);
	}
	set current(value) {
		set(isUsingKeyboard, value, true);
	}
};
export { getWindow as C, onDestroyEffect as E, DOMContext as S, afterSleep as T, boxAutoReset as _, Escape_layer as a, PresenceManager as b, MenuContentState as c, MenuMenuState as d, MenuRadioGroupState as f, DOMTypeahead as g, MenuSubmenuState as h, Focus_scope as i, MenuGroupState as l, MenuSeparatorState as m, useId as n, Dismissible_layer as o, MenuRootState as p, Text_selection_layer as r, DropdownMenuTriggerState as s, Scroll_lock as t, MenuItemState as u, getFirstNonCommentChild as v, afterTick as w, RovingFocusGroup as x, Portal as y };
