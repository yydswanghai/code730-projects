<template>
  <el-config-provider namespace="ep">
      <router-view />
  </el-config-provider>
</template>

<script lang="ts">
import { defineComponent, provide, unref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
  setup(){
    const $route = useRoute();
    const $router = useRouter();
    /* 全局刷新 */
    provide('reload', () => {
      $router.push({ path: '/redirect' + unref($route).fullPath });
    });
    return {
    }
  }
})
</script>