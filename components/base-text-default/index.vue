<template>
	<div
		v-if="content"
		class="base-text-default"
		:class="[
			{ 'without-m-t': isWithoutMarginTop },
			{ 'without-m-b': isWithoutMarginBottom },
			modifierClasses,
		]"
	>
		<div class="container">
			<div
				ref="contentEl"
				class="content"
				v-html="content"
			></div>
		</div>
		<ComercialPopup
			:show="isShowPopup"
			@close="onClosePopup"
		/>
	</div>
</template>

<script setup lang="ts">
	import { useRuntimeConfig } from 'nuxt/app';
	import type { PropType } from 'vue';
	import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
	import type { Swiper as SwiperType } from 'swiper/types';
	import { Swiper } from 'swiper';
	import { Pagination, Navigation } from 'swiper/modules';
	import type { BaseType, ServiceSliderType, TariffListType } from './type';
	import { useFancybox } from '@/composables/use-fancybox';
	import type { FormResponseType } from '@/types/forms';
	import { isOnline } from '@/utils/common';
	import { SUBSCRIBE_FORM_URL } from '@/constants';
	import { useDebounce } from '@/composables/use-debounce';
	import { useApiOnInteraction } from '@/composables/use-api-on-interaction';
	import { useEventListener } from '@/composables/use-event-listener';
	import { useWindowResizeAxisX } from '@/composables/use-window-resize-axis-x';
	import ComercialPopup from '@/components/comercial-popup';

	const props = defineProps({
		data: {
			type: Object as PropType<BaseType>,
			required: true,
		},
		modifierClasses: {
			type: Array as PropType<'without-indent'[] | null>,
			default: null,
		},
	});

	const modifierClasses = computed(() => {
		return props.modifierClasses?.map((item) => {
			return `base-text-default_${item}`;
		});
	});

	const isShowPopup = ref(false);

	const onShowPopup = () => {
		isShowPopup.value = true;
	};

	const onClosePopup = () => {
		isShowPopup.value = false;
	};

	const config = useRuntimeConfig();

	const replaceImagePathToAbsolute = (content: string) => {
		const siteUrl = config.public.siteUrl;
		const isDev = config.public.isDev;
		const isExternalUrl = (url: string) =>
			url.startsWith('http') || url.startsWith('//');

		if (!isDev) return content;

		return content.replace(
			/<img[\s\S]+?[^>]*src="([^"]*)"[\s\S][^>]*>/gi,
			(match, p1) => {
				const imgSrc = p1.trim();
				const siteUrlWithoutLastSlash = siteUrl.replace(/\/$/, '');

				if (isExternalUrl(imgSrc) === false) {
					return match.replace(
						p1,
						`${siteUrlWithoutLastSlash}${imgSrc}`,
					);
				}

				return match;
			},
		);
	};

	const regexOfWidgetId =
		/<div[^>]*data-c-widget-id="([^"]+)".*?>.*?<\/div>/gs;

	const getWidgetsNameFromContent = (content: string) => {
		const matches = [];

		let matched = regexOfWidgetId.exec(content);

		while (matched) {
			matches.push(matched[1]);
			matched = regexOfWidgetId.exec(content);
		}

		return matches;
	};

	const getWidgetDataByName = (
		widgets: NonNullable<BaseType['widgets']>,
		widgetName: string,
	) => {
		return widgets.find((widget) => widgetName === widget.component_name);
	};

	const renderTemplateServiceSlider = (data: ServiceSliderType) => {
		return `<div class="c-services-slider js-c-services-slider">
					<div class="c-services-slider__inner">
						<div class="swiper">
							<div class="swiper-wrapper">
								${data.items
									.map(
										(item) => `
									<div class="swiper-slide">
										<div class="c-services-slider__banner">
											<div class="c-services-slider__row">
												<div class="c-services-slider__col">
													<div class="c-services-slider__desc">
														<div class="c-services-slider__title">${item.name}</div>
														${
															item.prev_text
																? `
																<div class="c-services-slider__text">${item.prev_text}</div>
															`
																: ''
														}
														<div class="c-services-slider__detail-link">
															<a href="${item.link}" target="_blank">Подробнее</a>
														</div>
													</div>
												</div>
												<div class="c-services-slider__col">
													${
														item.prev_picture
															? `
															<div class="c-services-slider__photo">
																<img src="${item.prev_picture}" alt="pic">
															</div>
														`
															: ''
													}
													<button type="button" class="c-services-slider__offer-btn js-c-services-slider__offer-btn">Получить коммерческое предложение</button>
												</div>
											</div>
										</div>
									</div>
								`,
									)
									.join(' ')}
							</div>
							<div class="swiper-pagination swiper-pagination_hide-mob"></div>
						</div>
					</div>
				</div>`;
	};

	const renderTemplateTariffs = (data: TariffListType) => {
		const mormalizedData = data.items[0].elements;

		return `<div class="c-tariffs">
				${mormalizedData
					.map(
						(item) => `
					<div class="c-tariff">
						<div class="c-tariff__title">${item.name}</div>
						<div class="c-tariff__price">${item.price}</div>
						${item.html ? `<div class="c-tariff__desc">${item.html}</div>` : ''}
						<div class="c-tariff__pre-btns"></div>
						<div class="c-tariff__btns">
							<button type="button" class="c-tariff__btn js-c-tariff__btn">Оставить заявку</button>
							${
								item.link
									? `<a href="${item.link}" target="_blank" class="c-tariff__link">Подробнее</a>`
									: ''
							}
						</div>
					</div>
				`,
					)
					.join(' ')}
			</div>`;
	};

	const buildWidgetContent = (
		type: string,
		data: NonNullable<BaseType['widgets']>[0],
	) => {
		if (type === 'ServiceSlider') {
			return renderTemplateServiceSlider(data as ServiceSliderType);
		}

		if (type === 'TariffList') {
			return renderTemplateTariffs(data as TariffListType);
		}

		return null;
	};

	const replaceWidgetIdToTemplateOnContent = (
		content: string,
		widgetName: string,
		widgetData: NonNullable<BaseType['widgets']>[0],
	) => {
		return content.replace(regexOfWidgetId, (match, p1) => {
			if (widgetName === p1) {
				const template = buildWidgetContent(widgetName, widgetData);
				return match.replace(match, template || match);
			}

			return match;
		});
	};

	const content = computed(() => {
		// Костыль с реплейсом чтобы картинки грузились при разработке на localhost
		let content = replaceImagePathToAbsolute(props.data.html);
		// Конец

		const widgets = props.data.widgets;

		// Заменяем код виджета на шаблон кода
		if (widgets) {
			const widgetsName = getWidgetsNameFromContent(content);

			widgetsName.forEach((widgetName) => {
				const widgetData = getWidgetDataByName(widgets, widgetName);
				content = replaceWidgetIdToTemplateOnContent(
					content,
					widgetName,
					widgetData!,
				);
			});
		}
		// Конец

		// Может быть пустая строка тогда скрываем блок компонента
		return content.trim();
	});

	const widgets = computed(() => {
		return props.data.widgets;
	});

	const isWithoutMarginTop = ref(false);
	const isWithoutMarginBottom = ref(false);
	const contentEl = ref<HTMLElement>();
	const swiperInstances: SwiperType[] = [];
	const debounce = useDebounce();
	const eventListener = useEventListener();
	const eventListenerResizeAxisX = useWindowResizeAxisX();

	const removeMarginByCondition = () => {
		const parent = contentEl.value;

		if (!parent) return;

		const hasClassList = (el: Node | null, classListNames: string[]) => {
			if (
				el &&
				el.nodeType === Node.ELEMENT_NODE &&
				classListNames.some((className) =>
					(el as HTMLElement).classList.contains(className),
				)
			) {
				return true;
			}

			return false;
		};

		// remove top space of base-text-default if first on child
		// .b-section, .q-row, .c-job-row, .c-have-questions, .c-subscribe-form
		const classNamesTop = [
			'q-row',
			'b-section',
			'c-job-row',
			'c-have-questions',
			'c-subscribe-form',
		];

		if (hasClassList(parent.firstChild, classNamesTop)) {
			isWithoutMarginTop.value = true;
		}

		// remove bottom space of base-text-default if lasts on child
		// .c-job-row, .b-section, .q-row, .c-have-questions, .c-subscribe-form
		const classNamesBottom = [
			'q-row',
			'b-section',
			'c-job-row',
			'c-have-questions',
			'c-subscribe-form',
		];

		if (hasClassList(parent.lastChild, classNamesBottom)) {
			isWithoutMarginBottom.value = true;
		}
	};

	const addClassToIframeOfYoutube = () => {
		const parent = contentEl.value;

		if (!parent) return;

		const isYoutubeUrl = (src: string) => {
			return /^((http|https):\/\/)?(www\.)?(youtube\.com)/.test(src);
		};

		const iframes = parent.querySelectorAll('.iframe iframe');

		Array.from(iframes).forEach((iframe) => {
			const src = iframe.getAttribute('src');

			if (src && isYoutubeUrl(src)) {
				iframe.closest('.iframe')!.classList.add('youtube');
			}
		});
	};

	const createDomEl = (
		type: string,
		attributes: Record<string, string>,
		...children: string[] | HTMLElement[]
	) => {
		const el = document.createElement(type);

		for (const key in attributes) {
			el.setAttribute(key, attributes[key]);
		}

		children.forEach((child) => {
			if (typeof child === 'string') {
				const lines = child.split('\n'); // добавяем br тег по символу \n в строке

				lines.forEach((d, i) => {
					if (i > 0) {
						el.appendChild(document.createElement('br'));
					}

					el.appendChild(document.createTextNode(d));
				});
			} else {
				el.appendChild(child);
			}
		});

		return el;
	};

	const fancybox = useFancybox();

	const showOnLightBox = (photos: Array<{ src: string }>, index: number) => {
		fancybox.show(photos, { startIndex: index });
	};

	const setArrowsToCenterOnPhoto = (
		photo: HTMLElement,
		arrowPrev: HTMLElement,
		arrowNext: HTMLElement,
	) => {
		const swiperButtonPrev = arrowPrev;
		const swiperButtonNext = arrowNext;

		if (photo && swiperButtonPrev && swiperButtonNext) {
			const img = new Image();
			img.onload = function () {
				const height = photo.offsetHeight; // Получаем отредериную высоту фото
				const photoCeilHeight = height / 2;
				swiperButtonPrev.style.top = `${photoCeilHeight}px`;
				swiperButtonNext.style.top = `${photoCeilHeight}px`;
			};
			img.src = photo.getAttribute('src') as string;
		}
	};

	const initPhotoGalleriesSlider = () => {
		const parent = contentEl.value;

		if (!parent) return;

		// init Slider
		const photoGalleries = parent.querySelectorAll('.js-c-photo-gall');

		photoGalleries.forEach((photoGallery) => {
			const swiperEl = photoGallery.querySelector(
				'.swiper-container',
			) as HTMLElement;

			// Название класса указано в снипете поэтому заменяем через js
			swiperEl.classList.add('swiper');
			swiperEl.classList.remove('swiper-container');

			const buttonPrevEl = createDomEl('div', {
				class: 'swiper-button-prev-small',
			});
			const buttonNextEl = createDomEl('div', {
				class: 'swiper-button-next-small',
			});
			const paginationEl = createDomEl('div', {
				class: 'swiper-pagination',
			});

			swiperEl.appendChild(buttonPrevEl);
			swiperEl.appendChild(buttonNextEl);
			swiperEl.appendChild(paginationEl);

			const buttonPrev = photoGallery.querySelector(
				'.swiper-button-prev-small',
			) as HTMLElement;
			const buttonNext = photoGallery.querySelector(
				'.swiper-button-next-small',
			) as HTMLElement;
			const pagination = photoGallery.querySelector(
				'.swiper-pagination',
			) as HTMLElement;
			const photo = photoGallery.querySelector(
				'.js-c-photo-gall__photo img',
			) as HTMLElement;

			const swiper = new Swiper(swiperEl, {
				spaceBetween: 100, // нужен чтобы не было видно следуюшего слайда в декстоп версии сайта
				modules: [Navigation, Pagination],
				navigation: {
					prevEl: buttonPrev,
					nextEl: buttonNext,
				},
				pagination: {
					el: pagination,
					clickable: true,
					dynamicBullets: true,
					dynamicMainBullets: 1,
				},
			});

			swiperInstances.push(swiper);
			setArrowsToCenterOnPhoto(photo, buttonPrev, buttonNext);

			eventListenerResizeAxisX(
				debounce(() => {
					setArrowsToCenterOnPhoto(photo, buttonPrev, buttonNext);
				}, 100), // Без debounce высота выставляется не коректно у стрелок при ресайзе
			);
		});

		// init Fancybox
		photoGalleries.forEach((photoGallery) => {
			const photos = photoGallery.querySelectorAll(
				'.js-c-photo-gall__photo',
			);
			const photosSources = Array.from(
				photoGallery.querySelectorAll('img'),
			).map((photo) => {
				return {
					src: photo.getAttribute('src') as string,
				};
			});

			eventListener(
				photoGallery as HTMLElement,
				'click',
				(event: Event) => {
					const clikedPhoto = (event.target as HTMLElement).closest(
						'.js-c-photo-gall__photo',
					);

					if (clikedPhoto) {
						photos.forEach((photo, index) => {
							if (clikedPhoto === photo) {
								if (photosSources.length) {
									showOnLightBox(photosSources, index);
								}
							}
						});
					}
				},
			);
		});
	};

	const initServicesSlider = () => {
		const parent = contentEl.value;

		if (!parent) return;

		// init sliders
		const servicesSliders = parent.querySelectorAll(
			'.js-c-services-slider',
		);

		servicesSliders.forEach((servicesSlider) => {
			const swiperEl = servicesSlider.querySelector(
				'.swiper',
			) as HTMLElement;

			const pagination = servicesSlider.querySelector(
				'.swiper-pagination',
			) as HTMLElement;

			const swiper = new Swiper(swiperEl, {
				slidesPerView: 'auto',
				modules: [Pagination],
				pagination: {
					el: pagination,
					clickable: true,
					dynamicBullets: true,
					dynamicMainBullets: 1,
				},
			});

			swiperInstances.push(swiper);
		});

		// init event listeners on offer-btn
		const offerBtns = parent.querySelectorAll(
			'.js-c-services-slider__offer-btn',
		) as NodeListOf<HTMLElement>;

		offerBtns.forEach((offerBtn) => {
			eventListener(offerBtn, 'click', onShowPopup);
		});
	};

	const initTariffs = () => {
		const parent = contentEl.value;

		if (!parent) return;

		// init event listeners on tariff__btn
		const tariffBtns = parent.querySelectorAll(
			'.js-c-tariff__btn',
		) as NodeListOf<HTMLElement>;

		tariffBtns.forEach((tariffBtn) => {
			eventListener(tariffBtn, 'click', onShowPopup);
		});
	};

	const initCHaveQuestions = () => {
		const parent = contentEl.value;

		if (!parent) return;

		// Получаем элемент с контента сниппета
		const haveQuestionBtns = parent.querySelectorAll(
			'.js-c-have-questions .btn',
		);

		Array.from(haveQuestionBtns).forEach((btn) => {
			eventListener(btn as HTMLElement, 'click', onShowPopup);
		});
	};

	const initSubscribesForm = () => {
		const parent = contentEl.value;

		if (!parent) return;

		const buildSubscribeFormTemplate = () => {
			const subscribeForms = parent.querySelectorAll(
				'.js-c-subscribe-form',
			);

			Array.from(subscribeForms).forEach((subscribeForm) => {
				subscribeForm.insertAdjacentHTML(
					'beforeend',
					`<div class="c-subscribe-form__form-wrap">
							<form action="#" class="c-subscribe-form__form js-c-subscribe-form__form" novalidate="novalidate">
								<div class="c-subscribe-form__fields">
									<div class="c-subscribe-form__field js-c-subscribe-form__field">
										<input type="email" name="email" required="required" placeholder="E-mail*">
									</div>
									<div class="c-subscribe-form__field js-c-subscribe-form__field">
										<input type="text" name="name" required="required" placeholder="Ваше имя*">
									</div>

									<input class="js-c-subscribe-form__input-page-url" type="hidden" name="page_url" required="required">
								</div>

								<button type="submit" class="c-subscribe-form__button js-c-subscribe-form__button">Подписаться на рассылку</button>

								<div class="c-subscribe-form__personal-data">
									Нажимая на кнопку, вы даете согласие на
									<a href="/personal-data/" target="_blank">обработку персональных данных</a>
									и соглашаетесь с политикой конфиденциальности.
								</div>
							</form>
						</div>`,
				);
			});
		};

		buildSubscribeFormTemplate();

		const subscribeForms = parent.querySelectorAll('.js-c-subscribe-form');

		const getFieldByName = (form: HTMLFormElement, fieldName: string) => {
			return form.querySelector(
				`.js-c-subscribe-form__field input[name=${fieldName}]`,
			);
		};

		const clearErrors = (form: HTMLFormElement) => {
			const errorText = form.querySelector(
				'.js-c-subscribe-form__error-text',
			);
			const errorFields = form.querySelectorAll(
				'.js-c-subscribe-form__field-error',
			);

			errorText?.remove();

			Array.from(errorFields).forEach((error) => {
				error.parentElement!.classList.remove('invalid');
				error.remove();
			});
		};

		const clearErrorFromField = (field: HTMLInputElement) => {
			const parent = field.parentElement;
			const errorEl = parent!.querySelector(
				'.js-c-subscribe-form__field-error',
			);

			parent!.classList.remove('invalid');
			errorEl?.remove();
		};

		const addErrorToField = (field: HTMLInputElement) => {
			let errorText = '';
			const parent = field.parentElement as HTMLElement;

			parent.classList.add('invalid');

			if (field.value.trim() === '') {
				errorText = 'Нужно заполнить это поле';
			} else {
				errorText = 'Заполните корректно поле';
			}

			const errorEl = createDomEl(
				'div',
				{
					class: 'c-subscribe-form__field-error js-c-subscribe-form__field-error',
				},
				errorText,
			);

			parent.appendChild(errorEl);
		};

		Array.from(subscribeForms).forEach((subscribeForm) => {
			const form = subscribeForm.querySelector(
				'.js-c-subscribe-form__form',
			) as HTMLFormElement | null;

			if (!form) return;

			const submitButton = form.querySelector(
				'.js-c-subscribe-form__button',
			);
			const inputs = form.querySelectorAll(
				'.js-c-subscribe-form__field input',
			) as NodeListOf<HTMLInputElement>;
			const hiddenPageUrlField = form.querySelector(
				'.js-c-subscribe-form__input-page-url',
			) as HTMLInputElement;

			hiddenPageUrlField.value = window.location.href;

			eventListener(form, 'submit', async (event: Event) => {
				event.preventDefault();

				if (form.checkValidity()) {
					clearErrors(form); // удаляем старые ошибки
					submitButton!.setAttribute('disabled', 'true');

					const formData = new FormData(
						event.target as HTMLFormElement,
					);

					try {
						const result =
							await useApiOnInteraction<FormResponseType>(
								SUBSCRIBE_FORM_URL,
								{
									method: 'post',
									body: formData,
									baseURL: undefined,
								},
							);

						if (result.success) {
							const successEl = createDomEl(
								'div',
								{ class: 'c-subscribe-form__success' },
								'Спасибо, за подписку -)',
							);

							form.classList.add('hide-form');
							form.parentElement!.appendChild(successEl);

							// @ts-ignore: Unreachable code error
							window.dataLayer?.push({
								event: 'CommonEventGA',
								eventCategory: 'common-ga-send-subscribe',
								eventAction: 'medianation.ru',
								orderId: result.id,
							});
						} else {
							result.error_fields?.forEach((fieldName) => {
								const field = getFieldByName(
									form,
									fieldName,
								) as HTMLInputElement;

								addErrorToField(field); // добавляем информацию об ошибке к полю
							});
						}
					} catch (error) {
						let errorText =
							'Временная ошибка на сервере.\nПовторите попытку чуть позже';

						if (!isOnline()) {
							errorText =
								'Проверьте подключение к интернету\nи повторите попытку еще раз';
						}

						const errorEl = createDomEl(
							'div',
							{
								class: 'c-subscribe-form__error-text js-c-subscribe-form__error-text',
							},
							errorText,
						);

						form.prepend(errorEl);
					}

					submitButton!.removeAttribute('disabled');
				} else {
					clearErrors(form); // удаляем старые ошибки

					Array.from(inputs).forEach((input) => {
						if (
							!input.validity.valid ||
							input.value.trim() === ''
						) {
							addErrorToField(input); // добавляем информацию об ошибке к полю
						}
					});
				}
			});

			Array.from(inputs).forEach((input) => {
				eventListener(input, 'focus', () => {
					clearErrorFromField(input as HTMLInputElement); // удаляем ошибку с поля
				});
			});
		});
	};

	const destroySwipers = () => {
		swiperInstances.forEach((swiperIntance) => {
			swiperIntance.destroy();
		});
	};

	onMounted(() => {
		removeMarginByCondition();
		addClassToIframeOfYoutube();
		initPhotoGalleriesSlider();
		initCHaveQuestions();
		initSubscribesForm();

		if (widgets.value) {
			initServicesSlider();
			initTariffs();
		}
	});

	onBeforeUnmount(() => {
		destroySwipers();
	});
</script>

<style>
	/* Загружаем стили так как не используется компонент слайдера */
	@import 'swiper/css';
	@import 'swiper/css/pagination';
</style>

<style scoped lang="scss" src="./style.scss"></style>
