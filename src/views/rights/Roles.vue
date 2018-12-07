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
        @expand-change="expandSelect"
        :row-key='getRowKeys'
          :expand-row-keys="expands"
      >
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-row
              v-show="props.row.children.length===0"
              :gutter="20"
            >
              <el-col :span="6">
                <div>
                  该角色还没有分配任何的权限
                </div>
              </el-col>
            </el-row>
            <el-row
              :gutter="20"
              v-for="(value,index) in props.row.children"
              :key="index"
            >
              <el-col :span="4">
                <el-tag
                  :key="index"
                  closable
                  type="success"
                  @close='close(props.row,value.id)'
                >
                  {{value.authName}}
                </el-tag>
                <span
                  v-if='value.children.length!==0'
                  class="el-icon-arrow-right"
                ></span>

              </el-col>
              <el-col :span="20">
                <el-row
                  :gutter="20"
                  v-for="(value2,index2) in value.children"
                  :key="index2"
                >
                  <el-col :span="4">
                    <el-tag
                      closable
                      type=""
                      @close='close(props.row,value2.id)'
                    >
                      {{value2.authName}}

                    </el-tag>
                    <span
                      v-if='value2.children.length!==0'
                      class="el-icon-arrow-right"
                    ></span>
                  </el-col>
                  <el-col :span="20">
                    <el-tag
                      v-for="(value3,index3) in value2.children"
                      :key="index3"
                      closable
                      type="warning"
                      @close='close(props.row,value3.id)'
                      style="margin-left:10px"
                    >
                      {{value3.authName}}
                    </el-tag>

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
              content="分配权限"
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
          <el-form-item
            label="角色描述"
            prop="roleDesc"
          >
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
        title="分配权限"
        :visible.sync="authorizationdialogFormVisible"
      >
        <el-card
          shadow="always"
          style="margin:10px"
        >
          <span class="name">授权角色：<span style="color:#67c23a">{{roleName}}</span></span>
          <span
            class="desc"
            style="margin-left:20px"
          >主要职能：<span style="color:#f56c6c">{{roleDesc}}</span></span>
        </el-card>
        <!-- tree树 -->
        <el-scrollbar style="height:100%">
          <el-tree
            :data="rolesData"
            show-checkbox
            default-expand-all
            node-key="id"
            ref="tree"
            :default-checked-keys="checkedKeys"
            :props="defaultProps"
            style="height:400px"
          >

          </el-tree>
        </el-scrollbar>

        <div
          slot="footer"
          class="dialog-footer"
        >
          <el-button @click="authorizationdialogFormVisible = false">取 消</el-button>
          <el-button
            type="primary"
            @click="getCheckedNodes"
          >确 定</el-button>
        </div>
      </el-dialog>
    </template>
  </div>
</template>

