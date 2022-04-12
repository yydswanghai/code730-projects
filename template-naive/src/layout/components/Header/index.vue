<template>
    <div class="layout-header">
        <!-- 菜单在顶部: 顶部菜单模式、顶部混合菜单模式 下显示 -->
        <HeaderMenu
            v-if="navMode === 'horizontal' || (navMode === 'horizontal-mix' && mixMenu)"
            :collapsed="collapsed"
            :inverted="inverted"
            :navMode="navMode"
        />
        <!--左侧按钮集-->
        <HeaderLeft v-else :collapsed="collapsed" @click="changeCollapsed" />
        <!--右侧按钮集-->
        <HeaderRight />
    </div>
</template>

<script>
import { useProjectSettingStore } from '@/store/modules/projectSetting'
import { computed } from 'vue'

import HeaderMenu from './HeaderMenu.vue'
import HeaderLeft from './HeaderLeft.vue'
import HeaderRight from './HeaderRight.vue'

export default {
    name: 'Header',
    components: {
        HeaderMenu,
        HeaderLeft,
        HeaderRight,
    },
    props: {
        collapsed: Boolean,
        inverted: Boolean,
    },
    setup(props,ctx){
        const settingStore = useProjectSettingStore()

        function changeCollapsed() {
            ctx.emit('update:collapsed', !props.collapsed)
        }

        return {
            navMode: computed(() => settingStore.navMode),// 导航栏模式
            mixMenu: computed(() => settingStore.menuSetting.mixMenu),// 分割菜单
            navTheme: computed(() => settingStore.navTheme),// 导航主题
            changeCollapsed
        }
    }
}

</script>
<style lang="less" scoped>
.layout-header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0;
    height: @header-height;
    box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
    transition: all 0.2s ease-in-out;
    width: 100%;
    z-index: 11;
}
</style>
<style lang="less">
.layout-header{
    .trigger{
        display: inline-block;
        width: auto;
        padding: 0 12px;
        height: @header-height;
        text-align: center;
        cursor: pointer;
        transition: all 0.2s ease-in-out;
        .n-icon {
            display: flex;
            align-items: center;
            height: @header-height;
            line-height: @header-height;
        }
        &:hover {
            background: hsla(0, 0%, 100%, 0.08);
        }
    }
}
</style>