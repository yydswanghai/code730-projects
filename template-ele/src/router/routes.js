import Layout from '@/components/Layout/index.vue'
import Header from '@/components/Header/userHeader.vue'

/**
 * @desc Note: 子菜单只在路由子菜单时出现。长度> = 1
 * @param hidden: true 如果设置为true, item将不会显示在侧边栏中(默认为false)
 * @param alwaysShow: true
 * 当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式--如组件页面
 * 只有一个时，会将那个子路由当做根路由显示在侧边栏--如引导页面
 * 若你想不管路由下面的 children 声明的个数都显示你的根路由
 * 你可以设置 alwaysShow: true，这样它就会忽略之前定义的规则，一直显示根路由
 * @param redirect: noRedirect   如果设置noRedirect将不会在面包屑中重定
 * @param name (必须设置!!) 1.该名称由<keep-alive>使用 2.路由子路由也是根据父路由的 name去添加
 * @param meta: {
 *      title: 'title'               名称显示在侧边栏和面包屑(建议设置)
 *      icon: 'svg-name'/'el-icon-x' 图标显示在侧边栏中
 *      keepAlive: true              缓存页面
 *      breadcrumb: false            如果设置为false，该项目将隐藏在breadcrumb中(默认为true)
 *      activeMenu: '/example/list'  如果设置了path，侧边栏将突出显示您设置的路径
 * }
 */
/* 默认路由 */
export const constantRoutes = [
    {
        path: '/login/:id([1,2,3]?)',
        components: {
            Header,
            default: () => import('@/views/login/index.vue')
        },
        hidden: true
    },
    {
        path: '/register',
        component: () => import('@/views/login/register.vue'),
        hidden: true
    },
    {
        path: '/change-password',
        component: () => import('@/views/login/change-password.vue'),
        hidden: true
    },
    {
        path: '/:pathMatch(.*)',
        component: () => import('@/views/not-found/index.vue'),
        hidden: true
    },
    {
        path: '/',
        component: Layout,
        children: [
            {
                path: '',
                component: () => import('@/views/user/home/index.vue'),
                name: 'home',
                meta: { title: '首页', icon: 'form', affix: true, keepAlive: true }
            },
        ]
    },
    {
        path: '/commend',
        component: Layout,
        name: 'commend',
        meta: { title: '申报列表', icon: 'el-list' },
        children: [
            {
                path: 'index',
                component: () => import('@/views/user/commend/index.vue'),
                name: 'commend-index',
                meta: { title: '表彰申报', icon: 'el-list' },
                redirect: 'noRedirect',
                children: [
                    {
                        path: 'abc',
                        name: 'commend-index-abcd',
                        component:  () => import('@/views/user/commend/abc.vue'),
                        meta: { title: '表彰abc', icon: 'el-menu' },
                    },
                    {
                        path: 'def',
                        name: 'commend-index-efg',
                        component:  () => import('@/views/user/commend/def.vue'),
                        meta: { title: '表彰def', icon: 'el-menu' },
                    },
                ]
            },
            {
                path: 'detail',
                component: () => import('@/views/user/commend/detail.vue'),
                name: 'commend-detail',
                meta: { title: '表彰明细', icon: 'el-tickets', affix: true, },
            },
            {
                path: 'registrant',
                component: () => import('@/views/user/commend/registrant.vue'),
                name: 'commend-registrant',
                meta: { title: '个人报名', icon: 'el-user', affix: true, },
            },
            {
                path: 'registrants',
                component: () => import('@/views/user/commend/registrants.vue'),
                name: 'commend-registrants',
                meta: { title: '集体报名',  icon: 'el-user' },
            }
        ]
    },
    {
        path: '/menu',
        component: Layout,
        name: 'menu',
        redirect: '/menu/index',
        meta: { title: '栏目菜单', icon: 'el-menu' },
        children: [
            {
                path: 'index',
                name: 'menu-index',
                component:  () => import('@/views/user/menu/index.vue'),
                meta: { title: '二级菜单-1', icon: 'el-menu' },
                children: [
                    {
                        path: 'menu-31',
                        name: 'menu-index-menu-31',
                        component:  () => import('@/views/user/menu/menu-31.vue'),
                        meta: { title: '三级菜单-1', icon: 'el-menu' },
                    },
                    {
                        path: 'menu-32',
                        name: 'menu-index-menu-32',
                        component:  () => import('@/views/user/menu/menu-32.vue'),
                        meta: { title: '三级菜单-2', icon: 'el-menu' },
                    }
                ]
            },
            {
                path: 'menu-22',
                name: 'menu-22',
                component:  () => import('@/views/user/menu/menu-22.vue'),
                meta: { title: '二级菜单-2', icon: 'el-menu' },
            },
        ]
    },
]
/**
 * 带权限的路由
 * 嵌套路由 Detail: https://router.vuejs.org/zh/guide/essentials/nested-routes.html
 */
export const userRoutes = [
    
]