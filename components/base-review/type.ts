export type BaseReviewType = {
	name: string | null;
	text: string;
	rating: number;
	client: {
		name: string;
		picture: string;
		picture_params: {
			width: string;
			height: string;
		};
		link: null | string;
	};
	author: {
		name: string;
		position: string;
	};
	file: string | null;
};
