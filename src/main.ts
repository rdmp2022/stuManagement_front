import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import './service/axios_demo'
import myAxios from './service'
console.log(import.meta.env)
import 'element-plus/dist/index.css'
const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')

// myAxios.request({
//   url:'/home/multidata',
//   method: 'GET',
//   interceptors:{
//     requestInterceptor:(config) => {
//       console.log('单独请求的config')
//       return config
//     },
//     responseInterceptor:(res) => {
//       console.log('单独响应的res')
//       return res
//     }
//   }
// })

interface DataType {
  data: any
  returnCode: string
  success: boolean
}

myAxios
  .get<DataType>({
    url: '/home/multidata'
  })
  .then((res) => {
    console.log(res.data)
    console.log(res.success)
    console.log(res.returnCode)
  })
