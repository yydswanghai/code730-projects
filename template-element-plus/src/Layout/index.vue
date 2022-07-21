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
                <AsideMenu :collapsed="collapsed" :inverted="inverted" />
            </el-scrollbar>
        </el-aside>
        <el-container>
            <!-- 头部 -->
            <el-header class="layout-header" :class="{ 'padding-left' : asideIsTop }" >
                <Header :collapsed="collapsed" :changeCollapsed="changeCollapsed" :inverted="headerInverted" />
            </el-header>
            <!-- 内容区 -->
            <el-main class="i-main">
                <!-- 菜单标签 -->
                <TagsView v-if="showTagsView" :collapsed="collapsed" :isMixMenuNoneSub="isMixMenuNoneSub" />
                <Main class="layout-main" :class="{ 'main-fixed': fixedTagsView, 'no-tags-view' : !showTagsView }" />
            </el-main>
        </el-container>
    </el-container>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, unref } from 'vue'
import { useProjectSettingStore } from '@/store/modules/projectSetting'
import { Logo } from './components/Logo/'
import { Menu as AsideMenu } from './components/Menu/'
import { Header } from './components/Header/'
import { Main } from './components/Main/'
import { TagsView } from './components/TagsView/'
import useAddTheme from '@/hooks/useAddTheme'

export default defineComponent({
    name: 'Layout',
    components: {
        Logo,
        AsideMenu,
        Header,
        TagsView,
        Main,
    },
    setup(){
        const collapsed = ref(false);
        const settingStore = useProjectSettingStore();
        /* 导航栏模式 */
        const navMode = computed(() => settingStore.navMode);
        /* 是否为手机端 */
        const isMobile = computed({
            get: () => settingStore.isMobile,
            set: (val) => settingStore.setIsMobile(val)
        });
        /* 混合菜单模式并开启分割菜单且没有子路由 */
        const isMixMenuNoneSub = computed(() => {
            const { splitMenu } = settingStore.menuSetting;
            if(navMode.value !== 'horizontal-mix') return true;
            if(navMode.value === 'horizontal-mix' && splitMenu){
                return false
            }
            return true;
        });
        /* 显示侧边栏 */
        const showAside = computed(() => {
            return !isMobile.value && (navMode.value === 'vertical' || navMode.value === 'horizontal-mix')
        });
        const asideIsTop = computed(() => navMode.value === 'horizontal' || navMode.value === 'horizontal-mix');
        /* 侧边栏样式 */
        const asideStyles = computed(() => {
            return {
                width: (collapsed.value ?
                    settingStore.menuSetting.minMenuWidth :
                    settingStore.menuSetting.menuWidth) + 'px',
            }
        });
        const { inverted, headerInverted } = useAddTheme();

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
            isMixMenuNoneSub,
            asideIsTop,
            inverted,
            headerInverted,
            showTagsView: computed(() => settingStore.tagsViewSetting.show),
            fixedTagsView: computed(() => settingStore.tagsViewSetting.fixed),
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
        background-color: var(--i-menu-bg-color);
        box-shadow: 2px 0 8px 0 rgb(29 35 41 / 5%);
    }
    .layout-header{
        padding-right: 0;
        height: $header-height;
        &.padding-left{
            padding-left: 0;
        }
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