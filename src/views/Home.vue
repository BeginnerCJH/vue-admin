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
              default-active="2"
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
              <el-submenu index="1">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>用户管理</span>
                </template>
                <el-menu-item index="users">
                  <i class="el-icon-menu"></i>
                  <span slot="title">用户列表</span>
                </el-menu-item>

              </el-submenu>
              <el-submenu index="2">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>权限管理</span>
                </template>
                <el-menu-item index="2-1">
                  <i class="el-icon-menu"></i>
                  <span slot="title">角色列表</span>
                </el-menu-item>
                <el-menu-item index="2-2">
                  <i class="el-icon-menu"></i>
                  <span slot="title">权限列表</span>
                </el-menu-item>
              </el-submenu>
              <el-submenu index="3">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>商品管理</span>
                </template>
                <el-menu-item index="3-1">
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

              </el-submenu>
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
            <span>陈十一</span>
            <button>退出</button>
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
import { getUserList } from '@/api'
export default {
  data () {
    return {
      isCollapse: false
    }
  },
  //   钩子函数---自动触发函数
  mounted () {
    getUserList({ pagenum: 1, pagesize: 10 })
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
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
