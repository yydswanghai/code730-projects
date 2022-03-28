<template>
    <a v-if="isExternalLink" v-bind="$attrs" :href="to" target="_blank">
        <slot />
    </a>
    <RouterLink
        v-else
        v-bind="$props"
        custom
        v-slot="{ isActive, href, navigate }"
    >
        <a v-bind="$attrs" :href="href" @click="navigate" :class="isActive ? activeClass : inactiveClass">
            <slot />
        </a>
    </RouterLink>
</template>

<script>
// Detail: https://router.vuejs.org/zh/api/
import { RouterLink, useLink } from 'vue-router'
import { computed, toRefs } from 'vue'
export default {
    name: 'AppLink',
    props: {
        ...RouterLink.props,
        inactiveClass: String, // 不活跃的class
    },
    setup(props){
        // 跳转回调 目标地址 路由对象 是否被激活 是否精准激活
        const { navigate, href, route, isActive, isExactActive  } = useLink(
            toRefs(props)
        )
        const isExternalLink = computed(
            () => typeof props.to === 'string' && props.to.startsWith('http')
        )
        return {
            isExternalLink,
            href,
            navigate,
            route,
            isActive,
            isExactActive
        }
    }
}
</script>

<style>

</style>