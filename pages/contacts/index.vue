<template>
	<div class="page-top">
		<BasePageTop
			:data="pageTopData"
			:modifier-classes="['contacts']"
		/>
	</div>
	<div class="contacts">
		<BaseContacts :modifier-classes="['without-mg']" />
	</div>
	<div class="requisites">
		<BaseRequisites :data="requisites" />
	</div>
	<div class="socials">
		<BaseContactSocials />
	</div>
</template>

<script setup lang="ts">
	import { useApiFetch } from '@/composables/use-api-fetch';
	import { useMetaStore } from '@/stores/meta';
	import { handleError } from '@/helpers/handle-error';
	import type { ContactsPageType } from '@/types/pages/contacts-page';
	import BasePageTop from '@/components/base-page-top';
	import BaseContacts from '@/components/base-contacts';
	import BaseRequisites from '@/components/base-requisites';
	import BaseContactSocials from '@/components/base-contact-socials';

	const { data, error } =
		await useApiFetch<ContactsPageType>('page/contacts/');

	if (!data.value) {
		throw handleError({
			statusCode: error.value?.statusCode || 500,
			fatal: true,
			error: error.value,
		});
	}

	const { setMeta } = useMetaStore();

	const meta = data.value.page.meta;

	setMeta(meta);

	const content = data.value.page.content[0];

	const requisites = content.requisites;

	const pageTopData = {
		title: meta.h1,
		breadcrumbs: content.breadcrumbs,
	};
</script>

<style scoped lang="scss">
	.page-top {
		margin-bottom: 80px;

		@include md {
			margin-bottom: 45px;
		}

		@include sm {
			margin-bottom: 15px;
		}
	}

	.contacts {
		margin-bottom: 100px;

		@include md-max {
			margin-bottom: 40px;
		}
	}

	.requisites {
		margin-bottom: 130px;

		@include sm {
			margin-bottom: 60px;
		}
	}

	.socials {
		margin-bottom: 150px;

		@include md {
			margin-bottom: 104px;
		}

		@include sm {
			margin-bottom: 45px;
		}
	}
</style>
