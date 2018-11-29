<template>
  <div class="login">
    <div class="container">
      <img
        src="../assets/lbxx.jpg"
        alt=""
        class="avatar"
      >
      <el-form
        :model="loginForm"
        :rules="rules"
        ref="loginForm"
        class="demo-ruleForm"
      >
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            placeholder="用户名"
            prefix-icon="myicon myicon-user"
          ></el-input>
        </el-form-item>

        <el-form-item prop="password">
          <el-input
            type="password"
            v-model="loginForm.password"
            placeholder="密码"
            prefix-icon="myicon myicon-key"
          ></el-input>
        </el-form-item>
        <el-button
          type="primary"
          class="login-btn"
          @click="submitform('loginForm')"
        >登录</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
// 引入登录请求的api 不是默认的 要加{}
import { login } from '@/api'
export default {
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    }
  },
  methods: {
    submitform (formName) {
      // 验证用户是否正确登录 如果用户没有正确输入 取消发送请求
      this.$refs[formName].validate(valid => {
        //   valid如果为true表示验证成功
        if (valid) {
          // 调用接口，发送请求----返回的结果是promise对象 可以.then
          login(this.loginForm).then(results => {
            // console.log(results)
            if (results.meta.status === 200) {
              // 跳转
            } else {
              // 提示用户失败信息
              this.$message.error(results.meta.msg)
            }
          })
        } else {
          // 提示用户失败信息
          this.$message.error('登录失败，请输入完整信息')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: #2f4050;
  .container {
    position: absolute;
    left: 0;
    right: 0;
    width: 400px;
    padding: 0px 40px 15px 40px;
    margin: 200px auto;
    background: white;
    .avatar {
      position: relative;
      left: 50%;
      width: 120px;
      height: 120px;
      margin-left: -60px;
      margin-top: -60px;
      box-sizing: border-box;
      border-radius: 50%;
      border: 10px solid #fff;
      box-shadow: 0 1px 5px #ccc;
      overflow: hidden;
    }
    .login-btn {
      width: 100%;
    }
  }
}
</style>
