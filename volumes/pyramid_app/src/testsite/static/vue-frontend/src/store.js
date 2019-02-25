import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import user from './modules/user'
import auth from './modules/auth'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    auth,
  },
  state: {
    accessToken:  localStorage.getItem('user_token') ||  '',
    currentUser : {}
  },
  mutations: {

  },
  actions: {
    signup: ({commit, dispatch}) => {
      return new Promise((resolve, reject) => {
        debugger;
        commit(AUTH.LOGOUT)
        localStorage.removeItem('user-token')
        resolve()
      })
    }
  }
})
