import { Jt as false_default, Yt as true_default } from "./DUscB9kS.js";
import { n as app$1, o as invalidateAll, r as applyAction } from "./D365qDux.js";
function encode64(arraybuffer) {
	const dv = new DataView(arraybuffer);
	let binaryString = "";
	for (let i = 0; i < arraybuffer.byteLength; i++) binaryString += String.fromCharCode(dv.getUint8(i));
	return binaryToAscii(binaryString);
}
function decode64(string) {
	const binaryString = asciiToBinary(string);
	const arraybuffer = new ArrayBuffer(binaryString.length);
	const dv = new DataView(arraybuffer);
	for (let i = 0; i < arraybuffer.byteLength; i++) dv.setUint8(i, binaryString.charCodeAt(i));
	return arraybuffer;
}
var KEY_STRING = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
function asciiToBinary(data) {
	if (data.length % 4 === 0) data = data.replace(/==?$/, "");
	let output = "";
	let buffer = 0;
	let accumulatedBits = 0;
	for (let i = 0; i < data.length; i++) {
		buffer <<= 6;
		buffer |= KEY_STRING.indexOf(data[i]);
		accumulatedBits += 6;
		if (accumulatedBits === 24) {
			output += String.fromCharCode((buffer & 16711680) >> 16);
			output += String.fromCharCode((buffer & 65280) >> 8);
			output += String.fromCharCode(buffer & 255);
			buffer = accumulatedBits = 0;
		}
	}
	if (accumulatedBits === 12) {
		buffer >>= 4;
		output += String.fromCharCode(buffer);
	} else if (accumulatedBits === 18) {
		buffer >>= 2;
		output += String.fromCharCode((buffer & 65280) >> 8);
		output += String.fromCharCode(buffer & 255);
	}
	return output;
}
function binaryToAscii(str) {
	let out = "";
	for (let i = 0; i < str.length; i += 3) {
		const groupsOfSix = [
			void 0,
			void 0,
			void 0,
			void 0
		];
		groupsOfSix[0] = str.charCodeAt(i) >> 2;
		groupsOfSix[1] = (str.charCodeAt(i) & 3) << 4;
		if (str.length > i + 1) {
			groupsOfSix[1] |= str.charCodeAt(i + 1) >> 4;
			groupsOfSix[2] = (str.charCodeAt(i + 1) & 15) << 2;
		}
		if (str.length > i + 2) {
			groupsOfSix[2] |= str.charCodeAt(i + 2) >> 6;
			groupsOfSix[3] = str.charCodeAt(i + 2) & 63;
		}
		for (let j = 0; j < groupsOfSix.length; j++) if (typeof groupsOfSix[j] === "undefined") out += "=";
		else out += KEY_STRING[groupsOfSix[j]];
	}
	return out;
}
const UNDEFINED = -1;
const HOLE = -2;
const NAN = -3;
const POSITIVE_INFINITY = -4;
const NEGATIVE_INFINITY = -5;
const NEGATIVE_ZERO = -6;
function parse(serialized, revivers) {
	return unflatten(JSON.parse(serialized), revivers);
}
function unflatten(parsed, revivers) {
	if (typeof parsed === "number") return hydrate(parsed, true);
	if (!Array.isArray(parsed) || parsed.length === 0) throw new Error("Invalid input");
	const values = parsed;
	const hydrated = Array(values.length);
	function hydrate(index, standalone = false) {
		if (index === -1) return void 0;
		if (index === -3) return NaN;
		if (index === -4) return Infinity;
		if (index === -5) return -Infinity;
		if (index === -6) return -0;
		if (standalone || typeof index !== "number") throw new Error(`Invalid input`);
		if (index in hydrated) return hydrated[index];
		const value = values[index];
		if (!value || typeof value !== "object") hydrated[index] = value;
		else if (Array.isArray(value)) if (typeof value[0] === "string") {
			const type = value[0];
			const reviver = revivers && Object.hasOwn(revivers, type) ? revivers[type] : void 0;
			if (reviver) {
				let i = value[1];
				if (typeof i !== "number") i = values.push(value[1]) - 1;
				return hydrated[index] = reviver(hydrate(i));
			}
			switch (type) {
				case "Date":
					hydrated[index] = new Date(value[1]);
					break;
				case "Set":
					const set = /* @__PURE__ */ new Set();
					hydrated[index] = set;
					for (let i = 1; i < value.length; i += 1) set.add(hydrate(value[i]));
					break;
				case "Map":
					const map = /* @__PURE__ */ new Map();
					hydrated[index] = map;
					for (let i = 1; i < value.length; i += 2) map.set(hydrate(value[i]), hydrate(value[i + 1]));
					break;
				case "RegExp":
					hydrated[index] = new RegExp(value[1], value[2]);
					break;
				case "Object":
					hydrated[index] = Object(value[1]);
					break;
				case "BigInt":
					hydrated[index] = BigInt(value[1]);
					break;
				case "null":
					const obj = Object.create(null);
					hydrated[index] = obj;
					for (let i = 1; i < value.length; i += 2) obj[value[i]] = hydrate(value[i + 1]);
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
					const TypedArrayConstructor = globalThis[type];
					const typedArray = new TypedArrayConstructor(hydrate(value[1]));
					hydrated[index] = value[2] !== void 0 ? typedArray.subarray(value[2], value[3]) : typedArray;
					break;
				}
				case "ArrayBuffer": {
					const base64 = value[1];
					hydrated[index] = decode64(base64);
					break;
				}
				case "Temporal.Duration":
				case "Temporal.Instant":
				case "Temporal.PlainDate":
				case "Temporal.PlainTime":
				case "Temporal.PlainDateTime":
				case "Temporal.PlainMonthDay":
				case "Temporal.PlainYearMonth":
				case "Temporal.ZonedDateTime": {
					const temporalName = type.slice(9);
					hydrated[index] = Temporal[temporalName].from(value[1]);
					break;
				}
				case "URL":
					hydrated[index] = new URL(value[1]);
					break;
				case "URLSearchParams":
					hydrated[index] = new URLSearchParams(value[1]);
					break;
				default: throw new Error(`Unknown type ${type}`);
			}
		} else {
			const array = new Array(value.length);
			hydrated[index] = array;
			for (let i = 0; i < value.length; i += 1) {
				const n = value[i];
				if (n === -2) continue;
				array[i] = hydrate(n);
			}
		}
		else {
			const object = {};
			hydrated[index] = object;
			for (const key in value) {
				if (key === "__proto__") throw new Error("Cannot parse an object with a `__proto__` property");
				const n = value[key];
				object[key] = hydrate(n);
			}
		}
		return hydrated[index];
	}
	return hydrate(0);
}
function deserialize(result) {
	const parsed = JSON.parse(result);
	if (parsed.data) parsed.data = parse(parsed.data, app$1.decoders);
	return parsed;
}
function clone(element) {
	return HTMLElement.prototype.cloneNode.call(element);
}
function enhance(form_element, submit = () => {}) {
	const fallback_callback = async ({ action, result, reset = true, invalidateAll: shouldInvalidateAll = true }) => {
		if (result.type === "success") {
			if (reset) HTMLFormElement.prototype.reset.call(form_element);
			if (shouldInvalidateAll) await invalidateAll();
		}
		if (location.origin + location.pathname === action.origin + action.pathname || result.type === "redirect" || result.type === "error") await applyAction(result);
	};
	async function handle_submit(event) {
		if ((event.submitter?.hasAttribute("formmethod") ? event.submitter.formMethod : clone(form_element).method) !== "post") return;
		event.preventDefault();
		const action = new URL(event.submitter?.hasAttribute("formaction") ? event.submitter.formAction : clone(form_element).action);
		const enctype = event.submitter?.hasAttribute("formenctype") ? event.submitter.formEnctype : clone(form_element).enctype;
		const form_data = new FormData(form_element, event.submitter);
		const controller = new AbortController();
		let cancelled = false;
		const cancel = () => cancelled = true;
		const callback = await submit({
			action,
			cancel,
			controller,
			formData: form_data,
			formElement: form_element,
			submitter: event.submitter
		}) ?? fallback_callback;
		if (cancelled) return;
		let result;
		try {
			const headers = new Headers({
				accept: "application/json",
				"x-sveltekit-action": "true"
			});
			if (enctype !== "multipart/form-data") headers.set("Content-Type", /^(:?application\/x-www-form-urlencoded|text\/plain)$/.test(enctype) ? enctype : "application/x-www-form-urlencoded");
			const body = enctype === "multipart/form-data" ? form_data : new URLSearchParams(form_data);
			const response = await fetch(action, {
				method: "POST",
				headers,
				cache: "no-store",
				body,
				signal: controller.signal
			});
			result = deserialize(await response.text());
			if (result.type === "error") result.status = response.status;
		} catch (error) {
			if (error?.name === "AbortError") return;
			result = {
				type: "error",
				error
			};
		}
		await callback({
			action,
			formData: form_data,
			formElement: form_element,
			update: (opts) => fallback_callback({
				action,
				result,
				reset: opts?.reset,
				invalidateAll: opts?.invalidateAll
			}),
			result
		});
	}
	HTMLFormElement.prototype.addEventListener.call(form_element, "submit", handle_submit);
	return { destroy() {
		HTMLFormElement.prototype.removeEventListener.call(form_element, "submit", handle_submit);
	} };
}
export { NAN as a, POSITIVE_INFINITY as c, HOLE as i, UNDEFINED as l, enhance as n, NEGATIVE_INFINITY as o, parse as r, NEGATIVE_ZERO as s, deserialize as t, encode64 as u };
