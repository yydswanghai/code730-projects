<template>
    <ElMain class="main-container" :style="{ marginTop: marginTop + 'px' }" :class="{ hasTagsView: needTagsView }">
        <Navbar />
        <TagsView v-if="needTagsView" />
        <section class="app-main">
            <RouterView v-slot="{ Component }">
                <transition name="fade-transform" mode="out-in">
                    <keep-alive :include="cachedViews">
                        <component :is="Component" />
                    </keep-alive>
                </transition>
            </RouterView>
        </section>
    </ElMain>
</template>

<script>
import useHeaderMarginTop from '@/composition/useHeaderMarginTop.js'
import useVariablesModule from '@/composition/useVariablesModule.js'
import Navbar from '@/components/Navbar/index.vue'
import TagsView from '@/components/TagsView/index.vue'
import { settingsStore } from "@/store/useSettings"
import { tagsViewStore } from "@/store/useTagsView.js"
import { computed } from 'vue';
import { useRoute } from 'vue-router';
export default {
    name: 'Main',
    components: {
        Navbar,
        TagsView,
    },
    setup(){
        const route = useRoute()
        const cachedViewsRef = computed(() => tagsViewStore.cachedViews)
        const keyRef = computed(() => route.path)
        return {
            cachedViews: cachedViewsRef,
            key: keyRef,
            needTagsView: settingsStore.tagsView,
            ...useHeaderMarginTop(),
            ...useVariablesModule(),
        }
    }
}

</script>
<style lang="scss" scoped>
@import "styles/variables.module.scss";

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
    .app-main {
        min-height: calc(100vh - 100px - 1rem);
        width: 100%;
        position: relative;
        overflow: hidden;
        background-color: #fff;
    }
    .hasTagsView {
        .app-main {
            /* 84 = navbar + tags-view = 50 + 34 */
            min-height: calc(100vh - 84px);
        }

        .fixed-header+.app-main {
            padding-top: 84px;
        }
    }
}
/* fade-transform */
.fade-transform-leave-active,
.fade-transform-enter-active {
    transition: all .5s;
}

.fade-transform-enter {
    opacity: 0;
    transform: translateX(-30px);
}

.fade-transform-leave-to {
    opacity: 0;
    transform: translateX(30px);
}
</style>