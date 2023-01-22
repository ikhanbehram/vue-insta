<script setup>
import { file } from '@babel/types';
import { ref } from 'vue';

const visible = ref(false);
const caption = ref("");

const showModal = () => {
    visible.value = true;
}

const handleOk = () => {
    visible.value = false;
}

const handleChange = (e) => {
    if (e.target.files[0]) {
        file.value = e.target.files[0]
    }
}
</script>
<template>
  <div>
    <a-button  @click="showModal">Upload Photo</a-button>
    <a-modal v-model:visible="visible" title="Upload Photo" @ok="handleOk">
        <input type="file" accept=".jpeg,.png,.jgp" @change="handleChange"/>
        <a-input placeholder="Caption" :maxLength="50" v-model:value="caption"/>
    </a-modal>
  </div>
</template>
<style scoped>
input {
    margin-top: 10px;
}
</style>