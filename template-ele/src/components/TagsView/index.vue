<template>
    <div class="tags-view-container" ref="tagsViewContainer">
        <ScrollPane class="tags-view-wrapper" ref="scrollPaneContainer" @scroll="closeMenu">
            <RouterLink
                v-for="(tag, i) in visitedViews"
                :ref="(el) => (tagContainer[i] = el)"
                :key="tag.path"
                :class="isActive(tag) ? 'active' : ''"
                :to="{
                    path: tag.path,
                    query: tag.query,
                    fullPath: tag.fullPath,
                }"
                tag="span"
                class="tags-view-item"
                @click.middle.native="!isAffix(tag) ? closeSelectedTag(tag):''"
                @contextmenu.prevent.native="openMenu(tag, $event)"
            >
                {{ tag.title }}
                <ElIcon v-if="!isAffix(tag)" class="el-icon-close" @click.prevent.stop="closeSelectedTag(tag)"><Close /></ElIcon>
            </RouterLink>
        </ScrollPane>
        <ul v-show="visible" :style="{ left: left + 'px', top : top + 'px' }" class="contextmenu">
            <li @click="refreshSelectedTag(selectedTag)">Refresh</li>
            <li v-if="!isAffix(selectedTag)" @click="closeSelectedTag(selectedTag)">Close</li>
            <li @click="closeOthersTags">Close Others</li>
            <li @click="closeAllTags(selectedTag)">Close All</li>
        </ul>
    </div>
</template>

<script>
import ScrollPane from "@/components/TagsView/ScrollPane.vue"
import { ref, computed, onMounted, watch, nextTick } from "vue"
import { useRoute, useRouter } from "vue-router"
import { tagsViewStore, addVisitedView, addView, delView, delCachedView, delOthersViews, delAllViews, updateVisitedView } from "@/store/useTagsView.js"
import { permissionStore } from "@/store/usePermission.js"
import { resolve } from "@/util/pathResolve.js"

