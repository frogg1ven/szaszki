import { createRouter, createWebHistory } from '@ionic/vue-router';
import TabsPage from '../views/TabsPage.vue'

const routes = [
  {
    path: '/',
    redirect: '/tabs/game'
  },
  {
    path: '/tabs/',
    component: TabsPage,
    children: [
      {
        path: '',
        redirect: '/tabs/game'
      },
      {
        path: 'game',
        component: () => import('@/views/GamePage.vue')
      },
      {
        path: 'clock',
        component: () => import('@/views/ClockPage.vue')
      },
      {
        path: 'wifi',
        component: () => import('@/views/WifiPage.vue')
      },
      {
        path: 'settings',
        component: () => import('@/views/SettingsPage.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
