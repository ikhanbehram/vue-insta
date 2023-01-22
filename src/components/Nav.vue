<script setup>
import { RouterLink, useRouter } from "vue-router";
import Container from "../layouts/Container.vue";
import { ref } from "vue";
import AuthModal from "./AuthModal.vue";
import { useUserStore } from "../stores/users";
import { storeToRefs } from "pinia";

const userStore = useUserStore();
const { user, userLoading } = storeToRefs(userStore);
const searchUserName = ref("");
const router = useRouter();
const onSearch = () => {
  if (searchUserName.value) {
    router.push(`/profile/${searchUserName.value}`);
    searchUserName.value = "";
  }
};
const onLogout = async () => {
	await userStore.handleLogout();
};
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
        <div class="content" v-if="!userLoading">
          <div class="left-content" v-if="!user">
            <AuthModal :isLogin="false" />
            <AuthModal :isLogin="true" />
          </div>
          <div class="left-content" v-else>
            <a-button type="primary">Profile</a-button>
            <a-button type="primary" ghost @click="onLogout">Logout</a-button>
          </div>
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
.content {
  display: flex;
  align-items: center;
}
.right-content {
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
