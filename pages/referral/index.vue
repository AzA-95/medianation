<template>
	<BaseBannerService :data="serviceBannerData" />
	<BaseWarranties
		:data="warrantiesData"
		:modifier-classes="['col-wide']"
	/>
	<BaseBlockText
		:data="blockTextData"
		:modifier-classes="['short']"
	/>
	<BaseStagesSlider :data="stagesData" />
	<BaseHowWeKnow :data="howWeKnowData" />
	<BaseCertificates
		v-if="certificates"
		:data="certificates"
		:modifier-classes="['title-on-left']"
	/>
	<BaseClientsGrid :data="ourClientsData" />
	<BaseDescWithMenuList :data="menuListData" />
	<BaseClientsSlider :data="ourPartners" />
	<TheFooterForm
		v-if="formData"
		:data="formData"
		:modifier-classes="['referral-form']"
		:modifier-classes-agree="['referral-form']"
	/>
</template>

<script setup lang="ts">
	import { useHead } from '#imports';
	import type { FormType } from '@/types/forms';
	import { LISTS_AWARD_URL, CONTACT_FORM_URL } from '@/constants';
	import { useMetaStore } from '@/stores/meta';
	import { useApiFetch } from '@/composables/use-api-fetch';
	import BaseBannerService from '@/components/base-banner-service';
	import BaseWarranties from '@/components/base-warranties';
	import BaseBlockText from '@/components/base-block-text';
	import BaseStagesSlider from '@/components/base-stages-slider';
	import BaseHowWeKnow from '@/components/base-how-we-know';
	import type { BaseType as BaseCertificatesType } from '@/components/base-certificates/type';
	import BaseCertificates from '@/components/base-certificates';
	import BaseClientsGrid from '@/components/base-clients-grid';
	import BaseDescWithMenuList from '@/components/base-desc-with-menu-list';
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
		title: 'Присоединяйтесь к программе реферальных вознаграждений от Medianation',
		description:
			'Присоединяйтесь к программе реферальных вознаграждений и получайте бонусы со всех поступивших клиентов Medianation. Регистрируйтесь сейчас!',
		og: {
			title: 'Присоединяйтесь к программе реферальных вознаграждений от Medianation',
			description:
				'Присоединяйтесь к программе реферальных вознаграждений и получайте бонусы со всех поступивших клиентов Medianation. Регистрируйтесь сейчас!',
			image: '/og/referral.jpg',
			type: 'website',
			url: 'https://medianation.ru/referral/',
		},
		noindex: false,
	});

	const serviceBannerData = {
		background: '/referral-page/service-banner/bg.jpg',
		breadcrumbs: [
			{
				id: 1,
				name: 'Главная',
				link: '/',
			},
			{
				id: 4,
				name: 'Реферальная программа MN Friends and Partners',
				link: null,
			},
		],
		title: 'Реферальная программа MN Friends and Partners',
		description: `
						<p>
							Приглашаем присоединиться к команде профессионалов MediaNation
						</p>
						<ul>
							<li>
								рекламные агентства и специалистов, нуждающихся в дополнительных каналах трафика для своих клиентов;
							</li>
							<li>
								лидеров мнений, которые ищут проверенного и надежного подрядчика с выгодными условиями сотрудничества;
							</li>
							<li>
								B2B-компании, желающие заработать на допродаже сопутствующих услуг.
							</li>
						</ul>
						<p>
							Рекомендуйте нас друзьям и получайте комиссию ежемесячно!
						</p>
					`,
		awards: {
			id: 'lists/result' as const,
			items: [
				{
					id: '1',
					name: '10%',
					icon: '/referral-page/service-banner/awards/1.svg',
					text: 'от выручки ежемесячно',
				},
				{
					id: '2',
					name: '2,5%',
					icon: '/referral-page/service-banner/awards/2.svg',
					text: 'от выручки рефералов второго уровня',
				},
				{
					id: '3',
					name: '1%',
					icon: '/referral-page/service-banner/awards/3.svg',
					text: 'от выручки рефералов третьего уровня',
				},
			],
		},
		price_caption: 'Стоимость услуги',
		price: null,
		order_button: {
			name: 'Присоединиться к программе',
			action: null,
			scroll_to_form: true,
		},
	};

	const warrantiesData = {
		name: 'Условия реферальной программы',
		items: [
			{
				icon: '/referral-page/warranties/1.svg',
				name: '10% от нашей агентской комиссии ежемесячно <br> за каждого приведенного друга.',
			},
			{
				icon: '/referral-page/warranties/2.svg',
				name: '2,5% от выручки от второго уровня <br> рефералов и 1% от третьего уровня.',
			},
			{
				icon: '/referral-page/warranties/3.svg',
				name: 'Возможность увеличения комиссии до 15% <br> при быстром старте рекламной кампании.',
			},
			{
				icon: '/referral-page/warranties/4.svg',
				name: 'Ваши друзья также выигрывают - они получают <br> бесплатный месяц SEO и контекстной рекламы при <br> подписании договора от 3-х месяцев.',
			},
		],
	};

	const blockTextData = {
		title: 'Выплата вознаграждений',
		text: `<p>Вознаграждение выплачивается ежемесячно на банковскую карту - до 5-го числа месяца, следующего за тем, когда была проведена рекламная кампания.</p>
				<p>Каждому рекомендателю предоставляется персональный менеджер, который ведет учет всех приведенных клиентов.</p>`,
	};

	const stagesData = {
		title: 'Какие этапы входят в данную услугу',
		items: [
			{
				text: 'Передайте вашему менеджеру контакты потенциального клиента',
			},
			{
				text: 'Клиент закрепляется за вами в нашей партнерской системе',
			},
			{
				text: 'Наши специалисты связываются с клиентом и организуют работу с ним',
			},
			{
				text: 'Получайте ежемесячное вознаграждение на карту после проведения рекламных кампаний.',
			},
		],
	};

	const howWeKnowData = {
		title: 'Как мы узнаем, что клиент пришел именно от вас:',
		items: [
			{
				text: `<p>Мы спрашиваем каждого клиента, по чьей рекомендации он к нам пришел</p>`,
			},
			{
				text: `<p>Вы можете сообщить вашему личному менеджеру сайт/компанию, которой вы порекомендовали обратиться в наше агентство</p>`,
			},
			{
				text: `<p>Мы анализируем, по какой ссылке перешел новый клиент. Если в ней проставлен ваш "реферальный код", этот клиент автоматически будет закреплен за вами.</p>`,
			},
			{
				text: `<p>Если клиент приходит по рекомендации от более чем одного человека, решение, кому будет начислен реферальный бонус, принимает сам клиент.</p>
									<p>Если клиент затрудняется с ответом, решение о получателе бонуса будет приниматься в зависимости от конкретной ситуации.</p>`,
			},
		],
	};

	const ourClientsData = {
		name: 'Наши клиенты',
		items: [
			{
				picture: '/referral-page/our-clients/adamas.svg',
				picture_params: {
					width: '412',
					height: '250',
				},
			},
			{
				picture: '/referral-page/our-clients/okey.png',
				picture_params: {
					width: '412',
					height: '250',
				},
			},
			{
				picture: '/referral-page/our-clients/robinzon.svg',
				picture_params: {
					width: '412',
					height: '250',
				},
			},
			{
				picture: '/referral-page/our-clients/litres.svg',
				picture_params: {
					width: '412',
					height: '250',
				},
			},
			{
				picture: '/referral-page/our-clients/chitaygorod.svg',
				picture_params: {
					width: '412',
					height: '250',
				},
			},
			{
				picture: '/referral-page/our-clients/kant.svg',
				picture_params: {
					width: '412',
					height: '250',
				},
			},
			{
				picture: '/referral-page/our-clients/585.svg',
				picture_params: {
					width: '412',
					height: '250',
				},
			},
		],
	};

	const menuListData = {
		name: 'Мы предоставляем полный спектр услуг',
		items: [
			{
				id: '1',
				name: 'Контекстная реклама',
				picture: '/referral-page/tile-services/1.svg',
				text: 'Максимум кликов и конверсий с объявлений',
				link: null,
				show_popup: true,
			},
			{
				id: '2',
				name: 'Таргетированная реклама',
				picture: '/referral-page/tile-services/2.svg',
				text: 'Точное попадание в интересы вашей аудитории',
				link: null,
				show_popup: true,
			},
			{
				id: '3',
				name: 'Медийная реклама',
				picture: '/referral-page/tile-services/3.svg',
				text: 'Яркие баннеры для максимальной видимости',
				link: null,
				show_popup: true,
			},
			{
				id: '4',
				name: 'SEO',
				picture: '/referral-page/tile-services/4.svg',
				text: 'Оптимизация сайта для хорошей видимости в поиске',
				link: null,
				show_popup: true,
			},
			{
				id: '5',
				name: 'SERM',
				picture: '/referral-page/tile-services/5.svg',
				text: 'Эффективное управление репутацией в сети',
				link: null,
				show_popup: true,
			},
			{
				id: '6',
				name: 'Разработка сайтов',
				picture: '/referral-page/tile-services/6.svg',
				text: 'Создание сайтов: красивых и функциональных',
				link: null,
				show_popup: true,
			},
			{
				id: '7',
				name: 'Создание GPT ботов',
				picture: '/referral-page/tile-services/7.svg',
				text: 'Клиентское обслуживание GPT-ботами',
				link: null,
				show_popup: true,
			},
			{
				id: '8',
				name: 'Сквозная аналитика',
				picture: '/referral-page/tile-services/8.svg',
				text: 'Анализ всех точек маркетинга для полноты картины',
				link: null,
				show_popup: true,
			},
		],
	};

	const ourPartners = {
		name: 'Наши партнёры',
		items: [
			{
				picture: '/referral-page/our-partners/1.svg',
				picture_params: {
					width: '332',
					height: '96',
				},
			},
			{
				picture: '/referral-page/our-partners/2.svg',
				picture_params: {
					width: '430',
					height: '75',
				},
			},
			{
				picture: '/referral-page/our-partners/4.svg',
				picture_params: {
					width: '346',
					height: '114',
				},
			},
			{
				picture: '/referral-page/our-partners/5.svg',
				picture_params: {
					width: '432',
					height: '96',
				},
			},
			{
				picture: '/referral-page/our-partners/6.svg',
				picture_params: {
					width: '432',
					height: '95',
				},
			},
			{
				picture: '/referral-page/our-partners/7.svg',
				picture_params: {
					width: '432',
					height: '50',
				},
			},
			{
				picture: '/referral-page/our-partners/8.svg',
				picture_params: {
					width: '360',
					height: '100',
				},
			},
			{
				picture: '/referral-page/our-partners/9.svg',
				picture_params: {
					width: '128',
					height: '128',
				},
			},
		],
	};

	const getCertificateData = async () => {
		const { data, error } =
			await useApiFetch<Pick<BaseCertificatesType['awards'], 'items'>>(
				LISTS_AWARD_URL,
			);

		if (data.value) {
			return {
				name: 'Нас приятно рекомендовать',
				numbers: {
					items: [
						{
							id: 1,
							name: '15 лет',
							text: 'успешной работы на рынке',
						},
						{
							id: 2,
							name: 'РФ и мир',
							text: 'Охватываем рынок по всей России и за рубежом',
						},
					],
				},
				awards: {
					name: 'Рейтинги',
					items: data.value.items,
				},
				certificates: null,
			};
		} else {
			// eslint-disable-next-line no-console
			console.error(error.value);
			return null;
		}
	};

	const getFormData = async () => {
		const { data, error } = await useApiFetch<FormType>(CONTACT_FORM_URL);

		if (data.value) {
			// Фильтруем поля чтобы скрыть поле коментарий и файл(Как по дизайну)
			// Делаем доп(Проверку на обязательность) чтобы в случае обязательности к заполнению(вывести поле)
			// чтобы могли отправлять данные(чтобы апи не отдавал ошибку)
			// По хорошему надо сделать(Отдельную форму в апи для этой кастомной страницы)
			// TODO Fix Api
			const fields = data.value.settings.fields;
			const fieldsArr = Object.entries(fields);
			const filtered = fieldsArr.filter(([_, value]) => {
				const isOptionalTextareaField =
					value.type === 'textarea' && value?.required !== true;
				const isOptionalFileField =
					value.type === 'file' && value?.required !== true;

				return !(isOptionalTextareaField || isOptionalFileField);
			});
			const filteredFields = Object.fromEntries(filtered);
			data.value.settings.fields = filteredFields;

			return {
				...data.value,
				name: 'Начните зарабатывать прямо сейчас!',
				caption:
					'Регистрируйтесь в реферальной программе MN Friends and Partners',
				captionNew:
					'Регистрируйтесь в реферальной программе MN Friends and Partners',
				member: {
					name: 'Лидия Ершова',
					picture: '/referral-page/form/author.jpg',
					position: 'Консультант по реферальной программе',
					phone: {
						name: '+7 985 255-75-75',
						link: '+79852557575',
					},
					socials: [
						{
							name: 'telegram',
							link: 'https://t.me/vip_manager_mn',
							is_preferred: true,
						},
					],
				},
				button_name: 'Поехали',
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
</script>
