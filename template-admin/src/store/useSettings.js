import { reactive, readonly } from "vue";
import Cookies from 'js-cookie'
/**
 * 系统设置
 */
// 创建默认的全局单例响应式数据，仅供该模块内部使用
const state = reactive({
    title: 'Vite App',
    tagsView: true,// 是否需要tagsView
    device: 'desktop',// 设备：默认电脑
    sidebar: {
        logo: 'https://wpimg.wallstcn.com/69a1c46c-eb1c-4b46-8bd4-e9e686ef5251.png',// 徽标
        showLogo: true,         // 是否展示徽标，侧边栏第一个上面显示
        opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,// 1: 打开 0: 关闭
        withoutAnimation: false,// 侧边栏无动画，false表示有动画
    }
})

// 对外暴露的数据是只读的，不能直接修改。也可以进一步使用toRefs进行封装，从而避免解构或展开后响应式丢失
export const settingsStore = readonly(state)

// 修改设置
export async function modifi(stateKey, value) {
    state[stateKey] = value
}

// 切换侧边栏
export async function toggleSidebar() {
    state.sidebar.opened = !state.sidebar.opened
    state.sidebar.withoutAnimation = false
    if(state.sidebar.opened){
        Cookies.set('sidebarStatus', 1)
    }else{
        Cookies.set('sidebarStatus', 0)
    }
}

// 关闭侧边栏
export async function closeSidebar({ withoutAnimation }){
    Cookies.set('sidebarStatus', 0)
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
}