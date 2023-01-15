<script setup>
import { ref, reactive, defineProps } from 'vue';
import { useUserStore } from '../stores/users';
import { storeToRefs } from 'pinia';

const userStore = useUserStore();

const { errorMessage } = storeToRefs(userStore);

const { isLogin } = defineProps(['isLogin']);
const useCredentials = reactive({
	email: '',
	password: '',
	username: ''
});
const visible = ref(false);

const showModal = () => {
	visible.value = true;
};

const handleOk = () => {
	userStore.handleSignup(useCredentials);
	// visible.value = false;
};

const title = isLogin ? 'Login' : 'Signup';
</script>

<template>
	<div>
		<a-button type="primary" class="btn" @click="showModal">{{
			title
		}}</a-button>
		<a-modal v-model:visible="visible" :title="title" @ok="handleOk">
			<a-input
				class="input"
				v-if="!isLogin"
				v-model:value="useCredentials.username"
				placeholder="User name"
			/>
			<a-input
				class="input"
				v-model:value="useCredentials.email"
				placeholder="Email"
			/>
			<a-input
				class="input"
				v-model:value="useCredentials.password"
				type="password"
				placeholder="Password"
			/>
			<a-typography-text type="danger" v-if="errorMessage">{{
				errorMessage
			}}</a-typography-text>
		</a-modal>
	</div>
</template>

<style scoped>
.btn {
	margin: 0px 10px;
}
.input {
	margin: 8px 0px;
}
</style>
