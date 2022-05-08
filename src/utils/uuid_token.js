import { v4 as uuidv4 } from 'uuid'
// 要生成一个随机字符串，且每次执行不能发生变化，游客身份要持久存储

// 单例模式
export const getUUID = () => {
  // 1.先从本地存储 获取uuid（看一下本地存储是否已经有了）
  let uuid_token = localStorage.getItem('UUIDTOKEN')
  // 如果uuid 不存在
  if (!uuid_token) {
    // 生成一个uuid
    uuid_token = uuidv4()
    // 生成之后 ，在本地存储一次
    localStorage.setItem('UUIDTOKEN', uuid_token)
  }
  return uuid_token
}
