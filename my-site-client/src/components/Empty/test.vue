<template>
  <div class="test-container">
    <Empty />
  </div>
</template>

<script>
import Empty from "./"
export default {
  components: {
    Empty,
  },
}
</script>
<style lang="less" scoped>
  .test-container{
    width: 500px;
    height: 400px;
    margin: 0 auto;
    border: 2px solid #999;
    position: relative;
  }
</style>