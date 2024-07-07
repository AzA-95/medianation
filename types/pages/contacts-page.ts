import type { MetaTagsType } from '@/types/meta';

type BaseType = {
	name: string;
	items: {
		name: string;
		text: string;
	}[];
};

export type ContactsPageType = {
	page: {
		content: [
			{
				breadcrumbs: [
					{
						name: string;
						link: string | null;
					},
				];
				requisites: {
					ru: BaseType;
					en: BaseType;
					link: string;
				};
			},
		];
		meta: MetaTagsType;
	};
};
