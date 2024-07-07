import type { MetaTagsType } from '@/types/meta';

export type GlossaryPageType = {
	page: {
		content: [
			{
				breadcrumbs: [
					{
						name: string;
						link: string | null;
					},
				];
				filter: {
					letters: string[];
				};
				menu: {
					items: {
						id: number;
						name: string;
						link: string;
						current: boolean;
					}[];
				};
				items: {
					name: string;
					link: string;
					text: string;
				}[];
				nav?: {
					size: number;
					max_page: number;
					current_page: number;
					next_page_url?: string;
				};
				count: number;
			},
		];
		meta: MetaTagsType;
	};
};

export type GlossaryPageNavType = Pick<
	GlossaryPageType['page']['content'][0],
	'nav'
>;

export type GlossaryPageCountType = Pick<
	GlossaryPageType['page']['content'][0],
	'count'
>;

export type GlossaryPageGlossariesType = Pick<
	GlossaryPageType['page']['content'][0],
	'items'
>;
