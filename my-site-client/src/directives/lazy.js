import eventBus from "@/eventBus";
import { debounce } from "@/utils";
import defaultGif from "@/assets/default.gif"

/**
 * 图片懒加载
 * 1. 一开始都先加载 default.gif 默认图
 * 2. 加载完成后，default.gif 替换成 原图
 */

let imgs = [];

// 设置单个图片
function setImage(img){
    img.dom.src = defaultGif;// 先暂时使用着默认图片
    // 处理图片
    // 该图片是否在视口范围内
    const clientHeight = document.documentElement.clientHeight;
    const rect = img.dom.getBoundingClientRect();
    const height = rect.height || 150;
    // dom元素的 top >= -height，图片在屏幕内，否则，图片在屏幕上方
    if(rect.top >= -height && rect.top <= clientHeight){
        // 在视口范围内，则展示加载的真实图片
        img.dom.src = img.src;
        // 加载完成后，imgs数组里移除当前这个img对象，避免下次滚动到这个视口内还会重新加载一次
        imgs = imgs.filter(i => i !== img);
    }
}

// 希望，调用该函数，就可以设置那些合适的图片
// 滚动条滚动的时候调用该函数
// 找到合适需要加载的图片
function setImages(){
    for (const img of imgs) {
        // 处理该图片
        setImage(img);
    }
}

function handleScroll(){
    setImages();
}

eventBus.$on("mainScroll", debounce(handleScroll, 50));

export default {
    inserted(el, binding){
        // 被绑定元素插入父节点时调用。
        // 将el 加到 imgs数组里去
        const img = {
            dom: el,
            src: binding.value
        }
        imgs.push(img);
        // 先设置一次
        setImage(img);
    },
    unbind(el){
        // 只调用一次，指令与元素解绑时调用。
        /**
         * 移除之前的图片
         * 当你，切换分页 或 切换到其他组件的时候，图片又添加一次，需要移除之前的图片
         * el：之前的的dom
         */
        imgs = imgs.filter(img => img.dom !== el);
    }
};