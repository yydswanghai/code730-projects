import styles from '@/styles/var.module.scss'
import { IProject } from './types'

const settings: IProject = {
    navMode: 'vertical',// 导航模式
    navTheme: 'dark',
    isMobile: false,// 是否处于移动端模式
    darkColor: styles.darkBgColor,
    themeSetting: {
        primary: styles.primaryColor,// 系统主题色
        isDark: false,// 是否为深色主题
        colorList: [// 内置主题色列表
            '#2d8cf0', '#0960bd', '#0084f4', '#009688', '#536dfe', '#ff5c93',
            '#ee4f12', '#0096c7', '#9c27b0', '#ff9800', '#FF3D68', '#00C1D4',
            '#71EFA3', '#171010', '#78DEC7', '#1768AC', '#FB9300', '#FC5404',
        ]
    },
    headerSetting: {// 顶部设置
        bgColor: '#fff',// 背景色
        fixed: true,// 是否固定顶部
        isReload: true,// 是否显示刷新按钮
    },
    tagsViewSetting: {// 标签设置
        show: true,// 是否显示
        fixed: true,// 固定多标签
    },
    menuSetting: {// 菜单设置
        bgColor: styles.asideColor,
        minMenuWidth: 64,// 最小宽度
        menuWidth: 200,// 菜单宽度
        fixed: true,// 是否固定菜单
        splitMenu: false,// 是否拆分菜单
        mobileWidth: 800,// 触发移动端侧边栏的宽度
    },
    crumbsSetting: {// 面包屑设置
        show: true,// 是否显示
        showIcon: true,// 显示图标
    },
    animateSetting: {// 路由动画设置
        open: true,// 是否开启动画
        type: 'zoom-fade'// 动画类型
    }
}

export default settings