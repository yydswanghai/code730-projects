import { settingsStore, closeSidebar, modifi } from "@/store/useSettings";
import { onBeforeMount, onMounted, onUnmounted, watch } from 'vue';
import { useRoute } from 'vue-router';
/**
 * @description 调整设备大小
 */
const { body } = document
const WIDTH = 992// 参考自 Bootstrap 的响应式设计

export default function useResizeDevice(){
    const route = useRoute()
    /* 是否为手机端 */
    function _isMobile() {
        const rect = body.getBoundingClientRect()
        return rect.width - 1 < WIDTH
    }
    /* 如果是手机端则关闭侧边栏，并且关闭时不使用动画 */
    function _resizeHandler() {
        if (!document.hidden) {
            const isMobile = _isMobile()
            modifi('device', isMobile ? 'mobile' : 'desktop')
            if(isMobile){
                closeSidebar({ withoutAnimation: true })
            }
        }
    }
    // 监听路由变化
    watch(route, (newVal, oldVal) => {
        if(settingsStore.device === 'mobile' && settingsStore.sidebar.opened){
            closeSidebar({ withoutAnimation: false })
        }
    })
    onBeforeMount(() => {
        window.addEventListener('resize', _resizeHandler)
    })
    onMounted(() => {
        const isMobile = _isMobile()
        if(isMobile){
            modifi('device', 'mobile')
            closeSidebar({ withoutAnimation: true })
        }
    })
    onUnmounted(() => {
        window.removeEventListener('resize', _resizeHandler)
    })
    return {}
}