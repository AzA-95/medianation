<template>
	<BaseBannerService :data="serviceBannerData" />
	<BaseTextDefault :data="textDefaultData" />
	<BaseNewsSlider
		:data="newsData"
		:is-title-dark="true"
	/>
	<BaseDescWithMenuList :data="menuListData" />
	<BaseCasesSlider :data="casesSliderData" />
	<TheFooterForm
		v-if="formData"
		:data="formData"
	/>
</template>

<script setup lang="ts">
	import { useHead } from '#imports';
	import type { FormType } from '@/types/forms';
	import { CONTACT_FORM_URL } from '@/constants';
	import { useMetaStore } from '@/stores/meta';
	import { useApiFetch } from '@/composables/use-api-fetch';
	import BaseBannerService from '@/components/base-banner-service';
	import BaseTextDefault from '@/components/base-text-default';
	import BaseNewsSlider from '@/components/base-news-slider';
	import BaseDescWithMenuList from '@/components/base-desc-with-menu-list';
	import BaseCasesSlider from '@/components/base-cases-slider';
	import TheFooterForm from '@/components/the-footer-form';

	useHead({
		bodyAttrs: {
			class: {
				'menu-light-color': true,
			},
			tagDuplicateStrategy: 'replace',
		},
	});

	const { setMeta } = useMetaStore();

	setMeta({
		title: 'SEO-консультация | Онлайн консультация SEO-специалиста',
		description:
			'Закажите онлайн консультацию SEO-специалиста. Проведем аудит сайта в режиме онлайн и покажем вам основные ошибки, которые затрудняют  SEO-продвижение сайта.',
		og: {
			title: 'Онлайн консультация с ведущим SEO специалистом рекламного агентства MediaNation',
			description:
				'Профессиональный разбор сайта от ведущих SEO-специалистов компании MediaNation всего за 5000 рублей! Проанализируем ваш сайт и в режиме онлайн расскажем о новых точках роста, о текущих проблемах и способах их решения. Покажем какие методы продвижения используют ваши конкуренты, почему не растут позиции и как увеличить продажи. Никакой воды и рекламы сервисов - только SEO, только хардкор!',
			image: '/og/seo-consultation.jpg',
			type: 'website',
			url: 'https://medianation.ru/services/seo/seo-consultation/',
		},
		noindex: false,
	});

	const serviceBannerData = {
		background: '/service-seo-consultation-page/service-banner/bg.jpg',
		breadcrumbs: [
			{
				name: 'Главная',
				link: '/',
			},
			{
				name: 'Услуги',
				link: '/services/',
			},
			{
				link: '/services/seo/',
				name: 'SEO-продвижение',
			},
			{
				link: null,
				name: 'SEO-консультация',
			},
		],
		title: 'SEO-консультация',
		description: `Частная онлайн консультация с ведущим специалистом агентства MediaNation.`,
		awards: {
			id: 'lists/award' as const,
			items: [
				{
					name: 'Рейтинг Рунета, 2022',
					picture:
						'/service-seo-consultation-page/service-banner/awards/1.png',
					picture_params: {
						width: '66',
						height: '66',
					},
					text: '«SEO-аналитика и консалтинг»',
				},
				{
					name: 'Рейтинг Рунета, 2022',
					picture:
						'/service-seo-consultation-page/service-banner/awards/1.png',
					picture_params: {
						width: '66',
						height: '66',
					},
					text: '«Рейтинг агентств таргетированной рекламы, Порталы и сервисы»',
				},
				{
					name: 'Рейтинг Рунета, 2022',
					picture:
						'/service-seo-consultation-page/service-banner/awards/2.png',
					picture_params: {
						width: '66',
						height: '66',
					},
					text: '«Агентства Performance-маркетинга»',
				},
			],
		},
		price_caption: 'Стоимость услуги',
		price: '30 000 ₽',
		order_button: {
			name: 'Записаться на консультацию',
			action: null,
		},
	};

	const textDefaultData = {
		html: `<div class="b-section">
					<div class="b-row">
						<div class="b-col">
							<h3 class="b-title">Как проходит SEO консультация</h3>
							<p>
								Перед проведением консультации необходимо предоставить нам список ваших вопросов и всю необходимую информацию:
							</p>
							<ul>
								<li>Адрес сайта</li>
								<li>Конкурентов</li>
								<li>Дополнительные файлы</li>
								<li>Доступы к вебмастерам и системам аналитики</li>
							</ul>
							<p>
								Мы подготовим развернутые ответы на все вопросы и при необходимости подберем необходимые материалы.
							</p>
							<p>
								В ходе консультации ответим на все ваши вопросы про SEO-продвижение и в режиме реального времени проведем аудит вашего сайта. В ходе SEO-аудита покажем, какие ошибки присутствуют на сайте и что необходимо сделать для улучшения ранжирования сайта.
							</p>
						</div>
						<div class="b-col">
							<h3 class="b-title">В каких случаях нужна SEO консультация</h3>
							<p>
								SEO-консультация может быть необходима на всех этапах работы с сайтом:
							</p>
							<ul>
								<li>На этапе создания нового сайта</li>
								<li>При проведении редизайна</li>
								<li>Для контроля текущего SEO-подрядчика</li>
								<li>При обнаружении негативной динамики позиций или трафика</li>
								<li>При выборе SEO-подрядчика</li>
								<li>Для поиска новых точек роста</li>
							</ul>
						</div>
					</div>
					<div class="b-row">
						<div class="b-col">
							<h3 class="b-title">Какие задачи поможем решить</h3>
							<p>
								Поможем решить следующие задачи:
							</p>
							<ul>
								<li>Найти проблемы, затрудняющие продвижение сайта</li>
								<li>Найти новые точки роста</li>
								<li>Оценить эффективность работы текущего подрядчика</li>
								<li>Оценить потенциал роста сайта</li>
								<li>Ответим на все вопросы о SEO-продвижении</li>
							</ul>
						</div>
						<div class="b-col">
							<h3 class="b-title">Кто будет проводить SEO-консультацию</h3>
							<p>
								Консультацию будут проводить ведущие SEO-специалисты с опытом работы в SEO от 3 лет.
							</p>
						</div>
					</div>
				</div>`,
	};

	const newsData = {
		name: 'Статьи про SEO-продвижение',
		text: `Сформировали базу знаний для самостоятельного изучения SEO. С помощью наших статей вы сможете выполнять SEO-задачи и улучшать позиции вашего сайта в поисковых системах.`,
		items: [
			{
				id: 1,
				date: '17 ноября',
				show_count: 291,
				reading_time: null,
				picture: '/service-seo-consultation-page/news-another/1.jpg',
				tags: ['SEO', 'SEO-продвижение'],
				link: '/blog/seo/regionalnoe-seo-osobennosti-sposoby-vazhnye-momenty/',
				name: 'Региональное SEO: особенности, способы, важные моменты',
				text: null,
			},
			{
				id: 2,
				date: '17 ноября',
				show_count: 193,
				reading_time: null,
				picture: '/service-seo-consultation-page/news-another/2.jpg',
				tags: ['SEO', 'SEO-продвижение'],
				link: '/blog/seo/chto-takoe-semanticheskoe-yadro-i-kak-ego-sostavit/',
				name: 'Что такое семантическое ядро и как его составить',
				text: null,
			},
			{
				id: 3,
				date: '21 октября',
				show_count: 8721,
				reading_time: '10 минут',
				picture: '/service-seo-consultation-page/news-another/3.jpg',
				tags: ['SEO'],
				link: '/blog/seo/dlya-chego-i-kak-sleduet-provodit-seo-analiz-sayta/',
				name: 'Анализ сайта онлайн и бесплатно: подробная инструкция для SEO-анализа сайта',
				text: 'Анализ сайта – это комплексное исследование сайта, которое позволит выявить проблемы и найти точки роста. В него входит технический анализ, оценка структуры сайта, анализ контента, юзабилити, статистических данных, внешних и внутренних ссылки других показателей. Подготовили подробный чек-лист для SEO анализа сайта',
			},
			{
				id: 4,
				date: '21 июня',
				show_count: 1577,
				reading_time: '5 минут',
				picture: '/service-seo-consultation-page/news-another/4.jpg',
				tags: ['SEO', 'разработка', 'SEO-продвижение'],
				link: '/blog/seo/nado-li-privlekat-seo-spetsialista-k-razrabotke-sayta/',
				name: 'Надо ли привлекать SEO-специалиста к разработке сайта',
				text: null,
			},
			{
				id: 5,
				date: '07 апреля',
				show_count: 1821,
				reading_time: '5 минут',
				picture: '/service-seo-consultation-page/news-another/5.jpg',
				tags: ['SEO'],
				link: '/blog/seo/kak-zakazchiku-proverit-i-otsenit-seo-strategiyu/',
				name: 'Как заказчику проверить и оценить SEO-стратегию',
				text: null,
			},
			{
				id: 6,
				date: '30 марта',
				show_count: 1779,
				reading_time: '10 минут',
				picture: '/service-seo-consultation-page/news-another/6.jpg',
				tags: ['SEO'],
				link: '/blog/seo/minus-na-plyus-kak-rabotat-s-negativnymi-otzyvami-/',
				name: 'Минус на плюс: как работать с негативными отзывами ',
				text: null,
			},
		],
		more_link: '/blog/seo/',
	};

	const menuListData = {
		name: 'Другие SEO услуги',
		description:
			'Если вы не хотите самостоятельно заниматься продвижением вашего сайта, вы можете доверить это профессионалам. Наши SEO-специалисты имеют богатый опыт в поисковом продвижении сайтов.',
		menu: {
			items: [
				{
					name: 'SEO-аудит сайта',
					picture: '/service-seo-consultation-page/menu-list/1.jpg',
					text: 'Выяснит, почему вы не в топе',
					link: '/services/seo/seo-audit/',
				},
				{
					name: 'Вывод сайта из-под фильтров и санкций',
					picture: '/service-seo-consultation-page/menu-list/2.jpg',
					text: 'Диагностика санкций и фильтров',
					link: '/services/seo/sanctions/',
				},
				{
					name: 'Сопровождение разработки сайта',
					picture: '/service-seo-consultation-page/menu-list/3.jpg',
					text: 'Новый сайт быстрее поднимется в поисковиках',
					link: '/services/seo/site-support/',
				},
			],
		},
		additional_html: `Не знаете что нужно вашему магазину?
						  <div class="hide-mob" style="margin-bottom:12px;"></div>
						  <a href="tel:84952604347">Позвоните,</a> расскажем бесплатно.
						  Или сделаем <a href="https://medianation.ru/services/seo/seo-audit/" class="link-with-arrow">развёрнутый аудит за 80 000 ₽</a>
						`,
	};

	const casesSliderData = {
		name: 'SEO кейсы',
		items: [
			{
				name: 'Победили фильтр Яндекса и в 3 раза увеличили поисковый трафик',
				picture: '/service-seo-consultation-page/case-gallery/1.jpg',
				picture_params: {
					width: '952',
					height: '520',
				},
				text: null,
				link: '/cases/seo-dlya-kosmetologicheskoy-kliniki/',
				button_name: 'Хочу так же!',
			},
			{
				name: 'На 85% увеличили органический трафик',
				picture: '/service-seo-consultation-page/case-gallery/2.jpg',
				picture_params: {
					width: '952',
					height: '520',
				},
				text: null,
				link: '/cases/seo-prodvizhenie-sayta-hansa/',
				button_name: 'Хочу так же!',
			},
			{
				name: 'В 2 раза увеличили поисковый трафик на портал',
				picture: '/service-seo-consultation-page/case-gallery/3.jpg',
				picture_params: {
					width: '952',
					height: '520',
				},
				text: null,
				link: '/cases/seo-prodvizhenie-people-talk/',
				button_name: 'Хочу так же!',
			},
			{
				name: 'Увеличили поисковый трафик в 2 раза и вывели сайт в топ-10 Google',
				picture: '/service-seo-consultation-page/case-gallery/4.jpg',
				picture_params: {
					width: '952',
					height: '520',
				},
				text: null,
				link: '/cases/keys-svyaznoy-trevel-seo/',
				button_name: 'Хочу так же!',
			},
			{
				name: 'Увеличили поисковый трафик в 3 раза',
				picture: '/service-seo-consultation-page/case-gallery/5.jpg',
				picture_params: {
					width: '952',
					height: '520',
				},
				text: null,
				link: '/cases/seo-prodvizhenie-kosmetologicheskoy-kliniki/',
				button_name: 'Хочу так же!',
			},
			{
				name: 'Увеличили поисковый трафик в 3 раза и вывели сайт сети аптек в топ-10 во всех регионах России',
				picture: '/service-seo-consultation-page/case-gallery/6.jpg',
				picture_params: {
					width: '952',
					height: '520',
				},
				text: null,
				link: '/cases/seo-dlya-onlayn-apteki/',
				button_name: 'Хочу так же!',
			},
			{
				name: 'Обеспечили рост бизнеса на 20% ежемесячно',
				picture: '/service-seo-consultation-page/case-gallery/7.jpg',
				picture_params: {
					width: '952',
					height: '520',
				},
				text: null,
				link: '/cases/kompleksnoe-prodvizhenie-linzmaster/',
				button_name: 'Хочу так же!',
			},
			{
				name: 'Увеличили поисковый трафик в 2,6 раза за 6 месяцев',
				picture: '/service-seo-consultation-page/case-gallery/8.jpg',
				picture_params: {
					width: '952',
					height: '520',
				},
				text: null,
				link: '/cases/uvelichili-poiskovyy-trafik-v-2-6-raza-za-6-mesyatsev/',
				button_name: 'Хочу так же!',
			},
		],
	};

	const getFormData = async () => {
		const { data, error } = await useApiFetch<FormType>(CONTACT_FORM_URL);

		if (data.value) {
			return {
				...data.value,
				name: 'Давайте работать? Мы верим в ваш бизнес',
				caption: 'Мы поможем вам найти своих клиентов',
				captionNew: 'Мы поможем вам найти своих клиентов',
			};
		} else {
			// eslint-disable-next-line no-console
			console.error(error.value);
			return null;
		}
	};

	let formData: Awaited<ReturnType<typeof getFormData>> | null = null;

	await getFormData().then((data) => {
		formData = data;
	});
</script>
