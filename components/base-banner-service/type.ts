type AwardsType = {
	id: 'lists/award';
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

type ResultsType = {
	id: 'lists/result';
	items: {
		name: string;
		icon: string;
		text: string;
	}[];
};

export type BaseType = {
	breadcrumbs: {
		name: string;
		link: string | null;
	}[];
	background: string;
	background_small?: string;
	show_sale_icon?: boolean; // pased from services page
	title: string; // pased from services page
	description: string | null;
	price: string | null;
	price_caption: string;
	awards: AwardsType | ResultsType;
	order_button: {
		name: string;
		action: {
			name: string;
			value: null | string;
		} | null;
		scroll_to_form?: boolean; // used in custom page /referral
	} | null;
};

export type BaseAwardsType = AwardsType;
export type BaseResultsType = ResultsType;
