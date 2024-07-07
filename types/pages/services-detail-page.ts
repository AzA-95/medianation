import type { PageProperties } from './page';
import type { MetaTagsType } from '@/types/meta';

type AwardsType = {
	id: 'lists/award';
	name: string;
	items: {
		name: string;
		text: string;
		picture: string;
		picture_params: {
			width: string;
			height: string;
		};
	}[];
};

type AwardsResultType = {
	id: 'lists/result';
	name: string;
	items: {
		name: string;
		icon: string;
		text: string;
	}[];
};

export type ServicesDetailPageType = {
	page: {
		content: [
			{
				component_name: 'StaticBannerService';
				breadcrumbs: {
					name: string;
					link: string | null;
				}[];
				background: string;
				background_small?: string;
				show_sale_icon?: boolean;
				title: string;
				description: string | null;
				price: string | null;
				price_caption: string;
				awards: AwardsType | AwardsResultType;
				order_button: {
					name: string;
					action: null | {
						name: string;
						value: null | string;
					};
					scroll_to_form?: boolean; // see custom page /referral
				} | null;
			},
			{
				component_name: 'StaticBannerGallery';
				breadcrumbs: {
					name: string;
					link: string | null;
				}[];
				background: string;
				show_sale_icon?: boolean;
				title: string;
				description: string | null;
				price_from: string;
				awards: AwardsType | AwardsResultType;
			},
			{
				component_name: 'Price';
				name: string;
				items: {
					name: string;
					price: string;
					text: string | null;
					advantages:
						| {
								name: string;
								description: string;
						  }[]
						| null;
					features: string[];
					button_name: string | null;
				}[];
			},
			{
				component_name: 'TariffBlock';
				title: string;
				items: {
					name: string;
					price: string;
					advantages:
						| {
								name: string;
								description: string;
						  }[]
						| null;
					html: string | null;
					button_name: string | null;
				}[];
			},
			PageProperties,
		];
		meta: MetaTagsType;
	};
};
