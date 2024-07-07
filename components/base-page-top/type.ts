export type BasePageTopType = {
	breadcrumbs: {
		name: string;
		link: string | null;
	}[];
	title: string;
	city?: string;
	count?: number;
	new_count?: number;
	button_name?: string | null;
};
