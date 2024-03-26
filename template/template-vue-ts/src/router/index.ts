import * as VueRouter from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const HomeView = () => import('@/views/HomeView.vue')

const routes: readonly RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView
  }
]

const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes: routes
})

export default router
