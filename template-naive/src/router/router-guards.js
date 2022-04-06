import { useAsyncRouteStore } from '@/store/modules/asyncRoute'
/**
 * 路由守卫
 */
const whitePathList = ['/login']// 白名单

export function createRouterGuards(router){
    const asyncRouteStore = useAsyncRouteStore()
    router.beforeEach(async (to ,from, next) => {
        const Loading = window['$loading'] || null
        Loading && Loading.start()
        if(from.path === '/login' && to.name === 'errorPage'){
            next('/dashboard')
            return
        }
        // 在白名单内直接进入系统
        if(whitePathList.includes(to.path)){
            next()
            return
        }
        
    })
}