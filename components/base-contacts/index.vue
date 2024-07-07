<template>
	<div
		class="base-contacts"
		:class="[modifierClasses]"
	>
		<div class="container">
			<div class="cities">
				Офисы в
				<span
					class="city"
					:class="{ active: selectedIndex === 0 }"
					@click="changeDataCity(0)"
				>
					Москве
				</span>
				и
				<span
					class="city"
					:class="{ active: selectedIndex === 1 }"
					@click="changeDataCity(1)"
				>
					Нижнем Новгороде
				</span>
			</div>
			<div class="map-with-content">
				<div
					ref="mapEl"
					class="map"
				></div>
				<div
					class="desc"
					itemscope
					itemtype="http://schema.org/Organization"
				>
					<div class="hidden">
						<meta
							itemprop="name"
							content="Агентство интернет-рекламы «МедиаНация»"
						/>
						<meta
							itemprop="description"
							content="Описание оранизации medianation"
						/>
						<div
							itemprop="address"
							itemscope
							itemtype="http://schema.org/PostalAddress"
						>
							<meta
								itemprop="addressCountry"
								content="Россия"
							/>
							<meta
								itemprop="addressLocality"
								:content="cities[0].cityText"
							/>
							<meta
								itemprop="streetAddress"
								:content="cities[0].street"
							/>
						</div>
						<div
							itemprop="address"
							itemscope
							itemtype="http://schema.org/PostalAddress"
						>
							<meta
								itemprop="addressCountry"
								content="Россия"
							/>
							<meta
								itemprop="addressLocality"
								:content="cities[1].cityText"
							/>
							<meta
								itemprop="streetAddress"
								:content="cities[1].street"
							/>
						</div>
					</div>
					<div class="title">{{ activeCity.title }}</div>
					<div class="address">
						{{ activeCity.address }}
					</div>
					<div class="worktime">
						{{ activeCity.worktime }}
					</div>
					<div class="phone">
						<a href="#">
							<span itemprop="telephone">
								{{ activeCity.phone }}
							</span>
						</a>
					</div>
					<a
						ref="emailEl"
						:href="`mailto:${activeCity.email}`"
						class="email"
					>
						<span itemprop="email">
							{{ activeCity.email }}
						</span>
					</a>
					<div
						v-if="isEmailChanged"
						class="email-info"
					>
						<div class="email-info__title">
							<span>Почему такой E-mail?</span>
						</div>
						<div class="email-info__content">
							Не пугайтесь, ничего не сломалось. Мы отслеживаем
							эффективность и используем трекер электронной почты,
							чтобы понимать, откуда к нам приходят клиенты.
						</div>
					</div>
				</div>
			</div>
			<div class="slider">
				<BaseSwiper :options="swiperOptions">
					<BaseSwiperSlide
						v-for="(item, index) in activeCity.photos"
						:key="index"
					>
						<div
							class="photo"
							@click="onCallGallery(index)"
						>
							<img
								v-lazy
								:data-src="item.picture"
								:width="item.picture_params.width"
								:height="item.picture_params.height"
								alt="picture"
							/>
							<span
								v-if="index == 0 && activeCity.city === 'msk'"
							>
								Вход в офис
							</span>
						</div>
					</BaseSwiperSlide>
				</BaseSwiper>

				<BaseSliderArrowButton
					ref="prevButtonEl"
					:modifier-classes="['small', 'theme-second']"
					:is-prev="true"
				/>
				<BaseSliderArrowButton
					ref="nextButtonEl"
					:modifier-classes="['small', 'theme-second']"
					:is-next="true"
				/>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import type { PropType, UnwrapNestedRefs } from 'vue';
	import { ref, reactive, computed, onMounted } from 'vue';
	import { useFancybox } from '@/composables/use-fancybox';
	import { useMutationObserver } from '@/composables/use-mutation-observer';
	import type { OptionsType as BaseSwiperOptionsType } from '@/components/base-swiper/type';
	import BaseSwiper from '@/components/base-swiper';
	import BaseSwiperSlide from '@/components/base-swiper/base-swiper-slide';
	import type { BaseSliderArrowButtonType } from '@/components/base-slider-arrow-button/type';
	import BaseSliderArrowButton from '@/components/base-slider-arrow-button';

	const props = defineProps({
		modifierClasses: {
			type: Array as PropType<'without-mg'[] | null>,
			default: null,
		},
	});

	const modifierClasses = computed(() => {
		return props.modifierClasses?.map((item) => {
			return `base-contacts_${item}`;
		});
	});

	const globMskImages = import.meta.glob('./images/msk/*.jpg', {
		eager: true,
	});

	const mskImages = Object.entries(globMskImages).map(([_, value]) => {
		return (value as { default: unknown }).default;
	});

	const globNnImages = import.meta.glob('./images/nn/*.jpg', {
		eager: true,
	});

	const nnImages = Object.entries(globNnImages).map(([_, value]) => {
		return (value as { default: unknown }).default;
	});

	const map = ref<mapboxgl.Map | null>(null);
	const selectedIndex = ref(0);
	const isEmailChanged = ref(false);
	const cities = reactive([
		{
			city: 'msk',
			cityText: 'Москва',
			title: 'Московский офис',
			address: 'г. Москва, ул. Малая Полянка, д. 2',
			worktime: 'Пн-Пт: с 10:00 до 19:00',
			phone: '+7 (495) 215 10 97',
			email: 'comeon@medianation.ru',
			street: 'ул. Малая Полянка, д. 2',
			coords: [37.616773, 55.736427],
			photos: [
				{
					picture: mskImages[0],
					picture_params: {
						width: 810,
						height: 1080,
					},
				},
				{
					picture: mskImages[1],
					picture_params: {
						width: 810,
						height: 1080,
					},
				},
				{
					picture: mskImages[2],
					picture_params: {
						width: 810,
						height: 1080,
					},
				},
				{
					picture: mskImages[3],
					picture_params: {
						width: 810,
						height: 1080,
					},
				},
				{
					picture: mskImages[4],
					picture_params: {
						width: 810,
						height: 1080,
					},
				},
				{
					picture: mskImages[5],
					picture_params: {
						width: 810,
						height: 1080,
					},
				},
			],
		},
		{
			city: 'nn',
			cityText: 'Нижний Новгород',
			title: 'Нижегородский офис',
			address: 'г. Нижний Новгород, ул. Нестерова, д.5, 6 этаж',
			worktime: 'Пн-Пт: с 10:00 до 19:00',
			phone: '+7 (495) 215 10 97',
			email: 'comeon@medianation.ru',
			coords: [44.01691, 56.327271],
			street: 'ул. Нестерова, д.5, 6 этаж',
			photos: [
				{
					picture: nnImages[0],
					picture_params: {
						width: 714,
						height: 535,
					},
				},
				{
					picture: nnImages[1],
					picture_params: {
						width: 656,
						height: 535,
					},
				},
				{
					picture: nnImages[2],
					picture_params: {
						width: 715,
						height: 535,
					},
				},
				{
					picture: nnImages[3],
					picture_params: {
						width: 714,
						height: 535,
					},
				},
				{
					picture: nnImages[4],
					picture_params: {
						width: 715,
						height: 535,
					},
				},
				{
					picture: nnImages[5],
					picture_params: {
						width: 713,
						height: 535,
					},
				},
				{
					picture: nnImages[6],
					picture_params: {
						width: 716,
						height: 535,
					},
				},
				{
					picture: nnImages[7],
					picture_params: {
						width: 715,
						height: 535,
					},
				},
			],
		},
	]);

	const changeDataCity = (index: number) => {
		selectedIndex.value = index;

		if (map.value) {
			map.value.flyTo({
				center: cities[index].coords as [number, number],
			});
		}
	};

	const mapEl = ref<HTMLElement>();
	const emailEl = ref<HTMLElement>();
	const mutationObserver = useMutationObserver();

	const initMap = () => {
		const modules = Promise.all([
			import('mapbox-gl'),
			import('mapbox-gl/dist/mapbox-gl.css'),
		]);

		modules
			.then(([mapbox]) => {
				const mapboxgl = mapbox.default;

				mapboxgl.accessToken =
					'pk.eyJ1IjoiYWxleGdhbGwiLCJhIjoiWTFJOTR4RSJ9.NQmp6qTq1POznN-waFCdZA';

				map.value = new mapboxgl.Map({
					container: mapEl.value!, // container id
					style: 'mapbox://styles/mapbox/light-v10', // stylesheet location
					center: [37.616773, 55.736427], // starting position [lng, lat]
					zoom: 14, // starting zoom
				});

				cities.forEach((item) => {
					const el = document.createElement('div');

					el.className = 'contact-marker';
					el.innerHTML = `<i></i><span>${item.street}</span>`;
					new mapboxgl.Marker(el)
						.setLngLat(item.coords as [number, number])
						.addTo(map.value!);
				});
			})
			.catch((error) => {
				// fix me to notify
				alert('Не удалось загрузить карту');
				// eslint-disable-next-line no-console
				console.error(error);
			});
	};

	const initMapLazy = () => {
		const options = {
			root: null,
			threshold: 0.2,
		};

		if (mapEl.value) {
			const observer = new IntersectionObserver((entries, observer) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						initMap();
						observer.unobserve(mapEl.value!);
					}
				});
			}, options);

			observer.observe(mapEl.value);
		}
	};

	const prevButtonEl = ref<UnwrapNestedRefs<BaseSliderArrowButtonType>>();
	const nextButtonEl = ref<UnwrapNestedRefs<BaseSliderArrowButtonType>>();

	const swiperOptions = computed<BaseSwiperOptionsType>(() => {
		return {
			slidesPerView: 'auto',
			mousewheel: {
				forceToAxis: true,
			},
			navigation: {
				prevEl: prevButtonEl.value?.element,
				nextEl: nextButtonEl.value?.element,
			},
		};
	});

	const activeCity = computed(() => {
		return cities[selectedIndex.value];
	});

	const photos = computed(() => {
		return activeCity.value.photos.map((photo) => {
			return {
				src: photo.picture as string,
			};
		});
	});

	const fancybox = useFancybox();

	const onCallGallery = (index: number) => {
		fancybox.show(photos.value, { startIndex: index });
	};

	onMounted(() => {
		initMapLazy();

		mutationObserver(
			emailEl.value!,
			{
				subtree: true,
				childList: true,
				characterData: true,
			},
			(_, observer) => {
				isEmailChanged.value = true;
				observer.disconnect(); // Остановливаем наблюдение после первого выполнения
			},
		);
	});
</script>

<style scoped lang="scss" src="./style.scss"></style>
