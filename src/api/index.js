// 引入模块
import axios from 'axios'

// 设置基准路径：因为请求的路径是相对于这个基准路径而言的
// 所以我们就需要让所有的路由都已这个路径作为参照
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'

// 为axios添加拦截器：因为所有的请求是都是通过axios来发送的，所以为他添加
// 拦截器就相当于所有请求添加了拦截器
// 他的功能：发送请求之前实现相应的业务处理
// 1.获取token值，如果有token值就同请求头的方式设置
// 2如果没有token，则实现拦截器的默认操作

// 添加拦截器
axios.interceptors.request.use(function (config) {
  //   console.log(config)

  //  1.获取token值，如果有token值就同请求头的方式设置
  var token = localStorage.getItem('admin_token')
  if (token) {
    // 在发送请求之前做些什么
    config.headers['Authorization'] = token
  }
  return config
}, function (error) {
  // 对请求错误的处理
  return Promise.reject(error)
})

// 登录验证接口方法----是一个常量函数 export暴露出去 供外部使用
export const login = (params) => {
  // 通过return可以返回一个promise对象 它里面有一个方法是.then
  return axios.post('login', params).then(results => {
    //   通过return把结果返回到promise对象中
    return results.data
  })
}
// 获取用户列表的接口
export const getUserList = (params) => {
  // 通过return可以返回一个promise对象 它里面有一个方法是.then
  return axios.get('users', {params: params}).then(results => {
    //   通过return把结果返回到promise对象中
    return results.data
  })
}
