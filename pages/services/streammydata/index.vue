<template>
	<BaseBannerService :data="serviceBannerData" />
	<BaseTextDefault :data="textDefaultData" />
	<BaseInfoColumns
		:data="infoColumnsData"
		:is-title-black="false"
	/>
	<BaseYouGet :data="youGetData" />
	<BaseCasesSlider :data="casesSliderData" />
	<BaseTextDefault :data="textDefaultSecondData" />
	<BaseVerticalTabsSecond :data="tabsData" />
	<BaseTextDefault :data="textDefaultThirdData" />
	<BaseTarrifsGrid
		:data="tarrifsData"
		:is-dark="true"
	/>
	<BaseWarranties :data="warrantiesData" />
	<BaseClientsSlider :data="clientsData" />
	<TheFooterForm
		v-if="formData"
		:data="formData"
		:modifier-classes="['title-width-smaller']"
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
	import BaseVerticalTabsSecond from '@/components/base-vertical-tabs-second';
	import BaseInfoColumns from '@/components/base-info-columns';
	import BaseYouGet from '@/components/base-you-get';
	import BaseCasesSlider from '@/components/base-cases-slider';
	import BaseTarrifsGrid from '@/components/base-tarrifs-grid';
	import BaseWarranties from '@/components/base-warranties';
	import BaseClientsSlider from '@/components/base-clients-slider';
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
		title: 'Управляйте рекламным бюджетом эффективно',
		description: '',
		og: {
			title: 'Управляйте рекламным бюджетом эффективно',
			description: '',
			image: '/og/default.jpg',
			type: 'website',
			url: 'https://medianation.ru/services/streammydata/',
		},
		noindex: false,
	});

	const serviceBannerData = {
		background: '/service-streammydata-page/service-banner/bg.jpg',
		background_small:
			'/service-streammydata-page/service-banner/bg-mob.jpg',
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
				name: 'Интеграция StreamMyData',
				link: null,
			},
		],
		title: 'Управляйте рекламным бюджетом эффективно',
		description: `
			<ul>
				<li>узнайте, какой рекламный канал работает хорошо, а какой "сливает" бюджет;</li>
				<li>таргетируйтесь на горячих клиентов в любом рекламном канале;</li>
				<li>ускорьте принятие верных решений за счет автоматизации отчетности.</li>
			</ul>
			<p>+25 % к эффективности рекламы</p>
			<p>3 месяца окупаемости вложений</p>
		`,
		awards: {
			id: 'lists/award' as const,
			items: [
				{
					name: 'Резидент Сколково',
					picture:
						'/service-streammydata-page/service-banner/awards/1.svg',
					picture_params: {
						width: '50',
						height: '50',
					},
					text: 'Признание инновационности проекта SMD и его ценности для развития рынка рекламы',
				},
				{
					name: 'Лауреат Tagline',
					picture:
						'/service-streammydata-page/service-banner/awards/2.svg',
					picture_params: {
						width: '168',
						height: '50',
					},
					text: '"Performance Marketing. Работа с BigData", 2022',
				},
				{
					name: 'Лауреат MIXX Russia Awards',
					picture:
						'/service-streammydata-page/service-banner/awards/3.svg',
					picture_params: {
						width: '110',
						height: '50',
					},
					text: '"AdTech - Marketing&Brand Management - Ecosystem Creation", 2022',
				},
			],
		},
		price_caption: 'Стоимость услуги',
		price: null,
		order_button: {
			name: 'Попробуйте сейчас',
			action: null,
		},
	};

	const textDefaultData = {
		html: `<div class="t-short-text">
					<h2>Предиктивная аналитика - драйвер digital-продаж в 2024 году</h2>
					<p>StreamMyData - аналитическая платформа для работы с большими данными. Автоматически собирает их, визуализирует и составляет предсказания для более точного таргетинга в рекламных системах.</p>
				</div>`,
	};

	const infoColumnsData = {
		title: 'Три кита StreamMyData',
		items: [
			{
				name: 'Коннекторы',
				caption: null,
				html: `
							<p>Мы создаем коннекторы, которые работают с длинным перечнем систем, собирают детальную статистику по всем выгружаемым данным и передают их в БД клиента 24/7, чтобы данные поступали максимально быстро</p>
						`,
			},
			{
				name: 'Сквозная аналитика',
				caption: null,
				html: `
							<p>Сведенные в единый формат данные используются в создании кастомных дашборов для оценки достижения различных маркетинговых целей любыми рекламными каналами</p>
						`,
			},
			{
				name: 'Предиктивные модели',
				caption: null,
				html: `
							<p>На основе данных о поведении пользователей мы сегментируем аудиторию по степени вероятности покупки и используем эту информацию для корректировки ставок в рекламных системах</p>
						`,
			},
		],
	};

	const youGetData = {
		title: 'Подключаясь к сервису, вы получаете',
		items: [
			{
				text: 'Преднастроенные дашборды с любой кастомизацией',
			},
			{
				text: 'Автоматические коннекторы из любого источника',
			},
			{
				text: 'Умная мультиканальная аттрибуция',
			},
			{
				text: 'Предиктивные модели',
			},
			{
				text: 'Сбор данных в БД клиента',
			},
		],
		company: {
			picture: '/service-streammydata-page/you-get/logo.svg',
			link: 'https://streammydata.ru/',
		},
	};

	const casesSliderData = {
		name: 'Кейсы',
		items: [
			{
				name: 'Кейс «Литрес»',
				picture: '/service-streammydata-page/case-carousel/1.svg',
				picture_params: {
					width: '800',
					height: '480',
				},
				text: `
					<div class="c-green-text-wrap">
						<div class="c-green-text">+ 33 % число конверсий</div>
						<div class="c-green-text">- 15 % стоимость конверсии</div>
					</div>
					<p>Автоматизировали сбор данных о пользователях и построили на их основе систему предиктов. Совместили с Яндекс.Директом и использовали повышающий коэффициент для рекламы среди тех, кто близок к совершению покупки.</p>
				`,
				link: '/cases/uvelichili-chislo-pokupok-na-33-/',
				is_link_remote: true,
				button_name: 'Хочу так же!',
			},
			{
				name: 'Кейс: «Читай-город»',
				picture: '/service-streammydata-page/case-carousel/2.jpg',
				picture_params: {
					width: '800',
					height: '600',
				},
				text: `
					<div class="c-green-text-wrap">
						<div class="c-green-text">Экономия 200 часов в год</div>
					</div>
					<p>Благодаря автоматизации, время, ранее затрачиваемое на создание отчетов специалистами, сократилось до 10 минут. Это освобождает время для более глубокого анализа и улучшения рекламных кампаний.</p>
				`,
				link: 'https://streammydata.ru/projects/case-report-automatization-python-apache-airflow/',
				is_link_remote: true,
				button_name: 'Хочу так же!',
			},
			{
				name: 'Кейс для магазина электротоваров',
				picture: '/service-streammydata-page/case-carousel/3.jpg',
				picture_params: {
					width: '800',
					height: '600',
				},
				text: `
					<div class="c-green-text-wrap">
						<div class="c-green-text">Экономия 150 часов в год</div>
					</div>
					<p>Автоматический дашборд значительно сократил количество трудочасов, которые специалисты ранее тратили на ручное создание отчетов. Это позволило им принимать более точные решения по оптимизации кампаний.</p>
				`,
				link: 'https://streammydata.ru/projects/case-automatic-dashboard-metrika-yandex-direct-datalens/',
				is_link_remote: true,
				button_name: 'Хочу так же!',
			},
			{
				name: 'Кейс «GrandHotelAnapa»',
				picture: '/service-streammydata-page/case-carousel/4.jpg',
				picture_params: {
					width: '879',
					height: '480',
				},
				text: `
					<div class="c-green-text-wrap">
						<div class="c-green-text">+20% средняя цена номера</div>
						<div class="c-green-text">+33% доход от номера</div>
					</div>
					<p>Мы использовали Google Data Studio для визуализации обширных данных и улучшили результаты в маркетинге. Путем анализа клиентских путей мы разработали систему, позволяющую создавать общий отчет о эффективности маркетинговых вложений.</p>
				`,
				link: '/cases/vizualizirovali-ogromnyy-massiv-dannykh-v-google-data-studio-i-povysili-effektivnost-marketinga-/',
				is_link_remote: true,
				button_name: 'Хочу так же!',
			},
			{
				name: 'Кейс «Доктор Борменталь»',
				picture: '/service-streammydata-page/case-carousel/5.jpg',
				picture_params: {
					width: '879',
					height: '480',
				},
				text: `
					<div class="c-green-text-wrap">
						<div class="c-green-text">+17% числа конверсий</div>
					</div>
					<p>Путем АБ-тестирования проверили три гипотезы по увеличению конверсии. Изменения на контрольной странице включали отображение полей формы на главной, сокращение срока акции и добавление всплывающего окна с предложением. Результаты показали увеличение эффективности взаимодействия с клиентами.</p>
				`,
				link: '/cases/a-b-testirovanie-lendinga/',
				is_link_remote: true,
				button_name: 'Хочу так же!',
			},
			{
				name: 'Кейс «Адамас»',
				picture: '/service-streammydata-page/case-carousel/6.jpg',
				picture_params: {
					width: '879',
					height: '480',
				},
				text: `
					<p>Автоматизация сбора данных для Adamas сократила время формирования отчетов, улучшив оперативность решений. Использование Microsoft Power BI упростило анализ информации, оптимизируя работу и рекламные кампании. Получены дашборды с информацией о заказах, статусе и рентабельности, а также возможностью построения предсказательных моделей.</p>
				`,
				link: '/cases/skvoznaya-analitika-dlya-adamas/',
				is_link_remote: true,
				button_name: 'Хочу так же!',
			},
			{
				name: 'Кейс «Разборки в моде»',
				picture: '/service-streammydata-page/case-carousel/7.jpg',
				picture_params: {
					width: '879',
					height: '480',
				},
				text: `
					<p>После настройки системы аналитики удалось успешно собирать и передавать данные об оплаченных заказах из CRM-системы GetCourse в Google Analytics и Яндекс.Метрику. Этот подход значительно повысил точность оценки эффективности рекламных каналов, обеспечивая более надежные данные для анализа и принятия решений в дальнейшей рекламной стратегии.</p>
				`,
				link: '/cases/skvoznaya-analitika-dlya-sayta-na-tilda/',
				is_link_remote: true,
				button_name: 'Хочу так же!',
			},
		],
	};

	const textDefaultSecondData = {
		html: `
			<h2>Преимущества StreamMyData</h2>
			<div class="b-section">
				<div class="b-row">
					<div class="b-col">
						<h3 class="b-title">Cквозная аналитика на новом уровне</h3>
						<p>
							Если вы работаете с сырыми данными, то можете построить абсолютно любые срезы и взглянуть на задачи бизнеса под новым углом.
						</p>
					</div>
					<div class="b-col">
						<h3 class="b-title">Атрибуция в прошлое</h3>
						<p>
							Интеграция с Яндекс.Метрикой и собственный модуль записи хитов Google Analytics позволит вам снять любые ограничения на ретроспективный анализ. Это наиболее актуально для проектов, цикл сделки которых более 90 дней.
						</p>
					</div>
				</div>
				<div class="b-row">
					<div class="b-col">
						<h3 class="b-title">Возможность анализировать данные в любых проекциях</h3>
						<p>
							Работая с СУБД, в которой будут храниться ваши данные, вы всегда сможете сделать уникальные срезы, которые ранее были вам недоступны. Специально для вас мы подготовили запросы, с помощью которых вы можете рассчитать стоимость на уровне каждой конкретной сессии пользователя и многое другое.
						</p>
					</div>
					<div class="b-col">
						<h3 class="b-title">Расширенная интеграция с аналитическими сервисами для мобильных приложений</h3>
						<p>
							StreamMyData имеет интеграции с AppMetrica, AppsFlyer, AppNext, а также с рекламными платформами Apple Search Ads, Aura Ads, Petal Ads и Mi Ads. Это обеспечивает углубленный анализ эффективности рекламы и поведения пользователей, помогая оптимизировать маркетинговые стратегии и повышать ROI.
						</p>
					</div>
				</div>
				<div class="b-row">
					<div class="b-col">
						<h3 class="b-title">Кросс-канальная и кросс-девайсная атрибуция</h3>
						<p>
							StreamMyData умеет решать и эту задачу. Вы можете ознакомиться с примером реализации в <a href="https://medianation.ru/cases/uvelichili-chislo-pokupok-na-33-/" target="_blank">кейсе Литреса.</a>
						</p>
					</div>
				</div>
			</div>
		`,
	};

	const tabsData = {
		title: 'Зачем использовать StreamMyData',
		items: [
			{
				name: 'Сократить время на составление отчетов',
				caption: 'Сократить время на составление отчетов',
				picture: '/service-streammydata-page/tabs/1.jpg',
				html: 'Объедините данные о рекламе, поведении пользователей и CRM в одном отчете для комплексной оценки вашей эффективности.',
				button_name: 'попробовать StreamMyData',
			},
			{
				name: 'Принимать решения на основе данных',
				caption: 'Принимать решения на основе данных',
				picture: '/service-streammydata-page/tabs/2.jpg',
				html: 'Используйте данные о поведении клиентов, тенденциях рынка и результаты предыдущих кампаний для принятия обоснованных стратегических решений.',
				button_name: 'попробовать StreamMyData',
			},
			{
				name: 'Контролировать расходы во всех каналах',
				caption: 'Контролировать расходы во всех каналах',
				picture: '/service-streammydata-page/tabs/3.jpg',
				html: 'Мониторьте и анализируйте затраты на рекламу, маркетинг и другие каналы, чтобы эффективно управлять бюджетом и избегать излишних расходов.',
				button_name: 'попробовать StreamMyData',
			},
			{
				name: 'Увеличить доход',
				caption: 'Увеличить доход',
				picture: '/service-streammydata-page/tabs/4.jpg',
				html: 'Оптимизируйте маркетинговые стратегии и активно ищите новые возможности для увеличения продаж и доходов вашей компании.',
				button_name: 'попробовать StreamMyData',
			},
			{
				name: 'Создать единый источник информации',
				caption: 'Создать единый источник информации',
				picture: '/service-streammydata-page/tabs/5.jpg',
				html: 'Объедините данные из различных источников (например, рекламные платформы, CRM, аналитика веб-сайта) в одном централизованном хранилище, чтобы обеспечить единый источник правдивой информации для всех сотрудников.',
				button_name: 'попробовать StreamMyData',
			},
			{
				name: 'Понять путь клиента',
				caption: 'Понять путь клиента',
				picture: '/service-streammydata-page/tabs/6.jpg',
				html: 'Изучите путь клиента от первого контакта до совершения покупки, анализируя данные о его поведении и взаимодействии с вашим брендом, для оптимизации пользовательского опыта и увеличения конверсии.',
				button_name: 'попробовать StreamMyData',
			},
		],
	};

	const textDefaultThirdData = {
		html: `
			<h2>Управляйте поведением своих пользователей на сайте</h2>
			<div class="c-photo-gall js-c-photo-gall">
				<div class="c-photo-gall__inner">
					<div class="swiper-container">
						<div class="swiper-wrapper">
							<div class="swiper-slide c-photo-gall__slide">
								<div class="c-photo-gall__photo js-c-photo-gall__photo">
									<img src="/service-streammydata-page/text-default-bottom/1.png" />
								</div>
								<div class="c-photo-gall__caption">
									Revenue
								</div>
							</div>
							<div class="swiper-slide c-photo-gall__slide">
								<div class="c-photo-gall__photo js-c-photo-gall__photo">
									<img src="/service-streammydata-page/text-default-bottom/2.png" />
								</div>
								<div class="c-photo-gall__caption">
									Pivot
								</div>
							</div>
							<div class="swiper-slide c-photo-gall__slide">
								<div class="c-photo-gall__photo js-c-photo-gall__photo">
									<img src="/service-streammydata-page/text-default-bottom/3.png" />
								</div>
								<div class="c-photo-gall__caption">
									Marketing
								</div>
							</div>
							<div class="swiper-slide c-photo-gall__slide">
								<div class="c-photo-gall__photo js-c-photo-gall__photo">
									<img src="/service-streammydata-page/text-default-bottom/4.png" />
								</div>
								<div class="c-photo-gall__caption">
									Seo
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		`,
	};

	const warrantiesData = {
		name: 'Наш подход и гарантии',
		items: [
			{
				icon: '/service-streammydata-page/warranties/1.svg',
				name: 'Гарантия результата при внедрении предиктивных моделей',
			},
			{
				icon: '/service-streammydata-page/warranties/2.svg',
				name: 'Отказоустойчивость системы и активная работа с пользователями',
			},
			{
				icon: '/service-streammydata-page/warranties/3.svg',
				name: 'Быстрое внедрение решений',
			},
		],
	};

	const tarrifsData = {
		title: 'Тарифы',
		items: [
			{
				name: 'Предикт',
				old_price: '100 000 ₽/мес.',
				price: '75 000 ₽/мес.',
				advantages: null,
				html: `
					<ul>
						<li>Разработка индивидуальных предиктивных моделей</li>
						<li>Сегментация аудитории по степени вероятности покупки</li>
						<li>Возможность корректировки ставки в рекламных системах</li>
					</ul>
				`,
				button_name: 'выбрать',
			},
			{
				name: 'Супер-комбо',
				old_price: '150 000 ₽/мес.',
				price: '100 000 ₽/мес.',
				advantages: null,
				html: `
					<ul>
						<li>Преднастроенные дашборды с любой кастомизацией</li>
						<li>Автоматические коннекторы из любого источника</li>
						<li>Умная мультиканальная атрибуция</li>
						<li>Единое хранилище данных (возможность установки в контуре клиента)</li>
						<li>Предиктивные модели БЕСПЛАТНО!</li>
					</ul>
				`,
				additional_service: {
					name: 'Внедрение сквозной аналитики',
					label: 'Разовый платеж',
					price: '250 000 руб.',
					old_price: '500 000 руб.',
				},
				button_name: 'выбрать',
			},
		],
	};

	const clientsData = {
		name: 'Сервис используют и растут',
		items: [
			{
				picture: '/service-streammydata-page/clients/1.png',
				picture_params: {
					width: '100',
					height: '128',
				},
			},
			{
				picture: '/service-streammydata-page/clients/2.png',
				picture_params: {
					width: '432',
					height: '128',
				},
			},
			{
				picture: '/service-streammydata-page/clients/3.png',
				picture_params: {
					width: '160',
					height: '128',
				},
			},
			{
				picture: '/service-streammydata-page/clients/4.png',
				picture_params: {
					width: '380',
					height: '128',
				},
			},
			{
				picture: '/service-streammydata-page/clients/5.png',
				picture_params: {
					width: '124',
					height: '128',
				},
			},
			{
				picture: '/service-streammydata-page/clients/6.png',
				picture_params: {
					width: '256',
					height: '128',
				},
			},
			{
				picture: '/service-streammydata-page/clients/7.png',
				picture_params: {
					width: '313',
					height: '128',
				},
			},
		],
	};

	const getFormData = async () => {
		const { data, error } = await useApiFetch<FormType>(CONTACT_FORM_URL);

		if (data.value) {
			return {
				...data.value,
				name: 'Присоединяйтесь к компаниям, растущим вместе со StreamMyData',
				caption:
					'Персональная поддержка на старте и доступ ко всем функциям',
				captionNew:
					'Персональная поддержка на старте и доступ ко всем функциям',
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
