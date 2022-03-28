<template>
    <ElMain class="main-container" :style="{ marginTop: marginTop + 'px' }" :class="{ hasTagsView: needTagsView }">
        <Navbar />
        <TagsView v-if="needTagsView" />
        <RouterView />
    </ElMain>
</template>

<script>
import useHeaderMarginTop from '@/composition/useHeaderMarginTop.js';
import useVariablesModule from '@/composition/useVariablesModule.js';
import Navbar from '@/components/Navbar/index.vue'
import TagsView from '@/components/TagsView/index.vue'
import { settingsStore } from "@/store/useSettings";
export default {
    name: 'Main',
    components: {
        Navbar,
        TagsView,
    },
    setup(){
        return {
            needTagsView: settingsStore.tagsView,
            ...useHeaderMarginTop(),
            ...useVariablesModule(),
        }
    }
}

</script>
<style lang="scss" scoped>
@import "styles/variables.module.scss";

.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
}
.main-container{
    margin-left: $sideBarWidth;
    position: relative;
    transition: margin-left 0.28s;
    background-color: #F5F9FF;
    min-height: 100%;
    width: 100%;
    padding-top: 0;
    padding-left: 0;
    padding-right: 0;
}
</style>