import { useAsyncRouteStore } from '@/store/modules/asyncRoute'
import { useUserStore } from '@/store/modules/user'
import { ErrorPageRoute } from '@/router/base'
import { getStorage, ACCESS_TOKEN } from '@/utils/auth'

/**
 * 路由守卫
 */
const whiteList = ['/login']// 白名单

export function createRouterGuards(router){
    const asyncRouteStore = useAsyncRouteStore()
    const userStore = useUserStore()

    router.beforeEach(async (to, from, next) => {
        const Loading = window['$loading'] || null
        // 开始进度条
        Loading && Loading.start()
        // 是否有token
        const hasToken = getStorage(ACCESS_TOKEN)
        if(hasToken){
            if(to.path === '/login'){
                // 如果已登录，则重定向到主页
                next({ path: '/' })
                Loading && Loading.finish()
            }else{
                try{
                    // 是否有用户信息 userStore没有将userInfo存在本地的原因主要是：
                    // 把`获取用户信息`和`获取菜单路由`放在一起执行，页面刷新则重新再请求获取
                    const hasInfo = userStore.userInfo
                    if(hasInfo){
                        next()
                    }else{
                        const userInfo = await userStore.getInfo()
                        const routes = await asyncRouteStore.generateRoutes(userInfo)
                        // 动态添加可访问路由表
                        routes.forEach((item) => {
                            router.addRoute(item)
                        })
                        // 添加404
                        const isErrorPage = router.getRoutes().findIndex((item) => item.name === ErrorPageRoute.name);
                        if (isErrorPage === -1) {
                            router.addRoute(ErrorPageRoute)
                        }
                        next({ ...to, replace: true })
                    }
                }catch(e){
                    // 出现错误登出，进入登录页面重新登录
                    await logout()
                    next(`/login?redirect=${to.path}`)
                    Loading && Loading.finish()
                }
            }

        }else{
            if(whiteList.includes(to.path)){
                // 在免费登录白名单中，直接进入
                next()
            }else{
                // 没有访问权限的其他页面被重定向到登录页面。
                next(`/login?redirect=${to.path}`)
            }
            Loading && Loading.finish()
        }
    })

    router.afterEach((to, _, failure) => {
        // 设置标题
        document.title = to?.meta?.title || document.title
        // 在这里设置需要缓存的组件名称
        const keepAliveComponents = asyncRouteStore.keepAliveComponents
        // 当前组件名
        const currentComName = to.matched.find((it) => it.name == to.name)?.name
        // 如果当前组件不在缓存组件数组里，并且开启 meta.keepAlive
        if(currentComName && !keepAliveComponents.includes(currentComName) && to.meta?.keepAlive){
            // 缓存的当前组件名
            keepAliveComponents.push(currentComName)
        }else if(!to.meta?.keepAlive || to.name == 'Redirect'){
            // 不需要缓存的组件
            const index = asyncRouteStore.keepAliveComponents.findIndex(name => name == currentComName)
            if (index != -1) {
                keepAliveComponents.splice(index, 1)
            }
        }
        asyncRouteStore.setKeepAliveComponents(keepAliveComponents)
        const Loading = window['$loading'] || null
        Loading && Loading.finish()
    })

    router.onError((error) => {
        console.log(error, '路由错误')
    })
}