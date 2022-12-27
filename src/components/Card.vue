<script setup>
import { defineProps } from 'vue';
const { post } = defineProps(['post']);
</script>

<template>
	<a-card hoverable class="card">
		<template #cover>
			<img alt="example" :src="post.url" />
		</template>
		<a-card-meta :title="post.userName">
			<template #description>{{ post.caption }}</template>
		</a-card-meta>
	</a-card>
</template>
<style scoped>
.card {
	width: 240px;
	margin-bottom: 20px;
}
</style>
