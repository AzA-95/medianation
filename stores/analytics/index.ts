import { shallowRef } from 'vue';
import { defineStore } from 'pinia';
import { ANALYTIC_FIELD_NAMES } from '@/constants';

type AnalyticsObjectType = Record<
	(typeof ANALYTIC_FIELD_NAMES)[number],
	string | number
>;

export const useAnalyticsStore = defineStore('analytics', () => {
	const analytics = shallowRef<AnalyticsObjectType>({
		gclientid: '',
		_ym_uid: '',
		_ym_counter: '',
		gclid: '',
		yclid: '',
		fbclid: '',
	});

	const setAnalytics = (analyticsData: Partial<AnalyticsObjectType>) => {
		analytics.value = {
			...analytics.value,
			...analyticsData,
		};
	};

	return {
		analytics,
		setAnalytics,
	};
});
