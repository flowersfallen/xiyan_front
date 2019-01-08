import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    auth: false,
    token: null,
    name: null,
    avatar: null,
    email: null,
    error: null
  },
  mutations: {
    logined (state, token) {
      state.auth = true
      state.token = token
      localStorage.xiyan_token = token
    },
    refreshToken (state, token) {
      state.token = token
      localStorage.xiyan_token = token
      axios.defaults.headers.common['Authorization'] = 'bearer ' + state.token
    },
    profile (state, data) {
      state.name = data.name
      state.avatar = data.avatar
      state.email = data.email
    },
    logout (state) {
      state.auth = false
      state.token = ''
      state.name = ''
      state.avatar = ''
      state.email = ''
      state.error = ''

      localStorage.removeItem('xiyan_token')
    }
  },
  actions: {
    logined ({dispatch, commit}, token) {
      return new Promise(function (resolve, reject) {
        commit('logined', token)
        axios.defaults.headers.common['Authorization'] = 'bearer ' + token
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
        axios.post(process.env.BASE_API + '/api/auth/logout', {}).then(respond => {
          Vue.$router.push({name: 'login'})
        })
      })
    },
    refreshToken ({dispatch, commit}, token) {
      return new Promise(function (resolve, reject) {
        commit('refreshToken', token)
        dispatch('profile').then(() => {
          resolve()
        }).catch(error => {
          console.log(error)
        })
      })
    }
  }
})
