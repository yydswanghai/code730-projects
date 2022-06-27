<template>
  <div>
    <Pager 
        :current="current" 
        :total="total" 
        @pageChange="handlePageChange($event)" 
    />
  </div>
</template>

<script>
// https://cli.vuejs.org/zh/guide/prototyping.html
// 当前文件夹下 webpack会默认去找index文件 所以这里路径可以写 "./"
import Pager from "./"
export default {
  components: {
    Pager,
  },
  data() {
    return {
      current: 5,
      total: 302
    };
  },
  methods: {
    handlePageChange(newPage){
      this.current = newPage;
      console.log("加载当前页数据");
    }
  }
}
</script>
<style scoped>
</style>