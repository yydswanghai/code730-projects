<template>
    <div class="tags-view-container">
        <ScrollPane class="tags-view-wrapper">
            <span ref="tag">测试</span>
        </ScrollPane>
    </div>
</template>

<script>
import ScrollPane from '@/components/TagsView/ScrollPane.vue';
import { ref, computed ,onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { tagsViewStore } from '@/store/useTagsView.js';
import { permissionStore } from '@/store/usePermission.js';

export default {
    name: 'TagsView',
    components: {
        ScrollPane,
    },
    setup(){
        const tag = ref(null)
        const visible = ref(false)
        const top = ref(0)
        const left = ref(0)
        const selectedTag = ref({})
        const affixTags = ref([])
        const $route = useRoute()
        const visitedViews = computed(() => tagsViewStore.visitedViews)

        const isActive = (route) => {
            return route.path === $route.path
        }
        const isAffix = (tag) => {
            return tag.meta && tag.meta.affix
        }
        return {
            tag
        }
    }
}

</script>
<style lang="scss" scoped>
    
</style>