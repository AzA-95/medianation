export type BasePromotionCostType = {
	name: string;
	text: string;
	items: {
		name: string;
		service:
			| null
			| string
			| {
					name: string;
					link: string;
					price: string;
			  };
	}[];
};
