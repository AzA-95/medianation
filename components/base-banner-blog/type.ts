export type BaseType = {
	picture: string;
	breadcrumbs: {
		name: string;
		link: string | null;
	}[];
	name: string;
	tags: string[] | null;
	show_count: number;
	reading_time: string | null;
	date_published: string;
	date_modified: string;
	share_socials_data: {
		url: string;
		title: string;
		description: string;
		media: string;
	};
	author: {
		name: string;
		picture: string;
		picture_ex: string | null;
		position: string;
		experience: string | null;
		is_show_detail: boolean;
		link: string | null;
	} | null;
};
