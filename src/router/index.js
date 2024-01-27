import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ModalData from '@/components/ModalData.vue'
import QuizViewVue from '@/views/QuizView.vue'
import SettingView from '@/views/SettingViwe.vue'


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
    {
      path: '/setting',
      name: 'setting',
      component: SettingView,
    },

  ]
})

export default router
