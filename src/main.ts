import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import components from '@/components/UI'
// import VIntersection from '@/directives'
import directives from './directives'
import store from './store'

const app = createApp(App)
app.config.globalProperties.$store = store

components.forEach((component) => {
  app.component(component.name, component)
})

// app.directive('intersection', VIntersection)
directives.forEach((directive) => {
  app.directive(directive.name, directive)
})

app.use(router).use(store).mount('#app')
