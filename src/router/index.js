import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      // 重定向
      redirect: {name: 'Login'}

    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }

  ]
})
