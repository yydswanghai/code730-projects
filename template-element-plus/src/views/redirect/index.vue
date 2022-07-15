<script lang="ts">
import { defineComponent, onBeforeMount, h } from "vue"
import { ElEmpty } from 'element-plus'
import { useRoute, useRouter } from 'vue-router'
export default defineComponent({
    name: 'Redirect',
    setup(){
        const $route = useRoute();
        const $router = useRouter();
        onBeforeMount(() => {
            const { params, query } = $route;
            const { path } = params;
            $router.replace({
                path: '/' + (Array.isArray(path) ? path.join('/') : path),
                query,
            });
        })
        return () => h(ElEmpty)
    }
})
</script>