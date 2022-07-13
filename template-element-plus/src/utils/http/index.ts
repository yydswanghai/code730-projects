import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig } from 'axios'
import { ElMessage } from 'element-plus'
import { IRequestMethods, IRequestConfig } from './types'

// 加载环境变量
const { VITE_PROXY_PATH, VITE_API_URL } = import.meta.env;

class IHttp {
    constructor() {
        this.httpInterceptorsRequest();
        this.httpInterceptorsResponse();
    }
    // axios 实例
    private static instance: AxiosInstance = axios.create({
        baseURL: VITE_PROXY_PATH,
        timeout: 10 * 1000,// 请求超时时间
        withCredentials: true // 当跨域请求时发送cookie
    });

    // 请求拦截器
    private httpInterceptorsRequest(): void {
        IHttp.instance.interceptors.request.use(config => {
            return config;
        },error => {
            return Promise.reject(error);
        })
    }
    // 响应拦截器
    private httpInterceptorsResponse(): void {
        IHttp.instance.interceptors.response.use(response => {
            const res = response.data;
            return res;
        },error => {
            // 响应出错
            const res = error.response;
            if(res){
                // 424：token 过期 退出并提示登录过期
                if(res.code === 424){
                    ElMessage.error(res.data?.msg);
                }
            }
            return Promise.reject(error);
        })
    }

    // 通用请求工具函数
    request<T>(method: IRequestMethods, url: string,
        param?: AxiosRequestConfig, axiosConfig?: IRequestConfig): Promise<T> {
        const config: IRequestConfig = { method, url, ...param, ...axiosConfig };

        // 单独处理自定义请求/响应回调
        return new Promise((resolve, reject) => {
            IHttp.instance.request(config).then((response: any) => {
                resolve(response);
            }).catch(error => {
                reject(error);
            })
        })
    }

    get<T, P>(url: string, params?: T, config?: IRequestConfig): Promise<P> {
        return this.request<P>('get', url, params, config);
    }
    post<T, P>(url: string, params?: T, config?: IRequestConfig): Promise<P> {
        return this.request<P>('post', url, params, config);
    }
}

export const http = new IHttp();