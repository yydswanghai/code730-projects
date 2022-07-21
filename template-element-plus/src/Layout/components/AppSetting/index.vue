<template>
    <el-drawer v-model="show" :with-header="false" :size="280">
        <div class="app-setting">
            <!-- 主题 -->
            <ThemeSetting />
            <!-- 系统主题色 -->
            <ThemeListSetting />
            <!-- 导航模式 -->
            <NavModeSetting />
            <!-- 导航风格 -->
            <NavThemeSetting />
        </div>
    </el-drawer>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, watch } from "vue"
import { useProjectSettingStore } from '@/store/modules/projectSetting'
import ThemeSetting from './ThemeSetting.vue'
import ThemeListSetting from './ThemeListSetting.vue'
import NavModeSetting from './NavModeSetting.vue'
import NavThemeSetting from './NavThemeSetting.vue'

export default defineComponent({
    name: 'AppSetting',
    components: {
        ThemeSetting,
        ThemeListSetting,
        NavModeSetting,
        NavThemeSetting,
    },
    setup(){
        const settingStore = useProjectSettingStore();
        const state = reactive({
            show: false,
            title: '系统设置',
            width: 280,
            markedWords: '所有的设置都是即时的没有保存任何状态'
        });

        watch(() => settingStore.themeSetting.isDark, (val) => {
            const theme = val ? 'header-dark' : 'dark'
        });

        function openSetting() {
            state.show = true;
        }

        return {
            ...toRefs(state),
            openSetting,
        }
    }
})
</script>
<style lang="scss" scoped>
.app-setting{
    .setting-item{
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 12px 0;
        flex-wrap: wrap;
        :deep(.i-divider){
            margin: 10px 0 20px;
        }
    }
}
</style>