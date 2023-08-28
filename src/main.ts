import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import components from '@/components/UI'
// import VIntersection from '@/directives'
import directives from './directives'

const app = createApp(App)

components.forEach((component: any) => {
  app.component(component.name, component)
})

// app.directive('intersection', VIntersection)
directives.forEach((directive) => {
  app.directive(directive.name, directive)
})

app.use(router).mount('#app')
