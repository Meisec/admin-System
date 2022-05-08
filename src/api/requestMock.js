// 对于axios 进行二次封装
import axios from 'axios'
//引入进度条
// import nprogress from 'nprogress'
// 引入进度条样式
// import 'nprogress/nprogress.css'

// 1.利用axios对象的方法create，去创建有个axios实例
const requests = axios.create({
  // 基础路径
  baseURL: '/mock',
  // 代表请求超时的时间
  timeout: 5000
})
// 请求拦截器：再发起请求之前，请求拦截器可以检测到，可以在请求发出去之前做一些事情
requests.interceptors.request.use((config) => {
  // 进度条开始
  // nprogress.start()
  // config:配置对象，对象里面有一个很重要的属性，herders请求头
  return config
})

// 相应拦截器
requests.interceptors.response.use(
  (res) => {
    // 进度条结束
    // nprogress.done
    //成功的回调函数：服务器响应的数据回来后，响应拦截器可以检测到，可以做一些事情
    return res.data
  },
  (error) => {
    // 响应失败的回调函数
    return Promise.reject(new Error('faile'))
  }
)

export default requests
