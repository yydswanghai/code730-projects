import { defineStore } from 'pinia'
import settings from '@/settings/project'

/**
 * 系统设置
 */
export const useProjectSettingStore = defineStore({
    id: 'project-setting',
    state: () => ({
        ...settings,
    }),
    actions: {
        // 设置导航模式
        setNavMode(value: string){
            this.navMode = value
        },
        // 设置导航栏风格
        setNavTheme(value: string){
            this.navTheme = value
        },
        // 设置手机端
        setIsMobile(value: boolean){
            this.isMobile = value
        },
        // 设置系统主题
        setAppTheme(value: string){
            this.appTheme = value
        }
    }
})