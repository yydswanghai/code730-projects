<template>
    <NDrawer v-model:show="isDrawer" :width="width" placement="right">
        <NDrawerContent :title="title" :native-scrollbar="false">
            <div class="setting-container">
                <!-- 主题 -->
                <ThemeSetting />
                <!-- 系统主题 -->
                <SysThemeSetting />
                <!-- 导航模式 -->
                <NavModeSetting />
                <!-- 导航风格 -->
                <NavThemeSetting />
                <!-- 其他设置 -->
                <OtherSetting />
                <!-- 动画设置 -->
                <AnimateSetting />

                <div class="setting-item">
                    <NAlert type="warning" :showIcon="false">
                        <p>{{ markedWords }}</p>
                    </NAlert>
                </div>
            </div>
        </NDrawerContent>
    </NDrawer>
</template>

<script>
import { useProjectSettingStore } from '@/store/modules/projectSetting'
import { reactive, toRefs, watch } from 'vue'

import { CheckOutlined } from '@vicons/antd'
import ThemeSetting from './theme.vue'
import SysThemeSetting from './sTheme.vue'
import NavModeSetting from './navMode.vue'
import NavThemeSetting from './navTheme.vue'
import OtherSetting from './otherSetting.vue'
import AnimateSetting from './animate.vue'
export default {
    name: 'AppSetting',
    components: {
        CheckOutlined,
        ThemeSetting,
        SysThemeSetting,
        NavModeSetting,
        NavThemeSetting,
        OtherSetting,
        AnimateSetting,
    },
    setup(){
        const settingStore = useProjectSettingStore()
        const state = reactive({
            width: 280,
            title: '系统设置',
            isDrawer: false,
            markedWords: '注意：提示用户，提示用户，提示用户，提示用户，提示用户',
        })

        watch(() => settingStore.isDarkTheme, (to) => {
            const val = to ? 'header-dark' : 'dark'
            settingStore.setNavTheme(val)
        })

        function openDrawer() {
            state.isDrawer = true
        }

        return {
            ...toRefs(state),
            openDrawer,
        }
    }
}

</script>
<style lang="less" scoped>
.setting-container{

}
</style>
<style lang="less">
.setting-container{
    .setting-item{
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 12px 0;
        flex-wrap: wrap;
        .n-divider:not(.n-divider--vertical) {
            margin: 10px 0;
        }
    }
}
</style>