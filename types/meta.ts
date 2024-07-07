export type MetaTagsType = {
	title: string;
	h1: string;
	description: string;
	og: {
		title: string;
		description: string;
		image: string;
		type: string;
		url: string;
	};
	noindex: boolean;
};
