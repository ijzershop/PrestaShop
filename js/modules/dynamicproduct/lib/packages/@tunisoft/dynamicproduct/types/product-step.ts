export type Step = {
	id: number;
	label: string;
	name: string;
	show_label: boolean;
};

export type ProductStep = {
	id: number;
	id_product: number;
	id_step: number;
	name: string;
	position: number;
	hidden: number
};

export type ProductStepWithLabel = ProductStep & {
	label: string;
};
