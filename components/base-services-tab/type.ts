export type BaseServicesTabType = {
	name: string;
	text: string;
	picture: string;
	items: {
		id: string;
		name: string;
		link: string;
		text: string;
		awards:
			| {
					id: string;
					name: string;
					text: string;
					picture: string;
					picture_params: {
						width: string;
						height: string;
					};
			  }[]
			| null;
		price: string | null;
		menu:
			| {
					id: string;
					name: string;
					link: string;
			  }[]
			| null;
	}[];
};
