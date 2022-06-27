import Layout from "@/layout/index.vue"
import { renderIcon } from '@/utils/index'
import { DashboardOutlined } from '@vicons/antd'

/**
 * 默认固定的路由都写在这
 */
// root
export const RootRoute = {
    path: '/',
    name: 'Root',
    redirect: '/dashboard',
    meta: { title: 'Root' },
}

export const DashboardRoute = {
    path: '/dashboard',
    name: 'dashboard',
    redirect: '/dashboard/index',
    component: Layout,
    meta: { title: 'Dashboard', icon: renderIcon(DashboardOutlined), sort: 0, hidden: false },
    children: [
        {
            path: 'index',
            name: `dashboard_index`,
            meta: { title: '主控台' },
            component: () => import('@/views/dashboard/index.vue'),
        },
    ]
}

// login
export const LoginRoute = {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
    meta: { title: '登录' },
}

// redirect
export const RedirectRoute = {
    path: '/redirect',
    name: 'Redirect',
    component: Layout,
    meta: { title: 'Redirect' },
    children: [
        {
            path: '/redirect/:path(.*)',
            name: 'Redirect',
            component: () => import('@/views/redirect/index.vue'),
            meta: { title: 'Redirect' },
        },
    ],
}

// 404
export const ErrorPageRoute = {
    path: '/:path(.*)*',
    name: 'ErrorPage',
    component: Layout,
    meta: { title: 'ErrorPage' },
    children: [
        {
            path: '/:path(.*)*',
            name: 'ErrorPageSon',
            component: () => import('@/views/error-page/index.vue'),
            meta: { title: 'ErrorPage' }
        }
    ]
}