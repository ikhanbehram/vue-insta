<script setup>
import { defineProps } from 'vue';
import UploadPhotoModal from './UploadPhotoModal.vue';
import { useRoute } from 'vue-router';
import { useUserStore } from '../stores/users';
import { storeToRefs } from 'pinia';

const route = useRoute();
const userStore = useUserStore();

const {user} = storeToRefs(userStore);

const {username: profileUsername} = route.params;

const { username, userInfo } = defineProps(['username', 'userInfo']);
</script>
<template>
	<div class="userbar-container">
		<div class="top-content">
			<a-typography-title :level="2">{{ username }}</a-typography-title>
			<UploadPhotoModal v-if="user && profileUsername === user.username"/>
		</div>
		<div class="bottom-content">
			<a-typography-title :level="5"
				>{{ userInfo.posts }} Posts</a-typography-title
			>
			<a-typography-title :level="5"
				>{{ userInfo.followers }} Followers</a-typography-title
			>
			<a-typography-title :level="5"
				>{{ userInfo.following }} Following</a-typography-title
			>
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
