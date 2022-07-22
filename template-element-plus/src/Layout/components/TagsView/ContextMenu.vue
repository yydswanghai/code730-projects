<template>
    <el-dropdown class="tags-dropdown">
        <el-icon :size="20" class="tags-dropdown-icon"><ArrowDownOutline /></el-icon>
        <template #dropdown>
            <div class="i-dropdown-menu">
                <div class="i-dropdown-menu-item" v-for="item in contextMenuOptions" :key="item.key"
                    @click="selectContextMenu(item.key, item.disabled)" :class="{ disabled: item.disabled }">
                    <component v-if="item.icon" :is="item.icon" class="i-icon" />{{ item.label }}
                </div>
            </div>
        </template>
    </el-dropdown>
    <teleport to="body">
        <el-dropdown :style="{ top: top + 'px', left: left + 'px', position: 'absolute' }" v-show="showDropdown">
            <div class="i-dropdown-menu context-menu" ref="contextMenuRef" >
                <div class="i-dropdown-menu-item" v-for="item in contextMenuOptions" :key="item.key"
                    @click="selectContextMenu(item.key, item.disabled)" :class="{ disabled: item.disabled }">
                    <component v-if="item.icon" :is="item.icon" class="i-icon" />{{ item.label }}
                </div>
            </div>
        </el-dropdown>
    </teleport>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, inject, computed, PropType } from "vue"
import { useTagsViewStore, IRouteItem } from '@/store/modules/tagsView'
import { renderIcon } from '@/utils/'
import { useRoute, useRouter } from 'vue-router'
import { CloseRound, ReloadBlod, ColumnWidthOutline, MinusBaseline, ArrowDownOutline } from '@/icons/'
import { ElMessage } from 'element-plus'
import { PageEnum } from '@/enums/pageEnum'

export default defineComponent({
    name: 'ContextMenu',
    props: {
        top: Number,
        left: Number,
        activeKey: String,
        showDropdown: Boolean,
        isCurrent: Boolean,
        tagsList: {
            type: Array as PropType<IRouteItem[]>,
            required: true
        }
    },
    components: {
        ReloadBlod,
        CloseRound,
        ColumnWidthOutline,
        MinusBaseline,
        ArrowDownOutline
    },
    emits: ['updateNav', 'update:showDropdown', 'update:activeKey'],
    setup(props, ctx){
        const $route = useRoute();
        const $router = useRouter();
        const tagsViewStore = useTagsViewStore();
        const contextMenuRef = ref();
        enum contextMenuEnum {
            刷新当前,
            关闭当前,
            关闭其他,
            关闭全部
        }
        /* 下拉菜单 */
        const contextMenuOptions = computed(() => {
            const isDisabled = props.tagsList.length <= 1;
            const isHome = props.activeKey === PageEnum.HOME;// 当前选中到控制台不能关闭全部
            return [
                {
                    label: '刷新当前',
                    key: contextMenuEnum.刷新当前,
                    disabled: false,
                    icon: renderIcon(ReloadBlod),
                },
                {
                    label: '关闭当前',
                    key: contextMenuEnum.关闭当前,
                    disabled: props.isCurrent || isDisabled,
                    icon: renderIcon(CloseRound),
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
                    disabled: isHome || isDisabled,
                    icon: renderIcon(MinusBaseline),
                },
            ]
        });
        /* 操作右键菜单 */
        function selectContextMenu(key: number, disabled: boolean) {
            if(disabled){
                return;
            }
            if(key === contextMenuEnum.刷新当前){
                reload && reload();
            }else if(key === contextMenuEnum.关闭当前){
                removeTab($route as IRouteItem);
            }else if(key === contextMenuEnum.关闭其他){
                closeOther($route as IRouteItem)
            }else if(key === contextMenuEnum.关闭全部){
                closeAll();
            }
            ctx.emit('updateNav');
            ctx.emit('update:showDropdown', false);
        }
        onMounted(() => {
            // 点击除了菜单以外的位置关闭该右键菜单
            document.addEventListener('click', function (e: Event){
                if(!contextMenuRef.value?.contains(e.target)){
                    ctx.emit('update:showDropdown', false);
                }
            });
        });
        /* 刷新 */
        const reload = inject<() => void>('reload');
        /* 关闭当前页面 */
        function removeTab(route: IRouteItem) {
            if(props.tagsList.length === 1){
                return ElMessage.warning('这已经是最后一页，不能再关闭了！');
            }
            tagsViewStore.closeCurrentTag(route);
            // 如果关闭是的当前页，则当前页自动变成上一个
            if (props.activeKey === route.fullPath) {
                const currentRoute = props.tagsList[Math.max(0, props.tagsList.length -1)];
                ctx.emit('update:activeKey', currentRoute.fullPath);
                $router.push(currentRoute);
            }
        }
        /* 关闭其他 */
        function closeOther(route: IRouteItem) {
            tagsViewStore.closeOtherTags(route);
            $router.replace(route.fullPath);
        }
        /* 关闭全部 */
        function closeAll() {
            tagsViewStore.closeAllTags();
            $router.replace(PageEnum.HOME);
        }
        return {
            contextMenuRef,
            contextMenuOptions,
            selectContextMenu,
            removeTab,
        }
    }
})
</script>
<style lang="scss" scoped>
.tags-dropdown{
    min-width: 32px;
    width: 32px;
    height: 32px;
    line-height: 32px;
    text-align: center;
    border-radius: 2px;
    cursor: pointer;
    .tags-dropdown-icon {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
}
.context-menu{
    position: absolute;
    z-index: 100;
    background: var(--el-bg-color-overlay);
    box-shadow: 0px 0px 12px rgb(0 0 0 / 12%);
}
.i-dropdown-menu-item{
    &.disabled{
        cursor: not-allowed;
        opacity: .5;
    }
    .i-icon{
        color: inherit;
    }
}
</style>