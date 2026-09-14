import { B as html, Ct as set, D as set_attribute, Ft as push, G as if_block, Ot as user_derived, P as head, Pt as pop, Tt as state, X as comment, Y as append, Yt as true_default, Z as from_html, bt as sibling, dt as effect_root, ht as user_pre_effect, kt as createSubscriber, lt as untrack, mt as user_effect, o as prop, ot as get, pt as template_effect, r as onMount, rt as on, xt as proxy, yt as first_child } from "./DUscB9kS.js";
import { t as MediaQuery } from "./CJDS8lnd.js";
const defaultWindow$1 = typeof window !== "undefined" ? window : void 0;
typeof window !== "undefined" && window.document;
typeof window !== "undefined" && window.navigator;
typeof window !== "undefined" && window.location;
function getActiveElement$1(document$1) {
	let activeElement$2 = document$1.activeElement;
	while (activeElement$2?.shadowRoot) {
		const node = activeElement$2.shadowRoot.activeElement;
		if (node === activeElement$2) break;
		else activeElement$2 = node;
	}
	return activeElement$2;
}
var ActiveElement$1 = class {
	#document;
	#subscribe;
	constructor(options = {}) {
		const { window: window$1 = defaultWindow$1, document: document$1 = window$1?.document } = options;
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
		return getActiveElement$1(this.#document);
	}
};
new ActiveElement$1();
function runEffect$1(flush, effect) {
	switch (flush) {
		case "post":
			user_effect(effect);
			break;
		case "pre":
			user_pre_effect(effect);
			break;
	}
}
function runWatcher$1(sources, flush, effect, options = {}) {
	const { lazy = false } = options;
	let active = !lazy;
	let previousValues = Array.isArray(sources) ? [] : void 0;
	runEffect$1(flush, () => {
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
function runWatcherOnce$1(sources, flush, effect) {
	const cleanupRoot = effect_root(() => {
		let stop = false;
		runWatcher$1(sources, flush, (values, previousValues) => {
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
function watch$1(sources, effect, options) {
	runWatcher$1(sources, "post", effect, options);
}
function watchPre$1(sources, effect, options) {
	runWatcher$1(sources, "pre", effect, options);
}
watch$1.pre = watchPre$1;
function watchOnce$1(source, effect) {
	runWatcherOnce$1(source, "post", effect);
}
function watchOncePre$1(source, effect) {
	runWatcherOnce$1(source, "pre", effect);
}
watchOnce$1.pre = watchOncePre$1;
function getStorage(storageType, window$1) {
	switch (storageType) {
		case "local": return window$1.localStorage;
		case "session": return window$1.sessionStorage;
	}
}
var PersistedState = class {
	#current;
	#key;
	#serializer;
	#storage;
	#subscribe;
	#version = state(0);
	constructor(key, initialValue, options = {}) {
		const { storage: storageType = "local", serializer = {
			serialize: JSON.stringify,
			deserialize: JSON.parse
		}, syncTabs = true, window: window$1 = defaultWindow$1 } = options;
		this.#current = initialValue;
		this.#key = key;
		this.#serializer = serializer;
		if (window$1 === void 0) return;
		const storage = getStorage(storageType, window$1);
		this.#storage = storage;
		const existingValue = storage.getItem(key);
		if (existingValue !== null) this.#current = this.#deserialize(existingValue);
		else this.#serialize(initialValue);
		if (syncTabs && storageType === "local") this.#subscribe = createSubscriber(() => {
			return on(window$1, "storage", this.#handleStorageEvent);
		});
	}
	get current() {
		this.#subscribe?.();
		get(this.#version);
		const root = this.#deserialize(this.#storage?.getItem(this.#key)) ?? this.#current;
		const proxies = /* @__PURE__ */ new WeakMap();
		const proxy$1 = (value) => {
			if (value === null || value?.constructor.name === "Date" || typeof value !== "object") return value;
			let p = proxies.get(value);
			if (!p) {
				p = new Proxy(value, {
					get: (target, property) => {
						get(this.#version);
						return proxy$1(Reflect.get(target, property));
					},
					set: (target, property, value$1) => {
						set(this.#version, get(this.#version) + 1);
						Reflect.set(target, property, value$1);
						this.#serialize(root);
						return true;
					}
				});
				proxies.set(value, p);
			}
			return p;
		};
		return proxy$1(root);
	}
	set current(newValue) {
		this.#serialize(newValue);
		set(this.#version, get(this.#version) + 1);
	}
	#handleStorageEvent = (event) => {
		if (event.key !== this.#key || event.newValue === null) return;
		this.#current = this.#deserialize(event.newValue);
		set(this.#version, get(this.#version) + 1);
	};
	#deserialize(value) {
		try {
			return this.#serializer.deserialize(value);
		} catch (error) {
			console.error(`Error when parsing "${value}" from persisted store "${this.#key}"`, error);
			return;
		}
	}
	#serialize(value) {
		try {
			if (value != void 0) this.#storage?.setItem(this.#key, this.#serializer.serialize(value));
		} catch (error) {
			console.error(`Error when writing value from persisted store "${this.#key}" to ${this.#storage}`, error);
		}
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
		get(cleanupFns).forEach((fn) => fn());
		set(cleanupFns, [], true);
	};
	const onCleanup = (fn) => {
		set(cleanupFns, [...get(cleanupFns), fn], true);
	};
	const baseFetcher = async (value, previousValue, refetching = false) => {
		try {
			set(loading, true);
			set(error, void 0);
			runCleanup();
			const controller = new AbortController();
			onCleanup(() => controller.abort());
			const result = await fetcher(value, previousValue, {
				data: get(current),
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
		if (prevValues && JSON.stringify(values) === JSON.stringify(prevValues)) return;
		prevValues = values;
		runFetcher(Array.isArray(source) ? values : values[0], Array.isArray(source) ? previousValues : previousValues?.[0]);
	}, { lazy });
	return {
		get current() {
			return get(current);
		},
		get loading() {
			return get(loading);
		},
		get error() {
			return get(error);
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
		watch$1(getters, (values, previousValues) => {
			fn(values, previousValues ?? []);
		}, options$1);
	});
}
function resourcePre(source, fetcher, options) {
	return runResource(source, fetcher, options, (fn, options$1) => {
		const sources = Array.isArray(source) ? source : [source];
		const getter = () => sources.map((s) => s());
		watch$1.pre(getter, (values, previousValues) => {
			fn(values, previousValues ?? []);
		}, options$1);
	});
}
resource.pre = resourcePre;
function sanitizeClassNames(classNames) {
	return classNames.filter((className) => className.length > 0);
}
const noopStorage = {
	getItem: (_key) => null,
	setItem: (_key, _value) => {}
};
const isBrowser = typeof document !== "undefined";
function isFunction(value) {
	return typeof value === "function";
}
function isObject(value) {
	return value !== null && typeof value === "object";
}
var BoxSymbol = Symbol("box");
var isWritableSymbol = Symbol("is-writable");
function isBox(value) {
	return isObject(value) && BoxSymbol in value;
}
function isWritableBox(value) {
	return box.isBox(value) && isWritableSymbol in value;
}
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
function boxWith(getter, setter) {
	const derived = user_derived(getter);
	if (setter) return {
		[BoxSymbol]: true,
		[isWritableSymbol]: true,
		get current() {
			return get(derived);
		},
		set current(v) {
			setter(v);
		}
	};
	return {
		[BoxSymbol]: true,
		get current() {
			return getter();
		}
	};
}
function boxFrom(value) {
	if (box.isBox(value)) return value;
	if (isFunction(value)) return box.with(value);
	return box(value);
}
function boxFlatten(boxes) {
	return Object.entries(boxes).reduce((acc, [key, b]) => {
		if (!box.isBox(b)) return Object.assign(acc, { [key]: b });
		if (box.isWritableBox(b)) Object.defineProperty(acc, key, {
			get() {
				return b.current;
			},
			set(v) {
				b.current = v;
			}
		});
		else Object.defineProperty(acc, key, { get() {
			return b.current;
		} });
		return acc;
	}, {});
}
function toReadonlyBox(b) {
	if (!box.isWritableBox(b)) return b;
	return {
		[BoxSymbol]: true,
		get current() {
			return b.current;
		}
	};
}
box.from = boxFrom;
box.with = boxWith;
box.flatten = boxFlatten;
box.readonly = toReadonlyBox;
box.isBox = isBox;
box.isWritableBox = isWritableBox;
function createParser(matcher, replacer) {
	const regex = RegExp(matcher, "g");
	return (str) => {
		if (typeof str !== "string") throw new TypeError(`expected an argument of type string, but got ${typeof str}`);
		if (!str.match(regex)) return str;
		return str.replace(regex, replacer);
	};
}
var camelToKebab = createParser(/[A-Z]/, (match) => `-${match.toLowerCase()}`);
function styleToCSS(styleObj) {
	if (!styleObj || typeof styleObj !== "object" || Array.isArray(styleObj)) throw new TypeError(`expected an argument of type object, but got ${typeof styleObj}`);
	return Object.keys(styleObj).map((property) => `${camelToKebab(property)}: ${styleObj[property]};`).join("\n");
}
function styleToString(style = {}) {
	return styleToCSS(style).replace("\n", " ");
}
styleToString({
	position: "absolute",
	width: "1px",
	height: "1px",
	padding: "0",
	margin: "-1px",
	overflow: "hidden",
	clip: "rect(0, 0, 0, 0)",
	whiteSpace: "nowrap",
	borderWidth: "0",
	transform: "translateX(-100%)"
});
const defaultWindow = typeof window !== "undefined" ? window : void 0;
typeof window !== "undefined" && window.document;
typeof window !== "undefined" && window.navigator;
typeof window !== "undefined" && window.location;
function getActiveElement(document$1) {
	let activeElement$2 = document$1.activeElement;
	while (activeElement$2?.shadowRoot) {
		const node = activeElement$2.shadowRoot.activeElement;
		if (node === activeElement$2) break;
		else activeElement$2 = node;
	}
	return activeElement$2;
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
const modeStorageKey = box("mode-watcher-mode");
const themeStorageKey = box("mode-watcher-theme");
const modes = [
	"dark",
	"light",
	"system"
];
function isValidMode(value) {
	if (typeof value !== "string") return false;
	return modes.includes(value);
}
var UserPrefersMode = class {
	#defaultValue = "system";
	#storage = isBrowser ? localStorage : noopStorage;
	#initialValue = this.#storage.getItem(modeStorageKey.current);
	#value = isValidMode(this.#initialValue) ? this.#initialValue : this.#defaultValue;
	#persisted = state(proxy(this.#makePersisted()));
	#makePersisted(value = this.#value) {
		return new PersistedState(modeStorageKey.current, value, { serializer: {
			serialize: (v) => v,
			deserialize: (v) => {
				if (isValidMode(v)) return v;
				return this.#defaultValue;
			}
		} });
	}
	constructor() {
		effect_root(() => {
			return watch$1.pre(() => modeStorageKey.current, (_, prevStorageKey) => {
				const currModeValue = get(this.#persisted).current;
				set(this.#persisted, this.#makePersisted(currModeValue), true);
				if (prevStorageKey) localStorage.removeItem(prevStorageKey);
			});
		});
	}
	get current() {
		return get(this.#persisted).current;
	}
	set current(newValue) {
		get(this.#persisted).current = newValue;
	}
};
var SystemPrefersMode = class {
	#defaultValue = void 0;
	#track = true;
	#current = state(proxy(this.#defaultValue));
	#mediaQueryState = typeof window !== "undefined" && typeof window.matchMedia === "function" ? new MediaQuery("prefers-color-scheme: light") : { current: false };
	query() {
		if (!isBrowser) return;
		set(this.#current, this.#mediaQueryState.current ? "light" : "dark", true);
	}
	tracking(active) {
		this.#track = active;
	}
	constructor() {
		effect_root(() => {
			user_pre_effect(() => {
				if (!this.#track) return;
				this.query();
			});
		});
		this.query = this.query.bind(this);
		this.tracking = this.tracking.bind(this);
	}
	get current() {
		return get(this.#current);
	}
};
const userPrefersMode = new UserPrefersMode();
const systemPrefersMode = new SystemPrefersMode();
var CustomTheme = class {
	#storage = isBrowser ? localStorage : noopStorage;
	#initialValue = this.#storage.getItem(themeStorageKey.current);
	#value = this.#initialValue === null || this.#initialValue === void 0 ? "" : this.#initialValue;
	#persisted = state(proxy(this.#makePersisted()));
	#makePersisted(value = this.#value) {
		return new PersistedState(themeStorageKey.current, value, { serializer: {
			serialize: (v) => {
				if (typeof v !== "string") return "";
				return v;
			},
			deserialize: (v) => v
		} });
	}
	constructor() {
		effect_root(() => {
			return watch$1.pre(() => themeStorageKey.current, (_, prevStorageKey) => {
				const currModeValue = get(this.#persisted).current;
				set(this.#persisted, this.#makePersisted(currModeValue), true);
				if (prevStorageKey) localStorage.removeItem(prevStorageKey);
			});
		});
	}
	get current() {
		return get(this.#persisted).current;
	}
	set current(newValue) {
		get(this.#persisted).current = newValue;
	}
};
const customTheme = new CustomTheme();
var timeoutAction;
var timeoutEnable;
var hasLoaded = false;
var styleElement = null;
function getStyleElement() {
	if (styleElement) return styleElement;
	styleElement = document.createElement("style");
	styleElement.appendChild(document.createTextNode(`* {
		-webkit-transition: none !important;
		-moz-transition: none !important;
		-o-transition: none !important;
		-ms-transition: none !important;
		transition: none !important;
	}`));
	return styleElement;
}
function withoutTransition(action, synchronous = false) {
	if (typeof document === "undefined") return;
	if (!hasLoaded) {
		hasLoaded = true;
		action();
		return;
	}
	if (typeof window !== "undefined" && window.__vitest_worker__) {
		action();
		return;
	}
	clearTimeout(timeoutAction);
	clearTimeout(timeoutEnable);
	const style = getStyleElement();
	const disable = () => document.head.appendChild(style);
	const enable = () => {
		if (style.parentNode) document.head.removeChild(style);
	};
	function executeAction() {
		action();
		window.requestAnimationFrame(enable);
	}
	if (typeof window.requestAnimationFrame !== "undefined") {
		disable();
		if (synchronous) executeAction();
		else window.requestAnimationFrame(() => {
			executeAction();
		});
		return;
	}
	disable();
	timeoutAction = window.setTimeout(() => {
		action();
		timeoutEnable = window.setTimeout(enable, 16);
	}, 16);
}
const themeColors = box(void 0);
const disableTransitions = box(true);
const synchronousModeChanges = box(false);
const darkClassNames = box([]);
const lightClassNames = box([]);
function createDerivedMode() {
	const current = user_derived(() => {
		if (!isBrowser) return void 0;
		const derivedMode$1 = userPrefersMode.current === "system" ? systemPrefersMode.current : userPrefersMode.current;
		const sanitizedDarkClassNames = sanitizeClassNames(darkClassNames.current);
		const sanitizedLightClassNames = sanitizeClassNames(lightClassNames.current);
		function update() {
			const htmlEl = document.documentElement;
			const themeColorEl = document.querySelector("meta[name=\"theme-color\"]");
			if (derivedMode$1 === "light") {
				if (sanitizedDarkClassNames.length) htmlEl.classList.remove(...sanitizedDarkClassNames);
				if (sanitizedLightClassNames.length) htmlEl.classList.add(...sanitizedLightClassNames);
				htmlEl.style.colorScheme = "light";
				if (themeColorEl && themeColors.current) themeColorEl.setAttribute("content", themeColors.current.light);
			} else {
				if (sanitizedLightClassNames.length) htmlEl.classList.remove(...sanitizedLightClassNames);
				if (sanitizedDarkClassNames.length) htmlEl.classList.add(...sanitizedDarkClassNames);
				htmlEl.style.colorScheme = "dark";
				if (themeColorEl && themeColors.current) themeColorEl.setAttribute("content", themeColors.current.dark);
			}
		}
		if (disableTransitions.current) withoutTransition(update, synchronousModeChanges.current);
		else update();
		return derivedMode$1;
	});
	return { get current() {
		return get(current);
	} };
}
function createDerivedTheme() {
	const current = user_derived(() => {
		customTheme.current;
		if (!isBrowser) return void 0;
		function update() {
			document.documentElement.setAttribute("data-theme", customTheme.current);
		}
		if (disableTransitions.current) withoutTransition(update, untrack(() => synchronousModeChanges.current));
		else update();
		return customTheme.current;
	});
	return { get current() {
		return get(current);
	} };
}
const derivedMode = createDerivedMode();
const derivedTheme = createDerivedTheme();
function setMode(mode) {
	userPrefersMode.current = mode;
}
function resetMode() {
	userPrefersMode.current = "system";
}
function setTheme(newTheme) {
	customTheme.current = newTheme;
}
function defineConfig(config) {
	return config;
}
function setInitialMode({ defaultMode = "system", themeColors: themeColors$1, darkClassNames: darkClassNames$1 = ["dark"], lightClassNames: lightClassNames$1 = [], defaultTheme = "", modeStorageKey: modeStorageKey$1 = "mode-watcher-mode", themeStorageKey: themeStorageKey$1 = "mode-watcher-theme" }) {
	const rootEl = document.documentElement;
	const mode = localStorage.getItem(modeStorageKey$1) ?? defaultMode;
	const theme = localStorage.getItem(themeStorageKey$1) ?? defaultTheme;
	const light = mode === "light" || mode === "system" && window.matchMedia("(prefers-color-scheme: light)").matches;
	if (light) {
		if (darkClassNames$1.length) rootEl.classList.remove(...darkClassNames$1.filter(Boolean));
		if (lightClassNames$1.length) rootEl.classList.add(...lightClassNames$1.filter(Boolean));
	} else {
		if (lightClassNames$1.length) rootEl.classList.remove(...lightClassNames$1.filter(Boolean));
		if (darkClassNames$1.length) rootEl.classList.add(...darkClassNames$1.filter(Boolean));
	}
	rootEl.style.colorScheme = light ? "light" : "dark";
	if (themeColors$1) {
		const themeMetaEl = document.querySelector("meta[name=\"theme-color\"]");
		if (themeMetaEl) themeMetaEl.setAttribute("content", mode === "light" ? themeColors$1.light : themeColors$1.dark);
	}
	if (theme) {
		rootEl.setAttribute("data-theme", theme);
		localStorage.setItem(themeStorageKey$1, theme);
	}
	localStorage.setItem(modeStorageKey$1, mode);
}
var root_1$1 = from_html(`<meta name="theme-color"/>`);
function Mode_watcher_lite($$anchor, $$props) {
	push($$props, true);
	var fragment = comment();
	var node = first_child(fragment);
	var consequent = ($$anchor$1) => {
		var meta = root_1$1();
		template_effect(() => set_attribute(meta, "content", $$props.themeColors.dark));
		append($$anchor$1, meta);
	};
	if_block(node, ($$render) => {
		if ($$props.themeColors) $$render(consequent);
	});
	append($$anchor, fragment);
	pop();
}
var root_2 = from_html(`<meta name="theme-color"/>`);
var root_1 = from_html(`<!> <!>`, 1);
function Mode_watcher_full($$anchor, $$props) {
	push($$props, true);
	let trueNonce = prop($$props, "trueNonce", 3, "");
	head("1b0rbe2", ($$anchor$1) => {
		var fragment = root_1();
		var node = first_child(fragment);
		var consequent = ($$anchor$2) => {
			var meta = root_2();
			template_effect(() => set_attribute(meta, "content", $$props.themeColors.dark));
			append($$anchor$2, meta);
		};
		if_block(node, ($$render) => {
			if ($$props.themeColors) $$render(consequent);
		});
		html(sibling(node, 2), () => `<script${trueNonce() ? ` nonce=${trueNonce()}` : ""}>(` + setInitialMode.toString() + `)(` + JSON.stringify($$props.initConfig) + `);<\/script>`);
		append($$anchor$1, fragment);
	});
	pop();
}
function Mode_watcher($$anchor, $$props) {
	push($$props, true);
	let track = prop($$props, "track", 3, true), defaultMode = prop($$props, "defaultMode", 3, "system"), disableTransitionsProp = prop($$props, "disableTransitions", 3, true), darkClassNamesProp = prop($$props, "darkClassNames", 19, () => ["dark"]), lightClassNamesProp = prop($$props, "lightClassNames", 19, () => []), defaultTheme = prop($$props, "defaultTheme", 3, ""), nonce = prop($$props, "nonce", 3, ""), themeStorageKeyProp = prop($$props, "themeStorageKey", 3, "mode-watcher-theme"), modeStorageKeyProp = prop($$props, "modeStorageKey", 3, "mode-watcher-mode"), disableHeadScriptInjection = prop($$props, "disableHeadScriptInjection", 3, false), synchronousModeChangesProp = prop($$props, "synchronousModeChanges", 3, false);
	modeStorageKey.current = modeStorageKeyProp();
	themeStorageKey.current = themeStorageKeyProp();
	darkClassNames.current = darkClassNamesProp();
	lightClassNames.current = lightClassNamesProp();
	disableTransitions.current = disableTransitionsProp();
	themeColors.current = $$props.themeColors;
	synchronousModeChanges.current = synchronousModeChangesProp();
	user_pre_effect(() => {
		synchronousModeChanges.current = synchronousModeChangesProp();
	});
	user_pre_effect(() => {
		disableTransitions.current = disableTransitionsProp();
	});
	user_pre_effect(() => {
		themeColors.current = $$props.themeColors;
	});
	user_pre_effect(() => {
		darkClassNames.current = darkClassNamesProp();
	});
	user_pre_effect(() => {
		lightClassNames.current = lightClassNamesProp();
	});
	user_pre_effect(() => {
		modeStorageKey.current = modeStorageKeyProp();
	});
	user_pre_effect(() => {
		themeStorageKey.current = themeStorageKeyProp();
	});
	user_pre_effect(() => {
		derivedMode.current;
		modeStorageKey.current;
		themeStorageKey.current;
		derivedTheme.current;
	});
	onMount(() => {
		systemPrefersMode.tracking(track());
		systemPrefersMode.query();
		const localStorageMode = localStorage.getItem(modeStorageKey.current);
		setMode(isValidMode(localStorageMode) ? localStorageMode : defaultMode());
		setTheme(localStorage.getItem(themeStorageKey.current) || defaultTheme());
	});
	const initConfig = defineConfig({
		defaultMode: defaultMode(),
		themeColors: $$props.themeColors,
		darkClassNames: darkClassNamesProp(),
		lightClassNames: lightClassNamesProp(),
		defaultTheme: defaultTheme(),
		modeStorageKey: modeStorageKeyProp(),
		themeStorageKey: themeStorageKeyProp()
	});
	const trueNonce = user_derived(() => typeof window === "undefined" ? nonce() : "");
	var fragment = comment();
	var node = first_child(fragment);
	var consequent = ($$anchor$1) => {
		Mode_watcher_lite($$anchor$1, { get themeColors() {
			return themeColors.current;
		} });
	};
	var alternate = ($$anchor$1) => {
		Mode_watcher_full($$anchor$1, {
			get trueNonce() {
				return get(trueNonce);
			},
			get initConfig() {
				return initConfig;
			},
			get themeColors() {
				return themeColors.current;
			}
		});
	};
	if_block(node, ($$render) => {
		if (disableHeadScriptInjection()) $$render(consequent);
		else $$render(alternate, false);
	});
	append($$anchor, fragment);
	pop();
}
export { modeStorageKey as a, derivedMode as i, resetMode as n, setMode as r, Mode_watcher as t };
