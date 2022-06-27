<template>
  <div class="test-container">
    <Menu />
  </div>
</template>

<script>
import "@/styles/global.less";
import Menu from "./"
export default {
  components: {
    Menu,
  },
}
</script>
<style lang="less" scoped>
    .test-container{
      width: 400px;
      height: 600px;
      border: 2px solid red;
      background: #000;
      margin: 0 auto;
    }
</style>