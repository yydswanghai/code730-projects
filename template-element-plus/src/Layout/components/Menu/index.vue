<template>
    <el-menu
        class="aside-menu"
        :default-active="defaultActive"
        :collapse="collapsed"
        :mode="mode"
        :background-color="styles.asideColor"
        :text-color="styles.menuTextColor"
        :active-text-color="styles.primaryColor"
        @select="handleSelect"
        >
        <MenuItem
            v-for="route in menus"
            :key="route.name"
            :option="route"
            />
    </el-menu>
</template>

<script lang="ts">
import { defineComponent, PropType, computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useProjectSettingStore } from '@/store/modules/projectSetting'
import { useAsyncRouteStore } from '@/store/modules/asyncRoute'
import styles from '@/styles/var.module.scss'
import MenuItem from './MenuItem.vue'
import { PageEnum } from '@/enums/pageEnum'
import { resolve } from 'path-browserify'
import { isExternal } from '@/utils/'

export default defineComponent({
    name: 'Menu',
    components: {
        MenuItem,
    },
    props: {
        collapsed: {// 侧边栏菜单是否折叠
            type: Boolean
        },
        mode: {// 菜单模式
            type: String as PropType<'vertical' | 'horizontal'>,
            default: 'vertical',
        },
        location: {// 菜单位置
            type: String,
            default: 'left',
        },
    },
    setup(){
        const $router = useRouter();
        const settingStore = useProjectSettingStore();
        const asyncRouteStore = useAsyncRouteStore();
        const defaultActive = ref<string>(PageEnum.HOME);
        const menus = ref(asyncRouteStore.menus);
        const navMode = computed(() => settingStore.navMode);
        /* 菜单切换栏目跳转对应的路由 */
        function handleSelect(index: string, indexPath: string[]) {
            if(isExternal(index)){
                console.log(true)
            }
            console.log(index)
            const path = resolve(...indexPath);
            $router.push(path);
        }
        return {
            styles,
            defaultActive,
            menus,
            handleSelect,
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