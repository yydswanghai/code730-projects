import loadingUrl from "@/assets/loading.svg";
import styles from "./loading.module.less";
/**
 * 得到el中loading效果的img元素
 * 既判断img元素上的 data-role="loading"
 * el.querySelector(select) 如果el下有select这个元素就返回，没有则返回null
 */
function getLoadingImage(el){
    return el.querySelector("img[data-role=loading]");
}
/**
 * 创建img元素，并给img元素添加自定义属性  data-role="loading"，通过这个自定义属性来查找元素
 */
function createLoadingImg(){
    const img = document.createElement("img");
    img.dataset.role = "loading";
    img.src = loadingUrl;
    img.className = styles.loading;
    return img;
}

// 导出指令的配置对象     配置简化
export default function (el, binding) {
    // 根据 binding.value 的值，决定创建或删除img元素
    const curImg = getLoadingImage(el);
    if (binding.value) {
        if(!curImg){// 如果el里没有img，则创建img
            const img = createLoadingImg();
            el.appendChild(img);
        }
    } else {// el里有img，则删除img
        if(curImg){
            curImg.remove();
        }
    }
}