<script setup lang='ts' generic="T">
import type { UnwrapRef } from 'vue';
import type { Emits, Props, VirtualListInstance } from './types';
import { cloneDeep, throttle } from 'lodash-es';
import { computed, nextTick, onUpdated, ref, watch } from 'vue';

const props = withDefaults(defineProps<Props<T>>(), {
  listData: () => [],
  keyField: 'id',
  estimateItemHeight: 48,
  bufferRatio: 1,
  initialPosition: 'bottom',
  itemAlign: 'bottom',
  topThreshold: 50,
  bottomThreshold: 50,
});
const emits = defineEmits<Emits>();

const containerRef = ref<HTMLDivElement>();
const containerHeight = ref(0);
const startIndex = ref(0);
const endIndex = ref(0);
const itemRefs = ref<HTMLDivElement[]>([]);
const isInitialized = ref(false);
// 子项位置集合
const itemPositions = ref<Array<{
  index: number;
  data: T;
  top: number;
  bottom: number;
  height: number;
}>>([]);
// 偏移量
const startOffset = ref(0);

// 可视区子项数量
const visibleCount = computed(() => Math.ceil(containerHeight.value / props.estimateItemHeight));
// 起始缓冲区数量
const aboveCount = computed(() => Math.min(startIndex.value, visibleCount.value * props.bufferRatio));
// 结束缓冲区数量
const belowCount = computed(() => Math.min(props.listData.length - endIndex.value, visibleCount.value * props.bufferRatio));
// 可视区列表内容
const visibleListData = computed(() => {
  const start = startIndex.value - aboveCount.value;
  const end = endIndex.value + belowCount.value;
  return props.listData.slice(start, end).map((item, index) => ({
    ...item,
    index: start + index,
  }));
});
// 虚拟撑开区高度
const phantomHeight = computed(() => itemPositions.value[itemPositions.value.length - 1]?.bottom || 0);

// 二分法查找初始索引
function getStartIndex(scrollTop: number) {
  let start = 0;
  let end = props.listData.length - 1;
  let tempIndex = null;
  while (start <= end) {
    const midIndex = Number.parseInt(String((end + start) / 2));
    const midBottom = itemPositions.value[midIndex].bottom;
    if (midBottom === scrollTop) {
      tempIndex = midIndex + 1;
      return tempIndex;
    } else if (midBottom < scrollTop) {
      start = midIndex + 1;
    } else if (midBottom > scrollTop) {
      if (tempIndex === null || tempIndex > midIndex) {
        tempIndex = midIndex;
      }
      end = end - 1;
    }
  }
  return tempIndex;
}

function getOffsetY() {
  // 实际滑出可视区个数
  const realStart = startIndex.value - aboveCount.value;
  if (realStart) {
    startOffset.value = itemPositions.value[realStart].top;
  } else {
    startOffset.value = 0;
  }
}

function computedVisualSize() {
  itemRefs.value?.forEach((item) => {
    const id = item.id;
    const dataIndex = itemPositions.value.findIndex((pos) => {
      const key = props.keyField as keyof UnwrapRef<T>;
      return +pos.data[key] === +id;
    });

    if (dataIndex !== -1) {
      const curHeight = item.clientHeight;
      const oldHeight = itemPositions.value[dataIndex].height;
      const dValue = curHeight - oldHeight;

      if (dValue) {
        Object.assign(itemPositions.value[dataIndex], {
          height: curHeight,
          bottom: itemPositions.value[dataIndex].bottom + dValue,
        });
        // 更新后续子项位置
        for (let i = dataIndex + 1; i < itemPositions.value.length; i++) {
          itemPositions.value[i].top += dValue;
          itemPositions.value[i].bottom += dValue;
        }
      }
    }
  });
}

function waitForItemsToRender(): Promise<void> {
  return new Promise((resolve) => {
    const checkRendered = () => {
      const allItemsRendered = visibleListData.value.every((item) => {
        const el = containerRef.value?.querySelector(`[id="${item[props.keyField as keyof T]}"]`) as HTMLElement;
        return el && el.offsetHeight > 0;
      });

      if (allItemsRendered) {
        resolve();
      } else {
        requestAnimationFrame(checkRendered);
      }
    };

    requestAnimationFrame(checkRendered);
  });
}

