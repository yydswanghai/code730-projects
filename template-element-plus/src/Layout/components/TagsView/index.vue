<template>
    <div class="tags-view-container" :class="classObj">
        <div class="tags-view-main">
            <div ref="tagsWrapRef" class="tags" :class="{ 'tags-scrollable': scrollable }">
                <span class="tags-prev" :class="{ 'tags-hide': !scrollable }" @click="scrollPrev">
                    <el-icon :size="16" color="#515a6e" class="icon"><ArrowLeftOutline /></el-icon>
                </span>
                <span class="tags-next" :class="{ 'tags-hide': !scrollable }" @click="scrollNext">
                    <el-icon :size="16" color="#515a6e" class="icon"><ArrowRightOutline /></el-icon>
                </span>
                <div ref="tagsScrollRef" class="tags-scroll">
                    <Draggable :list="tagsList" animation="300" item-key="fullPath" class="tags-draggable">
                        <template #item="{ element }">
                            <el-button text
                                class="tags-scroll-item"
                                :class="{'active-item': activeKey === element.fullPath}"
                                :id="`tag${element.fullPath.split('/').join('\/')}`"
                                @click.stop="handleToPage(element)"
                                @contextmenu="handleContextMenu($event, element)"
                                >
                                    <span>{{ element.meta.title }}</span>
                                    <el-icon v-if="element.path !== PageEnum.HOME" :size="15" class="item-icon" @click.stop="handleCloseTagItem(element)"><CloseRound/></el-icon>
                            </el-button>
                        </template>
                    </Draggable>
                </div>
            </div>
            <!-- 下拉菜单 -->
            <ContextMenu
                ref="contextMenuRef"
                v-model:showDropdown="showDropdown"
                v-model:activeKey="activeKey"
                :top="contextMenuY"
                :left="contextMenuX"
                :isCurrent="isCurrent"
                :tagsList="tagsList"
                @update-nav="updateNavScroll()"
                />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, nextTick, ref, computed, watch } from 'vue'
import { useProjectSettingStore } from '@/store/modules/projectSetting'
import { useTagsViewStore, initTagsViewStore, IRouteItem } from '@/store/modules/tagsView'
import { useRoute, useRouter } from 'vue-router'
import Draggable from 'vuedraggable'
import { CloseRound, ArrowLeftOutline, ArrowRightOutline } from '@/icons/'
import { PageEnum } from '@/enums/pageEnum'
import { isExternal } from '@/utils/'
import ContextMenu from './ContextMenu.vue'

