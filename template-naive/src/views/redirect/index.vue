<template>
    <NEmpty/>
</template>

<script>
import { onBeforeMount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { NEmpty } from 'naive-ui'
export default {
    name: 'Redirect',
    components: {
        NEmpty,
    },
    setup(){
        console.log('進重定向');
        const $route = useRoute()
        const $router = useRouter()
        onBeforeMount(() => {
            const { params, query } = $route
            const { path } = params
            console.log(params, query, $route)
            $router.replace({
                path: '/' + (Array.isArray(path) ? path.join('/') : path),
                query,
            })
        })
    }
}
</script>

<style>

</style>