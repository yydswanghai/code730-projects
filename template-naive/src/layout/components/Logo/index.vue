<template>
    <div class="logo">
        <img src="~@/assets/images/logo/logo-2.svg" :class="{ 'margin-right': !collapsed }" />
        <h2 v-show="!collapsed">vueNaiveAdmin</h2>
    </div>
</template>

<script>
export default {
    name: 'Logo',
    props: {
        collapsed: Boolean
    }
}
</script>
<style lang="less" scoped>
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