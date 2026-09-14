import type { Field } from './field';

export type Interval = {
	id: number
	id_product: number
	interval_fields: IntervalField[]
	condition_groups: Record<number, IntervalConditionGroup>
	interval_formulas: IntervalFormula[]
}

export type IntervalField = {
	id: number
	id_interval: number
	id_field: number
	field: Field
}

export type IntervalConditionGroup = {
	id: number
	id_interval: number
	conditions: Record<number, IntervalCondition>
}

export type IntervalCondition = {
	id: number
	id_interval_condition_group: number
	id_field: string
	type: 'range' | 'values'
	field: Field
	values: number[] | string[]
	min: number
	max: number | '∞'
}

export type IntervalFormula = {
	id: number
	id_interval_condition_group: number
	id_interval_field: number
	formula: string
}
