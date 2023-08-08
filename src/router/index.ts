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
                    path: 'view/:id',
                    name: 'view-family-tree',
                    component: () => import('@/views/Main/ViewTree/FamilyTreeView.vue')
                }
            ]
        },
        {
            path: "/instructions",
            component: () => import('@/views/Instructions/Main.vue'),
            children: [
                {
                    path: 'delete-account',
                    name: 'instruction-delete-account',
                    component: () => import('@/views/Instructions/DeleteAccount.vue')
                }
            ]
        },
        {
            path: "/privacy-policy",
            component: () => import("@/views/PrivacyPolicy.vue")
        },
        {
            path: "/public-edit",
            name: "FamTree Editor",
            component: () => import("@/views/CreateFamilyPublicEditor.vue")
        }
    ]
})

export default router
