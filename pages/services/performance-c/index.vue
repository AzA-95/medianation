<template>
	<BaseBannerLand
		:data="bannerData"
		:modifier-classes="['digital']"
	/>
	<BaseReviewsClient :data="reviewsData" />
	<BaseCaseBanners :data="casesData" />
	<BaseTariffsSmallGrid :data="tariffsData" />
	<TheFooterForm
		v-if="formData"
		:data="formData"
		:is-green-button="true"
		:modifier-classes="[
			'bg-white',
			'title-width-smaller',
			'caption-width-smaller',
		]"
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
		title: 'Ищете рейтинг агентств для performance задач?',
		description: '',
		og: {
			title: 'Ищете рейтинг агентств для performance задач?',
			description: '',
			image: '/og/default.jpg',
			type: 'product',
			url: 'https://medianation.ru/services/performance-c/',
		},
		noindex: false,
	});

	const bannerData = {
		name: 'Digital',
		text: 'реклама у признанного на рынке эксперта',
		awards: [
			{
				picture: '/service-performance-c-page/banner/awards/1.png',
				picture_params: {
					width: '80',
					height: '80',
				},
				name: 'ADINDEX, 2023',
				text: '«Качество контекстной рекламы»',
			},
			{
				picture: '/service-performance-c-page/banner/awards/2.png',
				picture_params: {
					width: '80',
					height: '80',
				},
				name: 'РЕЙТИНГ РУНЕТА, 2022',
				text: '«Агентства performance-маркетинга»',
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
					picture: '/service-performance-c-page/reviews/1.png',
					picture_params: {
						width: '412',
						height: '250',
					},
					picture_white:
						'/service-performance-c-page/reviews/1_2.png',
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
				file: '/service-performance-c-page/reviews/files/1.pdf',
			},
			{
				name: 'Отзыв от loren-kosmetic.ru',
				text: 'ООО «Лорен косметик» выражает благодарность за продуктивное и выгодное сотрудничество с РА «МедиаНация». Профессионализм специалистов рекламного агентства, индивидуальный подход, стремление к взаимодействию, доброжелательность всего персонала - залог успешности деловых и товарищеских взаимоотношений. Мы дорожим устойчивыми партнерскими отношениями с Вами. Выражаем вам благодарность и признательность от лица всего коллектива за вашу качественную и профессиональную работу. Желаем профессиональных успехов и процветания. Надеемся на дальнейшее и успешное сотрудничество.',
				rating: 5,
				client: {
					id: '2',
					name: 'Loren cosmetic',
					picture: '/service-performance-c-page/reviews/2.png',
					picture_params: {
						width: '412',
						height: '250',
					},
					picture_white:
						'/service-performance-c-page/reviews/2_2.png',
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
				file: '/service-performance-c-page/reviews/files/2.pdf',
			},
			{
				name: 'Отзыв от consul-coton.ru',
				text: 'Разработанный и продвигаемый агентством интернет - магазин соответствует самым высоким мировым стандартам и показал высокие продажи. В компании работают профессиональные и грамотные специалисты, высокая квалификация которых не вызывает сомнений. Все дизайнерские и продвиженчиские решения разработчиков - оптимальны и эффективны. Вывод сайта, не смотря на сложность проекта, был выполнен качественно и в срок.',
				rating: 5,
				client: {
					id: '3',
					name: 'Consul',
					picture: '/service-performance-c-page/reviews/3.png',
					picture_params: {
						width: '412',
						height: '250',
					},
					picture_white:
						'/service-performance-c-page/reviews/3_2.png',
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
				file: '/service-performance-c-page/reviews/files/3.pdf',
			},
			{
				name: 'Отзыв от Papa Johns',
				text: 'Сотрудничество ООО «Пи Джей Евразия»с компанией ООО МедиаНация имеет хоть и небольшую, но историю сотличным результатом. С их помощью было разработано 4 промолендинга с общим призовым фондом более 2 млн рублей.',
				rating: 5,
				client: {
					id: '4',
					name: 'Papa Johns',
					picture: '/service-performance-c-page/reviews/4.png',
					picture_params: {
						width: '412',
						height: '250',
					},
					picture_white:
						'/service-performance-c-page/reviews/4_2.png',
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
				file: '/service-performance-c-page/reviews/files/4.pdf',
			},
			{
				name: 'Отзыв от ООО «МАЗ-РУС»',
				text: 'В работе со специалистами MediaNation нам был важен их профессионализм, но еще более важным было то, что коллеги разделили нашу любовь к технике и разработали уникальный дизайн для нашего нового сайта. Трепет, с которым специалисты работали над сайтом, был сравним с тем, как конструкторы “МАЗ” продумывают каждую деталь автомобиля. Скорость работы, внимание к нашим пожеланиям и инициатива отдела разработки сделали создание нового сайта следующим этапом в развитии нашей компании. Специалистам удалось передать характер техники через элементы дизайна и контент, что очень важно для брендовой составляющей “МАЗ".',
				rating: 5,
				client: {
					id: '5',
					name: 'МАЗ РУС',
					picture: '/service-performance-c-page/reviews/5.png',
					picture_params: {
						width: '412',
						height: '250',
					},
					picture_white:
						'/service-performance-c-page/reviews/5_2.png',
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
					picture: '/service-performance-c-page/reviews/6.png',
					picture_params: {
						width: '412',
						height: '250',
					},
					picture_white:
						'/service-performance-c-page/reviews/6_2.png',
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
					picture: '/service-performance-c-page/reviews/7.png',
					picture_params: {
						width: '571',
						height: '192',
					},
					picture_white:
						'/service-performance-c-page/reviews/7_2.png',
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
				file: '/service-performance-c-page/reviews/files/7.pdf',
			},
		],
	};

	const casesData = {
		title: 'Кейсы',
		items: [
			{
				pic: '/service-performance-c-page/case-slider/1.jpg',
				name: 'Достигли минимальной стоимости лида среди дилеров автосалона SKODA Ventus',
				link: '/cases/kontekstnaya-reklama-dlya-koda-ventus/',
			},
			{
				pic: '/service-performance-c-page/case-slider/2.jpg',
				name: 'В 3,5 раза увеличили количество заказов с сайта',
				link: '/cases/kontekstnaya-reklama-dlya-o-key-dostavki/',
			},
			{
				pic: '/service-performance-c-page/case-slider/3.jpg',
				name: 'Объединили экосистему сайта и приложений с многочисленными рекламными каналами и системами аналитики',
				link: '/cases/keys-litres-skvoznaya-analitika/',
			},
			{
				pic: '/service-performance-c-page/case-slider/4.jpg',
				name: 'В 18 раз увеличили количество подписок на сервис и снизили стоимость привлечения клиента в 3 раза',
				link: '/cases/kontekstnaya-reklama-dlya-amediateka/',
			},
			{
				pic: '/service-performance-c-page/case-slider/5.jpg',
				name: 'Увеличили средний чек в 1,7 раза и в 4 раза число транзакций',
				link: '/cases/kontekstnaya-reklama-dlya-williams-et-oliver/',
			},
			{
				pic: '/service-performance-c-page/case-slider/6.jpg',
				name: 'Достигли ДРР в 9,18% и снизили CPO в 25 раз',
				link: '/cases/kontekstnaya-reklama-dlya-asna/',
			},
			{
				pic: '/service-performance-c-page/case-slider/7.jpg',
				name: 'Увеличили количество переходов на сайт клиники в 8 раз и в 10 раз количество заказов',
				link: '/cases/kontekstnaya-reklama-dlya-doktor-ryadom/',
			},
		],
	};

	const tariffsData = {
		title: 'Тарифы',
		items: [
			{
				name: 'Контекстная реклама в Яндекс.Директ',
				price: 'от 500 000 ₽*',
				text: `
								<ul>
									<li>50 часов работы сертифицированных специалистов с большим опытом в digital;</li>
									<li>Находим решение самых сложных задач совместно с выделенными командами Яндекса и К50;</li>
									<li>персональный менеджер, который ответит на все вопросы и пришлет вам отчет о размещении с показателями и отчетом о проделанной работе.</li>
								</ul>
						`,
				columns: [
					{
						info_tite: '*',
						info_text: 'размер рекламного бюджета',
					},
					{
						info_tite: '0-11%',
						info_text: 'комиссия агентству',
					},
				],
			},
			{
				name: 'Аудит контекстной рекламы',
				price: 'от 100 000 ₽',
				text: `
								<ul>
									<li>Полный анализ рекламного кабинета;</li>
									<li>Аудит систем аналитики;</li>
									<li>Предоставим рекомендации по изменению фида;</li>
									<li>Обозначим точки роста, предложим варианты тестирования.</li>
								</ul>
						`,
				columns: [
					{
						info_tite: '10 дней',
						info_text: 'срок выполнения аудита',
					},
				],
			},
			{
				name: 'Реклама в Яндекс.Директ для интернет-магазинов',
				price: 'от 500 000 ₽*',
				text: `
								<ul>
									<li>50 часов работы специалистов с опытом в ecom-проектах;</li>
									<li>Аудит товарных фидов;</li>
									<li>Используем правила К50 для оптимизации размещения в Директе;</li>
									<li>Персональный менеджер с опытом в ecom-проектах.</li>
								</ul>
						`,
				columns: [
					{
						info_tite: '*',
						info_text: 'размер рекламного бюджета',
					},
					{
						info_tite: '0-11%',
						info_text: 'комиссия агентству',
					},
				],
			},
			{
				name: 'Реклама в Яндекс.Директ для сайтов услуг',
				price: 'от 500 000 ₽*',
				text: `
								<ul>
									<li>50 часов работы специалистов с опытом в digital-проектах;</li>
									<li>Аудит аналитических целей по воронке продаж;</li>
									<li>Используем правила К50 для оптимизации размещения в Директе;</li>
									<li>Персональный менеджер с опытом в digital-проектах.</li>
								</ul>
						`,
				columns: [
					{
						info_tite: '*',
						info_text: 'размер рекламного бюджета',
					},
					{
						info_tite: '0-11%',
						info_text: 'комиссия агентству',
					},
				],
			},
			{
				name: 'Реклама в Яндекс.Директ для магазинов мебели',
				price: 'от 500 000 ₽*',
				text: `
								<ul>
									<li>50 часов работы специалистов с опытом в мебельной тематике;</li>
									<li>аудит товарных фидов;</li>
									<li>используем правила К50 для оптимизации размещения в Директе;</li>
									<li>персональный менеджер с опытом в мебельной тематике.</li>
								</ul>
						`,
				columns: [
					{
						info_tite: '*',
						info_text: 'размер рекламного бюджета',
					},
					{
						info_tite: '0-11%',
						info_text: 'комиссия агентству',
					},
				],
			},
			{
				name: 'Реклама в Яндекс.Директ для медицинских клиник',
				price: 'от 500 000 ₽*',
				text: `
								<ul>
									<li>50 часов работы специалистов с опытом в медицинских проектах;</li>
									<li>аудит аналитических целей по воронке продаж;</li>
									<li>используем правила К50 для оптимизации размещения в Директе;</li>
									<li>персональный менеджер с опытом в медицинских проектах;</li>
								</ul>
						`,
				columns: [
					{
						info_tite: '*',
						info_text: 'размер рекламного бюджета',
					},
					{
						info_tite: '0-11%',
						info_text: 'комиссия агентству',
					},
				],
			},
			{
				name: 'Продвижение в Telegram через Яндекс.Директ',
				price: 'от 100 000 ₽*',
				text: `
								<ul>
									<li>10 часов работы специалистов с опытом размещений в Telegram;</li>
									<li>Отрисуем 1 вариант креативов в месяц бесплатно;</li>
									<li>При размещении через Я.Директ планка бюджета значительно ниже, чем через TGAds и его контрагентов;</li>
									<li>персональный менеджер с опытом опытом размещений в Telegram.</li>
								</ul>
						`,
				columns: [
					{
						info_tite: '*',
						info_text: 'размер рекламного бюджета',
					},
					{
						info_tite: '0-11%',
						info_text: 'комиссия агентству',
					},
				],
			},
			{
				name: 'Продвижение Маркетплейсов в Яндекс.Директ',
				price: 'от 50 000 ₽*',
				text: `
								<ul>
									<li>7 часов работы специалистов с опытом продвижения на маркетплейсах;</li>
									<li>При продвижении товаров Я.Маркет коммисия площадки за покупку товара составляет 1 руб.;</li>
									<li>персональный менеджер с опытом опытом размещений на маркетплейсах.</li>
								</ul>
						`,
				columns: [
					{
						info_tite: '*',
						info_text: 'размер рекламного бюджета',
					},
					{
						info_tite: '0-11%',
						info_text: 'комиссия агентству',
					},
				],
			},
			{
				name: 'Настройка медийной рекламы',
				price: 'от 300 000 ₽*',
				text: `
								<ul>
									<li>10 часов работы специалистов с опытом в медийных проектах;</li>
									<li>создаем и интегрируем Я.Метрику для медийной рекламы;</li>
									<li>персональный менеджер с опытом в медийных проектах".</li>
								</ul>
						`,
				columns: [
					{
						info_tite: '*',
						info_text: 'размер рекламного бюджета',
					},
					{
						info_tite: '0-11%',
						info_text: 'комиссия агентству',
					},
				],
			},
		],
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

	await getFormData().then((data) => {
		formData = data as typeof formData;
	});
</script>
