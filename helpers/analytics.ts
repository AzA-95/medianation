import { useRoute } from 'vue-router';
import { useAnalyticsStore } from '@/stores/analytics';
import { normalizeObjectKeys, filterObjectByKeys } from '@/utils/common';
import { ANALYTIC_FIELD_NAMES } from '@/constants';

type UnionUrlKeysType = 'gclid' | 'yclid' | 'fbclid';
type UrlKeysType =
	UnionUrlKeysType extends (typeof ANALYTIC_FIELD_NAMES)[number]
		? UnionUrlKeysType
		: never;
type UrlKeysObjectType = Record<UnionUrlKeysType, string>;
type UrlKeysObjectExtendedType = Partial<UrlKeysObjectType> & {
	expiry: number;
};

export const initAnalyticsDataForForm = () => {
	if (!process.client) return;

	const route = useRoute();
	const store = useAnalyticsStore();

	const getGoogleClientID = (): Promise<{ clientID: string }> => {
		const getClientID = () => {
			if (
				// @ts-ignore: Unreachable code error
				window.ga &&
				// @ts-ignore: Unreachable code error
				typeof window.ga === 'function' &&
				// @ts-ignore: Unreachable code error
				typeof ga.getAll === 'function'
			) {
				// @ts-ignore: Unreachable code error
				const gaTracker = ga.getAll()[0];
				return gaTracker ? gaTracker.get('clientId') : '0';
			}

			return null;
		};

		return new Promise((resolve) => {
			// stop loop executed infinity times
			const timerId = setTimeout(() => {
				resolve({
					clientID: '0',
				});
			}, 30000);

			const reCall = () => {
				const clientID = getClientID();

				if (clientID === null) {
					setTimeout(() => {
						reCall();
					}, 400);
				} else {
					clearTimeout(timerId);

					resolve({
						clientID,
					});
				}
			};

			reCall();
		});
	};

	const getYandexCounterAndClientID = (): Promise<{
		clientID: string;
		counterID: number;
	}> => {
		const getCounterAndClientID = () => {
			// @ts-ignore: Unreachable code error
			if (window.Ya && (window.Ya.Metrika2 || window.Ya.Metrika)) {
				let clientID = '0';
				let counterID = 0;
				const yandexMetrika =
					// @ts-ignore: Unreachable code error
					window.Ya.Metrika2 || window.Ya.Metrika;
				const counters = yandexMetrika.counters();

				if (Array.isArray(counters) && counters.length >= 1) {
					counterID = counters[0].id || 0;
				}

				// @ts-ignore: Unreachable code error
				if (window[`yaCounter${counterID}`]) {
					clientID =
						// @ts-ignore: Unreachable code error
						window[`yaCounter${counterID}`].getClientID() || '0';
				}

				return {
					clientID,
					counterID,
				};
			}

			return null;
		};

		return new Promise((resolve) => {
			// stop loop executed infinity times
			const timerId = setTimeout(() => {
				resolve({
					clientID: '0',
					counterID: 0,
				});
			}, 30000);

			const reCall = () => {
				const result = getCounterAndClientID();

				if (result === null) {
					setTimeout(() => {
						reCall();
					}, 400);
				} else {
					clearTimeout(timerId);

					resolve({
						clientID: result.clientID,
						counterID: result.counterID,
					});
				}
			};

			reCall();
		});
	};

	const getAnalyticsFromLocalStorage = () => {
		const savedAnalyticsParams = localStorage.getItem('analyticsParams');
		return savedAnalyticsParams
			? (JSON.parse(savedAnalyticsParams) as UrlKeysObjectExtendedType)
			: null;
	};

	const setAnalyticsParams = (urlQueryParams: Record<string, unknown>) => {
		const keys: UrlKeysType[] = ['gclid', 'yclid', 'fbclid'];
		const normalizedUrlKeys = normalizeObjectKeys(urlQueryParams);
		const analyticsParams = filterObjectByKeys<UrlKeysObjectType>(
			normalizedUrlKeys,
			keys,
		);

		// the condition is met if the URL contains analytics params
		if (analyticsParams) {
			const expiryDate = new Date();
			expiryDate.setMonth(expiryDate.getMonth() + 1); // expiry 30 days

			const obj: UrlKeysObjectExtendedType = {
				...analyticsParams,
				expiry: expiryDate.getTime(),
			};

			localStorage.setItem('analyticsParams', JSON.stringify(obj));

			store.setAnalytics(analyticsParams);
		} else {
			const now = new Date();
			const parsedAnalyticsParams = getAnalyticsFromLocalStorage();

			if (
				parsedAnalyticsParams &&
				parsedAnalyticsParams.expiry > now.getTime()
			) {
				const analyticsParams = filterObjectByKeys<UrlKeysObjectType>(
					parsedAnalyticsParams,
					keys,
				);

				store.setAnalytics(analyticsParams!);
			}
		}

		getGoogleClientID().then((data) => {
			store.setAnalytics({
				gclientid: data.clientID,
			});
		});

		getYandexCounterAndClientID().then((data) => {
			store.setAnalytics({
				_ym_uid: data.clientID,
				_ym_counter: data.counterID,
			});
		});
	};

	setAnalyticsParams(route.query);
};
