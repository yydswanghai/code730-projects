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
import { ref, computed, watch, unref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProjectSettingStore } from '@/store/modules/projectSetting'
import { useAsyncRouteStore } from '@/store/modules/asyncRoute'
import { generatorMenu, generatorMenuMix } from '@/utils/';
export default {
    name: 'Menu',
    props: {
        mode: {// 菜单模式
            type: String,
            default: 'vertical',
        },
        collapsed: Boolean,// 侧边栏菜单是否收起
        location: {//位置
            type: String,
            default: 'left',
        },
        inverted: Boolean,
        navMode: String,
    },
    setup(props){
        const projectStore = useProjectSettingStore()
        const asyncRouteStore = useAsyncRouteStore()
        const $route = useRoute()
        const $router = useRouter();
        // 获取当前打开的子菜单
        const matched = $route.matched
        const openKeys = computed(() => {
            return matched && matched.length ? matched.map((it) => it.name) : []
        })
        const selectedKeys = ref($route.name)
        const headerMenuSelectKey = ref('')
        const menus = ref([])

        const getSelectedKeys = computed(() => {
            let location = props.location
            return location === 'left' || (location === 'header' && unref(navMode) === 'horizontal')
            ? unref(selectedKeys)
            : unref(headerMenuSelectKey)
        })
        function updateMenu() {
            if(!projectStore.menuSetting.mixMenu){
                menus.value = generatorMenu(asyncRouteStore.menus)
            }else{
                // 混合菜单
                const firstRouteName = ($route.matched[0].name) || ''
                menus.value = generatorMenuMix(asyncRouteStore.menus, firstRouteName, props.location)
                const activeMenu = $route?.matched[0].meta?.activeMenu
                headerMenuSelectKey.value = (activeMenu ? activeMenu : firstRouteName) || ''
            }
        }
        watch(() => projectStore.menuSetting.mixMenu, () => {
            updateMenu()
            if (props.collapsed) {
                emit('update:collapsed', !props.collapsed);
            }
        })
        watch(() => $route.fullPath, () => {
            updateMenu()
            const matched = $route.matched
            openKeys.value = matched.map((item) => item.name)
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
            emit('clickMenuItem', key)
        }
        //展开菜单
        function menuExpanded(openK) {
            if (!openK) return
            const latestOpenKey = openK.find((key) => openK.indexOf(key) === -1)
            const isExistChildren = findChildrenLen(latestOpenKey)
            openKeys.value = isExistChildren ? (latestOpenKey ? latestOpenKey : []) : openK
        }

        //查找是否存在子路由
        function findChildrenLen(key) {
            if (!key) return false
            const subRouteChildren = [];
            for (const { children, key } of unref(menus)) {
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
            menus,
            openKeys,
            getSelectedKeys,
            clickMenuItem,
            menuExpanded
        }
    }
}

</script>
<style lang="scss" scoped>
    
</style>