import { defineConfig } from "vite";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import vue from "@vitejs/plugin-vue";

import { resolve } from "path";
import eslintPlugin from "vite-plugin-eslint"; // 主要用于alias文件路径别名

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  base: "./",
  build: {
    outDir: "dist",
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, ".", "src"),
      components: "@/components",
    },
  },
});
