import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

Vue.config.productionTip = false
// Vue.prototype.$http = Axios;
const accessToken = localStorage.getItem('user-token')

if (accessToken) {
  axios.defaults.headers.common['Authorization'] = accessToken
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
