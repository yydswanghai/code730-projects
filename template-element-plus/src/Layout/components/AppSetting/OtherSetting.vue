<template>
    <div class="i-setting">
        <el-divider class="i-divider">其他设置</el-divider>

        <div class="i-item">
            <div class="title">固定顶栏</div>
            <div class="switch">
                <el-switch v-model="settingStore.headerSetting.fixed" />
            </div>
        </div>
        <div class="i-item">
            <div class="title">固定多页签</div>
            <div class="switch">
                <el-switch v-model="settingStore.tagsViewSetting.fixed" />
            </div>
        </div>
        <div class="i-item">
            <div class="title">显示多页签</div>
            <div class="switch">
                <el-switch v-model="settingStore.tagsViewSetting.show" />
            </div>
        </div>
        <div class="i-item">
            <div class="title">显示刷新页面按钮</div>
            <div class="switch">
                <el-switch v-model="settingStore.headerSetting.isReload" />
            </div>
        </div>
        <div class="i-item">
            <div class="title">显示面包屑导航</div>
            <div class="switch">
                <el-switch v-model="settingStore.crumbsSetting.show" />
            </div>
        </div>
        <div class="i-item">
            <div class="title">显示面包屑图标</div>
            <div class="switch">
                <el-switch v-model="settingStore.crumbsSetting.showIcon" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import { useProjectSettingStore } from '@/store/modules/projectSetting'

export default defineComponent({
    setup(){
        const settingStore = useProjectSettingStore()
        return {
            settingStore,
        }
    }
})
</script>