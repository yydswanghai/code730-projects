<template>
    <ElMain class="main-container" :style="{ marginTop: marginTop + 'px' }" :class="{ hasTagsView: needTagsView }">
        <Navbar />
        <TagsView v-if="needTagsView" />
        <section class="app-main">
            <RouterView v-slot="{ Component, route }">
                <transition name="fade-transform" mode="out-in" appear>
                    <keep-alive>
                        <component :is="Component" :key="route.path" />
                    </keep-alive>
                </transition>
            </RouterView>
        </section>
    </ElMain>
</template>

<script>
/**
 * <transition/> Detail: https://staging-cn.vuejs.org/guide/built-ins/transition.html
 * transition 组件需要一个跟元素，而<keep-alive>、<component>都不会创建真实的DOM元素，
 * 如果<template>模板中等于使用了vue3的Fragments特性，存在两个root节点。这就是<transition>报错的原因。
 * 所以可以在 transition 里添加一个div的根节点不过过渡效果就失效了，或者你在页面使用根节点
 */
import useHeaderMarginTop from '@/composition/useHeaderMarginTop.js'
import useVariablesModule from '@/composition/useVariablesModule.js'
import Navbar from '@/components/Navbar/index.vue'
import TagsView from '@/components/TagsView/index.vue'
import { settingsStore } from "@/store/useSettings"
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