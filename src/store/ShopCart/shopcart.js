//  引入需要的接口
import { reqShopCart, deleteShopCart, reqUpdateCheckedById } from '@/api/index'

const shopcartAbout = {
  namespaced: true,
  state: { cartList: [] },
  actions: {
    // 请求购物车列表数据
    async getShopCart(context) {
      let result = await reqShopCart()
      // console.log(result)
      if (result.code == 200) {
        context.commit('GETSHOPCART', result.data)
      }
    },
    // 删除购物车的数据
    async deleteCartList(context, skuId) {
      let result = await deleteShopCart(skuId)
      // console.log(result)
      if (result.code == 200) {
        return 'ok'
      } else {
        return Promise.reject(new Error('faile'))
      }
    },
    // 修改购物车某一个商品选中的状态的请求
    async getUpdateCheckedById(context, { skuId, isChecked }) {
      let result = await reqUpdateCheckedById(skuId, isChecked)
      if (result.code == 200) {
        return 'ok'
      } else {
        return Promise.reject(new Error('faile'))
      }
    },
    // 删除所有的购物车选中的信息
    deleteAllCart({ getters, dispatch }) {
      // context 上下文
      // 将 购物车里的数据提取出来
      let cartInfoList = getters.cartList.cartInfoList
      // 获取购物车中全部的产品
      let promiseAll = []
      cartInfoList.forEach((item) => {
        let promise =
          item.isChecked == 1 ? dispatch('deleteCartList', item.skuId) : ''
        // 将每一次返回的结果添加到数组中
        promiseAll.push(promise)
      })
      return Promise.all(promiseAll)
    },
    // 全选按钮的操作
    updateAllCartIsChecked({ dispatch, state }, isChecked) {
      // 定义一个空数组
      let promiseAll = []
      state.cartList[0].cartInfoList.forEach((item) => {
        let promise = dispatch('getUpdateCheckedById', {
          skuId: item.skuId,
          isChecked
        })
        // 将结果添加到数组里面
        promiseAll.push(promise)
      })
      // 最终的返回结果
      return Promise.all(promiseAll)
    }
  },
  mutations: {
    GETSHOPCART(state, value) {
      state.cartList = value
    }
  },
  // 利用getter 简化数据
  getters: {
    cartList(state) {
      return state.cartList[0] || {}
    }
  }
}

export default shopcartAbout
