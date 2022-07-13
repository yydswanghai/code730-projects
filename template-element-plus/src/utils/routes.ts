import { IRouteRecordRaw } from '@/router/types'
import { renderIcon } from '@/utils/index'
import { Document, Menu, Location, DataAnalysis } from '@element-plus/icons-vue'

export const asyncRouteStore: IRouteRecordRaw[] = [
    {
        path: '/test-menus',
        name: 'test-menus',
        component: () => import('@/Layout/index.vue'),
        meta: { title: '一级菜单', icon: renderIcon(Document)() },
        children: [
            {
                path: '1',
                name: 'test-menus-1',
                component: () => import('@/views/menus/test-menus/index.vue'),
                meta: { title: '二级菜单' },
                children: [
                    {
                        path: '1-1',
                        name: 'test-menus-1-1',
                        component: () => import('@/views/menus/test-menus/index1-1.vue'),
                        meta: { title: '菜单1-1' },
                    },
                    {
                        path: '1-2',
                        name: 'test-menus-1-2',
                        component: () => import('@/views/menus/test-menus/index1-2.vue'),
                        meta: { title: '菜单1-2' },
                    },
                ]
            },
        ]
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import('@/Layout/index.vue'),
        meta: { title: '控制台', icon: renderIcon(Menu)(), sort: 0  },
        children: [
            {
                path: '',
                name: 'dashboard-index',
                component: () => import('@/views/dashboard/index.vue'),
                meta: { title: '控制台' }
            }
        ]
    },
    {
        path: '/commend-management',
        name: 'commend-management',
        component: () => import('@/Layout/index.vue'),
        meta: {
            title: "表彰管理", sort: 1000, keepAlive: false, hidden: false, icon: renderIcon(DataAnalysis)()
        },
        children: [
            {
                path: '',
                name: 'commend-management-index',
                component: () => import('@/views/menus/commend-management/index.vue'),
                meta: {
                    title: "表彰管理", sort: 1000, keepAlive: false, icon: null
                }
            },
            {
                path: 'add',
                name: 'commend-management-add',
                component: () => import('@/views/menus/commend-management/add.vue'),
                meta: {
                    title: "新增表彰", sort: 1010, keepAlive: false, icon: null
                }
            },
            {
                path: 'edit',
                name: 'commend-management-edit',
                component: () => import('@/views/menus/commend-management/edit.vue'),
                meta: {
                    title: "编辑表彰", sort: 1020, keepAlive: false, icon: null
                }
            },
            {
                path: 'detail',
                name: 'commend-management-detail',
                component: () => import('@/views/menus/commend-management/detail.vue'),
                meta: {
                    title: "编辑表彰", sort: 1030, keepAlive: false, icon: null
                }
            }
        ]
    },
    {
        path: '/organization',
        name: 'organization',
        component: () => import('@/Layout/index.vue'),
        meta: {
            title: "组织管理", sort: 2000, keepAlive: false, hidden: false, icon: renderIcon(Menu)()
        },
        children: [
            {
                path: '',
                name: 'organization-index',
                component: () => import('@/views/menus/organization/index.vue'),
                meta: {
                    title: "组织管理", sort: 2000, keepAlive: false, icon: null
                },
            },
            {
                path: 'add',
                name: 'organization-add',
                component: () => import('@/views/menus/organization/add.vue'),
                meta: {
                    title: "新增组织", sort: 2010, keepAlive: false, icon: null
                },
            },
            {
                path: 'edit',
                name: 'organization-edit',
                component: () => import('@/views/menus/organization/edit.vue'),
                meta: {
                    title: "编辑组织", sort: 2020, keepAlive: false, icon: null
                },
            },
        ]
    },
    {
        path: '/tree',
        name: 'tree',
        component: () => import('@/Layout/index.vue'),
        meta: {
            title: "组织树", sort: 3000, keepAlive: false, icon: renderIcon(Location)()
        },
        children: [
            {
                path: '',
                name: 'tree-index',
                component: () => import('@/views/menus/tree/index.vue'),
                meta: {
                    title: "组织树", sort: 3000, keepAlive: false, icon: null
                },
            }
        ]
    }
]