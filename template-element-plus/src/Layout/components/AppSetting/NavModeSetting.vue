<template>
    <div class="setting-item">
        <el-divider class="i-divider">导航栏模式</el-divider>

        <div class="nav-mode-container">
            <div class="nav-mode-item">
                <el-tooltip placement="top">
                    <img src="~@/icons/nav/nav-theme-dark.svg?url" @click="togNavMode('vertical')" />
                    <template #content>
                        <span>左侧菜单模式</span>
                    </template>
                </el-tooltip>
                <el-badge is-dot v-show="navMode === 'vertical'" />
            </div>
            <div class="nav-mode-item">
                <el-tooltip placement="top">
                    <img src="~@/icons/nav/nav-horizontal.svg?url" @click="togNavMode('horizontal')" />
                    <template #content>
                        <span>顶部菜单模式</span>
                    </template>
                </el-tooltip>
                <el-badge is-dot v-show="navMode === 'horizontal'" />
            </div>
            <div class="nav-mode-item">
                <el-tooltip placement="top">
                    <img src="~@/icons/nav/nav-horizontal-mix.svg?url" @click="togNavMode('horizontal-mix')" />
                    <template #content>
                        <span>混合菜单模式</span>
                    </template>
                </el-tooltip>
                <el-badge is-dot v-show="navMode === 'horizontal-mix'" />
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
<style lang="scss" scoped>
.nav-mode-container{
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    padding: 2px 0;
    .nav-mode-item{
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