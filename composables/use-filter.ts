import { useIsFirstLoadPageStore } from '@/stores/is-first-load-page';

type FilterSelectedType = {
	field_name: string;
	field_value: string;
}[];

const filterStateKey = 'filterData';

export const useFilter = () => {
	const { isFirstLoadPage } = useIsFirstLoadPageStore();

	// так как фильтр работает только на клиенте без ssr
	// При первой загрузки страницы сбрасывем фильтр(чтоб не было прыжков на клиенте загруженой странице в ssr)
	if (process.client && isFirstLoadPage) {
		window.history.replaceState(
			{
				...window.history.state,
				...{
					[filterStateKey]: null,
				},
			},
			'',
		);
	}

	const getQueryStringFromObject = (object: Record<string, string>) => {
		return new URLSearchParams(object).toString();
	};

	const getSelectedFilter = () => {
		if (process.client) {
			const results: FilterSelectedType = [];
			const filterData = window.history.state[filterStateKey];

			if (filterData) {
				const searchParams = new URLSearchParams(filterData);

				searchParams.forEach((value, key) => {
					results.push({
						field_name: key,
						field_value: value,
					});
				});

				return results.length > 0 ? results : null;
			}
		}

		return null;
	};

	const setFilter = (queryUri: string) => {
		if (process.client) {
			window.history.replaceState(
				{
					...window.history.state,
					...{
						[filterStateKey]: queryUri,
					},
				},
				'',
			);
		}
	};

	// Временный костыль пока не доработают апи(чтобы api page принимал get запросы фильтрации)
	const initListsWithQueryData = (
		callback: (
			queryUrl: string,
			selectedValues: FilterSelectedType,
		) => Promise<void>,
	): Promise<void> | undefined => {
		const filterValues = getSelectedFilter();

		if (filterValues) {
			const queryUri = new URLSearchParams();

			filterValues.forEach((item) => {
				queryUri.append(item.field_name, item.field_value);
			});

			return callback(queryUri.toString(), filterValues);
		}
	};

	return {
		getQueryStringFromObject,
		getSelectedFilter,
		setFilter,
		initListsWithQueryData,
	};
};
