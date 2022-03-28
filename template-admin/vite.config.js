import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path';
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { svgBuilder } from './src/icons/index';
import vueJsx from '@vitejs/plugin-vue-jsx'

const resolvePath = (url) => path.resolve(__dirname, url);

// https://vitejs.dev/config/ 工具函数配置
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd());// 获取环境变量对象

  return {
    base: env.VITE_BASE_URL,
    resolve: {
      alias: {
        '@': resolvePath('src'),
        'styles': resolvePath('src/styles'),
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/styles/element/index.scss" as *;`
        }
      },
    },
    server: {
      open: true,
      strictPort: false,
      cors: true,
      force: true,
      proxy: {
        '/api': {
          target: env.VITE_API_PATH,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    },
    build: {
      minify: "esbuild",
      brotliSize: false
    },
    plugins: [
      vue(),
      Components({
        resolvers: [
          ElementPlusResolver({
            importStyle: 'sass',
          }),
        ],
        dts: resolvePath('src/components.d.ts'),
      }),
      svgBuilder('./src/icons/svg/'),
      vueJsx()
    ],

  }
})
