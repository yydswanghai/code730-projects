<template>
  <ul class="data-list-container">
      <li v-for="item in list" :key="item.id">
          <Avatar :url="item.avatar" :size="44" />
          <div class="data">
              <div class="nickname">{{ item.nickname }}</div>
              <div class="content">{{ item.content }}</div>
              <div class="time">{{ formatDate(item.createDate, true) }}</div>
          </div>
      </li>
  </ul>
</template>

<script>
import Avatar from "@/components/Avatar";
import { formatDate } from "@/utils";
export default {
    components: {
        Avatar,
    },
    props: {
        list: {
            type: Array,
            default: () => [],
        }
    },
    methods: {
        formatDate,
    }
}
</script>

<style scoped lang="less">
@import "~@/styles/var.less";
.data-list-container{
    list-style: none;
    margin: 0;
    padding: 0;
}
li{
    display: flex;
    border-bottom: 1px solid lighten(@gray, 20%);
    padding: 15px 0;
}
.avatar-container{
    margin-right: 15px;
}
.data{
    flex: 1 1 auto;// 压缩拉伸并且自适应
    position: relative;
    .nickname{
        color: darken(@success, 10%);
        margin-bottom: 10px;
    }
    .content{
        font-size: 14px;
    }
    .time{
        position: absolute;
        right: 0;
        top: 2px;
        font-size: 12px;
        color: @gray;
    }
}
</style>