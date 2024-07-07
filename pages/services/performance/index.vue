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
		title: 'Ищете рейтинг агентств для performance задач?',
		description: '',
		og: {
			title: 'Ищете рейтинг агентств для performance задач?',
			description: '',
			image: '/og/default.jpg',
			type: 'product',
			url: 'https://medianation.ru/services/performance/',
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
		title: 'Ищете рейтинг агентств для performance задач?',
		text: 'ADINDEX - один из самых трастовых рейтингов на рынке',
		picture: '/service-performance-page/banner/pic.png',
		picture_mob: '/service-performance-page/banner/pic-mob.png',
	};

	const adindexDescriptionData = {
		text: 'Это надежный источник информации, который использует многоуровневую проверку и анализ участников рынка, а также собирает отзывы непосредственно от клиентов.',
		bottom_text:
			'Совсем недавно AdIndex обновил рейтинги и определил лучшие агентства на рынке',
	};

	const ratingData = {
		title: 'Рейтинг Adindex состоит из трех частей',
		bottom_title: 'Качество, Сотрудничество, Знание',
		text: 'В рейтинге КАЧЕСТВА лидирующие позиции получают агентства с <b>самыми высокими оценками от клиентов.</b>',
		picture: '/service-performance-page/rating/pic.png',
	};

	const infoBannerData = {
		text: `
			Именно в категории
			<br>
			«качество услуг» <span>MediaNation</span>
			<br>
			по итогам 2023 года
			<br>
			<span>заняло ПЕРВОЕ МЕСТО</span>
		`,
	};

	const advantagesData = {
		title: 'Это означает, что агентство <br> уделяет большое значение вопросам <br> качества трафика, таргетинга и клиентского сервиса.',
		text: '«Мы очень гордимся нашей работой и тем, <br> что можем быть надежной опорой для наших клиентов, оказывать им лучший сервис <br> и лучший возврат на инвестиции»',
		link: 'https://adindex.ru/ratings/digital/2023/316968/#317014',
	};

	const teamData = {
		name: 'Наша команда',
		text: 'Мы увеличиваем продажи с помощью digital-инструментов и используем комплексный подход в развитии бизнеса наших клиентов',
		items: [
			{
				name: 'Иван Барченков',
				link: '/authors/ivan-barchenkov/',
				picture: '/service-performance-page/teams/1.jpg',
				picture_params: {
					width: '516',
					height: '742',
				},
				picture_ex: '/service-performance-page/teams/1_2.jpg',
				picture_ex_params: {
					width: '516',
					height: '742',
				},
				position: 'Партнер, генеральный директор, MBA',
				socials: [
					{
						name: 'telegram',
						link: '@ibarchenkov',
					},
					{
						name: 'linkedin',
						link: 'https://www.linkedin.com/in/ivan-barchenkov-89328922/',
					},
					{
						name: 'instagram',
						link: 'ibarchenkov',
					},
					{
						name: 'vk',
						link: 'https://vk.com/ibarchenkov',
					},
					{
						name: 'facebook',
						link: 'https://www.facebook.com/ibarchenkov',
					},
				],
				preferred_social: null,
				is_show_detail: true,
				experience_from: '2009',
				contact: null,
				event: null,
				experience: '15 лет',
			},
			{
				name: 'Алан Догузов',
				link: null,
				picture: '/service-performance-page/teams/2.jpg',
				picture_params: {
					width: '516',
					height: '742',
				},
				picture_ex: '/service-performance-page/teams/2_2.jpg',
				picture_ex_params: {
					width: '516',
					height: '742',
				},
				position: 'Директор клиентского сервиса',
				socials: [
					{
						name: 'telegram',
						link: 'https://t.me/Ginger_a',
					},
					{
						name: 'linkedin',
						link: 'https://www.linkedin.com/in/alan-doguzov-9847a983/',
					},
					{
						name: 'facebook',
						link: 'https://www.facebook.com/profile.php?id=100002662674195',
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
				name: 'Дмитрий Седов',
				link: '/authors/dmitriy-sedov/',
				picture: '/service-performance-page/teams/3.jpg',
				picture_params: {
					width: '516',
					height: '742',
				},
				picture_ex: '/service-performance-page/teams/3_2.jpg',
				picture_ex_params: {
					width: '516',
					height: '742',
				},
				position: 'Руководитель performance направлений',
				socials: [],
				preferred_social: null,
				is_show_detail: true,
				experience_from: '2017',
				contact: null,
				event: null,
				experience: '7 лет',
			},
			{
				name: 'Богдан Забудский',
				link: '/authors/bogdan-zabudskiy/',
				picture: '/service-performance-page/teams/4.jpg',
				picture_params: {
					width: '516',
					height: '742',
				},
				picture_ex: '/service-performance-page/teams/4_2.jpg',
				picture_ex_params: {
					width: '516',
					height: '742',
				},
				position:
					'Руководитель отдела контекстной и таргетированной рекламы',
				socials: [],
				preferred_social: null,
				is_show_detail: true,
				experience_from: '2018',
				contact: null,
				event: null,
				experience: '6 лет',
			},
			{
				name: 'Дмитрий Ивашечкин',
				link: null,
				picture: '/service-performance-page/teams/5.jpg',
				picture_params: {
					width: '512',
					height: '768',
				},
				picture_ex: '/service-performance-page/teams/5_2.jpg',
				picture_ex_params: {
					width: '512',
					height: '768',
				},
				position:
					'Руководитель технического отдела контекстной рекламы',
				socials: [],
				preferred_social: null,
				is_show_detail: false,
				experience_from: null,
				contact: null,
				event: null,
				experience: null,
			},
			{
				name: 'Кирилл Ким',
				link: null,
				picture: '/service-performance-page/teams/6.jpg',
				picture_params: {
					width: '512',
					height: '768',
				},
				picture_ex: '/service-performance-page/teams/6_2.jpg',
				picture_ex_params: {
					width: '512',
					height: '768',
				},
				position: 'Технический специалист по контекстной рекламе',
				socials: [],
				preferred_social: null,
				is_show_detail: false,
				experience_from: null,
				contact: null,
				event: null,
				experience: null,
			},
			{
				name: 'Григорий Торунов',
				link: null,
				picture: '/service-performance-page/teams/7.jpg',
				picture_params: {
					width: '512',
					height: '768',
				},
				picture_ex: '/service-performance-page/teams/7_2.jpg',
				picture_ex_params: {
					width: '512',
					height: '768',
				},
				position: 'Специалист по оптимизации рекламных кампаний',
				socials: [],
				preferred_social: null,
				is_show_detail: false,
				experience_from: null,
				contact: null,
				event: null,
				experience: null,
			},
			{
				name: 'Игорь Колыванов',
				link: null,
				picture: '/service-performance-page/teams/8.jpg',
				picture_params: {
					width: '512',
					height: '768',
				},
				picture_ex: '/service-performance-page/teams/8_2.jpg',
				picture_ex_params: {
					width: '512',
					height: '768',
				},
				position:
					'Младший специалист по оптимизации рекламных кампаний',
				socials: [],
				preferred_social: null,
				is_show_detail: false,
				experience_from: null,
				contact: null,
				event: null,
				experience: null,
			},
			{
				name: 'Ксения Пужаева',
				link: null,
				picture: '/service-performance-page/teams/9.jpg',
				picture_params: {
					width: '512',
					height: '768',
				},
				picture_ex: '/service-performance-page/teams/9_2.jpg',
				picture_ex_params: {
					width: '512',
					height: '768',
				},
				position:
					'Младший специалист по оптимизации рекламных кампаний',
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
				name: 'Отзыв от Адамас',
				text: 'Компания ADAMAS выражает благодарность и полную поддержку стратегическому партнеру в области рекламы - агентству MediaNation.\r\nКоманда агентства демонстрирует выдающийся уровень профессионализма и креативности, которые служат незаменимым активом в достижении наших бизнес-целей.\r\nС полной уверенностью мы рекомендуем агентство MediaNation как ведущего партнера в сфере рекламы и маркетинга.',
				rating: 5,
				client: {
					id: '1',
					name: 'Adamas',
					picture: '/service-performance-page/reviews/1.png',
					picture_params: {
						width: '412',
						height: '250',
					},
					picture_white: '/service-performance-page/reviews/1_2.png',
					picture_white_params: {
						width: '412',
						height: '250',
					},
					link: null,
				},
				author: {
					name: 'Баранов Д.А.',
					position: 'Генеральный директор',
				},
				file: '/service-performance-page/reviews/files/1.pdf',
			},
			{
				name: 'Отзыв от loren-kosmetic.ru',
				text: 'ООО «Лорен косметик» выражает благодарность за продуктивное и выгодное сотрудничество с РА «МедиаНация». Профессионализм специалистов рекламного агентства, индивидуальный подход, стремление к взаимодействию, доброжелательность всего персонала - залог успешности деловых и товарищеских взаимоотношений. Мы дорожим устойчивыми партнерскими отношениями с Вами. Выражаем вам благодарность и признательность от лица всего коллектива за вашу качественную и профессиональную работу. Желаем профессиональных успехов и процветания. Надеемся на дальнейшее и успешное сотрудничество.',
				rating: 5,
				client: {
					id: '2',
					name: 'Loren cosmetic',
					picture: '/service-performance-page/reviews/2.png',
					picture_params: {
						width: '412',
						height: '250',
					},
					picture_white: '/service-performance-page/reviews/2_2.png',
					picture_white_params: {
						width: '412',
						height: '250',
					},
					link: null,
				},
				author: {
					name: 'Ихонькин E.B.',
					position: 'Генеральный директор',
				},
				file: '/service-performance-page/reviews/files/2.pdf',
			},
			{
				name: 'Отзыв от consul-coton.ru',
				text: 'Разработанный и продвигаемый агентством интернет - магазин соответствует самым высоким мировым стандартам и показал высокие продажи. В компании работают профессиональные и грамотные специалисты, высокая квалификация которых не вызывает сомнений. Все дизайнерские и продвиженчиские решения разработчиков - оптимальны и эффективны. Вывод сайта, не смотря на сложность проекта, был выполнен качественно и в срок.',
				rating: 5,
				client: {
					id: '3',
					name: 'Consul',
					picture: '/service-performance-page/reviews/3.png',
					picture_params: {
						width: '412',
						height: '250',
					},
					picture_white: '/service-performance-page/reviews/3_2.png',
					picture_white_params: {
						width: '412',
						height: '250',
					},
					link: null,
				},
				author: {
					name: 'Фисун А.Н.',
					position: 'Руководитель интернет-магазина consul-coton.ru',
				},
				file: '/service-performance-page/reviews/files/3.pdf',
			},
			{
				name: 'Отзыв от Papa Johns',
				text: 'Сотрудничество ООО «Пи Джей Евразия»с компанией ООО МедиаНация имеет хоть и небольшую, но историю сотличным результатом. С их помощью было разработано 4 промолендинга с общим призовым фондом более 2 млн рублей.',
				rating: 5,
				client: {
					id: '4',
					name: 'Papa Johns',
					picture: '/service-performance-page/reviews/4.png',
					picture_params: {
						width: '412',
						height: '250',
					},
					picture_white: '/service-performance-page/reviews/4_2.png',
					picture_white_params: {
						width: '412',
						height: '175',
					},
					link: null,
				},
				author: {
					name: 'Мартынова Карина Робертовна',
					position: 'Генеральный директор',
				},
				file: '/service-performance-page/reviews/files/4.pdf',
			},
			{
				name: 'Отзыв от ООО «МАЗ-РУС»',
				text: 'В работе со специалистами MediaNation нам был важен их профессионализм, но еще более важным было то, что коллеги разделили нашу любовь к технике и разработали уникальный дизайн для нашего нового сайта. Трепет, с которым специалисты работали над сайтом, был сравним с тем, как конструкторы “МАЗ” продумывают каждую деталь автомобиля. Скорость работы, внимание к нашим пожеланиям и инициатива отдела разработки сделали создание нового сайта следующим этапом в развитии нашей компании. Специалистам удалось передать характер техники через элементы дизайна и контент, что очень важно для брендовой составляющей “МАЗ".',
				rating: 5,
				client: {
					id: '5',
					name: 'МАЗ РУС',
					picture: '/service-performance-page/reviews/5.png',
					picture_params: {
						width: '412',
						height: '250',
					},
					picture_white: '/service-performance-page/reviews/5_2.png',
					picture_white_params: {
						width: '350',
						height: '203',
					},
					link: null,
				},
				author: {
					name: 'Вадим Цой',
					position:
						'Зам. начальника информационно-аналитического отдела',
				},
				file: null,
			},
			{
				name: 'Отзыв от eksmo.ru',
				text: 'Работаем с MediaNation уже более 3-х лет. Было получено множество ценных рекомендаций, выполнены самые различные работы и технического характера, и по контенту, которые через некоторое время обязательно приводили к отличным показателям. Всегда рекомендую компанию в лице Алексея Великанова партнерам и друзьям. Для издательства ЭКСМО – это удачное, приятное и полезное взаимодействие. Особенно ценим быструю обратную связь, понятные задачи, развернутые отчеты и, конечно, результат.',
				rating: 5,
				client: {
					id: '6',
					name: 'ЭКСМО',
					picture: '/service-performance-page/reviews/6.png',
					picture_params: {
						width: '412',
						height: '250',
					},
					picture_white: '/service-performance-page/reviews/6_2.png',
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
					id: '7',
					name: 'Интерлизинг',
					picture: '/service-performance-page/reviews/7.png',
					picture_params: {
						width: '571',
						height: '192',
					},
					picture_white: '/service-performance-page/reviews/7_2.png',
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
				file: '/service-performance-page/reviews/files/7.pdf',
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
