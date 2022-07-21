<template>
    <div class="setting-item">
        <el-divider class="i-divider">导航栏风格</el-divider>

        <div class="nav-theme-container">
            <div class="nav-theme-item">
                <el-tooltip placement="top">
                    <img src="~@/icons/nav/nav-theme-dark.svg?url" @click="togNavMode('dark')" />
                    <template #content>
                        <span>暗色侧边栏</span>
                    </template>
                </el-tooltip>
                <el-badge is-dot v-show="navTheme === 'dark'" />
            </div>
            <div class="nav-theme-item">
                <el-tooltip placement="top">
                    <img src="~@/icons/nav/nav-theme-light.svg?url" @click="togNavMode('light')" />
                    <template #content>
                        <span>亮色侧边栏</span>
                    </template>
                </el-tooltip>
                <el-badge is-dot v-show="navTheme === 'light'" />
            </div>
            <div class="nav-theme-item">
                <el-tooltip placement="top">
                    <img src="~@/icons/nav/nav-theme-mix-dark.svg?url" @click="togNavMode('mix-dark')" />
                    <template #content>
                        <span>暗色混合侧边栏</span>
                    </template>
                </el-tooltip>
                <el-badge is-dot v-show="navTheme === 'mix-dark'" />
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
<style lang="scss" scoped>
.nav-theme-container{
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    padding: 2px 0;
    .nav-theme-item{
        margin-right: 16px;
        display: flex;
        flex-direction: column;
        align-items: center;
        img{
            margin-bottom: .5rem;
        }
    }
}
</style>