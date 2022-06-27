<template>
    <div class="tags-view-container" :class="classObj" :style="styleObj">
        <div class="tags-view-main">
            <div ref="tagsWrap" class="tags" :class="{ 'tags-scrollable': scrollable }">
                <span class="tags-prev" :class="{ 'tags-prev-hide': !scrollable }" @click="scrollPrev">
                    <NIcon size="16" color="#515a6e"><LeftOutlined /></NIcon>
                </span>
                <span class="tags-next" :class="{ 'tags-next-hide': !scrollable }" @click="scrollNext">
                    <NIcon size="16" color="#515a6e"><RightOutlined /></NIcon>
                </span>
                <div ref="tagsScroll" class="tags-scroll">
                    <Draggable :list="tagsList" animation="300" item-key="fullPath" class="tags-draggable">
                        <template #item="{ element }">
                            <div class="tags-scroll-item"
                                :class="{ 'active-item': activeKey === element.path }"
                                :id="`tag${element.fullPath.split('/').join('\/')}`"
                                @click.stop="handleToPage(element)"
                                @contextmenu="handleContextMenu($event, element)"
                                >
                                <span>{{ element.meta.title }}</span>
                                <NIcon size="14" @click.stop="handleCloseTagItem(element)"
                                    v-if="element.path !== BASE_HOME_REDIRECT"
                                >
                                    <CloseOutlined />
                                </NIcon>
                            </div>
                        </template>
                    </Draggable>
                </div>
            </div>
            <!-- 下拉菜单 -->
            <div class="tabs-close">
                <NDropdown
                    trigger="hover"
                    placement="bottom-end"
                    :options="TabsMenuOptions"
                    @select="closeHandleSelect"
                    >
                    <div class="tabs-close-btn">
                        <NIcon size="16" color="#515a6e">
                            <DownOutlined />
                        </NIcon>
                    </div>
                </NDropdown>
            </div>
            <NDropdown
                :show="showDropdown"
                :x="dropdownX"
                :y="dropdownY"
                @clickoutside="showDropdown = false"
                placement="bottom-start"
                :options="TabsMenuOptions"
                @select="closeHandleSelect"
            />
        </div>
    </div>
</template>

<script>
import { LeftOutlined, RightOutlined, CloseOutlined, ReloadOutlined, ColumnWidthOutlined, MinusOutlined, DownOutlined } from '@vicons/antd'
import { ref, computed, reactive, toRefs, watch, nextTick } from 'vue'
import { useProjectSettingStore } from '@/store/modules/projectSetting'
import { useTagsViewStore, initTagsViewStore } from '@/store/modules/tagsView'
import Draggable from 'vuedraggable'
import { useRoute, useRouter } from 'vue-router'
import { useThemeVars, useMessage } from 'naive-ui'
import { renderIcon, reloadThePage } from '@/utils/'
/**
 * 菜单标签组件
 * 1.当添加到 tagsScroll容器里的标签超过了这个长度就展示左侧和右侧的滚动箭头按钮
 * 2.点击左侧按钮向左侧滚动；点击右侧按钮向右侧滚动
 * 3.鼠标右键菜单显示和最右侧的菜单显示
 */
