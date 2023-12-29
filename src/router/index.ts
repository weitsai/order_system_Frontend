import { createRouter, createWebHistory } from 'vue-router'
import defaults from '@/layouts/defaults.vue'
import { useUserStore } from '@/stores/user'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'defaults',
      meta: { isAuth: false },
      component: defaults,
      children: [
        {
          path: '',
          name: 'home',
          meta: { title: '首頁' },
          component: () => import('@/views/Home.vue')
        },
        {
          path: 'order',
          name: 'order',
          meta: { title: '點餐單' },
          component: () => import('@/views/order.vue')
        },
        {
          path: 'menu',
          name: 'menu',
          meta: { title: '菜單' },
          component: () => import('@/views/menu.vue')
        },
        {
          path: 'orderHistory',
          name: 'orderHistory',
          meta: { title: '歷史訂單' },
          component: () => import('@/views/orderHistory.vue')
        },
        {
          path: 'feedback',
          name: 'feedback',
          meta: { title: '意見回饋' },
          component: () => import('@/views/feedback.vue')
        }
      ]
    },
    {
      path: '/manage',
      name: 'manage',
      meta: { isAuth: true },
      component: () => import('@/layouts/manageLayouts.vue'),
      children: [
        {
          path: '',
          name: 'manageHome',
          meta: { title: '管理首頁' },
          component: () => import('@/views/manage/manageHome.vue')
        },
        {
          path: 'productManage',
          name: 'productManage',
          meta: { title: '產品管理' },
          component: () => import('@/views/manage/productManage.vue')
        },
        {
          path: 'order',
          name: 'manageorder',
          meta: { title: '訂單管理' },
          component: () => import('@/views/manage/order.vue')
        },
        {
          path: 'sales',
          name: 'sales',
          meta: { title: '銷售統計' },
          component: () => import('@/views/manage/sales.vue')
        },
        {
          path: 'allFeedback',
          name: 'managefeedback',
          meta: { title: '意見回饋總覽' },
          component: () => import('@/views/manage/allFeedback.vue')
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      meta: { isAuth: false, title: '登入' },
      component: () => import('@/views/login.vue')
    },
    {
      path: '/:pathMatch(.*)',
      redirect: '/PageNotFound'
    },
    {
      path: '/PageNotFound',
      name: '404',
      meta: { isAuth: false, title: 'Page Not Found' },
      component: () => import('@/views/Error404.vue')
    }
  ]
})
router.beforeEach((to, from, next) => {
  document.title = (to.meta.title as string) + ' | 點餐系統'
  if (to.meta.isAuth) {
    const userStore = useUserStore()
    const { isLogin } = storeToRefs(userStore)
    if (!isLogin.value) {
      next({ name: 'login' })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
