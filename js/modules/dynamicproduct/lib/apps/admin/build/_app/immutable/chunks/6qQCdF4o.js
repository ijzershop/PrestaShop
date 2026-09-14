import { n as _ } from "./DFl6Gq92.js";
import { f as picklist, g as string, l as number, m as record, n as array, u as object } from "./Da0rmiev.js";
let CalculationItemType = /* @__PURE__ */ function(CalculationItemType$1) {
	CalculationItemType$1["CONDITION_ITEM"] = "condition";
	CalculationItemType$1["FIELD_FORMULA_ITEM"] = "field_formula";
	CalculationItemType$1["INTERVAL_ITEM"] = "interval";
	CalculationItemType$1["GRID_ITEM"] = "grid";
	return CalculationItemType$1;
}({});
const CalculationItemSchema = object({
	id: number(),
	id_item: number(),
	id_product: number(),
	type: picklist(Object.values(CalculationItemType)),
	position: number()
});
const CalculationItemsFormSchema = object({
	action_name: picklist([
		"",
		"update",
		"add",
		"delete"
	]),
	action_value: string(),
	calculation_items: record(string(), CalculationItemSchema)
});
const CalculationItemsSchema = object({
	action_name: string(),
	selected: array(number())
});
function getItemLabel(item) {
	const labels = {
		[CalculationItemType.CONDITION_ITEM]: _("Condition"),
		[CalculationItemType.FIELD_FORMULA_ITEM]: _("Field Formula"),
		[CalculationItemType.INTERVAL_ITEM]: _("Interval"),
		[CalculationItemType.GRID_ITEM]: _("Grid")
	};
	const pluralLabels = {
		[CalculationItemType.CONDITION_ITEM]: _("Conditions"),
		[CalculationItemType.FIELD_FORMULA_ITEM]: _("Field Formulas"),
		[CalculationItemType.INTERVAL_ITEM]: _("Intervals"),
		[CalculationItemType.GRID_ITEM]: _("Grids")
	};
	return item.id_item ? labels[item.type] : pluralLabels[item.type];
}
function getItemColor(type) {
	return {
		[CalculationItemType.CONDITION_ITEM]: "#2196f3",
		[CalculationItemType.FIELD_FORMULA_ITEM]: "#673ab7",
		[CalculationItemType.INTERVAL_ITEM]: "#ff9800",
		[CalculationItemType.GRID_ITEM]: "#8bc34a"
	}[type] ?? "#000";
}
export { CalculationItemType as a, CalculationItemsSchema as i, getItemLabel as n, CalculationItemsFormSchema as r, getItemColor as t };
