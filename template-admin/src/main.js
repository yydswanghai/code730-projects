import { createApp } from 'vue'
import App from './App.vue'
import router from './router';

import "./styles/index.scss";
import "element-plus/theme-chalk/src/message.scss"

import svgIcon from './components/SvgIcon/index.vue'// svgicon组件
import * as ElIcons from '@element-plus/icons-vue'

const app = createApp(App)
.component('svg-icon', svgIcon)
.use(router)

for (const icon in ElIcons) {// 引入element-plus的所有icon
    app.component(icon, ElIcons[icon])
}

app.mount('#app')

// console.log(import.meta.env);