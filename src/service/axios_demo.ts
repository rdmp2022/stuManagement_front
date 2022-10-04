import axios from 'axios'

axios.defaults.baseURL = 'http://httpbin.org'

// axios
//     .get('http://123.207.32.32:8000/home/multidata').then((res) => {
//   console.log(res.data);
// })

// axios
//     .get('/get', {
//       params: {
//         name: 'Walker',
//         age: 21
//       }
//     }).then((res) => {
//   console.log(res.data);
// })
//
// axios
//     .post('/post', {
//       data: {
//         name: 'Walker',
//         age: 21
//       }
//     }).then((res) => {
//   console.log(res.data);
// })

//多个请求一起返回
axios
  .all([
    axios.get('/get', { params: { name: 'Walker', age: 22 } }),
    axios.post('/post', { data: { name: 'Walker', age: 21 } })
  ])
  .then((res) => {
    console.log(res[0].data)
    console.log(res[1].data)
  })

//axios拦截器
//func1 请求发送成功后执行的函数
//func2 请求发送失败后执行的函数
//拦截请求
axios.interceptors.request.use(
  (config) => {
    // config.url = ''
    //给请求添加token
    //添加动画
    console.log('请求成功的拦截')
    return config
  },
  (err) => {
    console.log('请求响应失败')
    return err
  }
)
//拦截响应
axios.interceptors.response.use(
  (res) => {
    console.log('响应成功拦截')
    return res
  },
  (err) => {
    console.log('服务响应失败')
    return err
  }
)
export default axios
