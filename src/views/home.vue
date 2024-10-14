<script setup lang="ts">
import { computed, onMounted, onUpdated, ref, useTemplateRef } from 'vue';
import { faker } from '@faker-js/faker';
import { throttle } from 'lodash-es';

const listData = ref(Array.from({ length: 1000 }).fill(0).map((_, index) => ({
  index: index.toString(),
  content: faker.lorem.sentences(),
})));
// 预估子项高度
const estimateHeight = 60;

// 子项位置集合
const itemPositions = ref<Array<{
  top: number
  bottom: number
  height: number
}>>([]);

const itemRefs = useTemplateRef<HTMLDivElement[]>('items');

const startIndex = ref(0);
const endIndex = ref(0);

// 缓冲区比例（缓冲区数据与可视区数据的比例）
const bufferRatio = 1;

const containerRef = useTemplateRef('container');
const containerHeight = ref(0);

// 可视区子项数量
const visibleCount = computed(() => Math.ceil(containerHeight.value / estimateHeight));

// 起始缓冲区数量
const aboveCount = computed(() => Math.min(startIndex.value, visibleCount.value * bufferRatio));

// 结束缓冲区数量
const belowCount = computed(() => Math.min(listData.value.length - endIndex.value, visibleCount.value * bufferRatio));

// 可视区列表内容
const visibleListData = computed(() => {
  const start = startIndex.value - aboveCount.value;
  const end = endIndex.value + belowCount.value;
  return listData.value.slice(start, end);
});

// 偏移量
const startOffset = ref(0);

// 内容区需要被撑开的高度
const phantomHeight = ref(0);

function computedVisualSize() {
  itemRefs.value?.forEach((item) => {
    const id = +item.id;
    const curHeight = item.clientHeight;
    const oldHeight = itemPositions.value[id].height;
    const dValue = curHeight - oldHeight;

    if (dValue) {
      Object.assign(itemPositions.value[id], {
        height: curHeight,
        bottom: itemPositions.value[id].bottom + dValue,
      });
      // 更新后续子项位置
      for (let i = id + 1; i < itemPositions.value.length; i++) {
        itemPositions.value[i].top += dValue;
        itemPositions.value[i].bottom += dValue;
      }
    }
  });
}

function getOffsetY() {
  // 实际滑出可视区个数
  const realStart = startIndex.value - aboveCount.value;
  if (realStart) {
    startOffset.value = itemPositions.value[realStart].top;
  }
  else {
    startOffset.value = 0;
  }
}

// 二分法查找初始索引
function getStartIndex(scrollTop: number) {
  let start = 0;
  let end = listData.value.length - 1;
  let tempIndex = null;
  while (start <= end) {
    const midIndex = Number.parseInt(String((end + start) / 2));
    const midBottom = itemPositions.value[midIndex].bottom;
    if (midBottom === scrollTop) {
      tempIndex = midIndex + 1;
      return tempIndex;
    }
    else if (midBottom < scrollTop) {
      start = midIndex + 1;
    }
    else if (midBottom > scrollTop) {
      if (tempIndex === null || tempIndex > midIndex) {
        tempIndex = midIndex;
      }
      end = end - 1;
    }
  }
  return tempIndex;
}

onUpdated(throttle(() => {
  if (!itemRefs.value || itemRefs.value.length === 0) {
    return;
  }
  // 计算更新可视区子项位置集合
  computedVisualSize();
  // 计算虚拟占位的高度
  phantomHeight.value = itemPositions.value[itemPositions.value.length - 1].bottom;
  // 计算偏移量
  getOffsetY();
}, 100));

const onScroll = throttle((e: Event) => {
  const scrollTop = (e.target as HTMLElement).scrollTop;
  startIndex.value = getStartIndex(scrollTop) ?? 0;
  endIndex.value = startIndex.value + visibleCount.value;
  getOffsetY();
}, 100);

onMounted(() => {
  // STEP1: 计算内容区需要被撑开的高度 & 计算容器高度
  phantomHeight.value = listData.value.length * estimateHeight;
  containerHeight.value = containerRef.value?.clientHeight ?? 0;

  // STEP2: 根据预估高度（estimateHeight）来初始化可视区索引、可视区展示子项个数
  startIndex.value = 0;
  endIndex.value = startIndex.value + visibleCount.value;

  // STEP3: 初始化子项位置集合
  itemPositions.value = listData.value.map((_, index) => ({
    top: index * estimateHeight,
    bottom: (index + 1) * estimateHeight,
    height: estimateHeight,
  }));
});
</script>

<template>
  <div ref="container" class="w-[400px] h-[300px] overflow-auto relative" @scroll="onScroll">
    <!-- 虚拟撑开区 -->
    <div :style="{ height: `${phantomHeight}px` }" />
    <!-- 可视区 -->
    <div class="absolute top-0 left-0 w-full flex flex-col gap-y-2" :style="{ transform: `translateY(${startOffset}px)` }">
      <div
        v-for="(item, index) in visibleListData"
        :id="item.index"
        :key="item.index"
        ref="items"
        class="bg-yellow-200 flex items-center justify-center"
        :class="{ 'border-b border-gray-300': index !== visibleListData.length - 1 }"
      >
        {{ index }}
        <br>
        {{ item.content }}
      </div>
    </div>
  </div>
</template>
