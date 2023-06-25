import request from '@/utils/request'
import { getStorage, setStorage } from '@/utils/storage'

/**
 * 登录
 */
export async function login ({username, password}) {

    let userLisr = getStorage('user') || []

    if(userLisr.length == 0) {
      // 当未缓存用户列表时重新加载数据
      let res = await getUser()
      setStorage("user", res.data.data)
    }
    if(userLisr && userLisr.length > 0) { 
        //有用户时判断用户是否存在或者密码是否正确
        let hasUser = userLisr.find(v => v.username == username && v.password == password)
        if(hasUser) {
            return {success: true, data: hasUser, msg: '登录成功！'}   
        }else{
            return {success: false, data: null, msg: '登录失败！'}
        }
    }else{
        return {success: false, data: null, msg: '登录失败！'}
    }
}

/**
 * 登录
 */
 export function getUser (data) {
    return request({
      url: '/json/user.json',
      method: 'get'
    })
  }
/**
 * 注册
 */
export function register (data) {
  return request({
    url: '',
    method: 'post',
    data: {
      username: data.username,
      password: data.password
    }
  })
}
