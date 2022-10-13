import { fileURLToPath, URL } from "node:url";

import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import path from "path";

import Components from "unplugin-vue-components/vite";
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers";

// https://vitejs.dev/config/
export default defineConfig(() => {
  const env = loadEnv("development", process.cwd());
  return {
    esbuild: {
      jsxFactory: "h",
      jsxFragment: "Fragment",
      jsxInject: "import { h } from 'vue';"
    },
    plugins: [
      vueJsx(),
      vue(),
      Components({
        resolvers: [AntDesignVueResolver()],
        include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
        dts: true
      }),
      createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [path.resolve(process.cwd(), "src/assets/svg")],
        // 指定symbolId格式
        symbolId: "icon-[name]"
      })
    ],
    css: {
      // preprocessorOptions: {
      //   scss: {
      //     additionalData: "@import '@/styles/index.scss'"
      //   }
      // }
    },
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url))
      }
    },
    server: {
      proxy: {
        "/api": {
          target: env.VITE_BASE_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, "")
        }
      }
    }
  };
});
