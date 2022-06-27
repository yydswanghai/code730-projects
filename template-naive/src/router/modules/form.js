import Layout from "@/layout/index.vue"
import ParentLayout from '@/layout/parentLayout.vue';
import { renderIcon } from '@/utils/index'
import { ProfileOutlined } from '@vicons/antd'

/**
 * @param name 路由名称, 必须设置,且不能重名
 * @param redirect 重定向地址, 访问这个路由时,自定进行重定向
 * @param meta 路由元信息（路由附带扩展信息）
 * @param meta.hidden 是否隐藏菜单
 * @param meta.alwaysShow 是否是根路由
 * @param meta.title 菜单名称
 * @param meta.icon 菜单图标
 * @param meta.keepAlive 缓存该路由
 * @param meta.sort 排序越小越排前
 * @param meta.disabled 禁用整个菜单
 * @param meta.affix 保留固定路由
 */
export default [
    {
        path: '/form',
        name: 'Form',
        component: Layout,
        redirect: '/form/basic-form',
        meta: { title: '表单页面', icon: renderIcon(ProfileOutlined), sort: 3, },
        children: [
            {
                path: 'basic-form',
                name: 'form-basic-form',
                meta: { title: '基础表单', },
                component: () => import('@/views/user/form/basicForm/index.vue'),
            },
            {
                path: 'step-form',
                name: 'form-step-form',
                meta: { title: '分步表单', },
                component: () => import('@/views/user/form/stepForm/index.vue'),
            },
        ]
    }
]