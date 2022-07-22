<template>
    <el-container class="layout">
        <!-- 侧边栏 -->
        <el-aside
            v-if="showAside"
            class="layout-aside"
            :style="{ width: menuWidth }"
            >
            <el-scrollbar>
                <Logo :collapsed="collapsed" />
                <AsideMenu :collapsed="collapsed" :inverted="inverted" />
            </el-scrollbar>
        </el-aside>
        <el-container>
            <el-scrollbar class="i-scroll">
                <!-- 头部 -->
                <el-header class="layout-header" :class="{ 'padding-left' : asideIsTop, 'i-fixed-header': fixedHeader }" >
                    <Header :collapsed="collapsed" :changeCollapsed="changeCollapsed" :inverted="headerInverted" />
                </el-header>
                <!-- 内容区 -->
                <main class="i-main" :class="{ 'padding-left' : asideIsTop }">
                    <!-- 菜单标签 -->
                    <TagsView v-if="showTagsView" :collapsed="collapsed"
                        :class="{ 'i-fixed-tags-view': fixedTagsView,
                        'i-tags-view-dark-bg': isDark,
                        'i-tags-view-bg': !isDark }"
                        />
                    <Main class="layout-main" :class="{ 'no-tags-view' : !fixedTagsView }" />
                </main>
            </el-scrollbar>
        </el-container>
    </el-container>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue'
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
        /* 显示侧边栏 */
        const showAside = computed(() => {
            return !isMobile.value && (navMode.value === 'vertical' || navMode.value === 'horizontal-mix')
        });
        /* 侧边栏宽度 */
        const menuWidth = computed(() => collapsed.value ?
            settingStore.menuSetting.minMenuWidth + 'px' :
            settingStore.menuSetting.menuWidth + 'px');
        /* 反转样式 */
        const { inverted, headerInverted } = useAddTheme();
        /* 用于给子组件切换 */
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
            showAside,
            inverted,
            headerInverted,
            menuWidth,
            asideIsTop: computed(() => navMode.value === 'horizontal'),
            showTagsView: computed(() => settingStore.tagsViewSetting.show),
            fixedTagsView: computed(() => settingStore.tagsViewSetting.fixed),
            fixedHeader: computed(() => settingStore.headerSetting.fixed),
            isDark: computed(() => settingStore.themeSetting.isDark),
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
    --gap: 20px;
    --menu-width: v-bind(menuWidth);
    .layout-aside{
        transition: all .3s;
        background-color: var(--i-menu-bg-color);
        box-shadow: 2px 0 8px 0 rgb(29 35 41 / 5%);
    }
    .layout-header{
        padding-right: 0;
        height: $header-height;
    }
    .i-main{
        padding-right: 0;
        padding-top: 0;
        padding-left: var(--gap);
        box-sizing: border-box;
    }
    .layout-main{
        padding-top: 44px;
        width: 100%;
        &.no-tags-view{
            padding-top: 0;
            margin-top: 0.75rem;
        }
    }
    .padding-left{
        padding-left: 0;
    }
    .i-scroll{
        width: 100%;
    }
    .i-tags-view-bg{
        background: #f5f7f9;
    }
    .i-tags-view-dark-bg{
        background: #101014;
    }
    /* 固定顶栏 */
    .i-fixed-header{
        position: sticky;
        position: -webkit-sticky;
        left: var(--menu-width);
        right: 0;
        top: 0;
        z-index: 100;
    }
    .i-fixed-tags-view{
        position: fixed;
        left: calc(var(--menu-width) + var(--gap));
        right: 0;
        top: $header-height;
        z-index: 1;
    }
}
</style>