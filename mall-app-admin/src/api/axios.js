import axios from "axios";
import { message } from "ant-design-vue"
import store from "@/store"

const instance = axios.create({
    baseURL: 'https://mallapi.duyiedu.com'
});
// 请求拦截
instance.interceptors.request.use((config) => {
    // 在发送请求之前做些什么
    // 统一添加appkey
    if(config.url.includes('/passport')){
        return config;
    }else{
        return {
            ...config,
            params: {
                ...config.params,
                appkey: store.state.loginUser.user.appkey,
            }
        }
    }
}, (error) => {
    // 对请求错误做些什么
    return Promise.reject(error)
});
// 响应拦截
instance.interceptors.response.use((resp) => {
    // 对响应数据做点什么
    if(resp.data.status === "fail"){
        message.error(resp.data.msg);// 弹窗 错误信息
        return null;
    }
    return resp.data.data
}, (error) => {
    // 对响应错误做点什么
    return Promise.reject(error);
});


export default instance;