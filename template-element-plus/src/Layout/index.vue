<template>
    <el-container class="layout">
        <!-- 侧边栏 -->
        <el-aside
            v-if="showAside"
            class="layout-aside"
            :style="asideStyles"
            >
            <el-scrollbar>
                <Logo :collapsed="collapsed" />
                <AsideMenu :collapsed="collapsed" />
            </el-scrollbar>
        </el-aside>
        <el-container>
            <!-- 头部 -->
            <el-header>
                <Header :collapsed="collapsed" :changeCollapsed="changeCollapsed" />
            </el-header>
            <!-- 内容区 -->
            <el-main>
                <TagsView />
                <!-- 菜单标签 -->
                <Main class="layout-main"  />
            </el-main>
        </el-container>
    </el-container>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useProjectSettingStore } from '@/store/modules/projectSetting'
import { Logo } from './components/Logo/'
import { Menu as AsideMenu } from './components/Menu/'
import { Header } from './components/Header/'
import { Main } from './components/Main/'
import { TagsView } from './components/TagsView/'

export default defineComponent({
    name: 'Layout',
    components: {
        Logo,
        AsideMenu,
        Header,
        TagsView,
        Main,
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
        function changeCollapsed() {
            collapsed.value = !collapsed.value;
        }
        /* 监听屏幕宽度改变 */
        function watchScreenWidth() {
            const { mobileWidth } = settingStore.menuSetting;
            if(document.body.clientWidth <= mobileWidth){
                collapsed.value = true;
            }else{
                collapsed.value = false;
            }
        }

        onMounted(() => {
            window.addEventListener('resize', watchScreenWidth);
        });

        return {
            collapsed,
            asideStyles,
            showAside,
            changeCollapsed,
        }
    }
})
</script>
<style lang="scss" scoped>
@import "@/styles/var.scss";
.layout{
    width: 100%;
    height: 100%;
    .layout-aside{
        transition: all .3s;
        background-color: $aside-color;
    }
    .ep-container{
        background: #F5F7F9;
    }
    .ep-header{
        padding-right: 0;
    }
    .ep-main{
        padding-right: 0;
        padding-top: 12px;
    }
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