import type { MetaTagsType } from '@/types/meta';

export type CasesPageType = {
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
					service: {
						id: number;
						name: string;
					}[];
					activity: {
						id: string;
						name: string;
					}[];
				};
				items: {
					name: string;
					type: 'epic' | 'legendary';
					picture: string;
					picture_params: {
						width: string;
						height: string;
					};
					client: {
						picture: string;
						picture_params: {
							width: string;
							height: string;
						};
					} | null;
					video_review: {
						link_name: string | null;
						video: string | null;
					} | null;
					services: {
						name: string;
						link: string;
					}[];
					text: string;
					text_additional: string | null;
					link: string;
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

export type CasesPageCasesType = Pick<
	CasesPageType['page']['content'][0],
	'items'
>;

export type CasesPageNavType = Pick<CasesPageType['page']['content'][0], 'nav'>;

export type CasesPageCountType = Pick<
	CasesPageType['page']['content'][0],
	'count'
>;
