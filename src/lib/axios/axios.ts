import Axios, {
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from 'axios'

function authRequestInterceptor(config: InternalAxiosRequestConfig) {
  config.headers.Accept = 'application/json'
  return config
}

const axios = Axios.create()

axios.interceptors.request.use(authRequestInterceptor) // se utiliza el interceptor creado en cada request
axios.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    return Promise.reject(error)
  },
)

export type ApiResponse<T> = Promise<AxiosResponse<T>>

const getAll = <T>(endpoint: string, params?: object): ApiResponse<T> => {
  return axios.get<T>(endpoint, { params })
}

// Generic POST function
const post = <TData, TResponse>(
  endpoint: string,
  data: TData,
): ApiResponse<TResponse> => {
  return axios.post<TResponse>(endpoint, data)
}

export const apiService = { getAll, post }
