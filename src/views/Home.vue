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
              v-for="(value,index) in submenu"
              :key="index"
              :index="value.order.toString()">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>{{value.authName}}</span>
                </template>
                <el-menu-item
                v-for="(value2,index2) in value.children"
                :key="index2"
                :index="'/'+value2.path">
                  <i class="el-icon-menu"></i>
                  <span slot="title">{{value2.authName}}</span>
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
            <span>欢迎你：{{$store.state.username}}</span>
            <img
              src="../assets/taiji.gif"
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
import { getMenus } from '@/api'
export default {
  data () {
    return {
      // 默认选中index地址
      defaultUrl: '',
      isCollapse: false,
      id: '',
      username: '',
      submenu: [

      ]
    }
  },
  //   钩子函数---自动触发函数
  mounted () {
    // 动态请求菜单栏数据
    getMenus().then(results => {
      // console.log(results)
      if (results.meta.status === 200) {
        this.submenu = results.data
      }
    })
    console.log(this.$store.state)

    // 默认高亮地址
    // this.defaultUrl = this.$route.path.split('/')[1]
    this.defaultUrl = this.$route.path
    // 监听地址栏的路由 检测到goods/有拼接其他参数 就立刻改变高亮的指向路由
    if (this.defaultUrl.indexOf('/goods/') !== -1) {
      this.defaultUrl = '/goods'
    }
  },
  // 监听路由变化
  watch: {
    '$route': 'getPath'
  },
  methods: {
    getPath () {
      this.defaultUrl = this.$route.path
      // console.log('aa' + this.defaultUrl)
      if (this.defaultUrl === '/welcome') {
        this.$refs['menu'].activeIndex = ''
        this.submenu.forEach(value => {
          // console.log(value)
          // 收起指定的 sub-menu参数需要收起的 sub-menu 的 index
          this.$refs['menu'].close(`${value.order.toString()}`)
        })
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
      border-radius: 50%
    }
  }
}
</style>
