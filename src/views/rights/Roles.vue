<template>
  <div class="roles">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 添加用户按钮 -->
    <div style="margin-bottom: 10px">
      <el-button
        type="success"
        plain
        @click="adddialogFormVisible=true"
      >添加角色</el-button>
    </div>

    <!-- 角色列表数据渲染 -->
    <template>
      <el-table
        :data="rolesList"
        style="width: 100%"
        border
      >
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-row
              :gutter="20"
              v-for="(value,index) in props.row.children"
              :key="index"
            >

              <el-col :span="2">
                <div class="one">{{value.authName}}</div>
              </el-col>
              <el-col
                :span="20"
                :offset="2"
              >
                <el-row
                  :gutter="20"
                  v-for="(value2,index2) in value.children"
                  :key="index2"
                >
                  <el-col :span="2">
                    <div class="two">{{value2.authName}}</div>
                  </el-col>
                  <el-col
                    :span="18"
                    :offset="2"
                  >

                    <el-col
                      :span="3"
                      v-for="(value3,index3) in value2.children"
                      :key="index3"
                    >
                      <div class="three">{{value3.authName}}</div>
                    </el-col>

                  </el-col>
                </el-row>
              </el-col>

            </el-row>
          </template>
        </el-table-column>
        <el-table-column type="index">
        </el-table-column>
        <el-table-column
          label="角色名称"
          prop="roleName"
        >
        </el-table-column>
        <el-table-column
          label="描述"
          prop="roleDesc"
        >
        </el-table-column>
        <el-table-column label="操作">
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
                icon="el-icon-edit"
                plain
                @click="handleEdit(scope.$index, scope.row)"
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
                icon="el-icon-delete"
                plain
                @click="handleDelete(scope.$index, scope.row)"
              ></el-button>
            </el-tooltip>
            <el-tooltip
              class="item"
              effect="dark"
              content="授权角色"
              placement="top"
            >
              <el-button
                size="mini"
                type="info"
                icon="el-icon-check"
                plain
                @click="handleAuthorization(scope.$index, scope.row)"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </template>

    <!-- 添加新角色 -->
    <template>
      <el-dialog
        title="添加新角色"
        :visible.sync="adddialogFormVisible"
      >
        <el-form
          :model="addform"
          label-width="120px"
          ref="addform"
          :rules="rules"
        >
          <el-form-item
            label="角色名称"
            prop="roleName"
          >
            <el-input
              v-model="addform.roleName"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="角色描述">
            <el-input
              v-model="addform.roleDesc"
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
    <!-- 编辑角色 -->
    <template>
      <el-dialog
        title="编辑角色"
        :visible.sync="editdialogFormVisible"
      >
        <el-form
          :model="editform"
          label-width="120px"
          ref="editform"
          :rules="rules"
        >
          <el-form-item
            label="角色名称"
            prop="roleName"
          >
            <el-input
              v-model="editform.roleName"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="角色描述">
            <el-input
              v-model="editform.roleDesc"
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

    <!-- 授权角色 -->
<template>
      <el-dialog
        title="授权角色"
        :visible.sync="authorizationdialogFormVisible"
      >
        <el-form
          :model="authorizationform"
          label-width="120px"
          ref="authorizationform"
          :rules="rules"
        >

        </el-form>
        <div
          slot="footer"
          class="dialog-footer"
        >
          <el-button @click="authorizationdialogFormVisible = false">取 消</el-button>
          <el-button
            type="primary"
            @click="submitauthorizationform('authorizationform')"
          >确 定</el-button>
        </div>
      </el-dialog>
    </template>
  </div>
</template>

<script>
import { getRoles, addRoles, editRoles, deleteRoles } from '@/api'
export default {
  data () {
    return {
      // 模态框 默认不显示
      authorizationdialogFormVisible: false,
      // 添加新角色的数据
      authorizationform: {
        id: '',
        roleName: '',
        roleDesc: ''
      },
      // 模态框 默认不显示
      editdialogFormVisible: false,
      // 添加新角色的数据
      editform: {
        id: '',
        roleName: '',
        roleDesc: ''
      },
      // 模态框 默认不显示
      adddialogFormVisible: false,
      // 添加新角色的数据
      addform: {
        roleName: '',
        roleDesc: ''
      },
      // 角色数据渲染
      rolesList: [],
      //   验证规则
      rules: {
        roleName: [
          { required: true, message: '请输入角色名称', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    //   编辑数据提交
    submiteditform (formname) {
      // 验证用户是否正确输入表单内容
      this.$refs[formname].validate(valid => {
        if (valid) {
          //   表单输入正确 发送请求
          editRoles(this.editform).then(results => {
            console.log(results)
            if (results.meta.status === 200) {
              // 提示用户修改成功
              this.$message({
                message: results.meta.msg,
                type: 'success'
              })
              //   隐藏模态框
              this.editdialogFormVisible = false
              // 重新渲染数据
              this.init()
            } else {
              this.$message({
                message: results.meta.msg,
                type: 'error'
              })
            }
          })
        } else {
          //   提示用户输入完整表单
          this.$message({
            message: '请输入完整表单内容',
            type: 'error'
          })
        }
      })
    },
    //   添加提交数据
    submitaddform (formname) {
      // 验证用户是否正确输入表单内容
      this.$refs[formname].validate(valid => {
        if (valid) {
          //   表单输入正确 发送请求
          addRoles(this.addform).then(results => {
            console.log(results)
            if (results.meta.status === 201) {
              // 提示用户创建成功
              this.$message({
                message: results.meta.msg,
                type: 'success'
              })
              //   隐藏模态框
              this.adddialogFormVisible = false
              // 重新渲染数据
              this.init()
            } else {
              this.$message({
                message: results.meta.msg,
                type: 'error'
              })
            }
          })
        } else {
          //   提示用户输入完整表单
          this.$message({
            message: '请输入完整表单内容',
            type: 'error'
          })
        }
      })
    },
    // 获取角色数据渲染
    init () {
      getRoles().then(results => {
        console.log(results)
        if (results.meta.status === 200) {
          this.rolesList = results.data
          //   console.log(results.data)
        }
      })
    },
    //   编辑
    handleEdit (index, row) {
      console.log(index, row)
      this.editform.id = row.id
      this.editform.roleName = row.roleName
      this.editform.roleDesc = row.roleDesc
      //   显示模态框
      this.editdialogFormVisible = true
    },
    // 删除
    handleDelete (index, row) {
      console.log(index, row)
      this.$confirm(
        `此操作将永久删除角色名称为${row.roleName}的角色, 是否继续?`,
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      )
        .then(() => {
          //   确定的回调函数
          deleteRoles(row.id).then(results => {
            if (results.meta.status === 200) {
              this.$message({
                type: 'success',
                message: results.meta.msg
              })
              // 重新渲染页面数据
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
    // 授权
    handleAuthorization (index, row) {
      console.log(index, row)
      //   显示模态框
      this.authorizationdialogFormVisible = true
    }
  },
  mounted () {
    this.init()
  }
}
</script>

<style lang="scss" scoped>
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
  //   text-align: center;
  //   line-height: 45px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
