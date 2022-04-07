import { useAsyncRouteStore } from '@/store/modules/asyncRoute'
import { useUserStore } from '@/store/modules/user'
import { ErrorPageRoute } from '@/router/base'
/**
 * 路由守卫
 */
const whitePathList = ['/login']// 白名单

export function createRouterGuards(router){
    
    router.onError((error) => {
        console.log(error, '路由错误')
    })
}