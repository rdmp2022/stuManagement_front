//service统一出口
import MyAxios from './request'

const myAxios = new MyAxios({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 3000,
  interceptors: {
    requestInterceptor: (config) => {
      console.log('请求成功拦截')
      return config
    },
    requestInterceptorCatch: (err) => {
      console.log('请求拦截失败')
      return err
    },
    responseInterceptor: (config) => {
      console.log('响应拦截成功')
      return config
    },
    responseInterceptorCatch: (err) => {
      console.log('响应拦截失败')
      return err
    }
  }
})

export default myAxios
