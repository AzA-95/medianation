export type BaseType = {
	name: string;
	items: {
		name: string;
		picture: string | null;
		picture_params: {
			width: string;
			height: string;
		} | null;
		text: string;
		link: string;
		is_link_remote?: boolean;
		button_name?: string;
	}[];
};
