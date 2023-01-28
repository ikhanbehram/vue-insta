<script setup>
import Container from "../layouts/Container.vue";
import ImageGallary from "./ImageGallary.vue";
import UserBar from "./UserBar.vue";
import { ref, onMounted } from "vue";
import { supabase } from "../supabase";
import { useRoute } from "vue-router";

const posts = ref([]);
const user = ref(null);
const loading = ref(false);

const route = useRoute();

const { username } = route.params;

const addNewPost = (post) => {
  posts.value.unshift(post);
};

const fetchData = async () => {
  loading.value = true;
  const { data: userData } = await supabase
    .from("users")
    .select()
    .eq("username", username)
    .single();

  if (!userData) {
    loading.value = false;
    return (user.value = null);
  }
  user.value = userData;

  const { data: postsData } = await supabase
    .from("posts")
    .select()
    .eq('fk_user_id', user.value.id);

  posts.value = postsData;
  loading.value = false;
};

onMounted(() => {
  fetchData();
});
</script>

<template>
  <Container>
    <div class="profile-container" v-if="!loading">
      <UserBar :key="username" :user="user" :addNewPost="addNewPost" />
      <ImageGallary :posts="posts" />
    </div>

    <div class="spinner" v-else>
      <a-spin />
    </div>
  </Container>
</template>

<style scoped>
.profile-container {
  display: flex;
  flex-direction: column;
  padding: 10px 0px;
}
.spinner {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 85vh;
}
</style>
