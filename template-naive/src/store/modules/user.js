import { defineStore } from 'pinia'
import { ACCESS_TOKEN, CURRENT_USER, REFRESH_TOKEN, getStorage, setStorage, delStorage } from '@/utils/auth'
import { login, getUserInfo, logout } from '@/api/user'

export const useUserStore = defineStore({
    id: 'app-user',
    state: () => ({
        token: getStorage(ACCESS_TOKEN),
        userinfo: getStorage(CURRENT_USER),
        permissions: [],// 用户权限
    }),
    actions: {
        setToken(token){
            this.token = token
        },
        setUserInfo(info){
            this.userinfo = info
        },
        setPermissions(permissions){
            this.permissions = permissions
        },
        // 登录
        async login(userInfo){
            try{
                const { username, password } = userInfo
                const resp = await login({ username, password })// 调用接口
                if(resp){
                    const { access_token, refresh_token } = resp
                    setStorage(ACCESS_TOKEN, access_token)
                    setStorage(REFRESH_TOKEN, refresh_token)
                    this.setToken(access_token)
                }
            } catch(e){
                return Promise.reject(e)
            }
        },
        // 获取用户信息
        getInfo(){
            const that = this
            return new Promise((resolve, reject) => {
                getUserInfo().then((resp) => {
                    if(resp.code === 200){
                        if(resp.data.permissions){
                            this.setPermissions(resp.data.permissions)
                        }
                        if(resp.data.sysOrg){
                            this.setUserInfo(resp.data.sysOrg)
                            setStorage(CURRENT_USER, resp.data.sysOrg)
                        }
                    }else{
                        reject(new Error('getInfo: 没有获取到用户信息'))
                    }
                    resolve(resp)
                })
                .catch(error => {
                    reject(error)
                })
            })  
        },
        // 登出
        async logout(){
            logout.then(() => {
                this.setPermissions([])
                this.setUserInfo('')
                delStorage(ACCESS_TOKEN)
                delStorage(REFRESH_TOKEN)
                delStorage(CURRENT_USER)
                return Promise.resolve('')
            })
        }
    }
})