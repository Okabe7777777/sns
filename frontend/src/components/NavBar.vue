<script setup>
import { useShowPostStore } from "../stores/showPost";
import { usePostStore } from "../stores/post";
import { useUserStore } from "../stores/user";
import TheAvatar from "./TheAvatar.vue";
import TheIcon from "./TheIcon.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";

const showDropdown = ref(false);
const query = ref("");
const userStore = useUserStore();
const postStore = usePostStore();
const showPostStore = useShowPostStore();
const router = useRouter();

function publishPost() {
  showPostStore.changeShowPostUpload(true);
}

async function searchPosts() {
  const term = query.value.trim();
  if (term) {
    await postStore.aySearchPosts(term);
    router.push({
      name: "search_result",
      state: {
        ...term,
      },
    });
    query.value = "";
  }
}

async function logout() {
  await userStore.ayLogoutUser();
  router.push("/login");
}
</script>

<template>
  <nav class="navbar">
    <router-link to="/">
      <img width="105" height="27" src="../assets/logo.svg" />
    </router-link>

    <form @submit.prevent="searchPosts">
      <div class="searchInput">
        <input type="text" v-model="query" />
        <TheIcon icon="search" />
      </div>
    </form>

    <div class="navItems">
      <router-link to="/"><TheIcon icon="home" /></router-link>
      <button
        :disabled="
          $route.name === 'profile' ||
          $route.name === 'profileEdit' ||
          $route.name === 'search_result'
        "
        @click="publishPost()"
      >
        <TheIcon icon="publish" />
      </button>
      <!-- dropdown -->
      <div class="profileDropDown">
        <TheAvatar
          :width="42"
          :height="42"
          style="cursor: pointer"
          @click="showDropdown = !showDropdown"
          :src="userStore.users.avatar"
        />
        <div
          class="dropdownMenu"
          v-show="showDropdown"
          @click="showDropdown = false"
        >
          <ul class="profileMenu">
            <li><router-link to="/profile">个人主页</router-link></li>
            <li @click="logout">退出登录</li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  width: 80vw;
  height: 80px;
  justify-items: center;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  align-items: center;
}
.navbar svg {
  width: 38px;
  height: 38px;
  display: inline-block;
}

.searchInput {
  position: relative;
}

.searchInput input {
  width: 21vw;
  padding: 12px;
  padding-left: 36px;
  background: #f1f1f1;
  border-radius: 14px;
  border: none;
}

.searchInput > svg {
  position: absolute;
  top: 11px;
  left: 12px;
}

.navItems {
  justify-self: end;
  display: flex;
  gap: 24px;
  align-items: center;
}

.navItems > button {
  border: none;
  background: none;
}

.profileDropDown {
  position: relative;
}

.profileMenu {
  position: absolute;
  width: max-content;
  padding: 24px 26px;
  list-style: none;
  background: white;
  box-shadow: 0px 0px 24px rgba(0, 0, 0, 0.08);
  border-radius: 4px;
  right: 0;
  display: grid;
  row-gap: 18px;
  transform: translateY(18px);
}

.profileMenu::before {
  content: "";
  display: block;
  position: absolute;
  width: 0;
  height: 0;
  top: -12px;
  right: 10px;
  border-bottom: 12px solid white;
  border-left: 12px solid transparent;
  border-right: 12px solid transparent;
}

.profileMenu a,
.profileMenu li {
  text-decoration: none;
  cursor: pointer;
}

.profileMenu a:visited {
  color: initial;
}
</style>
