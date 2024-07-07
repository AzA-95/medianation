<template>
	<section class="base-jobs-advantages">
		<div class="container">
			<h2 class="title">Преимущества работы у нас</h2>

			<div class="grid">
				<div
					v-for="(item, index) in data"
					:key="index"
					class="col"
				>
					<div class="advantage">
						<div class="advantage__pic">
							<img
								v-lazy
								:data-src="item.picture"
								:width="item.picture_params.width"
								:height="item.picture_params.height"
								alt="pic"
							/>
						</div>
						<div class="advantage__desc">
							<div class="advantage__title">{{ item.title }}</div>
							<div class="advantage__text">{{ item.text }}</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
	const globImages = import.meta.glob('./images/*.jpg', {
		eager: true,
	});

	const images = Object.entries(globImages).map(([_, value]) => {
		return (value as { default: unknown }).default;
	});

	// fix me check design for big photos for 4.jpg
	const data = [
		{
			picture: images[0],
			picture_params: {
				width: '400',
				height: '490',
			},
			title: 'Обучаем своих сотрудников',
			text: ` Основной капитал агентства – это квалифицированные
					кадры. Поэтому курсы, тренинги, регулярное
					корпоративное обучение помогают нам быть в курсе
					маркетинговых новинок и успешно внедрять их в
					кампании клиентов.`,
		},
		{
			picture: images[1],
			picture_params: {
				width: '400',
				height: '260',
			},
			title: 'Гибкий график работы',
			text: `Наш главный приоритет в работе – это выполнение клиентских KPI.
					Поэтому вы можете выбрать «плавающий» график работы в офисе с ориентиром на результат.`,
		},
		{
			picture: images[2],
			picture_params: {
				width: '400',
				height: '326',
			},
			title: 'Предоставляем дмс',
			text: `MediaNation имеет договор со страховой компанией,
					которая предлагает бесплатное амбулаторное лечение и госпитализацию
					в десятках медицинских центрах Москвы и Нижнего Новгорода.`,
		},
		{
			picture: images[3],
			picture_params: {
				width: '1400',
				height: '960',
			},
			title: 'Мы ищем тебя если',
			text: `Ты любишь то, что ты делаешь`,
		},
		{
			picture: images[4],
			picture_params: {
				width: '1200',
				height: '864',
			},
			title: 'И конечно же дружная команда',
			text: `Мы собрали команду высококлассных специалистов, которые помимо того, что работают вместе, еще и являются друзьями.
					Мы рады, что создаем атмосферу, которая располагает к искренним теплым чувствам.`,
		},
		{
			picture: images[5],
			picture_params: {
				width: '555',
				height: '565',
			},
			title: 'Обеспечиваем карьерный рост',
			text: `Если у сотрудника есть желание и потенциал для карьерного роста,
					мы обязательно предложим ему варианты, более интересные с точки профессиональных задач и оплаты труда.`,
		},
	];
</script>

<style scoped lang="scss" src="./style.scss"></style>
