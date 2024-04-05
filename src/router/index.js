import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/ExploreView.vue')
    }
    // {
    //   path: '/about',
    //   name: 'ExploreView',
    //   component: HomeView
    // }
  ]
})

export default router
