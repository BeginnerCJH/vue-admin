// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/store'

// 引入element
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 引入index.css
import '@/styles/index.scss'

// 引入富文本编辑器
import VueQuillEditor from 'vue-quill-editor'

// 引入富文本的样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
// 引入地图
import VueAMap from 'vue-amap'

// 使用element
Vue.use(ElementUI)

// 使用富文本
Vue.use(VueQuillEditor)

// 使用vueamap
Vue.use(VueAMap)

// 初始化vueamap
VueAMap.initAMapApiLoader({
  // 高德的key
  key: '6a204f2b675f32f8849ec4b6b7c21e5c',
  // 插件集合
  plugin: ['AMap.Autocomplete',
    'AMap.PlaceSearch',
    'AMap.Scale',
    'AMap.OverView',
    'AMap.ToolBar',
    'AMap.MapType',
    'AMap.PolyEditor',
    'AMap.CircleEditor',
    'AMap.Geolocation'
  ],
  // 高德 sdk 版本，默认为 1.4.4
  v: '1.4.4'
})
Vue.config.productionTip = false

// 导航守卫---三个参数 to到哪里去  from从哪里来 next()下一个钩子函数
router.beforeEach((to, from, next) => {
  // 获取token值
  var token = localStorage.getItem('admin_token')
  // 判断是否存在token值 或者页面是否处于登录页
  if (token || to.path === '/login') {
    next()
  } else {
    // 跳转回登录页
    next({ path: '/login' })
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