export default {
    name: "TagsView",
    components: {
        ScrollPane,
    },
    setup(props, ctx) {
        const tagContainer = ref([])
        const scrollPaneContainer = ref(null)
        const tagsViewContainer = ref(null)

        const visibleRef = ref(false)
        const topRef = ref(0)
        const leftRef = ref(0)
        const selectedTagRef = ref({})
        const affixTagsRef = ref([])
        const $route = useRoute()
        const $router = useRouter()
        const visitedViewsRef = computed(() => tagsViewStore.visitedViews)
        const routesRef = computed(() => permissionStore.routes)
        // 是否激活
        const isActive = (route) => route.path === $route.path
        // 是否是固钉
        const isAffix = (tag) => tag.meta && tag.meta.affix
        // 过滤affix
        const filterAffixTags = (routes, basePath = "/") => {
            let tags = []
            routes.forEach((item) => {
                if (isAffix(item)) {
                    const tagPath = resolve(basePath, item.path)
                    tags.push({
                        fullPath: tagPath,
                        path: tagPath,
                        name: item.name,
                        meta: { ...item.meta },
                    })
                }
                if (item.children) {
                    const tempTags = filterAffixTags(item.children, item.path)
                    if (tempTags.length > 1) {
                        tags = [...tags, ...tempTags]
                    }
                }
            })
            return tags
        }
        // 初始化
        const initTags = () => {
            const affixs = affixTagsRef.value = filterAffixTags(routesRef.value)
            for (const tag of affixs) {
                if (tag.name) {
                    addVisitedView(tag)
                }
            }
        }
        // 添加当前路由 必须是路由有 name属性
        const addTags = () => {
            const { name } = $route
            if (name) {
                addView($route)
            }
            return false
        }
        // 移动至当前tag
        const moveToCurrentTag = () => {
            const tags = tagContainer.value
            nextTick(() => {
                for (const tag of tags) {
                    if (tag && tag.to.path === $route.path) {
                        moveToTarget(tag)
                        if (tag.to.fullPath !== $route.fullPath) {
                            updateVisitedView($route)
                        }
                        break
                    }
                }
            })
        }
        const moveToTarget = (currentTag) => {
            const tagAndTagSpacing = 4// 间距
            const $container = scrollPaneContainer.value.$el
            const $containerWidth = $container.offsetWidth
            const $scrollWrapper = scrollPaneContainer.value.$refs.scrollContainer.wrap$
            const tagList = tagContainer.value

            let firstTag = null
            let lastTag = null

            // 查找第一个标记和最后一个标记
            if (tagList.length > 0) {
                firstTag = tagList[0]
                lastTag = tagList[tagList.length - 1]
            }

            if (firstTag === currentTag) {
                $scrollWrapper.scrollLeft = 0
            }else if(lastTag === currentTag){
                $scrollWrapper.scrollLeft = $scrollWrapper.scrollWidth - $containerWidth
            }else{
                const currentIndex = tagList.findIndex(item => item === currentTag)
                const prevTag = tagList[currentIndex - 1]
                const nextTag = tagList[currentIndex + 1]
                // 标签的offsetLeft在nextTag后面
                const afterNextTagOffsetLeft = nextTag ? (nextTag.$el.offsetLeft + nextTag.$el.offsetWidth + tagAndTagSpacing) : 0

                // 标签的offsetLeft在prevTag的前面
                const beforePrevTagOffsetLeft = prevTag ? prevTag.$el.offsetLeft - tagAndTagSpacing : 0
                if (afterNextTagOffsetLeft > $scrollWrapper.scrollLeft + $containerWidth) {
                    $scrollWrapper.scrollLeft = afterNextTagOffsetLeft - $containerWidth
                } else if (beforePrevTagOffsetLeft < $scrollWrapper.scrollLeft) {
                    $scrollWrapper.scrollLeft = beforePrevTagOffsetLeft
                }
            }
        }
        const toLastView = (visitedViews, view) => {
            const latestView = visitedViews.slice(-1)[0]// 最末尾
            if(latestView){
                $router.push(latestView.fullPath)
            }else{
                // 现在默认是重定向到主页如果没有标签视图，
                // 你可以根据需要调整它。
                if(view.name === 'home'){
                    // 重新加载主页
                    $router.replace({ path: '/' })
                }else{
                    $router.push('/')
                }
            }
        }
        const openMenu = (tag, event) => {
            const menuMinWidth = 105
            const offsetLeft = tagsViewContainer.value.getBoundingClientRect().left// container margin left
            const offsetWidth = tagsViewContainer.value.offsetWidth// container width
            const maxLeft = offsetWidth - menuMinWidth  // left boundary
            const left = event.clientX - offsetLeft + 15// 15: margin right
            if(left > maxLeft){
                leftRef.value = maxLeft
            }else{
                leftRef.value = left
            }

            topRef.value = event.clientY - 50// Header组件高度
            visibleRef.value = true
            selectedTagRef.value = tag
        }
        const closeMenu = () => visibleRef.value = false
        // 刷新
        const refreshSelectedTag = (view) => {
            delCachedView(view).then(() => {
                const { fullPath } = view
                nextTick(() => {
                    $router.replace({
                        path: fullPath
                    })
                })
            })
        }
        // 关闭选中的tag
        const closeSelectedTag = (view) => {
            delView(view).then(({ visitedViews }) => {
                if(isActive(view)){
                    toLastView(visitedViews, view);
                }
            })
        }
        // 关闭其他的tag
        const closeOthersTags = () => {
            $router.push(selectedTagRef.value)
            delOthersViews(selectedTagRef.value).then(() => {
                moveToCurrentTag()
            })
        }
        // 关闭全部的tag
        const closeAllTags = (view) => {
            delAllViews().then(({ visitedViews }) => {
                if(affixTagsRef.value.some(tag => tag.path === view.path)) return
                toLastView(visitedViews, view)
            })
        }

        onMounted(() => {
            initTags()
            addTags()
        })
        watch([$route, visibleRef], ([newVal1, newVal2], [oldVal1, oldVal2]) => {
            if(newVal1){// 路由变化
                addTags()
                moveToCurrentTag()
            }
            if(newVal2){
                document.body.addEventListener('click', closeMenu)
            }else{
                document.body.removeEventListener('click', closeMenu)
            }
        })
        return {
            tagContainer,
            scrollPaneContainer,
            tagsViewContainer,
            visitedViews: visitedViewsRef,
            visible: visibleRef,
            top: topRef,
            left: leftRef,
            selectedTag: selectedTagRef,
            isActive,
            isAffix,
            openMenu,
            closeMenu,
            refreshSelectedTag,
            closeSelectedTag,
            closeOthersTags,
            closeAllTags,
        }
    },
}
</script>
<style lang="scss" scoped>
.tags-view-container {
    height: 34px;
    width: 100%;
    background: #fff;
    border-bottom: 1px solid #d8dce5;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
    .tags-view-wrapper {
        .tags-view-item {
            display: inline-block;
            position: relative;
            cursor: pointer;
            height: 26px;
            line-height: 26px;
            border: 1px solid #d8dce5;
            color: #495060;
            background: #fff;
            padding: 0 8px;
            font-size: 12px;
            margin-left: 5px;
            margin-top: 4px;
            &:first-of-type {
                margin-left: 15px;
            }
            &:last-of-type {
                margin-right: 15px;
            }
            &.active {
                background-color: #42b983;
                color: #fff;
                border-color: #42b983;
                &::before {
                    content: "";
                    background: #fff;
                    display: inline-block;
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                    position: relative;
                    margin-right: 2px;
                }
            }
        }
    }
    .contextmenu{
        margin: 0;
        background: #fff;
        z-index: 3000;
        position: absolute;
        list-style-type: none;
        padding: 5px 0;
        border-radius: 4px;
        font-size: 12px;
        font-weight: 400;
        color: #333;
        box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, .3);
        li {
            margin: 0;
            padding: 7px 16px;
            cursor: pointer;
            &:hover {
                background: #eee;
            }
        }
    }
}
</style>

<style lang="scss">
@import "styles/variables.module.scss";

.tags-view-wrapper {
    .tags-view-item {
        .el-icon-close {
            width: 16px;
            height: 16px;
            vertical-align: 0px;
            border-radius: 50%;
            text-align: center;
            transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
            transform-origin: 100% 50%;
            &:before {
                transform: scale(0.6);
                display: inline-block;
                vertical-align: -3px;
            }
            &:hover {
                background-color: #b4bccc;
                color: #fff;
            }
        }
    }
}
</style>
