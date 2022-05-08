// 先引入mockjs模块
import Mock from 'mockjs'
// 把JSON数据格式引入
// webpack默认对外暴漏的：图片，JSON数据格式  别的模块直接引入
import banner from './banner'
import floor from './floor'

// mock 数据： mock() 是一个方法，接受两个参数，第一个参数是请求地址，第二个参数是请求的数据
Mock.mock('/mock/banner', { code: 200, data: banner }) // 模拟首页大的轮播图的数据
Mock.mock('/mock/floor', { code: 200, data: floor })
