<script setup>
import Container from '../layouts/Container.vue';
import UserBar from './UserBar.vue';
</script>

<template>
<Container>
	<div class="profile-container">
		<UserBar />
	</div>
</Container>
</template>

<style scoped>
.profile-container {
	display: flex;
	flex-direction: column;
	padding: 10px 0px;
}
</style>