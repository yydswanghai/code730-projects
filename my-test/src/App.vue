<script setup lang="ts">
import Children from "./components/Children.vue"
import { ref } from "vue";
const collapsed = ref(false)
function changeCollapsed() {
  collapsed.value = !collapsed.value
}
const handleCommand = (command: string | number | object) => {
  console.log(`click on item ${command}`)
}
function handleSelect(key: string, keypath: string) {
  console.log(key, keypath)
}
</script>

<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <el-dropdown @command="handleCommand" trigger="click">
    <span class="el-dropdown-link">
      Dropdown List
    </span>
    <template #dropdown>
      
    </template>
  </el-dropdown>
  <div>
    collapsed: {{ collapsed }}
  </div>
  <Children :change="changeCollapsed" :collapsed="collapsed" />
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