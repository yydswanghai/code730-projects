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
        const theme = computed(() => settingStore.isDarkTheme ? darkTheme : undefined)

        // 辅助函数
        function addLight(color, amount) {
            const cc = parseInt(color, 16) + amount;
            const c = cc > 255 ? 255 : cc;
            return c.toString(16).length > 1 ? c.toString(16) : `0${c.toString(16)}`;
        }
        // 辅助函数
        function lighten(color, amount) {
            color = color.indexOf('#') >= 0 ? color.substring(1, color.length) : color;
            amount = Math.trunc((255 * amount) / 100);
            return `#${addLight(color.substring(0, 2), amount)}${addLight(
              color.substring(2, 4),
              amount
            )}${addLight(color.substring(4, 6), amount)}`;
        }

        const themeOverrides = computed(() => {
            const appTheme = settingStore.appTheme
            const lightenStr = lighten(settingStore.appTheme, 6)
            return {
                common: {
                    primaryColor: appTheme,
                    primaryColorHover: lightenStr,
                    primaryColorPressed: lightenStr,
                },
                LoadingBar: {
                    colorLoading: appTheme,
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
