export type InputFields = Record<string, InputField>

export type InputField<T = Record<any, any>> = {
	id: number
	id_input: number
	id_product: number
	id_field: number
	name: string
	value: string | number
	value_formatted: string
	display_value: string
	secondary_value: string
	type: number
	position: number
	visible: number
	disabled: boolean
	width: number
	height: number
	size: number
	options: string
	selected_options: number[]

	image_url: string
	thumb_url: string

	ext?: string
	thumb_suffix?: string

	data: T | null
}
