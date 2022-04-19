<template>
    <div class="setting-item">
        <NDivider title-placement="center">动画</NDivider>

        <div class="animate-item">
            <div class="title">禁用动画</div>
            <div class="switch">
                <NSwitch v-model:value="settingStore.isPageAnimate" />
            </div>
        </div>

        <div class="animate-item">
            <div class="title">动画类型</div>
            <div class="select">
                <NSelect v-model:value="settingStore.pageAnimateType" :options="animateOptions" />
            </div>
        </div>
    </div>
</template>
<script>
import { useProjectSettingStore } from '@/store/modules/projectSetting'
export default {
    name: 'AnimateSetting',
    setup(){
        const settingStore = useProjectSettingStore()

        const animateOptions = [
            { value: 'zoom-fade', label: '渐变' },
            { value: 'zoom-out', label: '闪现' },
            { value: 'fade-slide', label: '滑动' },
            { value: 'fade', label: '消退' },
            { value: 'fade-bottom', label: '底部消退' },
            { value: 'fade-scale', label: '缩放消退' },
        ]

        return {
            settingStore,
            animateOptions,
        }
    }
}
</script>
<style lang="less" scoped>
.animate-item{
    display: flex;
    align-items: center;
    padding: 12px 0;
    flex-wrap: wrap;
    width: 100%;
    .title{
        flex: 1 1;
        font-size: 14px;
    }
    .switch{
        flex: 0 0 auto;
    }
    .select{
        flex: 1;
    }
}
</style>