<template>

  <div class="users">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索框 -->
    <div class="user">
      <el-input
        placeholder="请输入内容"
        v-model="searchKey"
        class="input-with-select search-input"

      >
        <el-button
          slot="append"
          icon="el-icon-search"
          @click="findUsers"
        ></el-button>
      </el-input>
      <el-button
        type="success"
        plain
      >添加用户</el-button>
    </div>
    <!-- 用户展示表格 -->
    <template>
      <el-table
        :data="userList"
        style="width: 100%;margin-bottom: 10px"
        border
      >
        <el-table-column
          type="index"
          width:60
        >
        </el-table-column>
        <el-table-column
          prop="username"
          label="姓名"
          width="240"
        >
        </el-table-column>
        <el-table-column
          prop="email"
          label="邮箱"
          width="240"
        >
        </el-table-column>
        <el-table-column
          prop="mobile"
          label="电话"
        >
        </el-table-column>
        <el-table-column label="状态">
          <!-- 自定义模块添加状态 -->
          <template slot-scope="scope">
            <el-tooltip
              :content="scope.row.mg_state?'当前状态:激活':'当前状态:禁止'"
              placement="top"
            >
              <el-switch
                v-model='scope.row.mg_state'
                active-color="#13ce66"
                inactive-color="#ff4949"
              >
              </el-switch>
            </el-tooltip>

          </template>
        </el-table-column>
        <el-table-column label="操作">
          <!-- 自定义模块添加操作 -->
          <template slot-scope="scope">
            <el-tooltip
              class="item"
              effect="dark"
              content="删除"
              placement="top"
            >
              <el-button
                size="mini"
                type="primary"
                @click="handleEdit(scope.$index, scope.row)"
                icon="el-icon-edit"
                plain
              ></el-button>
            </el-tooltip>
            <el-tooltip
              class="item"
              effect="dark"
              content="编辑"
              placement="top"
            >
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
                icon="el-icon-delete"
                plain
              ></el-button>
            </el-tooltip>
            <el-tooltip
              class="item"
              effect="dark"
              content="角色权限"
              placement="top"
            >
              <el-button
                size="mini"
                type="info"
                @click="handleDelete(scope.$index, scope.row)"
                icon="el-icon-check"
                plain
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <!-- 分页功能 -->
    <el-pagination
      style="background-color: #f5f5f5"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[1, 2, 3, 4]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script>
import { getUserList } from '@/api'
export default {
  data () {
    return {
      // 搜索关键字
      searchKey: '',
      //   当前页码
      pagenum: 1,
      //   每页显示的条数
      pagesize: 1,
      // 总条数
      total: 0,
      userList: []
    }
  },
  methods: {
    //   查询用户数据
    findUsers () {
      getUserList({
        query: this.searchKey,
        pagenum: 1,
        pagesize: 10
      }).then(results => {
        console.log(results)
        if (results.meta.status === 200) {
          this.userList = results.data.users
          this.total = results.data.total
        }
      })
    },
    //   获取用户数据
    init () {
      getUserList({
        query: this.searchKey,
        pagenum: this.pagenum,
        pagesize: this.pagesize
      }).then(results => {
        // console.log(results)
        if (results.meta.status === 200) {
          this.userList = results.data.users
          this.total = results.data.total
        }
      })
    },
    handleEdit (index, row) {
      console.log(index, row)
    },
    handleDelete (index, row) {
      console.log(index, row)
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      //   动态赋值每页要显示的条数
      this.pagesize = val
      //   重新渲染数据
      this.init()
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      //   时时获取当前页码
      this.pagenum = val
      //   重新渲染数据
      this.init()
    }
  },
  //   钩子函数---自动触发函数
  mounted () {
    this.init()
  }
}
</script>

<style lang="scss" scoped>
/* 覆盖element导航菜单的样式 */
.el-breadcrumb {
  background-color: #f5f5f5;
  height: 45px;
  font-size: 15px;
  padding-left: 10px;
  line-height: 45px;
  margin-bottom: 15px;
}
.user {
  .search-input {
    width: 300px;
  }
  margin-bottom: 10px;
}
</style>
