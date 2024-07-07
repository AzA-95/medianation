export type BaseType = {
	title: string;
	items: {
		name: string;
		price: string;
		text: string;
		columns:
			| {
					info_tite: string;
					info_text: string;
			  }[]
			| null;
	}[];
};
