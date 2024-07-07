<template>
	<div
		class="base-page-top"
		:class="[modifierClasses]"
	>
		<div class="container">
			<div class="breadcrumbs">
				<BaseBreadcrumbs :breadcrumbs="breadcrumbs"></BaseBreadcrumbs>
			</div>
			<div class="row">
				<div
					class="title"
					:class="{ 'has-count': count !== null }"
				>
					<h1>{{ title }}</h1>
					<span
						v-if="count !== null"
						class="count"
					>
						{{ count }}
						<i v-if="newCount">+{{ newCount }}</i>
					</span>
					<span
						v-if="city"
						class="city"
					>
						{{ city }}
					</span>
				</div>
				<div
					v-if="buttonName"
					class="btn"
				>
					<BaseButton
						theme="fifth"
						@click="onClick"
					>
						Подписаться
					</BaseButton>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import type { PropType } from 'vue';
	import { computed } from 'vue';
	import type { BasePageTopType } from './type';
	import BaseBreadcrumbs from '@/components/base-breadcrumbs';
	import BaseButton from '@/components/base-button';

	const emits = defineEmits<{
		(e: 'buttonClicked'): void;
	}>();

	const props = defineProps({
		data: {
			type: Object as PropType<BasePageTopType>,
			required: true,
		},
		modifierClasses: {
			type: Array as PropType<
				| (
						| 'fs-small'
						| 'blog-main'
						| 'blog-sub'
						| 'contacts'
						| 'jobs-detail-page'
						| 'personal-data-page'
						| 'faq-page'
				  )[]
				| null
			>,
			default: null,
		},
	});

	const modifierClasses = computed(() => {
		return props.modifierClasses?.map((item) => {
			return `base-page-top_${item}`;
		});
	});

	const breadcrumbs = computed(() => {
		return props.data.breadcrumbs;
	});

	const title = computed(() => {
		return props.data.title;
	});

	const city = computed(() => {
		return props.data.city;
	});

	const count = computed(() => {
		if (props.data.count !== undefined) {
			return props.data.count;
		}

		return null;
	});

	const newCount = computed(() => {
		return props.data.new_count;
	});

	const buttonName = computed(() => {
		return props.data.button_name;
	});

	const onClick = () => {
		emits('buttonClicked');
	};
</script>

<style scoped lang="scss" src="./style.scss"></style>
