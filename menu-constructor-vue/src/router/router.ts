import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/view/views/HomeView.vue'),
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/view/views/AboutView.vue'), //lazy load
    },
    {
      path: '/menu',
      name: 'menu',
      component: () => import('@/view/views/MenuConstructor.vue'),
    },
    {
      path: '/base',
      name: 'base',
      component: () => import('@/view/views/MenuBasePage.vue'),
    },
    {
      path: '/shopping-list',
      name: 'shopping-list',
      component: () => import('@/view/views/ShoppingListPage.vue'),
    },
    {
      path: '/add-receipt',
      name: 'add-receipt',
      component: () => import('@/view/views/AddReceiptView.vue'),
    },
    {
      path: '/show-receipt/:id',
      name: 'show-receipt',
      component: () => import('@/view/views/ShowReceiptView.vue'),
    },
    {
      path: '/:pathMatch(.*)*', // Catch-all route for unmatched paths
      name: 'NotFound',
      component: () => import('@/view/views/NotFoundPage.vue'),
    },
  ],
})

export default router
