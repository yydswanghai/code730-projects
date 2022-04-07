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
            <AsideMenu 
                v-model:collapsed="collapsed" 
                v-model:location="getMenuLocation" 
                :inverted="inverted" 
                :navMode="navMode" 
            />
        </NLayoutSider>

        <NLayout :inverted="inverted">
            <NLayoutHeader :inverted="getHeaderInverted" :position="fixedHeader">
            </NLayoutHeader>
            <NBackTop :right="100" />
        </NLayout>
    </NLayout>
</template>

<script>
import { useProjectSettingStore } from '@/store/modules/projectSetting'
import { computed, ref, unref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useLoadingBar } from 'naive-ui'

import Logo from './components/Logo/index.vue'
import AsideMenu from './components/Menu/index.vue'

export default {
    name: 'Layout',
    components: {
        Logo,
        AsideMenu,
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
        const getHeaderInverted = computed(() => {
            const navTheme = unref(projectStore.navTheme)
            return ['light', 'header-dark'].includes(navTheme) ? unref(inverted) : !unref(inverted)
        })

        onMounted(() => {
            //挂载在 window 方便与在js中使用
            window['$loading'] = useLoadingBar()
            window['$loading'].finish()
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
            getMenuLocation: computed(() => 'left'),
            getHeaderInverted,
        }
    }
}
</script>