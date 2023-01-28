<script setup>
import { defineProps } from "vue";
import UploadPhotoModal from "./UploadPhotoModal.vue";
import { useUserStore } from "../stores/users";
import { storeToRefs } from "pinia";
import { supabase } from "../supabase";

const userStore = useUserStore();

const { user: currentUser } = storeToRefs(userStore);

const { user, addNewPost } = defineProps(["user", "addNewPost", "isFollowing"]);

const followUser = async () => {
  await supabase.from("followers_following").insert({
    fk_follower_id: currentUser.value.id,
    fk_following_id: user.id,
  });
};
const unFollowUser = async () => {
  await supabase.from("followers_following").delete({
    fk_follower_id: currentUser.value.id,
    fk_following_id: user.id,
  });
};
</script>
<template>
  <div class="userbar-container" v-if="user">
    <div class="top-content">
      <a-typography-title :level="2">{{ user.username }}</a-typography-title>
      <div v-if="currentUser">
        <UploadPhotoModal
          v-if="currentUser.username === user.username"
          :addNewPost="addNewPost"
        />
        <div v-else>
          <a-button @click="followUser" v-if="!isFollowing">Follow</a-button>
          <a-button @click="unFollowUser" ghost v-else>Following</a-button>
        </div>
      </div>
    </div>
    <!-- <div class="bottom-content">
			<a-typography-title :level="5"
				>{{ user.posts }} Posts</a-typography-title
			>
			<a-typography-title :level="5"
				>{{ user.followers }} Followers</a-typography-title
			>
			<a-typography-title :level="5"
				>{{ user.following }} Following</a-typography-title
			>
		</div> -->
  </div>

  <div class="userbar-container" v-else>
    <div class="top-content">
      <a-typography-title :level="2">user not found</a-typography-title>
    </div>
  </div>
</template>

<style scoped>
.userbar-container {
  padding-bottom: 75px;
}
.top-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.bottom-content {
  display: flex;
  align-items: center;
}
.bottom-content h5 {
  margin: 0 !important;
  padding: 0;
  margin-right: 30px !important;
}
</style>
