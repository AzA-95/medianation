export type BaseType = {
	title: string;
	items: {
		name: string;
		caption: string | null;
		html: string;
		picture: string;
		button_name: string | null;
	}[];
};
