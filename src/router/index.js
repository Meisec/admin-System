import Vue from 'vue'
import VueRouter from 'vue-router'
// 使用插件
Vue.use(VueRouter)
// 引入 router.js组件
import routes from './router'
// 引入store
import store from '@/store'
let orginPush = VueRouter.prototype.push
let orginReplace = VueRouter.prototype.replace

// 重写push | replace
VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    orginPush.call(this, location, resolve, reject)
  } else {
    orginPush.call(
      this,
      location,
      () => {},
      () => {}
    )
  }
}

VueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {
    orginReplace.call(this, location, resolve, reject)
  } else {
    orginReplace.call(
      this,
      location,
      () => {},
      () => {}
    )
  }
}
// 配置路由
const router = new VueRouter({
  routes,
  // 滚动行为的方法
  scrollBehavior(to, from, savePosition) {
    // 返回的这个y=0 代表的是滚动条在最上方
    return { y: 0 }
  }
})

// 全局守卫： 前置守卫（在路由跳转之前进行判断）
router.beforeEach(async (to, from, next) => {
  // to:可以获取到你要跳转到哪个路由信息
  // from：可以获取到你从哪个路由信息而来的信息
  // next ：放行函数 next() ---- next('/login) 放行到指定位置
  next()
  let token = store.state.userAbout.token
  let name = store.state.userAbout.userInfo.name
  // console.log(store)
  if (token) {
    // 如果用户已经登录，那么在想去登录页是不行的
    if (to.path === '/login' || to.path === '/register') {
      next('/')
    } else {
      // 登陆了，但是去的不是login
      if (name) {
        next()
      } else {
        // 如果没有name 那就派发actions
        try {
          // 获取用户信息成功在首页展示
          await store.dispatch('userAbout/getUserInfo')
        } catch (error) {
          // token 失效了 ，身份过期 ，重新登录
          // 清除token
          store.dispatch('userAbout/userLoginOut')
          // 重新登录
          next('/login')
        }
      }
    }
  } else {
    // 用户未登录:不能去交易相关、不能去支付相关、不能去个人中心
    // 未登录不能去上面这些路由--- 登录
    let toPath = to.path
    if (
      toPath.indexOf('./trade') != -1 ||
      toPath.indexOf('/pay') != -1 ||
      toPath.indexOf('/center') != -1
    ) {
      // 把未登录的时候想去而没有去的信息地址 通过query 参数携带
      next('/login?redirect=' + toPath)
    } else {
      // 去的不是上面那些路由 而是（home| search| shopcart---放行）
      next()
    }
  }
})

export default router
