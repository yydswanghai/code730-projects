<template>
    <RouterView>
        <template #default="{ Component, route }">
            <transition :name="getTransitionName" mode="out-in" appear>
                <keep-alive v-if="keepAliveComponents" :include="keepAliveComponents">
                <component :is="Component" :key="route.fullPath" />
                </keep-alive>
                <component v-else :is="Component" :key="route.fullPath" />
            </transition>
        </template>
    </RouterView>
</template>

<script>
import { useProjectSettingStore } from '@/store/modules/projectSetting'
import { useAsyncRouteStore } from '@/store/modules/asyncRoute';
import { computed, watch } from 'vue'

export default {
    name: 'Main',
    setup(){
        const projectSettingStore = useProjectSettingStore()
        const asyncRouteStore = useAsyncRouteStore()
        const { isPageAnimate, pageAnimateType } = projectSettingStore
        const keepAliveComponents = computed(() => asyncRouteStore.keepAliveComponents)
        const getTransitionName = computed(() => {
            return isPageAnimate ? pageAnimateType : ''
        })
        watch(() => projectSettingStore.pageAnimateType, (val) => {
            console.log(val);
        })
        watch(() => projectSettingStore.isPageAnimate, (val) => {
            console.log(val);
        })
        return {
            keepAliveComponents,
            getTransitionName
        }
    }
}

</script>
<style lang="less" scoped></style>