import { defineStore } from 'pinia'
import { getUserMenu } from '@/api/user'
import { constantRouter, asyncRouter } from '@/router/index'
import { renderIcon } from '@/utils/'
import { toRaw } from 'vue'
import { useUserStore } from './user'
import * as $icons from '@vicons/antd'
import { useMessage } from 'naive-ui'

/**
 * 动态生成菜单
 * @param routerMap
 */
const Layout = () => import('@/layout/index.vue')
const ParentLayout = () => import('@/layout/parentLayout.vue')
function generator(routerMap) {
    return routerMap.map((item) => {
        const currentRouter = {
            path: item.path,
            name: item.routeName,
            meta: {
                title: item.label,
                sort: item.sortOrder,
                keepAlive: item.keepAlive === '1',
                icon: item.icon ? renderIcon($icons[item.icon]) : null
                // todo https://www.xicons.org/#/ 图标可能有限得换个更好的方式
            }
        }
        if(item.parentId === '-1'){
            currentRouter.component = 'LAYOUT'
            if(!item.children){
                currentRouter.children = generator([{
                    id: item.id.substring(0,2) + '10',
                    name: item.name,
                    label: item.label,
                    keepAlive: item.keepAlive,
                    icon: null,
                    parentId: item.id,
                    path: item.path + '/index',
                    routeName: item.routeName + '-index',
                    sortOrder: item.sortOrder,
                    type: item.type,
                    permission: item.permission,
                }])
            }
        }else{
            currentRouter.component = item.path// /commend-management/add
        }

        if(item.children && item.children.length > 0){
            currentRouter.children = generator(item.children)
        }
        return currentRouter
    })
}
// 查找views中对应的组件文件
function asyncImportRoute(routes) {
    let viewsModules = import.meta.glob('@/views/**/*.{vue,jsx}')
    if (!routes) return
    routes.forEach(item => {
        const { component, name, children } = item
        if(component){
            if(component === 'LAYOUT'){
                item.component = Layout
            }else{
                item.component = dynamicImport(viewsModules, component)
            }
        }else if(name){
            item.component = ParentLayout;
        }
        children && asyncImportRoute(children)
    })
}
// 动态导入
function dynamicImport(viewsModules, component) {
    const matchKeys = Object.keys(viewsModules).filter((key) => {// key: ../../views/user/commend-management/add.vue

        let k = key.replace('../../views/user', '')// k: /commend-management/add.vue
        const lastIndex = k.lastIndexOf('.')
        k = k.substring(0, lastIndex)      // /commend-management/add
        return k === component
    })
    if(matchKeys?.length === 1){
        const matchKey = matchKeys[0]
        return viewsModules[matchKey]
    }
    if (matchKeys?.length > 1) {
        console.warn(
            '请不要创建.vue，和在views文件夹下的相同层次目录中，具有相同文件名的jsx文件。这将导致动态引入失败'
        )
        return
    }
}

export const useAsyncRouteStore = defineStore({
    id: 'async-route',
    state: () => ({
        routes: [],// 用户路由 固定 + 动态
        menus: [],// 菜单 用于生成侧边栏
        keepAliveComponents: [],// 缓存组件
    }),
    getters: {
        getUserStore(){
            return useUserStore()
        },
        $message(){
            return useMessage()
        }
    },
    actions: {
        setRoutes(routers){// 设置动态路由
            this.routes = constantRouter.concat(routers)
        },
        setMenus(menus) {// 设置动态路由
            this.menus = menus;
        },
        setKeepAliveComponents(compNames) {// 设置需要缓存的组件
            this.keepAliveComponents = compNames;
        },
        /**
         * 生成路由
         * 判断是否由后台登录，如果是，则请求获取后台的菜单接口得到路由，否则直接使用 asyncRouter
         */
        async generateRoutes(data){
            let accessedRouters
            const permissionsList = data.permissions || []// todo(暂时没用) 权限列表，我这里直接请求到后台路由，不在这里做权限过滤
            if(this.getUserStore.userType == 3){
                const resp = await getUserMenu()// 用户菜单
                if(resp.code === 200){
                    try {
                        const routeList = generator(resp.data)
                        asyncImportRoute(routeList)
                        accessedRouters = routeList
                    } catch (error) {
                        console.log(error)
                    }
                }else{
                    this.$message.error(resp.msg)
                }
            }else{
                accessedRouters = asyncRouter
            }

            this.setRoutes(accessedRouters)
            this.setMenus(accessedRouters)
            return toRaw(accessedRouters)
        }
    }
})