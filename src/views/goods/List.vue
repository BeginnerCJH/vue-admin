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
          @click="addGoods"
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
              <el-tooltip
                class="item"
                effect="dark"
                content="编辑"
                placement="top"
              >
                <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)"
                  icon="el-icon-edit"
                  type="primary"
                  plain
                ></el-button>
              </el-tooltip>
              <el-tooltip
                class="item"
                effect="dark"
                content="删除"
                placement="top"
              >
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
    <!-- 编辑商品 -->
    <el-dialog
      title="编辑商品"
      :visible.sync="editGoodsDialogFormVisible"
    >
      <!-- 卡片 -->
      <el-card class="box-card">
        <!-- 步骤条 -->
        <el-steps
          :active="activeName-0"
          finish-status="success"
        >
          <el-step title="基本信息"></el-step>
          <el-step title="商品参数"></el-step>
          <el-step title="商品图片"></el-step>
          <el-step title="商品内容"></el-step>
        </el-steps>

        <!-- 标签页 -->
        <el-tabs
          tabPosition="left"
          v-model="activeName"
        >
          <el-tab-pane
            label="基本信息"
            name='0'
          >
            <div>
              <el-form
                :model="editForm"
                :rules="rules"
                ref="editForm"
                label-width="80px"
              >
                <el-form-item
                  label="商品名称"
                  prop="goods_name"
                >
                  <el-input v-model="editForm.goods_name"></el-input>
                </el-form-item>
                <el-form-item
                  label="商品价格"
                  prop="goods_price"
                >
                  <el-input
                    type='number'
                    :min="0"
                    v-model="editForm.goods_price"
                  ></el-input>
                </el-form-item>
                <el-form-item
                  label="商品重量"
                  prop="goods_weight"
                >
                  <el-input
                    type='number'
                    :min="0"
                    v-model="editForm.goods_weight"
                  ></el-input>
                </el-form-item>
                <el-form-item
                  label="商品数量"
                  prop="goods_number"
                >
                  <el-input
                    type='number'
                    :min="1"
                    v-model="editForm.goods_number"
                  ></el-input>
                </el-form-item>
                <el-form-item
                  label="商品分类"
                  prop="goods_cat"
                >
                  <el-cascader
                    expand-trigger="click"
                    :options="options"
                    v-model="selectedOptions"
                    @change="handleChange"
                    change-on-select
                    clearable
                    :props="props"
                  >
                  </el-cascader>
                </el-form-item>
              </el-form>

            </div>
          </el-tab-pane>
          <el-tab-pane
            label="商品参数"
            name='1'
          >商品参数</el-tab-pane>
          <el-tab-pane
            label="商品图片"
            name='2'
          >
            <el-scrollbar style="height:100%">
              <el-upload
                class="upload-demo"
                action="http://127.0.0.1:8888/api/private/v1/upload"
                :headers="getToken()"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :file-list="fileList"
                list-type="picture"
                style="height:400px;width:98%"
                :on-success='uploadSuccess'
                :before-upload="uploadBeforeValid"
              >
                <el-button
                  size="small"
                  type="primary"
                >点击上传</el-button>
                <div
                  slot="tip"
                  class="el-upload__tip"
                >只能上传jpg/png文件，且不超过500kb</div>
              </el-upload>
            </el-scrollbar>
          </el-tab-pane>
          <el-tab-pane
            label="商品内容"
            name='3'
          >
            <quill-editor
              v-model="content"
              ref="myQuillEditor"
              :options="editorOption"
              @change="onEditorChange($event)"
            >
            </quill-editor>
          </el-tab-pane>
        </el-tabs>
      </el-card>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="editGoodsDialogFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="submiteditform('editForm')"
        >确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="图片预览"
      :visible.sync="dialogVisible"
      width="600px"
    >
      <img
        :src="uploadEditImg"
        alt=""
        id="uploadEditImg"
      >
    </el-dialog>
  </div>
</template>

