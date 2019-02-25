// import { USER } from '../modules/auth'
import Vue from 'vue'
import axios from 'axios'
import { AUTH } from '../modules/auth'


export const USER = {
  REQUEST: 'User Request',
  SUCCESS: 'User Success',
  ERROR: 'User Error'
}

const state = { status: '', profile: {} }

const getters = {
  getProfile: state => state.profile,
  isProfileLoaded: state => !!state.profile.name,
}

const actions = {
  [USER.REQUEST]: ({commit, dispatch}, user) => {
    commit(USER.REQUEST)
    axios({url: 'auth', data: user, method: 'POST' })
      .then(resp => {
        commit(USER.SUCCESS, resp)
      })
      .catch(resp => {
        commit(USER.ERROR)
        // if resp is unauthorized, logout, to
        dispatch(AUTH.LOGOUT)
      })
  },
}

const mutations = {
  [USER.REQUEST]: (state) => {
    state.status = 'loading'
  },
  [USER.SUCCESS]: (state, resp) => {
    state.status = 'success'
    Vue.set(state, 'profile', resp)
  },
  [USER.ERROR]: (state) => {
    state.status = 'error'
  },
  [AUTH.LOGOUT]: (state) => {
    state.profile = {}
  }
}

export default {
  state,
  getters,
  actions,
  mutations,
}
