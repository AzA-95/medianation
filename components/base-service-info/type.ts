export type BaseServiceInfoType = {
	breadcrumbs: {
		name: string;
		link: string | null;
	}[];
	name: string;
	description: string | null;
	menu_title: string | null;
	menu:
		| {
				picture: string | null;
				name: string;
				text: string | null;
				link: string;
		  }[]
		| null;
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
};
