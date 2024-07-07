export type BaseType = {
	name: string;
	items: {
		name: string;
		html: string;
		picture: string;
		picture_params: {
			width: string;
			height: string;
		};
		elements: {
			name: string;
			html: string | null;
			picture: string;
			picture_params: {
				width: string;
				height: string;
			};
			video: {
				link: string;
				ext_link: string;
			};
		}[];
	}[];
};
