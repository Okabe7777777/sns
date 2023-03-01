<script setup>
import PostList from "../components/PostList.vue";
import PostItem from "../components/PostItem.vue";
import PostUpload from "../components/PostUpload.vue";
import PostDetails from "../components/PostDetails.vue";
import PostActions from "../components/PostActions.vue";
import { onMounted } from "vue";
import { usePostStore } from "../stores/post";
import { useShowPostStore } from "../stores/showPost";

const showPostStore = useShowPostStore();
const postStore = usePostStore();

onMounted(() => {
  postStore.ayLoadAllPosts();
});
</script>

<template>
  <div>
    <PostList>
      <PostItem v-for="post in postStore.list" :post="post" :key="post.id">
        <PostActions
          :likes="post.liked_bies"
          :comments="post.comments"
          :favors="post.favored_bies"
          :likedByMe="post.likedByMe"
          :favoredByMe="post.favoredByMe"
          @likeClick="postStore.ayToggleLike(post.id)"
          @favorClick="postStore.ayToggleFavor(post.id)"
          @commentsClick="postStore.ayShowPostDetails(post.id)"
        />
      </PostItem>
    </PostList>
    <PostDetails v-if="showPostStore.showPostDetails" />
    <PostUpload v-if="showPostStore.showPostUpload" />
  </div>
</template>

<style scoped>
.postActions {
  grid-area: actions;
  justify-self: end;
}
</style>
