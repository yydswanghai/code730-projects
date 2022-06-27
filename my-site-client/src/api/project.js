import request from "./request";

export async function getProject(){
    return await request.get("/api/project");
}