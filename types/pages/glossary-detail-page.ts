import type { MetaTagsType } from '@/types/meta';

export type GlossaryDetailPageType = {
	page: {
		content: [
			{
				breadcrumbs: [
					{
						name: string;
						link: string | null;
					},
				];
				service: {
					name: string;
					link: string;
				} | null;
			},
			{
				html: string;
			},
		];
		meta: MetaTagsType;
	};
};
