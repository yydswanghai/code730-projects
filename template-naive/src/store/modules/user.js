import { defineStore } from 'pinia'
import { ACCESS_TOKEN, CURRENT_USER, REFRESH_TOKEN, USER_TYPE, getStorage, setStorage, delStorage } from '@/utils/auth'
import { loginByPerson, loginByCollective, loginByPcManage, logout } from '@/api/user'
import { getInfoByPerson, getInfoByCollective, getInfoByPcManage } from '@/api/user'

export const useUserStore = defineStore({
    id: 'app-user',
    state: () => ({
        userType: getStorage(USER_TYPE),// 1: 普通 2: 普通(2) 3: 后台
        access_token: getStorage(ACCESS_TOKEN),
        refresh_token: getStorage(REFRESH_TOKEN),
        userInfo: JSON.parse(localStorage.getItem(CURRENT_USER)),
        permissions: null,// 用户权限
    }),
    actions: {
        setUserType(type){// 设置用户类型
            this.userType = type
            setStorage(USER_TYPE, type)
        },
        setAccessToken(token){
            this.access_token = token
            if(token === ''){
                delStorage(ACCESS_TOKEN)
            }else{
                setStorage(ACCESS_TOKEN, token)
            }
        },
        setRefreshToken(token){
            this.refresh_token = token
            if(token === ''){
                delStorage(REFRESH_TOKEN)
            }else{
                setStorage(REFRESH_TOKEN, token)
            }
        },
        setUserInfo(info){// 设置用户信息
            this.userInfo = info
            if(info === ''){
                localStorage.removeItem(CURRENT_USER)
            }else{
                localStorage.setItem(CURRENT_USER, JSON.stringify(info))
            }
        },
        setPermissions(value){// 设置用户权限
            this.permissions = value
        },
        async login(params){// 登录
            try{
                let resp = null;
                if(this.userType === 3){
                    resp = await loginByPcManage(params)
                }else if(this.userType === 2){
                    resp = await loginByCollective(params)
                }else{
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
                    return Promise.resolve({ msg: resp.msg, code: resp.code })
                }else{
                    return Promise.resolve({ msg: resp.msg, code: resp.code })
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
                if(this.userType === 3){
                    resp = await getInfoByPcManage()
                    info = resp.data.sysOrg
                    permissions = resp.data.permissions
                }else if(this.userType === 2){
                    resp = await getInfoByCollective()
                    info = resp.data.appUser
                }else{
                    resp = await getInfoByPerson()
                    info = resp.data.appUser
                }
                if(!resp) return
                if(info){
                    this.setUserInfo(info)
                }
                if(permissions){
                    this.setPermissions(permissions)
                }
                return Promise.resolve({ info, permissions })
            } catch (e) {
                return Promise.reject(e)
            }
        },
        async logout(){// 登出
            try {
                await logout()
                this.setAccessToken('')
                this.setRefreshToken('')
                this.setUserInfo('')
                this.setPermissions([])
                return Promise.resolve('')
            } catch (e) {
                return Promise.reject(e)
            }
        }
    }
})

export function initUserStore(route) {
    const instance = useUserStore()
    // init
    const stateArr = [USER_TYPE, ACCESS_TOKEN, REFRESH_TOKEN, CURRENT_USER]
    stateArr.forEach(name => {
        const value = getStorage(name)
        if(value){
            switch (name) {
                case USER_TYPE:
                    instance.setUserType(value)
                    break;
                case ACCESS_TOKEN:
                    instance.setAccessToken(value)
                    break;
                case REFRESH_TOKEN:
                    instance.setRefreshToken(value)
                    break;
                case CURRENT_USER:
                    instance.setUserInfo(value)
                    break;
            }
        }
    })

    // 订阅数据变化，变化时存储
    instance.$subscribe((mutation, state) => {
        console.log(state)
    })
}