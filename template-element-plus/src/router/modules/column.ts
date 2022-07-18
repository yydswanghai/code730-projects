import { IRouteRecordRaw } from '@/router/types'
import { Layout } from '@/router/constant'
import { renderIcon } from "@/utils/"
import { Github } from '@/icons/'

/**
 * @param path 路由路径，必填，如果是外部链接会重新打开新窗口跳转到指定地址
 * @param name 路由名称，必填，且不能重名
 * @param meta.title 菜单名称，必填
 * @param meta.icon 图标
 * @param meta.sort 排序
 * @param meta.hidden 在菜单栏中隐藏
 * @param meta.alwaysShow 一直显示根路由
 * @param meta.keepAlive 缓存该路由
 * @param meta.affix 固定标签
 * @param component 组件，父路由默认都是Layout布局组件，子组件显示你自定义组件
 * @param children 选填，但是由于父组件都是布局组件，所以你至少要给它一个子组件来渲染页面
 */

const routes: Array<IRouteRecordRaw> = [
    {
        path: '/column',
        name: 'Column',
        component: Layout,
        meta: {
            title: '栏目',
            icon: renderIcon(Github),
        },
        children: [
            {
                path: 'col1-1',
                name: 'Column1-1',
                component: () => import('@/views/menus/column/index.vue'),
                meta: {
                    title: '栏目1-1'
                },
                children: [
                    {
                        path: 'col1-1-1',
                        name: 'Column1-1-1',
                        component: () => import('@/views/menus/column/index1-1-1.vue'),
                        meta: {
                            title: '栏目1-1-1'
                        }
                    },
                    {
                        path: 'col1-1-2',
                        name: 'Column1-1-2',
                        component: () => import('@/views/menus/column/index1-1-2.vue'),
                        meta: {
                            title: '栏目1-1-2'
                        }
                    },
                ]
            },
            {
                path: 'col1-2',
                name: 'Column1-2',
                component: () => import('@/views/menus/column/index1-2.vue'),
                meta: {
                    title: '栏目1-2'
                },
                children: [
                    {
                        path: 'col1-2-1',
                        name: 'Column1-2-1',
                        component: () => import('@/views/menus/column/index1-2-1.vue'),
                        meta: {
                            title: '栏目1-2-1'
                        }
                    },
                    {
                        path: 'col1-2-2',
                        name: 'Column1-2-2',
                        component: () => import('@/views/menus/column/index1-2-2.vue'),
                        meta: {
                            title: '栏目1-2-2'
                        },
                        children: [
                            {
                                path: 'col1-2-2-1',
                                name: 'Column1-2-2-1',
                                component: () => import('@/views/menus/column/index1-2-2-1.vue'),
                                meta: {
                                    title: '栏目1-2-2-1'
                                }
                            },
                        ]
                    },
                ]
            },
            {
                path: 'col1-3',
                name: 'Column1-3',
                component: () => import('@/views/menus/column/index1-3.vue'),
                meta: {
                    title: '栏目1-3'
                }
            }
        ]
    }
]

export default routes;