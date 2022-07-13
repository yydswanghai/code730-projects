<template>
    <div class="layout-header">
        <div class="header-menu"
            v-if="navMode === 'horizontal' || (navMode === 'horizontal-mix' && mixMenu)"
            >
            <Logo class="logo-h" :collapsed="collapsed" />
            <AsideMenu mode="horizontal" :collapsed="collapsed" />
        </div>
        <HeaderLeft v-else :collapsed="collapsed" v-bind="$attrs" />
        <HeaderRight />
    </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useProjectSettingStore } from '@/store/modules/projectSetting'
import { Logo } from '../Logo/'
import { Menu as AsideMenu } from '../Menu/'
import HeaderLeft from './HeaderLeft.vue'
import HeaderRight from './HeaderRight.vue'

export default defineComponent({
    name: 'Header',
    components: {
        Logo,
        AsideMenu,
        HeaderLeft,
        HeaderRight,
    },
    props: {
        collapsed: Boolean,
    },
    setup(){
        const settingStore = useProjectSettingStore();

        return {
            navMode: computed(() => settingStore.navMode),// 导航栏模式
            mixMenu: computed(() => settingStore.menuSetting.mixMenu),// 分割菜单
        }
    }
})
</script>
<style lang="scss" scoped>
@import "@/styles/var.scss";
.layout-header{
    background: #FFF;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0;
    height: $header-height;
    box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
    transition: all 0.2s ease-in-out;
    width: 100%;
    z-index: 11;
}
.header-menu{
    display: flex;
    align-items: center;
    .logo-h{
        padding-left: 10px;
    }
}
</style>
<style lang="scss">
@import "@/styles/var.scss";
.layout-header{
    .trigger{
        display: inline-block;
        width: auto;
        padding: 0 12px;
        height: 100%;
        text-align: center;
        cursor: pointer;
        transition: all 0.2s ease-in-out;
        .ep-icon {
            display: flex;
            align-items: center;
            height: $header-height;
            line-height: $header-height;
        }
        &:hover {
            background: hsla(0, 0%, 100%, 0.08);
        }
    }
}
.ep-popper{
    a{
        color: inherit;
    }
}
</style>