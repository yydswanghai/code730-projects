<template>
    <div class="setting-item">
        <NDivider title-placement="center">导航栏风格</NDivider>

        <div class="nav-theme-container">
            <div class="nav-theme-item">
                <NTooltip placement="top">
                    <template #trigger>
                        <img src="~@/assets/images/nav-theme-dark.svg" alt="暗色侧边栏" @click="togNavTheme('dark')" />
                    </template>
                    <span>暗色侧边栏</span>
                </NTooltip>
                <NBadge dot color="#19be6b" v-show="navTheme === 'dark'" />
            </div>
            <div class="nav-theme-item">
                <NTooltip placement="top">
                    <template #trigger>
                        <img src="~@/assets/images/nav-theme-light.svg" alt="亮色侧边栏" @click="togNavTheme('light')" />
                    </template>
                    <span>亮色侧边栏</span>
                </NTooltip>
                <NBadge dot color="#19be6b" v-show="navTheme === 'light'" />
            </div>
            <div class="nav-theme-item">
                <NTooltip placement="top">
                    <template #trigger>
                        <img src="~@/assets/images/header-theme-dark.svg" alt="暗色顶栏" @click="togNavTheme('header-dark')" />
                    </template>
                    <span>暗色顶栏</span>
                </NTooltip>
                <NBadge dot color="#19be6b" v-show="navTheme === 'header-dark'" />
            </div>
        </div>
    </div>
</template>

<script>
import { useProjectSettingStore } from '@/store/modules/projectSetting'
import { computed } from 'vue'
export default {
    name: 'NavThemeSetting',
    setup(){
        const settingStore = useProjectSettingStore()

        function togNavTheme(theme) {
            settingStore.setNavTheme(theme)
            if(settingStore.navMode === 'horizontal' && ['light'].includes(theme)){
                settingStore.setNavTheme('dark')
            }
        }

        return {
            navTheme: computed(() => settingStore.navTheme),
            togNavTheme,
        }
    }
}

</script>
<style lang="less" scoped>
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