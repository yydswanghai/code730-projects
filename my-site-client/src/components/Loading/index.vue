<template>
    <img class="loading-container" :src="loadingUrl" alt="" />
</template>
<script>
import loadingUrl from '@/assets/loading.svg';
export default {
   data(){
       return{
           loadingUrl,
       }
   }
}
</script>

<style lang="less" scoped>
    @import "~@/styles/mixin.less";
    .loading-container{
        .self-center();
    }
</style>