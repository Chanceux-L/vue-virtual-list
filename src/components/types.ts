import type { Ref } from 'vue';

export type ItemAlign = 'top' | 'bottom' | 'center';

export interface Props<T> {
  listData: Array<T>;
  keyField?: string;
  estimateItemHeight?: number; // 子项估计高度
  bufferRatio?: number; // 缓冲区比例（缓冲区数据与可视区数据的比例）
  initialPosition?: 'top' | 'bottom' | T[keyof T]; // 初始位置
  itemAlign?: ItemAlign; // 子项对齐方式
  topThreshold?: number; // 顶部阈值
  bottomThreshold?: number; // 底部阈值
}

export interface Emits {
  (e: 'topArrived'): void;
  (e: 'bottomArrived'): void;
}

export interface VirtualListInstance<T> {
  scrollToTop: (smooth?: boolean) => Promise<void>;
  scrollToItem: (options: { key: T[keyof T]; align?: ItemAlign; smooth?: boolean }) => Promise<void>;
  scrollToBottom: (smooth?: boolean) => Promise<void>;
  isTopArrived: Ref<boolean>;
  isBottomArrived: Ref<boolean>;
}
