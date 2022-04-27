import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer'

// 引入当前所有目录下的js 例如 user/user.js 或 table/index.js
const modules = import.meta.globEager('./**/*.js')

const mockModules = []
Object.keys(modules).forEach((key) => {
    if (key.includes('/_')) {
        return
    }
    // 将所有路径不包含 '/_' 的js文件都添加到这个数组
    mockModules.push(...modules[key].default)
})

// mock插件，运行这个函数，方便在vite配置里使用
export function setupProdMockServer() {
    createProdMockServer(mockModules)
}