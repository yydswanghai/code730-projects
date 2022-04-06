import { h } from 'vue'
import { NIcon } from 'naive-ui'
import { cloneDeep } from 'lodash-es'
/**
 * render 图标
 */
export function renderIcon(icon) {
    return () => h(NIcon, null, { default: () => h(icon) })
}

/**
 * 判断根路由 Router
 */
export function isRootRouter(item) {
    return item.meta?.alwaysShow != true && item.children?.length === 1;
}

/**
 * 排除Router
 * @param {Array} routerMap
 */
export function filterRouter(routerMap) {
    return routerMap.filter((item) => {
        return (
            (item.meta?.hidden || false) != true && !['/:path(.*)*', '/', '/redirect', '/login'].includes(item.path)
        )
    })
}
/**
 * 递归组装菜单格式
 * @param {Array} routerMap
 */
export function generatorMenu(routerMap) {
    return filterRouter(routerMap).map((item) => {
        const isRoot = isRootRouter(item)
        const info = isRoot ? item.children[0] : item
        const currentMenu = {
            ...info,
            ...info.meta,
            label: info.meta?.title,
            key: info.name,
            icon: isRoot ? item.meta?.icon : info.meta?.icon
        }
        // 是否有子菜单，并递归处理
        if(info.children && info.children.length > 0){
            currentMenu.children = generatorMenu(info.children)
        }
        return currentMenu
    })
}

/**
 * 混合菜单
 * @param {Array} routerMap
 * @param {String} routerName
 * @param {String} location
 */
export function generatorMenuMix() {
    const cloneRouterMap = cloneDeep(routerMap);
    const newRouter = filterRouter(cloneRouterMap)
    if (location === 'header') {
        const firstRouter = []
        newRouter.forEach((item) => {
            const isRoot = isRootRouter(item)
            const info = isRoot ? item.children[0] : item
            info.children = undefined
            const currentMenu = {
                ...info,
                ...info.meta,
                label: info.meta?.title,
                key: info.name,
            }
            firstRouter.push(currentMenu)
        })
        return firstRouter
    }else{
        return getChildrenRouter(newRouter.filter((item) => item.name === routerName))
    }
}

/**
 * 递归组装子菜单
 * @param {Array} routerMap
 */
export function getChildrenRouter(routerMap) {
    return filterRouter(routerMap).map((item) => {
        const isRoot = isRootRouter(item)
        const info = isRoot ? item.children[0] : item
        const currentMenu = {
            ...info,
            ...info.meta,
            label: info.meta?.title,
            key: info.name,
        }
        // 是否有子菜单，并递归处理
        if (info.children && info.children.length > 0) {
            // Recursion
            currentMenu.children = getChildrenRouter(info.children);
        }
        return currentMenu
    })
}