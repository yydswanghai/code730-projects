<template>
    <el-breadcrumb v-if="crumbsSetting.show" separator="/" class="breadcrumb">
            <template v-for="item in breadcrumbList" :key="item.name + nanoid()">
                <el-breadcrumb-item v-if="item.meta.title">
                    <el-dropdown v-if="item.children.length">
                        <div class="link">
                            <component v-if="crumbsSetting.showIcon && item.meta.icon" :is="item.meta.icon" class="i-icon" />
                            <span>{{ item.meta.title }}</span>
                        </div>
                        <template #dropdown>
                            <div class="i-dropdown-menu">
                                <div class="i-dropdown-menu-item"
                                    v-for="child in item.children"
                                    :key="item.name + nanoid()"
                                    @click="dropdownSelect(child.name)">
                                    {{ child.meta.title }}
                                </div>
                            </div>
                        </template>
                    </el-dropdown>
                    <div class="link light" v-else>
                        <component v-if="crumbsSetting.showIcon && item.meta.icon" :is="item.meta.icon" class="i-icon" />
                        <span>{{ item.meta.title }}</span>
                    </div>
                </el-breadcrumb-item>
            </template>
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
@import "@/styles/var.scss";
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
    .link{
        display: flex;
        align-items: center;
        .i-icon{
            font-size: 18px;
            color: var(--i-head-primary-color);
        }
        span{
            margin-left: 2px;
            color: var(--i-head-primary-color);
        }
    }
}
</style>