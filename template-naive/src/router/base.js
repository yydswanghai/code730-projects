import Layout from "@/layout/index.vue"

// root
export const RootRoute = {
    path: '/',
    name: 'Root',
    redirect: '/dashboard',
    meta: { title: 'Root' },
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
    meta: { title: 'Redirect', hideBreadcrumb: true },
    children: [
        {
            path: '/redirect/:path(.*)',
            name: 'Redirect',
            component: () => import('@/views/redirect/index.vue'),
            meta: { title: 'Redirect', hideBreadcrumb: true },
        },
    ],
}

// 404
export const ErrorPageRoute = {
    path: '/:path(.*)*',
    name: 'ErrorPage',
    component: Layout,
    meta: { title: 'ErrorPage', hideBreadcrumb: true },
    children: [
        {
            path: '/:path(.*)*',
            name: 'ErrorPageSon',
            component: () => import('@/views/error-page/index.vue'),
            meta: { title: 'ErrorPage', hideBreadcrumb: true }
        }
    ]
}