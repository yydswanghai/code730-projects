<template>
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
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useProjectSettingStore } from '@/store/modules/projectSetting'
export default defineComponent({
    name: 'Main',
    setup(){
        const settingStore = useProjectSettingStore();
        const getTransitionName = computed(() => {// 动画名称：不使用动画设置为 '' 就可以
            return settingStore.isPageAnimate ? settingStore.pageAnimateType : ''
        })
        // todo
        const keepAliveComponents = ['/', '404'];
        return {
            getTransitionName,
            keepAliveComponents,
        }
    }
})
</script>