<template>
    <el-breadcrumb v-if="crumbsSetting.show" separator="/" class="breadcrumb">
        <transition-group name="page">
            <template v-for="item in breadcrumbList" :key="item.name + nanoid()">
                <el-breadcrumb-item v-if="item.meta.title" :to="{ name: item.name }">
                    <component v-if="crumbsSetting.showIcon && item.meta.icon" :is="item.meta.icon" />
                    <span>{{ item.meta.title }}</span>
                </el-breadcrumb-item>
            </template>
        </transition-group>
    </el-breadcrumb>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useProjectSettingStore } from '@/store/modules/projectSetting'
import { useRoute, useRouter } from 'vue-router'
import { nanoid } from 'nanoid'

export default defineComponent({
    name: 'Breadcrumb',
    setup(){
        const $route = useRoute();
        const $router = useRouter();
        const settingStore = useProjectSettingStore();
        /* 生产面包屑 */
        function generator(routerMap: any[]) {
            return routerMap.map(it => {
                const currentMenu = {
                    ...it,
                }
                // 是否有子菜单，并递归处理
                if(it.children && it.children.length > 0){
                    currentMenu.children = generator(it.children);
                }
                return currentMenu;
            })
        }
        /* 当前面包屑数组 */
        const breadcrumbList = computed(() => {
            return generator($route.matched);
        });
        /* 下拉选择对应的面包屑 */
        function dropdownSelect(key: string) {
            $router.push({ name: key });
        }
        return {
            crumbsSetting: computed(() => settingStore.crumbsSetting),
            breadcrumbList,
            dropdownSelect,
            nanoid,
        }
    }
})
</script>
<style lang="scss" scoped>
.breadcrumb{
    display: flex;
    padding: 0 12px;
    /* breadcrumb transition */
    .page-enter-active,
    .page-leave-active {
        transition: all .5s;
    }
    .page-enter,
    .page-leave-active {
        opacity: 0;
        transform: translateX(20px);
    }
    .page-move {
        transition: all .5s;
    }
    .page-leave-active {
        position: absolute;
    }
    :deep(.ep-breadcrumb__inner){
        display: flex;
        align-items: center;
        span{
            margin-left: 2px;
        }
    }
}
</style>