import { reactive, readonly } from "vue";
import { constantRoutes, userRoutes } from '@/router/routes'
import { useRouter } from 'vue-router'
/**
 * 鉴权路由
 */
const state = reactive({
    routes: [],// 用户路由
    permissions: {},// 用户权限对象
})

export const permissionStore = readonly(state)

/**
 * 生成路由
 * @param {Object} userinfo 用户信息
 */
export async function generateRoutes(userinfo) {
    let accessedRoutes
    // 如果是后台登录
    if(false){// todo getUserType() == 3
        // const response = await getUserMenu(-1)
        // state.permissions = response.permissions
    }else{
        accessedRoutes = userRoutes
    }
    // 合并到状态里
    state.routes = constantRoutes.concat(accessedRoutes)

    addRoutes(accessedRoutes)
    return accessedRoutes
}
/**
 * 添加路由
 */
export async function addRoutes(routes) {
    const router = useRouter()
    routes.forEach(route => {
        router.addRoute(route)
    })
    console.log(router.getRoutes());
}
/**
 * 清除路由
 */
export async function clearRouter() {
    // todo
}