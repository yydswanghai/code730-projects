<template>
    <div class="layout-header">
        <!-- 菜单在顶部 -->
        <HeaderMenu
            v-if="navMode === 'horizontal' || (navMode === 'horizontal-mix' && mixMenu)"
            :collapsed="collapsed"
            :inverted="inverted"
            :navMode="navMode"
        />
        <!--左侧按钮集-->
        <HeaderLeft v-else v-model:collapsed="collapsed" />
        <!--右侧按钮集-->
        
    </div>
</template>

<script>
import { useProjectSettingStore } from '@/store/modules/projectSetting'
import { computed, watch } from 'vue'

import HeaderMenu from './HeaderMenu.vue'
import HeaderLeft from './HeaderLeft.vue'

export default {
    name: 'Header',
    components: {
        HeaderMenu,
        HeaderLeft,
    },
    props: {
        collapsed: Boolean,
        inverted: Boolean,
        navMode: String,
    },
    setup(props){
        const projectStore = useProjectSettingStore()

        watch(() => props.collapsed, () => {
            console.log('collapsed', props.collapsed)
        })
        
        return {
            mixMenu: computed(() => projectStore.menuSetting.mixMenu),
            navTheme: computed(() => projectStore.navTheme),
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