import type { ItemAlign, VirtualListInstance } from './components/types';
import VirtualList from './components/list.vue';

export type { ItemAlign, VirtualListInstance };

export default VirtualList;

declare module 'vue' {
  export interface GlobalComponents {
    VirtualList: typeof VirtualList;
  }
}
