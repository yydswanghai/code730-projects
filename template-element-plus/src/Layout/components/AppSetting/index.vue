<template>
    <el-drawer v-model="show" :with-header="false">
        <div class="app-setting">
            <ThemeSetting />
            <ThemeListSetting />
        </div>
    </el-drawer>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, watch } from "vue"
import { useProjectSettingStore } from '@/store/modules/projectSetting'
import ThemeSetting from './ThemeSetting.vue'
import ThemeListSetting from './ThemeListSetting.vue'
export default defineComponent({
    name: 'AppSetting',
    components: {
        ThemeSetting,
        ThemeListSetting
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
            margin: 10px 0;
        }
    }
}
</style>