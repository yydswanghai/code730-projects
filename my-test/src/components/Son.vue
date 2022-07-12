<template>
    <div class="son">
        孙子组件
        <button @click="change">emit</button>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
    props: {
        collapsed: Boolean
    },
    setup(props, ctx){
        const change = ctx.attrs.change as ()=>void
        return {
            change
        }
    }
})
</script>
<style scoped>
.son{
    width: 100px;
    height: 100px;
    background-color: greenyellow;
}
</style>