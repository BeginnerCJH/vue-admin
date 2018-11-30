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
        @click="adddialogFormVisible=true"
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
                @change="handleStatus(scope.$index, scope.row)"
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
              content="编辑"
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
              content="删除"
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
                @click="handlePermission(scope.$index, scope.row)"
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
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>

    <!-- 添加用户的对话框 -->
    <template>
      <el-dialog
        title="添加新用户"
        :visible.sync="adddialogFormVisible"
      >
        <el-form
          :model="addform"
          label-width="120px"
          :rules="rules"
          ref="addform"
        >
          <el-form-item
            label="用户名"
            prop="username"
          >
            <el-input
              v-model="addform.username"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="密码"
            prop="password"
          >
            <el-input
              v-model="addform.password"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="邮箱"
            prop="email"
          >
            <el-input
              v-model="addform.email"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="手机号"
            prop="mobile"
          >
            <el-input
              v-model="addform.mobile"
              autocomplete="off"
            ></el-input>
          </el-form-item>

        </el-form>
        <div
          slot="footer"
          class="dialog-footer"
        >
          <el-button @click="adddialogFormVisible = false">取 消</el-button>
          <el-button
            type="primary"
            @click="submitaddform('addform')"
          >确 定</el-button>
        </div>
      </el-dialog>
    </template>
    <!-- 编辑用户的对话框 -->
    <template>
      <el-dialog
        title="编辑用户"
        :visible.sync="editdialogFormVisible"
      >
        <el-form
          :model="editform"
          label-width="120px"
          :rules="rules"
          ref="editform"
        >
          <el-form-item
            label="用户名"
            prop="username"
          >
            <el-input
              v-model="editform.username"
              autocomplete="off"
              :disabled="true"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="邮箱"
            prop="email"
          >
            <el-input
              v-model="editform.email"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="手机号"
            prop="mobile"
          >
            <el-input
              v-model="editform.mobile"
              autocomplete="off"
            ></el-input>
          </el-form-item>

        </el-form>
        <div
          slot="footer"
          class="dialog-footer"
        >
          <el-button @click="editdialogFormVisible = false">取 消</el-button>
          <el-button
            type="primary"
            @click="submiteditform('editform')"
          >确 定</el-button>
        </div>
      </el-dialog>
    </template>

    <!-- 权限的赋值 -->
    <template>
      <el-dialog
        title="角色权限"
        :visible.sync="permissiondialogFormVisible"
      >
        <el-form
          :model="permissionform"
          label-width="120px"
          :rules="rules"
          ref="permissionform"
        >
          <el-form-item
            label="用户名"
            prop="username"
          >
            <el-input
              v-model="permissionform.username"
              :disabled="true"
              style="width:auto"

            ></el-input>
          </el-form-item>

        </el-form>
        <div
          slot="footer"
          class="dialog-footer"
        >
          <el-button @click="permissiondialogFormVisible = false">取 消</el-button>
          <el-button
            type="primary"
            @click="submitpermissionform('permissionform')"
          >确 定</el-button>
        </div>
      </el-dialog>
    </template>
  </div>
</template>

