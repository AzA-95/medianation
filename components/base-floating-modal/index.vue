<template>
	<div
		ref="mainEl"
		class="base-floating-modal"
		:class="{ active: isActive }"
	>
		<div class="container">
			<div class="row">
				<div class="text">{{ text }}</div>
				<div class="btn">
					<BaseButton
						:modifier-classes="['without-default-hover']"
						@click="onShowPopup"
					>
						{{ buttonName }}
					</BaseButton>
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
	import { ref, computed, onMounted } from 'vue';
	import type { BaseType } from './type';
	import { useEventListener } from '@/composables/use-event-listener';
	import BaseButton from '@/components/base-button';
	import ComercialPopup from '@/components/comercial-popup';

	const props = defineProps({
		data: {
			type: Object as PropType<BaseType>,
			required: true,
		},
	});

	const text = computed(() => {
		return props.data.text;
	});

	const buttonName = computed(() => {
		return props.data.button_name;
	});

	const isShowPopup = ref(false);

	const onShowPopup = () => {
		isShowPopup.value = true;
	};

	const onClosePopup = () => {
		isShowPopup.value = false;
	};

	const isActive = ref(false);

	const showOrHideModal = () => {
		if (window.scrollY > window.innerHeight) {
			isActive.value = true;
		} else {
			isActive.value = false;
		}
	};

	const eventListener = useEventListener();

	onMounted(() => {
		eventListener(window, 'scroll', showOrHideModal, {
			passive: true,
		});
	});

	const mainEl = ref<HTMLElement>();

	defineExpose({
		element: mainEl,
	});
</script>

<style scoped lang="scss" src="./style.scss"></style>
