export default function(refValue){
    return {
        mounted(){
            this.$bus.$on("setMainScroll", this.handleSetMainScroll);
            this.$refs[refValue].addEventListener("scroll", this.handleMainScroll)
        },
        beforeDestroy(){
            this.$bus.$emit("mainScroll");// 当前组件销毁之前，通知其他监听者
            this.$bus.$off("setMainScroll", this.handleSetMainScroll);
            this.$refs[refValue].removeEventListener("scroll", this.handleMainScroll);
        },
        methods: {
            handleMainScroll(){
                this.$bus.$emit("mainScroll", this.$refs[refValue])
            },
            handleSetMainScroll(scrollTop){
              this.$refs[refValue].scrollTop = scrollTop;
            }
        }
    }
}