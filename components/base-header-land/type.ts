import type { Ref } from 'vue';

export type BaseType = {
	menu: {
		name: string;
		href: string;
	}[];
};

export type ElementType = {
	element: Ref<HTMLElement | undefined>;
};
