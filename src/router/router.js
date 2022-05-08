// 引入路由组件
import Home from '../views/Home/Home'
import Login from '../views/Login/index'
import Register from '../views/Register/index'
import Search from '../views/Search/index'
import Detail from '../views/Detail/index'
import AddCartSuccess from '@/views/AddCartSuccess'
import ShopCart from '@/views/ShopCart/index'
import Trade from '@/views/Trade'
import Pay from '@/views/Pay'
import PaySuccess from '@/views/PaySuccess'
import Center from '@/views/Center'
// 引入二级路由组件
import MyOrder from '@/views/Center/MyOrder'
import groupOrder from '@/views/Center/groupOrder'

// 暴露路由配置信息
export default [
  // 路由重定向
  // 配置路由元信息meta
  { path: '/', redirect: '/home', meta: { show: true } },
  // 配置路由
  { path: '/home', component: Home, meta: { show: true } },
  // 个人中心路由
  {
    path: '/center',
    name: 'center',
    component: Center,
    meta: { show: true },

    // 二级路由组件
    children: [
      {
        path: 'myorder',
        name: 'myorder',
        component: MyOrder
      },
      {
        path: 'grouporder',
        name: 'grouporder',
        component: groupOrder
      },
      {
        path: '/center',
        redirect: '/center/myorder'
      }
    ]
  },
  // 支付成功路由
  {
    path: '/paysuccess',
    name: 'paysuccess',
    component: PaySuccess,
    meta: { show: true }
  },
  // 支付路由
  {
    path: '/pay',
    name: 'pay',
    component: Pay,
    meta: { show: true },
    beforeEnter: (to, from, next) => {
      if (to.paht == '/trade') {
        next()
      } else {
        next(false)
      }
    }
  },
  // 提交商品路由
  {
    path: '/trade',
    name: 'trade',
    component: Trade,
    meta: { show: true },
    // 路由独享守卫
    beforeEnter: (to, from, next) => {
      // 去交易页面，必须是从购物车而来
      if (from.path == '/shopcart') {
        next()
      } else {
        // 从其他的路由组件而来，停滞在当前
        next(false)
      }
    }
  },
  {
    path: '/addcartsuccess',
    name: 'addcartsuccess',
    component: AddCartSuccess,
    meta: { show: true }
  },
  // 购物车路由
  {
    path: '/shopcart',
    name: 'shopcart',
    component: ShopCart,
    meta: { show: true }
  },

  { path: '/detail/:skuid?', component: Detail, meta: { show: true } },
  {
    path: '/search/:keyword?',
    name: 'search',
    component: Search,
    meta: { show: true }
  },
  { path: '/login', component: Login, meta: { show: false } },
  { path: '/register', component: Register, meta: { show: false } }
]
