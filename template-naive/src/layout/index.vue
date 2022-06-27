<template>
    <NLayout class="layout" :position="fixedHeader" has-sider>
        <!-- 左侧边的菜单 -->
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

        <!-- 移动端才弹出的侧边栏 -->
        <NDrawer
            class="layout-side-drawer"
            placement="left"
            :width="menuWidth"
            v-model:show="showSideDrawder"
            >
            <Logo :collapsed="collapsed" />
            <AsideMenu :inverted="inverted" @clickMenuItem="collapsed = false" />
        </NDrawer>

        <NLayout :inverted="inverted">
            <!-- 顶部的组件 -->
            <NLayoutHeader :inverted="getHeaderInverted" :position="fixedHeader">
                <Header v-model:collapsed="collapsed" :inverted="getHeaderInverted"  />
            </NLayoutHeader>
            <!-- 主内容区 -->
            <NLayoutContent class="layout-content" :class="{ 'layout-default-background': isDarkTheme === false }">
                <div class="layout-content-main"
                    :class="{ 'layout-content-main-fix': fixedMulti, 'fluid-header': fixedHeader === 'static' }">
                    <!-- 菜单标签 -->
                    <TagsView v-if="isMultiTabs" v-model:collapsed="collapsed" :isMixMenuNoneSub="isMixMenuNoneSub" />
                    <div class="layout-main" :class="{ 'main-view-fix': fixedMulti, 'noMultiTabs': !isMultiTabs }">
                        <!-- 内容区 -->
                        <Main />
                    </div>
                </div>
            </NLayoutContent>
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
import TagsView from './components/TagsView/index.vue'
import Main from './components/Main/index.vue'
/**
 * Layout 页面布局组件
 */
export default {
    name: 'Layout',
    components: {
        Logo,
        AsideMenu,
        Header,
        TagsView,
        Main,
    },
    setup(){
        const collapsed = ref(false)                          // 折叠侧边栏
        const settingStore = useProjectSettingStore()
        const navMode = computed(() => settingStore.navMode)  // 导航栏模式
        const navTheme = computed(() => settingStore.navTheme)// 导航栏主题
        const fixedHeader = computed(() => {                  // 固定顶部 期望内容在固定的区域内滚动
            const { fixed } = settingStore.headerSetting
            return fixed ? 'absolute' : 'static'
        })
        const isMobile = computed({                           // 是否为手机端
            get: () => settingStore.isMobile,
            set: (val) => settingStore.setIsMobile(val)
        })
        const isMixMenuNoneSub = computed(() => {             // 混合菜单模式并开启分割菜单且没有子路由
            const { mixMenu } = settingStore.menuSetting// 分割菜单
            const $route = useRoute()
            if(navMode.value !== 'horizontal-mix') return true
            if(navMode.value === 'horizontal-mix' && mixMenu && $route.meta.isRoot){
                return false
            }
            return true
        })
        const menuWidth = computed(() => settingStore.menuSetting.menuWidth)// 菜单最小宽度：菜单向左边折叠的时候
        const minMenuWidth = computed(() => settingStore.menuSetting.minMenuWidth)// 菜单基础宽度
        const leftMenuWidth = computed(() => {// 侧边菜单宽度：判断是否正则折叠
            return collapsed.value ? minMenuWidth.value : menuWidth.value
        })
        const inverted = computed(() => {// 反转样式，用来切换背景对比
            return ['dark', 'header-dark'].includes(navTheme.value);
        })
        const getHeaderInverted = computed(() => {// 顶部反转样式
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
        // 监听屏幕宽度改变
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
            menuWidth,
            minMenuWidth,
            leftMenuWidth,
            inverted,
            getMenuLocation: computed(() => 'left'),// 菜单位置
            getHeaderInverted,
            showSideDrawder,
            isDarkTheme: computed(() => settingStore.isDarkTheme),// 是否为暗色主题
            fixedMulti: computed(() => settingStore.multiTabsSetting.fixed),// 标签是否固定
            isMultiTabs: computed(() => settingStore.multiTabsSetting.show),// 标签是否显示
        }
    }
}
</script>

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
    .layout-default-background {
        background: #f5f7f9;
    }
    .layout-content{
        flex: auto;
        min-height: 100vh;
    }
    .layout-content-main {
        margin: 0 10px 10px;
        position: relative;
        padding-top: 64px;
    }
    .layout-content-main-fix{
        padding-top: 64px;
    }
    .fluid-header{
        padding-top: 0;
    }
    .main-view-fix {
        padding-top: 44px;
    }

    .noMultiTabs {
        padding-top: 0;
        margin-top: 0.75rem;
    }
}
.n-layout-header.n-layout-header--absolute-positioned{
    z-index: 100;
}
</style>
<style lang="less">
.layout-side-drawer {
    background-color: rgb(0, 20, 40);
}
</style>