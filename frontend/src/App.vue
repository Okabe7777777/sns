<script setup>
import "./assets/base.css";
import NavBar from "./components/NavBar.vue";
import TheLayout from "./components/TheLayout.vue";
</script>

<template>
  <header class="header">
    <NavBar />
  </header>
  <TheLayout>
    <router-view></router-view>
  </TheLayout>
</template>

<!-- App.vue, 注意 style 为 scoped -->
<style scoped>
.header {
  height: 80px;
  box-shadow: 0px 4px 24px rgba(0, 0, 0, 0.08);
}
</style>
