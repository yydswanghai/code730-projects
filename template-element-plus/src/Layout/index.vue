<template>
    <el-container class="layout">
        <!-- 侧边栏 -->
        <el-aside
            v-if="showAside"
            class="layout-aside"
            :style="asideStyles"
            >
            <Logo :collapsed="collapsed" />
            <AsideMenu :collapsed="collapsed" />
        </el-aside>
        <!-- 手机端侧边栏 -->
        <el-drawer
            direction="ltr"
            :with-header="false"
            v-model="showSideDrawder"
            size="100"
            custom-class="layout-drawer"
            >
            <Logo :collapsed="collapsed" />
            <AsideMenu :collapsed="collapsed" :style="asideStyles" />
        </el-drawer>
        <el-container>
            <!-- 头部 -->
            <el-header>
                <Header :collapsed="collapsed" :changeCollapsed="changeCollapsed" />
            </el-header>
            <!-- 内容区 -->
            <el-main>
                <div>
                    <!-- 菜单标签 -->
                    <Main class="layout-main"  />
                </div>
            </el-main>
        </el-container>
    </el-container>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from "vue"
import { useRoute } from 'vue-router'
import { useProjectSettingStore } from '@/store/modules/projectSetting'
import { Logo } from "./components/Logo/"
import { Menu as AsideMenu } from "./components/Menu/"
import { Header } from "./components/Header/"
import { Main } from "./components/Main/"

export default defineComponent({
    name: "Layout",
    components: {
        Logo,
        AsideMenu,
        Header,
        Main
    },
    setup(props, ctx){
        const collapsed = ref(false);
        const settingStore = useProjectSettingStore();
        const $route = useRoute();
        /* 导航栏模式 */
        const navMode = computed(() => settingStore.navMode);
        /* 导航栏风格 */
        const navTheme = computed(() => settingStore.navTheme);
        /* 是否为手机端 */
        const isMobile = computed({
            get: () => settingStore.isMobile,
            set: (val) => settingStore.setIsMobile(val)
        });
        /* 混合菜单模式并开启分割菜单且没有子路由 */
        const isMixMenuNoneSub = computed(() => {
            const { mixMenu } = settingStore.menuSetting;// 分割菜单
            if(navMode.value === 'horizontal-mix' && mixMenu && $route.meta.isRoot){
                return false
            }
            return true
        });
        /* 显示侧边栏 */
        const showAside = computed(() => {
            return !isMobile.value && isMixMenuNoneSub.value &&
            (navMode.value === 'vertical' || navMode.value === 'horizontal-mix')
        });
        /* 侧边栏样式 */
        const asideStyles = computed(() => {
            return {
                width: (collapsed.value ?
                    settingStore.menuSetting.minMenuWidth :
                    settingStore.menuSetting.menuWidth) + 'px'
            }
        });
        /* 控制显示或隐藏移动端侧边栏 */
        const showSideDrawder = computed({
            get: () => isMobile.value,
            set: (val) => (collapsed.value = val)
        });
        function changeCollapsed() {
            collapsed.value = !collapsed.value;
        }
        /* 判断是否触发移动端模式 */
        function checkMobileMode() {
            const { mobileWidth } = settingStore.menuSetting;
            if(document.body.clientWidth <= mobileWidth){
                isMobile.value = true;
                collapsed.value = false;
            }else{
                isMobile.value = false;
            }
        }
        /* 监听屏幕宽度改变 */
        function watchScreenWidth() {
            if(document.body.clientWidth <= 950){
                collapsed.value = true;
            }else{
                collapsed.value = false;
            }
            checkMobileMode()
        }

        onMounted(() => {
            checkMobileMode()
            window.addEventListener('resize', watchScreenWidth)
        });

        return {
            collapsed,
            asideStyles,
            showAside,
            showSideDrawder,
            changeCollapsed,
        }
    }
})
</script>
<style lang="scss" scoped>
@import "@/styles/var.scss";
.layout{
    height: 100%;
    .ep-header{
        padding-right: 0;
    }
}
.layout-aside{
    transition: width .36s;
    background-color: $aside-color;
}
</style>
<style lang="scss">
@import "@/styles/var.scss";
.layout-drawer{
    background-color: $aside-color;
    .ep-drawer__body{
        padding: 0;
    }
}
</style>