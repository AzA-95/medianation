export type BaseType = {
	title: string;
	breadcrumbs: {
		name: string;
		link: string | null;
	}[];
	video: {
		mp4: string;
		time: string;
	};
};
