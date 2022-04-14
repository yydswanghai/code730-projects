import request from './request'

// 发送 formData
function _transformFormData(data){
    let ret = ''
    for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
    }
    ret = ret.substring(0, ret.lastIndexOf('&'));
    return ret
}

// 登录 - 普通用户
export async function loginByPerson(data){
    return request({
        url: '/auth/oauth/token?grant_type=password&scope=app',
        method: 'post',
        data,
        transformRequest: [function(data) {
            return _transformFormData(data)
        }],
        headers: {
            Authorization: `Basic ${btoa('app_person_user:50ed7ab5-6a9f-441f-80ea-1e7746007bea')}`,
            ['Content-Type']: 'application/x-www-form-urlencoded'
        }
    })
}
// 登录 - 普通用户类型二
export async function loginByCollective(data) {
    return request({
        url: '/auth/oauth/token?grant_type=password&scope=app',
        method: 'post',
        data,
        transformRequest: [function(data) {
            return _transformFormData(data)
        }],
        headers: {
            Authorization: `Basic ${btoa('app_collective_user:004ea510-e05b-4fc0-8bc4-e43981956a00')}`,
            ['Content-Type']: 'application/x-www-form-urlencoded'
        }
    })
}
// 登录 - 后台用户
export async function loginByPcManage(data) {
    return request({
        url: '/auth/oauth/token?grant_type=password&scope=server',
        method: 'post',
        data,
        transformRequest: [function(data) {
            return _transformFormData(data)
        }],
        headers: {
            Authorization: `Basic ${btoa('pc_manage:39f8858c-441d-415e-9385-b1ec602891c2')}`,
            ['Content-Type']: 'application/x-www-form-urlencoded'
        },
    })
}

// 获取用户信息 - 普通用户
export async function getInfoByPerson() {
    return request({
        url: '/upms/appPersonUser/getLoginInfo',
        method: 'get'
    })
}
// 获取用户信息 - 普通用户类型二
export async function getInfoByCollective() {
    return request({
        url: '/upms/appCollectiveUser/getLoginInfo',
        method: 'get'
    })
}
// 获取用户信息 - 后台用户
export async function getInfoByPcManage() {
    return request({
        url: '/upms/sysOrg/getLoginInfo',
        method: 'get'
    })
}

export async function getUserMenu() {
    return []
}

export async function getUserInfo() {
    return {}
}
// 登出
export async function logout(){
    return request({
        url: '/auth/token/logout',
        method: 'delete'
    })
}