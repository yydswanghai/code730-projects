import { createApp } from 'vue'
import './styles/tailwind.css'// 引入 tailwindcss
import App from './App.vue'
import router from './router'
import store from './store'
import naive from 'naive-ui'
import { createRouterGuards } from '@/router/router-guards'// 路由鉴权

const app = createApp(App)

app.use(naive)

app.use(store)

app.use(router)

createRouterGuards(router)

app.mount('#app')