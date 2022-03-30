import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import svgIcon from './components/SvgIcon/index.vue'// svgicon组件

import ElementPlus from 'element-plus'// 全局引入el-组件
import 'element-plus/dist/index.css'// 全局el样式
import * as ElIcons from '@element-plus/icons-vue'// 全局引入el-icon

import "./styles/index.scss";

const app = createApp(App)
.component('svg-icon', svgIcon)
.use(router)
.use(ElementPlus)

for (const icon in ElIcons) {// 引入element-plus的所有icon
    app.component(icon, ElIcons[icon])
}

app.mount('#app')

// console.log(import.meta.env);