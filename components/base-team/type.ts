export type BaseType = {
	name: string;
	text: string | null;
	items: {
		picture: string;
		picture_params: {
			width: string;
			height: string;
		};
		picture_ex: string | null;
		picture_ex_params: {
			width: string;
			height: string;
		} | null;
		name: string;
		position: string;
		experience: string | null;
	}[];
	nav?: {
		next_page_url?: string;
	};
};
