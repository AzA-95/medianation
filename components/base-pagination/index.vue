<template>
	<div class="base-pagination">
		<div class="container">
			<div class="pagination">
				<div class="numbers">
					<button
						v-for="(page, index) in pagination"
						:key="page === '...' ? `${page}${index}` : page"
						class="number"
						:class="{
							loading: isLoadingPage === page,
							active: currentPage === page,
						}"
						@click="changePagination(page)"
					>
						<span>{{ page }}</span>
					</button>
				</div>
				<div
					class="show-more-btn"
					:class="{ 'hide-btn': hideMoreBnt }"
				>
					<button
						:disabled="isShowLoadIndicatorBtn"
						:class="{ loading: isShowLoadIndicatorBtn }"
						@click="loadMore"
					>
						<span>Показать ещё</span>
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import type { PropType } from 'vue';
	import { computed } from 'vue';

	const emits = defineEmits<{
		(e: 'pagination-changed', value: number): void;
		(e: 'load-more'): void;
	}>();

	const props = defineProps({
		nav: {
			type: Object as PropType<{
				current_page: number;
				max_page: number;
			}>,
			required: true,
		},
		isLoadingPage: {
			type: Number as PropType<number | null>, // not detect null type without this
			default: null,
		},
		isShowLoadIndicatorBtn: {
			type: Boolean,
			required: true,
		},
	});

	const isLoadingPage = computed(() => {
		return props.isLoadingPage;
	});

	const isShowLoadIndicatorBtn = computed(() => {
		return props.isShowLoadIndicatorBtn;
	});

	const currentPage = computed(() => {
		return props.nav.current_page;
	});

	const maxPage = computed(() => {
		return props.nav.max_page;
	});

	const hideMoreBnt = computed(() => {
		return currentPage.value === maxPage.value;
	});

	const pagination = computed(() => {
		const result: (number | string)[] = [];
		const activePage = currentPage.value;
		const totalcount = maxPage.value;

		if (totalcount <= 6) {
			for (let i = 1; i <= totalcount; i++) {
				result.push(i);
			}
		} else {
			// Always print first page button
			result.push(1);

			// Print "..." if currentPage is > 3
			if (activePage > 3) {
				result.push('...');
			}

			// special case where last page is selected...
			if (activePage === totalcount) {
				result.push(activePage - 2);
			}

			// Print previous number button if currentPage > 3
			if (activePage > 2) {
				result.push(activePage - 1);
			}

			// Print current page number button as long as it not the first or last page
			if (activePage !== 1 && activePage !== totalcount) {
				result.push(activePage);
			}

			// print next number button if currentPage < lastPage - 3
			if (activePage < totalcount - 1) {
				result.push(activePage + 1);
			}

			// special case where first page is selected...
			if (activePage === 1) {
				result.push(activePage + 2);
			}

			// print "..." if currentPage is < lastPage -2
			if (activePage < totalcount - 2) {
				result.push('...');
			}

			// Always print last page button if there is more than 1 page
			if (totalcount > 1) {
				result.push(totalcount);
			}
		}

		return result;
	});

	const changePagination = (page: string | number) => {
		if (page !== '...' && page !== currentPage.value) {
			emits('pagination-changed', page as number);
		}
	};

	const loadMore = () => {
		if (currentPage.value !== maxPage.value) {
			emits('load-more');
		}
	};
</script>

<style scoped lang="scss" src="./style.scss"></style>
