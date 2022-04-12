<template>
    <div class="header-left">
        <!-- 菜单收起 -->
        <div class="ml-1 trigger">
            <NIcon size="18" v-if="collapsed"><MenuUnfoldOutlined /></NIcon>
            <NIcon size="18" v-else><MenuFoldOutlined /></NIcon>
        </div>
        <!-- 刷新 -->
        <div class="mr-1 trigger"
            v-if="headerSetting.isReload" @click="reloadPage">
            <NIcon size="18"><ReloadOutlined /></NIcon>
        </div>
        <!-- 面包屑 -->
        <Breadcrumb />
    </div>
</template>

<script>
import { useProjectSettingStore } from '@/store/modules/projectSetting'
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

import { MenuUnfoldOutlined, MenuFoldOutlined, ReloadOutlined } from '@vicons/antd'
import Breadcrumb from './Breadcrumb.vue'
export default {
    name: 'HeaderLeft',
    components: {
        Breadcrumb,
        MenuUnfoldOutlined,
        MenuFoldOutlined,
        ReloadOutlined,
    },
    props: {
        collapsed: Boolean
    },
    setup(props, ctx){
        const $router = useRouter()
        const $route = useRoute()
        const settingStore = useProjectSettingStore()
        // 刷新页面
        function reloadPage() {
            $router.push({
                path: '/redirect' + $route.fullPath
            })
        }

        return {
            headerSetting: computed(() => settingStore.headerSetting),
            reloadPage,
        }
    }
}

</script>
<style lang="less" scoped>
.header-left{
    display: flex;
    align-items: center;
}
</style>