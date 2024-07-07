export type BaseType = {
	client: {
		name: string | null;
		picture: string | null;
		picture_params: {
			width: string;
			height: string;
		} | null;
		link: string | null;
		link_name: string | null;
	} | null;
	task: {
		title: string | null;
		text: string;
	} | null;
	features: {
		title: string | null;
		items: {
			caption: string;
			text: string;
		}[];
	} | null;
	team:
		| {
				picture: string | null;
				name: string;
				position: string;
				link: string | null;
				is_show_detail: boolean;
		  }[]
		| null;
};
