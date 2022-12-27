<script setup>
import { RouterLink } from 'vue-router';
import Container from '../layouts/Container.vue';
import { ref } from 'vue';
import AuthModal from './AuthModal.vue';

const searchUserName = ref('');
const isAuthenticated = ref(false);

const onSearch = () => {};
</script>

<template>
	<a-layout-header>
		<Container>
			<div class="nav-container">
				<div class="right-content">
					<RouterLink to="/">instagram</RouterLink>
					<a-input-search
						v-model:value="searchUserName"
						placeholder="@username"
						style="width: 200px"
						@search="onSearch"
					/>
				</div>
				<div class="left-content" v-if="!isAuthenticated">
					<AuthModal :isLogin="false"/>
					<AuthModal :isLogin="true"/>
				</div>
				<div class="left-content" v-else>
					<a-button type="primary">Profile</a-button>				
					<a-button type="primary" ghost>Logout</a-button>				
				</div>
			</div>
		</Container>
	</a-layout-header>
</template>

<style scoped>
.nav-container {
	display: flex;
	justify-content: space-between;
}

.right-content{
	display: flex;
	align-items: center;
}

.right-content a {
	margin: 0px 10px;
}

.left-content {
	display: flex;
	align-items: center;
}
.left-content button {
	margin: 10px 0px;
}
</style>
