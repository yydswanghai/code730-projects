import { Method, AxiosError, AxiosResponse, AxiosRequestConfig } from 'axios'

/* 请求方法 */
export type IRequestMethods = Extract<
    Method,
    'get' | 'post' | 'put' | 'delete' | 'patch' | 'option' | 'head'
>
/* 请求配置 */
export interface IRequestConfig extends AxiosRequestConfig {
    beforeRequestCallback?: (request: IRequestConfig) => void
    beforeResponseCallback?: (response: IResponse) => void
}
/* 请求对象 */
export interface IResponse extends AxiosResponse {
    config: IRequestConfig
}
/* 错误对象 */
export interface IError extends AxiosError {
    isCancelRequest?: boolean
}