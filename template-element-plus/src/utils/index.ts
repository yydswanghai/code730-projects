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
// 颜色辅助函数
function addLight(color: string, amount: number) {
    const cc = parseInt(color, 16) + amount;// 转16进制
    const c = cc > 255 ? 255 : cc;
    return c.toString(16).length > 1 ? c.toString(16) : `0${c.toString(16)}`;
}
// 颜色辅助函数
export function lighten(color: string, amount: number) {
    color = color.includes('#') ? color.substring(1, color.length) : color;// 去除#
    amount = Math.trunc((255 * amount) / 100);
    return `#${addLight(color.substring(0, 2), amount)}${addLight(color.substring(2, 4),amount)}${addLight(color.substring(4, 6), amount)}`
}