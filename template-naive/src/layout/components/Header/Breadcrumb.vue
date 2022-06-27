<template>
    <NBreadcrumb v-if="crumbsSetting.show">
        <template v-for="routeItem in breadcrumbList" :key="routeItem.name + nanoid()">
            <NBreadcrumbItem>
                <NDropdown
                    v-if="routeItem.children.length"
                    :options="routeItem.children"
                    @select="dropdownSelect"
                    >
                    <span class="link-text">
                        <component
                            v-if="crumbsSetting.showIcon && routeItem.meta.icon"
                            :is="routeItem.meta.icon"
                        />
                        {{ routeItem.meta.title }}
                    </span>
                </NDropdown>
                <span v-else class="link-text">
                    <component
                        v-if="crumbsSetting.showIcon && routeItem.meta.icon"
                        :is="routeItem.meta.icon"
                    />
                    {{ routeItem.meta.title }}
                </span>
            </NBreadcrumbItem>
        </template>
    </NBreadcrumb>
</template>

<script>
import { useProjectSettingStore } from '@/store/modules/projectSetting'
import { useRoute, useRouter } from 'vue-router'
import { computed } from 'vue'
import { nanoid } from 'nanoid'

export default {
    name: 'Breadcrumb',
    setup(){
        const $route = useRoute()
        const $router = useRouter()
        const settingStore = useProjectSettingStore()

        // 生成面包屑
        function generator(routerMap) {
            return routerMap.map(it => {
                const currentMenu = {
                    ...it,
                    label: it.meta.title,
                    key: it.name,
                    disabled: it.path === '/',
                }
                // 是否有子菜单，并递归处理
                if(it.children && it.children.length > 0){
                    currentMenu.children = generator(it.children)
                }
                return currentMenu
            })
        }
        // 当前面包屑数组
        const breadcrumbList = computed(() => {
            return generator($route.matched)
        })
        // 下拉选择对应的面包屑
        function dropdownSelect(key) {
            $router.push({ name: key })
        }

        return {
            crumbsSetting: computed(() => settingStore.crumbsSetting),
            breadcrumbList,
            dropdownSelect,
            nanoid,
        }
    }
}

</script>
<style lang="less" scoped>

</style>