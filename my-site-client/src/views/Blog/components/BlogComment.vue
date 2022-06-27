<template>
  <div class="blog-comment-container">
    <MessageArea 
        title="评论列表" 
        :subTitle="(`${data.total}`)" 
        :list="data.rows" 
        :isListLoading="isLoading" 
        @submit="handleSubmit"
    />
  </div>
</template>

<script>
import MessageArea from "@/components/MessageArea";
import fetchData from "@/mixins/fetchData.js";
import { getComments, postComment } from "@/api/blog.js"
export default {
    mixins: [fetchData({total: 0, rows: []})],
    components: {
        MessageArea,
    },
    data(){
        return {
            page: 1,
            limit: 10
        };
    },
    created(){
        this.$bus.$on("mainScroll", this.handleScroll);
    },
    destroyed(){
        this.$bus.$off("mainScroll", this.handleScroll);
    },
    computed: {
        // 是否加载更多评论，如果当前 this.data.rows评论数 小于总数 this.data.total 就加载
        hasMore(){
            return this.data.rows.length < this.data.total;
        }
    },
    methods: {
        handleScroll(dom){
            // console.log(dom.scrollTop, dom.clientHeight, dom.scrollHeight);
            if(this.isLoading || !dom){
                // 目前正在加载更多
                return;
            }
            const dec = Math.abs(dom.scrollTop + dom.clientHeight - dom.scrollHeight);
            const range = 100;
            if(dec <= range){
                this.fetchMore();
            }
        },
        async fetchData(){
            return await getComments(this.$route.params.id, this.page, this.limit)
        },
        // 加载下一页
        async fetchMore(){
            if(!this.hasMore){
                // 没有更多啦
                return;
            }
            this.isLoading = true;
            this.page++;
            const resp = await this.fetchData();// 重新获取下一页数据
            this.data.total = resp.total;
            this.data.rows = this.data.rows.concat(resp.rows);
            this.isLoading = false;
        },
        async handleSubmit(formData, callback){
            const resp = await postComment({
                blogId: this.$route.params.id,
                ...formData
            })
            this.data.rows.unshift(resp);
            this.data.total++;
            callback("评论成功!");// 告诉子组件，我这边处理完了
        }
    }
};
</script>

<style scoped lang="less">
.test-container {
    margin: 30px 0;
}
</style>