import { reqGetSearchInfo } from '@/api/index'

const searchAbout = {
  namespaced: true,
  state: {
    // 因为接口传递回来的数据是一个对象格式，所以这里初始值就设置为空对象
    searchList: {}
  },
  actions: {
    async getSearchInfo(context, params = {}) {
      // 调用这个接口必须带一个空对象
      let result = await reqGetSearchInfo(params)
      // console.log(result)
      if (result.code === 200) {
        context.commit('GETSEARCHINFO', result.data)
      }
    }
  },
  mutations: {
    GETSEARCHINFO(state, value) {
      state.searchList = value
    }
  },
  // 计算属性，在项目当中，为了简化数据而生。主要作用是简化仓库中的数据
  // 可以把我们将来在子组件当中需要用的数据简化一下，这样组件获取的时候会很方便
  getters: {
    // 当前形参state，是当前仓库的state 而不是大仓库中的state
    goodsList(state) {
      // state.searchList.goodsList如果服务器数据回来了，返回的是一个数组
      // 假如网络不给力|没有网络，则返回的是一个undefined，可能会出现错误
      // 这里返回的数组的数据值必须是一个数组，哪怕是空的
      return state.searchList.goodsList || []
    },
    attrsList(state) {
      return state.searchList.attrsList || []
    },
    trademarkList(state) {
      return state.searchList.trademarkList || []
    }
  }
}
export default searchAbout
