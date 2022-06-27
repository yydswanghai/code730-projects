<template>
  <div class="site-aside-container">
      <template v-if="data">
            <Avatar :url="data.avatar"/>
            <div class="title">{{ data.siteTitle }}</div>
      </template>
      <Menu />
      <Contact v-if="data" />
      <p v-if="data" class="footer">
          {{ data.icp }}
      </p>
  </div>
</template>

<script>
import Avatar from "@/components/Avatar";
import Menu from "./Menu";
import Contact from "./Contact";
import {mapState} from "vuex";
export default {
    components: {
        Avatar,
        Menu,
        Contact,
    },
    computed: mapState("setting", ["data"]),
}
</script>

<style lang="less" scoped>
    @import "~@/styles/var.less";
    .site-aside-container{
        width: 100%;
        height: 100%;
        background: @dark;
        padding: 20px 0;
        box-sizing: border-box;
        overflow-x: hidden;
        overflow-y: auto;
    }
    .avatar-container{
        margin: 10px auto;
        display: block;
    }
    .footer{
        text-align: center;
        font-size: 12px;
    }
    .title{
        text-align: center;
        color: #fff;
        font-size: 1.2em;
    }
</style>