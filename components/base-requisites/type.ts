type BaseType = {
	name: string;
	items: {
		name: string;
		text: string;
	}[];
};

export type BaseRequisitesType = {
	ru: BaseType;
	en: BaseType;
	link: string;
};
