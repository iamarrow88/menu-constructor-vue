import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue') //lazy load
    },
    {
      path: '/menu',
      name: 'menu',
      component: () => import('../views/MenuConstructor.vue')
    },
    {
      path: '/base',
      name: 'base',
      component: () => import('../views/MenuBasePage.vue')

    },
    {
      path: '/shopping-list',
      name: 'shopping-list',
      component: () => import('../views/ShoppingListPage.vue')
    },
    {
      path: '/:pathMatch(.*)*', // Catch-all route for unmatched paths
      name: 'NotFound',
      component: () => import('../views/NotFoundPage.vue')
    }
  ],
})

export default router
