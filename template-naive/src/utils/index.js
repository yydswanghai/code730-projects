import { h } from 'vue'
import { NIcon } from 'naive-ui'
/**
 * render 图标: 用来生成icon图标
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

/**
 * 获取assets目录静态资源
 */
export function getAssetsFile(url = '') {
    return new URL(`../assets/${url}`, import.meta.url).href
}