import { watch } from 'vue';
import type { LocationQuery } from 'vue-router';
import { useRoute, useRouter } from 'vue-router';

type FilterFieldNames = string | string[];

type FilterSelectedType = {
	field_name: string;
	field_value: string;
}[];

type ValueOfType<T> = T[keyof T];

const getDiffQueryParams = (
	queryUrl: LocationQuery,
	filterFieldNames: FilterFieldNames,
) => {
	const result: Record<string, ValueOfType<LocationQuery>> = {};
	const fields = Array.isArray(filterFieldNames)
		? filterFieldNames
		: [filterFieldNames];

	// Оставляем только query параметры не фильтра
	Object.keys(queryUrl).forEach((key) => {
		const fieldName = fields.find((name) => name === key);

		if (!fieldName) {
			result[key] = queryUrl[key];
		}
	});

	return result;
};

export const useUrlFilter = () => {
	const route = useRoute();
	const router = useRouter();
	let isProgramaticUrlQueryChange = false;

	const getQueryStringFromObject = (object: Record<string, string>) => {
		return new URLSearchParams(object).toString();
	};

	const getSelectedFilterFromUrl = (filterFieldNames: FilterFieldNames) => {
		const queryUrl = route.query;
		const selectedValues: FilterSelectedType = [];
		const fields = Array.isArray(filterFieldNames)
			? filterFieldNames
			: [filterFieldNames];

		// Оставляем только query параметры фильтра
		Object.keys(queryUrl).forEach((key) => {
			const fieldName = fields.find((name) => name === key);

			if (!fieldName) return;

			const values = queryUrl[key];
			const queryValues = Array.isArray(values) ? values : [values];

			queryValues.forEach((value) => {
				if (value !== null) {
					selectedValues.push({
						field_name: fieldName,
						field_value: value,
					});
				}
			});
		});

		return selectedValues.length > 0 ? selectedValues : null;
	};

	const buildQueryUrl = (
		filterFieldNames: FilterFieldNames,
		filterQueryUri: string,
	) => {
		isProgramaticUrlQueryChange = true;
		const queryUrl = route.query;
		const searchParams = new URLSearchParams(filterQueryUri);
		const queryData = getDiffQueryParams(queryUrl, filterFieldNames);

		searchParams.forEach((_, key) => {
			queryData[key] = searchParams.getAll(key);
		});

		// path нужен чисто для того чтобы был слеш в конце урла(так как на сайте все урлы оканчиваются со слешом в конце)
		router.push({ path: route.path, query: queryData });
	};

	// Временный костыль пока не доработают апи(чтобы api page принимал get запросы фильтрации)
	const initListsWithQueryData = (
		filterFieldNames: FilterFieldNames,
		callback: (
			queryUrl: string,
			selectedValues: FilterSelectedType,
		) => Promise<void>,
	): Promise<void> | undefined => {
		const urlQueryValues = getSelectedFilterFromUrl(filterFieldNames);

		if (urlQueryValues) {
			const queryUri = new URLSearchParams();

			urlQueryValues.forEach((item) => {
				queryUri.append(item.field_name, item.field_value);
			});

			return callback(queryUri.toString(), urlQueryValues);
		}
	};

	const currentPath = route.path;

	const watchOnChangeQueryUrlByNavigate = (
		filterFieldNames: FilterFieldNames,
		callback: (queryUrl: string) => void,
	) => {
		watch([() => route.path, () => route.query], ([toPath]) => {
			// Выходим если страница сменилась (Так как watch не дестроится при смене урла path сразу же)
			// Без этой проверки будет отправляться лишний запрос на серевер через вызов callback;
			// при смене страницы
			if (currentPath !== toPath) {
				return;
			}

			// Выполняется только когда навигация урла query изменяется или через кнопки браузера(Назад, Вперед)
			// Или при переходе по ссылке в меню на ту же страницу(Но с другими query параметрами или без них)
			if (!isProgramaticUrlQueryChange) {
				const selectedValues =
					getSelectedFilterFromUrl(filterFieldNames);
				const queryUrl = new URLSearchParams();

				selectedValues?.forEach((item) => {
					queryUrl.append(item.field_name, item.field_value);
				});

				callback(queryUrl.toString());
			}

			isProgramaticUrlQueryChange = false;
		});
	};

	const setFilter = (params) => {
		// if (process.client) {
		// 	window.history.replaceState(
		// 		{ ...window.history.state, ...params },
		// 		'',
		// 	);
		// }
	};

	return {
		watchOnChangeQueryUrlByNavigate,
		getSelectedFilterFromUrl,
		getQueryStringFromObject,
		initListsWithQueryData,
		buildQueryUrl,
	};
};
