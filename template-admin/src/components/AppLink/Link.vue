<template>
    <component :is="type" v-bind="linkProps(to)">
        <slot />
    </component>
</template>

<script>
// 暂没用 改用AppLink/index.vue
import { isExternal } from '@/util/validate'
import { computed } from 'vue';
export default {
    props: {
        to: {
            type: String,
            required: true
        }
    },
    setup(props){
        // 判断是否为外部链接
        const isExternalRef = computed(() => isExternal(props.to))
        const typeRef = computed(() => {
            if(isExternalRef.value) return 'a'
            return 'router-link'
        })
        const linkProps = (to) => {
            if(isExternalRef.value){
                return {
                    href: to,
                    target: '_blank',
                    rel: 'noopener'
                }
            }
            return {
                to: to
            }
        }
        return {
            isExternal: isExternalRef,
            type: typeRef,
            linkProps
        }
    }
}

</script>
<style lang="scss" scoped>
    
</style>