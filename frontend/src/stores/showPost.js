import { defineStore } from "pinia";
import { ref } from "vue";

export const useShowPostStore = defineStore("showPost", () => {
  const showPostUpload = ref(false);
  const showPostDetails = ref(false);

  function changeShowPostUpload(show) {
    showPostUpload.value = show;
  }
  function changeShowPostDetails(show) {
    showPostDetails.value = show;
  }

  return {
    showPostUpload,
    showPostDetails,
    changeShowPostUpload,
    changeShowPostDetails,
  };
});
