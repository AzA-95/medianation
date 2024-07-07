<template>
	<div class="base-requisites">
		<div class="container">
			<div class="title">Реквизиты</div>
			<div class="row">
				<div class="col">
					<div class="caption">{{ ruTitle }}</div>
					<div
						v-for="(item, index) in ruItems"
						:key="index"
						class="field"
					>
						<div class="term">{{ item.name }}</div>
						<div class="value">{{ item.text }}</div>
					</div>
				</div>
				<div class="col">
					<div class="caption">{{ enTitle }}</div>
					<div
						v-for="(item, index) in enItems"
						:key="index"
						class="field"
					>
						<div class="term">{{ item.name }}</div>
						<div class="value">{{ item.text }}</div>
					</div>
				</div>
			</div>
			<a
				:href="link"
				target="_blank"
				class="download"
			>
				Скачать реквизиты
			</a>
		</div>
	</div>
</template>

<script setup lang="ts">
	import type { PropType } from 'vue';
	import { computed } from 'vue';

	const props = defineProps({
		data: {
			type: Object as PropType<BaseRequisitesType>,
			required: true,
		},
	});

	const ruTitle = computed(() => {
		return props.data.ru.name;
	});

	const ruItems = computed(() => {
		return props.data.ru.items;
	});

	const enTitle = computed(() => {
		return props.data.en.name;
	});

	const link = computed(() => {
		return props.data.link;
	});

	const enItems = computed(() => {
		return props.data.en.items;
	});
</script>

<style scoped lang="scss" src="./style.scss"></style>
