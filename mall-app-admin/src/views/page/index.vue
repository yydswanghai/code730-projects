<template>
  <div class="index-container">
      <Card />

      <Charts />
  </div>
</template>

<script>
import Card from "@/components/Card"
import Charts from "@/components/Charts"
export default {
  components: {
    Card,
    Charts,
  },
}
</script>

<style lang="less" scoped>
.index-container{
  height: 100%;
  overflow: hidden;
  overflow-y: scroll;
}
</style>