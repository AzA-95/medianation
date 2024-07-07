import { useRoute } from 'vue-router';
import { useUtmsStore } from '@/stores/utms';
import { normalizeObjectKeys, filterObjectByKeys } from '@/utils/common';
import { UTM_FIELD_NAMES } from '@/constants';

type UtmsRefererType = 'advertising' | 'custom';
type UtmsObjectType = Record<(typeof UTM_FIELD_NAMES)[number], string>;
type UtmsObjectExtendedType = Partial<UtmsObjectType> & {
	expiry: number;
	type: UtmsRefererType;
};

export const initUtmsDataForForm = () => {
	const route = useRoute();
	const store = useUtmsStore();

	const getUtmsFromLocalStorage = () => {
		const savedUtms = localStorage.getItem('utms');
		return savedUtms
			? (JSON.parse(savedUtms) as UtmsObjectExtendedType)
			: null;
	};

	const setUtmsToStorage = (
		type: UtmsRefererType,
		utms: Partial<UtmsObjectType>,
		updateExpiry = true,
	) => {
		if (updateExpiry) {
			const expiryDate = new Date();
			expiryDate.setMonth(expiryDate.getMonth() + 1); // expiry 30 days

			const obj: UtmsObjectExtendedType = {
				...utms,
				expiry: expiryDate.getTime(),
				type,
			};

			localStorage.setItem('utms', JSON.stringify(obj));
		}

		store.setUtms(utms);
	};

	const setUtms = (urlQueryParams: Record<string, unknown>) => {
		const keys = UTM_FIELD_NAMES;
		const normalizedUrlKeys = normalizeObjectKeys(urlQueryParams);
		const utms = filterObjectByKeys<UtmsObjectType>(
			normalizedUrlKeys,
			keys,
		);

		// the condition is met if the URL contains utms
		if (utms) {
			setUtmsToStorage('advertising', utms);
		} else {
			const now = new Date();
			const utms = getUtmsFromLocalStorage();

			if (
				utms &&
				utms.type === 'advertising' &&
				utms.expiry > now.getTime()
			) {
				const parsedUtms = filterObjectByKeys<UtmsObjectType>(
					utms,
					keys,
				);

				setUtmsToStorage('advertising', parsedUtms!, false);
			} else {
				const referrer = document.referrer;

				if (referrer) {
					const arrUrl = referrer.split('.');
					// give domain in domain.ru and give domain in sub.domain.ru
					const domainName = arrUrl[arrUrl.length - 2]?.replace(
						/^https?:\/\//,
						'',
					);
					const searchEngineDomains = ['google', 'yandex', 'ya'];
					const socialMediaDomains = [
						't',
						'vk',
						'ok',
						'instagram',
						'facebook',
						'twitter',
						'telegram',
						'dzen',
						'youtube',
					];

					let utmMediumType = 'referrer';

					if (searchEngineDomains.includes(domainName)) {
						utmMediumType = 'organic';
					} else if (socialMediaDomains.includes(domainName)) {
						utmMediumType = 'social';
					}

					const utms: Partial<UtmsObjectType> = {
						utm_source: referrer,
						utm_medium: utmMediumType,
					};

					setUtmsToStorage('custom', utms);
				} else if (
					// prevent rewrite utms if saved on localStorage referrer(domain)
					utms &&
					utms.type === 'custom' &&
					utms.utm_source !== 'direct'
				) {
					const parsedUtms = filterObjectByKeys<UtmsObjectType>(
						utms,
						keys,
					);

					setUtmsToStorage('custom', parsedUtms!, false);
				} else {
					const utms: Partial<UtmsObjectType> = {
						utm_source: 'direct',
						utm_medium: 'none',
					};

					setUtmsToStorage('custom', utms);
				}
			}
		}
	};

	setUtms(route.query);
};
