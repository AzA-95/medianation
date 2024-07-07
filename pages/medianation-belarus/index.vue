<template>
	<BaseBannerDesc :data="bannerData" />
	<BaseTextDefault :data="textDefaultData" />
	<BaseCasesSlider :data="casesData" />
	<BaseDescWithMenuList :data="menuListData" />
	<BaseTextDefault :data="textDefaultSecondData" />
	<BaseBlockText
		:data="blockTextData"
		:modifier-classes="['dark']"
	/>
	<BaseCaseItems :data="casesInfoData" />
	<BaseBlockText
		:data="blockTextSecondData"
		:modifier-classes="['dark']"
	/>
	<BaseCaseItems :data="casesInfoSecondData" />
	<BaseClientsSlider :data="ourClients" />
	<BaseCertificates
		v-if="certificates"
		:data="certificates"
		:modifier-classes="['title-on-left']"
	/>
	<TheFooterForm
		v-if="formData"
		:data="formData"
	/>
</template>

<script setup lang="ts">
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
	import BaseBannerDesc from '@/components/base-banner-desc';
	import BaseTextDefault from '@/components/base-text-default';
	import BaseCasesSlider from '@/components/base-cases-slider';
	import BaseDescWithMenuList from '@/components/base-desc-with-menu-list';
	import BaseBlockText from '@/components/base-block-text';
	import BaseCaseItems from '@/components/base-case-items';
	import BaseClientsSlider from '@/components/base-clients-slider';
	import type { BaseType as BaseCertificatesType } from '@/components/base-certificates/type';
	import BaseCertificates from '@/components/base-certificates';
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
		title: 'Хотите выйти на российский рынок? Агентство MediaNation поможет вам.',
		description:
			'На российском рынке сложилась уникальная возможность для белорусского бизнеса. Оставьте заявку и воспользуйтесь ей',
		og: {
			title: 'Хотите выйти на российский рынок? Агентство MediaNation поможет вам.',
			description:
				'Присоединяйтесь к программе реферальных вознаграждений и получайте бонусы со всех поступивших клиентов Medianation. Регистрируйтесь сейчас!',
			image: '/og/medianation-belarus.jpg',
			type: 'website',
			url: 'https://medianation.ru/medianation-belarus/',
		},
		noindex: false,
	});

	const bannerData = {
		picture: '/medianation-belarus-page/banner/bg.jpg',
		title: 'Хотите выйти на российский рынок? Агентство MediaNation поможет вам.',
		text: 'На российском рынке сложилась уникальная возможность, которой белорусский бизнес может воспользоваться',
	};

	const textDefaultData = {
		html: `<div class="t-short-text">
					<h2>Продвигаем белорусские товары на российском рынке</h2>
					<p>Мы - российское рекламное агентство MediaNation, имеющее 13-летний опыт продвижения товаров и услуг в Рунете. Входим в топ-10 агентств интернет-маркетинга, по версии Рейтинга Рунета. Мы знаем, как найти клиентов в интернете и увеличить доходы от рекламы.</p>
				</div>
				<div class="b-section">
					<div class="b-row">
						<div class="b-col">
							<div class="b-title">Обеспечиваем сбыт на российских маркетплейсах</div>
							<p>Самым быстрым и оптимальным способом выйти на российских потребителей является размещение товаров в маркетплейсах. Каждая площадка (Яндекс.Маркет, Ozon, WB) имеет свои особенности продвижения. Мы учитываем нюансы каждой для достижения максимальных результатов.</p>
						</div>
						<div class="b-col">
							<div class="b-title">Повышаем узнаваемость <br> бренда</div>
							<p>Многие ниши потребительских товаров освободились, оставив спрос без предложения. Медийная реклама позволяет донести до потребителей, какие новые бренды теперь смогут закрыть их потребности. Рекламная активность с широким охватом позволит не только заявить о себе покупателям, но и закрепить знание о бренде.</p>
						</div>
					</div>
					<div class="b-row">
						<div class="b-col">
							<div class="b-title">Работаем со сформировавшимся спросом</div>
							<p>Наиболее интересной для бизнеса и самой конверсионной группой являются потребители, которые уже осознали свою потребность и в данный момент находятся в поиске поставщика необходимых товаров или услуг. Мы знаем, как выйти на таких людей и продемонстрировать им ваше предложение. А также подтолкнуть к заказу, стоимость (СРО) которого поддержит рентабельность вашего бизнеса.</p>
						</div>
						<div class="b-col">
							<div class="b-title">Обеспечиваем повторные продажи</div>
							<p>Вернувшийся пользователь обходится компании в 5-7 раз дешевле нового. Поэтому мы уделяем особое внимание ремаркетингу, то есть работе с посетителями сайта, карточки товара, «забытыми корзинами» и постоянными покупателями.</p>
						</div>
					</div>
					<div class="b-row">
						<div class="b-col">
							<div class="b-title">Продвигаем мобильные приложения</div>
							<p>Если вы взаимодействуете со своими потребителями через мобильное приложение, мы поможем вам увеличить круг его пользователей. Мы имеем успешный опыт в ASO, рекламе приложений в соцсетях и на поиске.</p>
						</div>
					</div>
				</div>`,
	};

	const casesData = {
		name: 'Кейсы',
		items: [
			{
				picture: '/medianation-belarus-page/cases/1.jpg',
				picture_params: {
					width: '952',
					height: '520',
				},
				client: {
					picture: '/medianation-belarus-page/cases/logo/1.png',
					picture_params: {
						width: '412',
						height: '250',
					},
				},
				text_additional: '+7,67 % узнаваемости бренда за 3 недели', // fix me after page streammydata
				name: 'Использовали видеорекламу в Яндекс.Видео',
				link: '/cases/keys-rublevskogo-videokampaniya-na-youtube-i-v-yandekse/',
			},
			{
				picture: '/medianation-belarus-page/cases/2.jpg',
				picture_params: {
					width: '952',
					height: '520',
				},
				client: {
					picture: '/medianation-belarus-page/cases/logo/2.png',
					picture_params: {
						width: '412',
						height: '250',
					},
				},
				text_additional: '+24 % узнаваемости бренда за 1 месяц', // fix me after page streammydata
				name: 'Настроили и запустили видеорекламу в соцсетях',
				link: '/cases/mediynaya-reklama-dlya-vseinstrumenty-ru/',
			},
			{
				picture: '/medianation-belarus-page/cases/3.jpg',
				picture_params: {
					width: '952',
					height: '520',
				},
				client: {
					picture: '/medianation-belarus-page/cases/logo/3.png',
					picture_params: {
						width: '412',
						height: '250',
					},
				},
				text_additional: 'х3,5 раза число заказов', // fix me after page streammydata
				name: 'Использовали контекстную и баннерную рекламу в Яндексе',
				link: '/cases/kontekstnaya-reklama-dlya-o-key-dostavki/',
			},
			{
				picture: '/medianation-belarus-page/cases/4.jpg',
				picture_params: {
					width: '952',
					height: '520',
				},
				client: {
					picture: '/medianation-belarus-page/cases/logo/4.png',
					picture_params: {
						width: '412',
						height: '250',
					},
				},
				text_additional: 'х10 раз число заказов', // fix me after page streammydata
				name: 'Подключили колл-трекинг и оптимизировали контекстную рекламу',
				link: '/cases/kontekstnaya-reklama-dlya-doktor-ryadom/',
			},
			{
				picture: '/medianation-belarus-page/cases/5.jpg',
				picture_params: {
					width: '952',
					height: '520',
				},
				client: {
					picture: '/medianation-belarus-page/cases/logo/5.png',
					picture_params: {
						width: '412',
						height: '250',
					},
				},
				text_additional: '+85 % органического трафика на сайт', // fix me after page streammydata
				name: 'Провели SEO-работы',
				link: '/cases/seo-prodvizhenie-sayta-hansa/',
			},
			{
				picture: '/medianation-belarus-page/cases/6.jpg',
				picture_params: {
					width: '952',
					height: '520',
				},
				client: {
					picture: '/medianation-belarus-page/cases/logo/6.png',
					picture_params: {
						width: '412',
						height: '250',
					},
				},
				text_additional: 'х2 раза число заказов пиццы', // fix me after page streammydata
				name: 'Привлекли популярных блогеров к продвижению',
				link: '/cases/influence-marketing-dlya-papa-johns-/',
			},
			{
				picture: '/medianation-belarus-page/cases/7.jpg',
				picture_params: {
					width: '952',
					height: '520',
				},
				text_additional:
					'>1000 возвращенных пользователей, оплативших товары, за 3 месяца', // fix me after page streammydata
				name: 'Использовали таргетированную рекламу в соцсетях',
				link: '/cases/prodvizhenie-butik-v-mytarget/',
			},
			{
				picture: '/medianation-belarus-page/cases/8.jpg',
				picture_params: {
					width: '952',
					height: '520',
				},
				client: {
					picture: '/medianation-belarus-page/cases/logo/8.png',
					picture_params: {
						width: '412',
						height: '250',
					},
				},
				text_additional: '-38% стоимости заказа', // fix me after page streammydata
				name: 'Использовали ремаркетинг для возвращения пользователей',
				link: '/cases/prodvizhenie-litres-v-mytarget/',
			},
			{
				picture: '/medianation-belarus-page/cases/9.jpg',
				picture_params: {
					width: '952',
					height: '520',
				},
				client: {
					picture: '/medianation-belarus-page/cases/logo/9.png',
					picture_params: {
						width: '412',
						height: '250',
					},
				},
				text_additional: '+288% органических установок', // fix me after page streammydata
				name: 'Провели комплексную работу: ASO, работа с негативом, улучшение юзабилити и др.',
				link: '/cases/keys-soglasiya-aso-mobilnogo-prilozheniya/',
			},
			{
				picture: '/medianation-belarus-page/cases/10.jpg',
				picture_params: {
					width: '952',
					height: '520',
				},
				client: {
					picture: '/medianation-belarus-page/cases/logo/10.png',
					picture_params: {
						width: '412',
						height: '250',
					},
				},
				text_additional: 'х4 превысили KPI по установкам приложения', // fix me after page streammydata
				name: 'Использовали поисковики и соцсети для продвижения',
				link: '/cases/prodvizhenie-prilozheniya-osome/',
			},
		],
	};

	const menuListData = {
		name: 'Инструменты продвижения',
		items: [
			{
				name: 'Контекстная реклама',
				picture: '/medianation-belarus-page/tile-services/1.jpg',
				text: 'Работа со сформировавшимся спросом',
				link: null,
				show_popup: true,
			},
			{
				name: 'Social Media Marketing (SMM)',
				picture: '/medianation-belarus-page/tile-services/2.jpg',
				text: 'Инструмент маркетинга взаимоотношений',
				link: null,
				show_popup: true,
			},
			{
				name: 'Реклама в Telegram каналах и VK группах',
				picture: '/medianation-belarus-page/tile-services/3.jpg',
				text: 'Нативное продвижение',
				link: null,
				show_popup: true,
			},
			{
				name: 'Баннерная реклама',
				picture: '/medianation-belarus-page/tile-services/4.jpg',
				text: 'Формирование интереса',
				link: null,
				show_popup: true,
			},
			{
				name: 'SEO-продвижение',
				picture: '/medianation-belarus-page/tile-services/5.jpg',
				text: 'Увеличение поискового трафика и продаж',
				link: null,
				show_popup: true,
			},
			{
				name: 'Продвижение на маркетплейсах',
				picture: '/medianation-belarus-page/tile-services/6.jpg',
				text: 'Площадки, где продавцы и покупатели находят друг друга',
				link: null,
				show_popup: true,
			},
			{
				name: 'Таргетированная реклама в соцсетях',
				picture: '/medianation-belarus-page/tile-services/7.jpg',
				text: 'Реклама по интересам',
				link: null,
				show_popup: true,
			},
			{
				name: 'ASO',
				picture: '/medianation-belarus-page/tile-services/8.jpg',
				text: 'Комплекс мероприятий для вывода приложения на новые рынки и в топ сторов',
				link: null,
				show_popup: true,
			},
			{
				name: 'Видеореклама',
				picture: '/medianation-belarus-page/tile-services/9.jpg',
				text: 'Самый вовлекающий формат рекламы',
				link: null,
				show_popup: true,
			},
		],
	};

	const textDefaultSecondData = {
		html: `
				<div class="t-short-text">
					<h2>Дополнительные возможности для вашего бизнеса</h2>
					<p>MediaNation является агентством полного цикла, которое поможет в разработке фирменного стиля, создании digital-стратегии, ведении рекламной кампании и сборе аналитики для оценки эффективности рекламы. Работа по системе “одного окна” обеспечивает качественное выполнение маркетинговых задач и удобство коммуникаций клиента с агентством.</p>
				</div>
				`,
	};

	const blockTextData = {
		title: 'Разработка сайта',
		text: `<p>Мы осуществляем полный спектр услуг по созданию интернет-проектов различной сложности:
				от корпоративного сайта-визитки до масштабного портала с большим количеством интеграций
				с внутренними и внешними бизнес-системами, включая UI/UX-аудит текущего сайта или сайтов конкурентов.</p>`,
	};

	const casesInfoData = {
		items: [
			{
				id: 1,
				name: 'Eden Garden',
				link: '/cases/uvelichili-kolichestvo-klientov-v-2-6-raza-i-na-86-uznavaemost-brenda/',
				picture: '/medianation-belarus-page/banner-case-items/1.jpg',
				picture_params: {
					width: '800',
					height: '410',
				},
				text: `<ul>
								<li>х2,6 раза рост числа заказов через сайт</li>
								<li>Разработали фирменный стиль и новый сайт</li>
							</ul>`,
			},
			{
				id: 2,
				name: 'CleoLine',
				link: '/cases/uluchshili-yuzabiliti-sayta-i-uvelichili-konversiyu-polzovatelya-v-klienta-na-24/',
				picture: '/medianation-belarus-page/banner-case-items/2.jpg',
				picture_params: {
					width: '800',
					height: '410',
				},
				text: `<ul>
								<li>+24 % конверсии из посетителя сайта в клиента</li>
								<li>Улучшили юзабилити сайта</li>
							</ul>`,
			},
		],
	};

	const blockTextSecondData = {
		title: 'Сквозная и веб-аналитика',
		text: 'Мы организуем сбор данных из всех источников — будь то системы веб-аналитики, телефония, данные кассовых аппаратов — в единое пространство, сопоставляем их между собой и выстраиваем систему отчетности, которая позволит оценить эффективность работы бизнеса: от вложений денег в рекламу до перспектив выбранного вектора развития.',
	};

	const casesInfoSecondData = {
		items: [
			{
				id: 1,
				name: 'ЛитРес',
				link: '/cases/uvelichili-chislo-pokupok-na-33-/',
				picture: '/medianation-belarus-page/banner-case-items/3.jpg',
				picture_params: {
					width: '800',
					height: '410',
				},
				text: `<ul>
							<li>Создали систему предиктивной аналитики</li>
							<li>Увеличили эффективность маркетинговой активности</li>
						</ul>`,
			},
			{
				id: 2,
				name: 'Адамас',
				link: '/cases/skvoznaya-analitika-dlya-adamas/',
				picture: '/medianation-belarus-page/banner-case-items/4.jpg',
				picture_params: {
					width: '800',
					height: '410',
				},
				text: `<ul>
							<li>Автоматизировали сбор данных из CRM и рекламных каналов</li>
							<li>Начали считать рентабельность рекламной активности</li>
						</ul>`,
			},
		],
	};

	const ourClients = {
		name: 'Наши клиенты',
		items: [
			{
				picture: '/medianation-belarus-page/clients/1.png',
				picture_params: {
					width: '412',
					height: '250',
				},
			},
			{
				picture: '/medianation-belarus-page/clients/2.png',
				picture_params: {
					width: '412',
					height: '250',
				},
			},
			{
				picture: '/medianation-belarus-page/clients/3.png',
				picture_params: {
					width: '412',
					height: '250',
				},
			},
			{
				picture: '/medianation-belarus-page/clients/4.png',
				picture_params: {
					width: '412',
					height: '250',
				},
			},
			{
				picture: '/medianation-belarus-page/clients/5.png',
				picture_params: {
					width: '412',
					height: '250',
				},
			},
			{
				picture: '/medianation-belarus-page/clients/6.png',
				picture_params: {
					width: '412',
					height: '250',
				},
			},
			{
				picture: '/medianation-belarus-page/clients/7.png',
				picture_params: {
					width: '412',
					height: '250',
				},
			},
			{
				picture: '/medianation-belarus-page/clients/8.png',
				picture_params: {
					width: '412',
					height: '250',
				},
			},
			{
				picture: '/medianation-belarus-page/clients/9.png',
				picture_params: {
					width: '412',
					height: '250',
				},
			},
			{
				picture: '/medianation-belarus-page/clients/10.png',
				picture_params: {
					width: '412',
					height: '250',
				},
			},
			{
				picture: '/medianation-belarus-page/clients/11.png',
				picture_params: {
					width: '412',
					height: '250',
				},
			},
			{
				picture: '/medianation-belarus-page/clients/12.png',
				picture_params: {
					width: '412',
					height: '250',
				},
			},
			{
				picture: '/medianation-belarus-page/clients/13.png',
				picture_params: {
					width: '412',
					height: '250',
				},
			},
			{
				picture: '/medianation-belarus-page/clients/14.png',
				picture_params: {
					width: '412',
					height: '250',
				},
			},
			{
				picture: '/medianation-belarus-page/clients/15.png',
				picture_params: {
					width: '412',
					height: '250',
				},
			},
			{
				picture: '/medianation-belarus-page/clients/16.png',
				picture_params: {
					width: '412',
					height: '250',
				},
			},
			{
				picture: '/medianation-belarus-page/clients/17.png',
				picture_params: {
					width: '412',
					height: '250',
				},
			},
			{
				picture: '/medianation-belarus-page/clients/18.png',
				picture_params: {
					width: '412',
					height: '250',
				},
			},
			{
				picture: '/medianation-belarus-page/clients/19.png',
				picture_params: {
					width: '412',
					height: '250',
				},
			},
			{
				picture: '/medianation-belarus-page/clients/20.png',
				picture_params: {
					width: '412',
					height: '250',
				},
			},
			{
				picture: '/medianation-belarus-page/clients/21.png',
				picture_params: {
					width: '412',
					height: '250',
				},
			},
		],
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
			useApiFetch<Pick<BaseCertificatesType['numbers'], 'items'>>(
				LISTS_NUMBERS_URL,
			),
			useApiFetch<Pick<BaseCertificatesType['awards'], 'items'>>(
				LISTS_AWARD_URL,
			),
			useApiFetch<
				Pick<NonNullable<BaseCertificatesType['certificates']>, 'items'>
			>(LISTS_CERTIFICATES_URL),
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
				name: 'Мы хорошо знаем российский рынок.',
				caption: 'Мы поможем вам найти своих клиентов',
				captionNew: 'Мы поможем вам найти своих клиентов',
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
