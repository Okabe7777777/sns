<script setup>
import TheIcon from "./TheIcon.vue";

defineProps({
  likes: Number,
  comments: Number,
  favors: Number,
  likedByMe: Boolean,
  favoredByMe: Boolean,
});

const emit = defineEmits(["likeClick", "commentsClick", "favorClick"]);
</script>

<template>
  <div class="postActions">
    <TheIcon
      icon="like"
      @click="emit('likeClick')"
      :class="likedByMe ? 'red' : 'white_1'"
    />
    <span>{{ likes || "" }}</span>
    <TheIcon icon="comment" @click="emit('commentsClick')" fill="none" />
    <span>{{ comments || "" }}</span>
    <TheIcon
      icon="favorite"
      @click="emit('favorClick')"
      :class="favoredByMe ? 'yellow' : 'white_2'"
    />
    <span>{{ favors || "" }}</span>
  </div>
</template>

<style scoped>
.white_1 {
  fill: rgb(218, 217, 217);
  transition: all 1s;
}

.white_1:hover {
  fill: red;
}

.red {
  fill: red;
}

.white_2 {
  fill: rgb(218, 217, 217);
  transition: all 1s;
}

.white_2:hover {
  fill: yellow;
}

.yellow {
  fill: yellow;
}

.postActions {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  justify-items: center;
  column-gap: 16px;
  row-gap: 4px;
}

.postActions > svg {
  width: 32px;
  height: 32px;
  grid-row: 1 / 2;
  cursor: pointer;
}

.postActions > span {
  font-size: 14px;
}
</style>
