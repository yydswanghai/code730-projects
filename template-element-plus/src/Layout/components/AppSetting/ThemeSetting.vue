<template>
    <div class="i-setting">
        <el-divider class="i-divider">主题</el-divider>
        <el-tooltip placement="bottom">
            <el-switch
                size="large"
                v-model="settingStore.themeSetting.isDark"
                :active-icon="Sunny"
                :inactive-icon="Moon"
                style="--el-switch-on-color: #ffd93b; --el-switch-off-color: #000E1C;"
                inline-prompt
            />
            <template #content>
                <span>{{ !settingStore.themeSetting.isDark ? '深' : '浅' }}色主题</span>
            </template>
        </el-tooltip>
    </div>
</template>

<script lang="ts">
import { defineComponent, watch } from "vue"
import { Sunny, Moon } from '@element-plus/icons-vue'
import { useProjectSettingStore } from '@/store/modules/projectSetting'
import { toggleDark } from '@/composables/'

export default defineComponent({
    setup(){
        const settingStore = useProjectSettingStore();
        watch(() => settingStore.themeSetting.isDark, (val) => {
            settingStore.setDark(val);
            toggleDark(val);// 切换主题
        });

        return {
            Sunny,
            Moon,
            settingStore,
        }
    }
})
</script>