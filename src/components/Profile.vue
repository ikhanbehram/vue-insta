<script setup>
import Container from "../layouts/Container.vue";
import ImageGallary from "./ImageGallary.vue";
import UserBar from "./UserBar.vue";
import { ref, onMounted } from "vue";
import { supabase } from "../supabase";
import { useRoute } from "vue-router";

const posts = ref([]);
const user = ref(null);

const route = useRoute();

const { username } = route.params;

const addNewPost = (post) => {
  posts.value.unshift(post);
};

const fetchData = async () => {
  const {data: userData} = await supabase
    .from("users")
    .select()
    .eq("username", username)
    .single();
  user.value = userData;

  const {data: postsData} = await supabase.from("posts").select("fk_user_id", user.value.id);
};

onMounted(()=>{
  fetchData();
});
</script>

<template>
  <Container>
    <div class="profile-container">
      <UserBar
        :key="username"
        :user="user"
        :addNewPost="addNewPost"
      />
      <ImageGallary :posts="posts" />
    </div>
  </Container>
</template>

<style scoped>
.profile-container {
  display: flex;
  flex-direction: column;
  padding: 10px 0px;
}
</style>
