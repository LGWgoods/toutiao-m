import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/storage'

Vue.use(Vuex)

const TOKEN_KEY = 'TOUTIAO_USER'
export default new Vuex.Store({
  state: {
    // 用户登录状态信息,获取
    // user: JSON.parse(window.localStorage.getItem('TOUTIAO_USER'))
    user: getItem(TOKEN_KEY)
  },
  getters: {
  },
  mutations: {
    setUser(state, user) {
      state.user = user // 把用户信息存储到vuex 中
      // 存储用户token信息
      // window.localStorage.setItem('TOUTIAO_USER', JSON.stringify(user))
      setItem(TOKEN_KEY, JSON.stringify(user))
    }
  },
  actions: {
  },
  modules: {
  }

})
