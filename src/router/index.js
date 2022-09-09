import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/service-list',
    name: 'service_list',
    component: () => import('@/views/ServiceListView.vue')
  },
  {
    path: '/master-list',
    name: 'master_list',
    component: () => import('@/views/MasterListView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
