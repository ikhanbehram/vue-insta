<script setup>
import { supabase } from "../supabase";
import { ref } from "vue";

const visible = ref(false);
const caption = ref("");
const file = ref(null);

const showModal = () => {
  visible.value = true;
};

const handleOk = async() => {
    const fileName = Math.floor(Math.random() * 100000000000);
    if (file.value) {
        await supabase.storage.from("images").upload('public/' + fileName, file.value);
    }
//   visible.value = false;
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
      <input type="file" accept=".jpeg,.png,.jgp" @change="handleChange" />
      <a-input placeholder="Caption" :maxLength="50" v-model:value="caption" />
    </a-modal>
  </div>
</template>
<style scoped>
input {
  margin-top: 10px;
}
</style>
