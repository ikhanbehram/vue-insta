import { ref } from 'vue';
import { defineStore } from 'pinia';

const validateEmail = (email) => {
	return String(email)
		.toLowerCase()
		.match(
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		);
};

export const useUserStore = defineStore('users', () => {
	const user = ref(null);
	const errorMessage = ref('');

	const handleLogin = () => {};
	const handleSignup = (creds) => {
		const { email, password, username } = creds;

		if (password.length < 6) {
			return (errorMessage.value =
				'Password length is cannot be less than 6 characters');
		}
		if (username.length < 4) {
			return (errorMessage.value = 'Username is too short');
		}
		if (!validateEmail(email)) {
			return (errorMessage.value = 'Not a valid email');
		}
		errorMessage.value = '';
	};
	const handleLogout = () => {};
	const getUser = () => {};

	return {
		user,
		errorMessage,
		handleLogin,
		handleSignup,
		handleLogout,
		getUser
	};
});
