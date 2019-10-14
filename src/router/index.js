import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'root',
      component: () => import('@/components/ArticleList')
    },
    {
      path: '/topic/:id$auther=:name',
      name: 'post_content',
      components: {
        default: () => import('@/components/article/index')
      }
    },
    {
      path: '/user/:name',
      name: 'user',
      component: () => import('@/components/Userinfo')
    }
  ]
})
