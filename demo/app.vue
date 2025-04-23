<script setup lang="ts">
import IndexDemo from './index.vue';
</script>

<template>
  <div class="app">
    <h1 class="title">
      虚拟列表演示
    </h1>
    <IndexDemo />
  </div>
</template>

<style lang="scss">
html,
body {
  margin: 0;
  padding: 0;
}
</style>

<style lang="scss" scoped>
.app {
  display: flex;
  flex-direction: column;
  height: 100vh;
  align-items: center;
  background-color: #f0f2f5;

  .title {
    margin-bottom: 24px;
    font-size: 28px;
    font-weight: 600;
    color: #1a1a1a;
    text-align: center;
  }
}
</style>
