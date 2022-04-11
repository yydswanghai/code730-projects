<template>
    <div class="setting-item">
        <NDivider title-placement="center">主题</NDivider>

        <NTooltip placement="bottom">
            <template #trigger>
                <NSwitch v-model:value="settingStore.isDarkTheme" :rail-style="railStyle">
                    <template #checked>
                        <NIcon size="14" color="#ffd93b"><SunnySharp /></NIcon>
                    </template>
                    <template #unchecked>
                        <NIcon size="14" color="#ffd93b"><Moon /></NIcon>
                    </template>
                </NSwitch>
            </template>
            <span>{{ !settingStore.isDarkTheme ? '深' : '浅' }}色主题</span>
        </NTooltip>
    </div>
</template>

<script>
import { useProjectSettingStore } from '@/store/modules/projectSetting'
import { Moon, SunnySharp } from '@vicons/ionicons5'
export default {
    name: 'ThemeSetting',
    components: {
        Moon,
        SunnySharp,
    },
    setup(){
        const settingStore = useProjectSettingStore()
        function railStyle({ focused, checked }) {
            const style = {}
            if (checked) {
                style.background = "#e0e7ff"
            } else {
                style.background = "#000e1c"
            }
            return style
        }
        return {
            settingStore,
            railStyle,
        }
    }
}

</script>
<style lang="less" scoped>

</style>