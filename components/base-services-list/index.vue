<template>
	<div class="base-services-list">
		<div
			v-for="(item, index) in items"
			:key="index"
			class="service"
		>
			<div class="container">
				<div class="row">
					<div class="service-name">
						<nuxtLink
							class="link"
							:to="item.link"
						>
							{{ item.name }}
						</nuxtLink>
					</div>
					<div
						v-if="item.items"
						class="subservices"
					>
						<nuxtLink
							v-for="(childItem, childIndex) in item.items"
							:key="childIndex"
							:to="item.link"
							class="sublink"
						>
							{{ childItem.name }}
						</nuxtLink>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import type { PropType } from 'vue';
	import { computed } from 'vue';
	import type { BaseServicesListType } from './type';

	const props = defineProps({
		data: {
			type: Object as PropType<BaseServicesListType>,
			required: true,
		},
	});

	const items = computed(() => {
		return props.data.items;
	});
</script>

<style scoped lang="scss" src="./style.scss"></style>
