<template>
	<div
		class="base-agree-condition"
		:class="[modifierClasses]"
	>
		<template v-if="isSubscribeForm">
			Нажимая на кнопку, вы даете согласие на
			<a
				href="/personal-data/"
				target="_blank"
			>
				обработку персональных данных
			</a>
			и соглашаетесь с политикой конфиденциальности.
		</template>
		<template v-else>
			Вы соглашаетесь с
			<a href="/personal-data/">политикой конфиденциальности</a>
			,
			<br v-if="isHeaderForm" />
			если оставляете заявку у нас на сайте.

			<a
				v-if="isJobsForm"
				href="https://drive.google.com/drive/folders/14DCIWKPaQgBzHxf1hhGvA2U8qf9wzOwx"
				target="_blank"
				class="documents-link"
			>
				Специальная оценка условий труда
			</a>
		</template>
	</div>
</template>

<script setup lang="ts">
	import type { PropType } from 'vue';
	import { computed } from 'vue';

	const props = defineProps({
		modifierClasses: {
			type: Array as PropType<
				(
					| 'subscribe-form'
					| 'subscribe-form-second'
					| 'jobs-form'
					| 'referral-form'
					| 'header-form'
				)[] | null
			>,
			default: null,
		},
	});

	const modifierClasses = computed(() => {
		return props.modifierClasses?.map((item) => {
			return `base-agree-condition_${item}`;
		});
	});

	const isSubscribeForm = computed(() => {
		const classes = props.modifierClasses;

		if (classes) {
			return (
				classes.includes('subscribe-form') ||
				classes.includes('subscribe-form-second')
			);
		}

		return null;
	});

	const isHeaderForm = computed(() => {
		const classes = props.modifierClasses;

		if (classes) {
			return classes.includes('header-form');
		}

		return null;
	});

	const isJobsForm = computed(() => {
		const classes = props.modifierClasses;

		if (classes) {
			return classes.includes('jobs-form');
		}

		return null;
	});
</script>

<style scoped lang="scss" src="./style.scss"></style>
