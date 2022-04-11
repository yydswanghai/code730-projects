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
            <NDropdown trigger="hover" :options="userOptions" @select="dropdownSelect">
                <div class="user">
                    <NAvatar round>
                        用户A
                        <template #icon>
                            <UserOutlined />
                        </template>
                    </NAvatar>
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
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import { SearchOutlined, GithubFilled, FullscreenOutlined, FullscreenExitOutlined, UserOutlined, SettingOutlined } from '@vicons/antd'
import AppSetting from '../AppSetting/index.vue'
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
        const router = useRouter()
        const fullscreenIcon = ref('FullscreenOutlined')
        const drawerSetting = ref(null)

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

        function dropdownSelect(key) {
            if(key === 1){
                router.push({ name: 'Setting' })
            }else if(key === 2){
                console.log('退出登录')
            }
        }

        function openSetting() {
            drawerSetting.value.openDrawer()
        }
        return {
            fullscreenIcon,
            toggleFullScreen,
            userOptions,
            dropdownSelect,
            openSetting,
            drawerSetting,
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
    }
}
</style>