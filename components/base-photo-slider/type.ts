export type BasePhotoSliderType = {
	name: string;
	items: {
		prev_picture: string;
		prev_picture_params: {
			width: string;
			height: string;
		};
	}[];
};
