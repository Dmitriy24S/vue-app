import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import components from '@/components/UI'

const app = createApp(App)

components.forEach((component: any) => {
  app.component(component.name, component)
})

app.use(router)

app.mount('#app')