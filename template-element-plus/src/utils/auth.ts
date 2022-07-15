import Cookies from 'js-cookie'

export function getStorage(key: string) {
    return Cookies.get(key);
}

export function setStorage(key: string, value: any){
    return Cookies.set(key, value);
}

export function delStorage(key: string){
    return Cookies.remove(key)
}