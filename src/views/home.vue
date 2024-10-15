<script setup lang="ts">
import { ref } from 'vue';
import { faker } from '@faker-js/faker';
import VirtualList from '@/components/virtual-list/list.vue';

const listData = ref(Array.from({ length: 1000 }).fill(0).map((_, index) => ({
  index: index.toString(),
  content: faker.lorem.sentences(),
})));
</script>

<template>
  <VirtualList :list-data="listData" key-field="index">
    <template #default="{ item }">
      <div class="bg-yellow-200 flex items-center justify-center mb-2">
        {{ item.index }}
        <br />
        {{ item.content }}
      </div>
    </template>
  </VirtualList>
</template>
