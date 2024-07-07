type Entries<T> = {
	[K in keyof T]: [K, T[K]];
}[keyof T][];

export const transformFormFields = <T extends object>(fields: T) => {
	return (Object.entries(fields) as Entries<T>).map(([key, val]) => {
		return {
			...val,
			field_name: key,
		};
	});
};
