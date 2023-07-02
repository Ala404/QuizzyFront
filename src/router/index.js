import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DashboardView from '../views/DashboardView.vue'
import SupportView from '../views/SupportView.vue'
import NotificationsView from '../views/NotificationsView.vue'
import CategoriesView from '../views/CategoriesView.vue'
import QuizDetailsView from '../views/QuizDetailsView.vue'
import QiuzView from '../views/QuizView.vue'
import DiffcultyView from '../views/DiffcultyView.vue'


const routes = [
  {
    //only authenticated users can access the main view
    
    

    path: '/',
    name: 'home',
    component: HomeView,
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        component: DashboardView
      },
      {
        path: '/support',
        name: 'support',
        component: SupportView
      },
      {
        path: '/notifications',
        name: 'notifications',
        component: NotificationsView
      },
      {
        path: '/categories',
        name: 'categories',
        component: CategoriesView
      },
      {
        path: '/categories/:id',
        name: 'category',
        component: QuizDetailsView
      },
      // {
      //   path: '/quiz/:id',
      //   name: 'quiz',
      //   component: QiuzView
      // },
      {
        path: '/quiz/:id/difficulty',
        name: 'quiz-diff',
        component: DiffcultyView,
      },
      {
        path: '/quiz/:id/difficulty/:diff',
        name: 'quiz-diff-quiz',
        component: QiuzView
      },

    ]
  },
 
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
