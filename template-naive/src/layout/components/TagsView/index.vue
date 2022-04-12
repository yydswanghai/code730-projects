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
                <!-- <div ref="tagsScroll" class="tags-scroll">
                    <Draggable :list="tagsList" animation="300" item-key="fullPath" class="flex">
                        <template #item="{ element }">
                            <div class="tags-scroll-item"
                                :class="{ 'active': activeKey === element.path }"
                                :id="`tag${element.fullPath.split('/').join('\/')}`"
                                @click.stop="handleGoPage(element)"
                                @contextmenu="handleContextMenu($event, element)"
                                >
                                <span>{{ element.meta.title }}</span>
                                <NIcon size="14" @click.stop="handleCloseTagItem(element)"
                                    v-if="element.path !== '/dashboard/console'"
                                >
                                    <CloseOutlined />
                                </NIcon>
                            </div>
                        </template>
                    </Draggable>
                </div> -->
            </div>
        </div>
    </div>
</template>

<script>
import { LeftOutlined, RightOutlined, CloseOutlined } from '@vicons/antd'
import { ref, computed, reactive, toRefs, watch, nextTick } from 'vue'
import { useProjectSettingStore } from '@/store/modules/projectSetting'
import { useTagsViewStore } from '@/store/modules/tagsView'
import Draggable from 'vuedraggable'
import { useRoute, useRouter } from 'vue-router'
import { useThemeVars } from 'naive-ui'
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
        Draggable,
    },
    setup(props){
        const $route = useRoute()
        const $router = useRouter()
        const settingStore = useProjectSettingStore()
        const tagsViewStore = useTagsViewStore()
        const themeVars = useThemeVars();
        const tagsScroll = ref(null)// dom
        const tagsWrap = ref(null)// dom

        const state = reactive({
            activeKey: $route.fullPath,
            scrollable: false,
            dropdownX: 0,
            dropdownY: 0,
            showDropdown: false,
            isMultiHeaderFixed: false,
            multiTabsSetting: settingStore.multiTabsSetting
        })

        // // tagsview缓存
        // let cacheRoutes = []
        // try{
        //     const routesStr = localStorage.getItem('Tags-Views')
        //     cacheRoutes = routesStr ? JSON.parse(routesStr) : [...$route]
        // }catch(e){
        //     cacheRoutes = [...$route]
        // }
        // // 将最新的路由信息同步到 localStorage 中
        // const routes = $router.getRoutes()
        // cacheRoutes.forEach(item => {
        //     const route = routes.find((route) => route.path === item.path)
        //     if(route){
        //         item.meta = route.meta || item.meta
        //         item.name = route.name || item.name
        //     }
        // })
        // // 初始化标签页
        // tagsViewStore.initTags(cacheRoutes)
        const tagsList = computed(() => tagsViewStore.tagsList)
        watch(() => $route.fullPath, (to) => {
            state.activeKey = to
            tagsViewStore.addTags($route)
            updateNavScroll(true)
        }, { immediate: true })
        // 在页面关闭或刷新之前，保存数据
        // window.addEventListener('beforeunload', () => {
        //     localStorage.setItem('Tags-Views', JSON.stringify(tagsList.value))
        // })

        /**
         * @param autoScroll 是否开启自动滚动功能
         */
        async function updateNavScroll(autoScroll) {
            await nextTick()
            if(!tagsScroll.value) return
            const offsetWidth = tagsScroll.value.offsetWidth
            const tagsWidth = tagsScroll.value.scrollWidth
            if(offsetWidth < tagsWidth){
                state.scrollable = true
                if(autoScroll){
                    let tagList = tagsScroll.value.querySelectorAll('.tags-scroll-item') || [];
                    [...tagList].forEach(tag => {
                        if (tag.id === `tag${state.activeKey.split('/').join('\/')}`) {
                            tag.scrollIntoView && tag.scrollIntoView();
                        }
                    })
                }
            }else{
                state.scrollable = false
            }
        }

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
        function scrollPrev() {
            
        }
        function scrollNext() {

        }
        function handleGoPage() {

        }
        function handleContextMenu() {

        }
        function handleCloseTagItem() {

        }

        return {
            ...toRefs(state),
            classObj,
            styleObj,
            tagsList,
            scrollPrev,
            scrollNext,
            handleGoPage,
            handleContextMenu,
            handleCloseTagItem,
            getCardColor,
            getBaseColor,
            appTheme,
            tagsScroll,
            tagsWrap,
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
                &.active{
                    color: v-bind(appTheme);
                }
                span{
                    float: left;
                    vertical-align: middle;
                }
                &:hover {
                    color: #515a6e;
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
            }
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