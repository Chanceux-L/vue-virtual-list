import { Ref } from 'vue';
export type ItemAlign = 'top' | 'bottom' | 'center';
export interface Props<T> {
    listData: Array<T>;
    keyField?: string;
    estimateItemHeight?: number;
    bufferRatio?: number;
    initialPosition?: 'top' | 'bottom' | T[keyof T];
    itemAlign?: ItemAlign;
    topThreshold?: number;
    bottomThreshold?: number;
}
export interface Emits {
    (e: 'topArrived'): void;
    (e: 'bottomArrived'): void;
}
export interface VirtualListInstance<T> {
    scrollToTop: (smooth?: boolean) => Promise<void>;
    scrollToItem: (options: {
        key: T[keyof T];
        align?: ItemAlign;
        smooth?: boolean;
    }) => Promise<void>;
    scrollToBottom: (smooth?: boolean) => Promise<void>;
    isTopArrived: Ref<boolean>;
    isBottomArrived: Ref<boolean>;
}
