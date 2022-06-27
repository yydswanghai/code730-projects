import Login from "@/views/Layout/Login";
import Home from "@/views/Layout/Home";

const asyncRouterMap = [
    {
        name: 'Product',
        path: '/product',
        component: Home,
        meta: {
            title: '商品',
            auth: true,
            hidden: false,
            icon: 'inbox',
        },
        children: [
            {
                name: 'ProductList',
                path: 'list',
                component: () => import("@/views/page/ProductList.vue"),
                meta: {
                    title: '商品列表',
                    auth: true,
                    hidden: false,
                    icon: 'unordered-list',
                },
            },
            {
                name: 'ProductAdd',
                path: 'add',
                component: () => import("@/views/page/ProductAdd.vue"),
                meta: {
                    title: '添加商品',
                    auth: true,
                    hidden: false,
                    icon: 'file-add',
                },
            },
            {
                name: 'Category',
                path: 'category',
                component: () => import("@/views/page/Category.vue"),
                meta: {
                    title: '类目管理',
                    auth: true,
                    hidden: false,
                    icon: 'project',
                },
            }
        ]
    }
]

const routes = [
    {
        name: "Home",
        path: "/",
        component: Home,
        redirect: "/index",// 重定向到 /index
        meta: {
            title: "首页",
            auth: true,// 是否需要鉴权
            hidden: false,// 时候需要隐藏 true: 隐藏  false: 显示
            icon: 'home',
        },
        children: [
            {
                name: "Index",
                path: "index",
                component: () => import("@/views/page/index"),
                meta: {
                    title: "统计",
                    auth: true,
                    hidden: false,
                    icon: 'number',
                },
            },
        ]
    },
    {
        name: 'Product',
        path: '/product',
        component: Home,
        meta: {
            title: '商品',
            auth: true,
            hidden: false,
            icon: 'inbox',
        },
        children: [
            {
                name: 'ProductList',
                path: 'list',
                component: () => import("@/views/page/ProductList.vue"),
                meta: {
                    title: '商品列表',
                    auth: true,
                    hidden: false,
                    icon: 'unordered-list',
                },
            },
            {
                name: 'ProductAdd',
                path: 'add',
                component: () => import("@/views/page/ProductAdd.vue"),
                meta: {
                    title: '添加商品',
                    auth: true,
                    hidden: false,
                    icon: 'file-add',
                },
            },
            {
                name: 'ProductEdit',
                path: 'edit/:id',
                component: () => import("@/views/page/ProductAdd.vue"),
                meta: {
                    title: '编辑商品',
                    auth: true,
                    hidden: true,
                    icon: 'file-add',
                },
            },
            {
                name: 'Category',
                path: 'category',
                component: () => import("@/views/page/Category.vue"),
                meta: {
                    title: '类目管理',
                    auth: true,
                    hidden: true,
                    icon: 'project',
                },
            }
        ]
    },
    {
        name: "Login",
        path: "/login",
        component: Login,
        meta: {
            title: "登录",
            hidden: true,
        }
    }
]

export default {
    asyncRouterMap,
    routes,
}