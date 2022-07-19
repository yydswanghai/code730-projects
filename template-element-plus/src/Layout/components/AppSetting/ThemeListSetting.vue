<template>
    <div class="setting-item">
        <el-divider class="i-divider">系统主题</el-divider>
        <el-color-picker v-model="color" :predefine="predefineColors" />
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue"
import { useProjectSettingStore } from '@/store/modules/projectSetting'

export default defineComponent({
    setup(){
        const settingStore = useProjectSettingStore();
        const color = ref(settingStore.themeSetting.primary);
        const predefineColors = computed(() => settingStore.themeSetting.colorList)
        return {
            color,
            predefineColors,
        }
    }
})
</script>
<style lang="scss" scoped>

</style>