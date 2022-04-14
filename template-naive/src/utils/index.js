import { h } from 'vue'
import { NIcon } from 'naive-ui'
/**
 * render 图标
 * @param {Component} icon
 */
export function renderIcon(icon) {
    return () => h(NIcon, null, { default: () => h(icon) })
}

/**
 * 刷新当前页面
 * @param {Object} $router useRouter
 * @param {Object} $route  useRoute
 */
export function reloadThePage($router, $route) {
    $router.push({
        path: '/redirect' + $route.fullPath,
        query: $route.query,
    })
}