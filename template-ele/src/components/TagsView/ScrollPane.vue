<template>
    <ElScrollbar
        class="scroll-pane-container"
        ref="scrollContainer"
    >
        <slot />
    </ElScrollbar>
</template>

<script>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
export default {
    name: 'ScrollPane',
    setup(props, ctx){
        const scrollContainer = ref(null)
        let scrollWrapper = null
        const emitScroll = () => {
            ctx.emit('scroll')
        }
        onMounted(() => {
            scrollWrapper = computed(() => scrollContainer.value.wrap$)
            scrollWrapper.value.addEventListener('scroll', emitScroll, true)
        })
        onBeforeUnmount(() => {
            scrollWrapper.value.removeEventListener('scroll', emitScroll)
        })
        return {
            scrollContainer,
        }
    },
}

</script>
<style lang="scss">
.scroll-pane-container{
    white-space: nowrap;
    position: relative;
    overflow: hidden;
    width: 100%;
    .el-scrollbar__bar {
        bottom: 0px;
    }
    .el-scrollbar__wrap {
        height: 49px;
    }
}
</style>