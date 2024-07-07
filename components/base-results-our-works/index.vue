<template>
	<section
		v-if="normalizedItems"
		class="base-results-our-works"
	>
		<div class="container">
			<div class="head">
				<h2 class="title">{{ title }}</h2>
				<div class="top-desc">{{ text }}</div>
			</div>
			<div class="row">
				<div
					v-for="(colItems, parentIndex) in normalizedItems"
					:key="parentIndex"
					class="col"
				>
					<div
						v-for="(item, index) in colItems"
						:key="index"
						v-animate
						:data-animate="isMob ? null : 'fade-up'"
						class="article-block-wrap"
						:style="`--animation-delay: ${delay(parentIndex)}ms;`"
					>
						<div class="article-block">
							<div class="article-block__photo">
								<span
									v-if="item.popup_data"
									@click="onShowModalDesign(item.popup_data)"
								>
									<img
										v-lazy
										:data-src="item.picture"
										:width="item.picture_params?.width"
										:height="item.picture_params?.height"
										alt="picture"
									/>
								</span>
								<NuxtLink
									v-else
									:to="item.link"
								>
									<img
										v-lazy
										:data-src="item.picture"
										:width="item.picture_params?.width"
										:height="item.picture_params?.height"
										alt="picture"
									/>
								</NuxtLink>
							</div>
							<div
								v-animate
								class="article-block__title"
								:data-animate="isMob ? null : 'fade-up'"
								:style="`--animation-delay: ${delay(3)}ms;`"
							>
								<span
									v-if="item.popup_data"
									@click="onShowPopup(item.popup_data)"
								>
									{{ item.name }}
								</span>
								<NuxtLink
									v-else
									:to="item.link"
								>
									{{ item.name }}
								</NuxtLink>
							</div>
							<div
								v-animate
								class="article-block__content"
								:data-animate="isMob ? null : 'fade-up'"
								:style="`--animation-delay: ${delay(5)}ms;--animation-duration:1.2s`"
							>
								<div
									v-if="item.text"
									class="article-block__desc"
								>
									{{ item.text }}
								</div>
								<div
									v-if="item.results"
									class="article-block__benefits"
								>
									<div
										v-for="(
											childItem, childIndex
										) in item.results"
										:key="childIndex"
										class="article-block__benefit"
									>
										<BaseBenefit :data="childItem" />
									</div>
								</div>
								<div
									v-if="item.awards"
									class="article-block__awards"
								>
									<div
										v-for="(
											childItem, childIndex
										) in item.awards"
										:key="childIndex"
										class="article-block__award"
									>
										<BaseAward :data="childItem" />
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<BaseDesignPopup
			v-if="isShowPopup && popupData"
			:data="popupData"
			@close="onClosePopup"
		/>
	</section>
</template>

<script setup lang="ts">
	import type { PropType } from 'vue';
	import { ref, computed, onMounted } from 'vue';
	import type { BaseResultsOurWorksType } from './type';
	import { useMediaQuery } from '@/composables/use-media-query';
	import BaseAward from '@/components/base-award';
	import BaseBenefit from '@/components/base-benefit';
	import BaseDesignPopup from '@/components/base-design-popup';

	const props = defineProps({
		data: {
			type: Object as PropType<BaseResultsOurWorksType>,
			required: true,
		},
	});

	const title = computed(() => {
		return props.data.name;
	});

	const text = computed(() => {
		return props.data.text;
	});

	const splitArray = (
		array: BaseResultsOurWorksType['items'],
		sliceCount: number,
	) => {
		const result = [];
		const length = array.length;
		const maxCountSlice = sliceCount >= length ? 1 : sliceCount;

		for (let i = 0; i < length; i += maxCountSlice) {
			result.push(array.slice(i, maxCountSlice + i));
		}

		return result;
	};

	const normalizedItems = computed(() => {
		const items = props.data.items.filter((item) => {
			return item.picture !== null;
		});

		const length = items?.length;
		const colCount = Math.ceil(length / 2);

		return length > 0 ? splitArray(items, colCount) : null;
	});

	const delay = (i: number) => {
		return (i % 6) * 100;
	};

	const popupData = ref<
		BaseResultsOurWorksType['items'][number]['popup_data'] | null
	>(null);

	const isShowPopup = ref(false);

	const onShowPopup = (
		data: BaseResultsOurWorksType['items'][number]['popup_data'],
	) => {
		popupData.value = data;
		isShowPopup.value = true;
	};

	const onClosePopup = () => {
		isShowPopup.value = false;
	};

	const isMob = ref(false);
	const mediaQuery = useMediaQuery();

	onMounted(() => {
		mediaQuery('(max-width: 767px)', (matches) => {
			isMob.value = matches;
		});
	});
</script>

<style scoped lang="scss" src="./style.scss"></style>
