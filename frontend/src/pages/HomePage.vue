<script setup>
import PostList from "../components/PostList.vue";
import PostItem from "../components/PostItem.vue";
import PostUpload from "../components/PostUpload.vue";
</script>

<template>
  <div>
    <PostList>
      <PostItem v-for="n in 10"> </PostItem>
    </PostList>
    <!-- <PostDetails /> -->
    <PostUpload />
  </div>
</template>

<style scoped></style>
