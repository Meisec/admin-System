import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
// 注册三级联动组件----全局组件
import TypeNav from '@/components/TypeNav/index'
import Carsousel from '@/components/Carsousel/index'
import Pagination from '@/components/Pagination/index'
import store from '@/store/index'
// 引入MockServe.js ----mock数据
import './mock/mockServe'
// 引入swiper样式
import 'swiper/css/swiper.css'

Vue.component(TypeNav.name, TypeNav)
Vue.component(Carsousel.name, Carsousel)
Vue.component(Pagination.name, Pagination)
//  统一接口api文件夹里面的全部请求函数  挂载到vm 原型上
// 统一引入
import * as API from '@/api'
// 引入 element-ui
import { Button, MessageBox, messageBox } from 'element-ui'
Vue.component(Button.name, Button)
// 挂载到原型上
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert

// 引入插件
import '@/plugins/validate'
import VueLazyload from 'vue-lazyload'
import hmbb from './assets/1.gif'
// 注册组件
Vue.use(VueLazyload, {
  // 懒加载默认的图片
  loading: hmbb
})
Vue.config.productionTip = false

new Vue({
  beforeCreate() {
    Vue.prototype.$bus = this // 挂载全局事件总线
    Vue.prototype.$API = API
  },
  // 注册路由
  router,
  // 注册Vuex
  store,
  render: (h) => h(App)
}).$mount('#app')
