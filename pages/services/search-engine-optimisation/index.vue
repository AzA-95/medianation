<template>
	<BaseBannerLand :data="bannerData" />
	<BaseReviewsClient :data="reviewsData" />
	<BaseCaseBanners :data="casesData" />
	<BaseTariffsSmallGrid :data="tariffsData" />
	<TheFooterForm
		v-if="formData"
		:data="formData"
		:is-green-button="true"
		:modifier-classes="['bg-white']"
	/>
	<TheFooterSmall />
</template>

<script setup lang="ts">
	import { definePageMeta } from '#imports';
	import type { FormType } from '@/types/forms';
	import { CONTACT_FORM_URL } from '@/constants';
	import { useMetaStore } from '@/stores/meta';
	import { useApiFetch } from '@/composables/use-api-fetch';
	import BaseBannerLand from '@/components/base-banner-land';
	import BaseReviewsClient from '@/components/base-reviews-client';
	import BaseCaseBanners from '@/components/base-case-banners';
	import BaseTariffsSmallGrid from '@/components/base-tariffs-small-grid';
	import TheFooterForm from '@/components/the-footer-form';
	import TheFooterSmall from '@/components/the-footer-small';

	definePageMeta({
		layout: false,
	});

	const { setMeta } = useMetaStore();

	setMeta({
		title: 'SEO и оптимизация сайта, у признанного на рынке эксперта',
		description: '',
		og: {
			title: 'SEO и оптимизация сайта, у признанного на рынке эксперта',
			description: '',
			image: '/og/default.jpg',
			type: 'product',
			url: 'https://medianation.ru/services/search-engine-optimisation/',
		},
		noindex: false,
	});

	const bannerData = {
		name: 'SEO',
		text: 'и оптимизация сайта, <br> у признанного на рынке эксперта',
		awards: [
			{
				picture:
					'/service-search-engine-optimisation-page/banner/awards/1.png',
				picture_params: {
					width: '80',
					height: '80',
				},
				name: 'ADINDEX, 2023',
				text: '«Качество SEO»',
			},
			{
				picture:
					'/service-search-engine-optimisation-page/banner/awards/2.png',
				picture_params: {
					width: '80',
					height: '80',
				},
				name: 'ADINDEX, 2023',
				text: '«Рейтинг SEO-агентств»',
			},
			{
				picture:
					'/service-search-engine-optimisation-page/banner/awards/3.png',
				picture_params: {
					width: '80',
					height: '80',
				},
				name: 'ADINDEX, 2023',
				text: '«Качество аналитики и отчетности в SEO»',
			},
			{
				picture:
					'/service-search-engine-optimisation-page/banner/awards/3.png',
				picture_params: {
					width: '80',
					height: '80',
				},
				name: 'РЕЙТИНГ РУНЕТА, 2022',
				text: '«SEO-аналитика и консалтинг»',
			},
		],
	};

	const reviewsData = {
		name: 'Клиенты и отзывы',
		items: [
			{
				name: 'Отзыв от eksmo.ru',
				text: 'Работаем с MediaNation уже более 3-х лет. Было получено множество ценных рекомендаций, выполнены самые различные работы и технического характера, и по контенту, которые через некоторое время обязательно приводили к отличным показателям. Всегда рекомендую компанию в лице Алексея Великанова партнерам и друзьям. Для издательства ЭКСМО – это удачное, приятное и полезное взаимодействие. Особенно ценим быструю обратную связь, понятные задачи, развернутые отчеты и, конечно, результат.',
				rating: 5,
				client: {
					name: 'ЭКСМО',
					picture:
						'/service-search-engine-optimisation-page/reviews/1.png',
					picture_params: {
						width: '412',
						height: '250',
					},
					picture_white:
						'/service-search-engine-optimisation-page/reviews/1_2.png',
					picture_white_params: {
						width: '412',
						height: '250',
					},
					link: null,
				},
				author: {
					name: 'Северюхина Лаура',
					position: 'Руководитель проекта',
				},
				file: null,
			},
			{
				name: 'Отзыв от ООО «Интерлизинг»',
				text: 'Выражаем благодарность команде ООО «МедиаНация» за продуктивную работу по SEO-продвижению и техническое сопровождение нашего сайта ileasing.ru. Ценим Ваш проактивный подход и профессионализм.',
				rating: 5,
				client: {
					name: 'Интерлизинг',
					picture:
						'/service-search-engine-optimisation-page/reviews/2.png',
					picture_params: {
						width: '571',
						height: '192',
					},
					picture_white:
						'/service-search-engine-optimisation-page/reviews/2_2.png',
					picture_white_params: {
						width: '193',
						height: '41',
					},
					link: null,
				},
				author: {
					name: 'Интерлизинг',
					position: 'Группа маркетинга',
				},
				file: '/service-search-engine-optimisation-page/reviews/files/2.pdf',
			},
			{
				name: 'Отзыв от Здоровье.ру',
				text: 'В процессе сотрудничества мы вовремя получали экспертные рекомендации от команды Медианация и ответы на свои вопросы. Приятно отметить, что специалисты Медианации предлагают свои решения, чтобы оптимизировать нашу работу и повысить эффективность сотрудничества.',
				rating: 5,
				client: {
					name: 'Здоровье.ру',
					picture:
						'/service-search-engine-optimisation-page/reviews/3.png',
					picture_params: {
						width: '586',
						height: '227',
					},
					picture_white:
						'/service-search-engine-optimisation-page/reviews/3_2.png',
					picture_white_params: {
						width: '586',
						height: '223',
					},
					link: null,
				},
				author: {
					name: 'Ольга Рытикова',
					position: 'Директор по маркетингу',
				},
				file: '/service-search-engine-optimisation-page/reviews/files/3.pdf',
			},
		],
	};

	const casesData = {
		title: 'Кейсы',
		items: [
			{
				pic: '/service-search-engine-optimisation-page/case-slider/1.svg',
				name: 'Победили фильтр Яндекса и в 3 раза увеличили поисковый трафик',
				link: '/cases/seo-dlya-kosmetologicheskoy-kliniki/',
			},
			{
				pic: '/service-search-engine-optimisation-page/case-slider/2.svg',
				name: 'Увеличили поисковый трафик в 3 раза',
				link: '/cases/seo-prodvizhenie-kosmetologicheskoy-kliniki/',
			},
			{
				pic: '/service-search-engine-optimisation-page/case-slider/3.svg',
				name: 'В 2 раза увеличили поисковый трафик на портал',
				link: '/cases/seo-prodvizhenie-people-talk/',
			},
			{
				pic: '/service-search-engine-optimisation-page/case-slider/4.svg',
				name: 'Обеспечили рост бизнеса на 20% ежемесячно',
				link: '/cases/kompleksnoe-prodvizhenie-linzmaster/',
			},
			{
				pic: '/service-search-engine-optimisation-page/case-slider/5.svg',
				name: 'Увеличили поисковый трафик в 3 раза и вывели сайт сети аптек в топ-10 во всех регионах России',
				link: '/cases/seo-dlya-onlayn-apteki/',
			},
			{
				pic: '/service-search-engine-optimisation-page/case-slider/6.svg',
				name: 'Увеличили поисковый трафик в 2 раза и вывели сайт в топ-10 Google',
				link: '/cases/keys-svyaznoy-trevel-seo/',
			},
			{
				pic: '/service-search-engine-optimisation-page/case-slider/7.svg',
				name: 'Увеличили поисковый трафик в 2,6 раза за 6 месяцев',
				link: '/cases/uvelichili-poiskovyy-trafik-v-2-6-raza-za-6-mesyatsev/',
			},
			{
				pic: '/service-search-engine-optimisation-page/case-slider/8.svg',
				name: 'На 85% увеличили органический трафик',
				link: '/cases/seo-prodvizhenie-sayta-hansa/',
			},
		],
	};

	const tariffsData = {
		title: 'Тарифы',
		items: [
			{
				name: 'Малый',
				price: 'от 35 000 ₽',
				text: ` <ul>
									<li>Классические работы по продвижению сайта;</li>
									<li>Проработка основных факторов продвижения;</li>
									<li>В команде SEO-специалист и аккаунт менеджер.</li>
								</ul>
						`,
				columns: [
					{
						info_tite: '33%',
						info_text: 'Скидка на первый месяц работ',
					},
				],
			},
			{
				name: 'Средний',
				price: 'от 90 000 ₽',
				text: ` <ul>
									<li>Расширенная проработка всех факторов ранжирования;</li>
									<li>Работы по увеличению конверсии сайта;</li>
									<li>Анализ юзабилити;</li>
									<li>В команде SEO специалист под руководством старшего специалиста.</li>
								</ul>
						`,
				columns: [
					{
						info_tite: '33%',
						info_text: 'Скидка на первый месяц работ',
					},
					{
						info_tite: 'Включено',
						info_text: 'все работы тарифа Малый',
					},
				],
			},
			{
				name: 'Большой',
				price: 'от 130 000 ₽',
				text: ` <ul>
									<li>Полный охват спроса;</li>
									<li>Команда опытных старших SEO специалистов;</li>
									<li>Анализ воронки продаж;</li>
									<li>Работы по улучшению лояльности пользователей.</li>
								</ul>
						`,
				columns: [
					{
						info_tite: '33%',
						info_text: 'Скидка на первый месяц работ',
					},
					{
						info_tite: 'Включено',
						info_text: 'все работы тарифа Средний',
					},
				],
			},
			{
				name: 'По KPI',
				price: 'от 60 000 ₽ + KPI',
				text: ` <ul>
									<li>Оплата за конкретный результат;</li>
									<li>Расширенная аналитика;</li>
									<li>Нелимитированное количество часов работы SEO-специалистов.</li>
								</ul>
						`,
				columns: [
					{
						info_tite: '33%',
						info_text: 'Скидка на первый месяц работ',
					},
				],
			},
			{
				name: 'С оплатой за лиды',
				price: 'от 100 000 ₽',
				text: ` <ul>
									<li>Оплата только за целевые действия — заявки, звонки, покупки;</li>
									<li>Команда опытных старших SEO специалистов;</li>
									<li>Расширенная аналитика;</li>
									<li>Работы по улучшению лояльности пользователей.</li>
								</ul>
						`,
				columns: [
					{
						info_tite: '33%',
						info_text: 'Скидка на первый месяц работ',
					},
				],
			},
			{
				name: 'С оплатой за трафик',
				price: 'от 80 000 ₽',
				text: ` <ul>
									<li>Оплата только за привлеченный  небрендовый трафик;</li>
									<li>Команда опытных старших SEO специалистов;</li>
									<li>Расширенная аналитика;</li>
									<li>Работы по улучшению лояльности пользователей.</li>
								</ul>
						`,
				columns: [
					{
						info_tite: '33%',
						info_text: 'Скидка на первый месяц работ',
					},
				],
			},
			{
				name: 'С оплатой за позиции',
				price: 'от 60 000 ₽',
				text: ` <ul>
									<li>Оплата только за увеличение видимости;</li>
									<li>Команда опытных старших SEO специалистов;</li>
									<li>Расширенная аналитика.</li>
								</ul>
						`,
				columns: [
					{
						info_tite: '33%',
						info_text: 'Скидка на первый месяц работ',
					},
				],
			},
			{
				name: 'Помощь с выбором',
				price: 'Бесплатно',
				text: ` <ul>
									<li>Подготовим коммерческое предложение;</li>
									<li>Проведем анализ коммерческой ниши;</li>
									<li>Бесплатно проконсультируем.</li>
								</ul>
						`,
				columns: null,
			},
		],
	};

	const getFormData = async () => {
		const { data, error } = await useApiFetch<FormType>(CONTACT_FORM_URL);

		if (data.value) {
			return {
				...data.value,
				name: 'Любим свою работу, <br> поэтому делаем ее хорошо!',
				caption: 'Мы поможем вам найти здесь своих покупателей.',
				captionNew: 'Мы поможем вам найти здесь своих покупателей.',
			};
		} else {
			// eslint-disable-next-line no-console
			console.error(error.value);
			return null;
		}
	};

	let formData: Awaited<ReturnType<typeof getFormData>> | null = null;

	await getFormData().then((data) => {
		formData = data as typeof formData;
	});
</script>
