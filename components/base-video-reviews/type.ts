export type BaseType = {
	video_reviews: {
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
			client: {
				name: string;
				picture: string;
				picture_params: {
					width: string;
					height: string;
				};
			} | null;
		}[];
	};
};
