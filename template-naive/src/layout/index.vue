<template>
    <NLayout class="layout" :position="fixedHeader" has-sider>
        <NLayoutSider
            v-if="!isMobile && isMixMenuNoneSub && (navMode === 'vertical' || navMode === 'horizontal-mix')"
            class="layout-sider"
            show-trigger="bar"
            collapse-mode="width"
            :position="fixedMenu"
            :collapsed="collapsed"
            :collapsed-width="minMenuWidth"
            :width="leftMenuWidth"
            :native-scrollbar="false"
            :inverted="inverted"
            @collapse="collapsed = true"
            @expand="collapsed = false"
            >
            <Logo :collapsed="collapsed" />
        </NLayoutSider>
    </NLayout>
</template>

<script>
import { useProjectSettingStore } from '@/store/modules/projectSetting'
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'

import Logo from './components/Logo/index.vue'

export default {
    name: 'Layout',
    components: {
        Logo,
    },
    setup(){
        const collapsed = ref(false);
        const projectStore = useProjectSettingStore()
        const fixedHeader = computed(() => {
            const { fixed } = projectStore.headerSetting
            return fixed ? 'absolute' : 'static'
        })
        const isMobile = computed(() => projectStore.isMobile)
        const isMixMenuNoneSub = computed(() => {
            const mixMenu = projectStore.menuSetting.mixMenu
            const $route = useRoute()
            if(projectStore.navMode !== 'horizontal-mix') return true
            if(projectStore.navMode === 'horizontal-mix' && mixMenu && $route.meta.isRoot){
                return false
            }
            return true
        })
        const leftMenuWidth = computed(() => {
            const { minMenuWidth, menuWidth } = projectStore.menuSetting
            return collapsed.value ? minMenuWidth : menuWidth
        })
        const inverted = computed(() => {
            return ['dark', 'header-dark'].includes(projectStore.navTheme);
        })
        return {
            collapsed,
            fixedHeader,
            fixedMenu: fixedHeader,
            isMobile,
            isMixMenuNoneSub,
            navMode: computed(() => projectStore.navMode),
            minMenuWidth: computed(() => projectStore.menuSetting.minMenuWidth),
            leftMenuWidth,
            inverted,
        }
    }
}
</script>