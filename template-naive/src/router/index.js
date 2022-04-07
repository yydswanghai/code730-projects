import { createRouter, createWebHistory } from 'vue-router'
import { RootRoute, LoginRoute, RedirectRoute } from '@/router/base';
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

routeModuleList.sort(sortRoute)
//需要验证权限
export const asyncRoutes = [...routeModuleList]

// 普通路由 无需验证权限
export const constantRouter = [RootRoute, LoginRoute, RedirectRoute]

const router = createRouter({
    history: createWebHistory(),
    routes: constantRouter.concat(...asyncRoutes),
    strict: true,
    scrollBehavior: () => ({ left: 0, top: 0 }),
})

export default router