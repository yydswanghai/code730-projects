<template>
    <div class="header-left">
        <!-- 菜单收起 -->
        <div class="left-gap trigger" @click="changeCollapsed">
            <el-icon :size="18" v-if="collapsed"><Fold /></el-icon>
            <el-icon :size="18" v-else><Expand /></el-icon>
        </div>
        <!-- 刷新 -->
        <div class="left-gap trigger" v-if="isReload" @click="reload">
            <el-icon :size="18"><RefreshRight /></el-icon>
        </div>
        <!-- 面包屑 -->
        <Breadcrumb />
    </div>
</template>

<script lang="ts">
import { defineComponent, inject, computed, watch } from "vue"
import { useProjectSettingStore } from '@/store/modules/projectSetting'
import { Fold, Expand, RefreshRight } from "@element-plus/icons-vue"
import { Breadcrumb } from "../Breadcrumb/"

export default defineComponent({
    name: "HeaderLeft",
    components: {
        Fold,
        Expand,
        RefreshRight,
        Breadcrumb,
    },
    props: {
        collapsed: Boolean
    },
    setup(props, ctx){
        watch(()=> props.collapsed ,(val) => {
            console.log(val)
        })
        const settingStore = useProjectSettingStore();
        const isReload = computed(() => settingStore.headerSetting.isReload)
        /* 刷新 */
        const reload = inject<() => void>('reload');
        const changeCollapsed = ctx.attrs.changeCollapsed as () => void

        return {
            changeCollapsed,
            reload,
            isReload,
        }
    }
})
</script>
<style lang="scss" scoped>
.header-left{
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
}
</style>