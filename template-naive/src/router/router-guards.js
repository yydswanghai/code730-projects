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

    router.beforeEach(async (to, form, next) => {
        const Loading = window['$loading'] || null
        // 开始进度条
        Loading && Loading.start()
        // 确定用户是否已登录
        const hasToken = getStorage(ACCESS_TOKEN)
        if(hasToken){
            if(to.path === '/login'){
                // 如果已登录，则重定向到主页
                next({ path: '/' })
                Loading && Loading.finish()
            }else{
                try{
                    const hasInfo = userStore.userInfo
                    if(hasInfo){// 如果没有用户信息
                        next()
                    }else{
                        const userInfo = await userStore.getInfo()
                        const routes = await asyncRouteStore.generateRoutes(userInfo)
                        // 动态添加可访问路由表
                        routes.forEach((item) => {
                            router.addRoute(item)
                        })
                        // 添加404
                        router.addRoute(ErrorPageRoute)
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
                Loading && Loading.finish()
            }else{
                // 没有访问权限的其他页面被重定向到登录页面。
                next(`/login?redirect=${to.path}`)
                Loading && Loading.finish()
            }
        }
        
    })

    router.afterEach((to, _, failure) => {
        const Loading = window['$loading'] || null
        // 设置标题
        document.title = to?.meta?.title || document.title

        Loading && Loading.finish()
    })

    router.onError((error) => {
        console.log(error, '路由错误')
    })
}