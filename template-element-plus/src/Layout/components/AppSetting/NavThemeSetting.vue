<template>
    <div class="i-setting">
        <el-divider class="i-divider">导航栏风格</el-divider>

        <div class="i-container">
            <div class="i-container-item">
                <el-tooltip placement="top">
                    <img src="~@/icons/nav/nav-theme-dark.svg?url" @click="togNavMode('dark')" />
                    <template #content>
                        <span>暗色侧边栏</span>
                    </template>
                </el-tooltip>
                <el-badge type="primary" is-dot v-show="navTheme === 'dark'" />
            </div>
            <div class="i-container-item">
                <el-tooltip placement="top">
                    <img src="~@/icons/nav/nav-theme-light.svg?url" @click="togNavMode('light')" />
                    <template #content>
                        <span>亮色侧边栏</span>
                    </template>
                </el-tooltip>
                <el-badge type="primary" is-dot v-show="navTheme === 'light'" />
            </div>
            <div class="i-container-item">
                <el-tooltip placement="top">
                    <img src="~@/icons/nav/nav-theme-mix-dark.svg?url" @click="togNavMode('mix-dark')" />
                    <template #content>
                        <span>暗色混合侧边栏</span>
                    </template>
                </el-tooltip>
                <el-badge type="primary" is-dot v-show="navTheme === 'mix-dark'" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue"
import { useProjectSettingStore } from '@/store/modules/projectSetting'
import { INavTheme } from '@/settings/types'

export default defineComponent({
    setup(){
        const settingStore = useProjectSettingStore();
        function togNavMode(theme: INavTheme) {
            settingStore.setNavTheme(theme);
        }
        return {
            navTheme: computed(() => settingStore.navTheme),
            togNavMode,
        }
    }
})
</script>