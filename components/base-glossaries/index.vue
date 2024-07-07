<template>
	<div class="base-glossaries">
		<div class="container">
			<div
				class="glossaries"
				itemscope
				itemtype="https://schema.org/FAQPage"
			>
				<div
					v-for="(item, index) in items"
					:key="index"
					class="glossary"
					itemscope
					itemprop="mainEntity"
					itemtype="https://schema.org/Question"
				>
					<div class="title">
						<NuxtLink
							:to="item.link"
							itemprop="name"
						>
							{{ item.name }}
						</NuxtLink>
					</div>
					<div
						class="desc"
						itemscope
						itemprop="acceptedAnswer"
						itemtype="https://schema.org/Answer"
					>
						<div
							class="text"
							itemprop="text"
							v-html="item.text"
						></div>
					</div>
					<div class="detail-link">
						<NuxtLink :to="item.link">Подробнее</NuxtLink>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import type { PropType } from 'vue';
	import { computed } from 'vue';
	import type { BaseType } from './type';

	const props = defineProps({
		data: {
			type: Object as PropType<BaseType>,
			required: true,
		},
	});

	const items = computed(() => {
		return props.data.items;
	});
</script>

<style scoped lang="scss" src="./style.scss"></style>
