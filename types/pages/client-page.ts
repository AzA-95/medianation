import type { MetaTagsType } from '@/types/meta';

export type ClientPageType = {
	page: {
		content: [
			{
				count: number;
				last_month_count: number;
				breadcrumbs: [
					{
						name: string;
						link: string | null;
					},
				];
				filter: {
					date: {
						id: string;
						name: string;
					}[];
					activity: {
						id: string;
						name: string;
					}[];
					type: {
						id: string;
						name: string;
					}[];
				};
				items: {
					name: string;
					picture: string;
					picture_params: {
						width: string;
						height: string;
					};
					cases:
						| {
								name: string;
								link: string;
						  }[]
						| null;
				}[];
				nav?: {
					size: number;
					next_page_url?: string;
				};
			},
		];
		meta: MetaTagsType;
	};
};

export type ClientPageNavType = Pick<
	ClientPageType['page']['content'][0],
	'nav'
>;
export type ClientPageCountType = Pick<
	ClientPageType['page']['content'][0],
	'count'
>;
export type ClientPageClientsType = Pick<
	ClientPageType['page']['content'][0],
	'items'
>;
