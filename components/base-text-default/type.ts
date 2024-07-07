export type ServiceSliderType = {
	component_name: 'ServiceSlider';
	items: [
		{
			name: string;
			prev_text: string | null;
			prev_picture: string;
			link: string;
		},
	];
};

export type TariffListType = {
	component_name: 'TariffList';
	items: [
		{
			elements: {
				name: string;
				price: string;
				html: string | null;
				link: string | null;
			}[];
		},
	];
};

export type BaseType = {
	html: string;
	widgets?: null | (ServiceSliderType | TariffListType)[];
};
