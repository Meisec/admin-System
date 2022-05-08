// 引入需要的接口
import { reqAddressInfo, reqOrderInfo } from '@/api'

const tradeAbout = {
  namespaced: true,
  state: {
    address: [],
    orderInfo: {},
    orderInfolist: []
  },
  actions: {
    // 获取用户地址信息
    async getUserAddress({ commit }) {
      let result = await reqAddressInfo()
      // console.log(result)
      if (result.code == 200) {
        commit('GETUSERADDRESS', result.data)
      }
    },
    // 获取商品清单数据
    async getOrderInfo(context) {
      let result = await reqOrderInfo()
      if (result.code == 200) {
        context.commit('GETORDERINFO', result.data)
      }
    }
  },
  mutations: {
    GETUSERADDRESS(state, value) {
      state.address = value
    },
    GETORDERINFO(state, value) {
      state.orderInfo = value
    }
  },
  getters: {
    orderInfolist(state) {
      return state.orderInfo.detailArrayList || []
    }
  }
}

export default tradeAbout
