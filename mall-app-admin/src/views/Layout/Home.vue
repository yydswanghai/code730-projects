<template>
    <div class="home-container">
        <Menu :key="key"/>
        <div class="main" :class="{ 'menu-unfold': collapsed }">
            <SliderNav />
            
            <Router-view />
        </div>
    </div>
</template>

<script>
import Menu from "./components/Menu.vue";
import SliderNav from "./components/SliderNav.vue";
import { mapState } from "vuex";
export default {
    components: {
        Menu,
        SliderNav,
    },
    computed: {
        ...mapState("loginUser", ["collapsed"])
    },
    data(){
        return {
            /* 为了让menu组件的数据变动 */
            key: new Date().getTime(),
        }
    },
    watch: {
        $route(){
            this.key = new Date().getTime();
        }
    }
}
</script>

<style lang="less" scoped>
.home-container{
    width: 100%;
    height: 100%;
    background: #f5f5f5;
    position: relative;
    display: flex;
}
.main{
    margin-left: 180px;
    transition: all 0.3s;
    width: 100%;
    overflow: hidden;
    &.menu-unfold{
        /* 菜单栏收缩时，控制面包屑一起跟着动 */
        margin-left: 80px;
    }
}
</style>