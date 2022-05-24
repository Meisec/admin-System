// 对于axios 进行二次封装
import axios from 'axios'
//引入进度条
import nprogress from 'nprogress'
// 引入进度条样式
import 'nprogress/nprogress.css'
// 在当前模块中引入 store
import store from '@/store'

// 1.利用axios对象的方法create，去创建有个axios实例
const requests = axios.create({
  // 基础路径
  baseURL: '/api',
  // 代表请求超时的时间
  timeout: 5000
})

// 请求拦截器：再发起请求之前，请求拦截器可以检测到，可以在请求发出去之前做一些事情
requests.interceptors.request.use((config) => {
  // 请求头带参数
  if (store.state.detailAbout.uuid_token) {
    // 请求头添加一个字段（userTempId）:这是后台老师商量好的
    config.headers.userTempId = store.state.detailAbout.uuid_token
  }
  // 需要携带Token带给服务器
  if (store.state.userAbout.token) {
    config.headers.token = store.state.userAbout.token
  }
  // console.log(store)
  // 进度条开始
  nprogress.start()
  // config:配置对象，对象里面有一个很重要的属性，herders请求头
  return config
})

// 响应拦截器
requests.interceptors.response.use(
  (res) => {
    // 进度条结束
    nprogress.done()
    //成功的回调函数：服务器响应的数据回来后，响应拦截器可以检测到，可以做一些事情
    return res.data
  },
  (error) => {
    // 响应失败的回调函数
    return Promise.reject(new Error('faile'))
  }
)

export default requests
