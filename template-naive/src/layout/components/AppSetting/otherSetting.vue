<template>
    <div class="setting-item">
        <NDivider title-placement="center">其他设置</NDivider>

        <div class="other-item">
            <div class="title">分割菜单</div>
            <div class="switch">
                <NSwitch :disabled="navMode !== 'horizontal-mix'"
                    v-model:value="settingStore.menuSetting.mixMenu"
                />
            </div>
        </div>
        <div class="other-item">
            <div class="title">固定顶栏</div>
            <div class="switch">
                <NSwitch v-model:value="settingStore.headerSetting.fixed" />
            </div>
        </div>
        <div class="other-item">
            <div class="title">固定多页签</div>
            <div class="switch">
                <NSwitch v-model:value="settingStore.multiTabsSetting.fixed" />
            </div>
        </div>
        <div class="other-item">
            <div class="title">显示刷新页面按钮</div>
            <div class="switch">
                <NSwitch v-model:value="settingStore.headerSetting.isReload" />
            </div>
        </div>
        <div class="other-item">
            <div class="title">显示面包屑导航</div>
            <div class="switch">
                <NSwitch v-model:value="settingStore.crumbsSetting.show" />
            </div>
        </div>
        <div class="other-item">
            <div class="title">显示面包屑图标</div>
            <div class="switch">
                <NSwitch v-model:value="settingStore.crumbsSetting.showIcon" />
            </div>
        </div>
        <div class="other-item">
            <div class="title">显示多页签</div>
            <div class="switch">
                <NSwitch v-model:value="settingStore.multiTabsSetting.show" />
            </div>
        </div>
    </div>
</template>
<script>
import { useProjectSettingStore } from '@/store/modules/projectSetting'
import { computed } from 'vue'
export default {
    name: 'OtherSetting',
    setup(){
        const settingStore = useProjectSettingStore()

        return {
            navMode: computed(() => settingStore.navMode),
            settingStore
        }
    }
}
</script>
<style lang="less" scoped>
.other-item{
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
}
</style>