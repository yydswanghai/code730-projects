import { defineStore } from 'pinia'
import { getUserMenu } from '@/api/user'
import { asyncRoutes, constantRouter } from '@/router/index'
import { renderIcon } from '@/utils/'
import { toRaw } from 'vue'

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
            currentRouter.component = () => import(/* @vite-ignore */`@/views/user${item.path}.vue`)
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
        permissions: [],// 用户权限
        routes: [],// 用户路由
        addRoutes: [],
    }),
    actions: {
        // 设置动态路由
        setRoutes(routers){
            this.addRoutes = routers
            this.routes = constantRouter.concat(routers)
        },
        // 设置用户权限
        setPermissions(permissions){
            this.permissions = permissions
        },
        // 生成路由
        async generateRoutes(info){
            let accessedRouters
            this.setPermissions(info.permissions)
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
            this.setRoutes(accessedRouters)
            return toRaw(accessedRouters)
        }
    }
})