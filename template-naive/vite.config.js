import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { viteMockServe } from 'vite-plugin-mock'

const resolvePath = (url) => path.resolve(__dirname, url)

// https://vitejs.dev/config/ 工具函数配置
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd())// 获取环境变量对象

  return {
    base: env.VITE_BASE_URL,
    resolve: {
      alias: {
        '@': resolvePath('src'),
      },
      dedupe: ['vue'],
    },
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: {},
          javascriptEnabled: true,
          additionalData: `@import "src/styles/var.less";`,
        },
      }
    },
    server: {
      port: 12345,
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
      vueJsx(),
      viteMockServe({
          ignore: /^\_/,
          mockPath: 'mock',
          localEnabled: command !== 'build',
          prodEnabled: command === 'build',
          injectCode: `
          import { setupProdMockServer } from './mock/_createProductionServer';
          setupProdMockServer();
          `
      })
    ],
  }
})
