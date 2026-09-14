import { Ct as set$1, Tt as state, Xt as __commonJSMin, dt as effect_root, mt as user_effect, ot as get$1 } from "./DUscB9kS.js";
import { t as browser } from "./DgeI1AN1.js";
var import_browser_cookies = (/* @__PURE__ */ __commonJSMin(((exports) => {
	exports.defaults = {};
	exports.set = function(name, value, options) {
		var opts = options || {};
		var defaults = exports.defaults;
		var expires = opts.expires || defaults.expires;
		var domain = opts.domain || defaults.domain;
		var path = opts.path !== void 0 ? opts.path : defaults.path !== void 0 ? defaults.path : "/";
		var secure = opts.secure !== void 0 ? opts.secure : defaults.secure;
		var httponly = opts.httponly !== void 0 ? opts.httponly : defaults.httponly;
		var samesite = opts.samesite !== void 0 ? opts.samesite : defaults.samesite;
		var expDate = expires ? new Date(typeof expires === "number" ? (/* @__PURE__ */ new Date()).getTime() + expires * 864e5 : expires) : 0;
		document.cookie = name.replace(/[^+#$&^`|]/g, encodeURIComponent).replace("(", "%28").replace(")", "%29") + "=" + value.replace(/[^+#$&/:<-\[\]-}]/g, encodeURIComponent) + (expDate && expDate.getTime() >= 0 ? ";expires=" + expDate.toUTCString() : "") + (domain ? ";domain=" + domain : "") + (path ? ";path=" + path : "") + (secure ? ";secure" : "") + (httponly ? ";httponly" : "") + (samesite ? ";samesite=" + samesite : "");
	};
	exports.get = function(name) {
		var cookies = document.cookie.split(";");
		while (cookies.length) {
			var cookie = cookies.pop();
			var separatorIndex = cookie.indexOf("=");
			separatorIndex = separatorIndex < 0 ? cookie.length : separatorIndex;
			if (decodeURIComponent(cookie.slice(0, separatorIndex).replace(/^\s+/, "")) === name) return decodeURIComponent(cookie.slice(separatorIndex + 1));
		}
		return null;
	};
	exports.erase = function(name, options) {
		exports.set(name, "", {
			expires: -1,
			domain: options && options.domain,
			path: options && options.path,
			secure: 0,
			httponly: 0
		});
	};
	exports.all = function() {
		var all = {};
		var cookies = document.cookie.split(";");
		while (cookies.length) {
			var cookie = cookies.pop();
			var separatorIndex = cookie.indexOf("=");
			separatorIndex = separatorIndex < 0 ? cookie.length : separatorIndex;
			var cookie_name = decodeURIComponent(cookie.slice(0, separatorIndex).replace(/^\s+/, ""));
			all[cookie_name] = decodeURIComponent(cookie.slice(separatorIndex + 1));
		}
		return all;
	};
})))();
var LocalStore = class {
	#value = state();
	get value() {
		return get$1(this.#value);
	}
	set value(value) {
		set$1(this.#value, value, true);
	}
	key = "";
	constructor(key, value) {
		this.key = key;
		this.value = value;
		if (browser) {
			const item = (0, import_browser_cookies.get)(key);
			if (item) this.value = this.deserialize(item);
		}
		effect_root(() => {
			user_effect(() => {
				if (this.value) (0, import_browser_cookies.set)(this.key, this.serialize(this.value));
				else (0, import_browser_cookies.erase)(this.key);
			});
		});
	}
	serialize(value) {
		return JSON.stringify(value);
	}
	deserialize(item) {
		return JSON.parse(item);
	}
};
export { LocalStore as t };
