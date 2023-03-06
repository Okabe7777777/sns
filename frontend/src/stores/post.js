import { createPost, favorPost, likePost, loadPosts } from "../apis/post";
import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { useShowPostStore } from "./showPost";
import { useCommentStore } from "./comment";

export const usePostStore = defineStore("post", () => {
  const list = ref([]);
  const searchResult = ref([]);
  const currentId = ref(null);

  const showPostStore = useShowPostStore();
  const commentStore = useCommentStore();

  function initializePosts(posts) {
    list.value = posts;
  }
  function toggleLike({ id, isLike }) {
    const post = list.value.find((post) => post.id === id);
    if (isLike) {
      post.liked_bies = (post.liked_bies || 0) + 1;
    } else {
      post.liked_bies--;
    }
    post.likedByMe = isLike;
  }
  function toggleFavor({ id, isFavor }) {
    const post = list.value.find((post) => post.id === id);
    if (isFavor) {
      post.favored_bies = (post.favored_bies || 0) + 1;
    } else {
      post.favored_bies--;
    }
    post.favoredByMe = isFavor;
  }
  function setCurrentId(id) {
    currentId.value = id;
  }
  function increaseCommentCount(id) {
    const post = list.value.find((post) => post.id === id);
    post.comments++;
  }
  function setPostsSearchResult(posts) {
    searchResult.value = posts;
  }

  async function ayUploadPost({ image, description }) {
    await createPost(image, description);
    await ayLoadAllPosts();
    //关闭对话框并清空上传图片
    showPostStore.changeShowPostUpload(false);
  }
  async function ayLoadAllPosts() {
    const posts = await loadPosts();
    initializePosts(posts);
  }
  async function ayToggleLike(id) {
    const isLike = await likePost(id);
    toggleLike({ id, isLike });
  }
  async function ayToggleFavor(id) {
    const isFavor = await favorPost(id);
    toggleFavor({ id, isFavor });
  }
  async function ayShowPostDetails(id) {
    setCurrentId(id);
    await commentStore.ayLoadAllComments(id);
    showPostStore.changeShowPostDetails(true);
  }
  async function ayHidePostDetails() {
    setCurrentId(null);
    showPostStore.changeShowPostDetails(false);
  }
  async function aySearchPosts(term) {
    const posts = await loadPosts("filters[description][$contains]=" + term);
    setPostsSearchResult(posts);
  }

  const postDetails = computed(() =>
    list.value.find((post) => post.id === currentId.value)
  );

  return {
    list,
    searchResult,
    currentId,
    initializePosts,
    toggleLike,
    toggleFavor,
    setCurrentId,
    increaseCommentCount,
    setPostsSearchResult,
    ayUploadPost,
    ayLoadAllPosts,
    ayToggleLike,
    ayToggleFavor,
    ayShowPostDetails,
    ayHidePostDetails,
    aySearchPosts,
    postDetails,
  };
});
