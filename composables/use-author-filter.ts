import { useRouter } from 'vue-router';
import { useIsFirstLoadPageStore } from '@/stores/is-first-load-page';

type FilterType = {
	name: string;
	field_name: string;
	field_value: string;
};

const filterStateKey = 'filterAuthorData';

export const useAuthorFilter = () => {
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

	const router = useRouter();

	const setFilterAndPush = (data: FilterType, path: string) => {
		router.push({
			path,
			state: {
				[filterStateKey]: {
					name: data.name,
					field_name: data.field_name,
					field_value: data.field_value,
				},
			},
		});
	};

	const getSelectedFilter = () => {
		if (process.client) {
			const filterData = window.history.state[filterStateKey];

			if (filterData) {
				return filterData as FilterType;
			}
		}

		return null;
	};

	const removeFilterIfMatch = (queryUri: string) => {
		const filterData = getSelectedFilter();

		if (filterData) {
			const hasAuthorFilter = queryUri.includes(
				encodeURI(filterData.field_name),
			);

			if (!hasAuthorFilter) {
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
		}
	};

	return {
		setFilterAndPush,
		getSelectedFilter,
		removeFilterIfMatch,
	};
};
