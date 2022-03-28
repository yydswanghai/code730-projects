<template>
    <ElBreadcrumb class="breadcrumb" separator="/">
        <transition-group name="page">
            <ElBreadcrumbItem v-for="(item, i) in levelList" :key="item.path + i">
                <span v-if="item.redirect === 'noRedirect' || i == levelList.length -1" class="no-redirect">{{ item.meta.title }}</span>
                <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
            </ElBreadcrumbItem>
        </transition-group>
    </ElBreadcrumb>
</template>

<script>
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { compile } from 'path-to-regexp';
export default {
    name: 'Breadcrumb',
    setup(){
        const route = useRoute()
        const router = useRouter()
        const levelListRef = ref(null)
        /* 是否为首页 */
        const _isDashboard = (rout) => {
            const name = rout && rout.name
            if(!name) return false
            return name.trim() === 'home'
        }
        /* 根据path去重 */
        const _unique = (arr) => {
            return arr.reduce((prev,cur) => {
                const index = prev.findIndex(it => it.path === cur.path)
                // 处理嵌套路由且仅有一个子路由的
                if(index !== -1 && prev[index].children.length === 1){
                    return prev[index] = cur
                }
                return [...prev, cur]
            }, [])
        }
        const getBreadcrumb = () => {
            // 仅显示带有{ meta.title }的路由
            let matched = route.matched.filter(item => item.meta && item.meta.title)
            matched = _unique(matched)

            const first = matched[0]

            if(!_isDashboard(first)){
                const home = [{ path: '/', name: 'home' ,meta: { title: '首页' } }]
                matched = home.concat(matched)
            }

            levelListRef.value = matched.filter(it => it.meta.breadcrumb !== false)
        }
        /* 路由变化重新获取面包屑 */
        watch(route, (newVal, oldVal) => getBreadcrumb())
        getBreadcrumb()
        const pathCompile = (path) => {
            const { params } = route
            var toPath = compile(path)
            return toPath(params)
        }
        const handleLink = (item) => {
            const { redirect, path } = item
            if(redirect){
                router.push(redirect)
                return
            }
            router.push(pathCompile(path))
        }
        return {
            levelList: levelListRef,
            handleLink
        }
    }
}

</script>
<style lang="scss" scoped>
.breadcrumb.el-breadcrumb{
    display: inline-block;
    font-size: 14px;
    line-height: 50px;
    margin-left: 8px;
    .no-redirect {
        color: #97a8be;
        cursor: text;
    }
}
</style>
<style lang="scss">
.breadcrumb{
    /* breadcrumb transition */
    .page-enter-active,
    .page-leave-active {
        transition: all .5s;
    }
    .page-enter,
    .page-leave-active {
        opacity: 0;
        transform: translateX(20px);
    }
    .page-move {
        transition: all .5s;
    }
    .page-leave-active {
        position: absolute;
    }
}
</style>