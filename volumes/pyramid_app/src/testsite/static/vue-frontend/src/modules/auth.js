/* eslint-disable promise/param-names */

// import Vue from 'vue'
import axios from 'axios'
// Vue.prototype.$http = Axios;

// import { AUTH_REQUEST, AUTH_ERROR, AUTH_SUCCESS, AUTH_LOGOUT } from '../actions/auth'
import { USER } from '../modules/user'

export const AUTH = {
  REQUEST: 'Auth Request',
  ERROR: 'Auth Error',
  SUCCESS: 'Auth Success',
  LOGOUT: 'Auth Logout'
}


const state = { token: localStorage.getItem('user-token') || '', status: '', hasLoadedOnce: false }

const getters = {
  isAuthenticated: state => !!state.token,
  authStatus: state => state.status,
}

const actions = {
  [AUTH.REQUEST]: ({commit, dispatch}, user) => {
    return new Promise((resolve, reject) => {
      commit(AUTH.REQUEST)
      // apiCall({url: 'auth', data: user, method: 'POST'})
      axios({url: 'auth', data: user, method: 'POST' })
      .then(resp => {
        debugger;
        localStorage.setItem('user-token', resp.token)
        // Here set the header of your ajax library to the token value.
        // example with axios
        axios.defaults.headers.common['Authorization'] = resp.token
        commit(AUTH.SUCCESS, resp)
        dispatch(USER.REQUEST)
        resolve(resp)
      })
      .catch(err => {
        commit(AUTH.ERROR, err)
        localStorage.removeItem('user-token')
        reject(err)
      })
    })
  },
  [AUTH.LOGOUT]: ({commit, dispatch}) => {
    return new Promise((resolve, reject) => {
      commit(AUTH.LOGOUT)
      localStorage.removeItem('user-token')
      resolve()
    })
  }
}

const mutations = {
  [AUTH.REQUEST]: (state) => {
    state.status = 'loading'
  },
  [AUTH.SUCCESS]: (state, resp) => {
    state.status = 'success'
    state.token = resp.token
    state.hasLoadedOnce = true
  },
  [AUTH.ERROR]: (state) => {
    state.status = 'error'
    state.hasLoadedOnce = true
  },
  [AUTH.LOGOUT]: (state) => {
    state.token = ''
  }
}

export default {
  state,
  getters,
  actions,
  mutations,
}
