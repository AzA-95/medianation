export type BaseType = {
	items: {
		picture: string;
		picture_params: {
			width: string;
			height: string;
		};
		cases:
			| {
					name: string;
					link: string;
			  }[]
			| null;
	}[];
};
