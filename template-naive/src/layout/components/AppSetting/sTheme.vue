<template>
    <div class="setting-item">
        <NDivider title-placement="center">系统主题</NDivider>

        <div class="theme-container">
            <span
                class="theme-item"
                v-for="(color, i) in appThemeList"
                :key="i"
                :style="{ 'background-color': color }"
                @click="changeTheme(color)"
                >
                <NIcon size="12" v-if="color === appTheme">
                    <CheckOutlined />
                </NIcon>
            </span>
        </div>
    </div>
</template>

<script>
import { useProjectSettingStore } from '@/store/modules/projectSetting'
import { computed } from 'vue'

import { CheckOutlined } from '@vicons/antd'

export default {
    name: 'SysThemeSetting',
    components: {
        CheckOutlined
    },
    setup(){
        const settingStore = useProjectSettingStore()

        // 修改系统主题
        function changeTheme(color) {
            settingStore.setAppTheme(color)
        }

        return {
            appTheme: computed(() => settingStore.appTheme),
            appThemeList: computed(() => settingStore.appThemeList),
            changeTheme,
        }
    }
}

</script>
<style lang="less" scoped>
.theme-container{
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    padding: 2px 0;
    .theme-item{
        width: 20px;
        min-width: 20px;
        height: 20px;
        cursor: pointer;
        border: 1px solid #eee;
        border-radius: 2px;
        margin: 0 5px 5px 0;
        text-align: center;
    }
}
</style>