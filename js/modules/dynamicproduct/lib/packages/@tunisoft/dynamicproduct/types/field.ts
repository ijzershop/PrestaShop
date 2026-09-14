export type Field = {
	id: number
	id_product: number
	id_unit: number
	active: number
	visible: number
	type: number
	id_group: number
	id_step: number
	position: number
	init: number
	name: string
	label: string
	value: string
	short_description: string
	description: string
	placeholder: string
	image_url?: string
	thumb_url?: string
	favorite: number
	common: number
	linked: number

	unit: FieldUnit

	settings: FieldSettings
	options?: Record<number, FieldOption>
}

export type FieldWithLang = Omit<Field, 'options'| 'label'| 'value'> & {
	label: Record<number, string>
	value: Record<number, string>

	options?: Record<number, FieldOptionWithLang>
}

export type FieldUnit = {
	id: number
	name: string
	symbol: string
	displayed: boolean
}

export type FieldOption = {
	id: number

	id_field: number

	value: string
	secondary_value: string
	sku: string

	is_default: any
	position: number
	color: string
	label: string

	deleted: number
	active: number
	visible: number

	image: string
	image_width: number
	image_height: number

	image_url: string
	thumb_url: string

	font: string
	font_url: string
	font_thumb_url: string

	preview: string
	preview_width: number
	preview_height: number
	preview_url: string
	preview_thumb_url: string

	displayed_value: string

	date_add: string
	date_upd: string
}

// @ts-expect-error overriding label upsets the type checker
export interface FieldOptionWithLang extends FieldOption {
	label: Record<number, string>;
}

export type FieldSettings = {
	id_unit: string
	min: number
	max: number
	step: number
	init: number
	checked_by_default: boolean
	initial_date: string

	initial_value: string
	placeholder: string
	short_description: string
	description: string

	thumbnail_size: string
	display_label: boolean
	required: boolean
	min_width: number
	min_height: number
	max_size: number
	max_files: number
	extensions: string
	min_date: string
	max_date: string
	disabled_days: string
	multiselect: boolean
	color: string
	display_value_price: boolean
	display_secondary_value_price: boolean
	display_secondary_value_description: boolean
	display_price_tax_excl: boolean
	custom_suffix: string
	display_in_popup: boolean
	hide_when_empty: boolean
	show_image_in_summary: number;
	show_in_summary: boolean
	is_dynamic_value: boolean
	price_unit: string
	ps_style: boolean
	show_dropzone: boolean
	script_name: string
	dev_port: number
	json_config: string
}

export type FieldSettingsWithLang = FieldSettings & {
	initial_value: Record<string, string>
	placeholder: Record<string, string>
	short_description: Record<string, string>
	description: Record<string, string>
	price_unit: Record<string, string>
}

export type FieldType = {
	name: string
	label: string
	type: number
	color: string
	options: boolean
}

export type FieldProps = {
	name: boolean
	label: boolean
	value: boolean
	settings: boolean
	options: boolean
	text: boolean
	secondary: boolean
	list: boolean
}

export type UpdateFieldOptions = {
	recalculate?: boolean
}
