import { http } from '@/utils/http'
import { postType } from './types'

/* 登录 - 个人用户 */
export function loginByU1(data: { username: string, password: string }): postType {
    return http.request('post', '/auth/oauth/token', {
        params: { grant_type: 'password', scope: 'app', apifoxApiId: '29388030', type: '1' },
        data,
        headers: {
            Authorization: `Basic ${btoa('app_person_user:50ed7ab5-6a9f-441f-80ea-1e7746007bea')}`,
            ['Content-Type']: 'application/x-www-form-urlencoded'
        }
    })
}
/* 登录 - 组织用户 */
export function loginByU2(data: { username: string, password: string }): postType {
    return http.request('post', '/auth/oauth/token', {
        params: { grant_type: 'password', scope: 'app', apifoxApiId: '29388030', type: '2'  },
        data,
        headers: {
            Authorization: `Basic ${btoa('app_collective_user:004ea510-e05b-4fc0-8bc4-e43981956a00')}`,
            ['Content-Type']: 'application/x-www-form-urlencoded'
        }
    })
}
/* 登录 - 后台用户 */
export function loginBySystem(data: { username: string, password: string }): postType {
    return http.request('post', '/auth/oauth/token', {
        params: { grant_type: 'password', scope: 'server' },
        data,
        headers: {
            Authorization: `Basic ${btoa('pc_manage:39f8858c-441d-415e-9385-b1ec602891c2')}`,
            ['Content-Type']: 'application/x-www-form-urlencoded'
        }
    })
}
/* 获取用户信息 */
export function getUserInfo(params: { type: string }): postType {
    return http.request('get', '/upms/getLoginInfo', { params, });
}
/* 获取用户菜单 */
export function getUserMenu(): postType {
    return http.request('get', '/upms/sysMenu/getUserMenu');
}
/* 登出 */
export function logout(): postType {
    return http.request('delete', '/auth/token/logout')
}