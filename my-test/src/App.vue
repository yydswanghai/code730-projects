<script setup lang="ts">
import Children from "./components/Children.vue"
import { ref } from "vue";
const collapsed = ref(false)
function changeCollapsed() {
  collapsed.value = !collapsed.value
}
const show = ref(false);
</script>

<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <div>
    collapsed: {{ collapsed }}
  </div>
  <Children :change="changeCollapsed" :collapsed="collapsed" />
  <el-button @click="show = !show">切换</el-button>
  <el-menu
    :default-active="'1'"
    class="el-menu-demo"
    mode="horizontal"
    :unique-opened="false"
    :collapse="false"
  >
    <template v-if="show">
      <el-menu-item index="1">Processing Center</el-menu-item>
      <el-sub-menu index="2">
        <template #title>Workspace</template>
        <el-menu-item index="2-1">item one</el-menu-item>
        <el-menu-item index="2-2">item two</el-menu-item>
        <el-menu-item index="2-3">item three</el-menu-item>
        <el-sub-menu index="2-4">
          <template #title>item four</template>
          <el-menu-item index="2-4-1">item one</el-menu-item>
          <el-menu-item index="2-4-2">item two</el-menu-item>
          <el-menu-item index="2-4-3">item three</el-menu-item>
        </el-sub-menu>
      </el-sub-menu>
      <el-menu-item index="3" disabled>Info</el-menu-item>
      <el-menu-item index="4">Orders</el-menu-item>
    </template>
  </el-menu>
</template>
<style lang="scss">
.el-dropdown-menu-item{
    display: flex;
    align-items: center;
    white-space: nowrap;
    list-style: none;
    line-height: 22px;
    padding: 5px 16px;
    margin: 0;
    font-size: var(--el-font-size-base);
    color: var(--el-text-color-regular);
    cursor: pointer;
    outline: none;
}
</style>