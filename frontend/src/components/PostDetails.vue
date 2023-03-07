<script setup>
import { dateToRelative } from "../utils/date";
import { ref } from "vue";
import PostActions from "./PostActions.vue";
import TheAvatar from "./TheAvatar.vue";
import TheModal from "./TheModal.vue";
import { usePostStore } from "../stores/post";
import { useCommentStore } from "../stores/comment";
import { storeToRefs } from "pinia";

const content = ref("");

const postStore = usePostStore();
const commentStore = useCommentStore();
const { postDetails } = storeToRefs(postStore);
const { postComments } = storeToRefs(commentStore);

async function addComment() {
  if (content.value.trim()) {
    await commentStore.ayAddComment({
      content: content.value,
      postId: postDetails.value.id,
    });
    content.value = "";
  }
}
</script>

<template>
  <TheModal @close="postStore.ayHidePostDetails()">
    <div class="postDetails">
      <img :src="postDetails.image" alt="" class="postImage" />
      <div class="postMeta">
        <div class="author">
          <TheAvatar :src="postDetails.user?.avatar" />
          <span>{{ postDetails.user?.name }}</span>
        </div>
        <pre class="postDesc">{{ postDetails.description }}</pre>
        <div class="comments">
          <TransitionGroup name="list" tag="ul">
            <div
              class="comment"
              v-for="comment in postComments"
              :key="comment.id"
            >
              <TheAvatar :src="comment.user?.avatar" />
              <span class="user">{{ comment.user?.name }}</span>
              <span class="commentDate">{{
                dateToRelative(comment.pubDate)
              }}</span>
              <p class="commentContent">{{ comment.content }}</p>
            </div>
          </TransitionGroup>
        </div>
        <div class="actions">
          <PostActions
            :likes="postDetails.liked_bies"
            :comments="postDetails.comments"
            :favors="postDetails.favored_bies"
            :likedByMe="postDetails.likedByMe"
            :favoredByMe="postDetails.favoredByMe"
            @likeClick="postStore.ayToggleLike(postDetails.id)"
            @favorClick="postStore.ayToggleFavor(postDetails.id)"
          />
          <span class="postPubDate">
            {{ dateToRelative(postDetails.publishedAt) }}
          </span>
          <input
            type="text"
            name="comment"
            v-model="content"
            id="comment"
            class="commentInput"
            placeholder="写一条评论吧！"
            @keyup.enter="addComment"
          />
          <button @click="addComment" class="commentPubBtn">发布</button>
        </div>
      </div>
    </div>
  </TheModal>
</template>

<style scoped>
.postDetails {
  display: grid;
  grid-template-columns: 1fr minmax(auto, 300px);
  grid-template-rows: minmax(0, 1fr);
  width: 80vw;
  height: 80vh;
}
.postImage {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.postMeta {
  padding: 24px;
  padding-top: 36px;
  display: grid;
  align-items: start;
  grid-template-rows: max-content max-content 1fr max-content;
  max-height: 100%;
  height: 100%;
}

.author {
  display: flex;
  align-items: center;
  gap: 10px;
}
.postDesc {
  width: 100%;
  white-space: pre-wrap;
  margin-top: 24px;
}
.comments {
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: max-content;
  grid-gap: 28px;
  align-items: start;
  overflow-y: auto;
  height: 100%;
}
.comment {
  display: grid;
  grid-template-areas:
    "avatar name date"
    "comment comment comment";
  grid-template-columns: 34px 1fr 1fr;
  align-items: center;
  column-gap: 10px;
  row-gap: 14px;
}
.commentDate {
  grid-area: date;
  justify-self: end;
  color: #a7a7a7;
}
.commentContent {
  grid-area: comment;
}

.actions {
  border-top: 1px solid #eaeaea;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  align-items: center;
  margin: 20px -24px 0px -24px;
  padding: 20px 24px 0 24px;
  row-gap: 16px;
}

.postActions > :deep(svg) {
  transform: scale(0.8125);
}
.postPubDate {
  color: #9f9f9f;
  grid-column: 2 / 6;
  justify-self: end;
  font-size: 14px;
}
.commentInput {
  background: #f7f7f7;
  border-radius: 16px;
  border: none;
  grid-column: 1 / 4;
}
.commentInput::placeholder {
  color: #b9b9b9;
  border: none;
}
.commentPubBtn {
  color: #1da0ff;
  border: none;
  background: none;
  font-size: 16px;
  margin-left: 20px;
  grid-column: 4 / 6;
}

.list-move, /* 对移动中的元素应用的过渡 */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: scaleX(0.01) translate(-30px, 0);
}
</style>
