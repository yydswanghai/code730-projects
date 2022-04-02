<template>
  <NConfigProvider
    :locale="zhCN"
    :date-locale="dateZhCN"
  >
    <RouterView />
  </NConfigProvider>
</template>

<script>
import { zhCN, dateZhCN, darkTheme } from 'naive-ui';
export default {
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
