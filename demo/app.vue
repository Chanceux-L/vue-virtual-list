<script setup lang="ts">
import IndexDemo from './index.vue';
</script>

<template>
  <div class="app">
    <h1 class="title">
      虚拟列表演示
    </h1>
    <IndexDemo />
    <footer class="footer">
      <span>作者：<a
        href="https://github.com/Chanceux-L"
        target="_blank"
        rel="noopener noreferrer"
      >Chanceux-L</a></span>
      <span class="divider">·</span>
      <span>仓库：<a
        href="https://github.com/Chanceux-L/vue-virtual-list"
        target="_blank"
        rel="noopener noreferrer"
      >vue-virtual-list</a></span>
    </footer>
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

  .footer {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 12px 0 16px;
    font-size: 14px;
    color: #999;

    a {
      color: #4caf50;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
