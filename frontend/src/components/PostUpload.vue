<script setup>
import { usePostStore } from "../stores/post";
import { useShowPostStore } from "../stores/showPost";
import TheButton from "./TheButton.vue";
import TheIcon from "./TheIcon.vue";
import TheModal from "./TheModal.vue";
import { ref } from "vue";

const postStore = usePostStore();
const showPostStore = useShowPostStore();
const imageObjUrl = ref("");

const image = ref(null);
const description = ref("");

async function handleImageUpload(e) {
  const imageFile = e.target.files[0];
  if (imageFile) {
    imageObjUrl.value = URL.createObjectURL(imageFile);
    image.value = imageFile;
  }
}
function publishPost() {
  postStore.ayUploadPost({
    image: image.value,
    description: description.value,
  });
}
</script>

<template>
  <TheModal @close="showPostStore.changeShowPostUpload(false)">
    <div class="postUpload">
      <label class="upload">
        <img v-if="imageObjUrl" :src="imageObjUrl" class="preview" />
        <TheIcon v-else icon="upload-image" />
        <input
          type="file"
          accept="image/*"
          class="fileChooser"
          @change="handleImageUpload"
        />
      </label>
      <div class="postContent">
        <textarea
          placeholder="写点什么吧..."
          class="postContentInput"
          v-model="description"
        ></textarea>
        <TheButton class="pubBtn" @click="publishPost">发布</TheButton>
      </div>
    </div>
  </TheModal>
</template>

<style scoped>
.postUpload {
  width: 50vw;
  height: 70vh;
  display: grid;
  grid-template-rows: 4fr 1fr;
}

.preview {
  width: 100%;
  height: 100%;
  object-fit: cover;
  min-height: 0;
}
.upload {
  display: grid;
  place-items: center;
  cursor: pointer;
  min-height: 0;
}
.upload > svg {
  width: 254px;
  height: 316px;
}

.fileChooser {
  opacity: 0;
  position: absolute;
}

.postContent {
  display: grid;
}
.postContentInput {
  border-bottom: none;
  resize: none;
  padding: 12px 24px;
}

.postContentInput::placeholder {
  color: #757575;
}

.pubBtn {
  align-self: end;
  justify-self: end;
  position: relative;
  right: 24px;
  bottom: 18px;
}
</style>
