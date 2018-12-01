import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login.vue'
import Home from '@/views/Home.vue'
import Users from '@/views/user/Users.vue'
import Welcome from '@/views/Welcome.vue'
import Roles from '@/views/rights/Roles.vue'
import Permissions from '@/views/rights/Permissions.vue'
import Goods from '@/views/goods/Goods.vue'

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
        // 欢迎页路由
        {
          path: '/welcome',
          name: 'Welcome',
          component: Welcome
        },
        // 用户列表路由
        {
          path: '/users',
          name: 'Users',
          component: Users
        },
        // 角色列表路由
        {
          path: '/roles',
          name: 'Roles',
          component: Roles
        },
        // 权限列表路由
        {
          path: '/permissions',
          name: 'Permissions',
          component: Permissions
        },
        // 商品数据列表路由
        {
          path: '/goods',
          name: 'Goods',
          component: Goods
        }
      ]
    }

  ]
})
