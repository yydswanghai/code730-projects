import { defineStore } from 'pinia'
import { getUserInfo, getUserMenu } from '@/api/user'
import { asyncRoutes, constantRouter } from '@/router/index'
import { renderIcon } from '@/utils/'
import { toRaw } from 'vue';

/**
 * 格式化 后端接口路由信息并递归生成层级路由表
 * @param routerMap
 */
function generator(routerMap) {
    return routerMap.map((item) => {
        const currentRouter = {
            path: item.path,
            name: item.routeName,
            meta: {
                title: item.label,
                sort: item.sortOrder,
                keepAlive: item.keepAlive === '1'
            }
        }
        if(item.parentId === '-1'){
            currentRouter.component = () => import('@/layout/index.vue')
        }else{
            const url = `@/views/user${item.path}.vue`
            currentRouter.component = () => import(url)
        }
        if(item.icon){
            currentRouter.meta.icon = renderIcon(item.icon)
        }
        if(item.children && item.children.length > 0){
            currentRouter.children = generator(item.children)
        }
        return currentRouter
    })
}

export const useAsyncRouteStore = defineStore({
    id: 'async-route',
    state: () => ({
        menus: [],// 用户菜单
        permissions: [],// 用户权限
        routers: constantRouter,// 路由
        addRouters: [],
        keepAliveComponents: [],// 缓存
        isDynamicAddedRoute: false,// 是否动态添加路由
    }),
    actions: {
        // 设置菜单
        setMenus(menus){
            this.menus = menus
        },
        // 设置动态路由
        setRouters(routers){
            this.addRouters = routers
            this.routers = constantRouter.concat(routers)
        },
        // 设置需要缓存的组件
        setKeepAliveComponents(compNames) {
            this.keepAliveComponents = compNames
        },
        setDynamicAddedRoute(added){
            this.isDynamicAddedRoute = added
        },
        async generateRoutes(data){
            let accessedRouters
            const userInfo = await getUserInfo()// 用户信息
            if(userInfo.code === 200){
                this.permissions = userInfo.permissions
            }
            const userMenu = await getUserMenu()// 用户菜单
            if(userMenu.code === 200){
                try {
                    accessedRouters = generator(userMenu.data)
                } catch (error) {
                    console.log(error)
                }
            }else{
                try {
                    accessedRouters = asyncRoutes
                } catch (error) {
                    console.log(error)
                }
            }
            this.setRouters(accessedRouters)
            this.setMenus(accessedRouters)
            return toRaw(accessedRouters)
        }
    }
})