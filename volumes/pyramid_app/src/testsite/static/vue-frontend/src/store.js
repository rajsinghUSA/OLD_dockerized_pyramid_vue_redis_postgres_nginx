import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import * as http from './modules/http'
// import user from './modules/user'
// import auth from './modules/auth'

Vue.use(Vuex)
const server_url = "http://localhost:6543/auth"
export default new Vuex.Store({
  modules: {
    // user,
    // auth,
  },
  state: {
    accessToken:  localStorage.getItem('user_token') ||  '',
    currentUser : {},
    status: ''
  },
  actions: {
    signup: ({commit, dispatch}, user) => {
      commit('user_request');
      console.log('test')
      debugger;
      http.post(server_url, user, {
   headers: {
       'Content-Type': 'multipart/form-data'
   }})
      // debugger;
      // axios({url: '/auth', data: user, method: 'POST',
      //   headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      // })
      //   .then(resp => {
      //     commit('user_success', resp)
      //   })
      //   .catch(resp => {
      //     commit('user_error')
      //     // if resp is unauthorized, logout, to
      //     commit('auth_logout')
      //     // dispatch('auth_logout')
      //   })
    }
  },
  mutations: {
    'user_request': (state) => {
      state.status = 'loading';
    },
    'user_success': (state, resp) => {
      state.status = 'success'
      Vue.set(state, 'profile', resp)
    },
    'user_error': (state) => {
      state.status = 'error'
    },
    'auth_logout': (state) => {
      state.profile = {}
    }
  },
})
