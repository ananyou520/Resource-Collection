import request from '@/utils/request'

// 查询短剧资源列表
export function listDuanju(query) {
  return request({
    url: '/api/duanju/all',
    method: 'get',
    params: query
  })
}

// 查询短剧资源数量
export function duanjuNumber(query) {
  return request({
    url: '/api/duanju/quanbu',
    method: 'get',
    params: query
  })
}
// 修改短剧资源
export function updateDuanju(data) {
  return request({
    url: '/app/duanju/app/copy',
    method: 'put',
    data: data
  })
}
//获取轮播图
export function getBannerData(query) {
  return request({
    url: '/api/index/banner',
    method: 'get',
    params: query
  })
}

//公告
export function getNotice(query) {
  return request({
    url: '/api/index/notice',
    method: 'get',
    params: query
  })
}

//资源搜索
export function getSearch(query) {
  return request({
    url: '/api/duanju/search',
    method: 'get',
    params: query
  })
}

//次数加一
export function numberAdd(query) {
  return request({
    url: '/api/duanju/numberAdd',
    method: 'get',
    params: query
  })
}

export function thisRanking(query) {
  return request({
    url: '/api/duanju/thisRanking',
    method: 'get',
    params: query
  })
}

//资源失效反馈
export function addxs(data) {
  return request({
    url: '/api/duanju/sx',
    method: 'post',
    data: data
  })
}

//去水印解析
export function delShuiYin(query) {
  return request({
    url: '/api/index/delWatermark',
    method: 'get',
    params: query
  })
}

//获取吃喝玩乐跳转
export function getPartyData(query) {
  return request({
    url: '/api/index/party',
    method: 'get',
    params: query
  })
}

//获取每日更新
export function getDay(query) {
  return request({
    url: '/api/addapi/getDay',
    method: 'get',
    params: query
  })
}

//获取排行榜
export function getHot(query) {
  return request({
    url: '/api/addapi/getHot',
    method: 'get',
    params: query
  })
}

//获取openid
export function getOpenId(query) {
  return request({
    url: '/api/addapi/getOpenId',
    method: 'get',
    params: query
  })
}