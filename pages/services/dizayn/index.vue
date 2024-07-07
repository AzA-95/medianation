<template>
	<BaseBannerServiceWithAuthor :data="bannerData" />
	<BaseResultsOurWorks :data="resultsOurWorksData" />
	<BaseTariffsGrid :data="tariffsData" />
	<BaseVerticalTabs :data="tabsData" />
	<BaseInfoColumns :data="infoColumnsData" />
	<BaseTextDefault :data="textDefaultData" />
	<BaseCasesSlider :data="casesData" />
	<BaseAdvantages :data="advantagesData" />
	<BaseCertificates
		v-if="certificates"
		:data="certificates"
	/>
	<BaseWarranties :data="warrantiesData" />
	<BaseReviewsSlider :data="reviewsSliderData" />
	<BaseTextDefault :data="textDefaultSecondData" />
	<BaseFaq :data="faqData" />
	<TheFooterForm
		v-if="formData"
		:data="formData"
		:fixed-top="fixedTop"
	/>
	<BaseFloatingModal
		ref="floatingModalEl"
		:data="floatingModalData"
	/>
</template>

<script setup lang="ts">
	import { ref, onMounted } from 'vue';
	import { useHead } from '#imports';
	import type { FormType } from '@/types/forms';
	import {
		LISTS_AWARD_URL,
		LISTS_NUMBERS_URL,
		LISTS_CERTIFICATES_URL,
		CONTACT_FORM_URL,
	} from '@/constants';
	import { useMetaStore } from '@/stores/meta';
	import { useApiFetch } from '@/composables/use-api-fetch';
	import { useMediaQuery } from '@/composables/use-media-query';
	import BaseBannerServiceWithAuthor from '@/components/base-banner-service-with-author';
	import BaseResultsOurWorks from '@/components/base-results-our-works';
	import BaseTariffsGrid from '@/components/base-tarrifs-grid';
	import BaseVerticalTabs from '@/components/base-vertical-tabs';
	import BaseInfoColumns from '@/components/base-info-columns';
	import BaseTextDefault from '@/components/base-text-default';
	import BaseCasesSlider from '@/components/base-cases-slider';
	import BaseAdvantages from '@/components/base-advantages';
	import BaseWarranties from '@/components/base-warranties';
	import BaseReviewsSlider from '@/components/base-reviews-slider';
	import BaseFaq from '@/components/base-faq';
	import type { BaseType as BaseCertificatesType } from '@/components/base-certificates/type';
	import BaseCertificates from '@/components/base-certificates';
	import TheFooterForm from '@/components/the-footer-form';
	import BaseFloatingModal from '@/components/base-floating-modal';

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
		title: 'Создаем дизайнерские сайты, поднимающие конверсию продаж',
		description: '',
		og: {
			title: 'Создаем дизайнерские сайты, поднимающие конверсию продаж',
			description: '',
			image: '/og/default.jpg',
			type: 'product',
			url: 'https://medianation.ru/services/dizayn/',
		},
		noindex: false,
	});

	const bannerData = {
		breadcrumbs: [
			{
				link: '/',
				name: 'Главная',
			},
			{
				link: '/services/',
				name: 'Услуги',
			},
			{
				link: null,
				name: 'Настройка веб-аналитики',
			},
		],
		title: 'Создаем дизайнерские сайты, поднимающие конверсию продаж',
		description: `
					<ul>
						<li>Мы поможем сформулировать структурную задачу, исходя из Ваших целей, даже если Вы еще не уверены в точных требованиях к своему сайту и его функционалу.</li>
						<li>Объясним все доступным языком, даже если Вы абсолютно не обладаете техническими знаниями.</li>
						<li>У нас на счету более 100 успешных проектов, опыт наших арт-директоров и дизайнеров более 12 лет, поэтому мы уверены в грамотных пользовательских сценариях и качестве продукта.</li>
						<li>Мы оперативно подхватываем задачи, работаем даже сжатыми дедлайнами и предоставляем варианты, как уложиться в Ваш бюджет.</li>
					</ul>
				`,
		price_caption: 'Стоимость услуг',
		price: 'от 200 000 ₽',
		author: {
			name: 'Алексей Гальченко',
			profession: 'Технический директор, MBA',
			picture: '/service-dizayn-page/service-banner/author-pic.png',
			picture_params: {
				width: '409',
				height: '798',
			},
			picture_small:
				'/service-dizayn-page/service-banner/author-pic-small.png',
			picture_small_params: {
				width: '120',
				height: '120',
			},
		},
		awards: {
			items: [
				{
					name: 'Рейтинг Рунета, 2022',
					picture: '/service-dizayn-page/service-banner/awards/1.png',
					picture_params: {
						width: '50',
						height: '50',
					},
					text: '«SEO-аналитика и консалтинг»',
				},
				{
					name: 'Рейтинг Рунета, 2022',
					picture: '/service-dizayn-page/service-banner/awards/1.png',
					picture_params: {
						width: '50',
						height: '50',
					},
					text: '«Рейтинг агентств таргетированной рекламы, Порталы и сервисы»',
				},
				{
					name: 'Рейтинг Рунета, 2022',
					picture: '/service-dizayn-page/service-banner/awards/1.png',
					picture_params: {
						width: '50',
						height: '50',
					},
					text: '«SEO-аналитика и консалтинг»',
				},
			],
		},
		order_button: {
			name: 'Заказать дизайн под ключ',
			action: {
				name: 'UX-аудит главной страницы сайта',
				value: null,
			},
		},
	};

	const resultsOurWorksData = {
		name: 'Результаты нашей работы',
		text: 'Результаты нашей работы - это не просто разработанные сайты, но и результаты его работы, которые можно измерить. Мы активно отслеживаем аналитику и обратную связь, чтобы убедиться, что каждый созданный нами сайт приносит реальную пользу вашему бизнесу.',
		items: [
			{
				name: 'Разработали адаптивный сайт с высоким уровнем юзабилити',
				text: 'Модернизировали сайт клиента и добились молниеносности интерфейса',
				picture: '/service-dizayn-page/results-our-works/1.jpg',
				picture_params: {
					width: '652',
					height: '412',
				},
				popup_data: {
					title: 'Кейс МАЗ',
					picture: '/service-dizayn-page/modal-design/1.jpg',
					picture_params: {
						width: '1280',
						height: '16542',
					},
					picture_small:
						'/service-dizayn-page/modal-design/1-small.jpg',
					picture_small_params: {
						width: '668',
						height: '8632',
					},
				},
				link: '/cases/sozdali-lakonichnyy-sayt-dlya-slozhnoy-uslugi/',
				awards: null,
				results: null,
			},
			{
				name: 'Разработали сайт, который стал больше, чем каталог мебели',
				text: 'Ссоздали не просто электронный каталог с опцией заказа товаров, а пространство с интерьерами, по которым можно прогуляться и определиться с выбором конкретных товаров.',
				picture: '/service-dizayn-page/results-our-works/2.jpg',
				picture_params: {
					width: '652',
					height: '412',
				},
				popup_data: {
					title: 'Кейс Mr.Doors',
					picture: '/service-dizayn-page/modal-design/2.jpg',
					picture_params: {
						width: '1366',
						height: '8540',
					},
					picture_small:
						'/service-dizayn-page/modal-design/2-small.jpg',
					picture_small_params: {
						width: '668',
						height: '4176',
					},
				},
				link: '/cases/progulka-po-mebelnomu-magazinu-v-granitsakh-sayta-keys-medianation-i-mr-doors/',
				awards: null,
				results: null,
			},
			{
				name: 'Создали минималистичный сайт с высоким уровнем юзабилити',
				text: 'Мы сделали сайт для компании-дистрибьютора smart-мебели таким, чтобы он вписывался в ритм жизни аудитории и удовлетворял потребностям клиента.',
				picture: '/service-dizayn-page/results-our-works/3.jpg',
				picture_params: {
					width: '652',
					height: '367',
				},
				popup_data: {
					title: 'Кейс Contract Interiors Shop',
					picture: '/service-dizayn-page/modal-design/3.jpg',
					picture_params: {
						width: '1366',
						height: '13600',
					},
					picture_small:
						'/service-dizayn-page/modal-design/3-small.jpg',
					picture_small_params: {
						width: '668',
						height: '6651',
					},
				},
				link: '/cases/sozdali-minimalistichnyy-sayt-s-vysokim-urovnem-yuzabiliti/',
				awards: null,
				results: null,
			},
			{
				name: 'Разработали интернет-магазин с нуля за 12 недель',
				text: 'Чтобы еще один канал продаж клиента был эффективным, он должен быть привычным для пользователя, поэтому разработчикам необходимо делать акцент на удобстве пользования',
				picture: '/service-dizayn-page/results-our-works/4.jpg',
				picture_params: {
					width: '652',
					height: '412',
				},
				popup_data: {
					title: 'Кейс Cosmokit',
					picture: '/service-dizayn-page/modal-design/4.jpg',
					picture_params: {
						width: '1366',
						height: '5068',
					},
					picture_small:
						'/service-dizayn-page/modal-design/4-small.jpg',
					picture_small_params: {
						width: '668',
						height: '2478',
					},
				},
				link: '/cases/razrabotali-internet-magazin-s-nulya-v-szhatye-sroki/',
				awards: null,
				results: null,
			},
			{
				name: 'Провели редизайн сайта и увеличили глубину просмотра',
				text: 'Сделали сайт эффективным для бизнеса, удобным для пользователя и в то же время отличным от конкурентов',
				picture: '/service-dizayn-page/results-our-works/5.png',
				picture_params: {
					width: '652',
					height: '412',
				},
				popup_data: {
					title: 'Кейс КухниСити',
					picture: '/service-dizayn-page/modal-design/5.jpg',
					picture_params: {
						width: '1456',
						height: '1620',
					},
					picture_small:
						'/service-dizayn-page/modal-design/5-small.jpg',
					picture_small_params: {
						width: '668',
						height: '743',
					},
				},
				link: '/cases/proveli-redizayn-sayta-i-uvelichili-glubinu-prosmotra/',
				awards: null,
				results: null,
			},
			{
				name: 'Обеспечили рост бизнеса на 20% ежемесячно',
				text: 'В результате всех проведенных работ по сравнению с предыдущим годом трафик на сайт увеличился на 70%, ROI — на 140%, продажи в e-commerce — на 60%.',
				picture: '/service-dizayn-page/results-our-works/6.jpg',
				picture_params: {
					width: '652',
					height: '372',
				},
				popup_data: {
					title: 'Кейс Линзмастер',
					picture: '/service-dizayn-page/modal-design/6.jpg',
					picture_params: {
						width: '1366',
						height: '4549',
					},
					picture_small:
						'/service-dizayn-page/modal-design/6-small.jpg',
					picture_small_params: {
						width: '668',
						height: '2225',
					},
				},
				link: '/cases/kompleksnoe-prodvizhenie-linzmaster/',
				awards: null,
				results: null,
			},
			{
				name: 'Увеличили объем продаж и вовлеченность аудитории',
				text: 'На момент окончания акции клиент сообщил нам о росте объема продаж, вовлеченности аудитории и частоты заказов. Количественные данные не сообщаются, но, со слов клиента, результаты проведенной акции превзошли установленные KPI.',
				picture: '/service-dizayn-page/results-our-works/7.jpg',
				picture_params: {
					width: '652',
					height: '412',
				},
				popup_data: {
					title: 'Кейс Папа Джонс',
					picture: '/service-dizayn-page/modal-design/7.jpg',
					picture_params: {
						width: '1366',
						height: '3092',
					},
					picture_small:
						'/service-dizayn-page/modal-design/7-small.jpg',
					picture_small_params: {
						width: '668',
						height: '1512',
					},
				},
				link: '/cases/uvelichili-obem-prodazh-i-vovlechennost-auditorii/',
				awards: null,
				results: null,
			},
			{
				name: 'Создали интернет-магазин для бренда спортивной одежды',
				text: 'Открывая сайт Bona Fide, пользователь попадает не просто в магазин одежды, а прикасается к определенному стилю жизни, который задают модели с фотографий',
				picture: '/service-dizayn-page/results-our-works/8.png',
				picture_params: {
					width: '721',
					height: '412',
				},
				popup_data: {
					title: 'Кейс Bona Fide',
					picture: '/service-dizayn-page/modal-design/8.jpg',
					picture_params: {
						width: '1366',
						height: '5865',
					},
					picture_small:
						'/service-dizayn-page/modal-design/8-small.jpg',
					picture_small_params: {
						width: '668',
						height: '2868',
					},
				},
				link: '/cases/sozdali-internet-magazin-dlya-brenda-sportivnoy-odezhdy/',
				awards: null,
				results: null,
			},
		],
	};

	const tariffsData = {
		title: 'Сколько стоит разработка сайта под ключ?',
		items: [
			{
				name: 'Создание и разработка лендинга на Tilda',
				price: 'от 200 000 ₽',
				advantages: [
					{
						name: 'Сегодня',
						description: 'Свяжемся с вами и пришлем презентацию',
					},
					{
						name: 'Через 1 день',
						description: 'Пришлем КП и проведем защиту',
					},
				],
				html: `
						<ul>
							<li>Погружение в нишу и изучение особенностей направления и проведение анализа конкурентов и изучение целевой аудитории</li>
							<li>Согласование стиля сайта</li>
							<li>Отрисовка дизайна сайта для ПК версии и его утверждение</li>
							<li>Верстка сайта для ПК версии, мобильной и планшетной версий</li>
							<li>Программирование сайта в соответствии с техническими аспекты</li>
						</ul>
				`,
				button_name: null,
			},
			{
				name: 'Создание и разработка лендинга на CMS “1С-Битрикс”',
				price: 'от 450 000 ₽',
				advantages: [
					{
						name: 'Сегодня',
						description: 'Свяжемся с вами и пришлем презентацию',
					},
					{
						name: 'Через 2 дня',
						description: 'Пришлем КП и проведем защиту',
					},
				],
				html: `
							<ul>
								<li>Погружение в нишу и изучение особенностей направления и проведение анализа конкурентов и изучение целевой аудитории</li>
								<li>Согласование прототипов и стиля сайта</li>
								<li>Отрисовка дизайна сайта для ПК версии и его утверждение</li>
								<li>Верстка и программирование сайта для ПК, мобильной и планшетной версий</li>
								<li>Полноценно рабочий проект для seo-продвижения</li>
							</ul>
				`,
				button_name: null,
			},
			{
				name: 'Создание и разработка небольшого сайта (до 7 разделов) на CMS “WordPress”',
				price: 'от 600 000 ₽',
				advantages: [
					{
						name: 'Сегодня',
						description: 'Свяжемся с вами и пришлем презентацию',
					},
					{
						name: 'Через 2 дня',
						description: 'Пришлем КП и проведем защиту',
					},
				],
				html: `
							<ul>
								<li>Погружение в нишу и изучение особенностей направления и проведение анализа конкурентов и изучение целевой аудитории</li>
								<li>Согласование прототипов и стиля сайта</li>
								<li>Отрисовка дизайна сайта для ПК версии и его утверждение</li>
								<li>Верстка и программирование сайта для ПК, мобильной и планшетной версий</li>
								<li>Полноценно рабочий проект для seo-продвижения</li>
								<li>Множество плагинов, которые позволят в будущем расширять функциональность сайта</li>
								<li>Плагины и методы для защиты сайта от взломов и атак</li>
							</ul>
				`,
				button_name: null,
			},
			{
				name: 'Создание и разработка небольшого сайта (до 7 разделов) на CMS “1С-Битрикс”',
				price: 'от 900 000 ₽',
				advantages: [
					{
						name: 'Сегодня',
						description: 'Свяжемся с вами и пришлем презентацию',
					},
					{
						name: 'Через 2 дня',
						description: 'Пришлем КП и проведем защиту',
					},
				],
				html: `
							<ul>
								<li>Погружение в нишу и изучение особенностей направления и проведение анализа конкурентов и изучение целевой аудитории</li>
								<li>Согласование прототипов и стиля сайта</li>
								<li>Отрисовка дизайна сайта для ПК версии и его утверждение</li>
								<li>Верстка и программирование сайта для ПК, мобильной и планшетной версий</li>
								<li>Полноценно рабочий проект для seo-продвижения</li>
								<li>Множество плагинов, которые позволят в будущем расширять функциональность сайта</li>
								<li>Плагины и методы для защиты сайта от взломов и атак</li>
								<li>Возможность необходимых интеграций для упрощения ваших бизнес-процессов</li>
								<li>Активное русскоязычное сообщество Bitrix-разработчиков, что упрощает и улучшает поддержку сайта в будущем</li>
							</ul>
				`,
				button_name: null,
			},
			{
				name: 'Создание и разработка сайта услуг на CMS “1С-Битрикс”',
				price: 'от 1 200 000 ₽',
				advantages: [
					{
						name: 'Сегодня',
						description: 'Свяжемся с вами и пришлем презентацию',
					},
					{
						name: 'Через 3 дня',
						description: 'Пришлем КП и проведем защиту',
					},
				],
				html: `
							<ul>
								<li>Погружение в нишу и изучение особенностей направления и проведение анализа конкурентов и изучение целевой аудитории</li>
								<li>Отрисовка дизайна сайта для ПК версии и его утверждение</li>
								<li>Верстка и программирование сайта для ПК, мобильной и планшетной версий</li>
								<li>Множество плагинов, которые позволят в будущем расширять функциональность сайта</li>
								<li>Плагины и методы для защиты сайта от взломов и атак</li>
								<li>Возможность необходимых интеграций для упрощения ваших бизнес-процессов</li>
								<li>Создание и управление заказами и заявками на услуги с помощью интегрированных инструментов Bitrix. Это упрощает процесс приема и обработки заказов.</li>
								<li>Активное русскоязычное сообщество Bitrix-разработчиков, что ускоряет и улучшает поддержку сайта в будущем</li>
							</ul>
				`,
				button_name: null,
			},
			{
				name: 'Создание и разработка интернет-магазина на CMS “1С-Битрикс”',
				price: 'от 1 500 000 ₽',
				advantages: [
					{
						name: 'Сегодня',
						description: 'Свяжемся с вами и пришлем презентацию',
					},
					{
						name: 'Через 3 дня',
						description: 'Пришлем КП и проведем защиту',
					},
				],
				html: `
							<ul>
								<li>Погружение в нишу и изучение особенностей направления и проведение анализа конкурентов и изучение целевой аудитории</li>
								<li>Отрисовка дизайне сайта для ПК версии и его утверждение</li>
								<li>Верстка и программирование сайта для ПК, мобильной и планшетной версий</li>
								<li>Множество плагинов, которые позволят в будущем расширять функциональность сайта</li>
								<li>Плагины и методы для защиты сайта от взломов и атак</li>
								<li>Возможность необходимых интеграций для упрощения ваших бизнес-процессов</li>
								<li>Создание и управление заказами и заявками на услуги с помощью интегрированных инструментов Bitrix. Это упрощает процесс приема и обработки заказов.</li>
								<li>Управление клиентской базой данных, отслеживание запросов и заказов, а также взаимодействие с клиентами более организованно.</li>
								<li>Возможность интеграции с 1С</li>
								<li>Активное русскоязычное сообщество Bitrix-разработчиков, что ускоряет и улучшает поддержку сайта в будущем</li>
							</ul>
				`,
				button_name: null,
			},
			{
				name: 'Создание и разработка интернет-магазина на Framework без использования CMS',
				price: 'от 3 500 000 ₽',
				advantages: [
					{
						name: 'Сегодня',
						description: 'Свяжемся с вами и пришлем презентацию',
					},
					{
						name: 'Через 5 дней',
						description: 'Пришлем КП и проведем защиту',
					},
				],
				html: `
							<ul>
								<li>Гибкость и настраиваемость: создание точно тех функций и возможностей, которые вам нужны, и их настройка под ваши конкретные потребности без ограничений</li>
								<li>Быстродействие: оптимизированный код обеспечивает более высокую производительность интернет-магазина</li>
								<li>Безопасность: полный контроль безопасности интернет-магазина</li>
								<li>Скорость разработки: разработка на фреймворке может занять больше времени, чем на существующих CMS, но в перспективе это ускорит разработку и поддержку, так как вы не ограничены функциональностью, которую предоставляет CMS.</li>
								<li>Полнота контроля: абсолютный контроль над структурой базы данных, архитектурой сайта и всеми аспектами разработки</li>
								<li>Масштабируемость: более легкую масштабируемость магазина по мере роста бизнеса</li>
								<li>Независимость от поставщика: с фреймворков у вас больше независимости и контроля, так как при использовании CMS вы зависите от ее разработчиков и ограничены ее обновлениями.</li>
							</ul>
				`,
				button_name: null,
			},
		],
	};

	const tabsData = {
		title: 'Этапы разработки сайта',
		items: [
			{
				name: 'Планирование',
				caption: 'Планирование',
				picture: '/service-dizayn-page/tabs/1.jpg',
				html: 'Определение функциональности и дизайна сайта, а также создание плана проекта.',
				button_name: null,
			},
			{
				name: 'Исследование рынка и проектирование структуры сайта',
				caption: 'Исследование рынка и проектирование структуры сайта',
				picture: '/service-dizayn-page/tabs/2.jpg',
				html: 'Анализ рынка, конкурентов, общая концепция дизайна и структуры сайта, включая визуальные элементы, компоненты интерфейса, иерархию страниц и навигацию.',
				button_name: null,
			},
			{
				name: 'Прототипирование страниц',
				caption: 'Прототипирование страниц',
				picture: '/service-dizayn-page/tabs/3.jpg',
				html: 'Создание  макетов типовых страниц сайта. Это позволяет визуализировать, как будут выглядеть страницы и как будут размещены элементы интерфейса. Прототипы помогают понять, как будет выглядеть конечный продукт, его удобство. Этап прототипирования позволяет внести необходимые изменения до начала фактической разработки.',
				button_name: null,
			},
			{
				name: 'Создание дизайна страниц по согласованным прототипам',
				caption: 'Создание дизайна страниц по согласованным прототипам',
				picture: '/service-dizayn-page/tabs/4.jpg',
				html: 'Дизайнеры разрабатывают внешний вид и оформление каждой страницы сайта с учетом ранее созданных прототипов. Выбор цветовой палитры, шрифтов, стилей элементов интерфейса, создание графических элементов и фонов, а также разработку всех визуальных деталей.',
				button_name: null,
			},
			{
				name: 'Адаптивная верстка',
				caption: 'Адаптивная верстка',
				picture: '/service-dizayn-page/tabs/5.jpg',
				html: 'Специалисты по веб-разработке преобразуют созданный дизайн в код, который адаптируется к разным устройствам и разрешениям экранов. Это включает в себя использование технологий CSS и HTML для создания гибкой и отзывчивой вёрстки, которая корректно отображается на компьютерах, планшетах и смартфонах.',
				button_name: null,
			},
			{
				name: 'Программирование и разработка сайта',
				caption: 'Программирование и разработка сайта',
				picture: '/service-dizayn-page/tabs/6.jpg',
				html: 'Здесь программисты разрабатывают функционал сайта с учетом требований в ТЗ. Этот этап включает в себя создание бэкэнда, фронтэнда сайта и интеграцию всех компонентов, чтобы сайт работал как задумано.',
				button_name: null,
			},
			{
				name: 'Подготовка и размещение контента',
				caption: 'Подготовка и размещение контента',
				picture: '/service-dizayn-page/tabs/7.jpg',
				html: 'Включает в себя написание и редактирование текстовых статей, загрузку изображений и видео, а также создание страниц с учетом ранее разработанной структуры сайта. Контент должен быть оптимизирован для поисковых систем (SEO).',
				button_name: null,
			},
			{
				name: 'Проверка сайта на тестовой версии',
				caption: 'Проверка сайта на тестовой версии',
				picture: '/service-dizayn-page/tabs/8.jpg',
				html: '<p>QA-инжинеры, программисты, технический директор и проджект-менеджер проводят глобальное тестирование веб-сайта на его тестовой версии.</p> <ul><li>Проверка работоспособности всех функций и интерактивных элементов сайта.</li><li>Тестирование совместимости с различными веб-браузерами, устройствами и операционными системами.</li><li>Проверка безопасности сайта.</li><li>Проверка скорости загрузки страниц.</li><li>Проверка на соответствие дизайна и контента исходным требованиям и прототипам.</li><li>Выявление и устранение ошибок и багов.</li></ul>',
				button_name: null,
			},
			{
				name: 'Публикация сайта и наблюдение за ним',
				caption: 'Публикация сайта и наблюдение за ним',
				picture: '/service-dizayn-page/tabs/9.jpg',
				html: 'Сайт публикуется на основном домене, доступном для реальных пользователей. После этого начинается поддержка и мониторинг работы сайта. Этот этап обеспечивает бесперебойную работу и актуальность сайта после его запуска и позволяет оперативно реагировать на изменения и потребности пользователей.',
				button_name: null,
			},
		],
	};

	const infoColumnsData = {
		title: 'Кому и зачем нужна разработка сайта?',
		items: [
			{
				name: 'Бизнесы и компании',
				caption: null,
				html: `
							<ul>
								<li>Онлайн-присутствие: быть онлайн и доступными для своих клиентов и потенциальных клиентов 24/7.</li>
								<li>Маркетинг и реклама: для продвижения продуктов, услуг и бренда через интернет.</li>
								<li>Продажи и электронная коммерция: онлайн-магазины и интернет-платформы для продажи своих товаров и услуги онлайн.</li>
							</ul>
						`,
			},
			{
				name: 'Организации и учреждения',
				caption: null,
				html: `
							<ul>
								<li>Некоммерческие организации: для привлечения внимания к своим потребностям, для сбора пожертвований и организации мероприятий.</li>
								<li>Образовательные учреждения: для информирования студентов и родителей, а также для предоставления образовательных ресурсов.</li>
								<li>Научные и исследовательские организации: публикация исследований и их результатов, привлечение финансирования на исследования и опыты.</li>
							</ul>
						`,
			},
			{
				name: 'Государственные организации',
				caption: null,
				html: `
							<ul>
								<li>Информирование об услугах и программам: уведомление граждан о доступных услугах и программах.</li>
								<li>Публичная документация: официальные документы и отчеты публикуются на сайтах государственных организаций для общественного доступа.</li>
							</ul>
						`,
			},
		],
	};

	const textDefaultData = {
		html: `
			<div class="c-have-questions js-c-have-questions">
				<div class="cols">
					<div class="left">
						<div class="title">Остались вопросы?</div>
						<div class="text">
							Если у вас есть вопросы или сомнения по поводу разработки или редизайна сайта, вы можете получить бесплатную консультацию от ведущего менеджера проектов отдела разработки Medianation.
						</div>
					</div>
					<div class="right">
						<div class="btn-wrap">
							<button class="btn">Получить консультацию</button>
						</div>
					</div>
				</div>
			</div>
		`,
	};

	const casesData = {
		name: 'Кейсы по разработке сайта под ключ',
		items: [
			{
				name: 'Разработали адаптивный сайт с высоким уровнем юзабилити',
				picture: '/service-dizayn-page/case-carousel/1.png',
				picture_params: {
					width: '952',
					height: '520',
				},
				text: 'Модернизировали сайт клиента и добились молниеносности интерфейса',
				link: '/cases/razrabotali-adaptivnyy-sayt-s-vysokim-urovnem-yuzabiliti/',
			},
			{
				name: 'Разработали сайт, который стал больше, чем каталог мебели',
				picture: '/service-dizayn-page/case-carousel/2.png',
				picture_params: {
					width: '1920',
					height: '780',
				},
				text: 'Пользователи могут прогуляться по интерьерам, созданным специалистами Mr.Doors',
				link: '/cases/progulka-po-mebelnomu-magazinu-v-granitsakh-sayta-keys-medianation-i-mr-doors/',
			},
			{
				name: 'Провели редизайн сайта и увеличили глубину просмотра',
				picture: '/service-dizayn-page/case-carousel/3.png',
				picture_params: {
					width: '952',
					height: '520',
				},
				text: 'Адаптировали сайт под разные устройства и увеличили скорость загрузки страниц',
				link: '/cases/proveli-redizayn-sayta-i-uvelichili-glubinu-prosmotra/',
			},
			{
				name: 'Создали минималистичный сайт с высоким уровнем юзабилити',
				picture: '/service-dizayn-page/case-carousel/4.png',
				picture_params: {
					width: '952',
					height: '520',
				},
				text: 'Разработали интернет-магазин с характером бренда',
				link: '/cases/sozdali-minimalistichnyy-sayt-s-vysokim-urovnem-yuzabiliti/',
			},
			{
				name: 'В 4 раза увеличили скорость загрузки страниц интернет-магазина',
				picture: '/service-dizayn-page/case-carousel/5.png',
				picture_params: {
					width: '952',
					height: '520',
				},
				text: 'Настроили кэш и устранили проблемы с загрузкой сайта',
				link: '/cases/optimizatsiya-skorosti-raboty-internet-magazina/',
			},
			{
				name: 'Создали современный сайт для бренда бытовой техники и увеличили конверсии на 32%',
				picture: '/service-dizayn-page/case-carousel/6.png',
				picture_params: {
					width: '846',
					height: '546',
				},
				text: 'Вдохновили посетителей на покупку техники с помощью красивого и удобного интерфейса, а также привлекли больше трафика и конверсий',
				link: '/cases/sozdali-sovremennyy-sayt-dlya-brenda-bytovoy-tekhniki-i-uvelichili-konversii-na-32/',
			},
			{
				name: 'Установили последнюю версию Bitrix, ускорили загрузку сайта и на 26% превысили его эталонную производительность',
				picture: '/service-dizayn-page/case-carousel/7.png',
				picture_params: {
					width: '846',
					height: '546',
				},
				text: 'Провели глобальное обновление сайта для бренда товаров для сна и отдыха',
				link: '/cases/ustanovili-poslednyuyu-versiyu-bitrix-uskorili-zagruzku-sayta-i-na-26-prevysili-ego-etalonnuyu-proiz/',
			},
			{
				name: 'Создали лаконичный сайт для сложной услуги',
				picture: '/service-dizayn-page/case-carousel/8.png',
				picture_params: {
					width: '1920',
					height: '780',
				},
				text: 'Четкая и ясная навигация помогают быстро ориентироваться в услугах и легко воспринимать информацию',
				link: '/cases/sozdali-lakonichnyy-sayt-dlya-slozhnoy-uslugi/',
			},
			{
				name: 'Разработали интернет-магазин для бренда ювелирных украшений',
				picture: '/service-dizayn-page/case-carousel/9.png',
				picture_params: {
					width: '846',
					height: '546',
				},
				text: 'Разработали понятную структуру и внедрили необычную функцию "Намекнуть на подарок"',
				link: '/cases/razrabotali-internet-magazin-dlya-brenda-yuvelirnykh-ukrasheniy/',
			},
			{
				name: 'Разработали сайт для производителя косметики',
				picture: '/service-dizayn-page/case-carousel/10.png',
				picture_params: {
					width: '952',
					height: '520',
				},
				text: 'Провели опрос целевой аудитории и разработали сайт с нуля',
				link: '/cases/razrabotali-sayta-dlya-proizvoditelya-kosmetiki/',
			},
			{
				name: 'Создали интернет-магазин для бренда спортивной одежды',
				picture: '/service-dizayn-page/case-carousel/11.jpg',
				picture_params: {
					width: '952',
					height: '520',
				},
				text: 'Разработали сайт, ориентированный на удобство использования',
				link: '/cases/sozdali-internet-magazin-dlya-brenda-sportivnoy-odezhdy/',
			},
		],
	};

	const advantagesData = {
		name: 'Как мы работаем',
		items: [
			{
				icon: '/service-dizayn-page/advantages/1.png',
				text: 'Первичное общение, бирфинг с представителями отдела разработки.',
			},
			{
				icon: '/service-dizayn-page/advantages/2.png',
				text: 'Оценка и КП.',
			},
			{
				icon: '/service-dizayn-page/advantages/3.png',
				text: 'Согласование. Заведение проекта. Создание роудмапа. Знакомство с командой.',
			},
			{
				icon: '/service-dizayn-page/advantages/4.png',
				text: 'Разворачиваем тестовую среду, актуализируем все доступы и подготавливаем к работе.',
			},
			{
				icon: '/service-dizayn-page/advantages/5.png',
				text: 'Создание прототипов, дизайна, переход к работам по фронтенду и бэкенду.',
			},
			{
				icon: '/service-dizayn-page/advantages/6.png',
				text: 'Финальное тестирование.',
			},
			{
				icon: '/service-dizayn-page/advantages/7.png',
				text: 'Защита проекта, подготовка инструкции или видео-урока (по запросу). Размещение на боевом домене. Подписание актов по завершению работы.',
			},
		],
	};

	const warrantiesData = {
		name: 'Гарантии',
		items: [
			{
				icon: '/service-dizayn-page/warranties/1.png',
				name: 'Все предстоящие работы будут описаны в договоре',
			},
			{
				icon: '/service-dizayn-page/warranties/2.png',
				name: 'Гарантия сроков работ и качества в течение 6-ти месяцев',
			},
			{
				icon: '/service-dizayn-page/warranties/3.png',
				name: 'Работа со специалистами с многолетним опытом в менеджменте и разработке',
			},
		],
	};

	const reviewsSliderData = {
		name: 'Отзывы',
		items: [
			{
				name: 'Отзыв от Имплант Сити',
				text: 'Выражаем благодарность MediaNation за вклад в успешное обновление нашего сайта implantcity.ru. Сотрудничество с командой агентства оказалось удачным и продуктивным. Нам нужен был сайт, который бы не только выглядел современно, но и способствовал увеличению конверсии в заявки. Коллеги из MediaNation успешно справились в решении этой задачи: глубоко проанализировали нашу нишу и целевую аудиторию, предложили несколько решений, завернули информацию о нас и наших услугах в настоящий сторителлинг, который теперь последовательно знакомит посетителей сайта с клиникой.',
				rating: 5,
				client: {
					name: 'Имплант Сити',
					picture: '/service-dizayn-page/reviews/1.jpg',
					picture_params: {
						width: '794',
						height: '795',
					},
					link: 'https://implantcity.ru/',
				},
				author: {
					name: 'Цупиков А.В.',
					position: 'Генеральный директор',
				},
				file: '/service-dizayn-page/reviews/files/1.pdf',
			},
			{
				name: 'Отзыв от КухниСити',
				text: 'Благодарим за сотрудничество с 2021 по 2022 год техническую команду МедиаНации! С начала нашего взаимодействия мы столкнулись с рядом сложных технических задач, и коллеги всегда старались найти оптимальные решения. Команда всегда была доступна для обсуждения вопросов и дополнительных уточнений, что делало наше сотрудничество более продуктивным.',
				rating: 5,
				client: {
					name: 'КухниСити',
					picture: '/service-dizayn-page/reviews/2.png',
					picture_params: {
						width: '412',
						height: '250',
					},
					link: 'https://kuhnicity.ru/',
				},
				author: {
					name: 'Хорин С.И.',
					position: 'Генеральный директор',
				},
				file: '/service-dizayn-page/reviews/files/2.pdf',
			},
			{
				name: 'Отзыв от 1811stores.com',
				text: 'Интернет-магазин 1811stores.com сотрудничает с брендом «Медианация» с 2018 года. В поисках оптимального UX/UI, мы дважды изменили структуру, логику и дизайн нашего интернет-магазина. Мы вносили новые изменения исходя из анализа предыдущей воронки и её пропускной способности. Самым важным для нас был аргументированный подход к структуре и дизайну интернет-магазина. В этом вопросе мы в значительной степени оперировали компетенциями «Медианация».',
				rating: 5,
				client: {
					name: '1811stores',
					picture: '/service-dizayn-page/reviews/3.jpg',
					picture_params: {
						width: '943',
						height: '944',
					},
					link: 'https://1811stores.com/',
				},
				author: {
					name: 'Терентьева Д.А.',
					position: 'Генеральный директор',
				},
				file: '/service-dizayn-page/reviews/files/3.pdf',
			},
			{
				name: 'Отзыв от consul-coton.ru',
				text: 'Разработанный и продвигаемый агентством интернет - магазин соответствует самым высоким мировым стандартам и показал высокие продажи. В компании работают профессиональные и грамотные специалисты, высокая квалификация которых не вызывает сомнений. Все дизайнерские и продвиженчиские решения разработчиков - оптимальны и эффективны. Вывод сайта, не смотря на сложность проекта, был выполнен качественно и в срок.',
				rating: 5,
				client: {
					name: 'Consul',
					picture: '/service-dizayn-page/reviews/4.png',
					picture_params: {
						width: '412',
						height: '250',
					},
					link: 'https://consul-coton.ru/',
				},
				author: {
					name: 'Фисун А.Н.',
					position: 'Руководитель интернет-магазина consul-coton.ru',
				},
				file: '/service-dizayn-page/reviews/files/4.pdf',
			},
			{
				name: 'Отзыв от Papa Johns',
				text: 'Сотрудничество ООО «Пи Джей Евразия»с компанией ООО МедиаНация имеет хоть и небольшую, но историю сотличным результатом. С их помощью было разработано 4 промолендинга с общим призовым фондом более 2 млн рублей.',
				rating: 5,
				client: {
					name: 'Papa Johns',
					picture: '/service-dizayn-page/reviews/5.png',
					picture_params: {
						width: '412',
						height: '250',
					},
					link: 'https://papajohns.ru/',
				},
				author: {
					name: 'Мартынова Карина Робертовна',
					position: 'Генеральный директор',
				},
				file: '/service-dizayn-page/reviews/files/5.pdf',
			},
			{
				name: 'Отзыв от ООО «МАЗ-РУС»',
				text: 'В работе со специалистами MediaNation нам был важен их профессионализм, но еще более важным было то, что коллеги разделили нашу любовь к технике и разработали уникальный дизайн для нашего нового сайта. Трепет, с которым специалисты работали над сайтом, был сравним с тем, как конструкторы “МАЗ” продумывают каждую деталь автомобиля. Скорость работы, внимание к нашим пожеланиям и инициатива отдела разработки сделали создание нового сайта следующим этапом в развитии нашей компании. Специалистам удалось передать характер техники через элементы дизайна и контент, что очень важно для брендовой составляющей “МАЗ".',
				rating: 5,
				client: {
					name: 'МАЗ РУС',
					picture: '/service-dizayn-page/reviews/6.png',
					picture_params: {
						width: '412',
						height: '250',
					},
					link: 'https://maz-rus.com/',
				},
				author: {
					name: 'Вадим Цой',
					position:
						'Зам. начальника информационно-аналитического отдела',
				},
				file: null,
			},
			{
				name: 'Отзыв от Lancronix',
				text: 'В ходе выполнения работ компания «ЛАНКРОНИКС» осталась довольна как самим подходом, так и результатом работ.',
				rating: 5,
				client: {
					name: 'Lantronix',
					picture: '/service-dizayn-page/reviews/7.png',
					picture_params: {
						width: '412',
						height: '123',
					},
					link: 'https://lancronix.ru/',
				},
				author: {
					name: 'Кропов Д.И.',
					position: 'Генеральный директор',
				},
				file: '/service-dizayn-page/reviews/files/7.pdf',
			},
		],
	};

	const textDefaultSecondData = {
		html: `
			<h2>Почему выбирают нас?</h2>
			<div class="q-row">
				<div class="q-col">
					<div class="q-title">Команда экспертов</div>
					<div>Над сайтом для каждого клиента работает отдельная команда — разработчики, SEO-оптимизаторы, дизайнеры, копирайтеры, маркетологи, которые являются экспертами в своей области. Команда посвящает максимум времени вашему проекту, создает и реализует оригинальные решения, эффективные именно для достижения задач клиента.</div>
				</div>
				<div class="q-col">
					<div class="q-title">Индивидуальный подход</div>
					<div>Мы не работаем по шаблонам, а создаем сайты, которые решают задачи клиента — повышают продажи, укрепляют репутацию бренда, формируют лояльность покупателей. Проект-менеджер ведет не больше 6 проектов одновременно — он вникает в ваш бизнес и предлагает не типовое решение, а индивидуальное, в соответствии с процессами и особенностями именно вашего бизнеса.</div>
				</div>
				<div class="q-col">
					<div class="q-title">Гарантии и прозрачность работ</div>
					<div>Во время разработки сайта вы регулярно получаете отчеты о проделанной работе. Проджект-менеджер всегда на связи с вами — вы в любой момент можете отследить прогресс. MediaNation дает гарантию на созданный сайт до года. Вы можете заказать поддержку сайта. Если возникнут ошибки, мы оперативно их устраним.</div>
				</div>
				<div class="q-col">
					<div class="q-title">Комплексное решение задач</div>
					<div>Разработка, дизайн, наполнение, продвижение и тестирование — мы работаем сразу над всеми элементами. Вы получаете готовый продукт, которым можно пользоваться.</div>
				</div>
			</div>
		`,
	};

	const faqData = {
		name: 'Частые вопросы',
		items: [
			{
				name: 'Что делать, если на новом сайте будут обнаружены ошибки? Есть ли гарантийный срок?',
				text: 'После окончания работ по созданию сайта мы тестируем его сами, выявляем и исправляем ошибки, поэтому вы получаете готовый и отлаженный инструмент для вашего бизнеса. Если вы обнаружили ошибку — напишите нам, мы ее устраним.',
			},
			{
				name: 'Можно ли улучшить старый сайт, вместо создания нового?',
				text: 'Технически — да. Практически – это не всегда выгодно, особенно если сайт сделан больше 5 лет назад и сильно устарел. Разобраться, какой вариант выгодней для вас, поможет UI/UX-аудит — мы проанализируем сайт и составим подробный отчёт о том, что можно улучшить и в какую сумму это обойдётся.',
			},
			{
				name: 'От чего зависит стоимость создания сайта?',
				text: 'От сложности и функций, которые вам нужны. Чем сайт проще, тем бюджетней его создание. Визитка и лендинг стоят меньше, чем интернет-магазин, но каждый сайт решает свою задачу — поэтому необходимо точно определить, чего вы хотите добиться с его помощью, а затем выбирать формат. Напишите нам, если нужна консультация.',
			},
			{
				name: 'В какие сроки будет создан сайт?',
				text: 'Точный срок зависит от формата сайта и объема работ и рассчитывается индивидуально. Презентацию и коммерческое предложение с обозначенными сроками выполнения заказа вы получаете в течение трех дней после обращения. Усредненный срок сдачи: Лендинги — 1 месяц; Сайты-визитки — 2 месяца; Корпоративные сайты — 2-3 месяца; Интернет-магазины — 4-6 месяцев; Порталы — индивидуально, от 6 месяцев.',
			},
		],
	};

	const floatingModalData = {
		text: 'Создаем дизайнерские сайты, поднимающие конверсию продаж',
		button_name: 'Заказать дизайн под ключ',
	};

	const getCertificateData = async () => {
		type NumbersType = Pick<BaseCertificatesType['numbers'], 'items'>;
		type AwardsType = Pick<BaseCertificatesType['awards'], 'items'>;
		type CertificatesType = Pick<
			NonNullable<BaseCertificatesType['certificates']>,
			'items'
		>;

		const defaultData = {
			name: 'Награды, сертификаты',
			numbers: {
				name: 'Цифры',
				items: null as unknown as NumbersType['items'],
			},
			awards: {
				name: 'Рейтинги',
				items: null as unknown as AwardsType['items'],
			},
			certificates: {
				name: 'Сертификаты и награды',
				items: null as unknown as CertificatesType['items'],
			},
		};

		return await Promise.all([
			useApiFetch<NumbersType>(LISTS_NUMBERS_URL),
			useApiFetch<AwardsType>(LISTS_AWARD_URL),
			useApiFetch<CertificatesType>(LISTS_CERTIFICATES_URL),
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
				name: 'Заказать разработку сайта',
				caption: 'Мы поможем вам найти своих клиентов',
				captionNew: 'Мы поможем вам найти своих клиентов',
				member: {
					name: 'Алексей Гальченко',
					link: null,
					picture: '/service-dizayn-page/form/author-pic.jpg',
					picture_params: {
						width: '516',
						height: '742',
					},
					position: 'Технический директор, MBA',
					contact: null,
					socials: null,
				},
			};
		} else {
			// eslint-disable-next-line no-console
			console.error(error.value);
			return null;
		}
	};

	let certificates: Awaited<ReturnType<typeof getCertificateData>> | null =
		null;
	let formData: Awaited<ReturnType<typeof getFormData>> | null = null;

	await Promise.allSettled([getCertificateData(), getFormData()]).then(
		(results) => {
			results.forEach((result, index) => {
				if (result.status === 'fulfilled') {
					if (index === 0) {
						certificates = result.value as typeof certificates;
					} else {
						formData = result.value as typeof formData;
					}
				}
			});
		},
	);

	const fixedTop = ref(0);
	const floatingModalEl = ref<{ element: HTMLElement }>();

	const mediaQuery = useMediaQuery();

	onMounted(() => {
		const element = floatingModalEl.value?.element;

		if (element) {
			mediaQuery('(min-width: 767px)', (matches) => {
				const height = element.offsetHeight;
				fixedTop.value = matches ? height : 0;
			});
		}
	});
</script>
