<template>
    <div class="tags-view-container">
        <div class="tags-view-main">
            <div ref="tagsWrapRef" class="tags">
                <el-icon color="#409EFC" :size="18"><Document /></el-icon>
                <span class="tags-prev">
                    <el-icon :size="16" color="#515a6e"><ArrowLeftOutline /></el-icon>
                </span>
                <span class="tags-prev">
                    <el-icon :size="16" color="#515a6e"><ArrowRightOutline /></el-icon>
                </span>
            </div>
            <el-dropdown>
                <el-icon :size="20"><ArrowDownOutline /></el-icon>
                <template #dropdown>
                    <el-dropdown-item><el-icon :size="16"><CloseRound /></el-icon>刷新当前</el-dropdown-item>
                    <el-dropdown-item><el-icon :size="16"><ReloadBlod /></el-icon>关闭当前</el-dropdown-item>
                    <el-dropdown-item><el-icon :size="16"><ColumnWidthOutline /></el-icon>关闭其他</el-dropdown-item>
                    <el-dropdown-item><el-icon :size="16"><MinusBaseline /></el-icon>关闭全部</el-dropdown-item>
                </template>
            </el-dropdown>
            <el-dropdown>
                <span style="opacity: 0">1</span>
                <template #dropdown>
                    <el-dropdown-item><el-icon :size="16"><CloseRound /></el-icon>刷新当前</el-dropdown-item>
                    <el-dropdown-item><el-icon :size="16"><ReloadBlod /></el-icon>关闭当前</el-dropdown-item>
                    <el-dropdown-item><el-icon :size="16"><ColumnWidthOutline /></el-icon>关闭其他</el-dropdown-item>
                    <el-dropdown-item><el-icon :size="16"><MinusBaseline /></el-icon>关闭全部</el-dropdown-item>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, nextTick, ref } from 'vue'
import { useProjectSettingStore } from '@/store/modules/projectSetting'
import { useTagsViewStore, initTagsViewStore } from '@/store/modules/tagsView'
import { useRoute, useRouter } from 'vue-router'
import CloseRound from '@/icons/close-round.svg?component'
import ReloadBlod from '@/icons/reload-blod.svg?component'
import ColumnWidthOutline from '@/icons/column-width-outline.svg?component'
import MinusBaseline from '@/icons/minus-baseline.svg?component'
import ArrowDownOutline from '@/icons/arrow-down-outline.svg?component'
import ArrowLeftOutline from '@/icons/arrow-left-outline.svg?component'
import ArrowRightOutline from '@/icons/arrow-right-outline.svg?component'
import Document from '@/icons/menu/document.svg?component'

export default defineComponent({
    name: 'TagsView',
    components: {
        CloseRound,
        ReloadBlod,
        ColumnWidthOutline,
        MinusBaseline,
        ArrowDownOutline,
        ArrowLeftOutline,
        ArrowRightOutline,
        Document
    },
    props: {
        collapsed: Boolean,
        isMixMenuNoneSub: Boolean,
    },
    setup(){
        const $route = useRoute();
        const $router = useRouter();
        const settingStore = useProjectSettingStore();
        const tagsViewStore = useTagsViewStore();

        const tagsScrollRef = ref(null);
        const tagsWrapRef = ref(null);
        const state = reactive({
            showDropdown: false,
        });
        function handleContextMenu(event: any) {
            event.preventDefault();
            state.showDropdown = false;
            nextTick().then(() => {
                state.showDropdown = true;
            })
        }
        return {
            ...toRefs(state),
            handleContextMenu,
        }
    }
})
</script>
<style lang="scss" scoped>
.tags-view-container{
    width: 100%;
    padding: 6px 0;
    display: flex;
    transition: all 0.2s ease-in-out;
    .tags-view-main{
        height: 32px;
        display: flex;
        max-width: 100%;
        min-width: 100%;
    }
}
</style>