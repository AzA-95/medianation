export type BaseResultsOurWorksType = {
	name: string;
	text: string;
	items: {
		name: string;
		picture: null | string;
		picture_params: null | {
			width: string;
			height: string;
		};
		text: string;
		link: string;
		awards:
			| null
			| {
					name: string;
					text: string;
					picture: string;
					picture_params: {
						width: string;
						height: string;
					};
			  }[];
		results:
			| null
			| {
					icon: string;
					text: string;
			  }[];
		popup_data?: {
			// используется в кастомный странице /services/dizayn/
			title: string;
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
		};
	}[];
};
