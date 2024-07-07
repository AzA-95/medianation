<template>
	<section class="base-jobs-slider">
		<div class="container">
			<h2 class="title">
				{{ title }}

				<template v-for="(item, index) in cities">
					<span
						v-if="'prefix' in item"
						:key="index + '-prefix'"
						class="prefix"
					>
						{{ item.prefix }}
					</span>
					<span
						v-else
						:key="index"
						class="city"
						:class="{ active: activeCityIndex === index }"
						@click="onChangeCityVacancies(item.id, index)"
					>
						{{ item.name_prepositional }}
					</span>
				</template>
			</h2>
			<div
				v-match-height="{
					selectors: ['[data-match-height]'],
					isEnabled: (window: Window) => window.innerWidth > 1279,
				}"
				class="slider"
			>
				<BaseSwiper :options="swiperOptions">
					<BaseSwiperSlide
						v-for="(item, index) in jobs"
						:key="index"
					>
						<div class="job">
							<div
								class="job__title"
								data-match-height="true"
							>
								{{ item.name }}
							</div>
							<div class="job__text">{{ item.preview }}</div>
							<NuxtLink
								v-if="getLinkOrNull(item.id)"
								class="job__link"
								:to="getLinkOrNull(item.id) as string"
							>
								Посмотреть
							</NuxtLink>
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
			<div class="bottom">
				<div class="info-title">Не нашли подходящую вакансию?</div>
				<div class="btn">
					<BaseButton @click="onScrollToForm">
						Отправить резюме
					</BaseButton>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
	import type { PropType, UnwrapNestedRefs } from 'vue';
	import { ref, computed, shallowRef, onMounted } from 'vue';
	import type { BaseType } from './type';
	import { scrollTo } from '@/utils/ui';
	import { useMediaQuery } from '@/composables/use-media-query';
	import { useApiOnInteraction } from '@/composables/use-api-on-interaction';
	import type { OptionsType as BaseSwiperOptionsType } from '@/components/base-swiper/type';
	import BaseSwiper from '@/components/base-swiper';
	import BaseSwiperSlide from '@/components/base-swiper/base-swiper-slide';
	import type { BaseSliderArrowButtonType } from '@/components/base-slider-arrow-button/type';
	import BaseSliderArrowButton from '@/components/base-slider-arrow-button';
	import BaseButton from '@/components/base-button';

	const props = defineProps({
		data: {
			type: Object as PropType<BaseType>,
			required: true,
		},
	});

	const title = computed(() => {
		return props.data.name;
	});

	const cities = computed(() => {
		const cities = props.data.filter.city;
		const arr: ((typeof cities)[0] | { prefix: string })[] = [];

		cities.forEach((value, index) => {
			// если не последний элемент массива и нечетное число то добавляем префикс (и)
			if (cities.length !== index && index % 2 !== 0) {
				arr.push({
					prefix: 'и',
				});
			}

			arr.push(value);
		});

		return arr;
	});

	const jobs = shallowRef(props.data.items);

	const isMob = ref(false);
	const prevButtonEl = ref<UnwrapNestedRefs<BaseSliderArrowButtonType>>();
	const nextButtonEl = ref<UnwrapNestedRefs<BaseSliderArrowButtonType>>();

	const swiperOptions = computed<BaseSwiperOptionsType>(() => {
		return {
			init: !isMob.value,
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

	// Жесткий костыль(По возможности надо вынести в апи страницы детальных вакансий)
	const getLinkOrNull = (id: string) => {
		// ссылки генерируются по id вакансий от (прод сайта)
		// от (дев сайта) ссылки могу не подходить по id тогда урл будет /jobs/undefined/
		// сделано так потому что в (апи бэкенда) нет детальных страниц вакансий.
		// Вакансии ссылаются на api фронта по пути /static/front-api/jobs/
		const links: Record<string, { link: string }> = {
			'1618': {
				link: 'msk-menedzher-po-prodazham/',
			},
			'1416': {
				link: 'msk-menedzher-po-prodazham-medijnoj-reklamy/',
			},
			'985': {
				link: 'msk-menedzher-po-prodazham-digital-reklamy/',
			},
			'984': {
				link: 'msk-rukovoditel-proektov-akkaunt-menedzher/',
			},
			'1323': {
				link: 'ng-mladshij-veb-analitik/',
			},
			'1322': {
				link: 'ng-menedzher-marketplejsov/',
			},
			'1328': {
				link: 'ng-mladshij-seo-optimizator/',
			},
			'1327': {
				link: 'ng-mladshij-sql-analitik/',
			},
			'1326': {
				link: 'ng-stazher-v-otdel-po-rabote-s-marketplejsami-i-prajsploshchadkami/',
			},
			'1324': {
				link: 'ng-seo-optimizator/',
			},
			'1321': {
				link: 'ng-veb-dizajner/',
			},
			'1320': {
				link: 'ng-menedzher-po-prodazham-digital-reklamy/',
			},
			'1319': {
				link: 'ng-stazher-v-otdel-mediaplanirovaniya/',
			},
			'1318': {
				link: 'ng-stazher-v-otdel-kontekstnoj-reklamy/',
			},
			'1317': {
				link: 'ng-specialist-po-kontekstnoj-reklame/',
			},
		};

		return links[id] ? `/jobs/${links[id].link}` : null;
	};

	const activeCityIndex = ref(0);

	const onChangeCityVacancies = async (id: string, index: number) => {
		activeCityIndex.value = index;

		try {
			const result = await useApiOnInteraction<Pick<BaseType, 'items'>>(
				`lists/jobs/?filter[city]=${id}`,
			);

			jobs.value = result.items;
		} catch (error) {
			// fix me to notify
			alert('Не удалось загуризить данные');
			// eslint-disable-next-line no-console
			console.error(error);
		}
	};

	const onScrollToForm = () => {
		scrollTo({
			to: '.js-the-footer-jobs-form__scroll-pos',
		});
	};

	const mediaQuery = useMediaQuery();

	onMounted(() => {
		mediaQuery('(max-width: 767px)', (matches) => {
			isMob.value = matches;
		});
	});
</script>

<style scoped lang="scss" src="./style.scss"></style>
