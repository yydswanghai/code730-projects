import { http } from '@/utils/http'
import { postType } from './types'

/* 获取用户菜单 */
export function getUserMenu(): postType {
    return http.request('get', '/upms/sysMenu/getUserMenu')
}