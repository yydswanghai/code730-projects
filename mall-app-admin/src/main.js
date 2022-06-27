import Vue from 'vue';
import VCharts from 'v-charts';// 在App之前引用
import App from '@/App.vue';// 组件App
import '@/plugins/ant-design-vue';// 使用ant
import "@/styles/global.less";// 全局样式
import router from "@/router";// 路由
import store from "@/store";// 仓库


Vue.use(VCharts)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
