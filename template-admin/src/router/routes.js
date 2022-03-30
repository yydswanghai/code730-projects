import Layout from '@/components/Layout/index.vue'
import Header from '@/components/Header/userHeader.vue'
/* 默认路由 */
export const constantRoutes = [
    {
        path: '/',
        component: Layout,
        name: 'home',
        meta: { title: '首页' },
        hidden: true
    },
    {
        path: '/login/:id([1,2,3]?)',
        components: {
            Header,
            default: () => import('@/views/login/index.vue')
        },
        meta: { title: '登录' },
        hidden: true
    },
    {
        path: '/register',
        component: () => import('@/views/login/register.vue'),
        meta: { title: '注册' },
        hidden: true
    },
    {
        path: '/change-password',
        component: () => import('@/views/login/change-password.vue'),
        meta: { title: '忘记密码' },
        hidden: true
    },
    {
        path: '/:pathMatch(.*)',
        component: () => import('@/views/not-found/index.vue'),
        meta: { title: 'not-found' },
        hidden: true
    },
]
/* 带权限的路由 */
// 嵌套路由 Detail: https://router.vuejs.org/zh/guide/essentials/nested-routes.html
export const userRoutes = [
    {
        path: '/commend-declaration',
        component: Layout,
        meta: { title: '表彰申报', icon: 'form' },
        children: [
            {
                path: '',
                name: 'commend-declaration',
                component:  () => import('../views/user/commend-declaration/index.vue'),
                meta: { title: '列表申报', icon: 'el-list' },
            },
            {
                path: 'detail',
                name: 'commend-declaration-detail',
                component: () => import('../views/user/commend-declaration/detail.vue'),
                meta: { title: '表彰明细', icon: 'el-tickets' },
                hidden: false
            },
            {
                path: 'registrants',
                name: 'commend-declaration-registrants',
                component: () => import('../views/user/commend-declaration/registrants.vue'),
                meta: { title: '个人报名', icon: 'el-user' },
                hidden: false
            },
            {
                path: 'collective-registration',
                name: 'commend-declaration-collective-registration',
                component: () => import('../views/user/commend-declaration/collective-registration.vue'),
                meta: { title: '集体报名',  icon: 'el-user' },
                hidden: false
            }
        ]
    },
    {
        path: '/test',
        component: Layout,
        meta: { title: '测试', icon: 'form' },
        children: [
            {
                path: '',
                name: 'test-declaration',
                component:  () => import('../views/user/commend-declaration/index.vue'),
                meta: { title: '测试申报', icon: 'user' },
            },
        ]
    },
    {
        path: '/menu',
        component: Layout,
        meta: { title: '一级栏目', icon: 'el-menu' },
        children: [
            {
                path: '',
                name: 'menu2-1',
                component:  () => import('../views/menu/index.vue'),
                meta: { title: '二级栏目-1', icon: 'el-menu' },
            },
            {
                path: 'menu2-2',
                name: 'menu2-2',
                component:  () => import('../views/menu/index.vue'),
                meta: { title: '二级栏目-2', icon: 'el-menu' },
                children: [
                    {
                        path: '',
                        name: 'menu2-2-1',
                        component:  () => import('../views/user/commend-declaration/index.vue'),
                        meta: { title: '三级栏目-1', icon: 'el-menu' },
                    },
                    {
                        path: 'menu3-2',
                        name: 'menu2-2-2',
                        component:  () => import('../views/user/commend-declaration/index.vue'),
                        meta: { title: '三级栏目-2', icon: 'el-menu' },
                    }
                ]
            },
        ]
    },
    {
        path: '/a132',
        component: Layout,
        name: 'a132',
        meta: { title: 'a1231', icon: 'el-menu', affix: false },
    }
]