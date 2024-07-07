export type BaseType = {
	name: string;
	items: {
		name: string;
		picture: string;
		picture_params: {
			width: string;
			height: string;
		};
		video: {
			link: string;
			time: string;
		};
	}[];
};
