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
		other_cases_title: string;
		other_cases:
			| {
					name: string;
					link: string;
			  }[]
			| null;
	} | null;
};
