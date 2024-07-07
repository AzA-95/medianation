<template>
	<BaseHeaderLand
		ref="headerEl"
		:data="headerData"
	/>
	<BaseAdindexBanner :data="bannerData" />
	<BaseAdindexDescription :data="adindexDescriptionData" />
	<BaseAdindexRating :data="ratingData" />
	<BaseAdindexInfoBanner :data="infoBannerData" />
	<BaseAdindexAdvantages :data="advantagesData" />
	<TheFooterForm
		v-if="formData"
		:data="formData"
		:fixed-top="fixedTop"
		:is-green-button="true"
		:modifier-classes="[
			'title-width-smaller',
			'caption-width-smaller',
			'bg-white',
		]"
	/>
	<BaseCertificates
		v-if="certificates"
		:data="certificates"
		theme="light"
	/>
	<BaseTeam :data="teamData" />
	<BaseReviewsClient :data="reviewsData" />
	<TheFooterSmall />
</template>

<script setup lang="ts">
	import type { UnwrapNestedRefs } from 'vue';
	import { ref, onMounted } from 'vue';
	import { definePageMeta } from '#imports';
	import type { FormType } from '@/types/forms';
	import {
		LISTS_AWARD_URL,
		LISTS_NUMBERS_URL,
		LISTS_CERTIFICATES_URL,
		CONTACT_FORM_URL,
	} from '@/constants';
	import { useMetaStore } from '@/stores/meta';
	import { useApiFetch } from '@/composables/use-api-fetch';
	import { useWindowResizeAxisX } from '@/composables/use-window-resize-axis-x';
	import type { ElementType as HeaderElementType } from '@/components/base-header-land/type';
	import BaseHeaderLand from '@/components/base-header-land';
	import BaseAdindexBanner from '@/components/base-adindex-banner';
	import BaseAdindexDescription from '@/components/base-adindex-description';
	import BaseAdindexRating from '@/components/base-adindex-rating';
	import BaseAdindexInfoBanner from '@/components/base-adindex-info-banner';
	import BaseAdindexAdvantages from '@/components/base-adindex-advantages';
	import TheFooterForm from '@/components/the-footer-form';
	import type { BaseType as BaseCertificatesType } from '@/components/base-certificates-second/type';
	import BaseCertificates from '@/components/base-certificates-second';
	import BaseTeam from '@/components/base-team';
	import BaseReviewsClient from '@/components/base-reviews-client';
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
			url: 'https://medianation.ru/services/search-engine-optimisation-c/',
		},
		noindex: false,
	});

	const headerData = {
		menu: [
			{
				name: 'Adindex',
				href: '#base-adindex-description',
			},
			{
				name: 'Рейтинги',
				href: '#base-adindex-rating',
			},
			{
				name: 'Награды',
				href: '#base-adindex-info-banner',
			},
			{
				name: 'Достижения',
				href: '#base-certificates-second',
			},
			{
				name: 'Команда',
				href: '#base-team',
			},
			{
				name: 'Отзывы',
				href: '#base-reviews-client',
			},
		],
	};

	const bannerData = {
		title: 'Ищете рейтинг агентств для SEO и оптимизации сайта?',
		text: 'ADINDEX - один из самых трастовых рейтингов на рынке',
		picture: '/service-search-engine-optimisation-c-page/banner/pic.png',
		picture_mob:
			'/service-search-engine-optimisation-c-page/banner/pic-mob.png',
	};

	const adindexDescriptionData = {
		text: 'Это надежный источник информации, который использует многоуровневую проверку и анализ участников рынка, а также собирает отзывы непосредственно от клиентов.',
		bottom_text:
			'Совсем недавно AdIndex обновил рейтинги и определил лучшие SEO-агентства на рынке',
	};

	const ratingData = {
		title: 'Рейтинг Adindex состоит из трех частей',
		bottom_title: 'Качество, Сотрудничество, Знание',
		text: 'В рейтинге КАЧЕСТВА лидирующие позиции получают агентства с <b>самыми высокими оценками от клиентов.</b>',
		picture: '/service-search-engine-optimisation-c-page/rating/pic.png',
	};

	const infoBannerData = {
		text: 'Именно в категории Качество MediaNation по итогам 2023 года заняло ВТОРОЕ МЕСТО',
	};

	const advantagesData = {
		title: 'Это означает, что агентство <br> уделяет большое значение вопросам <br> качества трафика, аналитике и клиентскому сервису.',
		text: '«Мы очень гордимся нашей работой и тем, <br> что можем быть надежной опорой для наших клиентов, оказывать им лучший сервис <br> и лучший возврат на инвестиции»',
		link: 'https://adindex.ru/ratings/digital/2023/316968/#317023',
	};

	const teamData = {
		name: 'Наша команда',
		text: 'Мы увеличиваем продажи с помощью digital-инструментов и используем комплексный подход в развитии бизнеса наших клиентов',
		items: [
			{
				name: 'Игорь Скляр',
				link: '/authors/igor-sklyar/',
				picture:
					'/service-search-engine-optimisation-c-page/teams/1.jpg',
				picture_params: {
					width: '516',
					height: '774',
				},
				picture_ex:
					'/service-search-engine-optimisation-c-page/teams/1_2.jpg',
				picture_ex_params: {
					width: '516',
					height: '774',
				},
				position: 'Руководитель SEO-отдела',
				socials: [],
				preferred_social: null,
				is_show_detail: true,
				experience_from: '2010',
				contact: null,
				event: null,
				experience: '14 лет',
			},
			{
				name: 'Алексей Великанов',
				link: null,
				picture:
					'/service-search-engine-optimisation-c-page/teams/2.jpg',
				picture_params: {
					width: '516',
					height: '742',
				},
				picture_ex:
					'/service-search-engine-optimisation-c-page/teams/2_2.jpg',
				picture_ex_params: {
					width: '516',
					height: '742',
				},
				position: 'Заместитель руководителя SEO-отдела',
				socials: [
					{
						name: 'facebook',
						link: 'https://www.facebook.com/pelikesha',
					},
				],
				preferred_social: null,
				is_show_detail: false,
				experience_from: null,
				contact: null,
				event: null,
				experience: null,
			},
			{
				name: 'Дмитрий Лашманов',
				link: '/authors/dmitriy-lashmanov/',
				picture:
					'/service-search-engine-optimisation-c-page/teams/3.jpg',
				picture_params: {
					width: '516',
					height: '742',
				},
				picture_ex:
					'/service-search-engine-optimisation-c-page/teams/3_2.jpg',
				picture_ex_params: {
					width: '516',
					height: '742',
				},
				position: 'Ведущий SEO-специалист',
				socials: [],
				preferred_social: null,
				is_show_detail: true,
				experience_from: '2018',
				contact: null,
				event: null,
				experience: '6 лет',
			},
			{
				name: 'Надежда Плечкова',
				link: '/authors/nadezhda-plechkova/',
				picture:
					'/service-search-engine-optimisation-c-page/teams/4.jpg',
				picture_params: {
					width: '516',
					height: '774',
				},
				picture_ex:
					'/service-search-engine-optimisation-c-page/teams/4_2.jpg',
				picture_ex_params: {
					width: '516',
					height: '774',
				},
				position: 'SEO-специалист',
				socials: [],
				preferred_social: null,
				is_show_detail: true,
				experience_from: '2021',
				contact: null,
				event: null,
				experience: '3 года',
			},
			{
				name: 'Екатерина Смекалова',
				link: null,
				picture:
					'/service-search-engine-optimisation-c-page/teams/5.jpg',
				picture_params: {
					width: '516',
					height: '774',
				},
				picture_ex:
					'/service-search-engine-optimisation-c-page/teams/5_2.jpg',
				picture_ex_params: {
					width: '516',
					height: '774',
				},
				position: 'младший SEO-специалист',
				socials: [],
				preferred_social: null,
				is_show_detail: false,
				experience_from: null,
				contact: null,
				event: null,
				experience: null,
			},
			{
				name: 'Ольга Чипурина',
				link: null,
				picture:
					'/service-search-engine-optimisation-c-page/teams/6.jpg',
				picture_params: {
					width: '516',
					height: '774',
				},
				picture_ex:
					'/service-search-engine-optimisation-c-page/teams/6_2.jpg',
				picture_ex_params: {
					width: '516',
					height: '774',
				},
				position: 'младший SEO-специалист',
				socials: [],
				preferred_social: null,
				is_show_detail: false,
				experience_from: null,
				contact: null,
				event: null,
				experience: null,
			},
			{
				name: 'Анна Капирусова',
				link: null,
				picture:
					'/service-search-engine-optimisation-c-page/teams/7.jpg',
				picture_params: {
					width: '516',
					height: '774',
				},
				picture_ex:
					'/service-search-engine-optimisation-c-page/teams/7_2.jpg',
				picture_ex_params: {
					width: '516',
					height: '774',
				},
				position: 'аккаунт-менеджер',
				socials: [],
				preferred_social: null,
				is_show_detail: false,
				experience_from: null,
				contact: null,
				event: null,
				experience: null,
			},
			{
				name: 'Надежда Ширшикова',
				link: null,
				picture:
					'/service-search-engine-optimisation-c-page/teams/8.jpg',
				picture_params: {
					width: '516',
					height: '742',
				},
				picture_ex:
					'/service-search-engine-optimisation-c-page/teams/8_2.jpg',
				picture_ex_params: {
					width: '516',
					height: '742',
				},
				position: 'старший аккаунт-менеджер',
				socials: [],
				preferred_social: null,
				is_show_detail: false,
				experience_from: null,
				contact: null,
				event: null,
				experience: null,
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
						'/service-search-engine-optimisation-c-page/reviews/1.png',
					picture_params: {
						width: '412',
						height: '250',
					},
					picture_white:
						'/service-search-engine-optimisation-c-page/reviews/1_2.png',
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
						'/service-search-engine-optimisation-c-page/reviews/2.png',
					picture_params: {
						width: '571',
						height: '192',
					},
					picture_white:
						'/service-search-engine-optimisation-c-page/reviews/2_2.png',
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
				file: '/service-search-engine-optimisation-c-page/reviews/files/2.pdf',
			},
			{
				name: 'Отзыв от Здоровье.ру',
				text: 'В процессе сотрудничества мы вовремя получали экспертные рекомендации от команды Медианация и ответы на свои вопросы. Приятно отметить, что специалисты Медианации предлагают свои решения, чтобы оптимизировать нашу работу и повысить эффективность сотрудничества.',
				rating: 5,
				client: {
					name: 'Здоровье.ру',
					picture:
						'/service-search-engine-optimisation-c-page/reviews/3.png',
					picture_params: {
						width: '586',
						height: '227',
					},
					picture_white:
						'/service-search-engine-optimisation-c-page/reviews/3_2.png',
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
				file: '/service-search-engine-optimisation-c-page/reviews/files/3.pdf',
			},
		],
	};

	const getCertificateData = async () => {
		type NumbersType = Pick<BaseCertificatesType['numbers'], 'items'>;
		type AwardsType = Pick<BaseCertificatesType['awards'], 'items'>;
		type CertificatesType = Pick<
			BaseCertificatesType['certificates'],
			'items'
		>;

		const defaultData = {
			name: 'Наши достижения',
			text: '<b>MediaNation</b> — рекламное агентство полного цикла. Мы увеличиваем продажи с помощью digital-инструментов и используем комплексный подход в развитии бизнеса наших клиентов.',
			numbers: {
				name: 'Цифры',
				items: null as unknown as NumbersType['items'],
			},
			awards: {
				id: 'lists/award',
				name: 'Рейтинги',
				items: null as unknown as AwardsType['items'],
			},
			certificates: {
				name: 'Сертификаты и награды',
				items: null as unknown as CertificatesType['items'],
			},
		};

		return await Promise.all([
			useApiFetch<Pick<BaseCertificatesType['numbers'], 'items'>>(
				LISTS_NUMBERS_URL,
			),
			useApiFetch<Pick<BaseCertificatesType['awards'], 'items'>>(
				LISTS_AWARD_URL,
			),
			useApiFetch<Pick<BaseCertificatesType['certificates'], 'items'>>(
				LISTS_CERTIFICATES_URL,
			),
		])
			.then((values) => {
				values.forEach(({ data }, index) => {
					if (index === 0) {
						defaultData.numbers.items = (
							data.value as NumbersType
						).items;
					}

					if (index === 1) {
						defaultData.awards.items = (
							data.value as AwardsType
						).items;
					}

					if (index === 2) {
						defaultData.certificates.items = (
							data.value as CertificatesType
						).items;
					}
				});

				return defaultData;
			})
			.catch((error) => {
				// eslint-disable-next-line no-console
				console.error(error);
				return null;
			});
	};

	const getFormData = async () => {
		const { data, error } = await useApiFetch<FormType>(CONTACT_FORM_URL);

		if (data.value) {
			return {
				...data.value,
				name: 'Пожалуйста, заполните заявку и мы оперативно свяжемся с вами',
				caption:
					'Будем рады, если вы пригласите нас в тендер и рассмотрите нас в качестве надежного партнера в мире digital',
				captionNew:
					'Будем рады, если вы пригласите нас в тендер и рассмотрите нас в качестве надежного партнера в мире digital',
			};
		} else {
			// eslint-disable-next-line no-console
			console.error(error.value);
			return null;
		}
	};

	let formData: Awaited<ReturnType<typeof getFormData>> | null = null;
	let certificates: Awaited<ReturnType<typeof getCertificateData>> | null =
		null;

	await Promise.allSettled([getFormData(), getCertificateData()]).then(
		(results) => {
			results.forEach((result, index) => {
				if (result.status === 'fulfilled') {
					if (index === 0) {
						formData = result.value as typeof formData;
					} else {
						certificates = result.value as typeof certificates;
					}
				}
			});
		},
	);

	const fixedTop = ref(0);
	const headerEl = ref<UnwrapNestedRefs<HeaderElementType>>();

	const windowResizeAxisX = useWindowResizeAxisX();

	onMounted(() => {
		const element = headerEl.value?.element;

		if (element) {
			const setHeight = () => {
				const height = element.offsetHeight;
				fixedTop.value = height;
			};

			setHeight();

			windowResizeAxisX(setHeight);
		}
	});
</script>
