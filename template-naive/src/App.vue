<template>
  <NConfigProvider
    :locale="zhCN"
    :date-locale="dateZhCN"
  >
    <AppProvider>
      <RouterView />
    </AppProvider>
  </NConfigProvider>
</template>

<script>
import { zhCN, dateZhCN, darkTheme } from 'naive-ui'
import AppProvider from '@/components/Application/index.vue'
export default {
    components: {
      AppProvider,
    },
    setup(){
        return {
          zhCN,
          dateZhCN,
          darkTheme,
        }
    }
}
</script>

<style lang="less">
  @import 'styles/index.less';
</style>
