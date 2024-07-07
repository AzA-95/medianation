import type { PageProperties } from './page';
import type { MetaTagsType } from '@/types/meta';

export type ServicesPageType = {
	page: {
		content: [
			{
				component_name: 'ServicesList';
				breadcrumbs: {
					name: string;
					link: string | null;
				}[];
				name: string;
				count: number;
			},
			PageProperties,
		];
		meta: MetaTagsType;
	};
};
