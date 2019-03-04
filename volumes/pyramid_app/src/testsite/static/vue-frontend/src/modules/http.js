import axios from 'axios'

const accessToken = localStorage.getItem('user-token')

export const http = axios.create({
  // baseURL: 'http://localhost:8080',
  headers: {'Content-Type':'application/json'}
});
console.log(http.defaults.headers.common['Content-Type'])
console.log(http.defaults.headers.post['Content-Type'])
console.log(http.defaults.headers.get['Content-Type'])
// .defaults.headers = {
//         'Content-Type': 'application/json',
//         Authorization: 'myspecialpassword'
//     }
if (accessToken) {
  http.defaults.headers.common['Authorization'] = accessToken
}
