<template>
    <div class="logo">
        <el-icon :size="32" class="icon" :class="{ 'margin-right': !collapsed }">
            <AsideLogo />
        </el-icon>
        <div class="title" v-show="!collapsed">vueElementPlus</div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Logo2 as AsideLogo } from '@/icons/'
export default defineComponent({
    name: 'Logo',
    props: {
        collapsed: Boolean,
    },
    components: {
        AsideLogo
    },
})
</script>
<style lang="scss" scoped>
.logo{
    height: 4rem;
    line-height: 1.5;
    white-space: normal;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--i-menu-bg-color);
    .icon{
        width: auto;
        height: 2rem;
        &.margin-right{
            margin-right: 0.5rem;
        }
    }
    .title{
        margin-bottom: 0px;
        font-size: 16px;
        color: var(--i-menu-primary-color);
    }
}
</style>