import request from "./request"

// 全局设置
export async function getSetting(){
    return await request.get("/api/setting");
}