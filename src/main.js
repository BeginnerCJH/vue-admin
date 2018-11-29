// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// 引入element
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 引入index.css
import '@/styles/index.scss'
// 引入按钮的样式
// import '../static/buttons.css'

// 使用element
Vue.use(ElementUI)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
