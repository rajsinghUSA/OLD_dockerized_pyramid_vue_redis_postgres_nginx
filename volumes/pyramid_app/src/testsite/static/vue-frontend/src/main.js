import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

Vue.config.productionTip = false
// Vue.prototype.$http = Axios;
const accessToken = localStorage.getItem('user-token')


axios.defaults.baseURL = 'http://localhost:6543';
// axios.defaults.headers.common['Authorization'] = accessToken //AUTH_TOKEN;
axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded';

if (accessToken) {
  axios.defaults.headers.common['Authorization'] = accessToken
  debugger;
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
