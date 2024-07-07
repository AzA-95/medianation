<template>
	<div
		ref="rootEl"
		class="base-form"
		:class="[modifierClasses]"
	>
		<form
			ref="formEl"
			class="form"
			action="#"
			novalidate
			@submit="onSubmit"
		>
			<div
				v-if="errorText"
				class="top-error"
				v-html="errorText"
			></div>

			<div
				v-if="showTabBtns"
				class="tab-btns"
			>
				<div
					class="tab-btn"
					:class="{ active: activeTabBtn === 1 }"
					@click="onChangeActiveTabBtn(1)"
				>
					{{ tabBtns[0] }}
				</div>
				<div
					class="tab-btn"
					:class="{ active: activeTabBtn === 2 }"
					@click="onChangeActiveTabBtn(2)"
				>
					{{ tabBtns[1] }}
				</div>
			</div>

			<div class="fields">
				<template
					v-for="(field, index) in baseInputFields"
					:key="index"
				>
					<div
						class="field"
						:class="{
							'js-field-has-error': errors[field.field_name],
						}"
					>
						<BaseInput
							v-model="field.validate_model.value"
							:label="field.name"
							:name="field.field_name"
							:required="field.required"
							v-bind="field.validate_attrs.value"
							:modifier-classes="modifierClassesInput"
						/>
					</div>
				</template>

				<div
					v-if="commentField"
					class="field field_with-file"
					:class="{
						'js-field-has-error': errors[commentField.field_name],
					}"
				>
					<div class="field-with-file-wrapper">
						<BaseTextarea
							v-model="commentField.validate_model.value"
							:label="commentField.name"
							:name="commentField.field_name"
							:required="commentField.required"
							:modifier-classes="
								isJobsForm
									? ['with-file-resume']
									: ['with-file']
							"
							v-bind="commentField.validate_attrs.value"
						/>

						<div
							v-if="fileField && !errors[commentField.field_name]"
							class="file-input"
							:class="{ 'file-input_jobs': isJobsForm }"
						>
							<template v-if="!isJobsForm">
								<BaseFileInput
									:name="fileField.field_name"
									:multiple="fileField.multiple"
									:accept="acceptFileType"
									:disabled="disableSelectFiles"
									:selected="selectedFiles.length > 0"
									@change="onFileSelected"
								/>
							</template>
							<template v-else>
								<BaseFileInputResume
									:name="fileField.field_name"
									:multiple="fileField.multiple"
									:accept="acceptFileType"
									:disabled="disableSelectFiles"
									:selected="selectedFiles.length > 0"
									@change="onFileSelected"
								/>
							</template>
						</div>
					</div>

					<template
						v-if="fileField && !errors[commentField.field_name]"
					>
						<div
							v-if="
								fileField.max_count && fileField.max_size_print
							"
							class="field-file-info"
						>
							Вы можете загрузить до
							{{ fileField.max_count }}
							документов общим весом до
							{{ fileField.max_size_print }}
						</div>

						<div class="selected-file-list">
							<div
								v-for="(item, index) in selectedFiles"
								:key="index"
								class="selected-file-list__item"
							>
								<span class="selected-file-list__name">
									{{ item.name }}
								</span>
								<span class="selected-file-list__size">
									{{ formatBytes(item.size) }}
								</span>
								<i
									class="selected-file-list__remove"
									@click="onRemoveFile(index)"
								></i>
							</div>
						</div>

						<template v-if="errorFileMessages">
							<div
								v-for="(error, index) in errorFileMessages"
								:key="index"
								class="file-error"
								v-html="error"
							></div>
						</template>
					</template>
				</div>

				<template v-if="pageUrlField">
					<input
						v-model="pageUrl"
						type="hidden"
						:name="pageUrlField.field_name"
					/>
				</template>

				<template v-if="utmsFields">
					<input
						v-for="(field, index) in utmsFields"
						:key="index"
						type="hidden"
						:name="field.field_name"
						:value="field.field_value"
					/>
				</template>

				<template v-if="analyticsFields">
					<input
						v-for="(field, index) in analyticsFields"
						:key="index"
						type="hidden"
						:name="field.field_name"
						:value="field.field_value"
					/>
				</template>
			</div>
			<div class="btn">
				<BaseButton
					type="submit"
					:disabled="isSubmitting"
					:loading="isSending"
					:theme="modifierClassesThemeBtn"
					:modifier-classes="modifierClassesBtn"
				>
					<template v-if="showTabBtns">
						{{ tabBtns[activeTabBtn - 1] }}
					</template>
					<template v-else>{{ buttonName }}</template>
				</BaseButton>
			</div>
			<div class="agree">
				<BaseAgreeCondition :modifier-classes="modifierClassesAgree" />
			</div>
		</form>
	</div>
