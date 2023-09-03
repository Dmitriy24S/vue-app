import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/posts',
      name: 'posts',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/PostsView.vue')
    },
    {
      path: '/posts-vuex',
      name: 'posts-vuex',
      component: () => import('../views/PostsVuexStoreView.vue')
    },
    {
      path: '/posts-composition',
      name: 'posts-composition',
      component: () => import('../views/PostsCompositionApiView.vue')
    },
    {
      path: '/posts/:id',
      name: 'post',
      component: () => import('../views/PostView.vue')
    }
  ]
})

export default router
