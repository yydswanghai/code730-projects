import { createRouter, createWebHistory } from 'vue-router'
import { constantRoutes } from './routes'
import NProgress from 'nprogress';
import 'nprogress/nprogress.css' // progress bar style

NProgress.configure({ showSpinner: false }) // NProgress 配置

const router = createRouter({
    history: createWebHistory(),
    routes: constantRoutes,
    scrollBehavior(to, from, savedPosition) {
        // 始终滚动到顶部，并且平滑滚动
        return { top: 0, behavior: 'smooth' }
    },
})

router.beforeEach((to, from) => {
    NProgress.start()
})

router.afterEach((to, from) => {
    NProgress.done()
})

export default router