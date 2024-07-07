export type BaseNewsSliderType = {
	name: string;
	text?: string; // используется в кастомныое странице /services/seo/seo-consultation/
	more_link?: string; // используется в кастомныое странице /services/seo/seo-consultation/
	items:
		| {
				date: string;
				show_count: number;
				reading_time: string | null;
				tags: string[];
				name: string;
				picture: string;
				link: string;
		  }[]
		| null;
};
