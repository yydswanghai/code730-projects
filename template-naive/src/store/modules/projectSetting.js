import { defineStore } from 'pinia'
import settings from '@/settings/projectSettings'

export const useProjectSettingStore = defineStore({
    id: 'project-setting',
    state: () => ({
        ...settings,
    }),
    actions: {
        setNavTheme(value){
            this.navMode = value
        },
        setIsMobile(value){
            this.isMobile = value
        }
    }
})