import { Jt as false_default, Mt as getContext, Q as from_svg, Qt as __toESM, Xt as __commonJSMin, Yt as true_default, Z as from_html, ct as tick, g as writable, h as readonly, m as get, n as onDestroy, p as derived } from "./DUscB9kS.js";
import { a as goto, i as beforeNavigate, l as stores, o as invalidateAll, r as applyAction, t as afterNavigate } from "./D365qDux.js";
import { a as NAN, c as POSITIVE_INFINITY, i as HOLE, l as UNDEFINED, n as enhance, o as NEGATIVE_INFINITY, r as parse, s as NEGATIVE_ZERO, t as deserialize, u as encode64 } from "./D-Alr120.js";
import { t as browser } from "./DgeI1AN1.js";
import { a as getDefault, h as safeParseAsync } from "./Da0rmiev.js";
var DevalueError = class extends Error {
	constructor(message, keys, value, root$1) {
		super(message);
		this.name = "DevalueError";
		this.path = keys.join("");
		this.value = value;
		this.root = root$1;
	}
};
function is_primitive(thing) {
	return Object(thing) !== thing;
}
var object_proto_names = /* @__PURE__ */ Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function is_plain_object(thing) {
	const proto = Object.getPrototypeOf(thing);
	return proto === Object.prototype || proto === null || Object.getPrototypeOf(proto) === null || Object.getOwnPropertyNames(proto).sort().join("\0") === object_proto_names;
}
function get_type(thing) {
	return Object.prototype.toString.call(thing).slice(8, -1);
}
function get_escaped_char(char) {
	switch (char) {
		case "\"": return "\\\"";
		case "<": return "\\u003C";
		case "\\": return "\\\\";
		case "\n": return "\\n";
		case "\r": return "\\r";
		case "	": return "\\t";
		case "\b": return "\\b";
		case "\f": return "\\f";
		case "\u2028": return "\\u2028";
		case "\u2029": return "\\u2029";
		default: return char < " " ? `\\u${char.charCodeAt(0).toString(16).padStart(4, "0")}` : "";
	}
}
function stringify_string(str) {
	let result = "";
	let last_pos = 0;
	const len = str.length;
	for (let i = 0; i < len; i += 1) {
		const char = str[i];
		const replacement = get_escaped_char(char);
		if (replacement) {
			result += str.slice(last_pos, i) + replacement;
			last_pos = i + 1;
		}
	}
	return `"${last_pos === 0 ? str : result + str.slice(last_pos)}"`;
}
function enumerable_symbols(object) {
	return Object.getOwnPropertySymbols(object).filter((symbol) => Object.getOwnPropertyDescriptor(object, symbol).enumerable);
}
var is_identifier = /^[a-zA-Z_$][a-zA-Z_$0-9]*$/;
function stringify_key(key) {
	return is_identifier.test(key) ? "." + key : "[" + JSON.stringify(key) + "]";
}
function stringify(value, reducers) {
	const stringified = [];
	const indexes = /* @__PURE__ */ new Map();
	const custom = [];
	if (reducers) for (const key of Object.getOwnPropertyNames(reducers)) custom.push({
		key,
		fn: reducers[key]
	});
	const keys = [];
	let p = 0;
	function flatten(thing) {
		if (thing === void 0) return -1;
		if (Number.isNaN(thing)) return -3;
		if (thing === Infinity) return -4;
		if (thing === -Infinity) return -5;
		if (thing === 0 && 1 / thing < 0) return -6;
		if (indexes.has(thing)) return indexes.get(thing);
		const index$1 = p++;
		indexes.set(thing, index$1);
		for (const { key, fn } of custom) {
			const value$1 = fn(thing);
			if (value$1) {
				stringified[index$1] = `["${key}",${flatten(value$1)}]`;
				return index$1;
			}
		}
		if (typeof thing === "function") throw new DevalueError(`Cannot stringify a function`, keys, thing, value);
		let str = "";
		if (is_primitive(thing)) str = stringify_primitive(thing);
		else {
			const type = get_type(thing);
			switch (type) {
				case "Number":
				case "String":
				case "Boolean":
					str = `["Object",${stringify_primitive(thing)}]`;
					break;
				case "BigInt":
					str = `["BigInt",${thing}]`;
					break;
				case "Date":
					str = `["Date","${!isNaN(thing.getDate()) ? thing.toISOString() : ""}"]`;
					break;
				case "URL":
					str = `["URL",${stringify_string(thing.toString())}]`;
					break;
				case "URLSearchParams":
					str = `["URLSearchParams",${stringify_string(thing.toString())}]`;
					break;
				case "RegExp":
					const { source, flags } = thing;
					str = flags ? `["RegExp",${stringify_string(source)},"${flags}"]` : `["RegExp",${stringify_string(source)}]`;
					break;
				case "Array":
					str = "[";
					for (let i = 0; i < thing.length; i += 1) {
						if (i > 0) str += ",";
						if (i in thing) {
							keys.push(`[${i}]`);
							str += flatten(thing[i]);
							keys.pop();
						} else str += -2;
					}
					str += "]";
					break;
				case "Set":
					str = "[\"Set\"";
					for (const value$1 of thing) str += `,${flatten(value$1)}`;
					str += "]";
					break;
				case "Map":
					str = "[\"Map\"";
					for (const [key, value$1] of thing) {
						keys.push(`.get(${is_primitive(key) ? stringify_primitive(key) : "..."})`);
						str += `,${flatten(key)},${flatten(value$1)}`;
						keys.pop();
					}
					str += "]";
					break;
				case "Int8Array":
				case "Uint8Array":
				case "Uint8ClampedArray":
				case "Int16Array":
				case "Uint16Array":
				case "Int32Array":
				case "Uint32Array":
				case "Float32Array":
				case "Float64Array":
				case "BigInt64Array":
				case "BigUint64Array": {
					const typedArray = thing;
					str = "[\"" + type + "\"," + flatten(typedArray.buffer);
					const a = thing.byteOffset;
					const b = a + thing.byteLength;
					if (a > 0 || b !== typedArray.buffer.byteLength) {
						const m = +/(\d+)/.exec(type)[1] / 8;
						str += `,${a / m},${b / m}`;
					}
					str += "]";
					break;
				}
				case "ArrayBuffer":
					str = `["ArrayBuffer","${encode64(thing)}"]`;
					break;
				case "Temporal.Duration":
				case "Temporal.Instant":
				case "Temporal.PlainDate":
				case "Temporal.PlainTime":
				case "Temporal.PlainDateTime":
				case "Temporal.PlainMonthDay":
				case "Temporal.PlainYearMonth":
				case "Temporal.ZonedDateTime":
					str = `["${type}",${stringify_string(thing.toString())}]`;
					break;
				default:
					if (!is_plain_object(thing)) throw new DevalueError(`Cannot stringify arbitrary non-POJOs`, keys, thing, value);
					if (enumerable_symbols(thing).length > 0) throw new DevalueError(`Cannot stringify POJOs with symbolic keys`, keys, thing, value);
					if (Object.getPrototypeOf(thing) === null) {
						str = "[\"null\"";
						for (const key in thing) {
							keys.push(stringify_key(key));
							str += `,${stringify_string(key)},${flatten(thing[key])}`;
							keys.pop();
						}
						str += "]";
					} else {
						str = "{";
						let started = false;
						for (const key in thing) {
							if (started) str += ",";
							started = true;
							keys.push(stringify_key(key));
							str += `${stringify_string(key)}:${flatten(thing[key])}`;
							keys.pop();
						}
						str += "}";
					}
			}
		}
		stringified[index$1] = str;
		return index$1;
	}
	const index = flatten(value);
	if (index < 0) return `${index}`;
	return `[${stringified.join(",")}]`;
}
function stringify_primitive(thing) {
	const type = typeof thing;
	if (type === "string") return stringify_string(thing);
	if (thing instanceof String) return stringify_string(thing.toString());
	if (thing === void 0) return (-1).toString();
	if (thing === 0 && 1 / thing < 0) return (-6).toString();
	if (type === "bigint") return `["BigInt","${thing}"]`;
	return String(thing);
}
const getStores = () => {
	const stores$1 = stores;
	return {
		page: { subscribe: stores$1.page.subscribe },
		navigating: { subscribe: stores$1.navigating.subscribe },
		updated: stores$1.updated
	};
};
const page = { subscribe(fn) {
	return getStores().page.subscribe(fn);
} };
const navigating = { subscribe(fn) {
	return getStores().navigating.subscribe(fn);
} };
from_html(`<style>.super-debug--absolute {
			position: absolute;
		}

		.super-debug--top-0 {
			top: 0;
		}

		.super-debug--inset-x-0 {
			left: 0px;
			right: 0px;
		}

		.super-debug--hidden {
			height: 0;
			overflow: hidden;
		}

		.super-debug--hidden:not(.super-debug--with-label) {
			height: 1.5em;
		}

		.super-debug--rotated {
			transform: rotate(180deg);
		}

		.super-debug {
			--_sd-bg-color: var(--sd-bg-color, var(--sd-vscode-bg-color, rgb(30, 41, 59)));
			position: relative;
			background-color: var(--_sd-bg-color);
			border-radius: 0.5rem;
			overflow: hidden;
		}

		.super-debug--pre {
			overflow-x: auto;
		}

		.super-debug--collapse {
			display: block;
			width: 100%;
			color: rgba(255, 255, 255, 0.25);
			background-color: rgba(255, 255, 255, 0.15);
			padding: 5px 0;
			display: flex;
			justify-content: center;
			border-color: transparent;
			margin: 0;
			padding: 3px 0;
		}

		.super-debug--collapse:focus {
			color: #fafafa;
			background-color: rgba(255, 255, 255, 0.25);
		}

		.super-debug--collapse:is(:hover) {
			color: rgba(255, 255, 255, 0.35);
			background-color: rgba(255, 255, 255, 0.25);
		}

		.super-debug--status {
			display: flex;
			padding: 1em;
			padding-bottom: 0;
			justify-content: space-between;
			font-family:
				Inconsolata, Monaco, Consolas, 'Lucida Console', 'Courier New', Courier, monospace;
		}

		.super-debug--right-status {
			display: flex;
			gap: 0.55em;
		}

		.super-debug--copy {
			margin: 0;
			padding: 0;
			padding-top: 2px;
			background-color: transparent;
			border: 0;
			color: #666;
			cursor: pointer;
		}

		.super-debug--copy:hover {
			background-color: transparent;
			color: #666;
		}

		.super-debug--copy:focus {
			background-color: transparent;
			color: #666;
		}

		.super-debug--label {
			color: var(--sd-label-color, var(--sd-vscode-label-color, white));
		}

		.super-debug--promise-loading {
			color: var(--sd-promise-loading-color, var(--sd-vscode-promise-loading-color, #999));
		}

		.super-debug--promise-rejected {
			color: var(--sd-promise-rejected-color, var(--sd-vscode-promise-rejected-color, #ff475d));
		}

		.super-debug pre {
			color: var(--sd-code-default, var(--sd-vscode-code-default, #999));
			background-color: var(--_sd-bg-color);
			font-size: 1em;
			margin-bottom: 0;
			padding: 1em 0 1em 1em;
		}

		.super-debug--info {
			color: var(--sd-info, var(--sd-vscode-info, rgb(85, 85, 255)));
		}

		.super-debug--success {
			color: var(--sd-success, var(--sd-vscode-success, #2cd212));
		}

		.super-debug--redirect {
			color: var(--sd-redirect, var(--sd-vscode-redirect, #03cae5));
		}

		.super-debug--error {
			color: var(--sd-error, var(--sd-vscode-error, #ff475d));
		}

		.super-debug--code .key {
			color: var(--sd-code-key, var(--sd-vscode-code-key, #eab308));
		}

		.super-debug--code .string {
			color: var(--sd-code-string, var(--sd-vscode-code-string, #6ec687));
		}

		.super-debug--code .date {
			color: var(--sd-code-date, var(--sd-vscode-code-date, #f06962));
		}

		.super-debug--code .boolean {
			color: var(--sd-code-boolean, var(--sd-vscode-code-boolean, #79b8ff));
		}

		.super-debug--code .number {
			color: var(--sd-code-number, var(--sd-vscode-code-number, #af77e9));
		}

		.super-debug--code .bigint {
			color: var(--sd-code-bigint, var(--sd-vscode-code-bigint, #af77e9));
		}

		.super-debug--code .null {
			color: var(--sd-code-null, var(--sd-vscode-code-null, #238afe));
		}

		.super-debug--code .nan {
			color: var(--sd-code-nan, var(--sd-vscode-code-nan, #af77e9));
		}

		.super-debug--code .undefined {
			color: var(--sd-code-undefined, var(--sd-vscode-code-undefined, #238afe));
		}

		.super-debug--code .function {
			color: var(--sd-code-function, var(--sd-vscode-code-function, #f06962));
		}

		.super-debug--code .symbol {
			color: var(--sd-code-symbol, var(--sd-vscode-code-symbol, #4de0c5));
		}

		.super-debug--code .error {
			color: var(--sd-code-error, var(--sd-vscode-code-error, #ff475d));
		}

		.super-debug pre::-webkit-scrollbar {
			width: var(--sd-sb-width, var(--sd-vscode-sb-width, 1rem));
			height: var(--sd-sb-height, var(--sd-vscode-sb-height, 1rem));
		}

		.super-debug pre::-webkit-scrollbar-track {
			border-radius: 12px;
			background-color: var(
				--sd-sb-track-color,
				var(--sd-vscode-sb-track-color, hsl(0, 0%, 40%, 0.2))
			);
		}
		.super-debug:is(:focus-within, :hover) pre::-webkit-scrollbar-track {
			border-radius: 12px;
			background-color: var(
				--sd-sb-track-color-focus,
				var(--sd-vscode-sb-track-color-focus, hsl(0, 0%, 50%, 0.2))
			);
		}

		.super-debug pre::-webkit-scrollbar-thumb {
			border-radius: 12px;
			background-color: var(
				--sd-sb-thumb-color,
				var(--sd-vscode-sb-thumb-color, hsl(217, 50%, 50%, 0.5))
			);
		}
		.super-debug:is(:focus-within, :hover) pre::-webkit-scrollbar-thumb {
			border-radius: 12px;
			background-color: var(
				--sd-sb-thumb-color-focus,
				var(--sd-vscode-sb-thumb-color-focus, hsl(217, 50%, 50%))
			);
		}</style>`);
