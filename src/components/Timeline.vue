<script setup>
import Container from '../layouts/Container.vue';
import Card from './Card.vue';

const dummyData = [
	{
		id: 0,
		userName: 'OKAY',
		url: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
		caption: 'Okay Caption'
	},
	{
		id: 1,
		userName: 'Perfect',
		url: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
		caption: 'Okay Caption'
	},
	{
		id: 2,
		userName: 'Nice',
		url: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
		caption: 'Okay Caption'
	}
]
</script>

<template>
<Container>
	<div class="timeline-container">
		<Card v-for="post in dummyData" :key="post.id" :post="post"/>
	</div>
</Container>
</template>

<style scoped>
.timeline-container {
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 10px 0px;
}
</style>