import { defineAsyncComponent } from "vue";
/**
 * 通过路径得到一个异步组件
 */
export default function (path){
    return defineAsyncComponent({
        loader: () => {
            return import(path)
        }
    })
}