<template>
	<section class="base-offer">
		<div class="container">
			<div class="content">
				<h2 class="title">{{ content.name }}</h2>
				<div
					class="text"
					v-html="content.text"
				></div>
				<div
					v-lazy
					class="background hide-md-min"
					:data-bg="content.picture ?? null"
				></div>
				<div class="btns">
					<div class="btn">
						<BaseButton
							theme="fifth"
							@click="onShowPopup"
						>
							{{ content.button_name }}
						</BaseButton>
					</div>

					<template v-if="content.additional_button_name">
						<div class="btn">
							<BaseButton
								v-if="content.additional_button_link"
								:link="{
									to: content.additional_button_link,
									target: '_blank',
								}"
								theme="sixth"
								:modifier-classes="['without-default-hover']"
							>
								{{ content.additional_button_name }}
							</BaseButton>
							<BaseButton
								v-else
								theme="sixth"
								:modifier-classes="['without-default-hover']"
								@click="onShowPopup"
							>
								{{ content.additional_button_name }}
							</BaseButton>
						</div>
					</template>
				</div>
				<div class="personal-data">
					Нажимая на кнопку, вы даете согласие на
					<a
						href="/personal-data/"
						target="_blank"
					>
						обработку персональных данных
					</a>
					и соглашаетесь с
					<a
						href="/personal-data/"
						target="_blank"
					>
						политикой конфиденциальности
					</a>
					.
				</div>
			</div>
			<div
				v-lazy
				class="background hide-md-max"
				:data-bg="content.picture ?? null"
			></div>
		</div>

		<ComercialPopup
			:show="isShowPopup"
			@close="onClosePopup"
		/>
	</section>
</template>

<script setup lang="ts">
	import type { PropType } from 'vue';
	import { ref, computed } from 'vue';
	import type { BaseOfferType } from './type';
	import BaseButton from '@/components/base-button';
	import ComercialPopup from '@/components/comercial-popup';

	const props = defineProps({
		data: {
			type: Object as PropType<BaseOfferType>,
			required: true,
		},
	});

	const content = computed(() => {
		return props.data.items[0];
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
