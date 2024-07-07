import type { MetaTagsType } from '@/types/meta';

export type PageProperties = {
	id: string;
	type: string;
	component_name: string;
	[x: string]: unknown;
};

export type PageType = {
	page: {
		content: PageProperties[];
		meta: MetaTagsType;
	};
};
