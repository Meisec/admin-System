import Vue from 'vue'
import Vuex from 'vuex'
import homeAbout from './home/index'
import searchAbout from './search/index'
import detailAbout from './Detail/detail'
import shopcartAbout from './ShopCart/shopcart'
import userAbout from './User/User'
import tradeAbout from './Trade/Trade'

// 使用插件
Vue.use(Vuex)
// 对外暴露Store类的实例
export default new Vuex.Store({
  modules: {
    homeAbout,
    searchAbout,
    detailAbout,
    shopcartAbout,
    userAbout,
    tradeAbout
  }
})
