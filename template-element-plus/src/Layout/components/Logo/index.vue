<template>
    <div class="logo">
        <el-icon :size="32" class="icon" :class="{ 'margin-right': !collapsed }">
            <AsideLogo />
        </el-icon>
        <h2 v-show="!collapsed">vueElementPlus</h2>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AsideLogo from '@/assets/images/logo/logo-2.svg?component'
export default defineComponent({
    name: 'Logo',
    props: {
        collapsed: Boolean
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
    .icon{
        width: auto;
        height: 2rem;
        &.margin-right{
            margin-right: 0.5rem;
        }
    }
    h2{
        margin-bottom: 0px;
        font-size: 16px;
        color: #FFF;
    }
}
</style>