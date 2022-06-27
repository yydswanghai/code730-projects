<template>
    <div class="navbar">
        <Hamburger :is-active="settingsStore.sidebar.opened" class="hamburger-container" @toggleClick="toggle" />
        <Breadcrumb class="breadcrumb-container" />
    </div>
</template>

<script>
import { settingsStore, toggleSidebar } from "@/store/useSettings";
import Hamburger from '@/components/Hamburger/index.vue';
import Breadcrumb from '@/components/Breadcrumb/index.vue';
export default {
    name: 'Navbar',
    components: {
        Hamburger,
        Breadcrumb
    },
    setup(){

        return {
            settingsStore,
            toggle: () => toggleSidebar(),
        }
    }
}

</script>
<style lang="scss" scoped>
@import "styles/variables.module.scss";

.navbar {
    margin-bottom: 1rem;
    height: 50px;
    overflow: hidden;
    position: relative;
    background: #FFF;
    box-shadow: 0 1px 4px rgba(0,21,41,.08);
    .hamburger-container {
        line-height: 46px;
        height: 100%;
        float: left;
        cursor: pointer;
        transition: background .3s;
        -webkit-tap-highlight-color:transparent;
        &:hover {
            background: rgba(0, 0, 0, .025)
        }
    }
    .breadcrumb-container {
        float: left;
    }
}
</style>