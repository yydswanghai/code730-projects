<template>
  <el-config-provider namespace="el">
      <router-view />
  </el-config-provider>
</template>

<script lang="ts">
import { defineComponent, provide, unref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { toggleDark } from '@/composables/'
import { useProjectSettingStore } from '@/store/modules/projectSetting'

export default defineComponent({
  setup(){
    const $route = useRoute();
    const $router = useRouter();
    const settingStore = useProjectSettingStore();
    toggleDark(settingStore.themeSetting.isDark);// 初始化亮色主题
    /* 全局刷新 */
    provide('reload', () => {
      $router.push({ path: '/redirect' + unref($route).fullPath });
    });
    return {
    }
  }
})
</script>