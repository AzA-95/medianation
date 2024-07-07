export type BaseType = {
	name: string;
	text: string;
	awards: {
		picture: string;
		picture_params: {
			width: string;
			height: string;
		};
		name: string;
		text: string;
	}[];
};
