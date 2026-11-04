# @chanceux/vue-virtual-list

一个基于 Vue 3 的高性能虚拟列表组件，支持动态高度、缓冲区优化和灵活的滚动控制。

**[在线演示](https://chanceux-l.github.io/vue-virtual-list/)**

## ✨ 特性

- 🚀 **高性能渲染** - 仅渲染可视区域的元素，支持海量数据列表
- 📏 **动态高度** - 自动计算和更新列表项的实际高度
- 🎯 **精确定位** - 支持滚动到指定项，可选择对齐方式（顶部/居中/底部）
- 🔄 **智能缓冲区** - 可配置缓冲区比例，优化滚动体验
- 📍 **边界检测** - 内置顶部和底部到达检测
- 💪 **TypeScript** - 完整的类型支持
- 🎨 **灵活定制** - 通过插槽自定义列表项渲染

## 🧭 环境要求

- 本组件为 **Vue 3 专用**组件，不支持 Vue 2
- 需要宿主项目已安装 Vue `>= 3.3`（peer 依赖）

## 📦 安装

本组件将 Vue 作为 peer 依赖，请确保宿主项目已安装 Vue 3（`>= 3.3`）：

```bash
npm install @chanceux/vue-virtual-list
```

或使用其他包管理器：

```bash
yarn add @chanceux/vue-virtual-list
pnpm add @chanceux/vue-virtual-list
```

## 🚀 快速开始

### 基础使用

```vue
<script setup lang="ts">
import { ref } from 'vue'
import VirtualList from '@chanceux/vue-virtual-list'

interface Item {
  id: number
  name: string
}

const listData = ref<Item[]>(
  Array.from({ length: 10000 }, (_, i) => ({
    id: i,
    name: `Item ${i}`
  }))
)
</script>

<template>
  <!-- 组件根元素高度为 100%，父容器必须有确定高度，否则列表不可见 -->
  <div style="height: 500px">
    <VirtualList
      :list-data="listData"
      :estimate-item-height="60"
      :buffer-ratio="1"
      key-field="id"
    >
      <template #default="{ item, index }">
        <div class="list-item">
          {{ index }}: {{ item.name }}
        </div>
      </template>
    </VirtualList>
  </div>
</template>

<style scoped>
.list-item {
  padding: 16px;
  border-bottom: 1px solid #eee;
}
</style>
```

### 滚动控制

```vue
<script setup lang="ts">
import { ref } from 'vue'
import VirtualList, { type VirtualListInstance } from '@chanceux/vue-virtual-list'

const virtualListRef = ref<VirtualListInstance<Item>>()

// 滚动到顶部
const scrollToTop = () => {
  virtualListRef.value?.scrollToTop(true) // smooth scroll
}

// 滚动到底部
const scrollToBottom = () => {
  virtualListRef.value?.scrollToBottom(true)
}

// 滚动到指定项
const scrollToItem = (id: number) => {
  virtualListRef.value?.scrollToItem({
    key: id,
    align: 'center', // 'top' | 'center' | 'bottom'
    smooth: true
  })
}
</script>

<template>
  <VirtualList
    ref="virtualListRef"
    :list-data="listData"
    key-field="id"
  >
    <template #default="{ item }">
      <div>{{ item.name }}</div>
    </template>
  </VirtualList>
</template>
```

### 边界检测

```vue
<script setup lang="ts">
import { ref } from 'vue'
import VirtualList, { type VirtualListInstance } from '@chanceux/vue-virtual-list'

const virtualListRef = ref<VirtualListInstance<Item>>()

const handleTopArrived = () => {
  console.log('到达顶部')
  // 可以在这里加载更多数据
}

const handleBottomArrived = () => {
  console.log('到达底部')
  // 可以在这里加载更多数据
}

// 通过 ref 访问状态（暴露的 ref 已被自动解包，直接读取即可，无需 .value）
const checkStatus = () => {
  console.log('是否在顶部：', virtualListRef.value?.isTopArrived)
  console.log('是否在底部：', virtualListRef.value?.isBottomArrived)
}
</script>

<template>
  <VirtualList
    ref="virtualListRef"
    :list-data="listData"
    :top-threshold="50"
    :bottom-threshold="50"
    @top-arrived="handleTopArrived"
    @bottom-arrived="handleBottomArrived"
  >
    <template #default="{ item }">
      <div>{{ item.name }}</div>
    </template>
  </VirtualList>
</template>
```

## 📖 API

### Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `listData` | `Array<T>` | `[]` | 列表数据源 |
| `keyField` | `string` | `'id'` | 数据项的唯一标识字段 |
| `estimateItemHeight` | `number` | `48` | 列表项的估计高度（px） |
| `bufferRatio` | `number` | `1` | 缓冲区比例（相对于可视区域） |
| `initialPosition` | `'top' \| 'bottom' \| T[keyof T]` | `'bottom'` | 初始滚动位置 |
| `itemAlign` | `'top' \| 'center' \| 'bottom'` | `'bottom'` | 滚动到指定项时的对齐方式 |
| `topThreshold` | `number` | `50` | 触发顶部到达事件的阈值（px） |
| `bottomThreshold` | `number` | `50` | 触发底部到达事件的阈值（px） |

> ⚠️ 组件根元素的高度为 `100%`，父容器必须有确定的高度（固定高度，或 flex 布局中的 `flex: 1` 加 `min-height: 0` 约束），否则高度将塌陷为 0，列表不可见。

### Events

| 事件名 | 参数 | 说明 |
|--------|------|------|
| `topArrived` | - | 滚动到达顶部时触发 |
| `bottomArrived` | - | 滚动到达底部时触发 |

### Methods

通过 `ref` 访问组件实例来调用以下方法：

| 方法名 | 参数 | 返回值 | 说明 |
|--------|------|--------|------|
| `scrollToTop` | `(smooth?: boolean) => Promise<void>` | `Promise<void>` | 滚动到顶部 |
| `scrollToBottom` | `(smooth?: boolean) => Promise<void>` | `Promise<void>` | 滚动到底部 |
| `scrollToItem` | `(options: { key: T[keyof T]; align?: ItemAlign; smooth?: boolean }) => Promise<void>` | `Promise<void>` | 滚动到指定项 |

### Instance Properties

| 属性 | 类型 | 说明 |
|------|------|------|
| `isTopArrived` | `boolean` | 是否到达顶部 |
| `isBottomArrived` | `boolean` | 是否到达底部 |

### Slots

| 插槽名 | 参数 | 说明 |
|--------|------|------|
| `default` | `{ item: T & { index: number }, index: number }` | 自定义列表项内容 |

## 🔧 TypeScript

组件提供完整的 TypeScript 类型支持：

```typescript
import type { VirtualListInstance, ItemAlign } from '@chanceux/vue-virtual-list'

// 使用泛型定义数据类型
interface MyItem {
  id: number
  title: string
  content: string
}

const virtualListRef = ref<VirtualListInstance<MyItem>>()
```

## ⚙️ 工作原理

1. **虚拟滚动** - 只渲染可视区域内的列表项，大幅减少 DOM 节点数量
2. **动态高度计算** - 自动测量和更新每个列表项的实际高度
3. **缓冲区机制** - 在可视区域上下方预渲染额外的项，提升滚动流畅度
4. **二分查找** - 使用二分法快速定位滚动位置对应的起始索引
5. **位置恢复** - 数据更新时智能恢复之前的滚动位置

## 📝 License

ISC

## 🔗 链接

- [在线演示](https://chanceux-l.github.io/vue-virtual-list/)
- [GitHub](https://github.com/Chanceux-L/vue-virtual-list)
- [NPM](https://www.npmjs.com/package/@chanceux/vue-virtual-list)

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！
