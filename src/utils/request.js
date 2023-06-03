/**
 * 封装 axios 请求模块
 */
import axios from 'axios'

const request = axios.create({
  baseURL: "https://toutiao.itheima.net/" // 初始化请求地址
})

export default request