export default defineComponent({
    name: 'TagsView',
    components: {
        Draggable,
        ContextMenu,
        CloseRound,
        ArrowLeftOutline,
        ArrowRightOutline,
    },
    props: {
        collapsed: Boolean,
        isMixMenuNoneSub: Boolean,
    },
    setup(props, ctx){
        const $route = useRoute();
        const $router = useRouter();
        const settingStore = useProjectSettingStore();
        const tagsViewStore = useTagsViewStore();
        const tagsWrapRef = ref(null);
        const tagsScrollRef = ref<any>(null);
        const contextMenuRef = ref();
        const state = reactive({
            activeKey: $route.fullPath,// 当前页面key
            scrollable: false,// 是否可滚动
            contextMenuX: 0,// contextMenu的X坐标
            contextMenuY: 0,// contextMenu的Y坐标
            showDropdown: false,// 下拉菜单
            isCurrent: false,
            isMultiHeaderFixed: false,
        });
        const classObj = computed(() => ({
            'tags-view-fix': settingStore.tagsViewSetting.fixed,
            'tags-view-fixed-header': state.isMultiHeaderFixed,
            'tags-view-default-background': settingStore.themeSetting.isDark === false,
            'tags-view-dark-background': settingStore.themeSetting.isDark === true
        }));
        const styleObj = computed(() => {
            const { collapsed, isMixMenuNoneSub } = props;
            const { navMode, menuSetting: { minMenuWidth, menuWidth }, tagsViewSetting: { fixed } } = settingStore;
            const mWidth = collapsed ? `${minMenuWidth}px` : `${menuWidth}px`;
            let lenNum = navMode === 'horizontal' || !isMixMenuNoneSub ? '0px' : mWidth;
            if(settingStore.isMobile){
                return { left: '0px', width: '100%' };
            }
            return { left: lenNum, width: `calc(100% - ${!fixed ? '0px' : lenNum})` };
        });
        // 获取简易路由对象，添加addTags的时候容易出现重复标签被添加的bug
        function getSimpleRoute(route: IRouteItem) {
            const { fullPath, hash, meta, name, params, path, query } = route;
            return { fullPath, hash, meta, name, params, path, query };
        }
        // 初始化标签页
        initTagsViewStore(getSimpleRoute($route as IRouteItem));

        const tagsList = computed(() => tagsViewStore.tagsList);

        // 路由改变时候添加新的tag
        watch(() => $route.fullPath, (to) => {
            if(!isExternal(to) && !to.includes(PageEnum.REDIRECT)){// 跳过外部链接、刷新不添加
                state.activeKey = to;
                tagsViewStore.addTags(getSimpleRoute($route as IRouteItem));
                updateNavScroll(true);
            }
        }, { immediate: true });
        /* 是否开启滚动功能 */
        async function updateNavScroll(autoScroll?: boolean) {
            await nextTick();
            if(!tagsScrollRef.value) return;
            const offsetWidth = tagsScrollRef.value.offsetWidth;// 元素本身的宽度 width+padding+border
            const tagsWidth = tagsScrollRef.value.scrollWidth;// 出现滚动条时，包括超出范围的宽度
            if(offsetWidth < tagsWidth){// 表示出现滚动条了
                state.scrollable = true;
                if(autoScroll){
                    let tagList = tagsScrollRef.value.querySelectorAll('.tags-scroll-item') || [];
                    Array.of(tagList).forEach((tag: HTMLElement) => {
                        if (tag.id === `tag${state.activeKey.split('/').join('\/')}`) {
                            // scrollIntoView 让当前的元素滚动到浏览器窗口的可视区域内。
                            // Detail: https://developer.mozilla.org/zh-CN/docs/web/api/element/scrollintoview
                            tag.scrollIntoView && tag.scrollIntoView()
                        }
                    })
                }
            }else{
                state.scrollable = false;
            }
        }
        /**
         * @param value 要滚动到的位置
         * @param amplitude 每次滚动的长度
         */
        function scrollTo(value: number, amplitude: number): any {
            const currentScroll = tagsScrollRef.value.scrollLeft;
            const scrollWidth =
                (amplitude > 0 && currentScroll + amplitude >= value) ||
                    (amplitude < 0 && currentScroll + amplitude <= value)
                        ? value : currentScroll + amplitude;
            tagsScrollRef.value && tagsScrollRef.value.scrollTo(scrollWidth, 0);
            if (scrollWidth === value) return;
            return window.requestAnimationFrame(() => scrollTo(value, amplitude));
        }
        /* 向前滚动 */
        function scrollPrev() {
            const offsetWidth = tagsScrollRef.value.offsetWidth;
            const currentScroll = tagsScrollRef.value.scrollLeft;
            if (!currentScroll) return
            const scrollLeft = currentScroll > offsetWidth ? currentScroll - offsetWidth : 0;
            scrollTo(scrollLeft, (scrollLeft - currentScroll) / 20);
        }
        /* 向后滚动 */
        function scrollNext() {
            const offsetWidth = tagsScrollRef.value.offsetWidth;
            const tagsWidth = tagsScrollRef.value.scrollWidth;
            const currentScroll = tagsScrollRef.value.scrollLeft;
            if (tagsWidth - currentScroll <= offsetWidth) return;
            const scrollLeft =
                tagsWidth - currentScroll > offsetWidth * 2 ?
                currentScroll + offsetWidth : tagsWidth - offsetWidth;
            scrollTo(scrollLeft, (scrollLeft - currentScroll) / 20);
        }
        /* 切换到对应的页面 */
        function handleToPage(element: IRouteItem) {
            const { fullPath } = element;
            if(fullPath === $route.fullPath) return;
            state.activeKey = fullPath;
            $router.push({ path: fullPath });
        }
        /* 右键菜单 */
        function handleContextMenu(event: MouseEvent, element: IRouteItem) {
            event.preventDefault();
            state.isCurrent = PageEnum.HOME === element.path;
            state.showDropdown = false;
            nextTick().then(() => {
                state.showDropdown = true;
                state.contextMenuX = event.clientX;
                state.contextMenuY = event.clientY;
            });
        }
        /* 关闭当前标签 */
        function handleCloseTagItem(element: IRouteItem) {
            const route = tagsList.value.find(it => it.fullPath === element.fullPath);
            route && contextMenuRef.value?.removeTab(route);
        }
        return {
            ...toRefs(state),
            PageEnum,
            tagsWrapRef,
            tagsScrollRef,
            contextMenuRef,
            classObj,
            styleObj,
            tagsList,
            updateNavScroll,
            scrollPrev,
            scrollNext,
            handleToPage,
            handleContextMenu,
            handleCloseTagItem,
        }
    }
})
</script>
<style lang="scss" scoped>
@import "@/styles/var.scss";
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
    .tags{
        -webkit-box-flex: 1;
        flex-grow: 1;
        flex-shrink: 1;
        overflow: hidden;
        position: relative;
        .tags-prev,
        .tags-next{
            width: 32px;
            text-align: center;
            position: absolute;
            line-height: 32px;
            cursor: pointer;
            .icon {
                display: flex;
                align-items: center;
                justify-content: center;
                height: 32px;
                width: 32px;
            }
        }
        .tags-prev{
            left: 0;
        }
        .tags-next{
            right: 0;
        }
        .tags-hide{
            display: none;
        }
        &.tags-scrollable{
            padding: 0 32px;
            overflow: hidden;
        }
        .tags-scroll{
            white-space: nowrap;
            overflow: hidden;
            .tags-draggable{
                display: flex;
            }
            .tags-scroll-item{
                background: var(--el-button-bg-color);
                color: var(--el-button-text-color);
                height: 32px;
                padding: 6px 12px 6px;
                margin-right: 6px;
                margin-left: 0;
                cursor: pointer;
                display: inline-block;
                position: relative;
                flex: 0 0 auto;
                box-sizing: border-box;
                span{
                    float: left;
                    vertical-align: middle;
                }
                .item-icon {
                    height: 18px;
                    width: 18px;
                    margin-right: -6px;
                    position: relative;
                    top: -2px;
                    vertical-align: middle;
                    text-align: center;
                    color: var(--el-button-text-color);
                    svg {
                        height: 20px;
                        display: inline-block;
                    }
                }
                &:hover {
                    color: var(--el-color-primary);
                }
                &.active-item{
                    color: var(--el-color-primary);
                }
            }
        }
    }
}
.tags-view-fix {
    // position: fixed;
    z-index: 5;
    padding: 6px 0 6px 6px;
    left: 200px;
}
.tags-view-fixed-header {
    top: 0;
}
.tags-view-default-background {
    background: #f5f7f9;
}

.tags-view-dark-background {
    background: #101014;
}
</style>