import path, { resolve } from 'node:path';
import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
export default defineConfig(function () {
    return {
        plugins: [
            vue(),
            dts(),
        ],
        resolve: {
            alias: {
                '@': path.resolve('src'),
            },
        },
        build: {
            lib: {
                entry: resolve(__dirname, 'src/index.ts'),
                name: 'VirtualList',
                // 输出文件的格式名：rollup是用 umd和es进行区分的：
                fileName: function (format) { return "virtual-list.".concat(format, ".js"); },
            },
            rollupOptions: {
                external: ['vue'],
                output: {
                    globals: {
                        vue: 'Vue',
                    },
                },
            },
        },
    };
});
