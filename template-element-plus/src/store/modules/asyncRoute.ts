import { defineStore } from 'pinia'
import { constantRouter } from '@/router'
import { IRouteRecordRaw } from '@/router/types'

export type IState = {
    routes: IRouteRecordRaw[]
    menus: any[]
    keepAliveComponents: string[]
}

/**
 * 动态路由
 */
export const useAsyncRouteStore = defineStore({
    id: 'async-route',
    state: (): IState => ({
        routes: [],// 用户路由
        menus: [],// 菜单 用于生成侧边栏
        keepAliveComponents: []// 缓存组件
    }),
    actions: {
        /* 设置路由 */
        setRoutes(routers: IRouteRecordRaw[]){
            this.routes = constantRouter.concat(routers);
        },
    }
})