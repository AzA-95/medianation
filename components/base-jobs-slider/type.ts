export type BaseType = {
	name: string;
	filter: {
		city: {
			id: string;
			name_prepositional: string;
		}[];
	};
	items: {
		id: string;
		name: string;
		preview: string;
	}[];
};
