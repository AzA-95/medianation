export type BaseType = {
	name: string;
	picture: string;
	picture_params: {
		width: string;
		height: string;
	};
	client: {
		picture: string;
		picture_params: {
			width: string;
			height: string;
		};
	} | null;
	video_review: {
		link_name: string | null;
		video: string | null;
	} | null;
	services: {
		name: string;
		link: string;
	}[];
	text: string;
	text_additional: string | null;
	link: string;
};
