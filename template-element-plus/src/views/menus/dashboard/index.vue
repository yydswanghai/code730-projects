<template>
    <div class="dashboard-container">
        <el-calendar v-model="value" />
        <el-calendar v-model="value" />
        <el-calendar v-model="value" />
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const value = ref(new Date())
</script>
<style lang="scss" scoped>

</style>