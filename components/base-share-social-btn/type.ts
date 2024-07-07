import type { SocialsType } from '@/composables/use-share-social';

export type BaseShareSocialBtnType = {
	url: string;
	title: string;
	description: string;
	media: string;
	network: SocialsType;
	iconName: string;
	share_text: string;
};
