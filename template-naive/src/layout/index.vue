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

        <NDrawer 
            class="layout-side-drawer"
            placement="left"
            :width="menuWidth"
            v-model:show="showSideDrawder"
            >
            <Logo :collapsed="collapsed" />
            <AsideMenu @clickMenuItem="collapsed = false" />
        </NDrawer>

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
        const collapsed = ref(false)
        const projectStore = useProjectSettingStore()
        const fixedHeader = computed(() => {// 固定头
            const { fixed } = projectStore.headerSetting
            return fixed ? 'absolute' : 'static'
        })
        const isMobile = computed({// 是否为手机端
            get: () => projectStore.isMobile,
            set: (val) => projectStore.setIsMobile(val)
        })
        const isMixMenuNoneSub = computed(() => {
            const mixMenu = projectStore.menuSetting.mixMenu
            const $route = useRoute()
            if(projectStore.navMode !== 'horizontal-mix') return true
            if(projectStore.navMode === 'horizontal-mix' && mixMenu && $route.meta.isRoot){
                return false
            }
            return true
        })
        const leftMenuWidth = computed(() => {// 侧边菜单宽度
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

        // 控制显示或隐藏移动端侧边栏
        const showSideDrawder = computed({
            get: () => isMobile.value && collapsed.value,
            set: (val) => (collapsed.value = val)
        })

        // 判断是否触发移动端模式
        function checkMobileMode(){
            const { mobileWidth } = projectStore.menuSetting
            if(document.body.clientWidth <= mobileWidth){
                isMobile.value = true
            }else{
                isMobile.value = false
            }
            collapsed.value = false
        }

        function watchWidth(){
            if(document.body.clientWidth <= 950){
                collapsed.value = true
            }else{
                collapsed.value = false
            }
            checkMobileMode()
        }

        onMounted(() => {
            // 全局loading-bar挂载在 window 方便与在js中使用
            window['$loading'] = useLoadingBar()
            window['$loading'].finish()

            checkMobileMode()
            window.addEventListener('resize', watchWidth)
        })
        return {
            collapsed,
            fixedHeader,
            fixedMenu: fixedHeader,
            isMobile,
            isMixMenuNoneSub,
            menuWidth: computed(() => projectStore.menuSetting.menuWidth),
            navMode: computed(() => projectStore.navMode),
            minMenuWidth: computed(() => projectStore.menuSetting.minMenuWidth),
            leftMenuWidth,
            inverted,
            getMenuLocation: computed(() => 'left'),
            getHeaderInverted,
            showSideDrawder,
        }
    }
}
</script>
<style lang="less">
.layout-side-drawer {
    background-color: rgb(0, 20, 40);
    .layout-sider {
        min-height: 100vh;
        box-shadow: 2px 0 8px 0 rgb(29 35 41 / 5%);
        position: relative;
        z-index: 13;
        transition: all 0.2s ease-in-out;
    }
}
</style>

<style lang="less" scoped>
.layout{
    display: flex;
    flex-direction: row;
    flex: auto;
    &-default-background {
      background: #f5f7f9;
    }
    .layout-sider {
      min-height: 100vh;
      box-shadow: 2px 0 8px 0 rgb(29 35 41 / 5%);
      position: relative;
      z-index: 13;
      transition: all 0.2s ease-in-out;
    }
}
</style>