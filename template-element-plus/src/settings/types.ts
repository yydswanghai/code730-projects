/* 系统设置 */
export interface IProject {
    navMode: string
    navTheme: string
    isMobile: boolean
    isDarkTheme: boolean
    appTheme: string
    appThemeList: string[]
    headerSetting: IHeaderSetting
    multiTabsSetting: IMultiTabsSetting
    menuSetting: IMenuSetting
    crumbsSetting: ICrumbsSetting
    isPageAnimate: boolean
    pageAnimateType: string
}
/* 顶部 */
export interface IHeaderSetting {
    bgColor: string
    fixed: boolean
    isReload: boolean
}
/* 标签 */
export interface IMultiTabsSetting{
    bgColor: string
    show: boolean
    fixed: boolean
}
/* 菜单 */
export interface IMenuSetting{
    minMenuWidth: number
    menuWidth: number
    fixed: boolean
    mixMenu: boolean
    mobileWidth: number
}
/* 面包屑 */
export interface ICrumbsSetting{
    show: boolean
    showIcon: boolean
}