// 触发到达顶部和底部的事件
const isTopArrived = ref(false);
const isBottomArrived = ref(false);
function emitArrived(sendEvent: boolean = true) {
  if (!containerRef.value) {
    return;
  }

  const { scrollTop, clientHeight, scrollHeight } = containerRef.value;
  const topThreshold = props.topThreshold ?? 0;
  const bottomThreshold = props.bottomThreshold ?? 0;

  // 检查是否到达顶部
  if (scrollTop <= topThreshold) {
    if (!isTopArrived.value) {
      isTopArrived.value = true;

      if (isInitialized.value && sendEvent) {
        emits('topArrived');
      }
    }
  } else {
    isTopArrived.value = false;
  }

  // 检查是否到达底部
  const distanceToBottom = scrollHeight - (scrollTop + clientHeight);
  if (distanceToBottom <= bottomThreshold) {
    if (!isBottomArrived.value) {
      isBottomArrived.value = true;
      if (isInitialized.value && sendEvent) {
        emits('bottomArrived');
      }
    }
  } else {
    isBottomArrived.value = false;
  }
}

// 保存当前滚动位置相关信息
const oldScrollInfo = ref({
  scrollTop: 0,
  firstVisibleItemIndex: 0,
  offset: 0,
});

const onScroll = throttle((e: Event) => {
  const scrollTop = (e.target as HTMLElement).scrollTop;
  // 保存滚动信息
  if (itemPositions.value.length) {
    const currentIndex = getStartIndex(scrollTop) ?? 0;
    oldScrollInfo.value = {
      scrollTop,
      firstVisibleItemIndex: currentIndex,
      offset: scrollTop - itemPositions.value[currentIndex].top,
    };
  }

  startIndex.value = getStartIndex(scrollTop) ?? 0;
  endIndex.value = Math.min(startIndex.value + visibleCount.value, props.listData.length);

  getOffsetY();
  emitArrived();
}, 100);

onUpdated(throttle(() => {
  if (!itemRefs.value || itemRefs.value.length === 0) {
    return;
  }
  // 计算更新可视区子项位置集合
  computedVisualSize();
  // 计算偏移量
  getOffsetY();
}, 100));

// 滚动到底部
async function scrollToBottom(smooth: boolean = true): Promise<void> {
  if (containerRef.value) {
    endIndex.value = props.listData.length - 1;
    computedVisualSize();
    await nextTick();
    await waitForItemsToRender();
    const maxScrollTop = containerRef.value.scrollHeight - containerRef.value.clientHeight;
    return new Promise<void>((resolve) => {
      requestAnimationFrame(() => {
        scrollToPosition({ top: maxScrollTop, smooth });
        resolve();
      });
    });
  }
}

// 滚动到顶部
async function scrollToTop(smooth: boolean = true): Promise<void> {
  if (containerRef.value) {
    await nextTick();
    await waitForItemsToRender();
    return new Promise<void>((resolve) => {
      requestAnimationFrame(() => {
        scrollToPosition({ top: 0, smooth });
        resolve();
      });
    });
  }
}

// 滚动到指定位置
async function scrollToItem(options: { key: T[keyof T]; align?: Props<T>['itemAlign']; smooth?: boolean }) {
  const { key, align, smooth = false } = options;
  const keyField = props.keyField as keyof T;

  // 找到目标项的索引
  const targetIndex = itemPositions.value.findIndex(item => (item.data as T)[keyField] === key);

  if (targetIndex === -1 || !containerRef.value) {
    return;
  }

  // 更新可视区域
  startIndex.value = Math.max(0, targetIndex - Math.floor(visibleCount.value / 2));
  endIndex.value = Math.min(startIndex.value + visibleCount.value, props.listData.length);

  await nextTick();
  await waitForItemsToRender();

  // 计算滚动位置
  const targetItem = itemPositions.value[targetIndex];
  const maxScrollTop = containerRef.value.scrollHeight - containerRef.value.clientHeight;

  let scrollTop: number = 0;
  switch (align) {
    case 'top':
      scrollTop = targetItem.top;
      break;
    case 'center':
      scrollTop = targetItem.top - (containerRef.value.clientHeight - targetItem.height) / 2;
      break;
    default:
      scrollTop = targetItem.top - (containerRef.value.clientHeight - targetItem.height);
      break;
  }

  // 确保 scrollTop 在有效范围内
  scrollTop = Math.max(0, Math.min(scrollTop, maxScrollTop));
  scrollToPosition({ top: scrollTop, align, smooth });
}

// 滚动到指定位置
function scrollToPosition(options: {
  top: number;
  align?: Props<T>['itemAlign'];
  smooth?: boolean;
}) {
  const { top, smooth = false } = options;

  if (!containerRef.value) { return; }

  containerRef.value.scrollTo({ top, behavior: smooth ? 'smooth' : 'auto' });
}

