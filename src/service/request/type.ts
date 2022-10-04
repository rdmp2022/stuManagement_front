import { AxiosRequestConfig, AxiosResponse } from 'axios'

export interface MyRequestInterceptors {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (error: any) => any
  responseInterceptor?: (res: any) => any
  responseInterceptorCatch?: (error: any) => any
}

export interface MyRequestConfig extends AxiosRequestConfig {
  interceptors?: MyRequestInterceptors
  showLoading?: boolean
}
