<template>
  <div class="goods">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 商品数据展示 -->
    <el-card shadow="always">
      <!-- 搜索框 -->
      <div style="margin-bottom: 10px;">
        <el-input
          placeholder="请输入内容"
          v-model="searchkey"
          class="input-with-select"
          style=" width:300px"
        >
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="search"
          ></el-button>
        </el-input>
        <el-button
          type="success"
          plain
        >添加商品</el-button>
      </div>
      <!-- 数据展示 -->
      <template>
        <el-table
          :data="goodsList"
          border
          style="width: 100%"
        >
          <el-table-column
            type="index"
            width="50"
          >
          </el-table-column>
          <el-table-column
            prop="goods_name"
            label="商品名称"
          >
          </el-table-column>
          <el-table-column
            prop="goods_price"
            label="商品价格(元)"
            width="180"
          >
          </el-table-column>
          <el-table-column
            prop="goods_weight"
            label="商品重量"
            width="180"
          >
          </el-table-column>
          <el-table-column
            prop="add_time"
            label="创建时间"
            width="180"
          >
          </el-table-column>

          <el-table-column
            label="操作"
            width="180"
          >
            <template slot-scope="scope">
              <el-tooltip class="item" effect="dark" content="编辑" placement="top">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)"
                icon="el-icon-edit"
                type="primary" plain
              ></el-button>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="删除" placement="top">
              <el-button
                size="mini"
                type="danger"
                plain
                icon="el-icon-delete"
                @click="handleDelete(scope.$index, scope.row)"
              ></el-button>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
      </template>
      <!-- 分页器 -->
      <div style="margin-top: 10px;">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pagenum"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getGoodList } from '@/api'
export default {
  data () {
    return {
      searchkey: '',
      //  当前页码数
      pagenum: 1,
      //   每页显示的条数
      pagesize: 10,
      //   总条数
      total: 0,
      goodsList: []
    }
  },
  methods: {
    //   搜索商品
    search () {
      this.init()
    },
    //   获取商品数据显示数据列表
    init () {
      // 发送请求
      getGoodList({
        query: this.searchkey,
        pagenum: this.pagenum,
        pagesize: this.pagesize
      }).then(results => {
        // console.log(results)
        if (results.meta.status === 200) {
          this.goodsList = results.data.goods
          // console.log(results)
          // console.log(results.data.goods)
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
      this.pagesize = val
      this.init()
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.pagenum = val
      this.init()
    }
  },
  mounted () {
    this.init()
  }
}
</script>

<style>
</style>
