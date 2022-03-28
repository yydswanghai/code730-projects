import { onUnmounted, ref } from 'vue';
import mitt from '@/util/mitt';

/**
 * @description 返回Header组件的元素高度
 */
export default function useHeaderMarginTop() {
    const marginTopRef = ref(0)
    mitt.on('getHeader', (data) => {
        marginTopRef.value = data.height
    })
    onUnmounted(() => {
        mitt.off('getHeader')
    })
    return {
        marginTop: marginTopRef
    }
}