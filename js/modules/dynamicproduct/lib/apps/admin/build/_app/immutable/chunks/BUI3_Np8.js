import { _ as transform, g as string, l as number, p as pipe, r as boolean, t as any, u as object } from "./Da0rmiev.js";
const SettingsSchema = object({
	active: boolean(),
	required: boolean(),
	displayed_price: pipe(any(), transform((val) => Number(val)), number("The price must be a number")),
	displayed_price_label: string(),
	display_starting_from: boolean(),
	display_dynamic_price: boolean(),
	display_customization_cost: boolean(),
	recalc: boolean(),
	always_recalc: boolean(),
	display_weight: boolean(),
	hide_qty: boolean(),
	multiply_price: boolean(),
	allow_save: boolean(),
	split_summary: boolean()
});
export { SettingsSchema as t };
