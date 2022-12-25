<script setup>
import { RouterLink } from 'vue-router';
import Container from '../layouts/Container.vue';
import { ref } from 'vue';

const searchUserName = ref('');

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
				<div class="left-content">
					<a-button type="primary">Signup</a-button>
					<a-button type="primary" ghost>Login</a-button>
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

.left-content button{
	margin: 0px 10px;
}
</style>
