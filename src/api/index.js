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

// 添加用户的接口方法----是一个常量函数 export暴露出去 供外部使用
export const addUser = (params) => {
  // 通过return可以返回一个promise对象 它里面有一个方法是.then
  return axios.post('users', params).then(results => {
    //   通过return把结果返回到promise对象中
    return results.data
  })
}

// 修改用户状态的接口方法----是一个常量函数 export暴露出去 供外部使用
export const changeUserStatus = (uid, type) => {
  // 通过return可以返回一个promise对象 它里面有一个方法是.then
  return axios.put(`users/${uid}/state/${type}`).then(results => {
    //   通过return把结果返回到promise对象中
    return results.data
  })
}

// 根据id查找用户信息的接口方法----是一个常量函数 export暴露出去 供外部使用
export const findUserById = (uid) => {
  // 通过return可以返回一个promise对象 它里面有一个方法是.then
  return axios.get(`users/${uid}`).then(results => {
    //   通过return把结果返回到promise对象中
    return results.data
  })
}

// 编辑户信息的接口方法----是一个常量函数 export暴露出去 供外部使用
export const editUser = (params) => {
  // 通过return可以返回一个promise对象 它里面有一个方法是.then
  return axios.put(`users/${params.id}`, params).then(results => {
    //   通过return把结果返回到promise对象中
    return results.data
  })
}

// 删除用户信息的接口方法----是一个常量函数 export暴露出去 供外部使用
export const deleteUser = (uid) => {
  // 通过return可以返回一个promise对象 它里面有一个方法是.then
  return axios.delete(`users/${uid}`).then(results => {
    //   通过return把结果返回到promise对象中
    return results.data
  })
}

// 获取角色列表的接口方法----是一个常量函数 export暴露出去 供外部使用
export const getRoles = () => {
  // 通过return可以返回一个promise对象 它里面有一个方法是.then
  return axios.get(`roles`).then(results => {
    //   通过return把结果返回到promise对象中
    return results.data
  })
}

// 分配角色的接口方法----是一个常量函数 export暴露出去 供外部使用
export const allotRoles = (params) => {
  // 通过return可以返回一个promise对象 它里面有一个方法是.then
  return axios.put(`users/${params.id}/role`, {rid: params.rid}).then(results => {
    //   通过return把结果返回到promise对象中
    return results.data
  })
}

// 添加角色的接口方法----是一个常量函数 export暴露出去 供外部使用
export const addRoles = (params) => {
  // 通过return可以返回一个promise对象 它里面有一个方法是.then
  return axios.post(`roles`, params).then(results => {
    //   通过return把结果返回到promise对象中
    return results.data
  })
}

// 编辑角色的接口方法----是一个常量函数 export暴露出去 供外部使用
export const editRoles = (params) => {
  // 通过return可以返回一个promise对象 它里面有一个方法是.then
  return axios.put(`roles/${params.id}`, params).then(results => {
    //   通过return把结果返回到promise对象中
    return results.data
  })
}

// 删除角色的接口方法----是一个常量函数 export暴露出去 供外部使用
export const deleteRoles = (uid) => {
  // 通过return可以返回一个promise对象 它里面有一个方法是.then
  return axios.delete(`roles/${uid}`).then(results => {
    //   通过return把结果返回到promise对象中
    return results.data
  })
}
// 删除角色指定权限的接口方法----是一个常量函数 export暴露出去 供外部使用
export const deleteRolesRights = (roleId, rightId) => {
  // 通过return可以返回一个promise对象 它里面有一个方法是.then
  return axios.delete(`roles/${roleId}/rights/${rightId}`).then(results => {
    //   通过return把结果返回到promise对象中
    return results.data
  })
}

// 角色授权的接口方法----是一个常量函数 export暴露出去 供外部使用
export const roleAuthorization = (roleId, rids) => {
  // 通过return可以返回一个promise对象 它里面有一个方法是.then
  return axios.post(`roles/${roleId}/rights`, rids).then(results => {
    //   通过return把结果返回到promise对象中
    return results.data
  })
}

// 获取权限列表的接口----是一个常量函数 export暴露出去 供外部使用
export const getRightsList = (type) => {
  // 通过return可以返回一个promise对象 它里面有一个方法是.then
  return axios.get(`rights/${type}`).then(results => {
    //   通过return把结果返回到promise对象中
    return results.data
  })
}

// 左侧菜单权限的接口----是一个常量函数 export暴露出去 供外部使用
export const getMenus = (type) => {
  // 通过return可以返回一个promise对象 它里面有一个方法是.then
  return axios.get(`menus`).then(results => {
    //   通过return把结果返回到promise对象中
    return results.data
  })
}

// 获取商品列表的接口----是一个常量函数 export暴露出去 供外部使用
export const getGoodList = (params) => {
  // 通过return可以返回一个promise对象 它里面有一个方法是.then
  return axios.get('goods', {params: params}).then(results => {
    //   通过return把结果返回到promise对象中
    return results.data
  })
}

// 商品分类数据列表的接口----是一个常量函数 export暴露出去 供外部使用
export const getCategories = (params) => {
  // 通过return可以返回一个promise对象 它里面有一个方法是.then
  return axios.get('categories', {params: {'type': params}}).then(results => {
    //   通过return把结果返回到promise对象中
    return results.data
  })
}
// 添加商品数据列表的接口----是一个常量函数 export暴露出去 供外部使用
export const addGoods = (params) => {
  // 通过return可以返回一个promise对象 它里面有一个方法是.then
  return axios.post('goods', params).then(results => {
    //   通过return把结果返回到promise对象中
    return results.data
  })
}
// 删除商品数据列表的接口----是一个常量函数 export暴露出去 供外部使用
export const deleteGoods = (params) => {
  // 通过return可以返回一个promise对象 它里面有一个方法是.then
  return axios.delete(`goods/${params}`).then(results => {
    //   通过return把结果返回到promise对象中
    return results.data
  })
}
// 根据ID查询商品的接口----是一个常量函数 export暴露出去 供外部使用
export const getGoodsById = (params) => {
  // 通过return可以返回一个promise对象 它里面有一个方法是.then
  return axios.get(`goods/${params}`).then(results => {
    //   通过return把结果返回到promise对象中
    return results.data
  })
}

// 编辑提交商品的接口----是一个常量函数 export暴露出去 供外部使用
export const editGoods = (params) => {
  // 通过return可以返回一个promise对象 它里面有一个方法是.then
  return axios.put(`goods/${params.id}`, params).then(results => {
    //   通过return把结果返回到promise对象中
    return results.data
  })
}

// 添加分类的接口----是一个常量函数 export暴露出去 供外部使用
export const addCategories = (params) => {
  // 通过return可以返回一个promise对象 它里面有一个方法是.then
  return axios.post(`categories`, params).then(results => {
    //   通过return把结果返回到promise对象中
    return results.data
  })
}
// 删除分类的接口----是一个常量函数 export暴露出去 供外部使用
export const deleteCategories = (id) => {
  // 通过return可以返回一个promise对象 它里面有一个方法是.then
  return axios.delete(`categories/${id}`).then(results => {
    //   通过return把结果返回到promise对象中
    return results.data
  })
}

// 基于类型统计（饼图）的接口----是一个常量函数 export暴露出去 供外部使用
export const getReportsPie = (params) => {
  // 通过return可以返回一个promise对象 它里面有一个方法是.then
  return axios.get(`reports/${params}`).then(results => {
    //   通过return把结果返回到promise对象中
    return results.data
  })
}
