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
 * 查询产品列表
 */
export async function getProducts(params){
    await delay(1000);
    // 参数二是地址栏 ? 后面的 /page=1&size=10
    return await axios.get("/products/all", {
        params,
    });
}

/**
 * 删除产品
 */
export async function removeProduct(id){
    await delay(1000);
    // 参数二是地址栏 ? 后面的 /page=1&size=10
    return await axios.delete("/products/" + id);
}

/**
 * 新增产品
 */
export async function addProduct(params){
    await delay(1000);
    // 参数二是地址栏 ? 后面的 /page=1&size=10
    return await axios.post("/products/add", params);
}

/**
 * 编辑(查询)产品
 */
export async function detail(id){
    await delay(1000);
    // 参数二是地址栏 ? 后面的 /page=1&size=10
    return await axios.get("/products/" + id);
}

/**
 * 编辑产品
 */
 export async function editProduct(params){
    await delay(1000);
    // 参数二是地址栏 ? 后面的 /page=1&size=10
    return await axios.put("/products/edit", params);
}