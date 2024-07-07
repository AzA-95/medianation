<template>
	<div
		v-if="!isShowPopup"
		class="base-design-popup"
	>
		<div
			class="overlay"
			@click="onClosePopup"
		></div>
		<div class="inner">
			<div
				class="close-btn"
				@click="onClosePopup"
			>
				Закрыть
			</div>

			<div class="container">
				<div class="content">
					<div class="title">{{ title }}</div>
					<div
						class="pic"
						:style="`
							--img-width: ${pictureParams.width};
							--img-height: ${pictureParams.height};
						`"
					>
						<img
							v-lazy
							:data-src="picture"
							:width="pictureParams.width"
							:height="pictureParams.height"
							class="pic-big"
							alt="pic"
						/>
						<img
							v-lazy
							:data-src="pictureSmall"
							:width="pictureSmallParams.width"
							:height="pictureSmallParams.height"
							class="pic-small"
							alt="pic"
						/>
					</div>
					<div class="btn-wrap">
						<div class="btn">
							<BaseButton @click="onShowPopup">
								Хочу так же!
							</BaseButton>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<ComercialPopup
		:show="isShowPopup"
		@close="onClosePopup"
	/>
</template>

<script setup lang="ts">
	import type { PropType } from 'vue';
	import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
	import type { BaseType } from './type';
	import BaseButton from '@/components/base-button';
	import ComercialPopup from '@/components/comercial-popup';

	const emits = defineEmits<{
		(e: 'close'): void;
	}>();

	const props = defineProps({
		data: {
			type: Object as PropType<BaseType>,
			required: true,
		},
	});

	const title = computed(() => {
		return props.data.title;
	});

	const picture = computed(() => {
		return props.data.picture;
	});

	const pictureParams = computed(() => {
		return props.data.picture_params;
	});

	const pictureSmall = computed(() => {
		return props.data.picture;
	});

	const pictureSmallParams = computed(() => {
		return props.data.picture_small_params;
	});

	const isShowPopup = ref(false);

	const onShowPopup = () => {
		isShowPopup.value = true;
	};

	const onClosePopup = () => {
		emits('close');
	};

	const addClassToBody = () => {
		document.body.classList.add('modal-design-opened');
	};

	const removeClassFromBody = () => {
		document.body.classList.remove('modal-design-opened');
	};

	onMounted(() => {
		addClassToBody();
	});

	onBeforeUnmount(() => {
		removeClassFromBody();
	});
</script>

<style scoped lang="scss" src="./style.scss"></style>
