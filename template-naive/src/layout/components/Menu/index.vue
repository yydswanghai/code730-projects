<template>
    <NMenu
        :options="menus"
        :mode="mode"
        :inverted="inverted"
        :collapsed="collapsed"
        :collapsed-width="64"
        :collapsed-icon-size="20"
        :indent="24"
        :expanded-keys="openKeys"
        :value="getSelectedKeys"
        @update:value="clickMenuItem"
        @update:expanded-keys="menuExpanded"
    />
</template>

<script>
import { ref, computed, watch, onMounted, reactive, toRefs } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProjectSettingStore } from '@/store/modules/projectSetting'
import { useAsyncRouteStore } from '@/store/modules/asyncRoute'
import { cloneDeep } from 'lodash-es'
/**
 * 菜单组件
 * 菜单出现的情况：1.默认在左侧栏 2.移动端弹出在左侧 3.出现在顶部栏
 */
export default {
    name: 'Menu',
    props: {
        mode: {// 菜单模式
            type: String,
            default: 'vertical',
        },
        collapsed: {// 侧边栏菜单是否折叠
            type: Boolean
        },
        location: {// 菜单位置
            type: String,
            default: 'left',
        },
        inverted: Boolean,// 反转样式
    },
    setup(props, ctx){
        const settingStore = useProjectSettingStore()
        const asyncRouteStore = useAsyncRouteStore()
        const $route = useRoute()
        const $router = useRouter()
        const navMode = computed(() => settingStore.navMode)// 导航栏模式
        // 获取当前打开的子菜单
        function getOpenKeys() {
            const matched = $route.matched
            return matched && matched.length ? matched.map((it) => it.name) : []
        }
        const state = reactive({
            openKeys: getOpenKeys()// 展开的子菜单标识符 Array[]
        })
        const selectedKeys = ref($route.name)// 用于判断`菜单当前的选中值` => 当前路由名称
        const headerMenuSelectKey = ref('')// 用于判断`菜单当前的选中值` => '' (顶部菜单时的选中值)
        const menus = ref([])   // 渲染菜单的数据

        // 是否是根路由
        function isRootRouter(router) {
            return router.meta?.alwaysShow != true && router.children?.length === 1;
        }
        // 过滤掉隐藏的菜单
        function filterHide(routes) {
            return routes.filter(it => (it.meta?.hidden || false) != true)
        }
        // 递归组装菜单格式：根据组件的 MenuOption 配置 详情: https://www.naiveui.com/zh-CN/light/components/menu
        function generatorMenu(routes) {
            return filterHide(routes).map(it => {
                const isRoot = isRootRouter(it)
                const routerInfo = isRoot ? it.children[0] : it// 当前路由信息
                const currentMenu = {// 当前菜单
                    key: routerInfo.name,// 后面点击菜单需要用到
                    label: routerInfo.meta?.title,
                    icon: isRoot ? it.meta?.icon : routerInfo.meta?.icon,
                    disabled: routerInfo.meta?.disabled
                }
                // 是否有子菜单，并递归处理
                if(routerInfo.children && routerInfo.children.length > 0){
                    currentMenu.children = generatorMenu(routerInfo.children)
                }
                return currentMenu
            })
        }
        // 混合菜单
        function generatorMenuMix(routes, routerName, location) {
            const cloneRoutes = cloneDeep(routes)
            const newRoutes = filterHide(cloneRoutes)// 克隆的路由
            if (location === 'header') {
                // 在顶部的菜单（不包含子菜单）
                return newRoutes.map(it => {
                    const isRoot = isRootRouter(it)
                    const routerInfo = isRoot ? it.children[0] : it// 当前路由信息
                    const currentMenu = {// 当前菜单
                        key: routerInfo.name,
                        label: routerInfo.meta?.title,
                        icon: isRoot ? it.meta?.icon : routerInfo.meta?.icon,
                        disabled: routerInfo.meta?.disabled,
                        children: undefined
                    }
                    return currentMenu
                })
            }else{
                // 在侧边栏的菜单（包含子菜单但仅显示当前和当前子菜单）
                return getChildrenRouter(newRoutes.filter(it => it.name === routerName))
            }
        }
        // 递归混合子菜单
        function getChildrenRouter(routes) {
            return filterHide(routes).map(it => {
                const isRoot = isRootRouter(it)
                const routerInfo = isRoot ? it.children[0] : it// 当前路由信息
                const currentMenu = {// 当前菜单
                    key: routerInfo.name,
                    label: routerInfo.meta?.title,
                    icon: isRoot ? it.meta?.icon : routerInfo.meta?.icon,
                    disabled: routerInfo.meta?.disabled,
                }
                // 是否有子菜单，并递归处理
                if (routerInfo.children && routerInfo.children.length > 0) {
                    currentMenu.children = getChildrenRouter(routerInfo.children);
                }
                return currentMenu
            })
        }
        /**
         * 菜单当前的选中值
         * 菜单在左侧 或 菜单在顶部 且 模式为 horizontal 的选中值为当前$route.name
         */
        const getSelectedKeys = computed(() => {
            let { location } = props
            return location === 'left' || (location === 'header' && navMode.value === 'horizontal')
            ? selectedKeys.value : headerMenuSelectKey.value
        })
        // 更新菜单
        function updateMenu() {
            if(!settingStore.menuSetting.mixMenu){
                // 不分割菜单
                menus.value = generatorMenu(asyncRouteStore.menus)
            }else{
                // 分割菜单
                const firstRouteName = ($route.matched[0].name) || ''
                menus.value = generatorMenuMix(asyncRouteStore.menus, firstRouteName, props.location)
                console.log(menus.value)
                const activeMenu = $route?.matched[0].meta?.activeMenu
                headerMenuSelectKey.value = (activeMenu ? activeMenu : firstRouteName) || ''
            }
        }
        // 监听分割菜单变化：分割与不分割组装菜单的逻辑不通，所以每次切换都要更新
        watch(() => settingStore.menuSetting.mixMenu, () => {
            updateMenu()
            if (props.collapsed) {
                ctx.emit('update:collapsed', !props.collapsed);
            }
        })
        // 监听路由地址的变化：需要改变菜单当前的选中值。如果 $route的meta 里设置了选中值就用它，否则就使用 $route.name
        watch(() => $route.fullPath, () => {
            updateMenu()
            state.openKeys = $route.matched.map((item) => item.name)
            const activeMenu = ($route.meta?.activeMenu) || ''
            selectedKeys.value = activeMenu ? (activeMenu) : ($route.name)
        })

        // 点击菜单
        function clickMenuItem(key) {
            // 如果是外部链接直接另外打开一个窗口并跳转
            if (/http(s)?:/.test(key)) {
                window.open(key)
            } else {
                $router.push({ name: key })
            }
            ctx.emit('clickMenuItem', key)
        }
        //展开菜单 openks 是展开菜单项的 key 的数组
        function menuExpanded(openks) {
            if (!openks) return
            const latestOpenKey = openks.find((key) => openks.indexOf(key) === -1)
            const isExistChildren = findChildrenLen(latestOpenKey)
            state.openKeys = isExistChildren ? (latestOpenKey ? latestOpenKey : []) : openks
        }

        //查找是否存在子路由
        function findChildrenLen(key) {
            if (!key) return false
            const subRouteChildren = [];
            for (const { children, key } of menus.value) {
                if (children && children.length) {
                    subRouteChildren.push(key)
                }
            }
            return subRouteChildren.includes(key)
        }

        onMounted(() => {
            updateMenu()
        })
        return {
            ...toRefs(state),
            menus,
            getSelectedKeys,
            clickMenuItem,
            menuExpanded
        }
    }
}

</script>
<style lang="less" scoped>
    
</style>