import type { FormType } from '@/types/forms';

export type BaseType = {
	name: string;
	caption: string;
	captionNew?: string;
	settings: FormType['settings'];
};
