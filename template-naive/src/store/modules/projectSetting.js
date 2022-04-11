import { defineStore } from 'pinia'
import settings from '@/settings/project'

export const useProjectSettingStore = defineStore({
    id: 'project-setting',
    state: () => ({
        ...settings,
    }),
    actions: {
        // 设置导航模式
        setNavMode(value){
            this.navMode = value
        },
        // 设置导航栏风格
        setNavTheme(value){
            this.navTheme = value
        },
        // 设置手机端
        setIsMobile(value){
            this.isMobile = value
        },
        // 设置系统主题
        setAppTheme(value){
            this.appTheme = value
        }
    }
})