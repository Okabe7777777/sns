import { defineStore } from "pinia";
import { createComment, loadComments } from "../apis/comment";
import { computed, ref } from "vue";
import { usePostStore } from "./post";

export const useCommentStore = defineStore("comment", () => {
  const list = ref([]);

  const postStore = usePostStore();

  function initializeComments(comments) {
    list.value = comments;
  }

  async function ayAddComment({ content, postId }) {
    await createComment(content, postId);
    await ayLoadAllComments(postId);
    postStore.increaseCommentCount(postId);
  }

  async function ayLoadAllComments(postId) {
    const comments = await loadComments(postId);
    initializeComments(comments);
  }

  const postComments = computed(() => list.value.reverse());

  return {
    list,
    initializeComments,
    ayAddComment,
    ayLoadAllComments,
    postComments,
  };
});
