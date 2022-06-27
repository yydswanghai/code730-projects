<template>
  <div class="test-container">
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
/**
 * avatar1、2、3 测试使用图片
 * 这里没有注册指令，所以会警告: Failed to resolve directive: loading
 */
import avatar1 from '@/assets/avatar/webp-1.webp';
import avatar2 from '@/assets/avatar/webp-2.webp';
import avatar3 from '@/assets/avatar/webp-3.webp';

import MessageArea from "./";
export default {
    components: {
        MessageArea,
    },
    data(){
        return {
            page: 1,
            limit: 10,
            data: {
                total: 180,
                rows: [
                    {
                        id: "001",
                        nickname: "标题1",
                        content: "文本内容1",
                        createDate: Date.now(),
                        avatar: avatar1
                    },
                     {
                        id: "002",
                        nickname: "标题2",
                        content: "文本内容2",
                        createDate: Date.now(),
                        avatar: avatar2
                    },
                     {
                        id: "003",
                        nickname: "标题3",
                        content: "文本内容3",
                        createDate: Date.now(),
                        avatar: avatar3
                    }
                ]
            },
            isLoading: false
        }
    },
    methods: {
        async handleSubmit(formData, callback){
            console.log(formData);
            callback();
            // const resp = await postComment({
            //     blogId: this.$route.params.id,
            //     ...formData
            // })
            // this.data.rows.unshift(resp);
            // this.data.total++;
            // callback("评论成功!");// 告诉子组件，我这边处理完了
        }
    }
};
</script>

<style scoped>
.test-container {
    margin: 30px 0;
}
</style>