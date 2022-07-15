import styles from '@/styles/var.module.scss'
import { IProject } from './types'

const settings: IProject = {
    //导航模式:
    navMode: 'vertical',
    navTheme: 'dark',
    //是否处于移动端模式
    isMobile: false,
    //是否为深色主题
    isDarkTheme: false,
    //系统主题色
    appTheme: styles.primaryColor,
    //置主题色列表
    appThemeList: [
        '#2d8cf0',
        '#0960bd',
        '#0084f4',
        '#009688',
        '#536dfe',
        '#ff5c93',
        '#ee4f12',
        '#0096c7',
        '#9c27b0',
        '#ff9800',
        '#FF3D68',
        '#00C1D4',
        '#71EFA3',
        '#171010',
        '#78DEC7',
        '#1768AC',
        '#FB9300',
        '#FC5404',
    ],
    //顶部
    headerSetting: {
        //背景色
        bgColor: '#fff',
        //固定顶部
        fixed: true,
        //显示刷新按钮
        isReload: true,
    },
    //多标签 viewtags
    multiTabsSetting: {
        //背景色
        bgColor: '#fff',
        //是否显示
        show: true,
        //固定多标签
        fixed: true,
    },
    //菜单
    menuSetting: {
        //最小宽度
        minMenuWidth: 64,
        //菜单宽度
        menuWidth: 200,
        //固定菜单
        fixed: true,
        //分割菜单
        mixMenu: false,
        //触发移动端侧边栏的宽度
        mobileWidth: 800,
    },
    //面包屑
    crumbsSetting: {
        //是否显示
        show: true,
        //显示图标
        showIcon: true,
    },
    //是否开启路由动画
    isPageAnimate: true,
    //路由动画类型
    pageAnimateType: 'zoom-fade',
}

export default settings