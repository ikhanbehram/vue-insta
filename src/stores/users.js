import { ref } from 'vue';
import { defineStore } from 'pinia';
import { supabase } from '../supabase';

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
	const loading = ref(false);

	const handleLogin = () => {};
	const handleSignup = async (creds) => {
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
		loading.value = true;

		const { data: userWithUsername } = await supabase
			.from('users')
			.select()
			.eq('username', username)
			.single();

		if (userWithUsername) {
			loading.value = false;
			return errorMessage.value = "User already resgistered";
		}
		const { error } = await supabase.auth.signUp({
			email,
			password
		});
		
		if (error) {
			loading.value = false;
			return (errorMessage.value = error.message);
		}
		
		await supabase.from('users').insert({
			username,
			email
		});
		
		loading.value = false;
		errorMessage.value = '';
	};
	const handleLogout = () => {};
	const getUser = () => {};

	return {
		user,
		errorMessage,
		loading,
		handleLogin,
		handleSignup,
		handleLogout,
		getUser
	};
});
