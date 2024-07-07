<template>
	<section class="base-promotion-cost">
		<div class="container">
			<div class="inner">
				<div class="row">
					<div class="col">
						<h2 class="title">{{ title }}</h2>
						<div
							class="desc"
							v-html="text"
						></div>
					</div>
					<div class="col">
						<div
							v-for="(item, index) in items"
							:key="index"
							class="service"
						>
							<div class="service__category">{{ item.name }}</div>
							<div class="service__desc">
								<div class="service__name">
									<NuxtLink :to="item.service.link">
										{{ item.service.name }}
									</NuxtLink>
								</div>
								<div class="service__price">
									{{ item.service.price }}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
	import type { PropType } from 'vue';
	import { computed } from 'vue';
	import type { BasePromotionCostType } from './type';

	const props = defineProps({
		data: {
			type: Object as PropType<BasePromotionCostType>,
			required: true,
		},
	});

	const title = computed(() => {
		return props.data.name;
	});

	const text = computed(() => {
		return props.data.text;
	});

	const items = computed(() => {
		const items = props.data.items.filter(
			(
				item,
			): item is BasePromotionCostType['items'][number] & {
				service: object;
			} => {
				return (
					item.service !== null && typeof item.service === 'object'
				);
			},
		);

		return items;
	});
</script>

<style scoped lang="scss" src="./style.scss"></style>
