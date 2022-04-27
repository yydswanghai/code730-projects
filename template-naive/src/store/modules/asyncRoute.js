import { defineStore } from 'pinia'
import { getUserMenu } from '@/api/user'
import { constantRouter, asyncRouter } from '@/router/index'
import { renderIcon } from '@/utils/'
import { toRaw } from 'vue'
import { useUserStore } from './user'
import * as $icons from '@vicons/antd'
import { useMessage } from 'naive-ui'

const Layout = () => import('@/layout/index.vue')
const ParentLayout = () => import('@/layout/parentLayout.vue')

/**
 * 添加子路由
 * @param routerMap
 * 通过 parentId:-1 来判断是否是一级路由
 * 如果是一级路由，且该路由下没有子路由，则默认给该路由添加一个 index 子路由
 */
function addChildren(routerMap) {
    return routerMap.map(item => {
        if(item.parentId === '-1'){
            if(!item.children){
                item.children = [{
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
                }]
            }
        }
        return item
    })
}
/**
 * 动态生成菜单
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
                keepAlive: item.keepAlive === '1',
                icon: item.icon ? renderIcon($icons[item.icon]) : null
                // todo https://www.xicons.org/#/ 图标可能有限得换个更好的方式
            }
        }
        if(item.parentId === '-1'){
            currentRouter.component = 'LAYOUT'
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
        setMenus(menus) {// 设置菜单
            this.menus = menus;
        },
        setKeepAliveComponents(compNames) {// 设置需要缓存的组件
            this.keepAliveComponents = compNames;
        },
        /**
         * 生成路由
         * 后台用户：请求获取后台的菜单接口得到路由
         * 普通用户：asyncRouter 通过 permissions 过滤路由
         * 集体用户：asyncRouter 通过 permissions 过滤路由
         */
        async generateRoutes(data){
            let accessedRouters
            const permissionsList = data.permissions || []// todo 权限列表，这里仅做了一级路由的权限来控制包含它以及它的子路由
            if(this.getUserStore.userType == 3){
                const resp = await getUserMenu()// 用户菜单
                if(resp.code === 200){
                    try {
                        const hasChildRouteList = addChildren(resp.data)

                        const routeList = generator(hasChildRouteList)
                        console.log(routeList);

                        asyncImportRoute(routeList)// 生成组件

                        accessedRouters = routeList
                    } catch (error) {
                        console.log(error)
                    }
                }else{
                    this.$message.error(resp.msg)
                }
            }else{
                // 用 permissionsList 来过滤掉 asyncRouter 里哪些路由是该用户的
                accessedRouters = permissionsList.length ?
                asyncRouter.filter(it => permissionsList.includes(it.name))
                : asyncRouter
            }

            this.setRoutes(accessedRouters)
            this.setMenus(accessedRouters)
            return toRaw(accessedRouters)
        }
    }
})