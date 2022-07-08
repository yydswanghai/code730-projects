<template>
    <el-menu
        default-active="2"
        :collapse="collapsed"
        :mode="mode"
        >
        <el-sub-menu index="1">
            <template #title>
                <el-icon><location /></el-icon>
                <span>Navigator One</span>
            </template>
            <el-menu-item-group>
                <template #title><span>Group One</span></template>
                <el-menu-item index="1-1">item one</el-menu-item>
                <el-menu-item index="1-2">item two</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="Group Two">
                <el-menu-item index="1-3">item three</el-menu-item>
            </el-menu-item-group>
            <el-sub-menu index="1-4">
                <template #title><span>item four</span></template>
                <el-menu-item index="1-4-1">item one</el-menu-item>
            </el-sub-menu>
        </el-sub-menu>
        <el-menu-item index="2">
            <el-icon><icon-menu /></el-icon>
            <template #title>Navigator Two</template>
        </el-menu-item>
        <el-menu-item index="3" disabled>
            <el-icon><document /></el-icon>
            <template #title>Navigator Three</template>
        </el-menu-item>
        <el-menu-item index="4">
            <el-icon><setting /></el-icon>
            <template #title>Navigator Four</template>
        </el-menu-item>
    </el-menu>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from "vue"
import { useProjectSettingStore } from '@/store/modules/projectSetting'
import {
    Document,
    Menu as IconMenu,
    Location,
    Setting, } from '@element-plus/icons-vue'

export default defineComponent({
    name: "Menu",
    components: {
        Document,
        IconMenu,
        Location,
        Setting
    },
    props: {
        collapsed: {// 侧边栏菜单是否折叠
            type: Boolean
        },
        mode: {// 菜单模式
            type: String as PropType<"vertical" | "horizontal">,
            default: 'vertical',
        },
        location: {// 菜单位置
            type: String,
            default: 'left',
        },
    },
    setup(props, ctx){
        const settingStore = useProjectSettingStore();
        const navMode = computed(() => settingStore.navMode);
    }
})
</script>
<style lang="scss" scoped>
    
</style>