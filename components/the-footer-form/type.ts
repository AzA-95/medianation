import type { FormType } from '@/types/forms';

export type BaseType = {
	name: string;
	caption: string;
	captionNew?: string;
	settings: FormType['settings'];
	button_name?: string;
	member?: {
		name: string;
		picture: string;
		position: string | null;
		phone?: {
			name: string; // used in custtom page referral
			link: string;
		};
		socials:
			| {
					name: string;
					link: string;
					is_preferred?: boolean;
			  }[]
			| null;
	} | null;
};
