import Layout from "@/layout/index.vue"
import { renderIcon } from '@/utils/index'
import { DashboardOutlined } from '@vicons/antd'
/**
 * @param name 路由名称, 必须设置,且不能重名
 * @param meta 路由元信息（路由附带扩展信息）
 * @param redirect 重定向地址, 访问这个路由时,自定进行重定向
 * @param meta.disabled 禁用整个菜单
 * @param meta.title 菜单名称
 * @param meta.icon 菜单图标
 * @param meta.keepAlive 缓存该路由
 * @param meta.sort 排序越小越排前
 * */

export default {
    path: '/dashboard',
    name: 'dashboard',
    redirect: '/dashboard/console',
    component: Layout,
    meta: { title: 'Dashboard', icon: renderIcon(DashboardOutlined), sort: 0, },
    children: [
        {
            path: 'console',
            name: `dashboard_console`,
            meta: { title: '主控台' },
            component: () => import('@/views/dashboard/console.vue'),
        },
        {
            path: 'workplace',
            name: `dashboard_workplace`,
            meta: { title: '工作台', keepAlive: true, },
            component: () => import('@/views/dashboard/workplace.vue'),
        },
    ]
}