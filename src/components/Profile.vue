<script setup>
import Container from "../layouts/Container.vue";
import ImageGallary from "./ImageGallary.vue";
import UserBar from "./UserBar.vue";
import { ref, onMounted, watch, reactive } from "vue";
import { supabase } from "../supabase";
import { useRoute } from "vue-router";
import { useUserStore } from "../stores/users";
import { storeToRefs } from "pinia";

const posts = ref([]);
const user = ref(null);
const isFollowing = ref(false);
const loading = ref(false);
const userInfo = reactive({
  posts: null,
  followers: null,
  following: null,
});

const route = useRoute();

const { username } = route.params;
const userStore = useUserStore();
const { user: currentUser } = storeToRefs(userStore);

const addNewPost = (post) => {
  posts.value.unshift(post);
};

const updateIsFollowing = (follow) => {
  isFollowing.value = follow;
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
    .eq("fk_user_id", user.value.id);

  posts.value = postsData;
  await fetchIsFollowing();
  const followersCount = await fetchFollowersCount();
  const followingCount = await fetchFollowingCount();

  userInfo.followers = followersCount;
  userInfo.following = followingCount;
  userInfo.posts = posts.value.length;
  loading.value = false;
};

const fetchFollowersCount = async () => {
  const { count } = await supabase
    .from("followers_following")
    .select("*", { count: "exact" })
    .eq("fk_following_id", user.value.id);
  return count;
};

const fetchFollowingCount = async () => {
  const { count } = await supabase
    .from("followers_following")
    .select("*", { count: "exact" })
    .eq("fk_follower_id", user.value.id);
  return count;
};

const fetchIsFollowing = async () => {
  if (currentUser.value && currentUser.value.id !== user.value.id) {
    const { data } = await supabase
      .from("followers_following")
      .select()
      .eq("fk_follower_id", currentUser.value.id)
      .eq("fk_following_id", user.value.id)
      .single();

    if (data) {
      return (isFollowing.value = true);
    }
  }
};

watch(currentUser, () => {
  fetchIsFollowing();
});

onMounted(() => {
  fetchData();
});
</script>

<template>
  <Container>
    <div class="profile-container" v-if="!loading">
      <UserBar
        :key="username"
        :user="user"
        :userInfo="userInfo"
        :addNewPost="addNewPost"
        :isFollowing="isFollowing"
        :updateIsFollowing="updateIsFollowing"
      />
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
