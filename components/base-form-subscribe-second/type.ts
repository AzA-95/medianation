import type { FieldType } from '@/types/forms';

export type BaseType = {
	name: string;
	caption: string;
	settings: {
		fields: Record<string, FieldType>;
		submit: string;
	};
	button_name: string;
};
