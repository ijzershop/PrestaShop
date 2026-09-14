import { Ct as set, It as setContext, Mt as getContext, Nt as hasContext, Ot as user_derived, Tt as state, Yt as true_default, dt as effect_root, ht as user_pre_effect, kt as createSubscriber, lt as untrack, mt as user_effect, ot as get, rt as on, xt as proxy } from "./DUscB9kS.js";
function cn(...classes) {
	return classes.filter(Boolean).join(" ");
}
const isBrowser = typeof document !== "undefined";
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
new Context("richColorsContext");
const sonnerContext = new Context("<Toaster/>");
var toastsCounter = 0;
var ToastState = class {
	#toasts = state(proxy([]));
	get toasts() {
		return get(this.#toasts);
	}
	set toasts(value) {
		set(this.#toasts, value, true);
	}
	#heights = state(proxy([]));
	get heights() {
		return get(this.#heights);
	}
	set heights(value) {
		set(this.#heights, value, true);
	}
	#findToastIdx = (id) => {
		const idx = this.toasts.findIndex((toast$1) => toast$1.id === id);
		if (idx === -1) return null;
		return idx;
	};
	addToast = (data) => {
		if (!isBrowser) return;
		this.toasts.unshift(data);
	};
	updateToast = ({ id, data, type, message }) => {
		const toastIdx = this.toasts.findIndex((toast$1) => toast$1.id === id);
		const toastToUpdate = this.toasts[toastIdx];
		this.toasts[toastIdx] = {
			...toastToUpdate,
			...data,
			id,
			title: message,
			type,
			updated: true
		};
	};
	create = (data) => {
		const { message, ...rest } = data;
		const id = typeof data?.id === "number" || data.id && data.id?.length > 0 ? data.id : toastsCounter++;
		const dismissable = data.dismissable === void 0 ? true : data.dismissable;
		const type = data.type === void 0 ? "default" : data.type;
		untrack(() => {
			if (this.toasts.find((toast$1) => toast$1.id === id)) this.updateToast({
				id,
				data,
				type,
				message,
				dismissable
			});
			else this.addToast({
				...rest,
				id,
				title: message,
				dismissable,
				type
			});
		});
		return id;
	};
	dismiss = (id) => {
		untrack(() => {
			if (id === void 0) {
				this.toasts = this.toasts.map((toast$1) => ({
					...toast$1,
					dismiss: true
				}));
				return;
			}
			const toastIdx = this.toasts.findIndex((toast$1) => toast$1.id === id);
			if (this.toasts[toastIdx]) this.toasts[toastIdx] = {
				...this.toasts[toastIdx],
				dismiss: true
			};
		});
		return id;
	};
	remove = (id) => {
		if (id === void 0) {
			this.toasts = [];
			return;
		}
		const toastIdx = this.#findToastIdx(id);
		if (toastIdx === null) return;
		this.toasts.splice(toastIdx, 1);
		return id;
	};
	message = (message, data) => {
		return this.create({
			...data,
			type: "default",
			message
		});
	};
	error = (message, data) => {
		return this.create({
			...data,
			type: "error",
			message
		});
	};
	success = (message, data) => {
		return this.create({
			...data,
			type: "success",
			message
		});
	};
	info = (message, data) => {
		return this.create({
			...data,
			type: "info",
			message
		});
	};
	warning = (message, data) => {
		return this.create({
			...data,
			type: "warning",
			message
		});
	};
	loading = (message, data) => {
		return this.create({
			...data,
			type: "loading",
			message
		});
	};
	promise = (promise, data) => {
		if (!data) return;
		let id = void 0;
		if (data.loading !== void 0) id = this.create({
			...data,
			promise,
			type: "loading",
			message: typeof data.loading === "string" ? data.loading : data.loading()
		});
		const p = promise instanceof Promise ? promise : promise();
		let shouldDismiss = id !== void 0;
		p.then((response) => {
			if (typeof response === "object" && response && "ok" in response && typeof response.ok === "boolean" && !response.ok) {
				shouldDismiss = false;
				const message = constructPromiseErrorMessage(response);
				this.create({
					id,
					type: "error",
					message
				});
			} else if (data.success !== void 0) {
				shouldDismiss = false;
				const message = typeof data.success === "function" ? data.success(response) : data.success;
				this.create({
					id,
					type: "success",
					message
				});
			}
		}).catch((error) => {
			if (data.error !== void 0) {
				shouldDismiss = false;
				const message = typeof data.error === "function" ? data.error(error) : data.error;
				this.create({
					id,
					type: "error",
					message
				});
			}
		}).finally(() => {
			if (shouldDismiss) {
				this.dismiss(id);
				id = void 0;
			}
			data.finally?.();
		});
		return id;
	};
	custom = (component, data) => {
		const id = data?.id || toastsCounter++;
		this.create({
			component,
			id,
			...data
		});
		return id;
	};
	removeHeight = (id) => {
		this.heights = this.heights.filter((height) => height.toastId !== id);
	};
	setHeight = (data) => {
		const toastIdx = this.#findToastIdx(data.toastId);
		if (toastIdx === null) {
			this.heights.push(data);
			return;
		}
		this.heights[toastIdx] = data;
	};
	reset = () => {
		this.toasts = [];
		this.heights = [];
	};
};
function constructPromiseErrorMessage(response) {
	if (response && typeof response === "object" && "status" in response) return `HTTP error! Status: ${response.status}`;
	return `Error! ${response}`;
}
const toastState = new ToastState();
function toastFunction(message, data) {
	return toastState.create({
		message,
		...data
	});
}
var SonnerState = class {
	#activeToasts = user_derived(() => toastState.toasts.filter((toast$1) => !toast$1.dismiss));
	get toasts() {
		return get(this.#activeToasts);
	}
};
var basicToast = toastFunction;
const toast = Object.assign(basicToast, {
	success: toastState.success,
	info: toastState.info,
	warning: toastState.warning,
	error: toastState.error,
	custom: toastState.custom,
	message: toastState.message,
	promise: toastState.promise,
	dismiss: toastState.dismiss,
	loading: toastState.loading,
	getActiveToasts: () => {
		return toastState.toasts.filter((toast$1) => !toast$1.dismiss);
	}
});
export { cn as a, sonnerContext as i, toast as n, toastState as r, SonnerState as t };
