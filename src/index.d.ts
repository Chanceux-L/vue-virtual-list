import { ItemAlign, VirtualListInstance } from './components/types';
import { default as VirtualList } from './components/list.vue';
export type { ItemAlign, VirtualListInstance };
export default VirtualList;
declare module 'vue' {
    interface GlobalComponents {
        VirtualList: typeof VirtualList;
    }
}
