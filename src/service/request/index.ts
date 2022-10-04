import axios, { AxiosInstance } from 'axios'
import type { MyRequestInterceptors, MyRequestConfig } from './type'
import { ElLoading } from 'element-plus'
import { LoadingInstance } from 'element-plus/lib/components/loading/src/loading.js'
import { resolve } from 'path'

const DEFAULT_LOADING = true

class MyAxios {
  instance: AxiosInstance
  interceptors?: MyRequestInterceptors
  showLoading: boolean
  loading?: LoadingInstance

  constructor(config: MyRequestConfig) {
    this.instance = axios.create(config)
    this.showLoading = config.showLoading ?? DEFAULT_LOADING
    this.interceptors = config.interceptors

    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )

    //添加所有实例都有的拦截器
    this.instance.interceptors.request.use(
      (config) => {
        console.log('所有实例都有的拦截器，请求成功拦截')
        if (this.showLoading) {
          this.loading = ElLoading.service({
            fullscreen: true,
            lock: true,
            text: '不好意思~再等一下噢~',
            background: 'rgba(0,0,0,0.5)'
          })
        }
        return config
      },
      (err) => {
        console.log('所有实例都有的拦截器，请求拦截失败')
        return err
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        console.log('所有实例都有的拦截器，响应成功拦截')
        this.loading?.close()
        return res.data
      },
      (err) => {
        console.log('所有实例都有的拦截器，响应拦截失败')
        return err
      }
    )
  }

  request<T>(config: MyRequestConfig): Promise<T> {
    return new Promise((resolve, reject) => {
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config)
      }
      if (config.showLoading == false) {
        this.showLoading = config.showLoading
      }

      this.instance
        .request<any, T>(config)
        .then((res) => {
          if (config.interceptors?.requestInterceptor) {
            // @ts-ignore
            res = config.interceptors.requestInterceptor(res)
          }
          this.showLoading = DEFAULT_LOADING
          resolve(res)
        })
        .catch((err) => {
          this.showLoading = DEFAULT_LOADING
          reject(err)
          return err
        })
    })
  }

  get<T>(config: MyRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }

  post<T>(config: MyRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }

  delete<T>(config: MyRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }

  patch<T>(config: MyRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}

export default MyAxios
