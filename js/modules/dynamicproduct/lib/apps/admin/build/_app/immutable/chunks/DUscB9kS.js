var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJSMin = (cb, mod) => () => (mod || cb((mod = { exports: {} }).exports, mod), mod.exports);
var __exportAll = (all, symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var __copyProps = (to, from, except, desc) => {
	if (from && typeof from === "object" || typeof from === "function") for (var keys = __getOwnPropNames(from), i = 0, n = keys.length, key$1; i < n; i++) {
		key$1 = keys[i];
		if (!__hasOwnProp.call(to, key$1) && key$1 !== except) __defProp(to, key$1, {
			get: ((k) => from[k]).bind(null, key$1),
			enumerable: !(desc = __getOwnPropDesc(from, key$1)) || desc.enumerable
		});
	}
	return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", {
	value: mod,
	enumerable: true
}) : target, mod));
var true_default = true;
var false_default = false;
var is_array = Array.isArray;
var index_of = Array.prototype.indexOf;
var array_from = Array.from;
Object.keys;
var define_property = Object.defineProperty;
var get_descriptor = Object.getOwnPropertyDescriptor;
var get_descriptors = Object.getOwnPropertyDescriptors;
var object_prototype = Object.prototype;
var array_prototype = Array.prototype;
var get_prototype_of = Object.getPrototypeOf;
var is_extensible = Object.isExtensible;
function is_function(thing) {
	return typeof thing === "function";
}
const noop = () => {};
function run(fn) {
	return fn();
}
function run_all(arr) {
	for (var i = 0; i < arr.length; i++) arr[i]();
}
function deferred() {
	var resolve;
	var reject;
	return {
		promise: new Promise((res, rej) => {
			resolve = res;
			reject = rej;
		}),
		resolve,
		reject
	};
}
function fallback(value, fallback$1, lazy = false) {
	return value === void 0 ? lazy ? fallback$1() : fallback$1 : value;
}
function to_array(value, n) {
	if (Array.isArray(value)) return value;
	if (n === void 0 || !(Symbol.iterator in value)) return Array.from(value);
	const array = [];
	for (const element$1 of value) {
		array.push(element$1);
		if (array.length === n) break;
	}
	return array;
}
const MANAGED_EFFECT = 1 << 24;
const CLEAN = 1024;
const DIRTY = 2048;
const MAYBE_DIRTY = 4096;
const INERT = 8192;
const DESTROYED = 16384;
const EFFECT_RAN = 32768;
const EFFECT_TRANSPARENT = 65536;
const HEAD_EFFECT = 1 << 18;
const EFFECT_PRESERVED = 1 << 19;
const USER_EFFECT = 1 << 20;
const EFFECT_OFFSCREEN = 1 << 25;
const WAS_MARKED = 32768;
const REACTION_IS_UPDATING = 1 << 21;
const ASYNC = 1 << 22;
const ERROR_VALUE = 1 << 23;
const STATE_SYMBOL = Symbol("$state");
const LEGACY_PROPS = Symbol("legacy props");
const LOADING_ATTR_SYMBOL = Symbol("");
const PROXY_PATH_SYMBOL = Symbol("proxy path");
const STALE_REACTION = new class StaleReactionError extends Error {
	name = "StaleReactionError";
	message = "The reaction that called `getAbortSignal()` was re-run or destroyed";
}();
function experimental_async_required(name) {
	throw new Error(`https://svelte.dev/e/experimental_async_required`);
}
function lifecycle_outside_component(name) {
	throw new Error(`https://svelte.dev/e/lifecycle_outside_component`);
}
function missing_context() {
	throw new Error(`https://svelte.dev/e/missing_context`);
}
function async_derived_orphan() {
	throw new Error(`https://svelte.dev/e/async_derived_orphan`);
}
function effect_in_teardown(rune) {
	throw new Error(`https://svelte.dev/e/effect_in_teardown`);
}
function effect_in_unowned_derived() {
	throw new Error(`https://svelte.dev/e/effect_in_unowned_derived`);
}
function effect_orphan(rune) {
	throw new Error(`https://svelte.dev/e/effect_orphan`);
}
function effect_update_depth_exceeded() {
	throw new Error(`https://svelte.dev/e/effect_update_depth_exceeded`);
}
function fork_discarded() {
	throw new Error(`https://svelte.dev/e/fork_discarded`);
}
function fork_timing() {
	throw new Error(`https://svelte.dev/e/fork_timing`);
}
function get_abort_signal_outside_reaction() {
	throw new Error(`https://svelte.dev/e/get_abort_signal_outside_reaction`);
}
function hydration_failed() {
	throw new Error(`https://svelte.dev/e/hydration_failed`);
}
function lifecycle_legacy_only(name) {
	throw new Error(`https://svelte.dev/e/lifecycle_legacy_only`);
}
function props_invalid_value(key$1) {
	throw new Error(`https://svelte.dev/e/props_invalid_value`);
}
function set_context_after_init() {
	throw new Error(`https://svelte.dev/e/set_context_after_init`);
}
function state_descriptors_fixed() {
	throw new Error(`https://svelte.dev/e/state_descriptors_fixed`);
}
function state_prototype_fixed() {
	throw new Error(`https://svelte.dev/e/state_prototype_fixed`);
}
function state_unsafe_mutation() {
	throw new Error(`https://svelte.dev/e/state_unsafe_mutation`);
}
function svelte_boundary_reset_onerror() {
	throw new Error(`https://svelte.dev/e/svelte_boundary_reset_onerror`);
}
const HYDRATION_ERROR = {};
const UNINITIALIZED = Symbol();
const NAMESPACE_HTML = "http://www.w3.org/1999/xhtml";
const NAMESPACE_SVG = "http://www.w3.org/2000/svg";
const ATTACHMENT_KEY = "@attach";
function hydratable_missing_but_expected(key$1) {
	console.warn(`https://svelte.dev/e/hydratable_missing_but_expected`);
}
function hydration_mismatch(location) {
	console.warn(`https://svelte.dev/e/hydration_mismatch`);
}
function select_multiple_invalid_value() {
	console.warn(`https://svelte.dev/e/select_multiple_invalid_value`);
}
function svelte_boundary_reset_noop() {
	console.warn(`https://svelte.dev/e/svelte_boundary_reset_noop`);
}
function transition_slide_display(value) {
	console.warn(`https://svelte.dev/e/transition_slide_display`);
}
let hydrating = false;
function set_hydrating(value) {
	hydrating = value;
}
let hydrate_node;
function set_hydrate_node(node) {
	if (node === null) {
		hydration_mismatch();
		throw HYDRATION_ERROR;
	}
	return hydrate_node = node;
}
function hydrate_next() {
	return set_hydrate_node(/* @__PURE__ */ get_next_sibling(hydrate_node));
}
function reset(node) {
	if (!hydrating) return;
	if (/* @__PURE__ */ get_next_sibling(hydrate_node) !== null) {
		hydration_mismatch();
		throw HYDRATION_ERROR;
	}
	hydrate_node = node;
}
function next(count = 1) {
	if (hydrating) {
		var i = count;
		var node = hydrate_node;
		while (i--) node = /* @__PURE__ */ get_next_sibling(node);
		hydrate_node = node;
	}
}
function skip_nodes(remove = true) {
	var depth = 0;
	var node = hydrate_node;
	while (true) {
		if (node.nodeType === 8) {
			var data = node.data;
			if (data === "]") {
				if (depth === 0) return node;
				depth -= 1;
			} else if (data === "[" || data === "[!") depth += 1;
		}
		var next$1 = /* @__PURE__ */ get_next_sibling(node);
		if (remove) node.remove();
		node = next$1;
	}
}
function read_hydration_instruction(node) {
	if (!node || node.nodeType !== 8) {
		hydration_mismatch();
		throw HYDRATION_ERROR;
	}
	return node.data;
}
function equals(value) {
	return value === this.v;
}
function safe_not_equal(a, b) {
	return a != a ? b == b : a !== b || a !== null && typeof a === "object" || typeof a === "function";
}
function safe_equals(value) {
	return !safe_not_equal(value, this.v);
}
let async_mode_flag = false;
let legacy_mode_flag = false;
function enable_async_mode_flag() {
	async_mode_flag = true;
}
function enable_legacy_mode_flag() {
	legacy_mode_flag = true;
}
var empty = [];
function snapshot(value, skip_warning = false, no_tojson = false) {
	return clone(value, /* @__PURE__ */ new Map(), "", empty, null, no_tojson);
}
function clone(value, cloned, path, paths, original = null, no_tojson = false) {
	if (typeof value === "object" && value !== null) {
		var unwrapped = cloned.get(value);
		if (unwrapped !== void 0) return unwrapped;
		if (value instanceof Map) return new Map(value);
		if (value instanceof Set) return new Set(value);
		if (is_array(value)) {
			var copy = Array(value.length);
			cloned.set(value, copy);
			if (original !== null) cloned.set(original, copy);
			for (var i = 0; i < value.length; i += 1) {
				var element$1 = value[i];
				if (i in value) copy[i] = clone(element$1, cloned, path, paths, null, no_tojson);
			}
			return copy;
		}
		if (get_prototype_of(value) === object_prototype) {
			copy = {};
			cloned.set(value, copy);
			if (original !== null) cloned.set(original, copy);
			for (var key$1 in value) copy[key$1] = clone(value[key$1], cloned, path, paths, null, no_tojson);
			return copy;
		}
		if (value instanceof Date) return structuredClone(value);
		if (typeof value.toJSON === "function" && !no_tojson) return clone(value.toJSON(), cloned, path, paths, value);
	}
	if (value instanceof EventTarget) return value;
	try {
		return structuredClone(value);
	} catch (e) {
		return value;
	}
}
function tag(source$1, label$1) {
	source$1.label = label$1;
	tag_proxy(source$1.v, label$1);
	return source$1;
}
function tag_proxy(value, label$1) {
	value?.[PROXY_PATH_SYMBOL]?.(label$1);
	return value;
}
function label(value) {
	if (typeof value === "symbol") return `Symbol(${value.description})`;
	if (typeof value === "function") return "<function>";
	if (typeof value === "object" && value) return "<object>";
	return String(value);
}
let component_context = null;
function set_component_context(context) {
	component_context = context;
}
function createContext() {
	const key$1 = {};
	return [() => {
		if (!hasContext(key$1)) missing_context();
		return getContext(key$1);
	}, (context) => setContext(key$1, context)];
}
function getContext(key$1) {
	return get_or_init_context_map("getContext").get(key$1);
}
function setContext(key$1, context) {
	const context_map = get_or_init_context_map("setContext");
	if (async_mode_flag) {
		var flags$1 = active_effect.f;
		if (!(!active_reaction && (flags$1 & 32) !== 0 && !component_context.i)) set_context_after_init();
	}
	context_map.set(key$1, context);
	return context;
}
function hasContext(key$1) {
	return get_or_init_context_map("hasContext").has(key$1);
}
function getAllContexts() {
	return get_or_init_context_map("getAllContexts");
}
function push(props, runes = false, fn) {
	component_context = {
		p: component_context,
		i: false,
		c: null,
		e: null,
		s: props,
		x: null,
		l: legacy_mode_flag && !runes ? {
			s: null,
			u: null,
			$: []
		} : null
	};
}
function pop(component$1) {
	var context = component_context;
	var effects = context.e;
	if (effects !== null) {
		context.e = null;
		for (var fn of effects) create_user_effect(fn);
	}
	if (component$1 !== void 0) context.x = component$1;
	context.i = true;
	component_context = context.p;
	return component$1 ?? {};
}
function is_runes() {
	return !legacy_mode_flag || component_context !== null && component_context.l === null;
}
function get_or_init_context_map(name) {
	if (component_context === null) lifecycle_outside_component(name);
	return component_context.c ??= new Map(get_parent_context(component_context) || void 0);
}
function get_parent_context(component_context$1) {
	let parent = component_context$1.p;
	while (parent !== null) {
		const context_map = parent.c;
		if (context_map !== null) return context_map;
		parent = parent.p;
	}
	return null;
}
var micro_tasks = [];
function run_micro_tasks() {
	var tasks = micro_tasks;
	micro_tasks = [];
	run_all(tasks);
}
function queue_micro_task(fn) {
	if (micro_tasks.length === 0 && !is_flushing_sync) {
		var tasks = micro_tasks;
		queueMicrotask(() => {
			if (tasks === micro_tasks) run_micro_tasks();
		});
	}
	micro_tasks.push(fn);
}
function flush_tasks() {
	while (micro_tasks.length > 0) run_micro_tasks();
}
function handle_error(error) {
	var effect$1 = active_effect;
	if (effect$1 === null) {
		active_reaction.f |= ERROR_VALUE;
		return error;
	}
	if ((effect$1.f & 32768) === 0) {
		if ((effect$1.f & 128) === 0) throw error;
		effect$1.b.error(error);
	} else invoke_error_boundary(error, effect$1);
}
function invoke_error_boundary(error, effect$1) {
	while (effect$1 !== null) {
		if ((effect$1.f & 128) !== 0) try {
			effect$1.b.error(error);
			return;
		} catch (e) {
			error = e;
		}
		effect$1 = effect$1.parent;
	}
	throw error;
}
var batches = /* @__PURE__ */ new Set();
let current_batch = null;
let previous_batch = null;
let batch_values = null;
var queued_root_effects = [];
var last_scheduled_effect = null;
var is_flushing = false;
let is_flushing_sync = false;
var Batch = class Batch {
	committed = false;
	current = /* @__PURE__ */ new Map();
	previous = /* @__PURE__ */ new Map();
	#commit_callbacks = /* @__PURE__ */ new Set();
	#discard_callbacks = /* @__PURE__ */ new Set();
	#pending = 0;
	#blocking_pending = 0;
	#deferred = null;
	#dirty_effects = /* @__PURE__ */ new Set();
	#maybe_dirty_effects = /* @__PURE__ */ new Set();
	skipped_effects = /* @__PURE__ */ new Set();
	is_fork = false;
	is_deferred() {
		return this.is_fork || this.#blocking_pending > 0;
	}
	process(root_effects) {
		queued_root_effects = [];
		previous_batch = null;
		this.apply();
		var target = {
			parent: null,
			effect: null,
			effects: [],
			render_effects: []
		};
		for (const root of root_effects) this.#traverse_effect_tree(root, target);
		if (!this.is_fork) this.#resolve();
		if (this.is_deferred()) {
			this.#defer_effects(target.effects);
			this.#defer_effects(target.render_effects);
		} else {
			previous_batch = this;
			current_batch = null;
			flush_queued_effects(target.render_effects);
			flush_queued_effects(target.effects);
			previous_batch = null;
			this.#deferred?.resolve();
		}
		batch_values = null;
	}
	#traverse_effect_tree(root, target) {
		root.f ^= CLEAN;
		var effect$1 = root.first;
		while (effect$1 !== null) {
			var flags$1 = effect$1.f;
			var is_branch = (flags$1 & 96) !== 0;
			var skip = is_branch && (flags$1 & 1024) !== 0 || (flags$1 & 8192) !== 0 || this.skipped_effects.has(effect$1);
			if ((effect$1.f & 128) !== 0 && effect$1.b?.is_pending()) target = {
				parent: target,
				effect: effect$1,
				effects: [],
				render_effects: []
			};
			if (!skip && effect$1.fn !== null) {
				if (is_branch) effect$1.f ^= CLEAN;
				else if ((flags$1 & 4) !== 0) target.effects.push(effect$1);
				else if (async_mode_flag && (flags$1 & 16777224) !== 0) target.render_effects.push(effect$1);
				else if (is_dirty(effect$1)) {
					if ((effect$1.f & 16) !== 0) this.#dirty_effects.add(effect$1);
					update_effect(effect$1);
				}
				var child$1 = effect$1.first;
				if (child$1 !== null) {
					effect$1 = child$1;
					continue;
				}
			}
			var parent = effect$1.parent;
			effect$1 = effect$1.next;
			while (effect$1 === null && parent !== null) {
				if (parent === target.effect) {
					this.#defer_effects(target.effects);
					this.#defer_effects(target.render_effects);
					target = target.parent;
				}
				effect$1 = parent.next;
				parent = parent.parent;
			}
		}
	}
	#defer_effects(effects) {
		for (const e of effects) {
			if ((e.f & 2048) !== 0) this.#dirty_effects.add(e);
			else if ((e.f & 4096) !== 0) this.#maybe_dirty_effects.add(e);
			this.#clear_marked(e.deps);
			set_signal_status(e, CLEAN);
		}
	}
	#clear_marked(deps) {
		if (deps === null) return;
		for (const dep of deps) {
			if ((dep.f & 2) === 0 || (dep.f & 32768) === 0) continue;
			dep.f ^= WAS_MARKED;
			this.#clear_marked(dep.deps);
		}
	}
	capture(source$1, value) {
		if (!this.previous.has(source$1)) this.previous.set(source$1, value);
		if ((source$1.f & 8388608) === 0) {
			this.current.set(source$1, source$1.v);
			batch_values?.set(source$1, source$1.v);
		}
	}
	activate() {
		current_batch = this;
		this.apply();
	}
	deactivate() {
		if (current_batch !== this) return;
		current_batch = null;
		batch_values = null;
	}
	flush() {
		this.activate();
		if (queued_root_effects.length > 0) {
			flush_effects();
			if (current_batch !== null && current_batch !== this) return;
		} else if (this.#pending === 0) this.process([]);
		this.deactivate();
	}
	discard() {
		for (const fn of this.#discard_callbacks) fn(this);
		this.#discard_callbacks.clear();
	}
	#resolve() {
		if (this.#blocking_pending === 0) {
			for (const fn of this.#commit_callbacks) fn();
			this.#commit_callbacks.clear();
		}
		if (this.#pending === 0) this.#commit();
	}
	#commit() {
		if (batches.size > 1) {
			this.previous.clear();
			var previous_batch_values = batch_values;
			var is_earlier = true;
			var dummy_target = {
				parent: null,
				effect: null,
				effects: [],
				render_effects: []
			};
			for (const batch of batches) {
				if (batch === this) {
					is_earlier = false;
					continue;
				}
				const sources = [];
				for (const [source$1, value] of this.current) {
					if (batch.current.has(source$1)) if (is_earlier && value !== batch.current.get(source$1)) batch.current.set(source$1, value);
					else continue;
					sources.push(source$1);
				}
				if (sources.length === 0) continue;
				const others = [...batch.current.keys()].filter((s) => !this.current.has(s));
				if (others.length > 0) {
					var prev_queued_root_effects = queued_root_effects;
					queued_root_effects = [];
					const marked = /* @__PURE__ */ new Set();
					const checked = /* @__PURE__ */ new Map();
					for (const source$1 of sources) mark_effects(source$1, others, marked, checked);
					if (queued_root_effects.length > 0) {
						current_batch = batch;
						batch.apply();
						for (const root of queued_root_effects) batch.#traverse_effect_tree(root, dummy_target);
						batch.deactivate();
					}
					queued_root_effects = prev_queued_root_effects;
				}
			}
			current_batch = null;
			batch_values = previous_batch_values;
		}
		this.committed = true;
		batches.delete(this);
	}
	increment(blocking) {
		this.#pending += 1;
		if (blocking) this.#blocking_pending += 1;
	}
	decrement(blocking) {
		this.#pending -= 1;
		if (blocking) this.#blocking_pending -= 1;
		this.revive();
	}
	revive() {
		for (const e of this.#dirty_effects) {
			this.#maybe_dirty_effects.delete(e);
			set_signal_status(e, DIRTY);
			schedule_effect(e);
		}
		for (const e of this.#maybe_dirty_effects) {
			set_signal_status(e, MAYBE_DIRTY);
			schedule_effect(e);
		}
		this.flush();
	}
	oncommit(fn) {
		this.#commit_callbacks.add(fn);
	}
	ondiscard(fn) {
		this.#discard_callbacks.add(fn);
	}
	settled() {
		return (this.#deferred ??= deferred()).promise;
	}
	static ensure() {
		if (current_batch === null) {
			const batch = current_batch = new Batch();
			batches.add(current_batch);
			if (!is_flushing_sync) Batch.enqueue(() => {
				if (current_batch !== batch) return;
				batch.flush();
			});
		}
		return current_batch;
	}
	static enqueue(task) {
		queue_micro_task(task);
	}
	apply() {
		if (!async_mode_flag || !this.is_fork && batches.size === 1) return;
		batch_values = new Map(this.current);
		for (const batch of batches) {
			if (batch === this) continue;
			for (const [source$1, previous] of batch.previous) if (!batch_values.has(source$1)) batch_values.set(source$1, previous);
		}
	}
};
function flushSync(fn) {
	var was_flushing_sync = is_flushing_sync;
	is_flushing_sync = true;
	try {
		var result;
		if (fn) {
			if (current_batch !== null) flush_effects();
			result = fn();
		}
		while (true) {
			flush_tasks();
			if (queued_root_effects.length === 0) {
				current_batch?.flush();
				if (queued_root_effects.length === 0) {
					last_scheduled_effect = null;
					return result;
				}
			}
			flush_effects();
		}
	} finally {
		is_flushing_sync = was_flushing_sync;
	}
}
function flush_effects() {
	var was_updating_effect = is_updating_effect;
	is_flushing = true;
	try {
		var flush_count = 0;
		set_is_updating_effect(true);
		while (queued_root_effects.length > 0) {
			var batch = Batch.ensure();
			if (flush_count++ > 1e3) infinite_loop_guard();
			batch.process(queued_root_effects);
			old_values.clear();
		}
	} finally {
		is_flushing = false;
		set_is_updating_effect(was_updating_effect);
		last_scheduled_effect = null;
	}
}
function infinite_loop_guard() {
	try {
		effect_update_depth_exceeded();
	} catch (error) {
		invoke_error_boundary(error, last_scheduled_effect);
	}
}
let eager_block_effects = null;
function flush_queued_effects(effects) {
	var length = effects.length;
	if (length === 0) return;
	var i = 0;
	while (i < length) {
		var effect$1 = effects[i++];
		if ((effect$1.f & 24576) === 0 && is_dirty(effect$1)) {
			eager_block_effects = /* @__PURE__ */ new Set();
			update_effect(effect$1);
			if (effect$1.deps === null && effect$1.first === null && effect$1.nodes === null) if (effect$1.teardown === null && effect$1.ac === null) unlink_effect(effect$1);
			else effect$1.fn = null;
			if (eager_block_effects?.size > 0) {
				old_values.clear();
				for (const e of eager_block_effects) {
					if ((e.f & 24576) !== 0) continue;
					const ordered_effects = [e];
					let ancestor = e.parent;
					while (ancestor !== null) {
						if (eager_block_effects.has(ancestor)) {
							eager_block_effects.delete(ancestor);
							ordered_effects.push(ancestor);
						}
						ancestor = ancestor.parent;
					}
					for (let j = ordered_effects.length - 1; j >= 0; j--) {
						const e$1 = ordered_effects[j];
						if ((e$1.f & 24576) !== 0) continue;
						update_effect(e$1);
					}
				}
				eager_block_effects.clear();
			}
		}
	}
	eager_block_effects = null;
}
function mark_effects(value, sources, marked, checked) {
	if (marked.has(value)) return;
	marked.add(value);
	if (value.reactions !== null) for (const reaction of value.reactions) {
		const flags$1 = reaction.f;
		if ((flags$1 & 2) !== 0) mark_effects(reaction, sources, marked, checked);
		else if ((flags$1 & 4194320) !== 0 && (flags$1 & 2048) === 0 && depends_on(reaction, sources, checked)) {
			set_signal_status(reaction, DIRTY);
			schedule_effect(reaction);
		}
	}
}
function mark_eager_effects(value, effects) {
	if (value.reactions === null) return;
	for (const reaction of value.reactions) {
		const flags$1 = reaction.f;
		if ((flags$1 & 2) !== 0) mark_eager_effects(reaction, effects);
		else if ((flags$1 & 131072) !== 0) {
			set_signal_status(reaction, DIRTY);
			effects.add(reaction);
		}
	}
}
function depends_on(reaction, sources, checked) {
	const depends = checked.get(reaction);
	if (depends !== void 0) return depends;
	if (reaction.deps !== null) for (const dep of reaction.deps) {
		if (sources.includes(dep)) return true;
		if ((dep.f & 2) !== 0 && depends_on(dep, sources, checked)) {
			checked.set(dep, true);
			return true;
		}
	}
	checked.set(reaction, false);
	return false;
}
function schedule_effect(signal) {
	var effect$1 = last_scheduled_effect = signal;
	while (effect$1.parent !== null) {
		effect$1 = effect$1.parent;
		var flags$1 = effect$1.f;
		if (is_flushing && effect$1 === active_effect && (flags$1 & 16) !== 0 && (flags$1 & 262144) === 0) return;
		if ((flags$1 & 96) !== 0) {
			if ((flags$1 & 1024) === 0) return;
			effect$1.f ^= CLEAN;
		}
	}
	queued_root_effects.push(effect$1);
}
function fork(fn) {
	if (!async_mode_flag) experimental_async_required("fork");
	if (current_batch !== null) fork_timing();
	var batch = Batch.ensure();
	batch.is_fork = true;
	batch_values = /* @__PURE__ */ new Map();
	var committed = false;
	var settled$1 = batch.settled();
	flushSync(fn);
	batch_values = null;
	for (var [source$1, value] of batch.previous) source$1.v = value;
	return {
		commit: async () => {
			if (committed) {
				await settled$1;
				return;
			}
			if (!batches.has(batch)) fork_discarded();
			committed = true;
			batch.is_fork = false;
			for (var [source$2, value$1] of batch.current) source$2.v = value$1;
			flushSync(() => {
				var eager_effects$1 = /* @__PURE__ */ new Set();
				for (var source$3 of batch.current.keys()) mark_eager_effects(source$3, eager_effects$1);
				set_eager_effects(eager_effects$1);
				flush_eager_effects();
			});
			batch.revive();
			await settled$1;
		},
		discard: () => {
			if (!committed && batches.has(batch)) {
				batches.delete(batch);
				batch.discard();
			}
		}
	};
}
function createSubscriber(start) {
	let subscribers = 0;
	let version = source(0);
	let stop;
	return () => {
		if (effect_tracking()) {
			get$1(version);
			render_effect(() => {
				if (subscribers === 0) stop = untrack(() => start(() => increment(version)));
				subscribers += 1;
				return () => {
					queue_micro_task(() => {
						subscribers -= 1;
						if (subscribers === 0) {
							stop?.();
							stop = void 0;
							increment(version);
						}
					});
				};
			});
		}
	};
}
var flags = EFFECT_PRESERVED | 65664;
function boundary(node, props, children) {
	new Boundary(node, props, children);
}
var Boundary = class {
	parent;
	#pending = false;
	#anchor;
	#hydrate_open = hydrating ? hydrate_node : null;
	#props;
	#children;
	#effect;
	#main_effect = null;
	#pending_effect = null;
	#failed_effect = null;
	#offscreen_fragment = null;
	#pending_anchor = null;
	#local_pending_count = 0;
	#pending_count = 0;
	#is_creating_fallback = false;
	#effect_pending = null;
	#effect_pending_subscriber = createSubscriber(() => {
		this.#effect_pending = source(this.#local_pending_count);
		return () => {
			this.#effect_pending = null;
		};
	});
	constructor(node, props, children) {
		this.#anchor = node;
		this.#props = props;
		this.#children = children;
		this.parent = active_effect.b;
		this.#pending = !!this.#props.pending;
		this.#effect = block(() => {
			active_effect.b = this;
			if (hydrating) {
				const comment$1 = this.#hydrate_open;
				hydrate_next();
				if (comment$1.nodeType === 8 && comment$1.data === "[!") this.#hydrate_pending_content();
				else this.#hydrate_resolved_content();
			} else {
				var anchor = this.#get_anchor();
				try {
					this.#main_effect = branch(() => children(anchor));
				} catch (error) {
					this.error(error);
				}
				if (this.#pending_count > 0) this.#show_pending_snippet();
				else this.#pending = false;
			}
			return () => {
				this.#pending_anchor?.remove();
			};
		}, flags);
		if (hydrating) this.#anchor = hydrate_node;
	}
	#hydrate_resolved_content() {
		try {
			this.#main_effect = branch(() => this.#children(this.#anchor));
		} catch (error) {
			this.error(error);
		}
		this.#pending = false;
	}
	#hydrate_pending_content() {
		const pending = this.#props.pending;
		if (!pending) return;
		this.#pending_effect = branch(() => pending(this.#anchor));
		Batch.enqueue(() => {
			var anchor = this.#get_anchor();
			this.#main_effect = this.#run(() => {
				Batch.ensure();
				return branch(() => this.#children(anchor));
			});
			if (this.#pending_count > 0) this.#show_pending_snippet();
			else {
				pause_effect(this.#pending_effect, () => {
					this.#pending_effect = null;
				});
				this.#pending = false;
			}
		});
	}
	#get_anchor() {
		var anchor = this.#anchor;
		if (this.#pending) {
			this.#pending_anchor = create_text();
			this.#anchor.before(this.#pending_anchor);
			anchor = this.#pending_anchor;
		}
		return anchor;
	}
	is_pending() {
		return this.#pending || !!this.parent && this.parent.is_pending();
	}
	has_pending_snippet() {
		return !!this.#props.pending;
	}
	#run(fn) {
		var previous_effect = active_effect;
		var previous_reaction = active_reaction;
		var previous_ctx = component_context;
		set_active_effect(this.#effect);
		set_active_reaction(this.#effect);
		set_component_context(this.#effect.ctx);
		try {
			return fn();
		} catch (e) {
			handle_error(e);
			return null;
		} finally {
			set_active_effect(previous_effect);
			set_active_reaction(previous_reaction);
			set_component_context(previous_ctx);
		}
	}
	#show_pending_snippet() {
		const pending = this.#props.pending;
		if (this.#main_effect !== null) {
			this.#offscreen_fragment = document.createDocumentFragment();
			this.#offscreen_fragment.append(this.#pending_anchor);
			move_effect(this.#main_effect, this.#offscreen_fragment);
		}
		if (this.#pending_effect === null) this.#pending_effect = branch(() => pending(this.#anchor));
	}
	#update_pending_count(d) {
		if (!this.has_pending_snippet()) {
			if (this.parent) this.parent.#update_pending_count(d);
			return;
		}
		this.#pending_count += d;
		if (this.#pending_count === 0) {
			this.#pending = false;
			if (this.#pending_effect) pause_effect(this.#pending_effect, () => {
				this.#pending_effect = null;
			});
			if (this.#offscreen_fragment) {
				this.#anchor.before(this.#offscreen_fragment);
				this.#offscreen_fragment = null;
			}
		}
	}
	update_pending_count(d) {
		this.#update_pending_count(d);
		this.#local_pending_count += d;
		if (this.#effect_pending) internal_set(this.#effect_pending, this.#local_pending_count);
	}
	get_effect_pending() {
		this.#effect_pending_subscriber();
		return get$1(this.#effect_pending);
	}
	error(error) {
		var onerror = this.#props.onerror;
		let failed = this.#props.failed;
		if (this.#is_creating_fallback || !onerror && !failed) throw error;
		if (this.#main_effect) {
			destroy_effect(this.#main_effect);
			this.#main_effect = null;
		}
		if (this.#pending_effect) {
			destroy_effect(this.#pending_effect);
			this.#pending_effect = null;
		}
		if (this.#failed_effect) {
			destroy_effect(this.#failed_effect);
			this.#failed_effect = null;
		}
		if (hydrating) {
			set_hydrate_node(this.#hydrate_open);
			next();
			set_hydrate_node(skip_nodes());
		}
		var did_reset = false;
		var calling_on_error = false;
		const reset$1 = () => {
			if (did_reset) {
				svelte_boundary_reset_noop();
				return;
			}
			did_reset = true;
			if (calling_on_error) svelte_boundary_reset_onerror();
			Batch.ensure();
			this.#local_pending_count = 0;
			if (this.#failed_effect !== null) pause_effect(this.#failed_effect, () => {
				this.#failed_effect = null;
			});
			this.#pending = this.has_pending_snippet();
			this.#main_effect = this.#run(() => {
				this.#is_creating_fallback = false;
				return branch(() => this.#children(this.#anchor));
			});
			if (this.#pending_count > 0) this.#show_pending_snippet();
			else this.#pending = false;
		};
		var previous_reaction = active_reaction;
		try {
			set_active_reaction(null);
			calling_on_error = true;
			onerror?.(error, reset$1);
			calling_on_error = false;
		} catch (error$1) {
			invoke_error_boundary(error$1, this.#effect && this.#effect.parent);
		} finally {
			set_active_reaction(previous_reaction);
		}
		if (failed) queue_micro_task(() => {
			this.#failed_effect = this.#run(() => {
				Batch.ensure();
				this.#is_creating_fallback = true;
				try {
					return branch(() => {
						failed(this.#anchor, () => error, () => reset$1);
					});
				} catch (error$1) {
					invoke_error_boundary(error$1, this.#effect.parent);
					return null;
				} finally {
					this.#is_creating_fallback = false;
				}
			});
		});
	}
};
function flatten(blockers, sync, async, fn) {
	const d = is_runes() ? derived$1 : derived_safe_equal;
	if (async.length === 0 && blockers.length === 0) {
		fn(sync.map(d));
		return;
	}
	var batch = current_batch;
	var parent = active_effect;
	var restore = capture();
	function run$1() {
		Promise.all(async.map((expression) => /* @__PURE__ */ async_derived(expression))).then((result) => {
			restore();
			try {
				fn([...sync.map(d), ...result]);
			} catch (error) {
				if ((parent.f & 16384) === 0) invoke_error_boundary(error, parent);
			}
			batch?.deactivate();
			unset_context();
		}).catch((error) => {
			invoke_error_boundary(error, parent);
		});
	}
	if (blockers.length > 0) Promise.all(blockers).then(() => {
		restore();
		try {
			return run$1();
		} finally {
			batch?.deactivate();
			unset_context();
		}
	});
	else run$1();
}
function capture() {
	var previous_effect = active_effect;
	var previous_reaction = active_reaction;
	var previous_component_context = component_context;
	var previous_batch$1 = current_batch;
	return function restore(activate_batch = true) {
		set_active_effect(previous_effect);
		set_active_reaction(previous_reaction);
		set_component_context(previous_component_context);
		if (activate_batch) previous_batch$1?.activate();
	};
}
function unset_context() {
	set_active_effect(null);
	set_active_reaction(null);
	set_component_context(null);
}
/* @__NO_SIDE_EFFECTS__ */
function derived$1(fn) {
	var flags$1 = 2 | DIRTY;
	var parent_derived = active_reaction !== null && (active_reaction.f & 2) !== 0 ? active_reaction : null;
	if (active_effect !== null) active_effect.f |= EFFECT_PRESERVED;
	return {
		ctx: component_context,
		deps: null,
		effects: null,
		equals,
		f: flags$1,
		fn,
		reactions: null,
		rv: 0,
		v: UNINITIALIZED,
		wv: 0,
		parent: parent_derived ?? active_effect,
		ac: null
	};
}
/* @__NO_SIDE_EFFECTS__ */
function async_derived(fn, location) {
	let parent = active_effect;
	if (parent === null) async_derived_orphan();
	var boundary$1 = parent.b;
	var promise = void 0;
	var signal = source(UNINITIALIZED);
	var should_suspend = !active_reaction;
	var deferreds = /* @__PURE__ */ new Map();
	async_effect(() => {
		var d = deferred();
		promise = d.promise;
		try {
			Promise.resolve(fn()).then(d.resolve, d.reject).then(() => {
				if (batch === current_batch && batch.committed) batch.deactivate();
				unset_context();
			});
		} catch (error) {
			d.reject(error);
			unset_context();
		}
		var batch = current_batch;
		if (should_suspend) {
			var blocking = !boundary$1.is_pending();
			boundary$1.update_pending_count(1);
			batch.increment(blocking);
			deferreds.get(batch)?.reject(STALE_REACTION);
			deferreds.delete(batch);
			deferreds.set(batch, d);
		}
		const handler = (value, error = void 0) => {
			batch.activate();
			if (error) {
				if (error !== STALE_REACTION) {
					signal.f |= ERROR_VALUE;
					internal_set(signal, error);
				}
			} else {
				if ((signal.f & 8388608) !== 0) signal.f ^= ERROR_VALUE;
				internal_set(signal, value);
				for (const [b, d$1] of deferreds) {
					deferreds.delete(b);
					if (b === batch) break;
					d$1.reject(STALE_REACTION);
				}
			}
			if (should_suspend) {
				boundary$1.update_pending_count(-1);
				batch.decrement(blocking);
			}
		};
		d.promise.then(handler, (e) => handler(null, e || "unknown"));
	});
	teardown(() => {
		for (const d of deferreds.values()) d.reject(STALE_REACTION);
	});
	return new Promise((fulfil) => {
		function next$1(p) {
			function go() {
				if (p === promise) fulfil(signal);
				else next$1(promise);
			}
			p.then(go, go);
		}
		next$1(promise);
	});
}
/* @__NO_SIDE_EFFECTS__ */
function user_derived(fn) {
	const d = /* @__PURE__ */ derived$1(fn);
	if (!async_mode_flag) push_reaction_value(d);
	return d;
}
/* @__NO_SIDE_EFFECTS__ */
function derived_safe_equal(fn) {
	const signal = /* @__PURE__ */ derived$1(fn);
	signal.equals = safe_equals;
	return signal;
}
function destroy_derived_effects(derived$2) {
	var effects = derived$2.effects;
	if (effects !== null) {
		derived$2.effects = null;
		for (var i = 0; i < effects.length; i += 1) destroy_effect(effects[i]);
	}
}
function get_derived_parent_effect(derived$2) {
	var parent = derived$2.parent;
	while (parent !== null) {
		if ((parent.f & 2) === 0) return (parent.f & 16384) === 0 ? parent : null;
		parent = parent.parent;
	}
	return null;
}
function execute_derived(derived$2) {
	var value;
	var prev_active_effect = active_effect;
	set_active_effect(get_derived_parent_effect(derived$2));
	try {
		derived$2.f &= ~WAS_MARKED;
		destroy_derived_effects(derived$2);
		value = update_reaction(derived$2);
	} finally {
		set_active_effect(prev_active_effect);
	}
	return value;
}
function update_derived(derived$2) {
	var value = execute_derived(derived$2);
	if (!derived$2.equals(value)) {
		if (!current_batch?.is_fork) derived$2.v = value;
		derived$2.wv = increment_write_version();
	}
	if (is_destroying_effect) return;
	if (batch_values !== null) {
		if (effect_tracking() || current_batch?.is_fork) batch_values.set(derived$2, value);
	} else set_signal_status(derived$2, (derived$2.f & 512) === 0 ? MAYBE_DIRTY : CLEAN);
}
let eager_effects = /* @__PURE__ */ new Set();
const old_values = /* @__PURE__ */ new Map();
function set_eager_effects(v) {
	eager_effects = v;
}
var eager_effects_deferred = false;
function source(v, stack$1) {
	return {
		f: 0,
		v,
		reactions: null,
		equals,
		rv: 0,
		wv: 0
	};
}
/* @__NO_SIDE_EFFECTS__ */
function state(v, stack$1) {
	const s = source(v, stack$1);
	push_reaction_value(s);
	return s;
}
/* @__NO_SIDE_EFFECTS__ */
function mutable_source(initial_value, immutable = false, trackable = true) {
	const s = source(initial_value);
	if (!immutable) s.equals = safe_equals;
	if (legacy_mode_flag && trackable && component_context !== null && component_context.l !== null) (component_context.l.s ??= []).push(s);
	return s;
}
function set(source$1, value, should_proxy = false) {
	if (active_reaction !== null && (!untracking || (active_reaction.f & 131072) !== 0) && is_runes() && (active_reaction.f & 4325394) !== 0 && !current_sources?.includes(source$1)) state_unsafe_mutation();
	return internal_set(source$1, should_proxy ? proxy(value) : value);
}
function internal_set(source$1, value) {
	if (!source$1.equals(value)) {
		var old_value = source$1.v;
		if (is_destroying_effect) old_values.set(source$1, value);
		else old_values.set(source$1, old_value);
		source$1.v = value;
		var batch = Batch.ensure();
		batch.capture(source$1, old_value);
		if ((source$1.f & 2) !== 0) {
			if ((source$1.f & 2048) !== 0) execute_derived(source$1);
			set_signal_status(source$1, (source$1.f & 512) !== 0 ? CLEAN : MAYBE_DIRTY);
		}
		source$1.wv = increment_write_version();
		mark_reactions(source$1, DIRTY);
		if (is_runes() && active_effect !== null && (active_effect.f & 1024) !== 0 && (active_effect.f & 96) === 0) if (untracked_writes === null) set_untracked_writes([source$1]);
		else untracked_writes.push(source$1);
		if (!batch.is_fork && eager_effects.size > 0 && !eager_effects_deferred) flush_eager_effects();
	}
	return value;
}
function flush_eager_effects() {
	eager_effects_deferred = false;
	var prev_is_updating_effect = is_updating_effect;
	set_is_updating_effect(true);
	const inspects = Array.from(eager_effects);
	try {
		for (const effect$1 of inspects) {
			if ((effect$1.f & 1024) !== 0) set_signal_status(effect$1, MAYBE_DIRTY);
			if (is_dirty(effect$1)) update_effect(effect$1);
		}
	} finally {
		set_is_updating_effect(prev_is_updating_effect);
	}
	eager_effects.clear();
}
function update(source$1, d = 1) {
	var value = get$1(source$1);
	var result = d === 1 ? value++ : value--;
	set(source$1, value);
	return result;
}
function increment(source$1) {
	set(source$1, source$1.v + 1);
}
function mark_reactions(signal, status) {
	var reactions = signal.reactions;
	if (reactions === null) return;
	var runes = is_runes();
	var length = reactions.length;
	for (var i = 0; i < length; i++) {
		var reaction = reactions[i];
		var flags$1 = reaction.f;
		if (!runes && reaction === active_effect) continue;
		var not_dirty = (flags$1 & DIRTY) === 0;
		if (not_dirty) set_signal_status(reaction, status);
		if ((flags$1 & 2) !== 0) {
			var derived$2 = reaction;
			batch_values?.delete(derived$2);
			if ((flags$1 & 32768) === 0) {
				if (flags$1 & 512) reaction.f |= WAS_MARKED;
				mark_reactions(derived$2, MAYBE_DIRTY);
			}
		} else if (not_dirty) {
			if ((flags$1 & 16) !== 0 && eager_block_effects !== null) eager_block_effects.add(reaction);
			schedule_effect(reaction);
		}
	}
}
function proxy(value) {
	if (typeof value !== "object" || value === null || STATE_SYMBOL in value) return value;
	const prototype = get_prototype_of(value);
	if (prototype !== object_prototype && prototype !== array_prototype) return value;
	var sources = /* @__PURE__ */ new Map();
	var is_proxied_array = is_array(value);
	var version = /* @__PURE__ */ state(0);
	var stack$1 = null;
	var parent_version = update_version;
	var with_parent = (fn) => {
		if (update_version === parent_version) return fn();
		var reaction = active_reaction;
		var version$1 = update_version;
		set_active_reaction(null);
		set_update_version(parent_version);
		var result = fn();
		set_active_reaction(reaction);
		set_update_version(version$1);
		return result;
	};
	if (is_proxied_array) sources.set("length", /* @__PURE__ */ state(value.length, stack$1));
	return new Proxy(value, {
		defineProperty(_, prop$1, descriptor) {
			if (!("value" in descriptor) || descriptor.configurable === false || descriptor.enumerable === false || descriptor.writable === false) state_descriptors_fixed();
			var s = sources.get(prop$1);
			if (s === void 0) s = with_parent(() => {
				var s$1 = /* @__PURE__ */ state(descriptor.value, stack$1);
				sources.set(prop$1, s$1);
				return s$1;
			});
			else set(s, descriptor.value, true);
			return true;
		},
		deleteProperty(target, prop$1) {
			var s = sources.get(prop$1);
			if (s === void 0) {
				if (prop$1 in target) {
					const s$1 = with_parent(() => /* @__PURE__ */ state(UNINITIALIZED, stack$1));
					sources.set(prop$1, s$1);
					increment(version);
				}
			} else {
				set(s, UNINITIALIZED);
				increment(version);
			}
			return true;
		},
		get(target, prop$1, receiver) {
			if (prop$1 === STATE_SYMBOL) return value;
			var s = sources.get(prop$1);
			var exists = prop$1 in target;
			if (s === void 0 && (!exists || get_descriptor(target, prop$1)?.writable)) {
				s = with_parent(() => {
					return /* @__PURE__ */ state(proxy(exists ? target[prop$1] : UNINITIALIZED), stack$1);
				});
				sources.set(prop$1, s);
			}
			if (s !== void 0) {
				var v = get$1(s);
				return v === UNINITIALIZED ? void 0 : v;
			}
			return Reflect.get(target, prop$1, receiver);
		},
		getOwnPropertyDescriptor(target, prop$1) {
			var descriptor = Reflect.getOwnPropertyDescriptor(target, prop$1);
			if (descriptor && "value" in descriptor) {
				var s = sources.get(prop$1);
				if (s) descriptor.value = get$1(s);
			} else if (descriptor === void 0) {
				var source$1 = sources.get(prop$1);
				var value$1 = source$1?.v;
				if (source$1 !== void 0 && value$1 !== UNINITIALIZED) return {
					enumerable: true,
					configurable: true,
					value: value$1,
					writable: true
				};
			}
			return descriptor;
		},
		has(target, prop$1) {
			if (prop$1 === STATE_SYMBOL) return true;
			var s = sources.get(prop$1);
			var has = s !== void 0 && s.v !== UNINITIALIZED || Reflect.has(target, prop$1);
			if (s !== void 0 || active_effect !== null && (!has || get_descriptor(target, prop$1)?.writable)) {
				if (s === void 0) {
					s = with_parent(() => {
						return /* @__PURE__ */ state(has ? proxy(target[prop$1]) : UNINITIALIZED, stack$1);
					});
					sources.set(prop$1, s);
				}
				if (get$1(s) === UNINITIALIZED) return false;
			}
			return has;
		},
		set(target, prop$1, value$1, receiver) {
			var s = sources.get(prop$1);
			var has = prop$1 in target;
			if (is_proxied_array && prop$1 === "length") for (var i = value$1; i < s.v; i += 1) {
				var other_s = sources.get(i + "");
				if (other_s !== void 0) set(other_s, UNINITIALIZED);
				else if (i in target) {
					other_s = with_parent(() => /* @__PURE__ */ state(UNINITIALIZED, stack$1));
					sources.set(i + "", other_s);
				}
			}
			if (s === void 0) {
				if (!has || get_descriptor(target, prop$1)?.writable) {
					s = with_parent(() => /* @__PURE__ */ state(void 0, stack$1));
					set(s, proxy(value$1));
					sources.set(prop$1, s);
				}
			} else {
				has = s.v !== UNINITIALIZED;
				var p = with_parent(() => proxy(value$1));
				set(s, p);
			}
			var descriptor = Reflect.getOwnPropertyDescriptor(target, prop$1);
			if (descriptor?.set) descriptor.set.call(receiver, value$1);
			if (!has) {
				if (is_proxied_array && typeof prop$1 === "string") {
					var ls = sources.get("length");
					var n = Number(prop$1);
					if (Number.isInteger(n) && n >= ls.v) set(ls, n + 1);
				}
				increment(version);
			}
			return true;
		},
		ownKeys(target) {
			get$1(version);
			var own_keys = Reflect.ownKeys(target).filter((key$2) => {
				var source$2 = sources.get(key$2);
				return source$2 === void 0 || source$2.v !== UNINITIALIZED;
			});
			for (var [key$1, source$1] of sources) if (source$1.v !== UNINITIALIZED && !(key$1 in target)) own_keys.push(key$1);
			return own_keys;
		},
		setPrototypeOf() {
			state_prototype_fixed();
		}
	});
}
function get_proxied_value(value) {
	try {
		if (value !== null && typeof value === "object" && STATE_SYMBOL in value) return value[STATE_SYMBOL];
	} catch {}
	return value;
}
function is(a, b) {
	return Object.is(get_proxied_value(a), get_proxied_value(b));
}
var $window;
var is_firefox;
var first_child_getter;
var next_sibling_getter;
function init_operations() {
	if ($window !== void 0) return;
	$window = window;
	document;
	is_firefox = /Firefox/.test(navigator.userAgent);
	var element_prototype = Element.prototype;
	var node_prototype = Node.prototype;
	var text_prototype = Text.prototype;
	first_child_getter = get_descriptor(node_prototype, "firstChild").get;
	next_sibling_getter = get_descriptor(node_prototype, "nextSibling").get;
	if (is_extensible(element_prototype)) {
		element_prototype.__click = void 0;
		element_prototype.__className = void 0;
		element_prototype.__attributes = null;
		element_prototype.__style = void 0;
		element_prototype.__e = void 0;
	}
	if (is_extensible(text_prototype)) text_prototype.__t = void 0;
}
function create_text(value = "") {
	return document.createTextNode(value);
}
/* @__NO_SIDE_EFFECTS__ */
function get_first_child(node) {
	return first_child_getter.call(node);
}
/* @__NO_SIDE_EFFECTS__ */
function get_next_sibling(node) {
	return next_sibling_getter.call(node);
}
function child(node, is_text) {
	if (!hydrating) return /* @__PURE__ */ get_first_child(node);
	var child$1 = /* @__PURE__ */ get_first_child(hydrate_node);
	if (child$1 === null) child$1 = hydrate_node.appendChild(create_text());
	else if (is_text && child$1.nodeType !== 3) {
		var text$1 = create_text();
		child$1?.before(text$1);
		set_hydrate_node(text$1);
		return text$1;
	}
	set_hydrate_node(child$1);
	return child$1;
}
function first_child(node, is_text = false) {
	if (!hydrating) {
		var first = /* @__PURE__ */ get_first_child(node);
		if (first instanceof Comment && first.data === "") return /* @__PURE__ */ get_next_sibling(first);
		return first;
	}
	if (is_text && hydrate_node?.nodeType !== 3) {
		var text$1 = create_text();
		hydrate_node?.before(text$1);
		set_hydrate_node(text$1);
		return text$1;
	}
	return hydrate_node;
}
function sibling(node, count = 1, is_text = false) {
	let next_sibling = hydrating ? hydrate_node : node;
	var last_sibling;
	while (count--) {
		last_sibling = next_sibling;
		next_sibling = /* @__PURE__ */ get_next_sibling(next_sibling);
	}
	if (!hydrating) return next_sibling;
	if (is_text && next_sibling?.nodeType !== 3) {
		var text$1 = create_text();
		if (next_sibling === null) last_sibling?.after(text$1);
		else next_sibling.before(text$1);
		set_hydrate_node(text$1);
		return text$1;
	}
	set_hydrate_node(next_sibling);
	return next_sibling;
}
function clear_text_content(node) {
	node.textContent = "";
}
function should_defer_append() {
	if (!async_mode_flag) return false;
	if (eager_block_effects !== null) return false;
	return (active_effect.f & EFFECT_RAN) !== 0;
}
function autofocus(dom, value) {
	if (value) {
		const body = document.body;
		dom.autofocus = true;
		queue_micro_task(() => {
			if (document.activeElement === body) dom.focus();
		});
	}
}
function remove_textarea_child(dom) {
	if (hydrating && /* @__PURE__ */ get_first_child(dom) !== null) clear_text_content(dom);
}
var listening_to_form_reset = false;
function add_form_reset_listener() {
	if (!listening_to_form_reset) {
		listening_to_form_reset = true;
		document.addEventListener("reset", (evt) => {
			Promise.resolve().then(() => {
				if (!evt.defaultPrevented) for (const e of evt.target.elements) e.__on_r?.();
			});
		}, { capture: true });
	}
}
function listen(target, events, handler, call_handler_immediately = true) {
	if (call_handler_immediately) handler();
	for (var name of events) target.addEventListener(name, handler);
	teardown(() => {
		for (var name$1 of events) target.removeEventListener(name$1, handler);
	});
}
function without_reactive_context(fn) {
	var previous_reaction = active_reaction;
	var previous_effect = active_effect;
	set_active_reaction(null);
	set_active_effect(null);
	try {
		return fn();
	} finally {
		set_active_reaction(previous_reaction);
		set_active_effect(previous_effect);
	}
}
function listen_to_event_and_reset_event(element$1, event$1, handler, on_reset = handler) {
	element$1.addEventListener(event$1, () => without_reactive_context(handler));
	const prev = element$1.__on_r;
	if (prev) element$1.__on_r = () => {
		prev();
		on_reset(true);
	};
	else element$1.__on_r = () => on_reset(true);
	add_form_reset_listener();
}
function validate_effect(rune) {
	if (active_effect === null) {
		if (active_reaction === null) effect_orphan(rune);
		effect_in_unowned_derived();
	}
	if (is_destroying_effect) effect_in_teardown(rune);
}
function push_effect(effect$1, parent_effect) {
	var parent_last = parent_effect.last;
	if (parent_last === null) parent_effect.last = parent_effect.first = effect$1;
	else {
		parent_last.next = effect$1;
		effect$1.prev = parent_last;
		parent_effect.last = effect$1;
	}
}
function create_effect(type, fn, sync) {
	var parent = active_effect;
	if (parent !== null && (parent.f & 8192) !== 0) type |= INERT;
	var effect$1 = {
		ctx: component_context,
		deps: null,
		nodes: null,
		f: type | 2560,
		first: null,
		fn,
		last: null,
		next: null,
		parent,
		b: parent && parent.b,
		prev: null,
		teardown: null,
		wv: 0,
		ac: null
	};
	if (sync) try {
		update_effect(effect$1);
		effect$1.f |= EFFECT_RAN;
	} catch (e$1) {
		destroy_effect(effect$1);
		throw e$1;
	}
	else if (fn !== null) schedule_effect(effect$1);
	var e = effect$1;
	if (sync && e.deps === null && e.teardown === null && e.nodes === null && e.first === e.last && (e.f & 524288) === 0) {
		e = e.first;
		if ((type & 16) !== 0 && (type & 65536) !== 0 && e !== null) e.f |= EFFECT_TRANSPARENT;
	}
	if (e !== null) {
		e.parent = parent;
		if (parent !== null) push_effect(e, parent);
		if (active_reaction !== null && (active_reaction.f & 2) !== 0 && (type & 64) === 0) {
			var derived$2 = active_reaction;
			(derived$2.effects ??= []).push(e);
		}
	}
	return effect$1;
}
function effect_tracking() {
	return active_reaction !== null && !untracking;
}
function teardown(fn) {
	const effect$1 = create_effect(8, null, false);
	set_signal_status(effect$1, CLEAN);
	effect$1.teardown = fn;
	return effect$1;
}
function user_effect(fn) {
	validate_effect("$effect");
	var flags$1 = active_effect.f;
	if (!active_reaction && (flags$1 & 32) !== 0 && (flags$1 & 32768) === 0) {
		var context = component_context;
		(context.e ??= []).push(fn);
	} else return create_user_effect(fn);
}
function create_user_effect(fn) {
	return create_effect(4 | USER_EFFECT, fn, false);
}
function user_pre_effect(fn) {
	validate_effect("$effect.pre");
	return create_effect(8 | USER_EFFECT, fn, true);
}
function effect_root(fn) {
	Batch.ensure();
	const effect$1 = create_effect(64 | EFFECT_PRESERVED, fn, true);
	return () => {
		destroy_effect(effect$1);
	};
}
function component_root(fn) {
	Batch.ensure();
	const effect$1 = create_effect(64 | EFFECT_PRESERVED, fn, true);
	return (options = {}) => {
		return new Promise((fulfil) => {
			if (options.outro) pause_effect(effect$1, () => {
				destroy_effect(effect$1);
				fulfil(void 0);
			});
			else {
				destroy_effect(effect$1);
				fulfil(void 0);
			}
		});
	};
}
function effect(fn) {
	return create_effect(4, fn, false);
}
function async_effect(fn) {
	return create_effect(ASYNC | EFFECT_PRESERVED, fn, true);
}
function render_effect(fn, flags$1 = 0) {
	return create_effect(8 | flags$1, fn, true);
}
function template_effect(fn, sync = [], async = [], blockers = []) {
	flatten(blockers, sync, async, (values) => {
		create_effect(8, () => fn(...values.map(get$1)), true);
	});
}
function block(fn, flags$1 = 0) {
	return create_effect(16 | flags$1, fn, true);
}
function managed(fn, flags$1 = 0) {
	return create_effect(MANAGED_EFFECT | flags$1, fn, true);
}
function branch(fn) {
	return create_effect(32 | EFFECT_PRESERVED, fn, true);
}
function execute_effect_teardown(effect$1) {
	var teardown$1 = effect$1.teardown;
	if (teardown$1 !== null) {
		const previously_destroying_effect = is_destroying_effect;
		const previous_reaction = active_reaction;
		set_is_destroying_effect(true);
		set_active_reaction(null);
		try {
			teardown$1.call(null);
		} finally {
			set_is_destroying_effect(previously_destroying_effect);
			set_active_reaction(previous_reaction);
		}
	}
}
function destroy_effect_children(signal, remove_dom = false) {
	var effect$1 = signal.first;
	signal.first = signal.last = null;
	while (effect$1 !== null) {
		const controller = effect$1.ac;
		if (controller !== null) without_reactive_context(() => {
			controller.abort(STALE_REACTION);
		});
		var next$1 = effect$1.next;
		if ((effect$1.f & 64) !== 0) effect$1.parent = null;
		else destroy_effect(effect$1, remove_dom);
		effect$1 = next$1;
	}
}
function destroy_block_effect_children(signal) {
	var effect$1 = signal.first;
	while (effect$1 !== null) {
		var next$1 = effect$1.next;
		if ((effect$1.f & 32) === 0) destroy_effect(effect$1);
		effect$1 = next$1;
	}
}
function destroy_effect(effect$1, remove_dom = true) {
	var removed = false;
	if ((remove_dom || (effect$1.f & 262144) !== 0) && effect$1.nodes !== null && effect$1.nodes.end !== null) {
		remove_effect_dom(effect$1.nodes.start, effect$1.nodes.end);
		removed = true;
	}
	destroy_effect_children(effect$1, remove_dom && !removed);
	remove_reactions(effect$1, 0);
	set_signal_status(effect$1, DESTROYED);
	var transitions = effect$1.nodes && effect$1.nodes.t;
	if (transitions !== null) for (const transition$1 of transitions) transition$1.stop();
	execute_effect_teardown(effect$1);
	var parent = effect$1.parent;
	if (parent !== null && parent.first !== null) unlink_effect(effect$1);
	effect$1.next = effect$1.prev = effect$1.teardown = effect$1.ctx = effect$1.deps = effect$1.fn = effect$1.nodes = effect$1.ac = null;
}
function remove_effect_dom(node, end) {
	while (node !== null) {
		var next$1 = node === end ? null : /* @__PURE__ */ get_next_sibling(node);
		node.remove();
		node = next$1;
	}
}
function unlink_effect(effect$1) {
	var parent = effect$1.parent;
	var prev = effect$1.prev;
	var next$1 = effect$1.next;
	if (prev !== null) prev.next = next$1;
	if (next$1 !== null) next$1.prev = prev;
	if (parent !== null) {
		if (parent.first === effect$1) parent.first = next$1;
		if (parent.last === effect$1) parent.last = prev;
	}
}
function pause_effect(effect$1, callback, destroy = true) {
	var transitions = [];
	pause_children(effect$1, transitions, true);
	var fn = () => {
		if (destroy) destroy_effect(effect$1);
		if (callback) callback();
	};
	var remaining = transitions.length;
	if (remaining > 0) {
		var check = () => --remaining || fn();
		for (var transition$1 of transitions) transition$1.out(check);
	} else fn();
}
function pause_children(effect$1, transitions, local) {
	if ((effect$1.f & 8192) !== 0) return;
	effect$1.f ^= INERT;
	var t = effect$1.nodes && effect$1.nodes.t;
	if (t !== null) {
		for (const transition$1 of t) if (transition$1.is_global || local) transitions.push(transition$1);
	}
	var child$1 = effect$1.first;
	while (child$1 !== null) {
		var sibling$1 = child$1.next;
		var transparent = (child$1.f & 65536) !== 0 || (child$1.f & 32) !== 0 && (effect$1.f & 16) !== 0;
		pause_children(child$1, transitions, transparent ? local : false);
		child$1 = sibling$1;
	}
}
function resume_effect(effect$1) {
	resume_children(effect$1, true);
}
function resume_children(effect$1, local) {
	if ((effect$1.f & 8192) === 0) return;
	effect$1.f ^= INERT;
	if ((effect$1.f & 1024) === 0) {
		set_signal_status(effect$1, DIRTY);
		schedule_effect(effect$1);
	}
	var child$1 = effect$1.first;
	while (child$1 !== null) {
		var sibling$1 = child$1.next;
		var transparent = (child$1.f & 65536) !== 0 || (child$1.f & 32) !== 0;
		resume_children(child$1, transparent ? local : false);
		child$1 = sibling$1;
	}
	var t = effect$1.nodes && effect$1.nodes.t;
	if (t !== null) {
		for (const transition$1 of t) if (transition$1.is_global || local) transition$1.in();
	}
}
function move_effect(effect$1, fragment) {
	if (!effect$1.nodes) return;
	var node = effect$1.nodes.start;
	var end = effect$1.nodes.end;
	while (node !== null) {
		var next$1 = node === end ? null : /* @__PURE__ */ get_next_sibling(node);
		fragment.append(node);
		node = next$1;
	}
}
let captured_signals = null;
let is_updating_effect = false;
function set_is_updating_effect(value) {
	is_updating_effect = value;
}
let is_destroying_effect = false;
function set_is_destroying_effect(value) {
	is_destroying_effect = value;
}
let active_reaction = null;
let untracking = false;
function set_active_reaction(reaction) {
	active_reaction = reaction;
}
let active_effect = null;
function set_active_effect(effect$1) {
	active_effect = effect$1;
}
let current_sources = null;
function push_reaction_value(value) {
	if (active_reaction !== null && (!async_mode_flag || (active_reaction.f & 2) !== 0)) if (current_sources === null) current_sources = [value];
	else current_sources.push(value);
}
var new_deps = null;
var skipped_deps = 0;
let untracked_writes = null;
function set_untracked_writes(value) {
	untracked_writes = value;
}
let write_version = 1;
var read_version = 0;
let update_version = read_version;
function set_update_version(value) {
	update_version = value;
}
function increment_write_version() {
	return ++write_version;
}
function is_dirty(reaction) {
	var flags$1 = reaction.f;
	if ((flags$1 & 2048) !== 0) return true;
	if (flags$1 & 2) reaction.f &= ~WAS_MARKED;
	if ((flags$1 & 4096) !== 0) {
		var dependencies = reaction.deps;
		if (dependencies !== null) {
			var length = dependencies.length;
			for (var i = 0; i < length; i++) {
				var dependency = dependencies[i];
				if (is_dirty(dependency)) update_derived(dependency);
				if (dependency.wv > reaction.wv) return true;
			}
		}
		if ((flags$1 & 512) !== 0 && batch_values === null) set_signal_status(reaction, CLEAN);
	}
	return false;
}
function schedule_possible_effect_self_invalidation(signal, effect$1, root = true) {
	var reactions = signal.reactions;
	if (reactions === null) return;
	if (!async_mode_flag && current_sources?.includes(signal)) return;
	for (var i = 0; i < reactions.length; i++) {
		var reaction = reactions[i];
		if ((reaction.f & 2) !== 0) schedule_possible_effect_self_invalidation(reaction, effect$1, false);
		else if (effect$1 === reaction) {
			if (root) set_signal_status(reaction, DIRTY);
			else if ((reaction.f & 1024) !== 0) set_signal_status(reaction, MAYBE_DIRTY);
			schedule_effect(reaction);
		}
	}
}
function update_reaction(reaction) {
	var previous_deps = new_deps;
	var previous_skipped_deps = skipped_deps;
	var previous_untracked_writes = untracked_writes;
	var previous_reaction = active_reaction;
	var previous_sources = current_sources;
	var previous_component_context = component_context;
	var previous_untracking = untracking;
	var previous_update_version = update_version;
	var flags$1 = reaction.f;
	new_deps = null;
	skipped_deps = 0;
	untracked_writes = null;
	active_reaction = (flags$1 & 96) === 0 ? reaction : null;
	current_sources = null;
	set_component_context(reaction.ctx);
	untracking = false;
	update_version = ++read_version;
	if (reaction.ac !== null) {
		without_reactive_context(() => {
			reaction.ac.abort(STALE_REACTION);
		});
		reaction.ac = null;
	}
	try {
		reaction.f |= REACTION_IS_UPDATING;
		var fn = reaction.fn;
		var result = fn();
		var deps = reaction.deps;
		if (new_deps !== null) {
			var i;
			remove_reactions(reaction, skipped_deps);
			if (deps !== null && skipped_deps > 0) {
				deps.length = skipped_deps + new_deps.length;
				for (i = 0; i < new_deps.length; i++) deps[skipped_deps + i] = new_deps[i];
			} else reaction.deps = deps = new_deps;
			if (effect_tracking() && (reaction.f & 512) !== 0) for (i = skipped_deps; i < deps.length; i++) (deps[i].reactions ??= []).push(reaction);
		} else if (deps !== null && skipped_deps < deps.length) {
			remove_reactions(reaction, skipped_deps);
			deps.length = skipped_deps;
		}
		if (is_runes() && untracked_writes !== null && !untracking && deps !== null && (reaction.f & 6146) === 0) for (i = 0; i < untracked_writes.length; i++) schedule_possible_effect_self_invalidation(untracked_writes[i], reaction);
		if (previous_reaction !== null && previous_reaction !== reaction) {
			read_version++;
			if (untracked_writes !== null) if (previous_untracked_writes === null) previous_untracked_writes = untracked_writes;
			else previous_untracked_writes.push(...untracked_writes);
		}
		if ((reaction.f & 8388608) !== 0) reaction.f ^= ERROR_VALUE;
		return result;
	} catch (error) {
		return handle_error(error);
	} finally {
		reaction.f ^= REACTION_IS_UPDATING;
		new_deps = previous_deps;
		skipped_deps = previous_skipped_deps;
		untracked_writes = previous_untracked_writes;
		active_reaction = previous_reaction;
		current_sources = previous_sources;
		set_component_context(previous_component_context);
		untracking = previous_untracking;
		update_version = previous_update_version;
	}
}
function remove_reaction(signal, dependency) {
	let reactions = dependency.reactions;
	if (reactions !== null) {
		var index$1 = index_of.call(reactions, signal);
		if (index$1 !== -1) {
			var new_length = reactions.length - 1;
			if (new_length === 0) reactions = dependency.reactions = null;
			else {
				reactions[index$1] = reactions[new_length];
				reactions.pop();
			}
		}
	}
	if (reactions === null && (dependency.f & 2) !== 0 && (new_deps === null || !new_deps.includes(dependency))) {
		set_signal_status(dependency, MAYBE_DIRTY);
		if ((dependency.f & 512) !== 0) {
			dependency.f ^= 512;
			dependency.f &= ~WAS_MARKED;
		}
		destroy_derived_effects(dependency);
		remove_reactions(dependency, 0);
	}
}
function remove_reactions(signal, start_index) {
	var dependencies = signal.deps;
	if (dependencies === null) return;
	for (var i = start_index; i < dependencies.length; i++) remove_reaction(signal, dependencies[i]);
}
function update_effect(effect$1) {
	var flags$1 = effect$1.f;
	if ((flags$1 & 16384) !== 0) return;
	set_signal_status(effect$1, CLEAN);
	var previous_effect = active_effect;
	var was_updating_effect = is_updating_effect;
	active_effect = effect$1;
	is_updating_effect = true;
	try {
		if ((flags$1 & 16777232) !== 0) destroy_block_effect_children(effect$1);
		else destroy_effect_children(effect$1);
		execute_effect_teardown(effect$1);
		var teardown$1 = update_reaction(effect$1);
		effect$1.teardown = typeof teardown$1 === "function" ? teardown$1 : null;
		effect$1.wv = write_version;
	} finally {
		is_updating_effect = was_updating_effect;
		active_effect = previous_effect;
	}
}
async function tick() {
	if (async_mode_flag) return new Promise((f) => {
		requestAnimationFrame(() => f());
		setTimeout(() => f());
	});
	await Promise.resolve();
	flushSync();
}
function settled() {
	return Batch.ensure().settled();
}
function get$1(signal) {
	var is_derived = (signal.f & 2) !== 0;
	captured_signals?.add(signal);
	if (active_reaction !== null && !untracking) {
		if (!(active_effect !== null && (active_effect.f & 16384) !== 0) && !current_sources?.includes(signal)) {
			var deps = active_reaction.deps;
			if ((active_reaction.f & 2097152) !== 0) {
				if (signal.rv < read_version) {
					signal.rv = read_version;
					if (new_deps === null && deps !== null && deps[skipped_deps] === signal) skipped_deps++;
					else if (new_deps === null) new_deps = [signal];
					else if (!new_deps.includes(signal)) new_deps.push(signal);
				}
			} else {
				(active_reaction.deps ??= []).push(signal);
				var reactions = signal.reactions;
				if (reactions === null) signal.reactions = [active_reaction];
				else if (!reactions.includes(active_reaction)) reactions.push(active_reaction);
			}
		}
	}
	if (is_destroying_effect) {
		if (old_values.has(signal)) return old_values.get(signal);
		if (is_derived) {
			var derived$2 = signal;
			var value = derived$2.v;
			if ((derived$2.f & 1024) === 0 && derived$2.reactions !== null || depends_on_old_values(derived$2)) value = execute_derived(derived$2);
			old_values.set(derived$2, value);
			return value;
		}
	} else if (is_derived && (!batch_values?.has(signal) || current_batch?.is_fork && !effect_tracking())) {
		derived$2 = signal;
		if (is_dirty(derived$2)) update_derived(derived$2);
		if (is_updating_effect && effect_tracking() && (derived$2.f & 512) === 0) reconnect(derived$2);
	}
	if (batch_values?.has(signal)) return batch_values.get(signal);
	if ((signal.f & 8388608) !== 0) throw signal.v;
	return signal.v;
}
function reconnect(derived$2) {
	if (derived$2.deps === null) return;
	derived$2.f ^= 512;
	for (const dep of derived$2.deps) {
		(dep.reactions ??= []).push(derived$2);
		if ((dep.f & 2) !== 0 && (dep.f & 512) === 0) reconnect(dep);
	}
}
function depends_on_old_values(derived$2) {
	if (derived$2.v === UNINITIALIZED) return true;
	if (derived$2.deps === null) return false;
	for (const dep of derived$2.deps) {
		if (old_values.has(dep)) return true;
		if ((dep.f & 2) !== 0 && depends_on_old_values(dep)) return true;
	}
	return false;
}
function untrack(fn) {
	var previous_untracking = untracking;
	try {
		untracking = true;
		return fn();
	} finally {
		untracking = previous_untracking;
	}
}
var STATUS_MASK = ~(MAYBE_DIRTY | 3072);
function set_signal_status(signal, status) {
	signal.f = signal.f & STATUS_MASK | status;
}
function deep_read_state(value) {
	if (typeof value !== "object" || !value || value instanceof EventTarget) return;
	if (STATE_SYMBOL in value) deep_read(value);
	else if (!Array.isArray(value)) for (let key$1 in value) {
		const prop$1 = value[key$1];
		if (typeof prop$1 === "object" && prop$1 && STATE_SYMBOL in prop$1) deep_read(prop$1);
	}
}
function deep_read(value, visited = /* @__PURE__ */ new Set()) {
	if (typeof value === "object" && value !== null && !(value instanceof EventTarget) && !visited.has(value)) {
		visited.add(value);
		if (value instanceof Date) value.getTime();
		for (let key$1 in value) try {
			deep_read(value[key$1], visited);
		} catch (e) {}
		const proto = get_prototype_of(value);
		if (proto !== Object.prototype && proto !== Array.prototype && proto !== Map.prototype && proto !== Set.prototype && proto !== Date.prototype) {
			const descriptors = get_descriptors(proto);
			for (let key$1 in descriptors) {
				const get$2 = descriptors[key$1].get;
				if (get$2) try {
					get$2.call(value);
				} catch (e) {}
			}
		}
	}
}
function createAttachmentKey() {
	return Symbol(ATTACHMENT_KEY);
}
function is_capture_event(name) {
	return name.endsWith("capture") && name !== "gotpointercapture" && name !== "lostpointercapture";
}
var DELEGATED_EVENTS = [
	"beforeinput",
	"click",
	"change",
	"dblclick",
	"contextmenu",
	"focusin",
	"focusout",
	"input",
	"keydown",
	"keyup",
	"mousedown",
	"mousemove",
	"mouseout",
	"mouseover",
	"mouseup",
	"pointerdown",
	"pointermove",
	"pointerout",
	"pointerover",
	"pointerup",
	"touchend",
	"touchmove",
	"touchstart"
];
function can_delegate_event(event_name) {
	return DELEGATED_EVENTS.includes(event_name);
}
var DOM_BOOLEAN_ATTRIBUTES = [
	"allowfullscreen",
	"async",
	"autofocus",
	"autoplay",
	"checked",
	"controls",
	"default",
	"disabled",
	"formnovalidate",
	"indeterminate",
	"inert",
	"ismap",
	"loop",
	"multiple",
	"muted",
	"nomodule",
	"novalidate",
	"open",
	"playsinline",
	"readonly",
	"required",
	"reversed",
	"seamless",
	"selected",
	"webkitdirectory",
	"defer",
	"disablepictureinpicture",
	"disableremoteplayback"
];
var ATTRIBUTE_ALIASES = {
	formnovalidate: "formNoValidate",
	ismap: "isMap",
	nomodule: "noModule",
	playsinline: "playsInline",
	readonly: "readOnly",
	defaultvalue: "defaultValue",
	defaultchecked: "defaultChecked",
	srcobject: "srcObject",
	novalidate: "noValidate",
	allowfullscreen: "allowFullscreen",
	disablepictureinpicture: "disablePictureInPicture",
	disableremoteplayback: "disableRemotePlayback"
};
function normalize_attribute(name) {
	name = name.toLowerCase();
	return ATTRIBUTE_ALIASES[name] ?? name;
}
[...DOM_BOOLEAN_ATTRIBUTES];
var PASSIVE_EVENTS = ["touchstart", "touchmove"];
function is_passive_event(name) {
	return PASSIVE_EVENTS.includes(name);
}
var RAW_TEXT_ELEMENTS = [
	"textarea",
	"script",
	"style",
	"title"
];
function is_raw_text_element(name) {
	return RAW_TEXT_ELEMENTS.includes(name);
}
const all_registered_events = /* @__PURE__ */ new Set();
const root_event_handles = /* @__PURE__ */ new Set();
function create_event(event_name, dom, handler, options = {}) {
	function target_handler(event$1) {
		if (!options.capture) handle_event_propagation.call(dom, event$1);
		if (!event$1.cancelBubble) return without_reactive_context(() => {
			return handler?.call(this, event$1);
		});
	}
	if (event_name.startsWith("pointer") || event_name.startsWith("touch") || event_name === "wheel") queue_micro_task(() => {
		dom.addEventListener(event_name, target_handler, options);
	});
	else dom.addEventListener(event_name, target_handler, options);
	return target_handler;
}
function on(element$1, type, handler, options = {}) {
	var target_handler = create_event(type, element$1, handler, options);
	return () => {
		element$1.removeEventListener(type, target_handler, options);
	};
}
function event(event_name, dom, handler, capture$1, passive) {
	var options = {
		capture: capture$1,
		passive
	};
	var target_handler = create_event(event_name, dom, handler, options);
	if (dom === document.body || dom === window || dom === document || dom instanceof HTMLMediaElement) teardown(() => {
		dom.removeEventListener(event_name, target_handler, options);
	});
}
function delegate(events) {
	for (var i = 0; i < events.length; i++) all_registered_events.add(events[i]);
	for (var fn of root_event_handles) fn(events);
}
var last_propagated_event = null;
function handle_event_propagation(event$1) {
	var handler_element = this;
	var owner_document = handler_element.ownerDocument;
	var event_name = event$1.type;
	var path = event$1.composedPath?.() || [];
	var current_target = path[0] || event$1.target;
	last_propagated_event = event$1;
	var path_idx = 0;
	var handled_at = last_propagated_event === event$1 && event$1.__root;
	if (handled_at) {
		var at_idx = path.indexOf(handled_at);
		if (at_idx !== -1 && (handler_element === document || handler_element === window)) {
			event$1.__root = handler_element;
			return;
		}
		var handler_idx = path.indexOf(handler_element);
		if (handler_idx === -1) return;
		if (at_idx <= handler_idx) path_idx = at_idx;
	}
	current_target = path[path_idx] || event$1.target;
	if (current_target === handler_element) return;
	define_property(event$1, "currentTarget", {
		configurable: true,
		get() {
			return current_target || owner_document;
		}
	});
	var previous_reaction = active_reaction;
	var previous_effect = active_effect;
	set_active_reaction(null);
	set_active_effect(null);
	try {
		var throw_error;
		var other_errors = [];
		while (current_target !== null) {
			var parent_element = current_target.assignedSlot || current_target.parentNode || current_target.host || null;
			try {
				var delegated = current_target["__" + event_name];
				if (delegated != null && (!current_target.disabled || event$1.target === current_target)) delegated.call(current_target, event$1);
			} catch (error) {
				if (throw_error) other_errors.push(error);
				else throw_error = error;
			}
			if (event$1.cancelBubble || parent_element === handler_element || parent_element === null) break;
			current_target = parent_element;
		}
		if (throw_error) {
			for (let error of other_errors) queueMicrotask(() => {
				throw error;
			});
			throw throw_error;
		}
	} finally {
		event$1.__root = handler_element;
		delete event$1.currentTarget;
		set_active_reaction(previous_reaction);
		set_active_effect(previous_effect);
	}
}
function create_fragment_from_html(html$1) {
	var elem = document.createElement("template");
	elem.innerHTML = html$1.replaceAll("<!>", "<!---->");
	return elem.content;
}
function assign_nodes(start, end) {
	var effect$1 = active_effect;
	if (effect$1.nodes === null) effect$1.nodes = {
		start,
		end,
		a: null,
		t: null
	};
}
/* @__NO_SIDE_EFFECTS__ */
function from_html(content, flags$1) {
	var is_fragment = (flags$1 & 1) !== 0;
	var use_import_node = (flags$1 & 2) !== 0;
	var node;
	var has_start = !content.startsWith("<!>");
	return () => {
		if (hydrating) {
			assign_nodes(hydrate_node, null);
			return hydrate_node;
		}
		if (node === void 0) {
			node = create_fragment_from_html(has_start ? content : "<!>" + content);
			if (!is_fragment) node = /* @__PURE__ */ get_first_child(node);
		}
		var clone$1 = use_import_node || is_firefox ? document.importNode(node, true) : node.cloneNode(true);
		if (is_fragment) {
			var start = /* @__PURE__ */ get_first_child(clone$1);
			var end = clone$1.lastChild;
			assign_nodes(start, end);
		} else assign_nodes(clone$1, clone$1);
		return clone$1;
	};
}
/* @__NO_SIDE_EFFECTS__ */
function from_namespace(content, flags$1, ns = "svg") {
	var has_start = !content.startsWith("<!>");
	var is_fragment = (flags$1 & 1) !== 0;
	var wrapped = `<${ns}>${has_start ? content : "<!>" + content}</${ns}>`;
	var node;
	return () => {
		if (hydrating) {
			assign_nodes(hydrate_node, null);
			return hydrate_node;
		}
		if (!node) {
			var root = /* @__PURE__ */ get_first_child(create_fragment_from_html(wrapped));
			if (is_fragment) {
				node = document.createDocumentFragment();
				while (/* @__PURE__ */ get_first_child(root)) node.appendChild(/* @__PURE__ */ get_first_child(root));
			} else node = /* @__PURE__ */ get_first_child(root);
		}
		var clone$1 = node.cloneNode(true);
		if (is_fragment) {
			var start = /* @__PURE__ */ get_first_child(clone$1);
			var end = clone$1.lastChild;
			assign_nodes(start, end);
		} else assign_nodes(clone$1, clone$1);
		return clone$1;
	};
}
/* @__NO_SIDE_EFFECTS__ */
function from_svg(content, flags$1) {
	return /* @__PURE__ */ from_namespace(content, flags$1, "svg");
}
function text(value = "") {
	if (!hydrating) {
		var t = create_text(value + "");
		assign_nodes(t, t);
		return t;
	}
	var node = hydrate_node;
	if (node.nodeType !== 3) {
		node.before(node = create_text());
		set_hydrate_node(node);
	}
	assign_nodes(node, node);
	return node;
}
function comment() {
	if (hydrating) {
		assign_nodes(hydrate_node, null);
		return hydrate_node;
	}
	var frag = document.createDocumentFragment();
	var start = document.createComment("");
	var anchor = create_text();
	frag.append(start, anchor);
	assign_nodes(start, anchor);
	return frag;
}
function append(anchor, dom) {
	if (hydrating) {
		var effect$1 = active_effect;
		if ((effect$1.f & 32768) === 0 || effect$1.nodes.end === null) effect$1.nodes.end = hydrate_node;
		hydrate_next();
		return;
	}
	if (anchor === null) return;
	anchor.before(dom);
}
function props_id() {
	if (hydrating && hydrate_node && hydrate_node.nodeType === 8 && hydrate_node.textContent?.startsWith(`$`)) {
		const id = hydrate_node.textContent.substring(1);
		hydrate_next();
		return id;
	}
	(window.__svelte ??= {}).uid ??= 1;
	return `c${window.__svelte.uid++}`;
}
let should_intro = true;
function set_should_intro(value) {
	should_intro = value;
}
function set_text(text$1, value) {
	var str = value == null ? "" : typeof value === "object" ? value + "" : value;
	if (str !== (text$1.__t ??= text$1.nodeValue)) {
		text$1.__t = str;
		text$1.nodeValue = str + "";
	}
}
function mount(component$1, options) {
	return _mount(component$1, options);
}
function hydrate(component$1, options) {
	init_operations();
	options.intro = options.intro ?? false;
	const target = options.target;
	const was_hydrating = hydrating;
	const previous_hydrate_node = hydrate_node;
	try {
		var anchor = /* @__PURE__ */ get_first_child(target);
		while (anchor && (anchor.nodeType !== 8 || anchor.data !== "[")) anchor = /* @__PURE__ */ get_next_sibling(anchor);
		if (!anchor) throw HYDRATION_ERROR;
		set_hydrating(true);
		set_hydrate_node(anchor);
		const instance = _mount(component$1, {
			...options,
			anchor
		});
		set_hydrating(false);
		return instance;
	} catch (error) {
		if (error instanceof Error && error.message.split("\n").some((line) => line.startsWith("https://svelte.dev/e/"))) throw error;
		if (error !== HYDRATION_ERROR) console.warn("Failed to hydrate: ", error);
		if (options.recover === false) hydration_failed();
		init_operations();
		clear_text_content(target);
		set_hydrating(false);
		return mount(component$1, options);
	} finally {
		set_hydrating(was_hydrating);
		set_hydrate_node(previous_hydrate_node);
	}
}
var document_listeners = /* @__PURE__ */ new Map();
function _mount(Component, { target, anchor, props = {}, events, context, intro = true }) {
	init_operations();
	var registered_events = /* @__PURE__ */ new Set();
	var event_handle = (events$1) => {
		for (var i = 0; i < events$1.length; i++) {
			var event_name = events$1[i];
			if (registered_events.has(event_name)) continue;
			registered_events.add(event_name);
			var passive = is_passive_event(event_name);
			target.addEventListener(event_name, handle_event_propagation, { passive });
			var n = document_listeners.get(event_name);
			if (n === void 0) {
				document.addEventListener(event_name, handle_event_propagation, { passive });
				document_listeners.set(event_name, 1);
			} else document_listeners.set(event_name, n + 1);
		}
	};
	event_handle(array_from(all_registered_events));
	root_event_handles.add(event_handle);
	var component$1 = void 0;
	var unmount$1 = component_root(() => {
		var anchor_node = anchor ?? target.appendChild(create_text());
		boundary(anchor_node, { pending: () => {} }, (anchor_node$1) => {
			if (context) {
				push({});
				var ctx = component_context;
				ctx.c = context;
			}
			if (events) props.$$events = events;
			if (hydrating) assign_nodes(anchor_node$1, null);
			should_intro = intro;
			component$1 = Component(anchor_node$1, props) || {};
			should_intro = true;
			if (hydrating) {
				active_effect.nodes.end = hydrate_node;
				if (hydrate_node === null || hydrate_node.nodeType !== 8 || hydrate_node.data !== "]") {
					hydration_mismatch();
					throw HYDRATION_ERROR;
				}
			}
			if (context) pop();
		});
		return () => {
			for (var event_name of registered_events) {
				target.removeEventListener(event_name, handle_event_propagation);
				var n = document_listeners.get(event_name);
				if (--n === 0) {
					document.removeEventListener(event_name, handle_event_propagation);
					document_listeners.delete(event_name);
				} else document_listeners.set(event_name, n);
			}
			root_event_handles.delete(event_handle);
			if (anchor_node !== anchor) anchor_node.parentNode?.removeChild(anchor_node);
		};
	});
	mounted_components.set(component$1, unmount$1);
	return component$1;
}
var mounted_components = /* @__PURE__ */ new WeakMap();
function unmount(component$1, options) {
	const fn = mounted_components.get(component$1);
	if (fn) {
		mounted_components.delete(component$1);
		return fn(options);
	}
	return Promise.resolve();
}
var BranchManager = class {
	anchor;
	#batches = /* @__PURE__ */ new Map();
	#onscreen = /* @__PURE__ */ new Map();
	#offscreen = /* @__PURE__ */ new Map();
	#outroing = /* @__PURE__ */ new Set();
	#transition = true;
	constructor(anchor, transition$1 = true) {
		this.anchor = anchor;
		this.#transition = transition$1;
	}
	#commit = () => {
		var batch = current_batch;
		if (!this.#batches.has(batch)) return;
		var key$1 = this.#batches.get(batch);
		var onscreen = this.#onscreen.get(key$1);
		if (onscreen) {
			resume_effect(onscreen);
			this.#outroing.delete(key$1);
		} else {
			var offscreen = this.#offscreen.get(key$1);
			if (offscreen) {
				this.#onscreen.set(key$1, offscreen.effect);
				this.#offscreen.delete(key$1);
				offscreen.fragment.lastChild.remove();
				this.anchor.before(offscreen.fragment);
				onscreen = offscreen.effect;
			}
		}
		for (const [b, k] of this.#batches) {
			this.#batches.delete(b);
			if (b === batch) break;
			const offscreen$1 = this.#offscreen.get(k);
			if (offscreen$1) {
				destroy_effect(offscreen$1.effect);
				this.#offscreen.delete(k);
			}
		}
		for (const [k, effect$1] of this.#onscreen) {
			if (k === key$1 || this.#outroing.has(k)) continue;
			const on_destroy = () => {
				if (Array.from(this.#batches.values()).includes(k)) {
					var fragment = document.createDocumentFragment();
					move_effect(effect$1, fragment);
					fragment.append(create_text());
					this.#offscreen.set(k, {
						effect: effect$1,
						fragment
					});
				} else destroy_effect(effect$1);
				this.#outroing.delete(k);
				this.#onscreen.delete(k);
			};
			if (this.#transition || !onscreen) {
				this.#outroing.add(k);
				pause_effect(effect$1, on_destroy, false);
			} else on_destroy();
		}
	};
	#discard = (batch) => {
		this.#batches.delete(batch);
		const keys = Array.from(this.#batches.values());
		for (const [k, branch$1] of this.#offscreen) if (!keys.includes(k)) {
			destroy_effect(branch$1.effect);
			this.#offscreen.delete(k);
		}
	};
	ensure(key$1, fn) {
		var batch = current_batch;
		var defer = should_defer_append();
		if (fn && !this.#onscreen.has(key$1) && !this.#offscreen.has(key$1)) if (defer) {
			var fragment = document.createDocumentFragment();
			var target = create_text();
			fragment.append(target);
			this.#offscreen.set(key$1, {
				effect: branch(() => fn(target)),
				fragment
			});
		} else this.#onscreen.set(key$1, branch(() => fn(this.anchor)));
		this.#batches.set(batch, key$1);
		if (defer) {
			for (const [k, effect$1] of this.#onscreen) if (k === key$1) batch.skipped_effects.delete(effect$1);
			else batch.skipped_effects.add(effect$1);
			for (const [k, branch$1] of this.#offscreen) if (k === key$1) batch.skipped_effects.delete(branch$1.effect);
			else batch.skipped_effects.add(branch$1.effect);
			batch.oncommit(this.#commit);
			batch.ondiscard(this.#discard);
		} else {
			if (hydrating) this.anchor = hydrate_node;
			this.#commit();
		}
	}
};
function if_block(node, fn, elseif = false) {
	if (hydrating) hydrate_next();
	var branches = new BranchManager(node);
	var flags$1 = elseif ? EFFECT_TRANSPARENT : 0;
	function update_branch(condition, fn$1) {
		if (hydrating) {
			if (condition === (read_hydration_instruction(node) === "[!")) {
				var anchor = skip_nodes();
				set_hydrate_node(anchor);
				branches.anchor = anchor;
				set_hydrating(false);
				branches.ensure(condition, fn$1);
				set_hydrating(true);
				return;
			}
		}
		branches.ensure(condition, fn$1);
	}
	block(() => {
		var has_branch = false;
		fn((fn$1, flag = true) => {
			has_branch = true;
			update_branch(flag, fn$1);
		});
		if (!has_branch) update_branch(false, null);
	}, flags$1);
}
function key(node, get_key, render_fn) {
	if (hydrating) hydrate_next();
	var branches = new BranchManager(node);
	var legacy = !is_runes();
	block(() => {
		var key$1 = get_key();
		if (legacy && key$1 !== null && typeof key$1 === "object") key$1 = {};
		branches.ensure(key$1, render_fn);
	});
}
function css_props(element$1, get_styles) {
	if (hydrating) set_hydrate_node(/* @__PURE__ */ get_first_child(element$1));
	render_effect(() => {
		var styles = get_styles();
		for (var key$1 in styles) {
			var value = styles[key$1];
			if (value) element$1.style.setProperty(key$1, value);
			else element$1.style.removeProperty(key$1);
		}
	});
}
function index(_, i) {
	return i;
}
function pause_effects(state$1, to_destroy, controlled_anchor) {
	var transitions = [];
	var length = to_destroy.length;
	var group;
	var remaining = to_destroy.length;
	for (var i = 0; i < length; i++) {
		let effect$1 = to_destroy[i];
		pause_effect(effect$1, () => {
			if (group) {
				group.pending.delete(effect$1);
				group.done.add(effect$1);
				if (group.pending.size === 0) {
					var groups = state$1.outrogroups;
					destroy_effects(array_from(group.done));
					groups.delete(group);
					if (groups.size === 0) state$1.outrogroups = null;
				}
			} else remaining -= 1;
		}, false);
	}
	if (remaining === 0) {
		var fast_path = transitions.length === 0 && controlled_anchor !== null;
		if (fast_path) {
			var anchor = controlled_anchor;
			var parent_node = anchor.parentNode;
			clear_text_content(parent_node);
			parent_node.append(anchor);
			state$1.items.clear();
		}
		destroy_effects(to_destroy, !fast_path);
	} else {
		group = {
			pending: new Set(to_destroy),
			done: /* @__PURE__ */ new Set()
		};
		(state$1.outrogroups ??= /* @__PURE__ */ new Set()).add(group);
	}
}
function destroy_effects(to_destroy, remove_dom = true) {
	for (var i = 0; i < to_destroy.length; i++) destroy_effect(to_destroy[i], remove_dom);
}
var offscreen_anchor;
function each(node, flags$1, get_collection, get_key, render_fn, fallback_fn = null) {
	var anchor = node;
	var items = /* @__PURE__ */ new Map();
	if ((flags$1 & 4) !== 0) {
		var parent_node = node;
		anchor = hydrating ? set_hydrate_node(/* @__PURE__ */ get_first_child(parent_node)) : parent_node.appendChild(create_text());
	}
	if (hydrating) hydrate_next();
	var fallback$1 = null;
	var each_array = /* @__PURE__ */ derived_safe_equal(() => {
		var collection = get_collection();
		return is_array(collection) ? collection : collection == null ? [] : array_from(collection);
	});
	var array;
	var first_run = true;
	function commit() {
		state$1.fallback = fallback$1;
		reconcile(state$1, array, anchor, flags$1, get_key);
		if (fallback$1 !== null) if (array.length === 0) if ((fallback$1.f & 33554432) === 0) resume_effect(fallback$1);
		else {
			fallback$1.f ^= EFFECT_OFFSCREEN;
			move(fallback$1, null, anchor);
		}
		else pause_effect(fallback$1, () => {
			fallback$1 = null;
		});
	}
	var state$1 = {
		effect: block(() => {
			array = get$1(each_array);
			var length = array.length;
			let mismatch = false;
			if (hydrating) {
				if (read_hydration_instruction(anchor) === "[!" !== (length === 0)) {
					anchor = skip_nodes();
					set_hydrate_node(anchor);
					set_hydrating(false);
					mismatch = true;
				}
			}
			var keys = /* @__PURE__ */ new Set();
			var batch = current_batch;
			var defer = should_defer_append();
			for (var index$1 = 0; index$1 < length; index$1 += 1) {
				if (hydrating && hydrate_node.nodeType === 8 && hydrate_node.data === "]") {
					anchor = hydrate_node;
					mismatch = true;
					set_hydrating(false);
				}
				var value = array[index$1];
				var key$1 = get_key(value, index$1);
				var item = first_run ? null : items.get(key$1);
				if (item) {
					if (item.v) internal_set(item.v, value);
					if (item.i) internal_set(item.i, index$1);
					if (defer) batch.skipped_effects.delete(item.e);
				} else {
					item = create_item(items, first_run ? anchor : offscreen_anchor ??= create_text(), value, key$1, index$1, render_fn, flags$1, get_collection);
					if (!first_run) item.e.f |= EFFECT_OFFSCREEN;
					items.set(key$1, item);
				}
				keys.add(key$1);
			}
			if (length === 0 && fallback_fn && !fallback$1) if (first_run) fallback$1 = branch(() => fallback_fn(anchor));
			else {
				fallback$1 = branch(() => fallback_fn(offscreen_anchor ??= create_text()));
				fallback$1.f |= EFFECT_OFFSCREEN;
			}
			if (hydrating && length > 0) set_hydrate_node(skip_nodes());
			if (!first_run) if (defer) {
				for (const [key$2, item$1] of items) if (!keys.has(key$2)) batch.skipped_effects.add(item$1.e);
				batch.oncommit(commit);
				batch.ondiscard(() => {});
			} else commit();
			if (mismatch) set_hydrating(true);
			get$1(each_array);
		}),
		flags: flags$1,
		items,
		outrogroups: null,
		fallback: fallback$1
	};
	first_run = false;
	if (hydrating) anchor = hydrate_node;
}
function reconcile(state$1, array, anchor, flags$1, get_key) {
	var is_animated = (flags$1 & 8) !== 0;
	var length = array.length;
	var items = state$1.items;
	var current = state$1.effect.first;
	var seen;
	var prev = null;
	var to_animate;
	var matched = [];
	var stashed = [];
	var value;
	var key$1;
	var effect$1;
	var i;
	if (is_animated) for (i = 0; i < length; i += 1) {
		value = array[i];
		key$1 = get_key(value, i);
		effect$1 = items.get(key$1).e;
		if ((effect$1.f & 33554432) === 0) {
			effect$1.nodes?.a?.measure();
			(to_animate ??= /* @__PURE__ */ new Set()).add(effect$1);
		}
	}
	for (i = 0; i < length; i += 1) {
		value = array[i];
		key$1 = get_key(value, i);
		effect$1 = items.get(key$1).e;
		if (state$1.outrogroups !== null) for (const group of state$1.outrogroups) {
			group.pending.delete(effect$1);
			group.done.delete(effect$1);
		}
		if ((effect$1.f & 33554432) !== 0) {
			effect$1.f ^= EFFECT_OFFSCREEN;
			if (effect$1 === current) move(effect$1, null, anchor);
			else {
				var next$1 = prev ? prev.next : current;
				if (effect$1 === state$1.effect.last) state$1.effect.last = effect$1.prev;
				if (effect$1.prev) effect$1.prev.next = effect$1.next;
				if (effect$1.next) effect$1.next.prev = effect$1.prev;
				link(state$1, prev, effect$1);
				link(state$1, effect$1, next$1);
				move(effect$1, next$1, anchor);
				prev = effect$1;
				matched = [];
				stashed = [];
				current = prev.next;
				continue;
			}
		}
		if ((effect$1.f & 8192) !== 0) {
			resume_effect(effect$1);
			if (is_animated) {
				effect$1.nodes?.a?.unfix();
				(to_animate ??= /* @__PURE__ */ new Set()).delete(effect$1);
			}
		}
		if (effect$1 !== current) {
			if (seen !== void 0 && seen.has(effect$1)) {
				if (matched.length < stashed.length) {
					var start = stashed[0];
					var j;
					prev = start.prev;
					var a = matched[0];
					var b = matched[matched.length - 1];
					for (j = 0; j < matched.length; j += 1) move(matched[j], start, anchor);
					for (j = 0; j < stashed.length; j += 1) seen.delete(stashed[j]);
					link(state$1, a.prev, b.next);
					link(state$1, prev, a);
					link(state$1, b, start);
					current = start;
					prev = b;
					i -= 1;
					matched = [];
					stashed = [];
				} else {
					seen.delete(effect$1);
					move(effect$1, current, anchor);
					link(state$1, effect$1.prev, effect$1.next);
					link(state$1, effect$1, prev === null ? state$1.effect.first : prev.next);
					link(state$1, prev, effect$1);
					prev = effect$1;
				}
				continue;
			}
			matched = [];
			stashed = [];
			while (current !== null && current !== effect$1) {
				(seen ??= /* @__PURE__ */ new Set()).add(current);
				stashed.push(current);
				current = current.next;
			}
			if (current === null) continue;
		}
		if ((effect$1.f & 33554432) === 0) matched.push(effect$1);
		prev = effect$1;
		current = effect$1.next;
	}
	if (state$1.outrogroups !== null) {
		for (const group of state$1.outrogroups) if (group.pending.size === 0) {
			destroy_effects(array_from(group.done));
			state$1.outrogroups?.delete(group);
		}
		if (state$1.outrogroups.size === 0) state$1.outrogroups = null;
	}
	if (current !== null || seen !== void 0) {
		var to_destroy = [];
		if (seen !== void 0) {
			for (effect$1 of seen) if ((effect$1.f & 8192) === 0) to_destroy.push(effect$1);
		}
		while (current !== null) {
			if ((current.f & 8192) === 0 && current !== state$1.fallback) to_destroy.push(current);
			current = current.next;
		}
		var destroy_length = to_destroy.length;
		if (destroy_length > 0) {
			var controlled_anchor = (flags$1 & 4) !== 0 && length === 0 ? anchor : null;
			if (is_animated) {
				for (i = 0; i < destroy_length; i += 1) to_destroy[i].nodes?.a?.measure();
				for (i = 0; i < destroy_length; i += 1) to_destroy[i].nodes?.a?.fix();
			}
			pause_effects(state$1, to_destroy, controlled_anchor);
		}
	}
	if (is_animated) queue_micro_task(() => {
		if (to_animate === void 0) return;
		for (effect$1 of to_animate) effect$1.nodes?.a?.apply();
	});
}
function create_item(items, anchor, value, key$1, index$1, render_fn, flags$1, get_collection) {
	var v = (flags$1 & 1) !== 0 ? (flags$1 & 16) === 0 ? /* @__PURE__ */ mutable_source(value, false, false) : source(value) : null;
	var i = (flags$1 & 2) !== 0 ? source(index$1) : null;
	return {
		v,
		i,
		e: branch(() => {
			render_fn(anchor, v ?? value, i ?? index$1, get_collection);
			return () => {
				items.delete(key$1);
			};
		})
	};
}
function move(effect$1, next$1, anchor) {
	if (!effect$1.nodes) return;
	var node = effect$1.nodes.start;
	var end = effect$1.nodes.end;
	var dest = next$1 && (next$1.f & 33554432) === 0 ? next$1.nodes.start : anchor;
	while (node !== null) {
		var next_node = /* @__PURE__ */ get_next_sibling(node);
		dest.before(node);
		if (node === end) return;
		node = next_node;
	}
}
function link(state$1, prev, next$1) {
	if (prev === null) state$1.effect.first = next$1;
	else prev.next = next$1;
	if (next$1 === null) state$1.effect.last = prev;
	else next$1.prev = prev;
}
function html(node, get_value, svg = false, mathml = false, skip_warning = false) {
	var anchor = node;
	var value = "";
	template_effect(() => {
		var effect$1 = active_effect;
		if (value === (value = get_value() ?? "")) {
			if (hydrating) hydrate_next();
			return;
		}
		if (effect$1.nodes !== null) {
			remove_effect_dom(effect$1.nodes.start, effect$1.nodes.end);
			effect$1.nodes = null;
		}
		if (value === "") return;
		if (hydrating) {
			hydrate_node.data;
			var next$1 = hydrate_next();
			var last = next$1;
			while (next$1 !== null && (next$1.nodeType !== 8 || next$1.data !== "")) {
				last = next$1;
				next$1 = /* @__PURE__ */ get_next_sibling(next$1);
			}
			if (next$1 === null) {
				hydration_mismatch();
				throw HYDRATION_ERROR;
			}
			assign_nodes(hydrate_node, last);
			anchor = set_hydrate_node(next$1);
			return;
		}
		var html$1 = value + "";
		if (svg) html$1 = `<svg>${html$1}</svg>`;
		else if (mathml) html$1 = `<math>${html$1}</math>`;
		var node$1 = create_fragment_from_html(html$1);
		if (svg || mathml) node$1 = /* @__PURE__ */ get_first_child(node$1);
		assign_nodes(/* @__PURE__ */ get_first_child(node$1), node$1.lastChild);
		if (svg || mathml) while (/* @__PURE__ */ get_first_child(node$1)) anchor.before(/* @__PURE__ */ get_first_child(node$1));
		else anchor.before(node$1);
	});
}
function slot(anchor, $$props, name, slot_props, fallback_fn) {
	if (hydrating) hydrate_next();
	var slot_fn = $$props.$$slots?.[name];
	var is_interop = false;
	if (slot_fn === true) {
		slot_fn = $$props[name === "default" ? "children" : name];
		is_interop = true;
	}
	if (slot_fn === void 0) {
		if (fallback_fn !== null) fallback_fn(anchor);
	} else slot_fn(anchor, is_interop ? () => slot_props : slot_props);
}
function snippet(node, get_snippet, ...args) {
	var branches = new BranchManager(node);
	block(() => {
		const snippet$1 = get_snippet() ?? null;
		branches.ensure(snippet$1, snippet$1 && ((anchor) => snippet$1(anchor, ...args)));
	}, EFFECT_TRANSPARENT);
}
function createRawSnippet(fn) {
	return (anchor, ...params) => {
		var snippet$1 = fn(...params);
		var element$1;
		if (hydrating) {
			element$1 = hydrate_node;
			hydrate_next();
		} else {
			element$1 = /* @__PURE__ */ get_first_child(create_fragment_from_html(snippet$1.render().trim()));
			anchor.before(element$1);
		}
		const result = snippet$1.setup?.(element$1);
		assign_nodes(element$1, element$1);
		if (typeof result === "function") teardown(result);
	};
}
function component(node, get_component, render_fn) {
	if (hydrating) hydrate_next();
	var branches = new BranchManager(node);
	block(() => {
		var component$1 = get_component() ?? null;
		branches.ensure(component$1, component$1 && ((target) => render_fn(target, component$1)));
	}, EFFECT_TRANSPARENT);
}
var now = () => performance.now();
const raf = {
	tick: (_) => requestAnimationFrame(_),
	now: () => now(),
	tasks: /* @__PURE__ */ new Set()
};
function run_tasks() {
	const now$1 = raf.now();
	raf.tasks.forEach((task) => {
		if (!task.c(now$1)) {
			raf.tasks.delete(task);
			task.f();
		}
	});
	if (raf.tasks.size !== 0) raf.tick(run_tasks);
}
function loop(callback) {
	let task;
	if (raf.tasks.size === 0) raf.tick(run_tasks);
	return {
		promise: new Promise((fulfill) => {
			raf.tasks.add(task = {
				c: callback,
				f: fulfill
			});
		}),
		abort() {
			raf.tasks.delete(task);
		}
	};
}
function dispatch_event(element$1, type) {
	without_reactive_context(() => {
		element$1.dispatchEvent(new CustomEvent(type));
	});
}
function css_property_to_camelcase(style) {
	if (style === "float") return "cssFloat";
	if (style === "offset") return "cssOffset";
	if (style.startsWith("--")) return style;
	const parts = style.split("-");
	if (parts.length === 1) return parts[0];
	return parts[0] + parts.slice(1).map((word) => word[0].toUpperCase() + word.slice(1)).join("");
}
function css_to_keyframe(css) {
	const keyframe = {};
	const parts = css.split(";");
	for (const part of parts) {
		const [property, value] = part.split(":");
		if (!property || value === void 0) break;
		const formatted_property = css_property_to_camelcase(property.trim());
		keyframe[formatted_property] = value.trim();
	}
	return keyframe;
}
var linear = (t) => t;
function set_animation_effect_override(v) {}
function transition(flags$1, element$1, get_fn, get_params) {
	var is_intro = (flags$1 & 1) !== 0;
	var is_outro = (flags$1 & 2) !== 0;
	var is_both = is_intro && is_outro;
	var is_global = (flags$1 & 4) !== 0;
	var direction = is_both ? "both" : is_intro ? "in" : "out";
	var current_options;
	var inert = element$1.inert;
	var overflow = element$1.style.overflow;
	var intro;
	var outro;
	function get_options() {
		return without_reactive_context(() => {
			return current_options ??= get_fn()(element$1, get_params?.() ?? {}, { direction });
		});
	}
	var transition$1 = {
		is_global,
		in() {
			element$1.inert = inert;
			if (!is_intro) {
				outro?.abort();
				outro?.reset?.();
				return;
			}
			if (!is_outro) intro?.abort();
			dispatch_event(element$1, "introstart");
			intro = animate(element$1, get_options(), outro, 1, () => {
				dispatch_event(element$1, "introend");
				intro?.abort();
				intro = current_options = void 0;
				element$1.style.overflow = overflow;
			});
		},
		out(fn) {
			if (!is_outro) {
				fn?.();
				current_options = void 0;
				return;
			}
			element$1.inert = true;
			dispatch_event(element$1, "outrostart");
			outro = animate(element$1, get_options(), intro, 0, () => {
				dispatch_event(element$1, "outroend");
				fn?.();
			});
		},
		stop: () => {
			intro?.abort();
			outro?.abort();
		}
	};
	var e = active_effect;
	(e.nodes.t ??= []).push(transition$1);
	if (is_intro && should_intro) {
		var run$1 = is_global;
		if (!run$1) {
			var block$1 = e.parent;
			while (block$1 && (block$1.f & 65536) !== 0) while (block$1 = block$1.parent) if ((block$1.f & 16) !== 0) break;
			run$1 = !block$1 || (block$1.f & 32768) !== 0;
		}
		if (run$1) effect(() => {
			untrack(() => transition$1.in());
		});
	}
}
function animate(element$1, options, counterpart, t2, on_finish) {
	var is_intro = t2 === 1;
	if (is_function(options)) {
		var a;
		var aborted = false;
		queue_micro_task(() => {
			if (aborted) return;
			a = animate(element$1, options({ direction: is_intro ? "in" : "out" }), counterpart, t2, on_finish);
		});
		return {
			abort: () => {
				aborted = true;
				a?.abort();
			},
			deactivate: () => a.deactivate(),
			reset: () => a.reset(),
			t: () => a.t()
		};
	}
	counterpart?.deactivate();
	if (!options?.duration) {
		on_finish();
		return {
			abort: noop,
			deactivate: noop,
			reset: noop,
			t: () => t2
		};
	}
	const { delay = 0, css, tick: tick$1, easing = linear } = options;
	var keyframes = [];
	if (is_intro && counterpart === void 0) {
		if (tick$1) tick$1(0, 1);
		if (css) {
			var styles = css_to_keyframe(css(0, 1));
			keyframes.push(styles, styles);
		}
	}
	var get_t = () => 1 - t2;
	var animation = element$1.animate(keyframes, {
		duration: delay,
		fill: "forwards"
	});
	animation.onfinish = () => {
		animation.cancel();
		var t1 = counterpart?.t() ?? 1 - t2;
		counterpart?.abort();
		var delta = t2 - t1;
		var duration = options.duration * Math.abs(delta);
		var keyframes$1 = [];
		if (duration > 0) {
			var needs_overflow_hidden = false;
			if (css) {
				var n = Math.ceil(duration / (1e3 / 60));
				for (var i = 0; i <= n; i += 1) {
					var t = t1 + delta * easing(i / n);
					var styles$1 = css_to_keyframe(css(t, 1 - t));
					keyframes$1.push(styles$1);
					needs_overflow_hidden ||= styles$1.overflow === "hidden";
				}
			}
			if (needs_overflow_hidden) element$1.style.overflow = "hidden";
			get_t = () => {
				var time = animation.currentTime;
				return t1 + delta * easing(time / duration);
			};
			if (tick$1) loop(() => {
				if (animation.playState !== "running") return false;
				var t$1 = get_t();
				tick$1(t$1, 1 - t$1);
				return true;
			});
		}
		animation = element$1.animate(keyframes$1, {
			duration,
			fill: "forwards"
		});
		animation.onfinish = () => {
			get_t = () => t2;
			tick$1?.(t2, 1 - t2);
			on_finish();
		};
	};
	return {
		abort: () => {
			if (animation) {
				animation.cancel();
				animation.effect = null;
				animation.onfinish = noop;
			}
		},
		deactivate: () => {
			on_finish = noop;
		},
		reset: () => {
			if (t2 === 0) tick$1?.(1, 0);
		},
		t: () => get_t()
	};
}
function element(node, get_tag, is_svg, render_fn, get_namespace, location) {
	let was_hydrating = hydrating;
	if (hydrating) hydrate_next();
	var element$1 = null;
	if (hydrating && hydrate_node.nodeType === 1) {
		element$1 = hydrate_node;
		hydrate_next();
	}
	var anchor = hydrating ? hydrate_node : node;
	var parent_effect = active_effect;
	var branches = new BranchManager(anchor, false);
	block(() => {
		const next_tag = get_tag() || null;
		var ns = get_namespace ? get_namespace() : is_svg || next_tag === "svg" ? NAMESPACE_SVG : null;
		if (next_tag === null) {
			branches.ensure(null, null);
			set_should_intro(true);
			return;
		}
		branches.ensure(next_tag, (anchor$1) => {
			if (next_tag) {
				element$1 = hydrating ? element$1 : ns ? document.createElementNS(ns, next_tag) : document.createElement(next_tag);
				assign_nodes(element$1, element$1);
				if (render_fn) {
					if (hydrating && is_raw_text_element(next_tag)) element$1.append(document.createComment(""));
					var child_anchor = hydrating ? /* @__PURE__ */ get_first_child(element$1) : element$1.appendChild(create_text());
					if (hydrating) if (child_anchor === null) set_hydrating(false);
					else set_hydrate_node(child_anchor);
					set_animation_effect_override(parent_effect);
					render_fn(element$1, child_anchor);
					set_animation_effect_override(null);
				}
				active_effect.nodes.end = element$1;
				anchor$1.before(element$1);
			}
			if (hydrating) set_hydrate_node(anchor$1);
		});
		set_should_intro(true);
		return () => {
			if (next_tag) set_should_intro(false);
		};
	}, EFFECT_TRANSPARENT);
	teardown(() => {
		set_should_intro(true);
	});
	if (was_hydrating) {
		set_hydrating(true);
		set_hydrate_node(anchor);
	}
}
function head(hash$1, render_fn) {
	let previous_hydrate_node = null;
	let was_hydrating = hydrating;
	var anchor;
	if (hydrating) {
		previous_hydrate_node = hydrate_node;
		var head_anchor = /* @__PURE__ */ get_first_child(document.head);
		while (head_anchor !== null && (head_anchor.nodeType !== 8 || head_anchor.data !== hash$1)) head_anchor = /* @__PURE__ */ get_next_sibling(head_anchor);
		if (head_anchor === null) set_hydrating(false);
		else {
			var start = /* @__PURE__ */ get_next_sibling(head_anchor);
			head_anchor.remove();
			set_hydrate_node(start);
		}
	}
	if (!hydrating) anchor = document.head.appendChild(create_text());
	try {
		block(() => render_fn(anchor), HEAD_EFFECT);
	} finally {
		if (was_hydrating) {
			set_hydrating(true);
			set_hydrate_node(previous_hydrate_node);
		}
	}
}
function action(dom, action$1, get_value) {
	effect(() => {
		var payload = untrack(() => action$1(dom, get_value?.()) || {});
		if (get_value && payload?.update) {
			var inited = false;
			var prev = {};
			render_effect(() => {
				var value = get_value();
				deep_read_state(value);
				if (inited && safe_not_equal(prev, value)) {
					prev = value;
					payload.update(value);
				}
			});
			inited = true;
		}
		if (payload?.destroy) return () => payload.destroy();
	});
}
function attach(node, get_fn) {
	var fn = void 0;
	var e;
	managed(() => {
		if (fn !== (fn = get_fn())) {
			if (e) {
				destroy_effect(e);
				e = null;
			}
			if (fn) e = branch(() => {
				effect(() => fn(node));
			});
		}
	});
}
function r(e) {
	var t, f, n = "";
	if ("string" == typeof e || "number" == typeof e) n += e;
	else if ("object" == typeof e) if (Array.isArray(e)) {
		var o = e.length;
		for (t = 0; t < o; t++) e[t] && (f = r(e[t])) && (n && (n += " "), n += f);
	} else for (f in e) e[f] && (n && (n += " "), n += f);
	return n;
}
function clsx$1() {
	for (var e, t, f = 0, n = "", o = arguments.length; f < o; f++) (e = arguments[f]) && (t = r(e)) && (n && (n += " "), n += t);
	return n;
}
function clsx(value) {
	if (typeof value === "object") return clsx$1(value);
	else return value ?? "";
}
var whitespace = [..." 	\n\r\f\xA0\v﻿"];
function to_class(value, hash$1, directives) {
	var classname = value == null ? "" : "" + value;
	if (hash$1) classname = classname ? classname + " " + hash$1 : hash$1;
	if (directives) {
		for (var key$1 in directives) if (directives[key$1]) classname = classname ? classname + " " + key$1 : key$1;
		else if (classname.length) {
			var len = key$1.length;
			var a = 0;
			while ((a = classname.indexOf(key$1, a)) >= 0) {
				var b = a + len;
				if ((a === 0 || whitespace.includes(classname[a - 1])) && (b === classname.length || whitespace.includes(classname[b]))) classname = (a === 0 ? "" : classname.substring(0, a)) + classname.substring(b + 1);
				else a = b;
			}
		}
	}
	return classname === "" ? null : classname;
}
function append_styles(styles, important = false) {
	var separator = important ? " !important;" : ";";
	var css = "";
	for (var key$1 in styles) {
		var value = styles[key$1];
		if (value != null && value !== "") css += " " + key$1 + ": " + value + separator;
	}
	return css;
}
function to_css_name(name) {
	if (name[0] !== "-" || name[1] !== "-") return name.toLowerCase();
	return name;
}
function to_style(value, styles) {
	if (styles) {
		var new_style = "";
		var normal_styles;
		var important_styles;
		if (Array.isArray(styles)) {
			normal_styles = styles[0];
			important_styles = styles[1];
		} else normal_styles = styles;
		if (value) {
			value = String(value).replaceAll(/\s*\/\*.*?\*\/\s*/g, "").trim();
			var in_str = false;
			var in_apo = 0;
			var in_comment = false;
			var reserved_names = [];
			if (normal_styles) reserved_names.push(...Object.keys(normal_styles).map(to_css_name));
			if (important_styles) reserved_names.push(...Object.keys(important_styles).map(to_css_name));
			var start_index = 0;
			var name_index = -1;
			const len = value.length;
			for (var i = 0; i < len; i++) {
				var c = value[i];
				if (in_comment) {
					if (c === "/" && value[i - 1] === "*") in_comment = false;
				} else if (in_str) {
					if (in_str === c) in_str = false;
				} else if (c === "/" && value[i + 1] === "*") in_comment = true;
				else if (c === "\"" || c === "'") in_str = c;
				else if (c === "(") in_apo++;
				else if (c === ")") in_apo--;
				if (!in_comment && in_str === false && in_apo === 0) {
					if (c === ":" && name_index === -1) name_index = i;
					else if (c === ";" || i === len - 1) {
						if (name_index !== -1) {
							var name = to_css_name(value.substring(start_index, name_index).trim());
							if (!reserved_names.includes(name)) {
								if (c !== ";") i++;
								var property = value.substring(start_index, i).trim();
								new_style += " " + property + ";";
							}
						}
						start_index = i + 1;
						name_index = -1;
					}
				}
			}
		}
		if (normal_styles) new_style += append_styles(normal_styles);
		if (important_styles) new_style += append_styles(important_styles, true);
		new_style = new_style.trim();
		return new_style === "" ? null : new_style;
	}
	return value == null ? null : String(value);
}
function set_class(dom, is_html, value, hash$1, prev_classes, next_classes) {
	var prev = dom.__className;
	if (hydrating || prev !== value || prev === void 0) {
		var next_class_name = to_class(value, hash$1, next_classes);
		if (!hydrating || next_class_name !== dom.getAttribute("class")) if (next_class_name == null) dom.removeAttribute("class");
		else if (is_html) dom.className = next_class_name;
		else dom.setAttribute("class", next_class_name);
		dom.__className = value;
	} else if (next_classes && prev_classes !== next_classes) for (var key$1 in next_classes) {
		var is_present = !!next_classes[key$1];
		if (prev_classes == null || is_present !== !!prev_classes[key$1]) dom.classList.toggle(key$1, is_present);
	}
	return next_classes;
}
function update_styles(dom, prev = {}, next$1, priority) {
	for (var key$1 in next$1) {
		var value = next$1[key$1];
		if (prev[key$1] !== value) if (next$1[key$1] == null) dom.style.removeProperty(key$1);
		else dom.style.setProperty(key$1, value, priority);
	}
}
function set_style(dom, value, prev_styles, next_styles) {
	var prev = dom.__style;
	if (hydrating || prev !== value) {
		var next_style_attr = to_style(value, next_styles);
		if (!hydrating || next_style_attr !== dom.getAttribute("style")) if (next_style_attr == null) dom.removeAttribute("style");
		else dom.style.cssText = next_style_attr;
		dom.__style = value;
	} else if (next_styles) if (Array.isArray(next_styles)) {
		update_styles(dom, prev_styles?.[0], next_styles[0]);
		update_styles(dom, prev_styles?.[1], next_styles[1], "important");
	} else update_styles(dom, prev_styles, next_styles);
	return next_styles;
}
function select_option(select, value, mounting = false) {
	if (select.multiple) {
		if (value == void 0) return;
		if (!is_array(value)) return select_multiple_invalid_value();
		for (var option of select.options) option.selected = value.includes(get_option_value(option));
		return;
	}
	for (option of select.options) if (is(get_option_value(option), value)) {
		option.selected = true;
		return;
	}
	if (!mounting || value !== void 0) select.selectedIndex = -1;
}
function init_select(select) {
	var observer = new MutationObserver(() => {
		select_option(select, select.__value);
	});
	observer.observe(select, {
		childList: true,
		subtree: true,
		attributes: true,
		attributeFilter: ["value"]
	});
	teardown(() => {
		observer.disconnect();
	});
}
function get_option_value(option) {
	if ("__value" in option) return option.__value;
	else return option.value;
}
const CLASS = Symbol("class");
const STYLE = Symbol("style");
var IS_CUSTOM_ELEMENT = Symbol("is custom element");
var IS_HTML = Symbol("is html");
function remove_input_defaults(input) {
	if (!hydrating) return;
	var already_removed = false;
	var remove_defaults = () => {
		if (already_removed) return;
		already_removed = true;
		if (input.hasAttribute("value")) {
			var value = input.value;
			set_attribute(input, "value", null);
			input.value = value;
		}
		if (input.hasAttribute("checked")) {
			var checked = input.checked;
			set_attribute(input, "checked", null);
			input.checked = checked;
		}
	};
	input.__on_r = remove_defaults;
	queue_micro_task(remove_defaults);
	add_form_reset_listener();
}
function set_value(element$1, value) {
	var attributes = get_attributes(element$1);
	if (attributes.value === (attributes.value = value ?? void 0) || element$1.value === value && (value !== 0 || element$1.nodeName !== "PROGRESS")) return;
	element$1.value = value ?? "";
}
function set_selected(element$1, selected) {
	if (selected) {
		if (!element$1.hasAttribute("selected")) element$1.setAttribute("selected", "");
	} else element$1.removeAttribute("selected");
}
function set_attribute(element$1, attribute, value, skip_warning) {
	var attributes = get_attributes(element$1);
	if (hydrating) {
		attributes[attribute] = element$1.getAttribute(attribute);
		if (attribute === "src" || attribute === "srcset" || attribute === "href" && element$1.nodeName === "LINK") {
			if (!skip_warning) check_src_in_dev_hydration(element$1, attribute, value ?? "");
			return;
		}
	}
	if (attributes[attribute] === (attributes[attribute] = value)) return;
	if (attribute === "loading") element$1[LOADING_ATTR_SYMBOL] = value;
	if (value == null) element$1.removeAttribute(attribute);
	else if (typeof value !== "string" && get_setters(element$1).includes(attribute)) element$1[attribute] = value;
	else element$1.setAttribute(attribute, value);
}
function set_attributes(element$1, prev, next$1, css_hash, should_remove_defaults = false, skip_warning = false) {
	if (hydrating && should_remove_defaults && element$1.tagName === "INPUT") {
		var input = element$1;
		if (!((input.type === "checkbox" ? "defaultChecked" : "defaultValue") in next$1)) remove_input_defaults(input);
	}
	var attributes = get_attributes(element$1);
	var is_custom_element = attributes[IS_CUSTOM_ELEMENT];
	var preserve_attribute_case = !attributes[IS_HTML];
	let is_hydrating_custom_element = hydrating && is_custom_element;
	if (is_hydrating_custom_element) set_hydrating(false);
	var current = prev || {};
	var is_option_element = element$1.tagName === "OPTION";
	for (var key$1 in prev) if (!(key$1 in next$1)) next$1[key$1] = null;
	if (next$1.class) next$1.class = clsx(next$1.class);
	else if (css_hash || next$1[CLASS]) next$1.class = null;
	if (next$1[STYLE]) next$1.style ??= null;
	var setters = get_setters(element$1);
	for (const key$2 in next$1) {
		let value = next$1[key$2];
		if (is_option_element && key$2 === "value" && value == null) {
			element$1.value = element$1.__value = "";
			current[key$2] = value;
			continue;
		}
		if (key$2 === "class") {
			set_class(element$1, element$1.namespaceURI === "http://www.w3.org/1999/xhtml", value, css_hash, prev?.[CLASS], next$1[CLASS]);
			current[key$2] = value;
			current[CLASS] = next$1[CLASS];
			continue;
		}
		if (key$2 === "style") {
			set_style(element$1, value, prev?.[STYLE], next$1[STYLE]);
			current[key$2] = value;
			current[STYLE] = next$1[STYLE];
			continue;
		}
		var prev_value = current[key$2];
		if (value === prev_value && !(value === void 0 && element$1.hasAttribute(key$2))) continue;
		current[key$2] = value;
		var prefix = key$2[0] + key$2[1];
		if (prefix === "$$") continue;
		if (prefix === "on") {
			const opts = {};
			const event_handle_key = "$$" + key$2;
			let event_name = key$2.slice(2);
			var delegated = can_delegate_event(event_name);
			if (is_capture_event(event_name)) {
				event_name = event_name.slice(0, -7);
				opts.capture = true;
			}
			if (!delegated && prev_value) {
				if (value != null) continue;
				element$1.removeEventListener(event_name, current[event_handle_key], opts);
				current[event_handle_key] = null;
			}
			if (value != null) if (!delegated) {
				function handle(evt) {
					current[key$2].call(this, evt);
				}
				current[event_handle_key] = create_event(event_name, element$1, handle, opts);
			} else {
				element$1[`__${event_name}`] = value;
				delegate([event_name]);
			}
			else if (delegated) element$1[`__${event_name}`] = void 0;
		} else if (key$2 === "style") set_attribute(element$1, key$2, value);
		else if (key$2 === "autofocus") autofocus(element$1, Boolean(value));
		else if (!is_custom_element && (key$2 === "__value" || key$2 === "value" && value != null)) element$1.value = element$1.__value = value;
		else if (key$2 === "selected" && is_option_element) set_selected(element$1, value);
		else {
			var name = key$2;
			if (!preserve_attribute_case) name = normalize_attribute(name);
			var is_default = name === "defaultValue" || name === "defaultChecked";
			if (value == null && !is_custom_element && !is_default) {
				attributes[key$2] = null;
				if (name === "value" || name === "checked") {
					let input$1 = element$1;
					const use_default = prev === void 0;
					if (name === "value") {
						let previous = input$1.defaultValue;
						input$1.removeAttribute(name);
						input$1.defaultValue = previous;
						input$1.value = input$1.__value = use_default ? previous : null;
					} else {
						let previous = input$1.defaultChecked;
						input$1.removeAttribute(name);
						input$1.defaultChecked = previous;
						input$1.checked = use_default ? previous : false;
					}
				} else element$1.removeAttribute(key$2);
			} else if (is_default || setters.includes(name) && (is_custom_element || typeof value !== "string")) {
				element$1[name] = value;
				if (name in attributes) attributes[name] = UNINITIALIZED;
			} else if (typeof value !== "function") set_attribute(element$1, name, value, skip_warning);
		}
	}
	if (is_hydrating_custom_element) set_hydrating(true);
	return current;
}
function attribute_effect(element$1, fn, sync = [], async = [], blockers = [], css_hash, should_remove_defaults = false, skip_warning = false) {
	flatten(blockers, sync, async, (values) => {
		var prev = void 0;
		var effects = {};
		var is_select = element$1.nodeName === "SELECT";
		var inited = false;
		managed(() => {
			var next$1 = fn(...values.map(get$1));
			var current = set_attributes(element$1, prev, next$1, css_hash, should_remove_defaults, skip_warning);
			if (inited && is_select && "value" in next$1) select_option(element$1, next$1.value);
			for (let symbol of Object.getOwnPropertySymbols(effects)) if (!next$1[symbol]) destroy_effect(effects[symbol]);
			for (let symbol of Object.getOwnPropertySymbols(next$1)) {
				var n = next$1[symbol];
				if (symbol.description === "@attach" && (!prev || n !== prev[symbol])) {
					if (effects[symbol]) destroy_effect(effects[symbol]);
					effects[symbol] = branch(() => attach(element$1, () => n));
				}
				current[symbol] = n;
			}
			prev = current;
		});
		if (is_select) {
			var select = element$1;
			effect(() => {
				select_option(select, prev.value, true);
				init_select(select);
			});
		}
		inited = true;
	});
}
function get_attributes(element$1) {
	return element$1.__attributes ??= {
		[IS_CUSTOM_ELEMENT]: element$1.nodeName.includes("-"),
		[IS_HTML]: element$1.namespaceURI === NAMESPACE_HTML
	};
}
var setters_cache = /* @__PURE__ */ new Map();
function get_setters(element$1) {
	var cache_key = element$1.getAttribute("is") || element$1.nodeName;
	var setters = setters_cache.get(cache_key);
	if (setters) return setters;
	setters_cache.set(cache_key, setters = []);
	var descriptors;
	var proto = element$1;
	var element_proto = Element.prototype;
	while (element_proto !== proto) {
		descriptors = get_descriptors(proto);
		for (var key$1 in descriptors) if (descriptors[key$1].set) setters.push(key$1);
		proto = get_prototype_of(proto);
	}
	return setters;
}
function check_src_in_dev_hydration(element$1, attribute, value) {}
function bind_value(input, get$2, set$1 = get$2) {
	var batches$1 = /* @__PURE__ */ new WeakSet();
	listen_to_event_and_reset_event(input, "input", async (is_reset) => {
		var value = is_reset ? input.defaultValue : input.value;
		value = is_numberlike_input(input) ? to_number(value) : value;
		set$1(value);
		if (current_batch !== null) batches$1.add(current_batch);
		await tick();
		if (value !== (value = get$2())) {
			var start = input.selectionStart;
			var end = input.selectionEnd;
			var length = input.value.length;
			input.value = value ?? "";
			if (end !== null) {
				var new_length = input.value.length;
				if (start === end && end === length && new_length > length) {
					input.selectionStart = new_length;
					input.selectionEnd = new_length;
				} else {
					input.selectionStart = start;
					input.selectionEnd = Math.min(end, new_length);
				}
			}
		}
	});
	if (hydrating && input.defaultValue !== input.value || untrack(get$2) == null && input.value) {
		set$1(is_numberlike_input(input) ? to_number(input.value) : input.value);
		if (current_batch !== null) batches$1.add(current_batch);
	}
	render_effect(() => {
		var value = get$2();
		if (input === document.activeElement) {
			var batch = previous_batch ?? current_batch;
			if (batches$1.has(batch)) return;
		}
		if (is_numberlike_input(input) && value === to_number(input.value)) return;
		if (input.type === "date" && !value && !input.value) return;
		if (value !== input.value) input.value = value ?? "";
	});
}
function bind_checked(input, get$2, set$1 = get$2) {
	listen_to_event_and_reset_event(input, "change", (is_reset) => {
		set$1(is_reset ? input.defaultChecked : input.checked);
	});
	if (hydrating && input.defaultChecked !== input.checked || untrack(get$2) == null) set$1(input.checked);
	render_effect(() => {
		var value = get$2();
		input.checked = Boolean(value);
	});
}
function is_numberlike_input(input) {
	var type = input.type;
	return type === "number" || type === "range";
}
function to_number(value) {
	return value === "" ? null : +value;
}
function bind_files(input, get$2, set$1 = get$2) {
	listen_to_event_and_reset_event(input, "change", () => {
		set$1(input.files);
	});
	if (hydrating && input.files) set$1(input.files);
	render_effect(() => {
		input.files = get$2();
	});
}
function is_bound_this(bound_value, element_or_component) {
	return bound_value === element_or_component || bound_value?.[STATE_SYMBOL] === element_or_component;
}
function bind_this(element_or_component = {}, update$1, get_value, get_parts) {
	effect(() => {
		var old_parts;
		var parts;
		render_effect(() => {
			old_parts = parts;
			parts = get_parts?.() || [];
			untrack(() => {
				if (element_or_component !== get_value(...parts)) {
					update$1(element_or_component, ...parts);
					if (old_parts && is_bound_this(get_value(...old_parts), element_or_component)) update$1(null, ...old_parts);
				}
			});
		});
		return () => {
			queue_micro_task(() => {
				if (parts && is_bound_this(get_value(...parts), element_or_component)) update$1(null, ...parts);
			});
		};
	});
	return element_or_component;
}
function bind_window_size(type, set$1) {
	listen(window, ["resize"], () => without_reactive_context(() => set$1(window[type])));
}
function init(immutable = false) {
	const context = component_context;
	const callbacks = context.l.u;
	if (!callbacks) return;
	let props = () => deep_read_state(context.s);
	if (immutable) {
		let version = 0;
		let prev = {};
		const d = /* @__PURE__ */ derived$1(() => {
			let changed = false;
			const props$1 = context.s;
			for (const key$1 in props$1) if (props$1[key$1] !== prev[key$1]) {
				prev[key$1] = props$1[key$1];
				changed = true;
			}
			if (changed) version++;
			return version;
		});
		props = () => get$1(d);
	}
	if (callbacks.b.length) user_pre_effect(() => {
		observe_all(context, props);
		run_all(callbacks.b);
	});
	user_effect(() => {
		const fns = untrack(() => callbacks.m.map(run));
		return () => {
			for (const fn of fns) if (typeof fn === "function") fn();
		};
	});
	if (callbacks.a.length) user_effect(() => {
		observe_all(context, props);
		run_all(callbacks.a);
	});
}
function observe_all(context, props) {
	if (context.l.s) for (const signal of context.l.s) get$1(signal);
	props();
}
function reactive_import(fn) {
	var s = source(0);
	return function() {
		if (arguments.length === 1) {
			set(s, get$1(s) + 1);
			return arguments[0];
		} else {
			get$1(s);
			return fn();
		}
	};
}
function subscribe_to_store(store, run$1, invalidate) {
	if (store == null) {
		run$1(void 0);
		if (invalidate) invalidate(void 0);
		return noop;
	}
	const unsub = untrack(() => store.subscribe(run$1, invalidate));
	return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
}
var subscriber_queue = [];
function readable(value, start) {
	return { subscribe: writable(value, start).subscribe };
}
function writable(value, start = noop) {
	let stop = null;
	const subscribers = /* @__PURE__ */ new Set();
	function set$1(new_value) {
		if (safe_not_equal(value, new_value)) {
			value = new_value;
			if (stop) {
				const run_queue = !subscriber_queue.length;
				for (const subscriber of subscribers) {
					subscriber[1]();
					subscriber_queue.push(subscriber, value);
				}
				if (run_queue) {
					for (let i = 0; i < subscriber_queue.length; i += 2) subscriber_queue[i][0](subscriber_queue[i + 1]);
					subscriber_queue.length = 0;
				}
			}
		}
	}
	function update$1(fn) {
		set$1(fn(value));
	}
	function subscribe(run$1, invalidate = noop) {
		const subscriber = [run$1, invalidate];
		subscribers.add(subscriber);
		if (subscribers.size === 1) stop = start(set$1, update$1) || noop;
		run$1(value);
		return () => {
			subscribers.delete(subscriber);
			if (subscribers.size === 0 && stop) {
				stop();
				stop = null;
			}
		};
	}
	return {
		set: set$1,
		update: update$1,
		subscribe
	};
}
function derived(stores, fn, initial_value) {
	const single = !Array.isArray(stores);
	const stores_array = single ? [stores] : stores;
	if (!stores_array.every(Boolean)) throw new Error("derived() expects stores as input, got a falsy value");
	const auto = fn.length < 2;
	return readable(initial_value, (set$1, update$1) => {
		let started = false;
		const values = [];
		let pending = 0;
		let cleanup = noop;
		const sync = () => {
			if (pending) return;
			cleanup();
			const result = fn(single ? values[0] : values, set$1, update$1);
			if (auto) set$1(result);
			else cleanup = typeof result === "function" ? result : noop;
		};
		const unsubscribers = stores_array.map((store, i) => subscribe_to_store(store, (value) => {
			values[i] = value;
			pending &= ~(1 << i);
			if (started) sync();
		}, () => {
			pending |= 1 << i;
		}));
		started = true;
		sync();
		return function stop() {
			run_all(unsubscribers);
			cleanup();
			started = false;
		};
	});
}
function readonly(store) {
	return { subscribe: store.subscribe.bind(store) };
}
function get(store) {
	let value;
	subscribe_to_store(store, (_) => value = _)();
	return value;
}
var is_store_binding = false;
var IS_UNMOUNTED = Symbol();
function store_get(store, store_name, stores) {
	const entry = stores[store_name] ??= {
		store: null,
		source: /* @__PURE__ */ mutable_source(void 0),
		unsubscribe: noop
	};
	if (entry.store !== store && !(IS_UNMOUNTED in stores)) {
		entry.unsubscribe();
		entry.store = store ?? null;
		if (store == null) {
			entry.source.v = void 0;
			entry.unsubscribe = noop;
		} else {
			var is_synchronous_callback = true;
			entry.unsubscribe = subscribe_to_store(store, (v) => {
				if (is_synchronous_callback) entry.source.v = v;
				else set(entry.source, v);
			});
			is_synchronous_callback = false;
		}
	}
	if (store && IS_UNMOUNTED in stores) return get(store);
	return get$1(entry.source);
}
function store_set(store, value) {
	store.set(value);
	return value;
}
function setup_stores() {
	const stores = {};
	function cleanup() {
		teardown(() => {
			for (var store_name in stores) stores[store_name].unsubscribe();
			define_property(stores, IS_UNMOUNTED, {
				enumerable: false,
				value: true
			});
		});
	}
	return [stores, cleanup];
}
function store_mutate(store, expression, new_value) {
	store.set(new_value);
	return expression;
}
function capture_store_binding(fn) {
	var previous_is_store_binding = is_store_binding;
	try {
		is_store_binding = false;
		return [fn(), is_store_binding];
	} finally {
		is_store_binding = previous_is_store_binding;
	}
}
var rest_props_handler = {
	get(target, key$1) {
		if (target.exclude.includes(key$1)) return;
		return target.props[key$1];
	},
	set(target, key$1) {
		return false;
	},
	getOwnPropertyDescriptor(target, key$1) {
		if (target.exclude.includes(key$1)) return;
		if (key$1 in target.props) return {
			enumerable: true,
			configurable: true,
			value: target.props[key$1]
		};
	},
	has(target, key$1) {
		if (target.exclude.includes(key$1)) return false;
		return key$1 in target.props;
	},
	ownKeys(target) {
		return Reflect.ownKeys(target.props).filter((key$1) => !target.exclude.includes(key$1));
	}
};
/* @__NO_SIDE_EFFECTS__ */
function rest_props(props, exclude, name) {
	return new Proxy({
		props,
		exclude
	}, rest_props_handler);
}
var legacy_rest_props_handler = {
	get(target, key$1) {
		if (target.exclude.includes(key$1)) return;
		get$1(target.version);
		return key$1 in target.special ? target.special[key$1]() : target.props[key$1];
	},
	set(target, key$1, value) {
		if (!(key$1 in target.special)) {
			var previous_effect = active_effect;
			try {
				set_active_effect(target.parent_effect);
				target.special[key$1] = prop({ get [key$1]() {
					return target.props[key$1];
				} }, key$1, 4);
			} finally {
				set_active_effect(previous_effect);
			}
		}
		target.special[key$1](value);
		update(target.version);
		return true;
	},
	getOwnPropertyDescriptor(target, key$1) {
		if (target.exclude.includes(key$1)) return;
		if (key$1 in target.props) return {
			enumerable: true,
			configurable: true,
			value: target.props[key$1]
		};
	},
	deleteProperty(target, key$1) {
		if (target.exclude.includes(key$1)) return true;
		target.exclude.push(key$1);
		update(target.version);
		return true;
	},
	has(target, key$1) {
		if (target.exclude.includes(key$1)) return false;
		return key$1 in target.props;
	},
	ownKeys(target) {
		return Reflect.ownKeys(target.props).filter((key$1) => !target.exclude.includes(key$1));
	}
};
function legacy_rest_props(props, exclude) {
	return new Proxy({
		props,
		exclude,
		special: {},
		version: source(0),
		parent_effect: active_effect
	}, legacy_rest_props_handler);
}
var spread_props_handler = {
	get(target, key$1) {
		let i = target.props.length;
		while (i--) {
			let p = target.props[i];
			if (is_function(p)) p = p();
			if (typeof p === "object" && p !== null && key$1 in p) return p[key$1];
		}
	},
	set(target, key$1, value) {
		let i = target.props.length;
		while (i--) {
			let p = target.props[i];
			if (is_function(p)) p = p();
			const desc = get_descriptor(p, key$1);
			if (desc && desc.set) {
				desc.set(value);
				return true;
			}
		}
		return false;
	},
	getOwnPropertyDescriptor(target, key$1) {
		let i = target.props.length;
		while (i--) {
			let p = target.props[i];
			if (is_function(p)) p = p();
			if (typeof p === "object" && p !== null && key$1 in p) {
				const descriptor = get_descriptor(p, key$1);
				if (descriptor && !descriptor.configurable) descriptor.configurable = true;
				return descriptor;
			}
		}
	},
	has(target, key$1) {
		if (key$1 === STATE_SYMBOL || key$1 === LEGACY_PROPS) return false;
		for (let p of target.props) {
			if (is_function(p)) p = p();
			if (p != null && key$1 in p) return true;
		}
		return false;
	},
	ownKeys(target) {
		const keys = [];
		for (let p of target.props) {
			if (is_function(p)) p = p();
			if (!p) continue;
			for (const key$1 in p) if (!keys.includes(key$1)) keys.push(key$1);
			for (const key$1 of Object.getOwnPropertySymbols(p)) if (!keys.includes(key$1)) keys.push(key$1);
		}
		return keys;
	}
};
function spread_props(...props) {
	return new Proxy({ props }, spread_props_handler);
}
function prop(props, key$1, flags$1, fallback$1) {
	var runes = !legacy_mode_flag || (flags$1 & 2) !== 0;
	var bindable = (flags$1 & 8) !== 0;
	var lazy = (flags$1 & 16) !== 0;
	var fallback_value = fallback$1;
	var fallback_dirty = true;
	var get_fallback = () => {
		if (fallback_dirty) {
			fallback_dirty = false;
			fallback_value = lazy ? untrack(fallback$1) : fallback$1;
		}
		return fallback_value;
	};
	var setter;
	if (bindable) {
		var is_entry_props = STATE_SYMBOL in props || LEGACY_PROPS in props;
		setter = get_descriptor(props, key$1)?.set ?? (is_entry_props && key$1 in props ? (v) => props[key$1] = v : void 0);
	}
	var initial_value;
	var is_store_sub = false;
	if (bindable) [initial_value, is_store_sub] = capture_store_binding(() => props[key$1]);
	else initial_value = props[key$1];
	if (initial_value === void 0 && fallback$1 !== void 0) {
		initial_value = get_fallback();
		if (setter) {
			if (runes) props_invalid_value(key$1);
			setter(initial_value);
		}
	}
	var getter;
	if (runes) getter = () => {
		var value = props[key$1];
		if (value === void 0) return get_fallback();
		fallback_dirty = true;
		return value;
	};
	else getter = () => {
		var value = props[key$1];
		if (value !== void 0) fallback_value = void 0;
		return value === void 0 ? fallback_value : value;
	};
	if (runes && (flags$1 & 4) === 0) return getter;
	if (setter) {
		var legacy_parent = props.$$legacy;
		return (function(value, mutation) {
			if (arguments.length > 0) {
				if (!runes || !mutation || legacy_parent || is_store_sub) setter(mutation ? getter() : value);
				return value;
			}
			return getter();
		});
	}
	var overridden = false;
	var d = ((flags$1 & 1) !== 0 ? derived$1 : derived_safe_equal)(() => {
		overridden = false;
		return getter();
	});
	if (bindable) get$1(d);
	var parent_effect = active_effect;
	return (function(value, mutation) {
		if (arguments.length > 0) {
			const new_value = mutation ? get$1(d) : runes && bindable ? proxy(value) : value;
			set(d, new_value);
			overridden = true;
			if (fallback_value !== void 0) fallback_value = new_value;
			return value;
		}
		if (is_destroying_effect && overridden || (parent_effect.f & 16384) !== 0) return d.v;
		return get$1(d);
	});
}
function asClassComponent(component$1) {
	return class extends Svelte4Component {
		constructor(options) {
			super({
				component: component$1,
				...options
			});
		}
	};
}
var Svelte4Component = class {
	#events;
	#instance;
	constructor(options) {
		var sources = /* @__PURE__ */ new Map();
		var add_source = (key$1, value) => {
			var s = /* @__PURE__ */ mutable_source(value, false, false);
			sources.set(key$1, s);
			return s;
		};
		const props = new Proxy({
			...options.props || {},
			$$events: {}
		}, {
			get(target, prop$1) {
				return get$1(sources.get(prop$1) ?? add_source(prop$1, Reflect.get(target, prop$1)));
			},
			has(target, prop$1) {
				if (prop$1 === LEGACY_PROPS) return true;
				get$1(sources.get(prop$1) ?? add_source(prop$1, Reflect.get(target, prop$1)));
				return Reflect.has(target, prop$1);
			},
			set(target, prop$1, value) {
				set(sources.get(prop$1) ?? add_source(prop$1, value), value);
				return Reflect.set(target, prop$1, value);
			}
		});
		this.#instance = (options.hydrate ? hydrate : mount)(options.component, {
			target: options.target,
			anchor: options.anchor,
			props,
			context: options.context,
			intro: options.intro ?? false,
			recover: options.recover
		});
		if (!async_mode_flag && (!options?.props?.$$host || options.sync === false)) flushSync();
		this.#events = props.$$events;
		for (const key$1 of Object.keys(this.#instance)) {
			if (key$1 === "$set" || key$1 === "$destroy" || key$1 === "$on") continue;
			define_property(this, key$1, {
				get() {
					return this.#instance[key$1];
				},
				set(value) {
					this.#instance[key$1] = value;
				},
				enumerable: true
			});
		}
		this.#instance.$set = (next$1) => {
			Object.assign(props, next$1);
		};
		this.#instance.$destroy = () => {
			unmount(this.#instance);
		};
	}
	$set(props) {
		this.#instance.$set(props);
	}
	$on(event$1, callback) {
		this.#events[event$1] = this.#events[event$1] || [];
		const cb = (...args) => callback.call(this, ...args);
		this.#events[event$1].push(cb);
		return () => {
			this.#events[event$1] = this.#events[event$1].filter((fn) => fn !== cb);
		};
	}
	$destroy() {
		this.#instance.$destroy();
	}
};
if (typeof HTMLElement === "function") HTMLElement;
function hydratable(key$1, fn) {
	if (!async_mode_flag) experimental_async_required("hydratable");
	if (hydrating) {
		const store = window.__svelte?.h;
		if (store?.has(key$1)) return store.get(key$1);
		hydratable_missing_but_expected(key$1);
	}
	return fn();
}
var index_client_exports = /* @__PURE__ */ __exportAll({
	afterUpdate: () => afterUpdate,
	beforeUpdate: () => beforeUpdate,
	createContext: () => createContext,
	createEventDispatcher: () => createEventDispatcher,
	createRawSnippet: () => createRawSnippet,
	flushSync: () => flushSync,
	fork: () => fork,
	getAbortSignal: () => getAbortSignal,
	getAllContexts: () => getAllContexts,
	getContext: () => getContext,
	hasContext: () => hasContext,
	hydratable: () => hydratable,
	hydrate: () => hydrate,
	mount: () => mount,
	onDestroy: () => onDestroy,
	onMount: () => onMount,
	setContext: () => setContext,
	settled: () => settled,
	tick: () => tick,
	unmount: () => unmount,
	untrack: () => untrack
}, 1);
function getAbortSignal() {
	if (active_reaction === null) get_abort_signal_outside_reaction();
	return (active_reaction.ac ??= new AbortController()).signal;
}
function onMount(fn) {
	if (component_context === null) lifecycle_outside_component("onMount");
	if (legacy_mode_flag && component_context.l !== null) init_update_callbacks(component_context).m.push(fn);
	else user_effect(() => {
		const cleanup = untrack(fn);
		if (typeof cleanup === "function") return cleanup;
	});
}
function onDestroy(fn) {
	if (component_context === null) lifecycle_outside_component("onDestroy");
	onMount(() => () => untrack(fn));
}
function create_custom_event(type, detail, { bubbles = false, cancelable = false } = {}) {
	return new CustomEvent(type, {
		detail,
		bubbles,
		cancelable
	});
}
function createEventDispatcher() {
	const active_component_context = component_context;
	if (active_component_context === null) lifecycle_outside_component("createEventDispatcher");
	return (type, detail, options) => {
		const events = active_component_context.s.$$events?.[type];
		if (events) {
			const callbacks = is_array(events) ? events.slice() : [events];
			const event$1 = create_custom_event(type, detail, options);
			for (const fn of callbacks) fn.call(active_component_context.x, event$1);
			return !event$1.defaultPrevented;
		}
		return true;
	};
}
function beforeUpdate(fn) {
	if (component_context === null) lifecycle_outside_component("beforeUpdate");
	if (component_context.l === null) lifecycle_legacy_only("beforeUpdate");
	init_update_callbacks(component_context).b.push(fn);
}
function afterUpdate(fn) {
	if (component_context === null) lifecycle_outside_component("afterUpdate");
	if (component_context.l === null) lifecycle_legacy_only("afterUpdate");
	init_update_callbacks(component_context).a.push(fn);
}
function init_update_callbacks(context) {
	var l = context.l;
	return l.u ??= {
		a: [],
		b: [],
		m: []
	};
}
export { props_id as $, set_class as A, fork as At, html as B, enable_async_mode_flag as Bt, bind_value as C, set as Ct, set_attribute as D, derived_safe_equal as Dt, remove_input_defaults as E, update as Et, element as F, push as Ft, if_block as G, fallback as Gt, index as H, next as Ht, transition as I, setContext as It, unmount as J, false_default as Jt, mount as K, noop as Kt, component as L, label as Lt, clsx$1 as M, getContext as Mt, action as N, hasContext as Nt, set_value as O, user_derived as Ot, head as P, pop as Pt, from_svg as Q, __toESM as Qt, snippet as R, tag as Rt, bind_files as S, increment as St, attribute_effect as T, state as Tt, css_props as U, reset as Ut, each as V, enable_legacy_mode_flag as Vt, key as W, transition_slide_display as Wt, comment as X, __commonJSMin as Xt, append as Y, true_default as Yt, from_html as Z, __exportAll as Zt, reactive_import as _, $window as _t, legacy_rest_props as a, deep_read_state as at, bind_this as b, sibling as bt, spread_props as c, tick as ct, store_mutate as d, effect_root as dt, text as et, store_set as f, effect_tracking as ft, writable as g, remove_textarea_child as gt, readonly as h, user_pre_effect as ht, asClassComponent as i, createAttachmentKey as it, clsx as j, getAllContexts as jt, set_style as k, createSubscriber as kt, setup_stores as l, untrack as lt, get as m, user_effect as mt, onDestroy as n, event as nt, prop as o, get$1 as ot, derived as p, template_effect as pt, set_text as q, to_array as qt, onMount as r, on as rt, rest_props as s, settled as st, index_client_exports as t, delegate as tt, store_get as u, update_version as ut, init as v, child as vt, STYLE as w, source as wt, bind_checked as x, proxy as xt, bind_window_size as y, first_child as yt, slot as z, snapshot as zt };
