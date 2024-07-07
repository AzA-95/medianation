export type BaseServicesListType = {
	items: {
		link: string;
		name: string;
		items: {
			link: string;
			name: string;
		}[];
	}[];
};
