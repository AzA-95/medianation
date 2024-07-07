<template>
	<component
		:is="tag"
		:type="type ? type : null"
		:to="to ? to : null"
		:target="target ? target : null"
		:external="isExternal ? true : null"
		class="base-button"
		:class="[
			theme,
			modifierClasses,
			{
				loading: isLoading,
			},
			{
				'has-theme': theme,
			},
		]"
	>
		<span>
			<slot></slot>
		</span>
		<span
			v-if="slots['right-icon']"
			class="right-icon"
		>
			<slot name="right-icon"></slot>
		</span>

		<i
			v-if="isLoading"
			class="loading-icon"
		></i>
	</component>
</template>

<script setup lang="ts">
	import type { NuxtLinkProps } from 'nuxt/app';
	import type { PropType } from 'vue';
	import { computed, resolveComponent, useSlots } from 'vue';

	const slots = useSlots();

	const props = defineProps({
		type: {
			type: String as PropType<'button' | 'reset' | 'submit'>,
			default: 'button',
		},
		theme: {
			type: String as PropType<
				| 'second'
				| 'third'
				| 'fourth'
				| 'fifth'
				| 'sixth'
				| 'seventh'
				| null
			>,
			default: null,
		},
		modifierClasses: {
			type: Array as PropType<
				('sliding-hover' | 'without-default-hover')[] | null
			>,
			default: null,
		},
		loading: {
			type: Boolean,
			default: false,
		},
		link: {
			type: Object as PropType<Pick<
				NuxtLinkProps,
				'to' | 'target' | 'external' | 'rel' | 'noRel'
			> | null>,
			default: null,
		},
	});

	const tag = computed(() => {
		return props.link?.to ? resolveComponent('NuxtLink') : 'button';
	});

	const type = computed(() => {
		const isLink = props.link?.to;
		return isLink ? null : props.type;
	});

	const theme = computed(() => {
		const themeName = props.theme;

		return themeName ? `base-button_theme-${themeName}` : null;
	});

	const modifierClasses = computed(() => {
		return props.modifierClasses?.map((item) => {
			return `base-button_${item}`;
		});
	});

	const isLoading = computed(() => {
		return props.loading;
	});

	const to = computed(() => {
		return props.link?.to;
	});

	const target = computed(() => {
		return props.link?.target;
	});

	const isExternal = computed(() => {
		return props.link?.external;
	});
</script>

<style scoped lang="scss" src="./style.scss"></style>