</template>

<script setup lang="ts">
	import type { PropType } from 'vue';
	import { ref, toRef, computed, onMounted, shallowRef, nextTick } from 'vue';
	import { useForm } from 'vee-validate';
	import type {
		FieldType,
		FileFieldType,
		FormResponseType,
	} from '@/types/forms';
	import { useApiOnInteraction } from '@/composables/use-api-on-interaction';
	import {
		scrollTo as scrollToUi,
		isElementFullInViewport,
	} from '@/utils/ui';
	import { isOnline, formatBytes } from '@/utils/common';
	import { isValidEmail, validateFiles } from '@/utils/validations';
	import { useUtmsStore } from '@/stores/utms';
	import { useAnalyticsStore } from '@/stores/analytics';
	import {
		UTM_FIELD_NAMES,
		ANALYTIC_FIELD_NAMES,
		PAGE_URL_FIELD_NAME,
	} from '@/constants';
	import BaseInput from '@/components/base-input';
	import BaseTextarea from '@/components/base-textarea';
	import BaseFileInput from '@/components/base-file-input';
	import BaseFileInputResume from '@/components/base-file-input-resume';
	import BaseButton from '@/components/base-button';
	import BaseAgreeCondition from '@/components/base-agree-condition';

	const emits = defineEmits<{
		(e: 'success'): void;
	}>();

	const props = defineProps({
		scrollableEl: {
			type: Function as PropType<() => HTMLElement | null>,
			default: null,
		},
		scrollToEl: {
			type: [String, Function] as PropType<(() => HTMLElement) | string>,
			required: true,
		},
		fixedTop: {
			type: Number,
			default: 0,
		},
		showTabBtns: {
			type: Boolean,
			default: false,
		},
		fields: {
			type: Array as PropType<(FieldType | FileFieldType)[]>,
			required: true,
		},
		buttonName: {
			type: String,
			default: 'Оставить заявку',
		},
		sendUrl: {
			type: String,
			required: true,
		},
		modifierClasses: {
			type: Array as PropType<
				('indent-big' | 'subscribe-form' | 'jobs-form')[] | null
			>,
			default: null,
		},
		modifierClassesInput: {
			type: Array as PropType<'light'[] | null>,
			default: null,
		},
		modifierClassesThemeBtn: {
			type: String as PropType<'third' | 'fifth' | null>,
			default: null,
		},
		modifierClassesBtn: {
			type: Array as PropType<'sliding-hover'[] | null>,
			default: null,
		},
		modifierClassesAgree: {
			type: Array as PropType<
				| (
						| 'subscribe-form'
						| 'subscribe-form-second'
						| 'jobs-form'
						| 'referral-form'
						| 'header-form'
				  )[]
				| null
			>,
			default: null,
		},
	});

	const modifierClasses = computed(() => {
		return props.modifierClasses?.map((item) => {
			return `base-form_${item}`;
		});
	});

	const isJobsForm = computed(() => {
		return props.modifierClasses?.includes('jobs-form');
	});

	const rootEl = ref<HTMLElement>();

	const buttonName = toRef(() => props.buttonName);
	const showTabBtns = toRef(() => props.showTabBtns);
	const tabBtns = ref(['Оставить заявку', 'Пригласить в тендер']);
	const activeTabBtn = ref(1);

	const onChangeActiveTabBtn = (val: number) => {
		activeTabBtn.value = val;
	};

	const fields = computed(() => {
		return props.fields;
	});

	const validationSchema = computed(() => {
		if (fields.value.length) {
			const res: Record<string, (val: string) => string | true> = {};

			fields.value.forEach((field) => {
				const fieldName = field.field_name;
				const blackListType = ['hidden', 'file'];

				if (!blackListType.includes(field.type)) {
					const isRequiredField = field.required;

					if (field.type === 'email') {
						res[fieldName] = (value: string) => {
							if (isRequiredField && !value) {
								return 'Нужно заполнить это поле';
							}

							if (value && !isValidEmail(value)) {
								return 'Заполните корректно поле';
							}

							return true;
						};
					} else if (isRequiredField) {
						res[fieldName] = (value: string) => {
							return value ? true : 'Нужно заполнить это поле';
						};
					}
				}
			});

			return res;
		}

		return {};
	});

	const {
		errors,
		setFieldError,
		defineField,
		handleSubmit,
		isSubmitting,
		resetForm,
	} = useForm({
		validationSchema,
	});

	const baseInputFields = computed(() => {
		if (fields.value.length) {
			return fields.value
				.filter((field): field is FieldType & { name: string } => {
					const blackListType = ['hidden', 'file', 'textarea'];

					if (field.name && !blackListType.includes(field.type)) {
						return true;
					}

					return false;
				})
				.map((field) => {
					const [fieldVModel, fieldAttrs] = defineField(
						field.field_name,
						{
							props: (state) => ({ error: state.errors[0] }),
						},
					);

					return {
						...field,
						validate_model: fieldVModel,
						validate_attrs: fieldAttrs,
					};
				});
		}

		return null;
	});

	const commentField = computed(() => {
		if (fields.value.length) {
			const field = fields.value.find(
				(field): field is FieldType & { name: string } => {
					if (field.type === 'textarea' && field.name) {
						return true;
					}

					return false;
				},
			);

			if (field) {
				const [fieldVModel, fieldAttrs] = defineField(
					field.field_name,
					{
						props: (state) => ({ error: state.errors[0] }),
					},
				);

				return {
					...field,
					validate_model: fieldVModel,
					validate_attrs: fieldAttrs,
				};
			}
		}

		return null;
	});

	const fileField = computed(() => {
		if (fields.value.length) {
			return fields.value.find((field): field is FileFieldType => {
				return field.type === 'file';
			});
		}

		return null;
	});

	const acceptFileType = computed(() => {
		return fileField.value?.file_types.map((name) => `.${name}`).toString();
	});

	const errorFileMessages = ref<string[]>([]);
	const selectedFiles = shallowRef<File[]>([]);

	const disableSelectFiles = computed(() => {
		return selectedFiles.value.length === (fileField.value?.max_count || 1);
	});

	const onFileSelected = (e: Event) => {
		const inputFile = e.target as HTMLInputElement;
		const files = inputFile.files;
		const fileFieldData = fileField.value!;

		errorFileMessages.value = [];

		if (files?.length) {
			const { hasError, errorMessages, hasValidFiles, validFiles } =
				validateFiles([...selectedFiles.value, ...files], {
					maxFilesCount: fileFieldData.max_count || 1,
					maxFileSize: fileFieldData.max_size,
					maxFileSizeAll: fileFieldData.max_size_all,
					allowedExtensions: fileFieldData.file_types,
				});

			if (hasError) {
				errorFileMessages.value = errorMessages!;

				// Выполняется когда выбрали несколько файлов и какойта файл или файлы в списке
				// с неправильным расширением или с превышающем размером
				if (hasValidFiles) {
					selectedFiles.value = [...validFiles!];
				}
			} else {
				selectedFiles.value = [...selectedFiles.value, ...files];
			}

			// reset selected file
			inputFile.value = '';
		}
	};

	const onRemoveFile = (index: number) => {
		selectedFiles.value = selectedFiles.value.filter(
			(_, loopIndex) => index !== loopIndex,
		);

		errorFileMessages.value = [];
	};

	const pageUrlField = computed(() => {
		if (fields.value.length) {
			return fields.value.find((field): field is FieldType => {
				if (field.field_name === PAGE_URL_FIELD_NAME) {
					return true;
				}

				return false;
			});
		}

		return null;
	});

	const utmsStore = useUtmsStore();

	const utmsFields = computed(() => {
		const utms = utmsStore.utms;

		if (fields.value.length) {
			return fields.value
				.filter(
					(
						field,
					): field is FieldType & {
						field_name: keyof typeof utms;
					} => {
						if (
							(UTM_FIELD_NAMES as readonly string[]).includes(
								field.field_name,
							)
						) {
							return true;
						}

						return false;
					},
				)
				.map((field) => {
					return {
						...field,
						field_value: utms[field.field_name],
					};
				});
		}

		return null;
	});

	const analyticsStore = useAnalyticsStore();

	const analyticsFields = computed(() => {
		const analytics = analyticsStore.analytics;

		if (fields.value.length) {
			return fields.value
				.filter(
					(
						field,
					): field is FieldType & {
						field_name: keyof typeof analytics;
					} => {
						if (
							(
								ANALYTIC_FIELD_NAMES as readonly string[]
							).includes(field.field_name)
						) {
							return true;
						}

						return false;
					},
				)
				.map((field) => {
					return {
						...field,
						field_value: analytics[field.field_name],
					};
				});
		}

		return null;
	});

	const formEl = ref<HTMLFormElement>();

	const submitUrl = computed(() => {
		return props.sendUrl;
	});

	const scrollTo = (to: string | HTMLElement, top = 0) => {
		const spaceTop = top - props.fixedTop;
		const scrollableEl = props.scrollableEl ? props.scrollableEl() : null;

		if (scrollableEl) {
			scrollToUi({
				scrollableEl,
				to,
				top: spaceTop,
			});
		} else {
			scrollToUi({
				to,
				top: spaceTop,
			});
		}
	};

	const scrollToErrorField = () => {
		const spaceTop = props.fixedTop;

		nextTick(() => {
			// Тут можно было бы ссылаться по name полю инпута взяв отсюда errors[field_name] первый элемент по ключу
			// Но там объект ошибок(С именем поля) хранится не по порядку по этой причине используем js класс
			const firstErrorEl = rootEl.value!.querySelector(
				'.js-field-has-error',
			) as HTMLElement;

			if (!firstErrorEl) return;

			const scrollableEl = props.scrollableEl
				? props.scrollableEl()
				: null;

			if (
				!isElementFullInViewport(firstErrorEl, scrollableEl, spaceTop)
			) {
				scrollTo(firstErrorEl, -40);
			}
		});
	};

	const errorText = ref('');

	const success = () => {
		emits('success');

		const scrollableEl = props.scrollableEl ? props.scrollableEl() : null;
		const parent = scrollableEl || document;

		const scrollToEl = props.scrollToEl;
		const to =
			typeof scrollToEl === 'string'
				? parent.querySelector(scrollToEl)
				: scrollToEl();

		const top = to!.getBoundingClientRect().top;

		if (top < 0) {
			scrollTo(to as HTMLElement);
		}
	};

	const resetErrorText = () => {
		errorText.value = '';
	};

	const showError = (error: string) => {
		errorText.value = error;

		const scrollableEl = props.scrollableEl ? props.scrollableEl() : null;
		const parent = scrollableEl || document;

		const scrollToEl = props.scrollToEl;
		const to =
			typeof scrollToEl === 'string'
				? parent.querySelector(scrollToEl)
				: scrollToEl();

		const top = to!.getBoundingClientRect().top;

		if (top < 0) {
			scrollTo(to as HTMLElement);
		}
	};

	const isSending = ref(false);

	const onSubmit = handleSubmit(
		async () => {
			isSending.value = true;

			const formData = new FormData(formEl.value);

			const fieldNameOfFieldFile = fileField.value?.field_name;

			// Удаляем потому что файлы добавляется с масива selectedFiles
			formData.delete(`${fieldNameOfFieldFile}`);

			selectedFiles.value.forEach((file) => {
				formData.append(`${fieldNameOfFieldFile}[]`, file, file.name);
			});

			try {
				const result = await useApiOnInteraction<FormResponseType>(
					submitUrl.value,
					{
						method: 'post',
						body: formData,
						baseURL: undefined,
					},
				);

				if (result.success) {
					selectedFiles.value = [];

					success();
					resetErrorText();
					resetForm();

					// @ts-ignore: Unreachable code error
					window.dataLayer?.push({
						event: 'CommonEventGA',
						eventCategory: 'common-ga-send-order',
						eventAction: 'medianation.ru',
						orderId: result.id,
					});
				} else {
					const fileFieldName = fileField.value?.field_name;

					result.error_fields!.forEach((fieldName) => {
						if (fieldName === fileFieldName) {
							errorFileMessages.value = [
								result.error_messages![fileFieldName] || '',
							];

							return;
						}

						setFieldError(fieldName, 'Заполните корректно поле');
					});

					if (result.error_fields!.length && !result.error_message) {
						scrollToErrorField();
					}

					if (result.error_message) {
						showError(result.error_message);
					}
				}
			} catch (error) {
				let errorText =
					'Временная ошибка на сервере. Повторите попытку чуть позже';

				if (!isOnline()) {
					errorText =
						'Проверьте подключение к интернету и повторите попытку еще раз';
				}

				showError(errorText);
			}

			isSending.value = false;
		},
		() => {
			scrollToErrorField();
		},
	);

	const pageUrl = ref('');

	onMounted(() => {
		pageUrl.value = window.location.href;
	});
</script>

<style scoped lang="scss" src="./style.scss"></style>