<script>
import {
  getRoles,
  addRoles,
  editRoles,
  deleteRoles,
  getRightsList,
  deleteRolesRights,
  roleAuthorization
} from '@/api'
export default {
  data () {
    return {
      expands: [],
      getRowKeys (row) {
        return row.id
      },
      // 角色数据
      rolesData: [],
      // 选中权限数据
      checkedKeys: [],
      // 角色id---分批权限要使用
      roleId: '',
      roleName: '',
      roleDesc: '',
      defaultProps: {
        children: 'children',
        label: 'authName'
      },
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
        ],
        roleDesc: [
          { required: true, message: '请输入角色名称', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 表格变化
    expandSelect (row, expandedRows) {
      // console.log(row)
      // console.log(expandedRows)
      var that = this
      if (expandedRows.length) {
        that.expands = []
        if (row) {
          that.expands.push(row.id)
        }
      } else {
        that.expands = []
      }
    },
    // 提交授权修改
    getCheckedNodes () {
      // console.log(this.$refs.tree.getCheckedNodes()) // 可以获取到每一个被选中的节点对象
      // 1获取去每个被选中的对象 ---返回的结果是一个数组
      var selectednodes = this.$refs['tree'].getCheckedNodes()
      // console.log(selectednodes)
      // 2把获取的数组对象遍历 拿到里面的每个id和pid 通过 连接
      // map遍历数组 可以返回一个数组
      var nodesArr = selectednodes.map(value => {
        return `${value.id},${value.pid}`
      })
      // console.log(nodesArr)
      // 3 返回的数据格式["105,104,101", "116,104,101"] 通过join转为连接一起的字符串 有重复值
      var nodesStr = nodesArr.join(',')
      // console.log(nodesStr)
      // 4通过es6的new Set去除数组的重复值---返回的结果是一个set对象
      var nodesSet = new Set(nodesStr.split(','))
      // console.log(nodesSet)
      // 5通过Array.from方法可以将Set结构转为数组。
      var nodesNoRepeatArr = Array.from(nodesSet)
      // console.log(nodesNoRepeatArr)
      // 6把数据转成我们最终需要的以，分割的列表
      var rids = nodesNoRepeatArr.join(',')
      console.log(rids, this.roleId)
      // 发送请求 实现角色授权
      roleAuthorization(this.roleId, { rids: rids }).then(results => {
        console.log(results)
        if (results.meta.status === 200) {
          // 隐藏模态框
          this.authorizationdialogFormVisible = false
          // 更新数据
          this.init()
          // 提示用户更新成功
          this.$message({
            type: 'success',
            message: results.meta.msg
          })
        } else {
          // 提示用户更新失败
          this.$message({
            type: 'success',
            message: results.meta.msg
          })
          // 隐藏模态框
          this.authorizationdialogFormVisible = false
        }
      })
    },
    // 删除角色指定的权限
    close (row, rightId) {
      // console.log('啊 我死了' + roleId, rightId)
      deleteRolesRights(row.id, rightId).then(results => {
        // console.log(results)
        if (results.meta.status === 200) {
          // 提示用户
          this.$message({
            type: 'success',
            message: results.meta.msg
          })
          // 重新替换数据
          row.children = results.data
        } else {
          this.$message({
            type: 'error',
            message: results.meta.msg
          })
        }
      })
    },
    //   编辑数据提交
    submiteditform (formname) {
      // 验证用户是否正确输入表单内容
      this.$refs[formname].validate(valid => {
        if (valid) {
          //   表单输入正确 发送请求
          editRoles(this.editform).then(results => {
            // console.log(results)
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
              //   隐藏模态框
              this.editdialogFormVisible = false
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
              this.$refs[formname].resetFields()
              //   隐藏模态框
              this.adddialogFormVisible = false
              // 重新渲染数据
              this.init()
            } else {
              // 提示用户失败
              this.$message({
                message: results.meta.msg,
                type: 'error'
              })
              //   隐藏模态框
              this.adddialogFormVisible = false
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
        // console.log(results)
        if (results.meta.status === 200) {
          this.rolesList = results.data
          //   console.log(results.data)
        } else {
          // 提示用户失败
          this.$message({
            message: results.meta.msg,
            type: 'error'
          })
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
      //
      this.roleId = row.id
      this.roleName = row.roleName
      this.roleDesc = row.roleDesc
      //   显示模态框
      this.authorizationdialogFormVisible = true
      getRightsList('tree').then(results => {
        // console.log(results)
        if (results.meta.status === 200) {
          this.rolesData = results.data
        } else {
          // 提示用户失败
          this.$message({
            message: results.meta.msg,
            type: 'error'
          })
        }
      })
      // 先清除上次的id号
      this.checkedKeys.length = 0

      row.children.forEach(first => {
        if (first.children && first.children.length !== 0) {
          first.children.forEach(second => {
            if (second.children && first.children.second !== 0) {
              second.children.forEach(third => {
                this.checkedKeys.push(third.id)
              })
            }
          })
        }
      })
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
