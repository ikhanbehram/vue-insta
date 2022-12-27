<script setup>
import { ref, defineProps } from 'vue';

const { isLogin } = defineProps(['isLogin']);

const visible = ref(false);

const showModal = () => {
	visible.value = true;
};

const handleOk = (e) => {
	visible.value = false;
};

const title = isLogin ? 'Login' : 'Signup';
</script>

<template>
	<div>
		<a-button type="primary" class="btn" @click="showModal">{{ title }}</a-button>
		<a-modal v-model:visible="visible" :title="title" @ok="handleOk">
			<a-input class="input" v-if="!isLogin" v-model:value="value" placeholder="User Name" />
			<a-input class="input" v-model:value="value" placeholder="Email" />
			<a-input class="input" v-model:value="value" placeholder="Password" />
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
