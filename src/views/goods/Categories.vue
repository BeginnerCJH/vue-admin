<template>
  <div class="categories">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 添加按钮 -->
    <div style="margin-bottom:10px">
      <el-button
        type="success"
        plain
        @click="showAddForm"
      >添加分类</el-button>
    </div>
    <!-- 数据展示 -->
    <tree-grid
      :treeStructure="true"
      :columns="columns"
      :data-source="catList"
      @deleteCate="deleteCategory"
      @editCate="editCategory"
    >
    </tree-grid>

    <!-- 尝试傻屌分页 -->
     <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>

    <el-dialog
      title="添加分类"
      :visible.sync="addCateDialogFormVisible"
    >
      <el-form
        :model="addForm"
        label-width="120px"
      >
        <el-form-item label="添加分类">
          <el-input
            v-model="addForm.cat_name"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="父级分类">
          <el-cascader
            :options="options"
            @change="handleChange"
            v-model="selectedOptions"
            clearable
            :props="props"
            change-on-select
          ></el-cascader>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="addCateDialogFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="addsubmitform"
        >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// 引入组件
import TreeGrid from '@/components/TreeGrid/TreeGrid.vue'
import { getCategories, addCategories, deleteCategories } from '@/api'
export default {
  // 注入组件
  components: {
    TreeGrid: TreeGrid
  },
  data () {
    return {
      // 总条数
      total: 0,
      pagesize: 10,
      pagenum: 1,
      // 级联选择器
      options: [],
      props: {
        label: 'cat_name',
        value: 'cat_id',
        children: 'children'
      },
      selectedOptions: [],
      addForm: {
        cat_name: '',
        cat_level: '',
        cat_pid: ''
      },
      // 模态框
      addCateDialogFormVisible: false,
      columns: [
        {
          text: '分类名称',
          dataIndex: 'cat_name',
          width: ''
        },
        {
          text: '是否有效',
          dataIndex: 'cat_deleted',
          width: ''
        },
        {
          text: '层级',
          dataIndex: 'cat_level',
          width: ''
        }
      ],
      // 数据源
      catList: []
    }
  },

  methods: {
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.pagesize = val
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.pagenum = val
    },
    // 渲染数据
    init (type) {
      return getCategories(type).then(results => {
        if (results.meta.status === 200) {
          return results.data
        } else {
          // 提示用户
          this.$message({
            type: 'error',
            message: results.meta.msg
          })
        }
      })
    },
    // 级联选择器触发
    handleChange (value) {
      console.log(value)
      if (value.length === 1) {
        this.addForm.cat_pid = value[0]
        this.addForm.cat_level = 0
      } else if (value.length === 2) {
        this.addForm.cat_pid = value[1]
        this.addForm.cat_level = 1
      }
      // console.log(this.addForm.cat_pid)
      // console.log(this.addForm.cat_level)
    },
    // 删除
    deleteCategory (id) {
      deleteCategories()
      this.$confirm(`此操作将永久删除id为${id}的分类, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteCategories(id).then(results => {
          console.log(results)

          if (results.meta.status === 200) {
          // 提示用户
            this.$message({
              type: 'success',
              message: results.meta.msg
            })
            // 重新渲染页面
            this.init('3').then(results => {
              this.catList = results
            })
          } else {
          // 提示用户
            this.$message({
              type: 'error',
              message: results.meta.msg
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 编辑
    editCategory (cid) {
      console.log(cid)
    },
    showAddForm () {
      // 显示模态框
      this.addCateDialogFormVisible = true
      // 查询分类
      this.init('2').then(results => {
        this.options = results
      })
    },
    // 提交请求
    addsubmitform () {
      //
      addCategories(this.addForm).then(results => {
        // console.log(results)
        if (results.meta.status === 201) {
          // console.log(results)
          // 隐藏模态框
          this.addCateDialogFormVisible = false
          // 提示用户
          this.$message({
            type: 'success',
            message: results.meta.msg
          })
          // 重新渲染页面
          this.init('3').then(results => {
            this.catList = results
          })
        } else {
          // 提示用户
          this.$message({
            type: 'error',
            message: results.meta.msg
          })
        }
      })
    }
  },

  mounted () {
    this.init('3').then(results => {
      this.total = results.length
      // this.catList = results
      this.catList = results.filter((value, index) => {
        return index < this.pagesize
      })
      console.log(this.catList)
    })
  }
}
</script>

<style>
</style>
