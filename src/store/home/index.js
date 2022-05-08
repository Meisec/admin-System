import { reqCategoryList, reqGetBannerList, reqGetFloorList } from '@/api/index'
const homeAbout = {
  namespaced: true,
  // state中默认的初始值不能瞎写，服务器返回的是对象，初始值就设置为对象，
  // [根据接口返回值初始化state中的数据]
  state: {
    categoryList: [],
    // 轮播图数据
    bannerList: [],
    // floor 数据
    floorList: []
  },
  actions: {
    // 通过API里面的接口函数调用，向服务器发送请求，获取到里面的数据
    async categoryList(context) {
      let result = await reqCategoryList()
      // console.log(result)
      if (result.code === 200) {
        context.commit('CATEGORYLIST', result.data)
        // console.log(context)
      }
    },
    async getBannderList(context) {
      let result = await reqGetBannerList()
      // console.log(result)
      if (result.code === 200) {
        context.commit('GETBANNERLIST', result.data)
      }
    },
    async getFloorList(context) {
      let result = await reqGetFloorList()
      // console.log(result)
      if (result.code === 200) {
        context.commit('GETFLOORLIST', result.data)
      }
    }
  },
  mutations: {
    CATEGORYLIST(state, value) {
      state.categoryList = value
    },
    GETBANNERLIST(state, value) {
      state.bannerList = value
    },
    GETFLOORLIST(state, value) {
      state.floorList = value
    }
  },
  getters: {}
}
export default homeAbout
