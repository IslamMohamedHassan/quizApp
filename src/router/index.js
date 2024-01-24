import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ModalData from '@/components/ModalData.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      children:[{
        path:'popup',
        name:"popup",
        component: ModalData
      }]
    },
    {
      path: '/',
      name: 'homeAlt',
      component: HomeView,
      children:[{
        path:'popup',
        name:"popup",
        component: ModalData
      }]
    },
  ]
})

export default router
