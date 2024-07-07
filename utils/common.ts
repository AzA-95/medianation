export const isOnline = () => {
	if (navigator && 'onLine' in navigator) {
		return navigator.onLine;
	}

	return true;
};

export const getFileExtension = (filename: string) => {
	return filename.split('.').pop()?.toLowerCase() as string; // remove undefined type
};

export const formatBytes = (bytes: number, decimals = 2) => {
	if (bytes === 0) return '0Б';

	const k = 1024;
	const dm = decimals < 0 ? 0 : decimals;
	// Формат на руском так как апи отдает формат Кб/Мб тоже на руском(Чтобы было единно)
	const sizes = ['Б', 'Кб', 'Мб', 'Гб', 'Тб', 'Пб'];

	const i = Math.floor(Math.log(bytes) / Math.log(k));

	return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + sizes[i];
};

const isEmptyObject = (obj: Record<string, unknown>) => {
	return Object.keys(obj).length === 0;
};

export const normalizeObjectKeys = (objParams: Record<string, unknown>) => {
	const result: Record<string, unknown> = {};

	for (const [key, value] of Object.entries(objParams)) {
		const normalizedKey = key.toLowerCase();
		result[normalizedKey] = value;
	}

	return result;
};

export const filterObjectByKeys = <R extends Record<string, unknown>>(
	objParams: Record<string, unknown>,
	keys: readonly string[],
) => {
	const result: Record<string, unknown> = {};

	for (const [key, value] of Object.entries(objParams)) {
		if (keys.includes(key)) {
			result[key] = value;
		}
	}

	return isEmptyObject(result) ? null : (result as Partial<R>);
};

export const rusWordEnding = (
	count: number,
	word: string,
	wordSecond: string,
	wordThird: string,
) => {
	if (count >= 11 && count <= 19) return wordThird;

	const remainder = count % 10;

	if (remainder === 1) return word;
	if (remainder >= 2 && remainder <= 4) return wordSecond;
	return wordThird;
};