export default {
    name: 'TagsView',
    props: {
        collapsed: Boolean,
        isMixMenuNoneSub: Boolean,
    },
    components: {
        LeftOutlined,
        RightOutlined,
        CloseOutlined,
        ReloadOutlined,
        ColumnWidthOutlined,
        MinusOutlined,
        DownOutlined,
        Draggable,
    },
    setup(props){
        const $route = useRoute()
        const $router = useRouter()
        const $message = useMessage()
        const settingStore = useProjectSettingStore()
        const tagsViewStore = useTagsViewStore()
        const themeVars = useThemeVars()

        const tagsScroll = ref(null)// dom
        const tagsWrap = ref(null)// dom
        const BASE_HOME_REDIRECT = ref('/dashboard/index')

        const state = reactive({
            activeKey: $route.fullPath,// 当前页面key
            scrollable: false,// 可滚动
            dropdownX: 0,
            dropdownY: 0,
            showDropdown: false,// 下拉菜单
            isCurrent: false,
            isMultiHeaderFixed: false,
        })
        const getCardColor = computed(() => themeVars.value.cardColor)
        const getBaseColor = computed(() => themeVars.value.textColor1)
        const appTheme = computed(() => settingStore.appTheme)
        const classObj = computed(() => ({
            'tags-view-fix': settingStore.multiTabsSetting.fixed,
            'tags-view-fixed-header': state.isMultiHeaderFixed,
            'tags-view-default-background': settingStore.isDarkTheme === false,
            'tags-view-dark-background': settingStore.isDarkTheme === true,
        }))
        const styleObj = computed(() => {
            const { collapsed, isMixMenuNoneSub } = props
            const { navMode } = settingStore
            const { minMenuWidth, menuWidth } = settingStore.menuSetting
            const { fixed } = settingStore.multiTabsSetting
            const mWidth = collapsed ? `${minMenuWidth}px` : `${menuWidth}px`
            let lenNum = navMode === 'horizontal' || !isMixMenuNoneSub ? '0px' : mWidth
            if(settingStore.isMobile){
                return {
                    left: '0px',
                    width: '100%'
                }
            }
            return {
                left: lenNum,
                width: `calc(100% - ${!fixed ? '0px' : lenNum})`
            }
        })
        // 获取简易路由对象，添加addTags的时候容易出现重复标签被添加的bug
        function getSimpleRoute(route) {
            const { fullPath, hash, meta, name, params, path, query } = $route
            return {
                fullPath, hash, meta, name, params, path, query
            }
        }
        // 初始化标签页
        initTagsViewStore(getSimpleRoute($route))

        const tagsList = computed(() => tagsViewStore.tagsList)
        // 相当于添加新的tag
        watch(() => $route.fullPath, (to) => {
            state.activeKey = to
            tagsViewStore.addTags(getSimpleRoute($route))
            updateNavScroll(true)
        }, { immediate: true })

        /**
         * @param {Boolean} autoScroll 是否开启自动滚动功能
         */
        async function updateNavScroll(autoScroll) {
            await nextTick()
            if(!tagsScroll.value) return
            const offsetWidth = tagsScroll.value.offsetWidth// 元素本身的宽度 width+padding+border
            const tagsWidth = tagsScroll.value.scrollWidth// 出现滚动条时，包括超出范围的宽度
            if(offsetWidth < tagsWidth){// 出现滚动条
                state.scrollable = true// 显示左右点击按钮
                if(autoScroll){
                    let tagList = tagsScroll.value.querySelectorAll('.tags-scroll-item') || [];
                    [...tagList].forEach(tag => {
                        if (tag.id === `tag${state.activeKey.split('/').join('\/')}`) {
                            // scrollIntoView 让当前的元素滚动到浏览器窗口的可视区域内。
                            // Detail: https://developer.mozilla.org/zh-CN/docs/web/api/element/scrollintoview
                            tag.scrollIntoView && tag.scrollIntoView()
                        }
                    })
                }
            }else{
                state.scrollable = false
            }
        }
        /**
         * @param {number} value 要滚动到的位置
         * @param {number} amplitude 每次滚动的长度
         */
        function scrollTo(value, amplitude) {
            const currentScroll = tagsScroll.value.scrollLeft;
            const scrollWidth =
                (amplitude > 0 && currentScroll + amplitude >= value) ||
                (amplitude < 0 && currentScroll + amplitude <= value)
                    ? value : currentScroll + amplitude;
            tagsScroll.value && tagsScroll.value.scrollTo(scrollWidth, 0);
            if (scrollWidth === value) return
            return window.requestAnimationFrame(() => scrollTo(value, amplitude))
        }
        // 向前滚动
        function scrollPrev() {
            const offsetWidth = tagsScroll.value.offsetWidth
            const currentScroll = tagsScroll.value.scrollLeft
            if (!currentScroll) return
            const scrollLeft = currentScroll > offsetWidth ? currentScroll - offsetWidth : 0
            scrollTo(scrollLeft, (scrollLeft - currentScroll) / 20)
        }
        // 向后滚动
        function scrollNext() {
            const offsetWidth = tagsScroll.value.offsetWidth
            const tagsWidth = tagsScroll.value.scrollWidth
            const currentScroll = tagsScroll.value.scrollLeft
            if (tagsWidth - currentScroll <= offsetWidth) return
            const scrollLeft =
                tagsWidth - currentScroll > offsetWidth * 2 ?
                currentScroll + offsetWidth : tagsWidth - offsetWidth;
            scrollTo(scrollLeft, (scrollLeft - currentScroll) / 20)
        }
        // 切换对应的页面
        function handleToPage(element) {
            const { fullPath } = element
            if(fullPath === $route.fullPath) return
            state.activeKey = fullPath
            $router.push({ path: fullPath })
        }
        // 右键菜单
        function handleContextMenu(event, element) {
            event.preventDefault()
            state.isCurrent = BASE_HOME_REDIRECT.value === element.path
            state.showDropdown = false
            nextTick().then(() => {
                state.showDropdown = true
                state.dropdownX = event.clientX
                state.dropdownY = event.clientY
            })
        }
        // 关闭标签
        function handleCloseTagItem(element) {
            const { fullPath } = element
            const route = tagsList.value.find(it => it.fullPath === fullPath)
            removeTab(route)
        }
        // 关闭当前页面
        function removeTab(route) {
            if (tagsList.value.length === 1) {
                return $message.warning('这已经是最后一页，不能再关闭了！');
            }
            tagsViewStore.closeCurrentTag(route)
            // 如果关闭是的当前页，则当前页自动变成上一个
            if (state.activeKey === route.fullPath) {
                const currentRoute = tagsList.value[Math.max(0, tagsList.value.length - 1)]
                state.activeKey = currentRoute.fullPath
                $router.push(currentRoute)
            }
            updateNavScroll()
        }

        // 右侧下拉菜单
        const TabsMenuOptions = computed(() => {
            const isDisabled = tagsList.value.length <= 1
            return [
                {
                    label: '刷新当前',
                    key: '1',
                    icon: renderIcon(ReloadOutlined),
                },
                {
                    label: `关闭当前`,
                    key: '2',
                    disabled: state.isCurrent || isDisabled,
                    icon: renderIcon(CloseOutlined),
                },
                {
                    label: '关闭其他',
                    key: '3',
                    disabled: isDisabled,
                    icon: renderIcon(ColumnWidthOutlined),
                },
                {
                    label: '关闭全部',
                    key: '4',
                    disabled: isDisabled,
                    icon: renderIcon(MinusOutlined),
                },
            ]
        })
        // 操作
        function closeHandleSelect(key) {
            if(key === '1'){
                reloadPage()
            }else if(key === '2'){
                removeTab($route);
            }else if(key === '3'){
                closeOther($route);
            }else if(key === '4'){
                closeAll();
            }
            updateNavScroll()
            state.showDropdown = false
        }
        // 刷新
        function reloadPage() {
            reloadThePage($router, $route)
        }
        // 关闭其他
        function closeOther(route) {
            tagsViewStore.closeOtherTags(route)
            state.activeKey = route.fullPath
            $router.replace(route.fullPath)
            updateNavScroll()
        }
        // 关闭全部
        function closeAll() {
            tagsViewStore.closeAllTags()
            $router.replace('/dashboard')
            updateNavScroll()
        }
        return {
            BASE_HOME_REDIRECT,
            ...toRefs(state),
            classObj,
            styleObj,
            tagsList,
            scrollPrev,
            scrollNext,
            handleToPage,
            handleContextMenu,
            handleCloseTagItem,
            getCardColor,
            getBaseColor,
            appTheme,
            tagsScroll,
            tagsWrap,
            TabsMenuOptions,
            closeHandleSelect,
        }
    }
}

</script>
<style lang="less" scoped>
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
            .n-icon {
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
        .tags-prev-hide,
        .tags-next-hide{
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
                background: v-bind(getCardColor);
                color: v-bind(getBaseColor);
                height: 32px;
                padding: 6px 16px 4px;
                border-radius: 3px;
                margin-right: 6px;
                cursor: pointer;
                display: inline-block;
                position: relative;
                flex: 0 0 auto;
                span{
                    float: left;
                    vertical-align: middle;
                }
                .n-icon {
                    height: 22px;
                    width: 21px;
                    margin-right: -6px;
                    position: relative;
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
                    color: v-bind(appTheme);
                }
            }
        }
    }
    .tabs-close {
        min-width: 32px;
        width: 32px;
        height: 32px;
        line-height: 32px;
        text-align: center;
        background: var(--color);
        border-radius: 2px;
        cursor: pointer;
        .tabs-close-btn {
            color: var(--color);
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }
}
.tags-view-fix {
    position: fixed;
    z-index: 5;
    padding: 6px 19px 6px 10px;
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