<template>
    <ElAside
        class="sidebar-container"
        :class="{ 'has-logo': showLogo }"
        :style="{ marginTop: marginTop + 'px' }"
    >
        <Logo v-if="showLogo" :collapse="isCollapse" />
        <ElScrollbar wrap-class="scrollbar-wrapper">
            <ElMenu
                mode="vertical"
                :unique-opened="false"
                :collapse-transition="false"
                :collapse="isCollapse"
                :background-color="variables.menuBg"
                :text-color="variables.menuText"
                :active-text-color="variables.menuActiveText"
                :default-active="activeMenu"
            >
                <SidebarItem v-for="(route, i) in routes" :key="i" :item="route" :base-path="route.path" />
            </ElMenu>
        </ElScrollbar>
    </ElAside>
</template>

<script>
import useHeaderMarginTop from "@/composition/useHeaderMarginTop.js";
import useVariablesModule from "@/composition/useVariablesModule.js";
import Logo from "./Logo.vue";
import { computed } from "vue";
import { useRoute } from "vue-router";
import { permissionStore } from '@/store/usePermission.js';
import SidebarItem from "./SidebarItem.vue";
import { settingsStore } from "@/store/useSettings";

export default {
    components: {
        Logo,
        SidebarItem,
    },
    setup() {
        const route = useRoute()

        /**
         * 全部后台路由: Layout组件子路由
         */
        const routesRef = computed(() => permissionStore.routes)

        const activeMenuRef = computed(() => {
            // 当前栏目
            const { meta, path } = route
            // 如果设置了path，侧边栏将突出显示您设置的路径
            if (meta.activeMenu){
                return meta.activeMenu
            }
            return path
        })
        return {
            activeMenu: activeMenuRef,
            routes: routesRef,
            ...useHeaderMarginTop(),
            ...useVariablesModule(),
            showLogo: computed(() => settingsStore.sidebar.showLogo),
            isCollapse: computed(() => !settingsStore.sidebar.opened),
        };
    },
};
</script>
<style lang="scss" scoped>
@import "styles/variables.module.scss";

.sidebar-container {
    width: $sideBarWidth;
    transition: width 0.28s;
    height: 100%;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 1001;
    font-size: 0px;
    background-color: var(--el-aside-width);
    overflow: hidden;
    &.has-logo {
        .el-scrollbar {
            height: calc(100% - 50px);
        }
    }
}
</style>
<style lang="scss">
.sidebar-container {
    .scrollbar-wrapper {
        overflow-x: hidden !important;
        .el-scrollbar__view{
            height: inherit;
        }
        .el-menu{
            height: inherit;
        }
    }
    .horizontal-collapse-transition {
        transition: 0s width ease-in-out, 0s padding-left ease-in-out,
            0s padding-right ease-in-out;
    }
    .el-scrollbar__bar {
        &.is-horizontal {
            display: none;
        }
        &.is-vertical{
            right: 0px;
        }
    }
    a {
        display: inline-block;
        width: 100%;
        overflow: hidden;
    }
}
</style>