// 入口文件
import "@/mock";  // 模拟数据
import Vue from 'vue';
import App from './App.vue';   // App组件
import "@/styles/global.less"; // 全局样式
import router from "@/router"; // 路由插件
import { showMessage } from "@/utils"; // 工具库
Vue.prototype.$showMessage = showMessage;// 将弹窗注入到Vue实例
// 事件总线
import "./eventBus";
import store from "@/store"
// 一开始加载
store.dispatch("setting/fetchSetting");

// 注册全局指令 
import vLoading from "@/directives/loading";
import vLazy from "@/directives/lazy";
Vue.directive("loading", vLoading);
Vue.directive("lazy", vLazy);



new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')



// 测试
// import * as blogApi from "./api/blog";
