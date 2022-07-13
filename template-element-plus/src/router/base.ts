import { IRouteRecordRaw } from './types'
import Layout from '@/Layout/index.vue'
import { renderIcon } from '@/utils/'
import { Menu } from '@element-plus/icons-vue'

export const RootRoute: IRouteRecordRaw = {
    path: '/',
    name: 'Root',
    redirect: '/dashboard',
    meta: { title: 'Root' },
}

// 控制台
export const DashboardRoute: IRouteRecordRaw = {
    path: '/dashboard',
    name: 'dashboard',
    component: Layout,
    redirect: '/dashboard/index',
    meta: { title: '控制台', icon: renderIcon(Menu)(), sort: 0, alwaysShow: true  },
    children: [
        {
            path: 'index',
            name: `dashboard_index`,
            meta: { title: '主控台' },
            component: () => import('@/views/dashboard/index.vue'),
        },
    ]
}

// redirect
export const RedirectRoute: IRouteRecordRaw = {
    path: '/redirect',
    name: 'Redirect',
    component: Layout,
    meta: { title: 'Redirect' },
    children: [
        {
            path: '/redirect/:path(.*)',
            name: 'Redirect',
            component: () => import('@/views/redirect/index.vue'),
            meta: { title: '刷新' },
        },
    ],
}

// 404
export const ErrorPageRoute: IRouteRecordRaw = {
    path: '/:path(.*)*',
    name: 'ErrorPage',
    component: Layout,
    meta: { title: 'ErrorPage' },
    children: [
        {
            path: '/:path(.*)*',
            name: 'ErrorPageSon',
            component: () => import('@/views/error-page/index.vue'),
            meta: { title: '错误' }
        }
    ]
}

// login
export const LoginRoute: IRouteRecordRaw = {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
    meta: { title: '登录' },
}