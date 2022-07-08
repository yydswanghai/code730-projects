<template>
  <el-config-provider namespace="ep">
      <Layout />
      <el-button>dadad</el-button>
      <el-button type="primary">dadad</el-button>
      <el-button type="info">dadad</el-button>
      <el-button type="warning">dadad</el-button>
      <el-button type="danger" @click="toggleDark()">dadad</el-button>
  </el-config-provider>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import { toggleDark } from "@/composables/"
import Layout from "@/Layout/index.vue"

export default defineComponent({
  components: {
    Layout,
  },
  setup(){
    return {
      toggleDark
    }
  }
})
</script>