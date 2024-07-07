import type { TheFooterFormtype } from '@components/the-footer-form/type';
import type { MetaTagsType } from '@/types/meta';

export type FaqPageType = {
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
			},
			TheFooterFormtype,
		];
		meta: MetaTagsType;
	};
};

export type FaqPageItemsType = Pick<FaqPageType['page']['content'][0], 'items'>;

export type FaqPageNavType = Pick<FaqPageType['page']['content'][0], 'nav'>;

export type FaqPageCountType = Pick<FaqPageType['page']['content'][0], 'count'>;
