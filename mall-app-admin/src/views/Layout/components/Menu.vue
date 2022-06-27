<template>
  <div class="layout-aside-container">
        <a-menu
        :default-selected-keys="[defaultSelectKey]"
        :default-open-keys="[defaultOpenKey]"
        mode="inline"
        theme="dark"
        :inline-collapsed="collapsed"
        :inlineIndent="20"
        >
            <template v-for="route in menuRoutes">
                <a-sub-menu :key="route.name" v-if="!route.meta.hidden">
                    <span slot="title">
                        <a-icon :type="route.meta.icon" />
                        <span>{{ route.meta.title }}</span>
                    </span>
                    <template v-for="child in route.children">
                        <a-menu-item :key="child.name" v-if="!child.meta.hidden">
                            <Router-link :to="{ name: child.name }">
                                <a-icon :type="child.meta.icon" />
                                {{ child.meta.title }}
                            </Router-link>
                        </a-menu-item>
                    </template>
                </a-sub-menu>
            </template>
            
        </a-menu>
    </div>
</template>

<script>
import { mapState } from "vuex";
export default {
    data(){
        return {
            menuRoutes: [],
            defaultSelectKey: this.$router.currentRoute.matched[1] ? this.$router.currentRoute.matched[1].name : '',
            defaultOpenKey: this.$router.currentRoute.matched[0] ? this.$router.currentRoute.matched[0].name : ''
        }
    },
    created(){
        this.menuRoutes = router.options.routes;
    },
    computed: {
        ...mapState("loginUser", ["collapsed"]),
    },
}
</script>

<style lang="less" scoped>
.layout-aside-container{
    width: 180px;
    height: 100%;
    position: fixed;
    .ant-menu{
        height: 100%;
    }
}
</style>