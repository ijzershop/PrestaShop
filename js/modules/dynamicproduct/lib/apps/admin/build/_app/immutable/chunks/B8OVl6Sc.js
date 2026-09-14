import { Ct as set, Dt as derived_safe_equal, Ft as push, Pt as pop, Tt as state, _ as reactive_import, ot as get, v as init } from "./DUscB9kS.js";
import { f as dpa } from "./BIEFGHhw.js";
import { n as _ } from "./DFl6Gq92.js";
import { t as sort } from "./Bz4g0JZD.js";
import { t as Input } from "./D2YUxW8P.js";
var FieldsFilter$1 = class {
	#filter = state("");
	get filter() {
		return get(this.#filter);
	}
	set filter(value) {
		set(this.#filter, value, true);
	}
	#current_filter = state("");
	get current_filter() {
		return get(this.#current_filter);
	}
	set current_filter(value) {
		set(this.#current_filter, value, true);
	}
	timeout = 0;
	min = 5;
	set value(value) {
		this.current_filter = value;
		if (this.timeout) clearTimeout(this.timeout);
		this.timeout = window.setTimeout(() => {
			this.filter = value;
		}, 250);
	}
	get value() {
		return this.current_filter;
	}
	run(fields) {
		const ordered_fields = sort(fields);
		if (!this.filter) return ordered_fields;
		const filters = this.filter.replace(/_/g, "").toLowerCase().split(" ");
		function matchCritera(field, filter) {
			return (field.name || "").replace(/_/g, "").toLowerCase().includes(filter) || Object.values(field.label).find((label) => (label || "").toLowerCase().includes(filter)) || (dpa.field_types[field.type]?.label ?? "").toLowerCase().includes(filter);
		}
		return ordered_fields.filter((field) => {
			return filters.map((filter) => matchCritera(field, filter)).includes(true);
		});
	}
};
const fields_filter = new FieldsFilter$1();
var $$_import_fields_filter = reactive_import(() => fields_filter);
function FieldsFilter($$anchor, $$props) {
	push($$props, false);
	init();
	{
		let $0 = derived_safe_equal(() => _("Filter fields"));
		Input($$anchor, {
			get placeholder() {
				return get($0);
			},
			get value() {
				return $$_import_fields_filter().value;
			},
			set value($$value) {
				$$_import_fields_filter($$_import_fields_filter().value = $$value);
			},
			$$legacy: true
		});
	}
	pop();
}
export { fields_filter as n, FieldsFilter as t };
