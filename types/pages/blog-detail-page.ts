import type { PageProperties } from './page';
import type { MetaTagsType } from '@/types/meta';

export type BlogDetailPageType = {
	page: {
		content: [
			{
				component_name: 'BannerBlog';
				picture: {
					type: string;
				};
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
				author: {
					name: string;
					picture: string;
					picture_ex: string | null;
					position: string;
					experience: string | null;
					is_show_detail: boolean;
					link: string | null;
				} | null;
			},
			PageProperties,
		];
		meta: MetaTagsType;
	};
};
