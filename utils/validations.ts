import { getFileExtension, formatBytes } from './common';

export const isValidEmail = (email: string): boolean => {
	const regexep =
		/^(([^<>()[\]\\.,;:\s@\\"]+(\.[^<>()[\]\\.,;:\s@\\"]+)*)|(\\".+\\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	return regexep.test(email);
};

export const validateFiles = (
	files: File[],
	options: {
		maxFileSize: number;
		maxFileSizeAll?: number;
		maxFilesCount: number;
		allowedExtensions: string[];
	},
): {
	hasError: boolean;
	hasValidFiles?: boolean;
	validFiles?: File[];
	errorMessages?: string[];
} => {
	const { maxFileSize, maxFileSizeAll, maxFilesCount, allowedExtensions } =
		options;

	if (maxFilesCount >= files.length) {
		let totalFileSize = 0;
		const validFiles: File[] = [];
		const errorsBag: {
			extensions: string[];
			sizes: number[];
		} = {
			extensions: [],
			sizes: [],
		};

		files.forEach((file) => {
			let hasError = false;
			const fileExtension = getFileExtension(file.name);
			const hasCorrectExtension =
				allowedExtensions.includes(fileExtension);

			if (!hasCorrectExtension) {
				hasError = true;
				errorsBag.extensions.push(fileExtension);
			}

			if (hasCorrectExtension && file.size > maxFileSize) {
				hasError = true;
				errorsBag.sizes.push(file.size);
			}

			if (!hasError) {
				validFiles.push(file);
				totalFileSize += file.size;
			}
		});

		const errorMessages = [];

		if (errorsBag.extensions.length) {
			const invalidExtensions = [...new Set(errorsBag.extensions)];
			const invalidExtensionsString = invalidExtensions
				.map((ex) => `.${ex}`)
				.join(', ');
			const supportedExtensionsString = allowedExtensions
				.map((ex) => `.${ex}`)
				.join(', ');

			let errorMessage = '';

			if (invalidExtensions.length > 1) {
				errorMessage = `Выбраны не подерживаймые форматы файлов
									${invalidExtensionsString}
									<br>
									Выберите файл из доступных расширений файлов ${supportedExtensionsString}
				`;
			} else {
				errorMessage = `Выбран не подерживаймый формат файла
									${invalidExtensionsString}
									<br>
									Выберите файл из доступных расширений файлов ${supportedExtensionsString}
				`;
			}

			errorMessages.push(errorMessage);
		}

		const size = maxFileSizeAll || maxFileSize;
		const maxFileSizePrint = formatBytes(size);

		if (errorsBag.sizes.length || totalFileSize > size) {
			let errorMessage = '';

			if (errorsBag.sizes.length === 1) {
				errorMessage = `Перевышен допустимый размер файла ${maxFileSizePrint}`;
			} else {
				errorMessage = `Перевышен допустимый размер файлов ${maxFileSizePrint}`;
			}

			errorMessages.push(errorMessage);
		}

		const hasValidFiles =
			validFiles.length > 0 &&
			errorsBag.sizes.length === 0 &&
			size > totalFileSize;

		if (errorMessages.length > 0) {
			return {
				hasError: true,
				hasValidFiles,
				validFiles: hasValidFiles ? validFiles : undefined,
				errorMessages,
			};
		}

		return {
			hasError: false,
		};
	} else {
		const text =
			maxFilesCount === 1
				? `${maxFilesCount} документа`
				: `${maxFilesCount} документов`;

		return {
			hasError: true,
			errorMessages: [`Разрешается загружать до ${text}`],
		};
	}
};
