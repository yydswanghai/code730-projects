import { defineStore } from 'pinia'
import { getUserMenu } from '@/api/user'
import { constantRouter, asyncRouter } from '@/router/index'
import { renderIcon } from '@/utils/'
import { toRaw } from 'vue'
import { CheckOutlined } from '@vicons/antd'

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
                icon: renderIcon(CheckOutlined) || null// todo
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
        routes: [],// 用户路由
        addRoutes: [],
    }),
    actions: {
        // 设置动态路由
        setRoutes(routers){
            this.addRoutes = routers
            this.routes = constantRouter.concat(routers)
        },
        // 生成路由
        async generateRoutes(){
            let accessedRouters
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
                try {
                    accessedRouters = asyncRouter
                } catch (error) {
                    console.log(error)
                }
            }
            this.setRoutes(accessedRouters)
            return toRaw(accessedRouters)
        }
    }
})