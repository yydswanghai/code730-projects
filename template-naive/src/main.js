import { createApp } from 'vue'
import App from './App.vue'
import './styles/tailwind.css'
import router from './router'
import store from './store'
import naive from 'naive-ui'

const app = createApp(App).use(router).use(naive).use(store).mount('#app')
