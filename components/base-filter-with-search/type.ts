import type { Ref } from 'vue';

export type ValueOfType<T> = T[keyof T];

export type BaseType = {
	name: string;
	field_name: string;
	field_type: string;
	options?: {
		id: number | string;
		name: string;
	}[];
	value?: string;
}[];

export type BaseCheckedType = Record<
	string,
	{
		type: string;
		name: string;
		value: number | string;
		text: string;
	}
>;

export type BaseElementType = {
	element: Ref<HTMLElement | undefined>;
};
