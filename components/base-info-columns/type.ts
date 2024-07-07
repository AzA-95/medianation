export type BaseType = {
	title: string;
	items:
		| {
				name: string;
				caption: string | null;
				html: string | null;
		  }[]
		| null;
};
