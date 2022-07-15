import type { RouteRecordRaw, RouteMeta } from 'vue-router'
import { defineComponent, VNode } from 'vue'

export type IComponent<T extends any = any> =
    | ReturnType<typeof defineComponent>
    | (() => Promise<typeof import('*.vue')>)
    | (() => Promise<T>);

export interface IRouteRecordRaw extends Omit<RouteRecordRaw, 'meta'> {
    name: string
    meta: IMeta
    component?: IComponent | string
    components?: IComponent
    children?: IRouteRecordRaw[]
    props?: Recordable
    fullPath?: string
}

export interface IMeta extends RouteMeta {
    title: string // 名称
    icon?: string | null | (() => VNode)  // 图标
    sort?: number // 排序
    hidden?: boolean // 是否隐藏
    alwaysShow?: boolean // 是否始终显示全部菜单
    keepAlive?: boolean // 是否缓存
    affix?: boolean // 是否固定标签
    externalLink?: string// 外链跳转地址
}