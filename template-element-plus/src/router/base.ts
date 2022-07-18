import { Layout, ErrorPage } from '@/router/constant'
import { IRouteRecordRaw } from './types'
import { renderIcon } from '@/utils/'
import { Menu } from '@element-plus/icons-vue'
import { PageEnum } from '@/enums/pageEnum'

export const RootRoute: IRouteRecordRaw = {
    path: '/',
    name: 'Root',
    redirect: PageEnum.HOME,
    meta: { title: 'root' },
}

// 控制台
export const DashboardRoute: IRouteRecordRaw = {
    path:  PageEnum.HOME,
    name: PageEnum.HOME_NAME,
    component: Layout,
    meta: { title: 'Dashboard', icon: renderIcon(Menu), sort: 0 },
    children: [
        {
            path: '',
            name: `${PageEnum.HOME_NAME}Index`,
            meta: { title: '控制台' },
            component: () => import('@/views/menus/dashboard/index.vue'),
        },
    ]
}

// 刷新
export const RedirectRoute: IRouteRecordRaw = {
    path: PageEnum.REDIRECT,
    name: PageEnum.REDIRECT_NAME,
    component: Layout,
    meta: { title: 'Redirect' },
    children: [
        {
            path: '/redirect/:path(.*)',
            name: `${PageEnum.REDIRECT_NAME}Index`,
            component: () => import('@/views/redirect/index.vue'),
            meta: { title: '刷新' },
        },
    ],
}

// 404
export const ErrorPageRoute: IRouteRecordRaw = {
    path: '/:path(.*)*',
    name: PageEnum.ERROR_NAME,
    component: Layout,
    meta: { title: 'ErrorPage' },
    children: [
        {
            path: '/:path(.*)*',
            name: `${PageEnum.ERROR_NAME}Index`,
            component: ErrorPage,
            meta: { title: 'ErrorPage' }
        }
    ]
}

// 登录
export const LoginRoute: IRouteRecordRaw = {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
    meta: { title: '登录' },
}