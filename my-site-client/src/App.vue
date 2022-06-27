<template>
  <div class="app-container">
    <Layout>
      <template #left>
        <div class="aside">
          <SiteAside />
        </div>
      </template>
      <template #default>
          <Router-view />
      </template>
    </Layout>
    <ToTop />
  </div>
</template>
<script>
import Layout from "./components/Layout";
import SiteAside from "./components/SiteAside";
import ToTop from "./components/ToTop";
export default {
  name: "App",// 如果组件没有在注册的时候指定名字，则使用该名字
  components: {
    Layout,
    SiteAside,
    ToTop,
  }
}
</script>
<style lang="less" scoped>
@import "~@/styles/mixin.less";
.app-container{
  .self-fill(fixed);
}
.aside{
  width: 250px;
  height: 100%;
}
</style>