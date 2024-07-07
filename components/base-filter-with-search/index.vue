<template>
	<div
		ref="mainEl"
		class="base-filter-with-search"
		:class="{ active: isFilterVisible }"
	>
		<div class="top">
			<div class="container">
				<div class="top-row">
					<div
						class="filter"
						:class="{
							active: isFilterOpened,
							visible: isFilterVisible,
							fixed: isFilterFixed,
						}"
					>
						<div
							class="close-btn"
							@click="onCloseFilter"
						></div>
						<div class="filter-content">
							<div class="selects">
								<div
									v-for="(item, index) in filterParams"
									:key="index"
									ref="selectEls"
									class="select"
								>
									<div
										class="select__label"
										:class="{
											active: activeIndex === index,
										}"
										@click="onToggleList(index)"
									>
										{{ item.name }}
										<i class="select__label-arrow"></i>
									</div>
									<div
										ref="selectListEls"
										class="select__list"
										:class="{
											active: activeIndex === index,
										}"
									>
										<div
											v-for="(
												childItem, childIndex
											) in item.options"
											:key="childIndex"
											class="select-item"
										>
											<label
												v-if="
													item.field_type ===
													'checkbox'
												"
												class="checkbox"
											>
												<input
													type="checkbox"
													class="checkbox__input"
													:name="`${item.field_name}`"
													:value="childItem.id"
													:checked="
														isChecked({
															type: item.field_type,
															name: item.field_name,
															value: childItem.id,
														})
													"
													@change="
														onChange({
															type: item.field_type,
															name: item.field_name,
															value: childItem.id,
															text: childItem.name,
														})
													"
												/>
												<span
													class="checkbox__icon"
												></span>
												<span class="checkbox__text">
													{{ childItem.name }}
												</span>
											</label>

											<label
												v-else-if="
													item.field_type === 'radio'
												"
												class="radio"
											>
												<input
													type="radio"
													class="radio__input"
													:name="item.field_name"
													:value="childItem.id"
													:checked="
														isChecked({
															type: item.field_type,
															name: item.field_name,
															value: childItem.id,
														})
													"
													@change="
														onChange({
															type: item.field_type,
															name: item.field_name,
															value: childItem.id,
															text: childItem.name,
														})
													"
												/>
												<span class="radio__text">
													{{ childItem.name }}
												</span>
												<span
													class="radio__remove-btn"
													@click.prevent="
														onRemoveChecked({
															type: item.field_type,
															name: item.field_name,
															value: childItem.id,
														})
													"
												></span>
											</label>
										</div>
									</div>
								</div>
							</div>
							<div
								v-if="isHasCheckedFields"
								class="filter-bottom"
							>
								<div class="selected-list-inside-filter">
									<div
										v-for="(objValue, key) in checkedFields"
										:key="key"
										class="selected-checkbox"
									>
										<span class="selected-checkbox__name">
											{{ objValue.text }}
										</span>
										<span
											class="selected-checkbox__remove"
											@click="
												onRemoveChecked({
													type: objValue.type,
													name: objValue.name,
													value: objValue.value,
												})
											"
										></span>
									</div>
								</div>
								<div class="reset-btn-wrap">
									<button
										type="button"
										class="reset-btn"
										@click="onReset"
									>
										Сбросить
									</button>
								</div>
							</div>
						</div>
					</div>
					<div
						v-if="showSearchField"
						ref="searchEl"
						class="search"
						:class="{ active: isSearchOpened }"
					>
						<div class="search__input-wrap">
							<input
								v-model="searchInput"
								type="text"
								class="search__input js-search-booster-input"
								placeholder="Поиск..."
							/>
						</div>
						<button
							type="button"
							class="search__btn"
							@click="onSearch"
						></button>
					</div>
					<div
						class="open-filter-btn"
						@click="onShowFilter"
					>
						Фильтр
					</div>
				</div>
			</div>
		</div>
		<div
			v-if="isHasCheckedFields"
			class="bottom"
		>
			<div class="container">
				<div class="bottom-row">
					<div class="selected-checkboxes">
						<template
							v-for="(objValue, key) in checkedFields"
							:key="key"
						>
							<div class="selected-checkbox">
								<span class="selected-checkbox__name">
									{{ objValue.text }}
								</span>
								<span
									class="selected-checkbox__remove"
									@click="
										onRemoveChecked({
											type: objValue.type,
											name: objValue.name,
											value: objValue.value,
										})
									"
								></span>
							</div>
						</template>
					</div>
					<div class="reset-btn-wrap reset-btn-wrap_hide-md-max">
						<button
							type="button"
							class="reset-btn"
							@click="onReset"
						>
							Сбросить
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import type { PropType } from 'vue';
	import { ref, computed, onMounted, watch } from 'vue';
	import type {
		ValueOfType,
		BaseType,
		BaseElementType,
		BaseCheckedType,
	} from './type';
	import { useHead } from '#imports';
	import { useTimeout } from '@/composables/use-timeout';
	import { useMediaQuery } from '@/composables/use-media-query';
	import { useClickOutside } from '@/composables/use-click-outside';
	import { useEventListener } from '@/composables/use-event-listener';

	const emits = defineEmits<{
		(e: 'change', event: string): void;
	}>();

	const props = defineProps({
		filter: {
			type: Object as PropType<BaseType>,
			required: true,
		},
		showSearch: {
			type: Boolean,
			default: false,
		},
		selectedValues: {
			type: Array as PropType<
				{ field_name: string; field_value: string }[] | null
			>,
			default: null,
		},
	});

	const showSearchField = computed(() => {
		return props.showSearch;
	});

	if (showSearchField.value) {
		useHead(
			{
				script: [
					{
						key: 'search-booster',
						type: 'text/javascript',
						tagPosition: 'bodyClose',
						innerHTML: `(function() {
									!function(e,t,n,c,o){e[o]=e[o]||function(){(e[o].a=e[o].a||[]).push(arguments)},e[o].h=c,e[o].n=o,e[o].i=1*new Date,s=t.createElement(n),a=t.getElementsByTagName(n)[0],s.async=1,s.src=c,a.parentNode.insertBefore(s,a)}(window,document,"script","https://cdn2.searchbooster.net/scripts/v2/init.js","searchbooster"),searchbooster({"apiKey":"8dfd7daa-ea4a-46d8-87f4-65ca55f49168","apiUrl":"//api4.searchbooster.io","optimizeWidget":true,"theme":{"variables":{"color-primary":"#e9330b","color-secondary":"#434343","font-family-primary":"factor a, sans-serif","font-family-secondary":"factor a, sans-serif"}},"completionsRelativePosition":true,"locale":"auto","initialized":function(sb) {
										sb.mount({"selector": ".js-search-booster-input","widget":"completions","options":{}});
									}});
								})();`,
					},
				],
			},
			{
				mode: 'client', // чтобы не было ошибки vue(Hydration node mismatch)
			},
		);
	}

	const filterParams = computed(() => {
		return props.filter.filter((data) => {
			return data.field_type !== 'hidden';
		});
	});

	const searchInput = ref('');
	const activeIndex = ref<number | null>(null);

	const onToggleList = (index: number) => {
		return activeIndex.value === index
			? (activeIndex.value = null)
			: (activeIndex.value = index);
	};

	const timeout = useTimeout();
	const mainEl = ref<HTMLElement>();
	const isSearchOpened = ref(false);
	const isFilterFixed = ref(false);
	const isFilterOpened = ref(false);
	const isFilterVisible = ref(false);

	const onShowFilter = () => {
		isFilterOpened.value = true;
		isFilterVisible.value = true;
		document.body.classList.add('filter-opened');

		if (mainEl.value) {
			const top = mainEl.value.getBoundingClientRect().top;

			if (top === 0) {
				isFilterFixed.value = true;
			} else {
				isFilterFixed.value = false;
			}
		}
	};

	const onCloseFilter = () => {
		isFilterOpened.value = false;
		document.body.classList.remove('filter-opened');

		timeout(() => {
			isFilterVisible.value = false;
		}, 1000); // Время равно времени анимации в css
	};

	const onSearch = () => {
		isSearchOpened.value = true;
	};

	// не переделавать на reactive не будет работать сброс значение в функции onReset
	const checkedFields = ref<BaseCheckedType>({});

	const getKeyField = ({
		type,
		name,
		value,
	}: Omit<ValueOfType<BaseCheckedType>, 'text'>) => {
		// уникальный ключ нужен для получения коректного значения чекбокса
		if (type === 'checkbox') {
			return `${name}${value}`;
		}

		return name;
	};

	const isChecked = ({
		type,
		name,
		value,
	}: Omit<ValueOfType<BaseCheckedType>, 'text'>) => {
		const key = getKeyField({ type, name, value });

		return checkedFields.value[key]?.value === value;
	};

	const onRemoveChecked = ({
		type,
		name,
		value,
	}: Omit<ValueOfType<BaseCheckedType>, 'text'>) => {
		const key = getKeyField({ type, name, value });
		delete checkedFields.value[key];
	};

	const onChange = ({
		type,
		name,
		value,
		text,
	}: ValueOfType<BaseCheckedType>) => {
		const obj = checkedFields.value;
		const key = getKeyField({ type, name, value });

		if (isChecked({ type, name, value })) {
			delete obj[key];
		} else {
			// Удаляем и добавляем новый чтобы новый элемент добавился в конец
			// (вместо перезаписи текушего элемента) условие срабатывает не для чекбокс элементов
			delete obj[key];
			obj[key] = {
				type,
				name,
				value,
				text,
			};
		}
	};

	const onReset = () => {
		checkedFields.value = {};
	};

	const normalizeFieldData = (fieldData: BaseType[0]) => {
		if (fieldData.options !== undefined) {
			return fieldData.options;
		}

		if (fieldData.value !== undefined) {
			return [{ id: fieldData.value, name: fieldData.name }];
		}
	};

	const getSelectedValueData = (
		data: BaseType[0],
		fieldValue: string,
	) => {
		const filterFieldData = normalizeFieldData(data);

		if (filterFieldData) {
			const optionData = filterFieldData.find(
				// тут конвертим заанчения filterItem.id в строку так как fieldValue берется с урла
				// а урл может содержать только строки
				(filterItem) => `${filterItem.id}` === fieldValue,
			);

			if (optionData) {
				return {
					id: optionData.id,
					name: optionData.name,
				};
			}

			return null;
		}
	};

	const fillCheked = () => {
		onReset();
		const obj = checkedFields.value;
		const filterData = props.filter;
		const selectedValues = props.selectedValues;

		if (selectedValues && selectedValues.length > 0) {
			selectedValues.forEach((item) => {
				const fieldName = item.field_name;
				const fieldValue = item.field_value;
				const data = filterData.find(
					(filterItem) => filterItem.field_name === fieldName,
				);

				if (data) {
					const valueData = getSelectedValueData(
						data,
						fieldValue,
					);

					if (valueData) {
						const key = getKeyField({
							type: data.field_type,
							name: data.field_name,
							value: valueData.id,
						});

						obj[key] = {
							type: data.field_type,
							name: data.field_name,
							value: valueData.id,
							text: valueData.name,
						};
					}
				}
			});
		}
	};

	fillCheked();

	const isHasCheckedFields = computed(() => {
		return Object.keys(checkedFields.value).length > 0;
	});

	const sendEventChange = () => {
		const state = checkedFields.value;
		const queryUrl = new URLSearchParams();

		Object.values(state).forEach((fieldData) => {
			queryUrl.append(fieldData.name, `${fieldData.value}`);
		});

		emits('change', queryUrl.toString());
	};

	let isInitialData = false;

	watch(
		() => props.selectedValues,
		() => {
			isInitialData = true;

			fillCheked();
		},
	);

	watch(
		() => checkedFields.value,
		() => {
			if (!isInitialData) {
				sendEventChange();
			}

			isInitialData = false;
		},
		{
			deep: true,
		},
	);

	const mediaQuery = useMediaQuery();
	const listener = useEventListener();
	const clickOutside = useClickOutside();
	const searchEl = ref<HTMLElement>();
	const selectEls = ref<HTMLElement[]>([]);
	const selectListEls = ref<HTMLElement[]>([]);

	const addHeightToSelectLists = () => {
		selectListEls.value.forEach((el) => {
			el.style.maxHeight = 'none';
			el.style.setProperty('--max-height', `${el.offsetHeight}px`);
			el.style.maxHeight = '';
		});
	};

	const closeSelectOnClickOutside = (e: Event) => {
		const selects = selectEls.value;
		// Используем кастомный outside вместо useClickOutside
		// Так как activeIndex должен сбрасываться только если клик произошел за пределами
		// всех селектов
		if (selects.length) {
			let isClickedOnSelect = false;

			selects.forEach((el, index) => {
				if (el.contains(e.target as HTMLElement)) {
					isClickedOnSelect = true;
				}

				const isLastIteration = selects.length - 1 === index;

				if (isLastIteration && !isClickedOnSelect) {
					activeIndex.value = null;
				}
			});
		}
	};

	onMounted(() => {
		mediaQuery('(min-width: 1279px)', (matches) => {
			if (matches) {
				listener(document, 'click', closeSelectOnClickOutside);

				if (searchEl.value) {
					clickOutside(searchEl.value, () => {
						searchInput.value = '';
						isSearchOpened.value = false;
					});
				}
			} else {
				addHeightToSelectLists();
			}
		});

		if (showSearchField.value) {
			/* добавляем путь к стилям для searchBooster из-за shadow root */
			let searchBoosterCounter = 0;

			const searchBoosterAddPathForCustomStyles = () => {
				const searchboosters = document.querySelectorAll(
					'searchbooster-completions',
				);

				// counter нужен чтобы не вызывать бесконечно раз функцию searchBoosterAddPathForCustomStyles
				// Если скрипт поиска searchbooster не загрузится в течение 30 секунд на странице то останавливаем вызов функции searchBoosterAddPathForCustomStyles
				if (searchboosters.length === 0 && searchBoosterCounter < 60) {
					timeout(() => {
						searchBoosterAddPathForCustomStyles();
					}, 500);

					searchBoosterCounter++;
					return;
				}

				Array.from(searchboosters).forEach((searchbooster) => {
					const shadow = searchbooster.shadowRoot;

					const link = document.createElement('link');
					link.setAttribute('rel', 'stylesheet');
					link.setAttribute('type', 'text/css');
					link.setAttribute('href', '/css/shadow-search-booster.css');

					if (shadow) {
						shadow.appendChild(link);
					}
				});
			};

			searchBoosterAddPathForCustomStyles();
		}
	});

	defineExpose<BaseElementType>({
		element: mainEl,
	});
</script>

<style scoped lang="scss" src="./style.scss"></style>
