// 对于用户操作的接口管理
import axios from "@/api/axios";

function delay(duration){
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, duration);
    })
}

/**
 * 查询产品类目
 */
 export async function getCategories(page = 1, size = 10){
    await delay(1000);
    return await axios.get("/category/all", {
        params: {
            page,
            size,
        }
    })
 }