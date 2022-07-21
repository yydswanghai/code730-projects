<template>
    <el-menu
        class="aside-menu"
        :class="{ 'head-menu': navIsHead }"
        :unique-opened="false"
        :default-active="isActive"
        :collapse="collapsed"
        :ellipsis="false"
        :mode="mode"
        :collapse-transition="false"
        @select="handleSelect"
        >
        <MenuItem
            v-for="route in menus"
            :key="route.name"
            :option="route"
            :base-path="route.path"
            />
    </el-menu>
</template>

<script lang="ts">
import { defineComponent, PropType, computed, ref, watch, onMounted } from 'vue'
import { useRouter, useRoute, RouteRecordName } from 'vue-router'
import { useProjectSettingStore } from '@/store/modules/projectSetting'
import { useAsyncRouteStore } from '@/store/modules/asyncRoute'
import MenuItem from './MenuItem.vue'
import { isExternal } from '@/utils/'
import { IRouteRecordRaw } from '@/router/types'
import { cloneDeep } from 'lodash-es'

export default defineComponent({
    name: 'Menu',
    components: {
        MenuItem,
    },
    props: {
        collapsed: {// 侧边栏菜单是否折叠
            type: Boolean,
            default: false,
        },
        mode: {// 菜单模式
            type: String as PropType<'vertical' | 'horizontal'>,
            default: 'vertical',
        },
        location: {// 菜单位置
            type: String,
            default: 'left',
        },
        inverted: Boolean// 样式反转
    },
    setup(props){
        const $router = useRouter();
        const $route = useRoute();
        const settingStore = useProjectSettingStore();
        const asyncRouteStore = useAsyncRouteStore();
        const menus = ref<IRouteRecordRaw[] | any>([]);
        const navMode = computed(() => settingStore.navMode);
        /* 获取当前打开的子菜单 */
        function getOpenKeys() {
            const matched = $route.matched;
            return matched && matched.length ? matched.map((it) => it.path) : []
        }
        const keys = getOpenKeys();
        const isActive = ref(keys[keys.length-1]);

        /* 过滤掉隐藏的菜单 */
        function filterHide(routes: IRouteRecordRaw[]) {
            return routes.filter(it => (it.meta?.hidden || false) != true);
        }
        /* 菜单切换栏目跳转对应的路由 */
        function handleSelect(index: string) {
            if(isExternal(index)){
                window.open(index);
            }else{
                $router.push(index)
            }
        }
        /* 混合菜单 */
        function generatorMenuMix(routes: any[], routerName: RouteRecordName, location: string) {
            const newRoutes = cloneDeep(routes);
            if(location === 'header'){// 顶部的菜单 (不包含子菜单)
                return newRoutes.map(it => {
                    const routerInfo = {
                        ...it,
                        children: it.children.length > 1 ? [it.children[0]] : it.children
                    }
                    return routerInfo
                })
            }else{// 左侧的菜单
                return newRoutes.filter(it => it.name === routerName);
            }
        }
        /* 渲染菜单 */
        function renderMenu() {
            const routes = filterHide(asyncRouteStore.menus);
            if(navMode.value === 'horizontal-mix'){
                console.log(props.location)
                const routerName = ($route.matched[0].name) || '';
                menus.value = generatorMenuMix(routes, routerName, props.location);
            }else{
                menus.value = routes;
            }
        }
        /* 路由地址变化时，重新渲染 */
        watch(() => $route.fullPath, () => {
            renderMenu();
        });
        /* 切换导航栏模式时，重新渲染 */
        watch(() => navMode.value, () => {
            renderMenu();
        });
        onMounted(() => {
            renderMenu();
        });
        const navIsHead = computed(() => {
            if(props.location === 'left'){
                return false;
            }
            if(props.location === 'header' && settingStore.navMode === 'horizontal' || settingStore.navMode === 'horizontal-mix'){
                return true;
            }
            return false;
        });
        return {
            menus,
            isActive,
            navIsHead,
            handleSelect,
        }
    }
})
</script>
<style lang="scss" scoped>
@import "@/styles/var.scss";
.aside-menu{
    height: 100%;
    border-right: 0;
    --bg: var(--i-menu-bg-color);
    --text-color: var(--i-menu-primary-color);
    background-color: var(--bg);
    :deep(.el-menu-item){
        color: var(--text-color);
        &:hover{
            color: var(--el-color-primary);
            background-color: unset;
        }
        &.is-active{
            color: var(--i-white-color) !important;
            background-color: var(--el-color-primary);
        }
    }
    :deep(.el-sub-menu__title){
        color: var(--text-color);
        &:hover{
            color: var(--el-color-primary);
            background-color: unset;
        }
    }
    :deep(.el-menu-item-group__title){
        padding: 0;
    }
    .i-menu :deep(.el-menu){
        background-color: var(--bg);
    }
}
// 顶部栏目样式
.head-menu{
    --bg: var(--i-head-bg-color);
    --text-color: var(--i-head-primary-color);
}
</style>
<style lang="scss">
@import "@/styles/var.scss";
.el-popper.i-popper-menu{
    --bg: var(--i-menu-bg-color);
    --text-color: var(--i-menu-primary-color);
    .el-menu{
        padding-top: 0;
        padding-bottom: 0;
        background-color: var(--bg);
    }
    .el-menu-item-group__title{
        padding: 0;
    }
    .el-menu-item{
        color: var(--text-color);
        background-color: unset;
        &:hover{
            color: var(--el-color-primary);
            background-color: unset;
        }
        &.is-active{
            color: var(--i-white-color);
            background-color: var(--el-color-primary);
        }
    }
    .i-menu{
        .el-sub-menu__title{
            color: var(--text-color);
            background-color: unset;
            &:hover{
                color: var(--el-color-primary);
                background-color: unset;
            }
        }
    }
}
.el-popper.i-popper-head-menu{
    --bg: var(--i-head-bg-color);
    --text-color: var(--i-head-primary-color);
}
</style>