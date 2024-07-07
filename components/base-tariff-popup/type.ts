export type BaseType = {
	name: string;
	price: string;
	text: string;
	columns:
		| {
				info_tite: string;
				info_text: string;
		  }[]
		| null;
};
