<script setup>
import PostList from "../components/PostList.vue";
import PostItem from "../components/PostItem.vue";
import { useRoute } from "vue-router";
import { usePostStore } from "../stores/post";

const postStore = usePostStore();
const searchResult = postStore.searchResult;

const route = useRoute();
const term = computed(() => route.params.term);
</script>

<template>
  <div>
    <h2 class="title">搜索结果：{{ term }}</h2>
    <PostList>
      <PostItem v-for="post in searchResult" :post="post"> </PostItem>
    </PostList>
  </div>
</template>

<style scoped>
.title {
  font-weight: 600;
  font-size: 24px;
  margin-bottom: 44px;
}
</style>
