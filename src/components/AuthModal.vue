<script setup>
import { ref, reactive, defineProps } from "vue";
import { useUserStore } from "../stores/users";
import { storeToRefs } from "pinia";

const userStore = useUserStore();

const { errorMessage, user, loading } = storeToRefs(userStore);

const { isLogin } = defineProps(["isLogin"]);
const useCredentials = reactive({
  email: "",
  password: "",
  username: "",
});
const visible = ref(false);

const clearUserInputs = () => {
  useCredentials.email = "";
  useCredentials.password = "";
  useCredentials.username = "";
  userStore.clearErrorMessage();
};

const showModal = () => {
  visible.value = true;
};

const handleOk = async () => {
  if (isLogin) {
    console.log("HERE");
    await userStore.handleLogin({
      password: useCredentials.password,
      email: useCredentials.email
    });
  } else {
    await userStore.handleSignup(useCredentials);
  }
  if (user.value) {
    visible.value = false;
    clearUserInputs();
  }
};
const handleCancel = () => {
  visible.value = false;
  clearUserInputs();
};

const title = isLogin ? "Login" : "Signup";
</script>

<template>
  <div>
    <a-button type="primary" class="btn" @click="showModal">{{
      title
    }}</a-button>
    <a-modal v-model:visible="visible" :title="title">
      <template #footer>
        <a-button key="back" @click="handleCancel">Cancel</a-button>
        <a-button
          key="submit"
          type="primary"
          :loading="loading"
          @click="handleOk"
          :disabled="loading"
          >Submit</a-button
        >
      </template>
      <div>
        <a-input
          class="input"
          v-if="!isLogin"
          v-model:value="useCredentials.username"
          placeholder="User name"
          :disabled="loading"
        />
        <a-input
          class="input"
          v-model:value="useCredentials.email"
          placeholder="Email"
          :disabled="loading"
        />
        <a-input
          class="input"
          v-model:value="useCredentials.password"
          type="password"
          placeholder="Password"
          :disabled="loading"
        />
      </div>
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
