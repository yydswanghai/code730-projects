<template>
    <div>
        <router-view>
            <template #default="{ Component, route }">
                <transition :name="getTransitionName" mode="out-in" appear>
                    <keep-alive v-if="keepAliveComponents" :include="keepAliveComponents">
                        <component :is="Component" :key="route.fullPath" />
                    </keep-alive>
                    <component v-else :is="Component" :key="route.fullPath" />
                </transition>
            </template>
        </router-view>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useProjectSettingStore } from '@/store/modules/projectSetting'
import { useAsyncRouteStore } from '@/store/modules/asyncRoute'

export default defineComponent({
    name: 'Main',
    setup(){
        const settingStore = useProjectSettingStore();
        const asyncRouteStore = useAsyncRouteStore();
        /* 动画名称：不使用动画设置为 '' 就可以 */
        const getTransitionName = computed(() => {
            return settingStore.animateSetting.open ? settingStore.animateSetting.type : '';
        })
        const keepAliveComponents = computed(() => asyncRouteStore.keepAliveComponents);
        return {
            getTransitionName,
            keepAliveComponents,
        }
    }
})
</script>