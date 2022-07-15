import { defineStore } from 'pinia'
import { ElMessage } from 'element-plus'
import { authEnum, userEnum } from '@/enums/userEnum'
import { getStorage, setStorage, delStorage } from '@/utils/auth'
import { loginByU1, loginByU2, loginBySystem, getUserInfo, logout } from '@/api/user'
import { useTagsViewStore } from './tagsView'

type IUserInfo = {
    id?: string
    phone?: string
    username?: string
}

export type IState = {
    user_type: string | undefined
    access_token: string | undefined
    refresh_token: string | undefined
    user_info: IUserInfo | null
    permissions: string[] | null
}

/**
 * 用户状态
 */
export const useUserStore = defineStore({
    id: 'app-user',
    state: (): IState => ({
        user_type: getStorage(authEnum.USER_TYPE),
        access_token: getStorage(authEnum.ACCESS_TOKEN),
        refresh_token: getStorage(authEnum.REFRESH_TOKEN),
        user_info: null,
        permissions: null
    }),
    actions: {
        setAccessToken(token: string | undefined){
            this.access_token = token;
            if(!token){
                delStorage(authEnum.ACCESS_TOKEN);
            }else{
                setStorage(authEnum.ACCESS_TOKEN, token);
            }
        },
        setRefreshToken(token: string | undefined){
            this.refresh_token = token;
            if(!token){
                delStorage(authEnum.REFRESH_TOKEN);
            }else{
                setStorage(authEnum.REFRESH_TOKEN, token);
            }
        },
        /* 设置用户类型 */
        setUserType(type: string){
            this.user_type = type;
            setStorage(authEnum.USER_TYPE, type);
        },
        /* 设置权限列表 */
        setPermissions(perm: string[] | null){
            this.permissions = perm;
        },
        /* 设置用户信息 */
        setUserInfo(info: object | null){
            this.user_info = info;
        },
        /* 登录 */
        async login(params: { username: string, password: string }){
            try {
                const { username, password } = params;
                let loginFunc;
                if(this.user_type === userEnum.system){
                    loginFunc = loginBySystem;
                }else if(this.user_type === userEnum.user2){
                    loginFunc = loginByU2;
                }else{
                    loginFunc = loginByU1;
                }
                const resp = await loginFunc({ username, password });
                if(resp.code === 200){
                    const { access_token, refresh_token } = resp.data;
                    this.setAccessToken(access_token);
                    this.setRefreshToken(refresh_token);
                    return true;
                }else{
                    ElMessage.error(resp.msg || '登录失败');
                    return false;
                }
            } catch (error) {
                return Promise.reject(error);
            }
        },
        /* 获取用户信息 */
        async getInfo(){
            try {
                let type = userEnum.user1;
                if(this.user_type === userEnum.system){
                    type = userEnum.system;
                }else if(this.user_type === userEnum.user2){
                    type = userEnum.user2;
                }
                const resp = await getUserInfo({ type });
                if(resp.code === 200){
                    const { info, permissions } = resp.data;
                    this.setUserInfo(info);
                    this.setPermissions(permissions);
                    return { info, permissions }
                }else{
                    ElMessage.error(resp.msg || '获取用户信息失败');
                    return {}
                }
            } catch (error) {
                return Promise.reject(error);
            }
        },
        /* 登出 */
        async logout(){
            await logout();
            this.setAccessToken(undefined);
            this.setRefreshToken(undefined);
            this.setUserInfo(null);
            this.setPermissions(null);
            // 清除tags-views
            const tagsViewStore = useTagsViewStore();
            tagsViewStore.closeAllTags();
            return Promise.resolve(true);
        }
    }
})