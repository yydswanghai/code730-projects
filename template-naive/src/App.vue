<template>
  <NConfigProvider
    :locale="zhCN"
    :date-locale="dateZhCN"
    :theme="theme"
    :theme-overrides="themeOverrides"
  >
    <AppProvider>
      <RouterView />
    </AppProvider>
  </NConfigProvider>
</template>

<script>
/**
 * NConfigProvider 是ui库的适配主题的组件
 * detail: https://www.naiveui.com/zh-CN/light/components/config-provider
 */
import { useProjectSettingStore } from '@/store/modules/projectSetting'
import { zhCN, dateZhCN, darkTheme } from 'naive-ui'
import { computed } from 'vue'

import AppProvider from '@/components/Application/index.vue'
export default {
    components: {
      AppProvider,
    },
    setup(){
        const settingStore = useProjectSettingStore()
        // 当前主题，如果设置为暗色主题，直接使用系统自带的暗色主题，否则就是亮色主题
        const theme = computed(() => settingStore.isDarkTheme ? darkTheme : undefined)

        // 辅助函数
        function addLight(color, amount) {
            const cc = parseInt(color, 16) + amount
            const c = cc > 255 ? 255 : cc
            return c.toString(16).length > 1 ? c.toString(16) : `0${c.toString(16)}`
        }
        // 辅助函数: 类似less里的lighten()函数
        function lighten(color, amount) {
            color = color.indexOf('#') >= 0 ? color.substring(1, color.length) : color
            amount = Math.trunc((255 * amount) / 100)
            return `#${addLight(color.substring(0, 2), amount)}${addLight(
              color.substring(2, 4),
              amount)}${addLight(color.substring(4, 6), amount)}`
        }
        /**
         * themeOverrides 这个对象主要用来调整主题变量
         */
        const themeOverrides = computed(() => {
            const appTheme = settingStore.appTheme
            const lightenStr = lighten(settingStore.appTheme, 6)
            return {
                common: {
                    primaryColor: appTheme,         // 主题色
                    primaryColorHover: lightenStr,  // hover
                    primaryColorPressed: lightenStr,
                },
                LoadingBar: {
                    colorLoading: appTheme,        // 加载效果的颜色
                }
            }
        })
        return {
            zhCN,
            dateZhCN,
            theme,
            themeOverrides,
        }
    }
}
</script>

<style lang="less">
@import 'styles/index.less';
</style>
