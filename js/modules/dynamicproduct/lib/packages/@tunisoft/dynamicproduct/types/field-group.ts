import type { Field } from './field';
import type { Step } from './product-step';

export type FieldGroup = {
	id: number;
	label: string;
	name: string;
	show_label: boolean;
}

export type ProductFieldGroup = {
	id: number
	id_product: number
	id_step: number
	id_field_group: number
	collapsible: boolean
	start_collapsed: boolean
	id_control_field: number
	position: number
}

export type StepWithGroups = {
	id: number
	id_product_step: number
	id_product: number
	id_step: number
	position: number
	visible: boolean
	step: Step
	groups: Record<number, GroupWithFields>
}

export type GroupWithFields = {
	id: number;
	collapsible: boolean;
	start_collapsed: boolean;
	id_control_field: number;
	id_source_group: number;
	id_step: number;
	position: number;
	visible: boolean;
	fields: Record<number, Field>;
	group: FieldGroup;
}
