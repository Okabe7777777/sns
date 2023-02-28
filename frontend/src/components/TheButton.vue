<script setup>
defineProps({
  color: {
    type: String,
    default: "primary",
  },
  reverse: Boolean,
});
</script>

<template>
  <button
    class="button"
    :class="{ primary: color === 'primary', red: color === 'red', reverse }"
  >
    <slot></slot>
  </button>
</template>

<style scoped>
.button {
  border-radius: 8px;
  padding: 10px 32px;
  border: none;
  color: white;
  font-size: 16px;
  background: #1da0ff;
}

.button.primary {
  background: #1da0ff;
}

.button.red {
  background: #970808;
}

.button.reverse {
  background: none;
  border: 1px solid #e8e8e8;
  color: initial;
}
</style>
