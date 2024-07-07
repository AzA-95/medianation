import type { BaseType as BaseMenuListType } from '@/components/base-menu-list/type';

// New. component_name: MenuList with this format in api
type FirstType = {
	text: string | null;
	items: BaseMenuListType['items'];
};

// Old. component_name: MenuList with this format in api
type SecondType = {
	name: string;
	description: string | null;
	menu: {
		items: BaseMenuListType['items'];
	} | null;
	additional_html: string | null;
};

// New. component_name: MenuList with this format in author detail page api
// https://dev.medianation.ru/api/v1/page/authors/ivan-barchenkov/
type ThirdType = {
	name: string;
	menu: BaseMenuListType['items'];
};

export type BaseDescWithMenuListType = FirstType | SecondType | ThirdType;
