<template>
    <div class="child">
        子组件
        <Son v-bind="$attrs" :collapsed="collapsed" />
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Son from "./Son.vue";
export default defineComponent({
    components: {
        Son
    },
    props: {
        collapsed: Boolean
    },
    setup(props, ctx){
        console.log(props)
    }
})
</script>
<style scoped>
.child{
    width: 80%;
    height: 200px;
    background-color: skyblue;
}
</style>