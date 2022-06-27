<template>
  <div class="message-container" ref="messageContainer">
    <MessageArea
      title="留言板"
      :subTitle="`(${data.total})`"
      :isListLoading="isLoading"
      :list="data.rows"
      @submit="handleSubmit"
    />
  </div>
</template>

<script>
import MessageArea from "@/components/MessageArea";
import fetchData from "@/mixins/fetchData.js";
import * as msgApi from "@/api/message.js";
import mainScroll from "@/mixins/mainScroll.js"

export default {
  components: {
    MessageArea,
  },
  data(){
    return {
      page: 1,
      limit: 10,
    }
  },
  mixins: [fetchData({total: 0, rows: []}), mainScroll("messageContainer")],
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
    async fetchData(){
      return await msgApi.getMessage(this.page, this.limit)
    },
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
        const resp = await msgApi.postMessage(formData)
        this.data.rows.unshift(resp);
        this.data.total++;
        callback("感谢您的留言!");// 告诉子组件，我这边处理完了
    }
  },
}
</script>

<style scoped>
.message-container {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  padding: 25px 0;
  box-sizing: border-box;
  scroll-behavior: smooth;
}
.message-area-container {
  width: 700px;
  margin: 0 auto;
}
</style>