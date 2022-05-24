// 登陆与注册的模块
// 引入 Token 模快
import { setToken, getToken, removeToken } from '@/utils/Token'
// 引入需要的请求接口
import {
  reqGetCode,
  reqUserRegister,
  reqLogin,
  reqUserInfo,
  reqLoginOut
} from '@/api/index'
const userAbout = {
  namespaced: true,
  state: {
    codeNum: '',
    token: getToken(),
    userInfo: {}
  },
  actions: {
    // 获取验证码
    async getGetCode(context, phone) {
      // 获取验证码的这个接口，把验证码返回，但是正常情况，后台把验证码发到用户手机上
      let result = await reqGetCode(phone)
      // console.log(result)
      //  正常情况下下边代码不需要写，返回的信息由用户输入到指定框中
      if (result.code == 200) {
        context.commit('GETGETCODE', result.data)
        return 'ok'
      } else {
        return Promise.reject(new Error('faile'))
      }
    },
    // 用户注册
    async userReister(context, user) {
      let result = await reqUserRegister(user)
      console.log(result)
      if (result.code == 200) {
        return 'ok'
      } else {
        return Promise.reject(new Error('faile'))
      }
    },
    // 登陆业务 [Token]
    async userLogin(context, { phone, password }) {
      let result = await reqLogin(phone, password)
      // console.log(result)
      if (result.code == 200) {
        context.commit('USERLOGIN', result.data.token)
        // 持久化存储Token
        setToken(result.data.token)
        return 'ok'
      } else {
        return Promise.reject(new Error('faile'))
      }
    },
    // 获取用户信息
    async getUserInfo(context) {
      let result = await reqUserInfo()
      // console.log(result)
      if (result.code == 200) {
        // 提交用户的信息
        context.commit('GETUSERINFO', result.data)
        return 'ok'
      } else {
        return Promise.reject(new Error('faile'))
      }
    },
    // 退出登录业务
    async userLoginOut(context) {
      // 只是向服务器发送请求
      let result = await reqLoginOut()
      // console.log(result)
      if (result.code == 200) {
        context.commit('USERLOGINOUT', result.data)
      }
    }
  },
  mutations: {
    GETGETCODE(state, value) {
      state.codeNum = value
    },
    USERLOGIN(state, value) {
      state.token = value
    },
    GETUSERINFO(state, value) {
      state.userInfo = value
    },
    // 退出登录 清空数据
    USERLOGINOUT(state, value) {
      // 把仓库中相关用户清空
      ;(state.token = ''),
        (state.userInfo = ''),
        // 本地存储的token 清空
        removeToken()
    }
  },
  getters: {}
}

export default userAbout
