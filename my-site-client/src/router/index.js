import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routers'
import { titleController } from "@/utils"

if(!window.VueRouter){
  Vue.use(VueRouter); // 使用一个vue插件
}

// 路由配置
const router = new VueRouter({
  routes,// 路由匹配规则
  mode: "history" // 路由模式
});

router.afterEach((to, from) => {
  // 设置路由标题
  if(to.meta.title){
    titleController.setRouteTitle(to.meta.title);
  }
})

export default router;