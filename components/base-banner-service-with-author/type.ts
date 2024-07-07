export type BaseType = {
	breadcrumbs: {
		name: string;
		link: string | null;
	}[];
	author: {
		picture: string;
		picture_params: {
			width: string;
			height: string;
		};
		picture_small: string;
		picture_small_params: {
			width: string;
			height: string;
		};
		name: string;
		profession: string;
	};
	title: string;
	description: string | null;
	price: string | null;
	price_caption: string;
	awards: {
		items: {
			name: string;
			text: string;
			picture: string;
			picture_params: {
				width: string;
				height: string;
			};
		}[];
	};
	order_button: {
		name: string;
		action: {
			name: string;
			value: null | string;
		} | null;
	} | null;
};
