<script setup>
import { supabase } from "../supabase";
import { ref } from "vue";
import { useUserStore } from "../stores/users";
import { storeToRefs } from "pinia";

const userStore = useUserStore();

const { user } = storeToRefs(userStore);

const visible = ref(false);
const caption = ref("");
const file = ref(null);
const loading = ref(false);
const errorMsg = ref("");

const showModal = () => {
  visible.value = true;
};

const handleOk = async () => {
  loading.value = true;
  const fileName = Math.floor(
    Math.random() * 100000000000000000000000000000000000
  );
  if (file.value) {
    const { data, error } = await supabase.storage
      .from("images")
      .upload("public/" + fileName, file.value);
    if (error) {
      loading.value = false;
      return (errorMsg.value = "Unable to upload photo");
    }
    await supabase.from("posts").insert({
      url: data.path,
      caption: caption.value,
      fk_user_id: user.value.id,
    });
  }
  loading.value = false;
  visible.value = false;
  caption.value = "";
};

const handleChange = (e) => {
  if (e.target.files[0]) {
    file.value = e.target.files[0];
  }
};
</script>
<template>
  <div>
    <a-button @click="showModal">Upload Photo</a-button>
    <a-modal v-model:visible="visible" title="Upload Photo" @ok="handleOk">
      <div v-if="!loading">
        <input type="file" accept=".jpeg,.png,.jgp" @change="handleChange" />
        <a-input
          placeholder="Caption"
          :maxLength="50"
          v-model:value="caption"
        />
        <a-typography-text v-if="errorMsg" type="danger">{{
          errorMsg
        }}</a-typography-text>
      </div>
      <div class="spinner-wrapper" v-else>
        <a-spin />
      </div>
    </a-modal>
  </div>
</template>
<style scoped>
.spinner-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}
input {
  margin-top: 10px;
}
</style>
