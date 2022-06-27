<template>
    <div class="image-loader-container">
        <img v-if="!everythingDone" class="placeholder" :src="placeholder" alt="" />
        <img @load="handleLoad" :src="src" :style="{ opacity: originOpacity, transition: `${duration}ms` }" alt="" />
        <!--@load 图片自带的加载完成事件-->
    </div>
</template>
<script>
export default {
    props: {
        src: {
            type: String,
            required: true
        },
        placeholder: {
            type: String,
            required: true
        },
        duration: {
            type: Number,
            default: 500
        }
    },
    data(){
        return {
            originLoaded: false, // 原图是否加载完成
            everythingDone: false// 所有的事情执行完成以后
        }
    },
    computed: {
        originOpacity(){
            return this.originLoaded ? 1 : 0;
        }
    },
    methods: {
        handleLoad(){
            this.originLoaded = true;
            setTimeout(() => {
                this.everythingDone = true;
                this.$emit('load');
            }, this.duration);
            // console.log('原图加载完成!');
        }
    }
}
</script>

<style lang="less" scoped>
    @import "~@/styles/mixin.less";
    .image-loader-container{
        width: 100%;
        height: 100%;
        position: relative;
        overflow: hidden;
        img{
            .self-fill();
            object-fit: cover;
        }
        .placeholder{
            filter: blur(2vw);
        }
    }
</style>