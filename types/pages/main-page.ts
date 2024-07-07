import type { PageProperties } from './page';
import type { MetaTagsType } from '@/types/meta';

export type MainPageType = {
	page: {
		content: [
			{
				component_name: 'MainDescription';
				title: string;
				text: string;
			},
			PageProperties,
		];
		meta: MetaTagsType;
	};
};
