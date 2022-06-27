<template>
    <div class="blog-category-container" v-loading="isLoading">
        <h2>文章分类</h2>
        <RightList :list="list" @select="handleSelect" />
    </div>
</template>

<script>
import RightList from "./RightList";
import fetchData from "@/mixins/fetchData.js";
import { getBlogCategories } from "@/api/blog.js";
export default {
    mixins: [fetchData([])],
    components: {
        RightList,
    },
    computed: {
        categoryId(){
            return +this.$route.params.categoryId || -1;
        },
        limit(){
            return +this.$route.query.limit || 10;
        },
        list(){
            // 总文章数量
            const totalArticleCount = this.data.reduce((a, b) => {
                return a + b.articleCount
            }, 0);
            const result = [
                { name: "全部", id: -1, articleCount: totalArticleCount },
                ...this.data,
            ];
            return result.map(it => ({
                ...it,
                isSelect: it.id === this.categoryId,
                aside: `${it.articleCount}篇`,
            }));
        }
    },
    methods: {
        async fetchData(){
            return await getBlogCategories();
        },
        handleSelect(item){
            const query = {
                page: 1,// 每次切换分类之后都默认为该分页下的第一页
                limit: this.limit
            }
            // 跳转到 当前的分类id  当前的页容量  newPage的页码
            if(item.id === -1){
                this.$router.push({
                    name: "Blog",
                    query
                })
            }else{
                this.$router.push({
                    name: "CategoryBlog",
                    query,
                    params: {
                        categoryId: item.id // 跳转到的新分类id为你点击的item对象里的id
                    }
                })
            }
        }
    },
}
</script>

<style scoped lang="less">
.blog-category-container {
  width: 300px;
  box-sizing: border-box;
  padding: 20px;
  position: relative;
  height: 100%;
  overflow-y: auto;
  h2 {
    font-weight: bold;
    letter-spacing: 2px;
    font-size: 1em;
    margin: 0;
  }
}
</style>