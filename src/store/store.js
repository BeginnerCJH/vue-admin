import Vue from 'vue'
import Vuex from 'vuex'
// 使用vuex
Vue.use(Vuex)

// 存储数据对象
const state = {
  username: ''
}
// 操作state中数据的函数
const mutations = {
  // 设置用户名
  setUsername (state, name) {
    state.username = name
  },
  //  获取用户名
  getUsername (state) {
    return state.username
  }
}
// 触发mutations中函数的函数
const actions = {
  setActions: ({commit}, name) => {
    commit('setUsername', name)
  },
  getActions: ({commit}) => {
    commit('getUsername')
  }
}
const getters = {}
export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
