<template>
    <div class="blog-toc-container">
        <h2>目录</h2>
        <RightList :list="toWithSelect" @select="handleSelect" />
    </div>
</template>

<script>
import RightList from "./RightList";
import { debounce } from "@/utils";
export default {
    components: {
        RightList,
    },
    data(){
        return {
            activeAnchor: "",
        }
    },
    props: {
        toc: {
            type: Array,
        },
    },
    computed: {
        // 根据toc属性以及activeAnchor得到带有isSelect属性的toc数组
        toWithSelect(){
            const getToc = (toc = []) => {
                return toc.map(t => ({
                    ...t,
                    isSelect: t.anchor === this.activeAnchor,
                    children: getToc(t.children)
                }))
            }
            return getToc(this.toc);
        },
        // 根据toc得到它们对应的元素数组
        doms(){
            const doms = [];
            
            const addToDoms = (toc = []) => {
                for (const t of toc) {// 遍历数组值
                    doms.push(document.getElementById(t.anchor));// 添加到doms
                    if(t.children && t.children.length){// 深度优先遍历
                        addToDoms(t.children);
                    }
                }
            }
            addToDoms(this.toc)
            return doms;
        }
    },
    methods: {
        handleSelect(item){
            location.hash = item.anchor;
        },
        // 设置activeAnchor为正确的值
        setSelect(){
            this.activeAnchor = "";// 由于后续要重新设置，先清空
            const range = 200;
            for (const dom of this.doms) {
                // 看一下当前这个dom元素是不是应该被选中
                if(!dom){// 如果没有这个dom 继续运行，不用其他操作
                    continue;
                }
                // 得到元素离视口顶部的距离
                const top = dom.getBoundingClientRect().top;
                if(top >= 0 && top <= range){
                    // 在规定范围内
                    this.activeAnchor = dom.id;
                    return;
                }else if(top > range){
                    // 在规定范围下方
                    return;
                }else{
                    // 在规定范围上方
                    this.activeAnchor = dom.id; // 先假设自己是激活的，然后继续看后面
                }
            }
        } 
    },
    created(){
        this.setSelectDebounce = debounce(this.setSelect, 50)
        this.$bus.$on("mainScroll", this.setSelectDebounce)
    },
    destroyed(){
        this.$bus.$off("mainScroll", this.setSelectDebounce)
    }
}
</script>

<style scoped lang="less">
.blog-toc-container{
    h2{
        font-weight: bold;
        letter-spacing: 2px;
        font-size: 1em;
        margin: 0;
    }
}
</style>