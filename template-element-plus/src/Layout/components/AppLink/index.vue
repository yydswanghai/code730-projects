<template>
    <a v-if="isExternalLink" v-bind="$attrs" :href="to" target="_blank">
        <slot />
    </a>
    <router-link
        v-else
        v-bind="$props"
        custom
        v-slot="{ isActive, href, navigate }"
    >
        <a v-bind="$attrs" :href="href" @click="navigate" :class="isActive ? activeClass : inactiveClass">
            <slot />
        </a>
    </router-link>
</template>

<script lang="ts">
// Detail: https://router.vuejs.org/zh/api/
import { RouterLink } from 'vue-router'
import { computed } from 'vue'
export default {
    name: 'AppLink',
    props: {
        // @ts-ignore
        ...RouterLink.props,
        inactiveClass: String, // 不活跃的class
    },
    setup(props: { to: any }){
        const isExternalLink = computed(
            () => typeof props.to === 'string' && props.to.startsWith('http')
        )
        return {
            isExternalLink,
        }
    }
}
</script>