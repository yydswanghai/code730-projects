<template>
    <div class="setting-item">
        <NDivider title-placement="center">导航栏模式</NDivider>

        <div class="nav-mode-container">
            <div class="nav-mode-item">
                <NTooltip placement="top">
                    <template #trigger>
                        <img src="~@/assets/images/nav-theme-dark.svg" alt="左侧菜单模式" @click="togNavMode('vertical')" />
                    </template>
                    <span>左侧菜单模式</span>
                </NTooltip>
                <NBadge dot color="#19be6b" v-show="navMode === 'vertical'" />
            </div>
            <div class="nav-mode-item">
                <NTooltip placement="top">
                    <template #trigger>
                        <img src="~@/assets/images/nav-horizontal.svg" alt="顶部菜单模式" @click="togNavMode('horizontal')" />
                    </template>
                    <span>顶部菜单模式</span>
                </NTooltip>
                <NBadge dot color="#19be6b" v-show="navMode === 'horizontal'" />
            </div>
            <div class="nav-mode-item">
                <NTooltip placement="top">
                    <template #trigger>
                        <img src="~@/assets/images/nav-horizontal-mix.svg" alt="顶部菜单混合模式" @click="togNavMode('horizontal-mix')" />
                    </template>
                    <span>顶部菜单混合模式</span>
                </NTooltip>
                <NBadge dot color="#19be6b" v-show="navMode === 'horizontal-mix'" />
            </div>
        </div>
    </div>
</template>

<script>
import { useProjectSettingStore } from '@/store/modules/projectSetting'
import { computed } from 'vue'
export default {
    name: 'NavModeSetting',
    setup(){
        const settingStore = useProjectSettingStore()

        function togNavMode(mode) {
            settingStore.setNavMode(mode)
            settingStore.menuSetting.mixMenu = false
        }
        return {
            navMode: computed(() => settingStore.navMode),
            togNavMode,
        }
    }
}

</script>
<style lang="less" scoped>
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