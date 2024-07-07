export type BaseOfferType = {
	items: {
		id: string;
		name: string;
		picture: string | null;
		picture_params?: {
			width: string;
			height: string;
		};
		small_picture: string | null;
		small_picture_params?: {
			width: string;
			height: string;
		};
		text: string;
		button_name: string;
		additional_button_name: string | null;
		additional_button_link: string | null;
		price_text: string | null;
	}[];
};
