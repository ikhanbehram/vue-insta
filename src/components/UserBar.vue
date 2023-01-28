<script setup>
import { defineProps } from 'vue';
import UploadPhotoModal from './UploadPhotoModal.vue';
import { useRoute } from 'vue-router';
import { useUserStore } from '../stores/users';
import { storeToRefs } from 'pinia';

const route = useRoute();
const userStore = useUserStore();

const {user} = storeToRefs(userStore);

const { user: propUser, addNewPost } = defineProps(['user', 'addNewPost']);
</script>
<template>
	<div class="userbar-container" v-if="propUser">
		<div class="top-content">
			<a-typography-title :level="2">{{ propUser.username }}</a-typography-title>
			<UploadPhotoModal v-if="user && propUser.username === user.username" :addNewPost="addNewPost"/>
		</div>
		<div class="bottom-content">
			<a-typography-title :level="5"
				>{{ user.posts }} Posts</a-typography-title
			>
			<a-typography-title :level="5"
				>{{ user.followers }} Followers</a-typography-title
			>
			<a-typography-title :level="5"
				>{{ user.following }} Following</a-typography-title
			>
		</div>
	</div>

	<div class="userbar-container" v-else>
		<div class="top-content">
			<a-typography-title :level="2">user not found</a-typography-title>
			
		</div>
	</div>
</template>

<style scoped>
.userbar-container {
	padding-bottom: 75px;
}
.top-content {
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.bottom-content {
	display: flex;
	align-items: center;
}
.bottom-content h5 {
	margin: 0 !important;
	padding: 0;
	margin-right: 30px !important;
}
</style>
