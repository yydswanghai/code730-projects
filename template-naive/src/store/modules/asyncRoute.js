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
 * 1.添加子路由
 * @param routerMap
 * 后端传过来的数组里对象可能存在 { parentId: -1, ... }的对象而且没有 children。
 * 这时 parentId: -1 对应的是 Layout 组件，但是如果你点菜单就只渲染一个框架(Layout组件)，而内容区没有任何显示。(因为没有组件)
 * 为了避免这种情况：通过 parentId:-1 来判断是否是一级路由
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
 * 2. 将数组里的一个个对象映射成对应的 router 对象
 * component 在后面处理
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
            currentRouter.component = item.path// '/commend-management/add'
        }
        if(item.children && item.children.length > 0){// 如果有children则递归处理
            currentRouter.children = generator(item.children)
        }
        return currentRouter
    })
}
// 3.查找views中对应的组件文件
function asyncImportRoute(routes) {
    let viewsModules = import.meta.glob('@/views/**/*.{vue,jsx}')
    // viewsModules里每一项 { key: 对应的文件路径 value: 对应的动态组件 }
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
// 动态导入 component 当前组件的路径，在viewsModules找到和这个component路径相同的组件并返回
function dynamicImport(viewsModules, component) {// 例如 component: /commend-management/add
    const matchKeys = Object.keys(viewsModules).filter((key) => {// key: ../../views/user/commend-management/add.vue

        let k = key.replace('../../views/user', '') // k: /commend-management/add.vue
        const lastIndex = k.lastIndexOf('.')        // 去掉.vue
        k = k.substring(0, lastIndex)               // k: /commend-management/add
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

/**
 * 动态路由相关的状态
 */
export const useAsyncRouteStore = defineStore({
    id: 'async-route',
    state: () => ({
        routes: [],     // 用户路由 (固定路由 + 动态路由) 用于在路由鉴权的时候动态添加到路由里，不然会访问不到对应的路由
        menus: [],      // 菜单 用于生成侧边栏
        keepAliveComponents: [],// 缓存组件
    }),
    getters: {
        getUserStore(){// 用户状态
            return useUserStore()
        },
        $message(){// 弹窗提示
            return useMessage()
        }
    },
    actions: {
        setRoutes(routers){// 设置路由
            this.routes = constantRouter.concat(routers)
        },
        setMenus(menus) {// 设置菜单
            // 添加控制台
            const DashboardRoute = constantRouter.find(it => it.name === 'dashboard')
            this.menus = [DashboardRoute, ...menus]
        },
        setKeepAliveComponents(compNames) {// 设置需要缓存的组件
            this.keepAliveComponents = compNames;
        },
        /**
         * 生成路由
         * 1. 后台用户：请求接口获得数组，然后生成路由
         * 2. 普通用户和集体用户：基于 asyncRouter 通过 permissions 过滤得到路由
         */
        async generateRoutes(data){
            let accessedRouters// 即是当前要添加的路由，也是用户的当前菜单
            const permissionsList = data.permissions || []// todo 权限列表，这里仅做了一级路由的权限来控制包含它以及它的子路由
            if(this.getUserStore.userType == 3){
                const resp = await getUserMenu()
                if(resp.code === 200){
                    try {
                        const hasChildRouteList = addChildren(resp.data)// 1. 添加子路由

                        const routeList = generator(hasChildRouteList)// 2. 将数组里的对象映射为一个个的 router 对象

                        asyncImportRoute(routeList)// 3. 此时每个路由的component还是字符串，根据字符串动态生成对应的组件

                        accessedRouters = routeList
                    } catch (error) {
                        console.log(error)
                    }
                }else{
                    this.$message.error(resp.msg)
                }
            }else{
                // 用 permissionsList 来过滤掉 asyncRouter 里哪些路由是该用户的
                // 例如 permissionsList = ['Form'] 那个该用户就仅有一个为 name="Form" 的路由及菜单要添加
                accessedRouters = permissionsList.length ?
                asyncRouter.filter(it => permissionsList.includes(it.name))
                : asyncRouter
            }

            this.setMenus(accessedRouters)
            this.setRoutes(accessedRouters)
            return toRaw(accessedRouters)
        }
    }
})