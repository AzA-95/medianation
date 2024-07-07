<template>
	<nav
		class="base-breadcrumbs"
		:class="[modifierClasses]"
	>
		<ul
			class="list"
			itemscope
			itemtype="http://schema.org/BreadcrumbList"
		>
			<li
				v-for="(item, index) in items"
				:key="index"
				class="item"
				itemprop="itemListElement"
				itemscope
				itemtype="http://schema.org/ListItem"
			>
				<nuxt-link
					v-if="item.link"
					:to="item.link"
					class="link"
					itemprop="item"
				>
					<span itemprop="name">{{ transformName(item.name) }}</span>
				</nuxt-link>
				<span
					v-else
					class="text"
					itemprop="name"
				>
					{{ transformName(item.name) }}
				</span>
				<meta
					itemprop="position"
					:content="`${index + 1}`"
				/>
			</li>
		</ul>
	</nav>
</template>

<script setup lang="ts">
	import type { PropType } from 'vue';
	import { computed } from 'vue';
	import type { BaseType } from './type';

	const props = defineProps({
		breadcrumbs: {
			type: Object as PropType<BaseType>,
			required: true,
		},
		modifierClasses: {
			type: Array as PropType<('white' | 'slash')[] | null>,
			default: null,
		},
	});

	const modifierClasses = computed(() => {
		return props.modifierClasses?.map((item) => {
			return `base-breadcrumbs_${item}`;
		});
	});

	const items = computed(() => {
		return props.breadcrumbs;
	});

	const toUppercaseWords = ['seo', 'smm'];

	const transformName = (name: string) => {
		if (toUppercaseWords.includes(name)) {
			return name.toUpperCase();
		} else {
			return name.charAt(0).toUpperCase() + name.slice(1);
		}
	};
</script>

<style scoped lang="scss" src="./style.scss"></style>