<script>
import {
  getGoodList,
  deleteGoods,
  getGoodsById,
  getCategories,
  editGoods
} from '@/api'
export default {
  data () {
    return {
      dialogVisible: false,
      // 上传图片的参数
      // 重置
      resetpics: [],
      uploadEditImg: '',
      fileList: [],
      // 富文本的参数
      content: null,
      editorOption: {},
      // 编辑提交的参数
      editForm: {
        id: '',
        goods_name: '',
        goods_price: '',
        goods_weight: '',
        goods_number: '',
        goods_cat: '',
        goods_introduce: '',
        pics: [],
        attrs: []
      },
      selectedOptions: [],
      options: [],
      props: {
        value: 'cat_id',
        label: 'cat_name',
        children: 'children'
      },
      rules: {
        goods_name: [
          { required: true, message: '请输入商品名称', trigger: 'blur' }
        ],
        goods_price: [
          { required: true, message: '请输入商品价格', trigger: 'blur' }
        ],
        goods_weight: [
          { required: true, message: '请输入商品重量', trigger: 'blur' }
        ],
        goods_number: [
          { required: true, message: '请输入商品数量', trigger: 'blur' }
        ]
      },
      activeName: '0',
      // 编辑模态框
      editGoodsDialogFormVisible: false,
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
    // 编辑后提交数据
    submiteditform (formname) {
      this.$refs[formname].validate(valid => {
        if (valid) {
          if (this.selectedOptions.length) {
            // console.log(this.editForm)

            // 发送请求
            editGoods(this.editForm).then(results => {
              if (results.meta.status === 200) {
                // 隐藏模态框
                this.editGoodsDialogFormVisible = false
                // 重新渲染数据
                this.init()
                this.$message({
                  type: 'success',
                  message: results.meta.msg
                })
              } else {
                this.$message({
                  type: 'error',
                  message: results.meta.msg
                })
              }
            })
          } else {
            this.$message({
              type: 'error',
              message: '请选择分类，否者无法提交'
            })
          }
        } else {
          this.$message({
            type: 'error',
            message: '请填写完整表单'
          })
        }
      })
    },
    // 获取token
    getToken () {
      var token = localStorage.getItem('admin_token')
      return { Authorization: token }
    },
    // 图片上传
    // 实现文件的删除
    handleRemove (file, fileList) {
      // 图片上传失败的时候 会触发handleRemove这个函数
      console.log(file)
      // 先判断是否存在
      if (!file.response) {
        return
      }
      // findIndex(回调函数) 返回的是一个为true的第一个索引值
      var index = this.editForm.pics.findIndex(value => {
        return value.pic.indexOf(file.response.data.temp_path) !== -1
      })
      // 移除
      this.editForm.pics.splice(index, 1)
    },
    // 实现预览
    handlePreview (file) {
      console.log(file)
      // 显示模态框
      this.dialogVisible = true
      // 设置图片路径
      this.uploadEditImg = `${file.url}`
    },
    // 图片上传成功
    uploadSuccess (response, file, fileList) {
      console.log(response.data.tmp_path)
      // 把图片的临时路径存储到要提交的数据中
      this.editForm.pics.push({ pic: response.data.tmp_path })
      // console.log(this.editForm.pics)
    },
    // 图片上传成功之前触发的钩子函数
    uploadBeforeValid (file) {
      // 判断文件的大小是否满足要求，如果返回false,则终止当前文件上传操作
      if (file.size > 500000) {
        this.is_show = true
        this.$message({
          type: 'error',
          message: '上传失败，只能上传jpg/png文件，且不超过500kb'
        })
        // 如果返回的是false 立刻终止上传操作
        return false
      } else {
        this.is_show = false
      }
    },
    // 级联发生改变
    handleChange (value) {
      console.log(value)
      this.editForm.goods_cat = value.join()
      // console.log(this.editForm.goods_cat)
    },
    // 添加商品
    addGoods () {
      this.$router.push({ name: 'Add' })
    },
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
        } else {
          // 提示用户失败
          this.$message({
            message: results.meta.msg,
            type: 'error'
          })
        }
      })
    },
    // 编辑商品
    handleEdit (index, row) {
      // 赋值id
      this.editForm.id = row.goods_id

      // 重置标签页
      this.activeName = '0'
      // 显示模态框
      this.editGoodsDialogFormVisible = true
      // 动态渲染商品本身的数据
      this.editForm.goods_name = row.goods_name
      this.editForm.goods_price = row.goods_price
      this.editForm.goods_weight = row.goods_weight
      this.editForm.goods_number = row.goods_number
      getCategories('3').then(results => {
        if (results.meta.status === 200) {
          this.options = results.data
        } else {
          this.$message({
            type: 'error',
            message: results.meta.msg
          })
        }
      })
      // console.log(index, row)
      // 清空数组 好
      this.selectedOptions.length = 0
      getGoodsById(row.goods_id).then(results => {
        // console.log(results)
        if (results.meta.status === 200) {
          this.selectedOptions.push(
            results.data.cat_one_id,
            results.data.cat_two_id,
            results.data.cat_three_id
          )
          this.editForm.goods_cat = this.selectedOptions.join()
          this.content = results.data.goods_introduce
          // 在之前先清空数组
          this.fileList.length = 0
          // 重新格式化获取的图片地址
          results.data.pics.forEach(value => {
            console.log(value)
            // 把旧图县存储到数组中
            this.editForm.pics.push({pics_id: value.pics_id})
            // console.log(value.pics_sma.substring(1))

            // 重新设置数组的格式tmp_uploads
            this.resetpics.push({
              name: value.pics_sma_url.substring(42),
              url: `http://127.0.0.1:8888${value.pics_sma}`
            })
            // console.log(value.pics_sma)
          })
          // console.log(this.resetpics)

          this.fileList = this.resetpics
        }
      })
    },
    // 富文本发生变化
    onEditorChange (quill) {
      // console.log(quill)
      // 存储富文本的值
      this.editForm.goods_introduce = quill.html
      // console.log(this.editForm.goods_introduce)
    },

    // 删除商品
    handleDelete (index, row) {
      // console.log(index, row)
      this.$confirm(
        `此操作将永久删除id号为${row.goods_id}的商品, 是否继续?`,
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      )
        .then(() => {
          deleteGoods(row.goods_id).then(results => {
            if (results.meta.status === 200) {
              this.$message({
                type: 'success',
                message: results.meta.msg
              })
              // 重新渲染页面
              this.init()
            } else {
              this.$message({
                type: 'error',
                message: results.meta.msg
              })
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
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

<style lang="scss">
.box-card {
  height: 500px;
}
#uploadEditImg {
  display: block;
  margin: 0 auto;
  width: 80%;
}
.quill-editor {
  height: 400px;
  .ql-container.ql-snow {
    height: 80% !important;
    padding: 5px 0;
  }
}
</style>
