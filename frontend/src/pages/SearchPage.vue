<script setup>
import PostList from "../components/PostList.vue";
import PostItem from "../components/PostItem.vue";
import PostDetails from "../components/PostDetails.vue";
import { usePostStore } from "../stores/post";
import { useShowPostStore } from "../stores/showPost";

const showPostStore = useShowPostStore();
const postStore = usePostStore();
</script>

<template>
  <div>
    <h2 class="title">搜索结果：</h2>
    <PostList>
      <PostItem
        v-for="post in postStore.searchResult"
        :post="post"
        :key="post.id"
      />
    </PostList>
    <PostDetails v-if="showPostStore.showPostDetails" />
  </div>
</template>

<style scoped>
.title {
  font-weight: 600;
  font-size: 24px;
  margin-bottom: 44px;
}
</style>
