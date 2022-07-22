<template>
    <div class="i-setting">
        <el-divider class="i-divider">导航栏模式</el-divider>

        <div class="i-container">
            <div class="i-container-item">
                <el-tooltip placement="top">
                    <img src="~@/icons/nav/nav-theme-dark.svg?url" @click="togNavMode('vertical')" />
                    <template #content>
                        <span>左侧菜单模式</span>
                    </template>
                </el-tooltip>
                <el-badge type="primary" is-dot v-show="navMode === 'vertical'" />
            </div>
            <div class="i-container-item">
                <el-tooltip placement="top">
                    <img src="~@/icons/nav/nav-horizontal.svg?url" @click="togNavMode('horizontal')" />
                    <template #content>
                        <span>顶栏菜单模式</span>
                    </template>
                </el-tooltip>
                <el-badge type="primary" is-dot v-show="navMode === 'horizontal'" />
            </div>
            <div class="i-container-item">
                <el-tooltip placement="top">
                    <img src="~@/icons/nav/nav-horizontal-mix.svg?url" @click="togNavMode('horizontal-mix')" />
                    <template #content>
                        <span>混合菜单模式</span>
                    </template>
                </el-tooltip>
                <el-badge type="primary" is-dot v-show="navMode === 'horizontal-mix'" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue"
import { useProjectSettingStore } from '@/store/modules/projectSetting'
import { INavMode } from '@/settings/types'
export default defineComponent({
    setup(){
        const settingStore = useProjectSettingStore();
        function togNavMode(mode: INavMode) {
            settingStore.setNavMode(mode);
        }
        return {
            navMode: computed(() => settingStore.navMode),
            togNavMode,
        }
    }
})
</script>