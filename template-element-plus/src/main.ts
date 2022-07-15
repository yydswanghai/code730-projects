import { createApp } from 'vue'
import App from './App.vue'
import { store } from './store/'
import { router } from './router'
import '@/styles/index.scss'
import 'element-plus/theme-chalk/src/message.scss'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { createRouterGuards } from '@/router/router-guards'
const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
}

app.use(store)

app.use(router)

createRouterGuards(router)

app.mount('#app')