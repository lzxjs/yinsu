import axios from 'axios'
// 创建axios实例
const baseURL = 'https://api.92lzx.cn'

axios.defaults.headers.post['Content-Type'] = 'application/json'

const service = axios.create({
  baseURL, // api的base_url
  timeout: 7000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(config => {
  // if (store.getters.token) {
  //   config.headers['Authorization'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
  // }
  // const token = sessionStorage.getItem('token')
  // if(token !== '' && token !== undefined) {
  //   config.headers['token'] = sessionStorage.getItem('token')
  // }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug 
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
  /**
  * code为非200是抛错 可结合自己业务进行修改
  */
 return response.data

    // const res = response.data
    // if (res.code !== 200) {
    //   // Message({
    //   //   message: res.msg,
    //   //   type: 'error'
    //   // })

    //   //token失效和无token时
    //   // if(res.code === 20016 || res.code === -1) {
    //   //   MessageBox.alert('登录已超时，请重新登录', '确定登出', {
    //   //     confirmButtonText: '重新登录',
    //   //     type: 'warning'
    //   //   }).then(() => {
    //   //     sessionStorage.clear()
    //   //     window.location.href = '/'
    //   //   })
    //   // }
    //   return Promise.reject('error')
    // } else {
    //   return response.data
    // }
  },
  error => {
    console.log('err' + error)// for debug
    return Promise.reject(error)
  }
)

export default service
