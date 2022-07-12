<template>
    <el-menu
        class="aside-menu"
        :default-active="defaultActive"
        :collapse="collapsed"
        :mode="mode"
        :background-color="styles.asideColor"
        :text-color="styles.menuTextColor"
        :active-text-color="styles.primaryColor"
        >
        <MenuItem
            v-for="route in asyncRouteStore"
            :key="route.name"
            :option="route"
            :base-path="route.path"
            />
    </el-menu>
</template>

<script lang="ts">
import { defineComponent, PropType, computed, ref } from "vue"
import { useProjectSettingStore } from '@/store/modules/projectSetting'
import styles from "@/styles/var.module.scss"
import { asyncRouteStore } from "@/utils/routes"
import MenuItem from "./MenuItem.vue"
import {
    Document,
    Menu as IconMenu,
    Location,
    Setting, } from '@element-plus/icons-vue'

export default defineComponent({
    name: "Menu",
    components: {
        Document,
        IconMenu,
        Location,
        Setting,
        MenuItem,
    },
    props: {
        collapsed: {// 侧边栏菜单是否折叠
            type: Boolean
        },
        mode: {// 菜单模式
            type: String as PropType<"vertical" | "horizontal">,
            default: 'vertical',
        },
        location: {// 菜单位置
            type: String,
            default: 'left',
        },
    },
    setup(props, ctx){
        const settingStore = useProjectSettingStore();
        const navMode = computed(() => settingStore.navMode);
        const menus = ref([]);
        const defaultActive = ref('');
        return {
            styles,
            defaultActive,
            asyncRouteStore,
        }
    }
})
</script>
<style lang="scss" scoped>
@import "@/styles/var.scss";
.aside-menu{
    border-right: 0;
    :deep(.ep-menu-item-group__title){
        padding: 0;
    }
    :deep(.ep-sub-menu__title){
        &:hover{
            color: $menu-text-hover !important;
            background-color: unset;
        }
    }
    :deep(.ep-menu-item){
        &:hover{
            color: $menu-text-hover !important;
            background-color: unset;
        }
        &.is-active{
            color: $menu-text-hover;
            background-color: $primary-color;
        }
    }
}
</style>
<style lang="scss">
@import "@/styles/var.scss";

.ep-menu.ep-menu--popup{
    padding-top: 0;
    padding-bottom: 0;
    .ep-menu-item-group__title{
        padding: 0;
    }
    .ep-menu-item{
        &.is-active{
            color: $menu-text-hover;
            background-color: $primary-color;
        }
    }
}
</style>