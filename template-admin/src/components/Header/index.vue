<template>
    <ElHeader class="header-container" ref="headerContainer">
        <div class="header_content" @click="$router.push('/')">
            <div class="header_content-avatar">
                <SvgIcon icon-name="user" />
            </div>
            <div class="header_content-title">
                {{ settingsStore.title }}
            </div>
            <slot name="center"></slot>
            <slot name="right"></slot>
        </div>
        <slot name="other"></slot>
    </ElHeader>
</template>

<script>
import SvgIcon from '../SvgIcon/index.vue';
import { onMounted, ref } from 'vue';
import mitt from '@/util/mitt';
import { settingsStore } from '@/store/useSettings'
export default {
    name: 'Header',
    components: {
        SvgIcon,
    },
    setup(){
        const headerContainer = ref(null)

        onMounted(() => {
            mitt.emit('getHeader', {
                height: headerContainer.value.$el.clientHeight
            })
        })

        return {
            headerContainer,
            settingsStore,
        }
    }
}
</script>

<style lang="scss" scoped>

.header-container{
    position: fixed;
    width: 100%;
    height: 50px;
    left: 0;
    top: 0;
    z-index: 100;
    padding: 0 1rem;
    background: #324157;
}
.header_content{
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    cursor: unset;
}
.header_content-avatar{
    width: 38px;
    height: 38px;
    border-radius: 50%;
    background-color: var(--el-color-primary-light-9);
    display: flex;
    align-items: center;
    justify-content: center;
}
.header_content-title{
    margin-left: 1rem;
    font-size: 20px;
    font-weight: 600;
    color: var(--el-color-white);
    cursor: pointer;
}
</style>