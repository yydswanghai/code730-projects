<template>
    <div class="layout-header">
        <div class="header-menu"
            v-if="navMode === 'horizontal' || navMode === 'horizontal-mix'">
            <Logo class="logo-h" :collapsed="collapsed" />
            <AsideMenu mode="horizontal" :collapsed="collapsed" :inverted="inverted" />
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
        inverted: Boolean,
    },
    setup(){
        const settingStore = useProjectSettingStore();

        return {
            settingStore,
            navMode: computed(() => settingStore.navMode),// 导航栏模式
        }
    }
})
</script>
<style lang="scss" scoped>
@import "@/styles/var.scss";
.layout-header{
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
        .el-icon {
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
.el-popper{
    a{
        color: inherit;
    }
}
</style>