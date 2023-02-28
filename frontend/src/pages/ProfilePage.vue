<script setup>
import TheIcon from "../components/TheIcon.vue";
import TheAvatar from "../components/TheAvatar.vue";
import TheButton from "../components/TheButton.vue";
import { ref, reactive, watch } from "vue";
import { useUserStore } from "../stores/user";
import {
  loadPostsByMe,
  loadPostsLikeOrFavoredByMe,
  delPost,
} from "../apis/post";

const userStore = useUserStore();

const tabs = ref([
  {
    label: "我的",
    icon: "posts",
  },
  {
    label: "赞过",
    icon: "like",
  },
  {
    label: "收藏",
    icon: "favorite",
  },
]);

const currentTab = ref(0);

const myPosts = reactive({
  0: [],
  1: [],
  2: [],
});

watch(
  currentTab,
  async () => {
    switch (currentTab.value) {
      case 0:
        myPosts[0] = await loadPostsByMe();
        break;
      case 1:
        myPosts[1] = await loadPostsLikeOrFavoredByMe();
        break;
      case 2:
        myPosts[2] = await loadPostsLikeOrFavoredByMe("favors");
        break;
      default:
        return;
    }
  },
  { immediate: true }
);

async function del(id) {
  await delPost(id);
  myPosts[0] = await loadPostsByMe();
}
</script>

<template>
  <div>
    <div class="profileContainer">
      <TheAvatar :width="186" :height="186" :src="userStore.users.avatar" />
      <div class="profile">
        <p class="name">
          <span>{{ userStore.users.name }}</span>
          <router-link to="/profile/edit">编辑个人资料</router-link>
        </p>
        <p class="handle">{{ userStore.users.username }}</p>
        <div class="description">
          <pre>{{ userStore.users.intro }}</pre>
        </div>
        <p class="website">{{ userStore.users.website }}</p>
      </div>
    </div>
    <div class="tabs">
      <div
        v-for="(tab, index) in tabs"
        class="tab"
        :class="{ active: index === currentTab }"
        :key="index"
        @click="currentTab = index"
      >
        <TheIcon :icon="tab.icon" />
        <p>{{ tab.label }}</p>
      </div>
    </div>
    <div class="tabContent">
      <p>{{ myPosts[currentTab].length }}</p>
      <div class="posts">
        <div v-for="post in myPosts[currentTab]">
          <img :src="post.image" :key="post.id" class="postImage" />
          <TheButton color="red" v-if="currentTab === 0" @click="del(post.id)">
            删除
          </TheButton>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.profileContainer {
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 10vw;
}

.avatar {
  justify-self: end;
}

.profile .name {
  display: flex;
  align-items: center;
}

.profile .name > span {
  font-size: 26px;
}
.profile .name > a {
  color: #1da0ff;
  text-decoration: none;
  margin-left: 26px;
}
.profile .handle {
  margin-top: 4px;
  color: #848484;
}

.profile .description {
  margin-top: 26px;
  margin-bottom: 22px;
}

.tabs {
  display: grid;
  grid-template-columns: repeat(3, 88px);
  column-gap: 4vw;
  justify-content: center;

  margin-top: 7vmin;
  margin-bottom: 20px;
}

.tab {
  text-align: center;
  padding: 12px 0;
  cursor: pointer;
}
.tab > svg {
  width: 32px;
  height: 32px;
  stroke: #8a9194;
  fill: #8a9194;
}

.tab.active {
  background: #f6f9fb;
  border-radius: 18px;
}

.tab.active > svg {
  stroke: #1787d9;
  fill: #1787d9;
}
.tab.active > p {
  color: #1787d9;
}

.tabContent > p {
  text-align: center;
  font-weight: 600;
  margin-bottom: 32px;
}

.posts {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 40px;
}

.postImage {
  width: 100%;
  height: 321px;
  background: #eee;
  object-fit: cover;
}
</style>
