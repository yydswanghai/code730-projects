<template>
  <Layout>
    <BlogList />
    <template #right>
      <BlogCategory />
    </template>
  </Layout>
</template>

<script>
import Layout from "@/components/Layout";
import BlogList from "./components/BlogList";
import BlogCategory from "./components/BlogCategory";
export default {
  components: {
    Layout,
    BlogList,
    BlogCategory,
  },
  created() {
    
  },
};
</script>

<style lang="less" scoped>
</style>