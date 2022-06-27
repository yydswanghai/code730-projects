<template>
  <div class="test-container">
    <Layout>
        <template #left>
            <div class="test-left">
                左边栏区域，宽度适应内容，溢出隐藏
            </div>
        </template>
        <template>
            <div class="test-main">
                主区域，宽度占满剩余空间，溢出隐藏
            </div>
        </template>
        <template #right>
             <div class="test-right">
                右边栏区域，宽度适应内容，溢出隐藏
            </div>
        </template>
    </Layout>
  </div>
</template>

<script>
import "@/styles/global.less";
import Layout from "./"
export default {
  components: {
    Layout,
  },
}
</script>
<style lang="less" scoped>
    .test-container{
        width: 60%;
        height: 600px;
        border: 2px solid;
        margin: 0 auto;
        .test-left{
            width: 200px;
            height: 100%;
            background: lightcoral;
        }
        .test-main{
            width: 100%;
            height: 100%;
            background: lightgreen;
        }
        .test-right{
            width: 150px;
            height: 100%;
            background: lightblue;
        }
    }
</style>