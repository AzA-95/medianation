type ServiceMenuType = {
	id: string;
	name: string;
	active: boolean;
	link: string;
	depth: number;
	parent: null | string;
	items?: ServiceMenuType[];
};

export type TopMenuType = {
	items: Array<{
		id: string;
		name: string;
		link: string;
		sub_menu?: ServiceMenuType[];
		last_month_count?: number;
	}>;
};

export type ServicesMenuType = {
	items: ServiceMenuType[];
};

export type ContentMenuType = {
	phones: Array<{
		phone: string;
		label: string;
	}> | null;
};
