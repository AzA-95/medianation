export type FieldType = {
	field_name: string;
	name?: string;
	type: 'text' | 'textarea' | 'hidden' | 'email' | 'tel' | 'file';
	required?: boolean;
};

export type FileFieldType = FieldType & {
	file_types: string[];
	multiple?: boolean; // see jobs form
	max_count?: number;
	max_size: number;
	max_size_all?: number;
	max_size_print?: string;
};

export type FormType = {
	settings: {
		fields: Record<string, FieldType | FileFieldType>;
		submit: string;
	};
};

export type FormResponseType = {
	success: boolean;
	id?: number;
	error_fields?: string[];
	error_message?: string; // used in subscribe form
	error_messages?: Record<string, string>;
};
