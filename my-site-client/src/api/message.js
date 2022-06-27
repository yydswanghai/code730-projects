import request from "./request";

// 提交评论
export async function postMessage(msgInfo){
    return await request.post("/api/message", msgInfo)
}

// 分页获取评论
export async function getMessage(page = 1, limit = 10){
    return await request.get("/api/message", {
        params: {
            page,
            limit,
        }
    });
}