<script setup>
import PostActions from "./PostActions.vue";
import TheAvatar from "./TheAvatar.vue";
import { dateToRelative } from "../utils/date";
import { usePostStore } from "../stores/post";

defineProps({
  post: {
    type: Object,
    default: {},
  },
});

const postStore = usePostStore();
</script>

<template>
  <div class="postItem">
    <img
      :src="post.image"
      @click="postStore.ayShowPostDetails(post.id)"
      alt=""
      width="100%"
      height="100%"
      style="background: #eee"
    />
    <div class="postInfo">
      <div class="postMeta">
        <TheAvatar :src="post?.user?.avatar" />
        <span>{{ post?.user?.name }}</span>
        <span class="postPubDate">{{ dateToRelative(post.publishedAt) }}</span>
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
      </div>
      <div class="postDesc">
        <p>
          {{ post.description }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.postItem {
  box-shadow: 0px 12px 24px rgba(0, 0, 0, 0.08);
  border-radius: 8px;
}

.postInfo {
  padding: 24px;
}

.postItem > img {
  width: 100%;
  height: 400px;
  object-fit: cover;
  background: #eee;
  cursor: pointer;
}

.postMeta {
  display: grid;
  grid-template-areas:
    "avatar name actions"
    "pubDate pubDate actions";
  grid-template-columns: 42px 1fr 3fr;
  row-gap: 6px;
}

.postMeta .avatar {
  grid-area: avatar;
}

.postMeta .postPubDate {
  grid-area: pubDate;
  color: #9f9f9f;
  font-size: 14px;
}

.postActions {
  grid-area: actions;
  justify-self: end;
}

.postDesc {
  margin-top: 28px;
  white-space: pre-line;
}
</style>
