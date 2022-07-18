<template>
    <div class="tags-view-container" :class="classObj" :style="styleObj">
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
                            <div
                                class="tags-scroll-item"
                                :class="{'active-item': activeKey === element.fullPath}"
                                :id="`tag${element.fullPath.split('/').join('\/')}`"
                                @click.stop="handleToPage(element)"
                                @contextmenu="handleContextMenu($event, element)"
                                >
                                <span>{{ element.meta.title }}</span>
                                <el-icon v-if="element.path !== PageEnum.HOME" :size="15" class="item-icon" @click.stop="handleCloseTagItem(element)"><CloseRound/></el-icon>
                            </div>
                        </template>
                    </Draggable>
                </div>
            </div>
            <!-- 下拉菜单 -->
            <el-dropdown class="tags-close">
                <el-icon :size="20" class="tags-close-icon"><ArrowDownOutline /></el-icon>
                <template #dropdown>
                    <div class="i-dropdown-menu">
                        <div class="i-dropdown-menu-item" v-for="item in contextMenuOptions" :key="item.key"
                            @click="selectContextMenu(item.key, item.disabled)" :class="{ disabled: item.disabled }">
                            <component v-if="item.icon" :is="item.icon" />{{ item.label }}
                        </div>
                    </div>
                </template>
            </el-dropdown>
            <teleport to="body">
                <div class="i-dropdown-menu context-menu" ref="contextMenuRef" :style="{ top: dropdownY + 'px', left: dropdownX + 'px' }" v-show="showDropdown">
                    <div class="i-dropdown-menu-item" v-for="item in contextMenuOptions" :key="item.key"
                        @click="selectContextMenu(item.key, item.disabled)" :class="{ disabled: item.disabled }">
                        <component v-if="item.icon" :is="item.icon" />{{ item.label }}
                    </div>
                </div>
            </teleport>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, nextTick, ref, computed, watch, inject, onMounted } from 'vue'
import { useProjectSettingStore } from '@/store/modules/projectSetting'
import { useTagsViewStore, initTagsViewStore, RouteItem } from '@/store/modules/tagsView'
import { useRoute, useRouter } from 'vue-router'
import Draggable from 'vuedraggable'
import { CloseRound, ReloadBlod, ColumnWidthOutline, MinusBaseline,
ArrowDownOutline, ArrowLeftOutline, ArrowRightOutline } from '@/icons/'
import { PageEnum } from '@/enums/pageEnum'
import { ElMessage } from 'element-plus'
import { isExternal, renderIcon } from '@/utils/'

