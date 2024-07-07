export type BaseType = {
	name: string;
	price: string;
	// old_price used in custom page /services/streammydata/
	old_price?: string;
	advantages:
		| {
				name: string;
				description: string;
		  }[]
		| null;
	html: string | null;
	// additional_service used in custom page /services/streammydata/
	additional_service?: {
		name: string;
		label: string;
		price: string;
		old_price: string;
	};
	button_name: string | null;
};
