import request from '@/utils/request'
import { getStorage, setStorage } from '@/utils/storage'

/**
 * 获取所以小说
 */
 export async function getAllBook (type) {
    let res = await request({
      url: '/json/book.json',
      method: 'get'
    })
    if(type) {
        let data = res.data.data
        let list = data.filter(v => v.type == type)
        res.data.data = list
        return res
    }else{
        return res
    }
  }
/**
 * 注册
 */
export function register (data) {
  return request({
    url: '/sqlapi/register',
    method: 'post',
    data: {
      username: data.username,
      password: data.password
    }
  })
}
