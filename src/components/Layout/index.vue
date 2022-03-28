<template>
    <div class="layout" :class="classObject">
        <ElContainer>
            <Header>
                <template #right>
                    <div class="header-right">
                        <ElDropdown @command="handleCommand">
                            <span class="header-right_link">
                                userName<ElIcon class="el-icon--right"><ArrowDown /></ElIcon>
                            </span>
                            <template #dropdown>
                                <ElDropdownMenu>
                                    <ElDropdownItem command="logout">退出登录</ElDropdownItem>
                                </ElDropdownMenu>
                            </template>
                        </ElDropdown>
                    </div>
                </template>
            </Header>
            <div class="drawer-bg" @click="handleClickOutside"
                v-if="settingsStore.device === 'mobile' && settingsStore.sidebar.opened"></div>
            <Sidebar />
            <Main />
        </ElContainer>
    </div>
</template>

<script>
import Header from '@/components/Header/index.vue'
import Sidebar from '@/components/Sidebar/index.vue'
import Main from '@/components/Main/index.vue'
import { computed } from 'vue';
import { settingsStore, closeSidebar } from '@/store/useSettings'
import useResizeDevice from '@/composition/useResizeDevice.js'
export default {
    name: 'Layout',
    components: {
        Header,
        Sidebar,
        Main,
    },
    setup(){
        useResizeDevice()
        const classObjectRef = computed(() => ({
            openSidebar: settingsStore.sidebar.opened,
            hideSidebar: !settingsStore.sidebar.opened,
            withoutAnimation: settingsStore.sidebar.withoutAnimation,
            mobile: settingsStore.device === 'mobile'
        }))
        const handleCommand = (command) => {
            if(command === 'logout'){
                // 退出逻辑
            }
        }
        /* 手机端点空白关闭侧边栏 */
        const handleClickOutside = () => {
            closeSidebar({ withoutAnimation: false })
        }
        return {
            settingsStore,
            classObject: classObjectRef,
            handleCommand,
            handleClickOutside,
        }
    }
};
</script>
<style lang="scss" scoped>
@import "styles/mixin.scss";

.layout{
    position: relative;
    width: 100%;
    height: 100%;
    @include clearfix;
    &.mobile.openSidebar{
        position: fixed;
        top: 0;
    }
    .drawer-bg {
        background: #000;
        opacity: 0.3;
        width: 100%;
        top: 0;
        height: 100%;
        position: absolute;
        z-index: 999;
    }
}
.header-right{
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    .header-right_link{
        color: var(--el-color-white);
        cursor: pointer;
        font-size: 16px;
        display: flex;
    }
    .el-dropdown-link {
        cursor: pointer;
        color: var(--el-color-primary);
        display: flex;
        align-items: center;
    }
}
</style>
<style lang="scss">
@import "styles/variables.module.scss";

/* 隐藏sidebar时的样式 */
.hideSidebar{
    .sidebar-container{
        width: $hideSidebarWidth;
    }
    .main-container {
        margin-left: $hideSidebarWidth;
    }
    .sub-el-icon {
        margin: 0;
        vertical-align: middle;
        width: 24px;
        text-align: center;
    }
    .el-sub-menu .el-sub-menu__title .el-sub-menu__icon-arrow{
        display: none;
    }
    .el-menu--collapse{
        .el-sub-menu .el-sub-menu__title > span,
        .submenu-title-noDropdown > span{
            height: 0;
            width: 0;
            overflow: hidden;
            visibility: hidden;
            display: inline-block;
        }
    }
}
/* 响应式手机端 */
.mobile{
    .sidebar-container {
        transition: transform .28s;
        width: $sideBarWidth;
    }
    .main-container {
        margin-left: 0px;
    }

    &.hideSidebar{
        .sidebar-container {
            pointer-events: none;
            transition-duration: 0.3s;
            transform: translate3d(-$sideBarWidth, 0, 0);
        }
    }
}
.withoutAnimation {
    .main-container,
    .sidebar-container {
        transition: none;
    }
}
</style>