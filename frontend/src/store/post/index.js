import { createPost, loadPosts } from "../../apis/post";

export const post = {
  state() {
    return {
      list: [],
    };
  },
  mutations: {
    initializePosts(state, posts) {
      state.list = posts;
    },
  },
  actions: {
    async uploadPost({ commit, dispatch }, { image, description }) {
      await createPost(image, description);
      dispatch("loadAllPosts");
      //关闭对话框并清空上传图片
      commit("changeShowPostUpload", false);
    },

    async loadAllPosts({ commit }) {
      const posts = await loadPosts();
      commit("initializePosts", posts);
    },
  },
};
