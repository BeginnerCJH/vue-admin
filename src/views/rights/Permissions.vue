<template>
  <div class="permission">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 权限列表数据展示 -->
    <template>
      <el-table
        :data="rightsList"
        border
        style="width: 30%"
      >
        <el-table-column
          type="index"
          width="50"
        >
        </el-table-column>
        <el-table-column
          prop="authName"
          label="权限"
        >
        </el-table-column>
        <el-table-column
          prop="path"
          label="路径"
        >
        </el-table-column>

        <el-table-column
          prop="level"
          label="层级"
          width='80'
        >
        <!--插槽 自定义模板 -->
          <template slot-scope="scope">
              <span>{{scope.row.level | levels}}</span>
          </template>
        </el-table-column>

      </el-table>
    </template>
  </div>

</template>

<script>
import { getRightsList } from '@/api'
export default {
  data () {
    return {
      rightsList: []
    }
  },
  mounted () {
    getRightsList('list').then(results => {
      console.log(results)
      if (results.meta.status === 200) {
        this.rightsList = results.data
      } else {
        // 提示用户失败
        this.$message({
          message: results.meta.msg,
          type: 'error'
        })
      }
    })
  },
  methods: {
    hd (row) {
      console.log(row)
    }
  },
  // 过滤器
  filters: {
    levels: function (value) {
      if (value === '0') {
        return '一级'
      } else if (value === '1') {
        return '二级'
      } else if (value === '2') {
        return '三级'
      }
    }
  }
}
</script>

<style>
</style>
