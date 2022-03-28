<template>
    <RouterView name="Header" />
    <RouterView />
</template>

<script>
import { generateRoutes } from '@/store/usePermission.js';
export default {
    name: 'App',
    setup(){
        generateRoutes()
    }
}
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
</script>
<style lang="scss" scoped>

</style>
