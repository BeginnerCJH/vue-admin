// 引入模块
import axios from 'axios'
// 设置基准路径
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
// 登录验证接口方法----是一个常量函数 export暴露出去 供外部使用
export const login = (params) => {
  // 通过return可以返回一个promise对象 它里面有一个方法是.then
  return axios.post('login', params).then(results => {
    //   通过return把结果返回到promise对象中
    return results.data
  })
}
