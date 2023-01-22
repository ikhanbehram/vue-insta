<script setup>
import Container from "../layouts/Container.vue";
import ImageGallary from "./ImageGallary.vue";
import UserBar from "./UserBar.vue";
import { ref } from "vue";

const posts = ref([]);

const addNewPost = (post) => {
  posts.value.unshift(post);
};
</script>

<template>
  <Container>
    <div class="profile-container">
      <UserBar
        :key="$route.params.username"
        username="Behram Khan"
        :userInfo="{
          posts: 4,
          followers: 415,
          following: 200,
        }"
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
