import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ModalData from '@/components/ModalData.vue'
import QuizViewVue from '@/views/QuizView.vue'


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
      path: '/home',
      name: 'homeAlt',
      component: HomeView,
      children:[{
        path:'popup',
        name:"popup",
        component: ModalData
      }]
    },
    {
      path: '/quiz',
      name: 'quiz',
      component: QuizViewVue,
    },

  ]
})

export default router
