import type { RouteRecordRaw, RouteMeta } from 'vue-router'
import { defineComponent } from 'vue'

export type Component<T extends any = any> =
    | ReturnType<typeof defineComponent>
    | (() => Promise<typeof import('*.vue')>)
    | (() => Promise<T>);

export interface IRouteRecordRaw extends Omit<RouteRecordRaw, 'meta'> {
    name: string
    meta: RouteMeta
    component?: Component | string
    components?: Component
    children?: IRouteRecordRaw[]
    props?: Recordable
    fullPath?: string
}