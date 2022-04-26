<template>
    <div class="header-right">
        <!-- 搜索 -->
        <div class="trigger">
            <NTooltip placement="bottom">
                <template #trigger>
                    <NIcon size="18"><SearchOutlined /></NIcon>
                </template>
                <span>搜索</span>
            </NTooltip>
        </div>
        <!-- 外部链接 -->
        <div class="trigger">
            <NTooltip placement="bottom">
                <template #trigger>
                    <NIcon size="18"><GithubFilled /></NIcon>
                </template>
                <span>GITHUB</span>
            </NTooltip>
        </div>
        <!--切换全屏-->
        <div class="trigger">
            <NTooltip placement="bottom">
                <template #trigger>
                    <NIcon size="18">
                        <component :is="fullscreenIcon" @click="toggleFullScreen" />
                    </NIcon>
                </template>
                <span>全屏</span>
            </NTooltip>
        </div>
        <!-- 个人中心 -->
        <div class="trigger">
            <NDropdown class="header-user-dropdown" trigger="hover" :options="userOptions" @select="dropdownSelect">
                <div class="user">
                    <NAvatar round :src="avatar" class="avatar" />
                </div>
            </NDropdown>
        </div>
        <!--设置-->
        <div class="trigger" @click="openSetting">
            <NTooltip placement="bottom-end">
                <template #trigger>
                    <NIcon size="18">
                        <SettingOutlined />
                    </NIcon>
                </template>
                <span>修改设置</span>
            </NTooltip>
        </div>
    </div>
    <!--app全局设置-->
    <AppSetting ref="drawerSetting" />
</template>

<script>
import { ref, h } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/modules/user'
import { SearchOutlined, GithubFilled, FullscreenOutlined, FullscreenExitOutlined, UserOutlined, SettingOutlined } from '@vicons/antd'
import AppSetting from '../AppSetting/index.vue'
import { getAssetsFile } from '@/utils/'
export default {
    name: 'HeaderRight',
    components: {
        SearchOutlined,
        GithubFilled,
        FullscreenOutlined,
        FullscreenExitOutlined,
        UserOutlined,
        SettingOutlined,
        AppSetting,
    },
    setup(){
        const $router = useRouter()
        const fullscreenIcon = ref('FullscreenOutlined')
        const drawerSetting = ref(null)
        const userStore = useUserStore()

        const avatar = ref('')// 用户头像

        // 切换全屏图标
        function toggleFullscreenIcon() {
            fullscreenIcon.value = document.fullscreenElement !== null ? 'FullscreenExitOutlined' : 'FullscreenOutlined'
        }
        // 全屏切换
        function toggleFullScreen() {
            if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen();
            } else {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                }
            }
        }
        // 监听全屏切换事件
        document.addEventListener('fullscreenchange', toggleFullscreenIcon)

        const userOptions = [
            { label: '个人设置', key: 1 },
            { label: '退出登录', key: 2 },
        ]

        function openSetting() {// 打开设置
            drawerSetting.value.openDrawer()
        }
        async function dropdownSelect(key) {// 用户下拉菜单
            if(key === 1){
                $router.push({ name: 'Setting' })
            }else if(key === 2){
                // 退出登录
                await userStore.logout()
                $router.push('/login')
            }
        }

        /**
         * 渲染自定义下拉菜单
         * @param {string} userType 用户类型
         * @param {string} name 用户名称
         * @param {string} desc 用户描述
         */
        function renderCustomHeader(userType, name, desc) {
            return h('div', { class: 'custom' }, [
                h('div', { class: 'custom-title' }, [
                    h('span', { class: 'user-type' }, { default: () => userType }),
                    h('span', { class: 'user-name' }, { default: () => name })
                ]),
                h('div', { class: 'custom-desc' }, { default: () => desc })
            ])
        }
        let vNode = null
        let username = userStore.userInfo.name || ''
        if(userStore.userType == 3){
            avatar.value = getAssetsFile('images/avatar/avatar-3.svg')
            username = userStore.userInfo.orgName
            vNode = renderCustomHeader('后台用户', username, '整条街最靓的仔')
        }else if(userStore.userType == 2){
            avatar.value = getAssetsFile('images/avatar/avatar-2.svg')
            vNode = renderCustomHeader('集体用户', username, '整条街最靓的仔')
        }else{
            avatar.value = getAssetsFile('images/avatar/avatar-1.svg')
            vNode = renderCustomHeader('普通用户', username, '整条街最靓的仔')
        }
        userOptions.unshift(...[
            { key: 'header-render', type: 'render', render: () => vNode },
            { key: 'header-divider', type: 'divider' }
        ])

        return {
            fullscreenIcon,
            toggleFullScreen,
            userOptions,
            dropdownSelect,
            openSetting,
            drawerSetting,
            avatar,
        }
    }
}

</script>
<style lang="less" scoped>
.header-right{
    display: flex;
    align-items: center;
    margin-right: 20px;
    .user{
        display: flex;
        align-items: center;
        height: @header-height;
        .avatar{
            position: relative;
            overflow: visible;
            &::before{
                content: "";
                display: block;
                height: 100%;
                width: 100%;
                border-radius: 999px;
                position: absolute;
                z-index: -1;
                animation: wave 1.5s ease-out infinite;
                background: #2d3e37fc;
            }
        }
    }
}
</style>
<style lang="less">
.header-user-dropdown{
    .custom{
        padding: 8px 8px;
        .custom-title{
            font-size: 13px;
            .user-type{
                color: #f80;
                margin-right: 4px;
            }
            .user-name{
                color: rgb(24,25,28);
            }
        }
        .custom-desc{
            font-size: 12px;
            color: rgb(118, 124, 130);
        }
    }
}
@keyframes wave {
    25%{
        opacity: .75;
        transform: scale(1);
    }
    50%{
        opacity: .5;
        transform: scale(1.1);
    }
    75%{
        opacity: .25;
        transform: scale(1.2);
    }
    100%{
        opacity: 0;
        transform: scale(1.3);
    }
}
</style>