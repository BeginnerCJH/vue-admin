<template>
  <div class="home">
    <el-container>
      <el-aside width="auto">
        <router-link to="/home">
          <div class="logo"></div>
        </router-link>
        <el-row class="tac">
          <el-col :span="12">
            <el-menu
              :default-active="defaultUrl"
              ref="menu"
              class="el-menu-vertical-demo el-menu-admin"
              @open="handleOpen"
              @close="handleClose"
              background-color="#545c64"
              text-color="#fff"
              active-text-color="#ffd04b"
              :collapse="isCollapse"
              :unique-opened="true"
              :router="true"
            >
              <el-submenu
              v-for="(value,indexs) in submenu"
              :key="indexs"
              :index="value.index">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>{{value.title}}</span>
                </template>
                <el-menu-item
                v-for="(value2,indexs2) in value.children"
                :key="indexs2"
                :index="value2.index">
                  <i class="el-icon-menu"></i>
                  <span slot="title">{{value2.title}}</span>
                </el-menu-item>
              </el-submenu>

              <!-- <el-submenu index="2">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>权限管理</span>
                </template>
                <el-menu-item index="roles">
                  <i class="el-icon-menu"></i>
                  <span slot="title">角色列表</span>
                </el-menu-item>
                <el-menu-item index="permissions">
                  <i class="el-icon-menu"></i>
                  <span slot="title">权限列表</span>
                </el-menu-item>
              </el-submenu>
              <el-submenu index="3">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>商品管理</span>
                </template>
                <el-menu-item index="goods">
                  <i class="el-icon-menu"></i>
                  <span slot="title">商品列表</span>
                </el-menu-item>
                <el-menu-item index="3-2">
                  <i class="el-icon-menu"></i>
                  <span slot="title">分类参数</span>
                </el-menu-item>
                <el-menu-item index="3-3">
                  <i class="el-icon-menu"></i>
                  <span slot="title">商品分类</span>
                </el-menu-item>

              </el-submenu>
              <el-submenu index="4">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>订单管理</span>
                </template>
                <el-menu-item index="4-1">
                  <i class="el-icon-menu"></i>
                  <span slot="title">订单列表</span>
                </el-menu-item>

              </el-submenu>
              <el-submenu index="5">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>数据统计</span>
                </template>
                <el-menu-item index="5-1">
                  <i class="el-icon-menu"></i>
                  <span slot="title">数据报表</span>
                </el-menu-item>

              </el-submenu> -->
            </el-menu>
          </el-col>
        </el-row>
      </el-aside>
      <el-container>
        <el-header>
          <span
            class="toggle-btn myicon myicon-menu"
            @click="isCollapse=!isCollapse"
          ></span>
          <div class="system-title">
            <span>陈十一后台管理系统</span>
          </div>
          <div class="welcome">
            <span>欢迎你：</span>
            <img
              src="../assets/aaa.png"
              alt=""
              width="30px"
            >
            <span>{{username}}</span>
            <button @click="logout">退出</button>
          </div>
        </el-header>
        <el-main>
          <router-view>

          </router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
// 获取请求用户列表的数据
import { findUserById } from '@/api'
export default {
  data () {
    return {
      // 默认选中index地址
      defaultUrl: '',
      isCollapse: false,
      id: '',
      username: '',
      submenu: [
        {
          index: '1',
          title: '用户管理',
          children: [
            {
              index: 'users',
              title: '用户列表'
            }
          ]
        },
        {
          index: '2',
          title: '权限管理',
          children: [
            {
              index: 'roles',
              title: '角色列表'
            },
            {
              index: 'permissions',
              title: '权限列表'
            }
          ]
        },
        {
          index: '3',
          title: '商品管理',
          children: [
            {
              index: 'goods',
              title: '商品列表'
            },
            {
              index: '3-2',
              title: '分类参数'
            },
            {
              index: '3-3',
              title: '商品分类'
            }
          ]
        },
        {
          index: '4',
          title: '订单管理',
          children: [
            {
              index: '4-1',
              title: '订单列表'
            }
          ]
        },
        {
          index: '5',
          title: '数据统计',
          children: [
            {
              index: '5-1',
              title: '数据报表'
            }
          ]
        }
      ]
    }
  },
  //   钩子函数---自动触发函数
  mounted () {
    // 获取登录存储到本地的id
    this.id = localStorage.getItem('admin_id')
    // 发送请求 获取用户数据
    findUserById(this.id).then(results => {
      if (results.meta.status === 200) {
        this.username = results.data.username
      }
    })
    this.defaultUrl = this.$route.path.split('/')[1]
  },
  // 监听路由变化
  watch: {
    '$route': 'getPath'
  },
  methods: {

    getPath () {
      this.defaultUrl = this.$route.path.split('/')[1]
      if (this.defaultUrl === 'welcome') {
        this.$refs['menu'].activeIndex = ''
        for (let i = 0; i < this.submenu.length; i++) {
          // console.log(this.submenu[i].index)
          // 收起指定的 sub-menu参数需要收起的 sub-menu 的 index
          this.$refs['menu'].close(this.submenu[i].index)
        }
      }
      // console.log(this.defaultUrl)
      // console.log(this.$refs['menu'])
    },
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    // 退出登录
    logout () {
      // 清除本地缓存
      localStorage.clear()
      // 编程式导航跳转登录页
      this.$router.push({ name: 'login' })
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  height: 100%;
  .el-menu-admin:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-container {
    height: 100%;
  }
  .el-aside {
    background-color: #545c64;
    .el-col-12 {
      width: 100%;
    }
  }
  .el-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #545c64;
  }
  .logo {
    height: 60px;
    background: url(../assets/ju.png);
    background-size: cover;
    background-color: #fff;
  }
  .toggle-btn {
    padding: 0 15px;
    margin-left: -20px;
    font-size: 36px;
    color: white;
    cursor: pointer;
    line-height: 60px;
    &:hover {
      background-color: #4292cf;
    }
  }

  .system-title {
    font-size: 28px;
    color: white;
  }
  .welcome {
    color: white;
    img {
      vertical-align: middle;
    }
  }
}
</style>
