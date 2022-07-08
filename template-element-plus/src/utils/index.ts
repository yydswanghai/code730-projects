import { h, unref } from 'vue'
import { ElIcon } from "element-plus"

/**
 * render 图标
 * */
export function renderIcon(icon: any) {
    return () => h(ElIcon, null, { default: () => h(icon) });
}