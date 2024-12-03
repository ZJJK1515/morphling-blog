import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'BlogHome',
    component: () => import('../components/BlogHome.vue'),
    meta: {
      title: '首页',
      requiresAuth: false,
      keepAlive: true
    }
  },
  {
    path: '/article/:id',
    name: 'Article',
    component: () => import('../components/ArticleDetail.vue'),
    meta: {
      title: '文章详情',
      requiresAuth: false
    }
  },
  {
    path: '/new-article',
    name: 'NewArticle',
    component: () => import('../components/NewArticle.vue'),
    meta: {
      title: '新建文章',
      requiresAuth: true
    }
  },
  {
    path: '/about',
    name: 'AboutMe',
    component: () => import('../components/AboutMe.vue'),
    meta: { 
      title: '关于我',
      requiresAuth: false
    }
  },
  {
    path: '/categories',
    name: 'CategoriesPage',
    component: () => import('../components/CategoriesPage.vue'),
    meta: {
      title: '分类',
      requiresAuth: false
    }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} - 我的博客`
  next()
})

export default router