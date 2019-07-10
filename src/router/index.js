import Vue from 'vue'
import Router from 'vue-router'
import Layout from '../views/layout/index'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  // mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: Layout,
      hidden: true,
      children: [
        {
          name: 'home',
          path: 'home',
          meta: { title: '首页', keepAlive: true },
          component: () => import('../views/home/index.vue')
        },
        {
          name: 'about',
          path: 'about',
          meta: { title: '关于我', keepAlive: true },
          component: () => import('../views/about/index.vue')
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      meta: { isSide: true }
      // component: () => import(/* webpackChunkName: "login" */ "../views/Login/index.vue"),
    },

    {
      path: '*', // 其他页面，强制跳转到登录页面
      name: '*',
      redirect: '/home'
    }
  ]
})
