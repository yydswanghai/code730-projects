import { defineStore } from 'pinia'
import { toRaw } from 'vue'
import { ElMessage } from "element-plus"
import { constantRouter, asyncRouter } from '@/router'
import { IRouteRecordRaw } from '@/router/types'
import { PageEnum } from '@/enums/pageEnum'
import { userEnum } from '@/enums/userEnum'
import { useUserStore } from './user'
import { getUserMenu } from '@/api/user'
import { Layout } from '@/router/constant'
import { renderIcon } from '@/utils/'
import * as $icons from '@/icons/'
import { isExternal } from '@/utils/'

export type IState = {
    routes: IRouteRecordRaw[]
    menus: IRouteRecordRaw[]
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
    getters: {
        getUserStore(){
            return useUserStore();
        }
    },
    actions: {
        /* 设置路由 */
        setRoutes(routers: IRouteRecordRaw[]){
            this.routes = constantRouter.concat(routers);
        },
        /* 设置菜单 */
        setMenus(menus: IRouteRecordRaw[]){
            // 根据控制台的hidden决定是否添加到菜单中
            const DashboardRoute = constantRouter.find(it => it.name === PageEnum.HOME_NAME)!;
            if(!DashboardRoute.meta.hidden){
                this.menus = [DashboardRoute, ...menus];
            }else{
                this.menus = menus;
            }
        },
        /* 设置需要缓存的组件 */
        setKeepAliveComponents(compNames: string[]){
            this.keepAliveComponents = compNames;
        },
        /**
         * 生成路由
         * 后台用户根据接口生成
         * 其他用户，属于router/modules目录下的路由，通过权限列表去分配
         */
        async generateRoutes(data: any){
            let accessedRouters: IRouteRecordRaw[] = [];
            const permissionsList: string[] = data.permissions || [];// 权限列表
            if(this.getUserStore.user_type === userEnum.system){
                const menus = await fetchMenu();
                if(menus.length){
                    accessedRouters = menus;
                }
            }else{
                accessedRouters = permissionsList.length ?
                asyncRouter.filter(it => permissionsList.includes(it.name)) : asyncRouter
            }

            this.setMenus(accessedRouters);
            this.setRoutes(accessedRouters);
            return toRaw(accessedRouters);
        }
    }
});

type IViewsModules = Record<string, () => Promise<Recordable>>
/**
 * 请求接口获取菜单
 */
async function fetchMenu(){
    const resp = await getUserMenu();
    if(resp.code === 200){
        const routerMap = addChildrenRouter(resp.data);
        const routerList = generator(routerMap);
        asyncImportRoute(routerList);
        return routerList;
    }else{
        ElMessage.error(resp.msg);
        return [];
    }
}
/**
 * 1. 添加子路由（一级路由都是渲染Layout组件，但是它一般还需要一个子路由来显示中心视图）
 * 则生成一个一级路由的镜像子路由，但是如下属性不同：
 * path=''
 * name=name+'Index'
 * component=path+'/index'
 */
function addChildrenRouter(resData: any[]) {
    return resData.map(it => {
        const { path, name, id, parentId, permission, sortOrder, type, meta } = it;
        if(isExternal(it.path)){// 外部链接
            it.path = `/${path}`;
        }
        if(parentId === '-1' && !it.children){
            it.children = [];
            it.children.unshift({
                id,
                path: '',
                name: `${name}Index`,
                parentId,
                component: `${path}/index`,
                permission,
                sortOrder,
                type,
                meta,
            });
        }
        return it;
    })
}
/**
 * 2. 生成router对象
 */
function generator(routers: any[]): IRouteRecordRaw[] {
    return routers.map(it => {
        const { path, name, component, meta } = it;
        // 处理icon
        let icon = null;
        if(meta.icon){
            // 如果icons目录下能找到这个icon名的组件就返回，否则返回null
            const iconComponent = renderIcon(($icons as any)[meta.icon as string]);
            if(Boolean(iconComponent)){
                icon = iconComponent;
            }
        }
        const routerInfo = {
            path,
            name,
            component,
            meta: {
                ...meta,
                icon,
                keepAlive: meta.keepAlive === '1',
                alwaysShow: meta.alwaysShow === '1',
                hidden: meta.hidden === '1',
                affix: meta.affix === '1'
            }
        }
        if(it.children && it.children.length){
            Reflect.set(routerInfo, 'children', generator(it.children));
        }
        return routerInfo;
    })
}
/**
 * 3. 查找views中对应的组件文件
 */
function asyncImportRoute(routers: IRouteRecordRaw[]) {
    if (!routers) return
    let viewsModules: IViewsModules = import.meta.glob('@/views/menus/**/*.{vue,tsx}');
    routers.forEach(it => {
        const { component, children } = it;
        if(component){
            if(component === 'LAYOUT'){
                it.component = Layout;
            }else{
                it.component = dynamicImport(viewsModules, component as string);
            }
        }
        children && asyncImportRoute(children)
    })
}
/**
 * 4. 动态导入组件
 */
function dynamicImport(viewsModules: IViewsModules, component: string) {
    const matchKeys = Object.keys(viewsModules).filter(key => {
        // 去除首 '../../views/menus/' 和尾 '.vue' 字符
        const k = key.replace('../../views/menus', '').replace('.vue', '');
        return k === component;
    });
    if(matchKeys?.length === 1){
        const matchKey = matchKeys[0];
        return viewsModules[matchKey]
    }
    if(matchKeys?.length > 1){
        console.warn(
            '请不要创建.vue，和在views/menus文件夹下的相同层次目录中，具有相同文件名的tsx文件。这将导致动态引入失败'
        )
        return;
    }
}