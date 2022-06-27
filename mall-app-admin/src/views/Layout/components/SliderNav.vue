<template>
    <div class="slider-nav-container">
        <div class="main-header">
            <a-button type="primary" class="crumb" @click="toggleCollapsed">
                <a-icon :type="collapsed ? 'menu-unfold' : 'menu-fold'" />
            </a-button> 
            <div class="breadcrumb">
                <a-breadcrumb v-if="currentRoute.length > 1">
                    <a-breadcrumb-item>
                        {{ currentRoute[0] ? currentRoute[0].meta.title : '' }}
                    </a-breadcrumb-item>
                    <a-breadcrumb-item>
                        <Router-link :to="{ name: currentRoute[1].name }">
                            {{ currentRoute[1] ? currentRoute[1].meta.title : '' }}
                        </Router-link>
                    </a-breadcrumb-item>
                </a-breadcrumb>
            </div>
            <div class="user-info">
                <a-dropdown :trigger="['click']">
                    <a class="ant-dropdown-link" @click="e => e.preventDefault()">
                        欢迎 {{ user ? user.username : "" }} <a-icon type="down" />
                    </a>
                    <a-menu slot="overlay">
                        <a-menu-item key="0" @click="handleLoginOut">
                            退出
                        </a-menu-item>
                    </a-menu>
                </a-dropdown>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
export default {
    data(){
        return {
            currentRoute: this.$router.currentRoute.matched,
        }
    },
    computed: {
        ...mapState("loginUser", ["user", "collapsed"]),
    },
    methods: {
        toggleCollapsed() {
            this.$store.dispatch("loginUser/changeCollapsed");
        },
        // 退出登录 
        async handleLoginOut(){
            await this.$store.dispatch("loginUser/logout");
            this.$router.push("/login");
        }
    },
    watch: {
        $route(){
            this.currentRoute = this.$router.currentRoute.matched;
        }
    }
}
</script>

<style scoped lang="less">
@import "~@/plugins/antd-variables.less";

.slider-nav-container{
    .main-header{
        height: 50px;
        line-height: 50px;
        border-bottom: 1px solid @border-color-base;
        text-align: left;
        position: relative;
        z-index: 100;
        padding-left: 10px;
        padding-right: 20px;
    }
    .breadcrumb{
        display: inline-block;
        margin-left: 20px;
    }
    .user-info{
        position: absolute;
        right: 25px;
        top: 50%;
        transform: translateY(-50%);
        .ant-dropdown-link{
            color: @text-color;
        }
    }
}
</style>