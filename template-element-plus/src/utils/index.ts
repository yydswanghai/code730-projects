import { h } from 'vue'
import { ElIcon } from 'element-plus'

/**
 * render 图标
 * */
export function renderIcon(icon: any) {
    return () => h(ElIcon, null, { default: () => h(icon) });
}
/**
 * 是否为外部链接
 */
export function isExternal(path: string) {
    return /http(s)?:/.test(path);
}
/**
 * 获取icons目录下的文件
 */
export function getIconsFile(url: string = '') {
    return new URL(`../icons/${url}`, import.meta.url).href;
}
/**
 * 获取assets目录静态资源
 */
export function getAssetsFile(url: string = '') {
    return new URL(`../assets/${url}`, import.meta.url).href
}
/**
 * 延迟加载
 */
export function delay(duration: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(true);
        }, duration);
    })
}