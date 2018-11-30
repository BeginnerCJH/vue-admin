import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login.vue'
import Home from '@/views/Home.vue'
import Users from '@/views/user/Users.vue'
import Welcome from '@/views/Welcome.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      // 重定向
      redirect: { name: 'Login' }

    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      // 重定向
      redirect: { name: 'Welcome' },
      children: [
        {
          path: '/welcome',
          name: 'Welcome',
          component: Welcome
        },
        {
          path: '/users',
          name: 'Users',
          component: Users
        }
      ]
    }

  ]
})
