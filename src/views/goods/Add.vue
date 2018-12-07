<template>
  <div class="add">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/goods/list' }">商品列表</el-breadcrumb-item>
      <el-breadcrumb-item>添加商品</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 步骤条 -->
    <el-card
      class="box-card"
      shadow="always"
    >
      <el-steps
        :active="activeName-0"
        finish-status="success"
      >
        <el-step title="基本信息"></el-step>
        <el-step title="商品参数"></el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品内容"></el-step>
      </el-steps>

      <!-- 标签页 -->
      <el-tabs
        tab-position="left"
        style="margin-top:15px"
        v-model="activeName"
      >
        <el-tab-pane
          name='0'
          label="基本信息"
        >
          <div>
            <el-form
              :model="addForm"
              :rules="rules"
              ref="addForm"
              label-width="80px"
            >
              <el-form-item
                label="商品名称"
                prop="goods_name"
              >
                <el-input v-model="addForm.goods_name"></el-input>
              </el-form-item>
              <el-form-item
                label="商品价格"
                prop="goods_price"
              >
                <el-input
                  type='number'
                  :min="0"
                  v-model="addForm.goods_price"
                ></el-input>
              </el-form-item>
              <el-form-item
                label="商品重量"
                prop="goods_weight"
              >
                <el-input
                  type='number'
                  :min="0"
                  v-model="addForm.goods_weight"
                ></el-input>
              </el-form-item>
              <el-form-item
                label="商品数量"
                prop="goods_number"
              >
                <el-input
                  type='number'
                  :min="1"
                  v-model="addForm.goods_number"
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
          name='1'
          label="商品参数"
        >商品参数</el-tab-pane>
        <el-tab-pane
          name='2'
          label="商品属性"
        >商品属性</el-tab-pane>
        <el-tab-pane
          name='3'
          label="商品图片"
        >
          <el-upload
            class="upload-demo"
            action="http://127.0.0.1:8888/api/private/v1/upload"
            :headers="getToken()"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="fileList"
            list-type="picture"
            :before-upload='uploadBeforeValid'
            :on-success='uploadSuccess'
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
        </el-tab-pane>
        <el-tab-pane
          name='4'
          label="商品内容"
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
      <el-button
        type="success"
        style="margin-top:15px;float:right"
        @click="submitAddForm('addForm')"
      >添加商品</el-button>
    </el-card>
    <el-dialog
      title="图片预览"
      :visible.sync="dialogVisible"
      width="600px"
    >
      <img
        :src="uploadImg"
        alt=""
        id="uploadImg"
      >
    </el-dialog>
  </div>
</template>

<script>
import { getCategories, addGoods } from '@/api'
export default {
  data () {
    return {
      // 图片预览
      dialogVisible: false,
      uploadImg: '',
      active: 0,
      activeName: 0,
      // 添加商品的参数
      addForm: {
        goods_name: '',
        goods_price: '0',
        goods_weight: '1',
        goods_number: '1',
        goods_cat: '',
        goods_introduce: '',
        pics: [],
        attrs: []
      },
      selectedOptions: [],
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
      options: [],
      props: {
        value: 'cat_id',
        label: 'cat_name',
        children: 'children'
      },
      fileList: [],
      is_show: false,
      content: null,
      editorOption: {}
    }
  },
  methods: {
    // 获取token
    getToken () {
      var token = localStorage.getItem('admin_token')
      return { Authorization: token }
    },
    // 提交添加商品订单
    submitAddForm (formname) {
      this.$refs[formname].validate(valid => {
        if (valid) {
          if (this.selectedOptions.length) {
            // console.log('aa')
            addGoods(this.addForm).then(results => {
              console.log(results)
              if (results.meta.status === 201) {
                this.$message({
                  type: 'success',
                  message: results.meta.msg
                })
                // 编程式导航跳转到商品列表
                this.$router.push({ name: 'List' })
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
              message: '请选择商品分类，否者无法提交'
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
    // 级联框发生改变后触发
    handleChange (value) {
      // console.log(value)
      // value.join()默认是以逗号分隔成字符串
      this.addForm.goods_cat = value.join()
      console.log(this.addForm.goods_cat)

      // console.log(this.addForm.goods_cat)
    },
    // 图片上传
    // 实现文件的删除
    handleRemove (file, fileList) {
      // 文件上传失败 会执行handleRemove
      console.log(file)
      console.log(this.addForm.pics)
      // 移除之前先判断
      if (!file.response) {
        return
      }
      // findIndex 返回一个数组第一个匹配的索引值
      var index = this.addForm.pics.findIndex(value => {
        // indexOf包含
        return value.pic.indexOf(file.response.data.tmp_path) !== -1
      })
      // 从数组中移除
      this.addForm.pics.splice(index, 1)
    },
    // 实现预览
    handlePreview (file) {
      console.log(file)
      // 显示模态框
      this.dialogVisible = true
      // 设置图片路径
      this.uploadImg = `http://127.0.0.1:8888/${file.response.data.tmp_path}`
    },
    // 图片上传成功
    uploadSuccess (response, file, fileList) {
      // console.log(response)
      // 把图片的临时路径存储到要提交的数据中
      this.addForm.pics.push({'pic': response.data.tmp_path})
      // console.log(this.addForm.pics)
    },
    // 图片上传成功之前触发的钩子函数
    uploadBeforeValid (file) {
      // 判断文件的大小是否满足要求，如果返回false,则终止当前文件上传操作
      if (file.size > 500000) {
        this.is_show = true
        this.$message({
          type: 'warning',
          message: '上传失败，只能上传jpg/png文件，且不超过500kb'
        })
        // 如果返回的是false 立刻终止上传操作
        return false
      } else {
        this.is_show = false
      }
    },
    onEditorChange (quill) {
      // 内容发生改变事件
      // console.log(quill.html)
      this.addForm.goods_introduce = quill.html
      // console.log(this.addForm.goods_introduce)
    }
  },
  mounted () {
    // 获取商品分类数据
    getCategories('3').then(results => {
      console.log(results)
      if (results.meta.status === 200) {
        this.options = results.data
      } else {
        // 提示用户
        this.$message({
          type: 'error',
          message: results.meta.msg
        })
      }
    })
  }
}
</script>

<style lang="scss">
.box-card {
  padding-bottom: 60px;
}

#uploadImg{
  display: block;
  margin: 0 auto;
  width: 80%;
}
.quill-editor {
  height: 400px;
  .ql-container.ql-snow{
  height: 80% !important;
  padding: 5px 0;
}
}

</style>
