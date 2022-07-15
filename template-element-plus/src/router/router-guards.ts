import { useAsyncRouteStore } from '@/store/modules/asyncRoute'
import { useUserStore } from '@/store/modules/user'
import { Router } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { PageEnum } from '@/enums/pageEnum'
import { authEnum } from '@/enums/userEnum'
import { getStorage } from '@/utils/auth'
import { ErrorPageRoute } from '@/router/base'

/**
 * 路由守卫
 */
const whiteList: string[] = [PageEnum.LOGIN]// 白名单

export function createRouterGuards(router: Router) {
    NProgress.configure({ showSpinner: false });
    const asyncRouteStore = useAsyncRouteStore();
    const userStore = useUserStore();

    router.beforeEach(async (to, from, next) => {
        NProgress.start();
        const hasToken = getStorage(authEnum.ACCESS_TOKEN);
        if(!hasToken){// 没有token
            // 不在白名单中
            if(!whiteList.includes(to.path)){
                console.log(1)
                next(`${PageEnum.LOGIN}?redirect=${to.path}`);
                return;
            }else{
                next();
                return;
            }
        }
        if(to.path === PageEnum.LOGIN){
            // 如果已登录，则重定向到主页
            next({ path: '/' });
            return;
        }
        const hasInfo = userStore.user_info;
        if(!hasInfo){// 有token，但没有用户信息
            try {
                const userInfo = await userStore.getInfo();
                const routes = await asyncRouteStore.generateRoutes(userInfo);
                // 动态添加可访问路由表
                routes.forEach(item => {
                    router.addRoute(item)
                });
                // 添加404
                const isErrorPage = router.getRoutes().findIndex(it => it.name === PageEnum.ERROR_NAME);
                if(isErrorPage !== -1){
                    router.addRoute(ErrorPageRoute);
                }
                next({ ...to, replace: true });
                return;
            } catch (error) {
                console.log(error)
                // 获取用户信息出错
                await userStore.logout();
                next(`${PageEnum.LOGIN}?redirect=${to.path}`);
                return;
            }
        }
        next();
    });
    router.afterEach((to, _, failure) => {
        // 设置标题
        document.title = to?.meta?.title as string || document.title;
        // 在这里设置需要缓存的组件名称
        const keepAliveComponents = asyncRouteStore.keepAliveComponents;
        // 当前组件名
        const currentComName: any = to.matched.find(it => it.name == to.name)?.name;
        // 如果当前组件不在缓存组件数组里，并且开启 meta.keepAlive
        if(currentComName && !keepAliveComponents.includes(currentComName) && to.meta?.keepAlive){
            keepAliveComponents.push(currentComName)// 缓存的当前组件名
        }else if(!to.meta?.keepAlive || to.name == PageEnum.REDIRECT_NAME){
            // 不需要缓存的组件
            const index = asyncRouteStore.keepAliveComponents.findIndex(name => name == currentComName);
            if (index !== -1) {
                keepAliveComponents.splice(index, 1)
            }
        }
        asyncRouteStore.setKeepAliveComponents(keepAliveComponents);
        NProgress.done();
    });

    router.onError((error) => {
        console.log(error, '路由错误');
    });
}