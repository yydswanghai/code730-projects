<template>
    <Layout>
        <div ref="mainContainer" class="main-container" v-loading="isLoading">
            <BlogDetail :blog="data" v-if="data" />
            <BlogComment v-if="!isLoading" />
        </div>
        <template #right>
            <div class="right-container" v-loading="isLoading">
                <BlogTOC :toc="data.toc" v-if="data" />
            </div>
        </template>
    </Layout>
</template>

<script>
import fetchData from "@/mixins/fetchData.js";
import { getBlog } from "@/api/blog.js"
import Layout from "@/components/Layout";
import BlogDetail from "./components/BlogDetail";
import BlogTOC from "./components/BlogTOC";
import BlogComment from "./components/BlogComment";
import mainScroll from "@/mixins/mainScroll.js";
import { titleController } from "@/utils"

export default {
    components: {
        Layout,
        BlogDetail,
        BlogTOC,
        BlogComment,
    },
    mixins: [fetchData(null), mainScroll("mainContainer")],
    methods: {
        async fetchData(){
            let resp = await getBlog(this.$route.params.id);
            if(!resp){
                // 文章不存在
                this.$router.push("/404");
                return;
            }
            titleController.setRouteTitle(resp.title);
            return resp
        },
    },
    updated(){
        // 刷新页面，跳转到之前的位置
        const hash = location.hash;
        location.hash = "";
        setTimeout(() => {
            location.hash = hash;
        }, 50)
    }
}
</script>

<style scoped lang="less">
.main-container{
    overflow-y: scroll;
    overflow-x: hidden;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 20px;
    position: relative;
    scroll-behavior: smooth;
}
.right-container{
    overflow-y: scroll;
    overflow-x: hidden;
    width: 300px;
    height: 100%;
    box-sizing: border-box;
    position: relative;
    padding: 20px;
}
</style>