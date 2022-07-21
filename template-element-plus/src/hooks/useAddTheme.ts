import { lighten } from '@/utils/'
import { computed, watch, unref } from 'vue'
import { useProjectSettingStore } from '@/store/modules/projectSetting'

/**
 * 添加栏目反转样式变量
 */
export default function useAddMenuTheme() {
    const settingStore = useProjectSettingStore();
    const inverted = computed(() => ['dark', 'mix-dark'].includes(settingStore.navTheme));
    const headerInverted = computed(() => {
        return ['light', 'mix-dark'].includes(settingStore.navTheme) ? unref(inverted) : !unref(inverted)
    })
    const el = document.documentElement;
    el.style.setProperty('--i-white-color', '#FFFFFF');
    el.style.setProperty('--i-black-color', '#000000');

    watch(() => inverted.value, (val) => {
        const { bgColor, invertedBgColor } = settingStore.menuSetting;
        if(val){
            el.style.setProperty('--i-menu-bg-color', bgColor);
            el.style.setProperty('--i-menu-primary-color', invertedBgColor);
        }else{
            el.style.setProperty('--i-menu-bg-color', invertedBgColor);
            el.style.setProperty('--i-menu-primary-color', bgColor);
        }
    }, { immediate: true })
    watch(() => headerInverted.value, (val) => {
        const { bgColor, invertedBgColor } = settingStore.headerSetting;
        if(val){
            el.style.setProperty('--i-head-bg-color', invertedBgColor);
            el.style.setProperty('--i-head-primary-color', bgColor);
        }else{
            el.style.setProperty('--i-head-bg-color', bgColor);
            el.style.setProperty('--i-head-primary-color', invertedBgColor);
        }
    }, { immediate: true })
    watch(() => settingStore.themeSetting.isDark, (val) => {
        if(val){
            el.style.setProperty('--i-menu-bg-color', settingStore.themeSetting.dark);
            el.style.setProperty('--i-head-bg-color', settingStore.themeSetting.dark);
            el.style.setProperty('--i-head-primary-color', settingStore.headerSetting.bgColor);
        }else{
            el.style.setProperty('--i-menu-bg-color', settingStore.menuSetting.bgColor);
            el.style.setProperty('--i-head-bg-color', settingStore.headerSetting.bgColor);
            el.style.setProperty('--i-head-primary-color', settingStore.headerSetting.invertedBgColor);
        }
    })
    return {
        inverted,
        headerInverted,
    }
}