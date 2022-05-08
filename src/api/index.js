// 当前这个模块：Api进行统一管理
import requests from './request'
import mockRequest from './requestMock'
// 三级联动接口 GET请求 无参数
//发请求
export const reqCategoryList = () =>
  requests({ url: '/product/getBaseCategoryList', method: 'GET' })

// 获取banner （Home首页轮播图数据）
export const reqGetBannerList = () => {
  return mockRequest.get('/banner')
}

// 获取floor （floor数据）
export const reqGetFloorList = () => {
  return mockRequest.get('/floor')
}

// 获取搜索模块的数据 地址：/api/list  请求方式：POST    参数：需要带参数
// 当前这个接口（获取搜索模块的数据），给服务器传递一个默认参数【至少是一个空对象】
export const reqGetSearchInfo = (params) =>
  requests({
    url: '/list',
    method: 'POST',
    data: params
  })

// 获取商品详情页信息的接口 URL：/api/item/{ skuId }请求方式：GET 参数：ID
export const reqGoodsInfo = (skuId) =>
  requests({
    url: `/item/${skuId}`,
    method: 'GET'
  })

// 将产品添加到购物车里面（或者 获取更新某一个产品的个数）
// /api/cart/addToCart/{ skuId }/{ skuNum }
export const reqAddOrUpdateShopCart = (skuId, skuNum) =>
  requests({
    url: `/cart/addToCart/${skuId}/${skuNum}`,
    method: 'POST'
  })

// 获取购物车列表数据的接口
// url： /api/cart/cartList  请求方式：get     无参数
export const reqShopCart = () =>
  requests({
    url: '/cart/cartList',
    method: 'GET'
  })

// 删除购物车的数据 /api/cart/deleteCart/{skuId}
// 请求方式 DELETE 参数 id
export const deleteShopCart = (skuId) =>
  requests({
    url: `/cart/deleteCart/${skuId}`,
    method: 'DELETE'
  })

// 修改产品状态接口   参数:{skuID}/{isChecked}
// url：/api/cart/checkCart/{skuID}/{isChecked}  method：get
export const reqUpdateCheckedById = (skuId, isChecked) =>
  requests({
    url: `/cart/checkCart/${skuId}/${isChecked}`,
    method: 'GET'
  })

// 获取验证码接口 URl：/api/user/passport/sendCode/{phone} 带参数
// 请求方式 GET
export const reqGetCode = (phone) =>
  requests({
    url: `/user/passport/sendCode/${phone}`,
    method: 'GET'
  })

// 注册接口 url：/api/user/passport/register 请求方式 POST
//  参数：phone password code
export const reqUserRegister = (data) =>
  requests({
    url: `/user/passport/register`,
    method: 'POST',
    data
  })

// 登录接口 url：/api/user/passport/login 请求方式：POST
// 参数phone password
export const reqLogin = (phone, password) =>
  requests({
    url: '/user/passport/login',
    method: 'POST',
    data: {
      phone,
      password
    }
  })

// 获取用户信息【需要带着用户的token向服务器要用户信息】 因为接口不能携带参数，所以得去请求头携带参数
// URl：/api/user/passport/auth/getUserInfo  method：GET
export const reqUserInfo = () =>
  requests({
    url: '/user/passport/auth/getUserInfo',
    method: 'GET'
  })

// 退出登录
// url：/api/user/passport/logout GET
export const reqLoginOut = () =>
  requests({
    url: '/user/passport/logout',
    method: 'get'
  })

// 获取用户地址的信息
// 无参数 /api/user/userAddress/auth/findUserAddressList GET请求
export const reqAddressInfo = () =>
  requests({
    url: '/user/userAddress/auth/findUserAddressList',
    method: 'GET'
  })

// 获取商品清单 请求方式 get  参数：orderId
// 请求地址 /api/order/auth/trade
export const reqOrderInfo = () =>
  requests({
    url: `/order/auth/trade`,
    method: 'GET'
  })

// 提交订单的接口 /api/order/auth/submitOrder?tradeNo={tradeNo}
// 参数: ?tradeNo={tradeNo}                  请求方式""POST"
export const reqSubmitOrder = (tradeNo, data) =>
  requests({
    url: `/order/auth/submitOrder?tradeNo=${tradeNo}`,
    data,
    method: 'POST'
  })

// 获取订单支付信息 GET请求
// /api/payment/weixin/createNative/{orderId}
export const reqPayInfo = (orderId) =>
  requests({
    url: `/payment/weixin/createNative/${orderId}`
  })

// 获取支付订单状态 url/api/payment/weixin/queryPayStatus/{orderId}
// 请求方式GET  参数 orderId
export const reqPayStatus = (orderId) =>
  requests({
    url: `/payment/weixin/queryPayStatus/${orderId}`,
    method: 'GET'
  })

// 获取个人中心的数据   url：/api/order/auth/{page}/{limit}
// 请求方式 GET
export const reqMyOrderList = (page, limit) =>
  requests({
    url: `/order/auth/${page}/${limit}`,
    method: 'GET'
  })
