import type { MetaTagsType } from '@/types/meta';

export type AuthorsPageType = {
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
				items: {
					id: string;
					name: string;
					link: string;
					picture: string;
					position: string;
					experience: string;
					cases: {
						title: string;
					} | null;
					blog: {
						title: string;
					} | null;
				}[];
				nav?: {
					size: number;
					next_page_url?: string;
				};
				last_month_count?: number;
			},
		];
		meta: MetaTagsType;
	};
};

export type AuthorsPageItemsType = Pick<
	AuthorsPageType['page']['content'][0],
	'items'
>;

export type AuthorsPageNavType = Pick<
	AuthorsPageType['page']['content'][0],
	'nav'
>;
