<template>
  <div id="app">
    <Router-view />
  </div>
</template>

<script>
export default {
  name: "app",
};
</script>

<style lang="less" scoped>
#app{
  width: 100%;
  height: 100%;
  background-image: url("~@/assets/bg.jpg");
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
