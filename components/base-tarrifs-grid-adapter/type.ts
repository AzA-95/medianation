// Old. component_name: Price in api
export type BaseType = {
	name: string;
	items: {
		name: string;
		price: string;
		text: string | null;
		advantages:
			| {
					name: string;
					description: string;
			  }[]
			| null;
		features: string[] | null;
		button_name: string | null;
	}[];
};
