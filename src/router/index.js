import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login.vue'
import Home from '@/views/Home.vue'
import Users from '@/views/user/Users.vue'
import Welcome from '@/views/Welcome.vue'
import Roles from '@/views/rights/Roles.vue'
import Permissions from '@/views/rights/Permissions.vue'
import Goods from '@/views/goods/Goods.vue'
import List from '@/views/goods/List.vue'
import Add from '@/views/goods/Add.vue'
import Categories from '@/views/goods/Categories.vue'
import Params from '@/views/goods/Params.vue'
import Reports from '@/views/reports/reports.vue'

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
          path: '/rights',
          name: 'Permissions',
          component: Permissions
        },
        // 商品数据路由
        {
          path: '/goods',
          name: 'Goods',
          component: Goods,
          // 重定向到列表中
          redirect: { name: 'List' },
          children: [
            // 商品数据列表路由
            {
              path: 'list',
              name: 'List',
              component: List
            },
            // 添加商品的路由
            {
              path: 'add',
              name: 'Add',
              component: Add
            }
          ]
        },
        // 商品分类的路由
        {
          path: '/categories',
          name: 'Categories',
          component: Categories
        },
        // 分类参数路由
        {
          path: '/params',
          name: 'Params',
          component: Params
        },
        // 数据报表路由
        {
          path: '/reports',
          name: 'Reports',
          component: Reports
        }
      ]
    }

  ]
})
