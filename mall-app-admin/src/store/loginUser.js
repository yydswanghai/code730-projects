import { setCookie, getUserCookie, removeUserCookie } from "@/utils/userCookie";

export default {
    namespaced: true,// 开启命名空间
    state: {
        // 导航的收放状态 false为展开 true为收起来
        collapsed: false,
        // 用户信息
        user: getUserCookie(),
        // 存储菜单的路由
        menuRoutes: [],
    },
    getters: {
        status(state){
            if(state.user.appkey && state.user.username && state.user.role){// 已登录
                return "login"
            }else{// 没有登录
                return "unlogin"
            }
        }
    },
    mutations: {
        changeCollapsed(state){
            state.collapsed = !state.collapsed;
        },
        setCollapsed(state, payload){
            state.collapsed = payload;
        },
        setUser(state, payload){
            state.user = payload;
        }, 
        setMenuRoutes(state, payload){
            state.menuRoutes = payload;
        },
        logout(state){
            state.user = {
                username: '',
                appkey: '',
                role: '',
                email: '',
            }
        },
    },
    actions: {
        changeCollapsed({ commit }){
            commit("changeCollapsed");
        },
        setMenuRoutes(ctx, payload){
            ctx.commit("setMenuRoutes", payload)
        },
        /* 设置用户信息 */
        setUserInfo({ commit }, userInfo){
            commit("setUser", userInfo);
            setCookie(userInfo);
        },
        /* 退出 */
        logout({ commit }){
            commit("logout");
            removeUserCookie();
        },
    }
}