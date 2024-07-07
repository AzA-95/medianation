export type BaseType = {
	name: string;
	items: {
		picture: string;
		picture_params: {
			width: string;
			height: string;
		};
	}[];
	nav?: {
		next_page_url?: string;
	};
};
