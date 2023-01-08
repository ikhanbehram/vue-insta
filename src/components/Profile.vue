<script setup>
import Container from '../layouts/Container.vue';
import ImageGallary from './ImageGallary.vue';
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
			<ImageGallary :posts="[
				{
					id: 1,
					image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cmFuZG9tJTIwcGVyc29ufGVufDB8fDB8fA%3D%3D&w=1000&q=80'
				},
				{
					id: 2,
					image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cmFuZG9tJTIwcGVyc29ufGVufDB8fDB8fA%3D%3D&w=1000&q=80'
				}
			]"/>
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
