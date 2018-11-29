<template>
  <div class="home">
    首页
  </div>
</template>
<script>
// 获取请求用户列表的数据
import { getUserList } from '@/api'
export default {
  data () {
    return {}
  },
  //   钩子函数---自动触发函数
  mounted () {
    getUserList({pagenum: 1, pagesize: 10})
  }
}
</script>
