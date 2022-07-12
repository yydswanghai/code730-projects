<script setup lang="ts">
import Children from "./components/Children.vue"
import { ref } from "vue";
const collapsed = ref(false)
function changeCollapsed() {
  collapsed.value = !collapsed.value
}
</script>

<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <div>
    collapsed: {{ collapsed }}
  </div>
  <Children :change="changeCollapsed" :collapsed="collapsed" />
</template>