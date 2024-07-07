import type { FieldType } from '@/types/forms';
import type { MetaTagsType } from '@/types/meta';

export type BlogPageType = {
	page: {
		content: [
			{
				count: number;
				breadcrumbs: [
					{
						name: string;
						link: string | null;
					},
				];
				filter: {
					service: {
						id: number;
						name: string;
					}[];
					date: {
						id: string;
						name: string;
					}[];
					type: {
						id: string;
						name: string;
					}[];
				};
				menu: {
					items: {
						id: number;
						name: string;
					}[];
				};
				subscribe_form: {
					name: string;
					caption: string;
					settings: {
						fields: Record<string, FieldType>;
						submit: string;
					};
					button_name: string;
				};
				items: {
					name: string;
					date: string;
					link: string;
					picture: string;
					show_type: 'small' | 'medium' | 'large';
					show_count: number;
					reading_time: string;
					text: string;
					tags: string[];
				}[];
				nav?: {
					size: number;
					next_page_url?: string;
				};
				base_url: string;
			},
		];
		meta: MetaTagsType;
	};
};

export type BlogPageArticlesType = Pick<
	BlogPageType['page']['content'][0],
	'items'
>;

export type BlogPageNavType = Pick<BlogPageType['page']['content'][0], 'nav'>;

export type BlogPageCountType = Pick<
	BlogPageType['page']['content'][0],
	'count'
>;
