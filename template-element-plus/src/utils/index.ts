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