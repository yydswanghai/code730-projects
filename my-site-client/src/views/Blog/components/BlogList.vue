<template>
  <div class="blog-list-container" ref="mainContainer" v-loading="isLoading">
    <ul>
      <li v-for="item in data.rows" :key="item.id">
        <div class="thumb" v-if="item.thumb">
          <Router-link :to="{
            name: 'BlogDetail',
            params: {
              id: item.id
            }
          }">
            <img v-lazy="item.thumb" :alt="item.title" :title="item.title" />
          </Router-link>
        </div>
        <div class="main">
          <Router-link :to="{
            name: 'BlogDetail',
            params: {
              id: item.id
            }
          }">
            <h2>{{ item.title }}</h2>
          </Router-link>
          <div class="aside">
            <span>日期：{{ formatDate(item.createDate) }}</span>
            <span>浏览：{{ item.scanNumber }}</span>
            <span>评论：{{ item.commentNumber }}</span>
            <Router-link :to="{
                name: 'CategoryBlog',
                params: {
                    categoryId: item.category.id
                }
            }">
                {{ item.category.name }}
            </Router-link>
          </div>
          <div class="desc">{{ item.description }}</div>
        </div>
      </li>
    </ul>
    <Empty v-if="data.rows.length === 0 && !isLoading"/>
    <!-- 分页放到这里 -->
    <Pager 
        v-if="data.total"
        :current="routeInfo.page" 
        :total="data.total" 
        :limit="routeInfo.limit" 
        :visibleNumber="10"
        @pageChange="handlerPageChange"
         />
  </div>
</template>
<script>
import Pager from "@/components/Pager";
import fetchData from "@/mixins/fetchData.js";
import { getBlogs } from "@/api/blog.js";
import { formatDate } from "@/utils";
import mainScroll from "@/mixins/mainScroll.js";
import Empty from "@/components/Empty";

export default {
    mixins: [fetchData({total: 0, rows: []}), mainScroll("mainContainer")],// 博客数据为对象，所以这里传递一个{}
    components: {
        Pager,
        Empty,
    },
    computed: {
        routeInfo(){// 获取路由信息
            const categoryId = +this.$route.params.categoryId || -1;
            const page = +this.$route.query.page || 1;
            const limit = +this.$route.query.limit || 10;
            return {
                categoryId,
                page,
                limit
            }
        }
    },
    methods: {
        formatDate,// 向组件注入自己定义的工具方法
        async fetchData(){
            return await getBlogs(this.routeInfo.page, this.routeInfo.limit, this.routeInfo.categoryId);
        },
        handlerPageChange(newPage){
            const query = {
                page: newPage,
                limit: this.routeInfo.limit
            }
            // 跳转到 当前的分类id  当前的页容量  newPage的页码
            if(this.routeInfo.categoryId === -1){
                // 当前没有分类 /article?page=${newPage}&limit=${this.routeInfo.limit}
                this.$router.push({
                    name: "Blog",
                    query
                })
            }else{
                // /article/cate/${this.routeInfo.categoryId}?page=${newPage}&limit=${this.routeInfo.limit}
                this.$router.push({
                    name: "CategoryBlog",
                    query,
                    params: {
                        categoryId: this.routeInfo.categoryId
                    }
                })
            }
        },
    },
    watch: {
        async $route(){
            this.isLoading = true;
            // 点击分页 滚动高度为0
            this.$refs.mainContainer.scrollTop = 0;
            this.data = await this.fetchData();
            this.isLoading = false;
        }
    }
}
</script>

<style scoped lang="less">
@import "~@/styles/var.less";
.blog-list-container {
  line-height: 1.7;
  position: relative;
  padding: 20px;
  overflow-y: auto;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  scroll-behavior: smooth;/* 平滑滚动 */
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
}
li {
  display: flex;
  padding: 15px 0;
  border-bottom: 1px solid @gray;
  .thumb {
    flex: 0 0 auto;
    margin-right: 15px;
    img {
      display: block;
      max-width: 200px;
      border-radius: 5px;
    }
  }
  .main {
    flex: 1 1 auto;
    h2 {
      margin: 0;
    }
  }
  .aside {
    font-size: 12px;
    color: @gray;
    span {
      margin-right: 15px;
    }
  }
  .desc {
    margin: 15px 0;
    font-size: 14px;
  }
}
</style>