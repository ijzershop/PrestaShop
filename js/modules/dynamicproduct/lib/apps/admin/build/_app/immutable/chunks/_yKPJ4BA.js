import { Ct as set, It as setContext, Mt as getContext, Nt as hasContext, Ot as user_derived, Tt as state, Yt as true_default, dt as effect_root, ht as user_pre_effect, kt as createSubscriber, lt as untrack, mt as user_effect, ot as get$1, rt as on, xt as proxy } from "./DUscB9kS.js";
const defaultWindow = typeof window !== "undefined" ? window : void 0;
typeof window !== "undefined" && window.document;
typeof window !== "undefined" && window.navigator;
typeof window !== "undefined" && window.location;
function getActiveElement(document$1) {
	let activeElement$1 = document$1.activeElement;
	while (activeElement$1?.shadowRoot) {
		const node = activeElement$1.shadowRoot.activeElement;
		if (node === activeElement$1) break;
		else activeElement$1 = node;
	}
	return activeElement$1;
}
var ActiveElement = class {
	#document;
	#subscribe;
	constructor(options = {}) {
		const { window: window$1 = defaultWindow, document: document$1 = window$1?.document } = options;
		if (window$1 === void 0) return;
		this.#document = document$1;
		this.#subscribe = createSubscriber((update) => {
			const cleanupFocusIn = on(window$1, "focusin", update);
			const cleanupFocusOut = on(window$1, "focusout", update);
			return () => {
				cleanupFocusIn();
				cleanupFocusOut();
			};
		});
	}
	get current() {
		this.#subscribe?.();
		if (!this.#document) return null;
		return getActiveElement(this.#document);
	}
};
new ActiveElement();
function isFunction(value) {
	return typeof value === "function";
}
var Context = class {
	#name;
	#key;
	constructor(name) {
		this.#name = name;
		this.#key = Symbol(name);
	}
	get key() {
		return this.#key;
	}
	exists() {
		return hasContext(this.#key);
	}
	get() {
		const context = getContext(this.#key);
		if (context === void 0) throw new Error(`Context "${this.#name}" not found`);
		return context;
	}
	getOr(fallback) {
		const context = getContext(this.#key);
		if (context === void 0) return fallback;
		return context;
	}
	set(context) {
		return setContext(this.#key, context);
	}
};
function runEffect(flush, effect) {
	switch (flush) {
		case "post":
			user_effect(effect);
			break;
		case "pre":
			user_pre_effect(effect);
			break;
	}
}
function runWatcher(sources, flush, effect, options = {}) {
	const { lazy = false } = options;
	let active = !lazy;
	let previousValues = Array.isArray(sources) ? [] : void 0;
	runEffect(flush, () => {
		const values = Array.isArray(sources) ? sources.map((source) => source()) : sources();
		if (!active) {
			active = true;
			previousValues = values;
			return;
		}
		const cleanup = untrack(() => effect(values, previousValues));
		previousValues = values;
		return cleanup;
	});
}
function runWatcherOnce(sources, flush, effect) {
	const cleanupRoot = effect_root(() => {
		let stop = false;
		runWatcher(sources, flush, (values, previousValues) => {
			if (stop) {
				cleanupRoot();
				return;
			}
			const cleanup = effect(values, previousValues);
			stop = true;
			return cleanup;
		}, { lazy: true });
	});
	user_effect(() => {
		return cleanupRoot;
	});
}
function watch(sources, effect, options) {
	runWatcher(sources, "post", effect, options);
}
function watchPre(sources, effect, options) {
	runWatcher(sources, "pre", effect, options);
}
watch.pre = watchPre;
function watchOnce(source, effect) {
	runWatcherOnce(source, "post", effect);
}
function watchOncePre(source, effect) {
	runWatcherOnce(source, "pre", effect);
}
watchOnce.pre = watchOncePre;
function get(value) {
	if (isFunction(value)) return value();
	return value;
}
var ElementSize = class {
	#size = {
		width: 0,
		height: 0
	};
	#observed = false;
	#options;
	#node;
	#window;
	#width = user_derived(() => {
		get$1(this.#subscribe)?.();
		return this.getSize().width;
	});
	#height = user_derived(() => {
		get$1(this.#subscribe)?.();
		return this.getSize().height;
	});
	#subscribe = user_derived(() => {
		const node$ = get(this.#node);
		if (!node$) return;
		return createSubscriber((update) => {
			if (!this.#window) return;
			const observer = new this.#window.ResizeObserver((entries) => {
				this.#observed = true;
				for (const entry of entries) {
					const boxSize = this.#options.box === "content-box" ? entry.contentBoxSize : entry.borderBoxSize;
					const boxSizeArr = Array.isArray(boxSize) ? boxSize : [boxSize];
					this.#size.width = boxSizeArr.reduce((acc, size) => Math.max(acc, size.inlineSize), 0);
					this.#size.height = boxSizeArr.reduce((acc, size) => Math.max(acc, size.blockSize), 0);
				}
				update();
			});
			observer.observe(node$);
			return () => {
				this.#observed = false;
				observer.disconnect();
			};
		});
	});
	constructor(node, options = { box: "border-box" }) {
		this.#window = options.window ?? defaultWindow;
		this.#options = options;
		this.#node = node;
		this.#size = {
			width: 0,
			height: 0
		};
	}
	calculateSize() {
		const element = get(this.#node);
		if (!element || !this.#window) return;
		const offsetWidth = element.offsetWidth;
		const offsetHeight = element.offsetHeight;
		if (this.#options.box === "border-box") return {
			width: offsetWidth,
			height: offsetHeight
		};
		const style = this.#window.getComputedStyle(element);
		const paddingWidth = parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
		const paddingHeight = parseFloat(style.paddingTop) + parseFloat(style.paddingBottom);
		const borderWidth = parseFloat(style.borderLeftWidth) + parseFloat(style.borderRightWidth);
		const borderHeight = parseFloat(style.borderTopWidth) + parseFloat(style.borderBottomWidth);
		return {
			width: offsetWidth - paddingWidth - borderWidth,
			height: offsetHeight - paddingHeight - borderHeight
		};
	}
	getSize() {
		return this.#observed ? this.#size : this.calculateSize() ?? this.#size;
	}
	get current() {
		get$1(this.#subscribe)?.();
		return this.getSize();
	}
	get width() {
		return get$1(this.#width);
	}
	get height() {
		return get$1(this.#height);
	}
};
var Previous = class {
	#previousCallback = () => void 0;
	#previous = user_derived(() => this.#previousCallback());
	constructor(getter, initialValue) {
		let actualPrevious = void 0;
		if (initialValue !== void 0) actualPrevious = initialValue;
		this.#previousCallback = () => {
			try {
				return actualPrevious;
			} finally {
				actualPrevious = getter();
			}
		};
	}
	get current() {
		return get$1(this.#previous);
	}
};
function debounce(fn, delay) {
	let timeoutId;
	let lastResolve = null;
	return (...args) => {
		return new Promise((resolve) => {
			if (lastResolve) lastResolve(void 0);
			lastResolve = resolve;
			clearTimeout(timeoutId);
			timeoutId = setTimeout(async () => {
				const result = await fn(...args);
				if (lastResolve) {
					lastResolve(result);
					lastResolve = null;
				}
			}, delay);
		});
	};
}
function throttle(fn, delay) {
	let lastRun = 0;
	let lastPromise = null;
	return (...args) => {
		const now = Date.now();
		if (lastRun && now - lastRun < delay) return lastPromise ?? Promise.resolve(void 0);
		lastRun = now;
		lastPromise = fn(...args);
		return lastPromise;
	};
}
function runResource(source, fetcher, options = {}, effectFn) {
	const { lazy = false, once = false, initialValue, debounce: debounceTime, throttle: throttleTime } = options;
	let current = state(proxy(initialValue));
	let loading = state(false);
	let error = state(void 0);
	let cleanupFns = state(proxy([]));
	const runCleanup = () => {
		get$1(cleanupFns).forEach((fn) => fn());
		set(cleanupFns, [], true);
	};
	const onCleanup = (fn) => {
		set(cleanupFns, [...get$1(cleanupFns), fn], true);
	};
	const baseFetcher = async (value, previousValue, refetching = false) => {
		try {
			set(loading, true);
			set(error, void 0);
			runCleanup();
			const controller = new AbortController();
			onCleanup(() => controller.abort());
			const result = await fetcher(value, previousValue, {
				data: get$1(current),
				refetching,
				onCleanup,
				signal: controller.signal
			});
			set(current, result, true);
			return result;
		} catch (e) {
			if (!(e instanceof DOMException && e.name === "AbortError")) set(error, e, true);
			return;
		} finally {
			set(loading, false);
		}
	};
	const runFetcher = debounceTime ? debounce(baseFetcher, debounceTime) : throttleTime ? throttle(baseFetcher, throttleTime) : baseFetcher;
	const sources = Array.isArray(source) ? source : [source];
	let prevValues;
	effectFn((values, previousValues) => {
		if (once && prevValues) return;
		prevValues = values;
		runFetcher(Array.isArray(source) ? values : values[0], Array.isArray(source) ? previousValues : previousValues?.[0]);
	}, { lazy });
	return {
		get current() {
			return get$1(current);
		},
		get loading() {
			return get$1(loading);
		},
		get error() {
			return get$1(error);
		},
		mutate: (value) => {
			set(current, value, true);
		},
		refetch: (info) => {
			const values = sources.map((s) => s());
			return runFetcher(Array.isArray(source) ? values : values[0], Array.isArray(source) ? values : values[0], info ?? true);
		}
	};
}
function resource(source, fetcher, options) {
	return runResource(source, fetcher, options, (fn, options$1) => {
		const sources = Array.isArray(source) ? source : [source];
		const getters = () => sources.map((s) => s());
		watch(getters, (values, previousValues) => {
			fn(values, previousValues ?? []);
		}, options$1);
	});
}
function resourcePre(source, fetcher, options) {
	return runResource(source, fetcher, options, (fn, options$1) => {
		const sources = Array.isArray(source) ? source : [source];
		const getter = () => sources.map((s) => s());
		watch.pre(getter, (values, previousValues) => {
			fn(values, previousValues ?? []);
		}, options$1);
	});
}
resource.pre = resourcePre;
const ALT = "Alt";
const ARROW_DOWN = "ArrowDown";
const ARROW_LEFT = "ArrowLeft";
const ARROW_RIGHT = "ArrowRight";
const ARROW_UP = "ArrowUp";
const CAPS_LOCK = "CapsLock";
const CONTROL = "Control";
const END = "End";
const ENTER = "Enter";
const ESCAPE = "Escape";
const F1 = "F1";
const F10 = "F10";
const F11 = "F11";
const F12 = "F12";
const F2 = "F2";
const F3 = "F3";
const F4 = "F4";
const F5 = "F5";
const F6 = "F6";
const F7 = "F7";
const F8 = "F8";
const F9 = "F9";
const HOME = "Home";
const META = "Meta";
const PAGE_DOWN = "PageDown";
const PAGE_UP = "PageUp";
const SHIFT = "Shift";
const SPACE = " ";
const TAB = "Tab";
const p = "p";
const n = "n";
const j = "j";
const k = "k";
const h = "h";
const l = "l";
export { h as A, HOME as C, SHIFT as D, PAGE_UP as E, p as F, Previous as I, ElementSize as L, k as M, l as N, SPACE as O, n as P, watch as R, F9 as S, PAGE_DOWN as T, F4 as _, ARROW_UP as a, F7 as b, END as c, F1 as d, F10 as f, F3 as g, F2 as h, ARROW_RIGHT as i, j, TAB as k, ENTER as l, F12 as m, ARROW_DOWN as n, CAPS_LOCK as o, F11 as p, ARROW_LEFT as r, CONTROL as s, ALT as t, ESCAPE as u, F5 as v, META as w, F8 as x, F6 as y, Context as z };
