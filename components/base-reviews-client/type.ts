export type BaseReviewsClientType = {
	name: string;
	items: {
		name: string;
		text: string;
		rating: number;
		client: {
			name: string;
			picture: string;
			picture_params: {
				width: string;
				height: string;
			};
			picture_white: string | null;
			picture_white_params: {
				width: string;
				height: string;
			} | null;
			link: null | string;
		};
		author: {
			name: string;
			position: string;
		};
		file: string | null;
	}[];
};
