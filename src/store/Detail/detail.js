// 导入需要调用接口的函数
import { reqGoodsInfo, reqAddOrUpdateShopCart } from '../../api'
// 封装的游客临时登录模块，生成一个随机的字符串（不能改变）引入uuid
import { getUUID } from '.././../utils/uuid_token'
const detailAbout = {
  namespaced: true,
  state: {
    goodsInfo: {},
    // 游客临时身份登录
    uuid_token: getUUID()
  },
  actions: {
    // 获取产品详情信息的action
    async getGoodsInfo(context, skuId) {
      let result = await reqGoodsInfo(skuId)
      // console.log(result)
      if (result.code === 200) {
        context.commit('GETFOODSINFO', result.data)
      }
    },
    // 将产品添加到购物车中
    async addShopCart(context, { skuId, skuNum }) {
      // 加入购物车返回的结果
      // 加入购物车后，发送请求，前台将参数带给服务器
      // 服务器写入数据成功，并没有返回其他的数据，只是返回code = 200 代表这次操作成功
      let result = await reqAddOrUpdateShopCart(skuId, skuNum)
      if (result.code == 200) {
        return 'ok'
      } else {
        return Promise.reject(new Error('file'))
      }
    }
  },
  mutations: {
    GETFOODSINFO(state, value) {
      state.goodsInfo = value
    }
  },
  // 简化数据而生
  getters: {
    // 简化导航路径
    categoryView(state) {
      return state.goodsInfo.categoryView || {}
    },
    // 简化产品信息
    skuInfo(state) {
      return state.goodsInfo.skuInfo || {}
    },
    //产品售卖属性的简化
    spuSaleAttrList(state) {
      return state.goodsInfo.spuSaleAttrList || []
    }
  }
}

export default detailAbout
