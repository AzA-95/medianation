<template>
	<div class="base-menu-list">
		<div class="container">
			<div class="row">
				<div
					v-for="(item, index) in items"
					:key="index"
					class="menu-list"
					:class="{ 'menu-list_ceil': isCeilWidth }"
					@click="item.show_popup ? onShowPopup() : null"
				>
					<div
						v-if="item.picture"
						class="pic"
					>
						<img
							v-lazy
							:data-src="item.picture"
							alt="pic"
						/>
					</div>
					<div class="desc">
						<div class="name">
							{{ item.name }}
						</div>
						<div
							v-if="item.text"
							class="text"
						>
							{{ item.text }}
						</div>
						<NuxtLink
							v-if="item.link"
							:to="item.link"
							class="link"
						></NuxtLink>
					</div>
				</div>
			</div>
		</div>

		<ComercialPopup
			:show="isShowPopup"
			@close="onClosePopup"
		/>
	</div>
</template>

<script setup lang="ts">
	import type { PropType } from 'vue';
	import { ref, computed } from 'vue';
	import type { BaseType } from './type';
	import ComercialPopup from '@/components/comercial-popup';

	const props = defineProps({
		data: {
			type: Object as PropType<BaseType>,
			required: true,
		},
	});

	const items = computed(() => {
		return props.data.items;
	});

	const isCeilWidth = computed(() => {
		return items.value.length > 3;
	});

	const isShowPopup = ref(false);

	const onShowPopup = () => {
		isShowPopup.value = true;
	};

	const onClosePopup = () => {
		isShowPopup.value = false;
	};
</script>

<style scoped lang="scss" src="./style.scss"></style>
