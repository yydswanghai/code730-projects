import axios from 'axios'
import { useUserStore } from '@/store/modules/user'

// 创建axios实例
const service = axios.create({
    baseURL: import.meta.env.VITE_PROXY_PATH, // api的base_url
    timeout: 10 * 1000, // 请求超时时间
    withCredentials: true // 当跨域请求时发送cookie
})

// request拦截器
service.interceptors.request.use(config => {
    const userStore = useUserStore()
    const access_token = userStore.access_token

    if(access_token){
        config.headers['Authorization'] = `Bearer ${access_token}`
    }
    return config
}, error => {
    return Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(response => {
    const res = response.data
    return res
}, error => {
    // 响应出错
    const res = error.response
    // 424：token 过期
    if(res.code === 424){
        // todo 退出并提示登录过期
    }
    return res.data
})

export default service