import { createRouter, createWebHistory } from 'vue-router'
import { RootRoute, LoginRoute, RedirectRoute, DashboardRoute } from '@/router/base'

// 自动导入
const modules = import.meta.globEager('./modules/**/*.js')

const routeModuleList = []

Object.keys(modules).forEach((key) => {
    const mod = modules[key].default || {}
    const modList = Array.isArray(mod) ? [...mod] : [mod]
    routeModuleList.push(...modList);
})

// 按照 meta.sort 排序
function sortRoute(a, b) {
    return (a.meta?.sort || 0) - (b.meta?.sort || 0)
}
// 固定的路由 无需验证权限
routeModuleList.sort(sortRoute)

// 固定的路由 无需验证权限
export const constantRouter = [RootRoute, LoginRoute, RedirectRoute, DashboardRoute]

// 用户端写死的路由，如果不是通过后端请求到的，则就使用这个路由
export const asyncRouter = [...routeModuleList]

const router = createRouter({
    history: createWebHistory(),
    routes: constantRouter,
    strict: true,
    scrollBehavior: () => ({ left: 0, top: 0 }),
})

export default router