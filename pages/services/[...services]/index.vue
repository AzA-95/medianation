<template>
	<component
		:is="components[item.component_name]"
		v-for="(item, i) in content"
		:key="i"
		:data="item"
	></component>
</template>

<script setup lang="ts">
	import type { Component } from 'vue';
	import { useRoute } from 'vue-router';
	import { useHead } from '#imports';
	import type { ServicesDetailPageType } from '@/types/pages/services-detail-page';
	import { useApiFetch } from '@/composables/use-api-fetch';
	import { useMetaStore } from '@/stores/meta';
	import { handleError } from '@/helpers/handle-error';

	const route = useRoute();
	// Из-за слеша в конце (Урл) добавляется лишний пустой урл в конец масива
	// Чтобы пофиксить очишаем последнию пустую строку с массива урла
	// не знаю точно связан или нет этот issue https://github.com/nuxt/nuxt/issues/15462
	const normalizedRouteParams = (route.params.services as string[]).filter(
		(route: string) => {
			return route !== '';
		},
	);

	const { data, error } = await useApiFetch<ServicesDetailPageType>(
		`page/services/${normalizedRouteParams.join('/')}/`,
	);

	if (!data.value) {
		throw handleError({
			statusCode: error.value?.statusCode || 500,
			fatal: true,
			error: error.value,
		});
	}

	// Добавляем новые блоки(Костылью) по условию пока не внедрятся в апи
	const isSearchBoosterPage =
		normalizedRouteParams.length === 2 &&
		normalizedRouteParams[1] ===
			'integratsiya_i_podderzhka_umnogo_poiska_searchbooster';

	if (isSearchBoosterPage) {
		const content = data.value.page.content;
		const indexOfClientsGalleryComponent = content.findIndex(
			(data) => data.component_name === 'ClientsGallery',
		);

		// Предотврошаем дублирование вставок компонента по indexOfClientsGalleryComponent
		// если страница повторно моунтится(после рендера ssr)
		if (indexOfClientsGalleryComponent === -1) {
			// Добавляем компонент ClientsGallery после первого компонента на странице
			content.splice(1, 0, {
				id: 'custom/clientsgallery',
				type: 'block',
				component_name: 'ClientsGallery',
				name: 'Эту услугу заказывали:',
				items: [
					{
						picture:
							'/service-search-booster-page/clients-gallery/pic.svg',
						picture_params: {
							width: 432,
							height: 128,
						},
					},
					{
						picture:
							'/service-search-booster-page/clients-gallery/pic-2.svg',
						picture_params: {
							width: 432,
							height: 128,
						},
					},
					{
						picture:
							'/service-search-booster-page/clients-gallery/pic-3.svg',
						picture_params: {
							width: 432,
							height: 128,
						},
					},
				],
			});

			// Добавляем компонент SpecialOffer после компонента TariffBlock
			const indexOfTariffBlockComponent = content.findIndex(
				(data) => data.component_name === 'TariffBlock',
			);

			if (indexOfTariffBlockComponent !== -1) {
				content.splice(indexOfTariffBlockComponent + 1, 0, {
					id: 'custom/specialoffer',
					type: 'block',
					component_name: 'SpecialOffer',
					title: 'Спецпредложение',
					text: `Мы можем разработать или доработать ваш XML-фид в
							соответствии со всеми требованиями системы SearchBooster`,
					prices: [
						{
							price: '20 000 ₽',
							text: `При выборе нас как интеграторов
									<br />
									SearchBooster`,
						},
						{
							price: 'от 25 000 ₽',
							text: `Стоимость отдельной услуги
									<br />
									по разработке фида`,
						},
					],
				});
			}

			// Добавляем компонент Platforms после компонента TeamGallery
			const indexOfPlatformsComponent = content.findIndex(
				(data) => data.component_name === 'TeamGallery',
			);

			if (indexOfPlatformsComponent !== -1) {
				content.splice(indexOfPlatformsComponent + 1, 0, {
					id: 'custom/platforms',
					type: 'block',
					component_name: 'Platforms',
					title: 'Платформы, с которыми работаем',
					items: [
						{
							picture:
								'/service-search-booster-page/supported-platforms/1.svg',
							picture_params: {
								width: '245',
								height: '56',
							},
						},
						{
							picture:
								'/service-search-booster-page/supported-platforms/2.svg',
							picture_params: {
								width: '245',
								height: '56',
							},
						},
						{
							picture:
								'/service-search-booster-page/supported-platforms/3.svg',
							picture_params: {
								width: '245',
								height: '56',
							},
						},
						{
							picture:
								'/service-search-booster-page/supported-platforms/4.png',
							picture_params: {
								width: '245',
								height: '56',
							},
						},
					],
				});
			}
		}
	}
	// Конец

	const componentsPath: Record<string, string> = {
		StaticBannerService: 'base-banner-service',
		StaticBannerGallery: 'base-banner-service-adapter',
		BannerGallery: 'base-banner-service-adapter',
		ServicesInfo: 'base-service-info',
		MenuList: 'base-desc-with-menu-list',
		TextDefault: 'base-text-default',
		TabsBlock: 'base-vertical-tabs',
		PromoGallery: 'base-offer',
		ThesisBlock: 'base-info-columns',
		VideoStory: 'base-video-story-adapter',
		TariffBlock: 'base-tarrifs-grid',
		Price: 'base-tarrifs-grid-adapter',
		TeamGallery: 'base-team',
		CaseCarousel: 'base-cases-slider',
		CaseGallery: 'base-cases-slider',
		ClientsGallery: 'base-clients-slider',
		Platforms: 'base-supported-platforms',
		SpecialOffer: 'base-offer-special',
		Certificate: 'base-certificates',
		BlogersGallery: 'base-blogers-slider',
		NewsGallery: 'base-news-slider',
		ReviewsGallery: 'base-reviews-slider',
		FeaturesGallery: 'base-advantages',
		WarrantyGallery: 'base-warranties',
		FaqGallery: 'base-faq',
		Form: 'the-footer-form',
	};

	const components: Record<string, Component> = {};

	const loadComponentsLazy = async (data: ServicesDetailPageType) => {
		const componentNames = data.page.content.map((item) => {
			return item.component_name;
		});

		const promises = [];
		const componentNamesByIndex: string[] = [];

		for (const key of componentNames) {
			const fileName = componentsPath[key];

			if (fileName) {
				// fix me path ../../ replace to @
				promises.push(
					import(`../../../components/${fileName}/index.vue`),
				);

				componentNamesByIndex.push(key);
			}
		}

		try {
			const loadedComponents = await Promise.all(promises);

			loadedComponents.forEach((component, index) => {
				const componentName = componentNamesByIndex[index];

				components[componentName] = component.default;
			});
		} catch (error) {
			/* eslint-disable-next-line no-console */
			console.error(error);

			throw handleError({
				statusCode: 500,
				fatal: true,
				error,
			});
		}
	};

	await loadComponentsLazy(data.value);

	const meta = data.value.page.meta;
	const pageContent = data.value.page.content;

	const isFirstComponentBanner = [
		'StaticBannerService',
		'StaticBannerGallery',
		'BannerGallery',
	].includes(pageContent[0].component_name);

	const schemaOrgData = (() => {
		type BannerFirstType = (typeof pageContent)[0];
		type BannerSecondType = (typeof pageContent)[1];

		const serviceBanner = pageContent.find(
			(component): component is BannerFirstType | BannerSecondType => {
				if (
					component.component_name === 'StaticBannerService' ||
					component.component_name === 'StaticBannerGallery'
				) {
					return true;
				}

				return false;
			},
		);

		type TariffBlockFirstType = (typeof pageContent)[2];
		type TariffBlockSecondType = (typeof pageContent)[3];

		const TariffBlock = pageContent.find(
			(
				component,
			): component is TariffBlockFirstType | TariffBlockSecondType => {
				if (
					component.component_name === 'Price' ||
					component.component_name === 'TariffBlock'
				) {
					return true;
				}

				return false;
			},
		);

		let price = null;

		if (
			serviceBanner &&
			((serviceBanner as BannerFirstType).price ||
				(serviceBanner as BannerSecondType).price_from)
		) {
			price =
				(serviceBanner as BannerFirstType).price ||
				(serviceBanner as BannerSecondType).price_from;
		} else if (
			TariffBlock &&
			TariffBlock.items?.length > 0 &&
			TariffBlock.items[0].price
		) {
			price = TariffBlock.items[0].price;
		}

		const defaults = {
			'@context': 'https://schema.org',
			'@type': 'Product',
			name: meta.h1,
			description: meta.description,
		};

		const offer = {
			offers: {
				'@type': 'Offer',
				price,
				priceCurrency: 'RUB',
			},
		};

		return JSON.stringify({
			...defaults,
			...(price ? offer : {}),
		});
	})();

	useHead({
		bodyAttrs: {
			class: {
				'menu-light-color': isFirstComponentBanner,
			},
			tagDuplicateStrategy: 'replace',
		},
		script: [
			{
				type: 'application/ld+json',
				innerHTML: schemaOrgData,
			},
		],
	});

	const { setMeta } = useMetaStore();

	setMeta(meta);

	const content = pageContent.filter((item) => {
		const title = meta.h1;

		if (
			item.component_name === 'StaticBannerService' ||
			item.component_name === 'StaticBannerGallery'
		) {
			item.title = title;

			if (isSearchBoosterPage) {
				item.show_sale_icon = true;
			}
		}

		if (item.component_name === 'CaseGallery') {
			// Временый костыль пока не пофиксят в апи
			// Перезаписываем заголовок с апи на статический текст(Кейсы) у компонента CaseGallery
			item.name = 'Кейсы';
		}

		return true;
	});
</script>
