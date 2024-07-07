export type BaseType = {
	name: string;
	awards: {
		items: {
			name: string;
			text: string;
			picture: string;
			picture_params: {
				width: string;
				height: string;
			};
		}[];
	} | null;
	certificates: {
		items: {
			name: string;
			text: string;
			picture: string;
		}[];
	} | null;
};
