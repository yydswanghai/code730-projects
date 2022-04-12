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
                <Header v-model:collapsed="collapsed" :inverted="getHeaderInverted"  />
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
import Header from './components/Header/index.vue'

export default {
    name: 'Layout',
    components: {
        Logo,
        AsideMenu,
        Header,
    },
    setup(){
        const collapsed = ref(false)
        const settingStore = useProjectSettingStore()
        const navMode = computed(() => settingStore.navMode)// 导航栏模式
        const navTheme = computed(() => settingStore.navTheme)// 导航栏主题
        const fixedHeader = computed(() => {// 固定顶部
            const { fixed } = settingStore.headerSetting
            return fixed ? 'absolute' : 'static'
        })
        const isMobile = computed({// 是否为手机端
            get: () => settingStore.isMobile,
            set: (val) => settingStore.setIsMobile(val)
        })
        const isMixMenuNoneSub = computed(() => {
            const { mixMenu } = settingStore.menuSetting// 分割菜单
            const $route = useRoute()
            if(navMode.value !== 'horizontal-mix') return true
            if(navMode.value === 'horizontal-mix' && mixMenu && $route.meta.isRoot){
                return false
            }
            return true
        })
        const leftMenuWidth = computed(() => {// 侧边菜单宽度
            const { minMenuWidth, menuWidth } = settingStore.menuSetting
            return collapsed.value ? minMenuWidth : menuWidth
        })
        const inverted = computed(() => {// 反转，用来切换背景对比
            return ['dark', 'header-dark'].includes(navTheme.value);
        })
        const getHeaderInverted = computed(() => {// 顶部反转
            return ['light', 'header-dark'].includes(navTheme.value) ? unref(inverted) : !unref(inverted)
        })

        // 控制显示或隐藏移动端侧边栏
        const showSideDrawder = computed({
            get: () => isMobile.value && collapsed.value,
            set: (val) => (collapsed.value = val)
        })

        // 判断是否触发移动端模式
        function checkMobileMode(){
            const { mobileWidth } = settingStore.menuSetting
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
            navMode,
            fixedHeader,
            fixedMenu: fixedHeader,
            isMobile,
            isMixMenuNoneSub,
            menuWidth: computed(() => settingStore.menuSetting.menuWidth),
            minMenuWidth: computed(() => settingStore.menuSetting.minMenuWidth),
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
    .layout-sider {
        min-height: 100vh;
        box-shadow: 2px 0 8px 0 rgb(29 35 41 / 5%);
        position: relative;
        z-index: 13;
        transition: all 0.2s ease-in-out;
    }
}
</style>