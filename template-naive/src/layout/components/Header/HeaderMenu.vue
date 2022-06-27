<template>
    <div class="header-menu">
        <Logo v-if="navMode === 'horizontal'" :collapsed="collapsed" class="logo-h" />
        <AsideMenu
            mode="horizontal"
            v-model:collapsed="collapsed"
            v-model:location="getMenuLocation"
            :inverted="inverted"
        />
    </div>
</template>

<script>
import { computed } from 'vue'

import AsideMenu from '../Menu/index.vue'
import Logo from '../Logo/index.vue'
export default {
    name: 'HeaderMenu',
    components: {
        AsideMenu,
        Logo,
    },
    props: {
        collapsed: Boolean,
        inverted: Boolean,
        navMode: String,
    },
    setup(){
        return {
            getMenuLocation: computed(() => 'header'),
        }
    }
}

</script>
<style lang="less" scoped>
.header-menu{
    display: flex;
    align-items: center;
    .logo-h{
        padding-left: 10px;
    }
}
</style>