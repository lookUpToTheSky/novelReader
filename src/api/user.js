import request from '@/utils/request'

/**
 * 获取用户书架
 */
export function getBookList () {
  return request({
    url: '',
    method: 'get'
  })
}

/**
 * 加入书架
 */
export function addBook (data) {
  return request({
    url: '',
    method: 'post',
    data: {
      username: data.username,
      book: data.book
    }
  })
}

/**
 * 更新章节
 */
export function Update (data) {
  return request({
    url: '',
    method: 'post',
    data: {
      username: data.username,
      lastChapter: data.lastChapter,
      id: data.id
    }
  })
}
