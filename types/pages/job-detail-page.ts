import type { PageProperties } from './page';
import type { MetaTagsType } from '@/types/meta';

export type JobDetailPageType = {
	page: {
		content: [
			{
				component_name: 'TopData';
				name: string;
				city: string;
				breadcrumbs: {
					name: string;
					link: string | null;
				}[];
			},
			PageProperties,
		];
		meta: MetaTagsType;
	};
};
