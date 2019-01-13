import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '',
    ttl: '',
    refresh_ttl: '',
    user: '',
    open: false,
    error: ''
  },
  mutations: {
    logined (state, data) {
      // 返回值
      state.token = data.token
      state.ttl = data.ttl
      state.refresh_ttl = data.refresh_ttl
      // 缓存
      localStorage.xiyan_token = data.token
      localStorage.xiyan_tll = data.ttl
      localStorage.xiyan_refresh = data.refresh_ttl
      // 头
      axios.defaults.headers.common['Authorization'] = 'bearer ' + data.token
    },
    refreshToken (state, data) {
      state.token = data.token
      state.ttl = data.ttl
      localStorage.xiyan_token = data.token
      localStorage.xiyan_ttl = data.ttl
      axios.defaults.headers.common['Authorization'] = 'bearer ' + data.token
    },
    profile (state, data) {
      state.user = data
      localStorage.xiyan_user = JSON.stringify(data)
    },
    logout (state) {
      state.token = ''
      state.ttl = ''
      state.refresh_ttl = ''
      state.name = ''
      state.open = false
      state.error = ''
      localStorage.removeItem('xiyan_token')
      localStorage.removeItem('xiyan_ttl')
      localStorage.removeItem('xiyan_refresh')
      localStorage.removeItem('xiyan_data')
    },
    setError (state, data) {
      state.open = true
      state.error = data
    },
    delError (state) {
      state.open = false
      state.error = ''
    }
  },
  actions: {
    logined ({commit}, data) {
      return new Promise(function (resolve, reject) {
        commit('logined', data)
      })
    },
    profile ({commit}, data) {
      return new Promise(function (resolve, reject) {
        commit('profile', data)
      })
    },
    logout ({commit}) {
      return new Promise(function (resolve, reject) {
        commit('logout')
      })
    },
    refreshToken ({commit}, data) {
      return new Promise(function (resolve, reject) {
        commit('refreshToken', data)
      })
    },
    setError ({commit}, data) {
      return new Promise(function (resolve, reject) {
        commit('setError', data)
      })
    },
    delError ({commit}) {
      return new Promise(function (resolve, reject) {
        commit('delError')
      })
    }
  }
})
