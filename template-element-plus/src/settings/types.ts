/* 系统设置 */
export interface IProject {
    navMode: 'vertical' | 'horizontal' | 'horizontal-mix'
    navTheme: 'dark' | 'light' | 'mix-dark'
    isMobile: boolean
    themeSetting: IThemeSetting
    headerSetting: IHeaderSetting
    tagsViewSetting: ITagsViewSetting
    menuSetting: IMenuSetting
    crumbsSetting: ICrumbsSetting
    animateSetting: IAnimateSetting
}
/* 导航模式 */
export type INavMode = 'vertical' | 'horizontal' | 'horizontal-mix'
/* 导航风格 */
export type INavTheme = 'dark' | 'light' | 'mix-dark'
export interface IThemeSetting {
    primary: string
    isDark: boolean
    dark: string
    colorList: string[]
}
/* 顶栏 */
export interface IHeaderSetting {
    bgColor: string
    invertedBgColor: string
    fixed: boolean
    isReload: boolean
}
/* 标签 */
export interface ITagsViewSetting{
    show: boolean
    fixed: boolean
}
/* 菜单 */
export interface IMenuSetting{
    bgColor: string
    invertedBgColor: string
    minMenuWidth: number
    menuWidth: number
    fixed: boolean
    mobileWidth: number
}
/* 面包屑 */
export interface ICrumbsSetting{
    show: boolean
    showIcon: boolean
}
export interface IAnimateSetting {
    open: boolean,
    type: string
}