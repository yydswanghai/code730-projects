<template>
  <div class="test-container">
    <SiteAside />
  </div>
</template>

<script>
import "@/styles/global.less";
import SiteAside from "./"
export default {
  components: {
    SiteAside,
  },
}
</script>
<style lang="less" scoped>
    .test-container{
      width: 250px;
      height: 600px;
      border: 2px solid;
      margin: 0 auto;
    }
</style>