export default defineComponent({
    name: 'TagsView',
    components: {
        Draggable,
        CloseRound,
        ReloadBlod,
        ColumnWidthOutline,
        MinusBaseline,
        ArrowDownOutline,
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
            dropdownX: 0,
            dropdownY: 0,
            showDropdown: false,// 下拉菜单
            isCurrent: false,
            isMultiHeaderFixed: false,
        });
        const classObj = computed(() => ({
            'tags-view-fix': settingStore.multiTabsSetting.fixed,
            'tags-view-fixed-header': state.isMultiHeaderFixed,
            'tags-view-default-background': settingStore.isDarkTheme === false,
            'tags-view-dark-background': settingStore.isDarkTheme === true
        }));
        const styleObj = computed(() => {
            const { collapsed, isMixMenuNoneSub } = props;
            const { navMode, menuSetting: { minMenuWidth, menuWidth }, multiTabsSetting: { fixed } } = settingStore;
            const mWidth = collapsed ? `${minMenuWidth}px` : `${menuWidth}px`;
            let lenNum = navMode === 'horizontal' || !isMixMenuNoneSub ? '0px' : mWidth;
            if(settingStore.isMobile){
                return { left: '0px', width: '100%' };
            }
            return { left: lenNum, width: `calc(100% - ${!fixed ? '0px' : lenNum})` };
        })
        // 获取简易路由对象，添加addTags的时候容易出现重复标签被添加的bug
        function getSimpleRoute(route: RouteItem) {
            const { fullPath, hash, meta, name, params, path, query } = route;
            return { fullPath, hash, meta, name, params, path, query };
        }
        // 初始化标签页
        initTagsViewStore(getSimpleRoute($route as RouteItem));

        const tagsList = computed(() => tagsViewStore.tagsList);

        // 路由改变时候添加新的tag
        watch(() => $route.fullPath, (to) => {
            if(!isExternal(to) && !to.includes(PageEnum.REDIRECT)){// 跳过外部链接、刷新不添加
                state.activeKey = to;
                tagsViewStore.addTags(getSimpleRoute($route as RouteItem));
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
        function handleToPage(element: RouteItem) {
            const { fullPath } = element;
            if(fullPath === $route.fullPath) return;
            state.activeKey = fullPath;
            $router.push({ path: fullPath });
        }
        /* 右键菜单 */
        function handleContextMenu(event: MouseEvent, element: RouteItem) {
            event.preventDefault();
            state.isCurrent = PageEnum.HOME === element.path;
            state.showDropdown = false;
            nextTick().then(() => {
                state.showDropdown = true;
                state.dropdownX = event.clientX;
                state.dropdownY = event.clientY;
            });
        }
        onMounted(() => {
            // 点击除了菜单以外的位置关闭该右键菜单
            document.addEventListener('click', function (e: Event){
                if(!contextMenuRef.value.contains(e.target)){
                    state.showDropdown = false;
                }
            });
        });
        /* 关闭标签 */
        function handleCloseTagItem(element: RouteItem) {
            const route = tagsList.value.find(it => it.fullPath === element.fullPath);
            route && _removeTab(route);
        }
        /* 关闭当前页面 */
        function _removeTab(route: RouteItem) {
            if(tagsList.value.length === 1){
                return ElMessage.warning('这已经是最后一页，不能再关闭了！');
            }
            tagsViewStore.closeCurrentTag(route);
            // 如果关闭是的当前页，则当前页自动变成上一个
            if (state.activeKey === route.fullPath) {
                const currentRoute = tagsList.value[Math.max(0, tagsList.value.length -1)];
                state.activeKey = currentRoute.fullPath;
                $router.push(currentRoute);
            }
            updateNavScroll()
        }
        /* 刷新 */
        const reload = inject<() => void>('reload');
        /* 关闭其他 */
        function _closeOther(route: RouteItem) {
            tagsViewStore.closeOtherTags(route);
            state.activeKey = route.fullPath;
            $router.replace(route.fullPath);
            updateNavScroll();
        }
        /* 关闭全部 */
        function _closeAll() {
            tagsViewStore.closeAllTags();
            $router.replace(PageEnum.HOME);
            updateNavScroll();
        }
        enum contextMenuEnum {
            刷新当前,
            关闭当前,
            关闭其他,
            关闭全部
        }
        /* 下拉菜单 */
        const contextMenuOptions = computed(() => {
            const isDisabled = tagsList.value.length <= 1;
            return [
                {
                    label: '刷新当前',
                    key: contextMenuEnum.刷新当前,
                    disabled: false,
                    icon: renderIcon(CloseRound),
                },
                {
                    label: '关闭当前',
                    key: contextMenuEnum.关闭当前,
                    disabled: state.isCurrent || isDisabled,
                    icon: renderIcon(ReloadBlod),
                },
                {
                    label: '关闭其他',
                    key: contextMenuEnum.关闭其他,
                    disabled: isDisabled,
                    icon: renderIcon(ColumnWidthOutline),
                },
                {
                    label: '关闭全部',
                    key: contextMenuEnum.关闭全部,
                    disabled: isDisabled,
                    icon: renderIcon(MinusBaseline),
                },
            ]
        })
        /* 操作右键菜单 */
        function selectContextMenu(key: number, disabled: boolean) {
            if(disabled){
                return;
            }
            if(key === contextMenuEnum.刷新当前){
                reload && reload();
            }else if(key === contextMenuEnum.关闭当前){
                _removeTab($route as RouteItem);
            }else if(key === contextMenuEnum.关闭其他){
                _closeOther($route as RouteItem)
            }else if(key === contextMenuEnum.关闭全部){
                _closeAll();
            }
            updateNavScroll();
            state.showDropdown = false;
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
            contextMenuOptions,
            scrollPrev,
            scrollNext,
            handleToPage,
            handleContextMenu,
            handleCloseTagItem,
            selectContextMenu,
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
                background: #FFF;
                color: #353535;
                height: 32px;
                padding: 6px 16px 4px;
                border-radius: 3px;
                margin-right: 6px;
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
                    height: 22px;
                    width: 21px;
                    margin-right: -6px;
                    position: relative;
                    top: -2px;
                    vertical-align: middle;
                    text-align: center;
                    color: #808695;
                    &:hover {
                        color: #515a6e !important;
                    }
                    svg {
                        height: 21px;
                        display: inline-block;
                    }
                }
                &:hover {
                    color: #515a6e;
                }
                &.active-item{
                    color: $primary-color;
                }
            }
        }
    }
    .tags-close{
        min-width: 32px;
        width: 32px;
        height: 32px;
        line-height: 32px;
        text-align: center;
        background: var(--color);
        border-radius: 2px;
        cursor: pointer;
        .tags-close-icon {
            color: var(--color);
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }
}
.context-menu{
    position: absolute;
    z-index: 100;
    background: #fff;
}
.i-dropdown-menu-item.disabled{
    cursor: not-allowed;
    opacity: .5;
}

.tags-view-fix {
    // position: fixed;
    z-index: 5;
    padding: 6px 0 6px 0;
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