<template>
    <div class="i-setting">
        <el-divider class="i-divider">修改主题色</el-divider>
        <el-color-picker v-model="color" :predefine="predefineColors" @change="handleChange" />
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue"
import { useProjectSettingStore } from '@/store/modules/projectSetting'
import useChangeTheme from '@/hooks/useChangeTheme'

export default defineComponent({
    setup(){
        const settingStore = useProjectSettingStore();
        const color = ref(settingStore.themeSetting.primary);
        const predefineColors = computed(() => settingStore.themeSetting.colorList);
        function handleChange(color: string) {
            settingStore.setAppTheme(color);
            useChangeTheme(color);
        }
        return {
            color,
            predefineColors,
            handleChange,
        }
    }
})
</script>