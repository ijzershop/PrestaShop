import { Ct as set, Jt as false_default, Lt as label, Rt as tag, St as increment, Tt as state, kt as createSubscriber, ot as get, rt as on, ut as update_version, wt as source } from "./DUscB9kS.js";
var SvelteMap = class extends Map {
	#sources = /* @__PURE__ */ new Map();
	#version = /* @__PURE__ */ state(0);
	#size = /* @__PURE__ */ state(0);
	#update_version = update_version || -1;
	constructor(value) {
		super();
		if (value) {
			for (var [key, v] of value) super.set(key, v);
			this.#size.v = super.size;
		}
	}
	#source(value) {
		return update_version === this.#update_version ? /* @__PURE__ */ state(value) : source(value);
	}
	has(key) {
		var sources = this.#sources;
		var s = sources.get(key);
		if (s === void 0) if (super.get(key) !== void 0) {
			s = this.#source(0);
			sources.set(key, s);
		} else {
			get(this.#version);
			return false;
		}
		get(s);
		return true;
	}
	forEach(callbackfn, this_arg) {
		this.#read_all();
		super.forEach(callbackfn, this_arg);
	}
	get(key) {
		var sources = this.#sources;
		var s = sources.get(key);
		if (s === void 0) if (super.get(key) !== void 0) {
			s = this.#source(0);
			sources.set(key, s);
		} else {
			get(this.#version);
			return;
		}
		get(s);
		return super.get(key);
	}
	set(key, value) {
		var sources = this.#sources;
		var s = sources.get(key);
		var prev_res = super.get(key);
		var res = super.set(key, value);
		var version = this.#version;
		if (s === void 0) {
			s = this.#source(0);
			sources.set(key, s);
			set(this.#size, super.size);
			increment(version);
		} else if (prev_res !== value) {
			increment(s);
			var v_reactions = version.reactions === null ? null : new Set(version.reactions);
			if (v_reactions === null || !s.reactions?.every((r) => v_reactions.has(r))) increment(version);
		}
		return res;
	}
	delete(key) {
		var sources = this.#sources;
		var s = sources.get(key);
		var res = super.delete(key);
		if (s !== void 0) {
			sources.delete(key);
			set(this.#size, super.size);
			set(s, -1);
			increment(this.#version);
		}
		return res;
	}
	clear() {
		if (super.size === 0) return;
		super.clear();
		var sources = this.#sources;
		set(this.#size, 0);
		for (var s of sources.values()) set(s, -1);
		increment(this.#version);
		sources.clear();
	}
	#read_all() {
		get(this.#version);
		var sources = this.#sources;
		if (this.#size.v !== sources.size) {
			for (var key of super.keys()) if (!sources.has(key)) {
				var s = this.#source(0);
				sources.set(key, s);
			}
		}
		for ([, s] of this.#sources) get(s);
	}
	keys() {
		get(this.#version);
		return super.keys();
	}
	values() {
		this.#read_all();
		return super.values();
	}
	entries() {
		this.#read_all();
		return super.entries();
	}
	[Symbol.iterator]() {
		return this.entries();
	}
	get size() {
		get(this.#size);
		return super.size;
	}
};
URLSearchParams, Symbol.iterator;
var ReactiveValue = class {
	#fn;
	#subscribe;
	constructor(fn, onsubscribe) {
		this.#fn = fn;
		this.#subscribe = createSubscriber(onsubscribe);
	}
	get current() {
		this.#subscribe();
		return this.#fn();
	}
};
var parenthesis_regex = /\(.+\)/;
var non_parenthesized_keywords = new Set([
	"all",
	"print",
	"screen",
	"and",
	"or",
	"not",
	"only"
]);
var MediaQuery = class extends ReactiveValue {
	constructor(query, fallback) {
		let final_query = parenthesis_regex.test(query) || query.split(/[\s,]+/).some((keyword) => non_parenthesized_keywords.has(keyword.trim())) ? query : `(${query})`;
		const q = window.matchMedia(final_query);
		super(() => q.matches, (update) => on(q, "change", update));
	}
};
export { SvelteMap as n, MediaQuery as t };
