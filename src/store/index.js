import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '',
    ttl: '',
    refresh_ttl: '',
    name: '',
    avatar: '',
    email: '',
    open: false,
    error: ''
  },
  mutations: {
    logined (state, data) {
      state.token = data.token
      state.ttl = data.ttl
      state.refresh_ttl = data.refresh_ttl
      localStorage.xiyan_token = data.token
      axios.defaults.headers.common['Authorization'] = 'bearer ' + data.token
    },
    refreshToken (state, data) {
      state.token = data.token
      state.ttl = data.ttl
      state.refresh_ttl = data.refresh_ttl
      localStorage.xiyan_token = data.token
      axios.defaults.headers.common['Authorization'] = 'bearer ' + data.token
    },
    profile (state, data) {
      state.name = data.name
      state.avatar = data.avatar
      state.email = data.email
    },
    logout (state) {
      state.token = ''
      state.ttl = ''
      state.refresh_ttl = ''
      state.name = ''
      state.avatar = ''
      state.email = ''
      state.open = false
      state.error = ''
      localStorage.removeItem('xiyan_token')
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
    logined ({dispatch, commit}, data) {
      return new Promise(function (resolve, reject) {
        commit('logined', data)
        dispatch('profile').then(() => {
          resolve()
        }).catch(error => {
          console.log(error)
        })
      })
    },
    profile ({commit}) {
      return new Promise(function (resolve, reject) {
        axios.get(process.env.BASE_API + '/api/auth/user', {}).then(respond => {
          if (respond.status === 200) {
            commit('profile', respond.data.data)
            resolve()
          } else {
            // reject()
          }
        })
      })
    },
    logout ({commit}) {
      return new Promise(function (resolve, reject) {
        commit('logout')
      })
    },
    refreshToken ({dispatch, commit}, data) {
      return new Promise(function (resolve, reject) {
        commit('refreshToken', data)
        dispatch('profile').then(() => {
          resolve()
        }).catch(error => {
          console.log(error)
        })
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