from_svg(`<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M7 9.667A2.667 2.667 0 0 1 9.667 7h8.666A2.667 2.667 0 0 1 21 9.667v8.666A2.667 2.667 0 0 1 18.333 21H9.667A2.667 2.667 0 0 1 7 18.333z"></path><path d="M4.012 16.737A2.005 2.005 0 0 1 3 15V5c0-1.1.9-2 2-2h10c.75 0 1.158.385 1.5 1"></path></g></svg>`);
from_svg(`<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M15 12v6m-3-3h6"></path><rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path></g></svg>`);
from_html(`<div> </div>`);
from_html(`<span class="super-debug--promise-rejected">Rejected:</span> <!>`, 1);
from_html(`<div class="super-debug--promise-loading">Loading data...</div>`);
from_html(`<button type="button" class="super-debug--collapse" aria-label="Collapse"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M4.08 11.92L12 4l7.92 7.92l-1.42 1.41l-5.5-5.5V22h-2V7.83l-5.5 5.5l-1.42-1.41M12 4h10V2H2v2h10Z"></path></svg></button>`);
from_html(`<div dir="ltr"><div><div class="super-debug--label"> </div> <div class="super-debug--right-status"><button type="button" class="super-debug--copy"><!></button> <!></div></div> <pre><code class="super-debug--code"><!></code></pre> <!></div>`);
from_html(`<!> <!>`, 1);
function setPath(parent, key, value) {
	if (key === "__proto__" || key === "prototype") throw new Error("Cannot set an object's `__proto__` or `prototype` property");
	parent[key] = value;
	return "skip";
}
function isInvalidPath(originalPath, pathData) {
	return pathData.value !== void 0 && typeof pathData.value !== "object" && pathData.path.length < originalPath.length;
}
function pathExists(obj, path, options = {}) {
	if (!options.modifier) options.modifier = (pathData) => isInvalidPath(path, pathData) ? void 0 : pathData.value;
	const exists = traversePath(obj, path, options.modifier);
	if (!exists) return void 0;
	if (options.value === void 0) return exists;
	return options.value(exists.value) ? exists : void 0;
}
function traversePath(obj, realPath, modifier) {
	if (!realPath.length) return void 0;
	if (realPath.includes("__proto__") || realPath.includes("prototype")) throw new Error("Cannot set an object's `__proto__` or `prototype` property");
	const path = [realPath[0]];
	let parent = obj;
	while (parent && path.length < realPath.length) {
		const key$1 = path[path.length - 1];
		const value = modifier ? modifier({
			parent,
			key: String(key$1),
			value: parent[key$1],
			path: path.map((p) => String(p)),
			isLeaf: false,
			set: (v) => setPath(parent, key$1, v)
		}) : parent[key$1];
		if (value === void 0) return void 0;
		else parent = value;
		path.push(realPath[path.length]);
	}
	if (!parent) return void 0;
	const key = realPath[realPath.length - 1];
	return {
		parent,
		key: String(key),
		value: parent[key],
		path: realPath.map((p) => String(p)),
		isLeaf: true,
		set: (v) => setPath(parent, key, v)
	};
}
function traversePaths(parent, modifier, path = []) {
	for (const key in parent) {
		const value = parent[key];
		const isLeaf = value === null || typeof value !== "object";
		const pathData = {
			parent,
			key,
			value,
			path: path.concat([key]),
			isLeaf,
			set: (v) => setPath(parent, key, v)
		};
		const status = modifier(pathData);
		if (status === "abort") return status;
		else if (status === "skip") continue;
		else if (!isLeaf) {
			const status$1 = traversePaths(value, modifier, pathData.path);
			if (status$1 === "abort") return status$1;
		}
	}
}
function eqSet(xs, ys) {
	return xs === ys || xs.size === ys.size && [...xs].every((x) => ys.has(x));
}
function comparePaths(newObj, oldObj) {
	const diffPaths = /* @__PURE__ */ new Map();
	function builtInDiff(one, other) {
		if (one instanceof Date && other instanceof Date && one.getTime() !== other.getTime()) return true;
		if (one instanceof Set && other instanceof Set && !eqSet(one, other)) return true;
		if (one instanceof File && other instanceof File && one !== other) return true;
		return false;
	}
	function isBuiltin(data) {
		return data instanceof Date || data instanceof Set || data instanceof File;
	}
	function checkPath(data, compareTo) {
		const otherData = compareTo ? traversePath(compareTo, data.path) : void 0;
		function addDiff() {
			diffPaths.set(data.path.join(" "), data.path);
			return "skip";
		}
		if (isBuiltin(data.value)) {
			if (!isBuiltin(otherData?.value) || builtInDiff(data.value, otherData.value)) return addDiff();
		}
		if (data.isLeaf) {
			if (!otherData || data.value !== otherData.value) addDiff();
		}
	}
	traversePaths(newObj, (data) => checkPath(data, oldObj));
	traversePaths(oldObj, (data) => checkPath(data, newObj));
	const output = Array.from(diffPaths.values());
	output.sort((a, b) => a.length - b.length);
	return output;
}
function setPaths(obj, paths, value) {
	const isFunction = typeof value === "function";
	for (const path of paths) {
		const leaf = traversePath(obj, path, ({ parent, key, value: value$1 }) => {
			if (value$1 === void 0 || typeof value$1 !== "object") parent[key] = {};
			return parent[key];
		});
		if (leaf) {
			if (leaf.key === "__proto__" || leaf.key === "prototype") throw new Error("Cannot set an object's `__proto__` or `prototype` property");
			leaf.parent[leaf.key] = isFunction ? value(path, leaf) : value;
		}
	}
}
function splitPath(path) {
	return path.toString().split(/[[\].]+/).filter((p) => p);
}
function mergePath(path) {
	return path.reduce((acc, next) => {
		const key = String(next);
		if (typeof next === "number" || /^\d+$/.test(key)) acc += `[${key}]`;
		else if (!acc) acc += key;
		else acc += `.${key}`;
		return acc;
	}, "");
}
function clone$1(obj) {
	const type = {}.toString.call(obj).slice(8, -1);
	if (type == "Set") return new Set([...obj].map((value) => clone$1(value)));
	if (type == "Map") return new Map([...obj].map((kv) => [clone$1(kv[0]), clone$1(kv[1])]));
	if (type == "Date") return new Date(obj.getTime());
	if (type == "RegExp") return RegExp(obj.source, obj.flags);
	if (type == "Array" || type == "Object") {
		const result = type == "Object" ? Object.create(Object.getPrototypeOf(obj)) : [];
		for (const key in obj) result[key] = clone$1(obj[key]);
		return result;
	}
	return obj;
}
function clone(data) {
	return data && typeof data === "object" ? clone$1(data) : data;
}
function assertSchema(schema, path) {
	if (typeof schema === "boolean") throw new SchemaError("Schema property cannot be defined as boolean.", path);
}
// istanbul ignore next
var isObject = (obj) => {
	if (typeof obj === "object" && obj !== null) {
		if (typeof Object.getPrototypeOf === "function") {
			const prototype = Object.getPrototypeOf(obj);
			return prototype === Object.prototype || prototype === null;
		}
		return Object.prototype.toString.call(obj) === "[object Object]";
	}
	return false;
};
const merge$1 = (...objects) => objects.reduce((result, current) => {
	if (current === void 0) return result;
	if (Array.isArray(current)) throw new TypeError("Arguments provided to ts-deepmerge must be objects, not arrays.");
	Object.keys(current).forEach((key) => {
		if ([
			"__proto__",
			"constructor",
			"prototype"
		].includes(key)) return;
		if (Array.isArray(result[key]) && Array.isArray(current[key])) result[key] = merge$1.options.mergeArrays ? merge$1.options.uniqueArrayItems ? Array.from(new Set(result[key].concat(current[key]))) : [...result[key], ...current[key]] : current[key];
		else if (isObject(result[key]) && isObject(current[key])) result[key] = merge$1(result[key], current[key]);
		else if (!isObject(result[key]) && isObject(current[key])) result[key] = merge$1(current[key], void 0);
		else result[key] = current[key] === void 0 ? merge$1.options.allowUndefinedOverrides ? current[key] : result[key] : current[key];
	});
	return result;
}, {});
var defaultOptions$1 = {
	allowUndefinedOverrides: true,
	mergeArrays: true,
	uniqueArrayItems: true
};
merge$1.options = defaultOptions$1;
merge$1.withOptions = (options, ...objects) => {
	merge$1.options = Object.assign(Object.assign({}, defaultOptions$1), options);
	const result = merge$1(...objects);
	merge$1.options = defaultOptions$1;
	return result;
};
var conversionFormatTypes = [
	"unix-time",
	"bigint",
	"any",
	"symbol",
	"set",
	"map",
	"int64",
	"stringbool"
];
function schemaInfo(schema, isOptional, path) {
	assertSchema(schema, path);
	const types = schemaTypes(schema, path);
	const array = schema.items && types.includes("array") ? (Array.isArray(schema.items) ? schema.items : [schema.items]).filter((s) => typeof s !== "boolean") : void 0;
	const additionalProperties = schema.additionalProperties && typeof schema.additionalProperties === "object" && types.includes("object") ? Object.fromEntries(Object.entries(schema.additionalProperties).filter(([, value]) => typeof value !== "boolean")) : void 0;
	const properties = schema.properties && types.includes("object") ? Object.fromEntries(Object.entries(schema.properties).filter(([, value]) => typeof value !== "boolean")) : void 0;
	const union = unionInfo(schema)?.filter((u) => u.type !== "null" && u.const !== null);
	const result = {
		types: types.filter((s) => s !== "null"),
		isOptional,
		isNullable: types.includes("null"),
		schema,
		union: union?.length ? union : void 0,
		array,
		properties,
		additionalProperties,
		required: schema.required
	};
	if (!schema.allOf || !schema.allOf.length) return result;
	return {
		...merge$1.withOptions({ allowUndefinedOverrides: false }, result, ...schema.allOf.map((s) => schemaInfo(s, false, []))),
		schema
	};
}
function schemaTypes(schema, path) {
	assertSchema(schema, path);
	let types = schema.const === null ? ["null"] : [];
	if (schema.type) types = Array.isArray(schema.type) ? schema.type : [schema.type];
	if (schema.anyOf) types = schema.anyOf.flatMap((s) => schemaTypes(s, path));
	if (schema.oneOf) types = schema.oneOf.flatMap((s) => schemaTypes(s, path));
	if (types.includes("array") && schema.uniqueItems) {
		const i = types.findIndex((t) => t === "array");
		if (i !== -1) types[i] = "set";
	} else if (schema.format && conversionFormatTypes.includes(schema.format)) {
		types.unshift(schema.format);
		if (schema.format == "unix-time" || schema.format == "int64") {
			const i = types.findIndex((t) => t == "integer");
			types.splice(i, 1);
		}
		if (schema.format == "bigint") {
			const i = types.findIndex((t) => t == "string");
			types.splice(i, 1);
		}
		if (schema.format == "stringbool") {
			const i = types.findIndex((t) => t == "string");
			if (i !== -1) types.splice(i, 1);
		}
	}
	if (schema.const && schema.const !== null && typeof schema.const !== "function") types.push(typeof schema.const);
	return Array.from(new Set(types));
}
function unionInfo(schema) {
	if (!schema.oneOf && !schema.anyOf) return void 0;
	if (schema.oneOf && schema.oneOf.length) return schema.oneOf.filter((s) => typeof s !== "boolean");
	if (schema.anyOf && schema.anyOf.length) return schema.anyOf.filter((s) => typeof s !== "boolean");
}
function defaultValues(schema, isOptional = false, path = []) {
	return _defaultValues(schema, isOptional, path);
}
function _defaultValues(schema, isOptional, path) {
	if (!schema) throw new SchemaError("Schema was undefined", path);
	const info = schemaInfo(schema, isOptional, path);
	if (!info) return void 0;
	let objectDefaults = void 0;
	if ("default" in schema) if (info.types.includes("object") && schema.default && typeof schema.default == "object" && !Array.isArray(schema.default)) objectDefaults = schema.default;
	else {
		if (info.types.length > 1) {
			if (info.types.includes("unix-time") && (info.types.includes("integer") || info.types.includes("number"))) throw new SchemaError("Cannot resolve a default value with a union that includes a date and a number/integer.", path);
		}
		const [type] = info.types;
		return formatDefaultValue(type, schema.default);
	}
	let _multiType;
	const isMultiTypeUnion = () => {
		if (!info.union || info.union.length < 2) return false;
		if (info.union.some((i) => i.enum)) return true;
		if (!_multiType) _multiType = new Set(info.types.map((i) => {
			return ["integer", "unix-time"].includes(i) ? "number" : i;
		}));
		return _multiType.size > 1;
	};
	let output = void 0;
	if (!objectDefaults && info.union) {
		const singleDefault = info.union.filter((s) => typeof s !== "boolean" && s.default !== void 0);
		if (singleDefault.length == 1) return _defaultValues(singleDefault[0], isOptional, path);
		else if (singleDefault.length > 1) throw new SchemaError("Only one default value can exist in a union, or set a default value for the whole union.", path);
		else {
			if (info.isNullable) return null;
			if (info.isOptional) return void 0;
			if (isMultiTypeUnion()) throw new SchemaError("Multi-type unions must have a default value, or exactly one of the union types must have.", path);
			if (info.union.length) if (info.types[0] == "object") {
				if (output === void 0) output = {};
				output = info.union.length > 1 ? merge$1.withOptions({ allowUndefinedOverrides: true }, ...info.union.map((s) => _defaultValues(s, isOptional, path))) : _defaultValues(info.union[0], isOptional, path);
			} else return _defaultValues(info.union[0], isOptional, path);
		}
	}
	if (!objectDefaults) {
		if (info.isNullable) return null;
		if (info.isOptional) return void 0;
	}
	if (info.properties) for (const [key, objSchema] of Object.entries(info.properties)) {
		assertSchema(objSchema, [...path, key]);
		let def;
		if (objectDefaults && objectDefaults[key] !== void 0) try {
			const propInfo = schemaInfo(objSchema, !info.required?.includes(key), [...path, key]);
			if (propInfo) {
				const propType = propInfo.types[0];
				if (propType === "object" && typeof objectDefaults[key] === "object" && objectDefaults[key] !== null && !Array.isArray(objectDefaults[key])) def = _defaultValues({
					...objSchema,
					default: objectDefaults[key]
				}, !info.required?.includes(key), [...path, key]);
				else def = formatDefaultValue(propType, objectDefaults[key]);
			} else def = objectDefaults[key];
		} catch {
			def = objectDefaults[key];
		}
		else def = _defaultValues(objSchema, !info.required?.includes(key), [...path, key]);
		if (output === void 0) output = {};
		output[key] = def;
	}
	else if (objectDefaults) return objectDefaults;
	if (schema.enum) return schema.enum[0];
	if ("const" in schema) return schema.const;
	if (isMultiTypeUnion()) throw new SchemaError("Default values cannot have more than one type.", path);
	else if (info.types.length == 0) return;
	const [formatType] = info.types;
	return output ?? defaultValue(formatType, schema.enum);
}
function formatDefaultValue(type, value) {
	switch (type) {
		case "set": return Array.isArray(value) ? new Set(value) : value;
		case "map": return Array.isArray(value) ? new Map(value) : value;
		case "Date":
		case "date":
		case "unix-time":
			if (typeof value === "string" || typeof value === "number") return new Date(value);
			break;
		case "bigint":
			if (typeof value === "string" || typeof value === "number") return BigInt(value);
			break;
		case "symbol":
			if (typeof value === "string" || typeof value === "number") return Symbol(value);
			break;
	}
	return value;
}
function defaultValue(type, enumType) {
	switch (type) {
		case "string": return enumType && enumType.length > 0 ? enumType[0] : "";
		case "number":
		case "integer": return enumType && enumType.length > 0 ? enumType[0] : 0;
		case "boolean": return false;
		case "array": return [];
		case "object": return {};
		case "null": return null;
		case "Date":
		case "date":
		case "unix-time": return;
		case "int64":
		case "bigint": return BigInt(0);
		case "stringbool": return "";
		case "set": return /* @__PURE__ */ new Set();
		case "map": return /* @__PURE__ */ new Map();
		case "symbol": return Symbol();
		case "undefined":
		case "any": return;
		default: throw new SchemaError("Schema type or format not supported, requires explicit default value: " + type);
	}
}
function defaultTypes(schema, path = []) {
	return _defaultTypes(schema, false, path);
}
function _defaultTypes(schema, isOptional, path) {
	if (!schema) throw new SchemaError("Schema was undefined", path);
	const info = schemaInfo(schema, isOptional, path);
	let output = { __types: info.types };
	if (info.union) output = merge$1(output, ...info.union.map((u) => _defaultTypes(u, info.isOptional, path)));
	if (info.schema.items && typeof info.schema.items == "object" && !Array.isArray(info.schema.items)) output.__items = _defaultTypes(info.schema.items, info.isOptional, path);
	if (info.properties) for (const [key, value] of Object.entries(info.properties)) {
		assertSchema(value, [...path, key]);
		output[key] = _defaultTypes(info.properties[key], !info.required?.includes(key), [...path, key]);
	}
	if (info.additionalProperties && info.types.includes("object")) {
		const additionalInfo = schemaInfo(info.additionalProperties, info.isOptional, path);
		if (additionalInfo.properties && additionalInfo.types.includes("object")) for (const [key] of Object.entries(additionalInfo.properties)) output[key] = _defaultTypes(additionalInfo.properties[key], !additionalInfo.required?.includes(key), [...path, key]);
	}
	if (info.isNullable && !output.__types.includes("null")) output.__types.push("null");
	if (info.isOptional && !output.__types.includes("undefined")) output.__types.push("undefined");
	return output;
}
var SuperFormError = class SuperFormError extends Error {
	constructor(message) {
		super(message);
		Object.setPrototypeOf(this, SuperFormError.prototype);
	}
};
var SchemaError = class SchemaError extends SuperFormError {
	path;
	constructor(message, path) {
		super((path && path.length ? `[${Array.isArray(path) ? path.join(".") : path}] ` : "") + message);
		this.path = Array.isArray(path) ? path.join(".") : path;
		Object.setPrototypeOf(this, SchemaError.prototype);
	}
};
function mapErrors(errors, shape) {
	const output = {};
	function addFormLevelError(error) {
		if (!("_errors" in output)) output._errors = [];
		if (!Array.isArray(output._errors)) if (typeof output._errors === "string") output._errors = [output._errors];
		else throw new SuperFormError("Form-level error was not an array.");
		output._errors.push(error.message);
	}
	for (const error of errors) {
		if (!error.path || error.path.length == 1 && !error.path[0]) {
			addFormLevelError(error);
			continue;
		}
		const objectError = !/^\d$/.test(String(error.path[error.path.length - 1])) && pathExists(shape, error.path.filter((p) => /\D/.test(String(p))))?.value;
		const leaf = traversePath(output, error.path, ({ value, parent: parent$1, key: key$1 }) => {
			if (value === void 0) parent$1[key$1] = {};
			return parent$1[key$1];
		});
		if (!leaf) {
			addFormLevelError(error);
			continue;
		}
		const { parent, key } = leaf;
		if (objectError) {
			if (!(key in parent)) parent[key] = {};
			if (!("_errors" in parent[key])) parent[key]._errors = [error.message];
			else parent[key]._errors.push(error.message);
		} else if (!(key in parent)) parent[key] = [error.message];
		else parent[key].push(error.message);
	}
	return output;
}
function updateErrors(New, Previous, force) {
	if (force) return New;
	traversePaths(Previous, (errors) => {
		if (!Array.isArray(errors.value)) return;
		errors.set(void 0);
	});
	traversePaths(New, (error) => {
		if (!Array.isArray(error.value) && error.value !== void 0) return;
		setPaths(Previous, [error.path], error.value);
	});
	return Previous;
}
function flattenErrors(errors) {
	return _flattenErrors(errors, []);
}
function _flattenErrors(errors, path) {
	return Object.entries(errors).filter(([, value]) => value !== void 0).flatMap(([key, messages]) => {
		if (Array.isArray(messages) && messages.length > 0) return {
			path: mergePath(path.concat([key])),
			messages
		};
		else return _flattenErrors(errors[key], path.concat([key]));
	});
}
function mergeDefaults(parsedData, defaults$1) {
	if (!parsedData) return clone(defaults$1);
	return merge$1.withOptions({ mergeArrays: false }, defaults$1, parsedData);
}
function replaceInvalidDefaults(Data, Defaults, _schema, Errors, preprocessed) {
	const defaultType = _schema.additionalProperties && typeof _schema.additionalProperties == "object" ? { __types: schemaInfo(_schema.additionalProperties, false, []).types } : void 0;
	const Types = defaultTypes(_schema);
	function Types_correctValue(dataValue, defValue, type) {
		const types = type.__types;
		if (!types.length || types.every((t) => t == "undefined" || t == "null" || t == "any")) return dataValue;
		else if (types.length == 1 && types[0] == "array" && !type.__items) return dataValue;
		const dateTypes = [
			"unix-time",
			"Date",
			"date"
		];
		for (const schemaType of types) {
			const defaultTypeValue = defaultValue(schemaType, void 0);
			const sameType = typeof dataValue === typeof defaultTypeValue || dateTypes.includes(schemaType) && dataValue instanceof Date;
			if (sameType && sameType && dataValue === null === (defaultTypeValue === null)) return dataValue;
			else if (type.__items) return Types_correctValue(dataValue, defValue, type.__items);
		}
		if (defValue === void 0 && types.includes("null")) return null;
		return defValue;
	}
	function Data_traverse() {
		traversePaths(Defaults, Defaults_traverseAndReplace);
		Errors_traverseAndReplace();
		return Data;
	}
	function Data_setValue(currentPath, newValue) {
		setPaths(Data, [currentPath], newValue);
	}
	function Errors_traverseAndReplace() {
		for (const error of Errors) {
			if (!error.path) continue;
			Defaults_traverseAndReplace({
				path: error.path,
				value: pathExists(Defaults, error.path)?.value
			}, true);
		}
	}
	function Defaults_traverseAndReplace(defaultPath, traversingErrors = false) {
		const currentPath = defaultPath.path;
		if (!currentPath || !currentPath[0]) return;
		if (typeof currentPath[0] === "string" && preprocessed?.includes(currentPath[0])) return;
		const dataPath = pathExists(Data, currentPath);
		if (!dataPath && defaultPath.value !== void 0 || dataPath && dataPath.value === void 0) Data_setValue(currentPath, defaultPath.value);
		else if (dataPath) {
			const defValue = defaultPath.value;
			const dataValue = dataPath.value;
			if (defValue !== void 0 && typeof dataValue === typeof defValue && dataValue === null === (defValue === null)) return;
			const pathTypes = traversePath(Types, currentPath.filter((p) => /\D/.test(String(p))), (path) => {
				return path.value && "__items" in path.value ? path.value.__items : path.value;
			});
			if (!pathTypes) {
				if (traversingErrors) return;
				throw new SchemaError("No types found for defaults", currentPath);
			}
			const fieldType = pathTypes.value ?? defaultType;
			if (fieldType) {
				const corrected = Types_correctValue(dataValue, defValue, fieldType);
				if (corrected === dataValue) return "skip";
				Data_setValue(currentPath, corrected);
			}
		}
	}
	return Data_traverse();
}
function cancelFlash(options) {
	if (!options.flashMessage || !browser) return;
	if (!shouldSyncFlash(options)) return;
	document.cookie = `flash=; Max-Age=0; Path=${options.flashMessage.cookiePath ?? "/"};`;
}
function shouldSyncFlash(options) {
	if (!options.flashMessage || !browser) return false;
	return options.syncFlashMessage;
}
var noCustomValidityDataAttribute = "noCustomValidity";
async function updateCustomValidity(validityEl, errors) {
	if ("setCustomValidity" in validityEl) validityEl.setCustomValidity("");
	if (noCustomValidityDataAttribute in validityEl.dataset) return;
	setCustomValidity(validityEl, errors);
}
function setCustomValidityForm(formElement, errors) {
	for (const el of formElement.querySelectorAll("input,select,textarea,button")) {
		if ("dataset" in el && noCustomValidityDataAttribute in el.dataset || !el.name) continue;
		const path = traversePath(errors, splitPath(el.name));
		const error = path && typeof path.value === "object" && "_errors" in path.value ? path.value._errors : path?.value;
		setCustomValidity(el, error);
		if (error) return;
	}
}
function setCustomValidity(el, errors) {
	if (!("setCustomValidity" in el)) return;
	const message = errors && errors.length ? errors.join("\n") : "";
	el.setCustomValidity(message);
	if (message) el.reportValidity();
}
const isElementInViewport = (el, topOffset = 0) => {
	const rect = el.getBoundingClientRect();
	return rect.top >= topOffset && rect.left >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && rect.right <= (window.innerWidth || document.documentElement.clientWidth);
};
const scrollToAndCenter = (el, offset = 1.125, behavior = "smooth") => {
	const top = el.getBoundingClientRect().top + window.pageYOffset - window.innerHeight / (2 * offset);
	window.scrollTo({
		left: 0,
		top,
		behavior
	});
};
var immediateInputTypes = [
	"checkbox",
	"radio",
	"range",
	"file"
];
function inputInfo(el) {
	return {
		immediate: !!el && (el instanceof HTMLSelectElement || el instanceof HTMLInputElement && immediateInputTypes.includes(el.type)),
		multiple: !!el && el instanceof HTMLSelectElement && el.multiple,
		file: !!el && el instanceof HTMLInputElement && el.type == "file"
	};
}
var FetchStatus;
(function(FetchStatus$1) {
	FetchStatus$1[FetchStatus$1["Idle"] = 0] = "Idle";
	FetchStatus$1[FetchStatus$1["Submitting"] = 1] = "Submitting";
	FetchStatus$1[FetchStatus$1["Delayed"] = 2] = "Delayed";
	FetchStatus$1[FetchStatus$1["Timeout"] = 3] = "Timeout";
})(FetchStatus || (FetchStatus = {}));
var activeTimers = /* @__PURE__ */ new Set();
function Form(formElement, timers, options) {
	let state = FetchStatus.Idle;
	let delayedTimeout, timeoutTimeout;
	const Timers = activeTimers;
	function Timers_start() {
		Timers_clear();
		Timers_setState(state != FetchStatus.Delayed ? FetchStatus.Submitting : FetchStatus.Delayed);
		delayedTimeout = window.setTimeout(() => {
			if (delayedTimeout && state == FetchStatus.Submitting) Timers_setState(FetchStatus.Delayed);
		}, options.delayMs);
		timeoutTimeout = window.setTimeout(() => {
			if (timeoutTimeout && state == FetchStatus.Delayed) Timers_setState(FetchStatus.Timeout);
		}, options.timeoutMs);
		Timers.add(Timers_clear);
	}
	function Timers_clear() {
		clearTimeout(delayedTimeout);
		clearTimeout(timeoutTimeout);
		delayedTimeout = timeoutTimeout = 0;
		Timers.delete(Timers_clear);
		Timers_setState(FetchStatus.Idle);
	}
	function Timers_clearAll() {
		Timers.forEach((t) => t());
		Timers.clear();
	}
	function Timers_setState(s) {
		state = s;
		timers.submitting.set(state >= FetchStatus.Submitting);
		timers.delayed.set(state >= FetchStatus.Delayed);
		timers.timeout.set(state >= FetchStatus.Timeout);
	}
	const ErrorTextEvents = formElement;
	function ErrorTextEvents__selectText(e) {
		const target = e.target;
		if (options.selectErrorText) target.select();
	}
	function ErrorTextEvents_addErrorTextListeners() {
		if (!options.selectErrorText) return;
		ErrorTextEvents.querySelectorAll("input").forEach((el) => {
			el.addEventListener("invalid", ErrorTextEvents__selectText);
		});
	}
	function ErrorTextEvents_removeErrorTextListeners() {
		if (!options.selectErrorText) return;
		ErrorTextEvents.querySelectorAll("input").forEach((el) => el.removeEventListener("invalid", ErrorTextEvents__selectText));
	}
	const Form$1 = formElement;
	{
		ErrorTextEvents_addErrorTextListeners();
		const completed = (opts) => {
			if (!opts.clearAll) Timers_clear();
			else Timers_clearAll();
			if (!opts.cancelled) setTimeout(() => scrollToFirstError(Form$1, options), 1);
		};
		onDestroy(() => {
			ErrorTextEvents_removeErrorTextListeners();
			completed({ cancelled: true });
		});
		afterNavigate(() => {
			ErrorTextEvents_removeErrorTextListeners();
			completed({ cancelled: false });
		});
		return {
			submitting() {
				Timers_start();
			},
			completed,
			scrollToFirstError() {
				setTimeout(() => scrollToFirstError(Form$1, options), 1);
			},
			isSubmitting: () => state === FetchStatus.Submitting || state === FetchStatus.Delayed
		};
	}
}
const scrollToFirstError = async (Form$1, options) => {
	if (options.scrollToError == "off") return;
	const selector = options.errorSelector;
	if (!selector) return;
	await tick();
	let el;
	el = Form$1.querySelector(selector);
	if (!el) return;
	el = el.querySelector(selector) ?? el;
	const nav = options.stickyNavbar ? document.querySelector(options.stickyNavbar) : null;
	if (typeof options.scrollToError != "string") el.scrollIntoView(options.scrollToError);
	else if (!isElementInViewport(el, nav?.offsetHeight ?? 0)) scrollToAndCenter(el, void 0, options.scrollToError);
	function Form_shouldAutoFocus(userAgent) {
		if (typeof options.autoFocusOnError === "boolean") return options.autoFocusOnError;
		else return !/iPhone|iPad|iPod|Android/i.test(userAgent);
	}
	if (!Form_shouldAutoFocus(navigator.userAgent)) return;
	let focusEl;
	focusEl = el;
	if (![
		"INPUT",
		"SELECT",
		"BUTTON",
		"TEXTAREA"
	].includes(focusEl.tagName)) focusEl = focusEl.querySelector("input:not([type=\"hidden\"]):not(.flatpickr-input), select, textarea");
	if (focusEl) try {
		focusEl.focus({ preventScroll: true });
		if (options.selectErrorText && focusEl.tagName == "INPUT") focusEl.select();
	} catch {}
};
function updateProxyField(obj, path, updater) {
	const output = traversePath(obj, path, ({ parent, key, value }) => {
		if (value === void 0) parent[key] = /\D/.test(key) ? {} : [];
		return parent[key];
	});
	if (output) {
		const newValue = updater(output.value);
		output.parent[output.key] = newValue;
	}
	return obj;
}
function superFieldProxy(superForm$1, path, baseOptions) {
	const form = superForm$1.form;
	const path2 = splitPath(path);
	const proxy = derived(form, ($form) => {
		return traversePath($form, path2)?.value;
	});
	return {
		subscribe(...params) {
			const unsub = proxy.subscribe(...params);
			return () => unsub();
		},
		update(upd, options) {
			form.update((data) => updateProxyField(data, path2, upd), options ?? baseOptions);
		},
		set(value, options) {
			form.update((data) => updateProxyField(data, path2, () => value), options ?? baseOptions);
		}
	};
}
function isSuperForm(form, options) {
	const isSuperForm$1 = "form" in form;
	if (!isSuperForm$1 && options?.taint !== void 0) throw new SuperFormError("If options.taint is set, the whole superForm object must be used as a proxy.");
	return isSuperForm$1;
}
function fieldProxy(form, path, options) {
	const path2 = splitPath(path);
	if (isSuperForm(form, options)) return superFieldProxy(form, path, options);
	const proxy = derived(form, ($form) => {
		return traversePath($form, path2)?.value;
	});
	return {
		subscribe(...params) {
			const unsub = proxy.subscribe(...params);
			return () => unsub();
		},
		update(upd) {
			form.update((data) => updateProxyField(data, path2, upd));
		},
		set(value) {
			form.update((data) => updateProxyField(data, path2, () => value));
		}
	};
}
function schemaShape(schema, path = []) {
	const output = _schemaShape(schema, path);
	if (!output) throw new SchemaError("No shape could be created for schema.", path);
	return output;
}
function _schemaShape(schema, path) {
	assertSchema(schema, path);
	const info = schemaInfo(schema, false, path);
	if (info.array || info.union) {
		const arr = info.array || [];
		const union = info.union || [];
		return arr.concat(union).reduce((shape, next) => {
			const nextShape = _schemaShape(next, path);
			if (nextShape) shape = {
				...shape ?? {},
				...nextShape
			};
			return shape;
		}, arr.length ? {} : void 0);
	}
	if (info.properties) {
		const output = {};
		for (const [key, prop] of Object.entries(info.properties)) {
			const shape = _schemaShape(prop, [...path, key]);
			if (shape) output[key] = shape;
		}
		return output;
	}
	return info.types.includes("array") || info.types.includes("object") ? {} : void 0;
}
function shapeFromObject(obj) {
	let output = {};
	const isArray = Array.isArray(obj);
	for (const [key, value] of Object.entries(obj)) {
		if (!value || typeof value !== "object") continue;
		if (isArray) output = {
			...output,
			...shapeFromObject(value)
		};
		else output[key] = shapeFromObject(value);
	}
	return output;
}
var formIds = /* @__PURE__ */ new WeakMap();
var initialForms = /* @__PURE__ */ new WeakMap();
var defaultOnError = (event) => {
	throw event.result.error;
};
var defaultFormOptions = {
	applyAction: true,
	invalidateAll: true,
	resetForm: true,
	autoFocusOnError: "detect",
	scrollToError: "smooth",
	errorSelector: "[aria-invalid=\"true\"],[data-invalid]",
	selectErrorText: false,
	stickyNavbar: void 0,
	taintedMessage: false,
	onSubmit: void 0,
	onResult: void 0,
	onUpdate: void 0,
	onUpdated: void 0,
	onError: defaultOnError,
	dataType: "form",
	validators: void 0,
	customValidity: false,
	clearOnSubmit: "message",
	delayMs: 500,
	timeoutMs: 8e3,
	multipleSubmits: "prevent",
	SPA: void 0,
	validationMethod: "auto"
};
function multipleFormIdError(id) {
	return `Duplicate form id's found: "${id}". Multiple forms will receive the same data. Use the id option to differentiate between them, or if this is intended, set the warnings.duplicateId option to false in superForm to disable this warning. More information: https://superforms.rocks/concepts/multiple-forms`;
}
var LEGACY_MODE = false;
try {
	if (SUPERFORMS_LEGACY) LEGACY_MODE = true;
} catch {}
var STORYBOOK_MODE = false;
try {
	if (globalThis.STORIES) STORYBOOK_MODE = true;
} catch {}
function superForm(form, formOptions) {
	let initialForm;
	let options = formOptions ?? {};
	let initialValidator = void 0;
	{
		if (options.legacy ?? LEGACY_MODE) {
			if (options.resetForm === void 0) options.resetForm = false;
			if (options.taintedMessage === void 0) options.taintedMessage = true;
		}
		if (STORYBOOK_MODE) {
			if (options.applyAction === void 0) options.applyAction = false;
		}
		if (typeof options.SPA === "string") {
			if (options.invalidateAll === void 0) options.invalidateAll = false;
			if (options.applyAction === void 0) options.applyAction = false;
		}
		initialValidator = options.validators;
		options = {
			...defaultFormOptions,
			...options
		};
		if ((options.SPA === true || typeof options.SPA === "object") && options.validators === void 0) console.warn("No validators set for superForm in SPA mode. Add a validation adapter to the validators option, or set it to false to disable this warning.");
		if (!form) throw new SuperFormError("No form data sent to superForm. Make sure the output from superValidate is used (usually data.form) and that it's not null or undefined. Alternatively, an object with default values for the form can also be used, but then constraints won't be available.");
		if (Context_isValidationObject(form) === false) form = {
			id: options.id ?? Math.random().toString(36).slice(2, 10),
			valid: false,
			posted: false,
			errors: {},
			data: form,
			shape: shapeFromObject(form)
		};
		form = form;
		const _initialFormId = form.id = options.id ?? form.id;
		const _currentPage = get(page) ?? (STORYBOOK_MODE ? {} : void 0);
		if (browser && options.warnings?.duplicateId !== false) if (!formIds.has(_currentPage)) formIds.set(_currentPage, new Set([_initialFormId]));
		else {
			const currentForms = formIds.get(_currentPage);
			if (currentForms?.has(_initialFormId)) console.warn(multipleFormIdError(_initialFormId));
			else currentForms?.add(_initialFormId);
		}
		if (!initialForms.has(form)) initialForms.set(form, form);
		initialForm = initialForms.get(form);
		if (!browser && _currentPage.form && typeof _currentPage.form === "object") {
			const postedData = _currentPage.form;
			for (const postedForm of Context_findValidationForms(postedData).reverse()) if (postedForm.id == _initialFormId && !initialForms.has(postedForm)) {
				initialForms.set(postedData, postedData);
				const pageDataForm = form;
				form = postedForm;
				form.constraints = pageDataForm.constraints;
				form.shape = pageDataForm.shape;
				if (form.valid && options.resetForm && (options.resetForm === true || options.resetForm())) {
					form = clone(pageDataForm);
					form.message = clone(postedForm.message);
				}
				break;
			}
		} else form = clone(initialForm);
		onDestroy(() => {
			Unsubscriptions_unsubscribe();
			NextChange_clear();
			EnhancedForm_destroy();
			for (const events of Object.values(formEvents)) events.length = 0;
			formIds.get(_currentPage)?.delete(_initialFormId);
		});
		if (options.dataType !== "json") {
			const checkForNestedData = (key, value) => {
				if (!value || typeof value !== "object") return;
				if (Array.isArray(value)) {
					if (value.length > 0) checkForNestedData(key, value[0]);
				} else if (!(value instanceof Date) && !(value instanceof File) && (!browser || !(value instanceof FileList))) throw new SuperFormError(`Object found in form field "${key}". Set the dataType option to "json" and add use:enhance to use nested data structures. More information: https://superforms.rocks/concepts/nested-data`);
			};
			for (const [key, value] of Object.entries(form.data)) checkForNestedData(key, value);
		}
	}
	const __data = {
		formId: form.id,
		form: clone(form.data),
		constraints: form.constraints ?? {},
		posted: form.posted,
		errors: clone(form.errors),
		message: clone(form.message),
		tainted: void 0,
		valid: form.valid,
		submitting: false,
		shape: form.shape
	};
	const Data = __data;
	const FormId = writable(options.id ?? form.id);
	function Context_findValidationForms(data) {
		return Object.values(data).filter((v) => Context_isValidationObject(v) !== false);
	}
	function Context_isValidationObject(object) {
		if (!object || typeof object !== "object") return false;
		if (!("valid" in object && "errors" in object && typeof object.valid === "boolean")) return false;
		return "id" in object && typeof object.id === "string" ? object.id : false;
	}
	const _formData = writable(form.data);
	const Form$1 = {
		subscribe: _formData.subscribe,
		set: (value, options$1 = {}) => {
			const newData = clone(value);
			Tainted_update(newData, options$1.taint ?? true);
			return _formData.set(newData);
		},
		update: (updater, options$1 = {}) => {
			return _formData.update((value) => {
				const newData = updater(value);
				Tainted_update(newData, options$1.taint ?? true);
				return newData;
			});
		}
	};
	function Form_isSPA() {
		return options.SPA === true || typeof options.SPA === "object";
	}
	function Form_resultStatus(defaultStatus) {
		if (defaultStatus > 400) return defaultStatus;
		return (typeof options.SPA === "boolean" || typeof options.SPA === "string" ? void 0 : options.SPA?.failStatus) || defaultStatus;
	}
	async function Form_validate(opts = {}) {
		const dataToValidate = opts.formData ?? Data.form;
		let errors = {};
		let status;
		const validator = opts.adapter ?? options.validators;
		if (typeof validator == "object") {
			if (validator != initialValidator && !("jsonSchema" in validator)) throw new SuperFormError("Client validation adapter found in options.validators. A full adapter must be used when changing validators dynamically, for example \"zod\" instead of \"zodClient\".");
			status = await validator.validate(dataToValidate);
			if (!status.success) errors = mapErrors(status.issues, validator.shape ?? Data.shape ?? {});
			else if (opts.recheckValidData !== false) return Form_validate({
				...opts,
				recheckValidData: false
			});
		} else status = {
			success: true,
			data: {}
		};
		const data = {
			...Data.form,
			...dataToValidate,
			...status.success ? status.data : {}
		};
		return {
			valid: status.success,
			posted: false,
			errors,
			data,
			constraints: Data.constraints,
			message: void 0,
			id: Data.formId,
			shape: Data.shape
		};
	}
	function Form__changeEvent(event) {
		if (!options.onChange || !event.paths.length || event.type == "blur") return;
		let changeEvent;
		const paths = event.paths.map(mergePath);
		if (event.type && event.paths.length == 1 && event.formElement && event.target instanceof Element) changeEvent = {
			path: paths[0],
			paths,
			formElement: event.formElement,
			target: event.target,
			set(path, value, options$1) {
				fieldProxy({ form: Form$1 }, path, options$1).set(value);
			},
			get(path) {
				return get(fieldProxy(Form$1, path));
			}
		};
		else changeEvent = {
			paths,
			target: void 0,
			set(path, value, options$1) {
				fieldProxy({ form: Form$1 }, path, options$1).set(value);
			},
			get(path) {
				return get(fieldProxy(Form$1, path));
			}
		};
		options.onChange(changeEvent);
	}
	async function Form_clientValidation(event, force = false, adapter) {
		if (event) {
			if (options.validators == "clear") Errors.update(($errors) => {
				setPaths($errors, event.paths, void 0);
				return $errors;
			});
			setTimeout(() => Form__changeEvent(event));
		}
		let skipValidation = false;
		if (!force) {
			if (options.validationMethod == "onsubmit" || options.validationMethod == "submit-only") skipValidation = true;
			else if (options.validationMethod == "onblur" && event?.type == "input") skipValidation = true;
			else if (options.validationMethod == "oninput" && event?.type == "blur") skipValidation = true;
		}
		if (skipValidation || !event || !options.validators || options.validators == "clear") {
			if (event?.paths) {
				const formElement = event?.formElement ?? EnhancedForm_get();
				if (formElement) Form__clearCustomValidity(formElement);
			}
			return;
		}
		const result = await Form_validate({ adapter });
		if (result.valid && (event.immediate || event.type != "input")) Form$1.set(result.data, { taint: "ignore" });
		await tick();
		Form__displayNewErrors(result.errors, event, force);
		return result;
	}
	function Form__clearCustomValidity(formElement) {
		const validity = /* @__PURE__ */ new Map();
		if (options.customValidity && formElement) for (const el of formElement.querySelectorAll(`[name]`)) {
			if (typeof el.name !== "string" || !el.name.length) continue;
			const message = "validationMessage" in el ? String(el.validationMessage) : "";
			validity.set(el.name, {
				el,
				message
			});
			updateCustomValidity(el, void 0);
		}
		return validity;
	}
	async function Form__displayNewErrors(errors, event, force) {
		const { type, immediate, multiple, paths } = event;
		const previous = Data.errors;
		const output = {};
		let validity = /* @__PURE__ */ new Map();
		const formElement = event.formElement ?? EnhancedForm_get();
		if (formElement) validity = Form__clearCustomValidity(formElement);
		traversePaths(errors, (error) => {
			if (!Array.isArray(error.value)) return;
			const currentPath = [...error.path];
			if (currentPath[currentPath.length - 1] == "_errors") currentPath.pop();
			const joinedPath = currentPath.join(".");
			const isObjectError = error.path[error.path.length - 1] == "_errors";
			const isEventError = error.value && paths.some((path) => {
				return isObjectError ? currentPath && path && currentPath.length > 0 && currentPath[0] == path[0] : joinedPath == path.join(".");
			});
			function addError$1() {
				setPaths(output, [error.path], error.value);
				if (options.customValidity && isEventError && validity.has(joinedPath)) {
					const { el, message } = validity.get(joinedPath);
					if (message != error.value) {
						setTimeout(() => updateCustomValidity(el, error.value));
						validity.clear();
					}
				}
			}
			if (force) return addError$1();
			if (isEventError && options.validationMethod == "oninput") return addError$1();
			if (immediate && !multiple && isEventError) return addError$1();
			if (multiple) {
				const errorPath = pathExists(get(Errors), error.path.slice(0, -1));
				if (errorPath?.value && typeof errorPath?.value == "object") {
					for (const errors$1 of Object.values(errorPath.value)) if (Array.isArray(errors$1)) return addError$1();
				}
			}
			const previousError = pathExists(previous, error.path);
			if (previousError && previousError.key in previousError.parent) return addError$1();
			if (isObjectError) {
				if (options.validationMethod == "oninput" || type == "blur" && Tainted_hasBeenTainted(mergePath(error.path.slice(0, -1)))) return addError$1();
			} else if (type == "blur" && isEventError) return addError$1();
		});
		Errors.set(output);
	}
	function Form_set(data, options$1 = {}) {
		if (options$1.keepFiles) traversePaths(Data.form, (info) => {
			if ((!browser || !(info.parent instanceof FileList)) && (info.value instanceof File || browser && info.value instanceof FileList)) {
				const dataPath = pathExists(data, info.path);
				if (!dataPath || !(dataPath.key in dataPath.parent)) setPaths(data, [info.path], info.value);
			}
		});
		return Form$1.set(data, options$1);
	}
	function Form_shouldReset(validForm, successActionResult) {
		return validForm && successActionResult && options.resetForm && (options.resetForm === true || options.resetForm());
	}
	function Form_capture(removeFilesfromData = true) {
		let data = Data.form;
		let tainted = Data.tainted;
		if (removeFilesfromData) {
			const removed = removeFiles(Data.form);
			data = removed.data;
			const paths = removed.paths;
			if (paths.length) {
				tainted = clone(tainted) ?? {};
				setPaths(tainted, paths, false);
			}
		}
		return {
			valid: Data.valid,
			posted: Data.posted,
			errors: Data.errors,
			data,
			constraints: Data.constraints,
			message: Data.message,
			id: Data.formId,
			tainted,
			shape: Data.shape
		};
	}
	async function Form_updateFromValidation(form2, successResult) {
		if (form2.valid && successResult && Form_shouldReset(form2.valid, successResult)) Form_reset({
			message: form2.message,
			posted: true
		});
		else rebind({
			form: form2,
			untaint: successResult,
			keepFiles: true,
			pessimisticUpdate: options.invalidateAll == "force" || options.invalidateAll == "pessimistic"
		});
		if (formEvents.onUpdated.length) await tick();
		for (const event of formEvents.onUpdated) event({ form: form2 });
	}
	function Form_reset(opts = {}) {
		if (opts.newState) initialForm.data = {
			...initialForm.data,
			...opts.newState
		};
		const resetData = clone(initialForm);
		resetData.data = {
			...resetData.data,
			...opts.data
		};
		if (opts.id !== void 0) resetData.id = opts.id;
		const currentTainted = clone(__data.tainted);
		const newTainted = {};
		if (currentTainted && opts.data) {
			for (const key in currentTainted) if (key in opts.data) newTainted[key] = currentTainted[key];
		}
		rebind({
			form: resetData,
			untaint: Object.keys(newTainted).length > 0 ? newTainted : true,
			message: opts.message,
			keepFiles: false,
			posted: opts.posted,
			resetted: true
		});
	}
	async function Form_updateFromActionResult(result) {
		if (result.type == "error") throw new SuperFormError(`ActionResult of type "${result.type}" cannot be passed to update function.`);
		if (result.type == "redirect") {
			if (Form_shouldReset(true, true)) Form_reset({ posted: true });
			return;
		}
		if (typeof result.data !== "object") throw new SuperFormError("Non-object validation data returned from ActionResult.");
		const forms = Context_findValidationForms(result.data);
		if (!forms.length) throw new SuperFormError("No form data returned from ActionResult. Make sure you return { form } in the form actions.");
		for (const newForm of forms) {
			if (newForm.id !== Data.formId) continue;
			await Form_updateFromValidation(newForm, result.status >= 200 && result.status < 300);
		}
	}
	const Message = writable(__data.message);
	const Constraints = writable(__data.constraints);
	const Posted = writable(__data.posted);
	const Shape = writable(__data.shape);
	const _errors = writable(form.errors);
	const Errors = {
		subscribe: _errors.subscribe,
		set(value, options$1) {
			return _errors.set(updateErrors(value, Data.errors, options$1?.force));
		},
		update(updater, options$1) {
			return _errors.update((value) => {
				return updateErrors(updater(value), Data.errors, options$1?.force);
			});
		},
		clear: () => Errors.set({})
	};
	let NextChange = null;
	function NextChange_setHtmlEvent(event) {
		if (NextChange && event && Object.keys(event).length == 1 && event.paths?.length && NextChange.target && NextChange.target instanceof HTMLInputElement && NextChange.target.type.toLowerCase() == "file") NextChange.paths = event.paths;
		else NextChange = event;
		setTimeout(() => {
			Form_clientValidation(NextChange);
		}, 0);
	}
	function NextChange_additionalEventInformation(event, immediate, multiple, formElement, target) {
		if (NextChange === null) NextChange = { paths: [] };
		NextChange.type = event;
		NextChange.immediate = immediate;
		NextChange.multiple = multiple;
		NextChange.formElement = formElement;
		NextChange.target = target;
	}
	function NextChange_paths() {
		return NextChange?.paths ?? [];
	}
	function NextChange_clear() {
		NextChange = null;
	}
	const Tainted = {
		defaultMessage: "Leave page? Changes that you made may not be saved.",
		state: writable(),
		message: options.taintedMessage,
		clean: clone(form.data),
		forceRedirection: false
	};
	function Tainted_isEnabled() {
		return options.taintedMessage && !Data.submitting && !Tainted.forceRedirection && Tainted_isTainted();
	}
	function Tainted_checkUnload(e) {
		if (!Tainted_isEnabled()) return;
		e.preventDefault();
		e.returnValue = "";
		const { taintedMessage } = options;
		const confirmationMessage = typeof taintedMessage === "function" || taintedMessage === true ? Tainted.defaultMessage : taintedMessage;
		(e || window.event).returnValue = confirmationMessage || Tainted.defaultMessage;
		return confirmationMessage;
	}
	async function Tainted_beforeNav(nav) {
		if (!Tainted_isEnabled()) return;
		const { taintedMessage } = options;
		const isTaintedFunction = typeof taintedMessage === "function";
		if (isTaintedFunction) nav.cancel();
		if (nav.type === "leave") return;
		const message = isTaintedFunction || taintedMessage === true ? Tainted.defaultMessage : taintedMessage;
		let shouldRedirect;
		try {
			shouldRedirect = isTaintedFunction ? await taintedMessage(nav) : window.confirm(message || Tainted.defaultMessage);
		} catch {
			shouldRedirect = false;
		}
		if (shouldRedirect && nav.to) try {
			Tainted.forceRedirection = true;
			await goto(nav.to.url, { ...nav.to.params });
			return;
		} finally {
			Tainted.forceRedirection = false;
		}
		else if (!shouldRedirect && !isTaintedFunction) nav.cancel();
	}
	function Tainted_enable() {
		options.taintedMessage = Tainted.message;
	}
	function Tainted_currentState() {
		return Tainted.state;
	}
	function Tainted_hasBeenTainted(path) {
		if (!Data.tainted) return false;
		if (!path) return !!Data.tainted;
		const field = pathExists(Data.tainted, splitPath(path));
		return !!field && field.key in field.parent;
	}
	function Tainted_isTainted(path) {
		if (!arguments.length) return Tainted__isObjectTainted(Data.tainted);
		if (typeof path === "boolean") return path;
		if (typeof path === "object") return Tainted__isObjectTainted(path);
		if (!Data.tainted || path === void 0) return false;
		return Tainted__isObjectTainted(pathExists(Data.tainted, splitPath(path))?.value);
	}
	function Tainted__isObjectTainted(obj) {
		if (!obj) return false;
		if (typeof obj === "object") {
			for (const obj2 of Object.values(obj)) if (Tainted__isObjectTainted(obj2)) return true;
		}
		return obj === true;
	}
	function Tainted_update(newData, taintOptions) {
		if (taintOptions == "ignore") return;
		const paths = comparePaths(newData, Data.form);
		const newTainted = comparePaths(newData, Tainted.clean).map((path) => path.join());
		if (paths.length) {
			Tainted.state.update((currentlyTainted) => {
				if (!currentlyTainted) currentlyTainted = {};
				setPaths(currentlyTainted, paths, (path, data) => {
					if (!newTainted.includes(path.join())) return void 0;
					const currentValue = traversePath(newData, path);
					const cleanPath = traversePath(Tainted.clean, path);
					return currentValue && cleanPath && currentValue.value === cleanPath.value ? void 0 : taintOptions === true ? true : taintOptions === "untaint" ? void 0 : data.value;
				});
				return currentlyTainted;
			});
			NextChange_setHtmlEvent({ paths });
		}
		if (taintOptions == "untaint-all" || taintOptions == "untaint-form") Tainted.state.set(void 0);
	}
	function Tainted_set(tainted, newClean) {
		Tainted.state.set(tainted);
		if (newClean) Tainted.clean = newClean;
	}
	const Submitting = writable(false);
	const Delayed = writable(false);
	const Timeout = writable(false);
	const Unsubscriptions = [
		Tainted.state.subscribe((tainted) => __data.tainted = clone(tainted)),
		Form$1.subscribe((form$1) => __data.form = clone(form$1)),
		Errors.subscribe((errors) => __data.errors = clone(errors)),
		FormId.subscribe((id) => __data.formId = id),
		Constraints.subscribe((constraints$1) => __data.constraints = constraints$1),
		Posted.subscribe((posted) => __data.posted = posted),
		Message.subscribe((message) => __data.message = message),
		Submitting.subscribe((submitting) => __data.submitting = submitting),
		Shape.subscribe((shape) => __data.shape = shape)
	];
	function Unsubscriptions_add(func) {
		Unsubscriptions.push(func);
	}
	function Unsubscriptions_unsubscribe() {
		Unsubscriptions.forEach((unsub) => unsub());
	}
	let EnhancedForm;
	function EnhancedForm_get() {
		return EnhancedForm;
	}
	function EnhancedForm_createFromSPA(action) {
		EnhancedForm = document.createElement("form");
		EnhancedForm.method = "POST";
		EnhancedForm.action = action;
		superFormEnhance(EnhancedForm);
		document.body.appendChild(EnhancedForm);
	}
	function EnhancedForm_setAction(action) {
		if (EnhancedForm) EnhancedForm.action = action;
	}
	function EnhancedForm_destroy() {
		if (EnhancedForm?.parentElement) EnhancedForm.remove();
		EnhancedForm = void 0;
	}
	const AllErrors = derived(Errors, ($errors) => $errors ? flattenErrors($errors) : []);
	options.taintedMessage = void 0;
	function rebind(opts) {
		const form$1 = opts.form;
		const message = opts.message ?? form$1.message;
		if (opts.untaint || opts.resetted) Tainted_set(typeof opts.untaint === "boolean" ? void 0 : opts.untaint, form$1.data);
		if (!opts.pessimisticUpdate) Form_set(form$1.data, {
			taint: "ignore",
			keepFiles: opts.keepFiles
		});
		Message.set(message);
		if (opts.resetted) Errors.update(() => ({}), { force: true });
		else Errors.set(form$1.errors);
		FormId.set(form$1.id);
		Posted.set(opts.posted ?? form$1.posted);
		if (form$1.constraints) Constraints.set(form$1.constraints);
		if (form$1.shape) Shape.set(form$1.shape);
		__data.valid = form$1.valid;
		if (options.flashMessage && shouldSyncFlash(options)) {
			const flash = options.flashMessage.module.getFlash(page);
			if (message && get(flash) === void 0) flash.set(message);
		}
	}
	const formEvents = {
		onSubmit: options.onSubmit ? [options.onSubmit] : [],
		onResult: options.onResult ? [options.onResult] : [],
		onUpdate: options.onUpdate ? [options.onUpdate] : [],
		onUpdated: options.onUpdated ? [options.onUpdated] : [],
		onError: options.onError ? [options.onError] : []
	};
	if (browser) {
		window.addEventListener("beforeunload", Tainted_checkUnload);
		onDestroy(() => {
			window.removeEventListener("beforeunload", Tainted_checkUnload);
		});
		beforeNavigate(Tainted_beforeNav);
		Unsubscriptions_add(page.subscribe(async (pageUpdate) => {
			if (STORYBOOK_MODE && pageUpdate === void 0) pageUpdate = { status: 200 };
			const successResult = pageUpdate.status >= 200 && pageUpdate.status < 300;
			if (options.applyAction && pageUpdate.form && typeof pageUpdate.form === "object") {
				const actionData = pageUpdate.form;
				if (actionData.type === "error") return;
				for (const newForm of Context_findValidationForms(actionData)) {
					const isInitial = initialForms.has(newForm);
					if (newForm.id !== Data.formId || isInitial) continue;
					initialForms.set(newForm, newForm);
					await Form_updateFromValidation(newForm, successResult);
				}
			} else if (options.applyAction !== "never" && pageUpdate.data && typeof pageUpdate.data === "object") for (const newForm of Context_findValidationForms(pageUpdate.data)) {
				const isInitial = initialForms.has(newForm);
				if (newForm.id !== Data.formId || isInitial) continue;
				if (options.invalidateAll === "force" || options.invalidateAll === "pessimistic") initialForm.data = newForm.data;
				const resetStatus = Form_shouldReset(newForm.valid, true);
				rebind({
					form: newForm,
					untaint: successResult,
					keepFiles: !resetStatus,
					resetted: resetStatus
				});
			}
		}));
		if (typeof options.SPA === "string") EnhancedForm_createFromSPA(options.SPA);
	}
	function superFormEnhance(FormElement, events) {
		if (options.SPA !== void 0 && FormElement.method == "get") FormElement.method = "post";
		if (typeof options.SPA === "string") {
			if (options.SPA.length && FormElement.action == document.location.href) FormElement.action = options.SPA;
		} else EnhancedForm = FormElement;
		if (events) {
			if (events.onError) {
				if (options.onError === "apply") throw new SuperFormError("options.onError is set to \"apply\", cannot add any onError events.");
				else if (events.onError === "apply") throw new SuperFormError("Cannot add \"apply\" as onError event in use:enhance.");
				formEvents.onError.push(events.onError);
			}
			if (events.onResult) formEvents.onResult.push(events.onResult);
			if (events.onSubmit) formEvents.onSubmit.push(events.onSubmit);
			if (events.onUpdate) formEvents.onUpdate.push(events.onUpdate);
			if (events.onUpdated) formEvents.onUpdated.push(events.onUpdated);
		}
		Tainted_enable();
		let lastInputChange;
		async function onInput(e) {
			const info = inputInfo(e.target);
			if (info.immediate && !info.file) await new Promise((r) => setTimeout(r, 0));
			lastInputChange = NextChange_paths();
			NextChange_additionalEventInformation("input", info.immediate, info.multiple, FormElement, e.target ?? void 0);
		}
		async function onBlur(e) {
			if (Data.submitting) return;
			if (!lastInputChange || NextChange_paths() != lastInputChange) return;
			const info = inputInfo(e.target);
			if (info.immediate && !info.file) await new Promise((r) => setTimeout(r, 0));
			if (lastInputChange === void 0) return;
			Form_clientValidation({
				paths: lastInputChange,
				immediate: info.multiple,
				multiple: info.multiple,
				type: "blur",
				formElement: FormElement,
				target: e.target ?? void 0
			});
			lastInputChange = void 0;
		}
		FormElement.addEventListener("focusout", onBlur);
		FormElement.addEventListener("input", onInput);
		onDestroy(() => {
			FormElement.removeEventListener("focusout", onBlur);
			FormElement.removeEventListener("input", onInput);
		});
		const htmlForm = Form(FormElement, {
			submitting: Submitting,
			delayed: Delayed,
			timeout: Timeout
		}, options);
		let currentRequest;
		let customRequest = void 0;
		const enhanced = enhance(FormElement, async (submitParams) => {
			let jsonData = void 0;
			let validationAdapter = options.validators;
			const submit = {
				...submitParams,
				jsonData(data) {
					if (options.dataType !== "json") throw new SuperFormError("options.dataType must be set to 'json' to use jsonData.");
					jsonData = data;
				},
				validators(adapter) {
					validationAdapter = adapter;
				},
				customRequest(request) {
					customRequest = request;
				}
			};
			const _submitCancel = submit.cancel;
			let cancelled = false;
			function clientValidationResult(validation) {
				const validationResult = {
					...validation,
					posted: true
				};
				const status = validationResult.valid ? 200 : Form_resultStatus(400);
				const data = { form: validationResult };
				const result = validationResult.valid ? {
					type: "success",
					status,
					data
				} : {
					type: "failure",
					status,
					data
				};
				setTimeout(() => validationResponse({ result }), 0);
			}
			function clearOnSubmit() {
				switch (options.clearOnSubmit) {
					case "errors-and-message":
						Errors.clear();
						Message.set(void 0);
						break;
					case "errors":
						Errors.clear();
						break;
					case "message":
						Message.set(void 0);
						break;
				}
			}
			async function triggerOnError(result, status) {
				result.status = status;
				if (options.onError !== "apply") {
					const event = {
						result,
						message: Message,
						form
					};
					for (const onErrorEvent of formEvents.onError) if (onErrorEvent !== "apply" && (onErrorEvent != defaultOnError || !options.flashMessage?.onError)) await onErrorEvent(event);
				}
				if (options.flashMessage && options.flashMessage.onError) await options.flashMessage.onError({
					result,
					flashMessage: options.flashMessage.module.getFlash(page)
				});
				if (options.applyAction) if (options.onError == "apply") await applyAction(result);
				else await applyAction({
					type: "failure",
					status: Form_resultStatus(result.status),
					data: result
				});
			}
			function cancel(opts = { resetTimers: true }) {
				cancelled = true;
				if (opts.resetTimers && htmlForm.isSubmitting()) htmlForm.completed({ cancelled });
				return _submitCancel();
			}
			submit.cancel = cancel;
			if (htmlForm.isSubmitting() && options.multipleSubmits == "prevent") cancel({ resetTimers: false });
			else {
				if (htmlForm.isSubmitting() && options.multipleSubmits == "abort") {
					if (currentRequest) currentRequest.abort();
				}
				htmlForm.submitting();
				currentRequest = submit.controller;
				for (const event of formEvents.onSubmit) try {
					await event(submit);
				} catch (error) {
					cancel();
					triggerOnError({
						type: "error",
						error
					}, 500);
				}
			}
			if (cancelled && options.flashMessage) cancelFlash(options);
			if (!cancelled) {
				const noValidate = !Form_isSPA() && (FormElement.noValidate || (submit.submitter instanceof HTMLButtonElement || submit.submitter instanceof HTMLInputElement) && submit.submitter.formNoValidate);
				let validation = void 0;
				const validateForm = async () => {
					return await Form_validate({ adapter: validationAdapter });
				};
				clearOnSubmit();
				if (!noValidate) {
					validation = await validateForm();
					if (!validation.valid) {
						cancel({ resetTimers: false });
						clientValidationResult(validation);
					}
				}
				if (!cancelled) {
					if (options.flashMessage && (options.clearOnSubmit == "errors-and-message" || options.clearOnSubmit == "message") && shouldSyncFlash(options)) options.flashMessage.module.getFlash(page).set(void 0);
					const submitData = "formData" in submit ? submit.formData : submit.data;
					lastInputChange = void 0;
					if (Form_isSPA()) {
						if (!validation) validation = await validateForm();
						cancel({ resetTimers: false });
						clientValidationResult(validation);
					} else if (options.dataType === "json") {
						if (!validation) validation = await validateForm();
						const postData = clone(jsonData ?? validation.data);
						traversePaths(postData, (data) => {
							if (data.value instanceof File) {
								const key = "__superform_file_" + mergePath(data.path);
								submitData.append(key, data.value);
								return data.set(void 0);
							} else if (Array.isArray(data.value) && data.value.length && data.value.every((v) => v instanceof File)) {
								const key = "__superform_files_" + mergePath(data.path);
								for (const file of data.value) submitData.append(key, file);
								return data.set(void 0);
							}
						});
						Object.keys(postData).forEach((key) => {
							if (typeof submitData.get(key) === "string") submitData.delete(key);
						});
						const chunks = chunkSubstr(stringify(postData, options.transport ? Object.fromEntries(Object.entries(options.transport).map(([k, v]) => [k, v.encode])) : void 0), options.jsonChunkSize ?? 5e5);
						for (const chunk of chunks) submitData.append("__superform_json", chunk);
					}
					if (!submitData.has("__superform_id")) {
						const id = Data.formId;
						if (id !== void 0) submitData.set("__superform_id", id);
					}
					if (typeof options.SPA === "string") EnhancedForm_setAction(options.SPA);
				}
			}
			function chunkSubstr(str, size) {
				const numChunks = Math.ceil(str.length / size);
				const chunks = new Array(numChunks);
				for (let i = 0, o = 0; i < numChunks; ++i, o += size) chunks[i] = str.substring(o, o + size);
				return chunks;
			}
			async function validationResponse(event) {
				let cancelled$1 = false;
				currentRequest = null;
				let result = "type" in event.result && "status" in event.result ? event.result : {
					type: "error",
					status: Form_resultStatus(parseInt(String(event.result.status)) || 500),
					error: event.result.error instanceof Error ? event.result.error : event.result
				};
				const cancel$1 = () => cancelled$1 = true;
				const data = {
					result,
					formEl: FormElement,
					formElement: FormElement,
					cancel: cancel$1
				};
				const unsubCheckforNav = STORYBOOK_MODE || !Form_isSPA() ? () => {} : navigating.subscribe(($nav) => {
					if (!$nav || $nav.from?.route.id === $nav.to?.route.id) return;
					cancel$1();
				});
				function setErrorResult(error, data$1, status) {
					data$1.result = {
						type: "error",
						error,
						status: Form_resultStatus(status)
					};
				}
				for (const event$1 of formEvents.onResult) try {
					await event$1(data);
				} catch (error) {
					setErrorResult(error, data, Math.max(result.status ?? 500, 400));
				}
				result = data.result;
				if (!cancelled$1) {
					if ((result.type === "success" || result.type === "failure") && result.data) {
						const forms = Context_findValidationForms(result.data);
						if (!forms.length) throw new SuperFormError("No form data returned from ActionResult. Make sure you return { form } in the form actions.");
						for (const newForm of forms) {
							if (newForm.id !== Data.formId) continue;
							const data$1 = {
								form: newForm,
								formEl: FormElement,
								formElement: FormElement,
								cancel: () => cancelled$1 = true,
								result
							};
							for (const event$1 of formEvents.onUpdate) try {
								await event$1(data$1);
							} catch (error) {
								setErrorResult(error, data$1, Math.max(result.status ?? 500, 400));
							}
							result = data$1.result;
							if (!cancelled$1) {
								if (options.customValidity) setCustomValidityForm(FormElement, data$1.form.errors);
								if (Form_shouldReset(data$1.form.valid, result.type == "success")) data$1.formElement.querySelectorAll("input[type=\"file\"]").forEach((e) => e.value = "");
							}
						}
					}
					if (!cancelled$1) if (result.type !== "error") {
						if (result.type === "success" && options.invalidateAll) await invalidateAll();
						if (options.applyAction) await applyAction(result);
						else await Form_updateFromActionResult(result);
					} else await triggerOnError(result, Math.max(result.status ?? 500, 400));
				}
				if (cancelled$1 && options.flashMessage) cancelFlash(options);
				if (cancelled$1 || result.type != "redirect") htmlForm.completed({ cancelled: cancelled$1 });
				else if (STORYBOOK_MODE) htmlForm.completed({
					cancelled: cancelled$1,
					clearAll: true
				});
				else {
					const unsub = navigating.subscribe(($nav) => {
						if ($nav) return;
						setTimeout(() => {
							try {
								if (unsub) unsub();
							} catch {}
						});
						if (htmlForm.isSubmitting()) htmlForm.completed({
							cancelled: cancelled$1,
							clearAll: true
						});
					});
				}
				unsubCheckforNav();
			}
			if (!cancelled && customRequest) {
				_submitCancel();
				const response = await customRequest(submitParams);
				let result;
				if (response instanceof Response) result = deserialize(await response.text());
				else if (response instanceof XMLHttpRequest) result = deserialize(response.responseText);
				else result = response;
				if (result.type === "error") result.status = response.status;
				validationResponse({ result });
			}
			return validationResponse;
		});
		return { destroy: () => {
			for (const [name, events$1] of Object.entries(formEvents)) formEvents[name] = events$1.filter((e) => e === options[name]);
			enhanced.destroy();
		} };
	}
	function removeFiles(formData) {
		const paths = [];
		traversePaths(formData, (data$1) => {
			if (data$1.value instanceof File) {
				paths.push(data$1.path);
				return "skip";
			} else if (Array.isArray(data$1.value) && data$1.value.length && data$1.value.every((d) => d instanceof File)) {
				paths.push(data$1.path);
				return "skip";
			}
		});
		if (!paths.length) return {
			data: formData,
			paths
		};
		const data = clone(formData);
		setPaths(data, paths, (path) => pathExists(initialForm.data, path)?.value);
		return {
			data,
			paths
		};
	}
	return {
		form: Form$1,
		formId: FormId,
		errors: Errors,
		message: Message,
		constraints: Constraints,
		tainted: Tainted_currentState(),
		submitting: readonly(Submitting),
		delayed: readonly(Delayed),
		timeout: readonly(Timeout),
		options,
		capture: Form_capture,
		restore: ((snapshot) => {
			rebind({
				form: snapshot,
				untaint: snapshot.tainted ?? true
			});
		}),
		async validate(path, opts = {}) {
			if (!options.validators) throw new SuperFormError("options.validators must be set to use the validate method.");
			if (opts.update === void 0) opts.update = true;
			if (opts.taint === void 0) opts.taint = false;
			if (typeof opts.errors == "string") opts.errors = [opts.errors];
			let data;
			const splittedPath = splitPath(path);
			if ("value" in opts) if (opts.update === true || opts.update === "value") {
				Form$1.update(($form) => {
					setPaths($form, [splittedPath], opts.value);
					return $form;
				}, { taint: opts.taint });
				data = Data.form;
			} else {
				data = clone(Data.form);
				setPaths(data, [splittedPath], opts.value);
			}
			else data = Data.form;
			const error = pathExists((await Form_validate({ formData: data })).errors, splittedPath);
			if (error && error.value && opts.errors) error.value = opts.errors;
			if (opts.update === true || opts.update == "errors") Errors.update(($errors) => {
				setPaths($errors, [splittedPath], error?.value);
				return $errors;
			});
			return error?.value;
		},
		async validateForm(opts = {}) {
			if (!options.validators && !opts.schema) throw new SuperFormError("options.validators or the schema option must be set to use the validateForm method.");
			const result = opts.update ? await Form_clientValidation({ paths: [] }, true, opts.schema) : Form_validate({ adapter: opts.schema });
			const enhancedForm = EnhancedForm_get();
			if (opts.update && enhancedForm) setTimeout(() => {
				if (!enhancedForm) return;
				scrollToFirstError(enhancedForm, {
					...options,
					scrollToError: opts.focusOnError === false ? "off" : options.scrollToError
				});
			}, 1);
			return result || Form_validate({ adapter: opts.schema });
		},
		allErrors: AllErrors,
		posted: Posted,
		reset(options$1) {
			return Form_reset({
				message: options$1?.keepMessage ? Data.message : void 0,
				data: options$1?.data,
				id: options$1?.id,
				newState: options$1?.newState
			});
		},
		submit(submitter) {
			const form$1 = EnhancedForm_get() ? EnhancedForm_get() : submitter && submitter instanceof HTMLElement ? submitter.closest("form") : void 0;
			if (!form$1) throw new SuperFormError("use:enhance must be added to the form to use submit, or pass a HTMLElement inside the form (or the form itself) as an argument.");
			if (!form$1.requestSubmit) return form$1.submit();
			const isSubmitButton = submitter && (submitter instanceof HTMLButtonElement && submitter.type == "submit" || submitter instanceof HTMLInputElement && ["submit", "image"].includes(submitter.type));
			form$1.requestSubmit(isSubmitButton ? submitter : void 0);
		},
		isTainted: Tainted_isTainted,
		enhance: superFormEnhance
	};
}
function defaults(data, adapter, options) {
	if (data && "superFormValidationLibrary" in data) {
		options = adapter;
		adapter = data;
		data = null;
	}
	const validator = adapter;
	const optionDefaults = options?.defaults ?? validator.defaults;
	return {
		id: options?.id ?? validator.id ?? "",
		valid: false,
		posted: false,
		errors: {},
		data: {
			...optionDefaults,
			...data
		},
		constraints: validator.constraints,
		shape: validator.shape
	};
}
function constraints(schema) {
	return _constraints(schemaInfo(schema, false, []), []);
}
function merge(...constraints$1) {
	const filtered = constraints$1.filter((c) => !!c);
	if (!filtered.length) return void 0;
	if (filtered.length == 1) return filtered[0];
	return merge$1(...filtered);
}
function _constraints(info, path) {
	if (!info) return void 0;
	let output = void 0;
	if (info.union && info.union.length) {
		const infos = info.union.map((s) => schemaInfo(s, info.isOptional, path));
		const merged = infos.map((i) => _constraints(i, path));
		output = merge(output, ...merged);
		if (output && (info.isNullable || info.isOptional || infos.some((i) => i?.isNullable || i?.isOptional))) delete output.required;
	}
	if (info.array) output = merge(output, ...info.array.map((i) => _constraints(schemaInfo(i, info.isOptional, path), path)));
	if (info.properties) {
		const obj = {};
		for (const [key, prop] of Object.entries(info.properties)) {
			const propConstraint = _constraints(schemaInfo(prop, !info.required?.includes(key) || prop.default !== void 0, [key]), [...path, key]);
			if (typeof propConstraint === "object" && Object.values(propConstraint).length > 0) obj[key] = propConstraint;
		}
		output = merge(output, obj);
	}
	return output ?? constraint(info);
}
function constraint(info) {
	const output = {};
	const schema = info.schema;
	const type = schema.type;
	const format = schema.format;
	if (type == "integer" && format == "unix-time") {
		const date = schema;
		if (date.minimum !== void 0) output.min = new Date(date.minimum).toISOString();
		if (date.maximum !== void 0) output.max = new Date(date.maximum).toISOString();
	} else if (type == "string") {
		const str = schema;
		const patterns = [str.pattern, ...str.allOf ? str.allOf.map((s) => typeof s == "boolean" ? void 0 : s.pattern) : []].filter((s) => s !== void 0);
		if (patterns.length > 0) output.pattern = patterns[0];
		if (str.minLength !== void 0) output.minlength = str.minLength;
		if (str.maxLength !== void 0) output.maxlength = str.maxLength;
	} else if (type == "number" || type == "integer") {
		const num = schema;
		if (num.minimum !== void 0) output.min = num.minimum;
		else if (num.exclusiveMinimum !== void 0) output.min = num.exclusiveMinimum + (type == "integer" ? 1 : Number.MIN_VALUE);
		if (num.maximum !== void 0) output.max = num.maximum;
		else if (num.exclusiveMaximum !== void 0) output.max = num.exclusiveMaximum - (type == "integer" ? 1 : Number.MIN_VALUE);
		if (num.multipleOf !== void 0) output.step = num.multipleOf;
	} else if (type == "array") {
		const arr = schema;
		if (arr.minItems !== void 0) output.min = arr.minItems;
		if (arr.maxItems !== void 0) output.max = arr.maxItems;
	}
	if (!info.isNullable && !info.isOptional) output.required = true;
	return Object.keys(output).length > 0 ? output : void 0;
}
function schemaHash(schema) {
	return hashCode(_schemaHash(schemaInfo(schema, false, []), 0, []));
}
function _schemaHash(info, depth, path) {
	if (!info) return "";
	function tab() {
		return "  ".repeat(depth);
	}
	function mapSchemas(schemas) {
		return schemas.map((s) => _schemaHash(schemaInfo(s, info?.isOptional ?? false, path), depth + 1, path)).filter((s) => s).join("|");
	}
	function nullish() {
		const output = [];
		if (info?.isNullable) output.push("null");
		if (info?.isOptional) output.push("undefined");
		return !output.length ? "" : "|" + output.join("|");
	}
	if (info.union) return "Union {\n  " + tab() + mapSchemas(info.union) + "\n" + tab() + "}" + nullish();
	if (info.properties) {
		const output = [];
		for (const [key, prop] of Object.entries(info.properties)) {
			const propInfo = schemaInfo(prop, !info.required?.includes(key) || prop.default !== void 0, [key]);
			output.push(key + ": " + _schemaHash(propInfo, depth + 1, path));
		}
		return "Object {\n  " + tab() + output.join(",\n  ") + "\n" + tab() + "}" + nullish();
	}
	if (info.array) return "Array[" + mapSchemas(info.array) + "]" + nullish();
	return info.types.join("|") + nullish();
}
function hashCode(str) {
	let hash = 0;
	for (let i = 0, len = str.length; i < len; i++) {
		const chr = str.charCodeAt(i);
		hash = (hash << 5) - hash + chr;
		hash |= 0;
	}
	if (hash < 0) hash = hash >>> 0;
	return hash.toString(36);
}
/* @__NO_SIDE_EFFECTS__ */
function createAdapter(adapter, jsonSchema) {
	if (!adapter || !("superFormValidationLibrary" in adapter)) throw new SuperFormError("Superforms v2 requires a validation adapter for the schema. Import one of your choice from \"sveltekit-superforms/adapters\" and wrap the schema with it.");
	if (!jsonSchema) jsonSchema = adapter.jsonSchema;
	return {
		...adapter,
		constraints: adapter.constraints ?? constraints(jsonSchema),
		defaults: adapter.defaults ?? defaultValues(jsonSchema),
		shape: schemaShape(jsonSchema),
		id: schemaHash(jsonSchema)
	};
}
var legacyMode = false;
try {
	if (SUPERFORMS_LEGACY) legacyMode = true;
} catch {}
var unionError = "FormData parsing failed: Unions are only supported when the dataType option for superForm is set to \"json\".";
function isCompatibleTypeUnion(types) {
	return new Set(types.map((type) => {
		if (["number", "integer"].includes(type)) return "number";
		if (type === "unix-time") return "number";
		return type;
	})).size <= 1;
}
function isCompatibleUnionSchema(union) {
	if (!union) return true;
	const unionTypes = new Set(union.flatMap((u) => u.type ? Array.isArray(u.type) ? u.type : [u.type] : u.const !== void 0 ? [typeof u.const] : []));
	return unionTypes.size <= 1 || unionTypes.size === 2 && unionTypes.has("null");
}
async function parseRequest(data, schemaData, options) {
	let parsed;
	if (data instanceof FormData) parsed = parseFormData(data, schemaData, options);
	else if (data instanceof URL || data instanceof URLSearchParams) parsed = parseSearchParams(data, schemaData, options);
	else if (data instanceof Request) parsed = await tryParseFormData(data, schemaData, options);
	else if (data && typeof data === "object" && "request" in data && data.request instanceof Request) parsed = await tryParseFormData(data.request, schemaData, options);
	else parsed = {
		id: void 0,
		data,
		posted: false
	};
	return parsed;
}
async function tryParseFormData(request, schemaData, options) {
	let formData = void 0;
	try {
		formData = await request.formData();
	} catch (e) {
		if (e instanceof TypeError && e.message.includes("already been consumed")) throw e;
		return {
			id: void 0,
			data: void 0,
			posted: false
		};
	}
	return parseFormData(formData, schemaData, options);
}
function parseSearchParams(data, schemaData, options) {
	if (data instanceof URL) data = data.searchParams;
	const convert$1 = new FormData();
	for (const [key, value] of data.entries()) convert$1.append(key, value);
	const output = parseFormData(convert$1, schemaData, options, true);
	output.posted = false;
	return output;
}
function parseFormData(formData, schemaData, options, fromURL = false) {
	function tryParseSuperJson() {
		if (formData.has("__superform_json")) try {
			const transport = options && options.transport ? Object.fromEntries(Object.entries(options.transport).map(([k, v]) => [k, v.decode])) : void 0;
			const output = parse(formData.getAll("__superform_json").join("") ?? "", transport);
			if (typeof output === "object") {
				const filePaths = Array.from(formData.keys());
				for (const path of filePaths.filter((path$1) => path$1.startsWith("__superform_file_"))) setPaths(output, [splitPath(path.substring(17))], formData.get(path));
				for (const path of filePaths.filter((path$1) => path$1.startsWith("__superform_files_"))) {
					const realPath = splitPath(path.substring(18));
					const allFiles = formData.getAll(path);
					setPaths(output, [realPath], Array.from(allFiles));
				}
				return output;
			}
		} catch {}
		return null;
	}
	const data = tryParseSuperJson();
	const id = formData.get("__superform_id")?.toString();
	return data ? {
		id,
		data,
		posted: true
	} : {
		id,
		data: _parseFormData(formData, schemaData, options, fromURL),
		posted: true
	};
}
function _parseFormData(formData, schema, options, fromURL = false) {
	const output = {};
	let schemaKeys;
	let discriminatedUnionSchema;
	if (options?.strict) schemaKeys = new Set([...formData.keys()].filter((key) => !key.startsWith("__superform_")));
	else {
		let unionKeys = [];
		if (schema.anyOf || schema.oneOf) {
			const info = schemaInfo(schema, false, []);
			if (info.union?.some((s) => s.type !== "object")) throw new SchemaError("All form types must be an object if schema is a union.");
			unionKeys = info.union?.flatMap((s) => Object.keys(s.properties ?? {})) ?? [];
			if (info.union && info.union.length > 1) for (const variant of info.union) {
				const variantProps = variant.properties ?? {};
				const variantPropKeys = Object.keys(variantProps);
				let isMatch = true;
				for (const propKey of variantPropKeys) {
					const prop = variantProps[propKey];
					if (typeof prop !== "boolean" && prop?.const !== void 0) {
						if (formData.get(propKey) !== String(prop.const)) {
							isMatch = false;
							break;
						}
					}
				}
				if (isMatch) {
					discriminatedUnionSchema = variant;
					break;
				}
			}
		}
		schemaKeys = new Set([
			...unionKeys,
			...Object.keys(schema.properties ?? {}),
			...schema.additionalProperties ? formData.keys() : []
		].filter((key) => !key.startsWith("__superform_")));
	}
	function parseSingleEntry(key, entry, info) {
		if (options?.preprocessed && options.preprocessed.includes(key)) return entry;
		if (entry && typeof entry !== "string") return !(legacyMode ? options?.allowFiles === true : options?.allowFiles !== false) ? void 0 : entry.size ? entry : info.isNullable ? null : void 0;
		if (info.types.length > 1 && !isCompatibleTypeUnion(info.types)) throw new SchemaError(unionError, key);
		let [type] = info.types;
		if (entry && !info.types.length && info.schema.enum) if (info.schema.enum.includes(entry)) type = "string";
		else type = Number.isInteger(parseInt(entry, 10)) ? "integer" : "string";
		return parseFormDataEntry(key, entry, type ?? "any", info, fromURL);
	}
	const defaultPropertyType = typeof schema.additionalProperties == "object" ? schema.additionalProperties : { type: "string" };
	for (const key of schemaKeys) {
		const property = discriminatedUnionSchema?.properties ? discriminatedUnionSchema.properties[key] : schema.properties ? schema.properties[key] : defaultPropertyType;
		assertSchema(property, key);
		const info = schemaInfo(property ?? defaultPropertyType, !schema.required?.includes(key), [key]);
		if (!info) continue;
		if (!info.types.includes("boolean") && !schema.additionalProperties && !formData.has(key)) continue;
		const entries = formData.getAll(key);
		if (info.union && info.union.length > 1 && !isCompatibleUnionSchema(info.union)) throw new SchemaError(unionError, key);
		if (info.types.includes("array") || info.types.includes("set")) {
			const items = property.items ?? (info.union?.length == 1 ? info.union[0] : void 0);
			if (!items || typeof items == "boolean" || Array.isArray(items) && items.length != 1) throw new SchemaError("Arrays must have a single \"items\" property that defines its type.", key);
			const arrayType = Array.isArray(items) ? items[0] : items;
			assertSchema(arrayType, key);
			const arrayInfo = schemaInfo(arrayType, info.isOptional, [key]);
			if (!arrayInfo) continue;
			const isFileArray = entries.length && entries.some((e) => e && typeof e !== "string");
			const arrayData = entries.map((e) => parseSingleEntry(key, e, arrayInfo));
			if (isFileArray && arrayData.every((file) => !file)) arrayData.length = 0;
			output[key] = info.types.includes("set") ? new Set(arrayData) : arrayData;
		} else output[key] = parseSingleEntry(key, entries[entries.length - 1], info);
	}
	return output;
}
function parseFormDataEntry(key, value, type, info, fromURL = false) {
	if (!value) {
		if (!fromURL && type == "boolean" && info.isOptional && info.schema.default === true) return false;
		const defaultValue$1 = defaultValues(info.schema, info.isOptional, [key]);
		if (info.schema.enum && defaultValue$1 !== null && defaultValue$1 !== void 0) return value;
		if ("const" in info.schema) return value;
		if (defaultValue$1 !== void 0) return defaultValue$1;
		if (info.isNullable) return null;
		if (info.isOptional) return void 0;
	}
	function typeError() {
		throw new SchemaError(type[0].toUpperCase() + type.slice(1) + " type found. Set the dataType option to \"json\" and add use:enhance on the client to use nested data structures. More information: https://superforms.rocks/concepts/nested-data", key);
	}
	switch (type) {
		case "string":
		case "any": return value;
		case "integer": return parseInt(value ?? "", 10);
		case "number": return parseFloat(value ?? "");
		case "boolean": return Boolean(value == "false" ? "" : value).valueOf();
		case "stringbool": return value;
		case "unix-time": {
			const date = new Date(value ?? "");
			return !isNaN(date) ? date : void 0;
		}
		case "int64":
		case "bigint": return BigInt(value ?? ".");
		case "symbol": return Symbol(String(value));
		case "set":
		case "array":
		case "object": return typeError();
		default: throw new SuperFormError("Unsupported schema type for FormData: " + type);
	}
}
async function superValidate(data, adapter, options) {
	if (data && "superFormValidationLibrary" in data) {
		options = adapter;
		adapter = data;
		data = void 0;
	}
	const validator = adapter;
	const defaults$1 = options?.defaults ?? validator.defaults;
	const jsonSchema = validator.jsonSchema;
	const parsed = await parseRequest(data, jsonSchema, options);
	const addErrors = options?.errors ?? (options?.strict ? true : !!parsed.data);
	const parsedData = options?.strict ? parsed.data ?? {} : mergeDefaults(parsed.data, defaults$1);
	let status;
	if (!!parsed.data || addErrors) status = await validator.validate(parsedData);
	else status = {
		success: false,
		issues: []
	};
	const valid = status.success;
	const errors = valid || !addErrors ? {} : mapErrors(status.issues, validator.shape);
	const dataWithDefaults = valid ? status.data : replaceInvalidDefaults(options?.strict ? mergeDefaults(parsedData, defaults$1) : parsedData, defaults$1, jsonSchema, status.issues, options?.preprocessed);
	let outputData;
	if (jsonSchema.additionalProperties === false) {
		outputData = {};
		for (const key of Object.keys(jsonSchema.properties ?? {})) if (key in dataWithDefaults) outputData[key] = dataWithDefaults[key];
	} else outputData = dataWithDefaults;
	const output = {
		id: parsed.id ?? options?.id ?? validator.id,
		valid,
		posted: parsed.posted,
		errors,
		data: outputData
	};
	if (!parsed.posted) {
		output.constraints = validator.constraints;
		if (Object.keys(validator.shape).length) output.shape = validator.shape;
	}
	return output;
}
var require_memoize = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	function isPrimitive(value) {
		return typeof value !== "object" && typeof value !== "function" || value === null;
	}
	function MapTree() {
		this.childBranches = /* @__PURE__ */ new WeakMap();
		this.primitiveKeys = /* @__PURE__ */ new Map();
		this.hasValue = false;
		this.value = void 0;
	}
	MapTree.prototype.has = function has(key) {
		var keyObject = isPrimitive(key) ? this.primitiveKeys.get(key) : key;
		return keyObject ? this.childBranches.has(keyObject) : false;
	};
	MapTree.prototype.get = function get$1(key) {
		var keyObject = isPrimitive(key) ? this.primitiveKeys.get(key) : key;
		return keyObject ? this.childBranches.get(keyObject) : void 0;
	};
	MapTree.prototype.resolveBranch = function resolveBranch(key) {
		if (this.has(key)) return this.get(key);
		var newBranch = new MapTree();
		var keyObject = this.createKey(key);
		this.childBranches.set(keyObject, newBranch);
		return newBranch;
	};
	MapTree.prototype.setValue = function setValue(value) {
		this.hasValue = true;
		return this.value = value;
	};
	MapTree.prototype.createKey = function createKey(key) {
		if (isPrimitive(key)) {
			var keyObject = {};
			this.primitiveKeys.set(key, keyObject);
			return keyObject;
		}
		return key;
	};
	MapTree.prototype.clear = function clear() {
		if (arguments.length === 0) {
			this.childBranches = /* @__PURE__ */ new WeakMap();
			this.primitiveKeys.clear();
			this.hasValue = false;
			this.value = void 0;
		} else if (arguments.length === 1) {
			var key = arguments[0];
			if (isPrimitive(key)) {
				var keyObject = this.primitiveKeys.get(key);
				if (keyObject) {
					this.childBranches.delete(keyObject);
					this.primitiveKeys.delete(key);
				}
			} else this.childBranches.delete(key);
		} else {
			var childKey = arguments[0];
			if (this.has(childKey)) {
				var childBranch = this.get(childKey);
				childBranch.clear.apply(childBranch, Array.prototype.slice.call(arguments, 1));
			}
		}
	};
	module.exports = function memoize$1(fn) {
		var argsTree = new MapTree();
		function memoized() {
			var args = Array.prototype.slice.call(arguments);
			var argNode = args.reduce(function getBranch(parentBranch, arg) {
				return parentBranch.resolveBranch(arg);
			}, argsTree);
			if (argNode.hasValue) return argNode.value;
			var value = fn.apply(null, args);
			return argNode.setValue(value);
		}
		memoized.clear = argsTree.clear.bind(argsTree);
		return memoized;
	};
}));
var memoize = (/* @__PURE__ */ __toESM((/* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = require_memoize();
})))(), 1)).default;
function assert(condition, errorMessage) {
	if (!condition) throw new Error(errorMessage);
}
var TYPES = {
	alternatives: (schema, joi, transformer) => {
		const result = schema.oneOf = [];
		joi.matches.forEach(function(match) {
			if (match.schema) return result.push(convert(match.schema, transformer));
			if (!match.is) throw new Error("joi.when requires an \"is\"");
			if (!(match.then || match.otherwise)) throw new Error("joi.when requires one or both of \"then\" and \"otherwise\"");
			if (match.then) result.push(convert(match.then, transformer));
			if (match.otherwise) result.push(convert(match.otherwise, transformer));
		});
		return schema;
	},
	date: (schema) => {
		schema.type = "Date";
		return schema;
	},
	any: (schema) => {
		delete schema.type;
		return schema;
	},
	array: (schema, joi, transformer) => {
		schema.type = "array";
		joi._rules?.forEach((test) => {
			switch (test.name) {
				case "unique":
					schema.uniqueItems = true;
					break;
				case "length":
					schema.minItems = schema.maxItems = test.args.limit;
					break;
				case "min":
					schema.minItems = test.args.limit;
					break;
				case "max":
					schema.maxItems = test.args.limit;
					break;
			}
		});
		if (joi.$_terms) {
			let list;
			if (joi.$_terms._inclusions.length) list = joi.$_terms._inclusions;
			else if (joi.$_terms._requireds.length) list = joi.$_terms._requireds;
			if (list) schema.items = convert(list[0], transformer);
		}
		return schema;
	},
	binary: (schema, joi) => {
		schema.type = "string";
		schema.contentMediaType = joi._meta.length > 0 && joi._meta[0].contentMediaType ? joi._meta[0].contentMediaType : "text/plain";
		schema.contentEncoding = joi._flags.encoding ? joi._flags.encoding : "binary";
		return schema;
	},
	boolean: (schema) => {
		schema.type = "boolean";
		return schema;
	},
	number: (schema, joi) => {
		schema.type = "number";
		joi._rules?.forEach((test) => {
			switch (test.name) {
				case "integer":
					schema.type = "integer";
					break;
				case "less":
					schema.exclusiveMaximum = test.args.limit;
					break;
				case "greater":
					schema.exclusiveMinimum = test.args.limit;
					break;
				case "min":
					schema.minimum = test.args.limit;
					break;
				case "max":
					schema.maximum = test.args.limit;
					break;
				case "precision": {
					let multipleOf;
					if (test.args.limit && test.args.limit > 1) multipleOf = JSON.parse("0." + "0".repeat(test.args.limit - 1) + "1");
					else multipleOf = 1;
					schema.multipleOf = multipleOf;
					break;
				}
			}
		});
		return schema;
	},
	string: (schema, joi) => {
		schema.type = "string";
		joi._rules.forEach((test) => {
			switch (test.name) {
				case "email":
					schema.format = "email";
					break;
				case "pattern":
				case "regex": {
					const arg = test.args;
					const pattern = arg && arg.regex ? arg.regex : arg;
					schema.pattern = String(pattern).replace(/^\//, "").replace(/\/$/, "");
					break;
				}
				case "min":
					schema.minLength = test.args.limit;
					break;
				case "max":
					schema.maxLength = test.args.limit;
					break;
				case "length":
					schema.minLength = schema.maxLength = test.args.limit;
					break;
				case "uri":
					schema.format = "uri";
					break;
			}
		});
		return schema;
	},
	object: (schema, joi, transformer) => {
		schema.type = "object";
		schema.properties = {};
		schema.additionalProperties = Boolean(joi._flags.allowUnknown || !joi._inner.children);
		schema.pattern = joi.patterns?.map((pattern) => {
			return {
				regex: pattern.regex,
				rule: convert(pattern.rule, transformer)
			};
		}) ?? [];
		if (!joi.$_terms.keys?.length) return schema;
		joi.$_terms.keys.forEach((property) => {
			if (property.schema._flags.presence !== "forbidden") {
				if (!schema.properties) schema.properties = {};
				schema.properties[property.key] = convert(property.schema, transformer);
				if (property.schema._flags.presence === "required" || property.schema._settings && property.schema._settings.presence === "required" && property.schema._flags.presence !== "optional") {
					schema.required = schema.required || [];
					schema.required.push(property.key);
				}
			}
		});
		return schema;
	}
};
function convert(joi, transformer) {
	assert("object" === typeof joi && "type" in joi, "requires a joi schema object");
	if (!TYPES[joi.type]) throw new Error(`sorry, do not know how to convert unknown joi type: "${joi.type}"`);
	if (transformer) assert("function" === typeof transformer, "transformer must be a function");
	const schema = {};
	if (joi._description) schema.description = joi._description;
	if (joi._examples && joi._examples.length > 0) schema.examples = joi._examples.map((e) => e.value);
	if (joi._examples && joi._examples.length === 1) schema.examples = joi._examples[0].value;
	if (joi._settings && joi._settings.language && joi._settings.language.label) schema.title = joi._settings.language.label;
	else if (joi._flags && joi._flags.label) schema.title = joi._flags.label;
	if (joi._flags && joi._flags.default !== void 0 && joi._flags.default !== null) schema["default"] = joi._flags.default;
	if (joi._valids && joi._valids._set && (joi._valids._set.size || joi._valids._set.length)) {
		if (Array.isArray(joi.children) || !joi._flags.allowOnly) return { anyOf: [{
			type: joi.type,
			enum: [...joi._valids._set]
		}, TYPES[joi.type](schema, joi, transformer)] };
		schema["enum"] = [...joi._valids._set];
	}
	let result = TYPES[joi.type](schema, joi, transformer);
	if (transformer) result = transformer(result, joi);
	if (joi._valids?._values && joi._valids._values.size && !joi._flags.allowOnly) {
		const constants = Array.from(joi._valids._values).map((v) => ({ const: v }));
		if (result.anyOf) result.anyOf = [...constants, ...result.anyOf];
		else result = { anyOf: [...constants, result] };
	}
	return result;
}
convert.TYPES = TYPES;
var ByteMarker;
(function(ByteMarker$1) {
	ByteMarker$1[ByteMarker$1["Array"] = 0] = "Array";
	ByteMarker$1[ByteMarker$1["BigInt"] = 1] = "BigInt";
	ByteMarker$1[ByteMarker$1["Boolean"] = 2] = "Boolean";
	ByteMarker$1[ByteMarker$1["Date"] = 3] = "Date";
	ByteMarker$1[ByteMarker$1["Constructor"] = 4] = "Constructor";
	ByteMarker$1[ByteMarker$1["Function"] = 5] = "Function";
	ByteMarker$1[ByteMarker$1["Null"] = 6] = "Null";
	ByteMarker$1[ByteMarker$1["Number"] = 7] = "Number";
	ByteMarker$1[ByteMarker$1["Object"] = 8] = "Object";
	ByteMarker$1[ByteMarker$1["RegExp"] = 9] = "RegExp";
	ByteMarker$1[ByteMarker$1["String"] = 10] = "String";
	ByteMarker$1[ByteMarker$1["Symbol"] = 11] = "Symbol";
	ByteMarker$1[ByteMarker$1["TypeArray"] = 12] = "TypeArray";
	ByteMarker$1[ByteMarker$1["Undefined"] = 13] = "Undefined";
})(ByteMarker || (ByteMarker = {}));
Array.from({ length: 256 }).map((_, i) => BigInt(i));
var F64 = new Float64Array(1);
new DataView(F64.buffer);
new Uint8Array(F64.buffer);
new TextEncoder();
const IntegerPattern = "-?(?:0|[1-9][0-9]*)";
const NumberPattern = "-?(?:0|[1-9][0-9]*)(?:.[0-9]+)?";
`${IntegerPattern}`;
`${NumberPattern}`;
function Range(start, end) {
	return Array.from({ length: end - start + 1 }, (_, i) => String.fromCharCode(start + i));
}
const Alpha = [...Range(97, 122), ...Range(65, 90)];
const Digit = ["0", ...Range(49, 57)];
[...Digit];
[...[
	...Alpha,
	"_",
	"$"
], ...Digit];
[...Digit];
function addError(errors, message) {
	if (errors) {
		errors.push(message);
		return errors;
	}
	return [message];
}
function handleError(message, config) {
	switch (config?.errorMode) {
		case "ignore": break;
		case "warn":
			console.warn(message);
			break;
		default: throw new Error(message);
	}
}
function convertAction(jsonSchema, valibotAction, config) {
	if (config?.ignoreActions?.includes(valibotAction.type)) return jsonSchema;
	let errors;
	switch (valibotAction.type) {
		case "base64":
			jsonSchema.contentEncoding = "base64";
			break;
		case "bic":
		case "cuid2":
		case "decimal":
		case "digits":
		case "emoji":
		case "hexadecimal":
		case "hex_color":
		case "nanoid":
		case "octal":
		case "ulid":
			jsonSchema.pattern = valibotAction.requirement.source;
			break;
		case "description":
			jsonSchema.description = valibotAction.description;
			break;
		case "email":
			jsonSchema.format = "email";
			break;
		case "empty":
			if (jsonSchema.type === "array") jsonSchema.maxItems = 0;
			else {
				if (jsonSchema.type !== "string") errors = addError(errors, `The "${valibotAction.type}" action is not supported on type "${jsonSchema.type}".`);
				jsonSchema.maxLength = 0;
			}
			break;
		case "entries":
			jsonSchema.minProperties = valibotAction.requirement;
			jsonSchema.maxProperties = valibotAction.requirement;
			break;
		case "examples":
			if (Array.isArray(jsonSchema.examples)) jsonSchema.examples = [...jsonSchema.examples, ...valibotAction.examples];
			else jsonSchema.examples = valibotAction.examples;
			break;
		case "integer":
			jsonSchema.type = "integer";
			break;
		case "ipv4":
			jsonSchema.format = "ipv4";
			break;
		case "ipv6":
			jsonSchema.format = "ipv6";
			break;
		case "iso_date":
			jsonSchema.format = "date";
			break;
		case "iso_date_time":
		case "iso_timestamp":
			jsonSchema.format = "date-time";
			break;
		case "iso_time":
			jsonSchema.format = "time";
			break;
		case "length":
			if (jsonSchema.type === "array") {
				jsonSchema.minItems = valibotAction.requirement;
				jsonSchema.maxItems = valibotAction.requirement;
			} else {
				if (jsonSchema.type !== "string") errors = addError(errors, `The "${valibotAction.type}" action is not supported on type "${jsonSchema.type}".`);
				jsonSchema.minLength = valibotAction.requirement;
				jsonSchema.maxLength = valibotAction.requirement;
			}
			break;
		case "max_entries":
			jsonSchema.maxProperties = valibotAction.requirement;
			break;
		case "max_length":
			if (jsonSchema.type === "array") jsonSchema.maxItems = valibotAction.requirement;
			else {
				if (jsonSchema.type !== "string") errors = addError(errors, `The "${valibotAction.type}" action is not supported on type "${jsonSchema.type}".`);
				jsonSchema.maxLength = valibotAction.requirement;
			}
			break;
		case "max_value":
			if (jsonSchema.type !== "number" && jsonSchema.type !== "integer") errors = addError(errors, `The "max_value" action is not supported on type "${jsonSchema.type}".`);
			jsonSchema.maximum = valibotAction.requirement;
			break;
		case "metadata":
			if (typeof valibotAction.metadata.title === "string") jsonSchema.title = valibotAction.metadata.title;
			if (typeof valibotAction.metadata.description === "string") jsonSchema.description = valibotAction.metadata.description;
			if (Array.isArray(valibotAction.metadata.examples)) if (Array.isArray(jsonSchema.examples)) jsonSchema.examples = [...jsonSchema.examples, ...valibotAction.metadata.examples];
			else jsonSchema.examples = valibotAction.metadata.examples;
			break;
		case "min_entries":
			jsonSchema.minProperties = valibotAction.requirement;
			break;
		case "min_length":
			if (jsonSchema.type === "array") jsonSchema.minItems = valibotAction.requirement;
			else {
				if (jsonSchema.type !== "string") errors = addError(errors, `The "${valibotAction.type}" action is not supported on type "${jsonSchema.type}".`);
				jsonSchema.minLength = valibotAction.requirement;
			}
			break;
		case "min_value":
			if (jsonSchema.type !== "number" && jsonSchema.type !== "integer") errors = addError(errors, `The "min_value" action is not supported on type "${jsonSchema.type}".`);
			jsonSchema.minimum = valibotAction.requirement;
			break;
		case "multiple_of":
			jsonSchema.multipleOf = valibotAction.requirement;
			break;
		case "non_empty":
			if (jsonSchema.type === "array") jsonSchema.minItems = 1;
			else {
				if (jsonSchema.type !== "string") errors = addError(errors, `The "${valibotAction.type}" action is not supported on type "${jsonSchema.type}".`);
				jsonSchema.minLength = 1;
			}
			break;
		case "regex":
			if (valibotAction.requirement.flags) errors = addError(errors, "RegExp flags are not supported by JSON Schema.");
			jsonSchema.pattern = valibotAction.requirement.source;
			break;
		case "title":
			jsonSchema.title = valibotAction.title;
			break;
		case "url":
			jsonSchema.format = "uri";
			break;
		case "uuid":
			jsonSchema.format = "uuid";
			break;
		case "value":
			jsonSchema.const = valibotAction.requirement;
			break;
		default: errors = addError(errors, `The "${valibotAction.type}" action cannot be converted to JSON Schema.`);
	}
	if (config?.overrideAction) {
		const actionOverride = config.overrideAction({
			valibotAction,
			jsonSchema,
			errors
		});
		if (actionOverride) return { ...actionOverride };
	}
	if (errors) for (const message of errors) handleError(message, config);
	return jsonSchema;
}
function flattenPipe(pipe) {
	return pipe.flatMap((item) => "pipe" in item ? flattenPipe(item.pipe) : item);
}
var refCount = 0;
function convertSchema(jsonSchema, valibotSchema, config, context, skipRef = false) {
	if (!skipRef) {
		const referenceId = context.referenceMap.get(valibotSchema);
		if (referenceId) {
			jsonSchema.$ref = `#/$defs/${referenceId}`;
			if (config?.overrideRef) {
				const refOverride = config.overrideRef({
					...context,
					referenceId,
					valibotSchema,
					jsonSchema
				});
				if (refOverride) jsonSchema.$ref = refOverride;
			}
			return jsonSchema;
		}
	}
	if ("pipe" in valibotSchema) {
		const flatPipe = flattenPipe(valibotSchema.pipe);
		let startIndex = 0;
		let stopIndex = flatPipe.length - 1;
		if (config?.typeMode === "input") {
			const inputStopIndex = flatPipe.slice(1).findIndex((item) => item.kind === "schema" || item.kind === "transformation" && (item.type === "find_item" || item.type === "parse_json" || item.type === "raw_transform" || item.type === "reduce_items" || item.type === "stringify_json" || item.type === "to_bigint" || item.type === "to_boolean" || item.type === "to_date" || item.type === "to_number" || item.type === "to_string" || item.type === "transform"));
			if (inputStopIndex !== -1) stopIndex = inputStopIndex;
		} else if (config?.typeMode === "output") {
			const outputStartIndex = flatPipe.findLastIndex((item) => item.kind === "schema");
			if (outputStartIndex !== -1) startIndex = outputStartIndex;
		}
		for (let index = startIndex; index <= stopIndex; index++) {
			const valibotPipeItem = flatPipe[index];
			if (valibotPipeItem.kind === "schema") {
				if (index > startIndex) handleError("Set the \"typeMode\" config to \"input\" or \"output\" to convert pipelines with multiple schemas.", config);
				jsonSchema = convertSchema(jsonSchema, valibotPipeItem, config, context, true);
			} else jsonSchema = convertAction(jsonSchema, valibotPipeItem, config);
		}
		return jsonSchema;
	}
	let errors;
	switch (valibotSchema.type) {
		case "boolean":
			jsonSchema.type = "boolean";
			break;
		case "null":
			if (config?.target === "openapi-3.0") jsonSchema.enum = [null];
			else jsonSchema.type = "null";
			break;
		case "number":
			jsonSchema.type = "number";
			break;
		case "string":
			jsonSchema.type = "string";
			break;
		case "array":
			jsonSchema.type = "array";
			jsonSchema.items = convertSchema({}, valibotSchema.item, config, context);
			break;
		case "tuple":
		case "tuple_with_rest":
		case "loose_tuple":
		case "strict_tuple":
			jsonSchema.type = "array";
			if (config?.target === "openapi-3.0") {
				jsonSchema.items = { anyOf: [] };
				jsonSchema.minItems = valibotSchema.items.length;
				for (const item of valibotSchema.items) jsonSchema.items.anyOf.push(convertSchema({}, item, config, context));
				if (valibotSchema.type === "tuple_with_rest") jsonSchema.items.anyOf.push(convertSchema({}, valibotSchema.rest, config, context));
				else if (valibotSchema.type === "strict_tuple" || valibotSchema.type === "tuple") jsonSchema.maxItems = valibotSchema.items.length;
			} else if (config?.target === "draft-2020-12") {
				jsonSchema.prefixItems = [];
				jsonSchema.minItems = valibotSchema.items.length;
				for (const item of valibotSchema.items) jsonSchema.prefixItems.push(convertSchema({}, item, config, context));
				if (valibotSchema.type === "tuple_with_rest") jsonSchema.items = convertSchema({}, valibotSchema.rest, config, context);
				else if (valibotSchema.type === "strict_tuple") jsonSchema.items = false;
			} else {
				jsonSchema.items = [];
				jsonSchema.minItems = valibotSchema.items.length;
				for (const item of valibotSchema.items) jsonSchema.items.push(convertSchema({}, item, config, context));
				if (valibotSchema.type === "tuple_with_rest") jsonSchema.additionalItems = convertSchema({}, valibotSchema.rest, config, context);
				else if (valibotSchema.type === "strict_tuple") jsonSchema.additionalItems = false;
			}
			break;
		case "object":
		case "object_with_rest":
		case "loose_object":
		case "strict_object":
			jsonSchema.type = "object";
			jsonSchema.properties = {};
			jsonSchema.required = [];
			for (const key in valibotSchema.entries) {
				const entry = valibotSchema.entries[key];
				jsonSchema.properties[key] = convertSchema({}, entry, config, context);
				if (entry.type !== "exact_optional" && entry.type !== "nullish" && entry.type !== "optional") jsonSchema.required.push(key);
			}
			if (valibotSchema.type === "object_with_rest") jsonSchema.additionalProperties = convertSchema({}, valibotSchema.rest, config, context);
			else if (valibotSchema.type === "strict_object") jsonSchema.additionalProperties = false;
			break;
		case "record":
			if (config?.target === "openapi-3.0" && "pipe" in valibotSchema.key) errors = addError(errors, "The \"record\" schema with a schema for the key that contains a \"pipe\" cannot be converted to JSON Schema.");
			if (valibotSchema.key.type !== "string") errors = addError(errors, `The "record" schema with the "${valibotSchema.key.type}" schema for the key cannot be converted to JSON Schema.`);
			jsonSchema.type = "object";
			if (config?.target !== "openapi-3.0") jsonSchema.propertyNames = convertSchema({}, valibotSchema.key, config, context);
			jsonSchema.additionalProperties = convertSchema({}, valibotSchema.value, config, context);
			break;
		case "any":
		case "unknown": break;
		case "nullable":
		case "nullish":
			if (config?.target === "openapi-3.0") {
				const innerSchema = convertSchema({}, valibotSchema.wrapped, config, context);
				Object.assign(jsonSchema, innerSchema);
				jsonSchema.nullable = true;
			} else jsonSchema.anyOf = [convertSchema({}, valibotSchema.wrapped, config, context), { type: "null" }];
			if (valibotSchema.default !== void 0) jsonSchema.default = getDefault(valibotSchema);
			break;
		case "exact_optional":
		case "optional":
		case "undefinedable":
			jsonSchema = convertSchema(jsonSchema, valibotSchema.wrapped, config, context);
			if (valibotSchema.default !== void 0) jsonSchema.default = getDefault(valibotSchema);
			break;
		case "literal":
			if (typeof valibotSchema.literal !== "boolean" && typeof valibotSchema.literal !== "number" && typeof valibotSchema.literal !== "string") errors = addError(errors, "The value of the \"literal\" schema is not JSON compatible.");
			if (config?.target === "openapi-3.0") jsonSchema.enum = [valibotSchema.literal];
			else jsonSchema.const = valibotSchema.literal;
			break;
		case "enum":
			jsonSchema.enum = valibotSchema.options;
			break;
		case "picklist":
			if (valibotSchema.options.some((option) => typeof option !== "number" && typeof option !== "string")) errors = addError(errors, "An option of the \"picklist\" schema is not JSON compatible.");
			jsonSchema.enum = valibotSchema.options;
			break;
		case "union":
			jsonSchema.anyOf = valibotSchema.options.map((option) => convertSchema({}, option, config, context));
			break;
		case "variant":
			jsonSchema.oneOf = valibotSchema.options.map((option) => convertSchema({}, option, config, context));
			break;
		case "intersect":
			jsonSchema.allOf = valibotSchema.options.map((option) => convertSchema({}, option, config, context));
			break;
		case "lazy": {
			let wrappedValibotSchema = context.getterMap.get(valibotSchema.getter);
			if (!wrappedValibotSchema) {
				wrappedValibotSchema = valibotSchema.getter(void 0);
				context.getterMap.set(valibotSchema.getter, wrappedValibotSchema);
			}
			let referenceId = context.referenceMap.get(wrappedValibotSchema);
			if (!referenceId) {
				referenceId = `${refCount++}`;
				context.referenceMap.set(wrappedValibotSchema, referenceId);
				context.definitions[referenceId] = convertSchema({}, wrappedValibotSchema, config, context, true);
			}
			jsonSchema.$ref = `#/$defs/${referenceId}`;
			if (config?.overrideRef) {
				const refOverride = config.overrideRef({
					...context,
					referenceId,
					valibotSchema: wrappedValibotSchema,
					jsonSchema
				});
				if (refOverride) jsonSchema.$ref = refOverride;
			}
			break;
		}
		default: errors = addError(errors, `The "${valibotSchema.type}" schema cannot be converted to JSON Schema.`);
	}
	if (config?.overrideSchema) {
		const schemaOverride = config.overrideSchema({
			...context,
			referenceId: context.referenceMap.get(valibotSchema),
			valibotSchema,
			jsonSchema,
			errors
		});
		if (schemaOverride) return { ...schemaOverride };
	}
	if (errors) for (const message of errors) handleError(message, config);
	return jsonSchema;
}
var store;
function getGlobalDefs() {
	return store;
}
function toJsonSchema(schema, config) {
	const context = {
		definitions: {},
		referenceMap: /* @__PURE__ */ new Map(),
		getterMap: /* @__PURE__ */ new Map()
	};
	const definitions = config?.definitions ?? getGlobalDefs();
	if (definitions) {
		for (const key in definitions) context.referenceMap.set(definitions[key], key);
		for (const key in definitions) context.definitions[key] = convertSchema({}, definitions[key], config, context, true);
	}
	const jsonSchema = convertSchema({}, schema, config, context);
	const target = config?.target ?? "draft-07";
	if (target === "draft-2020-12") jsonSchema.$schema = "https://json-schema.org/draft/2020-12/schema";
	else if (target === "draft-07") jsonSchema.$schema = "http://json-schema.org/draft-07/schema#";
	if (context.referenceMap.size) jsonSchema.$defs = context.definitions;
	return jsonSchema;
}
var defaultOptions = {
	ignoreActions: [
		"transform",
		"mime_type",
		"max_size",
		"min_size",
		"starts_with"
	],
	overrideSchema: (context) => {
		const type = context.valibotSchema.type;
		if (type === "date") return {
			type: "integer",
			format: "unix-time"
		};
		if (type === "bigint") return {
			type: "string",
			format: "bigint"
		};
		if (type === "file" || type === "blob" || type === "instance" || type === "custom") return {};
	}
};
const valibotToJSONSchema = /* @__NO_SIDE_EFFECTS__ */ (options) => {
	const { schema, ...rest } = options;
	return toJsonSchema(schema, {
		...defaultOptions,
		...rest
	});
};
async function _validate(schema, data, config) {
	const result = await safeParseAsync(schema, data, config);
	if (result.success) return {
		data: result.output,
		success: true
	};
	return {
		issues: result.issues.map(({ message, path }) => ({
			message,
			path: path?.map(({ key }) => key)
		})),
		success: false
	};
}
function _valibot(schema, options = {}) {
	return /* @__PURE__ */ createAdapter({
		superFormValidationLibrary: "valibot",
		validate: async (data) => _validate(schema, data, options?.config),
		jsonSchema: options?.jsonSchema ?? /* @__PURE__ */ valibotToJSONSchema({
			schema,
			...options
		}),
		defaults: "defaults" in options ? options.defaults : void 0
	});
}
const valibot = /* @__PURE__ */ memoize(_valibot);
export { superForm as i, superValidate as n, defaults as r, valibot as t };
