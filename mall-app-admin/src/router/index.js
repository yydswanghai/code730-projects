import Vue from "vue";
import VueRouter from "vue-router";
import r from "./routes";
import store from "@/store";
import { message } from "ant-design-vue";
// import getMenuRoutes from "@/utils/permission.js"

Vue.use(VueRouter);

const { routes } = r 


// 路由配置
const router = new VueRouter({
    routes,// 路由匹配规则
    mode: "history" // 路由模式
})


// 路由前置守卫
router.beforeEach((to, from, next) => {
    if(to.meta.auth){
        // 需要鉴权
        const status = store.getters["loginUser/status"];
        if(status === "login"){
            next();
            // 过滤掉权限不够的路由
            //         const menuRoutes = getMenuRoutes(store.state.loginUser.user.role, asyncRouterMap);
            //         // 添加到仓库
            //         store.dispatch("loginUser/setMenuRoutes", routes.concat(menuRoutes)).then(() => {
            //             // menuRoutes添加到路由中
            //             router.addRoutes(menuRoutes);
            //             next();
            //         })
        }else{
            // 未登录
            message.info("该页面需要登录，请先登录！")
            next({
                path: "/login",
                query: {// ?returnurl=to.fullPath
                    returnurl: to.fullPath
                }
            })
        }
    }else{
        // 不需要鉴权
        next();
    }
})

window.router = router;

export default router;