async function init() {
  // STEP1: 计算容器高度
  containerHeight.value = containerRef.value?.clientHeight ?? 0;

  // STEP2: 先渲染完整列表以获取正确的高度信息
  startIndex.value = 0;
  endIndex.value = props.listData.length - 1;

  // STEP3: 初始化子项位置集合
  itemPositions.value = props.listData.map((_, index) => ({
    index,
    data: props.listData[index],
    top: index * props.estimateItemHeight,
    bottom: (index + 1) * props.estimateItemHeight,
    height: props.estimateItemHeight,
  }));

  // STEP4: 计算实际高度
  await nextTick();
  await waitForItemsToRender();
  computedVisualSize();

  // STEP5: 根据 initialPosition 设置初始滚动位置
  switch (props.initialPosition) {
    case 'bottom':
      await scrollToBottom(false);
      break;
    case 'top':
      await scrollToTop(false);
      break;
    default:
      await scrollToItem({ key: props.initialPosition, align: props.itemAlign, smooth: false });
      break;
  }

  // STEP6: 滚动完成后，再调整为实际需要显示的数量
  await nextTick();
  startIndex.value = getStartIndex(containerRef.value?.scrollTop ?? 0) ?? 0;
  endIndex.value = Math.min(startIndex.value + visibleCount.value, props.listData.length);

  // 初始化完成后立即检查是否到达底部
  // emitArrived();
}

let oldListData: T[] = [];
async function onListDataLengthChange() {
  const keyField = props.keyField as keyof T;
  const oldFirstVisibleItem = oldListData[oldScrollInfo.value.firstVisibleItemIndex];

  // 保存旧的位置信息，用于后续更新新增项的高度
  const oldPositions = new Map(
    itemPositions.value.map(item => [
      (item.data as T)[keyField],
      { height: item.height },
    ]),
  );

  oldListData = cloneDeep(props.listData);
  await nextTick();

  if (!isInitialized.value) {
    init();
  } else {
    // 更新位置信息，同时保留已知项的实际高度
    let accumulator = 0;
    itemPositions.value = props.listData.map((item, index) => {
      const oldPosition = oldPositions.get(item[keyField]);
      const height = oldPosition?.height ?? props.estimateItemHeight;
      const position = {
        index,
        data: item,
        top: accumulator,
        height,
        bottom: accumulator + height,
      };
      accumulator += height;
      return position;
    });

    await nextTick();
    await waitForItemsToRender();
    computedVisualSize();

    // 恢复滚动位置
    if (oldFirstVisibleItem) {
      const newFirstVisibleItemIndex = props.listData.findIndex(
        item => item[keyField] === oldFirstVisibleItem[keyField],
      );

      if (newFirstVisibleItemIndex !== -1) {
        const newScrollTop = itemPositions.value[newFirstVisibleItemIndex].top + oldScrollInfo.value.offset;
        if (oldScrollInfo.value.firstVisibleItemIndex < newFirstVisibleItemIndex) {
          // FIXME: se的尺寸会偏移很多，不设置bufferRatio就不会
          const offset = containerHeight.value * 0.15;
          scrollToPosition({ top: newScrollTop - offset, smooth: false });
        } else {
          scrollToPosition({ top: newScrollTop, smooth: false });
        }
      }
    }
  }
  isInitialized.value = true;
  emitArrived(false);
}
watch(() => props.listData.length, onListDataLengthChange, { immediate: true });

defineExpose<VirtualListInstance<T>>({
  scrollToTop,
  scrollToItem,
  scrollToBottom,
  isTopArrived,
  isBottomArrived,
});
</script>

<template>
  <div
    ref="containerRef"
    style=" position: relative;height: 100%; overflow: auto;"
    @scroll="onScroll"
  >
    <!-- 虚拟撑开区 -->
    <div
      :style="{ height: `${phantomHeight}px` }"
    ></div>
    <!-- 可视区 -->
    <div
      :style="{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        transform: `translateY(${startOffset}px)`,
      }"
    >
      <div
        v-for="item in visibleListData"
        :id="(item[keyField as keyof T] as string)"
        :key="(item[keyField as keyof T] as string)"
        ref="itemRefs"
        style="width: 100%;"
      >
        <!-- 这里加多一层是避免margin-top不计算到 height 内 -->
        <div style=" display: flex; flex-direction: column;width: 100%;">
          <slot :item="item" :index="item.index"></slot>
        </div>
      </div>
    </div>
  </div>
</template>
