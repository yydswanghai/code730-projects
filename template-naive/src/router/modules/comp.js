import Layout from "@/layout/index.vue"
import ParentLayout from '@/layout/parentLayout.vue';
import { renderIcon } from '@/utils/index'
import { WalletOutlined } from '@vicons/antd'

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
        path: '/comp',
        name: 'comp',
        component: Layout,
        redirect: '/comp/table',
        meta: { title: '组件示例', icon: renderIcon(WalletOutlined), sort: 8, },
        children: [
            {
                path: 'table',
                name: `comp_table`,
                redirect: '/comp/table/basic',
                component: ParentLayout,
                meta: { title: '表格' },
                children: [
                    {
                        path: 'basic',
                        name: `comp_table_basic`,
                        meta: { title: '基础表格' },
                        component: () => import('@/views/user/comp/table/basic.vue'),
                    },
                    {
                        path: 'editCell',
                        name: `comp_table_editCell`,
                        meta: { title: '单元格编辑' },
                        component: () => import('@/views/user/comp/table/editCell.vue'),
                    },
                    {
                        path: 'editRow',
                        name: `comp_table_editRow`,
                        meta: { title: '整行编辑' },
                        component: () => import('@/views/user/comp/table/editRow.vue'),
                    },
                ]
            },
            {
                path: 'form',
                name: `comp_form`,
                redirect: '/comp/form/basic',
                component: ParentLayout,
                meta: { title: '表单' },
                children: [
                    {
                        path: 'basic',
                        name: `comp_form_basic`,
                        meta: { title: '基础使用'},
                        component: () => import('@/views/user/comp/form/basic.vue'),
                    },
                    {
                        path: 'useForm',
                        name: `comp_form_useForm`,
                        meta: { title: 'useForm' },
                        component: () => import('@/views/user/comp/form/useForm.vue'),
                    },
                ]
            },
            {
                path: 'upload',
                name: `comp_upload`,
                meta: { title: '上传图片' },
                component: () => import('@/views/user/comp/upload/index.vue'),
            },
        ]
    }
]