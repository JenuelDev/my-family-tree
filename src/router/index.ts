import { createRouter, createWebHistory } from 'vue-router'
import LoginView from "@/views/LoginView.vue"
import MainView from "@/views/Main/MainView.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: 'login',
      component: LoginView
    },
    {
      path: '/main',
      component: MainView,
      children: [
        {
          path: '',
          name: 'dashboard',
          component: () => import('@/views/Main/Dashboard/DashboardView.vue')
        },
        {
          path: 'view',
          name: 'view-family-tree',
          component: () => import('@/views/Main/ViewTree/FamilyTreeView.vue')
        }
      ]
    },
  ]
})

export default router
