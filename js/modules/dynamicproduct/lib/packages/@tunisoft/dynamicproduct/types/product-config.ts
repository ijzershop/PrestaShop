export type ProductConfig = {
	id_product: number
	active: boolean
	required: boolean
	exclude: boolean
	displayed_price: number
	displayed_price_label: string
	display_starting_from: boolean
	display_dynamic_price: boolean
	display_customization_cost: boolean
	recalc: boolean
	always_recalc: boolean
	display_weight: boolean
	hide_qty: boolean
	multiply_price: boolean
	allow_save: boolean
	split_summary: boolean
	custom_calculation: boolean
	enable_steps: boolean
	all_steps_required: boolean
}
