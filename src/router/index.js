import  { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
    { path: '/',name: "home", component: () => import("@/pages/home/index.vue") },
    { path: '/stack',name: "stack", component: () => import("@/pages/stack/index.vue") },
    { path: '/stack-detail',name: "stackDetail", component: () => import("@/pages/stack/detail.vue") },
    { path: '/login',name: "login", component: () => import("@/pages/login/index.vue") },
    { path: '/me',name: "me", component: () => import("@/pages/me/index.vue") },
    { path: '/readBook',name: "readBook", component: () => import("@/pages/stack/readBook.vue") },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
})

export default router