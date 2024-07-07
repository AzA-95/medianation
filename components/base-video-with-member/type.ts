export type BaseType = {
	video: {
		item: {
			name: string;
			picture: string;
			video: {
				link: string;
				time: string | null;
			};
		} | null;
	};
	member: {
		item: {
			name: string;
			picture: string;
			position: string | null;
			experience: string | null;
		} | null;
		text: string | null;
	};
	additional_text: string | null;
};
