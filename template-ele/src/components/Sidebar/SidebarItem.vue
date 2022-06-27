<template>
    <div v-if="!item.hidden">
        <template v-if="hasOneChild && (!onlyOneChild.children || onlyOneChild.noShowingChildren) && !item.alwaysShow">
            <AppLink v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">
                <ElMenuItem :index="resolvePath(onlyOneChild.path)" :class="{'submenu-title-noDropdown':!isNest}">
                    <Item
                        :icon="onlyOneChild.meta.icon || (item.meta && item.meta.icon)"
                        :title="onlyOneChild.meta.title"
                    />
                </ElMenuItem>
            </AppLink>
        </template>
        <ElSubMenu v-else :index="resolvePath(item.path)" popper-append-to-body>
            <template #title>
                <Item v-if="item.meta" :icon="item.meta && item.meta.icon" :title="item.meta.title" />
            </template>
            <!-- 子栏目 -->
            <SidebarItem
                v-for="child in item.children"
                :key="child.path"
                :is-nest="true"
                :item="child"
                :base-path="resolvePath(child.path)"
                class="nest-menu"
            />
        </ElSubMenu>
    </div>
</template>

<script>
import { isExternal } from '@/util/validate'
import { ref } from 'vue';
import Item from './Item.vue'
import AppLink from '@/components/AppLink/index.vue'
import { resolve } from '@/util/pathResolve'
export default {
    name: 'SidebarItem',
    components: {
        Item,
        AppLink
    },
    props: {
        item: {// route对象
            type: Object,
            required: true
        },
        basePath: {// 主路由的路径
            type: String,
            default: ''
        },
        isNest: {
            type: Boolean,
            default: false
        },
    },
    setup(props, ctx){
        /**
         * @desc 1.如果没有子路由者就是该路由本身
         * @desc 2.如果有仅有一个子路由就是该子路由
         */
        let onlyOneChildRef = ref(null)
        // 单个路由的时显示
        let hasOneChildRef = ref(false)
        const hasOneShowingChild = (children = [], parent) => {
            const showingChildren = children.filter(item => {
                if(item.hidden){// 过滤掉隐藏的
                    return false
                }else{
                    onlyOneChildRef.value = item// 当只有一个显示子对象时使用
                    return true
                }
            })
            // 当只有一个子路由器时，缺省显示子路由器
            if(showingChildren.length === 1){
                return true
            }
            // 如果没有要显示的子路由器，则显示parent
            if(showingChildren.length === 0){
                onlyOneChildRef.value = { ...parent, path: '', noShowingChildren: true }
                return true
            }
            return false
        }
        hasOneChildRef.value = hasOneShowingChild(props.item.children, props.item)
        /**
         * @desc 处理路由跳转路径
         * props.basePath 一级导航的路径
         * routePath 如果是子路径则 props.basePath/routePath
         */
        const resolvePath = (routePath) => {
            // 外部链接
            if (isExternal(routePath)) {
                return routePath
            }
            if (isExternal(props.basePath)) {
                return props.basePath
            }
            return resolve(props.basePath, routePath)
        }
        return {
            hasOneChild: hasOneChildRef,
            onlyOneChild: onlyOneChildRef,
            resolvePath,
        }
    }
}

</script>
<style lang="scss">
@import "styles/variables.module.scss";
// menu hover
.submenu-title-noDropdown,
.el-sub-menu__title {
    &:hover {
        background-color: $menuHover !important;
    }
}
.nest-menu .el-sub-menu > .el-sub-menu__title,
.el-sub-menu .el-menu-item{
    min-width: $sideBarWidth !important;
    background-color: $subMenuBg !important;
    &:hover{
        background-color: $subMenuHover !important;
    }
}
.el-menu--vertical{
    .nest-menu .el-sub-menu > .el-sub-menu__title,
    .el-menu-item {
        &:hover {
            background-color: $menuHover !important;
        }
    }
    & > .el-menu--popup {
        max-height: 100vh;
        overflow-y: auto;
        &::-webkit-scrollbar-track-piece {
            background: #d3dce6;
        }
        &::-webkit-scrollbar {
            width: 6px;
        }
        &::-webkit-scrollbar-thumb {
            background: #99a9bf;
            border-radius: 20px;
        }
    }
}
.is-active > .el-sub-menu__title {
    color: $subMenuActiveText !important;
}
.el-menu-item.is-active::before{
    content: "";
    display: block;
    width: 5px;
    height: 100%;
    background-color: $darkBlue;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 100;
}
</style>