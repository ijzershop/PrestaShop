import { Jt as false_default, Mt as getContext, Yt as true_default } from "./DUscB9kS.js";
import { d as page$3, f as updated$1, l as stores, u as navigating$3 } from "./D365qDux.js";
const page$2 = {
	get data() {
		return page$3.data;
	},
	get error() {
		return page$3.error;
	},
	get form() {
		return page$3.form;
	},
	get params() {
		return page$3.params;
	},
	get route() {
		return page$3.route;
	},
	get state() {
		return page$3.state;
	},
	get status() {
		return page$3.status;
	},
	get url() {
		return page$3.url;
	}
};
const navigating$2 = {
	get from() {
		return navigating$3.current ? navigating$3.current.from : null;
	},
	get to() {
		return navigating$3.current ? navigating$3.current.to : null;
	},
	get type() {
		return navigating$3.current ? navigating$3.current.type : null;
	},
	get willUnload() {
		return navigating$3.current ? navigating$3.current.willUnload : null;
	},
	get delta() {
		return navigating$3.current ? navigating$3.current.delta : null;
	},
	get complete() {
		return navigating$3.current ? navigating$3.current.complete : null;
	}
};
Object.defineProperty(navigating$2, "current", { get() {
	throw new Error("Replace navigating.current.<prop> with navigating.<prop>");
} });
stores.updated.check;
const page = page$2;
const navigating = navigating$2;
export { page as n, navigating as t };
