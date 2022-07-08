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

export interface IHeaderSetting {
    bgColor: string
    fixed: boolean
    isReload: boolean
}

export interface IMultiTabsSetting{
    bgColor: string
    show: boolean
    fixed: boolean
}

export interface IMenuSetting{
    minMenuWidth: number
    menuWidth: number
    fixed: boolean
    mixMenu: boolean
    mobileWidth: number
}

export interface ICrumbsSetting{
    show: boolean
    showIcon: boolean
}