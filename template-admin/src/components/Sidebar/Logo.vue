<template>
    <div class="sidebar-logo-container">
        <transition name="sidebarLogoFade">
            <RouterLink v-if="collapse" to="/" class="sidebar-logo-link">
                <img v-if="logo" :src="logo" :alt="title" class="sidebar-logo">
                <h1 v-else class="sidebar-title">{{ title }}</h1>
            </RouterLink>
            <RouterLink v-else to="/" class="sidebar-logo-link">
                <img v-if="logo" :src="logo" :alt="title" class="sidebar-logo">
                <h1 class="sidebar-title">{{ title }} </h1>
            </RouterLink>
        </transition>
    </div>
</template>

<script>
import { settingsStore } from '@/store/useSettings'
import { computed } from 'vue';
export default {
    name: 'SidebarLogo',
    props: {
        collapse: {// 折叠
            type: Boolean,
            required: true
        }
    },
    setup(){
        return {
            logo: computed(() => settingsStore.sidebar.logo),
            title: computed(() => settingsStore.title),
        }
    }
};
</script>
<style lang="scss" scoped>
.sidebarLogoFade-enter-active {
    transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
    opacity: 0;
}
.sidebar-logo-container {
    position: relative;
    width: 100%;
    height: 50px;
    line-height: 50px;
    background: #2b2f3a;
    text-align: center;
    overflow: hidden;
    & .sidebar-logo-link {
        height: 100%;
        width: 100%;
        & .sidebar-logo {
            width: 32px;
            height: 32px;
            vertical-align: middle;
        }
        & .sidebar-title {
            display: inline-block;
            margin: 0 0 0 12px;
            color: #fff;
            font-weight: 600;
            line-height: 50px;
            font-size: 14px;
            font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
            vertical-align: middle;
        }
    }
    &.collapse {
        .sidebar-logo {
            margin-right: 0px;
        }
    }
}
</style>