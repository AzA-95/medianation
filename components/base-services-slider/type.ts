export type BaseServicesSliderType = {
	items: {
		id: string;
		name: string;
		picture: string;
		picture_params: {
			width: string;
			height: string;
		};
		small_picture: string;
		small_picture_params: {
			width: string;
			height: string;
		};
		text: string;
		price_text: string | null;
		button_name: string;
		additional_button_name: string | null;
		additional_button_link: string | null;
	}[];
};
