<template>
    <div class="logo">
        <img src="~@/assets/images/logo/logo-2.svg" :class="{ 'margin-right': !collapsed }" />
        <h2 v-show="!collapsed">vueElementPlus</h2>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
    name: "Logo",
    props: {
        collapsed: Boolean
    }
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
    img{
        width: auto;
        height: 2rem;
        &.margin-right{
            margin-right: 0.5rem;
        }
    }
    h2{
        margin-bottom: 0px;
    }
}
</style>