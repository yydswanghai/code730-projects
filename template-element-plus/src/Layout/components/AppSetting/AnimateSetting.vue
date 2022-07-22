<template>
    <div class="i-setting">
        <el-divider class="i-divider">动画</el-divider>

        <div class="i-item">
            <div class="title">禁用动画</div>
            <div class="switch">
                <el-switch v-model="settingStore.animateSetting.open" />
            </div>
        </div>
        <div class="i-item">
            <div class="title" style="flex: 1 1 80px;">动画类型</div>
            <div class="switch" style="flex: 1 1 135px;">
                <el-select v-model="settingStore.animateSetting.type">
                    <el-option
                        v-for="item in animateOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    />
                </el-select>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import { useProjectSettingStore } from '@/store/modules/projectSetting'

export default defineComponent({
    setup(){
        const settingStore = useProjectSettingStore();
        const animateOptions = [
            { value: 'zoom-fade', label: '渐变' },
            { value: 'zoom-out', label: '闪现' },
            { value: 'fade-slide', label: '滑动' },
            { value: 'fade', label: '消退' },
            { value: 'fade-bottom', label: '底部消退' },
            { value: 'fade-scale', label: '缩放消退' },
        ];
        return {
            settingStore,
            animateOptions,
        }
    }
})
</script>