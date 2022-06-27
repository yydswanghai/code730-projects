// 对于用户操作的接口管理
import axios from "@/api/axios";

// 登录
export async function login(params){
    return await axios.post("/passport/login", params);
}