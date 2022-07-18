<template>
    <div class="header-right">
        <div class="trigger" v-if="showInput">
            <div class="input-wrap">
                <el-input v-model="inputVal" placeholder="please input"></el-input>
            </div>
        </div>
        <div class="trigger">
            <el-tooltip placement="bottom">
                <el-icon :size="18" @click="showInput = !showInput"><Search /></el-icon>
                <template #content>
                    <span>搜索</span>
                </template>
            </el-tooltip>
        </div>
        <div class="trigger">
            <el-tooltip placement="bottom">
                <a href="https://github.com/" target="_blank">
                    <el-icon :size="18"><Github /></el-icon>
                </a>
                <template #content>
                    <span>github</span>
                </template>
            </el-tooltip>
        </div>
        <div class="trigger">
            <el-tooltip placement="bottom">
                <el-icon :size="18">
                    <component :is="fullscreenIcon" @click="toggleFullScreen" />
                </el-icon>
                <template #content>
                    <span>全屏</span>
                </template>
            </el-tooltip>
        </div>
        <div class="trigger">
            <el-dropdown class="user">
                <div class="avatar">
                    <img :src="getIconsFile(avatar)" />
                </div>
                <template #dropdown>
                    <div class="i-dropdown-menu">
                        <div class="type">
                            <span>{{ userDesc.type }}</span>
                            <span>{{ userDesc.name }}</span>
                        </div>
                        <div class="desc">{{ userDesc.desc }}</div>
                        <div class="line"></div>
                        <div
                            class="i-dropdown-menu-item"
                            v-for="(val, key) in IDropdownEnum"
                            :key="val + key"
                            @click="handleDropdown($event, val)"
                            >{{ key }}
                        </div>
                    </div>
                </template>
            </el-dropdown>
        </div>
        <div class="trigger" @click="openSetting">
            <el-tooltip placement="bottom-end">
                <el-icon :size="18">
                    <SettingsOutline />
                </el-icon>
                <template #content>
                    <span>修改设置</span>
                </template>
            </el-tooltip>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/modules/user'
import { Search } from '@element-plus/icons-vue'
import { Github, Fullscreen, FullscreenExit, SettingsOutline, Avatar1, Avatar2, Avatar3 } from '@/icons/'
import { getIconsFile } from '@/utils/'
import { userEnum } from '@/enums/userEnum'
import { PageEnum } from '@/enums/pageEnum'

export default defineComponent({
    name: 'HeaderLeft',
    components: {
        Search,
        Github,
        Fullscreen,
        FullscreenExit,
        SettingsOutline,
        Avatar1,
        Avatar2,
        Avatar3,
    },
    setup(){
        const $router = useRouter();
        const userStore = useUserStore();
        /* 搜索 */
        const inputVal = ref('');
        const showInput = ref(false);
        /* 个人中心 */
        let avatar = 'avatar/avatar-1.svg?url';
        const userDesc = {
            name: userStore.user_info?.username,
            desc: '整条街最靓的仔',
            type: '个人用户'
        };
        enum IDropdownEnum {
            个人设置 = '1',
            退出登录 = '2'
        }
        const dropdownOptions = [
            { label: '个人设置', value: '1' },
            { label: '退出登录', value: '2' }
        ]
        if(userStore.user_type === userEnum.system){
            avatar = 'avatar/avatar-3.svg?url';
            userDesc.type = '后台用户';
        }else if(userStore.user_type === userEnum.user2){
            avatar = 'avatar/avatar-2.svg?url';
            userDesc.type = '组织用户';
        }
        async function handleDropdown(event: Event, val: string) {
            if(val === IDropdownEnum.个人设置){
                console.log('个人设置')
            }else{
                await userStore.logout();
                $router.push(PageEnum.LOGIN);
            }
        }
        /* 全屏 */
        const fullscreenIcon = ref('Fullscreen');
        // 切换全屏图标
        function toggleFullscreenIcon() {
            fullscreenIcon.value = document.fullscreenElement !== null ? 'FullscreenExit' : 'Fullscreen';
        }
        // 全屏切换
        function toggleFullScreen() {
            if(!document.fullscreenElement){
                document.documentElement.requestFullscreen();
            }else{
                if(document.exitFullscreen){
                    document.exitFullscreen();
                }
            }
        }
        onMounted(() => {
            // 监听全屏切换事件
            document.addEventListener('fullscreenchange', toggleFullscreenIcon);
        });
        /* 设置 */
        const drawerSettingRef = ref(null);
        // 打开设置
        function openSetting() {
            // drawerSettingRef.value.openDrawer()
        }

        return {
            drawerSettingRef,
            fullscreenIcon,
            inputVal,
            showInput,
            avatar,
            userDesc,
            IDropdownEnum,
            dropdownOptions,
            getIconsFile,
            toggleFullscreenIcon,
            toggleFullScreen,
            openSetting,
            handleDropdown,
        }
    }
})
</script>
<style lang="scss" scoped>
@import "@/styles/var.scss";
.header-right{
    height: 100%;
    margin-right: 20px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    .input-wrap{
        height: 100%;
        display: flex;
        align-items: center;
    }
    .user{
        height: 100%;
        display: flex;
        align-items: center;
        .avatar{
            position: relative;
            overflow: visible;
            z-index: 1;
            width: 34px;
            height: 34px;
            img{
                width: 100%;
                height: 100%;
            }
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
.i-dropdown-menu{
    .type{
        font-size: 13px;
        color: rgb(24,25,28);
        span:first-of-type{
            color: #f80;
            margin-right: 4px;
        }
    }
    .desc{
        font-size: 12px;
        color: rgb(118, 124, 130);
    }
    .line{
        margin: 6px 0;
        border-top: 1px solid #ebeef5;
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