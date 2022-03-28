import { createRouter, createWebHistory } from 'vue-router'
import { constantRoutes } from './routes'

const router = createRouter({
    history: createWebHistory(),
    routes: constantRoutes,
    scrollBehavior(to, from, savedPosition) {
        // 始终滚动到顶部，并且平滑滚动
        return { top: 0, behavior: 'smooth' }
    },
})

export default router