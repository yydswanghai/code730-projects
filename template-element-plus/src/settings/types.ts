/* 系统设置 */
export interface IProject {
    navMode: INavMode
    navTheme: string
    isMobile: boolean
    darkColor: string
    themeSetting: IThemeSetting
    headerSetting: IHeaderSetting
    tagsViewSetting: ITagsViewSetting
    menuSetting: IMenuSetting
    crumbsSetting: ICrumbsSetting
    animateSetting: IAnimateSetting
}
/* 导航模式 */
export type INavMode = 'vertical' | 'horizontal' | 'horizontal-mix'
export interface IThemeSetting {
    primary: string
    isDark: boolean
    colorList: string[]
}
/* 顶部 */
export interface IHeaderSetting {
    bgColor: string
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
    minMenuWidth: number
    menuWidth: number
    fixed: boolean
    splitMenu: boolean
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