<script>
import {
  getUserList,
  addUser,
  changeUserStatus,
  findUserById,
  editUser,
  deleteUser
} from '@/api'
export default {
  data () {
    // 自定义验证手机号码是否合法
    var validPhone = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入手机号码'))
      } else {
        if (!this.checkPhone(value)) {
          callback(new Error('请输入正确的手机号码'))
        } else {
          callback()
        }
      }
    }
    return {
      // 是否显示权限对话框 默认是false
      permissiondialogFormVisible: false,
      // 赋值权限用户的信息
      permissionform: {
        id: '',
        username: ''
      },
      // 是否显示编辑对话框 默认是false
      editdialogFormVisible: false,
      //   编辑用户的信息
      editform: {
        id: '',
        username: '',
        email: '',
        mobile: ''
      },
      // 是否显示添加对话框 默认是false
      adddialogFormVisible: false,
      //  添加用户的信息
      addform: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      // 搜索关键字
      searchKey: '',
      //   当前页码
      pagenum: 1,
      //   每页显示的条数
      pagesize: 10,
      // 总条数
      total: 0,
      userList: [],
      //   验证用户输入是否合法
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          {
            type: 'email',
            message: '请输入正确的邮箱地址',
            trigger: 'blur,change'
          }
        ],
        mobile: [{ required: true, trigger: 'blur', validator: validPhone }]
      }
    }
  },
  methods: {
    //   点击赋值权限
    submitpermissionform () {

    },
    //   点击编辑用户---修改数据
    submiteditform (formname) {
      this.$refs[formname].validate(valid => {
        if (valid) {
          //   console.log(this.editform.id)

          // 表单输入正确 发送请求
          editUser(this.editform).then(results => {
            // console.log(results)
            if (results.meta.status === 200) {
              // 隐藏模态框
              this.editdialogFormVisible = false
              //  重新渲染页面
              this.init()
              // 修改成功之后，提醒用户添加成功
              this.$message({
                message: results.meta.msg,
                type: 'success'
              })
            }
          })
        } else {
          // 提醒用户输入正确的表单信息
          this.$message({
            message: '请正确输入表单信息',
            type: 'error'
          })
        }
      })
    },
    //   修改用户状态
    handleStatus (index, row) {
      console.log(row)
      // 获取当前这一行的用户的id
      var uid = row.id
      var type = row.mg_state
      //   console.log(typeof uid)
      //   console.log(type)
      changeUserStatus(uid, type).then(results => {
        // console.log(results)
        if (results.meta.status === 200) {
          // 提示用户修改成功
          this.$message({
            message: results.meta.msg,
            type: 'success'
          })
        } else {
          // 提示用户修改成功
          this.$message({
            message: results.meta.msg,
            type: 'error'
          })
        }
      })
    },
    //   添加用户--提交数据
    submitaddform (formname) {
      this.$refs[formname].validate(valid => {
        if (valid) {
          // 用户表单输入正确 ---发送请求
          addUser(this.addform).then(results => {
            // console.log(results)
            if (results.meta.status === 201) {
              // 添加成功之后，提醒用户添加成功
              this.$message({
                message: results.meta.msg,
                type: 'success'
              })
              //   重新渲染页面
              this.init()
              //   隐藏模态框
              this.adddialogFormVisible = false
              //   清空用户输入的内容
              this.$refs[formname].resetFields()
            } else {
              // 提示用户添加失败
              this.$message({
                message: results.meta.msg,
                type: 'error'
              })
            }
          })
        } else {
          // 提示用户输入完整表单
          this.$message({
            message: '请正确输入表单信息',
            type: 'error'
          })
        }
      })
    },
    //   查询用户数据
    findUsers () {
      this.init()
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
    // 编辑用户的按钮
    handleEdit (index, row) {
      console.log(index, row)
      //   显示模态框
      this.editdialogFormVisible = true
      //   获取用户的id查询当前的用户数据
      this.editform.id = row.id
      //   console.log(uid)
      findUserById(this.editform.id).then(results => {
        console.log(results)
        if (results.meta.status === 200) {
          this.editform.username = results.data.username
          this.editform.email = results.data.email
          this.editform.mobile = results.data.mobile
        }
      })
    },
    // 删除用户的按钮
    handleDelete (index, row) {
      console.log(index, row)
      this.$confirm(
        `此操作将永久删除id号为${row.id}的用户, 是否继续?`,
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      )
        .then(() => {
          //   确定的回调函数
          // 发送请求 删除用户信息
          deleteUser(row.id).then(results => {
            console.log(results)
          })
          // 提示用户
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          // 重新渲染页面数据
          this.init()
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 赋值权限的按钮
    handlePermission (index, row) {
      console.log(index, row)
      this.permissiondialogFormVisible = true
      //   获取用户的id查询当前的用户数据
      this.permissionform.id = row.id
      //   console.log(uid)
      findUserById(this.permissionform.id).then(results => {
        // console.log(results)
        if (results.meta.status === 200) {
          this.permissionform.username = results.data.username
        }
      })
    },
    // 改变用户状态
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
    },
    // 手机号码正则表达式
    checkPhone (phone) {
      var myreg = /^[1][3,4,5,7,8][0-9]{9}$/
      if (!myreg.test(phone)) {
        return false
      } else {
        return true
      }
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
