import { RouteRecordRaw } from "vue-router"
import { createRouter, createWebHashHistory } from 'vue-router'
import { RootRoute, DashboardRoute, RedirectRoute, ErrorPageRoute } from "./base"

/* 加载modules目录下的所有文件 */
const modules = import.meta.globEager('./modules/**/*.ts');
const routeModuleList: RouteRecordRaw[] = [];
Object.keys(modules).forEach((key) => {
    const mod = modules[key].default || {};
    const modList = Array.isArray(mod) ? [...mod] : [mod];
    routeModuleList.push(...modList);
});
/* 按照 meta.sort 排序 */
function sortRoute(a: RouteRecordRaw, b: RouteRecordRaw) {
    return (a.meta?.sort as any || 0) - (b.meta?.sort as any || 0);
}
routeModuleList.sort(sortRoute)

// 固定的路由 无需验证权限
export const constantRouter = [RootRoute, DashboardRoute, RedirectRoute, ErrorPageRoute];

// 用户端写死的路由，如果不是通过后端请求到的，则就使用这个路由
export const asyncRouter = [...routeModuleList]

const router = createRouter({
    history: createWebHashHistory(''),
    routes: constantRouter,
    strict: true,
    scrollBehavior: () => ({ left: 0, top: 0 }),
});

export { router }