<template>
    <div class="tags-view-container">
        <ScrollPane class="tags-view-wrapper" ref="scrollPaneContainer">
            <RouterLink to="/" v-for="(item, i) in [1,2,3]" :ref="el => tagRef[i] = el">测试</RouterLink>
        </ScrollPane>
    </div>
</template>

<script>
import ScrollPane from '@/components/TagsView/ScrollPane.vue';
import { ref, computed ,onMounted, watch, nextTick } from 'vue';
import { useRoute } from 'vue-router';
import { tagsViewStore, addVisitedView, addView } from '@/store/useTagsView.js';
import { permissionStore } from '@/store/usePermission.js';
import { resolve } from '@/util/pathResolve.js';

export default {
    name: 'TagsView',
    components: {
        ScrollPane,
    },
    setup(props, ctx){
        const tagRef = ref([])
        const scrollPaneContainer = ref(null)
        const visibleRef = ref(false)
        const topRef = ref(0)
        const leftRef = ref(0)
        const selectedTagRef = ref({})
        const affixTagsRef = ref([])
        const $route = useRoute()

        const visitedViews = computed(() => tagsViewStore.visitedViews)
        const routes = computed(() => permissionStore.routes)
        // 是否激活
        const isActive = (route) => route.path === $route.path
        // 是否是固钉
        const isAffix = (tag) => tag.meta && tag.meta.affix
        // 过滤affix
        const filterAffixTags = (routes, basePath = '/') => {
            let tags = []
            routes.forEach(item => {
                if(item.meta && item.meta.affix){
                    const tagPath = resolve(basePath, item.path)
                    tags.push({
                        fullPath: tagPath,
                        path: tagPath,
                        name: item.name,
                        meta: { ...item.meta }
                    })
                }
                if(item.children){
                    const tempTags = filterAffixTags(item.children, item.path)
                    if(tempTags.length > 1){
                        tags = [...tags, ...tempTags]
                    }
                }
            })
            return tags
        }
        // 初始化
        const initTags = () => {
            const affixs = affixTagsRef.value = filterAffixTags(routes)
            for (const tag of affixs) {
                if(tag.name){
                    addVisitedView(tag)
                }
            }
        }
        // 添加当前路由
        const addTags = () => {
            const { name } = $route
            if(name){
                addView($route)
            }
            return false
        }
        const moveToCurrentTag = () => {
            const tags = tagRef.value
            nextTick(() => {
                for (const tag of tags) {
                    if(tag.to.path === $route.path){
                        // moveToTarget(tag)
                        if(tag.to.fullPath !== $route.fullPath){
                            // updateVisitedView($route)
                        }
                    }
                }
            })
        }
        onMounted(() => {
            console.log(scrollPaneContainer);
        })
        return {
            scrollPaneContainer,
            tagRef,
        }
    }
}

</script>
<style lang="scss" scoped>
    
</style>