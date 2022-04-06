import { useAsyncRouteStore } from '@/store/modules/asyncRoute'
import { useUserStore } from '@/store/modules/user'
import { ACCESS_TOKEN, getStorage } from '@/utils/auth'
import { ErrorPageRoute } from '@/router/base'
/**
 * 路由守卫
 */
const whitePathList = ['/login']// 白名单

export function createRouterGuards(router){
    const asyncRouteStore = useAsyncRouteStore()
    const userStore = useUserStore()
    const Loading = window['$loading'] || null
    router.beforeEach(async (to ,from, next) => {
        Loading && Loading.start()
        // if(from.path === '/login' && to.name === 'errorPage'){
        //     next('/dashboard')
        //     return
        // }
        // // 在白名单内直接进入系统
        // if(whitePathList.includes(to.path)){
        //     next()
        //     return
        // }

        // const token = getStorage(ACCESS_TOKEN)
        
        // if(!token){
        //     // 您可以无权限访问。您需要设置路由
        //     if(to.meta.ignoreAuth){
        //         next()
        //         return
        //     }
        //     // 重定向登录页面
        //     const redirectData = {
        //         path: '/login',
        //         replace: true
        //     }
        //     if(to.path){
        //         redirectData.query = {
        //             ...redirectData.query,
        //             redirect: to.path
        //         }
        //     }
        //     next(redirectData)
        //     return
        // }

        // if(asyncRouteStore.isDynamicAddedRoute){
        //     next()
        //     return
        // }

        const userInfo = await userStore.getInfo()

        const routes = await asyncRouteStore.generateRoutes()
        
        // 动态添加可访问路由表
        routes.forEach((item) => {
            router.addRoute(item)
        })

        // 添加404
        const isErrorPage = router.getRoutes().findIndex((item) => item.name === ErrorPageRoute.name)
        if(isErrorPage !== -1){
            router.addRoute(ErrorPageRoute)
        }

        // const redirectPath = (from.query.redirect || to.path)
        // const redirect = decodeURIComponent(redirectPath)
        // const nextData = to.path === redirect ? { ...to, replace: true } : { path: redirect }
        // asyncRouteStore.setDynamicAddedRoute(true)
        next()
        Loading && Loading.finish()
    })

    // router.afterEach((to, _, failure) => {
    //     document.title = (to?.meta?.title) || document.title
    //     // 在这里设置需要缓存的组件名称
    //     const keepAliveComponents = asyncRouteStore.keepAliveComponents
    //     const currentComName = to.matched.find((item) => item.name === to.name)?.name
    //     if (currentComName && !keepAliveComponents.includes(currentComName) && to.meta?.keepAlive) {
    //         // 需要缓存的组件
    //         keepAliveComponents.push(currentComName)
    //     } else if (!to.meta?.keepAlive || to.name == 'Redirect') {
    //         // 不需要缓存的组件
    //         const index = asyncRouteStore.keepAliveComponents.findIndex((name) => name == currentComName)
    //         if (index != -1) {
    //             keepAliveComponents.splice(index, 1)
    //         }
    //     }
    //     asyncRouteStore.setKeepAliveComponents(keepAliveComponents)
    //     Loading && Loading.finish()
    // })

    router.onError((error) => {
        console.log(error, '路由错误')
    })
}