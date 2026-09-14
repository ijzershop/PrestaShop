import type { FieldType } from './field';
import type { CalculatorResult } from './calculator';
import type { ProductConfig } from './product-config';
import type { MainConfig } from './main-config';
import type { ProductStep } from './product-step';
import type { StepWithGroups } from './field-group';

export type DynamicProduct = {
	version: string;
	uri: string;
	data_uri: string;
	loaded: boolean;
	id_product: number;
	id_attribute: number;

	is_admin: boolean;
	is_admin_edit: boolean;
	is_create_customization: boolean;

	product_config: ProductConfig;
	main_config: MainConfig;
	grouped_fields: Record<number, StepWithGroups>;

	has_groups: boolean;
	steps: ProductStep[];
	field_types: Record<number, FieldType>;
	countries: Array<{ id: number; iso_code: string; name: string }>;
	error: string;
	calculation: CalculatorResult;
	id_input: number;
	id_cart: number;
	id_customer: number;
	scripts_hashes: Record<string, string>;
	controllers: {
		loader: string;
		calculator: string;
		customization: string;
		uploader: string;
	};
};
