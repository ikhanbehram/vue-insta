<script setup>
import Container from '../layouts/Container.vue';
import UserBar from './UserBar.vue';
</script>

<template>
	<Container>
		<div class="profile-container">
			<UserBar
				username="Behram Khan"
				:userInfo="{
					posts: 4,
					followers: 415,
					following: 200
				}"
			/>
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
