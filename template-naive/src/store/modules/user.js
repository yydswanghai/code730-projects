import { defineStore } from 'pinia'
import { ACCESS_TOKEN, CURRENT_USER, REFRESH_TOKEN, USER_TYPE, getStorage, setStorage, delStorage } from '@/utils/auth'
import { loginByPerson, loginByCollective, loginByPcManage, logout } from '@/api/user'
import { getInfoByPerson, getInfoByCollective, getInfoByPcManage } from '@/api/user'
import { useTagsViewStore } from './tagsView'

/**
 * 用户相关的状态
 */
export const useUserStore = defineStore({
    id: 'app-user',
    state: () => ({
        userType: getStorage(USER_TYPE),         // 用户类型 => 1: 普通 2: 集体 3: 后台
        access_token: getStorage(ACCESS_TOKEN),  // 用户 access_token
        refresh_token: getStorage(REFRESH_TOKEN),// 用户 refresh_token (暂时没用)
        userInfo: null,                          // 用户信息
        permissions: [],                         // 用户权限列表 1. 如果是后台用户，暂时代表的是按钮权限 2. 如果是普通或集体用户，每一项表示对应的一级路由的 name属性
    }),
    actions: {
        setUserType(type){// 设置用户类型
            this.userType = type
            setStorage(USER_TYPE, type)
        },
        setAccessToken(token){// 设置用户 token
            this.access_token = token
            if(token === ''){
                delStorage(ACCESS_TOKEN)
            }else{
                setStorage(ACCESS_TOKEN, token)
            }
        },
        setRefreshToken(token){// 设置用户 refresh_token
            this.refresh_token = token
            if(token === ''){
                delStorage(REFRESH_TOKEN)
            }else{
                setStorage(REFRESH_TOKEN, token)
            }
        },
        setPermissions(permissions) {// 设置用户权限
            this.permissions = permissions;
        },
        setUserInfo(info){// 设置用户信息
            this.userInfo = info
        },
        async login(params){// 登录
            try{
                let resp = null;
                if(this.userType == 3){// 后台用户
                    resp = await loginByPcManage(params)
                }else if(this.userType == 2){// 集体用户
                    resp = await loginByCollective(params)
                }else{// 普通用户
                    resp = await loginByPerson(params)
                }
                if(!resp){
                    console.log('登录错误')
                    return
                }
                if(resp.code === 200){
                    const { access_token, refresh_token } = resp.data
                    this.setAccessToken(access_token)
                    this.setRefreshToken(refresh_token)
                    return { msg: resp.msg, code: resp.code }// 这里返回数据方便登录的时候判断状态
                }else{
                    return { msg: resp.msg, code: resp.code }
                }
            } catch(e){
                return Promise.reject(e)
            }
        },
        async getInfo(){// 获取用户信息
            try {
                let info = null
                let permissions = null
                let resp = null;
                if(this.userType == 3){// 后台用户
                    resp = await getInfoByPcManage()
                    if(resp.code === 200){
                        info = resp.data.sysOrg
                        permissions = resp.data.permissions
                    }
                }else if(this.userType == 2){// 集体用户
                    resp = await getInfoByCollective()
                    if(resp.code === 200){
                        info = resp.data.appUser
                        permissions = resp.data.permissions
                    }
                }else{// 普通用户
                    resp = await getInfoByPerson()
                    if(resp.code === 200){
                        info = resp.data.appUser
                        permissions = resp.data.permissions
                    }
                }
                if(info){
                    this.setUserInfo(info)
                }
                if(permissions){
                    this.setPermissions(permissions)
                }
                return { info, permissions }// 返回用户信息和用户权限方便在路由鉴权的时候，根据不同的用户类型分配不同的菜单
            } catch (e) {
                return Promise.reject(e)
            }
        },
        async logout(){// 登出
            await logout()
            this.setAccessToken('')
            this.setRefreshToken('')
            this.setUserInfo(null)
            this.setPermissions([])
            // 清除tags-views
            const tagsViewStore = useTagsViewStore()
            tagsViewStore.closeAllTags()
            return Promise.resolve('')
        }
    }
})