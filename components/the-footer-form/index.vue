<template>
	<section
		class="the-footer-form"
		:class="[modifierClasses]"
	>
		<div
			ref="scrollPosEl"
			class="scroll-pos js-the-footer-form__scroll-pos"
		></div>
		<div class="container">
			<div
				v-if="isSuccess"
				class="success"
			>
				<BaseFormSuccessMessage @close="onCloseSuccessMessage" />
			</div>

			<template v-else>
				<h2
					class="title"
					v-html="title"
				></h2>
				<div
					class="caption"
					v-html="caption"
				></div>

				<div class="form-with-author">
					<div class="form">
						<BaseForm
							:scroll-to-el="() => scrollPosEl!"
							:fixed-top="fixedTop"
							:fields="fields"
							:send-url="submitUrl"
							:button-name="buttonName"
							:modifier-classes="['indent-big']"
							:modifier-classes-btn="['sliding-hover']"
							:modifier-classes-theme-btn="
								isGreenButton ? 'third' : null
							"
							:modifier-classes-agree="modifierClassesAgree"
							@success="onShowSuccessMessage"
						/>
					</div>
					<div
						v-if="member"
						class="author"
					>
						<div class="author__pic">
							<img
								v-lazy
								:data-src="member.picture"
								alt="author"
							/>
						</div>
						<div class="author__desc">
							<div class="author__name">
								{{ member.name }}
							</div>
							<div
								v-if="member.position"
								class="author__profession"
							>
								{{ member.position }}
							</div>
							<div
								v-if="memberPreferredSocial"
								class="author__contacts"
							>
								<div
									v-if="member.phone"
									class="author__phone"
								>
									<a :href="`tel:${member.phone.link}`">
										{{ member.phone.name }}
									</a>
								</div>
								<div class="author__social">
									<span class="author__social-name">
										{{ memberPreferredSocial.name }}:
									</span>
									<a
										:href="memberPreferredSocial.link"
										target="_blank"
										class="author__social-link"
									>
										{{ memberPreferredSocial.link_name }}
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</template>
		</div>
	</section>
</template>

<script setup lang="ts">
	import type { PropType } from 'vue';
	import { ref, computed } from 'vue';
	import type { BaseType } from './type';
	import { transformFormFields } from '@/utils/transforms';
	import BaseFormSuccessMessage from '@/components/base-form-succes-message';
	import BaseForm from '@/components/base-form';

	const props = defineProps({
		data: {
			type: Object as PropType<BaseType>,
			required: true,
		},
		fixedTop: {
			type: Number,
			default: 0,
		},
		isGreenButton: {
			type: Boolean,
			default: false,
		},
		modifierClasses: {
			type: Array as PropType<
				| (
						| 'referral-form'
						| 'title-width-smaller'
						| 'caption-width-smaller'
						| 'bg-white'
				  )[]
				| null
			>,
			default: null,
		},
		modifierClassesAgree: {
			type: Array as PropType<'referral-form'[] | null>,
			default: null,
		},
	});

	const modifierClasses = computed(() => {
		return props.modifierClasses?.map((item) => {
			return `the-footer-form_${item}`;
		});
	});

	const modifierClassesAgree = computed(() => {
		return props.modifierClassesAgree;
	});

	const scrollPosEl = ref<HTMLElement>();

	const title = computed(() => {
		return props.data.name;
	});

	const caption = computed(() => {
		// Времено выводим дефолтный текст так как с апи(caption) не коректный текст отдаётся
		// return props.data.caption
		// captionNew используется на странице pages/referral для вывода кастомного caption
		// смотри caption здесь https://dev.medianation.ru/api/v1/page/services/seo/
		return props.data.captionNew || 'Мы поможем вам найти своих клиентов';
	});

	const fields = computed(() => {
		// fix me api
		const transformedFields = transformFormFields(
			props.data.settings.fields,
		);

		const fields = transformedFields.map((field) => {
			if (field.field_name === 'name') {
				field.name = 'Как вас зовут?';
			}

			if (field.field_name === 'site') {
				field.name = 'Ваш сайт';
			}

			if (field.field_name === 'phone') {
				field.name = 'Телефон';
			}

			if (field.field_name === 'email') {
				field.name = 'Почта';
			}

			if (field.field_name === 'comment') {
				field.name =
					'Расскажите, чем вы занимаетесь, какие у вас цели? <br> Нужна конкретная услуга или совет?';
			}

			return field;
		});

		return fields;
	});

	const buttonName = computed(() => {
		return props.data.button_name;
	});

	const submitUrl = computed(() => {
		return props.data.settings.submit;
	});

	const member = computed(() => {
		return props.data.member;
	});

	const memberPreferredSocial = computed(() => {
		const member = props.data.member;

		if (member && member.socials && member.socials.length > 0) {
			const socials = member.socials;
			const social = socials.find((social) => {
				return social.is_preferred === true;
			});

			if (social) {
				const linkName = `@${social.link.replace(/\/$/, '').split('/').pop()}`;

				return {
					name: social.name,
					link: social.link,
					link_name: linkName,
				};
			}
		}

		return null;
	});

	const isSuccess = ref(false);

	const onShowSuccessMessage = () => {
		isSuccess.value = true;
	};

	const onCloseSuccessMessage = () => {
		isSuccess.value = false;
	};
</script>

<style scoped lang="scss" src="./style.scss"></style>
