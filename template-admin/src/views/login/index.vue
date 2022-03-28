<template>
    <div>登录</div>
    <p>{{ $route.params.id }}</p>
    <h3 v-for="(item, i) in [1,2,3,4,5,6,7,8,9,10]" :key="i">aaaa</h3>
</template>

<script>
export default {
    name: 'Login'
}

</script>
<style scoped>
h3{
    height: 200px;
}
</style>