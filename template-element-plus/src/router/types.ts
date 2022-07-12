import type { RouteRecordRaw, RouteMeta } from 'vue-router'
import { defineComponent, VNode } from 'vue'

export type Component<T extends any = any> =
    | ReturnType<typeof defineComponent>
    | (() => Promise<typeof import('*.vue')>)
    | (() => Promise<T>);

export interface IRouteRecordRaw extends Omit<RouteRecordRaw, 'meta'> {
    name: string
    meta: Meta
    component?: Component | string
    components?: Component
    children?: IRouteRecordRaw[]
    props?: Recordable
    fullPath?: string
}

export interface Meta extends RouteMeta {
    title: string // 名称
    icon?: string | VNode | null // 图标
    sort?: number // 排序
    hidden?: boolean // 是否隐藏
    alwaysShow?: boolean // 是否始终显示全部菜单
    keepAlive?: boolean // 是否缓存
}