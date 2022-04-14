import Cookie from 'js-cookie'
export const ACCESS_TOKEN = 'ACCESS_TOKEN'  // 用户tonken
export const CURRENT_USER = 'USERINFO'      // 用户信息
export const REFRESH_TOKEN = 'REFRESH_TOKEN'// 用户刷新token
export const USER_TYPE = 'USER_TYPE'        // 用户类型

export function getStorage(key){
    Cookie.get(key)
}

export function setStorage(key, value){
    Cookie.set(key, value)
}

export function delStorage(key){
    Cookie.remove(key)
}