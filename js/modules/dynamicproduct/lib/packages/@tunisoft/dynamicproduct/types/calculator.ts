import type { IResponseData } from '@tunisoft/common';
import type { HiddenItems } from './hidden-items';
import type { InputFields } from './input-field';
import type { StepWithGroups } from './field-group';

type Prices<T = number> = {
	price_ht: T;
	price_ht_nr: T;
	price_ttc: T;
	price_ttc_nr: T;
}

type CalculationDebugInfo = {
	name: string
	type: 'formula' | 'condition' | 'interval' | 'grid'
	formula: string
	literal: string
	result: string
	bounds: {
		columns: string[]
		rows: string[]
	},
	target_fields: {
		column: string
		row: string
	},
	fields: string[]
	options: Record<string, string[]>
	groups: string[]
	steps: string[]
}

export type Debug = {
	errors: string[]
	validation: {
		price_formula: string
		weight_formatted: string
		quantity_formula: string
	},
	calculation: CalculationDebugInfo[]
}

export type QuantityDiscount = {
	unit_prices: Prices;
	unit_prices_formatted: Prices;
	totals: Prices;
	totals_formatted: Prices;
	savings: Prices;
	savings_formatted: Prices;
}

export type QuantityDiscounts = {
	[quantity: number]: QuantityDiscount
}

export type CalculatorResult = IResponseData<{
	customization_prices: Prices;
	unit_prices: Prices;
	final_prices: Prices;
	formatted_unit_prices: Prices<string>;
	formatted_prices: Prices<string>;
	use_tax: boolean;

	weight: number;
	weight_formatted: string;

	visibility: HiddenItems;

	true_conditions: string[];

	input_fields: InputFields;

	grouped_fields: Record<number, StepWithGroups>

	debug_messages: Debug;

	quantity_discounts: QuantityDiscounts;

	error?: string;
	oos: boolean;

	dev: boolean;
}>
