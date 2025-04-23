<script setup lang="ts">
import type { ItemAlign, VirtualListInstance } from '@/components/types.ts';
import VirtualList from '@/components/list.vue';
import { ref } from 'vue';

// 定义测试数据类型
interface TestItem {
  id: number;
  title: string;
  content: string;
}

// 生成测试数据
function generateTestData(count: number): TestItem[] {
  return Array.from({ length: count }, (_, index) => {
    // 生成随机内容长度
    const contentLength = Math.floor(Math.random() * 10) + 1; // 1-10段内容
    const content = Array.from({ length: contentLength })
      .fill(null)
      .map(() => `这是第 ${index} 项的内容，用于测试虚拟列表的渲染效果`)
      .join('。');

    return {
      id: index + 1,
      title: `标题 ${index + 1}`,
      content,
    };
  });
}

const listData = ref(generateTestData(100));
const listRef = ref<VirtualListInstance<TestItem>>();
const targetIndex = ref('');
const alignPosition = ref<ItemAlign>('bottom');
const isSmooth = ref(true);

const alignOptions = [
  { value: 'top', label: '顶部对齐' },
  { value: 'center', label: '居中对齐' },
  { value: 'bottom', label: '底部对齐' },
];

// 事件处理
function onTopArrived() {
  // eslint-disable-next-line no-alert
  window.alert('到达顶部');
}

function onBottomArrived() {
  // eslint-disable-next-line no-alert
  window.alert('到达底部');
}

// 测试方法
function loadMoreData() {
  const startIndex = listData.value.length;
  const newData = generateTestData(50).map((item, index) => ({
    ...item,
    id: startIndex + index + 1,
    title: `标题 ${startIndex + index + 1}`,
  }));
  listData.value = [...listData.value, ...newData];
}

function scrollToTop() {
  listRef.value?.scrollToTop(isSmooth.value);
}

function scrollToBottom() {
  listRef.value?.scrollToBottom(isSmooth.value);
}

function scrollToMiddle() {
  const middleIndex = Math.floor(listData.value.length / 2);
  listRef.value?.scrollToItem({
    key: middleIndex,
    align: alignPosition.value,
    smooth: isSmooth.value,
  });
}

function scrollToTarget() {
  const index = Number.parseInt(targetIndex.value);
  if (Number.isNaN(index) || index < 0 || index >= listData.value.length) {
    // eslint-disable-next-line no-alert
    alert('请输入有效的索引值！');
    return;
  }
  listRef.value?.scrollToItem({
    key: index,
    align: alignPosition.value,
    smooth: isSmooth.value,
  });
}
</script>

<template>
  <div class="app-container">
    <!-- 测试控制面板 -->
    <div class="test-panel">
      <div class="actions">
        <div class="scroll-settings">
          <div class="setting-item">
            <label>对齐方式：</label>
            <select v-model="alignPosition" class="align-select">
              <option v-for="option in alignOptions" :key="option.value" :value="option.value">
                {{ option.label }}
              </option>
            </select>
          </div>
          <div class="setting-item">
            <label>
              <input
                v-model="isSmooth"
                type="checkbox"
                class="smooth-checkbox"
              />
              平滑滚动
            </label>
          </div>
        </div>
        <div class="btns">
          <button @click="loadMoreData">
            加载更多数据
          </button>
          <button @click="scrollToTop">
            滚动到顶部
          </button>
          <button @click="scrollToMiddle">
            滚动到中间
          </button>
          <button @click="scrollToBottom">
            滚动到底部
          </button>
        </div>
        <div class="scroll-input">
          <input
            v-model="targetIndex"
            type="number"
            placeholder="输入索引"
            min="0"
            :max="listData.length - 1"
          />
          <button @click="scrollToTarget">
            滚动到指定位置
          </button>
        </div>
      </div>
    </div>

    <!-- 虚拟列表 -->
    <div class="list-container">
      <VirtualList
        v-if="listData.length > 0"
        ref="listRef"
        initial-position="bottom"
        :list-data="listData"
        :estimate-item-height="50"
        @top-arrived="onTopArrived"
        @bottom-arrived="onBottomArrived"
      >
        <template #default="{ item, index }">
          <div class="list-item">
            <div class="item-content">
              <h3>{{ item.title }}</h3>
              <p>{{ item.content }}</p>
              <span class="item-index">索引: {{ index }}</span>
            </div>
          </div>
        </template>
      </VirtualList>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.app-container {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  gap: 20px;
  flex: 1;
  min-height: 0;
  width: 50vw;
}

.test-panel {
  flex-shrink: 0;
  padding: 16px;
  border-radius: 8px;
  background: #f9f9f9;

  .actions {
    display: flex;
    flex-direction: column;
    gap: 12px;

    .scroll-settings {
      display: flex;
      flex-wrap: wrap;
      gap: 16px;
      padding: 12px;
      border-radius: 6px;
      background: #f5f5f5;

      .setting-item {
        display: flex;
        align-items: center;
        gap: 8px;

        label {
          display: flex;
          align-items: center;
          gap: 6px;
          color: #666;
          user-select: none;
        }
      }

      .smooth-checkbox {
        position: relative;
        width: 16px;
        height: 16px;
        margin: 0;
        border: 2px solid #ddd;
        border-radius: 3px;
        transition: all 0.2s ease;
        cursor: pointer;
        appearance: none;

        &:checked {
          border-color: #4caf50;
          background-color: #4caf50;

          &::after {
            position: absolute;
            top: 50%;
            left: 50%;
            width: 5px;
            height: 10px;
            border: solid white;
            border-width: 0 2px 2px 0;
            transform: translate(-50%, calc(-50% - 2.5px)) rotate(45deg);
            content: "";
          }
        }

        &:hover {
          border-color: #4caf50;
        }
      }
    }

    .btns {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 8px;
    }

    .scroll-input {
      display: flex;
      align-items: center;
      width: 100%;
      gap: 8px;

      input {
        flex: 1;
        padding: 8px;
        border: 1px solid #ddd;
        border-radius: 4px;

        &:focus {
          border-color: #4caf50;
          outline: none;
        }
      }
    }

    .align-select {
      min-width: 120px;
      padding: 8px;
      border: 1px solid #ddd;
      border-radius: 4px;
      background-color: white;
      cursor: pointer;

      &:focus {
        border-color: #4caf50;
        outline: none;
      }
    }

    button {
      padding: 8px 16px;
      border: none;
      border-radius: 4px;
      color: white;
      background: #4caf50;
      transition: background 0.2s;
      cursor: pointer;

      &:hover {
        background: #45a049;
      }
    }
  }
}

.list-container {
  box-sizing: border-box;
  width: 100%;
  flex: 1;
  min-height: 0;
  border-radius: 8px;
  background: #f9f9f9;
}

.list-item {
  box-sizing: border-box;
  padding: 12px 16px;
  border-bottom: 1px solid #f0f0f0;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f8f8f8;
  }

  .item-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;

    h3 {
      margin: 0 0 8px;
      font-size: 16px;
      color: #333;
    }

    p {
      margin: 0;
      font-size: 14px;
      color: #666;
    }

    .item-index {
      margin-top: 8px;
      font-size: 12px;
      color: #999;
    }
  }
}
</style>
