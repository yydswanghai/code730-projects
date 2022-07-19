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
                <AsideMenu :collapsed="collapsed" :inverted="asideInverted" />
            </el-scrollbar>
        </el-aside>
        <el-container>
            <!-- 头部 -->
            <el-header class="i-header">
                <Header :collapsed="collapsed" :changeCollapsed="changeCollapsed" :inverted="asideInverted" />
            </el-header>
            <!-- 内容区 -->
            <el-main class="i-main">
                <!-- 菜单标签 -->
                <TagsView v-if="showTagsView" :collapsed="collapsed" :isNotMixMenu="isNotMixMenu" />
                <Main class="layout-main" :class="{ 'main-fixed': fixedTagsView, 'no-tags-view' : !showTagsView }" />
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
        /* 非混合菜单模式 */
        const isNotMixMenu = computed(() => navMode.value !== 'horizontal-mix');
        /* 显示侧边栏 */
        const showAside = computed(() => {
            return !isMobile.value && isNotMixMenu.value &&
            (navMode.value === 'vertical' || navMode.value === 'horizontal-mix')
        });
        /* 侧边栏样式 */
        const asideStyles = computed(() => {
            return {
                width: (collapsed.value ?
                    settingStore.menuSetting.minMenuWidth :
                    settingStore.menuSetting.menuWidth) + 'px',
                backgroundColor: asideInverted.value ? settingStore.darkColor : settingStore.menuSetting.bgColor
            }
        });
        /* 侧边栏反转样式 */
        const asideInverted = computed(() => settingStore.themeSetting.isDark);
        const headerInverted = computed(() => ['light', 'header-dark'].includes(navTheme.value));

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
            isNotMixMenu,
            showTagsView: computed(() => settingStore.tagsViewSetting.show),
            fixedTagsView: computed(() => settingStore.tagsViewSetting.fixed),
            asideInverted,
            headerInverted,
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
    }
    .i-header{
        padding-right: 0;
    }
    .i-main{
        padding-right: 0;
        padding-top: 0;
    }
    .layout-main{
        &.main-fixed{
            padding-top: 44px;
        }
        &.no-tags-view{
            padding-top: 0;
            margin-top: 0.75rem;
        }
    }
}
</style>