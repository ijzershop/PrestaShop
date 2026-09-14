import { Ct as set, Tt as state, ot as get } from "./DUscB9kS.js";
var CurrentForm = class {
	#submit_fn = state();
	set(submit_fn) {
		set(this.#submit_fn, submit_fn, true);
	}
	has_form() {
		return !!get(this.#submit_fn);
	}
	async submit() {
		if (!get(this.#submit_fn)) return;
		try {
			await get(this.#submit_fn)();
		} catch (error) {
			console.error("Error submitting form", error);
		}
	}
	reset() {
		set(this.#submit_fn, void 0);
	}
};
const current_form = new CurrentForm();
export { current_form as t };
