<template>
    <NMenu
        :options="menus"
        :mode="mode"
        :inverted="inverted"
        :collapsed="collapsed"
        :collapsed-width="64"
        :collapsed-icon-size="20"
        :indent="24"
    />
</template>

<script>
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useProjectSettingStore } from '@/store/modules/projectSetting'
export default {
    name: 'Menu',
    props: {
        mode: {// 菜单模式
            type: String,
            default: 'vertical',
        },
        collapsed: Boolean,// 侧边栏菜单是否收起
        location: {//位置
            type: String,
            default: 'left',
        },
        inverted: Boolean,
        navMode: String,
    },
    setup(){
        const projectStore = useProjectSettingStore()
        const $route = useRoute()
        // 获取当前打开的子菜单
        const matched = $route.matched
        const openKeys = computed(() => {
            return matched && matched.length ? matched.map((it) => it.name) : []
        })
        const menus = ref([])

        return {
            menus,
            openKeys,
        }
    }
}

</script>
<style lang="scss" scoped>
    
</style>